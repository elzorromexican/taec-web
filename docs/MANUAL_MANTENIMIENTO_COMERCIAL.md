# 🛠️ Manual de Mantenimiento B2B (No-Code)

Este documento centraliza todas las instrucciones para que el equipo Comercial, Marketing y L&D pueda actualizar el contenido profundo del sitio web **sin necesitar conocimientos de programación** y con cero riesgo de romper la página, el frontend o la infraestructura en React.

Nuestra arquitectura fue diseñada con el principio de *"Separation of Concerns"* (Separar la lógica comercial de la lógica de código). Todos los textos que importan viven en "Diccionarios" de datos centralizados.

---

## 1. El Cerebro del Chatbot (Tito Bits V3.7)
**Dificultad:** Muy Baja 🟢
**Archivo a editar:** `src/data/chatContextRules.ts`

Aquí viven todos los "discursos", saludos iniciales y saltos de memoria (*Context Hops*) que usa nuestro Agente de Inteligencia Artificial para perfilar a los usuarios.

- Para cambiar los textos de ventas, abre el archivo directamente (puedes hacerlo desde el botón ✏️ *Edit in GitHub* en la nube).
- Modifica solo el texto en color verde (lo que está entre las comillas `"`).
- **El Token Mágico:** Puedes usar la etiqueta `{name}` en cualquier lado del texto para que el robot inyecte inteligentemente el nombre real que el prospecto capturó al inicio.
- **Ejemplo Práctico:** Si en noviembre hay promoción de Vyond, abres la regla de *Vyond* y pones: `"Hola {name}, ¡este Buen Fin tenemos 10% en licencias nuevas!"`.
- Al guardar el archivo, Netlify recompilará toda la aplicación web en ~45 segundos, y el bot aprenderá sus nuevas palabras mágicamente.

---

## 2. Artículos, Blog y Glosario SEO (Portal CMS)
**Dificultad:** Muy Baja 🟢
**Ubicación:** URL del Panel de Administración (Ej. `nuevo.taec.com.mx/admin`)

Cualquier insumo editorial (Glosario E-learning, Noticias, o Casos de Éxito) ya NO vive como código duro HTML.
- **Flujo Visual:** Ingresas al portal con las credenciales de GitHub vinculadas. Tienes un editor visual riquísimo parecido a WordPress o Medium donde solo escribes y pegas imágenes.
- **Flujo "VoBo" (Workflow):** Integré un sistema de Curaduría Editorial. Tus becarios o redactores pueden escribir el reporte y marcarlo como "Borrador" (*Draft*). Se quedará estancado como "En Revisión" hasta que el Editor Jefe le dé el botón de "Publish" oficial. En ese segundo cronometrado, el robot autoconstruye la página y el Sitemap SEO hacia Google.

---

## 3. Catálogo de Enlaces del Menú y Triaje
**Dificultad:** Baja 🟡
**Archivo a editar:** `src/data/navigation.ts`

Si marketing de la nada lanza una nueva Landing Page de producto (Ej. `/soluciones/totara-engage`) y necesitan insertarla en el Dropdown del Mega Menú:
- Abres el archivo `navigation.ts`.
- Buscas la familia lógica a la que pertenece (ej. `lms`).
- Clonas una de las líneas, por ejemplo: `{ label: 'Totara Engage', url: '/soluciones/totara-engage' }`.
- ¡Listo! El motor inteligente de Astro se encargará de inyectar tu nueva liga en: 1) El menú de computadora, 2) El acordeón de móviles, y 3) En la sección de sitemap automático oculto, todo sincronizado de una tajada.

---

## 4. Branding Global: Teléfonos, Correos y Redes Sociales
**Dificultad:** Muy Baja 🟢
**Archivo a editar:** `src/data/contact.ts`

Si TAEC cambia su línea de teléfono corporativo, su WhatsApp de negocios o si abrimos operación en otro país:
- Entras a este diccionario maestro único de `contact.ts`.
- Mapeas y actualizas los strings de *LinkedIn*, *YouTube*, *WhatsApp URL*.
- No tienes que ir a cazar el link roto en 500 páginas (Header superior, pie de página, formularios de DDC, etc.). Con guardarlo aquí una sola vez, "riega" el valor actualizado a absolutamente todos los componentes en tiempo real.

---

## 5. El Cerebro del Cotizador DDC (Astro API)
**Dificultad:** Media 🟠
**Archivo actual:** `src/pages/api/calcular-cotizacion-ddc.ts` (O las Variables de Entorno `.env` del servidor de FrontEnd).

La calculadora interactiva asume responsabilidades financieras basadas en Tabuladores y Rendimiento por Hora (Instructional Design & Graphic Design).
- Para blindar la empresa contra un raspado (*web scraping*) de la competencia, **esas tarifas jamás bajan al navegador del cliente**.
- Para subirlas a causa de inflación corporativa anual (Ej. PM de $1,350 MXN a $1,500 MXN la hora), el líder de proyecto solo debe cambiar el valor nominal interno en las matemáticas de ese archivo o en las variables protegidas del Backend (Netlify Secrets).
- La calculadora asimilará la subida de precios inflacionarios en su próxima cotización matemática, dictando el nuevo umbral *"Desde $XX,XXX MXN"*.

---
_Prohibición Estricta:_
_Ningún archivo terminado en `.astro` o `.tsx` de las carpetas `/components/` o `/layouts/` debe ser manipulado por el equipo comercial bajo ninguna circunstancia. Cualquier cambio estético o estructural debe realizarse mediante Ingeniería._
