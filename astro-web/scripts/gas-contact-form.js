/**
 * TAEC — Google Apps Script: Contact Form Handler
 * ─────────────────────────────────────────────────────────────────────────────
 * Recibe el POST del formulario /contacto, guarda el lead en Google Sheets
 * y envía una notificación interna por correo.
 *
 * CÓMO USAR:
 *   1. Abrir https://script.google.com → Nuevo proyecto
 *   2. Pegar este archivo completo (reemplazar el contenido vacío)
 *   3. Editar la sección CONFIG con tus valores reales
 *   4. Desplegar como Web App (instrucciones al final del archivo)
 *   5. Copiar la URL del despliegue → src/data/contact.ts → formEndpoint
 *
 * Compatibilidad: Frontend astro-web envía JSON con Content-Type: text/plain;charset=utf-8
 *   → evita el preflight OPTIONS que GAS no maneja. El body sigue siendo JSON válido;
 *     GAS lo parsea en e.postData.contents con JSON.parse().
 */

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURACIÓN — editar antes de desplegar
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
	/**
	 * ID de la Google Sheet donde se guardarán los leads.
	 * Se obtiene de la URL de la hoja:
	 *   https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit
	 */
	SHEET_ID: "TU_GOOGLE_SHEET_ID",

	/** Nombre exacto de la pestaña (tab) dentro de la hoja */
	SHEET_TAB: "Leads",

	/**
	 * Correo(s) que recibirán la notificación interna.
	 * Para múltiples destinatarios: 'a@taec.com.mx, b@taec.com.mx'
	 */
	NOTIFY_EMAIL: "info@taec.com.mx",

	/** Prefijo del asunto del correo de notificación */
	EMAIL_SUBJECT_PREFIX: "[TAEC Lead]",

	// ──────────────────────────────────────────────────────────────
	// ZOHO CRM — Integración futura
	// ──────────────────────────────────────────────────────────────
	// Cuando esté listo:
	//   1. Cambiar enabled: true
	//   2. Obtener token desde Zoho Developer Console
	//   3. Verificar el módulo correcto (Leads, Contacts, etc.)
	//   4. Redesplegar la Web App
	ZOHO_CRM: {
		enabled: false,
		// apiUrl:  'https://www.zohoapis.com/crm/v2/Leads',
		// token:   'TU_ZOHO_ACCESS_TOKEN',   // Zoho OAuth access token
		// module:  'Leads',
	},
};

// ═══════════════════════════════════════════════════════════════════════════
// ENCABEZADOS DE HOJA — orden exacto de columnas
// ═══════════════════════════════════════════════════════════════════════════

const SHEET_HEADERS = [
	"Fecha",
	"Nombre",
	"Empresa",
	"Correo",
	"Teléfono",
	"País",
	"Interés",
	"Mensaje",
	"Página origen",
	"CTA origen",
];

// ═══════════════════════════════════════════════════════════════════════════
// PUNTO DE ENTRADA — doPost(e)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Recibe el POST del frontend.
 * El frontend envía Content-Type: text/plain;charset=utf-8 (evita preflight CORS).
 * El body es JSON puro → parseable con JSON.parse(e.postData.contents).
 */
function doPost(e) {
	// Respuesta base (siempre incluye encabezado CORS)
	let response;

	try {
		// ── 1. Parsear el payload JSON
		if (!e || !e.postData || !e.postData.contents) {
			return jsonResponse(
				{ success: false, error: "Payload vacío o malformado." },
				400,
			);
		}

		let data;
		try {
			data = JSON.parse(e.postData.contents);
		} catch (_) {
			return jsonResponse({ success: false, error: "JSON inválido." }, 400);
		}

		// ── 2. Validación mínima del lado del servidor
		const validationError = validatePayload(data);
		if (validationError) {
			return jsonResponse({ success: false, error: validationError }, 422);
		}

		// ── 3. Guardar en Google Sheets
		appendToSheet(data);

		// ── 4. Enviar correo de notificación interna
		sendInternalEmail(data);

		// ── 5. Integración con Zoho CRM (opcional / futura)
		if (CONFIG.ZOHO_CRM.enabled) {
			pushToZohoCRM(data);
		}

		// ── 6. Respuesta de éxito
		return jsonResponse(
			{ success: true, message: "Lead registrado correctamente." },
			200,
		);
	} catch (err) {
		// Error inesperado — registrar en el log de Apps Script y responder
		console.error("doPost error:", err.message, err.stack);
		return jsonResponse(
			{ success: false, error: "Error interno del servidor." },
			500,
		);
	}
}

// ═══════════════════════════════════════════════════════════════════════════
// VALIDACIÓN
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Valida los campos mínimos requeridos.
 * @returns {string|null} Mensaje de error, o null si todo es válido.
 */
