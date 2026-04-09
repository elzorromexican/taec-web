# Sesión 08 Abril 2026 — Auditoría Forense y Recuperación Q2 Promos

## Contexto

Antigravity reportó colisión al fusionar la rama de hardening de seguridad (`bd7867a`) con el sprint Q2 de promos. La purga de dependencias eliminó scripts del front-end. Se abrió la rama `fix/q2-promos-missing` para recuperar el trabajo perdido.

---

## Auditoría Forense — Qué se perdió y dónde estaba

### Ramas con trabajo no mergeado relevante

| Rama | Feature | Commits clave |
|------|---------|---------------|
| `agent/q2-promos-articulate` | UX Q2 completo Articulate + ticker multi-promo + promos.ts extendido | `06f4f3c`, `377a712` |
| `feature/public-pricing-localization-reach` | Sección de precios en Localization ($5,000) y Reach ($3,600) | `861d2b8` |

### Qué fue revertido en main con razón documentada

| Feature | Commit | Razón |
|---------|--------|-------|
| Anti-VPN check | `2ec4954` (revert del checkbox) | Decisión arquitectónica: la facturación CFDI mexicana es el candado real, no la IP. Documentado en `MANUAL_MANTENIMIENTO_COMERCIAL.md` línea 81 |
| Menú 4 pilares "User Pain" | revert `9a3ffad2` | Issues de UX/usabilidad, revertido 7 min después |

---

## Lo recuperado en esta sesión

### Rama: `fix/q2-promos-missing` — 5 commits sobre main

| Commit | Qué restaura |
|--------|-------------|
| `f7fc30a` | `toggleAI()` + geo-detection SSR en `articulate-360-mexico.astro` |
| `5c0a003` | Top banner activo en `index.astro` + fallback `DOMContentLoaded` para ticker |
| `ec17bd4` | Cherry-pick de `06f4f3c`: UX Q2 completo (barras naranja/teal, ribbon PROMO Q2, precio tachado $1,749, chip "Válido hasta Jun 2026", `PRICES` dict, `initSession()`, `activateAI()`) |
| `dde362c` | Cherry-pick de `377a712`: ticker multi-promo (`filter()` → `activePromos`, rotación por `promoIdx`, soporte `color` por promo) + 3 promos nuevas en `promos.ts` |
| `36650fc` | Cherry-pick de `861d2b8`: pricing cards en Localization y Reach |

### Cambios sin commitear (pendientes de commit por Antigravity)

| Archivo | Cambio |
|---------|--------|
| `astro-web/public/assets/css/art-pricing.css` | **NUEVO** — CSS extraído de inline a archivo externo para sobrevivir View Transitions |
| `articulate-localization.astro` | `<style is:global>` eliminado → `<link>` a `art-pricing.css` |
| `articulate-reach.astro` | Mismo fix |
| `index.astro` | Fix import duplicado `getBookingUrl` (línea 2 eliminada) |
| `articulate-360-mexico.astro` | Eliminado bloque duplicado `{isMexico ? HOT SALE : LATAM}` (líneas 165–173) |
| `task.md` | `[ISSUE-021]` agregado para fix de menú en reach |

---

## Estado de cada feature Q2 al cierre de sesión

| Feature | Estado |
|---------|--------|
| `promos.ts` — 3 promos nuevas (`art-teams-ai-q2-mx`, `art-localization-q2-global`, `summit-cdmx-mayo-2026`) | ✅ Recuperado |
| Ticker multi-promo (todas las promos activas rotan, con color por promo) | ✅ Recuperado |
| Barras anuncio Q2 en articulate-360-mexico (naranja MX + teal worldwide) | ✅ Recuperado |
| Ribbon "PROMO Q2" + precio tachado $1,749 + chip vigencia en Teams card | ✅ Recuperado |
| Script `activateAI()` / `initSession()` / `PRICES` dict completo | ✅ Recuperado |
| Banner duplicado `{isMexico ? HOT SALE}` eliminado | ✅ Corregido |
| Pricing card Localization — $5,000/año | ✅ Recuperado |
| Pricing card Reach — $3,600 / 1,200 estudiantes | ✅ Recuperado |
| CSS pricing extraído a `art-pricing.css` (fix View Transitions) | ✅ Corregido |
| Import duplicado `getBookingUrl` en index.astro | ✅ Corregido |

---

## Bugs identificados — NO introducidos por esta PR

| Bug | Descripción | Ticket |
|-----|-------------|--------|
| Menú dropdown mal posicionado en `articulate-reach` | Pre-existente. El hero con imagen de browser altera el offset del nav dropdown | `[ISSUE-021]` — rama `fix/header-dropdown-reach` |
| `data-base` orphan en `price-teams` | El atributo quedó huérfano (el nuevo JS usa `PRICES` dict, no `data-base`). No causa error. Deuda técnica menor | Ticket separado |
| 183 errores TypeScript en `astro check` | Pre-existentes en todo el repo (netlify Locals, Element.style, etc.) | No bloqueante |

