# Checklist Consolidado de Tareas Pendientes (TAEC Web)
*Este documento unifica permanentemente todas las tareas y roadmaps (Fase 1, Fase 2, DDC, Ecommerce y Completadas) en una sola fuente de verdad.*

## 📌 Operaciones Recientes (Corto Plazo)
- [x] Concluir ajustes de Quality Assurance (QA) fotográfico o estilístico en dispositivos móviles para las colecciones secundarias.
- [x] Preparación y revisión final previo al Embalaje / Deployment para entorno de Producción.
- [x] Parche Urgente de Producción: Corrección en `paths.ts` forzando el *Trailing Slash* en Astro (`import.meta.env.BASE_URL`) para solventar la pérdida de Assets CSS (404) en GitHub Pages.
- [x] Saneamiento Quirúrgico (Anti-FOUC): Purga de `>800` líneas de CSS redundante (Mega Menú y Footer) de 11 landings de Articulate y Vyond para lograr 100% de herencia del layout unificado sin parpadeos de renderizado.
- [x] **Blindaje JavaScript (Hallazgo P0 de Auditoría):** Extracción, tipado y desacoplamiento de *scripts* pesados en `blog/`, `articulos/`, `totara-lms` y red `vyond`. Se migraron los inyectores `define:vars` a variables `data-keys` nativas en DOM para evitar bloqueos del Main Thread.
- [x] **Actualización de UI DDC:** Reemplazo de bloque de texto ("Cómo trabajamos") por diagrama visual del ciclo ágil SAM + ADDIE en `desarrollo-de-contenidos.astro`.
- [x] **Correcciones DDC (Revisión PDF):** Extraer e implementar todos los comentarios de `docs/Revisión sitio DDC 2026.pdf` en la landing de Desarrollo de Contenidos.
- [x] **Páginas Legales:** Migración completa de php a Astro para `/aviso-de-privacidad` y `/terminos-y-condiciones`.
- [x] **Auditoría Arquitectónica de IA (DeepSeek):** Implementación de mejoras estructurales globales: `README.md`, limpieza asíncrona de Git tracking (`OLDYS`), `dependabot.yml`, plantilla segura de `.env.example`, inyección nativa de SEO en Layout Principal y retraso de ejecución (*lazy loading* `client:visible`) en componentes puros de React.
- [x] **Triage de Revisión (Pastel):** Aplicación de correcciones de redactura fina (USA y Europa, Escríbenos, Triggers, On-line, Show/Try/Do) e iconografía (Reemplazar Clip por Tachuela).
- [x] **Corrección de Contraste (Vyond Go/Mobile/Studio):** Inyección de bloques CSS omitidos para renderizar fuentes color blanco legibles en hero cards.
- [x] **Depuración de Catálogo Comercial Vyond:** Eliminación definitiva del plan "Vyond Starter" del simulador de tarjetas cruzadas y menús principales.
- [x] **Restauración de Infraestructura CSS CSS:** Inyección de 60 líneas de maquetación Flexbox extraviadas para rehabilitar la estructura gráfica rota de Vyond Professional y Enterprise.
- [x] **Unificación de Navegación Secundaria (Vyond):** Extracción del catálogo en bruto hacia un nuevo componente agnóstico (`VyondNav.astro`) e inyección transversal en las 6 páginas de producto/planes para homologar la experiencia con el menú de Articulate.
- [x] **Auditoría de Accesibilidad (Footer):** Rediseño paramétrico de contrastes en `footer.css` (de Slate 500 a Slate 200/Blanco), incremento en pesos de fuente y eliminación de opacidades restrictivas en enlaces legales para cumplir estándares WCAG.
- [x] **Compactación de Pie de Página:** Eliminación del botón anidado ("Agendar diagnóstico gratuito") por redundancia de UX. Fusión térmica de los bloques espaciales entre `.footer-latam` y `.footer-bottom` eliminando líneas de división y empaquetando el contenido de cierre en un solo nivel visual.
- [x] **Modernización UI y SPA:** Refactor de animaciones on-scroll (`.reveal-up`) exportadas globalmente y soporte total a Astro View Transitions.
- [x] **Directorio Interactivo:** Reemplazo definitivo de `/servicios` por un catálogo algorítmico nutrido nativamente desde `navigation.ts`.
- [x] **Marquesinas Inmersivas:** Implementación SSR de Astro Content Collections con `CSS Marquee` infinito para Blog y Logotipos.
- [x] **Restauración Mac Dock Footer:** Reactivación blindada del footer experimental flotante para todo el sitio mediante hooks dinámicos `astro:page-load`.
- [x] **UX de Navegación B2B:** Se inyectó el enlace universal `bottomAction` ("Ver todas las soluciones") a la base del Mega Menú para garantizar accesibilidad en dispositivos sin soporte de Hover.
- [x] **Auditoría Multi-IA (DevX & Web Vitals):** Ejecutamos una blindaje total de performance: se eliminó el riesgo de CLS fijando `flex-shrink: 0`, se potenció FPS con `will-change: transform`, y se agregó tipado estricto (`BADGE_CLASS`) y `Fail-Fast` en TS para evitar rupturas silenciosas.
## 🛑 Tareas Congeladas (Requieren VoBo Interno Taec)
- [ ] **Validación Vyond:** Revisión final de la página curso con Ana M.
- [ ] **Decisión UI:** Determinar si los headers azules se cambian por imágenes logo (Actual: Articulate).
- [ ] **Pendiente Reach 360:** Esperar validación integral del contenido con Ana María.
- [ ] **iFrames Moodle:** Faltan las ligas iframe de los bloques públicos de las rutas de aprendizaje 1, 2, 3 desde LMS para insertar en la plataforma.
- [ ] **Experimento Footer Colapsable:** Evaluar con el equipo de estrategia la opción de implementar el componente experimental `FooterDock.astro` (estilo Dock de Mac) vs. mantener el pie de página clásico en producción basándose en accesibilidad y analíticas de retención.