function validatePayload(data) {
	if (!data.nombre || !String(data.nombre).trim()) {
		return "El campo nombre es requerido.";
	}
	if (!data.correo || !isValidEmail(String(data.correo).trim())) {
		return "El campo correo es requerido y debe ser un email válido.";
	}
	if (!data.mensaje || !String(data.mensaje).trim()) {
		return "El campo mensaje es requerido.";
	}
	return null; // válido
}

/**
 * Validación básica de formato de email.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ═══════════════════════════════════════════════════════════════════════════
// GOOGLE SHEETS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Escribe el lead como nueva fila en la hoja configurada.
 * Si la hoja no existe o está vacía, escribe los encabezados automáticamente.
 */
function appendToSheet(data) {
	const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
	let sheet = ss.getSheetByName(CONFIG.SHEET_TAB);

	// Crear la pestaña si no existe
	if (!sheet) {
		sheet = ss.insertSheet(CONFIG.SHEET_TAB);
	}

	// Escribir encabezados si la hoja está vacía
	if (sheet.getLastRow() === 0) {
		sheet.appendRow(SHEET_HEADERS);
		sheet.getRange(1, 1, 1, SHEET_HEADERS.length).setFontWeight("bold");
		sheet.setFrozenRows(1);
	}

	// Fila del lead — mismo orden que SHEET_HEADERS
	const row = [
		new Date(), // Fecha
		sanitize(data.nombre), // Nombre
		sanitize(data.empresa), // Empresa
		sanitize(data.correo), // Correo
		sanitize(data.telefono), // Teléfono
		sanitize(data.pais), // País
		sanitize(data.interes), // Interés
		sanitize(data.mensaje), // Mensaje
		sanitize(data.pagina_origen), // Página origen
		sanitize(data.cta_origen), // CTA origen
	];

	sheet.appendRow(row);

	// Formato: fecha legible en columna A
	const lastRow = sheet.getLastRow();
	const dateCell = sheet.getRange(lastRow, 1);
	dateCell.setNumberFormat("dd/mm/yyyy hh:mm");
}

// ═══════════════════════════════════════════════════════════════════════════
// CORREO INTERNO
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Envía notificación interna con los datos del lead.
 */
function sendInternalEmail(data) {
	const subject =
		CONFIG.EMAIL_SUBJECT_PREFIX +
		" " +
		sanitize(data.nombre) +
		" — " +
		sanitize(data.interes || "Sin tema") +
		" (" +
		sanitize(data.pais || "?") +
		")";

	const body = buildEmailBody(data);

	MailApp.sendEmail({
		to: CONFIG.NOTIFY_EMAIL,
		subject: subject,
		htmlBody: body,
	});
}

/**
 * Construye el HTML del correo de notificación interna.
 */
