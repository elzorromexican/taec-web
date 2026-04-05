-- ==========================================
-- TAEC KB Rise 360 — INSERT COMPLETO
-- 40 registros definitivos
-- Versión: v1.0
-- Fecha: 2026-04-03
-- Owner: Dirección Comercial TAEC
-- ==========================================

INSERT INTO kb_items (
  producto, seccion, seccion_label, seccion_color, orden,
  pregunta, plus, menos, fuente, activo, audiencia
) VALUES

-- ==========================================
-- SECCIÓN: diseno
-- ==========================================
(
  'rise360', 'diseno', 'Diseño y personalización', '#185FA5', 10,
  '¿Qué nivel real de personalización gráfica ofrece Rise 360?',
  'Produce cursos elegantes y 100% responsive en poco tiempo. Los temas profesionales dan un resultado visual sólido sin esfuerzo de diseño.',
  'Tipografías, márgenes y layouts tienen límites fijos. Los cursos se parecen entre sí. No es una herramienta de diseño libre.',
  'QA interna', true, '{interno,titbits}'
),
(
  'rise360', 'diseno', 'Diseño y personalización', '#185FA5', 20,
  '¿Se pueden aplicar temas y personalizar colores de marca?',
  'Sí. Rise incluye temas prediseñados y permite ajustar colores primarios, tipografías disponibles y portadas para alinear con la identidad del cliente.',
  'El nivel de personalización es limitado comparado con Storyline. No se puede intervenir en cada elemento visual por separado.',
  'FAQ oficial · User Guide', true, '{interno,titbits}'
),
(
  'rise360', 'diseno', 'Diseño y personalización', '#185FA5', 30,
  '¿Cómo se logran efectos visuales más allá de lo nativo?',
  'Eliminando la separación de 30px entre bloques y usando el mismo color de fondo, dos bloques distintos parecen una sola sección unificada.',
  'Estas soluciones son frágiles ante actualizaciones del producto. No son técnicas documentadas y pueden romperse sin aviso.',
  'QA interna', true, '{interno}'
),
(
  'rise360', 'diseno', 'Diseño y personalización', '#185FA5', 40,
  '¿Cuál es la diferencia entre el bloque de código nativo y el bloque multimedia embed?',
  'El bloque multimedia embed acepta iframes reales: calendarios, encuestas SurveyMonkey, formularios externos.',
  'El bloque código de texto es solo decorativo para mostrar fragmentos con formato visual. No ejecuta nada.',
  'QA interna', true, '{interno,titbits}'
),
(
  'rise360', 'diseno', 'Diseño y personalización', '#185FA5', 50,
  '¿Cómo funciona el autograbado al construir un curso?',
  'Rise guarda automáticamente en tiempo real. No existe botón de guardar porque no hace falta. Cada cambio queda registrado al instante.',
  null,
  'QA interna', true, '{interno,titbits,publico}'
),

-- ==========================================
-- SECCIÓN: ia
-- ==========================================
(
  'rise360', 'ia', 'IA y creación acelerada', '#7F77DD', 10,
  '¿Qué hace exactamente el AI Assistant de Rise 360?',
  'Genera borradores de lecciones completas a partir de un documento fuente. También crea knowledge checks, imágenes, subtítulos para video y mejora textos existentes.',
  'La IA produce borradores, no cursos listos. El diseñador instruccional sigue siendo responsable de la estructura pedagógica y la calidad.',
  'articulate.com/360/rise · abr 2026', true, '{interno,titbits,publico}'
),
(
  'rise360', 'ia', 'IA y creación acelerada', '#7F77DD', 20,
  '¿El AI Assistant puede generar imágenes dentro del curso?',
  'Sí. Genera imágenes únicas con estilo visual a elección del autor. También da acceso a más de 13 millones de imágenes de biblioteca.',
  'Las imágenes generadas tienen limitaciones de consistencia visual entre lecciones. Para cursos con personajes recurrentes el resultado puede variar.',
  'articulate.com/360/rise', true, '{interno,titbits,publico}'
),
(
  'rise360', 'ia', 'IA y creación acelerada', '#7F77DD', 30,
  '¿La IA puede generar subtítulos para videos automáticamente?',
  'Sí. AI Assistant genera borradores de subtítulos para video. El autor los revisa y edita antes de publicar. Reduce el trabajo manual de transcripción.',
  'Son borradores. Requieren revisión editorial, especialmente en nombres propios, tecnicismos o español con acento regional.',
  'VPAT · articulatesupport.com', true, '{interno,titbits}'
),
(
  'rise360', 'ia', 'IA y creación acelerada', '#7F77DD', 40,
  '¿La IA reemplaza al diseñador instruccional?',
  'Acelera hasta 9x la producción de contenido según Articulate. Para equipos pequeños o con alta demanda de cursos el impacto en productividad es real.',
  'No reemplaza el criterio pedagógico. Estructura, objetivos y secuencia siguen siendo trabajo humano. La IA produce volumen, no garantiza calidad.',
  'articulate.com/360/rise', true, '{interno,titbits,publico}'
),
(
  'rise360', 'ia', 'IA y creación acelerada', '#7F77DD', 50,
  '¿Se pueden usar documentos propios como fuente para la IA?',
  'Sí. Se pueden subir documentos al AI Assistant para generar contenido basado en material propio: manuales, políticas, procesos.',
  'La calidad del output depende de la calidad del documento fuente. Textos mal estructurados producen cursos mal estructurados.',
  'articulate.com/360/rise', true, '{interno,titbits}'
),

