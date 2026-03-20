# CHANGELOG — TAEC Web

Versiones del sitio nuevo.taec.com.mx (staging: elzorromexican.github.io/taec-web)

---

## v1.1 · 19 mar 2026

### GitHub Pages base-path · Formulario de contacto GAS · CORS fix

#### GitHub Pages — corrección completa de base path (staging)

**Problema:** el sitio desplegado en `elzorromexican.github.io/taec-web/` cargaba sin CSS ni assets
porque todas las rutas internas estaban hardcodeadas como absolutas (`/assets/...`, `/contacto`, etc.)
y Astro sólo prefija sus propios chunks generados (`_astro/*`), no las rutas en templates.

**Solución:** helper `r()` + literales de template con `${base}` en todos los archivos afectados.

- **`astro.config.mjs`** — `site` y `base` leídos de `ASTRO_SITE`/`ASTRO_BASE` env vars
- **`.github/workflows/deploy-pages.yml`** — creado; inyecta `ASTRO_SITE` y `ASTRO_BASE=/taec-web/`
- **`BaseLayout.astro`** — OG image: `new URL('/assets/…')` → `` new URL(`${base}assets/…`) ``; eliminado `const base` duplicado
- **`Header.astro`**, **`Footer.astro`**, **`MobileNav.astro`** — `r()` añadido; todos los hrefs y logo src corregidos
- **`HeroComercial.astro`**, **`CtaFinal.astro`**, **`FAQAccordion.astro`** — `r()` añadido para URL props internas
- **46 páginas** — batch Python: 194 patrones `href="/"` y `src="/assets/"` transformados; `const base` + `r()` añadidos al frontmatter
- **`articulate-360-mexico.astro`** — `const base`/`r()` movidos al inicio del frontmatter para evitar temporal dead zone con el array de FAQs
- **`moodle-mexico.astro`**, **`vyond-mexico.astro`**, **`totara-lms-mexico.astro`** — `cardLogoSrc` corregido a `` `${base}assets/...` ``
- **Regex fix:** batch generó `base.replace(/\/\$/, '')` (incorrecto) → corregido a `base.replace(/\/$/, '')` en todos los archivos

#### Formulario de contacto — migración EmailJS → Google Apps Script

- **`src/data/contact.ts`** — `tidycal` → `bookingUrl` (Zoho Bookings); añadido `formEndpoint` con URL del GAS endpoint
- **`scripts/gas-contact-form.js`** — nuevo script para desplegar como Web App en apps.script.google.com:
  guarda leads en Google Sheets, envía notificación interna por email, stub de integración Zoho CRM
- **`CtaFinal.astro`** — botón "Agendar" actualizado a `contactData.bookingUrl`

#### Fix `define:vars` → `data-*` en `contacto.astro`

**Problema:** `ReferenceError: formEndpoint is not defined` en producción.
El `<script define:vars={...}>` estaba ubicado **después de `</BaseLayout>`**, lo que hace que Astro
lo renderice literalmente después de `</html>` — fuera del `<body>` — y la inyección de variables falla.

**Solución:** variables pasadas como atributos `data-*` en el `<form>`; el script las lee vía `form.dataset.*`.
Script movido dentro de `<BaseLayout>` con `is:inline`.

```html
<form id="contactForm"
  data-endpoint={formEndpoint}
  data-email={contactEmail}
  data-whatsapp={whatsappUrl}
>
```

#### Fix CORS preflight con Google Apps Script

**Problema:** `Content-Type: application/json` es un header "no simple" → dispara preflight OPTIONS.
GAS no expone handler OPTIONS → el navegador bloquea la petición con error CORS.

**Solución:** `Content-Type: text/plain;charset=utf-8` — es un header "simple" (RFC CORS), no dispara
preflight. El body sigue siendo JSON puro; GAS lo parsea con `JSON.parse(e.postData.contents)`.

- **`contacto.astro`** — `Content-Type: application/json` → `text/plain;charset=utf-8`
- **`scripts/gas-contact-form.js`** — comentarios actualizados; `testDoPost()` mock type actualizado

#### Documentación

- **`astro-web/README.md`** — sección "Flujo de contacto" actualizada (GAS/Zoho Bookings);
  nueva sección "Integración Google Apps Script"; nueva sección "Base path — GitHub Pages vs producción";
  `data-*` pattern documentado; `emailjs.ts` aclarado como uso sólo-Totara
- **`astro-web/scripts/gas-contact-form.js`** — comentario de compatibilidad actualizado a `text/plain`

---

## v1.0-astro-foundation · 19 mar 2026

### Baseline estable Astro — punto formal de rollback

