# TAEC Astro Web

Sitio comercial de **TAEC** (Tecnología Avanzada para la Educación y la Capacitación) construido con Astro 6.
Partner e-learning para México y LATAM — Articulate, Vyond, Totara, Moodle.

- **Staging:** `elzorromexican.github.io/taec-web`
- **Producción (pendiente):** `nuevo.taec.com.mx`
- **Baseline estable:** tag `v1.0-astro-foundation`

---

## Comandos

```bash
npm install          # Instalar dependencias
npm run dev          # Dev server en localhost:4321
npm run build        # Build estático → ./dist/
npm run preview      # Preview del build local
```

---

## Estructura

```
astro-web/
├── public/
│   ├── assets/
│   │   ├── badges/     # Badges G2, partner logos
│   │   ├── css/        # CSS legacy (index.css, etc.)
│   │   ├── docs/       # PDFs descargables (lead magnets)
│   │   ├── js/         # JS legacy (nav.js, etc.)
│   │   └── logos/      # Logos de productos y partners
│   └── data/
│       └── ticker.json # Noticias para ticker del home
│
└── src/
    ├── components/
    │   ├── Header.astro     # Header sticky + mega-menu
    │   ├── Footer.astro     # Footer + wa-float (ÚNICA instancia del botón WhatsApp)
    │   ├── MobileNav.astro  # Nav móvil drawer
    │   └── ui/
    │       ├── HeroComercial.astro
    │       ├── GridBeneficios.astro
    │       ├── FAQAccordion.astro
    │       ├── CtaFinal.astro
    │       └── LogosGrid.astro
    │
    ├── data/
    │   ├── contact.ts    # Fuente única: email, WhatsApp, TidyCal, redes
    │   ├── navigation.ts # Fuente única: menú principal y footer links
    │   └── emailjs.ts    # Config EmailJS: publicKey, serviceId, templates
    │
    ├── layouts/
    │   └── BaseLayout.astro  # Canonical, OG tags, Header, Footer
    │
    └── pages/            # Una página = una ruta pública
```

---

## Datos centralizados

### `src/data/contact.ts`

```typescript
contactData.email            // info@taec.com.mx
contactData.phone            // 55 6822 3300
contactData.whatsapp.url     // https://wa.me/5215527758279
contactData.bookingUrl       // URL Zoho Bookings para agendar diagnóstico gratuito
contactData.formEndpoint     // URL de la Web App de Google Apps Script (handler del formulario)
contactData.socials          // { linkedin, youtube, facebook }
contactData.regional         // [{ country, emoji, domain, url }]
contactData.storeUrl         // https://tienda.taec.com.mx
```

**Regla:** dato de contacto hardcodeado en `.astro` = bug. Importar siempre desde `contact.ts`.

### `src/data/emailjs.ts`

Config EmailJS centralizada — usada **sólo** en la página Totara (formulario de demo específico).
No usar para el formulario general de `/contacto`; ese usa Google Apps Script directamente.

---

## Componentes UI — ver COMPONENTS.md

| Componente | Propósito |
|---|---|
| `HeroComercial` | Hero de 2 columnas temático por producto |
| `GridBeneficios` | Grid de tarjetas de ventajas |
| `FAQAccordion` | Acordeón nativo sin JS |
| `CtaFinal` | Banda CTA con WhatsApp + TidyCal automáticos |
| `LogosGrid` | Grid de logos clientes/partners |

Temas: `moo` · `tot` · `art` · `vyond` · `general`

---

## Flujo de contacto y conversión

| CTA | Canal | Depende de | Riesgo |
|---|---|---|---|
| Formulario `/contacto` | Google Apps Script → Google Sheets + email interno | `contactData.formEndpoint` | Redesplegar GAS si cambia la URL |
| WhatsApp flotante | wa.me directo | Meta/WhatsApp | Número en `contactData.whatsapp` |
| Agendar diagnóstico | Zoho Bookings | Cuenta TAEC en Zoho | Si cambia, actualizar `contactData.bookingUrl` |
| Correo directo | `mailto:` | Ninguna | Sin dependencia |
| Tienda | tienda.taec.com.mx | — | URL en `contactData.storeUrl` |

### Integración Google Apps Script (formulario `/contacto`)

El formulario de `/contacto` envía un POST a una Web App de Google Apps Script:

