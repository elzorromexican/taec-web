// CHANGELOG: 19/03/2026 - Configured site URL and base properties.
// CHANGELOG: 19/03/2026 - site + base now driven by env vars for staging vs production.
// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

import netlify from '@astrojs/netlify';

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
const SITE = process.env.ASTRO_SITE || 'https://nuevo.taec.com.mx';
const BASE = process.env.ASTRO_BASE || '/';

// Solo GitHub Pages necesita output static (ASTRO_STATIC_BUILD=true en el workflow).
// Netlify inyecta ASTRO_BUILD_MODE=server. Dev local → server por defecto.
const isStaticBuild = process.env.ASTRO_STATIC_BUILD === 'true';
// Netlify sets NETLIFY=true automatically in their build environment.
// We only load the adapter there — dev local runs clean without it.
const isNetlify = process.env.NETLIFY === 'true';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'never',

  build: {
    format: 'directory' // Generates /moodle-mexico/index.html etc.
  },

  // GitHub Pages → static. Todo lo demás (Netlify, dev local) → server.
  output: isStaticBuild ? 'static' : 'server',
  integrations: [react(), sitemap()],
  adapter: isNetlify ? netlify() : undefined
});