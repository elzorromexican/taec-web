export function safeRenderMarkdown(rawText: string): string {
	if (!rawText) return "";
	return (
		rawText
			// Remover tokens estándar estructurales
			.replace(
				/\[(?:CTA|TITO_EXPAND|SYSTEM_HIDDEN_CONTEXT|script)\][\s\S]*?\[\/(?:CTA|TITO_EXPAND|SYSTEM_HIDDEN_CONTEXT|script)\]|\[(?:CTA|TITO_EXPAND)\]/gis,
				"",
			)
			// Remover metanarrativas del LLM alucinadas comunes
			.replace(/Activo el modo TITO_EXPAND/gi, "")
			.replace(/\[Iniciando expansión narrativa\]/gi, "")
			.replace(/\[Expandiendo información\]/gi, "")
			.trim()
	);
}
