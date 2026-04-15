import type { APIRoute } from "astro";
import crypto from "crypto";
import { google } from "googleapis";
import { Resend } from "resend";
import { z } from "zod";

export const prerender = false;

// Configuración Zod para limpiar payloads del cliente
const ContactSchema = z.object({
	nombre: z.string().min(1, "El nombre es obligatorio").max(150),
	empresa: z.string().min(1, "La empresa es obligatoria").max(150),
	correo: z.string().email("Debe ser un correo válido").max(150),
	telefono: z.string().max(50).optional().default(""),
	pais: z.string().min(1, "El país es obligatorio").max(100),
	interes: z.string().min(1, "El interés es obligatorio").max(150),
	mensaje: z.string().max(2000).optional().default(""),
	pagina_origen: z.string().max(500).optional().default(""),
	cta_origen: z.string().max(200).optional().default(""),
});

export const POST: APIRoute = async ({ request }) => {
	let transactionId = "TX-PENDING";
	if (typeof crypto.randomUUID === "function") {
		transactionId = crypto.randomUUID();
	} else {
		transactionId = Math.random().toString(36).substring(2, 15);
	}

	let d: z.infer<typeof ContactSchema> | null = null;

	try {
		const rawBody = await request.text();
		if (!rawBody) {
			return new Response(JSON.stringify({ error: "Payload vacío" }), {
				status: 400,
			});
		}

		const jsonBody = JSON.parse(rawBody);
		const result = ContactSchema.safeParse(jsonBody);

		if (!result.success) {
			// Retornar error descriptivo si envían garbage
			return new Response(
				JSON.stringify({
					error: "Valores del formulario inválidos",
					details: result.error.format(),
				}),
				{ status: 400 },
			);
		}

		d = result.data;

		// Obtener credenciales del sistema (Netlify / Node)
		const clientEmail =
			import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
			process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
		// CRÍTICO: Reemplazar los saltos de línea literales \n (usados comúnmente en contenedores)
		const privateKeyRaw =
			import.meta.env.GOOGLE_PRIVATE_KEY || process.env.GOOGLE_PRIVATE_KEY;
		const privateKey = privateKeyRaw ? privateKeyRaw.replace(/\\n/g, "\n") : "";

		const sheetId =
			import.meta.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEET_ID;

		// Si la tab tiene un nombre distinto a 'Leads', cámbialo en tus ENV.
		const tabName =
			import.meta.env.GOOGLE_SHEETS_TAB_NAME ||
			process.env.GOOGLE_SHEETS_TAB_NAME ||
			"Leads";

		if (!clientEmail || !privateKey || !sheetId) {
			console.error(
				`[API Contacto] Faltan variables de entorno para Google Sheets. TX_ID: ${transactionId}`,
			);
			// Lanzamos Error para que actúe el Catch de fallback
			throw new Error("Missing Google Sheets Config");
		}

		// Instanciar el API de Google
		const auth = new google.auth.GoogleAuth({
			credentials: {
				client_email: clientEmail,
				private_key: privateKey,
			},
			scopes: ["https://www.googleapis.com/auth/spreadsheets"],
		});

		const sheets = google.sheets({ version: "v4", auth });
		const timestamp = new Date().toISOString();

		// Estructura oficial del Array
		const rowValues = [
			timestamp,
			d.nombre,
			d.empresa,
			d.correo,
			d.telefono,
			d.pais,
			d.interes,
			d.mensaje,
			d.pagina_origen,
			d.cta_origen,
		];

		// Inyectar Fila (Append)
		const sheetAppendPromise = sheets.spreadsheets.values.append({
			spreadsheetId: sheetId,
			range: `${tabName}!A:J`, // Asume que la tabla empieza en A y llega hasta J
			valueInputOption: "USER_ENTERED",
			requestBody: {
				values: [rowValues],
			},
		});

		// Timeout Promise explicit rejection
		const timeoutPromise = new Promise<never>((_, reject) =>
			setTimeout(() => reject(new Error("TIMEOUT_GOOGLE_SHEETS")), 5000),
		);

		await Promise.race([sheetAppendPromise, timeoutPromise]);

		return new Response(
			JSON.stringify({ success: true, tx_id: transactionId }),
			{
				status: 200,
				headers: { "Content-Type": "application/json" },
			},
		);
	} catch (err: any) {
		const errorMsg = err.message || "Error Desconocido";
		console.error(
			`[CATCH API Contacto] Error procesando el guardado en Sheets. TX_ID: ${transactionId} | Detalles:`,
			errorMsg,
		);

		// BACKUP DE EMERGENCIA
		if (d) {
			let resendKey;
			if (typeof process !== "undefined" && process.env) {
				resendKey = process.env.RESEND_API_KEY;
			}
			if (!resendKey) {
				const keyR = "RESEND_API_KEY";
				resendKey = (import.meta.env as Record<string, string | undefined>)[
					keyR
				];
			}

			if (resendKey) {
				try {
					const resend = new Resend(resendKey);
					const escapeHtml = (str: string) =>
						String(str).replace(/[&<>"']/g, (match) => {
							const escape: any = {
								"&": "&amp;",
								"<": "&lt;",
								">": "&gt;",
								'"': "&quot;",
								"'": "&#039;",
							};
							return escape[match];
						});

					const emailHtml = `<div style="font-family: Arial, sans-serif; color: #333;">
             <h2 style="color: #ef4444;">🚨 BACKUP DE EMERGENCIA: Lead Recuperado</h2>
             <p>Falló el envío nativo a Google Sheets (${escapeHtml(errorMsg)}). Se aplicó el rescate automático por correo.</p>
             <p><strong>ID de Transacción (Telemetría):</strong> ${transactionId}</p>
             <hr />
             <p><strong>Nombre:</strong> ${escapeHtml(d.nombre)}</p>
             <p><strong>Empresa:</strong> ${escapeHtml(d.empresa)}</p>
             <p><strong>Correo:</strong> ${escapeHtml(d.correo)}</p>
             <p><strong>Teléfono:</strong> ${escapeHtml(d.telefono)}</p>
             <p><strong>País:</strong> ${escapeHtml(d.pais)}</p>
             <p><strong>Interés:</strong> ${escapeHtml(d.interes)}</p>
             <p><strong>Mensaje:</strong> ${escapeHtml(d.mensaje)}</p>
             <p><strong>Origen:</strong> ${escapeHtml(d.pagina_origen)} | <strong>CTA:</strong> ${escapeHtml(d.cta_origen)}</p>
           </div>`;

					await resend.emails.send({
						from: "DevOps TAEC <onboarding@resend.dev>",
						to: ["smasmoudi@taec.com.mx"],
						subject: `🚨 LEAD RESCATADO (${escapeHtml(d.nombre)}) - Sheets Caído`,
						html: emailHtml,
					});
					console.log(
						`[Backup Enviado] El lead ${d.nombre} fue rescatado y enviado por Resend exitosamente. TX_ID: ${transactionId}`,
					);
				} catch (resendError) {
					console.error(
						`[CRÍTICO] Falló Google Sheets Y Falló Resend. Lead en riesgo. TX_ID: ${transactionId}`,
						resendError,
					);
				}
			} else {
				console.error(
					`[CRÍTICO] No se encontró RESEND_API_KEY para ejecutar el Backup del Lead. TX_ID: ${transactionId}`,
				);
			}
		}

		// Disparamos Status 500 para activar el catch del frontend, pero devolvemos una Ref para soporte
		return new Response(
			JSON.stringify({
				error: `Hubo un error interno al conectar con el CRM de reportes. Ref: ${transactionId}`,
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);
	}
};
