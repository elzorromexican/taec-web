# TAEC Web — Sesión 19 mar 2026

**Versión actual:** `v1.1` (post `v1.0-astro-foundation`, no hay tag nuevo — último commit: `5b4b6ad`)
**Repo:** `elzorromexican/taec-web`
**Local:** `/Users/slimmasmoudi/taec-web`
**Staging:** `https://elzorromexican.github.io/taec-web/`
**Producción final:** `https://www.taec.com.mx/`

---

## ✅ Hecho hoy

**Baseline Astro**
- Tag `v1.0-astro-foundation` creado en commit `aaab14c` — punto formal de rollback
- Build limpio de 48 páginas con Astro 6

**Componentes reutilizables**
- `HeroComercial.astro`, `GridBeneficios.astro`, `FAQAccordion.astro`, `CtaFinal.astro`, `LogosGrid.astro` — creados y funcionales
- 4 páginas comerciales refactorizadas: `moodle-mexico`, `articulate-360-mexico`, `vyond-mexico`, `totara-lms-mexico`

**Centralización de datos**
- `contact.ts` — fuente única: email, WhatsApp, `bookingUrl`, `formEndpoint`, redes, regionales
- `navigation.ts` — menú principal y footer tipados
- `emailjs.ts` — centralizado, uso restringido a `totara-lms-mexico`
- `tidycal` renombrado a `bookingUrl` en todo el proyecto (commit `79471b8`)

**GitHub Pages — deploy automático**
- `.github/workflows/deploy-pages.yml` creado y funcionando
- Trigger: push a `main` → build Astro → deploy a Pages
- Vars inyectadas: `ASTRO_SITE=https://elzorromexican.github.io/taec-web`, `ASTRO_BASE=/taec-web/`
- `astro.config.mjs` lee `ASTRO_SITE`/`ASTRO_BASE` del entorno

**Fix base path completo (commit `56f66e7` + `06495f2`)**
- 46 páginas corregidas con Python batch: 194 patrones de `href="/"` y `src="/assets/"` transformados
- Helper `r()` añadido a todos los archivos que lo necesitan
- `Header.astro`, `Footer.astro`, `MobileNav.astro` — `r()` + `${base}assets/`
- `HeroComercial.astro`, `CtaFinal.astro`, `FAQAccordion.astro` — `r()` en URL props
- `BaseLayout.astro` — OG image corregida: `new URL('/assets/…')` → `` new URL(`${base}assets/…`) ``; `const base` duplicado eliminado
- Bug de regex corregido: `base.replace(/\/\$/, '')` → `base.replace(/\/$/, '')` en los 46 archivos
- `articulate-360-mexico.astro` — temporal dead zone corregida (base/r() movidos antes del array de FAQs)
- `moodle-mexico.astro`, `vyond-mexico.astro`, `totara-lms-mexico.astro` — `cardLogoSrc` corregidos

**Integración Google Apps Script (commit `3983569` + `9f0be44`)**
- `scripts/gas-contact-form.js` creado — guarda en Google Sheets, envía email interno, stub Zoho CRM
- `formEndpoint` en `contact.ts` apuntando al endpoint GAS real (URL del despliegue activo)
- Formulario `/contacto` migrado de EmailJS → GAS

**Fix `define:vars` → `data-*` en `contacto.astro` (commit `0a1ced5`)**
- Causa raíz: `<script define:vars>` estaba después de `</BaseLayout>` → Astro lo renderiza después de `</html>` → variables nunca inyectadas → `ReferenceError: formEndpoint is not defined` en producción
- Fix: valores pasados como `data-endpoint`, `data-email`, `data-whatsapp` en el `<form>`; script movido dentro de `<BaseLayout>` con `is:inline`; script lee `form.dataset.*`

**Fix CORS preflight (commit `5b4b6ad`)**
- Causa: `Content-Type: application/json` dispara preflight OPTIONS; GAS no tiene handler OPTIONS → CORS failure
- Fix: `Content-Type: text/plain;charset=utf-8` — header "simple", no preflight; body sigue siendo JSON puro; GAS lo parsea con `JSON.parse(e.postData.contents)`
- Actualizado en: `contacto.astro` (fetch), `gas-contact-form.js` (comentarios + mock `testDoPost`)

**Estado real del formulario**
- Fix aplicado y en staging — **prueba real con 200 OK pendiente de verificar** después del último deploy (push `5b4b6ad` hecho, workflow ejecutándose al cierre de sesión)

**Documentación y changelog**
- `CHANGELOG.md` — entrada `v1.1` añadida (base-path fix, GAS, define:vars, CORS, docs)
- `astro-web/README.md` — sección contacto actualizada; flujo de contacto (GAS/Zoho Bookings); sección GAS + `data-*` pattern; sección base-path con reglas
- `gas-contact-form.js` — comentarios actualizados a `text/plain`

