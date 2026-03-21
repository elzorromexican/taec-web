# Utilidades de Migración (Scripts)

Este directorio contiene scripts de un solo uso desarrollados en Node.js (Vanilla / JS moderno) para la migración del sitio web heredado (anteriormente en Neocities / WordPress) hacia el entorno estático y tipado de Astro. 

**Estado actual:** Estos archivos ya cumplieron su propósito en la fase de extracción de datos, inyección de metadatos (Frontmatter), limpieza de entidades HTML y formateo de Markdowns en la carpeta `src/content/`. 

No son requeridos para hacer _deploy_ del proyecto y pueden eliminarse si se considera seguro, o bien, mantenerse como referencia histórica del proceso de *scraping* y *data-mining* llevado a cabo.

## Inventario
- `fix-entities.mjs`: Saneamiento de basura HTML residual.
- `fix-internal-links.mjs`: Normalización de enlaces relativos entre artículos.
- `migrate-*.mjs`: Scrapers que jalaron código HTML para pasarlo a colecciones MD.
- `recover-*.mjs`: Inyectores de metadatos perdidos (Autores y Tags) yendo hacia atrás en el historial de Git.
- `scrape-external-blog.mjs`: Extractor masivo del blog de WordPress con Cheerio.
