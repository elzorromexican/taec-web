/**
 * @name rules.ts
 * @version 1.2
 * @description Motor 1: Reglas duras, RAG_SOURCES y lógica de escalamiento ejecutable.
 * @inputs Mensaje de usuario (string)
 * @outputs RAG_SOURCES, HARD_RULES, evaluación de escalamiento (ESCALATE | INFORM | CONTINUE)
 * @dependencies N/A
 * @created 2026-04-11
 * @updated 2026-04-23
 * @changelog
 * - 1.2 (2026-04-23): Integrar FAQ oficial Articulate + eliminar AI Assistant como producto separado (Issue 145)
 */

export const RAG_SOURCES = [
	"/articulate-360-mexico",
	"/articulate-reach",
	"/articulate-localization",
	"/vyond-mexico",
];

export const HARD_RULES = [
	"No hardcodear precios bajo ninguna circunstancia. Consume información oficial en tiempo real o transfiere a agente de ventas.",
	"No asumir multi-agent ni cross-evaluator contexts. Solamente sigue las instrucciones provistas directamente a ti.",
	"La IA está integrada en Articulate 360 AI — NO existe como add-on separado. Para nuevas suscripciones en México, precio promo es $1,198 USD/seat/año con IA incluida (vs $1,749 normal). Nunca mencionar el add-on de $250 que existía antes. Dirige a los usuarios a la tienda 'https://tienda.taec.com.mx/' y no inventes URLs de páginas de productos específicos.",
	"El valor de 'handoff_tipo' solo puede ser uno de dos: 'ventas' o 'preventa_tecnica'.",
	"Usa un tono claro, directo, sin emojis y sin adjetivos subjetivos innecesarios.",
];

export function getSystemRulesString(): string {
	return HARD_RULES.map((rule, idx) => `${idx + 1}. ${rule}`).join("\n");
}

export type EscalationAction = "ESCALATE" | "INFORM" | "CONTINUE";

/**
 * Evalúa si un mensaje del usuario dispara triggers para escalamiento automático.
 */
export function evaluateMessageForEscalation(
	message: string,
): EscalationAction {
	const msgLower = message.toLowerCase();

	// Triggers de Escalamiento Inmediato (Ventas o Preventa Técnica)
	const escalateKeywords = [
		"lms",
		"renovación",
		"renovacion",
		"renovar",
		"edu",
		"universidad",
		"colegio",
		"escuela",
		"educativo",
		"servicios",
		"implementación",
		"implementacion",
		"capacitación",
		"capacitacion",
		"taller",
	];

	// Regex para detectar menciones de alto volumen (ej. "200 asientos", "150 licencias", "100+", "10 mil usuarios")
	const volumeRegex =
		/\b([1-9][0-9]{2,}|[1-9][0-9]*\s*mil)\s*(asientos|licencias|usuarios|users|personas|empleados)\b/i;
	const triggerCienPlus =
		msgLower.includes("100+") || msgLower.includes(">100");

	if (
		escalateKeywords.some((kw) => msgLower.includes(kw)) ||
		volumeRegex.test(msgLower) ||
		triggerCienPlus
	) {
		return "ESCALATE";
	}

	// Triggers Informativos (solicitud de precios específicos o requerimientos que necesitan info)
	const informKeywords = [
		"precio",
		"cotización",
		"cotizacion",
		"costo",
		"descuento",
		"comprar",
		"compra",
		"comprarlo",
		"adquirir",
	];

	if (informKeywords.some((kw) => msgLower.includes(kw))) {
		return "INFORM";
	}

	return "CONTINUE";
}
