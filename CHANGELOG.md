# CHANGELOG — TAEC Web

Versiones del sitio nuevo.taec.com.mx (staging: elzorromexican.github.io/taec-web)

---

## v2.0 · 14 mar 2026
- **Footer canónico** — mismo HTML en las 21 páginas: columnas Soluciones · Recursos · Empresa + Soporte técnico
- Franja "También en:" 🇲🇽 taec.com.mx · 🇨🇴 taec.com.co · 🇨🇱 taec.cl en todos los footers
- CSS unificado del footer (tipografía, colores, hover) aplicado vía override en todos los archivos
- **Oficinas Colombia y Chile** en `nosotros.html`: dirección, teléfonos locales y links a taec.com.co / taec.cl
- **Nav activa (ficha de cardex)** — ítem del menú actual resaltado con fondo #111827 y texto blanco
  - Soluciones / Capacitación: detectados por regex de pathname
  - Nosotros / Clientes / Contacto: detectados por nombre de archivo exacto (filename match)
- **Fix dropdown hover** — gap de 6px eliminado: `top: calc(100%+6px)` → `top: 100%` con `padding-top` interno
  - Soluciones y Capacitación ahora navegables sin que el menú se cierre al bajar el cursor
  - Confirmado: gap = 0px en staging (verificado via JS en Chrome)

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