-- ==========================================
-- SECCIÓN: interactividad
-- ==========================================
(
  'rise360', 'interactividad', 'Interactividad y formatos', '#0F6E56', 10,
  '¿Qué tipos de interactividad incluye Rise de forma nativa?',
  'Bloques de proceso, línea de tiempo, acordeón, gráfico etiquetado, ordenamiento, escenarios ramificados, knowledge checks y quizzes. Todo sin código.',
  'La interactividad nativa es funcional pero predecible visualmente. Para experiencias muy personalizadas o simulaciones complejas se necesita Storyline.',
  'articulate.com/360/rise', true, '{interno,titbits,publico}'
),
(
  'rise360', 'interactividad', 'Interactividad y formatos', '#0F6E56', 20,
  '¿Cómo se integra Storyline 360 dentro de un curso Rise?',
  'Se desactiva el reproductor nativo de Storyline, se publica en Review 360 y se embebe en Rise con ancho completo. El resultado es transparente para el alumno.',
  'Requiere dominar dos herramientas. La comunicación de calificaciones entre el bloque Storyline y el LMS a través de Rise no está completamente documentada.',
  'QA interna', true, '{interno,titbits}'
),
(
  'rise360', 'interactividad', 'Interactividad y formatos', '#0F6E56', 30,
  '¿Los escenarios ramificados de Rise son suficientes para capacitación compleja?',
  'Para ventas, servicio al cliente o toma de decisiones de nivel medio, el bloque de escenario es funcional y rápido de construir.',
  'Para simulaciones con múltiples variables o flujos muy ramificados, Storyline 360 sigue siendo la herramienta correcta.',
  'articulate.com/360/rise', true, '{interno,titbits}'
),
(
  'rise360', 'interactividad', 'Interactividad y formatos', '#0F6E56', 40,
  '¿Se pueden crear evaluaciones con banco de preguntas?',
  'Sí. Rise incluye bancos de preguntas reutilizables con opción múltiple, respuesta múltiple, llenar espacios y relacionar. En Teams los bancos se comparten entre autores.',
  'Los tipos de pregunta son los estándar. No hay drag-and-drop avanzado ni personalización del feedback por variable.',
  'User Guide · FAQ oficial', true, '{interno,titbits}'
),
(
  'rise360', 'interactividad', 'Interactividad y formatos', '#0F6E56', 50,
  '¿Cómo se manejan las grabaciones de pantalla en Rise?',
  'Con Peek 360 se puede convertir una grabación en GIF animado en bucle, ligero y sin fricción para el alumno.',
  'Sin controles de pausa ni navegación. No apto para procesos que el alumno deba revisar paso a paso.',
  'QA interna', true, '{interno,titbits}'
),
(
  'rise360', 'interactividad', 'Interactividad y formatos', '#0F6E56', 60,
  '¿Se puede crear microlearning además de cursos completos?',
  'Sí. Rise tiene un formato específico de microlearning: lecciones cortas diseñadas para consumo rápido en móvil. Incluye plantillas dedicadas.',
  'Para paths de aprendizaje con secuencia controlada y prerequisitos se necesita un LMS.',
  'User Guide · FAQ oficial', true, '{interno,titbits,publico}'
),

