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
