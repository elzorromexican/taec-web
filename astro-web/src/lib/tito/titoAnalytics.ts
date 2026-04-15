/**
 * @name titoAnalytics.ts
 * @version v1.2
 * @description Funciones de telemetría, seguridad (gibberishGuard) y sanitización para el motor de Tito Bits.
 * @inputs Texto de entrada del usuario en el chat, eventos para tracking.
 * @outputs boolean (isGibberish) y textos sanitizados, u operaciones hacia plausible analytics.
 * @dependencies window.plausible (opcional)
 * @created 2024-03-01
 * @updated 2026-04-12 17:55:00
 */
export const trackTitoEvent = (
	eventName: string,
	props: Record<string, any> = {},
) => {
	if (typeof window !== "undefined" && (window as any).plausible) {
		(window as any).plausible(eventName, { props });
	}
	console.log(`[Tito Telemetry] ${eventName}`, props);
};

export const sanitizerFallback = (text: string): string => {
	if (!text) return "";
	// Strip HTML tags and normalize whitespace
	return text
		.replace(/[<>]/g, "")
		.replace(/(\n\r?)+/g, "\n")
		.trim();
};

export const gibberishGuard = (
	text: string,
): { isGibberish: boolean; reason?: string } => {
	const clean = sanitizerFallback(text).toLowerCase();

	if (clean.length < 2) {
		return { isGibberish: true, reason: "too_short" };
	}

	// Commercial whitelist
	const whitelist = [
		"hola",
		"si",
		"sí",
		"no",
		"ok",
		"vale",
		"gracias",
		"precio",
		"info",
	];
	if (whitelist.includes(clean)) {
		return { isGibberish: false };
	}

	// Check for consecutive identical characters (e.g. "aaaa")
	if (/(.)\1{4,}/.test(clean)) {
		return { isGibberish: true, reason: "repeated_chars" };
	}

	// Check for common keysmash patterns (e.g. "asdasdasd", "qweqwe")
	if (
		/(asd|qwe|zxc|fgh|jkl){2,}/i.test(clean) ||
		/(asdf|qwer|zxcv){1,}/i.test(clean)
	) {
		return { isGibberish: true, reason: "keysmash" };
	}

	// Extract alphabetic characters to check consonant ratios and entropy
	const letters = clean.replace(/[^a-záéíóúüñ]/g, "");
	if (letters.length > 10) {
		const uniqueChars = new Set(letters.split("")).size;
		if (uniqueChars <= 4) {
			return { isGibberish: true, reason: "low_entropy_keysmash" };
		}
	}

	if (letters.length > 5) {
		const consonants = letters.replace(/[aeiouáéíóúü]/g, "").length;
		const ratio = consonants / letters.length;
		// Spanish naturally has a good mix of vowels. A ratio > 0.85 is extremely likely to be keysmashing (e.g. "asdfghjk")
		if (ratio > 0.85) {
			return { isGibberish: true, reason: "consonant_cluster" };
		}
	}

	return { isGibberish: false };
};
