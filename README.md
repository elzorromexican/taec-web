# TAEC Web

Sitio corporativo de **TAEC** — partner e-learning líder en México y LATAM.
Reseller exclusivo de Articulate 360, Vyond, Totara y Moodle.

## Stack

- **Framework:** Astro 6 — `output: 'server'` (SSR) por default
- **Componentes reactivos:** React (Islands Architecture)
- **Auth / Intranet:** Supabase Auth — OAuth Google restringido a `@taec.com.mx`
- **Estilos:** CSS puro modular
- **Deploy staging:** GitHub Pages (`elzorromexican.github.io/taec-web`) — build estático
- **Deploy producción:** Netlify (`stellar-mermaid-3ba7f1.netlify.app`) — SSR con `@astrojs/netlify`

## Estructura del repositorio

```
taec-web/
├── astro-web/              # Aplicación Astro — todo el código fuente
│   ├── public/             # Assets estáticos, robots.txt, llms.txt, sitemap
│   ├── src/
│   │   ├── components/     # Componentes Astro y React
│   │   ├── data/           # Fuentes únicas: contacto, navegación, emailjs
│   │   ├── layouts/        # BaseLayout, IntranetLayout
│   │   ├── lib/            # supabase.ts y clientes externos
│   │   ├── middleware.ts   # Protege /interno/* con Supabase session
│   │   └── pages/
│   │       ├── interno/    # Intranet SSR — protegida por middleware
│   │       └── ...         # Páginas públicas
│   ├── astro.config.mjs
│   └── netlify.toml        # Redirect catch-all para SSR functions
├── netlify.toml            # Config raíz de Netlify (build command + publish)
└── .github/workflows/      # CI/CD — deploy-pages.yml para GitHub Pages
```

## Desarrollo local

```bash
cd astro-web
npm install
npm run dev        # localhost:4321
```

## Deploy

| Ambiente | Trigger | Output | URL |
|---|---|---|---|
| Staging | `git push main` | estático (`ASTRO_STATIC_BUILD=true`) | `elzorromexican.github.io/taec-web` |
| Producción | `git push main` | SSR (`NETLIFY=true`) | `stellar-mermaid-3ba7f1.netlify.app` |

Ver `astro-web/README.md` para documentación técnica detallada.