> **Esta versión no es el producto terminado.**
> Es la primera baseline estable de la migración a Astro: un punto de rollback limpio
> desde el cual continuar el desarrollo sin riesgo.
> Tag git: `v1.0-astro-foundation` · commit: `aaab14c`

#### Infraestructura Astro

- **`astro.config.mjs`** — `site: 'https://nuevo.taec.com.mx'`, `trailingSlash: 'ignore'`, `build.format: 'directory'`
- **`BaseLayout.astro`** — `<link rel="canonical">`, OG meta tags (og:type, og:url, og:title, og:description, og:image), atributos `data-section`/`data-page` para active-nav
- **`contact.ts`** — fuente única de verdad: WhatsApp, TidyCal, email, tienda, redes sociales, dominios regionales
- **`navigation.ts`** — menú principal tipado (`MainNavItem`, `NavColumn`, `NavSubItem`) y links de footer

#### Componentes UI reutilizables (`src/components/ui/`)

- **`HeroComercial.astro`** — hero por tema (moo / tot / art / vyond / general), logo de partner, botones con `target?` opcional y `rel="noopener noreferrer"` automático
- **`GridBeneficios.astro`** — grid de tarjetas de beneficios, 2/3/4 columnas, themed
- **`FAQAccordion.astro`** — acordeón accesible con `<details>/<summary>` nativo; sin JS; corrige FAQ permanentemente roto en Articulate (JS de toggle nunca existió)
- **`CtaFinal.astro`** — banda CTA con WhatsApp + TidyCal incluidos por defecto desde `contact.ts`
- **`LogosGrid.astro`** — grid de logos (imagen o texto), themed; implementado, pendiente de conectar a páginas

#### Páginas comerciales refactorizadas

| Página | Líneas antes | Líneas después | Reducción |
|---|---|---|---|
| `moodle-mexico` (piloto) | ~345 | ~230 | −115 |
| `articulate-360-mexico` | 687 | ~497 | −190 |
| `vyond-mexico` | ~478 | ~324 | −154 |
| `totara-lms-mexico` | ~549 | ~360 | −189 |

#### Documentación

- **`COMPONENTS.md`** — guía de uso, props, cuándo usar y cuándo NO usar cada componente UI

#### Verificación de cierre

- Build limpio: **48 páginas, 0 errores, 0 warnings críticos**
- Rutas públicas intactas (sin cambios de URL ni slugs)
- Navegación, header y footer correctos en todas las páginas
- Build time: 834 ms

#### Pendiente para siguientes lotes

- Páginas de producto restantes sin refactorizar (BigBlueButton, CustomGuide, Go1, OttoLearn, Proctorizer, StrikePlagiarism, Zoola, Articulate sub-páginas)
- `LogosGrid` conectado a páginas reales
- Página de contacto (formulario + lógica de envío en Astro)
- Blog / Artículos (rutas existentes con contenido placeholder)
- Optimización de imágenes con `<Image>` de Astro y lazy loading
- Testing visual automatizado (snapshot baseline)
- Pipeline CI/CD a producción
- Deuda residual de Fase 1 HTML: `articulate-localization`, `articulate-review360` (tokens diferidos), Grupo A/B inline CSS/JS

---

## v3.00 · 18 mar 2026

### Cierre técnico — Fase 1 completa (Fase 1 + Fase 1B)

#### Qué quedó 100% limpio (26 archivos)

Sin redundancia inline de ningún tipo respecto a los 4 archivos externos
(`base.css`, `header.css`, `footer.css`, `nav.js`):

`index.html` · `articulate-360-mexico` · `contacto` · `7minutes-learning` ·
`bigbluebutton-mexico` · `capacitacion-abierta` · `capacitacion-cerrada` ·
`class-taec` · `clientes` · `curso-articulate` · `customguide-mexico` ·
`go1-mexico` · `lys-mexico` · `moodle-mexico` · `nosotros` · `ottolearn-mexico` ·
`proctorizer-mexico` · `recursos` · `servicios` · `strikeplagiarism-mexico` ·
`totara-lms-mexico` · `vyond-mexico` · `zoola-analytics` · `vyond-enterprise` ·
`vyond-professional` · `vyond-starter`

`nav.js` actualizado: hamburger toggle incluye `setAttribute('aria-label', ...)` para
accesibilidad ARIA dinámica (cubre ambas variantes de implementación preexistentes).

#### Deuda residual documentada para Fase 2

**Grupo A — `nav-link.active` CSS inline restante (11 archivos):**
`articulate-ai-assistant` · `articulate-reach` · `articulate-rise360` ·
`articulate-storyline360` · `articulos` · `blog` · `comparativos` · `estandares` ·
`glosario` · `quiz` · `radar`