## 🛠️ Cotizador DDC (Estimador de Costos Web)
**Fase de Definición**
- [x] Extraer tabuladores fantasma del Excel original: `pmFromInstructionalDesign` y `pmFromGraphicDesign`.
- [x] Extraer variables faltantes para Rise: `instructionalDesignMinutesPerBlock` y `blocksPerPage`.
- [x] Definir explícitamente el valor de amortización para `internalLicenseCostPerVideo` en Vyond.
- [x] Eliminar del frontend las menciones a márgenes y rate por hora.
- [x] Decisión comercial: Aclarar en el disclaimer si el estimado es *antes de IVA*.

**Configuración Backend y Limitación GitHub Pages**
- [ ] **Migración de Hosting / Desacoplamiento (Postergado):** El Endpoint `/api/tabular-ddc` requiere ejecución de servidor (Node.js/SSR). Al estar hospedados en **GitHub Pages**, esta característica API está bloqueada. Se requiere si  o usar una Function externa.
- [x] Crear el archivo `.env` seguro para tarifas y márgenes brutos.
- [x] Crear la Astro API Route `src/pages/api/calcular-cotizacion-ddc.ts` (Desactivado temporalmente).
- [x] Implementar validador Zod Schema para sanitizar los payloads entrantes.
- [x] Codificar el motor de estimación derivado de 3 productos limitados (Storyline, Rise, Vyond).
- [ ] *(POSTERGADO)* Validar EndPoint contra 5 cotizaciones históricas reales sacadas del Excel (margen de error ≤ ±15%).
- [ ] *(NUEVO)* **Historial y Scoring de Cotizaciones:** Implementar una base de datos/registro de cotizaciones asociadas al correo del cliente para trackear qué cotizó, en qué momento, y calcular un Scoring comercial a futuro.

**Fase Frontend**
- [x] Diseñar Componente Island en React o Svelte (`CotizadorDDC`) embebido en la landing.
- [x] Integrar el formulario de inputs limpios estandarizados para el usuario.
- [x] Realizar Fetch pasivo y asíncrono al endpoint.
- [x] Mostrar en UI el resultado encapsulado (`"Desde $XX,XXX MXN"`) e inyectar *disclaimer* legal.
- [ ] *(POSTERGADO)* Hacer POST webhook enviando los datos cotizados hacia Zoho CRM si capturamos el lead.

