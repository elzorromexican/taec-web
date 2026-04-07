# CHANGELOG — TAEC Web

Staging: `https://elzorromexican.github.io/taec-web/`
Producción futura: `https://nuevo.taec.com.mx`

> Historial anterior (v1.0 – v1.5 · mar 2026) archivado en:
---

## v2.0.1 · 06 abr 2026, 17:15 (Fase 1 UX Hub)

### B2B Intranet — Refinamiento Visual y UX
- **Dashboard Modular:** Sustitución de apilamiento vertical infinito por un *Grid paramétrico* de 2 columnas (`1fr 1fr`) logrando optimización total del espacio *Above The Fold*.
- **Restricción de Alturas (*Line-Clamp*):** Limite estricto de 6 líneas por tarjeta de aviso para repeler paredes de texto, complementado con inyección de atributos `title` como *tooltips* nativos de lectura (*Zero JS, Zero Layout Shift*).
- **Legibilidad WCAG:** Recalibración del contraste en estado "deshabilitado" de *Accesos Directos*, sustituyendo opacidad translúcida por contornos perimetrales gruesos (`dashed #64748b`) y fondos en escala de grises para máxima asertividad.
- **KB Macro-Acordeones:** Transformación de la arquitectura de Playbooks aislando listas exhaustivas ("Matriz Comercial", "Matriz Técnica") en grupos colapsables masivos interactivos, reduciendo el ruido cognitivo.

---

## v2.0 · 05 abr 2026, 22:15

### Infraestructura — Deploy dual operativo

- **Fix crítico dev server:** `astro.config.mjs` cambia a `output: 'server'` como default. El adapter `@astrojs/netlify` ahora se carga condicionalmente solo cuando `NETLIFY=true`. Resuelve error `__DEFINES__ is not defined` que bloqueaba el servidor local.
- **GitHub Pages:** Workflow `deploy-pages.yml` inyecta `ASTRO_STATIC_BUILD=true` para forzar `output: 'static'` únicamente en el build de staging.
- **Netlify producción:** `NETLIFY=true` (inyectado automáticamente) activa el adapter SSR. Build verde · 182 archivos desplegados.
- **Rama `feature/ddc-calculadora` fusionada a `main`.** Producción y staging apuntan a `main`.

### Autenticación — Supabase OAuth Google

- OAuth Google completo y funcional en local (`localhost:4321`) y producción Netlify.
- 3 URLs registradas en Supabase Redirect URLs: `localhost:4321`, Netlify y `nuevo.taec.com.mx`.
- Flujo completo verificado: login → Google → `/interno/auth/callback` → cookies → `/interno/dashboard`.

### Seguridad — Blog comentarios

- **Nuevo endpoint SSR `/api/submit-comment.ts`:** Verifica token Cloudflare Turnstile contra la API `siteverify` server-side antes de insertar en Supabase. Usa `SUPABASE_SERVICE_ROLE_KEY` (nunca expuesta al cliente). Validación Zod de todos los campos.
- **Fix `BlogComments.astro`:** `loadComments()` ahora filtra `status=eq.approved` explícitamente. El submit ya no va directo a Supabase REST — pasa por el endpoint SSR.
- Variables de entorno requeridas en Netlify: `CF_TURNSTILE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

### SEO / Archivos de mantenimiento

- **`robots.txt`:** Agregado `Disallow: /interno/` — el intranet ya no es indexable por Google.
- **`llms.txt`:** Agregadas 3 páginas faltantes: `/vyond-starter`, `/capacitacion`, `/capacitacion-cerrada`.
- **`BaseLayout.astro`:** OG image fallback (`taec-og.png` 1200×630) agregado al repo. `hreflang` apunta a URL canónica por página. Schema.org y Breadcrumbs usan `Astro.site` dinámico. Fallback `userName` de ChatAgent cambiado de `'Slim'` → `'Visitante'`.
- **`taec-og.png`:** Copiado a `public/assets/logos/` (1200×630px).

### Documentación

- **`README.md` (root):** Reescrito y fusionado con `astro-web/README.md`. Stack real documentado: Gemini 2.5, Upstash Redis, Resend. GAS eliminado como tecnología activa. Sección de API endpoints SSR agregada con nota de enrutamiento geográfico (`x-nf-country`). Intranet Supabase documentada con flujo completo y Redirect URLs.

### Pendiente técnico registrado

- Middleware: cambiar `anonKey` por `serviceRoleKey` para consulta de `usuarios_autorizados` (defense-in-depth).
- Zoho CRM webhook en cotizador DDC (embudo de ventas sin trazabilidad).
- Chat history Tito Bits: migrar de `localStorage` a Supabase para persistencia cross-device.

---

## v2.1 · 06 abr 2026

### Fix crítico — Netlify Secrets Scanner (build roto)

**Síntoma:** Build de Netlify fallaba con exit code 2. El secrets scanner detectaba `AIza...` (API key de Google Gemini) incrustada en `.netlify/build/chunks/agente-ia_*.mjs`.

**Causa raíz:** Vite serializa el objeto `import.meta.env` completo en el bundle SSR compilado. Cualquier variable presente en el entorno de build queda como valor literal en el `.mjs` — incluyendo secrets. El scanner de Netlify escanea el output final y bloquea el deploy correctamente.

**Fix:** `src/pages/api/agente-ia.ts` — eliminado todo uso de `import.meta.env` para secrets. Reemplazado por `process.env` exclusivamente.

```typescript
// ❌ Antes — Vite inlinea el valor en el bundle
let apiKey = import.meta.env.TAEC_GEMINI_KEY;

// ✅ Después — leído en runtime por la serverless function, nunca en el bundle
const apiKey = process.env['TAEC_GEMINI_KEY'];
```

`process.env` en Netlify SSR es inyectado por la plataforma en runtime. En dev local, Vite/Astro popula `process.env` desde `.env` via dotenv — funciona en ambos ambientes.

**Regla arquitectónica establecida:** En API routes SSR, todos los secrets (`TAEC_GEMINI_KEY`, `RESEND_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, etc.) deben accederse únicamente via `process.env`. Nunca via `import.meta.env`.

### Sanitización XSS — `send-transcript.ts`

- Regex de Markdown hardenizado: solo acepta esquemas `http://` y `https://` en enlaces — bloquea `javascript:`, `data:`, `vbscript:`
- Remoción de NUL bytes (`\0`) para prevenir evasión de parsers
- Mensaje `debug_netlify` movido a `console.error` — eliminado del response body público

### Resiliencia — `submit-contact.ts` (Opción A)

