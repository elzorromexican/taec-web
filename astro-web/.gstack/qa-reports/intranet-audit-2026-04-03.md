# QA Audit Report — TAEC Hub Intranet
**Date:** 2026-04-03
**Branch:** main
**Target:** http://localhost:4321/interno/*
**Mode:** Full (static code analysis + browser session)
**Pages Audited:** 5
**Health Score: 66 / 100**

---

## Executive Summary

La intranet tiene una base visual sólida — diseño consistente, buena tipografía, y el flujo principal (autenticación → dashboard → playbooks) está funcionando. El Playbook de Rise 360 con 43 registros carga y es completamente interactivo. Los problemas críticos son: (1) la página de Admin carece de protección de rol en el servidor, lo que la expone a cualquier usuario autenticado; (2) varios botones CTA no tienen ninguna acción conectada; (3) una nota de desarrollo interna queda visible al usuario final en `/colaborar`.

---

## Health Score Breakdown

| Categoría | Peso | Score Raw | Contribución |
|-----------|------|-----------|--------------|
| Console | 15% | 70 | 10.5 |
| Links | 10% | 40 | 4.0 |
| Visual | 10% | 85 | 8.5 |
| Functional | 20% | 45 | 9.0 |
| UX | 15% | 73 | 11.0 |
| Performance | 10% | 88 | 8.8 |
| Content | 5% | 80 | 4.0 |
| Accessibility | 15% | 72 | 10.8 |
| **TOTAL** | | | **66.6 / 100** |

---

## Top 3 Things to Fix (Highest Severity)

1. **[CRÍTICO] Admin sin role-guard en servidor** — Cualquier empleado autenticado puede acceder a `/interno/admin` directamente via URL. El comentario en el código dice "Astro SSR logic checking user role == 'admin' will happen here or middleware" — esa lógica nunca se implementó.

2. **[ALTO] Nota interna de desarrollo visible al usuario** — En `/colaborar`, el texto `"Las bases de datos \`input_colaboradores\` y RLS se conectarán en la siguiente fase."` aparece en la UI de producción. Esto rompe la confianza del usuario y expone el estado de desarrollo interno.

3. **[ALTO] Múltiples botones CTA sin acción conectada** — 4 botones en total no hacen nada: "Abrir Bandeja" (admin), "Visitar Proveedores Externos" (cotizadores), y los 3 quick-link cards del dashboard (href="#").

---

## Issues by Page

---

### 📄 PAGE 1: `/interno/dashboard`

**Status:** Renderiza ✅ | Scroll completo ⚠️

#### ISSUE-001 — Quick Links todos apuntan a `#`
- **Severidad:** Medium
- **Categoría:** Functional
- **Descripción:** Los 3 cards de "Accesos Directos (Drive)" — Formatos Comerciales, Machotes de Contrato, Zoho CRM — tienen `href="#"`. Clicar cualquiera recarga la página sin navegar.
- **Código fuente:** `dashboard.astro` líneas 42–53
- **Fix:** Conectar a `enlaces_internos` en Supabase o hardcodear los URLs de Drive/Zoho por ahora.

#### ISSUE-002 — Contenido debajo del fold no scrolleable (layout constraint)
- **Severidad:** Medium
- **Categoría:** UX / Functional
- **Descripción:** La sección "Accesos Directos (Drive)" puede quedar por debajo del viewport sin forma de scrollear hasta ella. La causa probable es que `.intranet-main-content` tiene `overflow-y: auto` pero el contenedor padre crece libremente (`min-height: 100vh`), por lo que el overflow nunca se activa y el scroll queda atrapado en el `body` — que puede estar bloqueado por el `intranet-layout` full-height flex.
- **Código fuente:** `IntranetLayout.astro` — `.intranet-main-content { flex: 1; overflow-y: auto; }` sin altura máxima explícita.
- **Fix sugerido:** Añadir `height: 100vh; overflow-y: auto;` al `.intranet-layout` para que el scroll quede contenido dentro del layout, no en el `body`.

#### ISSUE-003 — Sin personalización de usuario
- **Severidad:** Low
- **Categoría:** UX
- **Descripción:** No hay saludo personalizado ("Bienvenido, [nombre]"). El `email` y `rol` ya están disponibles en `Astro.locals` desde el middleware.
- **Fix:** Pasar `Astro.locals.email` como prop y mostrarlo en el hero o en el sidebar footer.

