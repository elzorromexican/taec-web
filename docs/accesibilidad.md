# Estándar de Accesibilidad — TAEC Web

> **Objetivo:** Toda página nueva o modificada en taec-web debe cumplir con WCAG 2.1 nivel AA.
> Este documento es la referencia obligatoria para cualquier desarrollador que trabaje en el proyecto.

---

## Por qué importa

TAEC vende accesibilidad y e-learning inclusivo a sus clientes. El sitio propio debe predicar con el ejemplo.
El incumplimiento de WCAG 2.1 AA puede implicar barreras legales en México (NOM y LGIPD) y pérdida de clientes corporativos que auditan a sus proveedores.

---

## Checklist obligatorio por página nueva

Antes de hacer commit de cualquier página HTML, verificar todos los puntos siguientes.

---

### 1. Skip Link

**Añadir como primer elemento dentro de `<body>`**, antes del `<header>`.

```html
<a class="skip-link" href="#main-content">Ir al contenido principal</a>
```

**CSS requerido** (incluir en la sección `<style>` o en el CSS global):

```css
.skip-link {
  position: absolute; top: -60px; left: 16px;
  background: var(--navy); color: var(--white);
  padding: 8px 16px; border-radius: 0 0 8px 8px;
  font-size: 14px; font-weight: 600; z-index: 9999;
  text-decoration: none; transition: top .2s;
}
.skip-link:focus { top: 0; }
```

---

### 2. Landmark `<main>`

El contenido principal debe estar envuelto en `<main>` con el id que referencia el skip link.

```html
<main id="main-content">
  <!-- Todo el contenido de la página, excepto header y footer -->
</main><!-- /#main-content -->
```

**Regla:** `<header>`, `<nav>` y `<footer>` quedan **fuera** de `<main>`.

---

### 3. Indicadores de foco (:focus-visible)

**Añadir en todos los archivos**, nunca quitar el outline por defecto sin reemplazarlo.

```css
*:focus-visible {
  outline: 3px solid var(--blue);
  outline-offset: 2px;
  border-radius: 4px;
}
button:focus-visible,
a:focus-visible {
  outline: 3px solid var(--blue);
  outline-offset: 2px;
  border-radius: 4px;
}
```

**Nunca usar:** `outline: none` o `outline: 0` sin un reemplazo visible equivalente.

---

### 4. Contraste de color (mínimo 4.5:1 para texto normal)

| Token / Color | Hex | Uso permitido | Ratio sobre blanco |
|---|---|---|---|
| `var(--text)` | `#111827` | Texto principal | 16.1:1 ✅ |
| `var(--dark)` | `#4D4D4E` | Texto secundario | 9.7:1 ✅ |
| `var(--navy)` | `#004775` | Títulos, CTAs | 9.2:1 ✅ |
| `var(--blue)` | `#3179C2` | Links, acentos | 4.6:1 ✅ |
| `#4B5563` | — | Etiquetas categoría (mob-cat) | 7.0:1 ✅ |
| `var(--muted)` | `#7595AA` | **PROHIBIDO para texto sobre blanco** | 3.2:1 ❌ |
| `#94A3B8` | — | **PROHIBIDO para texto sobre blanco** | 3.7:1 ❌ |

**Regla:** `var(--muted)` solo puede usarse en texto **decorativo no esencial** (ejemplo: timestamps, metadatos secundarios en tarjetas con fondo oscuro). Nunca como color principal de texto sobre fondo blanco o claro.

---

### 5. Botones con solo icono o símbolo

Todo `<button>` que no tenga texto visible legible **debe** tener `aria-label`.

```html
<!-- MAL -->
<button class="testi-btn">&#8592;</button>

<!-- BIEN -->
<button class="testi-btn" aria-label="Testimonio anterior">&#8592;</button>
<button class="testi-btn" aria-label="Siguiente testimonio">&#8594;</button>
```

Aplica también a botones de hamburger, cerrar modal, play/pause, etc.

```html
<button class="hamburger" id="menuBtn" aria-label="Abrir menú">
  <span></span><span></span><span></span>
</button>
```

---

### 6. Dropdowns y menús desplegables

Los botones que abren menús deben declarar su estado y rol.

```html
<button class="nav-link" aria-haspopup="true" aria-expanded="false">
  Soluciones
  <svg aria-hidden="true">...</svg>
</button>
```

