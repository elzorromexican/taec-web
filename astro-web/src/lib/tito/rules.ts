/**
 * @name rules.ts
 * @version 1.3
 * @description Motor 1: Reglas duras, RAG_SOURCES y lógica de escalamiento ejecutable.
 * @inputs Mensaje de usuario (string)
 * @outputs RAG_SOURCES, HARD_RULES, evaluación de escalamiento (ESCALATE | INFORM | CONTINUE)
 * @dependencies N/A
 * @created 2026-04-11
 * @updated 2026-04-29
 * @changelog
 * - 1.3 (2026-04-29): Refactor Issue #182 - Remover HARD_RULES y afinar escalateKeywords para evitar falsos positivos en escalamiento.
 * - 1.2 (2026-04-23): Integrar FAQ oficial Articulate + eliminar AI Assistant como producto separado (Issue 145)
 */

export const RAG_SOURCES = [
	"/articulate-360-mexico",
	"/articulate-reach",
	"/articulate-localization",
	"/vyond-mexico",
];


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
		"licitación",
		"licitacion",
		"renovación",
		"renovacion",
		"renovar",
		"universidad corporativa",
		"varios países",
		"varios paises",
		"compliance",
		"cnbv",
		"fda",
		"cofepris",
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