-- ==========================================
-- SECCIÓN: accesibilidad
-- ==========================================
(
  'rise360', 'accesibilidad', 'Accesibilidad y traducción', '#3B6D11', 10,
  '¿Los cursos Rise 360 cumplen normas de accesibilidad?',
  'Rise 360 cumple WCAG 2.1 y 2.2 nivel AA. Tiene VPAT publicado (marzo 2026). Soporta teclado, lectores de pantalla (JAWS, NVDA, VoiceOver, TalkBack) y navegación sin mouse.',
  'El cumplimiento es condicional: depende de que el autor aplique correctamente alt text, estructura de encabezados y contraste de color.',
  'VPAT Rise 360 · marzo 2026', true, '{interno,titbits,publico}'
),
(
  'rise360', 'accesibilidad', 'Accesibilidad y traducción', '#3B6D11', 20,
  '¿Los hackeos visuales mantienen la accesibilidad?',
  null,
  'Al fragmentar imágenes con margen cero, un lector de pantalla las lee como piezas inconexas. Los cursos construidos con hackeos probablemente reprobarían una auditoría WCAG formal.',
  'QA interna', true, '{interno}'
),
(
  'rise360', 'accesibilidad', 'Accesibilidad y traducción', '#3B6D11', 30,
  '¿Cómo funciona la traducción con Articulate Localization?',
  'Mantiene un solo curso con todos los idiomas internamente. La interfaz detecta la preferencia del alumno y cambia automáticamente. No se crean copias por idioma.',
  null,
  'FAQ oficial · abr 2026', true, '{interno,titbits,publico}'
),
(
  'rise360', 'accesibilidad', 'Accesibilidad y traducción', '#3B6D11', 40,
  '¿Rise soporta idiomas de derecha a izquierda?',
  'Sí, con Articulate Localization. El soporte RTL está documentado y funciona en el contenido nativo.',
  'Los bloques personalizados no soportan RTL por el momento.',
  'FAQ oficial · abr 2026', true, '{interno,titbits}'
),
(
  'rise360', 'accesibilidad', 'Accesibilidad y traducción', '#3B6D11', 50,
  '¿Qué pasa con iframes y Storyline embebido al traducir?',
  'Localization extrae y traduce el texto nativo del curso sin problema.',
  'No está documentado qué ocurre con texto dentro de iframes o bloques Storyline embebidos. En cursos con mucho contenido externo, la promesa de un solo archivo multiidioma puede quebrarse.',
  'QA interna', true, '{interno,titbits}'
),

-- ==========================================
-- SECCIÓN: lms
-- ==========================================
(
  'rise360', 'lms', 'Distribución, LMS y analíticas', '#854F0B', 10,
  '¿Qué estándares LMS soporta Rise 360?',
  'Exporta a AICC, SCORM 1.2, SCORM 2004, xAPI (Tin Can) y cmi5. Compatible con la gran mayoría de LMS del mercado, incluyendo Moodle, Totara y Cornerstone.',
  null,
  'FAQ oficial · abr 2026', true, '{interno,titbits,publico}'
),
(
  'rise360', 'lms', 'Distribución, LMS y analíticas', '#854F0B', 20,
  '¿Los alumnos pueden retomar el curso donde lo dejaron?',
  'Sí, cuando el curso está en Reach 360 o en un LMS. Retoma al inicio de la última lección o cuestionario en progreso.',
  'En distribución web directa (Quick Share), el curso siempre reinicia desde el principio. Sin LMS no hay persistencia de progreso.',
  'FAQ oficial · abr 2026', true, '{interno,titbits,publico}'
),
(
  'rise360', 'lms', 'Distribución, LMS y analíticas', '#854F0B', 30,
  '¿Se puede rastrear sin LMS usando Quick Share?',
  'Quick Share permite ver visualizaciones, repeticiones, correos y última fecha de acceso, todo desde la nube. Útil para capacitación informal o pilotos rápidos.',
  'Las analíticas son básicas. No está documentada exportación en CSV ni integración con RR.HH. Para cumplimiento corporativo formal, Quick Share no es suficiente.',
  'FAQ oficial · QA interna', true, '{interno,titbits}'
),
(
  'rise360', 'lms', 'Distribución, LMS y analíticas', '#854F0B', 40,
  '¿Reach 360 puede reemplazar un LMS corporativo?',
  'Para organizaciones sin LMS, Reach 360 es un punto de partida real: gestiona usuarios, asigna cursos y organiza grupos.',
  'No hay documentación de reportes de cumplimiento auditables ni integración con ERP. Las empresas con LMS establecido no pueden simplemente cancelarlo.',
  'FAQ oficial · QA interna', true, '{interno,titbits}'
),
(
  'rise360', 'lms', 'Distribución, LMS y analíticas', '#854F0B', 50,
  '¿Cómo se gestiona la privacidad de datos al usar Quick Share?',
  'Articulate tiene un Trust Center documentado con política de privacidad y cumplimiento GDPR.',
  'Quick Share solicita correo al alumno sin mecanismo nativo visible de aceptación de términos. El administrador del curso asume la responsabilidad legal.',
  'articulatesupport.com/trust', true, '{interno,titbits}'
),
(
  'rise360', 'lms', 'Distribución, LMS y analíticas', '#854F0B', 60,
  '¿Qué pasa con alumnos sin conexión a internet?',
  null,
  'El ecosistema completo de Rise es 100% web. No hay modo offline documentado. Para fuerza laboral desconectada, Rise no es la solución correcta sin arquitectura adicional.',
  'QA interna', true, '{interno,titbits}'
),
(
  'rise360', 'lms', 'Distribución, LMS y analíticas', '#854F0B', 70,
  '¿Dónde se alojan los cursos Rise 360?',
  'En la nube de Articulate. Plan individual: 150 GB. Plan Teams: almacenamiento ilimitado. Incluye cursos Rise y publicaciones de Review 360.',
  'Al ser nube de tercero, organizaciones con políticas de soberanía de datos deben revisar las condiciones antes de adoptar.',
  'FAQ oficial · abr 2026', true, '{interno,titbits,publico}'
),