- `Promise.race` con timeout de 5s sobre Google Sheets API — corta conexión si hay latencia
- Fallback Resend: si Google Sheets falla, envía correo de rescate del lead a `smasmoudi@taec.com.mx`
- `crypto.randomUUID()` como TX ID — correlaciona errores entre consola y correo de emergencia

### Limpieza DDC (Opción B)

- Eliminados `ddc-pricing-matrix.json`, `interno/api/quote-ddc.ts`, `scripts/recalc-matrix.mjs` y `CotizadorDDC.astro` — el cotizador DDC migró a app externa independiente

---

## BASELINE · 20 mar 2026

### Estado del proyecto al cerrar la primera fase de desarrollo

---

### Stack

| Capa | Tecnología |
|---|---|
| Framework | Astro 6 · `build.format: directory` · `trailingSlash: ignore` |
| Hosting staging | GitHub Pages · `ASTRO_BASE=/taec-web/` |
| Hosting producción | Por definir (`nuevo.taec.com.mx`) |
| Deploy | GitHub Actions · `.github/workflows/deploy-pages.yml` |
| Estilos | CSS externo (`base.css`, `header.css`, `footer.css`, `index.css`) + `<style>` por página |
| Scripts | `nav.js` externo + `<script is:inline>` por componente cuando aplica |
| Agenda | Zoho Bookings — `getBookingUrl()` en `src/data/contact.ts` |
| Formulario | Google Apps Script (endpoint GAS) · POST `text/plain` para evitar CORS preflight |

---

### Páginas publicadas — 50 páginas

#### Soluciones — Autoría & Video
- `/articulate-360-mexico` · `/articulate-rise360` · `/articulate-storyline360`
- `/articulate-review360` · `/articulate-reach` · `/articulate-ai-assistant` · `/articulate-localization`
- `/vyond-mexico` · `/vyond-go` · `/vyond-studio` · `/vyond-mobile`
- `/vyond-enterprise` · `/vyond-professional` · `/vyond-starter`

#### Soluciones — Plataformas & LMS
- `/moodle-mexico` · `/totara-lms-mexico` · `/pifini-mexico` ← (antes NetExam)
- `/ottolearn-mexico` · `/lys-mexico`

#### Soluciones — Servicios & Add-ons
- `/desarrollo-de-contenidos` ← DDC (nueva)
- `/class-taec` · `/proctorizer-mexico` · `/strikeplagiarism-mexico`
- `/7minutes-learning` · `/customguide-mexico`

#### Capacitación
- `/capacitacion-abierta` · `/capacitacion-cerrada`
- `/curso-articulate` · `/curso-vyond` · `/curso-storyline`
- `/curso-moodle` · `/curso-fundamentos`
- `/curso-cerrado-empresa` · `/curso-cerrado-grupos`

#### Recursos
- `/recursos` · `/blog` · `/articulos` · `/glosario` · `/comparativos`
- `/estandares` · `/radar` · `/quiz`

#### Empresa
- `/nosotros` · `/clientes` · `/contacto` · `/servicios`

#### Páginas fuera de menú (conservadas)
- (Ninguna actualmente, productos descontinuados eliminados)

---

### Componentes UI reutilizables (`src/components/ui/`)

| Componente | Props clave | Themes disponibles |
|---|---|---|
| `HeroComercial.astro` | eyebrow, titleHtml, subtitle, features[], primaryBtn, secondaryBtn, cardLogoSrc | moo · tot · art · vyond · general |
| `GridBeneficios.astro` | title, cards[], columns (2/3/4) | moo · tot · art · vyond · general |
| `FAQAccordion.astro` | title, faqs[], subtitleLink? | moo · tot · art · vyond · general |
| `CtaFinal.astro` | title, subtitle, primaryBtnText, primaryBtnUrl | moo · tot · art · vyond · general |
| `LogosGrid.astro` | logos[] (type: image\|text), eyebrow? | moo · tot · art · vyond · general |

---

### Fuentes de datos centralizadas (`src/data/`)

| Archivo | Responsabilidad |
|---|---|
| `contact.ts` | Email, WhatsApp, `bookingUrl` (Zoho), `formEndpoint` (GAS), redes, dominios regionales |
| `navigation.ts` | Menú principal (`mainNav`), footer links (`footerLinks`), labels compartidos |
| `emailjs.ts` | Credenciales EmailJS — uso solo en Totara (legacy, pendiente de revisar) |
| `ddc.ts` | Contenido completo de la landing Desarrollo de Contenidos |

---

### Patrones de desarrollo establecidos

```typescript
// BASE URL — centralizado (importar en el frontmatter de cada página)
import { r } from '../utils/paths';

// BASE en runtime (para fetch/JS inline)
// BaseLayout inyecta data-base en <body>
const siteBase = document.body.dataset.base || '/';
```

---

### Integraciones activas

| Integración | Estado | Notas |
|---|---|---|
| **Zoho Bookings** | ✅ Activo | `https://smasmouditaeccommx.zohobookings.com` · pendiente URL de workspace branded |
| **Google Apps Script** | ✅ Activo | Endpoint GAS en `contact.ts` · guarda en Sheets · notificación email |
| **GitHub Pages CI** | ✅ Activo | Deploy automático en push a `main` |
| **WhatsApp** | ✅ Activo | `wa.me/5215527758279` |

---

### Navegación actual — Soluciones (mega menu)

```
Autoría & Video          Plataformas & LMS        Servicios & Add-ons
─────────────────        ─────────────────        ───────────────────
Articulate 360           Moodle (SaaS)            Desarrollo de Contenidos [DDC]
  Rise 360               Totara (SaaS)            ──────────────────────────────
  Storyline 360          Pifini Learn (SaaS)      Class (videoclases)
  Review 360             Ottolearn (SaaS)         Proctorizer
  Reach [Teams]          Lys (SaaS)               StrikePlagiarism
  AI Assistant [nuevo]                            ──────────────────────────────
  Localization [nuevo]                            Catálogo listo:
Vyond                                             7 Minutes
  Vyond Go [IA]                                   Custom Guide
  Vyond Studio
  Vyond Mobile
```

---

### Pendiente de próximas sesiones

- [ ] Zoho Bookings — cambiar subdominio a URL branded (`taec.zohobookings.com`)
- [x] `aviso-de-privacidad` y `terminos-y-condiciones` — páginas reales implementadas en Astro nativo.
- [ ] Logos reales para Pifini/NetExam, DDC y socios en LogosGrid
- [ ] `/blog` y `/articulos` — contenido real (ahora scaffold)
- [ ] Optimización de imágenes con `<Image>` de Astro
- [ ] Pipeline CI/CD a producción (`nuevo.taec.com.mx`)
- [ ] QA visual completo en staging antes de go-live
- [ ] `emailjs.ts` — revisar si sigue siendo necesario o se elimina