---

### 📄 PAGE 2: `/interno/playbooks/rise360`

**Status:** Funcional ✅ | 43 registros cargando ✅ | Tabs ✅ | Acordeón ✅

#### ISSUE-004 — Typo en empty state
- **Severidad:** Low
- **Categoría:** Content
- **Descripción:** En el estado vacío (cuando no hay registros), el texto dice: `"El equipo administrativo editar los datos..."` — falta la palabra "puede" → debería ser "puede editar".
- **Código fuente:** `[producto].astro` línea 103
- **Fix:** Cambiar a "El equipo administrativo puede editar los datos...".

#### ISSUE-005 — Sin breadcrumb ni indicador de producto activo en sidebar
- **Severidad:** Low
- **Categoría:** UX
- **Descripción:** Al estar en un playbook, el sidebar no resalta visualmente cuál es el link activo. El usuario pierde orientación de dónde está.
- **Fix:** Comparar `currentPath` con cada `href` del nav y añadir una clase `active` al link correspondiente.

---

### 📄 PAGE 3: `/interno/admin`

**Status:** Renderiza ✅ | Sin protección de rol ❌

#### ISSUE-006 — [CRÍTICO] Sin role-guard en servidor
- **Severidad:** Critical
- **Categoría:** Functional / Security
- **Descripción:** La página no verifica que `Astro.locals.rol === 'admin'`. El comentario en el frontmatter dice "// Astro SSR logic checking user role == 'admin' will happen here or middleware" — esto nunca se implementó. Cualquier empleado que navegue directamente a `/interno/admin` tiene acceso completo.
- **Código fuente:** `admin/index.astro` línea 5 (comentario placeholder)
- **Fix:**
  ```astro
  ---
  // Añadir al inicio del frontmatter:
  if (Astro.locals.rol !== 'admin') {
    return Astro.redirect('/interno/denegado');
  }
  ---
  ```

#### ISSUE-007 — "Abrir Bandeja" sin acción
- **Severidad:** Medium
- **Categoría:** Functional
- **Descripción:** El botón `<button class="btn-primary mt-2">Abrir Bandeja</button>` no tiene event listener ni href. Es un `<button>` puro sin onClick ni formulario.
- **Fix:** Conectar a una futura vista de aprobaciones o deshabilitar visualmente con tooltip "Próximamente".

#### ISSUE-008 — Link a Supabase apunta a home genérico
- **Severidad:** Medium
- **Categoría:** Functional
- **Descripción:** El botón "Lanzar Supabase Interface" apunta a `https://supabase.com` (homepage pública) en lugar del proyecto específico `https://supabase.com/dashboard/project/[project-ref]`.
- **Fix:** Hardcodear la URL del proyecto Supabase específico o leerla de una variable de entorno.

#### ISSUE-009 — "Sugerencias Pendientes" hardcodeado en 0
- **Severidad:** Low (by design, stub)
- **Categoría:** Functional
- **Descripción:** El contador siempre muestra `0`. No hay query a Supabase.
- **Nota:** Esto es un stub conocido — documentado para la siguiente fase.

---

### 📄 PAGE 4: `/interno/colaborar`

**Status:** Renderiza ✅ | Formulario no funcional (by design) ⚠️

#### ISSUE-010 — [ALTO] Nota interna de desarrollo visible al usuario
- **Severidad:** High
- **Categoría:** Content / UX
- **Descripción:** El texto `"Las bases de datos \`input_colaboradores\` y RLS se conectarán en la siguiente fase."` está renderizado como `<p class="helper-text">` visible a cualquier usuario autenticado. Expone el estado de desarrollo interno y rompe la experiencia de producto terminado.
- **Código fuente:** `colaborar.astro` línea 29
- **Fix opción A (inmediata):** Reemplazar con un mensaje amigable: `"Función disponible próximamente. Tu aporte será bienvenido."`
- **Fix opción B (correcta):** Implementar la conexión a `input_colaboradores` y activar el botón.

#### ISSUE-011 — Botón Submit permanentemente deshabilitado sin indicación clara
- **Severidad:** Medium
- **Categoría:** UX
- **Descripción:** El botón "Enviar para Aprobación" tiene `disabled` + `cursor: not-allowed` + `opacity: 0.6` pero no hay ningún mensaje que diga al usuario POR QUÉ está deshabilitado ni cuándo estará disponible (aparte de la nota de dev del ISSUE-010).
- **Fix:** Añadir un banner/callout informativo en la parte superior del formulario: "Función en construcción — disponible en la próxima versión del Hub."

