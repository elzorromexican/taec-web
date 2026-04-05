-- ==========================================
-- TAEC KB Review 360 — INSERT COMPLETO
-- Versión: v1.0
-- Fecha: 2026-04-05
-- Owner: Dirección Comercial TAEC
-- ==========================================


-- Aseguramos idempotencia: primero purgar datos existentes
DELETE FROM kb_items WHERE producto = 'review360';

INSERT INTO kb_items (
  producto, seccion, seccion_label, seccion_color, orden,
  pregunta, plus, menos, fuente, activo, audiencia
) VALUES

-- ==========================================
-- SECCIÓN: COMERCIAL
-- ==========================================
(
  'review360', 'comercial', 'Matriz Comercial', '#185FA5', 10,
  '¿Qué es Review 360 y qué funciones cumple en la colaboración de proyectos?',
  'Es una aplicación web integrada en la suscripción de Articulate 360 que centraliza la recopilación de comentarios de las partes interesadas sobre cursos de e-learning. Facilita revisiones en contexto mediante capturas de pantalla automáticas vinculadas a cada comentario, eliminando ambigüedad.',
  'No es un LMS; no realiza simulacro de tracking o evaluación al estudiante final. Su propósito es estrictamente iterativo y de revisión B2B.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'review360', 'comercial', 'Matriz Comercial', '#185FA5', 20,
  '¿Cuál es la diferencia de licenciamiento entre Articulate 360 Personal y Teams en relación con Review 360?',
  'La versión Teams ofrece almacenamiento ilimitado, gestión de carpetas de equipo (Team Folders), y capacidad de transferir contenido. Las cuentas Teams permiten a múltiples autores publicar versiones sobre un mismo enlace, centralizando versiones de revisión.',
  'Límite de 150 GB para usuarios personales puede ser escaso considerando paquetes SCORM pesados.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'review360', 'comercial', 'Matriz Comercial', '#185FA5', 30,
  '¿Se requiere una licencia de Articulate para acceder a una revisión?',
  'No. Cualquier stakeholder externo (con el link) puede revisar y dejar comentarios gratuitamente ingresando sólo su correo. Frictionless: directivos o clientes pueden aprobar despliegues sin instalación o cuentas previas.',
  'Los usuarios que SÍ poseen ID de Articulate 360 deben iniciar sesión si el enlace es privado, lo que paradójicamente suma pasos al equipo interno.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'review360', 'comercial', 'Matriz Comercial', '#185FA5', 40,
  '¿Cómo funciona el versionado y cómo ven los SME los cambios en Review 360?',
  'Al publicar, el diseñador elige "Publish a New Version of an Existing Item", lo que respeta el enlace original. Provee un histórico infalible para comparar solicitudes pasadas vs cambios actuales sin buscar URLs caducas.',
  'El usuario no puede comentar en una versión anterior (histórica); requiere estar en la versión vigente o forzar un refresh.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'review360', 'comercial', 'Matriz Comercial', '#185FA5', 50,
  '¿Qué sucede con el contenido y comentarios de Review 360 si un empleado deja la organización?',
  'Los administradores de Teams pueden transferir la propiedad íntegra a otro miembro al momento de eliminar el asiento. Garantiza protección patrimonial para agencias que no desean perder sus ciclos de Q/A ante rotación.',
  'Requiere Team Folders activos; planes personales pueden enfrentar pérdida irreversible si el correo se desactiva.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'review360', 'comercial', 'Matriz Comercial', '#185FA5', 60,
  '¿Existen límites de capacidad o tamaño de archivos publicados en la plataforma?',
  'Cada ítem individual soporta máximo 5 GB. Además, los comentarios están limitados a 1,500 caracteres. Las carpetas de Teams permiten 6 niveles de sub-profundidad operativa, tolerando proyectos de entrenamiento gigantescos.',
  'No soporta alfabetos de lectura RTL (Árabe, Hebreo) orgánicamente en el hub, frustrando implementaciones del Mid-East.',
  'Análisis IA · QA', true, '{interno,titbits}'
),

