export const trackTitoEvent = (eventName: string, props: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(eventName, { props });
  }
  console.log(`[Tito Telemetry] ${eventName}`, props);
};

export const sanitizerFallback = (text: string): string => {
  if (!text) return '';
  // Strip HTML tags and normalize whitespace
  return text
    .replace(/[<>]/g, '')
    .replace(/(\n\r?)+/g, '\n')
    .trim();
};

export const gibberishGuard = (text: string): { isGibberish: boolean, reason?: string } => {
  const clean = sanitizerFallback(text).toLowerCase();
  
  if (clean.length < 2) {
    return { isGibberish: true, reason: 'too_short' };
  }

  // Commercial whitelist
  const whitelist = ['hola', 'si', 'sí', 'no', 'ok', 'vale', 'gracias', 'precio', 'info'];
  if (whitelist.includes(clean)) {
    return { isGibberish: false };
  }

  // Check for consecutive identical characters (e.g. "aaaa")
  if (/(.)\1{4,}/.test(clean)) {
    return { isGibberish: true, reason: 'repeated_chars' };
  }

  // Extract alphabetic characters to check consonant ratios
  const letters = clean.replace(/[^a-záéíóúüñ]/g, '');
  if (letters.length > 5) {
    const consonants = letters.replace(/[aeiouáéíóúü]/g, '').length;
    const ratio = consonants / letters.length;
    // Spanish naturally has a good mix of vowels. A ratio > 0.85 is extremely likely to be keysmashing (e.g. "asdfghjk")
    if (ratio > 0.85) {
        return { isGibberish: true, reason: 'consonant_cluster' };
    }
  }

  return { isGibberish: false };
};
