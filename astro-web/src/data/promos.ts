export const latamCountries = ['AR', 'BO', 'BR', 'CL', 'CR', 'CU', 'DO', 'EC', 'SV', 'GT', 'HN', 'NI', 'PA', 'PY', 'PE', 'PR', 'UY', 'VE'];

export interface PromoConfig {
  id: string;
  title: string;
  description: string;
  badgeText: string;
  link?: string;
  urlTrigger?: string; // e.g. 'vyond' or 'moodle' (if the path contains this, the promo gets prioritized)
  countries: string[]; // ['MX', 'CO', 'LATAM', 'GLOBAL']
  active: boolean;
  color?: string; // hex del badge en ticker. Default: '#EA580C' (naranja)
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
    countries: ["LATAM", "CO"], // Ejemplo para Latam regional y Colombia
    active: true
  },
  {
    id: "promo-ddc-mundial",
    title: "Impulsa tu capacitación corporativa",
    description: "Nuestra fábrica de desarrollo de contenidos a medida atiende proyectos en cualquier idioma. ¡Delega la producción!",
    badgeText: "🚀 FÁBRICA DDC",
    link: "/desarrollo-de-contenidos",
    urlTrigger: "ddc",
    countries: ["GLOBAL"], // Esta promo saldrá en Europa, Asia, USA, etc.
    active: false // Apagada por defecto hasta que inicies la campaña
  },
  {
    id: "art-teams-ai-q2-mx",
    title: "Articulate 360 Teams + IA — $1,198 USD",
    description: "31% de descuento · Precio especial Q2 para facturación en México. Precio normal $1,749.",
    badgeText: "🇲🇽 OFERTA Q2",
    link: "/articulate-360-mexico",
    urlTrigger: "articulate",
    countries: ["MX"],
    active: true
  },
  {
    id: "art-localization-q2-global",
    title: "Localization Pack — 20% descuento Q2",
    description: "20% de descuento en el paquete de Localization de Articulate. Válido en todo el mundo.",
    badgeText: "⭐ PROMO Q2",
    link: "/articulate-localization",
    urlTrigger: "localization",
    countries: ["GLOBAL"],
    active: true,
    color: "#0d9488"
  },
  {
    id: "summit-cdmx-mayo-2026",
    title: "Corporate Learning Summit · 7 mayo · St. Regis CDMX",
    description: "Co-organizado por TAEC y Articulate. Aforo limitado · Confirmación personalizada.",
    badgeText: "🎯 EVENTO",
    link: "https://register.articulate.com/mexico-city",
    urlTrigger: "articulate",
    countries: ["MX"],
    active: true
  }
];
