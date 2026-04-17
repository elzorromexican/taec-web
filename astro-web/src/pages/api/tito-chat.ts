/**
 * @name tito-chat.ts
 * @version 2.0
 * @description Router central de TitoBits v4. Orquesta Motor 1 (reglas), Motor 2 (RAG) y Motor 3 (Lead Scoring remoto y Handoff automatizado).
 * @inputs HTTP POST request payload { message: string, session_id: string }
 * @outputs JSON content de la IA o notificaciones de escalamiento
 * @dependencies ../lib/tito/rules, ../lib/tito/rag, ../lib/tito/scoring, ../lib/tito/handoff
 * @created 2026-04-11
 * @updated 2026-04-11 12:12:00
 */

import { GoogleGenAI } from "@google/genai";
import type { APIRoute } from "astro";
import {
	enviarNotificacion,
	extraerContacto,
	FALLBACK_CONTACTO,
	generarMiniBrief,
} from "../../lib/tito/handoff";
import {
	getEmbedding,
	searchSimilarChunks,
	supabase,
} from "../../lib/tito/rag";
import {
	evaluateMessageForEscalation,
	getSystemRulesString,
} from "../../lib/tito/rules";
import {
	calcularScore,
	determinarHandoff,
	type LeadSignals,
} from "../../lib/tito/scoring";