Causa: inline usa selector `header a.active` (más amplio que `header a.nav-link.active`
en `header.css`). No se eliminó para evitar regresión de selector. Sin impacto visual
actual (cascade idéntica). Requiere auditoría de selectores antes de limpiar.

**Grupo B — CSS de footer + `nav-link.active` inline (9 archivos):**
`curso-cerrado-empresa` · `curso-cerrado-grupos` · `curso-fundamentos` ·
`curso-moodle` · `curso-storyline` · `curso-vyond` · `vyond-go` · `vyond-mobile` ·
`vyond-studio`

Causa: `footer { background: #04293F }` difiere de `var(--navy)` en `footer.css` —
variante de diseño de footer intencional. JS global extraído en Fase 1B; solo
persiste CSS de footer. `vyond-go/mobile/studio` conservan su bloque de video
(`// ── Video play/pause`) en `<script>` propio.

**Grupo C — Sistema de diseño diferente, diferidos íntegros (2 archivos):**
`articulate-localization` · `articulate-review360`

Causa: tokens `:root` distintos (`--orange: #F59E0B`, tokens `--art`); sin marcadores
de sección en CSS ni en JS. Los 3 `<link>` y `nav.js` están añadidos pero CSS y JS
global permanecen inline. Requieren estrategia de tokens separada en Fase 2.

#### Páginas que requieren QA visual prioritario

1. **`vyond-go` · `vyond-mobile` · `vyond-studio`** — script de video reestructurado;
   verificar play/pause y mute del hero-video tras el deploy.
2. **`articulos` · `blog` · `estandares`** — JS de filtrado/búsqueda convive con
   nav.js en mismo `<script>`; verificar que los filtros funcionan correctamente.
3. **`articulate-localization` · `articulate-review360`** — dos sistemas de tokens
   activos simultáneamente (externo + inline); verificar que el diseño no presenta
   conflictos de color o tipografía visibles.
4. **`totara-lms-mexico`** — página con formulario EmailJS y scroll-tracking inline;
   verificar envío de formulario y barra sticky post-extracción de JS global.

#### Qué no se tocó deliberadamente

- `summit-articulate/` (5 archivos): sistema de diseño independiente, IBM Plex Sans,
  tokens propios, sin header/footer TAEC. Excluido del alcance de Fase 1.
- CSS de footer en Grupo B (9 archivos): `#04293F` es variante de diseño válida;
  no se unificó para no alterar diseño visible.
- `header a.active` inline en 11 archivos: diferencia de selector con consecuencias
  potenciales; no se eliminó sin auditoría previa.
- Contenido HTML, URLs públicas, slugs, sitemap — sin modificaciones.
- Código JavaScript específico de página (filtros, video, formularios, scroll
  tracking): preservado sin alteración.

#### Métricas consolidadas (Fase 1 + Fase 1B)

- Archivos HTML procesados: 46 de 48 (96 %)
- Archivos 100 % limpios: 26 (54 %)
- Archivos con deuda residual documentada: 20 (42 %)
- Archivos diferidos a Fase 2: 2 (4 %)
- Archivos excluidos por diseño: 5 (summit-articulate)
- Código global centralizado: 355 líneas en 4 archivos, sirven 46 páginas
- Reducción neta estimada: ~8 100 líneas inline eliminadas (≈ −28 %)

#### Recomendaciones para el merge

1. **QA visual mínimo antes de merge a `main`:** verificar las 4 páginas prioritarias
   listadas arriba en staging (`elzorromexican.github.io/taec-web`).
2. **Smoke test de navegación:** hamburger, dropdown desktop, acordeón móvil y
   active-nav en al menos 3 páginas de secciones distintas.
3. **No mergear** `articulate-localization` ni `articulate-review360` sin revisar
   manualmente que su diseño visual no presenta regresiones.
4. **Rama de trabajo:** `refactor/fase1-css-js-global` — merge a `main` solo tras
   QA aprobado. No hacer squash: preservar historial de Fase 1 y Fase 1B por
   trazabilidad.
5. **Fase 2 pendiente:** abrir issue o rama para (a) unificar selector `header a.active`,
   (b) resolver tokens de footer Grupo B, (c) procesar los 2 archivos Type B.

---

## v2.6 · 18 mar 2026

### Refactor Fase 1 — Externalización CSS/JS global

**Archivos creados:**
- `assets/css/base.css` — Reset, design tokens `:root`, tipografía base, accesibilidad (50 líneas)
- `assets/css/header.css` — Header sticky, nav desktop, mega-menu, dropdown, hamburger, nav móvil, active-nav (165 líneas)
- `assets/css/footer.css` — Footer grid, LATAM strip, WhatsApp flotante, responsive footer (45 líneas)
- `assets/js/nav.js` — Año dinámico, active nav, hamburger toggle, toggleMob, dropdown click-toggle (93 líneas)
- `scripts/fase1_externalize.py` — Script de externalización batch