---

## Próximos cambios se registran aquí ↓

### 07 abr 2026 — Hardening Serverless y REST Bypass (TitoBits v6.1)
- **Bypass del SDK Google GenAI:** Identificado un conflicto de asincronía silencioso entre el entorno Edge/Lambda de Netlify (Node 20) y la librería en versión *preview* `@google/genai` que corrompía las cabeceras resultando en códigos crudos `401 Unauthorized` de Google Cloud.
- **Arquitectura Fetch Nativa:** Erradicación total de la dependencia del SDK en `api/agente-ia.ts`. Construcción de un puente HTTP `fetch` puro comunicándose directamente con la API REST `/v1beta/models/...:generateContent`, logrando inmunidad Serverless.
- **Sanitización Extrema (Environment):** Inserción de middlewares desinfectantes (`String.prototype.replace`) al momento de evaluar variables en el Runtime de Netlify para repeler inyecciones accidentales de copiado/pegado provocados por la UI web.

### 20 mar 2026 — Refactorización y Limpieza
- **Refactor (DRY):** Se extrajo la lógica de rutas absolutas `r(url)` que estaba duplicada en 49 páginas hacia el nuevo archivo central `src/utils/paths.ts`.
- **Limpieza (Purga):** Se eliminaron definitivamente las páginas y las referencias en la interfaz gráfica de los productos descontinuados: **Zoola Analytics**, **BigBlueButton** y **GO1**.

### 21 mar 2026 — Auditoría de Liberación y Refactorización Final (v3.1.0)
- **Higiene DOM y Eventos:** Eliminados todos los handlers Javascript _inline_ (como `onerror` y `onclick`) en favor de delegación limpia mediante `<script>`.
- **DRY y Centralización:** Extracción masiva de URLs _hardcodeadas_ hacia `src/data/vendors.ts` y data de contacto. Abstracción del parseador de fechas a `src/utils/dateParser.ts`.
- **Accesibilidad y UX:** Corrección exhaustiva de atributos `alt` faltantes, inyección de `width/height` en logotipos para prevención de *Cumulative Layout Shift* (CLS), y desactivación guiada del formulario de comentarios.
- **Seguridad y Documentación:** Sanitización de métodos asíncronos (`createElement` vs `innerHTML`) y anotaciones de excepciones para esquemas locales de Zod y variables de entorno del endpoint GAS estático.
- **Punto Fix Final:** 0 advertencias de compilación; 425 páginas generadas en ~3s. Proyecto aprobado para el ambiente productivo.

### 22 mar 2026 — Arquitectura de Taxonomías y Sanitización de Datos
- **Ecosistemas Auto-Contenidos (Blog y Glosario):** Despliegue de ecosistemas independientes con rutas dinámicas de colección (`/blog/etiqueta/[tag]` y `/glosario/etiqueta/[tag]`) para aglutinar contenido en cuadrículas, eliminando la navegación fragmentada.
- **Recomendaciones Híbridas Automáticas:** Implementación de tarjetas relacionales (*Artículos Recomendados* y *Términos Recomendados*) al pie de cada lectura basadas en la abstracción cruzada de etiquetas del Frontmatter.
- **Sanitización Algorítmica Global:** Ejecución de automatización Node.js para eliminar la etiqueta basura `"blog"` que enlodaba 16 posts de la arquitectura SEO, empujando simultáneamente heurísticas en 91 artículos para asegurar que todos cuenten nativamente con +3 etiquetas contextualizadas, minimizando la carga editorial.
- **Resolución de Error Estructural Astro:** Supresión de barreras espaciales dobles (`---`) en los cabezales de `BaseLayout.astro`, `Header.astro` y `MobileNav.astro` que interrumpían fatalmente la compilación de producción. Resultado final: Base generada en VSS sube orgánicamente a 817 rutas exitosas a un promedio de renderizado total de ~4 segundos.

### 23 mar 2026 — QA Móvil y Preparación a Producción
- **QA Estilístico (Colecciones Secundarias):** Se mitigaron los paddings rígidos (48px) de los contenedores *article* en el Blog, Artículos y Glosario, transicionándolos a funciones matemáticas fluidas estandarizadas `clamp()` para permitir flexibilidad en dispositivos móviles (<= 320px).
- **CSS Estructural e Imágenes:** Corrección de la estructura interna del `<nav>` del blog para inyectar correctamente Media Queries CSS extraída a clases globales validas, además de delimitar los anchos máximos (`max-width: 100%`) y el `overflow-wrap` para imágenes y textos en MDX/Markdown pre-parseado, cortando el rebase horizontal en pantallas pequeñas.
- **Validación SSG Final:** El pipeline de Astro Builder (`npm run build`) validó exitosamente 818 páginas SSG sin ninguna ruptura, sellando la compilación final candidata para ambiente productivo.

### 23 mar 2026 — Motor de Cotización DDC (Secure SSR & Astro UI)
- **Infraestructura Backend Híbrida:** Transición de `astro.config.mjs` a compatibilidad SSR (`@astrojs/node`) para habilitar *Endpoints* dinámicos robustos (`calcular-cotizacion-ddc.ts` y `quote-ddc.ts`).
- **Backend API (quote-ddc) & Matriz JSON:** Endpoint cerrado que consulta la matriz `ddc-pricing-matrix.json` (extraída desde CSVs originales) y calcula con validación Zod las variaciones comerciales de forma segura, escondiendo los precios base.
- **UI Frontend "Vanilla Native":** Réplica 1:1 de los criterios comerciales heredados (layout de 3 columnas, conversión de extensiones manual) renderizados puramente en Astro y Vanilla CSS/JS para un Performance óptimo, sustituyendo el inseguro React Island previo.
- **Ruta Protegida Interna:** UI del Cotizador protegida bajo validación activa de Tokens *Supabase* en `/admin/cotizador.astro`.

