# UI Components — TAEC Astro

> CHANGELOG: 19/03/2026 — Created to document shared UI components and enforce correct usage.

Estos componentes son la única fuente de verdad para las secciones hero, beneficios, FAQ y CTA en páginas de producto. **No duplicar CSS ni HTML que ya exista aquí.**

---

## HeroComercial

**Archivo:** `src/components/ui/HeroComercial.astro`

### Qué hace
Renderiza la sección hero de páginas de producto: dos columnas (texto + tarjeta), con lista de features con ✓, botones CTA primario y secundario opcional, eyebrow accent, y soporte para logo de socio en la tarjeta.

### Props

| Prop | Tipo | Req | Default | Descripción |
|------|------|-----|---------|-------------|
| `eyebrow` | `string` | ✓ | — | Texto destacado encima del H1 (nombre de producto) |
| `titleHtml` | `string` | ✓ | — | HTML del H1; usa `<em>` para colorear con el acento del tema |
| `subtitle` | `string` | ✓ | — | Párrafo descriptivo bajo el H1 |
| `features` | `string[]` | ✓ | — | Lista de bullets en la tarjeta derecha |
| `primaryBtn` | `{ label, url, target? }` | ✓ | — | Botón principal. Si `target="_blank"`, agrega `rel` automáticamente |
| `secondaryBtn` | `{ label, url, target? }` | — | — | Botón ghost opcional |
| `bottomText` | `string` | — | — | Micro-texto bajo los botones (trust signals) |
| `cardLogoSrc` | `string` | — | — | URL de imagen de logo/badge para la tarjeta |
| `cardLogoStyle` | `string` | — | `"height:44px;width:auto;"` | CSS inline para el logo |
| `cardBadgeText` | `string` | — | — | Etiqueta sobre la lista de features |
| `theme` | `'moo'\|'tot'\|'art'\|'vyond'\|'general'` | — | `'general'` | Paleta de colores |

### Temas disponibles
- `moo` — Moodle: gradiente naranja oscuro, acento `#FFB05A`
- `tot` — Totara: gradiente azul marino, acento `#A8DBD9`
- `art` — Articulate: gradiente oscuro azul, acento `#7DD3FC`
- `vyond` — Vyond: gradiente índigo-morado, acento `#f472b6`
- `general` — fallback azul oscuro

### Cuándo usar
Usar **siempre** como primera sección de páginas de producto (`.../mexico`, etc.).

### Cuándo NO usar
- En páginas genéricas (home, about, contacto) donde el hero tiene estructura diferente
- Si el hero necesita un video de fondo, imagen full-bleed, o más de 2 columnas

### Ejemplo
```astro
<HeroComercial
  theme="art"
  eyebrow="Articulate 360"
  titleHtml="La suite de autoría <em>más completa</em> del mercado"
  subtitle="Storyline, Rise 360 y más — todo en una sola suscripción."
  features={["Soporte en español", "Factura en MXN"]}
  primaryBtn={{ label: "Solicitar demo →", url: "/contacto" }}
  cardLogoSrc="/assets/logos/articulate.png"
  cardBadgeText="Por qué Articulate con TAEC"
/>
```

---

## GridBeneficios

**Archivo:** `src/components/ui/GridBeneficios.astro`

### Qué hace
Grid de tarjetas para secciones "Por qué [Producto]" / "Ventajas". Cada tarjeta tiene ícono emoji, título y descripción. Soporta 2, 3 o 4 columnas.

### Props

| Prop | Tipo | Req | Default | Descripción |
|------|------|-----|---------|-------------|
| `title` | `string` | ✓ | — | H2 de la sección |
| `cards` | `ContenidoCard[]` | ✓ | — | Array de tarjetas |
| `eyebrow` | `string` | — | — | Etiqueta small sobre el título |
| `subtitle` | `string` | — | — | Párrafo descriptivo |
| `columns` | `2\|3\|4` | — | `3` | Número de columnas en desktop |
| `theme` | `'moo'\|'tot'\|'art'\|'vyond'\|'general'` | — | `'general'` | Paleta de colores |

#### ContenidoCard
```typescript
{ icon: string; title: string; description: string }
```

### Cuándo usar
Secciones de beneficios simples donde cada item es: ícono + título + descripción (1-3 líneas).

### Cuándo NO usar
- Si las tarjetas tienen listas internas (`<ul>`) → usar HTML custom (ver Totara productos)
- Si las tarjetas tienen imagen real (foto/ilustración) → usar HTML custom
- Si hay más de 6 tarjetas y necesitas subgrupos → usar HTML custom

### Ejemplo
```astro
const beneficios = [
  { icon: "🚀", title: "Velocidad", description: "Deploy en minutos." },
  { icon: "🔒", title: "Seguridad", description: "Cifrado end-to-end." }
];
<GridBeneficios theme="moo" title="Ventajas" columns={2} cards={beneficios} />
```

---

## FAQAccordion

**Archivo:** `src/components/ui/FAQAccordion.astro`

### Qué hace
Sección FAQ con acordeones accesibles usando `<details>/<summary>` nativo — **sin JavaScript**. Cada pregunta usa `answerHtml` para soportar HTML enriquecido (bold, links, listas) dentro de la respuesta.

### Props

