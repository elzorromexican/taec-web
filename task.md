# Checklist Consolidado de Tareas Pendientes (TAEC Web)
*Este documento unifica permanentemente todas las tareas y roadmaps (Fase 1, Fase 2, DDC, Ecommerce y Completadas) en una sola fuente de verdad.*

## 🚀 Prioridades Inmediatas (Siguiente Sesión - Titanes y Fase 2)
- [x] **Presentación y QA Intranet B2B (Titanes):** Revisión global de la KB en Supabase con el equipo comercial y validación final de la experiencia de usuario B2B. Estandarización SQL ejecutada.
- [x] **Semillas Restantes de Playbooks:** Procesar `vyondgo`, `vyondmobile` y `reach360` aplicando la misma arquitectura de sanitización y formateo `\n\n` validada hoy, logrando la disponibilidad completa del catálogo.
- [x] **Consolidación KB Vyond Enterprise:** Procesamiento y generación del script semilla `docs/supabase-interno-seed-vyondenterprise.sql` de troubleshooting, técnica y comercial. Se aplicó lógica rigurosa de fusión (Respuesta + El Plus) y depuración Regex profunda para texto plano B2B.
- [x] **Despliegue a Producción (CI/CD):** Fusión exitosa de la rama `feature/ddc-calculadora` a `main`. Netlify Production y GitHub Pages apuntan activos a main bajo el MVP v6.0 B2B.
- [x] **Integración Supabase e Intranet B2B:** Refactorización de infraestructura y autenticación segura con SSR y middleware estricto de dominio e-mail corporativo.
- [ ] **Auditoría Resend Handoff:** Revisar payloads transaccionales de `send-transcript.ts` con sanitización XSS para asegurar transcritos limpios en CRM.
- [ ] **Context-Hopping Final:** Validar las recomendaciones dinámicas espaciales de Tito Bits al cruzar ecosistemas en Front-End.
- [ ] **Deuda Técnica UI:** Actualizar Zoho Bookings URL (`taec.zohobookings.com`), eliminar `emailjs.ts` obsoleto si aplica, e inyectar `<Image>` tags nativos en Assets para CLS cero absoluto.
 
## 🛠️ Auditoría QA Intranet (Fixes Pendientes)
**Score de salud: 67 / 100** — Base sólida, gaps claros.

**🔴 1 Crítico**
- [x] **[ISSUE-006] Admin sin role-guard:** `/interno/admin` no verifica `Astro.locals.rol !== 'admin'` en el servidor (Fix completado).

**🟠 1 Alto**
- [x] **[ISSUE-010] Nota interna visible al usuario:** En `/colaborar`, el texto sobre "Bases de datos en la siguiente fase" debe reemplazarse por un mensaje amigable.

**🟡 QA Audit - UI/UX & Flow (P1)**
- [x] [ISSUE-015] Intranet: 'Active' state del Sidebar mal manejado por JS-client, debería usar Astro.url
- [x] [ISSUE-001] Dashboard: Los enlaces del Grid redireccionan a # pero aparentan estar funcionales.
- [x] [ISSUE-010] Intranet: Formulario de colaboración permite submit sin validación ni conexión real.
- [x] [ISSUE-011] Intranet: Falta feedback visual en el Form de sugerencias y en Tabuladores deshabilitados.
- [x] [ISSUE-013] Tabuladores: Enlace "Precios Internacionales" roto.
- [x] [ISSUE-007] Admin Panel: Botones "Lanzar Supabase" y "Abrir Bandeja" tienen fallback débil o roto.
- [x] [ISSUE-002] Dashboard: Posible desbordamiento visual y doble scroll en responsive mobile (Height 100vh check).
- [x] [ISSUE-017] Admin Panel: Limitar visibilidad del link "Panel Admin" estrictamente a ROLES = Admin.

