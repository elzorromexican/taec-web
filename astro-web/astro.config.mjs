// CHANGELOG: 19/03/2026 - Configured site URL and base properties.
// CHANGELOG: 19/03/2026 - site + base now driven by env vars for staging vs production.
// @ts-check
import { defineConfig } from 'astro/config';

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

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  build: {
    format: 'directory' // Generates /moodle-mexico/index.html etc.
  }
});