El valor de `aria-expanded` debe actualizarse en JS al abrir/cerrar:

```js
// Al abrir
btn.setAttribute('aria-expanded', 'true');

// Al cerrar
btn.setAttribute('aria-expanded', 'false');
```

**Para el acordeón móvil**, usar también `aria-controls` apuntando al `id` del panel:

```html
<button class="mob-toggle"
        id="mobSol"
        onclick="toggleMob('mobSolSec','mobSol')"
        aria-expanded="false"
        aria-controls="mobSolSec">
  Soluciones
</button>
<div class="mob-section" id="mobSolSec">...</div>
```

**Función JS estándar `toggleMob`** (siempre usar esta versión):

```js
function toggleMob(sectionId, btnId) {
  const sec = document.getElementById(sectionId);
  const btn = document.getElementById(btnId);
  sec.classList.toggle('open');
  btn.classList.toggle('open');
  btn.setAttribute('aria-expanded', btn.classList.contains('open') ? 'true' : 'false');
}
```

---

### 7. SVGs decorativos

Los SVGs que solo son decoración visual (iconos, flechas, chevrons) deben ocultarse a los lectores de pantalla.

```html
<!-- BIEN -->
<svg aria-hidden="true" viewBox="0 0 24 24">...</svg>

<!-- MAL — el lector de pantalla lo anuncia como "imagen" sin descripción -->
<svg viewBox="0 0 24 24">...</svg>
```

Si el SVG **sí** transmite información, añadir `<title>` dentro:

```html
<svg role="img" viewBox="0 0 24 24">
  <title>WhatsApp</title>
  ...
</svg>
```

---

### 8. Links que abren en nueva pestaña

Todo `target="_blank"` **debe** incluir `rel="noopener noreferrer"`.

```html
<!-- BIEN -->
<a href="https://ejemplo.com" target="_blank" rel="noopener noreferrer">Ver sitio</a>

<!-- MAL -->
<a href="https://ejemplo.com" target="_blank">Ver sitio</a>
```

**Por qué:** Sin `rel="noopener"`, la página destino puede acceder al objeto `window.opener` del sitio de TAEC (vulnerabilidad de seguridad). Sin `rel="noreferrer"`, se filtra el referrer en el header HTTP.

---

### 9. Formularios

#### Labels y campos
Cada campo debe tener su `<label for="id">` correspondiente. Nunca usar solo `placeholder`.

```html
<label for="email">Correo electrónico <span class="req" aria-hidden="true">*</span></label>
<input type="email" id="email" name="email" required aria-required="true" />
```

#### Campos obligatorios
Usar `required` (HTML5) **y** `aria-required="true"` (ARIA) juntos:

```html
<input type="text" id="nombre" name="nombre" required aria-required="true" />
<select id="tema" name="tema" required aria-required="true">...</select>
<textarea id="mensaje" name="mensaje" required aria-required="true"></textarea>
```

El asterisco `*` debe tener `aria-hidden="true"` para que no se lea como "asterisco" y añadir una nota al inicio del formulario:

```html
<p style="font-size:13px;color:var(--dark);">
  Los campos marcados con <span aria-hidden="true">*</span> son obligatorios.
</p>
```

---

### 10. Toggles de estado (switches)

Los botones toggle (encendido/apagado) deben usar `aria-pressed` y actualizar su `aria-label` según el estado:

```html
<button id="aiToggle"
        aria-label="Cambiar a Articulate 360 con IA"
        aria-pressed="false">
  ...
</button>
```

```js
function toggleAI() {
  aiActive = !aiActive;
  toggle.setAttribute('aria-pressed', aiActive ? 'true' : 'false');
  toggle.setAttribute('aria-label',
    aiActive
      ? 'Cambiar a Articulate 360 Standard'
      : 'Cambiar a Articulate 360 con IA'
  );
  // ... resto de la lógica
}
```

---

### 11. Tamaños mínimos de fuente

| Elemento | Mínimo recomendado | Estado actual |
|---|---|---|
| Texto de cuerpo | 14px | ✅ 15px |
| Texto secundario | 12px | ✅ 12–13px |
| `.mob-cat` (etiqueta) | 11px | ⚠️ 10px (pendiente ajuste) |
| `.mega-head` | 11px | ⚠️ 10px (pendiente ajuste) |
| `.badge-saas` | 10px | ⚠️ 9px (pendiente ajuste) |

---

### 12. Tamaños mínimos de área táctil (móvil)

