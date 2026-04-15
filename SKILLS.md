# Skills instalados — TAEC

> **Cómo invocar:** La mayoría se activan solos con `/nombre` y leen el contexto del repo.
> Los de contenido necesitan descripción. Los de QA/diseño aceptan URL.

---

## 🚀 Deploy & Ship

| Skill | Qué hace | Ejemplo |
|-------|----------|---------|
| **ship** | Merge, bump version, CHANGELOG, PR completo | `/ship` |
| **land-and-deploy** | Merge PR → espera CI → verifica prod | `/land-and-deploy` |
| **canary** | Monitoreo post-deploy: errores JS, regressions | `/canary https://taec.com.mx` |
| **setup-deploy** | Configura Netlify/Fly/Render para land-and-deploy | `/setup-deploy` |

---

## 🔍 QA & Testing

| Skill | Qué hace | Ejemplo |
|-------|----------|---------|
| **qa** | QA completo + arregla bugs encontrados | `/qa https://stellar-mermaid-3ba7f1.netlify.app` |
| **qa-only** | QA report sin tocar código | `/qa-only https://taec.com.mx` |
| **browse** | Browser headless — navega, screenshot, interactúa | `/browse https://taec.com.mx` |
| **benchmark** | Mide Core Web Vitals, detecta regresiones | `/benchmark https://taec.com.mx` |

---

## 🧑‍💻 Code Review & Seguridad

| Skill | Qué hace | Ejemplo |
|-------|----------|---------|
| **review** | Code review pre-PR: SQL, race conditions, seguridad | `/review` · `/review --security` |
| **cso** | Auditoría de seguridad completa: secrets, deps, CI/CD | `/cso` |
| **guard** | Modo seguro: bloquea rm -rf, DROP TABLE, force push | `/guard` |
| **careful** | Warnings antes de comandos destructivos | `/careful` |
| **health** | Dashboard de calidad: linter, types, dead code | `/health` |
| **investigate** | Debug sistemático con root cause analysis | `/investigate El dropdown no aparece en mobile` |

---

## 📐 Planificación & Arquitectura

| Skill | Qué hace | Ejemplo |
|-------|----------|---------|
| **plan-eng-review** | Arquitectura, data flow, edge cases, tests | `/plan-eng-review` |
| **plan-ceo-review** | Visión estratégica, scope, product thinking | `/plan-ceo-review` |
| **autoplan** | Pipeline completo: CEO + Eng + Design + DX review | `/autoplan` |
| **office-hours** | Modo YC: 6 preguntas que exponen la realidad del producto | `/office-hours` |
| **codex** | Cross-review con OpenAI Codex como segunda opinión | `/codex review` |

---

## 🎨 Diseño & Frontend

| Skill | Qué hace | Ejemplo |
|-------|----------|---------|
| **frontend-design** | UI con dirección estética, 10 arquetipos, tokens CSS | `/frontend-design Pricing page para cursos Articulate` |
| **ui-ux-pro-max** | 67 estilos, 96 paletas, 57 tipografías | `/ui-ux-pro-max Landing page para empresa B2B de capacitación` |
| **design-consultation** | Propone sistema de diseño completo | `/design-consultation` |
| **design-shotgun** | Genera múltiples variantes visuales para elegir | `/design-shotgun` |
| **design-html** | Finaliza diseño aprobado en HTML/CSS production-ready | `/design-html` |
| **design-review** | Auditoría visual: spacing, jerarquía, AI slop, Trunk Test | `/design-review https://taec.com.mx/articulate-360-mexico` |
| **plan-design-review** | Design review del plan, 0-10 por dimensión | `/plan-design-review` |
| **plan-devex-review** | DX gaps en el plan | `/plan-devex-review` |
| **devex-review** | Auditoría live de developer experience | `/devex-review` |

---

## ✍️ Contenido & Marketing

> Estos skills necesitan descripción o contexto para producir algo útil.

| Skill | Qué hace | Ejemplo |
|-------|----------|---------|
| **article-writing** | Artículos, guías, blog posts, newsletters | `/article-writing Guía de Articulate 360 para equipos de RRHH` |
| **brand-voice** | Perfil de voz de marca desde copy real | `/brand-voice` + pegar ejemplos de copy de TAEC |
| **content-engine** | Sistema de contenido para X, LinkedIn, YouTube | `/content-engine TAEC capacitación corporativa México` |
| **email-ops** | Triage, drafting y follow-ups de email | `/email-ops` |
| **market-research** | Análisis competitivo, inteligencia de mercado | `/market-research Competidores de Articulate 360 en LATAM` |
| **investor-materials** | Pitch deck, one-pager, memo | `/investor-materials` |
| **investor-outreach** | Cold emails, warm intros, updates | `/investor-outreach` |
| **social-graph-ranker** | Rutas de intro cálida en red de contactos | `/social-graph-ranker` |

---

## 🧠 Memoria & Contexto

| Skill | Qué hace | Ejemplo |
|-------|----------|---------|
| **checkpoint** | Guarda estado para retomar después | `/checkpoint` |
| **learn** | Revisa, busca y exporta learnings acumulados | `/learn` |
| **token-optimizer** | Reduce tokens 20-35% — se activa automático | automático |
| **retro** | Retrospectiva semanal con métricas de commits | `/retro` |
| **document-release** | Actualiza README/CHANGELOG/ARCHITECTURE post-ship | `/document-release` |

---

## 🛠 Utilidades

| Skill | Qué hace | Ejemplo |
|-------|----------|---------|
| **freeze** | Restringe edits a un directorio | `/freeze astro-web/src/components` |
| **unfreeze** | Quita la restricción de freeze | `/unfreeze` |
| **gstack-upgrade** | Actualiza gstack a la última versión | `/gstack-upgrade` |
| **setup-browser-cookies** | Importa cookies del browser real al headless | `/setup-browser-cookies` |
| **open-gstack-browser** | Abre Chrome visible con extensión gstack | `/open-gstack-browser` |

---

*Última actualización: abril 2026 · 52 skills activos*