---

## 🔴 Pendiente para mañana — en orden de prioridad

### 1. Críticos

- **`bookingUrl` está vacío** en `contact.ts` — `bookingUrl: ""`. El botón "Agendar diagnóstico" en Header, CtaFinal, sidebar de /contacto, index y nosotros no tiene destino. Necesita la URL real de Zoho Bookings.
- **Verificar formulario en producción** — el último push disparó el workflow de GitHub Pages. Mañana confirmar: abrir `https://elzorromexican.github.io/taec-web/contacto/`, enviar formulario de prueba, verificar en Google Sheets que llega el lead y en `info@taec.com.mx` que llega la notificación.
- **GAS: `SHEET_ID` es placeholder** — `gas-contact-form.js` tiene `SHEET_ID: 'TU_GOOGLE_SHEET_ID'`. Si el endpoint desplegado no tiene el ID real configurado, el formulario recibirá 200 del GAS pero el lead no se guardará en Sheets. Verificar en el editor de Apps Script que `CONFIG.SHEET_ID` tiene el ID real.

### 2. Funcionales

- **`pagina_origen` hardcodeada** — el campo tiene `value="/contacto"` como fallback estático. El script intenta rellenarlo con `window.location.pathname` en cliente, pero si hay un error de timing, quedará `/contacto` en todos los leads. Validar en Sheets que llega la URL real.
- **`cta_origen` siempre es `"formulario-contacto"`** — no distingue si el usuario llegó desde una página de producto ni qué CTA lo trajo. Funcional pero sin atribución real de origen.
- **Google Sheets: crear la hoja antes del primer lead** — o verificar que el GAS la crea automáticamente (el script lo hace si `SHEET_TAB` no existe, pero requiere que el Service Account tenga permiso sobre la Sheet).
- **Zoho CRM stub** — `CONFIG.ZOHO_CRM.enabled: false`. Integración futura, no urgente, pero documentada.
- **Páginas comerciales sin refactorizar** — BigBlueButton, CustomGuide, Go1, OttoLearn, Proctorizer, StrikePlagiarism, Zoola, sub-páginas de Articulate, sub-páginas de Vyond. Siguen con la estructura HTML legacy.

### 3. Limpieza / documentación

- **`LogosGrid.astro`** — componente creado pero no conectado a ninguna página real.
- **`emailjs.ts`** — sigue existiendo, válido para Totara. Revisar si `totara-lms-mexico` necesita el formulario de demo o si se puede migrar también a GAS.
- **`COMPONENTS.md`** — existe, pero CtaFinal y HeroComercial se actualizaron. Verificar si el doc está sincronizado con los props actuales (especialmente `primaryBtnUrl` y `bookingUrl`).
- **Tag `v1.1`** — no se creó. Si se quiere marcar este lote en el historial de tags, hacerlo manualmente.

### 4. Cosméticos / branding

- **Branding de Zoho Bookings** — cuando se configure la URL real, verificar que la página de Zoho Bookings tenga el logo de TAEC y el nombre del servicio correcto ("Diagnóstico gratuito e-learning").
- **OG image** — `taec-og.png` existe en `/public/assets/logos/`. Verificar que tenga las dimensiones correctas (1200×630) y que el preview en redes sociales se vea bien en la URL de staging.

---

## 🧠 Decisiones de arquitectura vigentes

- **Astro 6** — framework oficial del sitio nuevo. No volver a HTML estático.
- **Staging en GitHub Pages** — `elzorromexican.github.io/taec-web` con base `/taec-web/`. Automático en cada push a `main`.
- **Producción final en `www.taec.com.mx`** — deploy manual pendiente de configurar. Usar `ASTRO_BASE=/` y `ASTRO_SITE=https://www.taec.com.mx`.
- **`contact.ts` es la fuente única** de email, WhatsApp, bookingUrl, formEndpoint, redes, regionales, tienda. Ningún dato de contacto va hardcodeado en `.astro`.
- **Zoho Bookings + Google Calendar** para agendamiento (reemplazó TidyCal). URL va en `contactData.bookingUrl`.
- **Google Apps Script + Google Sheets** para el formulario de contacto (reemplazó EmailJS para `/contacto`). Endpoint en `contactData.formEndpoint`.
- **EmailJS** se mantiene pero sólo para `totara-lms-mexico` (formulario de demo específico). No usar para el formulario general.
- **Componentes reutilizables solo donde hay repetición real** — no abstraer por abstraer.
- **No cambiar URLs públicas** — slugs de páginas congelados. Ningún renombre sin coordinar redirects.
- **No rediseñar sin necesidad** — el sitio replica la estructura funcional del legado HTML.

---

## 🧠 Decisiones de implementación vigentes

