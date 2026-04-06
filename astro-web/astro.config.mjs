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

// ASTRO_BUILD_MODE='server' se inyecta desde astro-web/netlify.toml [build.environment].
// En GitHub Actions (GH Pages) esta variable no existe → output static.
const isServerBuild = process.env.ASTRO_BUILD_MODE === 'server';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'never',

  build: {
    format: 'directory' // Generates /moodle-mexico/index.html etc.
  },

  // Netlify (ASTRO_BUILD_MODE=server) → SSR completo.
  // GitHub Pages / local → static con adapter presente (necesario para páginas prerender:false).
  output: isServerBuild ? 'server' : 'static',
  integrations: [react(), sitemap()],
  adapter: netlify()
});