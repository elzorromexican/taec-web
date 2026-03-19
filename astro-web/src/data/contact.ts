// CHANGELOG: 19/03/2026 - Centralized data source for contact info and regional domains.

export const contactData = {
  email: "info@taec.com.mx",
  phone: "55 6822 3300",
  whatsapp: {
    number: "5215527758279",
    url: "https://wa.me/5215527758279",
    label: "WhatsApp"
  },
  tidycal: "https://tidycal.com/slimmasmoudi/consultoria-estrategia",
  socials: {
    linkedin: "https://www.linkedin.com/company/taec",
    youtube: "https://www.youtube.com/channel/UCHQvrBBESK9JPJqxJW8DVgQ",
    facebook: "https://www.facebook.com/TAEC.eLearning"
  },
  regional: [
    { country: "México", emoji: "🇲🇽", domain: "taec.com.mx", url: "https://www.taec.com.mx/" },
    { country: "Colombia", emoji: "🇨🇴", domain: "taec.com.co", url: "https://www.taec.com.co/" },
    { country: "Chile", emoji: "🇨🇱", domain: "taec.cl", url: "https://www.taec.cl/" }
  ],
  supportUrl: "https://www.taec.com.mx/soporte-tecnico.php",
  storeUrl: "https://tienda.taec.com.mx"
};
