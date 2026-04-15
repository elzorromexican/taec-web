import { expect, test } from "@playwright/test";

test.describe("Smoke Tests Básicos", () => {
	test("La página principal carga con código 200 HTTP", async ({ page }) => {
		// Al usar baseURL (definida en playwright.config.ts),
		// la URL de Netlify Preview o el localhost inyectará el base path correcto.
		const response = await page.goto("/");
		expect(response?.status()).toBe(200);
	});

	test("El agente TitoBits (Chat) está integrado y renderiza al cargar", async ({
		page,
	}) => {
		await page.goto("/");

		// Verificamos que al menos el selector base que carga el Chat Agent exista en el DOM.
		// Buscamos el botón flotante de TitoBits por su title.
		const chatContainer = page.locator('button[title="Hablar con Tito Bits"]');

		// Al menos un elemento del chat debería existir
		// (usualmente es un botón flotante antes de la hidratación completa).
		// Esperamos pacientemente porque los componentes pesados (React) tardan un par de segundos.
		await chatContainer.waitFor({ state: "attached", timeout: 5000 });
	});
});
