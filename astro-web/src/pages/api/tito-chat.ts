/**
 * @name tito-chat.ts
 * @version 2.5
 * @description Router central de TitoBits v4. Orquesta Motor 1 (reglas), Motor 2 (RAG) y Motor 3 (Lead Scoring remoto y Handoff automatizado).
 * @inputs HTTP POST request payload { message: string, session_id: string }
 * @outputs JSON content de la IA o notificaciones de escalamiento
 * @dependencies ../lib/tito/rules, ../lib/tito/rag, ../lib/tito/scoring, ../lib/tito/handoff
 * @created 2026-04-11
 * @updated 2026-04-30
 *
 * Changelog:
 *   v2.5 (2026-04-30) — Autor: Antigravity
 *     - [FIX] Issue #187: Responder preguntas legítimas (vía LLM) durante awaiting_contact si softWallActive es true en lugar de forzar FALLBACK_CONTACTO.
 *   v2.4 (2026-04-29) — Autor: Antigravity
 *     - [FEAT] Issue #189: Reemplazar generarMiniBrief por buildMiniBrief determinista usando LeadSignals acumulados.
 *   v2.3 (2026-04-29) — Autor: Antigravity
 *     - [FEAT] Issue #184: Acumular LeadSignals por sesión en Supabase y fusionar con las señales actuales.
 *   v2.2 (2026-04-29) — Autor: Antigravity
 *     - [REFACTOR] Issue #182: Reemplazar getSystemRulesString por getActiveSystemRules.
 *     - [FEAT] Issue #185: Expandir LeadSignals con campos de intent comercial.
 *   v2.1 (2026-04-23) — Autor: Antigravity
 *     - [FIX] Resolución de env vars compatible con Astro SSR (import.meta.env + process.env) para TAEC_GEMINI_KEY
 */

import { GoogleGenAI } from "@google/genai";
import type { APIRoute } from "astro";
import {
  enviarNotificacion,
  extraerContacto,
  FALLBACK_CONTACTO,
} from "../../lib/tito/handoff";
import {
  getEmbedding,
  searchSimilarChunks,
  searchKbItems,
  supabase,
} from "../../lib/tito/rag";
import { evaluateMessageForEscalation } from "../../lib/tito/rules";
import { getActiveSystemRules } from "../../lib/tito/systemContext";
import {
  calcularScore,
  determinarHandoff,
  type LeadSignals,
} from "../../lib/tito/scoring";
import {
  getPersonalityModifier,
  type PersonalityMode,
} from "../../lib/tito/personality";