### 23 mar 2026 — SEO Estructural y GEO (Quick Wins P0)
- **Sitemaps XML Automatizados:** Implementación de la suite oficial `@astrojs/sitemap` para el auto-rastreo completo del directorio estático. Emisión del mapa dinámico ligada a variables de entorno de staging y prod en `astro.config.mjs`.
- **Blindaje Pre-Lanzamiento (Robots.txt):** Creación del rastreo nativo `public/robots.txt` desautorizando el tráfico a zonas administrativas (`/admin/`, `/test/`). Habilitación granular de un flag relacional `robots="noindex, nofollow"` desde el `BaseLayout.astro`.
- **Generative Engine Optimization (JSON-LD P0):** Inyección de un script `<script type="application/ld+json">` dinámico adaptado a directrices del W3C bajo `<slot name="head">`. Activado schema formativo `FAQPage` para más de 40 componentes nativos y esquema `DefinedTerm` para todo el diccionario E-learning del catálogo.

### 23 mar 2026 — Páginas Legales y Componentes Globales
- **Migración Legal:** Extracción masiva de textos legales heredados en formato PHP hacia las nuevas rutas estáticas `aviso-de-privacidad.astro` y `terminos-y-condiciones.astro` renderizadas bajo `BaseLayout.astro`.
- **Integración Global:** Actualización de las anclas `<a>` en el Footer principal de la aplicación para desviar el tráfico a los nodos locales.

### 23 mar 2026 — Arquitectura Desacoplada y Limpieza Híbrida (v4.0.0)
- **Refactorización Core CSS (Fase 3):** Consolidación histórica de la cascada de estilos. Se pulverizó el CSS inline redundante que simulaba el estado activo de navegación en el `<header>` de más de 11 páginas de producto.
- **Sistema de Footer Dinámico:** Institucionalización oficial de la paleta oscura `.footer--dark` a través de *props* nativas dinámicas en el `BaseLayout`. Se extirparon decenas de bloques `<style>` hardcodeados en los 9 archivos de sub-cursos y catalogos de *Vyond*.
- **Asimilación de Design Systems:** Fusión de identidad cromática e inyección del token métrico global `--art` en las variables nativas `:root` de `base.css` erradicando los sub-ecosistemas CSS de despliegues huérfanos.
- **Aislamiento de Lógica Vanilla JS:** Transmutación de los pesados algoritmos destructivos de manipulación DOM. Los listeners encapsulados en `DOMContentLoaded` en apartados transaccionales (Blog, Artículos y Estándares) fueron reescritos y mudados hacia implementaciones *Native ESM Modules* `<script>` en Astro para proteger el hydration flow original contra colisiones de la arquitectura Base.
- **Data Mining y Fusión de Tracks:** Rescate algorítmico y minería de tareas huérfanas presentes en múltiples *Roadmaps* obsoletos (`ROADMAP.md`, `TAREAS_COMPLETADAS.md`) unificadas holísticamente bajo un centro de operaciones de 11 fases organizadas en el *Single-Source-Of-Truth* (`task.md`).

### 26 mar 2026 — UI Dynamics y Componentización Avanzada (v4.1.0)
- **Content Collections (Astro 6):** Refactor de la inyección de Blog posts al Ticker a través del loader estricto `getCollection()`, resolviendo paths dinámicos truncados de migraciones legacy.
- **Micro-interacciones Ticker & Marquee:** Despliegue de un algoritmo híbrido cliente-CSS para aleatorizar 5 posts del Content Layer en cada load de página, inyectándolos dentro de una banda Marquee CSS infinitamente loopeada (`animation: scroll-ticker 35s linear infinite`). La misma técnica precisa se extrapoló al carrusel de logotipos de clientes.
- **Sanitización del CSS "Clientes":** Refactor de flexbox en `index.css` que provocaba "saltos" asíncronos en las barras de confianza. Se forzó comportamiento `width: max-content` y recalibración de gaps en milímetros en `@keyframes`.
- **Directorio Dinámico `/servicios`:** Abolición absoluta de páginas "under construction". La URL `/servicios` ahora es un catálogo algorítmico (mapeado de `navigation.ts`) que pinta iterativamente el universo completo de soluciones TAEC con estilos premium y badges interactivos.
- **Mac OS Footer Dock:** Se restauró el widget inferior en un 100% de las páginas web enganchándose al root nativo de astro (`astro:page-load`).
- **Globalización On-Scroll (`reveal-up`):** Expansión del *IntersectionObserver* de la portada hacia la plantilla núcleo `BaseLayout`, exportando el efecto mágico de fade-in hacia todo el ecosistema interior con un coste de renderizado mínimo. Reutilización sistemática del componente `<CtaFinal />` en endpoints de subproducto.
- **UX de Navegación (Mega Menú):** Inyección paramétrica de enlaces puente (`bottomAction` directo a `/servicios`) en la base anidada del menú Soluciones en `navigation.ts`, homologando el comportamiento universal móvil y de escritorio bajo estándares de usabilidad B2B.
- **Auditoría Multi-IA (Elite SPA Architecture):** Refactor maestro de JavaScript y CSS validado bajo estándares de Staff Engineer. 
  - **Memory Leaks Eliminados:** Sustitución de todo `<script is:inline>` por Módulos Nativos de Astro, delegando el *Garbage Collection* de los `IntersectionObservers` (via `.disconnect()`) y blindando el sitio contra *listeners* zombies en View Transitions (`astro:page-load`).
  - **Lighthouse 100% y Zero CLS:** Inmunidad contra desplazamientos acumulativos (*Cumulative Layout Shift*) forzando `flex-shrink: 0` paramétrico e inyección de Aceleración por Hardware (`will-change: transform`). Adición íntegra de `prefers-reduced-motion` por accesibilidad neuro-visual.
  - **Type Safety Robusto:** Reestructura de `navigation.ts` para crear Mapas Tipados exhaustivos (`BADGE_CLASS`) y candados _fail-fast_ (`throw new Error`); si un menú se corrompe en el código fuente, el servidor detecta el choque de Inflexión durante el Build en vez de colapsar la página para clientes web.

### 27 mar 2026 — Estabilización de Decap CMS y Estandarización de Datos B2B (v4.2.0)
- **Astro Content Layer Security Patch:** Resolución de *bug* severo donde el esquema estricto de `src/content.config.ts` (Zod validation) bloqueaba silenciosamente la inyección de nuevas llaves dinámicas. Aplicado el flag `.passthrough()` sobre todas las colecciones para empoderar al equipo comercial y escalar metadatos en Frontmatter sin impactar el Build SSG.
- **Automatización de Limpieza MKT:** Desarrollo y ejecución de _script core_ de purga (`migrate-images.mjs`). El software leyó recursivamente más de 450 artículos heredados, localizando y desconectando URLs de infraestructura muerta de Wordpress, descargando sus Assets de imagen hacia `/public/assets/uploads/` e inyectándolas en el motor YAML bajo los esquemas formales Decap. Reducción aproximada de +60h manuales.
- **CMS Preview Engine:** Despliegue de CSS contextualizado para emular componentes gráficos (`preview-style.css`) dentro del panel de previsualización en `/admin`. Tipografías, espacios y anidaciones adaptadas a las métricas del frontend de Astro.
- **Auditoría de Data Masking (Radar):** Reestructuración algorítmica y visual del archivo maestro `config.yml` para coincidir la interfaz gráfica de Decap CMS con el *schema* asimétrico de los _LinkedIn Newsletters_ originales, reparando cajas de texto ocultas sin comprometer integridades estructurales.

