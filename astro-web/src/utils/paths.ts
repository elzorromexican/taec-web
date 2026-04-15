export const base = import.meta.env.BASE_URL.endsWith("/")
	? import.meta.env.BASE_URL
	: `${import.meta.env.BASE_URL}/`;

/**
 * Resuelve rutas absolutas relativas al BASE_URL del proyecto,
 * ignorando URLs externas absolutas.
 * @param url La ruta relativa o absoluta del asset/enlace.
 * @returns La ruta resuelta incluyendo la base.
 */
export function r(url: string): string {
	if (
		!url ||
		url.startsWith("http://") ||
		url.startsWith("https://") ||
		url.startsWith("//")
	) {
		return url;
	}

	const prefix = base.replace(/\/$/, ""); // Ej: "/taec-web" o ""

	// Evitar doble inyección si la URL ya tiene el prefijo de subdominio (ej: r(r('/foo')))
	if (prefix && url.startsWith(prefix)) {
		return url;
	}

	// Normalizar el slash inicial por seguridad
	const safeUrl = url.startsWith("/") ? url : "/" + url;
	return prefix + safeUrl;
}
