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

// GitHub Actions setea GITHUB_ACTIONS='true' — usamos eso para detectar el build de GH Pages.
// En cualquier otro entorno (Netlify CI, local) usamos SSR con el adaptador de Netlify.
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'never',

  build: {
    format: 'directory' // Generates /moodle-mexico/index.html etc.
  },

  // GitHub Pages → static puro. Netlify / local → SSR con adaptador.
  output: isGitHubActions ? 'static' : 'server',
  integrations: [react(), sitemap()],
  adapter: isGitHubActions ? undefined : netlify()
});