function buildMiniBrief(signals: LeadSignals, lastMessage: string): string {
  const parts: string[] = [];

  if (signals.productos_interes && signals.productos_interes.length > 0)
    parts.push(`Productos: ${signals.productos_interes.join(", ")}`);
  if (signals.seats_mencionados)
    parts.push(`Usuarios: ${signals.seats_mencionados}`);
  if (signals.empresa_mencionada)
    parts.push(`Empresa: ${signals.empresa_mencionada}`);
  if (signals.cargo_mencionado)
    parts.push(`Cargo: ${signals.cargo_mencionado}`);
  if (signals.dolor_negocio) parts.push(`Pain point: ${signals.dolor_negocio}`);
  if (signals.tiene_lms_actual) parts.push("Tiene LMS actual");
  if (signals.requiere_integracion) parts.push("Requiere integración");
  if (signals.presupuesto_aprobado) parts.push("Presupuesto aprobado");
  if (signals.urgencia) parts.push(`Urgencia: ${signals.urgencia}`);

  parts.push(`Último mensaje: "${lastMessage.slice(0, 120)}"`);

  return parts.join(" | ");
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const message = body.message || "";
    const sessionId = body.session_id || "anonymous-session";

    let softWallActive = false;

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
          message.toLowerCase().match(/(no quiero|no te dar|no gracias|luego)/) !==
          null;
        const hasDatos = contacto.nombre || contacto.empresa || contacto.email;

        if (isRefusal) {
          return new Response(
            JSON.stringify({
              reply: FALLBACK_CONTACTO,
              handoff_tipo: existingLead.handoff_tipo,
              score: existingLead.score,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } },
          );
        }

        if (!hasDatos) {
          if (esConsulta) {
            softWallActive = true;
          } else {
            return new Response(
              JSON.stringify({
                reply: FALLBACK_CONTACTO,
                handoff_tipo: existingLead.handoff_tipo,
                score: existingLead.score,
              }),
              { status: 200, headers: { "Content-Type": "application/json" } },
            );
          }
        } else {
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
          } else {
            replyCapture =
              "Gracias. ¿Me compartes tu nombre y correo corporativo?";
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
    }

    // ======= MOTOR 1: EVALUAR REGLAS Y TRIGGERS =======
    let rulesContext = getActiveSystemRules();
    if (softWallActive) {
      rulesContext += "\nEl usuario está pendiente de compartir su correo. Al final de tu respuesta, pídelo naturalmente en una línea.";
    }
    const escalationCheck = evaluateMessageForEscalation(message);

    // ======= MOTOR 2: RAG (VECTORES HÍBRIDO) =======
    const messageEmbedding = await getEmbedding(message);
    const [contextChunks, kbItems] = await Promise.all([
      searchSimilarChunks(messageEmbedding, 0.75, 2),
      searchKbItems(messageEmbedding, 0.75, 3),
    ]);

    // ======= MOTOR 3: SCORING Y EXTRACCIONES LLM =======
    const geminiKey =
      (typeof process !== "undefined" && process.env.TAEC_GEMINI_KEY) ||
      (typeof import.meta !== "undefined" &&
        import.meta.env &&
        import.meta.env.TAEC_GEMINI_KEY) ||
      "";
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
  "presupuesto_aprobado": boolean,      // menciona presupuesto aprobado o autorizado
  "quiere_cotizacion": boolean,         // "quiero cotizar", "necesito propuesta", "cuánto cuesta"
  "quiere_demo": boolean,               // "quiero ver una demo", "pueden mostrarme"
  "quiere_contacto": boolean,           // "quiero hablar con alguien", "me contacten"
  "empresa_mencionada": string | null,
  "cargo_mencionado": string | null,    // "soy director de RH", "soy coordinador"
  "dolor_negocio": string | null        // resumen del pain point, máx 10 palabras
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
        quiere_cotizacion: false,
        quiere_demo: false,
        quiere_contacto: false,
        empresa_mencionada: null,
        cargo_mencionado: null,
        dolor_negocio: null,
      };
    }

    // ======= FASE 2: HANDOFF & SUPABASE DATABASE =======
    const accumulatedSignals: Partial<LeadSignals> =
      existingLead?.accumulated_signals ?? {};

    const mergedSignals: LeadSignals = {
      productos_interes: [
        ...new Set([
          ...(accumulatedSignals.productos_interes ?? []),
          ...(realSignals.productos_interes ?? []),
        ]),
      ],
      seats_mencionados:
        realSignals.seats_mencionados ??
        accumulatedSignals.seats_mencionados ??
        null,
      requiere_integracion:
        realSignals.requiere_integracion ||
        (accumulatedSignals.requiere_integracion ?? false),
      tiene_lms_actual:
        realSignals.tiene_lms_actual ||
        (accumulatedSignals.tiene_lms_actual ?? false),
      es_cliente_nuevo:
        realSignals.es_cliente_nuevo ??
        accumulatedSignals.es_cliente_nuevo ??
        true,
      urgencia: realSignals.urgencia ?? accumulatedSignals.urgencia ?? null,
      presupuesto_aprobado:
        realSignals.presupuesto_aprobado ||
        (accumulatedSignals.presupuesto_aprobado ?? false),
      quiere_cotizacion:
        realSignals.quiere_cotizacion ||
        (accumulatedSignals.quiere_cotizacion ?? false),
      quiere_demo:
        realSignals.quiere_demo || (accumulatedSignals.quiere_demo ?? false),
      quiere_contacto:
        realSignals.quiere_contacto ||
        (accumulatedSignals.quiere_contacto ?? false),
      empresa_mencionada:
        realSignals.empresa_mencionada ??
        accumulatedSignals.empresa_mencionada ??
        null,
      cargo_mencionado:
        realSignals.cargo_mencionado ??
        accumulatedSignals.cargo_mencionado ??
        null,
      dolor_negocio:
        realSignals.dolor_negocio ?? accumulatedSignals.dolor_negocio ?? null,
    };

    const score = calcularScore(mergedSignals);
    let handoffTipo = determinarHandoff(mergedSignals, score);

    if (escalationCheck === "ESCALATE" && !handoffTipo) {
      handoffTipo = "ventas";
    }

    let reply = "Hola, soy TitoBits v4. Procesando...";

    let useGemini = false;

    if (handoffTipo) {
      const miniBrief = buildMiniBrief(mergedSignals, message);

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
              email: existingLead?.email || null,
              awaiting_contact: true, // Fase 3: Set to true when handoff triggers
              accumulated_signals: mergedSignals, // ISSUE #184: persist accumulated signals
            },
          ],
          { onConflict: "session_id" },
        )
        .select()
        .single();

      if (leadError || !leadData) {
        console.error("Fallo persistiendo a Supabase tito_leads:", leadError);
      }

      if (softWallActive) {
        useGemini = true;
      } else {
        reply =
          "Para conectarte con el especialista correcto, ¿me confirmas tu nombre, empresa y correo corporativo?";
      }
    } else if (escalationCheck === "INFORM") {
      reply =
        "Por favor indícame la cantidad exacta de licencias o alcances para asistirte.";
    } else {
      useGemini = true;
    }

    if (useGemini) {
      // CONTINUE — responder con Gemini usando contexto RAG
      let ragContext = "";
      if (kbItems && kbItems.length > 0) {
        ragContext +=
          "### BASE DE CONOCIMIENTOS (Prioridad Alta):\n" +
          kbItems
            .map(
              (kb: any) =>
                `[FAQ ${kb.producto} - ${kb.seccion}] ${kb.pregunta}\nA: ${kb.plus}\nA evitar: ${kb.menos}`,
            )
            .join("\n\n") +
          "\n\n";
      }
      if (contextChunks && contextChunks.length > 0) {
        ragContext +=
          "### DOCUMENTACIÓN GENERAL:\n" +
          contextChunks.map((c: any) => c.content).join("\n\n");
      }
      ragContext = ragContext.trim();

      // Fetch personality mode from Supabase config (non-blocking, default 'medio')
      let personalityMode: PersonalityMode = "medio";
      try {
        const { data: config } = await supabase
          .from("tito_config")
          .select("mode")
          .eq("id", 1)
          .single();
        if (config?.mode) personalityMode = config.mode as PersonalityMode;
      } catch {
        // keep default
      }
      const personalityModifier = getPersonalityModifier(personalityMode);

      const conversationPrompt = `
Eres TitoBits, el asistente comercial de TAEC — empresa líder en tecnología de aprendizaje corporativo en México y LATAM.
Resuelves preguntas sobre productos e-learning (Articulate 360, Vyond, Moodle, Totara, LYS, OttoLearn, Proctorizer).

REGLAS:
${rulesContext}

${personalityModifier}

CONTEXTO DE LA BASE DE CONOCIMIENTO:
${ragContext || "No se encontró contexto relevante."}

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

    // Guardar siempre las señales acumuladas y score, incluso si no hubo handoff
    if (!handoffTipo) {
      const { error: upsertError } = await supabase.from("tito_leads").upsert(
        [
          {
            session_id: sessionId,
            score: score,
            accumulated_signals: mergedSignals,
          },
        ],
        { onConflict: "session_id" },
      );
      if (upsertError) {
        console.error("Fallo persistiendo accumulated_signals:", upsertError);
      }
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
