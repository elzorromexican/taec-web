/**
 * @name tito-chat.ts
 * @version 2.0
 * @description Router central de TitoBits v2. Orquesta Motor 1 (reglas), Motor 2 (RAG) y Motor 3 (Lead Scoring remoto y Handoff automatizado).
 * @inputs HTTP POST request payload { message: string, session_id: string }
 * @outputs JSON content de la IA o notificaciones de escalamiento
 * @dependencies ../lib/tito/rules, ../lib/tito/rag, ../lib/tito/scoring, ../lib/tito/handoff
 * @created 2026-04-11
 * @updated 2026-04-11 12:12:00
 */

import type { APIRoute } from 'astro';
import { getSystemRulesString, evaluateMessageForEscalation } from '../../lib/tito/rules';
import { getEmbedding, searchSimilarChunks, supabase } from '../../lib/tito/rag';
import { calcularScore, determinarHandoff, type LeadSignals } from '../../lib/tito/scoring';
import { generarMiniBrief, enviarNotificacion, extraerContacto, FALLBACK_CONTACTO } from '../../lib/tito/handoff';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const message = body.message || '';
    const sessionId = body.session_id || 'anonymous-session';

    // ======= FASE 3: MODO CAPTURA =======
    const { data: existingLead } = await supabase
      .from('tito_leads')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    if (existingLead && existingLead.awaiting_contact) {
      const contacto = extraerContacto(message);
      
      const isRefusal = message.toLowerCase().match(/(no quiero|no te dar|no gracias)/) !== null;
      const hasDatos = contacto.nombre || contacto.empresa || contacto.email;

      if (isRefusal || !hasDatos) {
        return new Response(JSON.stringify({
          reply: FALLBACK_CONTACTO,
          handoff_tipo: existingLead.handoff_tipo,
          score: existingLead.score
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      let awaitingContactUpdate = false;
      const nombreFinal = contacto.nombre || existingLead.nombre;
      let replyCapture = nombreFinal
        ? `Listo ${nombreFinal}, nuestro equipo te contacta en menos de 24 horas hábiles.`
        : `Listo, nuestro equipo te contacta en menos de 24 horas hábiles.`;

      // Regla: Si el usuario da solo email sin nombre -> aceptarlo, preguntar nombre en siguiente turno
      if (contacto.email && !contacto.nombre && !existingLead.nombre) {
        awaitingContactUpdate = true;
        replyCapture = "Gracias por tu correo. ¿Me podrías indicar tu nombre, por favor?";
      }

      const mergedNombre = contacto.nombre || existingLead.nombre;
      const mergedEmail = contacto.email || existingLead.email;
      const mergedEmpresa = contacto.empresa || existingLead.empresa;

      const { data: updatedLead, error: leadUpdateError } = await supabase.from('tito_leads').update({
        nombre: mergedNombre,
        empresa: mergedEmpresa,
        email: mergedEmail,
        awaiting_contact: awaitingContactUpdate
      }).eq('id', existingLead.id).select().single();

      if (!awaitingContactUpdate && !leadUpdateError && updatedLead) {
        enviarNotificacion({
          id: updatedLead.id,
          session_id: sessionId,
          email: updatedLead.email,
          nombre: updatedLead.nombre,
          empresa: updatedLead.empresa,
          score: updatedLead.score,
          minibrief: updatedLead.minibrief,
          handoff_tipo: updatedLead.handoff_tipo as 'ventas' | 'preventa_tecnica'
        });
      }

      return new Response(JSON.stringify({
        reply: replyCapture,
        handoff_tipo: existingLead.handoff_tipo,
        score: existingLead.score
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // ======= MOTOR 1: EVALUAR REGLAS Y TRIGGERS =======
    const rulesContext = getSystemRulesString();
    const escalationCheck = evaluateMessageForEscalation(message);

    // ======= MOTOR 2: RAG (VECTORES) =======
    const messageEmbedding = await getEmbedding(message);
    const contextChunks = await searchSimilarChunks(messageEmbedding);

    // ======= MOTOR 3: SCORING Y EXTRACCIONES LLM =======
    // Mock temporal de extracción LLM - Reemplazar en integración con Gemini Final
    const mockSignals: LeadSignals = {
      productos_interes: ['articulate-360'],
      seats_mencionados: escalationCheck === 'ESCALATE' ? 120 : null,
      requiere_integracion: false,
      tiene_lms_actual: message.toLowerCase().includes('lms'),
      es_cliente_nuevo: true,
      urgencia: null,
      presupuesto_aprobado: false
    };

    // ======= FASE 2: HANDOFF & SUPABASE DATABASE =======
    const score = calcularScore(mockSignals);
    let handoffTipo = determinarHandoff(mockSignals, score);

    if (escalationCheck === 'ESCALATE' && !handoffTipo) {
      handoffTipo = 'ventas';
    }

    let reply = "Hola, soy TitoBits v2. Procesando...";

    if (handoffTipo) {
      const miniBrief = generarMiniBrief([{ role: 'user', content: message }]);
      
      // Upsert Supabase para generar o actualizar Lead
      const { data: leadData, error: leadError } = await supabase.from('tito_leads').upsert([
        {
          session_id: sessionId,
          score: score,
          minibrief: miniBrief,
          handoff_tipo: handoffTipo,
          handoff_triggered: true,
          email: null,
          awaiting_contact: true // Fase 3: Set to true when handoff triggers
        }
      ], { onConflict: 'session_id' }).select().single();

      if (leadError || !leadData) {
        console.error("Fallo persistiendo a Supabase tito_leads:", leadError);
      }

      reply = "Para conectarte con el especialista correcto, ¿me confirmas tu nombre, empresa y correo corporativo?";
    } else if (escalationCheck === 'INFORM') {
      reply = "Por favor indícame la cantidad exacta de licencias o alcances para asistirte.";
    } else {
      reply = `Utilicé la base de conocimiento vectorial (${contextChunks.length} chunks) para evaluar tu solicitud con score ${score}.`;
    }

    return new Response(JSON.stringify({
      reply,
      handoff_tipo: handoffTipo,
      score: score
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Error crítico en tito-chat router v2:", error);
    return new Response(
      JSON.stringify({ error: "Interrupción de servicio TitoBits v2" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
