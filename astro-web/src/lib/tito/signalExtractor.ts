import { GoogleGenAI } from '@google/genai';
import type { LeadSignals } from './scoring';

/**
 * Servicio de extracción de señales comerciales usando LLM (JSON Mode concurrente)
 * @param userMessage Mensaje actual del usuario
 * @param history Historial de mensajes (slice de los últimos)
 * @param apiKey Api Key de Gemini
 * @returns Promesa con LeadSignals estrictamente parseado
 */
export async function extractLeadSignalsConIA(
  userMessage: string, 
  history: any[], 
  apiKey: string
): Promise<LeadSignals> {
  const tStart = Date.now();
  
  // Objeto fallback por defecto
  const fallbackSignals: LeadSignals = {
    productos_interes: [],
    seats_mencionados: null,
    requiere_integracion: false,
    tiene_lms_actual: false,
    es_cliente_nuevo: true,
    urgencia: null,
    presupuesto_aprobado: false,
    extraction_status: 'fallback',
    extraction_source: 'llm',
    extraction_latency_ms: 0,
    extraction_confidence: 0,
    confidence_scores: {}
  };

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const contextPrompt = `
      Analiza la siguiente conversación B2B y extrae CUIDADOSAMENTE las señales de venta.
      Debes devolver ÚNICAMENTE un JSON válido que cumpla con el siguiente esquema exacto.
      
      Reglas de extracción:
      - productos_interes: Array de strings con los productos mencionados (ej. "Articulate 360", "Vyond", "LMS", "Totara", "Moodle", "DDC"). Vacío si no se deduce.
      - seats_mencionados: Número entero si el cliente menciona cantidad de usuarios, licencias o asientos. null si no lo dice.
      - requiere_integracion: booleano (true si menciona API, integraciones, SSO).
      - tiene_lms_actual: booleano (true si ya tienen una plataforma actual).
      - es_cliente_nuevo: booleano (false si dice que quiere renovar o ya tiene cuenta con nosotros).
      - urgencia: "alta" | "media" | "baja" | null. (Alta si dice "urge", "lo antes posible", etc).
      - presupuesto_aprobado: booleano (true si pregunta confirmando que ya tiene dinero/budget).
      - confidence_scores: Un diccionario con el porcentaje de seguridad (0 a 100) de tu extracción para cada una de las 7 llaves anteriores. Si el usuario no dijo nada de ese campo y por ende es null/false/vacío, la confidence de ese campo debe ser alta (100) porque estás seguro de que NO LO DIJO. Si crees que insinuó 50 licencias pero no es claro, pon un confidence menor (ej. 40).
    `;

    const chatHistoryText = history.map((m: any) => `${m.role}: ${m.parts?.[0]?.text || m.text}`).join('\n');
    const fullPrompt = `${contextPrompt}\n\n[HISTORIAL]\n${chatHistoryText}\n\n[USUARIO]\n${userMessage}`;

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.1 // Baja temperatura para precisión analítica
      }
    });

    const textOutput = result?.text;
    if (!textOutput) throw new Error("Output vacío de Gemini");

    const parsed = JSON.parse(textOutput);
    const latency = Date.now() - tStart;
    
    // Helper para garantizar tipos
    const getValue = (val: any, fallback: any, type: string) => {
        if (type === 'boolean') return typeof val === 'boolean' ? val : fallback;
        if (type === 'number') return typeof val === 'number' ? val : fallback;
        if (type === 'array') return Array.isArray(val) ? val : fallback;
        return val !== undefined && val !== null ? val : fallback;
    };

    // Calculate generic overall confidence as average
    const scores = parsed.confidence_scores || {};
    let totalConf = 0;
    let countConf = 0;
    for (const key in scores) {
        if (typeof scores[key] === 'number') {
            totalConf += scores[key];
            countConf++;
        }
    }
    const overallConfidence = countConf > 0 ? Math.round(totalConf / countConf) : 100;

    return {
      productos_interes: getValue(parsed.productos_interes, [], 'array'),
      seats_mencionados: getValue(parsed.seats_mencionados, null, 'number'),
      requiere_integracion: getValue(parsed.requiere_integracion, false, 'boolean'),
      tiene_lms_actual: getValue(parsed.tiene_lms_actual, false, 'boolean'),
      es_cliente_nuevo: getValue(parsed.es_cliente_nuevo, true, 'boolean'),
      urgencia: ['alta', 'media', 'baja'].includes(parsed.urgencia) ? parsed.urgencia : null,
      presupuesto_aprobado: getValue(parsed.presupuesto_aprobado, false, 'boolean'),
      extraction_status: 'success',
      extraction_source: 'llm',
      extraction_latency_ms: latency,
      extraction_confidence: overallConfidence,
      confidence_scores: scores
    };

  } catch (error: any) {
    console.error(`[SignalExtractor] Error en inferencia: ${error.message}`);
    fallbackSignals.extraction_latency_ms = Date.now() - tStart;
    fallbackSignals.extraction_status = 'error';
    return fallbackSignals;
  }
}
