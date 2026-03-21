# Sesión 2026-03-18 — Cierre técnico Fase 1 + Fase 1B
## Proyecto: TAEC e-learning · Sitio estático · GitHub Pages

---

## Contexto del proyecto

| Variable | Valor |
|----------|-------|
| Repo local | `/Users/slimmasmoudi/taec-web` |
| Rama activa | `refactor/fase1-css-js-global` (**sin merge a main aún**) |
| Staging | `https://elzorromexican.github.io/taec-web` |
| Producción | `https://nuevo.taec.com.mx` |
| Hosting | GitHub Pages — sin SSR, sin SSI, sin build step |
| Framework | Ninguno — HTML/CSS/JS estático puro |
| Último commit relevante | `d60d8698` — "Fase 1: externalización CSS y JS compartidos" |

---

## Restricciones permanentes del proyecto

- No cambiar diseño visible
- No cambiar URLs públicas ni slugs
- No introducir includes, fetch de templates, loaders ni renombrados de archivos
- No tocar `summit-articulate/` (5 archivos — microsite independiente, evento 7 mayo)
- No usar frameworks, bundlers ni compiladores

---

## Qué se ejecutó en esta sesión

### Fase 1 (commit `d60d8698`)
- Creados 4 archivos externos globales:
  - `assets/css/base.css` (50 líneas) — reset, `:root` tokens, base tipográfica, skip-link, focus-visible
  - `assets/css/header.css` (165 líneas) — header sticky, nav desktop, mega-menu 3 cols (660px), dropdown simple 2 cols (380px), hamburger, nav móvil, acordeón, active-nav, `@media 768px`
  - `assets/css/footer.css` (45 líneas) — footer grid 4 cols, LATAM strip, `.wa-float` WhatsApp, responsive
  - `assets/js/nav.js` (96 líneas) — año dinámico, active-nav secMap, hamburger con aria-label, `toggleMob()` global, dropdown click-toggle
- 48 archivos HTML: 3 `<link>` añadidos + `<script defer>` a nav.js
- `sitemap.xml`: 40 → 48 URLs, `lastmod: 2026-03-18` uniforme, priority normalizado
- `CHANGELOG.md`: credenciales EmailJS removidas del historial; entrada v2.6 añadida

### Fase 1B (misma sesión)
- `nav.js` actualizado: hamburger Variant 2 con `setAttribute('aria-label', mobileNav.classList.contains('open') ? 'Cerrar menú' : 'Abrir menú')`
- 43 archivos: bloque JS global eliminado (secMap IIFE + hamburger V2 + `function toggleMob` + dropdown IIFE)
- Cirugía quirúrgica en 3 archivos con JS mixto:
  - `articulos.html` — nav JS removido; fetch + filtros de etiquetas preservados
  - `blog.html` — nav JS removido; filtros + Apps Script preservados
  - `estandares.html` — nav JS removido; filtros + expand/collapse preservados
- `vyond-go`, `vyond-mobile`, `vyond-studio` — nav JS removido; bloque `// ── Video play/pause` preservado en `<script>` propio
- `recursos.html` — `.wa-float {}`, `.wa-float:hover {}`, `.wa-float svg {}` eliminados del inline `<style>`
- `CHANGELOG.md` v3.00: cierre técnico completo (limpios, deuda residual, QA, exclusiones, merge)

---

## Archivos externos creados (fuente canónica)

### `assets/css/base.css`
Reset universal, `:root` design tokens, body/a/img base, skip-link, focus-visible.

```css
--navy: #004775   --blue: #3179C2   --teal: #A8DBD9   --orange: #F28B1C
--coral: #D35652  --muted: #7595AA  --dark: #4D4D4E   --light: #F4F7FB
--border: #E2E8F0 --white: #FFFFFF  --text: #111827
--font-display: 'DM Serif Display', Georgia, serif
--font-body: 'Inter', sans-serif
```