-- ==========================================
-- SECCIÓN: TÉCNICA
-- ==========================================
(
  'review360', 'tecnica', 'Matriz Técnica', '#0F6E56', 70,
  '¿Cuáles son los requisitos de red perimetrales para uso corporativo?',
  'Se debe habilitar el puerto saliente 443 a *.articulate.com, *.articulateusercontent.com y buckets específicos de AWS S3 (.s3.amazonaws.com). Articulate provee listas oficiales para la configuración de Firewalls y Whitelisting.',
  'Si S3 está bloqueado, Review cargará texto pero arrojará imágenes en blanco u errores de desconexión infinitos.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'review360', 'tecnica', 'Matriz Técnica', '#0F6E56', 80,
  '¿Se integra de forma nativa Review 360 al interior del Autor (Storyline / Rise)?',
  'Completamente. Un panel asíncrono permite leer y corregir comentarios de Review 360 directo desde la interfaz de Storyline y Rise. Radical ahorro de tiempo al editar sin necesidad de una pestaña de Chrome independiente.',
  'En Rise, sobreescribir el enlace correcto falla típicamente si no fue anidado pre-lanzamiento o si tiene variables duplicadas.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'review360', 'tecnica', 'Matriz Técnica', '#0F6E56', 90,
  '¿Cómo procesa Review 360 las capturas de contexto?',
  'Captura en imagen el estado preciso de slide al momento de apretar "Comentar". Las herramientas gráficas de anotación (draw mode) mitigan el problema clásico B2B de no entender qué hay que cambiar.',
  'Efectos paralácticos, video externo oculto o capas variables pueden desconfigurar la captura, originando una pantalla blanca engañosa.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'review360', 'tecnica', 'Matriz Técnica', '#0F6E56', 100,
  '¿Podemos exportar el flujo histórico hacia bases de datos de auditoría externa?',
  'Se soporta el export masivo en CSV y PDF, reportando usuario, timestamp, contenido y estado. Fundamental en ecosistemas Compliance que requieren trazar la validación de un Curso Regulatorio antes del Go-Live.',
  'Carece de Webhooks modernos o API endpoints a Jira/Trello, por lo que su volcado es netamente manual.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'review360', 'tecnica', 'Matriz Técnica', '#0F6E56', 110,
  '¿Pueden insertarse los vínculos del portal de Review por Iframe?',
  'No. Infraestructura y políticas X-Frame limitan incrustraciones por Iframe nativo o embebido en Intranets genéricas. Esto genera resiliencia y evita fraudes XSS paralelos.',
  'Añade un clic extra, pues no despliega el "mini review" natural en portales de proveedores de agencias.',
  'Análisis IA · QA', true, '{interno,titbits}'
),

-- ==========================================
-- SECCIÓN: TROUBLESHOOTING CRÍTICO
-- ==========================================
(
  'review360', 'troubleshooting', 'Troubleshooting', '#D85A30', 120,
  'Deseo que Review 360 NO obligue login a revisores al enviarles el Link Privado',
  'Es mandatorio verificar sesión cerrada si ellos tienen un Articulate ID pre-existente. Review prioriza seguridad de perfil e identidad sobre comodidad si el mail está en la Base, bloqueando suplantaciones.',
  'Se detonan falsas crisis de "plataforma caída" cuando un jefe directivo con cuenta expirada antigua es forzado al Login forzoso.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'review360', 'troubleshooting', 'Troubleshooting', '#D85A30', 130,
  'Aparece mensaje "Unable to Connect" o spinner eterno de "Publishing"',
  'Atribuible 99% a inspección profunda de Firewalls B2B que interceptan la ruta a TLS (Puerto 443) hacia Amazon S3. Solicitar Whitelist exhaustivo según manual de red usualmente soluciona el issue universalmente.',
  'El trámite de Whitelist corporativo burocrático retrasa pilotos valiosos por semanas si no se adelanta a IT.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'review360', 'troubleshooting', 'Troubleshooting', '#D85A30', 140,
  'Han desaparecido o no ligan mis comentarios hacia versiones anteriores o en Rise',
  'O bien los comentarios están ocultos con filtro base "Esconder Resueltos", o se cometió el error "Create New Item" desvinculándolo. Rise 360 parcheó UI reciente priorizando "Actualizar Item".',
  'Un error de clic (crear nuevo item) fragmenta la traza sin capacidad orgánica nativa para "fusionar" métricas perdidas.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'review360', 'troubleshooting', 'Troubleshooting', '#D85A30', 150,
  'Las tipografías y el alineamiento de botones se quiebran drásticamente en Review 360',
  'Común en variables obsoletas. Transicionar obligatoriamente a Storyline 64-bits Modern Player, habilitar "Allow Overflow" de objetos. Misma renderización predecible del Browser.',
  'Assets heredados pre-2023 exhiben colapsos drásticos requiriendo actualización diapositiva por diapositiva.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'review360', 'troubleshooting', 'Troubleshooting', '#D85A30', 160,
  'Los colaboradores adicionales en mi Team Folders no pueden Borrar / Limpiar iteraciones obsoletas',
  'Solo el PROTAGONISTA (Owner originario) ostenta el privilegio absoluto de depuración destructiva en Team Folders. Salvaguarda contra desastres por eliminación maliciosa o descuidada.',
  'Congestión administrativa severa; el creador asume el rol de "Conserje digital" permanentemente.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'review360', 'troubleshooting', 'Troubleshooting', '#D85A30', 170,
  'Notificaciones erráticas o faltantes desde Review 360',
  'Usualmente el servidor SMTP secuestra envíos automatizados desde @articulate, o el usuario tiene Review en Mute (Resumen Diario/Instantáneo).',
  'Validar carpeta SPAM se volvió paso mandatorio previo para todos los participantes ajenos al Hub de Desarrollo.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'review360', 'troubleshooting', 'Troubleshooting', '#D85A30', 180,
  'El Selector Dropdown expone demasiadas versiones listadas y corrompe su lectura',
  'Ocurre al forzar repeticiones infinitas en versiones beta o ignorar subidas incrementales; genera lag de carga SPA pero guarda el registro contábil de forma intocable.',
  'Mejores prácticas dictan archivar tras Golden Master y publicar Limpio en una ID nueva para agilizar rendimiento de render final.',
  'Análisis IA · QA', true, '{interno}'
);

