/**
 * @name scoring.ts
 * @version 1.0
 * @description Lógica de asignación de puntajes (Lead Scoring) y determinación de tipo de handoff.
 * @inputs Historial de conversación y extracciones NLP
 * @outputs Score final numérico y sugerencia de handoff.
 * @dependencies N/A
 * @created 2026-04-11
 * @updated 2026-04-11 12:12:00
 */

export interface LeadSignals {
  productos_interes: string[];
  seats_mencionados: number | null;
  requiere_integracion: boolean;
  tiene_lms_actual: boolean;
  es_cliente_nuevo: boolean;
  urgencia: 'alta' | 'media' | 'baja' | null;
  presupuesto_aprobado: boolean;
}

/**
 * Calcula el puntaje de un lead basado en señales explícitas.
 */
export function calcularScore(signals: LeadSignals): number {
  let score = 0;

  // Volumen
  if (signals.seats_mencionados !== null) {
    if (signals.seats_mencionados >= 100) score += 40;
    else if (signals.seats_mencionados >= 50) score += 20;
    else score += 5;
  }

  // Interacción técnica y madurez
  if (signals.tiene_lms_actual) score += 10;
  if (signals.requiere_integracion) score += 15;

  // Madurez de ciclo de vida
  if (signals.presupuesto_aprobado) score += 25;
  
  if (signals.urgencia === 'alta') score += 15;
  else if (signals.urgencia === 'media') score += 5;

  return Math.min(100, score);
}

/**
 * Determina a qué equipo se debe redirigir el lead, si aplica.
 */
export function determinarHandoff(signals: LeadSignals, score: number): 'ventas' | 'preventa_tecnica' | null {
  if (score >= 40) {
    if (signals.requiere_integracion || signals.tiene_lms_actual) {
      return 'preventa_tecnica';
    }
    return 'ventas';
  }
  return null;
}