**Base path / subpath**
- `astro.config.mjs` lee `ASTRO_SITE` y `ASTRO_BASE` de env vars. Default: `site='https://nuevo.taec.com.mx'`, `base='/'`.
- Todo href interno en templates usa `r(url)`. Todo `src` de asset usa `` `${base}assets/ruta` ``. Nunca `href="/"` ni `src="/assets/"` directos.
- `r()` definido en cada archivo que lo necesita (frontmatter Astro o script TS). Guarda para URLs externas, vacías y anchors `#`.
- `new URL('/path', site)` produce URL incorrecta cuando base ≠ `/` — usar siempre `` new URL(`${base}path`, site) ``.

**Formulario `/contacto`**
- Variables del server (`formEndpoint`, email, whatsappUrl) → HTML como `data-endpoint`, `data-email`, `data-whatsapp` en `<form id="contactForm">`.
- Script cliente las lee con `form.dataset.endpoint`, etc. No usar `define:vars` para scripts fuera del layout principal.
- `<script is:inline>` dentro de `<BaseLayout>` — nunca después del cierre de `</BaseLayout>`.

**CORS con Google Apps Script**
- `Content-Type: text/plain;charset=utf-8` en el fetch — header "simple", no dispara preflight OPTIONS.
- Body sigue siendo JSON serializado. GAS lo parsea con `JSON.parse(e.postData.contents)`.
- GAS desplegado como "Web App — Cualquier persona" devuelve `Access-Control-Allow-Origin: *` automáticamente.

**Fallback del formulario**
- Si `formEndpoint === ""`, el formulario muestra email directo + WhatsApp como alternativa. El bloque de fallback ya está implementado en `contacto.astro`.

**`pagina_origen` y `cta_origen`**
- `pagina_origen`: `<input type="hidden" value="/contacto">` → sobrescrito por `window.location.pathname` en cliente.
- `cta_origen`: `<input type="hidden" value="formulario-contacto">` — estático por ahora.

---

## 📁 Estado de archivos / módulos clave

| Archivo | Estado | Qué quedó | Qué falta |
|---|---|---|---|
| `astro-web/src/data/contact.ts` | ✅ Completo salvo un campo | `formEndpoint` con URL real; `bookingUrl`, `whatsapp`, `email`, redes | `bookingUrl` está vacío `""` — falta URL real de Zoho Bookings |
| `astro-web/src/pages/contacto.astro` | ✅ Funcional | `data-*` injection, CORS fix, campos de formulario, fallback UI, campo país, campo interés | Verificar 200 real en staging post-deploy |
| `astro-web/src/layouts/BaseLayout.astro` | ✅ Completo | OG image con `${base}`, canonical URL | — |
| `astro-web/astro.config.mjs` | ✅ Completo | Lee `ASTRO_SITE`/`ASTRO_BASE` de env; `trailingSlash: 'ignore'`; `build.format: 'directory'` | — |
| `astro-web/scripts/gas-contact-form.js` | ✅ Completo (fuente) | Handler `doPost`, validación, Sheets, email interno, stub Zoho CRM, `testDoPost()` | `SHEET_ID: 'TU_GOOGLE_SHEET_ID'` es placeholder en fuente — verificar el desplegado en Apps Script |
| `astro-web/src/components/Header.astro` | ✅ Completo | `r()`, `${base}assets/` para logo | — |
| `astro-web/src/components/Footer.astro` | ✅ Completo | `r()`, `${base}assets/` para logo, `wa-float` única instancia | — |
| `astro-web/src/components/MobileNav.astro` | ✅ Completo | `r()` incluyendo `col.bottomLink.url` | — |
| `astro-web/src/components/ui/HeroComercial.astro` | ✅ Completo | `r()` en primaryBtn y secondaryBtn URLs | — |
| `astro-web/src/components/ui/CtaFinal.astro` | ✅ Completo | `r()`, usa `contactData.bookingUrl` | Botón "Agendar" sin destino hasta que `bookingUrl` tenga valor |
| `astro-web/src/components/ui/FAQAccordion.astro` | ✅ Completo | `r()` en `subtitleLink.url` | — |
| `astro-web/src/components/ui/LogosGrid.astro` | ⚠️ Creado, sin usar | Componente listo | No está conectado a ninguna página |
| `CHANGELOG.md` | ✅ Actualizado | Entradas `v1.0` y `v1.1` | — |
| `astro-web/README.md` | ✅ Actualizado | GAS, `data-*`, base-path, bookingUrl/formEndpoint documentados | — |
| `.github/workflows/deploy-pages.yml` | ✅ Activo | Build + deploy automático en push a `main` | — |
| 46 páginas (batch) | ✅ Corregidas | `r()` + `${base}assets/` en todas | Páginas legacy sin refactorizar (BigBlueButton, CustomGuide, Go1, etc.) siguen con estructura HTML inline |
| `astro-web/src/pages/totara-lms-mexico.astro` | ✅ Refactorizado | Único uso de `define:vars` restante (EmailJS demo form) — es correcto aquí | — |