**48 archivos HTML modificados** (47 en `/pages/` + `index.html`):
- Eliminados bloques CSS inline globales (reset+tokens+header, footer, wa-float, accessibility, footer-latam, active-nav)
- Eliminados bloques JS inline globales (year, active nav IIFE, hamburger, toggleMob, dropdown IIFE)
- Añadidos `<link>` a los 3 CSS externos + `<script defer>` a nav.js

**sitemap.xml** — 40 URLs → 48 URLs:
- Añadidas: Blog & Recursos (8 páginas), capacitacion-abierta/cerrada, servicios, planes Vyond (3)
- Uniformado `<lastmod>2026-03-18</lastmod>` en todas las URLs
- `priority` ajustado por tipo: 1.0 home · 0.9 productos principales · 0.8 subproductos · 0.7 cursos/empresa · 0.6 recursos/add-ons

**Métricas:**
- Líneas HTML antes: 29,303 · después: 21,907 · reducción: **−7,396 líneas (−25%)**
- Código compartido en 4 archivos: 353 líneas (sirven 48 páginas)
- `summit-articulate/` excluido (sistema de diseño independiente)

**Notas técnicas:**
- `articulate-localization.html` y `articulate-review360.html` usan sistema de diseño diferente (tokens distintos, sin marcadores de sección): links añadidos, CSS inline permanece por seguridad. Flaggeados para Fase 2.
- Páginas `curso-cerrado-*`, `vyond-go/studio/mobile` y otras con footer sin marcadores de comentario: header prefix extraído, footer aún inline (override de cascade garantiza sin regresión visual).

---

## v2.5 · 18 mar 2026

### Blog & Recursos — Sección completa (8 páginas nuevas)

Migración total del contenido de `taec-elearning.neocities.org` al sitio principal.
Neocities queda en proceso de decommission.

**`pages/recursos.html`** — Hub principal
- Hero navy gradient, eyebrow "Blog & Recursos"
- 4 stats: 456 total · 232 glosario · 93 blog · 18 artículos
- 7 `.sec-card` con links a cada sub-sección; Blog y Artículos con clase `.featured` (acento naranja)

**`pages/blog.html`**
- Grid 3 columnas `.post-card` con data-titulo, data-tags, data-fecha
- Barra sticky: búsqueda + conteo dinámico
- Tags filter construido dinámicamente desde data-tags
- Injection point `<!-- INICIO_POSTS -->` / `<!-- FIN_POSTS -->`

**`pages/articulos.html`**
- `.art-card` expandibles (toggle +/×)
- Filter tags + búsqueda
- Injection point `<!-- INICIO_ARTICULOS -->` / `<!-- FIN_ARTICULOS -->`

**`pages/glosario.html`**
- Index alfabético auto-construido desde `.glo-group[data-letra]`
- `.glo-term` expandibles con data-termino, data-definicion
- Búsqueda override del filtro alfabético
- Injection point `<!-- INICIO_GLOSARIO -->` / `<!-- FIN_GLOSARIO -->`

**`pages/comparativos.html`**
- `.comp-card` expandibles con tablas `.comp-table` internas (th navy, filas alternadas)
- Injection point `<!-- INICIO_COMPARATIVOS -->` / `<!-- FIN_COMPARATIVOS -->`

**`pages/estandares.html`**
- Grid 2 col `.est-card` con emoji, nombre, badge categoría, `<dl>` expandible
- Filter pills por categoría + búsqueda
- Injection point `<!-- INICIO_ESTANDARES -->` / `<!-- FIN_ESTANDARES -->`

**`pages/radar.html`**
- Grid 2 col `.rad-card` con badge edición, título, fecha, resumen, "Ver edición →"
- Búsqueda + conteo
- Injection point `<!-- INICIO_RADAR -->` / `<!-- FIN_RADAR -->`

**`pages/quiz.html`**
- CSS 3D flip animation 500ms — navy front / white back
- Progress bar, Anterior/Siguiente, Barajar (shuffle)
- Keyboard: Enter/Space flip · ←/→ navegar
- Injection point `<!-- INICIO_FLASHCARDS -->` / `<!-- FIN_FLASHCARDS -->`

### Nav & Footer — 39 archivos actualizados (batch Python)
- Añadido `<a href="recursos.html">Recursos</a>` en nav desktop y mobile (entre Nosotros y Clientes)
- Footer columna "Recursos" → "Blog & Recursos" con links internos (blog, artículos, glosario, comparativos, recursos)
- Eliminados links externos a Neocities del footer

