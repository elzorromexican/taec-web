# Checklist Consolidado de Tareas Pendientes (TAEC Web)
*Este documento unifica permanentemente todas las tareas y roadmaps (Fase 1, Fase 2, DDC, Ecommerce y Completadas) en una sola fuente de verdad.*

## 📌 Operaciones Recientes (Corto Plazo)
- [x] Concluir ajustes de Quality Assurance (QA) fotográfico o estilístico en dispositivos móviles para las colecciones secundarias.
- [x] Preparación y revisión final previo al Embalaje / Deployment para entorno de Producción.
- [x] Parche Urgente de Producción: Corrección en `paths.ts` forzando el *Trailing Slash* en Astro (`import.meta.env.BASE_URL`) para solventar la pérdida de Assets CSS (404) en GitHub Pages.
- [x] Saneamiento Quirúrgico (Anti-FOUC): Purga de `>800` líneas de CSS redundante (Mega Menú y Footer) de 11 landings de Articulate y Vyond para lograr 100% de herencia del layout unificado sin parpadeos de renderizado.
- [x] **Blindaje JavaScript (Hallazgo P0 de Auditoría):** Extracción, tipado y desacoplamiento de *scripts* pesados en `blog/`, `articulos/`, `totara-lms` y red `vyond`. Se migraron los inyectores `define:vars` a variables `data-keys` nativas en DOM para evitar bloqueos del Main Thread.
- [x] **Actualización de UI DDC:** Reemplazo de bloque de texto ("Cómo trabajamos") por diagrama visual del ciclo ágil SAM + ADDIE en `desarrollo-de-contenidos.astro`.

## 🛠️ Cotizador DDC (Estimador de Costos Web)
**Fase de Definición**
- [x] Extraer tabuladores fantasma del Excel original: `pmFromInstructionalDesign` y `pmFromGraphicDesign`.
- [x] Extraer variables faltantes para Rise: `instructionalDesignMinutesPerBlock` y `blocksPerPage`.
- [x] Definir explícitamente el valor de amortización para `internalLicenseCostPerVideo` en Vyond.
- [x] Eliminar del frontend las menciones a márgenes y rate por hora.
- [x] Decisión comercial: Aclarar en el disclaimer si el estimado es *antes de IVA*.

**Configuración Backend y Limitación GitHub Pages**
- [ ] **Migración de Hosting / Desacoplamiento (Postergado):** El Endpoint `/api/tabular-ddc` requiere ejecución de servidor (Node.js/SSR). Al estar hospedados en **GitHub Pages**, esta característica API está bloqueada. Se requiere migrar a Vercel/Netlify o usar una Function externa.
- [x] Crear el archivo `.env` seguro para tarifas y márgenes brutos.
- [x] Crear la Astro API Route `src/pages/api/calcular-cotizacion-ddc.ts` (Desactivado temporalmente).
- [x] Implementar validador Zod Schema para sanitizar los payloads entrantes.
- [x] Codificar el motor de estimación derivado de 3 productos limitados (Storyline, Rise, Vyond).
- [ ] Validar EndPoint contra 5 cotizaciones históricas reales sacadas del Excel (margen de error ≤ ±15%).

**Fase Frontend**
- [x] Diseñar Componente Island en React o Svelte (`CotizadorDDC`) embebido en la landing.
- [x] Integrar el formulario de inputs limpios estandarizados para el usuario.
- [x] Realizar Fetch pasivo y asíncrono al endpoint.
- [x] Mostrar en UI el resultado encapsulado (`"Desde $XX,XXX MXN"`) e inyectar *disclaimer* legal.
- [ ] Hacer POST webhook enviando los datos cotizados hacia Zoho CRM si capturamos el lead.

## 💼 Portafolio y Centro de Demos DDC
- [ ] Analizar base de datos de Demos (Google Sheets) para integrar un "Portafolio / Centro de Demos" interactivo a la página de DDC.
- [ ] Estructurar la UI/UX del portafolio.

## 🗺️ Roadmap Fase 2 (Detallado)
**1. Reestructuración Profunda de Menú y UX (Postergado para el Final)**
- [ ] **Auditoría UX:** Transicionar el `Mega Menú` actual (orientado a nombres de software) hacia un menú enfocado en **Casos de Uso / Problemas del Usuario** (Ej: "Quiero plataformas LMS", "Busco crear cursos").
- [ ] **Limpieza:** Eliminar "Clientes" y "Casos de Uso" globales del menú superior (`navigation.ts`).
- [ ] **Prueba Social:** Construir componente modular `CasoUsoInline.astro` (Testimonios) e inyectarlo dinámicamente en las landings de producto para compensar su salida del header superior.

**2. Ecosistema de Recursos**
- [ ] Limpiar los archivos de prueba físicos residuales en `blog/` y `articulos/`.
- [ ] Aplicar diseño UX premium (Layout Sala de Lectura) estandarizado para artículos.
- [ ] Validar integridad y semántica de todas las "Ligas Externas".
- [ ] Construir la landing `/recursos/tips-y-hacks` con diseño tipo repositorio de tarjetas.
- [ ] Implementar interlinking circular entre Glosario y Blog.
- [ ] Redactar el manual operativo `docs/mantenimiento-recursos.md`.

