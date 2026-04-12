# Manual de Mantenimiento Comercial

**Para:** Equipo Comercial, Marketing y L&D  
**Actualizado:** 2026-04-11

---

## Los tres niveles de edición

Antes de tocar cualquier cosa, identifica en qué nivel está el cambio que necesitas.

| Nivel | Cómo | Tiempo en producción | Quién puede hacerlo |
|---|---|---|---|
| **A — Supabase** | Panel web, sin tocar código | Inmediato | Equipo con acceso a intranet |
| **B — Archivos de datos** | Editar en GitHub, Netlify despliega solo | ~2 minutos | Equipo con acceso a GitHub |
| **C — Código** | PR de ingeniería | Horas / días | Solo Antigravity |

Cada sección de este manual indica a qué nivel pertenece.

---

## NIVEL A — Cambios en tiempo real (Supabase, sin deploy)

Estos cambios se reflejan en producción **de inmediato**, sin tocar código ni esperar deploy.

### A1. Panel de administración — `/interno/admin`

**Acceso:** `nuevo.taec.com.mx/interno/admin` (requiere cuenta `@taec.com.mx`)  
**Nivel de acceso requerido:** rol `admin` en Supabase

Desde este panel se puede gestionar:
- Contenido del Hub interno aprobado/rechazado
- Configuración de links maestros del sitio
- Usuarios autorizados a la intranet

### A2. Usuarios de la intranet

**Tabla Supabase:** `usuarios_autorizados`  
**Acceso via:** panel admin `/interno/admin` o dashboard de Supabase

Para dar o quitar acceso a la intranet TAEC a un colaborador:
1. Ingresar al panel admin
2. Buscar o agregar el correo `@taec.com.mx`
3. Asignar rol: `viewer` (lectura) o `admin` (gestión)
4. El cambio aplica en la siguiente sesión del usuario

### A3. Playbooks de producto (intranet)

**Ruta:** `/interno/playbooks/[producto]`  
**Fuente de datos:** Supabase (tabla de playbooks)

Los playbooks son guías comerciales internas por producto. Se pueden actualizar via el panel admin sin deploy.

---

## NIVEL B — Archivos de datos (deploy automático ~2 min)

Estos archivos se editan directamente en GitHub. Al guardar, **Netlify detecta el cambio y despliega solo** en aproximadamente 2 minutos. No se requiere intervención de ingeniería.

**Cómo editar en GitHub:**
1. Ir al repositorio en GitHub
2. Navegar al archivo
3. Clic en el ícono de lápiz (Edit this file)
4. Hacer el cambio
5. Clic en "Commit changes" — escribir una descripción breve del cambio
6. En ~2 minutos el cambio está en producción

### B1. Conocimiento de TitoBits (chatbot IA)

**Archivo:** `astro-web/src/data/titoKnowledgeBase.ts`  
**Versión activa:** v6.0

Contiene todo lo que TitoBits sabe: precios, características, FAQs, condiciones de promos, flujos de conversación por producto.

**Qué puedes cambiar:**
- Precio de una licencia
- Descripción de un producto
- Condiciones de una promo ("hasta el 30 de junio, 31% de descuento en Teams+IA")
- Respuesta a una pregunta frecuente nueva
- Agregar un producto nuevo al conocimiento del bot

**Regla de oro:** modifica solo texto entre comillas `" "`. Nunca toques la estructura de llaves `{}` ni los nombres de las propiedades — eso es código.

**Importante:** TitoBits NO lee `promos.ts` automáticamente. Si lanzas una promo nueva, debes actualizar **ambos archivos** — `promos.ts` para el ticker visual y `titoKnowledgeBase.ts` para que el chatbot la mencione.

### B2. Promociones activas

**Archivo:** `astro-web/src/data/promos.ts`

Controla el ticker de promos del home y las tarjetas de promo en páginas de producto. El sistema detecta el país del visitante via Netlify Edge y muestra solo las promos que aplican.

**Para activar una promo nueva**, agregar un bloque:

```
{
  id: "PROMO-003",
  title: "Nombre interno de la promo",
  description: "Texto que verá el visitante en el ticker",
  badgeText: "31% OFF",
  link: "https://URL-de-la-promo",
  urlTrigger: "/articulate-360-mexico",   <- página donde se destaca
  countries: ["MX"],                       <- cobertura geográfica
  active: true
}
```

**Para desactivar** sin borrar: cambiar `active: true` a `active: false`.

**Cobertura geográfica — opciones:**

| Valor | Quién lo ve |
|---|---|
| `["MX"]` | Solo visitantes desde México |
| `["CO"]` | Solo Colombia |
| `["CL"]` | Solo Chile |
| `["MX", "CO"]` | México y Colombia |
| `["LATAM"]` | Toda Latinoamérica hispanohablante |
| `["GLOBAL"]` | Todos sin restricción |

**Promos activas Q2 2026:**
- `PROMO-001` — Articulate 360 Teams+IA a $1,198 USD/seat · México · vigente hasta 30 jun 2026
- `PROMO-002` — Paquete Localization 20% OFF · Global · URL pendiente de confirmar

### B3. Datos de contacto

**Archivo:** `astro-web/src/data/contact.ts`

