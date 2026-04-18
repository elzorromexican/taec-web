## gstack Skills

Usa siempre estos skills para workflows:
- `/plan-ceo-review`: Visión estratégica CEO/fundador
- `/plan-eng-review`: Arquitectura técnica
- `/review`: Code review paranoico
- `/ship`: Deploy/release
- `/browse`: Navegación web/debug
- `/qa`: QA testing
- `/retro`: Retrospectivas

No uses herramientas browser genéricas; prioriza gstack.

## Reglas de Git — OBLIGATORIAS

### PROHIBIDO trabajar en `main`

**NUNCA** hagas commit ni push directamente a `main`. Sin excepciones.

Todo cambio sigue este flujo obligatorio:
1. Crear rama desde `main` con nombre descriptivo:
   - `feature/` — funcionalidad nueva
   - `fix/` — corrección de bug
   - `agent/` — trabajo de agente IA
   - `chore/biome-reformat-[fecha]` — Reformat masivo con Biome
2. Hacer commits en esa rama
3. Abrir PR hacia `main`
4. Esperar auditoría/aprobación
5. Merge solo después de aprobación

### Deploy a producción — MANUAL, una vez al día

Netlify tiene **auto-publish desactivado**. Un merge a `main` buildea pero **no publica** automáticamente.

**Regla:** El deploy a producción lo ejecuta Slim (o Claude Code con permiso explícito) **una vez al día**, al cierre del bloque de trabajo, desde el panel de Netlify → Deploys → "Publish deploy".

**Por qué:** Cada deploy de producción cuesta 15 créditos Netlify. El plan tiene 1,000 créditos/mes (≈66 deploys). Mergear PRs sueltos durante el día no despliega — se acumulan y se publican juntos.

**Antigravity:** Después de que tu PR sea mergeado a `main`, **no esperes un deploy inmediato**. El cambio llegará a producción en el próximo deploy manual del día.

---

### Formateo con Biome (Reformat Masivo)

**Nunca mezcles** reformateos masivos con `biome` y cambios lógicos (features/fixes) en la misma rama o commit. Si el proyecto requiere un reformat masivo (`npx @biomejs/biome check --write .`), hazlo en una rama separada e independiente (ej. `chore/biome-reformat-2026-04-15`) y ábrele su propio PR antes de iniciar la rama de tu feature o fix.

### Hook anti-AIza (secrets scanner)

El literal `AIza` en cualquier archivo causa falsos positivos en el secrets scanner de Netlify
(Vite lo preserva en comentarios del bundle SSR). Está prohibido escribirlo en código o comentarios.

**Alternativas válidas:**
- `GCP_API_KEY_PREFIX`
- `prefijo-de-llave-google`
- `<API_KEY_EXAMPLE>`

**Para instalar el hook localmente tras clonar:**
```sh
sh scripts/install-hooks.sh
```
---

## Optimización de Cuota en Antigravity

Antigravity tiene un sistema de cuota dual: **rolling 5 horas** + **techo semanal**. Cuando se agota cualquiera, todos los modelos quedan bloqueados.

### Costo por tipo de tarea (de menor a mayor)
| Tarea | Costo |
|-------|-------|
| Tab completion | Gratis |
| Chat simple / consultas | Bajo |
| Planning mode | Medio |
| Edición multi-archivo | Alto |
| Browser / terminal / commits / PRs | Muy alto |

### Reglas de optimización
1. **Revisar cuota antes de empezar** — `Settings → Models` en Antigravity. Si algún modelo está por debajo del 20%, cambiar a uno más ligero.
2. **Abrir chat nuevo al cambiar de tarea** — el historial largo consume más cuota en cada request.
3. **Reservar Gemini 3.1 Pro (High) para implementación real** — usar Flash o Low para consultas, explicaciones y typos.
4. **Cuando Gemini esté caído o sin cuota** — cambiar a **Claude Sonnet 4.6 (Thinking)** como fallback. Validado con PR #81.
5. **Los intentos fallidos también consumen cuota** — si hay un 503 que dura varios segundos antes de fallar, ya gastó tokens.
6. **Orden de fallback recomendado:** Gemini 3.1 Pro High → Gemini 3.1 Pro Low → Claude Sonnet 4.6 → Gemini 3 Flash.

### Diagnóstico rápido de errores
- `503 MODEL_CAPACITY_EXHAUSTED` + cuota en 0 → **cuota agotada**, esperar refresco
- `503 MODEL_CAPACITY_EXHAUSTED` + cuota disponible → **saturación de Google**, esperar o cambiar modelo
- Modelo trabaja N segundos y truena → misma causa, el request consumió lo que quedaba

---

## Cómo usar Skills con Antigravity

Los skills de Claude Code (`~/.claude/skills/`) son locales — Antigravity no tiene acceso directo a ellos.

**Protocolo para pasarle un skill a Antigravity:**

1. Slim o Claude Code identifican qué skill aplica a la tarea
2. Se copia el contenido del `SKILL.md` directamente en el issue o comentario de GitHub
3. Antigravity lo recibe como instrucción y lo ejecuta

**Referencia de todos los skills disponibles:** `SKILLS.md` en la raíz del repo.

**Skills más usados con Antigravity:**
- `/frontend-design` — pegar contenido de `~/.claude/skills/frontend-design/SKILL.md` antes de pedir UI
- `/ui-ux-pro-max` — pegar contenido antes de pedir sistema de diseño
- Los de contenido (`article-writing`, `brand-voice`) — útiles si Antigravity genera copy

