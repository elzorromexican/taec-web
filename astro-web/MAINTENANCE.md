# Manual de Mantenimiento — Páginas de Producto

**Proyecto:** taec-web · Astro + Netlify  
**Actualizado:** 2026-04-11  
**Aplica a:** `astro-web/src/pages/` — páginas de producto y landing pages comerciales

---

## Mapa de grupos de páginas

El sitio tiene 72 páginas `.astro`. Las páginas de producto se dividen en 4 grupos con arquitecturas distintas. Antes de editar cualquier página, identifica a qué grupo pertenece.

```
src/pages/
│
├── [GRUPO 1] Familia Articulate ──────────────────────────────
│   articulate-360-mexico.astro       ← página principal (pricing + promo)
│   articulate-rise360.astro
│   articulate-storyline360.astro
│   articulate-ai-assistant.astro
│   articulate-review360.astro        (si existe)
│   articulate-reach.astro            (si existe)
│   articulate-localization.astro     (si existe)
│
├── [GRUPO 2] Productos complejos ─────────────────────────────
│   vyond-mexico.astro
│   moodle-mexico.astro
│   totara-lms-mexico.astro
│
├── [GRUPO 3] Familia DDC ─────────────────────────────────────
│   lys-mexico.astro
│   strikeplagiarism-mexico.astro
│   proctorizer-mexico.astro
│   customguide-mexico.astro
│   ottolearn-mexico.astro
│
├── [GRUPO 4] Páginas de contenido ────────────────────────────
│   index.astro
│   nosotros.astro
│   contacto.astro
│   desarrollo-de-contenidos.astro
│   class-taec.astro
│   7minutes-learning.astro
│   pifini-mexico.astro
│   quiz/index.astro
│
└── [GRUPO 5] Intranet (SSR protegida) ────────────────────────
    interno/dashboard.astro
    interno/login.astro
    interno/playbooks/[producto].astro
```

---

## GRUPO 1 — Familia Articulate

### Qué son

Páginas de sub-producto de Articulate 360. Todas comparten una **barra de tabs** (`art-tabs`) que permite navegar entre ellas: Articulate 360 · Rise 360 · Storyline 360 · Review 360 · Reach 360 · AI Assistant · Localization.

### Arquitectura

```
BaseLayout
└── [barra de tabs art-tabs — hardcoded en cada página]
└── Hero custom (NO usa HeroComercial — hero propio con CSS art-hero)
└── Secciones de features (art-feat-grid)
└── Quote / Testimonial (art-quote)
└── CTA band (art-cta-band)
```

**No usan** `HeroComercial`, `GridBeneficios`, `FAQAccordion`, ni `CtaFinal`. Todo es HTML inline con clases `art-*`.

### CSS

Cada página define su propio bloque `<style is:global>` con clases prefijadas `art-`. Las reglas estructurales (grids, secciones, cards) son candidatas a migrar a `product-page.css` en el futuro.

**Variables de color:**
```css
:root { --art: #7C3AED; } /* púrpura Articulate */
```

### Reglas al editar

- **Barra de tabs:** si se agrega una nueva sub-página de Articulate, agregar su `<a class="art-tab">` en **todas** las páginas del grupo. La barra está hardcoded en cada una — no es un componente.
- **Hero:** el hero tiene un mockup CSS (simulación de interfaz) en la columna derecha. No reemplazar con imagen sin diseñar el reemplazo.
- **Alineación de encabezados:** `art-section-label`, `art-section-title` y `art-section-sub` deben tener siempre `text-align: center`. Si se agrega una nueva sección, asegurarse de incluirlo.

### Página especial: `articulate-360-mexico.astro`

Es la página madre del grupo y tiene lógica adicional:
- Tabla de pricing con PromoConfig (PROMO-001)
- Geolocalización via `/api/get-promo`
- Secciones de productos incluidos en la suite (Rise, Storyline, etc.)
- No sigue exactamente el mismo esquema que las sub-páginas

---

## GRUPO 2 — Productos complejos

### Qué son

Páginas de productos principales con estructura propia y única. Cada una tiene secciones medias tan específicas que no son candidatas a template.

| Página | Color de marca | Particularidades |
|---|---|---|
| `vyond-mexico.astro` | `#C84D16` naranja | `VyondNav` custom, pricing con 3 planes, badges G2 |
| `moodle-mexico.astro` | `#F98012` naranja Moodle | Suite de 3 productos, 6 servicios TAEC, G2 badges |
| `totara-lms-mexico.astro` | `#004775` azul | Formulario de demo integrado con EmailJS |

### Arquitectura

```
BaseLayout
└── HeroComercial (props específicas)
└── Stats bar (números globales del producto)
└── Secciones medias únicas por producto
└── G2 / Testimonial
└── FAQAccordion
└── CtaFinal
```

### CSS