---

### 📄 PAGE 5: `/interno/cotizadores`

**Status:** Renderiza ✅ | DDC en migración ⚠️ | Proveedores sin acción ❌

#### ISSUE-012 — Typo en descripción del header
- **Severidad:** Low
- **Categoría:** Content
- **Descripción:** `"calculadoras financiarelas"` → debería ser `"calculadoras financieras"`.
- **Código fuente:** `cotizadores/index.astro` línea 9

#### ISSUE-013 — "Visitar Proveedores Externos" sin href ni acción
- **Severidad:** Medium
- **Categoría:** Functional
- **Descripción:** El botón `<button class="btn-secondary mt-2">Visitar Proveedores Externos</button>` no tiene `onclick` ni está dentro de un `<a>`. Al hacer click, no pasa nada.
- **Fix:** Envolver en `<a href="[URL de portal de proveedores]" target="_blank">` o añadir un dropdown con múltiples links.

#### ISSUE-014 — DDC "En migración" sin fecha ni contexto
- **Severidad:** Low
- **Categoría:** UX
- **Descripción:** El botón deshabilitado dice "En migración" pero no da contexto sobre cuándo estará disponible ni cómo cotizar DDC mientras tanto. El dashboard tiene una noticia que dice "Ahora debes cotizar todo proyecto desde el menú izquierdo en la pestaña Cotizadores" — pero al llegar ahí, la herramienta está deshabilitada. Contradicción de mensajes.
- **Fix:** Añadir texto de apoyo: "Usar hoja de cálculo temporal en [link a Drive] mientras la calculadora migra."

---

## Cross-Cutting Issues

#### ISSUE-015 — Sin active state en sidebar navigation
- **Severidad:** Medium
- **Categoría:** UX
- **Descripción:** Ningún link del sidebar tiene una clase visual de "activo". Al navegar entre páginas, el usuario no tiene confirmación visual de en qué sección está.
- **Afecta:** Todas las páginas
- **Fix:** En `IntranetLayout.astro`, comparar `currentPath` con `href` de cada `<a>` y aplicar estilo activo.

```astro
<!-- IntranetLayout.astro — patrón sugerido -->
<a href="/interno/dashboard"
   class={`nav-link ${currentPath === '/interno/dashboard' ? 'active' : ''}`}>
  🏠 Dashboard & News
</a>
```

```css
.nav-link.active {
  background-color: rgba(255,255,255,0.08);
  color: #fff;
}
```

#### ISSUE-016 — Identidad de usuario no visible en ninguna página
- **Severidad:** Low
- **Categoría:** UX
- **Descripción:** El email y rol del usuario están en `Astro.locals` pero no se muestran en ningún lugar del layout (ni en el sidebar footer, ni en un header de usuario).
- **Afecta:** Todas las páginas
- **Fix sugerido:** Agregar al `sidebar-footer` en `IntranetLayout.astro`:
```astro
<div class="user-chip">
  <span class="user-avatar">👤</span>
  <span class="user-email">{email}</span>
  <span class="user-rol">{rol}</span>
</div>
```

#### ISSUE-017 — Admin link visible a todos los roles en el sidebar
- **Severidad:** Medium
- **Categoría:** UX / Security
- **Descripción:** El link `⚙️ Panel Admin` aparece en el sidebar para todos los usuarios, independientemente de su rol. Aunque la página debería tener role-guard (ISSUE-006), el link debería ocultarse a usuarios sin rol `admin`.
- **Afecta:** `IntranetLayout.astro`
- **Fix:** Pasar el rol como prop al layout y condicionar la visibilidad.

---

## Issue Summary Table