## 📌 Operaciones Recientes (Corto Plazo)
- [x] **Auditoría UI/UX Claude (Home e Intranet B2B):** Remoción de widget inyectado de Netlify Identity para purgar CORS global; inyección de atributos de accesibilidad ARIA en *cards* desactivadas del Dashboard; mitigación de colisiones CSS `margin-left` en la Intranet a tamaño tablet; depuración de urls huérfanas en el footer (`/soluciones` y `/contacto`); y blindaje lógico para el *Ticker del Blog* (`index.astro`) descartando artículos heredados pre-2024 para proteger el índice general.
- [x] **Consolidación KB Vyond Studio (Anti-Duplicados y Zero HTML):** Procesamiento e inyección del script semilla (38 registros). Se implementó arquitectura SQL idempotente (`DELETE FROM`) para evitar *bloating*, purga radical con RegEx de basura de extracción (`[1]`, `[LinkedIn]`), y rescate semántico B2B ("Información no disponible") empaquetado exclusivamente con strings nativos `\n\n` en lugar de bloques brutos de HTML.
- [x] **Consolidación KB Localization 360:** Procesamiento, fusión semántica (Respuesta + Plus) e inyección del script semilla `docs/supabase-interno-seed-localization.sql` (21 registros) para la matriz B2B.
- [x] **Consolidación KB Review 360:** Procesamiento, deduplicación e inyección del script semilla `docs/supabase-interno-seed-review360.sql` (21 registros) para expandir la matriz técnica y de troubleshooting de la Intranet B2B.
- [x] **Estabilización de UX Intranet e Identidad (Fase 2):** Extracción inteligente de identidad OAuth desde Supabase en `middleware.ts`, bypass cognitivo en Tito Bits para saltar formulario interno, remoción de widget de WhatsApp superpuesto en rutas privadas, y despliegue del script semilla `docs/supabase-interno-seed-storyline360.sql` (33 registros) conectando la 2da matriz comercial al Hub SSR.
- [x] **Auditoría y Blindaje de TitoBits (Red Team / P0 y P1):** Remoción completa de persistencia PII en Storage para GDPR, mitigación masiva de XSS y spam en el Handoff del correo (`escapeHtml` y Payload limits), solución al bug crónico de inyección doble hacia Gemini, filtrado estricto de roles en SSR, abort controller de 25s, migración de Geo a Netlify Edge Headers, y arreglo final del "Context Hopping" en SPA View Transitions.
- [x] Concluir ajustes de Quality Assurance (QA) fotográfico o estilístico en dispositivos móviles para las colecciones secundarias.
- [x] Preparación y revisión final previo al Embalaje / Deployment para entorno de Producción.
- [x] **Estabilización de UI Intranet B2B (Fixes):** Refactorización visual de *KBViewer* y *Playbook Hero* al estándar corporativo minimalista. Se resolvió de raíz el bloqueo de *Row Level Security (RLS)* inyectando tokens frescos SSR y se selló el SEO (`noindex`) de la red privada. Se implementó navegación inteligente (acordeones auto-expandibles) y prevención de bucles de redirección forzando SSR `prerender = false` global.
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
- [x] **Implementación Estándar LLMs:** Creación del archivo `llms.txt` en la raíz pública del sitio Astro mapeando y validando las URLs de los productos y páginas principales de acuerdo a la especificación llmstxt.org para agentes de IA.
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

## ✅ Sesión de Estabilización y Hardening — [05 abr 2026, 22:15]
*Deploy dual operativo · Auth Supabase completo · Seguridad blog · SEO · Docs actualizados*

- [x] **Fix dev server `__DEFINES__`:** Adapter Netlify cargado condicionalmente con `NETLIFY=true`. `output: 'server'` como default para local y Netlify. `ASTRO_STATIC_BUILD=true` en GH Actions para staging estático.
- [x] **OAuth Google completo:** Flujo login → callback → dashboard verificado en local y producción. 3 Redirect URLs registradas en Supabase.
- [x] **Seguridad comentarios blog (P0):** Endpoint SSR `/api/submit-comment.ts` con verificación Turnstile server-side + `SUPABASE_SERVICE_ROLE_KEY`. Fix de `loadComments()` con filtro `status=eq.approved` explícito.
- [x] **SEO:** `robots.txt` bloquea `/interno/`. `llms.txt` actualizado (+3 páginas). `BaseLayout.astro`: OG image funcional, `hreflang` dinámico, Schema.org usa `Astro.site`, fallback ChatAgent corregido.
- [x] **README.md:** Fusión y reescritura completa. Stack real: Gemini 2.5, Upstash Redis, Resend. GAS marcado obsoleto. API endpoints documentados. Enrutamiento geográfico documentado.
- [x] **Pendiente resuelto:** `serviceRoleKey` en middleware para whitelist `usuarios_autorizados` — `supabaseAdmin` separado con `SUPABASE_SERVICE_ROLE_KEY`, fallback a `anonKey` mientras no esté configurada.
- [x] **Pendiente resuelto:** `.env.example` documenta `SUPABASE_SERVICE_ROLE_KEY`, `CF_TURNSTILE_SECRET_KEY` y `PUBLIC_CF_TURNSTILE_KEY` con instrucciones de origen. **Acción manual requerida:** agregar estas 3 variables en Netlify → Site Settings → Environment Variables.