### 28 mar 2026 — Copiloto IA de Ventas L&D (v4.3.0)
- **Motor Cognitivo Server-Side:** Migración de `astro.config.mjs` a modalidad SSR híbrida para aislar el SDK completo `@google/genai` (Gemini 2.5). Incorporación y blindaje de variables de entorno `.env`.
- **Ingeniería de Prompts (Tito Bits):** Inyección concurrente del comportamiento del avatar "Tito Bits" con directivas de venta consultiva para los 4 pilares tecnológicos de TAEC (LMS, Articulate, Vyond, DDC). Prevención estricta de testamentos por límite de oraciones y redirección de objeciones tarifarias.
- **Frontend Interactivo (React Island):** Construcción local de `ChatAgent.tsx` persistente y *resizable* anidado paramétricamente en el `BaseLayout.astro`. Se integró el intérprete `react-markdown` para parsear listas y formatos orgánicamente, además de incrustar el respectivo Disclaimer sobre IA generativa en el root.
- **Captura Pre-Emptiva de Leads:** Implementación de un *Gated Form* incrustado en el chatbot que detiene el encendido de la IA hasta que se registra obligatoriamente Nombre y Correo Institucional, capturando concurrentemente la hora y el _TimeZone_ del prospecto.
- **Telemetría e Emailing Transaccional HTTP:** Configuración asíncrona de la API de Resend y construcción nativa del endpoint interno `/api/send-transcript.ts`. Al presionar el botón de cierre, el servidor Astro compila el array del historial conversacional en HTML limpio y lo dispara directamente al correo maestro `smasmoudi@taec.com.mx`.

### 28 mar 2026 (FASE 2) — Context-Hopping y Omnipresencia de IA (v4.4.0)
- **Persistencia SSR y LocalStorage (Nanostores):** Abolición del estado volátil `useState`. Integración definitiva de `@nanostores/persistent` para secuestrar el historial del chatbot en el navegador del usuario. Tito Bits ahora preserva conversaciones activas sin fricción al transicionar entre páginas o al recargar el navegador.
- **Detección Espacial (Context-Hopping):** Inyección de un `useEffect` topológico que rastrea el `window.location.pathname`. El Bot escanea silenciosamente por qué familia de productos navega el usuario y muta dinámicamente sus Tooltips promocionales (DDC, LMS, Vyond, Articulate, Capacitación y E-commerce).
- **Hard-Reset y Purgador QA:** Implementación de un escudo reactivo en el Header del Chat (`Botón Reiniciar ⟲`). Formatea a voluntad el array de Nanostores resolviendo la problemática de Testing para "Emular usuarios vírgenes" sin depender de manipulación de V8 cache en Chrome.
- **Extracción de Arquitectura de Textos (No-Code):** Migración total de los discursos rígidos desde `ChatAgent.tsx` a un repositorio central agnóstico (`src/data/chatContextRules.ts`). Se desacopló por completo la Lógica de Software de la Lógica Comercial de Ventas para facilitar el mantenimiento al equipo L&D.
- **Estabilización de Rutas en Monorepo (Bug 404):** Desacoplamiento de la base de inyección inyectando resolutores `netlify.toml` anidados localmente, corrigiendo colisiones documentadas entre el Adapter de Astro y el motor SSG de CI/CD que causaban recursividades nulas en producción.

### 29 mar 2026 — Auditoría Red Team y Hardening P0/P1 (TitoBits v4.5.0)
- **Zero-Footprint Privacy (Compliance GDPR / LFPDPPP):** Erradicación total de `persistentAtom`. Reemplazo estratégico por persistencia de Estado Efímero (`atom` en RAM) para destruir historiales y PII del cliente automáticamente al terminar la sesión, anulando los riesgos de data residual en navegadores en entornos corporativos.
- **Network Resiliency y Abort Hooks:** Implementación de asincronía purificada con `AbortController` (timeout de 25s) en el `fetch` hacia el puente Gemini SSR, bloqueando cuelgues de frontend, spinners infinitos o fallas catastróficas de Edge Nodes.
- **Sanitización Híbrida XSS y Handoff Seguro:** Inyección del parseador sintáctico `rehype-sanitize` en el Markdown Viewer para suprimir Scripts maliciosos cruzados. Adición estricta del filtro `escapeHtml` en el *webhook* de Handoff (Resend) garantizando que ninguna transacción comercial pueda vulnerar las bandejas de entrada directivas.
- **Enrutamiento GEO Serverless / Privacy Guard:** Desacoplamiento contundente del microservicio inseguro de `get.geojs` en JS Client. Adopción corporativa de Headers Nativos del Edge Routing de Netlify (`x-nf-country`), logrando enrutamiento geográfico dinámico invisible, indetectable y gratuito con latencia cero.
- **Gobernanza LLM Cognitiva (Fronteras Duras):** Integración de matrices de *whitelist* rígidas evaluando la inyección de roles en tiempo real (`user`/`model` only). Eliminación del vector de error de doble inyección de mensaje y blindaje crudo del System Prompt para mitigar *Prompt Injection* cruzado sobre tópicos extracurriculares. Redención inteligente del "Spa-Context-Hopping" con `astro:page-load` listeners puros.
- **Blueprint Enterprise B2B:** Documentación completa extraída de la refactorización para lanzar comercialmente el spinoff "TAEC LMS AI SaaS", estructurando modelos tarifarios BYOK y responsabilidades de InfoSec (AWS).

