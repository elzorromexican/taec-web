# TAEC Web — Design System Baseline
> Versión: 0.1 · Fecha: 2026-04-15 · Estado: Baseline (pre-normalización)

## 1. Tokens de Color

### Tokens Oficiales (`:root` en `base.css`)

| Nombre | Valor HEX | Uso Actual |
| :--- | :--- | :--- |
| `--navy` | `#004775` | Fondos de hero principales, títulos de sección, headers |
| `--blue` | `#3179C2` | Enlaces, hover de botones, focus-visible |
| `--teal` | `#A8DBD9` | Acentos, decoradores de sección, degradados |
| `--orange` | `#c2410c` | Botones primarios, CTAs |
| `--coral` | `#D35652` | (No utilizado activamente en la home) |
| `--muted` | `#475569` | Textos secundarios, descripciones de tarjetas |
| `--dark` | `#4D4D4E` | Textos de enlaces del nav, etiquetas del ticker |
| `--light` | `#F4F7FB` | Fondos de sección secundaria |
| `--border` | `#E2E8F0` | Bordes de tarjetas, divisores |
| `--white` | `#FFFFFF` | Fondos principales, textos sobre navy/blue |
| `--text` | `#111827` | Texto base del body, títulos |
| `--art` | `#16A34A` | Color de marca para Articulate |

## 2. Tipografía

### Fuentes
- **Display**: DM Serif Display
- **Body**: Inter

### Escala actual (AS-IS — con inconsistencias documentadas)

| Nivel Semántico | Clase / Selector | Font-size | Font-weight | Dónde se usa |
| :--- | :--- | :--- | :--- | :--- |
| H1 homepage hero | `.hero h1` | `42px` | 400 (base) | Home hero |
| H1 páginas individuales | `.art-hero h1` | `clamp(26px, 3.5vw, 44px)` | 800 | Hero de productos (ej. Articulate) |
| Títulos de sección | `.section-title` | `30px` | 400 (base) | Títulos globales de sección |
| Títulos de sección (Pág interna) | `.pp-section-title` | `clamp(24px, 2.8vw, 36px)` | 800 | Títulos dentro de producto |
| H3 cards | `.serv-card h3`, `.paso h3` | `15px` | 700 | Títulos de tarjetas |
| Body base | `body` | `15px` | 400 | Texto de párrafo general |
| Small / Meta | Varios (`.section-label`, `.rec-tag`)| `10px`-`13px` | Variado | Etiquetas, tickers, overlines |

### Inconsistencias detectadas (no corregidas aún)
- **H1**: Múltiples tamaños y comportamientos de clamp entre la home y páginas internas (issue #74).
- **H3 cards**: `15px` es inferior al mínimo recomendado de `16px` para legibilidad (issue #73).
- **CTA "Saber más ->"**: La clase `.serv-link` utiliza `12px` y carece de un estado hover visible (issue #76).

## 3. Espaciado y Layout
- **Max-width contenido**: `1200px` en Home y páginas base. Existen variaciones a `1100px` (`.pp-section-inner`) y `1000px` (`.art-pricing-inner`) en páginas internas.
- **Padding lateral global**: `5%`
- **Grid gaps documentados**: 
  - `56px` en layout principal hero (`.hero-inner`)
  - `40px` en layouts de elementos grandes (`.partners-row`)
  - `24px` en `.triaje-grid` y páginas de producto (`.pp-grid-2`, `.pp-grid-3`)
  - `20px` a `22px` en grillas de recursos (`.recursos-grid`, `.art-feat-grid`, `.pp-grid-4`)
  - `16px` a `18px` en layouts muy densos (`.servicios-grid`, `.stat-grid`)

## 4. Componentes — Estado Actual

### Botones

| Clase | Color bg | Color texto | Padding | Uso |
| :--- | :--- | :--- | :--- | :--- |
| `.btn-primary` | `var(--orange)` | `var(--white)` | `13px 26px` | CTA Primario Home |
| `.btn-ghost-hero` | `transparent` | `var(--white)` | `13px 26px` | Secundario/Outline Hero |
| `.btn-art-primary`| `#0284C7` | `var(--white)` | `12px 24px` | CTA botones pagina Articulate |
| `.btn-cta-white` | `white` | `var(--art)` | `13px 28px` | CTA bloque branding verde |
| `.btn-cta-band` | `var(--orange)` | `var(--white)` | `14px 28px` | Bandas inferiores globales |
| `.serv-link` | `none` | `var(--blue)` | `0` | Enlaces inline de cards |

### CTAs inline ("Saber más ->")
- **Clase**: `.serv-link`
- **Font-size actual**: `12px`
- **Estado hover**: ninguno (documentar como bug issue #76).

## 5. Colores no tokenizados (issue #75)
Lista de valores HEX hardcodeados en el CSS que deberían transicionarse a tokens del sistema:
- `#0284C7` (Articulate primary blue, distinto de `--blue` que es `#3179C2`)
- `#10B981` (Verde para íconos/checks `feat-check`, diferente de `--art` que es `#16A34A` y de WhatsApp `#25D366`)
- Fondos gris oscuro de página interna: `#0F172A`, `#050E14` (distinto del `--navy` y `--dark`)
- Marcas de logo: `#E8561E` (Articulate), `#00A4E0` (Vyond), `#6A2C8E` (Totara), `#F98012` (Moodle)

## 6. Patrones de Iconos (issue #72)
El patrón actual predominante, es el contenedor para un icono interno o emoji.
- **Ejemplos**: `.serv-icon`, `.paso-num`.
- **Estado**: Pendiente revisión de patrón visual unificado.

## 7. Accesibilidad — Baseline
- **Focus visible**: `outline 3px solid var(--blue)` (global en `base.css`)
- **Touch targets nav**: Min-height `44px` (corregido en PR #81)
- **Contraste**: Pendiente auditoría formal de los degradados y colores superpuestos