### `assets/css/header.css`
Header sticky (`z-index: 200`, `height: 68px`). Mega-menu 3 cols. Dropdown simple 2 cols.
Hamburger `<button id="menuBtn">`. Nav móvil `<div id="mobileNav">`. Acordeón `.mob-toggle`.
Active-nav: `background: #111827 !important`. `@media (max-width: 768px)` oculta nav desktop.

### `assets/css/footer.css`
Footer grid `1.6fr 1fr 1fr 1fr`. `.footer-latam`. `.wa-float` fijo (bottom 24px, right 24px, `#25D366`).
**Nota:** `footer { background: var(--navy) }` = `#004775`. Los 9 Grupo C usan `#04293F` inline que sobrescribe este valor — intencional.

### `assets/js/nav.js`
1. Año dinámico en `#year`
2. Active-nav: secMap (`Soluciones`, `Capacitaci`, `Recursos`) + direct-link matching
3. Hamburger toggle con `setAttribute('aria-label', ...)`
4. `function toggleMob(sectionId, btnId)` — **global, no módulo** (llamada desde `onclick` inline en HTML)
5. Dropdown desktop: click-toggle + cierre al clic exterior

Carga: `<script src="../assets/js/nav.js" defer></script>` (o `assets/js/nav.js` desde index.html).

---

## Orden de carga CSS/JS en cada HTML (arquitectura)

```html
<!-- HEAD -->
<link rel="stylesheet" href="../assets/css/base.css">    <!-- 1º reset + tokens -->
<link rel="stylesheet" href="../assets/css/header.css">  <!-- 2º header + nav -->
<link rel="stylesheet" href="../assets/css/footer.css">  <!-- 3º footer + wa-float -->
<style>
  /* CSS ESPECÍFICO DE ESTA PÁGINA ÚNICAMENTE */
</style>

<!-- Antes de </body> -->
<script src="../assets/js/nav.js" defer></script>
<script>
  /* JS ESPECÍFICO DE ESTA PÁGINA ÚNICAMENTE */
</script>
```

> Para `index.html` el prefijo es `assets/` (sin `../`).
> El `<style>` inline va SIEMPRE después de los `<link>` — la cascada garantiza que el inline gane en conflictos de misma especificidad.
> `function toggleMob` es global para ser accesible desde `onclick="toggleMob(...)"` en HTML. No convertir a módulo sin actualizar todos los `onclick`.

---

## Estado actual de los 48 archivos HTML (+ 5 excluidos)

### ✅ Grupo A — 100% limpios (26 archivos)
Sin ninguna redundancia inline. CSS y JS completamente en archivos externos.

```
index.html
pages/7minutes-learning.html
pages/articulate-360-mexico.html
pages/bigbluebutton-mexico.html
pages/capacitacion-abierta.html
pages/capacitacion-cerrada.html
pages/class-taec.html
pages/clientes.html
pages/contacto.html
pages/curso-articulate.html
pages/customguide-mexico.html
pages/go1-mexico.html
pages/lys-mexico.html
pages/moodle-mexico.html
pages/nosotros.html
pages/ottolearn-mexico.html
pages/proctorizer-mexico.html
pages/recursos.html
pages/servicios.html
pages/strikeplagiarism-mexico.html
pages/totara-lms-mexico.html
pages/vyond-enterprise.html
pages/vyond-mexico.html
pages/vyond-professional.html
pages/vyond-starter.html
pages/zoola-analytics.html
```

---

### ⚠️ Grupo B — `nav-link.active` CSS inline residual (11 archivos)
JS global completamente extraído ✓. Permanece inline: `header .nav-link.active` y `header a.active { background: #111827 }`.

**Por qué no se eliminó:** el selector inline `header a.active` es más amplio que `header a.nav-link.active` en header.css. Eliminar sin auditar si algún `<a>` recibe `active` sin tener también `nav-link` podría dejar sin estilo ese elemento. Riesgo bajo pero real — requiere revisión en Fase 2.