-- ==========================================
-- SECCIÓN: licencias
-- ==========================================
(
  'rise360', 'licencias', 'Licencias, derechos y costo-beneficio', '#993556', 10,
  '¿Las imágenes incluidas están libres de regalías para uso comercial?',
  'Los suscriptores pueden usar las imágenes incluidas sin costo adicional. Provienen de Unsplash, Pexels, Pixabay y Noun Project.',
  'El uso está sujeto a los términos de cada proveedor, incluyendo posibles requisitos de atribución. Se recomienda revisar los términos para uso corporativo a escala.',
  'FAQ oficial · abr 2026', true, '{interno,titbits}'
),
(
  'rise360', 'licencias', 'Licencias, derechos y costo-beneficio', '#993556', 20,
  '¿Qué riesgos legales tiene usar herramientas externas gratuitas para enriquecer cursos?',
  null,
  'Herramientas como Pixton en versión educativa pueden no permitir uso comercial. Usar esas imágenes en capacitaciones de pago expone a la empresa a riesgo de propiedad intelectual.',
  'QA interna', true, '{interno}'
),
(
  'rise360', 'licencias', 'Licencias, derechos y costo-beneficio', '#993556', 30,
  '¿La inversión en Articulate 360 se justifica frente al tiempo real de producción?',
  'Para equipos que producen cursos regularmente, la curva de aprendizaje es baja y la velocidad de producción real es alta. El costo por curso baja con volumen.',
  'Para cursos con alta personalización visual, el tiempo en herramientas externas puede reducir significativamente la ventaja de velocidad que promete Rise.',
  'QA interna', true, '{interno,titbits}'
),
(
  'rise360', 'licencias', 'Licencias, derechos y costo-beneficio', '#993556', 40,
  '¿Qué pasa con los cursos si la empresa cancela la suscripción?',
  'Los cursos permanecen intactos en los servidores de Articulate hasta 6 meses post-vencimiento. Los alojados en servidor propio o LMS siguen accesibles.',
  'Sin suscripción activa no se puede editar ni descargar. Se recomienda exportar todos los cursos antes de cancelar.',
  'FAQ oficial · abr 2026', true, '{interno,titbits,publico}'
),