-- Nuevas Q&As — Auditoría de contenido 2026-04-05
INSERT INTO kb_items
  (producto, seccion, seccion_label, seccion_color, orden,
   pregunta, plus, menos, fuente, activo, audiencia)
VALUES
(
  'review360', 'comercial', 'Comercial', '#185FA5', 190,
  '¿Qué entrega Review 360 al cierre de un ciclo de revisión?',
  'Al cerrar un ciclo de revisión, Review 360 entrega: (1) historial completo de todos los comentarios recibidos por pantalla/slide con nombre del revisor y marca de tiempo; (2) estado de cada comentario (abierto, resuelto, descartado); (3) versión aprobada del curso publicada en el enlace original. El diseñador instruccional obtiene un registro auditable de todo el proceso de retroalimentación sin necesidad de consolidar correos o archivos externos.',
  'Review 360 no genera un documento de acta o PDF exportable del historial de comentarios de forma automática. El registro queda dentro de la plataforma; si el enlace se archiva sin exportar, el historial solo es consultable desde la cuenta Articulate.',
  'Articulate · Review 360 · articulate.com/review-360', true, '{interno,titbits}'
),
(
  'review360', 'comercial', 'Comercial', '#185FA5', 200,
  '¿Qué problema específico resuelve Review 360 en un proyecto de e-learning?',
  'Review 360 elimina el ciclo caótico de retroalimentación por correo electrónico, capturas de pantalla y hojas de cálculo. Centraliza todos los comentarios de los revisores (clientes, SMEs, coordinadores) en una sola interfaz vinculada directamente al slide o pantalla del curso. El diseñador ve exactamente a qué elemento se refiere cada comentario, sin necesidad de interpretar descripciones textuales ambiguas.',
  'Requiere que todos los revisores accedan al enlace desde un navegador actualizado. Revisores con restricciones de firewall corporativo o sin acceso a internet pueden no poder acceder a la URL de revisión.',
  'Articulate · Review 360 · articulate.com/review-360', true, '{interno,titbits,publico}'
),
(
  'review360', 'comercial', 'Comercial', '#185FA5', 210,
  '¿En qué casos de uso concretos aporta mayor valor Review 360?',
  'Review 360 aporta mayor valor en: (1) proyectos con múltiples stakeholders (cliente, SME, área legal, RH) que deben aprobar el mismo contenido; (2) equipos distribuidos geográficamente donde las reuniones de revisión presencial no son viables; (3) ciclos de aprobación con SLA definidos donde el historial de versiones es evidencia auditable; (4) agencias o consultoras que entregan cursos a clientes externos y necesitan un canal profesional de retroalimentación.',
  'Para equipos pequeños con un solo revisor interno, puede ser percibido como overhead. En esos casos, la revisión directa en Storyline o Rise puede ser más ágil.',
  'Articulate · Review 360 · articulate.com/review-360', true, '{interno,titbits,publico}'
),
(
  'review360', 'comercial', 'Comercial', '#185FA5', 220,
  '¿Cómo se adquiere Review 360 en México y a través de qué canal?',
  'Review 360 está incluido en cualquier licencia de Articulate 360 (Teams o Personal). TAEC es el distribuidor exclusivo de Articulate 360 en México y LATAM. La adquisición se gestiona directamente con TAEC: cotización en pesos mexicanos, facturación local y soporte en español. No es necesario adquirir Review 360 por separado; viene integrado al suscribirse a Articulate 360.',
  'Review 360 no se puede adquirir como producto independiente fuera de la suscripción Articulate 360. Para acceder a él, la organización debe tener una licencia activa de Articulate 360.',
  'TAEC · taec.com.mx', true, '{interno,titbits}'
),
(
  'review360', 'tecnica', 'Matriz Técnica', '#0F6E56', 230,
  '¿Qué necesita el equipo para publicar y usar Review 360?',
  'Para usar Review 360 el equipo necesita: (1) licencia activa de Articulate 360 — el autor publica directamente desde Storyline 360 o Rise 360 con un clic; (2) los revisores solo necesitan el enlace URL y un navegador moderno — no requieren cuenta ni licencia de Articulate; (3) conexión a internet estable (el contenido se aloja en la nube de Articulate). No hay instalación de software adicional para el equipo revisor.',
  'Los revisores externos con políticas de seguridad corporativa estrictas (firewall, proxy) pueden tener problemas para acceder a los enlaces de Review 360. El contenido del curso está alojado en servidores de Articulate, no en la infraestructura del cliente.',
  'Articulate · Review 360 · Getting Started · articulate.com', true, '{interno,titbits}'
);