- **Script fuente:** `astro-web/scripts/gas-contact-form.js` — pegar en apps.script.google.com
- **URL del endpoint:** `contactData.formEndpoint` en `src/data/contact.ts`
- **Content-Type:** `text/plain;charset=utf-8` — evita el preflight OPTIONS que GAS no expone.
  El body es JSON puro; GAS lo parsea con `JSON.parse(e.postData.contents)`.
- **Resultado:** nueva fila en Google Sheets + correo de notificación a `info@taec.com.mx`
- **Fallback UI:** si el endpoint falla, se muestran el email directo y WhatsApp como alternativa.

> Para actualizar el endpoint: `src/data/contact.ts` → `formEndpoint: "https://script.google.com/..."`.
> Nunca hardcodear la URL en la página — siempre desde `contact.ts`.

### Inyección de variables en el script de contacto (`data-*` pattern)

El script del formulario recibe `formEndpoint`, `email` y `whatsappUrl` vía atributos `data-*`
en el elemento `<form>`, no vía `define:vars`. Esto es necesario porque `define:vars` sólo funciona
de forma fiable cuando el `<script>` está dentro del layout principal; un script fuera de
`<BaseLayout>` se renderiza después de `</html>` y no recibe las variables.

```html
<!-- El form en contacto.astro expone los valores así: -->
<form id="contactForm"
  data-endpoint={formEndpoint}
  data-email={contactEmail}
  data-whatsapp={whatsappUrl}
>

<!-- El script los lee así: -->
const form = document.getElementById('contactForm');
const formEndpoint = form.dataset.endpoint || '';
```

### CTA primaria por tipo de página

| Contexto | CTA primaria |
|---|---|
| Home | Agendar diagnóstico (Zoho Bookings) — baja fricción |
| Páginas de producto | Formulario `/contacto` — califica el lead |
| `/contacto` | Formulario GAS — acción directa |
| Recursos / Blog | WhatsApp — engagement rápido |

---

## WhatsApp flotante

Implementado **una sola vez** en `Footer.astro`.
No agregar instancias en páginas individuales — el Footer ya lo inyecta vía `BaseLayout`.

---

## SEO

- `site: 'https://nuevo.taec.com.mx'` en `astro.config.mjs`
- `BaseLayout.astro` genera `<link rel="canonical">` y OG tags automáticamente
- No renombrar archivos de página sin coordinar redirects

---

## Deploy

```
git push origin main  →  GitHub Pages actualiza staging automáticamente
```

El workflow `.github/workflows/deploy-pages.yml` ejecuta `astro build` con:

```
ASTRO_SITE=https://elzorromexican.github.io/taec-web
ASTRO_BASE=/taec-web/
```

Producción (`nuevo.taec.com.mx`): deploy manual pendiente de configurar (usar `ASTRO_BASE=/`).

### Base path — GitHub Pages vs producción

Astro prefija automáticamente los chunks generados (`_astro/*.css`, `_astro/*.js`) con `base`.
**Los paths hardcodeados en templates NO se prefijan.** Por eso existe el helper `r()`:

```typescript
const base = import.meta.env.BASE_URL; // '/' en prod, '/taec-web/' en staging
function r(url: string): string {
  if (!url || url.startsWith('http') || url.startsWith('//')) return url;
  return base.replace(/\/$/, '') + url;
}
```

- `href="/contacto"` → `href={r('/contacto')}` — URLs internas de navegación
- `src="/assets/logo.svg"` → `src={\`${base}assets/logo.svg\`}` — assets del `public/` folder
- `new URL('/assets/og.png', site)` → `new URL(\`${base}assets/og.png\`, site)` — OG image

**Regla:** toda ruta interna en `.astro` usa `r()`. Todo `src` de asset usa `` `${base}assets/...` ``.

---

## Estado de refactor de páginas comerciales

| Página | Hero | Grid | FAQ | CTA |
|---|---|---|---|---|
| `moodle-mexico` | ✓ | — | ✓ | ✓ |
| `articulate-360-mexico` | ✓ | ✓ | ✓ | ✓ |
| `vyond-mexico` | ✓ | ✓ | ✓ | ✓ |
| `totara-lms-mexico` | ✓ | ✓ | ✓ | ✓ |
| Resto de páginas | — | — | — | — |