-- ==========================================
-- SECCIÓN: equipo
-- ==========================================
(
  'rise360', 'equipo', 'Equipo, colaboración y suscripción', '#5F5E5A', 10,
  '¿Pueden varios autores trabajar en el mismo curso simultáneamente?',
  'Sí, en el plan Teams. Diferentes autores pueden editar secciones distintas al mismo tiempo con roles diferenciados: colaborador o director de curso.',
  'La autoría colaborativa es exclusiva del plan Teams. En suscripción individual no existe.',
  'FAQ oficial · abr 2026', true, '{interno,titbits,publico}'
),
(
  'rise360', 'equipo', 'Equipo, colaboración y suscripción', '#5F5E5A', 20,
  '¿Se puede usar Rise 360 desde tablet o celular?',
  'Los cursos se pueden ver en cualquier dispositivo con resultado impecable. El diseño responsive es automático.',
  'La autoría solo está disponible en computadora de escritorio o laptop. No se puede crear ni editar desde tablet o celular.',
  'FAQ oficial · abr 2026', true, '{interno,titbits,publico}'
),
(
  'rise360', 'equipo', 'Equipo, colaboración y suscripción', '#5F5E5A', 30,
  '¿Cómo se gestionan plantillas compartidas entre el equipo?',
  'En Teams se pueden guardar bloques con contenido como plantillas y compartirlos con todo el equipo. Acelera la consistencia de marca y reduce tiempos en proyectos paralelos.',
  'Las plantillas de bloques compartidas son exclusivas del plan Teams. En plan individual son solo personales.',
  'FAQ oficial · User Guide', true, '{interno,titbits}'
),
(
  'rise360', 'equipo', 'Equipo, colaboración y suscripción', '#5F5E5A', 40,
  '¿Al transferir un asiento Teams qué pasa con los cursos del usuario saliente?',
  'Se puede transferir el contenido compartido junto con el asiento al nuevo usuario en un solo proceso.',
  'El contenido personal no se mueve automáticamente. Requiere decisión y acción manual del administrador.',
  'FAQ oficial · abr 2026', true, '{interno}'
),
(
  'rise360', 'equipo', 'Equipo, colaboración y suscripción', '#5F5E5A', 50,
  '¿Qué incluye Articulate 360 Training para el equipo?',
  'Acceso a seminarios web en vivo, tutoriales en video, guías de usuario y la comunidad E-Learning Heroes. Todo incluido en la suscripción.',
  'La capacitación es principalmente autodirigida y en inglés. Para equipos sin experiencia en eLearning puede requerir acompañamiento adicional.',
  'FAQ oficial · abr 2026', true, '{interno,titbits}'
),

-- ==========================================
-- SECCIÓN: fit
-- ==========================================
(
  'rise360', 'fit', '¿Para quién es (y no es) Rise?', '#D85A30', 10,
  '¿En qué casos de uso es Rise 360 la opción correcta?',
  'Onboarding, cumplimiento normativo, capacitación de producto, soft skills, inducción a distribuidores. Cualquier contenido que necesite verse bien en móvil, producirse rápido y distribuirse sin fricción.',
  null,
  'articulate.com · casos de uso', true, '{interno,titbits,publico}'
),
(
  'rise360', 'fit', '¿Para quién es (y no es) Rise?', '#D85A30', 20,
  '¿En qué escenarios Rise 360 no es suficiente por sí solo?',
  null,
  'Simulaciones de software complejas, alta personalización de marca, flujos ramificados con variables acumuladas, fuerza laboral offline, y certificaciones con trazabilidad auditada. Para esos casos: Storyline + LMS robusto.',
  'QA interna', true, '{interno,titbits}'
),
(
  'rise360', 'fit', '¿Para quién es (y no es) Rise?', '#D85A30', 30,
  '¿Rise es una buena opción para empresas que nunca han usado eLearning?',
  'Es el punto de entrada más accesible del mercado. Curva de aprendizaje baja, resultados rápidos, soporte robusto. Ideal para el primer paso sin depender de un equipo técnico.',
  'Sin criterio instruccional básico, la facilidad de la herramienta puede llevar a producir mucho contenido mediocre rápidamente.',
  'QA interna', true, '{interno,titbits,publico}'
),
(
  'rise360', 'fit', '¿Para quién es (y no es) Rise?', '#D85A30', 40,
  '¿Cómo compara Rise 360 con otras herramientas del mercado?',
  'Es la herramienta de autoría responsive más adoptada del mercado. Ecosistema maduro, comunidad activa (E-Learning Heroes), actualizaciones frecuentes y soporte en español.',
  'Competidores como iSpring o Adobe Captivate ofrecen más control visual. Para clientes con necesidades específicas de branding, esa diferencia puede ser relevante.',
  'QA interna', true, '{interno,titbits}'
),
(
  'rise360', 'fit', '¿Para quién es (y no es) Rise?', '#D85A30', 50,
  '¿Qué tipo de empresa debería combinar Rise + Storyline + LMS?',
  'Organizaciones con más de 200 empleados, múltiples perfiles de aprendizaje, necesidad de certificaciones trazables y contenido a la medida de su cultura.',
  'Esta combinación requiere inversión en licencias, tiempo de implementación y capacitación del equipo. No es la solución para quien necesita un curso urgente en dos semanas.',
  'QA interna', true, '{interno,titbits}'
),
(
  'rise360', 'fit', '¿Para quién es (y no es) Rise?', '#D85A30', 60,
  '¿Qué rol juega Review 360 en el flujo de producción?',
  'Centraliza la retroalimentación de stakeholders directamente sobre el curso. Comentarios contextuales, tareas y notificaciones sin correos con versiones adjuntas.',
  'El flujo requiere que los stakeholders accedan al enlace. En organizaciones con resistencia digital puede haber fricción de adopción.',
  'User Guide · articulate.com', true, '{interno,titbits,publico}'
);