### 30 mar 2026 — Cirugía UX B2B y Ecosistema de Recursos (v4.6.0)
- **Blindaje Anti-Errores (Decap CMS):** Implementación global de un bloque visual de contingencia diseñado en CSS/SVG para los artículos del Blog. Previene la renderización de imágenes rotas de artículos antiguos.
- **Legibilidad Premium:** Refactorización de lectura bajo el estándar "Medium" limitando la tipografía de los artículos a un máximo de `65ch` y un interlineado expansivo de `1.85`.
- **UX Estimativo (Tiempo de Lectura):** Reemplazo de la barra de pre-carga azul defectuosa por un algoritmo interno en Astro que lee y fragmenta condicionalmente el `post.body` en bruto, dividiéndolo a 200 palabras por mes y exhibiendo in-line un *Badge* elegante del Tiempo de Lectura calculado al aire.
- **Inbound Marketing (Ruleta del Conocimiento):** Erradicación de los vacíos en formato `Glassmorphism` de la columna derecha correspondientes al componente `<HeroComercial>`. Los **7 pilares** del catálogo (Blog, Artículos, Glosario, Comparativos, Estándares, Radar, Quiz) ahora cuentan con inyección nativa de Curiosidades, Datos duros, y Casos de uso atados asimétricamente a su contexto.

### 31 mar 2026 — Arquitectura Cognitiva B2B y Hardening Cero Fallos (TitoBits v6.0)
- **Escudo Anti-Jailbreak y Protección IP (Capítulo 0):** Implementación de una jerarquía de procesamiento psicológico (Primacy Bias). El sistema lee las directrices de supervivencia corporativa antes del Prompt Base. Bloqueo hermético a intentos de extracción del System Prompt mediante *Reencuadre B2B* ("Aikido Verbal"), negándose a confirmar métricas ocultas sin friccionar al lead.
- **Defensa de Portafolio y Cero Alucinaciones:** Rectificación total de parámetros de venta complejos. Restauración oficial de la "Ventana Acumulativa de 30 Días" (Reach 360) sobrepasando auditorías defectuosas externas en IAs concurrentes. Prohibición estricta de arrojar sumas aritméticas para proyectos DDC y Tiers asimétricos sin hand-off a venta humana, extirpando pasivos legales corporativos.
- **Micro-Categorización Técnica de Competidores:** Automatización de respuesta de prestigio frente a menciones de Adobe Captivate o Docebo. El motor ahora demuestra autoridad evaluando la clasificación de la tecnología competidora antes de arrastrar el ecosistema híbrido de Articulate + Totara.
- **Motor Markdown B2B (Modulación de Fricción):** El sistema fuerza de manera consistente listas y bullets con negrita focal, además de ejecutar una penalización de longitud del 50% ante quejas del visitante ("me das clases"), erradicando el sesgo conversacional sobre-paternalista de los LLM estándar.
- **Geoconsolidación MX (Price Tag):** Despliegue de estructura de descuentos de Licenciamientos Teams con vinculación directa al sistema de facturación corporativo en México ($1,198 USD base), desligando complementos como AI Assistant y Articulate Localization del bloque central.

### 01 abr 2026 — Ecosistema Consultivo de Diagnóstico y Motor de Demanda (v7.0)
- **Cálculo Topológico de 8 Ejes (Radar B2B):** Sustitución del mapeo rígido de plataformas (Moodle, Totara). Despliegue de un algoritmo multidimensional que evalúa 8 frentes corporativos: LMS Ágil, Corporativo, STPS (DC-3), Certificación Exterior, Proctoring, VILT, Ecommerce y Herramientas de Autorización.
- **Motor de Recompensas (Horóscopo Gráfico):** Desarrollo de un webhook asíncrono atado a `diagnostico-lead.ts`. Al completarse el mapeo, se despacha un template `HTML` inyectable al correo del usuario.
- **Semáforo Financiero y API Quant:** Integración directa con *QuickChart* para convertir el árbol de datos crudo en una araña poligonal estática anti-firewalls, cruzándose con un clasificador que segrega el ecosistema en prioridades inmediatas (Rojo) y a largo plazo (Amarillo/Verde).
- **Handoff Orgánico (Zero-Friction):** Remoción de *Call to Actions* ambiguos sobre interfaces sintéticas en beneficio directo del *Zoho Bookings* de Arquitectura de Soluciones de TAEC. El "Lock-In" de ventas ya no obliga al rebote entre la Bandeja de Entrada y Tito Bits, logrando un cierre limpio y prospectado hacia videollamada comercial humana.
- **Extracción de Identidad Activa:** Supresión de redundancia cognitiva para Tito Bits (Prompt Engine). El Copiloto ya no interroga al cliente web por su nombre/correo si este fue cedido durante el Diagnóstico Previo. El agente se inyecta tras bambalinas con un `[SYSTEM_HIDDEN_CONTEXT]` recibiendo los `Dolores Críticos` validados por el prospecto, abriendo sesión agresiva tipo Challenger Metodology para debatir soluciones a medida en lugar de saludar protocolarmente.

### 03 abr 2026 — Intranet B2B Segura y Base de Conocimientos Supabase (v8.0)
- **Infraestructura Zero-Trust (Middleware SSR):** Construcción e implementación de un middleware de Astro para proteger la ruta `/interno/*`. Bloquea peticiones no autenticadas, restringe el dominio a `@taec.com.mx` exclusivamente, y valora *server-side* una tabla de "usuarios autorizados", evitando que la lógica de seguridad quede expuesta en el Front-End.
- **Base de Datos Gestionada (PostgreSQL sobre Supabase):** Despliegue de entorno fresco con llaves de tipo `sb_publishable_...`. Se transcribió el script DDL `docs/supabase-interno-schema.sql` resolviendo casteo estricto de arreglos nativos (`{interno,titbits}`) y activando Row-Level Security (RLS) como blindaje final para los registros comerciales.
- **Autenticación Delegada (Identity Guard):** Implementación de Google OAuth 2.0 en Google Cloud Platform configurado bajo la topología de "Aplicación Interna", bloqueando automáticamente *logins* corporativos cruzados o cuentas `@gmail.com` externas, ruteando los exitosos al endpoint asíncrono `/auth/callback`.
- **Knowledge Base en Tiempo Real (React):** Despliegue de la UI privada en `/interno/kb/rise360` inyectando un componente dinámico (`KBViewer.tsx`). Este motor procesa la matriz de conocimiento vía Server-Side y permite filtrado semántico (Buscadores), segmentación de Tags de Mercado y renderizado crudo de FAQs comerciales sin demorar la renderización del clúster principal.
- **API Preparada para Tito Bits:** Construcción de `/api/kb.ts` que normaliza y escupe la base de conocimientos filtrada (ignorando datos privados y solo empujando metadatos *publico* o *titbits*), lista para ser consumida como *Retrieval-Augmented Generation* (RAG) por el Copiloto IA B2B en futuros despliegues.

