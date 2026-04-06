import type { APIRoute } from 'astro';
import { google } from 'googleapis';
import { z } from 'zod';

export const prerender = false;

// Configuración Zod para limpiar payloads del cliente
const ContactSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio').max(150),
  empresa: z.string().min(1, 'La empresa es obligatoria').max(150),
  correo: z.string().email('Debe ser un correo válido').max(150),
  telefono: z.string().max(50).optional().default(''),
  pais: z.string().min(1, 'El país es obligatorio').max(100),
  interes: z.string().min(1, 'El interés es obligatorio').max(150),
  mensaje: z.string().max(2000).optional().default(''),
  pagina_origen: z.string().max(500).optional().default(''),
  cta_origen: z.string().max(200).optional().default('')
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const rawBody = await request.text();
    if (!rawBody) {
      return new Response(JSON.stringify({ error: 'Payload vacío' }), { status: 400 });
    }

    const jsonBody = JSON.parse(rawBody);
    const result = ContactSchema.safeParse(jsonBody);

    if (!result.success) {
      // Retornar error descriptivo si envían garbage
      return new Response(JSON.stringify({ 
        error: 'Valores del formulario inválidos', 
        details: result.error.format() 
      }), { status: 400 });
    }

    const d = result.data;

    // Obtener credenciales del sistema (Netlify / Node)
    const clientEmail = import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    // CRÍTICO: Reemplazar los saltos de línea literales \n (usados comúnmente en contenedores)
    const privateKeyRaw = import.meta.env.GOOGLE_PRIVATE_KEY || process.env.GOOGLE_PRIVATE_KEY;
    const privateKey = privateKeyRaw ? privateKeyRaw.replace(/\\n/g, '\n') : '';

    const sheetId = import.meta.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEET_ID;
    
    // Si la tab tiene un nombre distinto a 'Leads', cámbialo en tus ENV.
    const tabName = import.meta.env.GOOGLE_SHEETS_TAB_NAME || process.env.GOOGLE_SHEETS_TAB_NAME || 'Leads';

    if (!clientEmail || !privateKey || !sheetId) {
      console.error('[API Contacto] Faltan variables de entorno para Google Sheets.');
      // Lanzamos Error 500 simulando falla para que actúe el Catch de fallback
      return new Response(JSON.stringify({ error: 'Configuración incompleta en el servidor.' }), { status: 500 });
    }

    // Instanciar el API de Google
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const timestamp = new Date().toISOString();

    // Estructura oficial del Array (Coincide con [timestamp, nombre, empresa, correo, telefono, pais, interes, mensaje, pagina_origen, cta_origen])
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
      d.cta_origen
    ];

    // Inyectar Fila (Append)
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${tabName}!A:J`, // Asume que la tabla empieza en A y llega hasta J
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowValues],
      },
    });

    return new Response(JSON.stringify({ success: true }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });

  } catch (err: any) {
    console.error("[CATCH API Contacto] Hubo un error procesando el guardado:", err.message || err);
    // Disparamos Status 500 para activar forzosamente el catch del frontend en caso de timeout
    // Ocultamos el mensaje interno para no fugar información crítica confidencial del Stack
    return new Response(JSON.stringify({ error: 'Hubo un error interno o timeout con el servidor de guardado (500).' }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
};