-- ==========================================
-- NUEVAS Q&A — Auditoría Abr 2026
-- v1.1 — 4 registros añadidos
-- Categorías cubiertas: A (definición), B (insumos), C (resultados), TAEC (canal)
-- ==========================================

INSERT INTO kb_items (
  producto, seccion, seccion_label, seccion_color, orden,
  pregunta, plus, menos, fuente, activo, audiencia
) VALUES

(
  'rise360', 'fit', '¿Para quién es (y no es) Rise?', '#D85A30', 70,
  '¿Qué es Rise 360 y qué lo distingue dentro del ecosistema Articulate 360?',
  'Rise 360 es la herramienta de autoría responsive de Articulate 360. Produce cursos interactivos directamente en el navegador, sin software de escritorio, con diseño adaptado automáticamente a cualquier dispositivo. Se diferencia de Storyline 360 en que prioriza velocidad de producción y resultado visual consistente sobre personalización avanzada. Es el punto de entrada recomendado para equipos que necesitan volumen de cursos sin una curva de aprendizaje pronunciada.',
  'Rise no es una herramienta de diseño libre. El sistema de bloques limita la estructura visual y no permite intervenir en cada elemento por separado. Para experiencias muy personalizadas o simulaciones complejas, Storyline 360 sigue siendo la opción correcta.',
  'articulate.com/360/rise · FAQ oficial', true, '{interno,titbits,publico}'
),
(
  'rise360', 'equipo', 'Equipo, colaboración y suscripción', '#5F5E5A', 60,
  '¿Qué necesita un equipo para empezar a crear cursos con Rise 360?',
  'Se necesita una suscripción activa a Articulate 360 (Personal o Teams), una computadora de escritorio o laptop con navegador moderno y conexión a internet estable. No requiere instalación de software adicional: Rise funciona 100% en el navegador. Para autoría colaborativa simultánea se requiere el plan Teams.',
  'Sin conexión a internet no se puede crear ni editar. El contenido generado por el AI Assistant depende de la calidad del material de entrada: manuales mal estructurados producen cursos mal estructurados. En México, la suscripción se adquiere a través de TAEC, distribuidor exclusivo de Articulate 360 para la región.',
  'FAQ oficial · TAEC', true, '{interno,titbits}'
),
(
  'rise360', 'lms', 'Distribución, LMS y analíticas', '#854F0B', 80,
  '¿Qué tipos de contenido y entregables produce Rise 360?',
  'Rise produce cursos interactivos publicados en SCORM 1.2, SCORM 2004, xAPI, cmi5 y AICC, listos para subir a cualquier LMS compatible. También genera cursos distribuibles directamente desde Reach 360 o mediante Quick Share sin LMS. Los formatos de contenido incluyen módulos completos, lecciones de microlearning, evaluaciones con banco de preguntas y escenarios ramificados.',
  'El output es siempre web (HTML5 responsive). Rise no genera archivos descargables para uso offline, ni aplicaciones nativas para móvil. Para distribución sin conexión a internet se requiere arquitectura adicional no documentada.',
  'FAQ oficial · User Guide', true, '{interno,titbits,publico}'
),
(
  'rise360', 'licencias', 'Licencias, derechos y costo-beneficio', '#993556', 50,
  '¿Cómo se adquiere Articulate 360 (Rise 360 incluido) en México?',
  'TAEC es el distribuidor exclusivo de Articulate en México y LATAM. El proceso de adquisición incluye cotización en pesos mexicanos, facturación local y soporte en español. TAEC ofrece demostraciones, acompañamiento en la evaluación de la herramienta y capacitación inicial incluida en la licencia.',
  'Articulate no vende directamente a organizaciones en México. Cualquier licencia adquirida fuera del canal oficial de TAEC puede no tener soporte regional ni garantía de precio en moneda local.',
  'TAEC', true, '{interno,titbits}'
);
