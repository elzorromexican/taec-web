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
2. Hacer commits en esa rama
3. Abrir PR hacia `main`
4. Esperar auditoría/aprobación
5. Merge solo después de aprobación

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
