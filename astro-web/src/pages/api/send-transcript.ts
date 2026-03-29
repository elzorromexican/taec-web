import { Resend } from 'resend';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { userData, messages, metadata } = await request.json();

    const resendKey = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;

    if (!resendKey) {
      return new Response(JSON.stringify({ error: 'No Resend API Key found' }), { status: 500 });
    }

    const resend = new Resend(resendKey);

    // Evitamos backticks anidados uniendo el array con strings estándar para protección Vite
    const messagesHtml = messages.map((m: any) => {
      let bgColor = '#ffffff';
      let borderColor = '#e5e7eb';
      let nameColor = '#f59e0b';
      let senderName = 'Tito Bits';

      if (m.role === 'user') {
        bgColor = '#e1f0fa';
        borderColor = '#b6e0fe';
        nameColor = '#004775';
        senderName = userData.name;
      } else if (m.role === 'error') {
        bgColor = '#fee2e2';
        borderColor = '#ef4444';
        nameColor = '#b91c1c';
        senderName = '⚠️ Sistema Error / Intercepción';
      }
      
      return '<div style="margin-bottom: 15px; padding: 12px; border-radius: 8px; background-color: ' + bgColor + '; border: 1px solid ' + borderColor + ';">' +
               '<strong style="color: ' + nameColor + ';">' + senderName + ':</strong><br/>' +
               '<span style="font-size: 14px; line-height: 1.5;">' + m.text + '</span>' +
             '</div>';
    }).join('');

    const emailHtml = '<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">' +
      '<h2 style="color: #004775;">Nuevo Lead del Agente IA (Tito Bits) 🤖</h2>' +
      '<p><strong>Nombre:</strong> ' + userData.name + '</p>' +
      '<p><strong>Teléfono:</strong> ' + (userData.phone || 'No provisto') + '</p>' +
      '<p><strong>Email Institucional:</strong> ' + userData.email + '</p>' +
      '<p><strong>Hora Local:</strong> ' + metadata.time + ' (' + metadata.timeZone + ')</p>' +
      '<hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />' +
      '<h3 style="color: #004775;">Transcripción de Conversación:</h3>' +
      '<div style="background-color: #f9fafb; padding: 20px; border-radius: 8px;">' +
      messagesHtml +
      '</div></div>';

    const { data, error } = await resend.emails.send({
      from: 'Tito Bits <onboarding@resend.dev>',
      to: ['smasmoudi@taec.com.mx'], 
      subject: `Nuevo Lead IA: ${userData.name}`,
      html: emailHtml,
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to compile email' }), { status: 500 });
  }
};