### 03 abr 2026 — Refinamiento Estético B2B y Fallback SSR (Intranet v8.1)
- **Refactorización de Autenticación CSR->SSR:** Corrección del puente de tokens silencioso. El *Middleware* ahora pasa directamente el `accessToken` fresco hacia el context `Astro.locals` inyectándolo en el cliente `scopedSupabase`, sobrepasando los bloqueos fantasma del RLS que retornaban `0 rows` a usuarios legítimos por cookies caducadas.
- **Fidelidad Corporativa React:** Traducción manual del mock minimalista estático provisto por diseño hacia la arquitectura React (`KBViewer.tsx`), depurando interfaces genéricas por la estética fina exigida: fuentes `DM Serif`, tableros agrupados y etiquetas cromáticas sutiles.
- **Acordeones Inteligentes (Smart Nav):** Migración de la barra lateral `IntranetLayout.astro` de Divs primitivos a entidades semánticas nativas `<details>`. Inyección de lógica Node.js enrutando *auto-expansión* dependiente de la URL visual (Zero-JS Logic).
- **Parche Arquitectónico SSR vs SSG:** Desactivado el compilador SSG predeterminado sobre nodos vulnerables (`/cotizadores`, `/colaborar`, `/admin`) usando `export const prerender = false`, lo que extirpa definitivamente el loop de redirección fantasma hacia `/interno/login` en los entornos de deploy estático.
### 04 abr 2026 — Identidad Dinámica B2B y Expansión de Playbooks (Intranet v8.2)
- **Extracción de Identidad Activa (SSO Auth):** Refactor de `middleware.ts` para capturar el `user_metadata.full_name` o `user_metadata.name` emitido orgánicamente por el JWT de Supabase / Google OAuth. El context inyectado `Astro.locals.name` elimina totalmente los nombres duros quemados en SSR, proveyendo personalización universal.
- **Onboarding Bypass Cognitivo:** El motor SPA reactivo re-arquitecturó su estado natural de "Desconocido". Cuando Tito Bits detecta operar bajo el layout intranet, salta en automático la fricción B2B del formulario de nombre/correo y saluda de forma personalizada ("Hola Slim, ¿en qué te puedo ayudar?").
- **Sanitización UI B2B:** Deshabilitación condicional del widget global flotante de WhatsApp (`.wa-float`) en vistas privadas para evitar superposiciones con los Playbooks corporativos y forzar el uso interno del bot.
- **Expansión del Catálogo Maestro (Knowledge Base):** Ampliación algorítmica y técnica del repositorio privado en BD. Se compiló y despachó el Seed transaccional `docs/supabase-interno-seed-storyline360.sql` (33 registros), transfiriendo 4 cuadrantes (Comercial, Técnica, Troubleshooting, Objeciones) hacia la matriz interactiva del equipo de ventas, la cual despliega *Zero-Deploy* gracias a su naturaleza dinámica (SSR).

### 05 abr 2026 — Sanitización Semántica y Deduplicación Base (Intranet v8.3)
- **Deduplicación SQL Idempotente:** Inyección global de escudos anti-bloating (`DELETE FROM kb_items`); se asegura la purga radical en la tabla de Supabase previniendo duplicidades infinitas tras corridas solapadas en los 8 *playbooks* (Rise, Storyline, Vyond, Reach, Review, etc).
- **Fusión Textual Zero-HTML (Bypass UI React):** Sustitución del inyector de código HTML (`<br><br>`, `<strong>`) hacia secuencias asíncronas de String puro (`\n\n🟢 El Plus:`). Esto solventa visualmente el rendering inorgánico nativo frontend devolviendo lecturas con formato corporativo legible sin el peligro de `dangerouslySetInnerHTML`.
- **Eradicación Regex de Referencias Brutas:** Ejecutada purga agresiva regular Expression de brackets huérfanos, indicadores espaciales (`[1][2]`, `[LinkedIn]`, `[G2]`, `[DOLOR VALIDADO]`) para una apariencia encyclopédica "100% Humana". Rescate morfológico de `[DATO NO DISPONIBLE]` a oraciones B2B orgánicas previendo desmembramientos verbales en la inyección SQL.

### 05 abr 2026 — Refactor Cognitivo B2B y Estandarización SQL (Intranet v8.4)
- **Ley de Miller en UI (Rise 360):** Remapeo estructural del data-seed de Rise 360. Eliminación de las 8 pestañas originales (Diseño, Accesibilidad, LMS, etc.) colapsándolas y reasignándolas algorítmicamente a los 4 botones estándar de arquitectura B2B (Comercial, Técnica, Troubleshooting, Objeciones) para acelerar lecturas en llamadas y unificar el stack visual contra Storyline 360.
- **Numeración Secuencial Pura (Global):** Abolición del *legacy* numérico por silos (10, 20 en comercial repetido 10, 20 en técnica) en los dos productos mayores (Storyline y Rise). Los registros de base de datos fueron limpiados de raíz aplicando la sintaxis de Secuencia Global ininterrumpida (10, 20, 30... 610) eliminando cuellos de botella de dependencias Frontend.

### 05 abr 2026 — Auditorías de Código y UX (Home e Intranet v8.4)
- **Remoción Global Netlify Identity:** Extracción desde `BaseLayout.astro` de scripts redundantes de identidad CMS para anular definitivamente los bloqueadores de CORS sobre las peticiones SSG y SSR de todo el sitio.
- **Topología CSS B2B (Tablet y Playbooks):** Aplicación de reseteo explícito (`margin-left: 0`) para corregir el desbordamiento originado por la superposición de la barra en tablets (< 768px). Implementación de scroll estático independiente (`height: 100vh; overflow-y: auto`) forzando herencia pura del contenedor principal para que los Playbooks largos escroleen sin dañar la cascada genérica.
- **Saneamiento Accesible (Home y Dashboard):** Inyección quirúrgica de etiquetas `aria-label` en anclajes mudos como logos (`header`, `footer`) y cards disecadas en el Lobby corporativo (`role="img"`) logrando conformidad para utilidades y dispositivos asistivos lectores de árbol DOM.
- **Curador Nativo del Ticker Promocional (`index.astro`):** Corrección algorítmica sobre el bloque orgánico de *Frontmatter Random SSR*. Se insertó un Regex dinámico que captura los sub-strings asíncronos ("Enero 4, 2009"), interceptando el lote enrutado a través de inyecciones `=<2023`, garantizando que únicamente noticias recientes ocupen la home de la marca.

