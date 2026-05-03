// CHANGELOG: 19/03/2026 - Configured site URL and base properties.
// CHANGELOG: 19/03/2026 - site + base now driven by env vars for staging vs production.
// CHANGELOG: 02/05/2026 - Added sitemap filter to exclude /interno/ and /admin/ routes to fix issue #202.
// @ts-check

import netlify from "@astrojs/netlify";
import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

/**
 * DEPLOY TARGETS
 * ─────────────────────────────────────────────────────────────────────────
 * Staging  (GitHub Pages):  ASTRO_SITE=https://elzorromexican.github.io/taec-web
 *                           ASTRO_BASE=/taec-web/
 *
 * Production (nuevo.taec.com.mx):  ASTRO_SITE=https://nuevo.taec.com.mx
 *                                  ASTRO_BASE=/  (or unset — defaults to /)
 *
 * The GitHub Actions workflow (.github/workflows/deploy-pages.yml) sets
 * these automatically on every push to main.
 * ─────────────────────────────────────────────────────────────────────────
 */
const SITE = process.env.ASTRO_SITE || "https://nuevo.taec.com.mx";
const BASE = process.env.ASTRO_BASE || "/";

// Solo GitHub Pages necesita output static (ASTRO_STATIC_BUILD=true en el workflow).
// Netlify inyecta ASTRO_BUILD_MODE=server. Dev local → server por defecto.
const isStaticBuild = process.env.ASTRO_STATIC_BUILD === "true";
// Netlify sets NETLIFY=true automatically in their build environment.
// We only load the adapter there — dev local runs clean without it.
const isNetlify = process.env.NETLIFY === "true";

// https://astro.build/config
export default defineConfig({
	site: SITE,
	base: BASE,
	trailingSlash: "never",

	build: {
		format: "directory", // Generates /moodle-mexico/index.html etc.
		client: "./dist",
		server: "./.server",
	},

	// En Astro 6, 'output' es globalmente 'server' ('hybrid' está deprecado).
	// Pages se renderizan estáticas por defecto a menos que usen SSR.
	output: "server",
	integrations: [
		react(),
		sitemap({
			filter: (page) => !page.includes("/interno/") && !page.includes("/admin/"),
		}),
	],
	adapter: isNetlify ? netlify() : node({ mode: "standalone" }),
});
