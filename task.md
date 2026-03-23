# Checklist Consolidado de Tareas Pendientes (TAEC Web)
*Este documento unifica todas las tareas pendientes detectadas en los historiales de IA, sub-carpetas y el Roadmap de Fase 2.*

## 📌 Ajustes Recientes y Operaciones (Corto Plazo)
- [x] Revisar viabilidad técnica e integración de Backend sin servidor (BaaS o Email Relay) para volver funcional el Componente `BlogComments.astro`.
- [x] Concluir ajustes de Quality Assurance (QA) fotográfico o estilístico en dispositivos móviles para las colecciones secundarias.
- [x] Preparación y revisión final previo al Embalaje / Deployment para entorno de Producción.

## 🛠️ Cotizador DDC (Estimador de Costos Web)
**Fase de Definición**
- [x] Extraer tabuladores fantasma del Excel original: `pmFromInstructionalDesign` y `pmFromGraphicDesign`. *(Revisado: Las matrices ya entregan Horas Hombre totales agrupadas).*
- [x] Extraer variables faltantes para Rise: `instructionalDesignMinutesPerBlock` y `blocksPerPage`. *(Revisado: Las matrices ya entregan HH para Rise por combinaciones directas).*
- [x] Definir explícitamente el valor de amortización para `internalLicenseCostPerVideo` en Vyond. *(Revisado: Vyond también está agrupado en su matriz).*
- [x] Eliminar del frontend las menciones a: `hourlyRate` (340), `margins` (0.5 y 0.3).
- [x] Decisión comercial: Definir si el toggle de `banco_imagenes` sumará valor o se elimina del MVP. *(Se eliminó del schema Zod)*
- [x] Decisión comercial: Aclarar en el disclaimer si el estimado es *antes de IVA*.

**Configuración Backend y Pruebas**
- [x] Convertir la configuración de `astro.config.mjs` para habilitar `output: 'server'` o `'hybrid'`.
- [x] Crear el archivo `.env` para almacenar en crudo: tarifas HH, márgenes brutos, y costos de licencias en la nube (seguros).
- [x] Crear la Astro API Route `src/pages/api/calcular-cotizacion-ddc.ts`.
- [x] Implementar validador Zod Schema para sanitizar los payloads entrantes (`duracion`, `nivel_di`, etc).
- [x] Codificar el motor de estimación derivado de 3 productos limitados (Storyline, Rise, Vyond).
- [ ] Validar EndPoint contra 5 cotizaciones históricas reales sacadas del Excel (margen de error ≤ ±15%).

**Fase Frontend**
- [x] Diseñar Componente Island en React o Svelte (`CotizadorDDC`) embebido en la landing. *(Embebido en admin/cotizador.astro)*
- [x] Integrar el formulario de inputs limpios estandarizados para el usuario.
- [x] Realizar Fetch pasivo y asíncrono al endpoint.
- [x] Mostrar en UI el resultado encapsulado (`"Desde $XX,XXX MXN"`) e inyectar *disclaimer* legal.
- [ ] Hacer POST webhook enviando los datos cotizados hacia Zoho CRM si capturamos el lead.

## 💼 Portafolio y Centro de Demos DDC
- [ ] Analizar base de datos de Demos (Google Sheets) para integrar un "Portafolio / Centro de Demos" interactivo a la página de DDC.
- [ ] Estructurar la UI/UX del portafolio.

## 🗺️ Roadmap Fase 2 (Vista Checklist)
**1. Rediseño y Distribución de Menú**
- [ ] Eliminar "Clientes" y "Casos de Uso" del Mega Menú (`navigation.ts`).
- [ ] Construir componente modular `CasoUsoInline.astro` e inyectarlo en landings principales.

**2. Ecosistema de Recursos**
- [ ] Limpiar archivos de prueba físicos residuales en `blog/` y `articulos/`.
- [ ] Aplicar diseño UX premium (Layout Sala de Lectura) estandarizado para artículos.
- [ ] Validar integridad y semántica de todas las "Ligas Externas".
- [ ] Construir la landing `/recursos/tips-y-hacks` con diseño tipo repositorio de tarjetas.
- [ ] Implementar interlinking circular entre Glosario y Blog.
- [ ] Redactar el manual operativo `docs/mantenimiento-recursos.md`.

**3. Portal de Distribuidores (B2B Intranet)**
- [ ] Configurar Stack de Autenticación (Supabase, Firebase, o Clerk).
- [ ] Crear la interfaz segura (Dashboard, Avisos) y la sección privada de descarga de "Machotes".
- [ ] Construir y conectar el formulario "Registro de Oportunidades" a base de datos externa.

**4. E-Commerce y Pagos**
- [ ] Definir Stack E-commerce y modelar licenciamiento/variantes.
- [ ] Integrar Pasarela de Pagos (Stripe / MercadoPago) nativa para MXN/USD.
- [ ] Construir Carrito de Compras, Checkout y flujo de recolección de CFDI.
- [ ] Parametrizar automatización de correos transaccionales post-compra.
- [ ] Crear panel administrativo de Órdenes (OMS).

**5. Arquitectura y Globalización**
- [ ] Definir estrategia de Astro Multi-Tenant o subcarpetas para Multi-Región (CO / CL).
- [ ] Configurar lógica de Ruteo i18n nativo, arquitectura de diccionarios UI y refactorizar componentes (EN, PT-BR, FR).
- [ ] Implementar Selector Animado de Idiomas.
- [ ] Integrar servicio resolutor de GeoIP (Anti-VPN) para precio especial (MXN orgánico).

**6. Herramientas Interactivas y UI Premium**
- [ ] Enlazar arquitecturas Hub & Spoke (Articulate, Vyond, Totara, DDC).
- [ ] Construir "Assessment de Madurez E-learning" con generación automática de reportes PDF.
- [ ] Añadir animaciones progresivas (Framer Motion / Viewport) a la landing DDC.
- [ ] Implementar Chatbot de IA (RAG) consumiendo Blog y Glosario.
- [ ] Construir Centro de Webinars On-Demand (captura de leads) y Hero Banner inteligente.