```
pages/articulate-ai-assistant.html
pages/articulate-reach.html
pages/articulate-rise360.html
pages/articulate-storyline360.html
pages/articulos.html
pages/blog.html
pages/comparativos.html
pages/estandares.html
pages/glosario.html
pages/quiz.html
pages/radar.html
```

---

### ⚠️ Grupo C — Footer `#04293F` + `nav-link.active` inline (9 archivos)
JS global extraído en Fase 1B ✓. Permanece inline: `footer { background: #04293F }` + `.wa-float {}` + `.footer-latam {}` + `nav-link.active`.

**Por qué no se eliminó:** `#04293F` difiere de `var(--navy)` (`#004775`). Variante de diseño de footer intencional. Requiere decisión de diseño en Fase 2 antes de unificar.

`vyond-go`, `vyond-mobile`, `vyond-studio` tienen además script de video hero preservado en `<script>` propio.

```
pages/curso-cerrado-empresa.html
pages/curso-cerrado-grupos.html
pages/curso-fundamentos.html
pages/curso-moodle.html
pages/curso-storyline.html
pages/curso-vyond.html
pages/vyond-go.html          ← script video hero preservado
pages/vyond-mobile.html      ← script video hero preservado
pages/vyond-studio.html      ← script video hero preservado
```

---

### 🔴 Grupo D — Sistema de diseño Type B, diferidos íntegros a Fase 2 (2 archivos)
3 `<link>` y nav.js añadidos ✓. CSS y JS inline permanecen porque usan tokens `:root` distintos y no tienen marcadores `/* ── SECTION ── */`.

| Archivo | Tokens diferenciales |
|---------|---------------------|
| `pages/articulate-localization.html` | `--orange: #F59E0B`, `--art: #0891B2` |
| `pages/articulate-review360.html` | `--orange: #F59E0B`, `--art: #16A34A` |

Qué tienen inline: `:root` propio + header CSS completo + footer CSS + secMap IIFE + hamburger + toggleMob.

---

### — Excluidos permanentemente (5 archivos)
```
summit-articulate/index.html
summit-articulate/email.html
summit-articulate/linkedin.html
summit-articulate/llamada.html
summit-articulate/whatsapp.html
```
Microsite evento 7 mayo. IBM Plex Sans. Tokens: `--navy: #1B2A4A`, `--orange: #FF6B35`. Sin header/footer TAEC. Fuera del alcance de cualquier refactor.

---

## Deuda técnica para Fase 2

### F2-1: Auditar y limpiar `header a.active` (11 archivos, Grupo B)
- Verificar en cada archivo que ningún `<a>` en el header recibe clase `active` sin tener también clase `nav-link`
- Si se confirma equivalencia: añadir `header a.active` a header.css y eliminar del inline `<style>`

### F2-2: Resolver footer variante #04293F (9 archivos, Grupo C)
Opciones:
- (a) Unificar: cambiar `#04293F` → `var(--navy)` — decisión de diseño
- (b) Variante: añadir `.footer--dark { background: #04293F }` a footer.css + actualizar HTML
- (c) Mantener como variante intencional documentada

### F2-3: Procesar archivos Type B (2 archivos, Grupo D)
- Crear `assets/css/base-articulate.css` con tokens propios, o usar selector de clase en base.css
- Solo entonces eliminar inline CSS y JS de `articulate-localization` y `articulate-review360`

---

## Pendientes antes del merge

### 1. QA visual en staging — OBLIGATORIO

URL base: `https://elzorromexican.github.io/taec-web`

