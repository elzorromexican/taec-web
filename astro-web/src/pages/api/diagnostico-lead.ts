/**
 * @name diagnostico-lead.ts
 * @version v1.2
 * @description Endpoint para procesar el formulario del Diagnóstico IA, enviar emails a usuario y backoffice.
 * @inputs Request body con email prospecto y array de scores.
 * @outputs Response JSON con success flag. Envía 2 emails vía Resend.
 * @dependencies resend, @upstash/redis, @upstash/ratelimit
 * @created 2024-03-01
 * @updated 2026-04-12 17:55:00
 */
import { Resend } from 'resend';
import type { APIRoute } from 'astro';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { PLATFORM_AXIS_ORDER } from '../../data/diagnosticoData';

export const prerender = false;

// Rate Limiting persistente via Upstash Redis (Sliding Window)
const redis = new Redis({
  url: import.meta.env.UPSTASH_REDIS_REST_URL,
  token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '60 s'), // 10 requests/IP por minuto (Diagnóstico transaccional)
  analytics: false,
  prefix: 'taec:diagnostico-lead',
});

// Idempotency cache (Memory) - Deuda Técnica a migrar a Redis a futuro
const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_MS = 60000; // 60 seconds

export const POST: APIRoute = async ({ request }) => {
  try {
    // 0. Rate Limiting Check por IP (Upstash Redis)
    let ip = request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip') || 'unknown_ip';
    if (ip.includes(',')) ip = ip.split(',')[0].trim();

    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return new Response(JSON.stringify({
        error: 'Demasiadas consultas en corto tiempo. Intenta de nuevo en unos minutos.'
      }), { status: 429, headers: { 'Retry-After': '60' } });
    }

    const rawBody = await request.text();
    if (!rawBody || rawBody.length > 12000) {
      return new Response(JSON.stringify({ error: 'Payload body vacío o demasiado grande.' }), { status: 413 });
    }
    
    const { email, stage, painProfile, platformScores, urgencyScore, winningPlatform } = JSON.parse(rawBody);

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Email inválido.' }), { status: 400 });
    }

    if (!platformScores || typeof platformScores !== 'object' || !painProfile || typeof painProfile !== 'object' || !winningPlatform) {
      return new Response(JSON.stringify({ error: 'Payload incompleto.' }), { status: 400 });
    }

    const safeUrgency = Number(urgencyScore);
    if (!isFinite(safeUrgency) || safeUrgency < 0 || safeUrgency > 100) {
      return new Response(JSON.stringify({ error: 'Payload inválido.' }), { status: 400 });
    }

    // Validate platformScores
    for (const [k, v] of Object.entries(platformScores)) {
      const pScore = Number(v);
      if (!isFinite(pScore) || pScore < 0 || pScore > 100) {
         return new Response(JSON.stringify({ error: 'Valor numérico inválido en platformScores.' }), { status: 400 });
      }
      platformScores[k] = pScore;
    }

    // Validate painProfile
    for (const [k, v] of Object.entries(painProfile)) {
      const pScore = Number(v);
      if (!isFinite(pScore) || pScore < 0 || pScore > 100) {
         return new Response(JSON.stringify({ error: 'Valor numérico inválido en painProfile.' }), { status: 400 });
      }
      painProfile[k] = pScore;
    }
    
    const axisLabels: Record<string, string> = {
      lms_corp: "Gestión Corporativa y Talento",
      lms_agil: "Despliegue Ágil y Microlearning",
      fabrica_ddc: "Fábrica de Contenido y STPS",
      lms_cert: "Certificación y Cumplimiento",
      eval_proctor: "Evaluación Segura (Proctoring)",
      vilt_zoom: "Formación en Vivo Síncrona",
      ecommerce: "Venta de Cursos (E-commerce)",
      tools_autor: "Herramientas de Autorización"
    };

    const sortedPlats = PLATFORM_AXIS_ORDER
      .map(p => ({ id: p as string, score: platformScores[p as keyof typeof platformScores] || 0 }))
      .sort((a, b) => b.score - a.score);

    const motorInicial = sortedPlats[0];
    const segundaCapa  = sortedPlats[1]?.score >= 40 ? sortedPlats[1] : null;

    const displayPlatform = [
      `${axisLabels[motorInicial.id] || motorInicial.id}`,
      segundaCapa ? `${axisLabels[segundaCapa.id] || segundaCapa.id}` : null
    ].filter(Boolean).join(' + ');

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
      '<p><strong>Etapa Operativa:</strong> ' + escapeHtml(stage) + '</p>' +
      '<p><strong>Índice de Urgencia (Pains):</strong> ' + safeUrgency + '%</p>' +
      '<p><strong>Plataforma Resultante:</strong> <span style="color:#D95A1E; font-weight:bold;">' + escapeHtml(displayPlatform) + '</span></p>' +
      '<h3 style="color: #004775; margin-top: 20px;">Puntaje de Plataformas (Afinidad %):</h3>' +
      '<ul style="line-height: 1.6; font-size: 14px;">' +
      '<li>LMS Ágil: ' + (platformScores.lms_agil || 0) + '%</li>' +
      '<li>LMS Corporativo: ' + (platformScores.lms_corp || 0) + '%</li>' +
      '<li>Certificación Externa: ' + (platformScores.lms_cert || 0) + '%</li>' +
      '<li>Fábrica DDC: ' + (platformScores.fabrica_ddc || 0) + '%</li>' +
      '<li>Herramientas Autor: ' + (platformScores.tools_autor || 0) + '%</li>' +
      '<li>VILT Zoom: ' + (platformScores.vilt_zoom || 0) + '%</li>' +
      '<li>Eval/Proctoring: ' + (platformScores.eval_proctor || 0) + '%</li>' +
      '<li>E-commerce: ' + (platformScores.ecommerce || 0) + '%</li>' +
      '</ul>' +
      '<h3 style="color: #E53935; margin-top: 20px;">Perfil de Dolor (Pains %):</h3>' +
      '<ul style="line-height: 1.6; font-size: 14px;">' +
      '<li>Administrativo: ' + (painProfile.admin || 0) + '%</li>' +
      '<li>Contenido: ' + (painProfile.contenido || 0) + '%</li>' +
      '<li>Tecnología: ' + (painProfile.tecnologia || 0) + '%</li>' +
      '<li>Normativa: ' + (painProfile.normativa || 0) + '%</li>' +
      '<li>Escala: ' + (painProfile.escala || 0) + '%</li>' +
      '<li>Monetización: ' + (painProfile.monetizacion || 0) + '%</li>' +
      '</ul>' +
      '<p style="margin-top: 20px; font-size: 12px; color: #666;">El lead se encuentra ahora mismo interactuando con TitoBits para armar su Business Case.</p>' +
      '</div>';

    // 1. Envío al Backoffice (Sales Team)
    const { data, error } = await resend.emails.send({
      from: 'Tito Bits (Diagnóstico) <onboarding@resend.dev>',
      to: ['smasmoudi@taec.com.mx'], 
      subject: `Lead Diagnóstico TAEC: ${escapeHtml(displayPlatform)} (${escapeHtml(email)})`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend API Denied the Admin Request:", error);
      return new Response(JSON.stringify({ error: 'Fallo al despachar la notificación interna.' }), { status: 400 });
    }

    // 2. Envío al Usuario Prospecto (quien hizo la prueba) - EL "HORÓSCOPO" DETALLADO

    const axisDescriptions = {
      lms_corp: "Requiere un motor robusto para mapear el organigrama y automatizar el plan de carrera de empleados.",
      lms_agil: "Prioridad en inmediatez: necesita subir contenido en minutos para consumo preferentemente móvil.",
      fabrica_ddc: "Sus cursos necesitan transformarse para cumplir urgentemente con normativas oficiales y atrapar al alumno.",
      lms_cert: "Requiere auditoría externa, certificados oficiales y las rutas de aprendizaje son obligatorias.",
      eval_proctor: "El valor de sus cursos reside en la seguridad. Evitar suplantaciones y trampas es vital.",
      vilt_zoom: "Aprendizaje presencial/digital mixto. La gestión de cohortes (Zoom/Teams) es fundamental.",
      ecommerce: "Proyecto pensado para monetizar. Requiere pasarelas de pago y la promoción es vital (B2C/B2B2C).",
      tools_autor: "Su equipo requiere autonomía para diseñar e iterar contenido rápidamente sin depender de externos."
    };

    const urgentList: string[] = [];
    const secondaryList: string[] = [];
    const stableList: string[] = [];

    // Categorización Semáforo (basada en % de afinidad)
    for (const [key, value] of Object.entries(platformScores)) {
      const pScore = value as number;
      if (pScore >= 70) urgentList.push(key);
      else if (pScore >= 40) secondaryList.push(key);
      else stableList.push(key);
    }

    const buildListHtml = (list: string[], color: string, colorHex: string) => {
      if (list.length === 0) return `<p style="font-size: 13px; color: #6B7280; font-style: italic; margin-left: 15px;">Ningún rubro detectado en este nivel.</p>`;
      return list.map(k => `
        <div style="margin-bottom: 12px; border-left: 4px solid ${colorHex}; padding-left: 12px; background: #fff; padding-top: 5px; padding-bottom: 5px;">
          <strong style="color: #1B2A4A; font-size: 14px;">${axisLabels[k as keyof typeof axisLabels] || k}</strong>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #4A4A5A;">${axisDescriptions[k as keyof typeof axisDescriptions] || ''}</p>
        </div>
      `).join('');
    };


    // Generador Dinámico de Gráficas de Radar para el Correo usando QuickChart (Open Source Mapeo Seguro)
    const quickChartUrl = `https://quickchart.io/chart?width=500&height=400&c=` + encodeURIComponent(JSON.stringify({
      type: 'radar',
      data: {
        labels: PLATFORM_AXIS_ORDER.map(k => axisLabels[k]),
        datasets: [{
          label: 'Afinidad a dolor',
          backgroundColor: 'rgba(10, 122, 112, 0.4)',
          borderColor: 'rgb(10, 122, 112)',
          pointBackgroundColor: 'rgb(10, 122, 112)',
          data: PLATFORM_AXIS_ORDER.map(k => platformScores[k] || 0)
        }]
      },
      options: {
        legend: { display: false },
        scale: {
          ticks: { beginAtZero: true, max: 100, display: false },
          pointLabels: { fontSize: 13, fontColor: '#4A4A5A' }
        }
      }
    }));

    const prospectHtml = `<div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #F8FAFC; padding: 30px 10px;">
      <div style="max-width: 600px; background: white; margin: auto; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
        
        <div style="background-color: #004775; padding: 30px; text-align: center;">
          <h2 style="color: #FFFFFF; margin: 0; font-size: 24px; font-weight: 300;">Análisis del Ecosistema Ideal</h2>
          <p style="color: #A8DBD9; font-size: 14px; margin-top: 8px;">TAEC · Diagnóstico de Aprendizaje Organizacional</p>
        </div>

        <div style="padding: 30px;">
          <h3 style="color: #1B2A4A; font-size: 20px; margin-top: 0;">Veredicto de Arquitectura: <span style="color: #D95A1E;">${escapeHtml(displayPlatform)}</span></h3>
          <p style="color: #4A4A5A; font-size: 15px; line-height: 1.6;">
            Hemos analizado las intersecciones críticas de tu operación. Debido a tus restricciones de volumen, urgencias normativas y la forma en la que tus colaboradores acceden a la formación, este es tu ecosistema dominante. Es el "motor" sobre el cual debes montar tu academia para evitar retrabajos en los próximos meses.
          </p>

          <div style="text-align: center; margin: 30px 0; background: #FAFAFA; border: 1px solid #E5E7EB; border-radius: 12px; padding: 15px;">
            <p style="font-size: 12px; color: #6B7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; font-weight: bold;">Mapa de Necesidades TAEC</p>
            <img src="${quickChartUrl}" alt="Radar Cuantitativo del Diagnóstico" style="width: 100%; max-width: 500px; height: auto;" />
          </div>

          <div style="margin-top: 30px;">
            <h4 style="font-size: 16px; color: #1B2A4A; border-bottom: 2px solid #F1F5F9; padding-bottom: 8px; margin-bottom: 20px;">🚦 Semáforo de Prioridades Tecnológicas</h4>
            
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 10px;">
              <tr>
                <td width="30" valign="top"><div style="width: 14px; height: 14px; background-color: #EF4444; border-radius: 50%; margin-top: 4px;"></div></td>
                <td>
                  <strong style="color: #EF4444; font-size: 14px; text-transform: uppercase;">Prioridad Crítica (Requiere Acción Inmediata)</strong>
                  <p style="font-size: 12px; color: #6B7280; margin: 2px 0 10px 0;">Estos son los dolores reales que te están costando dinero, tiempo o riesgo legal hoy mismo.</p>
                  ${buildListHtml(urgentList, 'Rojo', '#EF4444')}
                </td>
              </tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 10px; margin-top: 15px;">
              <tr>
                <td width="30" valign="top"><div style="width: 14px; height: 14px; background-color: #F59E0B; border-radius: 50%; margin-top: 4px;"></div></td>
                <td>
                  <strong style="color: #F59E0B; font-size: 14px; text-transform: uppercase;">Para una Segunda Fase (Puede Esperar)</strong>
                  <p style="font-size: 12px; color: #6B7280; margin: 2px 0 10px 0;">Tecnologías útiles que potenciarán la plataforma, pero que no deberías priorizar hasta estabilizar el sistema Base.</p>
                  ${buildListHtml(secondaryList, 'Amarillo', '#F59E0B')}
                </td>
              </tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 15px;">
              <tr>
                <td width="30" valign="top"><div style="width: 14px; height: 14px; background-color: #10B981; border-radius: 50%; margin-top: 4px;"></div></td>
                <td>
                  <strong style="color: #10B981; font-size: 14px; text-transform: uppercase;">Estabilizado / No Primordial</strong>
                  <p style="font-size: 12px; color: #6B7280; margin: 2px 0 10px 0;">Áreas donde tu negocio no sufre y no necesitas invertir herramientas costosas actualmente.</p>
                  ${buildListHtml(stableList, 'Verde', '#10B981')}
                </td>
              </tr>
            </table>
          </div>

          <div style="background-color: #F0FDFA; border: 1px solid #14B8A6; border-radius: 8px; padding: 20px; margin-top: 35px; text-align: center;">
            <div style="font-size: 24px; margin-bottom: 10px;">📐</div>
            <h4 style="color: #0F766E; margin: 0 0 10px 0; font-size: 16px;">¿Cuánto cuesta implementar esto?</h4>
            <p style="color: #134E4A; font-size: 14px; line-height: 1.5; margin: 0 0 15px 0;">
              No compres plataformas a ciegas. Agenda una sesión de Discovery de 15 minutos con un Arquitecto de Soluciones de TAEC para aterrizar los costos exactos basándonos en tu semáforo de prioridades.
            </p>
            <a href="https://taec-mx.com/contacto" style="display: inline-block; padding: 12px 24px; background-color: #0F766E; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">Solicitar Costos con un Experto</a>
          </div>

          <p style="text-align: center; font-size: 11px; color: #9CA3AF; margin-top: 30px;">
            Este es un análisis preliminar generado automáticamente por el Assessment Operativo de TAEC.
          </p>
        </div>
      </div>
    </div>`;

    // Disparamos el correo al prospecto de forma asíncrona pero manejada
    try {
      await resend.emails.send({
        // IMPORTANTE: En Sandbox, Resend solo despachará el correo al prospecto si escriben un correo real
        // que coincida con un dominio permitido o si Resend ya abrió la validación de dominio de produción.
        from: 'TAEC Consultoría <onboarding@resend.dev>',
        to: [email],
        subject: `Resultados de tu Arquitectura: ${escapeHtml(displayPlatform)}`,
        html: prospectHtml,
      });
    } catch (prospectErr) {
      console.warn("Fallo el envío al prospecto (posible barrera Sandbox de Resend):", prospectErr);
    }

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (error: any) {
    console.error("Crash local generando o enviando email (Diagnóstico):", error);
    return new Response(JSON.stringify({ error: 'Error Interno del Servidor.' }), { status: 500 });
  }
};