export const POST: APIRoute = async ({ request }) => {
	try {
		const body = await request.json();
		const message = body.message || "";
		const sessionId = body.session_id || "anonymous-session";

		// ======= FASE 3: MODO CAPTURA =======
		const { data: existingLead } = await supabase
			.from("tito_leads")
			.select("*")
			.eq("session_id", sessionId)
			.single();

		if (existingLead && existingLead.awaiting_contact) {
			const tieneEmail = !!existingLead.email;
			const esConsulta =
				message.length > 15 &&
				!message.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+)|soy\s|de\s+[A-Z]/);

			if (tieneEmail && esConsulta) {
				await supabase
					.from("tito_leads")
					.update({ awaiting_contact: false })
					.eq("id", existingLead.id);
				// continuar al flujo normal
			} else {
				const contacto = extraerContacto(message);

				const isRefusal =
					message.toLowerCase().match(/(no quiero|no te dar|no gracias)/) !==
					null;
				const hasDatos = contacto.nombre || contacto.empresa || contacto.email;

				if (isRefusal || !hasDatos) {
					return new Response(
						JSON.stringify({
							reply: FALLBACK_CONTACTO,
							handoff_tipo: existingLead.handoff_tipo,
							score: existingLead.score,
						}),
						{ status: 200, headers: { "Content-Type": "application/json" } },
					);
				}

				const mergedNombre = contacto.nombre || existingLead.nombre;
				const mergedEmail = contacto.email || existingLead.email;
				const mergedEmpresa = contacto.empresa || existingLead.empresa;

				const faltaNombre = !mergedNombre;
				const faltaEmail = !mergedEmail;

				let replyCapture = "";
				let awaitingContactUpdate = false;

				if (!faltaNombre && !faltaEmail) {
					replyCapture = `Listo ${mergedNombre}, nuestro equipo te contacta en menos de 24 horas hábiles.`;
					awaitingContactUpdate = false;
				} else if (faltaEmail) {
					replyCapture = faltaNombre
						? "Gracias. ¿Me compartes tu nombre y correo corporativo?"
						: `Gracias ${mergedNombre}. ¿Me compartes tu correo corporativo?`;
					awaitingContactUpdate = true;
				} else if (faltaNombre) {
					replyCapture = "Casi listo, ¿me confirmas tu nombre?";
					awaitingContactUpdate = true;
				}

				const { data: updatedLead, error: leadUpdateError } = await supabase
					.from("tito_leads")
					.update({
						nombre: mergedNombre,
						empresa: mergedEmpresa,
						email: mergedEmail,
						awaiting_contact: awaitingContactUpdate,
					})
					.eq("id", existingLead.id)
					.select()
					.single();

				if (!awaitingContactUpdate && !leadUpdateError && updatedLead) {
					enviarNotificacion({
						id: updatedLead.id,
						session_id: sessionId,
						email: updatedLead.email,
						nombre: updatedLead.nombre,
						empresa: updatedLead.empresa,
						score: updatedLead.score,
						minibrief: updatedLead.minibrief,
						handoff_tipo: updatedLead.handoff_tipo as
							| "ventas"
							| "preventa_tecnica",
					});
				}

				return new Response(
					JSON.stringify({
						reply: replyCapture,
						handoff_tipo: existingLead.handoff_tipo,
						score: existingLead.score,
					}),
					{ status: 200, headers: { "Content-Type": "application/json" } },
				);
			}
		}

		// ======= MOTOR 1: EVALUAR REGLAS Y TRIGGERS =======
		const rulesContext = getSystemRulesString();
		const escalationCheck = evaluateMessageForEscalation(message);

		// ======= MOTOR 2: RAG (VECTORES) =======
		const messageEmbedding = await getEmbedding(message);
		const contextChunks = await searchSimilarChunks(messageEmbedding);

		// ======= MOTOR 3: SCORING Y EXTRACCIONES LLM =======
		const geminiKey =
			typeof process !== "undefined" ? (process.env.TAEC_GEMINI_KEY ?? "") : "";
		const ai = new GoogleGenAI({ apiKey: geminiKey });

		const extractionPrompt = `
Analiza este mensaje de un prospecto B2B y extrae señales de calificación.
Responde SOLO con JSON válido, sin texto adicional.

Mensaje: "${message}"

Schema esperado:
{
  "productos_interes": string[],        // productos mencionados: articulate-360, vyond, moodle, totara, reach, lys, ottolearn, proctorizer, strikeplagiarism, customguide
  "seats_mencionados": number | null,   // número de licencias/usuarios mencionados, null si no se menciona
  "requiere_integracion": boolean,      // menciona integración con otro sistema
  "tiene_lms_actual": boolean,          // ya tiene un LMS en uso
  "es_cliente_nuevo": boolean,          // parece ser nuevo cliente (true por defecto)
  "urgencia": "alta" | "media" | "baja" | null,  // señales de urgencia o plazo
  "presupuesto_aprobado": boolean       // menciona presupuesto aprobado o autorizado
}
`;

		let realSignals: LeadSignals;
		try {
			const extraction = await ai.models.generateContent({
				model: "gemini-2.5-flash",
				contents: extractionPrompt,
			});
			const rawJson =
				extraction.text?.replace(/```json|```/g, "").trim() ?? "{}";
			realSignals = JSON.parse(rawJson);
		} catch {
			// Fallback conservador si falla la extracción
			realSignals = {
				productos_interes: [],
				seats_mencionados: null,
				requiere_integracion: false,
				tiene_lms_actual: message.toLowerCase().includes("lms"),
				es_cliente_nuevo: true,
				urgencia: null,
				presupuesto_aprobado: false,
			};
		}

		// ======= FASE 2: HANDOFF & SUPABASE DATABASE =======
		const score = calcularScore(realSignals);
		let handoffTipo = determinarHandoff(realSignals, score);

		if (escalationCheck === "ESCALATE" && !handoffTipo) {
			handoffTipo = "ventas";
		}

		let reply = "Hola, soy TitoBits v4. Procesando...";

		if (handoffTipo) {
			const miniBrief = generarMiniBrief([{ role: "user", content: message }]);

			// Upsert Supabase para generar o actualizar Lead
			const { data: leadData, error: leadError } = await supabase
				.from("tito_leads")
				.upsert(
					[
						{
							session_id: sessionId,
							score: score,
							minibrief: miniBrief,
							handoff_tipo: handoffTipo,
							handoff_triggered: true,
							email: null,
							awaiting_contact: true, // Fase 3: Set to true when handoff triggers
						},
					],
					{ onConflict: "session_id" },
				)
				.select()
				.single();

			if (leadError || !leadData) {
				console.error("Fallo persistiendo a Supabase tito_leads:", leadError);
			}

			reply =
				"Para conectarte con el especialista correcto, ¿me confirmas tu nombre, empresa y correo corporativo?";
		} else if (escalationCheck === "INFORM") {
			reply =
				"Por favor indícame la cantidad exacta de licencias o alcances para asistirte.";
		} else {
			// CONTINUE — responder con Gemini usando contexto RAG
			const ragContext = contextChunks.map((c: any) => c.content).join("\n\n");

			const conversationPrompt = `
Eres TitoBits, el asistente comercial de TAEC — empresa líder en tecnología de aprendizaje corporativo en México y LATAM.
Resuelves preguntas sobre productos e-learning (Articulate 360, Vyond, Moodle, Totara, LYS, OttoLearn, Proctorizer).

REGLAS:
${rulesContext}

CONTEXTO DE LA BASE DE CONOCIMIENTO:
${ragContext || "No se encontró contexto relevante."}

Responde al siguiente mensaje del usuario de forma concisa, directa y sin emojis.
Si no tienes la información precisa en el contexto, transfiere a ventas.

Usuario: ${message}
`;

			const geminiResponse = await ai.models.generateContent({
				model: "gemini-2.5-flash",
				contents: conversationPrompt,
			});

			reply =
				geminiResponse.text?.trim() ??
				"Gracias por tu consulta. Un especialista de TAEC te contactará pronto.";
		}

		return new Response(
			JSON.stringify({
				reply,
				handoff_tipo: handoffTipo,
				score: score,
			}),
			{
				status: 200,
				headers: { "Content-Type": "application/json" },
			},
		);
	} catch (error) {
		console.error("Error crítico en tito-chat router v2:", error);
		return new Response(
			JSON.stringify({ error: "Interrupción de servicio TitoBits v4" }),
			{ status: 500, headers: { "Content-Type": "application/json" } },
		);
	}
};