### Arquitectura de contenido — decisión tomada
- Contenido se cargará desde **archivos JSON externos** via `fetch()` en runtime
- Los HTMLs son cascarones ligeros con injection points; el JSON alimenta el render JS
- `data/blog.json`, `data/glosario.json`, `data/quiz.json`, etc. — pendiente generar desde CSVs

---

## v2.4 · 16 mar 2026

### Totara LMS — Página completa (`totara-lms-mexico.html`)
- Reconstrucción total desde "En construcción" a página de producto completa
- **Hero** — gradiente oscuro navy `#001f3d → #004775 → #0077b6`, eyebrow "Totara LMS" en teal `#A8DBD9`
- **Reseller badge** — `totara-reseller-vertical.png` en cuadro derecho del hero (sobre bullets), quitado logo genérico Totara
- **Stats** — 20M+ usuarios · 35+ idiomas · 500+ empresas · 17 países
- **3 productos** — Totara Learn / Totara Perform / Totara Mobile (Ayleen AI es feature integrado, NO producto separado)
- **6 tarjetas "Por qué"** — Personalizable, Multidioma, Rutas de aprendizaje, Cumplimiento, App móvil, Soporte TAEC
- **Badges de reconocimiento** — 4 imágenes reales de totara.com (2025-2026), no CSS cards
- **G2** — link corregido: `/products/totara-learn/reviews` → `/products/totara-lms/reviews`
- **Testimonial** — Isabel Flores, ISDIN
- **FAQ** — 6 preguntas frecuentes

### Totara — Lead Magnet "Novedades V20"
- Formulario de registro (Nombre, Empresa, Email, Cargo) con EmailJS antes de descarga
- EmailJS: servicio de email transaccional configurado (credenciales en variables de entorno)
- Al enviar: formulario se oculta, aparece botón de descarga del PDF
- **`assets/docs/totara-v20-novedades.pdf`** — PDF oficial Totara V20 (685 KB)

### Totara — Sticky bar de captación
- Barra fija en la parte inferior: aparece al scrollear 600px (scroll nativo, sin IntersectionObserver)
- Texto izquierda: "Descarga gratis: Novedades Totara V20" + subtexto
- **GIF animado** centro: `assets/download-icon.gif` dentro de contenedor circular teal `#A8DBD9` con `mix-blend-mode: multiply` (elimina fondo blanco del GIF sin editar el archivo)
- Botón CTA derecha: "Descargar →" con animación `pulse-btn`
- 3 animaciones CSS: `bounce-icon`, `pulse-btn`, `glow-border`
- Botón × para cerrar

### Assets nuevos
- **`assets/logos/totara-reseller-vertical.png`** — Badge Totara Authorized Reseller vertical (90 KB)
- **`assets/logos/totara-reseller-horizontal.png`** — Badge Totara Authorized Reseller horizontal (202 KB, comprimido de 4.9 MB con `sips`)
- **`assets/docs/totara-v20-novedades.pdf`** — PDF V20 para lead magnet
- **`assets/download-icon.gif`** — Ícono animado de descarga para sticky bar (90 KB)

---

## v2.3 · 16 mar 2026

### Vyond — Badge Certified Partner
- Movido al cuadro derecho del hero (sobre los bullets "Por qué elegir Vyond con TAEC"), quitado de la sección de reconocimientos inferior
- Separador visual con `border-bottom` incluido

### Vyond — Tabs de navegación
- Tab activo: eliminado fondo negro, conserva texto naranja `#C84D16` con raya inferior — igual que Articulate
- Fix aplicado con `!important` en los 4 archivos: `vyond-mexico.html`, `vyond-go.html`, `vyond-studio.html`, `vyond-mobile.html`

### Vyond — Precios (`vyond-mexico.html`)
- Solo precio anual visible (eliminado precio mensual para evitar confusión)
- Badge "⭐ Mejor opción para equipos" (antes decía "para empresas")
- Eliminado: "Multi-seat", "Customer Success TAEC" de las tarjetas

### Rise 360 — Hero visual
- Imagen externa de Articulate (bloqueada por hotlink) reemplazada por mockup CSS del editor
- Muestra: sidebar de bloques, canvas con header, bloque de texto y quiz de opción múltiple
- Cero dependencia externa, carga instantánea

### Eyebrow — Articulate (6 páginas)
- Color unificado a `#7DD3FC` en: Rise 360, Storyline 360, Review 360, Reach 360, AI Assistant, Localization
- Mismo tamaño `clamp(22px,2.4vw,32px)` y peso `900` en todas

### Articulate 360 — página principal
- Badge Authorized Reseller duplicado eliminado del hero (quedaba uno solo en la tarjeta derecha)
- "PARTNER OFICIAL · MÉXICO Y LATAM" ajustado al mismo estilo eyebrow que las demás páginas