Cada página tiene su prefijo propio:
- `vyond-mexico.astro` → clases `vy-*`
- `moodle-mexico.astro` → clases `moo-*`
- `totara-lms-mexico.astro` → clases `tot-*`

### Reglas al editar

- **No mover a template** — las secciones medias son estructuralmente únicas.
- **Precios:** siempre en USD sin IVA. Los precios en MXN se calculan al tipo de cambio en el momento de la cotización — no hardcodearlos.
- **G2 badges:** actualizar cada trimestre cuando G2 publica nuevos rankings (Winter / Spring / Summer / Fall).
- **`vyond-mexico`:** el componente `VyondNav` es solo para esta página — no importar en otras.
- **`totara-lms-mexico`:** el formulario de demo usa `emailjs.ts`. Si cambian las credenciales EmailJS, actualizar `src/data/emailjs.ts` — no hardcodear en la página.

---

## GRUPO 3 — Familia DDC

### Qué son

Páginas de productos distribuidos como parte de la oferta DDC (Desarrollo de Contenidos). Comparten la misma estructura de componentes y siguen el mismo patrón de imports.

**Páginas del grupo:**
- `lys-mexico.astro` — plataforma WhatsApp learning
- `strikeplagiarism-mexico.astro` — detector de plagio e IA
- `proctorizer-mexico.astro` — proctoring online
- `customguide-mexico.astro` — cursos de ofimática SCORM
- `ottolearn-mexico.astro` — microlearning adaptativo

### Arquitectura (post-refactor)

```
ProductPageLayout  ← src/layouts/ProductPageLayout.astro
├── BaseLayout
├── HeroComercial    (props via layout)
├── <slot />         ← secciones medias específicas del producto
├── GridBeneficios   (props via layout)
├── FAQAccordion     (props via layout)
└── CtaFinal         (props via layout)
```

### CSS

Usan `src/styles/product-page.css` con clases `pp-*`. Cada página define solo la variable de color:

```css
:root { --brand: #c81932; } /* color del producto */
```

**Clases disponibles en `product-page.css`:**

| Clase | Uso |
|---|---|
| `pp-section` | Sección con padding 72px 5% |
| `pp-section-alt` | Fondo gris claro `#F8FAFC` |
| `pp-section-dark` | Fondo oscuro `#0f172a` |
| `pp-section-inner` | Contenedor centrado max 1100px |
| `pp-section-label` | Eyebrow uppercase centrado |
| `pp-section-title` | Título principal centrado |
| `pp-section-sub` | Subtítulo centrado, max 700px |
| `pp-grid-2` / `pp-grid-3` / `pp-grid-4` | Grids responsive |
| `pp-card` | Card blanca con hover |
| `pp-card--dark` | Card oscura para fondo `pp-section-dark` |
| `pp-card-icon` | Emoji/icono 30px |
| `pp-card-num` | Número grande opaco (pasos 01, 02...) |
| `pp-card-title` | Título de card |
| `pp-card-desc` | Descripción de card |
| `pp-testimonial` | Sección testimonial centrada |

### Cómo agregar una nueva página DDC

1. Crear `src/pages/[nombre]-mexico.astro`
2. Importar `ProductPageLayout`:

```astro
---
import ProductPageLayout from '../layouts/ProductPageLayout.astro';
import { getBookingUrl } from '../data/contact';
import { r } from '../utils/paths';

const bookingUrl = getBookingUrl();

// Definir arrays de datos
const beneficios = [ ... ];
const faqs = [ ... ];
---

<ProductPageLayout
  meta={{
    title: "[Producto] en México | [propuesta de valor] | TAEC",
    description: "...",
    page: "[nombre]-mexico.html"
  }}
  hero={{
    eyebrow: "[Producto]",
    titleHtml: "Título con <em>énfasis</em>",
    subtitle: "...",
    features: ["...", "..."],
    primaryBtn: { label: "Solicitar demo →", url: bookingUrl, target: "_blank" },
    secondaryBtn: { label: "Hablar con un especialista", url: r('/contacto') },
    cardLogoSrc: r("/assets/logos/[producto].svg"),
    theme: "general",
    brandColor: "#[color-hex]"
  }}
  beneficios={{
    eyebrow: "Por qué [Producto]",
    title: "...",
    cards: beneficios,
    columns: 2,
    theme: "general"
  }}
  faqs={{
    eyebrow: "Preguntas frecuentes",
    title: "Todo sobre [Producto] en México",
    faqs,
    theme: "general"
  }}
  cta={{
    title: "...",
    subtitle: "...",
    primaryBtnText: "Solicitar demo →",
    primaryBtnUrl: bookingUrl,
    primaryBtnTarget: "_blank",
    theme: "general"
  }}
>
  <!-- Secciones medias específicas del producto -->
  <style>
    :root { --brand: #[color-hex]; }
  </style>

  <section class="pp-section pp-section-alt">
    <div class="pp-section-inner">
      <p class="pp-section-label">Eyebrow</p>
      <h2 class="pp-section-title">Título de sección</h2>
      <div class="pp-grid-3">
        {cards.map(c => (
          <div class="pp-card">
            <span class="pp-card-icon">{c.icon}</span>
            <h3 class="pp-card-title">{c.title}</h3>
            <p class="pp-card-desc">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
</ProductPageLayout>
```

