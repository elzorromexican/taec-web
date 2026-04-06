# TAEC Web

Sitio corporativo de **TAEC** — partner e-learning líder en México y LATAM.
Reseller exclusivo de Articulate 360, Vyond, Totara y Moodle.

- **Staging:** `elzorromexican.github.io/taec-web` — build estático, auto-deploy en push a `main`
- **Producción:** `stellar-mermaid-3ba7f1.netlify.app` — SSR Netlify, auto-deploy en push a `main`
- **Dominio final:** `nuevo.taec.com.mx` (pendiente de apuntar a Netlify)

---

## Stack

- **Framework:** Astro 6 — `output: 'server'` (SSR) por default
- **Componentes reactivos:** React (Islands Architecture)
- **Auth / Intranet:** Supabase Auth — OAuth Google restringido a `@taec.com.mx`
- **Estilos:** CSS puro modular

---

## Desarrollo local

```bash
cd astro-web
npm install
npm run dev        # localhost:4321
npm run build      # Build → ./dist/
npm run preview    # Preview del build local
```

---

## Estructura del repositorio

```
taec-web/
├── astro-web/
│   ├── public/
│   │   ├── assets/
│   │   │   ├── badges/     # Badges G2, partner logos
│   │   │   ├── css/        # CSS global (base.css, header.css, footer.css)
│   │   │   ├── docs/       # PDFs descargables (lead magnets)
│   │   │   ├── js/         # JS legacy (nav.js)
│   │   │   └── logos/      # Logos productos, partners, taec-og.png
│   │   ├── data/
│   │   │   └── ticker.json # Noticias para ticker del home
│   │   ├── robots.txt
│   │   └── llms.txt
│   └── src/
│       ├── components/
│       │   ├── Header.astro      # Header sticky + mega-menu
│       │   ├── MobileNav.astro   # Nav móvil drawer
│       │   ├── experiments/
│       │   │   └── FooterDock.astro  # Footer (ÚNICA instancia del botón WhatsApp)
│       │   └── ui/
│       │       ├── HeroComercial.astro
│       │       ├── GridBeneficios.astro
│       │       ├── FAQAccordion.astro
│       │       ├── CtaFinal.astro
│       │       └── LogosGrid.astro
│       ├── data/
│       │   ├── contact.ts    # Fuente única: email, WhatsApp, TidyCal, redes
│       │   ├── navigation.ts # Fuente única: menú principal y footer links
│       │   └── emailjs.ts    # Config EmailJS (solo página Totara)
│       ├── layouts/
│       │   ├── BaseLayout.astro     # Canonical, OG, Schema.org, Header, Footer
│       │   └── IntranetLayout.astro # Layout para páginas /interno/
│       ├── lib/
│       │   └── supabase.ts   # Cliente Supabase
│       ├── middleware.ts     # Protege /interno/* con Supabase session
│       └── pages/
│           ├── interno/      # Intranet SSR — protegida por middleware
│           └── ...           # Páginas públicas (una archivo = una ruta)
├── netlify.toml              # Config raíz Netlify (build command + redirects)
└── .github/workflows/
    └── deploy-pages.yml      # CI/CD GitHub Pages
```

---

## Datos centralizados

### `src/data/contact.ts`

```typescript
contactData.email            // info@taec.com.mx
contactData.phone            // 55 6822 3300
contactData.whatsapp.url     // https://wa.me/5215527758279
contactData.bookingUrl       // URL Zoho Bookings para agendar diagnóstico gratuito
contactData.formEndpoint     // URL de la Web App de Google Apps Script
contactData.socials          // { linkedin, youtube, facebook }
contactData.regional         // [{ country, emoji, domain, url }]
contactData.storeUrl         // https://tienda.taec.com.mx
```

**Regla:** dato de contacto hardcodeado en `.astro` = bug. Importar siempre desde `contact.ts`.

---

## Componentes UI

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

| CTA | Canal | Depende de |
|---|---|---|
| Formulario `/contacto` | Google Apps Script → Sheets + email | `contactData.formEndpoint` |
| WhatsApp flotante | wa.me directo | `contactData.whatsapp` |
| Agendar diagnóstico | Zoho Bookings | `contactData.bookingUrl` |
| Correo directo | `mailto:` | Sin dependencia |
| Tienda | tienda.taec.com.mx | `contactData.storeUrl` |

El formulario de `/contacto` usa `Content-Type: text/plain;charset=utf-8` para evitar el preflight OPTIONS que GAS no expone. El body es JSON puro; GAS lo parsea con `JSON.parse(e.postData.contents)`.

---

## Intranet `/interno/`

Sección SSR protegida por `src/middleware.ts` con Supabase Auth.

- **Login:** `/interno/login` — OAuth Google restringido a `@taec.com.mx`
- **Callback:** `/interno/auth/callback` — procesa tokens, setea cookies `sb-access-token` / `sb-refresh-token`
- **Dashboard:** `/interno/dashboard` — requiere sesión válida + registro en `usuarios_autorizados`
- **Denegado:** `/interno/denegado` — autenticados sin permiso
- Todas las páginas bajo `/interno/` tienen `export const prerender = false`
- `robots.txt` bloquea `/interno/` para evitar indexación

### URLs permitidas en Supabase (Redirect URLs)

```
http://localhost:4321/interno/auth/callback
https://stellar-mermaid-3ba7f1.netlify.app/interno/auth/callback
https://nuevo.taec.com.mx/interno/auth/callback
```

---

## SEO

- `BaseLayout.astro` genera `<link rel="canonical">`, OG tags, `hreflang`, Schema.org y Breadcrumbs dinámicamente usando `Astro.site`
- OG image fallback: `public/assets/logos/taec-og.png` (1200×630px)
- `public/robots.txt` bloquea `/interno/`, `/admin/`, `/test`
- `public/llms.txt` — mapa de URLs para crawlers de LLMs

---

## Deploy

```
git push origin main  →  GitHub Pages (staging) + Netlify (producción) se despliegan automáticamente
```

### GitHub Pages — staging estático

El workflow `.github/workflows/deploy-pages.yml` inyecta:

```
ASTRO_SITE=https://elzorromexican.github.io/taec-web
ASTRO_BASE=/taec-web/
ASTRO_STATIC_BUILD=true     ← activa output: 'static'
```

### Netlify — producción SSR

`netlify.toml` (raíz del repo). Netlify inyecta `NETLIFY=true` automáticamente, activando el adapter.

```toml
[build]
  command = "cd astro-web && npm install && npm run build"
  publish = "astro-web/dist"

[[redirects]]
  from = "/*"
  to = "/.netlify/functions/ssr"
  status = 200
```

### Lógica de build en `astro.config.mjs`

```js
const isStaticBuild = process.env.ASTRO_STATIC_BUILD === 'true'; // GitHub Pages
const isNetlify     = process.env.NETLIFY === 'true';            // Netlify

output:  isStaticBuild ? 'static' : 'server',
adapter: isNetlify ? netlify() : undefined,
// Dev local → output: 'server', sin adapter (Astro nativo)
```

### Base path — staging vs producción

```typescript
const base = import.meta.env.BASE_URL; // '/' en prod, '/taec-web/' en staging

// URLs internas de navegación
href={r('/contacto')}

// Assets del public/ folder
src={`${base}assets/logo.svg`}
```

**Regla:** toda ruta interna usa `r()`. Todo `src` de asset usa `` `${base}assets/...` ``.