### Mega menú — Articulate 360 (5 archivos)
- **`curso-cerrado-empresa.html`**, **`curso-cerrado-grupos.html`**, **`curso-fundamentos.html`**, **`curso-moodle.html`**, **`curso-vyond.html`**
- Sublinks Articulate actualizados: de anchors internos (`#rise`, `#storyline`, `#studio`, `#content-library`, `#ai`) a páginas reales (`articulate-rise360.html`, `articulate-storyline360.html`, `articulate-review360.html`, `articulate-reach.html`, `articulate-ai-assistant.html`, `articulate-localization.html`)
- Sublinks Vyond actualizados: de `#starter` / `#professional` → `vyond-go.html` / `vyond-studio.html` / `vyond-mobile.html`
- Los otros ~35 archivos ya tenían los links correctos desde v2.2

---

## v2.2 · 15 mar 2026

### Home (`index.html`)
- **Headline** rediseñado: *"Articulate + Vyond + LMS + capacitación: el stack completo en español"* (reemplaza "resultados reales")
- **Hero tag** — `white-space: nowrap`: ya no se parte en 2 líneas
- **Hero sub-copy** — *"Sin soluciones genéricas. Analizamos tu contexto real antes de recomendar nada."*
- **Stat** — "+200 proyectos entregados" → "+200 implementaciones enterprise"
- **Confían en TAEC** — chips de texto → píldoras blancas con logos reales vía Clearbit API (GS1, VivaAerobús, UNICEF, OIM, Mosaic, F. Omar Dengo, Linktech) con fallback a texto

### Vyond — Precios (`vyond-mexico.html`)
- Sección de precios rediseñada: 3 columnas al estilo Articulate 360
  - **Demo gratuita** — link directo `think.vyond.com/signup`, sin tarjeta de crédito
  - **Professional** — US$1,199/año (precio anual único)
  - **Enterprise** — US$1,649/año · badge "⭐ Mejor opción para equipos"
- Eliminado: precio mensual, "Multi-seat", "Customer Success TAEC" de tarjetas

### Vyond — Navegación por tabs
- Pestaña **Vyond** añadida como primera opción en los 4 archivos (mexico, go, studio, mobile)
- `vyond-mexico.html` ahora tiene barra de tabs completa idéntica a Articulate 360

### Videos Vyond
- Botón 🔇/🔊 añadido en esquina inferior derecha de los 3 videos hero (go, studio, mobile)

### SEO
- **`sitemap.xml`** — 40 URLs con prioridades por tipo de página (1.0 home → 0.6 add-ons)
- **`robots.txt`** — `Allow: /` + referencia a sitemap
- Pendiente: enviar sitemap en Google Search Console

---

## v2.1 · 15 mar 2026

### Vyond — Subpáginas completas
- **`vyond-go.html`** — Página de producto Vyond Go: hero, "De texto a video en segundos", cómo funciona (3 pasos), quote Virgenia Hall (Indeed), 4 casos de uso, explore-more, CTA. Contenido basado en vyond.com/product/vyond-go/
- **`vyond-studio.html`** — Vyond Studio: editor drag-and-drop, 80+ idiomas, 1,100+ avatares IA, quote Christopher Annand (Cargill), 4 casos de uso, CTA
- **`vyond-mobile.html`** — Vyond Mobile: Smart Capture con IA, Vyond Go en bolsillo, sincronización en tiempo real, 4 casos de uso
- **`vyond-starter.html`** / **`vyond-professional.html`** / **`vyond-enterprise.html`** — 3 páginas de planes con comparativa visual de 3 columnas, features grid (6 tarjetas), use cases, CTA band
- **Mega menu Vyond** actualizado en 34 archivos: Go [IA] · Studio · Mobile · "Ver planes →" (antes: Starter · Professional · Enterprise)
- **Tabs de navegación** entre productos (Go / Studio / Mobile) en cada subpágina
- **Barra Fortune 500** — "65% de las empresas Fortune 500 confían en Vyond" en las 3 páginas de producto

### Vyond — Badges y reconocimientos
- **`assets/badges/`** — Nuevo directorio: 6 badges G2 Winter 2026 Enterprise (Leader, Best Results, Best Usability, Best ROI, Most Implementable, Easiest Setup) + Vyond Certified Partner badge
- **Sección de reconocimientos** en `vyond-mexico.html`: franja visual con los 7 badges entre el bloque G2 y el FAQ

### Vyond — Landing page principal
- **`vyond-mexico.html`** completamente reconstruido: hero 2-col gradiente oscuro, stats bar (70+ idiomas · 40K+ props · 4M+ recursos · 20K+ empresas), 3 productos (Go/Studio/Mobile), IA features grid, testimonial Rance Greene, G2 (4.8/5 · 466 reseñas), badges strip, FAQ 7 preguntas `<details>`, CTA band naranja
- Contenido basado en tictaclearn.net/products/vyond

