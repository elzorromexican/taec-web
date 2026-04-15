// CHANGELOG: 19/03/2026 - Centralized data source for contact info and regional domains.
// CHANGELOG: 19/03/2026 - Added bookingUrl (Zoho Bookings) and formEndpoint (Google Apps Script).

export const contactData = {
	email: "info@taec.com.mx",
	phone: "55 6822 3300",
	whatsapp: {
		number: "5215527758279",
		url: "https://wa.me/5215527758279",
		label: "WhatsApp",
	},

	/**
	 * URL pública de agenda — Zoho Bookings conectado a Google Calendar.
	 * Reemplazar con la URL real del servicio activo.
	 * Controla: Header "Agendar diagnóstico", CtaFinal, sidebar de /contacto,
	 *           nosotros.astro, index.astro.
	 */
	bookingUrl: "https://taec.zohobookings.com", // Zoho Bookings — agenda de diagnóstico

	/**
	 * Google Apps Script Web App endpoint — formulario de /contacto.
	 *
	 * CÓMO CONFIGURAR:
	 * 1. Crear un Google Apps Script con la función doPost(e).
	 * 2. Desplegar → Nuevo despliegue → Web App.
	 *    - Ejecutar como: Yo
	 *    - Quién puede acceder: Cualquier persona
	 * 3. Copiar la URL del despliegue y pegarla aquí.
	 *
	 * El script recibirá un POST con Content-Type: application/json y este payload:
	 *   { nombre, empresa, correo, telefono, pais, interes, mensaje, pagina_origen, cta_origen }
	 * Debe retornar: { "success": true } o { "success": false, "error": "..." }
	 *
	 * Mientras sea "" el formulario mostrará un mensaje alternativo con WhatsApp y correo.
	 * [OBSOLETO] Migrado a internal endpoint SSR (/api/submit-contact).
	 */
	formEndpoint: "",
	socials: {
		linkedin: "https://www.linkedin.com/company/taec",
		youtube: "https://www.youtube.com/channel/UCHQvrBBESK9JPJqxJW8DVgQ",
		facebook: "https://www.facebook.com/TAEC.eLearning",
	},
	regional: [
		{
			country: "México",
			emoji: "🇲🇽",
			domain: "taec.com.mx",
			url: "https://www.taec.com.mx/",
		},
		{
			country: "Colombia",
			emoji: "🇨🇴",
			domain: "taec.com.co",
			url: "https://www.taec.com.co/",
		},
		{
			country: "Chile",
			emoji: "🇨🇱",
			domain: "taec.cl",
			url: "https://www.taec.cl/",
		},
	],
	supportUrl: "https://www.taec.com.mx/soporte-tecnico.php",
	storeUrl: "https://tienda.taec.com.mx",
};

export function getBookingUrl(source?: string): string {
	const defaultUrl = contactData.bookingUrl || "/contacto";

	// Mapa de Agendas Zoho (Permite rutear la cita a los calendarios correctos del PO + Ventas)
	// Reemplazar estas URLs temporales con los Workspaces reales de Zoho Bookings
	const agendas: Record<string, string> = {
		articulate: `${defaultUrl}?service=articulate`,
		vyond: `${defaultUrl}?service=vyond`,
		totara: `${defaultUrl}?service=totara`,
		moodle: `${defaultUrl}?service=moodle`,
		ottolearn: `${defaultUrl}?service=ottolearn`,
		"7minutes": `${defaultUrl}?service=7minutes`,
		proctorizer: `${defaultUrl}?service=proctorizer`,
		strikeplagiarism: `${defaultUrl}?service=strikeplagiarism`,
		customguide: `${defaultUrl}?service=customguide`,
		lys: `${defaultUrl}?service=lys`,
		class: `${defaultUrl}?service=class`,
	};

	if (source && agendas[source]) {
		return agendas[source];
	}

	// Fallback con parámetro genérico
	if (source && defaultUrl.includes("zohobookings")) {
		return `${defaultUrl}?source=${encodeURIComponent(source)}`;
	}

	return defaultUrl;
}