---

## 🛡️ Auditoría Operativa y Gobernanza B2B (Fase 3) - [05 abr 2026, 11:43 AM]
*Dictamen Arquitectónico: Plataforma en estado comercial-operativo. Riesgos de "código feo" mitigados. Foco transicionado a gobernanza, hardening y control fino.*

**🔴 Backlog Crítico (Hardening & Seguridad)**
- [ ] **Auditoría de Fuga de Tokens (SSR):** Rastrear paramétricamente el uso de `locals.accessToken`. Demostrar mediante tests o refactorización que este token radioactivo jamás se serializa, cruza al cliente, se imprime en logs o se expone en pre-visualizaciones.
- [ ] **Validación Estructural del Tarifario DDC:** Implementar un validador transversal (Zod/JSON Schema) que corra en el Hook de Build o como Test Unitario preventivo. Debe certificar que la matriz `ddc-pricing-matrix.json` no posee huecos lógicos, previniendo errores 500 por combinaciones `undefined`.
- [ ] **Monitoreo de Resiliencia en Contacto:** Inyectar telemetría básica al nuevo SSR API endpoint en `/api/submit-contact.ts`. Disparar una alerta automática si el SDK de Google Sheets entra en timeout o baja la tasa de éxito para evitar fuga silenciosa de leads.

**🟠 Backlog Alto (Gobernanza de Datos Locales)**
- [ ] **Single Source of Truth Comercial (Pricing):** Eliminar la deuda de contratos definiendo una fuente unificada. Constantes como `BASE_RATE_HH` deben vivir en `.env`, o bien la matriz JSON debe encapsular los márgenes pre-calculados, blindando el proyecto contra "mentiras estadísticas" por bifurcación de lógicas.
- [ ] **Logging Operativo en Nodos Core:** Agregar trazas analíticas de submit y correlación de errores mediante *Ids de transacción* tanto al enviador de correos (`Resend`) como al Cotizador Interno, permitiendo diagnósticos certeros en caliente.
- [ ] **Política de Control de Cambios:** Definir formalmente la ruta editorial y aprobación comercial requerida antes de sobreescribir la matriz de precios o los márgenes del Cotizador en GitHub.

**🟡 Backlog Medio (UX & Trazabilidad SSR)**
- [ ] **Arquitectura y A11y del Mega Menú:** Cirugía visual y semántica sobre la densidad del `navigation.ts` público para transicionar la retención de usuarios hacia "Casos de Uso", eliminando la sobrecarga cognitiva.
- [ ] **Trazabilidad de Errores Internos:** Sustituir los redireccionamientos masivos genéricos del `middleware.ts` en `/interno/*` por códigos analíticos finos (ej. Token inválido, Expirado, Dominio denegado, Usuario inactivo), inyectando observabilidad al modelo de seguridad Zero-Trust B2B.

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
- [x] **Cirugía Plástica y SEO Premium del Blog:** 
  - [x] Implementar un *layout* CSS moderno (glassmorphism flex) y microanimaciones para `index.astro`.
  - [x] Añadir inyección nativa de foto/cover predeterminada a nivel Astro para proteger viejos posts sin foto del CMS.
  - [x] Diseñar layout de alta legibilidad (`65ch`, `line-height`) e implementar la Barra de Progreso de Lectura dinámica en `[slug].astro`.
  - [x] Mejorar inyección OpenGraph en prop de `BaseLayout` para visualización rica en LinkedIn.
  - [ ] **Ruleta Dinámica de Insights (Cartuchos Hero):** Refactorizar los 7 Cartuchos estáticos del Ecosistema de Recursos (Blog, Artículos, Glosario, Comparativos, Estándares, Radar, Quiz). Conectar el bloque visual del `HeroComercial` hacia una colección del CMS para generar una "Ruleta Aleatoria" e inyectar un **Trigger de modificación/alerta de cambio** en el Dashboard.

