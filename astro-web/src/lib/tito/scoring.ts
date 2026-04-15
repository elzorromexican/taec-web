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
	urgencia: "alta" | "media" | "baja" | null;
	presupuesto_aprobado: boolean;
	// Metadata de Extracción (Observabilidad)
	extraction_status?: "success" | "fallback" | "error";
	extraction_source?: "llm" | "regex" | "mock";
	extraction_latency_ms?: number;
	extraction_confidence?: number;
	confidence_scores?: Record<string, number>;
}

/**
 * Calcula el puntaje de un lead basado en señales explícitas y su confianza.
 */
export function calcularScore(signals: LeadSignals): number {
	let score = 0;
	const getConfidence = (field: string) => {
		if (
			signals.confidence_scores &&
			signals.confidence_scores[field] !== undefined
		) {
			return Math.min(signals.confidence_scores[field], 100) / 100; // clamp a 100 máximo
		}
		return 1; // default 100% si no hay metadata
	};

	// Volumen
	if (signals.seats_mencionados !== null) {
		const conf = getConfidence("seats_mencionados");
		if (signals.seats_mencionados >= 100) score += 40 * conf;
		else if (signals.seats_mencionados >= 50) score += 20 * conf;
		else score += 5 * conf;
	}

	// Interacción técnica y madurez
	if (signals.tiene_lms_actual) score += 10 * getConfidence("tiene_lms_actual");
	if (signals.requiere_integracion)
		score += 15 * getConfidence("requiere_integracion");

	// Madurez de ciclo de vida
	if (signals.presupuesto_aprobado)
		score += 25 * getConfidence("presupuesto_aprobado");

	const urgConf = getConfidence("urgencia");
	if (signals.urgencia === "alta") score += 15 * urgConf;
	else if (signals.urgencia === "media") score += 5 * urgConf;

	return Math.min(100, Math.round(score));
}

/**
 * Determina a qué equipo se debe redirigir el lead, si aplica.
 */
export function determinarHandoff(
	signals: LeadSignals,
	score: number,
): "ventas" | "preventa_tecnica" | null {
	if (score >= 40) {
		if (signals.requiere_integracion || signals.tiene_lms_actual) {
			return "preventa_tecnica";
		}
		return "ventas";
	}
	return null;
}