## 💼 Portafolio y Centro de Demos DDC
- [x] Analizar base de datos de Demos (Google Sheets) para integrar un "Portafolio / Centro de Demos" interactivo a la página de DDC.
- [x] Estructurar la UI/UX del portafolio.
- [x] Separar el portafolio en una URL/Página estática independiente (`/portafolio`) para limpiar el diseño de la landing base.

## 🗺️ Roadmap Fase 2 (Detallado)
**1. Reestructuración Profunda de Menú y UX (Postergado para el Final)**
- [ ] **Auditoría UX:** Transicionar el `Mega Menú` actual (orientado a nombres de software) hacia un menú enfocado en **Casos de Uso / Problemas del Usuario** (Ej: "Quiero plataformas LMS", "Busco crear cursos").
- [ ] **Limpieza:** Eliminar "Clientes" y "Casos de Uso" globales del menú superior (`navigation.ts`).
- [ ] **Prueba Social:** Construir componente modular `CasoUsoInline.astro` (Testimonios) e inyectarlo dinámicamente en las landings de producto para compensar su salida del header superior.

**2. Triage Front-End y Ecosistema de Recursos (CMS)**
- [ ] **Auditoría UX (Propuesta 1):** Transicionar `Mega Menú` y *Hero Banner* hacia el flujo de "Triaje Quirúrgico por Dolor" y "Madurez de la Empresa".
- [x] **Instalar CMS Git (Ej: Decap CMS):** Configurar la app invisible `/admin` que se conecta directo a GitHub sin requerir bases de datos.
- [x] **Configurar Colecciones B2B:** Mapear en CMS las áreas únicas: Blog/LinkedIn, Archivo Newsletters, Comparativos VS, Recursos PDF, Partners, y Casos de Éxito.
- [x] **Habilitar Flujo Editorial ("VoBo"):** Bloquear publicación directa en la página. Configurar ruta de "Borrador -> Revisión -> Aprobado por Curador".
- [x] **Doble Checkbox de Compliance:** Crear componente global para Formularios (Privacidad Obligatoria + Opt-in Opcional de Marketing automatizado).
- [ ] Limpiar los archivos de prueba físicos residuales en `/blog/`, aplicar el layout de lectura premium, e implementar interlinking SEO.

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

**10. Automatización e IA Interactiva (Tito Bits Nivel 2 y 3)**
- [ ] Construir "Assessment de Madurez E-learning" con generación automática de reportes en PDF.
- [ ] Implementar Chatbot de IA (RAG) consumiendo exclusivamente el Blog y Glosario.
- [ ] Añadir animaciones progresivas (Framer Motion / Viewport CSS) a toda la página de DDC.
- [ ] Construir Centro de Webinars y Demos On-Demand (Videos cerrados contra captura de lead).
- [ ] Implementar un Hero Banner inteligente (Personalización dinámica de contenido).
- [x] **Chatbot Geo-Proactivo (UX sin dañar SEO):** Programar el indicador visual del chat (el tooltip naranja) para que muestre mensajes proactivos (Ej. "¡Promo exclusiva para México!") si detecta coincidencias con IPs geolocalizadas.
- [x] **Memoria Conversacional Corto Plazo (Zero-Friction):** Migrar el estado del chat (`useState`) hacia al almacén global `nanostores` e inyectar persistencia en `localStorage` para que el chat no se borre si el usuario cambia de página o refresca el sitio web antes de dar sus datos.
- [ ] **Memoria Conversacional Largo Plazo (Perfilado Progresivo):** Conectar la UI del chat a **Supabase**. Cuando un "Usuario Anónimo" madura y registra su correo, el bot vuelca todo su historial del `localStorage` directo al CRM del backend para tener un registro histórico vitalicio cruzando dispositivos.

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
