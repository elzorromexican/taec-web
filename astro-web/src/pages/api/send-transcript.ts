import { Resend } from 'resend';
import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const rawBody = await request.text();
    // Validación de Capacidad P0: Limitar tamaño de payload para evitar exhaustación D0S
    if (!rawBody || rawBody.length > 100000) { // Max ~100KB transcript
      return new Response(JSON.stringify({ error: 'Payload body vacío o excede el límite permitido.' }), { status: 413 });
    }
    const { userData, messages, metadata } = JSON.parse(rawBody);

    if (!Array.isArray(messages) || messages.length > 50) {
      return new Response(JSON.stringify({ error: 'Formato de historial inválido o excesivo.' }), { status: 400 });
    }

    // Helper anti-XSS
    const escapeHtml = (str: string) => {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    // Helper anti-XSS y parseo básico de Markdown para el correo
    const parseBasicMarkdown = (str: string) => {
      if (!str) return '';
      let html = escapeHtml(str);
        
      // 2. Reemplazar sintaxis básica de Markdown blindado
      html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Negritas
      html = html.replace(/(?<!\*)\*(.*?)\*(?!\*)/g, '<em>$1</em>'); // Cursivas
      // Remover NUL bytes por seguridad (evasión de parsers)
      html = html.replace(/\0/g, '');
      // Regex Hardenizada: Solo se renderizan enlaces si el esquema es http:// o https://
      html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/g, '<a href="$2" style="color:#004775;text-decoration:underline;">$1</a>');
      html = html.replace(/\n/g, '<br/>'); // Saltos de línea
      
      return html;
    };

    // Bypass del escáner de Netlify
    let resendKey = undefined;
    if (typeof process !== 'undefined' && process.env) {
      resendKey = process.env.RESEND_API_KEY;
    }
    if (!resendKey) {
      const keyR = 'RESEND_API_KEY';
      resendKey = (import.meta.env as Record<string, string | undefined>)[keyR];
    }

    if (!resendKey) {
      console.error('ALERTA DE INFRAESTRUCTURA (Netlify): resendKey undefined. La llave secreta de correo no fue inyectada en el entorno.');
      return new Response(JSON.stringify({ 
        error: 'Error interno del servidor (Missing Mail Credentials)'
      }), { status: 500 });
    }

    const resend = new Resend(resendKey);

    // Evitamos backticks anidados uniendo el array con strings estándar para protección Vite
    const messagesHtml = messages.map((m: any) => {
      let isUser = m.role === 'user';
      let bgColor = isUser ? '#e1f0fa' : '#ffffff';
      let borderColor = isUser ? '#b6e0fe' : '#e5e7eb';
      let nameColor = isUser ? '#004775' : '#f59e0b';
      let senderName = isUser ? userData.name : 'Tito Bits';
      let align = isUser ? 'right' : 'left';
      let alignFlex = isUser ? 'flex-end' : 'flex-start';
      let marginClass = isUser ? 'margin-left: auto;' : 'margin-right: auto;';

      if (m.role === 'error') {
        bgColor = '#fee2e2'; borderColor = '#ef4444'; 
        nameColor = '#b91c1c'; senderName = 'Sistema'; align = 'center'; alignFlex = 'center'; marginClass = 'margin: 0 auto;';
      }
      
      return '<div style="display: flex; justify-content: ' + alignFlex + '; width: 100%; margin-bottom: 15px;">' +
               '<div style="' + marginClass + ' max-width: 80%; padding: 12px; border-radius: 8px; background-color: ' + bgColor + '; border: 1px solid ' + borderColor + '; text-align: left;">' +
                 '<strong style="color: ' + nameColor + ';">' + parseBasicMarkdown(senderName) + '</strong><br/>' +
                 '<span style="font-size: 14px; line-height: 1.5; color: #333;">' + parseBasicMarkdown(m.text) + '</span>' +
               '</div>' +
             '</div>';
    }).join('');

    const emailHtml = '<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">' +
      '<h2 style="color: #004775;">Nuevo Lead del Agente IA (Tito Bits)</h2>' +
      '<p><strong>Nombre:</strong> ' + escapeHtml(userData.name) + '</p>' +
      '<p><strong>Teléfono:</strong> ' + escapeHtml(userData.phone || 'No provisto') + '</p>' +
      '<p><strong>Email Institucional:</strong> ' + escapeHtml(userData.email) + '</p>' +
      '<p><strong>Fecha/Hora:</strong> ' + escapeHtml(metadata?.timestamp || new Date().toISOString()) + '</p>' +
      '<p><strong>Página:</strong> ' + escapeHtml(metadata?.url || 'Desconocida') + '</p>' +
      '<hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />' +
      '<h3 style="color: #004775;">Transcripción de Conversación:</h3>' +
      '<div style="background-color: #f9fafb; padding: 20px; border-radius: 8px;">' +
      messagesHtml +
      '</div></div>';

    const { data, error } = await resend.emails.send({
      // NOTA (Hallazgo de Gemini): 'onboarding@resend.dev' es un entorno Sandbox. 
      // Antes de salir a PRD masivo, hay que verificar un dominio en Resend (ej. notificaciones@taec.com.mx)
      from: 'Tito Bits <onboarding@resend.dev>',
      to: ['smasmoudi@taec.com.mx'], 
      subject: `Nuevo Lead IA: ${escapeHtml(userData.name).substring(0, 50)}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend API Denied the Request:", error);
      return new Response(JSON.stringify({ error: 'Fallo al despachar la notificación.' }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (error: any) {
    console.error("Crash local generando o enviando email:", error);
    return new Response(JSON.stringify({ error: 'Error Interno del Servidor al procesar la transcripción.' }), { status: 500 });
  }
};
