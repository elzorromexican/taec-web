export const base = import.meta.env.BASE_URL;

/**
 * Resuelve rutas absolutas relativas al BASE_URL del proyecto,
 * ignorando URLs externas absolutas.
 * @param url La ruta relativa o absoluta del asset/enlace.
 * @returns La ruta resuelta incluyendo la base.
 */
export function r(url: string): string {
  if (!url || url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')) {
    return url;
  }
  return base.replace(/\/$/, '') + url;
}