### Assets
- **`assets/logos/vyond.svg`** — SVG oficial Vyond naranja #C84D16 (reemplaza PNG)
- **`assets/logos/articulate-reseller.svg`** — Badge oficial Articulate Authorized Reseller
- **`assets/logos/totara.png`** — Logo Totara
- **`.product-logo-wrap`** CSS — Píldora blanca para logos en fondos oscuros (reemplaza `filter: brightness(0) invert(1)`)

### SEO y verificación
- **`google6fa6407ffaf5623d.html`** — Archivo de verificación Google Search Console
- **`sitemap.xml`** y **`robots.txt`** añadidos al repositorio

### Otros productos
- **`totara-lms-mexico.html`** — Logo Totara + 6 badges G2 Winter 2026 Enterprise con barras de color
- **`articulate-360-mexico.html`** — Badge Authorized Reseller + sección G2 (4.7/5 · 621 reseñas)
- **Versión** bumpeada de `(ver 2.0)` → `(ver 2.1)` en los 34 archivos HTML

---

## v2.0 · 14-15 mar 2026
- **Footer canónico** — mismo HTML en las 21 páginas: columnas Soluciones · Recursos · Empresa + Soporte técnico
- Franja "También en:" 🇲🇽 taec.com.mx · 🇨🇴 taec.com.co · 🇨🇱 taec.cl en todos los footers
- CSS unificado del footer (tipografía, colores, hover) aplicado en todos los archivos
- **Oficinas Colombia y Chile** en `nosotros.html`: dirección, teléfonos locales y links a taec.com.co / taec.cl
- **Nav activa (ficha de cardex)** — ítem del menú actual resaltado con fondo #111827 y texto blanco
  - Soluciones / Capacitación: detectados por regex de pathname
  - Nosotros / Clientes / Contacto: detectados por nombre de archivo exacto (filename match)
  - Fix: `a.closest('.mega-menu') || a.closest('.simple-dropdown') → return` (links dentro del dropdown no se marcan activos)
- **Fix dropdown hover** — gap de 6px eliminado definitivamente: `top: calc(100%+6px)` → `top: 100%` en CSS origen
  - Eliminados bloques CSS/JS duplicados y conflictivos acumulados en parches anteriores
  - JS reescrito: hover (mouseenter/mouseleave) + click-toggle en un solo bloque limpio
- **Frase hero** — "Partner Oficial · México y LATAM · desde 2007" → "Especialistas en e-learning corporativo · México y LATAM · desde 2007"
- **7 landing pages de Capacitación** — una página por cada ítem del dropdown
  - `curso-articulate.html` — Articulate 360 Certificado (Básico · Avanzado · Experto · Rise 360+ · Completo) + AI Assistant
  - `curso-storyline.html` — Storyline 360 Técnicas Avanzadas
  - `curso-vyond.html` — Vyond Essentials
  - `curso-moodle.html` — Moodle (3 opciones: Creación · Administración · Combinado)
  - `curso-fundamentos.html` — Fundamentos del Diseño e-Learning + Diseño Instruccional (8 hrs)
  - `curso-cerrado-empresa.html` — Capacitación Cerrada para tu Empresa
  - `curso-cerrado-grupos.html` — Grupos a Medida (programas personalizados)
  - Contenido real extraído de taec.com.mx/cursos-capacitacion.php
- **Dropdown Capacitación** — cada ítem enlaza a su landing page específica
- **Active nav** — regex `|curso-/` para resaltar "Capacitación" en las 7 nuevas páginas
- **Mobile nav** — Cursos Abiertos actualizado con links a nuevas páginas

## v1.9 · 14 mar 2026
- `pages/nosotros.html` — Página completa con datos reales TAEC (reemplaza placeholder "En construcción")
- Hero con nombre legal completo: Tecnología Avanzada para la Educación y la Capacitación, S.A. de C.V.
- Stats band: fundada 2007 · +1,500 clientes · 17 países · +200 proyectos entregados
- Sección Quiénes somos con 4 valores corporativos (Expertise, Resultados, Cercanía, Innovación)
- Mercados con barras visuales: Corporativo 70% · Académico 20% · Gubernamental 10%
- Servicios: 6 tarjetas (Plataformas LMS, Contenido e-learning, Articulate 360, Vyond, Consultoría, Soporte)
- Partners oficiales: Articulate (desde 2007), Vyond, Totara
- Oficinas: 🇲🇽 CDMX (sede) · 🇨🇴 Bogotá · 🇨🇱 Santiago de Chile
- CTA doble: TidyCal (Agendar diagnóstico) + WhatsApp
- WCAG 2.1 AA completo: skip link, aria, focus-visible, contraste
- Footer version: (ver 1.9)

