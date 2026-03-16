# 🔄 TAEC Web — Resumen de sesión
**Fecha:** [fecha]  **Versión actual:** v2.x
**Repo:** elzorromexican/taec-web
**Local:** /Users/slimmasmoudi/taec-web
**Staging:** elzorromexican.github.io/taec-web
**Producción:** nuevo.taec.com.mx

---

## ✅ Hecho hoy
-

---

## 🔴 Mañana — en orden de prioridad
1.
2.
3.

---

## 🧠 Decisiones de diseño vigentes
> Estas reglas NO están en el código, hay que respetarlas siempre

- **Logos en fondos oscuros** → pill blanca (`background:#fff; border-radius:10px; padding:10px 20px; box-shadow:0 2px 12px rgba(0,0,0,.15)`) — NUNCA `filter: brightness(0) invert(1)`
- **Vyond colores** → naranja `#C84D16`, gradiente hero `#1a0a00 → #3d1200 → #C84D16`
- **Precios Vyond** → solo precio anual, sin precio mensual, sin "Multi-seat", sin "Customer Success TAEC" en tarjetas
- **Precios Articulate** → USD sin IVA, pago en MXN al tipo de cambio SAT/Banxico, factura electrónica CFDI
- **Nav tabs** → primer tab siempre es la marca padre (Vyond / Articulate 360), luego sub-productos
- **Videos hero** → autoplay muted + botón 🔇/🔊 esquina inferior derecha
- **Neocities** → links de recursos apuntan a `taec-elearning.neocities.org` — dejar así por ahora
- **Versión footer** → `(ver 2.x)` — discutir si ocultar al público

---

## 🏗️ Stack y convenciones
- HTML5 / CSS3 custom properties / JS vanilla — sin frameworks
- Fuentes: DM Serif Display + Inter (Google Fonts)
- Colores globales: `--blue:#1E3A5F` `--teal:#A8DBD9` `--orange:#E67E22` `--navy:#0F172A`
- Color Vyond: `--vy-orange:#C84D16`
- Python scripts en `/tmp/` para ediciones batch en múltiples archivos (re.sub con DOTALL)
- Logos externos: Clearbit API `https://logo.clearbit.com/{dominio}` con `onerror` fallback a texto
- Badges G2: en `assets/badges/` — formato AVIF
- Logos partners: en `assets/logos/`

---

## 🐛 Bugs resueltos (no repetir)
- **Logos all-white** → solución: pill blanca, NUNCA filter CSS
- **G2 HTML no insertado** → condición `if 'g2-section' not in c` fallaba si CSS ya lo tenía. Solución: Edit tool directo con marcador de comentario exacto
- **Nav activa doble en páginas `curso-`** → páginas `curso-` tienen prioridad sobre "Soluciones"
- **Video label negro ilegible** → añadir `background: rgba(0,0,0,.5); color:white` al label
- **Videos sin audio** → browsers bloquean autoplay con audio → muted + botón toggle 🔇/🔊
- **Dropdown hover gap** → `top: calc(100%+6px)` → `top: 100%` en CSS

---

## 📁 Estado de archivos
| Archivo | Estado | Notas |
|---------|--------|-------|
| `index.html` | ✅ completo | |
| `articulate-360-mexico.html` | ✅ completo | Badge reseller + G2 |
| `articulate-rise360.html` | ✅ completo | |
| `articulate-storyline360.html` | ✅ completo | |
| `articulate-review360.html` | ✅ completo | |
| `articulate-reach.html` | ✅ completo | |
| `articulate-ai-assistant.html` | ✅ completo | |
| `articulate-localization.html` | ✅ completo | |
| `vyond-mexico.html` | ✅ completo | |
| `vyond-go.html` | ✅ completo | |
| `vyond-studio.html` | ✅ completo | |
| `vyond-mobile.html` | ✅ completo | |
| `totara-lms-mexico.html` | ✅ completo | |
| `moodle-mexico.html` | 🔴 En construcción | |
| `clientes.html` | 🔴 En construcción | |
| `nosotros.html` | ✅ completo | |
| `contacto.html` | ✅ completo | |
| `sitemap.xml` | ✅ activo | |
| `robots.txt` | ✅ activo | |
| `google6fa6407ffaf5623d.html` | ✅ | Verificación GSC |

---

## 🔗 Links de referencia frecuentes
- Articulate oficial: articulate.com/360
- Vyond producto: vyond.com/product
- Vyond planes: vyond.com/plans
- Vyond trial: think.vyond.com/signup
- G2 Vyond: g2.com/sellers/vyond (4.8/5 · 466 reseñas)
- G2 Articulate: g2.com/products/articulate-360/reviews (4.7/5 · 621 reseñas)
- TicTacLearn Vyond: tictaclearn.net/products/vyond
- Badges Vyond G2: `/Users/slimmasmoudi/Downloads/Vyond_ Certified partner_files/`
