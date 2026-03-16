# CHANGELOG — TAEC Web

Versiones del sitio nuevo.taec.com.mx (staging: elzorromexican.github.io/taec-web)

---

## v2.3 · 16 mar 2026

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
- `pages/contacto.html` — Formulario de contacto con EmailJS (service_v232r5x / template_xjgle2w)
- Campos: nombre, empresa, email, teléfono, tema, mensaje
- EmailJS configurado con cuenta smasmoudi@taec.com.mx → entrega a info@taec.com.mx

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
