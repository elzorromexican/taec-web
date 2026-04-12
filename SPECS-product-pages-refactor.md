# Specs: Refactor páginas de producto
**Para:** Antigravity  
**Rama:** `feature/product-pages-css-consolidation`  
**Auditoría post-PR:** Claude Code  

---

## Contexto

El sitio tiene ~23,300 líneas de código fuente. Las páginas de producto acumulan duplicación en CSS (cada página redefine los mismos patrones con prefijo distinto) e inconsistencias visuales (alineación de encabezados). Este refactor ataca ambos problemas sin tocar URLs, SEO ni lógica de negocio.

**No tocar:** `articulate-360-mexico.astro`, `vyond-mexico.astro`, `moodle-mexico.astro` — demasiada lógica específica.

---

## Prerequisito

```bash
git checkout main && git pull
git checkout -b feature/product-pages-css-consolidation
```

---

## TAREA A — Crear CSS compartido

**Crear:** `astro-web/src/styles/product-page.css`

```css
/* ═══════════════════════════════════════════════════════
   product-page.css — estilos compartidos entre páginas
   de producto. Cada página define --brand con su color.
   ═══════════════════════════════════════════════════════ */

/* ── Stats bar ── */
.pp-stats { border-bottom: 1px solid var(--border); padding: 28px 5%; }
.pp-stats-inner { max-width: 1100px; margin: 0 auto; display: flex; justify-content: center; gap: 56px; flex-wrap: wrap; }
.pp-stat { text-align: center; }
.pp-stat-num { font-size: clamp(28px, 3vw, 38px); font-weight: 800; color: var(--brand, #111827); line-height: 1; margin-bottom: 6px; }
.pp-stat-label { font-size: 13px; color: #64748B; line-height: 1.4; }

/* ── Secciones genéricas ── */
.pp-section { padding: 72px 5%; }
.pp-section-alt { background: #F8FAFC; }
.pp-section-dark { background: #0f172a; }
.pp-section-inner { max-width: 1100px; margin: 0 auto; }
.pp-section-label,
.pp-section-title,
.pp-section-sub { text-align: center; }
.pp-section-label { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--brand, #64748B); margin-bottom: 10px; display: block; }
.pp-section-title { font-size: clamp(24px, 2.8vw, 36px); font-weight: 800; color: #111827; margin-bottom: 12px; }
.pp-section-title--light { color: white; }
.pp-section-sub { font-size: 15px; color: #64748B; line-height: 1.75; margin-bottom: 48px; max-width: 700px; margin-left: auto; margin-right: auto; }

/* ── Grids de cards ── */
.pp-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
.pp-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.pp-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

/* ── Card base ── */
.pp-card { background: white; border: 1.5px solid var(--border); border-radius: 14px; padding: 28px; transition: border-color .2s, box-shadow .2s; }
.pp-card:hover { border-color: var(--brand); }
.pp-card--dark { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 14px; padding: 28px 22px; }
.pp-card-icon { font-size: 30px; display: block; margin-bottom: 14px; }
.pp-card-num { font-size: clamp(28px, 3vw, 40px); font-weight: 900; color: var(--brand); opacity: .4; display: block; margin-bottom: 12px; line-height: 1; }
.pp-card-title { font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 8px; line-height: 1.4; }
.pp-card-title--light { color: white; }
.pp-card-desc { font-size: 13px; color: #64748B; line-height: 1.7; }
.pp-card-desc--light { color: rgba(255,255,255,.55); }

/* ── Testimonial ── */
.pp-testimonial { padding: 56px 5%; text-align: center; }
.pp-testimonial blockquote { max-width: 760px; margin: 0 auto; font-size: clamp(16px, 2vw, 24px); color: white; line-height: 1.65; font-style: italic; margin-bottom: 20px; }
.pp-testimonial cite { font-size: 13px; font-weight: 700; font-style: normal; }
.pp-testimonial .pp-cite-role { font-size: 12px; color: rgba(255,255,255,.6); margin-top: 4px; display: block; }

/* ── Responsive ── */
@media (max-width: 1024px) {
  .pp-grid-3 { grid-template-columns: 1fr; }
  .pp-grid-4 { grid-template-columns: repeat(2, 1fr); }
  .pp-stats-inner { gap: 28px; }
}
@media (max-width: 768px) {
  .pp-grid-4 { grid-template-columns: 1fr; }
  .pp-grid-2 { grid-template-columns: 1fr; }
}
```