Todo elemento interactivo en móvil debe tener al menos **44×44 px** de área táctil (WCAG 2.5.5).

```css
/* Aplicar a botones pequeños */
.testi-btn {
  min-width: 44px;
  min-height: 44px;
}

/* Si el botón visualmente es más pequeño, usar padding para compensar */
.footer-social a {
  padding: 6px;          /* aumenta área sin cambiar tamaño visual */
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

---

## Herramientas de verificación recomendadas

| Herramienta | Uso | URL |
|---|---|---|
| axe DevTools | Extensión Chrome — auditoría automática | chrome.google.com/webstore |
| WAVE | Extensión Chrome — visualización de errores | wave.webaim.org |
| Colour Contrast Analyser | App de escritorio — verificar ratios | paciellogroup.com |
| Lighthouse | Integrado en Chrome DevTools | F12 → Lighthouse → Accessibility |
| Keyboard navigation | Navegar con Tab, Enter, Esc, flechas | Manual |

---

## Flujo de trabajo para páginas nuevas

```
1. Copiar plantilla base (ver abajo)
2. Desarrollar contenido
3. Abrir en Chrome con axe DevTools activado
4. Corregir todos los errores marcados en rojo
5. Verificar navegación con teclado (Tab por todos los elementos)
6. Verificar en móvil: touch targets, contraste, skip link
7. Lighthouse Accessibility score ≥ 90 antes de commit
8. Hacer commit con nota "a11y: ✅ verificado" en el mensaje
```

---

## Plantilla base para página nueva

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><!-- Título de página --> – TAEC</title>

  <style>
    /* ── TOKENS (copiar de index.html) ── */
    :root {
      --navy: #004775; --blue: #3179C2; --teal: #A8DBD9;
      --orange: #F28B1C; --coral: #D35652; --muted: #7595AA;
      --dark: #4D4D4E; --light: #F4F7FB; --border: #E2E8F0;
      --white: #FFFFFF; --text: #111827;
    }

    /* ── ACCESSIBILITY ── */
    .skip-link {
      position: absolute; top: -60px; left: 16px;
      background: var(--navy); color: var(--white);
      padding: 8px 16px; border-radius: 0 0 8px 8px;
      font-size: 14px; font-weight: 600; z-index: 9999;
      text-decoration: none; transition: top .2s;
    }
    .skip-link:focus { top: 0; }
    *:focus-visible { outline: 3px solid var(--blue); outline-offset: 2px; border-radius: 4px; }
    button:focus-visible, a:focus-visible { outline: 3px solid var(--blue); outline-offset: 2px; border-radius: 4px; }
  </style>
</head>
<body>

<!-- ══ SKIP LINK ══ -->
<a class="skip-link" href="#main-content">Ir al contenido principal</a>

<!-- ══ HEADER ══ -->
<header>
  <!-- Copiar header completo de index.html -->
</header>

<!-- ══ MOBILE NAV ══ -->
<nav class="mobile-nav" id="mobileNav">
  <!-- Copiar mobile nav de index.html -->
</nav>

<!-- ══ MAIN CONTENT ══ -->
<main id="main-content">

  <!-- Contenido de la página aquí -->

</main><!-- /#main-content -->

<!-- ══ FOOTER ══ -->
<footer>
  <!-- Copiar footer de index.html -->
</footer>

<script>
  document.getElementById('year').textContent = new Date().getFullYear();

  // Hamburger
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-label',
      mobileNav.classList.contains('open') ? 'Cerrar menú' : 'Abrir menú');
  });

  // Acordeón móvil — SIEMPRE usar esta versión
  function toggleMob(sectionId, btnId) {
    const sec = document.getElementById(sectionId);
    const btn = document.getElementById(btnId);
    sec.classList.toggle('open');
    btn.classList.toggle('open');
    btn.setAttribute('aria-expanded', btn.classList.contains('open') ? 'true' : 'false');
  }
</script>

</body>
</html>
```

---

## Historial de auditorías

| Fecha | Páginas auditadas | Issues encontrados | Issues corregidos | Score Lighthouse |
|---|---|---|---|---|
| 14 mar 2026 | index.html, articulate-360-mexico.html, contacto.html | 40+ | 35 (Críticos + Altos) | Pendiente medición |

---

*Documento mantenido por el equipo TAEC · Última actualización: 14 mar 2026 · Ver 1.7*
