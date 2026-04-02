import { Resend } from 'resend';
import type { APIRoute } from 'astro';

export const prerender = false;

// Idempotency cache (Memory)
const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_MS = 60000; // 60 seconds

export const POST: APIRoute = async ({ request }) => {
  try {
    const rawBody = await request.text();
    if (!rawBody || rawBody.length > 5000) {
      return new Response(JSON.stringify({ error: 'Payload body vacío o demasiado grande.' }), { status: 413 });
    }
    
    const { email, scores, winningPlatform } = JSON.parse(rawBody);

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Email inválido.' }), { status: 400 });
    }

    // Rate Limiting Check (Anti-Doble Submit)
    const now = Date.now();
    for (const [k, v] of recentSubmissions.entries()) {
      if (now - v > RATE_LIMIT_MS) recentSubmissions.delete(k);
    }
    
    if (recentSubmissions.has(email)) {
      // Simulate success to not block the frontend flow, but actually skip resend!
      console.log(`[Idempotency] Request duplicate skipped for: ${email}`);
      return new Response(JSON.stringify({ success: true, cached: true }), { status: 200 });
    }
    
    // Register submission
    recentSubmissions.set(email, now);

    const escapeHtml = (str: string) => {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    let resendKey = undefined;
    if (typeof process !== 'undefined' && process.env) {
      resendKey = process.env.RESEND_API_KEY;
    }
    if (!resendKey) {
      const keyR = 'RESEND_API_KEY';
      resendKey = (import.meta.env as Record<string, string | undefined>)[keyR];
    }

    if (!resendKey) {
      return new Response(JSON.stringify({ error: 'No Resend API Key found' }), { status: 500 });
    }

    const resend = new Resend(resendKey);

    const emailHtml = '<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">' +
      '<h2 style="color: #0A7A70;">Nuevo Lead: Diagnóstico de Aprendizaje TAEC</h2>' +
      '<p>Un visitante ha completado el diagnóstico y está siendo transferido a TitoBits.</p>' +
      '<hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />' +
      '<p><strong>Email Institucional:</strong> ' + escapeHtml(email) + '</p>' +
      '<p><strong>Plataforma Resultante:</strong> <span style="color:#D95A1E; font-weight:bold;">' + escapeHtml(winningPlatform) + '</span></p>' +
      '<h3 style="color: #004775; margin-top: 20px;">Puntaje Dimensional:</h3>' +
      '<ul style="line-height: 1.6;">' +
      '<li><strong>Totara (Enterprise):</strong> ' + scores.totara + ' pts</li>' +
      '<li><strong>Moodle (Flexibilidad):</strong> ' + scores.moodle + ' pts</li>' +
      '<li><strong>Reach 360 (Arranque rápido):</strong> ' + scores.reach360 + ' pts</li>' +
      '<li><strong>NetExam/PIFINI (Certificación externa):</strong> ' + scores.netexam + ' pts</li>' +
      '</ul>' +
      '<p style="margin-top: 20px; font-size: 12px; color: #666;">El lead se encuentra ahora mismo interactuando con TitoBits para armar su Business Case.</p>' +
      '</div>';

    const { data, error } = await resend.emails.send({
      from: 'Tito Bits (Diagnóstico) <onboarding@resend.dev>',
      to: ['smasmoudi@taec.com.mx'], 
      subject: `Lead Diagnóstico TAEC: ${escapeHtml(winningPlatform)} (${escapeHtml(email)})`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend API Denied the Request:", error);
      return new Response(JSON.stringify({ error: 'Fallo al despachar la notificación.' }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (error: any) {
    console.error("Crash local generando o enviando email (Diagnóstico):", error);
    return new Response(JSON.stringify({ error: 'Error Interno del Servidor.' }), { status: 500 });
  }
};