## v1.8 · 14 mar 2026
- 18 páginas nuevas "En construcción" con header/footer completo y accesibilidad WCAG
- Árbol de navegación completo: todos los `href="#"` reemplazados por rutas reales
- Fix logo TAEC en `index.html`: `href="/"` → `href="./index.html"` (fix GitHub Pages staging)
- Mobile nav `index.html`: fix link Class, añadir sección Catálogo Listo (7 Minutes, GO1, Custom Guide)
- `contacto.html`: añadir `overflow-x: hidden` en body (previene scroll horizontal en móvil)
- Footer version actualizado a (ver 1.8) en index.html

## v1.7 · 14 mar 2026
- **Accesibilidad WCAG 2.1 AA** — correcciones aplicadas en `index.html`, `articulate-360-mexico.html` y `contacto.html`
- Skip link "Ir al contenido principal" en los 3 archivos
- `<main id="main-content">` como landmark de contenido principal
- `aria-label` en botones de testimonio (← →) y toggle Standard/AI
- `aria-haspopup` + `aria-expanded` en dropdowns desktop (Soluciones, Capacitación)
- `aria-expanded` + `aria-controls` dinámicos en acordeón móvil (toggleMob actualizado)
- `aria-pressed` + `aria-label` dinámico en toggle Standard/AI de Articulate
- `aria-required="true"` en campos obligatorios del formulario de contacto
- `aria-hidden="true"` en SVGs decorativos del nav
- `rel="noopener noreferrer"` en todos los `target="_blank"`
- `:focus-visible` con `outline: 3px solid var(--blue)` en los 3 archivos
- `.mob-cat` color fijado a `#4B5563` (ratio 7:1) — eliminado `var(--muted)` en index.html
- Ver estándar completo: `docs/accesibilidad.md`

## v1.6 · 14 mar 2026
- `articulate-360-mexico.html` — Link de prueba actualizado a versión en español (`articulate.com/es/360/trial/`)

## v1.5 · 14 mar 2026
- `articulate-360-mexico.html` — Sección de precios rediseñada: layout 3 columnas estilo puntomov
- Toggle Standard / AI con cambio de precios en tiempo real
- Tarjeta "Prueba Gratis 30 días" como primera columna
- "Mismo precio en renovaciones" en planes pagados
- "Sin tarjeta de crédito" visible

## v1.4 · 14 mar 2026
- `articulate-360-mexico.html` — Franja de métricas Articulate (50M+ learners, 160 países, #1 suite)
- Sección "Tu cuenta activa en 24 horas" — 4 pasos visuales
- Caso de éxito: empresa financiera, 70% reducción tiempo producción
- Botón "Prueba gratis 30 días" en hero
- "Sin tarjeta de crédito requerida" bajo CTAs del hero

## v1.3 · 14 mar 2026
- `articulate-360-mexico.html` — FAQ: respuesta de precios actualizada (30 días vigencia, USD sin IVA, tipo de cambio al momento de pagar)

## v1.2 · 14 mar 2026
- `pages/articulate-360-mexico.html` — Primera versión de la página SEO geo-targeted para Articulate 360 en México
- Hero, Qué incluye, Por qué TAEC, Precios (Personal + Teams + AI add-on), FAQ (8 preguntas), CTA band
- Footer con YouTube, Facebook, LinkedIn, WhatsApp

## v1.1 · 13 mar 2026
- `pages/contacto.html` — Formulario de contacto con EmailJS (servicio transaccional configurado)
- Campos: nombre, empresa, email, teléfono, tema, mensaje
- EmailJS configurado para entrega a info@taec.com.mx

## v1.0 · 12 mar 2026
- `index.html` — Home page completo
- Header sticky, Hero con stats dinámicos, Ticker de noticias (data/ticker.json)
- Partners strip, Servicios (5 tarjetas), Cómo trabajamos (4 pasos)
- Testimonios carousel (8 testimoniales reales), Clientes strip, Recursos, CTA band
- Footer 4 columnas con redes sociales (LinkedIn, YouTube, Facebook, WhatsApp)
- Botón flotante WhatsApp
- `assets/logo.svg` — Logo TAEC color
- `data/ticker.json` — 5 artículos recientes
- `.gitignore`

---

## Stack técnico
- HTML5 / CSS3 (custom properties) / JS vanilla — sin frameworks
- Fuentes: DM Serif Display + Inter (Google Fonts)
- Hosting staging: GitHub Pages (`elzorromexican.github.io/taec-web`)
- Hosting producción: `nuevo.taec.com.mx` (pendiente switch DNS)
- Formulario: EmailJS (plan gratuito, 200 emails/mes)