| Prop | Tipo | Req | Default | Descripción |
|------|------|-----|---------|-------------|
| `title` | `string` | ✓ | — | H2 de la sección |
| `faqs` | `FaqItem[]` | ✓ | — | Array de preguntas/respuestas |
| `eyebrow` | `string` | — | — | Etiqueta sobre el título |
| `subtitle` | `string` | — | — | Párrafo descriptivo |
| `subtitleLink` | `{ text, url }` | — | — | Link opcional dentro del subtítulo |
| `theme` | `'moo'\|'tot'\|'art'\|'vyond'\|'general'` | — | `'general'` | Paleta de colores |

#### FaqItem
```typescript
{ question: string; answerHtml: string }
```

### Cuándo usar
Siempre que haya una sección FAQ en páginas de producto. Reemplaza cualquier implementación custom de acordeón JS.

### Cuándo NO usar
- FAQs muy largas con sub-secciones (>12 items) — considerar dividir en grupos con HTML
- Si se necesita expandir/colapsar todos a la vez con un botón

### Importante
`answerHtml` se renderiza con `set:html`, lo que permite HTML pero requiere que el contenido sea de confianza (no user-generated).

### Ejemplo
```astro
const faqs = [
  { question: "¿Cuánto cuesta?", answerHtml: "Desde <strong>$X MXN</strong> anuales." },
  { question: "¿Hay soporte?", answerHtml: "Sí, en español vía WhatsApp y email." }
];
<FAQAccordion theme="tot" title="Preguntas frecuentes" faqs={faqs} />
```

---

## CtaFinal

**Archivo:** `src/components/ui/CtaFinal.astro`

### Qué hace
Banda CTA al final de páginas de producto. **Siempre** incluye tres botones:
1. Botón primario configurable
2. Botón WhatsApp (desde `contactData.whatsapp.url`)
3. Botón ghost "Agendar diagnóstico gratuito" (TidyCal desde `contactData.tidycal`)

### Props

| Prop | Tipo | Req | Default | Descripción |
|------|------|-----|---------|-------------|
| `title` | `string` | ✓ | — | H2 del CTA |
| `subtitle` | `string` | ✓ | — | Párrafo descriptivo |
| `primaryBtnText` | `string` | — | `"Solicitar propuesta →"` | Texto del botón primario |
| `primaryBtnUrl` | `string` | — | `"/contacto"` | URL del botón primario |
| `primaryBtnTarget` | `string` | — | — | Target (`"_blank"` para links externos) |
| `theme` | `'moo'\|'tot'\|'art'\|'vyond'\|'general'` | — | `'general'` | Paleta de colores |

### Política global de CTA
CtaFinal implementa la política de conversión global: **todas las páginas de producto exponen WhatsApp y TidyCal** como opciones de contacto secundario. No usar CTAs custom al final de páginas si pueden usar este componente.

### Cuándo usar
Como último elemento de `<main>` en todas las páginas de producto.

### Cuándo NO usar
- En páginas con formularios de contacto incrustados (el formulario es el CTA)
- En páginas donde el CTA requiere lógica de estado (formularios con validación custom)

### Ejemplo
```astro
<CtaFinal
  theme="vyond"
  title="¿Listo para crear videos con IA?"
  subtitle="Empieza gratis hoy. TAEC te acompaña."
  primaryBtnText="Probar gratis →"
  primaryBtnUrl="https://think.vyond.com/signup"
  primaryBtnTarget="_blank"
/>
```

---

## LogosGrid

**Archivo:** `src/components/ui/LogosGrid.astro`

### Qué hace
Franja horizontal de logos/badges de socios, certificaciones o reconocimientos. Soporta ítems tipo `image` (con `<img>`) o tipo `text` (con pill visual), cada uno con badge tag opcional.

### Props

| Prop | Tipo | Req | Default | Descripción |
|------|------|-----|---------|-------------|
| `logos` | `LogoItem[]` | ✓ | — | Array de logos/text pills |
| `eyebrow` | `string` | — | — | Etiqueta sobre los logos |
| `theme` | `'moo'\|'tot'\|'art'\|'vyond'\|'general'` | — | `'general'` | Paleta de colores |

#### LogoItem
```typescript
{
  type: 'image' | 'text';
  src?: string;      // cuando type='image'
  alt?: string;      // cuando type='image'
  text?: string;     // cuando type='text'
  badge?: string;    // etiqueta opcional bajo el logo
}
```

### Cuándo usar
Secciones de "partners", "certificaciones" o "reconocimientos" donde solo hay logos/texto, sin descripción extensa.

### Cuándo NO usar
- Si los badges tienen descripciones largas → usar `GridBeneficios`
- Si los logos son parte de un carrusel animado → HTML custom

---

## Resumen de páginas refactorizadas

| Página | Componentes usados | Líneas antes | Líneas después | Reducción |
|--------|-------------------|:---:|:---:|:---:|
| `moodle-mexico.astro` | Hero, FAQ, CTA | ~345 | ~200 | −42% |
| `articulate-360-mexico.astro` | Hero, GridBeneficios, FAQ, CTA | 687 | 497 | −28% |
| `vyond-mexico.astro` | Hero, GridBeneficios, FAQ, CTA | 478 | 324 | −32% |
| `totara-lms-mexico.astro` | Hero, GridBeneficios, FAQ, CTA | 549 | 396 | −28% |

**CSS eliminado total estimado:** ~650 líneas de CSS duplicado (hero, ventajas, faq, cta, wip-*) a través de las 4 páginas.
