# ROADMAP DE EXPANSIÓN (TAEC Web Fase 2)
*Hoja de ruta estratégica posterior a la liberación de v3.1.0*

---

## 1. Rediseño y Distribución de Menú (Quick Win)
**Objetivo:** Descentralizar los casos de éxito del Mega Menú y colocarlos en el recorrido comercial.
- [ ] Eliminar "Clientes" y "Casos de Uso" del Mega Menú (`navigation.ts`).
- [ ] Construir componente modular `CasoUsoInline.astro` (Testimonios/Casos de éxito).
- [ ] Inyectar el componente dinámicamente en las landings principales de producto.

## 2. Ecosistema de Recursos
**Objetivo:** Crear un Hub de conocimiento estandarizado y fácil de mantener.
- [ ] Limpiar los archivos de prueba físicos residuales en `blog/` y `articulos/`.
- [ ] Aplicar diseño UX premium (Layout Sala de Lectura) estandarizado para artículos.
- [ ] Validar integridad y semántica de todas las "Ligas Externas".
- [ ] Construir la landing `/recursos/tips-y-hacks` con diseño tipo repositorio de tarjetas.
- [ ] Implementar interlinking circular entre Glosario y Blog (etiquetas y términos relacionados) para aumentar retención de usuarios.
- [ ] Redactar el manual operativo `docs/mantenimiento-recursos.md`.

## 3. Portal de Distribuidores (B2B Intranet)
**Objetivo:** Subdominio/ruta protegida con Auth para los partners.
- [ ] Configurar Stack de Autenticación (Supabase, Firebase, o Clerk).
- [ ] Crear la interfaz segura (Dashboard, Tablón de Avisos y Reglas generales).
- [ ] Construir y conectar el formulario "Registro de Oportunidades" a base de datos externa.
- [ ] Construir sección privada de descarga de "Machotes y Formatos".

## 4. Moderación de Comentarios (Blog Backend)
**Objetivo:** Revivir los comentarios protegiendo el sitio contra spam.
- [ ] Diseñar el modelo de BD relacional para comentarios y roles de usuario.
- [ ] Restablecer el componente `BlogComments.astro` inyectando protección Anti-Spam (Turnstile/reCAPTCHA).
- [ ] Generar API Endpoint seguro de creación con estado natural "Pendiente".
- [ ] Construir vista/flujo "Moderador" para aprobación de comentarios en vivo.

## 5. Plataforma E-Commerce Completa
**Objetivo:** Arquitectura de tienda B2B/B2C nativa.
- [ ] Definir Stack E-commerce y modelar licenciamiento/variantes en catálogos.
- [ ] Integrar Pasarela de Pagos (Stripe / MercadoPago) nativa para MXN/USD.
- [ ] Construir Carrito de Compras, Checkout y flujo estricto de recolección de CFDI.
- [ ] Parametrizar automatización de correos transaccionales post-compra.
- [ ] Crear panel rudimentario para la gestión administrativa de Órdenes (OMS).

## 6. Arquitectura Multi-Región (CO / CL)
**Objetivo:** Soportar clones locales del sitio sin duplicar archivos.
- [ ] Definir estrategia de Astro Multi-Tenant o subcarpetas dinámicas.
- [ ] Parametrizar variables de contacto, monedas corporativas y rutas `.co` / `.cl`.
- [ ] Adaptar layouts y colecciones para consumir el contenido periodístico segmentado por país.

## 7. Geo-Pricing y Pop-up Articulate (Anti-VPN)
**Objetivo:** Pop-up paramétrico de $1,198 USD exclusivo para México orgánico.
- [ ] Integrar servicio resolutor de GeoIP preciso (Edge/API).
- [ ] Evaluar bandera anti-VPN / *anonymous proxy* contra la request del visitante en tiempo real.
- [ ] Construir componente asíncrono en cliente para sobreescritura condicional de precio.
- [ ] Desplegar Banner/Pop-Up animado destacando la oferta de licenciamiento Teams + IA.