3. Agregar logo en `public/assets/logos/[producto].svg`
4. Agregar al menú si corresponde: `src/data/navigation.ts`

### Reglas al editar

- **`pp-section-label`, `pp-section-title`, `pp-section-sub` siempre centrados** — ya está en el CSS, no agregar `text-align` inline.
- **No definir clases nuevas con prefijo de producto** (ej. `lys-*`) — usar `pp-*` del archivo compartido.
- Si necesitas un estilo muy específico que no existe en `pp-*`, agregar un `<style>` en la página pero documentar por qué no va en `product-page.css`.

---

## GRUPO 4 — Páginas de contenido

### Qué son

Páginas que no son de producto específico: home, nosotros, contacto, quiz, servicios propios de TAEC.

| Página | Propósito |
|---|---|
| `index.astro` | Home — hero principal, ticker de promos, logos clientes |
| `nosotros.astro` | Quiénes somos, equipo, historia |
| `contacto.astro` | Formulario GAS + geolocalización de promo |
| `desarrollo-de-contenidos.astro` | Servicio de diseño instruccional TAEC |
| `class-taec.astro` | Plataforma de cursos TAEC |
| `quiz/index.astro` | Diagnóstico interactivo de herramientas |

### Reglas al editar

- **`contacto.astro`:** tiene lógica de geolocalización via `/api/get-promo`. No remover el fetch async. Ver sección de infraestructura geo en `CLAUDE.md`.
- **`index.astro`:** el ticker de promos lee de `src/data/promos.ts`. Agregar promos ahí, no en el HTML.
- **`quiz/index.astro`:** SPA de React embebida. El estado del quiz es local — no hay backend. Si se agregan productos, actualizar la lógica de recomendación dentro del componente.

---

## GRUPO 5 — Intranet `/interno/`

### Qué son

Páginas SSR protegidas por Supabase Auth. Solo accesibles para `@taec.com.mx`.

Ver documentación completa en `README.md` → sección Intranet.

### Reglas al editar

- `export const prerender = false` en **todas** las páginas bajo `/interno/`.
- No agregar rutas bajo `/interno/` sin actualizar `src/middleware.ts`.
- Los playbooks dinámicos usan `src/pages/interno/playbooks/[producto].astro` — agregar contenido en `src/data/playbooks/` o la fuente de datos que corresponda.

---

## Regla de alineación — TODAS las páginas

**Regla global:** Los encabezados de sección (eyebrow label, título, subtítulo) encima de cualquier grid de cards deben estar **centrados** en todas las páginas de producto, sin excepción.

En páginas del Grupo 3 (DDC) esto lo resuelve `product-page.css` automáticamente.

En páginas de los Grupos 1 y 2, verificar que el CSS de la página tenga `text-align: center` en las clases de encabezado:

```css
/* ✓ Correcto */
.art-section-label { text-align: center; ... }
.art-section-title { text-align: center; ... }
.art-section-sub   { text-align: center; ... }

/* ✗ Incorrecto — parche inline, síntoma de que la clase no lo tiene */
<h2 class="art-section-title" style="text-align:center">...</h2>
```

Si encuentras un `style="text-align:center"` inline en un encabezado de sección, agregar la propiedad a la clase CSS y eliminar el atributo inline.

---

## Checklist al agregar una página de producto nueva

```
[ ] ¿Identifiqué a qué grupo pertenece?
[ ] ¿Usé ProductPageLayout (Grupo 3) o el patrón correcto del grupo?
[ ] ¿Definí --brand con el color del producto?
[ ] ¿Los encabezados de sección están centrados?
[ ] ¿El logo está en public/assets/logos/?
[ ] ¿Los CTAs usan getBookingUrl() o r('/contacto') — sin URLs hardcodeadas?
[ ] ¿El meta title sigue el patrón "[Producto] en México | [valor] | TAEC"?
[ ] ¿Agregué la página al menú en navigation.ts si corresponde?
[ ] ¿Corrí astro build sin errores antes del PR?
```

---

## Checklist al editar una página existente

```
[ ] ¿Leí la página completa antes de editar?
[ ] ¿Verifiqué que la URL no cambia (afecta SEO)?
[ ] ¿Los precios están en USD sin IVA?
[ ] ¿Los badges G2 están actualizados al trimestre actual?
[ ] ¿Corrí astro build sin errores?
[ ] ¿Abrí PR — no hice commit directo a main?
```