**3. Portal de Distribuidores (B2B Intranet)**
- [ ] Configurar Stack de Autenticación (Supabase, Firebase, o Clerk).
- [ ] Crear la interfaz segura (Dashboard, Tablón de Avisos y Reglas generales).
- [ ] Construir y conectar el formulario "Registro de Oportunidades" a base de datos externa.
- [ ] Construir sección privada de descarga de "Machotes y Formatos".

**4. Moderación de Comentarios (Blog Backend)**
- [ ] Diseñar el modelo de BD relacional para comentarios y roles de usuario.
- [ ] Restablecer el componente `BlogComments.astro` inyectando protección Anti-Spam (Turnstile/reCAPTCHA).
- [ ] Generar API Endpoint seguro de creación con estado natural "Pendiente".
- [ ] Construir vista/flujo "Moderador" para aprobación de comentarios en vivo.

**5. Plataforma E-Commerce Completa**
- [ ] Definir Stack E-commerce y modelar licenciamiento/variantes en catálogos.
- [ ] Integrar Pasarela de Pagos (Stripe / MercadoPago) nativa para MXN/USD.
- [ ] Construir Carrito de Compras, Checkout y flujo estricto de recolección de CFDI.
- [ ] Parametrizar automatización de correos transaccionales post-compra.
- [ ] Crear panel rudimentario para la gestión administrativa de Órdenes (OMS).

**6. Arquitectura Multi-Región (CO / CL)**
- [ ] Definir estrategia de Astro Multi-Tenant o subcarpetas dinámicas.
- [ ] Parametrizar variables de contacto, monedas corporativas y rutas `.co` / `.cl`.
- [ ] Adaptar layouts y colecciones para consumir el contenido periodístico segmentado por país.

**7. Geo-Pricing y Pop-up Articulate (Anti-VPN)**
- [ ] Integrar servicio resolutor de GeoIP preciso (Edge/API).
- [ ] Evaluar bandera anti-VPN / anonymous proxy contra la request del visitante en tiempo real.
- [ ] Construir componente asíncrono en cliente para sobreescritura condicional de precio.
- [ ] Desplegar Banner/Pop-Up animado destacando la oferta de licenciamiento Teams + IA.

**8. Traducción Total i18n (EN, PT-BR, FR)**
- [ ] Configurar lógica de Ruteo i18n nativo en Astro (`astro.config.mjs`).
- [ ] Construir arquitectura de diccionarios UI (`src/i18n/ui.ts`).
- [ ] Refactorizar componentes compartidos para consumir las variables de idioma.
- [ ] Estructurar colecciones de contenido segmentadas por subcarpetas de lenguaje.
- [ ] Implementar un Selector Animado de Idiomas accesible en el `Header` principal.

**9. Arquitectura de Soluciones (Hub & Spoke)**
- [ ] **Articulate 360:** Enlazar las tarjetas principales con sus respectivas landings secundarias que ya están listas.
- [ ] **Vyond:** Establecer el enlazado desde las tarjetas hacia sus propias landings detalladas.
- [ ] **Totara:** Desarrollar desde cero las páginas hijas completas para Totara Learn, Totara Perform y Totara Mobile.
- [ ] **DDC:** Construir desde cero sub-páginas ("deep dives") explicando los contenidos y mostrando ejemplos de portafolio.

**10. Automatización e IA Interactiva**
- [ ] Construir "Assessment de Madurez E-learning" con generación automática de reportes en PDF.
- [ ] Implementar Chatbot de IA (RAG) consumiendo exclusivamente el Blog y Glosario.
- [ ] Añadir animaciones progresivas (Framer Motion / Viewport CSS) a toda la página de DDC.
- [ ] Construir Centro de Webinars y Demos On-Demand (Videos cerrados contra captura de lead).
- [ ] Implementar un Hero Banner inteligente (Personalización dinámica de contenido).

## 🔎 Archivo Histórico de Completados
*Se han omitido los detalles menores de refactorización visual.*
- [x] **SEO Crítico:** Sitemap, robots.txt, Schema Markups en 70+ URLs, y sanitización canónica total.
- [x] **Arquitectura Base:** Despliegue SSG GitHub Pages, y limpiezas globales de directorios.
- [x] **Sistema de UI:** Creación de componentes modulares de bloque (HeroComercial, GridBeneficios, Menú Complejo).
- [x] **Contact e Integraciones:** Implementación Severless con Google Apps Script, y Zoho Bookings.
- [x] **Catálogo Completo:** 50+ Páginas estáticas para software y servicios mapeadas en Hubs correctos.
- [x] **CMS de Content Collections:** Infraestructura para Blog, Artículos y Glosario con generador automático de etiquetas y scripts normalizadores en Node.
- [x] **UX Navegacional (Quick Wins):** Enlaces huérfanos y CTA fantasmas conectados a embudos reales.
- [x] **Refactor Auditivo (Staff Engineer):** CSS global estandarizado en todo el catálogo (Nav Acts y Footer Darks) y asimilamiento de JS a módulos ESM de Astro nativos.
