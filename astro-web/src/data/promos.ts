export interface PromoConfig {
  id: string;
  title: string;
  description: string;
  badgeText: string;
  link?: string;
  urlTrigger?: string; // e.g. 'vyond' or 'moodle' (if the path contains this, the promo gets prioritized)
  countries: string[]; // ['MX', 'CO', 'CL', 'GLOBAL']
  active: boolean;
}

export const promos: PromoConfig[] = [
  {
    id: "hot-sale-vyond-mx",
    title: "¡HOT SALE EN MÉXICO!",
    description: "Aprovecha un 30% de descuento directo en licencias nuevas de Vyond al facturar en MXN durante este mes.",
    badgeText: "🔥 OFERTA EXCLUSIVA 🇲🇽",
    link: "https://tienda.taec.com.mx",
    urlTrigger: "vyond",
    countries: ["MX"],
    active: true
  },
  {
    id: "descuento-articulate-latam",
    title: "Descuento en Articulate 360",
    description: "Renueva o adquiere licencias de Articulate 360 al tipo de cambio preferencial con soporte local en español gratuito.",
    badgeText: "⭐ PROMO LOCAL",
    link: "/articulate-360-mexico",
    urlTrigger: "articulate",
    countries: ["CO", "CL", "GLOBAL"], // Ejemplo para Latam global
    active: true
  }
];