function buildEmailBody(data) {
	const fecha = Utilities.formatDate(
		new Date(),
		"America/Mexico_City",
		"dd/MM/yyyy HH:mm",
	);

	return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1e293b;">
      <div style="background:#0f3460;padding:24px 28px;border-radius:8px 8px 0 0;">
        <h1 style="color:white;margin:0;font-size:20px;">📩 Nuevo lead — TAEC</h1>
        <p style="color:#94A3B8;margin:4px 0 0;font-size:13px;">${fecha} · ${sanitize(data.pagina_origen || "/contacto")}</p>
      </div>

      <div style="background:white;padding:28px;border:1px solid #e2e8f0;border-top:none;">

        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-weight:600;width:140px;color:#64748b;">Nombre</td>
            <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">${sanitize(data.nombre)}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-weight:600;color:#64748b;">Empresa</td>
            <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">${sanitize(data.empresa) || "—"}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-weight:600;color:#64748b;">Correo</td>
            <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
              <a href="mailto:${sanitize(data.correo)}" style="color:#3179c2;">${sanitize(data.correo)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-weight:600;color:#64748b;">Teléfono</td>
            <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">${sanitize(data.telefono) || "—"}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-weight:600;color:#64748b;">País</td>
            <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">${sanitize(data.pais) || "—"}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-weight:600;color:#64748b;">Interés</td>
            <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-weight:700;color:#0f3460;">${sanitize(data.interes) || "—"}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-weight:600;color:#64748b;">CTA origen</td>
            <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:12px;color:#94A3B8;">${sanitize(data.cta_origen) || "—"}</td>
          </tr>
        </table>

        <div style="background:#f8fafc;border-radius:8px;padding:16px;margin-top:20px;">
          <p style="font-weight:600;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Mensaje</p>
          <p style="margin:0;line-height:1.6;font-size:14px;">${sanitize(data.mensaje).replace(/\n/g, "<br>")}</p>
        </div>

        <div style="margin-top:24px;text-align:center;">
          <a href="mailto:${sanitize(data.correo)}"
             style="display:inline-block;background:#f97316;color:white;font-weight:700;font-size:14px;padding:12px 28px;border-radius:8px;text-decoration:none;">
            Responder a ${sanitize(data.nombre)} →
          </a>
        </div>
      </div>

      <div style="padding:16px 28px;font-size:11px;color:#94A3B8;text-align:center;">
        TAEC · Lead registrado automáticamente desde el sitio web
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════════════════════
// ZOHO CRM — INTEGRACIÓN FUTURA
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Envía el lead a Zoho CRM como nuevo registro en el módulo Leads.
 *
 * HABILITACIÓN:
 *   1. Cambiar CONFIG.ZOHO_CRM.enabled = true
 *   2. Obtener un Access Token de Zoho:
 *      → Zoho Developer Console → OAuth → "Zoho CRM" scope: ZohoCRM.modules.leads.CREATE
 *   3. Completar CONFIG.ZOHO_CRM.apiUrl y token
 *   4. Ajustar el mapeo de campos según tu configuración de módulo
 *   5. Redesplegar la Web App
 *
 * Para producción: usar Zoho OAuth + refresh token, no un token estático.
 */
function pushToZohoCRM(data) {
	/* ── PUNTO DE INTEGRACIÓN ZOHO CRM ──
  const payload = {
    data: [{
      Last_Name:   sanitize(data.nombre),
      Company:     sanitize(data.empresa)  || 'N/A',
      Email:       sanitize(data.correo),
      Phone:       sanitize(data.telefono) || '',
      Lead_Source: 'Sitio Web',
      Description: sanitize(data.mensaje),
      // Campos personalizados si los tienes en tu módulo:
      // Pais__c:   sanitize(data.pais),
      // Interes__c: sanitize(data.interes),
    }]
  };

  const options = {
    method:      'post',
    contentType: 'application/json',
    headers:     { 'Authorization': 'Zoho-oauthtoken ' + CONFIG.ZOHO_CRM.token },
    payload:     JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  const res  = UrlFetchApp.fetch(CONFIG.ZOHO_CRM.apiUrl, options);
  const json = JSON.parse(res.getContentText());

  if (json.data && json.data[0].code !== 'SUCCESS') {
    console.warn('Zoho CRM: lead no creado —', JSON.stringify(json));
  }
  ── FIN INTEGRACIÓN ZOHO */
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILIDADES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Limpia y convierte un valor a string seguro.
 * Previene inyección de fórmulas en Google Sheets (valores que empiezan con = + - @).
 */
function sanitize(value) {
	if (value === null || value === undefined) return "";
	const str = String(value).trim();
	// Prevenir inyección de fórmulas en celdas de Sheets
	if (["+", "-", "=", "@"].includes(str[0])) {
		return "'" + str;
	}
	return str;
}

/**
 * Construye una respuesta JSON con encabezados CORS.
 *
 * NOTA CORS:
 *   Google Apps Script Web Apps devuelven Access-Control-Allow-Origin: *
 *   automáticamente cuando se despliegan con acceso "Cualquier persona".
 *   Si el frontend recibe errores de CORS, verificar:
 *     a) El despliegue es "Cualquier persona" (no "Cualquier persona con cuenta de Google")
 *     b) La URL usada es la del despliegue actual, no la de edición
 *     c) El navegador no está bloqueando por política de empresa
 *
 * @param {object} data  - Objeto a serializar como JSON
 * @param {number} _code - Código HTTP (informativo; GAS siempre devuelve 200)
 */
function jsonResponse(data, _code) {
	return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
		ContentService.MimeType.JSON,
	);
}

// ═══════════════════════════════════════════════════════════════════════════
// TEST LOCAL — ejecutar manualmente desde el editor de Apps Script
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Simula una llamada de doPost con datos de prueba.
 * Seleccionar esta función en el menú "Función a ejecutar" y presionar ▶ Ejecutar.
 * Verificar en la hoja y en el correo que todo llegó correctamente.
 */
function testDoPost() {
	const mockPayload = {
		nombre: "Ana García",
		empresa: "Empresa Prueba SA",
		correo: "ana@prueba.com",
		telefono: "+52 55 9999 0000",
		pais: "México",
		interes: "Articulate 360",
		mensaje:
			"Prueba de integración del formulario TAEC. Necesito información sobre licencias.",
		pagina_origen: "/contacto",
		cta_origen: "formulario-contacto",
	};

	const mockEvent = {
		postData: {
			contents: JSON.stringify(mockPayload),
			type: "text/plain;charset=utf-8", // refleja el Content-Type real del frontend
		},
	};

	const result = doPost(mockEvent);
	console.log("Respuesta:", result.getContent());
}