---

## Decisiones de arquitectura documentadas

### Sistema de promos — combinatorias de países

```ts
countries: ["MX"]         // Solo México — campañas Hot Sale, Buen Fin, CDMX
countries: ["CO"]         // Solo Colombia
countries: ["CL"]         // Solo Chile
countries: ["LATAM"]      // C. y Sudamérica (excluye MX y CO automáticamente)
countries: ["GLOBAL"]     // Todo el mundo — servicios DDC, Localization
countries: ["MX", "CO"]   // Combinatoria — MX + Colombia sin resto de LATAM
```

### Por qué Anti-VPN no se implementó

El filtro real es la **facturación**: la promo Teams $1,198 requiere CFDI mexicano con RFC. Un usuario con VPN fuera de México no puede pedir CFDI ni pagar en MXN. Implementar detección de VPN sería complejidad sin beneficio comercial real. Decisión tomada y documentada en sesión de arquitectura con Claude Code.

### Por qué el admin de promos no está en Supabase

El sistema de promos está en `promos.ts` (archivo estático). El panel admin en intranet gestiona solo "Novedades" y "Playbooks". La migración a tabla Supabase con panel admin es **Sprint Futuro** — no fue desarrollada. Documentado en `CLAUDE.md` como roadmap.

---

## Punto de rollback

**Tag git:** `rollback/pre-pr-q2-promos` — creado sobre el último commit de la rama antes del merge a main.

Para revertir a este punto:
```bash
git checkout rollback/pre-pr-q2-promos
```

Para ver qué hay en este tag vs main:
```bash
git diff main...rollback/pre-pr-q2-promos --stat
```

---

## Próximos pasos para Antigravity

1. Commitear los cambios sin commitear (5 archivos pendientes) con mensaje: `fix(ux): extract art-pricing css, fix duplicate import, remove banner collision`
2. Push a origin
3. Abrir PR hacia `main`
4. Esperar auditoría final de Claude Code antes del merge

---

## Addendum — Seguridad · 08 abr 2026 · ~23:36 CDMX

### Vulnerabilidad detectada y resuelta: `import.meta.env[k]` en `getSafeEnv`

Durante la investigación del secrets scanner recurrente de Netlify se identificó una vulnerabilidad de seguridad activa (no un falso positivo).

**Función afectada:** `getSafeEnv(k: string)` en `astro-web/src/pages/api/agente-ia.ts`

```typescript
// ❌ VULNERABILIDAD — código anterior
const getSafeEnv = (k: string) => {
  if (typeof process !== 'undefined' && process.env && process.env[k]) {
    return process.env[k] as string;
  }
  // Este fallback serializa todo import.meta.env en el bundle:
  return typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env[k] as string : undefined;
};

// ✅ FIX — solo process.env (runtime, nunca serializado por Vite)
const getSafeEnv = (k: string) => {
  if (typeof process !== 'undefined' && process.env && process.env[k]) {
    return process.env[k] as string;
  }
  return undefined;
};
```

**Por qué Vite serializa `import.meta.env[k]`:** Con lookup estático (`import.meta.env.FOO`) Vite puede tree-shake y solo incrusta esa variable. Con lookup dinámico `[k]`, Vite no sabe qué variable se pedirá en runtime → serializa el diccionario completo de env vars en el .mjs compilado.

**Impacto:** `TAEC_GEMINI_KEY` (llave de producción de Gemini API) presente en el bundle SSR de todos los deploys anteriores al commit `83078ce`.

**Commits del fix:**
- `0c3c6df` — eliminó el texto del prefijo de llaves GCP en comentarios (fix parcial, no la causa raíz)
- `83078ce` — eliminó `import.meta.env[k]` (fix real de la vulnerabilidad)

**Confirmación:** Build `69d73ab2` — 1248 archivos escaneados, 0 secrets detectados.

### Infraestructura anti-recurrencia instalada

| Artefacto | Propósito |
|-----------|-----------|
| `scripts/check-no-aiza.sh` | Hook pre-commit — bloquea prefijo GCP en `.ts`, `.astro`, `.tsx`, `.js`, `.mjs` |
| `scripts/install-hooks.sh` | Instalador one-shot: `sh scripts/install-hooks.sh` |
| `CLAUDE.md` (actualizado) | Alternativas válidas documentadas + instrucción de instalación del hook |
| `netlify.toml` (limpiado) | Eliminado flag inefectivo `SECRETS_SCAN_SMART_DETECTION_ENABLED` |

### Acción pendiente — SLIM (no delegable a Antigravity)

**Rotar `TAEC_GEMINI_KEY`:**
1. Google Cloud Console → APIs & Services → Credentials
2. Eliminar o revocar la llave actual
3. Crear nueva llave con restricciones por API y por referrer
4. Actualizar en Netlify UI: Site Settings → Environment Variables → `TAEC_GEMINI_KEY`

Rama con el fix: `fix/netlify-scanner-hook` · PR #15 · Build: ✅ limpio