### 05 abr 2026 — Transición de Arquitectura B2B y Gobernanza (v8.5)
*Conclusión de la Auditoría (Red Team / Ojos Externos) [11:43 AM]:*
- **Reclasificación de Proyectos:** Certificación arquitectónica de que la aplicación transcicionó exitosamente de un marco conceptual de "Sitio de Marketing SSR" hacia una **Plataforma Comercial-Operativa Híbrida**.
- **Evaluación de Superficies Seguras:** Conformidad final sobre la división `Client / Server` en torno al envío de Formularios (Zero Payload Secrets) y aislamiento correcto del SSR Guard (`prerender = false`) hacia la matriz de cálculo en memoria del cotizador DDC.
- **Creación de Backlog Operativo:** Formulación algorítmica de 8 vectores post-lanzamiento incrustados en `task.md`. Prioridades ajustadas: Reforzar el control estructural del `ddc-pricing-matrix.json`, aislar tokens en contexto SSR y establecer telemetría / rate-limiting a canales exógenos (Resend, Zoho, GAS y @google/genai).

### 05 abr 2026 — Base de Conocimiento Vyond Mobile (Intranet v8.6)
- **Consolidación KB Vyond Mobile:** Se procesó y creó el archivo semilla `docs/supabase-interno-seed-vyondmobile.sql` (29 registros de troubleshooting, técnica y comercial). Se implementó la lógica de fusión para lograr legibilidad unificada en las respuestas asegurando rigor en la lógica de resolución limpia sin tags no permitidos como referencias numéricas, de sistema o datos no disponibles; finalizado el lote de semillas programado.

### 05 abr 2026 — Base de Conocimiento Vyond Enterprise (Intranet v8.7)
- **Consolidación KB Vyond Enterprise:** Procesamiento y generación del archivo semilla DDL `docs/supabase-interno-seed-vyondenterprise.sql` (~38 registros). Aplicación robusta de fusión lógica de columnas ("Respuesta" y "El Plus"), eliminación Regex total de referencias bibliográficas, corchetes y estandarización a texto plano, garantizando rendering impecable en el ecosistema B2B.

### 05 abr 2026 — Hardening del Portal (Role-Guard y Mitigación DDC) [Prioridad 1]
- **Role-Guard Administrativo Seguro:** Desarrollo e integración nativa del escudo de roles (`locals.rol === 'admin'`) a nivel Middleware Global SSR. Bloqueo inmediato para las rutas originadas en `/interno/admin/*` para erradicar las falsificaciones de escalada de privilegios y ruteo a bloque de "Denegado".
- **API Híbrida Cotizador DDC (Aislamiento de Matriz):** Se re-arquitecturó el puente comunicativo de `/api/quote-ddc.ts` migrándolo completamente al clúster de Intranet bajo `/interno/api/quote-ddc.ts`. Este movimiento blindó el _Endpoint_, forzando la evaluación del Middleware que corta accesos carentes de JWT OAuth Auth2, deteniendo ataques cURL y resolviendo la Exposición de la Matriz.
- **Transmisión Segura B2B:** Despliegue de un UI 100% dependiente del Server Action, extirpando en lo absoluto cualquier Componente Cliente React que inyectara en crudo el JSON Confidencial de Precios, relocalizando el Motor de Consultoría Administrativa hacia la trinchera protegida `/interno/admin/cotizador-ddc.astro`.

### 05 abr 2026 — Modernización Data Layer (Redis & Serverless Forms) [Prioridad 2]
- **Upstash Redis Rate Limit:** Erradicación del map `in-memory` inestable del stack serverless de Netlify. Implementación nativa de la librería `@upstash/ratelimit` empleando una política de _Sliding Window_ en ambos cerebros analíticos: `/api/agente-ia` y `/api/diagnostico-lead`. Se corrigió la vulnerabilidad de proxy arrays sanitizando _x-forwarded-for_ (ej. `ip.split(',')[0]`).
- **Endpoint G-Suite Integrado (Migración CORS):** Jubilación absoluta del frágil _Google Apps Script_ (GAS) y su hackeo de CORS. Creación de una agresiva Function SSG `/api/submit-contact.ts` usando el SDK oficial `googleapis`, proveyendo validación paramétrica con `Zod` y garantizando inyecciones confiables utilizando Service Accounts. El front-end (`contacto.astro`) transicionó exitosamente a peticiones `application/json` unificadas sin cruzar fronteras de dominio.

### 05 abr 2026 — Estabilización de Build SSG/SSR y Fusiones a Main (v8.8)
- **Ecosistema Branching:** Fusión exitosa de la rama `feature/ddc-calculadora` hacia `main`. Producción en Netlify y staging en GitHub Pages ahora se ejecutan de manera nativa sobre la rama principal.
- **Estrategia Dual Build (Netlify vs GH Pages):** Refactorización de `astro.config.mjs` para alternar condicionalmente la salida entre `'server'` (Netlify) y `'static'` (GitHub Pages) detectando el entorno. Esto soluciona los errores 404 en subrutas excluidas de prerender como `/interno/dashboard`.
- **Sanitización de Prerender:** Eliminada la importación circular y bloqueante (`vendors`) en `articulate-ai-assistant.astro` que causaba `ReferenceError` al compilar la vista como SSR estático.
- **Autorización OAuth Supabase (Guard):** Se agregaron las URLs absolutas de callback (`http://localhost:4321/interno/auth/callback`, `https://stellar-mermaid-3ba7f1.netlify.app/interno/auth/callback` y `https://nuevo.taec.com.mx/interno/auth/callback`) en el panel del proveedor, reactivando con éxito el pipeline de accesos internos protegidos.
- **Certificación Edge (Geo-Ruteo):** Confirmación operativa al 100%. La geolocalización inyectada dinámicamente (`x-nf-country`) en Netlify funciona perfectamente en producción, permitiendo la validación segura de orígenes regionales y tabuladores comerciales sin latencia observable.

### 05 abr 2026 — Ecosistema Transaccional Email / Inbox (v8.9)
- **Handoff Orgánico LLM (Resend API):** Despliegue del webhook nativo `/api/send-transcript.ts`. El servidor Astro compila asincrónicamente el array del historial conversacional en HTML limpio y lo dispara directamente al correo maestro `smasmoudi@taec.com.mx` al presionar "Cerrar".
- **UX Inbox Admin Seguro:** Resolución final del _Issue-007_. Los accesos del Dashboard Interno ("Lanzar Supabase" y "Abrir Bandeja") fueron consolidados con ruteo validado y un fallback robusto hacia los inboxes corporativos.