Fuente única de todos los datos de contacto de TAEC. Un cambio aquí se propaga automáticamente a header, footer, formulario de contacto, botón flotante de WhatsApp y todos los CTAs del sitio.

**Qué vive aquí:**
- Correo: `info@taec.com.mx`
- Teléfono corporativo
- Enlace de WhatsApp (`wa.me/...`)
- URL de Zoho Bookings (diagnóstico gratuito)
- URL de la tienda (`tienda.taec.com.mx`)
- Redes sociales: LinkedIn, YouTube, Facebook

**Cuándo editar:** si cambia el número de WhatsApp, si se crea una nueva URL de Zoho, si se abre operación en otro país.

### B4. Menú de navegación

**Archivo:** `astro-web/src/data/navigation.ts`

Si se lanza una nueva página de producto y debe aparecer en el menú principal:

1. Abrir el archivo
2. Buscar la familia del producto (ej. `lms`, `autoría`, `evaluación`)
3. Agregar: `{ label: 'Nombre del producto', url: '/nombre-mexico' }`
4. La URL debe coincidir exactamente con el nombre del archivo de página

El menú de escritorio, el acordeón móvil y el sitemap se actualizan solos.

---

## NIVEL C — Requiere ingeniería (PR de Antigravity)

Estos cambios no se pueden hacer editando archivos de datos. Requieren modificar código `.astro` o componentes, y deben pasar por revisión antes de publicarse.

**Solicitar a Antigravity cuando:**

### C1. Cambios en páginas de producto

Texto, secciones, imágenes o estructura de cualquier página `.astro`. Ver mapa de páginas abajo.

### C2. Precios en tabla de Vyond

Los precios de Vyond (Professional $1,199 / Enterprise $1,649) están hardcodeados en `vyond-mexico.astro`. Para actualizarlos, Antigravity debe editar la página y abrir PR.

### C3. Badges G2

Los badges G2 se renuevan cada trimestre (Winter / Spring / Summer / Fall). Para actualizarlos: descargar los nuevos badges de G2.com y solicitar a Antigravity que los reemplace en las páginas correspondientes (Vyond, Moodle, Articulate).

### C4. Barra de tabs Articulate

Si se agrega una nueva sub-página de Articulate (ej. Articulate Localization), la barra de tabs que aparece en todas las páginas de la familia debe actualizarse en **cada una** de ellas. Esto lo hace Antigravity.

### C5. Páginas nuevas de producto

Crear una nueva página requiere: archivo `.astro`, logo en `public/assets/logos/`, entrada en `navigation.ts` (B4) y posiblemente entrada en TitoBits (B1).

---

## Mapa de páginas — quién gestiona qué

### Familia Articulate

| Página | URL | Datos editables sin código |
|---|---|---|
| Articulate 360 | `/articulate-360-mexico` | Promo → `promos.ts` (B2) · Precio promo → `titoKnowledgeBase.ts` (B1) |
| Rise 360 | `/articulate-rise360` | Texto → Nivel C |
| Storyline 360 | `/articulate-storyline360` | Texto → Nivel C |
| AI Assistant | `/articulate-ai-assistant` | Texto → Nivel C |

### Productos complejos

| Página | URL | Datos editables sin código |
|---|---|---|
| Vyond | `/vyond-mexico` | Precios → Nivel C · Conocimiento bot → B1 |
| Moodle | `/moodle-mexico` | Conocimiento bot → B1 |
| Totara | `/totara-lms-mexico` | Conocimiento bot → B1 |

### Familia DDC

| Página | URL | Datos editables sin código |
|---|---|---|
| LYS | `/lys-mexico` | Conocimiento bot → B1 |
| StrikePlagiarism | `/strikeplagiarism-mexico` | Conocimiento bot → B1 |
| Proctorizer | `/proctorizer-mexico` | Conocimiento bot → B1 |
| CustomGuide | `/customguide-mexico` | Conocimiento bot → B1 |
| OttoLearn | `/ottolearn-mexico` | Conocimiento bot → B1 |

---

## Roadmap — lo que pasará a Nivel A pronto

Estos ítems actualmente requieren deploy (Nivel B) pero están planificados para migrar a Supabase (Nivel A — sin deploy):

- **Promos** — tabla `promos` en Supabase con campos `valid_from`, `valid_until`, `countries`, `active`. Las promos se gestionarían desde un panel sin tocar código y con auto-expiración por fecha.
- **TitoBits** — fragmentos del knowledge base en Supabase con búsqueda vectorial (RAG). Actualizar conocimiento del bot sin deploy.

Mientras no estén migrados, el proceso es via GitHub (Nivel B).

---

## Evento Corporate Learning Summit — 7 mayo 2026

**Venue:** The St. Regis, Paseo de la Reforma 439, CDMX · 8:30 AM  
**Co-hosts:** TAEC + Articulate  
**Registro:** https://register.articulate.com/mexico-city

**Reglas de comunicación para el equipo:**
- TAEC decide quién entra — Articulate no tiene voz en la selección de asistentes
- No confirmar asistencia ni generar expectativa automática
- Copy oficial: "aforo reducido · perfiles seleccionados · confirmación personalizada por TAEC"
- Flujo: solicitud → revisión TAEC → confirmación personalizada por correo
