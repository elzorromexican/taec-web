// CHANGELOG: 19/03/2026 - Configured site URL and base properties.
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://nuevo.taec.com.mx',
  trailingSlash: 'ignore',
  build: {
    format: 'directory' // Generates folders like /moodle-mexico/index.html
  }
});