---

## 📁 URLs / endpoints / puntos de configuración

| Qué | Valor | Estado |
|---|---|---|
| Staging | `https://elzorromexican.github.io/taec-web/` | ✅ Activo y automático |
| Producción final | `https://www.taec.com.mx/` | 🔴 Deploy no configurado |
| `formEndpoint` (GAS) | `https://script.google.com/macros/s/AKfycbxJaUFjGUy7yV31tu2emdLJVL3rWfGi8Dg3nLpxNUWyfkdisjxpZlExSsHP_X1iXPeuuQ/exec` | ✅ En `contact.ts` |
| `bookingUrl` (Zoho Bookings) | `""` — **VACÍO** | 🔴 Falta URL real |
| Fuente única de contacto | `astro-web/src/data/contact.ts` | ✅ |
| Script GAS (fuente) | `astro-web/scripts/gas-contact-form.js` | ✅ — copiar a apps.script.google.com |
| Google Sheets del GAS desplegado | Desconocido — verificar en editor de Apps Script | ⚠️ `SHEET_ID` del script fuente es placeholder |
| Workflow GitHub Actions | `.github/workflows/deploy-pages.yml` | ✅ |
| Config Astro | `astro-web/astro.config.mjs` | ✅ |

---

## 🔗 Comandos o pasos rápidos para retomar mañana

```bash
# 1. Verificar que el último deploy terminó bien
# → GitHub → repo → Actions → último workflow "Deploy to GitHub Pages" → debe ser verde

# 2. Verificar formulario en staging
# → Abrir https://elzorromexican.github.io/taec-web/contacto/
# → Enviar formulario con datos reales
# → Revisar Google Sheets: ¿llegó la fila?
# → Revisar info@taec.com.mx: ¿llegó el email de notificación?

# 3. Si el formulario falla → abrir DevTools → Network → buscar la llamada a script.google.com
# → Si hay error CORS: el GAS puede estar desplegado con acceso restringido ("con cuenta de Google")
# → Redesplegar GAS como "Cualquier persona"

# 4. Completar bookingUrl
# → Zoho Bookings → copiar URL del servicio activo
# → astro-web/src/data/contact.ts → bookingUrl: "https://..."
# → git add src/data/contact.ts && git commit -m "fix(booking): add Zoho Bookings URL"
# → git push origin main

# 5. Build local de verificación rápida
cd /Users/slimmasmoudi/taec-web/astro-web
ASTRO_SITE=https://elzorromexican.github.io/taec-web ASTRO_BASE=/taec-web/ npm run build
# Debe dar: 48 páginas, 0 errores
```

---

## ⚠ Riesgos o trampas detectadas

- **`bookingUrl: ""`** — hasta que se llene, el botón "Agendar diagnóstico gratuito" en Header, CtaFinal, index, nosotros y sidebar de /contacto queda sin destino. El componente `CtaFinal` renderiza el botón aunque el href esté vacío — no tiene guard. Urgente.

- **GAS `SHEET_ID` en el archivo fuente es placeholder** — el script en `astro-web/scripts/gas-contact-form.js` tiene `SHEET_ID: 'TU_GOOGLE_SHEET_ID'`. El endpoint desplegado puede tener el ID real, pero si alguien copia el archivo fuente y redesplega sin editar ese campo, los leads no se guardarán. Verificar en el editor de Apps Script antes de dar el formulario por bueno.

- **El GAS puede estar desplegado con acceso "con cuenta de Google"** en vez de "Cualquier persona" — si es así, el fetch desde el navegador fallará con CORS o 302. Verificar en Apps Script → Administrar despliegues → acceso.

- **No hay confirmación de 200 real todavía** — el fix de `text/plain` y `data-*` fue commiteado y pusheado al cierre de sesión. El workflow de GitHub Pages puede estar todavía ejecutándose. No asumir que el formulario funciona hasta verificar manualmente.

- **`pagina_origen` puede llegar como `/taec-web/contacto` en staging** (el `window.location.pathname` incluye el base) vs `/contacto` en producción. Si se usa para analítica o segmentación en Sheets, tenerlo en cuenta.

- **`index.html` y `.claude/launch.json`** tienen cambios no commiteados en el working tree — no son del proyecto, no commitear.

- **Producción `www.taec.com.mx` no tiene deploy configurado** — no existe workflow, no existe pipeline. No hay que tocar nada de `www.taec.com.mx` hasta que el flujo de deploy esté definido y aprobado.

- **`define:vars` en `totara-lms-mexico.astro` es legítimo** — no romperlo. Es el único caso donde el script sí está dentro de `<BaseLayout>` y funciona correctamente.