---

## Roles del equipo de IA

Este proyecto es operado por múltiples IAs con roles definidos:

| IA | Rol | Puede tocar código |
|----|-----|-------------------|
| **Antigravity** (Google) | Responsable del código — implementa todo | Sí, en su rama |
| **Claude Code** | QA, auditoría, specs técnicas, consejos. | NO escribe código |
| **ChatGPT** | PM y arquitecto | No |

Cuando se pida un "plan de implementación", generarlo para que Antigravity lo ejecute: specs precisas, archivos exactos, lógica clara.

---

## Proyecto: taec-web

**Stack:** Astro · Netlify · Supabase  
**URL staging:** https://stellar-mermaid-3ba7f1.netlify.app  
**Repo local:** `/Users/slimmasmoudi/taec-web`  
**Página principal Articulate MX:** `astro-web/src/pages/articulate-360-mexico.astro`  
**TitoBits knowledge base:** `astro-web/src/data/titoKnowledgeBase.ts` (v6.0 activa)  
**Promos ticker:** `astro-web/src/data/promos.ts`

---

## Promos activas Q2 2026

### PROMO-001 — Articulate 360 Teams + IA (MÉXICO ONLY)
- **Precio promo:** $1,198 USD/seat/año
- **Precio normal:** $1,749 USD
- **Descuento:** 31%
- **Vigencia:** hasta 30 junio 2026
- **Condición:** Facturación en México únicamente
- **URL Articulate:** https://www.articulate.com/es/360/pricing/special-offer/
- **Aplica en:** `articulate-360-mexico.astro` (página ya es México-only, no requiere geo-detection adicional)

### PROMO-002 — Paquete Localization
- **Descuento:** 20%
- **Vigencia:** Q2 2026
- **Condición:** Worldwide (aplica en todos los países)
- **URL:** pendiente confirmar

---

## Evento Q2 2026 — Corporate Learning Summit México

- **Fecha:** 7 de mayo, 2026 · 8:30 AM (hora CDMX)
- **Venue:** The St. Regis, Paseo de la Reforma 439, CDMX
- **Co-hosts:** TAEC + Articulate
- **Registro:** https://register.articulate.com/mexico-city
- **TAEC es el local host — decide quién entra, Articulate no tiene voz**
- **Proceso:** Solicitud sujeta a aprobación y confirmación personalizada por TAEC
- **Comunicación:** NO garantizar asistencia, NO generar expectativa de confirmación automática
- **Copy clave:** "aforo reducido · perfiles seleccionados · confirmación personalizada por TAEC"

---

## Infraestructura de Geolocalización (YA IMPLEMENTADA)

**Backend:** `astro-web/src/pages/api/get-promo.ts`
- Detecta país vía `locals.netlify?.context?.geo?.country?.code` (Netlify Edge)
- Fallback: headers `x-country` / `x-nf-country`
- Default fallback: `'MX'`
- Recibe parámetro `?path=` para priorizar promos por URL (`urlTrigger`)
- Retorna `{ promo, countryCode }`

**Frontend:** `astro-web/src/pages/contacto.astro` (~línea 557)
- Consume `/api/get-promo` de forma async/no bloqueante
- Usa `countryCode` para autoseleccionar país en formulario

**Catálogo de promos:** `astro-web/src/data/promos.ts`
- Interface `PromoConfig`: id, title, description, badgeText, link, urlTrigger, countries, active
- Países especiales: `'GLOBAL'` (todos), `'LATAM'` (array definido), o códigos ISO (`'MX'`, `'CO'`, etc.)
- El endpoint filtra automáticamente por país activo y prioriza por `urlTrigger`

**Para mostrar promo en cualquier página:** fetch a `/api/get-promo?path=[ruta-actual]` → si `countryCode === 'MX'` y hay promo activa → renderizar UI condicionalmente.

---

## Infraestructura Multi-País (Roadmap)

**3 dominios planeados:** `.com.mx` · `.com.co` · `.cl`
- El dominio define el contenido base
- La IP sigue siendo la fuente de verdad para mostrar promos (un CO puede llegar a .com.mx)
- Un solo repo, 3 deploys con variable de entorno `SITE_COUNTRY`

## Sprint Futuro — BD de Promos (Supabase)

Migrar `promos.ts` a tabla Supabase `promos` para gestión sin deploys.

**Campos de la tabla:**
- `id`, `title`, `description`, `badge_text`, `color`, `link`, `url_trigger`
- `countries` → array: `['MX']`, `['CO','CL']`, `['GLOBAL']`
- `valid_from` (fecha inicio), `valid_until` (fecha fin — auto-expira)
- `active` boolean

**Panel de admin (intranet):**
- Campo `Alcance`: checkboxes independientes MX · CO · CL · Global (combinables)
- Campo `Vigencia`: fecha desde / hasta con auto-desactivación
- Listado con badge de país y estado activa/pausada/vencida

**Lo que NO va a BD — se queda en código:**
- Lógica de `urlTrigger` (priorización por URL)
- Reglas de TitoBits
- Lógica de países en `/api/get-promo.ts`

## Pendientes confirmación (Slim)

- [ ] URL real de página Localization en el sitio
- [ ] ¿El plan Teams base $1,499 se mantiene visible junto al Teams+AI $1,198?
- [ ] Precio Teams+IA en MXN para mostrar en tarjeta de precios