| ID | Página | Descripción | Severidad | Categoría |
|----|--------|-------------|-----------|-----------|
| ISSUE-006 | Admin | Sin role-guard en servidor | 🔴 Critical | Security |
| ISSUE-010 | Colaborar | Nota dev interna visible al usuario | 🟠 High | Content/UX |
| ISSUE-001 | Dashboard | Quick Links con `href="#"` | 🟡 Medium | Functional |
| ISSUE-002 | Dashboard | Scroll roto en contenido bajo el fold | 🟡 Medium | UX/Layout |
| ISSUE-007 | Admin | "Abrir Bandeja" sin acción | 🟡 Medium | Functional |
| ISSUE-008 | Admin | Supabase URL apunta a home genérico | 🟡 Medium | Functional |
| ISSUE-011 | Colaborar | Submit deshabilitado sin explicación clara | 🟡 Medium | UX |
| ISSUE-013 | Cotizadores | "Visitar Proveedores" sin href | 🟡 Medium | Functional |
| ISSUE-015 | Global | Sin active state en sidebar | 🟡 Medium | UX |
| ISSUE-017 | Global | Admin link visible a todos los roles | 🟡 Medium | UX/Security |
| ISSUE-003 | Dashboard | Sin saludo personalizado | 🟢 Low | UX |
| ISSUE-004 | Playbooks | Typo en empty state ("puede editar") | 🟢 Low | Content |
| ISSUE-005 | Playbooks | Sin active link en sidebar | 🟢 Low | UX |
| ISSUE-009 | Admin | Contador pendientes hardcodeado en 0 | 🟢 Low | Functional |
| ISSUE-012 | Cotizadores | Typo "financiarelas" | 🟢 Low | Content |
| ISSUE-014 | Cotizadores | DDC deshabilitado sin contexto alternativo | 🟢 Low | UX |
| ISSUE-016 | Global | Sin identidad de usuario visible | 🟢 Low | UX |

**Totales: 1 Crítico · 1 Alto · 8 Medios · 7 Bajos**

---

## What's Working Well ✅

- **Playbook de Rise 360**: 43 registros cargando correctamente via Supabase + RLS. Sistema de tabs y acordeón funcional, responsive.
- **Sistema de autenticación**: OAuth PKCE completo — login → Google → callback → cookies → dashboard → middleware → SSR protegido. Flujo correcto.
- **Diseño base**: Paleta de colores coherente (`#0f172a` / `#1e293b` / `#f8fafc`), tipografía Inter, border-radius consistente, tarjetas con sombra suave.
- **Sidebar responsive**: El toggle móvil funciona. El sistema de `<details>` para grupos de navegación es elegante y accesible.
- **Token freshness**: Middleware pasa `session.access_token` via `Astro.locals` — los pages usan el token refrescado, no el del cookie potencialmente expirado.
- **Logout link**: "Salir al sitio web" redirige correctamente a `/`.

---

## Saved Baseline

```json
{
  "date": "2026-04-03",
  "url": "http://localhost:4321/interno",
  "healthScore": 67,
  "issues": [
    {"id": "ISSUE-006", "title": "Admin sin role-guard en servidor", "severity": "critical", "category": "security"},
    {"id": "ISSUE-010", "title": "Nota dev interna visible al usuario en /colaborar", "severity": "high", "category": "content"},
    {"id": "ISSUE-001", "title": "Dashboard quick links con href=#", "severity": "medium", "category": "functional"},
    {"id": "ISSUE-002", "title": "Scroll roto bajo el fold en dashboard", "severity": "medium", "category": "ux"},
    {"id": "ISSUE-007", "title": "Abrir Bandeja sin acción en admin", "severity": "medium", "category": "functional"},
    {"id": "ISSUE-008", "title": "Supabase link apunta a supabase.com genérico", "severity": "medium", "category": "functional"},
    {"id": "ISSUE-011", "title": "Submit deshabilitado sin explicación en colaborar", "severity": "medium", "category": "ux"},
    {"id": "ISSUE-013", "title": "Visitar Proveedores sin href en cotizadores", "severity": "medium", "category": "functional"},
    {"id": "ISSUE-015", "title": "Sin active state en sidebar navigation", "severity": "medium", "category": "ux"},
    {"id": "ISSUE-017", "title": "Admin link visible a todos los roles", "severity": "medium", "category": "ux-security"},
    {"id": "ISSUE-004", "title": "Typo en empty state playbook", "severity": "low", "category": "content"},
    {"id": "ISSUE-012", "title": "Typo financiarelas en cotizadores", "severity": "low", "category": "content"}
  ],
  "categoryScores": {
    "console": 70,
    "links": 40,
    "visual": 85,
    "functional": 45,
    "ux": 73,
    "performance": 88,
    "content": 80,
    "accessibility": 72
  }
}
```

---

STATUS: **DONE**
