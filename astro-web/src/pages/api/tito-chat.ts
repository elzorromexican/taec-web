/**
 * @name tito-chat.ts
 * @version 1.1
 * @description Router central de TitoBits v2. Orquesta Motor 1 (reglas/escalamiento), Motor 2 (RAG) y Motor 3 (LLM Stub).
 * @inputs HTTP POST request payload { message: string }
 * @outputs JSON content de la IA o escalamiento
 * @dependencies ../lib/tito/rules, ../lib/tito/rag
 * @created 2026-04-11
 * @updated 2026-04-11 12:00:00
 */

import type { APIRoute } from 'astro';
import { getSystemRulesString, evaluateMessageForEscalation } from '../../lib/tito/rules';
import { getEmbedding, searchSimilarChunks } from '../../lib/tito/rag';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const message = body.message || '';

    // ======= MOTOR 1: EVALUAR REGLAS DURAS Y TRIGGER DE ESCALAMIENTO =======
    const rulesContext = getSystemRulesString();
    const escalationCheck = evaluateMessageForEscalation(message);

    // ======= MOTOR 2: GENERAR EMBEDDING Y BUSCAR CHUNKS (RAG) =======
    const messageEmbedding = await getEmbedding(message);
    const contextChunks = await searchSimilarChunks(messageEmbedding);

    // ======= MOTOR 3: LLAMAR AL LLM CON CONTEXTO (Gemini Stub) =======
    // Aquí integraremos el prompt maestro real con Gemini o GPT,
    // pasándole contextChunks, rulesContext y el escalationCheck.
    const llmStubResponse = await mockCallLLM(message, rulesContext, contextChunks, escalationCheck);

    return new Response(JSON.stringify(llmStubResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Error crítico en tito-chat router:", error);
    return new Response(
      JSON.stringify({ error: "Error interno en TitoBits v2" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

/**
 * TODO: Mover a la Fase 2 / integración real con el Modelo (Motor 3)
 */
async function mockCallLLM(message: string, rules: string, chunks: any[], escalation: string) {
  let reply = "Hola, soy TitoBits v2. He procesado tu solicitud.";
  let handoff_tipo: string | null = null;
  
  if (escalation === 'ESCALATE') {
    reply = "He detectado una consulta técnica o comercial avanzada. Te transfiero a nuestro equipo.";
    handoff_tipo = 'ventas'; // Puede determinarse vía Motor 3 después.
  } else if (escalation === 'INFORM') {
    reply = "Parece que buscas información de licenciamiento o cotizaciones. Por favor dime qué te interesa cotizar.";
  } else {
    reply += ` Me basé en ${chunks.length} fragmentos de conocimiento indexado (RAG) para responderte.`;
  }

  return {
    reply,
    handoff_tipo,
    // Scoring mock (Motor 3)
    score: escalation === 'ESCALATE' ? 95 : 20 
  };
}