**3. Portal de Distribuidores (B2B Intranet)**
- [x] Configurar Stack de Autenticación (Supabase + Google OAuth con SSR Middleware limitando `@taec.com.mx`).
- [x] Crear la interfaz segura (Ruta `/interno/kb` con visor interactivo de Base de Conocimientos).
- [x] Construir y diseñar el `IntranetLayout` con Sidebar global y navegación premium Vanilla CSS.
- [x] Crear el Lobby (`/interno/dashboard`) para panel de avisos rápidos (News).
- [x] Migrar el visor de KB hacia una ruta dinámica `/interno/playbooks/[producto].astro` que soporte Articulate, Vyond, DDC, Class, LYS, PIFINI, Proctorizer, etc.
- [x] Definir tabla en Supabase `enlaces_internos` para inyectar dinámicamente ligas de cotizadores externos, páginas de proveedores y Google Drives sin código duro.
- [x] Reestructurar la base de datos `usuarios_autorizados` añadiendo control de acceso por `rol` (Admin vs Empleado).
- [x] Construir flujos `/interno/colaborar` (Formularios para cualquier empleado) y `/interno/admin` (Validaciones de administrador).

**4. Moderación de Comentarios (Blog Backend)**
- [ ] Diseñar el modelo de BD relacional para comentarios y roles de usuario.
- [ ] Restablecer el componente `BlogComments.astro` inyectando protección Anti-Spam (Turnstile/reCAPTCHA).
- [ ] Generar API Endpoint seguro de creación con estado natural "Pendiente".
- [ ] Construir vista/flujo "Moderador" para aprobación de comentarios en vivo.

**5. Plataforma E-Commerce Completa**
- [ ] Definir Stack E-commerce y modelar licenciamiento/variantes en catálogos.
- [ ] Integrar Pasarela de Pagos (Stripe / MercadoPago) nativa para MXN/USD.
- [ ] Construir Carrito de Compras, Checkout y - [x] Testear sistema de geo-detección *on-the-fly* (Colombia vs General).metrizar automatización de correos transaccionales post-compra.
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
- [x] Construir "Assessment Operativo / Diagnóstico" con generación matemática de ecosistemas de 8 ejes (DC-3, Proctoring, LMS, Autor). Dispara un endpoint webhook para parsear en caliente el Horóscopo Radial en HTML y empujar prospectos cualificados directo a Zoho Bookings.
- [ ] Implementar Chatbot de IA (RAG) consumiendo exclusivamente el Blog y Glosario.
- [ ] Añadir animaciones progresivas (Framer Motion / Viewport CSS) a toda la página de DDC.
- [ ] Construir Centro de Webinars y Demos On-Demand (Videos cerrados contra captura de lead).
- [ ] Implementar un Hero Banner inteligente (Personalización dinámica de contenido).
- [x] **Chatbot Geo-Proactivo (UX sin dañar SEO):** Programar el indicador visual del chat (el tooltip naranja) para que muestre mensajes proactivos (Ej. "¡Promo exclusiva para México!") si detecta coincidencias con IPs geolocalizadas.
- [x] **Memoria Conversacional Corto Plazo (Zero-Friction):** Migrar el estado del chat (`useState`) hacia al almacén global `nanostores` e inyectar persistencia en `localStorage` para que el chat no se borre si el usuario cambia de página o refresca.
- [x] **Hard Reset QA:** Botón nativo provisional en la barra superior para purgar `Nanostores` a voluntad, solventando el problema de Testing de calidad ("cómo probar una sesión virgen").
- [ ] **Refactor de Tracking de Sesión (CRÍTICO PRE-PROD):** Reemplazar el botón de *Hard Reset* actual por una solución de tracking que no elimine data del CRM. Alternativas levantadas en Modo Reflexión para debatir al momento de integrar Supabase: a) `Soft Reset` (Dividir historial visual ocultando mensajes anteriores al cliente pero conservándolos en Base de Datos), b) `Expiración por Tiempo` (limpieza automática cada 24 hrs), c) `Finalizar Consulta` (Enviar ticket y cerrar lead vía botón), o d) Ocultar el botón nativamente mediante variable de Producción (`!import.meta.env.PROD`).
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
