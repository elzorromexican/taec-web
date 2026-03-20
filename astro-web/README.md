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
contactData.email          // info@taec.com.mx
contactData.phone          // 55 6822 3300
contactData.whatsapp.url   // https://wa.me/5215527758279
contactData.tidycal        // URL de TidyCal para agendar diagnóstico
contactData.socials        // { linkedin, youtube, facebook }
contactData.regional       // [{ country, emoji, domain, url }]
contactData.storeUrl       // https://tienda.taec.com.mx
```

**Regla:** dato de contacto hardcodeado en `.astro` = bug. Importar siempre desde `contact.ts`.

### `src/data/emailjs.ts`

Config EmailJS centralizada. Claves públicas por diseño (EmailJS corre en el browser).
**Hardening:** EmailJS dashboard → Security → Allowed Origins → `taec.com.mx` y `nuevo.taec.com.mx`.

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
| Formulario `/contacto` | EmailJS → `info@taec.com.mx` | EmailJS (200 emails/mes gratis) | Migrar a plan pago si escala |
| WhatsApp flotante | wa.me directo | Meta/WhatsApp | Número en `contactData.whatsapp` |
| Agendar diagnóstico | TidyCal | Cuenta `slimmasmoudi` | Si cambia, actualizar `contactData.tidycal` |
| Correo directo | `mailto:` | Ninguna | Sin dependencia |
| Tienda | tienda.taec.com.mx | — | URL en `contactData.storeUrl` |

### CTA primaria por tipo de página

| Contexto | CTA primaria |
|---|---|
| Home | Agendar diagnóstico (TidyCal) — baja fricción |
| Páginas de producto | Formulario `/contacto` — califica el lead |
| `/contacto` | Formulario EmailJS — acción directa |
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

Producción (`nuevo.taec.com.mx`): deploy manual pendiente de configurar.

---

## Estado de refactor de páginas comerciales

| Página | Hero | Grid | FAQ | CTA |
|---|---|---|---|---|
| `moodle-mexico` | ✓ | — | ✓ | ✓ |
| `articulate-360-mexico` | ✓ | ✓ | ✓ | ✓ |
| `vyond-mexico` | ✓ | ✓ | ✓ | ✓ |
| `totara-lms-mexico` | ✓ | ✓ | ✓ | ✓ |
| Resto de páginas | — | — | — | — |
