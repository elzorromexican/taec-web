/**
 * @name handoff.ts
 * @version 1.0
 * @description Funciones para generar mini briefs de leads y notificar vía Webhook y Correo (Resend).
 * @inputs Record del lead estructurado
 * @outputs Promesa vacía o respuesta de la API de comunicación.
 * @dependencies node-fetch / native fetch
 * @created 2026-04-11
 * @updated 2026-04-11 12:12:00
 */

interface LeadData {
  id: string;
  session_id: string;
  email: string | null;
  nombre: string | null;
  empresa: string | null;
  score: number;
  minibrief: string | null;
  handoff_tipo: 'ventas' | 'preventa_tecnica';
}

/**
 * Sintetiza la razón y estado del lead al momento del handoff. 
 */
export function generarMiniBrief(mensajes: {role: string, content: string}[]): string {
  const userMessages = mensajes.filter(m => m.role === 'user').map(m => m.content);
  return `Historial resumido (${userMessages.length} iteraciones). Última interacción: "${userMessages.pop() || 'N/A'}"`;
}

/**
 * Dispara notificaciones asíncronas a los canales correspondientes (Ventas o Preventa Técnica).
 */
export async function enviarNotificacion(lead: LeadData) {
  const resendKey = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;
  const webhookUrl = import.meta.env.GOOGLE_CHAT_WEBHOOK_URL || process.env.GOOGLE_CHAT_WEBHOOK_URL;
  const ventasEmail = import.meta.env.VENTAS_EMAIL || process.env.VENTAS_EMAIL || 'info@taec.com.mx';

  // 1. Notificación a Google Chat
  if (webhookUrl) {
    const chatMessage = {
      text: `🚨 *Nuevo Lead Calificado (${lead.handoff_tipo})*\n*Score:* ${lead.score}\n*ID Sesión:* ${lead.session_id}\n*Empresa:* ${lead.empresa || 'N/A'}\n*Email:* ${lead.email || 'Pendiente'}\n*Brief:* ${lead.minibrief}`
    };
    
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(chatMessage)
    }).catch(err => console.error("Error enviando Webhook de Chat:", err));
  }

  // 2. Correo de Ventas vía Resend
  if (resendKey) {
    const resendPayload = {
      from: 'TitoBits <leads@taec.com.mx>',
      to: [ventasEmail],
      subject: `Nuevo Lead TitoBits [SCORE: ${lead.score}] - ${lead.empresa || lead.email || 'Anónimo'}`,
      html: `
        <h2>Nuevo Lead de TitoBits v2</h2>
        <ul>
          <li><strong>Handoff:</strong> ${lead.handoff_tipo}</li>
          <li><strong>Score:</strong> ${lead.score}</li>
          <li><strong>Empresa:</strong> ${lead.empresa || 'N/A'}</li>
          <li><strong>Contacto:</strong> ${lead.nombre || 'N/A'} (${lead.email || 'N/A'})</li>
          <li><strong>ID Sesión:</strong> ${lead.session_id}</li>
        </ul>
        <p><strong>Mini Brief:</strong><br/>${lead.minibrief}</p>
      `
    };

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resendPayload)
    }).catch(err => console.error("Error enviando notificacion Resend:", err));
  } else {
    console.warn("Falta RESEND_API_KEY. Notificación por correo (Resend) omitida. Google Chat fue invocado si su key existe.");
  }
}
