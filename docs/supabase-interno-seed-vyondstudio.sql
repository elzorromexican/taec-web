-- ==========================================
-- TAEC KB Vyond Studio & AI Avatars — INSERT COMPLETO
-- Versión: v1.0
-- Fecha: 2026-04-05
-- Owner: Dirección Comercial TAEC
-- ==========================================

-- 1. LIMPIEZA PREVIA PARA EVITAR DUPLICADOS
DELETE FROM kb_items WHERE producto = 'vyondstudio';

-- 2. INSERCIÓN DE DATOS LIMPIOS
INSERT INTO kb_items (
  producto, seccion, seccion_label, seccion_color, orden,
  pregunta, plus, menos, fuente, activo, audiencia
) VALUES

-- ==========================================
-- SECCIÓN: MATRIZ COMERCIAL
-- ==========================================
(
  'vyondstudio', 'comercial', 'Matriz Comercial', '#185FA5', 10,
  '¿Qué es Vyond Studio y qué capacidades principales ofrece?',
  'Vyond Studio es un editor de video completo de arrastrar y soltar, basado en IA, que permite crear videos profesionales rápidos con estilos animados y fotorealistas, integración de avatares, traducción instantánea a 80+ idiomas, voz a texto avanzada y exportación a LMS/hosting. Vyond Studio agrupa plantillas, estilos visuales, herramientas de colaboración y funciones de IA (incluyendo avatares) en un solo entorno.

🟢 El Plus: Flujo integrado de guion → avatares → edición → exportación; combinación de animación plus avatares realistas en un solo editor.',
  'No es un NLE profesional (Premiere/Premiere Pro); pensado para video corporativo repetible, no para producción tele‑cinematográfica.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'comercial', 'Matriz Comercial', '#185FA5', 20,
  '¿Qué es Vyond AI Avatars y en qué se diferencia de Vyond Go?',
  'Vyond AI Avatars son presentadores digitales realistas (1.100+ opciones) que narran contenidos con voz a texto en 80+ idiomas, pensados para videos corporativos (capacitación, sales, onboarding). A diferencia de Vyond Go (generador de guion/vídeo rápido), los avatares se integran dentro de Vyond Studio y permiten edición avanzada, mientras que Vyond Go prioriza generación rápida tipo “auto‑video” sin tantas capas de refinamiento.

🟢 El Plus: Permite host digital repetible, personalizable y multilingüe, sin necesidad de filmación ni actores.',
  'Vyond Go es más limitado en estilos y controles, lo que limita la personalización fina frente a Studio.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'comercial', 'Matriz Comercial', '#185FA5', 30,
  '¿En qué casos de uso se posicionan Vyond Studio + AI Avatars según la documentación oficial?',
  'Casos declarados: capacitación interna, onboarding, demo de producto, comunicaciones internas, e‑learning, marketing corporativo, ventas y soporte (vídeos tutoriales con avatares). Los avatares se usan como presentadores en talking‑head, combinados con screencast, gráficos y animación para escalabilidad y actualización rápida.

🟢 El Plus: Se reutilizan los mismos avatares para múltiples versiones de un curso (ej. idioma, rol), sin volver a filmar.',
  'Para piezas muy narrativas o de alta expresividad emocional, clientes reportan que un locutor real o un actor real sigue siendo preferido.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'comercial', 'Matriz Comercial', '#185FA5', 40,
  '¿Qué capacidades de AI Avatars incluye el plan Profesional (sin mencionar Starter/Agency)?',
  'Profesional incluye acceso a AI Avatars, 1.100+ avatares, 2.700 voces en 70+ idiomas, generación de avatares por texto‑prompt, intercambio de fondo y transparencia, uso de créditos AI (20.000 por usuario/mes), edición en Vyond Studio, pantalla de fondos y voces mediante texto a voz, integración con plantillas y estilos animados.

🟢 El Plus: Permite crear avatares personalizados (por solicitud) y generarlos por texto, con buena quantía de créditos para uso diario.',
  'Créditos limitados por usuario/mes; para uso intensivo en grandes equipos se llega rápido al límite.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'comercial', 'Matriz Comercial', '#185FA5', 50,
  '¿Qué capacidades de AI Avatars incluye el plan Enterprise (solo ellos)?',
  'Enterprise incluye lo del plan Profesional, pero con créditos “prácticamente ilimitados” para avatares, voces ultra‑HQ, suite de marca (kits de marca, logotipos, paletas), controles avanzados de colaboración, integración SSO/SCIM, políticas de seguridad empresarial (Vyond Secure Suite) y gestión unificada de permisos.

🟢 El Plus: Créditos casi ilimitados permiten producción masiva (capacitación global, múltiples idiomas) sin preocuparse por cuota.',
  'Precios y complejidad administrativa son altos para PYMEs; orientado a grandes corporaciones.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'comercial', 'Matriz Comercial', '#185FA5', 60,
  '¿Cuáles son diferenciadores de Vyond Studio + AI Avatars frente a Vyond Go?',
  'Vyond Studio + AI Avatars ofrece edición avanzada, más estilos visuales, control de escenas, integración de avatares en línea de tiempo, uso de plantillas customizadas, traducción por escena, y exportación SCORM/PPT/PNG, mientras Vyond Go se centra en generación rápida de guion‑a‑vídeo con IA, más limitado en edición y personalización fina.

🟢 El Plus: Vyond Studio permite ajustes de cámara, fondos, texto y sincronización de avatares, aprovechando el ecosistema de assets y estilos.',
  'Vyond Go es más simple para usuarios puntuales, pero menos potente para L&D y branding corporativo.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'comercial', 'Matriz Comercial', '#185FA5', 70,
  '¿Cuáles son diferenciadores de Vyond Studio + AI Avatars frente a Synthesia y HeyGen?',
  'Vyond integra avatares dentro de un editor de video completo (animación, plantillas, screencast, estilos mixtos), mientras Synthesia y HeyGen se centran casi exclusivamente en avatares photorealistas en talking‑head. Vyond ofrece más estilos animados y workflows de video corporativo, mientras Synthesia/HeyGen ofrecen workflows más simples específicos para avatars.

🟢 El Plus: Vyond permite combinar avatares con animación y gráficos, útil para e‑learning y flujos LMS; no solo “talking‑head”.',
  'Synthesia/HeyGen ofrecen mayor rapidez y simplicidad cuando solo se quiere un avatar frente a cámara, sin necesidad de aprendizaje de editor completo.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'comercial', 'Matriz Comercial', '#185FA5', 80,
  '¿Qué ventajas comerciales reales mencionan clientes globales sobre Vyond Studio + AI Avatars?',
  'Clientes corporativos mencionan aceleración de la producción (de 3–5 días a 1 día), reducción de costes de filmación, capacidad de actualizar contenidos rápidamente, uso de avatares para capacitación global multilingüe y escalabilidad en múltiples equipos.

🟢 El Plus: Facilita alinear narrativa corporativa global con un mismo avatar, eliminando sesiones de grabación locales.',
  'Para contenidos muy complejos o narrativas muy dramáticas, algunos equipos siguen complementando con video real.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'comercial', 'Matriz Comercial', '#185FA5', 90,
  '¿Qué limitaciones comerciales reales reportan usuarios sobre Vyond Studio frente a otras herramientas de video corporativo?',
  'Entre usuarios, se menciona que Vyond Studio es potente para video corporativo estándar, pero menos adecuado para producción de alta resolución cinematográfica, integración profunda con Adobe Premiere, o workflows de edición avanzada de motion graphics.

🟢 El Plus: Permite producción rápida y uniforme para L&D, marketing interno y onboarding, sin necesidad de equipos de video.',
  'Quienes trabajan con proyectos de motion design o post‑producción avanzada mantienen Adobe After Effects/Premiere como complemento obligatorio.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'comercial', 'Matriz Comercial', '#185FA5', 100,
  '¿Qué capacidades de Vyond Studio y AI Avatars incluye el plan Profesional?',
  'El plan Profesional incluye: Vyond Studio completo, generación de video por IA (Vyond Go), importación de PPTX para convertir diapositivas en video, traducción automática de texto, exportación/importación masiva de texto, generación de imágenes por IA (Texto a Imagen), y voces de alta calidad para texto a voz (Ultra High Quality). El acceso a AI Avatars requiere una compra adicional.

🟢 El Plus: La funcionalidad de exportar/importar texto en bloque acelera la localización y creación de series de videos. La función de traducción automática agiliza la adaptación de contenido a múltiples regiones.',
  'Vyond Go y el generador de personajes por foto están en fase Beta, lo que podría implicar errores o cambios futuros. Información no disponible sobre límites de uso de AI Avatars en el plan Profesional.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'comercial', 'Matriz Comercial', '#185FA5', 110,
  '¿Qué capacidades adicionales de Vyond Studio y AI Avatars ofrece el plan Enterprise sobre el Profesional?',
  'El plan Enterprise incluye todas las funcionalidades del plan Profesional más capacidades de gestión y marca: "Default Shared Spaces" (espacios compartidos por defecto anclados a la navegación de todos los usuarios) para distribuir plantillas de marca y materiales de onboarding. Además, se integra con Vbrick para gestión, distribución y análisis de video con cumplimiento normativo (FedRAMP, GDPR).

🟢 El Plus: La función "Default Shared Spaces" asegura la consistencia visual de la marca en toda la organización y facilita la estandarización. La alianza con Vbrick proporciona un flujo de trabajo completo desde la creación hasta la distribución segura y analítica para empresas reguladas.',
  'Información no disponible sobre diferencias en límites de uso de AI Avatars entre planes Profesional y Enterprise.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'comercial', 'Matriz Comercial', '#185FA5', 120,
  '¿Cuál es el diferenciador clave entre Vyond Studio y Vyond Go?',
  'Vyond Studio es el editor tradicional para control total sobre la animación. Vyond Go es una herramienta de generación de video por IA que crea videos a partir de prompts, documentos subidos o URLs. Vyond Go está disponible en todos los planes.

🟢 El Plus: Vyond Go acelera la creación de borradores a partir de contenido existente, que luego se pueden refinar en Vyond Studio. La integración con Google Docs permite generar videos directamente desde un documento.',
  'Información no disponible sobre limitaciones específicas de Vyond Go frente al Studio completo en términos de opciones de edición o personalización.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'comercial', 'Matriz Comercial', '#185FA5', 130,
  '¿Qué casos de uso corporativos están documentados para Vyond Studio y AI Avatars?',
  'Onboarding de ventas: Una empresa tecnológica global redujo un curso de onboarding de 2.5 horas a 30 minutos (80% menos) usando Vyond para crear personajes interactivos (CFO, CIO) y roleplays, logrando una alta retención. Capacitación y comunicación interna: Creación de videos cortos sobre casos de éxito de clientes, módulos de e-learning completos y videos promocionales para sesiones de entrenamiento en vivo. Contenido de presentación: Uso de plantillas con espacio dedicado para insertar un AI Avatar o video propio como presentador.

🟢 El Plus: Vyond permite transformar contenido textual "seco" en experiencias interactivas y "divertidas", mejorando la efectividad del entrenamiento. La combinación de AI Avatars con plantillas profesionales acelera la producción de contenido impactante.',
  'Información no disponible sobre casos de uso específicos que fallen o no cumplan expectativas.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'comercial', 'Matriz Comercial', '#185FA5', 140,
  '¿Cómo se comparan los AI Avatars de Vyond con competidores (Synthesia, HeyGen)?',
  'Vyond se asocia con proveedores externos de AI Avatars, incluyendo Tavus y HeyGen, para ofrecer una biblioteca de más de 1,100 opciones de alta calidad, incluyendo looks por industria (ej. construcción, servicio al cliente). A diferencia de Synthesia o HeyGen que son plataformas centradas en avatares, Vyond integra estos avatares dentro de su estudio de animación completo.

🟢 El Plus: La integración de múltiples proveedores de avatares (HeyGen, Tavus) dentro de una plataforma de animación tradicional es un diferenciador clave. Los usuarios pueden combinar AI Avatars con animaciones tradicionales, gráficos y personajes personalizados en un solo video.',
  'Información no disponible sobre comparativas directas de calidad de avatar, realismo o precio entre Vyond y Synthesia/HeyGen. La dependencia de socios externos para la tecnología de avatares podría implicar menos control sobre la hoja de ruta de funcionalidades.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'comercial', 'Matriz Comercial', '#185FA5', 150,
  '¿Qué integraciones con LMS y herramientas corporativas existen?',
  'Vbrick (Enterprise): Integración estratégica para gestionar, distribuir y analizar videos con seguridad de grado empresarial (FedRAMP, GDPR). Google Workspace: Un add-on permite crear videos desde Google Docs usando Vyond Go. Articulate Storyline: Vyond se integra en flujos de trabajo exportando videos para ser importados en cursos de e-learning creados con Storyline.

🟢 El Plus: La integración con Vbrick ofrece un flujo completo y auditable para empresas reguladas, solucionando la necesidad de distribución y analytics seguros. La integración nativa con Google Docs agiliza la creación de video a partir de documentación existente.',
  'Información no disponible sobre integraciones nativas directas con LMS específicos (ej. Moodle, Cornerstone, SuccessFactors) más allá del flujo de trabajo estándar de exportar/importar archivos de video.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
-- ==========================================
-- SECCIÓN: MATRIZ TÉCNICA
-- ==========================================
(
  'vyondstudio', 'tecnica', 'Matriz Técnica', '#0F6E56', 160,
  '¿Cómo es el flujo de producción típico de Vyond Studio + AI Avatars?',
  '1) Crear proyecto en Vyond Studio, 2) elegir avatar en la sección de AI Avatars, 3) ingresar guion, seleccionar idioma y voz, 4) generar video de avatar, 5) editar en Vyond Studio (cámara, escenas, texto, screencast, gráficos), 6) traducir automáticamente a otros idiomas, 7) exportar en MP4/SCORM/PNG/PPT.

🟢 El Plus: Todo el flujo permanece dentro de Vyond Studio, sin necesidad de exportar a otro editor.',
  'Algunos usuarios reportan que la edición de líneas de voz en avatares es menos ágil que la edición de texto‑a‑voz en personajes animados tradicionales.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'tecnica', 'Matriz Técnica', '#0F6E56', 170,
  '¿Qué niveles de personalización tienen los AI Avatars (voz, idioma, apariencia)?',
  'Los avatares se vinculan a 2.700+ voces en 70+ idiomas, con ajuste de tono, velocidad y pitch. Visualmente se pueden elegir fondo estándar o cambiarlo por imágenes personalizadas, atuendo (formal/casual), y tipo de presentador; mediante solicitudes de Vyond también se pueden crear avatares customizados parecidos a personas reales.

🟢 El Plus: Soporte multilingüe robusto y posibilidad de avatares “a la medida” de marca o persona.',
  'No todos los avatares son igualmente realistas en todos los idiomas, y la calidad de la voz varía según idioma y voz seleccionada.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'tecnica', 'Matriz Técnica', '#0F6E56', 180,
  '¿Qué formatos y opciones de exportación ofrece Vyond Studio para AI Avatars?',
  'Exporta a MP4 HD, 1080p, descarga de audio separado, GIF animado, SCORM ZIP, PNG y PPTX. Los avatares se pueden exportar con fondo transparente, integrarse en plantillas e‑learning o combinarse con screencast y gráficos.

🟢 El Plus: Exportación SCORM facilita la integración directa en LMS sin middlewares.',
  'Los avatares en fondo transparente presentan bordes visibles en algunos casos, lo que obliga a usar fondos estándar o correcciones externas.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'tecnica', 'Matriz Técnica', '#0F6E56', 190,
  '¿Cuáles son límites técnicos de uso de AI Avatars por plan (Profesional vs Enterprise)?',
  'Professional consume créditos por generación de avatares (por 10 caracteres de texto), con límites mensuales de crédito; Enterprise ofrece créditos “prácticamente ilimitados”. Ambos planes usan los mismos renderizados de avatar, pero Enterprise permite escalar a muy alta frecuencia de uso.

🟢 El Plus: Enterprise permite producción masiva de avatares para grandes programas de capacitación global sin cuota de créditos.',
  'Profesional puede quedarse corto en equipos muy grandes o con uso intensivo de avatares, obligando a revisar créditos.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'tecnica', 'Matriz Técnica', '#0F6E56', 200,
  '¿Cómo se integran Vyond Studio y AI Avatars con LMS y herramientas corporativas?',
  'Vyond Studio genera exportaciones SCORM, decodifica audio y permite empaquetar contenido en LMS; además se integra parcialmente con Google Docs, Slack, Zapier y Shutterstock. Los avatares pueden formar parte de módulos SCORM o de videos embebidos en plataformas de L&D.

🟢 El Plus: Facilita flujos de autoría rápida de módulos e‑learning con narradores avatares, sin necesidad de grabación real.',
  'Integraciones nativas con LMS específicos (ej. Moodle, Cornerstone) requieren trabajo adicional de configuración o están limitadas.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'tecnica', 'Matriz Técnica', '#0F6E56', 210,
  '¿Qué requisitos de hardware y ancho de banda se recomiendan para Vyond Studio + AI Avatars?',
  'Vyond Studio es app web, no requiere instalación local pesada, pero se recomienda conexión estable para subir guiones, generar avatares y descargar vídeos. Los avatares usan recursos de servidor Vyond; se sugiere navegador moderno y cliente con al menos 8 GB de RAM para trabajar con proyectos complejos.

🟢 El Plus: No hay dependencia de descargas locales grandes; se ahorra en infraestructura de edición.',
  'Generación de avatares puede tardar según el servidor Vyond y el tráfico, generando tiempos de espera en alta carga.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'tecnica', 'Matriz Técnica', '#0F6E56', 220,
  '¿Qué restricciones de uso ético y biométrico aplican a AI Avatars en Vyond?',
  'Vyond menciona uso de avatares para comunicaciones corporativas respetuosas, recomendando transparencia cuando se usan avatares en lugar de personas reales. No se explicita recogida de datos biométricos de usuarios, pero sí que los avatares usan referencias de personas reales obtenidas con licencias de proveedores externos, lo que implica limitaciones de uso comercial y de derechos de imagen.

🟢 El Plus: Se enfatiza uso “responsable” y transparente, coherente con políticas de uso de IA de grandes empresas.',
  'No se detalla al 100% el origen de cada avatar ni el consentimiento individual, lo que genera pregunta en departamentos legales de algunos clientes.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'tecnica', 'Matriz Técnica', '#0F6E56', 230,
  '¿Qué tipo de integraciones con flujos L&D y marca corporativa ofrece Vyond Studio?',
  'Vyond Studio permite importar logos, crear kits de marca, aplicar paletas de color, importar fuentes y usar plantillas corporativas, lo que facilita alineación de avatares y videos con brand guidelines. Los avatares pueden usarse en módulos SCORM, microlearning y comunicaciones internas versionadas por rol/idioma.

🟢 El Plus: Alinea fácilmente narradores avatares con branding corporativo, útil para programas globales.',
  'Para marcas con guías de video muy específicas, a veces se requiere retoque de fondos y rotoscopía externa.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'tecnica', 'Matriz Técnica', '#0F6E56', 240,
  '¿Cómo se maneja la privacidad y el cumplimiento normativo en Enterprise?',
  'Enterprise incluye Vyond Secure Suite con controles como SSO, SCIM, IP whitelisting, logs de eventos, cumplimiento GDPR/CCPA, ISO27001 y Privacy Shield, dirigidos a requisitos de empresas grandes y de sectores regulados.

🟢 El Plus: Permite desplegar Vyond Studio y AI Avatars en entornos de alta seguridad sin necesidad de migrar a otra plataforma de video.',
  'Requiere que el cliente configure adecuadamente políticas de seguridad; no es “out‑of‑box” para todos los estándares regulatorios.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'tecnica', 'Matriz Técnica', '#0F6E56', 250,
  '¿Qué tipo de uso de marca y derechos de imagen se reconoce sobre los AI Avatars en Vyond?',
  'Los avatares listados son creaciones de Vyond y sus proveedores de IA; se otorgan derechos de uso comercial dentro de Vyond para videos corporativos, pero no se transfiere propiedad de los modelos de cabeza. Custom avatars por contrato con Vyond implican acuerdos específicos de propiedad y licencias de voz.

🟢 El Plus: Permite uso comercial amplio en videos corporativos sin licencias adicionales de actores.',
  'No se permite usar avatares como modelos de marca “propietarios” para publicidad masiva sin acuerdos específicos, limitando campañas de gran alcance.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'tecnica', 'Matriz Técnica', '#0F6E56', 260,
  '¿Cuál es el flujo de producción típico en Vyond Studio?',
  'El flujo de producción puede empezar con Vyond Go (IA), importando un PPTX, un documento o una URL. El contenido se convierte en un video base editable en Vyond Studio. En Studio, se pueden añadir o personalizar: personajes (incluso desde una foto), AI Avatars, voz en off (texto a voz), grÃ¡ficos (incluyendo importación de SVGs ), animaciones, transiciones y mÃºsica. Se puede dejar comentarios en un panel de notas para colaboración. Finalmente, se exporta en varios formatos.

🟢 El Plus: La capacidad de importar archivos PPTX y transformarlos en videos con transiciones y voz en off acelera la conversión de contenido existente. El panel de notas integrado facilita la revisión y colaboración sin salir del editor.',
  'El proceso de animación detallada es descrito como "improductivo" y "poco ergonómico" por usuarios avanzados que lo comparan desfavorablemente con After Effects.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'tecnica', 'Matriz Técnica', '#0F6E56', 270,
  '¿Qué opciones de personalización tienen los AI Avatars (voz, apariencia, idioma)?',
  'Apariencia: Hay más de 1,100 avatars en la biblioteca, incluyendo opciones por industria (construcción, servicio al cliente) y diversas etnias. Se pueden crear "Custom AI Avatars" a partir de fotos o selfies (función en Beta). Voz: Vyond ofrece numerosas voces de texto a voz, incluyendo opciones Ultra High Quality para planes Enterprise. Se añadieron recientemente cinco nuevas voces en chino mandarín (Xiaochen, Xiaoxiao, Yunyi, etc.). Idioma: La herramienta soporta traducción automática de todo el texto del video a otro idioma.

🟢 El Plus: La función "Generar un personaje a partir de una foto" permite crear rápidamente avatares personalizados de colegas, ideal para training corporativo. La actualización continua de voces (ej. nuevas voces en mandarín) mejora la localización.',
  'Límites de personalización: La personalización de avatares está sujeta a políticas de consentimiento y permisos de uso. Información no disponible sobre la capacidad de cambiar el fondo, ropa o accesorios de los AI Avatars de biblioteca más allá de las opciones predefinidas.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'tecnica', 'Matriz Técnica', '#0F6E56', 280,
  '¿Cuáles son los formatos de exportación y opciones de subtítulos?',
  'Al exportar, se puede elegir entre quemar (burn) los subtítulos en el video o descargar un archivo de subtítulos por separado. Los subtítulos se pueden previsualizar en el editor sin afectar la exportación final. Información no disponible sobre formatos de video específicos (MP4, MOV, etc.) o resoluciones máximas de exportación.

🟢 El Plus: La flexibilidad de exportar subtítulos quemados o como archivo separado es útil para diferentes plataformas de video y requisitos de accesibilidad.',
  'Un usuario reportó que la funcionalidad de exportar/importar texto para traducción "es una verdadera plaga: los tamaños saltan", lo que afecta gravemente el flujo de trabajo de localización.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'tecnica', 'Matriz Técnica', '#0F6E56', 290,
  '¿Cuáles son los requisitos técnicos (hardware/ancho de banda)?',
  'Información no disponible en los resultados de búsqueda. Se requiere una conexión a internet estable al ser una aplicación web. Las páginas de ayuda mencionan temas de "Browser and System Requirements", pero el contenido específico no fue proporcionado.

🟢 El Plus: Información no disponible',
  'Información no disponible',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'tecnica', 'Matriz Técnica', '#0F6E56', 300,
  '¿Cuáles son las restricciones de uso ético y biométrico de los AI Avatars?',
  'Existen políticas específicas para "Custom AI Avatars" que requieren "Consent and Sharing Permissions" (consentimiento y permisos para compartir). Vyond tiene un programa de "Responsible Disclosure" para vulnerabilidades de seguridad, lo que indica un compromiso con la seguridad de la información. La plataforma es FedRAMP Authorized y GDPR-compliant, especialmente en su integración con Vbrick.

🟢 El Plus: La existencia de guías sobre "Consent and Sharing Permissions" para avatares personalizados demuestra un esfuerzo proactivo en el uso ético de la imagen de las personas. El cumplimiento con FedRAMP y GDPR es crítico para clientes en sectores regulados.',
  'Información no disponible sobre políticas específicas de privacidad biométrica (ej. uso de datos faciales de la foto para generar el avatar, almacenamiento de estas imágenes).',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
-- ==========================================
-- SECCIÓN: TROUBLESHOOTING
-- ==========================================
(
  'vyondstudio', 'troubleshooting', 'Troubleshooting', '#D85A30', 310,
  '¿Cuáles son objeciones frecuentes reales de usuarios sobre AI Avatars frente a competidores?',
  'Usuarios reportan que las avatares de Vyond (vs. Synthesia/HeyGen) pueden requerir más pasos de edición en Studio, y que la edición de líneas de voz en avatares es menos fluida que la edición de texto‑a‑voz en personajes tradicionales de Vyond. Además, algunos comentan que el realismo varía según el avatar y el idioma.

🟢 El Plus: Mayor flexibilidad porque se integran avatares con otros elementos de video (animación, screencast).',
  'Learning curve de Vyond Studio más alto que los workflows de “avatar in‑one page” de Synthesia/HeyGen.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'troubleshooting', 'Troubleshooting', '#D85A30', 320,
  '¿Cuáles son las objeciones frecuentes y puntos de dolor validados por usuarios reales?',
  'Productividad y ergonomía: Usuarios en LinkedIn reportan que Vyond es "muy improductivo y poco ergonómico", haciendo que tareas simples sean "más largas y difíciles" que en herramientas como After Effects. Limitaciones de animación: La simplicidad de Vyond es un arma de doble filo; es rápido para resultados básicos, pero "cuando quieres afinar las cosas, te ves muy limitado" por las funcionalidades impuestas o limitadas (transiciones, movimientos). Estilo visual genérico: Los personajes y el estilo visual se perciben como "genéricos" y "desactualizados", creando un look común a todos los videos hechos con la herramienta.

🟢 El Plus: Información no disponible sobre fixes o mejoras que hayan resuelto completamente las quejas de ergonomía y limitaciones de animación.',
  'Problema de importación/exportación: La funcionalidad de exportar/importar texto para traducción es "una verdadera plaga", ya que los tamaños de los elementos saltan y se desconfiguran. Costo vs. valor: Un usuario comenta que la herramienta es "cara".',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'troubleshooting', 'Troubleshooting', '#D85A30', 330,
  '1. Error: Al exportar/importar texto para traducción, los tamaños y formatos de los elementos en el video se desconfiguran.',
  'Solución oficial: Información no disponible. Workaround validado por comunidad: Ninguno reportado. Este es un dolor validado y documentado por usuarios en LinkedIn, que califican la experiencia como "una verdadera plaga".

🟢 El Plus: Información no disponible sobre un fix permanente.',
  'El problema persiste y no se ha reportado una solución oficial. Afecta gravemente los flujos de localización y actualización masiva de videos, anulando el valor de la funcionalidad de importación/exportación masiva para algunos usuarios.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'troubleshooting', 'Troubleshooting', '#D85A30', 340,
  '2. Problema: Algunas voces de texto a voz no funcionan o no están disponibles.',
  'Solución oficial: Vyond documenta "Known Issues - Some Text-to-Speech Voices Not Working" y "Known Issue - Certain Text-to-Speech Voice Unavailable (RESOLVED)". Se recomienda consultar la página de "Known Issues" en el Centro de Ayuda para ver el estado actual.

🟢 El Plus: Vyond mantiene una página de "Known Issues" donde se reportan y marcan como resueltos estos problemas. Un issue específico fue resuelto.',
  'Aunque algunos issues se resuelven, la aparición recurrente de problemas con voces específicas es una fricción para los usuarios que dependen de una voz en particular para la consistencia de sus videos.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'troubleshooting', 'Troubleshooting', '#D85A30', 350,
  '3. Error: "500 Internal Server Error" al usar la plataforma.',
  'Solución oficial: Vyond tiene una categoría de ayuda dedicada a "500 Internal Server Error". Se recomienda seguir las guías de "General Troubleshooting Recommendations" (limpiar caché, deshabilitar extensiones del navegador).

🟢 El Plus: La existencia de una categoría específica para este error indica que es un problema conocido con guías de solución de problemas.',
  'Información no disponible sobre causas comunes o una solución definitiva más allá del troubleshooting básico.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'troubleshooting', 'Troubleshooting', '#D85A30', 360,
  '4. Problema: No se puede importar un archivo MP4.',
  'Solución oficial: Vyond tiene una guía titulada "Unable to import MP4 file" en su centro de ayuda. Se deben consultar los requisitos de formato y códec específicos en esa guía.

🟢 El Plus: Información no disponible',
  'Información no disponible sobre la causa raíz o si es un problema recurrente con ciertos tipos de archivos MP4.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'troubleshooting', 'Troubleshooting', '#D85A30', 370,
  '5. Limitación: Vyond Studio se siente "lento" o "improductivo" para animaciones complejas.',
  'Solución oficial: Vyond está diseñado para simplicidad y velocidad en proyectos estándar. Workaround validado por comunidad: No usar Vyond para animaciones fluidas o detalladas; usar herramientas como After Effects para proyectos con altas demandas de animación.

🟢 El Plus: Vyond reconoce su posicionamiento como solución para creación rápida, no para animación tradicional compleja.',
  'Este es un dolor fundamental y validado. Vyond no es adecuado para usuarios que necesitan control granular sobre movimientos, transiciones y timing, siendo superado por herramientas de animación profesionales.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'troubleshooting', 'Troubleshooting', '#D85A30', 380,
  '6. Error: El personaje generado a partir de una foto (Photo to Character) tiene un resultado pobre o poco parecido.',
  'Solución oficial: La función está en Beta. Vyond solicita feedback a través de una encuesta para "ayudarnos a seguir proporcionando experiencias de Vyond Studio de alta calidad". Workaround: Seguir los "Tips for Creating A Custom AI Avatar" disponibles en el Centro de Ayuda.

🟢 El Plus: Al estar en Beta, Vyond está trabajando activamente en mejorar la función y pide feedback directo a los usuarios.',
  'Siendo una función Beta, los resultados pueden ser inconsistentes y no aptos para producción crítica hasta que la función sea estable.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'troubleshooting', 'Troubleshooting', '#D85A30', 390,
  '7. Problema: La versión de prueba gratuita no incluye AI Avatars y añade una marca de agua.',
  'Solución oficial: La única solución es actualizar a un plan de pago (Profesional o Enterprise) y comprar el acceso a AI Avatars como add-on. La prueba gratuita solo permite crear 3 videos con marca de agua y sin posibilidad de descarga.

🟢 El Plus: Información no disponible',
  'Los prospectos no pueden evaluar la funcionalidad de AI Avatars sin pagar primero, lo que es una barrera para la prueba y evaluación de la herramienta.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'troubleshooting', 'Troubleshooting', '#D85A30', 400,
  '8. Error: El símbolo "&" causa fallos en las voces de WellSaid TTS para idiomas que no sean inglés.',
  'Solución oficial: Vyond documenta este como un "Known Issue" en su centro de ayuda: "Known Issue - ''&'' Symbol Causing Non-English WellSaid TTS to Fail". Se recomienda evitar el uso del símbolo "&" en los textos para estos idiomas.

🟢 El Plus: El problema está oficialmente documentado, lo que permite a los usuarios identificarlo y evitarlo.',
  'No hay una solución oficial más allá del workaround de evitar el carácter. Es un bug específico que interrumpe el flujo de trabajo de localización.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'troubleshooting', 'Troubleshooting', '#D85A30', 410,
  '9. Problema: El estilo visual de los personajes y assets de Vyond se percibe como "genérico" y "desactualizado".',
  'Solución oficial: Vyond actualiza constantemente su biblioteca, añadiendo más de 1,100 AI Avatars, nuevas plantillas y diversidad de personajes. Workaround: Importar assets propios en formato SVG para personalizar el estilo.

🟢 El Plus: La capacidad de importar SVGs y usar la herramienta de detección de color permite a las empresas aplicar su marca y diferenciarse del estilo por defecto.',
  'El problema es subjetivo pero validado por múltiples usuarios que encuentran el estilo inherente de Vyond como una limitación para proyectos que requieren un look único o muy moderno.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'troubleshooting', 'Troubleshooting', '#D85A30', 420,
  '10. Problema: Vyond es "caro" en relación a su valor percibido y productividad.',
  'Solución oficial: Vyond argumenta su valor en el ahorro de tiempo y la capacidad de producir video a escala sin habilidades de animación. Workaround validado por comunidad: Considerar herramientas alternativas como "Vidnoz AI" que un usuario menciona como "no está mal".

🟢 El Plus: Vyond es usado por más del 65% del Fortune 500, validando su propuesta de valor para grandes empresas. La plataforma ofrece múltiples herramientas (IA, importación PPTX, etc.) para acelerar la producción.',
  'Esta es una objeción de costo recurrente. Usualmente mencionada por profesionales o pequeñas empresas que comparan el precio con la curva de aprendizaje y las limitaciones creativas que perciben.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'troubleshooting', 'Troubleshooting', '#D85A30', 430,
  '"La interfaz de Vyond Studio es extremadamente lenta o glitchy"',
  'Usuarios reportan lag de 1-2 segundos en clics. Solución: Limpiar caché del navegador o usar una ventana de incógnito. Reducir el uso de logos/gráficos personalizados pesados en una misma escena.

🟢 El Plus: El soporte técnico suele recomendar verificar la aceleración de hardware en el navegador (Chrome/Edge).',
  ': El problema persiste incluso en conexiones de alta velocidad (Ethernet) debido a la carga de procesamiento en la nube cuando hay muchos assets.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'troubleshooting', 'Troubleshooting', '#D85A30', 440,
  '"Error al procesar el Custom Avatar: Consentimiento rechazado"',
  'El script de consentimiento no se leyó de forma clara o el video no cumple los estándares técnicos. Solución: Grabar de nuevo asegurando que el lente esté limpio y el audio sea nítido sin ruido de fondo.

🟢 El Plus: El sistema notifica específicamente qué falló (audio, video o script) para facilitar la re-sumisión.',
  'Si el video de consentimiento se rechaza, el proceso de 4-6 horas se reinicia desde cero tras la nueva carga.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'troubleshooting', 'Troubleshooting', '#D85A30', 450,
  '"El AI Avatar no sincroniza bien los labios con mi audio subido"',
  'Ocurre cuando el audio tiene mucho ruido de fondo o música integrada. Solución: Usar audios "limpios" de voz y añadir la música de fondo en una pista separada dentro de Vyond Studio.

🟢 El Plus: Vyond incluye un Speech Enhancer (mejorador de voz) para limpiar grabaciones de micrófono de baja calidad.',
  'Si el audio tiene acentos muy marcados o jergas técnicas no reconocidas, la sincronización labial pierde precisión.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'troubleshooting', 'Troubleshooting', '#D85A30', 460,
  '"No puedo cambiar la ropa o apariencia de mi AI Avatar"',
  'Los AI Avatars son representaciones fotorrealistas fijas (especialmente los Custom). Solución: Seleccionar avatares de la biblioteca que explícitamente soporten "Background/Outfit settings".

🟢 El Plus: Se han añadido recientemente funciones para cambiar el fondo de avatares generados por prompt.',
  'La personalización de vestuario es casi nula en comparación con los personajes de "Business Friendly" que son 100% editables.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'troubleshooting', 'Troubleshooting', '#D85A30', 470,
  '"El video exportado se ve borroso o en baja calidad"',
  'Verificación de la configuración de exportación. Solución: Asegurar que se seleccionó 1080p y que los assets importados tengan una resolución acorde.

🟢 El Plus: Los planes Profesional/Enterprise permiten descargas en alta definición de forma ilimitada.',
  'Exportar en 4K no es una opción estándar para todos los tipos de contenido de AI Avatar en la línea de tiempo básica.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'troubleshooting', 'Troubleshooting', '#D85A30', 480,
  '"Problemas de previsualización (Preview no carga)"',
  'Bloqueo por extensiones del navegador (AdBlockers). Solución: Desactivar bloqueadores de anuncios o extensiones de seguridad agresivas para el dominio de Vyond.

🟢 El Plus: Existe una página de "Status" oficial para verificar si hay caídas generales del servidor.',
  'En proyectos muy largos (>10 min), la previsualización suele fallar o tardar minutos en renderizar un clip corto.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'troubleshooting', 'Troubleshooting', '#D85A30', 490,
  '"El traductor automático cambia el sentido del guion técnico"',
  'La traducción IA puede fallar en términos industriales específicos. Solución: Revisar manualmente el guion traducido antes de generar el audio del avatar.

🟢 El Plus: Instant Video Translation permite traducir texto y subtítulos simultáneamente, ahorrando horas de trabajo manual.',
  'Requiere que el usuario domine el idioma de destino para validar que la traducción no sea demasiado literal o incorrecta.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'troubleshooting', 'Troubleshooting', '#D85A30', 500,
  '"Mi Custom Avatar no aparece en la biblioteca tras 6 horas"',
  'Posible fallo en la carga o el archivo fue marcado para revisión manual. Solución: Contactar a soporte si el estado en "My Library" no cambia tras 24 horas.

🟢 El Plus: El sistema suele enviar un correo automático cuando el avatar está listo para ser usado.',
  'No hay una barra de progreso real (porcentaje) durante la generación del avatar.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'troubleshooting', 'Troubleshooting', '#D85A30', 510,
  '"Conflictos de red/firewall corporativo bloquean assets"',
  'Los firewalls de empresas suelen bloquear los servidores de contenido de Vyond. Solución: Solicitar al departamento de IT añadir a la lista blanca (whitelist) los dominios oficiales de Vyond indicados en el Trust Center.

🟢 El Plus: El plan Enterprise incluye guías técnicas específicas para equipos de IT para facilitar este despliegue.',
  'El soporte de Vyond no puede saltarse las restricciones locales de una VPN corporativa si el usuario no tiene permisos de administrador.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'troubleshooting', 'Troubleshooting', '#D85A30', 520,
  '"Inconsistencia en el tono de voz de los AI Avatars"',
  'Algunas voces TTS suenan robóticas en frases largas. Solución: Usar puntuación (comas, puntos) para forzar pausas naturales o utilizar la función de "External Voice" con una grabación humana.

🟢 El Plus: La biblioteca de voces se actualiza frecuentemente con nuevas opciones "neuronales" más naturales.',
  'No se puede ajustar la entonación palabra por palabra (inflexión) dentro del editor de Vyond Studio todavía.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
)
;

-- Nuevas Q&As — Auditoría de contenido 2026-04-05
INSERT INTO kb_items
  (producto, seccion, seccion_label, seccion_color, orden,
   pregunta, plus, menos, fuente, activo, audiencia)
VALUES
(
  'vyondstudio', 'comercial', 'Comercial', '#185FA5', 530,
  '¿Cómo se adquiere Vyond Studio en México y qué ventajas ofrece comprarlo a través de TAEC?',
  'TAEC es el distribuidor exclusivo de Vyond en México y LATAM. Adquirir Vyond Studio a través de TAEC ofrece: (1) cotización y facturación en pesos mexicanos; (2) soporte técnico y pedagógico en español con conocimiento del contexto corporativo latinoamericano; (3) capacitación incluida en el onboarding (uso de AI Avatars, Instant Video Translation, flujos de producción); (4) asesoría en la selección del plan correcto (Starter, Professional, Enterprise) según el volumen de producción y necesidades del equipo.',
  'Vyond Studio no se puede adquirir directamente desde vyond.com en México con condiciones locales. Cotizar siempre a través de TAEC para obtener precio en MXN, factura local, soporte regional y capacitación incluida.',
  'TAEC · taec.com.mx', true, '{interno,titbits,publico}'
),
(
  'vyondstudio', 'tecnica', 'Matriz Técnica', '#0F6E56', 540,
  '¿Cuáles son los requisitos técnicos mínimos para usar Vyond Studio?',
  'Vyond Studio es una aplicación 100% web; no requiere instalación local. Requisitos mínimos: (1) Navegador: Chrome o Edge (recomendados); Firefox soportado; Safari con soporte parcial — algunas funciones de IA pueden no funcionar correctamente; (2) Sistema operativo: Windows 7 SP1 o superior, o macOS (cualquier versión moderna); (3) RAM: mínimo 8 GB recomendados para proyectos con AI Avatars y Instant Video Translation; (4) Conexión a internet estable — todo el procesamiento de IA ocurre en la nube de Vyond.',
  'Safari tiene soporte parcial: algunas funciones avanzadas (AI Avatars, generación de video con IA) pueden presentar comportamiento inconsistente. Para producción profesional se recomienda Chrome o Edge. Vyond no tiene aplicación de escritorio; sin internet no es posible trabajar.',
  'Vyond · Help Center · System Requirements · help.vyond.com', true, '{interno,titbits}'
);
