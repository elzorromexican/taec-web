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
import { generarMiniBrief, enviarNotificacion } from '../../lib/tito/handoff';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const message = body.message || '';
    const sessionId = body.session_id || 'anonymous-session';

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
          email: null // Placeholder para info real, se recolectará en Fase 3
        }
      ], { onConflict: 'session_id' }).select().single();

      if (!leadError && leadData) {
        // Enviar Webhook/Resend de manera aislada y no bloqueante
        enviarNotificacion({
          id: leadData.id,
          session_id: sessionId,
          email: leadData.email,
          nombre: leadData.nombre,
          empresa: leadData.empresa,
          score: leadData.score,
          minibrief: leadData.minibrief,
          handoff_tipo: leadData.handoff_tipo as 'ventas' | 'preventa_tecnica'
        });
      } else {
        console.error("Fallo persistiendo a Supabase tito_leads:", leadError);
      }

      reply = "He notificado preventivamente a nuestro equipo sobre tu requerimiento avanzado. Te contactarán a la brevedad.";
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
