# CHANGELOG — TAEC Web

Staging: `https://elzorromexican.github.io/taec-web/`
Producción futura: `https://nuevo.taec.com.mx`

> Historial anterior (v1.0 – v1.5 · mar 2026) archivado en:
> `docs/CHANGELOG-archive-v1.0-v1.5-mar2026.md`

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
- [ ] `aviso-de-privacidad` — página real (ahora es `<span>` desactivado en footer)
- [ ] Logos reales para Pifini/NetExam, DDC y socios en LogosGrid
- [ ] `/blog` y `/articulos` — contenido real (ahora scaffold)
- [ ] Optimización de imágenes con `<Image>` de Astro
- [ ] Pipeline CI/CD a producción (`nuevo.taec.com.mx`)
- [ ] QA visual completo en staging antes de go-live
- [ ] `emailjs.ts` — revisar si sigue siendo necesario o se elimina

---

## Próximos cambios se registran aquí ↓

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

### 23 mar 2026 — Motor de Cotización DDC (SSR & React Island)
- **Infraestructura Backend Híbrida:** Transición de `astro.config.mjs` a compatibilidad SSR (`@astrojs/node`) para habilitar *Endpoints* dinámicos robustos (`calcular-cotizacion-ddc.ts`).
- **Motor Financiero Algorítmico & Zod:** Extracción exitosa de inteligencia logística de Excel (Rise, Storyline, Vyond) hacia una Matriz JSON optimizada en código. Integración de Schemas *Zod* para validación y sanitización en API.
- **UI Frontend "React Island":** Diseño interactivo para la selección de variables de cursos vía React 19 y Vanilla CSS.
- **Ruta Protegida Interna:** UI del Cotizador protegida bajo validación activa de Tokens *Supabase* en `/admin/cotizador.astro`.

### 23 mar 2026 — SEO Estructural y GEO (Quick Wins P0)
- **Sitemaps XML Automatizados:** Implementación de la suite oficial `@astrojs/sitemap` para el auto-rastreo completo del directorio estático. Emisión del mapa dinámico ligada a variables de entorno de staging y prod en `astro.config.mjs`.
- **Blindaje Pre-Lanzamiento (Robots.txt):** Creación del rastreo nativo `public/robots.txt` desautorizando el tráfico a zonas administrativas (`/admin/`, `/test/`). Habilitación granular de un flag relacional `robots="noindex, nofollow"` desde el `BaseLayout.astro`.
- **Generative Engine Optimization (JSON-LD P0):** Inyección de un script `<script type="application/ld+json">` dinámico adaptado a directrices del W3C bajo `<slot name="head">`. Activado schema formativo `FAQPage` para más de 40 componentes nativos y esquema `DefinedTerm` para todo el diccionario E-learning del catálogo.