| Prioridad | Página | Qué verificar |
|-----------|--------|---------------|
| 🔴 | `pages/vyond-go.html` | Video hero: play/pause al clic, botón mute, sin errores JS |
| 🔴 | `pages/vyond-mobile.html` | Idem |
| 🔴 | `pages/vyond-studio.html` | Idem |
| 🔴 | `pages/articulos.html` | Filtros de etiqueta funcionando, búsqueda, carga de cards |
| 🔴 | `pages/blog.html` | Filtros, búsqueda, conteo de publicaciones |
| 🔴 | `pages/estandares.html` | Filtros por categoría, expand/collapse |
| 🟡 | `pages/articulate-localization.html` | Sin conflictos de color o tipografía visibles |
| 🟡 | `pages/articulate-review360.html` | Idem |
| 🟡 | `pages/totara-lms-mexico.html` | Formulario EmailJS, barra sticky |

### 2. Smoke test de navegación — OBLIGATORIO
En ≥ 3 páginas de secciones distintas (ej: index, moodle-mexico, blog):
- [ ] Hamburger abre/cierra nav móvil
- [ ] `aria-label` cambia entre "Abrir menú" / "Cerrar menú"
- [ ] Acordeón móvil (Soluciones / Capacitación / Recursos)
- [ ] Dropdown desktop abre y cierra
- [ ] Active-nav marca sección correcta
- [ ] Año en footer muestra 2026
- [ ] WhatsApp flotante visible y funcional

### 3. Merge a main
```bash
git checkout main
git merge refactor/fase1-css-js-global --no-ff
# Sin --squash: preservar trazabilidad Fase 1 + 1B
git push origin main
```

---

## Métricas consolidadas

| Métrica | Valor |
|---------|-------|
| Archivos HTML totales procesados | 48 (index + 47 pages) |
| 100% limpios | 26 (54 %) |
| Deuda residual Grupo B | 11 (23 %) |
| Deuda residual Grupo C | 9 (19 %) |
| Diferidos íntegros Grupo D | 2 (4 %) |
| Excluidos por diseño | 5 (summit-articulate) |
| Líneas centralizadas en 4 archivos externos | ~355 |
| Reducción neta estimada inline | ~8 100 líneas (~−28 %) |
| sitemap.xml | 48 URLs (antes: 40) |

---

## Notas técnicas críticas

1. **Cascade order CSS:** los `<link>` externos cargan antes que `<style>` inline → el inline SIEMPRE gana conflictos de misma especificidad. La deuda residual de Grupos B y C no genera regresión visual actual.

2. **`toggleMob` debe ser global:** nav.js no usa `type="module"`. `function toggleMob` está en `window`. No convertir a módulo sin actualizar todos los `onclick="toggleMob(...)"` en el HTML.

3. **EmailJS en `totara-lms-mexico.html`:** credenciales operativas client-side en el HTML (intencional por diseño de EmailJS). El CHANGELOG no las expone.

4. **`articulos.html` usa `fetch('../data/articulos.json')`:** si el JSON no existe en el servidor la sección queda vacía sin error visible. Pendiente generar `data/articulos.json`.

5. **`summit-articulate/`:** microsite para evento 7 de mayo. IBM Plex Sans. No tocar en ningún refactor.

6. **GitHub Pages:** sitio 100 % estático. Cualquier arquitectura que requiera procesamiento servidor-side necesita añadir un step de build (ej: 11ty, Vite) — fuera del alcance actual.

---

## Comandos útiles para la próxima sesión

```bash
# Verificar rama actual
git branch --show-current

# Ver estado del repo
git status -s

# Ver último commit
git log --oneline -5

# Archivos con nav-link.active inline (Grupo B)
grep -rl 'nav-link\.active\s*{' pages/ | sort

# Archivos con footer #04293F (Grupo C)
grep -rl '#04293F' pages/ | sort

# Archivos con hamburger inline (debería ser 0 tras Fase 1B)
grep -rl 'menuBtn\.classList\.toggle' pages/ | sort

# Archivos con video script preservado
grep -rl 'Video play/pause' pages/

# Verificar links externos en un archivo
grep 'assets/css\|assets/js' pages/clientes.html
```

---

*Archivo generado al cierre de sesión — 18 mar 2026*
*Próxima acción: QA visual en staging → merge a main → abrir rama Fase 2*