## 8. Traducción Total i18n (EN, PT-BR, FR)
**Objetivo:** Internacionalización global nativa.
- [ ] Configurar lógica de Ruteo i18n nativo en Astro (`astro.config.mjs`).
- [ ] Construir arquitectura de diccionarios UI (`src/i18n/ui.ts`).
- [ ] Refactorizar componentes compartidos para consumir las variables de idioma.
- [ ] Estructurar colecciones de contenido segmentadas por subcarpetas de lenguaje.
- [ ] Implementar un Selector Animado de Idiomas accesible en el `Header` principal.

## 9. Arquitectura de Soluciones (Hub & Spoke)
**Objetivo:** Crear un ecosistema de "páginas hijas" para detallar cada producto/servicio y aplicar la misma lógica de enlazado interno para UX y SEO comercial.
- [ ] **Articulate 360:** Enlazar las tarjetas principales (Storyline, Rise, Review, etc.) con sus respectivas landings secundarias que ya están listas.
- [ ] **Vyond:** Establecer el enlazado desde las tarjetas (Go, Studio, Mobile) hacia sus propias landings detalladas.
- [ ] **Totara:** Desarrollar desde cero las páginas hijas completas para **Totara Learn**, **Totara Perform** y **Totara Mobile**, y enlazarlas a la página matriz.
- [ ] **DDC (Desarrollo de Contenidos):** Construir desde cero sub-páginas ("deep dives") explicando los contenidos, metodologías y mostrando ejemplos prácticos/portafolio, enlazándolas desde la landing actual.

---

# GRAN FASE III: Innovación B2B y Generación de Leads Avanzada
*Integración de herramientas interactivas, IA, personalización y automatización de marketing.*

## 10. Herramientas Interactivas y Cotizadores (Lead Magnets)
**Objetivo:** Ofrecer valor, transparencia comercial y calificar prospectos automáticamente.
- [ ] **Calculadora "Estimador de Costos DDC" (MVP Web)**
  - Construir arquitectura **BFF (Backend for Frontend)**: El frontend solo enviará selecciones hacia un Endpoint seguro (`/api/cotizador-ddc`).
  - La lógica matemática, variables confidenciales (HH internas, márgenes), y JSON maestro vivirán **estrictamente en el servidor (Astro SSR)** para evitar ingeniería inversa comercial.
  - Exponer en la UI pública únicamente: Duración, Nivel DI/DM, Locución y Volumen.
  - Implementar validación estricta de *payloads* usando **Zod** para prevenir manipular inputs (ej. duraciones negativas).
  - Retornar un estimado "Desde $X MXN", con advertencia legal de precio referencial.
- [ ] Construir "Assessment de Madurez E-learning" con generación automática de reportes en PDF.

## 11. Asistente de IA (Knowledge Base RAG)
**Objetivo:** Asistente técnico inteligente entrenado solo con la base de conocimiento TAEC.
- [ ] Implementar un Chatbot de IA (RAG) que responda dudas consumiendo exclusivamente el Blog y Glosario.
- [ ] Configurar flujos resolutivos orientados a la conversión y contacto comercial.

## 12. Experiencia Visual Premium ("Scroll Storytelling")
**Objetivo:** Demostrar el expertise en DDC a través de un portafolio vivo.
- [ ] Añadir animaciones progresivas (Framer Motion / Viewport CSS) a toda la página de DDC.
- [ ] Construir componente "Deslizador interactivo Antes/Después" (PDF vs Curso Interactivo).

## 13. Automatización Educativa y Contenido Dinámico
**Objetivo:** Nutrir leads en automático e incrementar relevancia en visitas recurrentes.
- [ ] Construir Centro de Webinars y Demos On-Demand (Videos cerrados contra captura de lead).
- [ ] Implementar un Hero Banner inteligente (Personalización dinámica de contenido según los intereses de navegación detectados en vistas previas).