**Importar en `BaseLayout.astro`** — agregar junto a los otros imports de estilos globales:

```astro
import '../styles/product-page.css';
```

---

## TAREA B — Migrar páginas DDC al CSS compartido

Estas 5 páginas usan el mismo patrón de imports y tienen secciones medias que pueden usar las clases `pp-*`. Migrar una por una, verificando en dev (`astro dev`) que se ve igual antes de pasar a la siguiente.

**Páginas a migrar:**
- `astro-web/src/pages/lys-mexico.astro`
- `astro-web/src/pages/strikeplagiarism-mexico.astro`
- `astro-web/src/pages/proctorizer-mexico.astro`
- `astro-web/src/pages/customguide-mexico.astro`
- `astro-web/src/pages/ottolearn-mexico.astro`

**Proceso por página:**

1. Reemplazar clases locales por equivalentes `pp-*`:

| Clase local (ejemplo ottolearn) | Reemplazar por |
|---|---|
| `otto-pasos` / `opasos-inner` | `pp-section pp-section-dark` / `pp-section-inner` |
| `section-label` | `pp-section-label` |
| `section-title` | `pp-section-title` |
| `section-sub` | `pp-section-sub` |
| `pasos-grid` (4 cols) | `pp-grid-4` |
| `paso-card` | `pp-card pp-card--dark` |
| `paso-num` | `pp-card-num` |
| `func-grid` (4 cols) | `pp-grid-4` |
| `func-card` | `pp-card` |
| `func-icon` | `pp-card-icon` |
| `prob-item` | `pp-card` |
| `prob-num` | `pp-card-num` |

2. Definir `--brand` en el `<style>` de la página con el color del producto:
```css
:root { --brand: #c81932; } /* ottolearn */
:root { --brand: #0ea5e9; } /* strikeplagiarism — ajustar al color real */
```

3. Eliminar del bloque `<style>` de la página todas las clases que ya cubre `product-page.css`.

4. Si el bloque `<style>` queda vacío o con solo 2-3 reglas muy específicas, eliminarlo por completo.

---

## TAREA C — Layout compartido para páginas DDC (después de B)

Las 5 páginas migradas comparten la misma estructura de componentes:
```
BaseLayout → HeroComercial → [secciones medias] → GridBeneficios → FAQAccordion → CtaFinal
```

**Crear:** `astro-web/src/layouts/ProductPageLayout.astro`

```astro
---
import BaseLayout from './BaseLayout.astro';
import HeroComercial from '../components/ui/HeroComercial.astro';
import GridBeneficios from '../components/ui/GridBeneficios.astro';
import FAQAccordion from '../components/ui/FAQAccordion.astro';
import CtaFinal from '../components/ui/CtaFinal.astro';

interface Props {
  meta: {
    title: string
    description: string
    page: string
  }
  hero: Parameters<typeof HeroComercial>[0]
  beneficios: {
    eyebrow?: string
    title: string
    subtitle?: string
    cards: { icon: string; title: string; description: string }[]
    columns?: number
    theme?: string
  }
  faqs: {
    eyebrow?: string
    title: string
    faqs: { question: string; answerHtml: string }[]
    theme?: string
  }
  cta: Parameters<typeof CtaFinal>[0]
}

const { meta, hero, beneficios, faqs, cta } = Astro.props;
---

<BaseLayout
  title={meta.title}
  description={meta.description}
  section="Soluciones"
  page={meta.page}
>
  <HeroComercial {...hero} />
  <slot />
  <GridBeneficios {...beneficios} />
  <FAQAccordion {...faqs} />
  <CtaFinal {...cta} />
</BaseLayout>
```

**Migrar `lys-mexico.astro` como piloto** usando el nuevo layout:

```astro
---
import ProductPageLayout from '../layouts/ProductPageLayout.astro';
import { getBookingUrl } from '../data/contact';
import { r } from '../utils/paths';

const bookingUrl = getBookingUrl();

const componentes = [ /* igual que hoy */ ];
const beneficios  = [ /* igual que hoy */ ];
const faqs        = [ /* igual que hoy */ ];
---

<ProductPageLayout
  meta={{
    title: "LYS en México | ...",
    description: "...",
    page: "lys-mexico.html"
  }}
  hero={{
    eyebrow: "LYS",
    titleHtml: "...",
    features: [...],
    primaryBtn: { label: "...", url: bookingUrl, target: "_blank" },
    secondaryBtn: { label: "...", url: r('/contacto') },
    theme: "general",
    brandColor: "#..."
  }}
  beneficios={{
    title: "...",
    cards: beneficios,
    columns: 2,
    theme: "general"
  }}
  faqs={{
    title: "...",
    faqs,
    theme: "general"
  }}
  cta={{
    title: "...",
    primaryBtnText: "...",
    primaryBtnUrl: bookingUrl,
    primaryBtnTarget: "_blank",
    theme: "general"
  }}
>
  <!-- Secciones medias específicas de LYS usando clases pp-* -->
  <section class="pp-section pp-section-alt">
    <div class="pp-section-inner">
      <p class="pp-section-label">Suite completa</p>
      <h2 class="pp-section-title">...</h2>
      <div class="pp-grid-3">
        {componentes.map(c => (
          <div class="pp-card">
            <span class="pp-card-icon">{c.icon}</span>
            <h3 class="pp-card-title">{c.label}</h3>
            <p class="pp-card-desc">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
</ProductPageLayout>
```

Si lys queda bien → migrar las otras 4 con el mismo patrón.

---

## TAREA D — Uniformizar alineación de encabezados (todas las páginas)

**El bug:** Algunas páginas definen `text-align:center` en sus clases de sección, otras no. Resultado: encabezados a la izquierda en unas páginas, centrados en otras. Algunas incluso tienen parches inline `style="text-align:center"` para compensar.

**Auditoría — correr antes de editar:**

```bash
# Clases de encabezado sin text-align (candidatas a corregir)
grep -rn "section-title\|section-label\|section-sub" astro-web/src/pages/ \
  | grep "font-size" \
  | grep -v "text-align"

# Parches inline a eliminar
grep -rn 'style="text-align:center"' astro-web/src/pages/
```

**Fix en páginas que NO se migran al template** — agregar `text-align: center` a las clases de encabezado en cada archivo:

| Archivo | Clases a corregir |
|---|---|
| `articulate-rise360.astro` | `.art-section-label`, `.art-section-title`, `.art-section-sub` |
| `articulate-storyline360.astro` | `.art-section-label`, `.art-section-title`, `.art-section-sub` |
| `articulate-ai-assistant.astro` | `.art-section-label`, `.art-section-title`, `.art-section-sub` |
| `moodle-mexico.astro` | Verificar `.moo-section-title`, `.moo-section-sub` |
| `vyond-mexico.astro` | Verificar `.vy-section-title`, `.vy-section-sub` |

Para cada clase a corregir, agregar `text-align: center` en su definición CSS. Ejemplo:

```css
/* Antes */
.art-section-label { font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: var(--art); margin-bottom: 10px; }

/* Después */
.art-section-label { font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: var(--art); margin-bottom: 10px; text-align: center; }
```

**Eliminar parches inline** — una vez que la clase CSS tenga `text-align:center`, eliminar cualquier `style="text-align:center"` redundante del HTML.

**Regla definitiva:** En todas las páginas de producto, `section-label`, `section-title` y `section-sub` (bajo cualquier prefijo) deben tener `text-align: center`. Sin excepciones, sin parches inline.

---

## Orden de ejecución

```
1. git checkout -b feature/product-pages-css-consolidation
2. TAREA A — Crear product-page.css + importar en BaseLayout
3. TAREA B — Migrar lys → verificar dev → strikeplagiarism → proctorizer → customguide → ottolearn
4. TAREA C — Crear ProductPageLayout → migrar lys como piloto → migrar las otras 4
5. TAREA D — Auditar con grep → corregir clases en páginas no migradas → eliminar parches inline
6. Build final: cd astro-web && npx astro build
7. PR → Claude Code audita
```

## Criterio de éxito

```bash
cd astro-web && npx astro build 2>&1 | tail -20
# → Cero errores

# URLs que deben seguir funcionando exactamente igual:
# /lys-mexico
# /strikeplagiarism-mexico
# /proctorizer-mexico
# /customguide-mexico
# /ottolearn-mexico
# /articulate-rise360
# /articulate-storyline360
# /articulate-ai-assistant
```

Visual: en todas las páginas de producto, el label, título y subtítulo encima de cualquier grid de cards deben estar centrados. Sin excepciones.
