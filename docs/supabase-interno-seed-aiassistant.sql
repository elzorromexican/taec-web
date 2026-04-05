-- ==========================================
-- TAEC KB AI Assistant — INSERT COMPLETO
-- Versión: v1.0
-- Fecha: 2026-04-05
-- Owner: Dirección Comercial TAEC
-- ==========================================

INSERT INTO kb_items (
  producto, seccion, seccion_label, seccion_color, orden,
  pregunta, plus, menos, fuente, activo, audiencia
) VALUES

-- ==========================================
-- SECCIÓN: COMERCIAL
-- ==========================================
(
  'aiassistant', 'comercial', 'Matriz Comercial', '#185FA5', 10,
  '¿En qué herramientas de Articulate 360 está disponible el AI Assistant?',
  'El AI Assistant está disponible únicamente en Storyline 360 y Rise 360. Integración nativa en las herramientas de autoría principales.',
  'No está disponible en Review 360 ni en otras aplicaciones de la suite.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'aiassistant', 'comercial', 'Matriz Comercial', '#185FA5', 20,
  '¿Cuál es la diferencia clave en funcionalidad entre Storyline 360 y Rise 360 con AI Assistant?',
  'Aunque ambas herramientas tienen AI Assistant, las funcionalidades específicas varían. Storyline 360 ofrece generación de audio y efectos de sonido, mientras que Rise 360 se enfoca en la generación de bloques de contenido y borradores completos de cursos. El asistente está adaptado al flujo de trabajo específico de cada herramienta.',
  'La falta de paridad de funciones puede causar confusión sobre qué se puede hacer en cada plataforma.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'aiassistant', 'comercial', 'Matriz Comercial', '#185FA5', 30,
  '¿Cuáles son los costos y planes que incluyen el AI Assistant?',
  'El AI Assistant requiere planes específicos: AI Personal ($1,449 USD/año) o AI Teams ($1,749 USD/año). Los planes Standard no incluyen estas funciones. Se ofrece un periodo de prueba de 30 días. Los administradores pueden habilitar o deshabilitar el acceso a grupos específicos.',
  'El costo incremental de $250 USD por asiento se considera alto. No es posible comprarlo para licencias individuales a la carta.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'aiassistant', 'comercial', 'Matriz Comercial', '#185FA5', 40,
  '¿Puedo desactivar el AI Assistant?',
  'Sí. Los administradores pueden deshabilitar AI Assistant para todo el equipo desde el panel de control de Articulate 360. En este estado, las herramientas siguen siendo visibles pero no funcionales. Permite a las empresas cumplir políticas internas desactivando la IA.',
  'La desactivación es global y no permite desactivar funciones específicas de forma independiente.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'aiassistant', 'comercial', 'Matriz Comercial', '#185FA5', 50,
  '¿Qué política de datos y privacidad aplica a AI Assistant?',
  'Articulate no utiliza los datos del cliente para entrenar sus modelos de IA y tiene una política de retención cero con proveedores externos. Cumple con SOC 2, ISO 27001/42001 y FedRAMP. Política de privacidad robusta, seguridad de grado bancario que facilita la aprobación de IT y Legal.',
  'El procesamiento de las solicitudes se realiza en servidores ubicados en EE. UU., incluso para clientes que usan el centro de datos en la UE.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'aiassistant', 'comercial', 'Matriz Comercial', '#185FA5', 60,
  '¿Quién posee la propiedad intelectual del contenido generado y qué responsabilidad tiene el usuario?',
  'El usuario es el único responsable de los outputs generados y de cumplir con las leyes de transparencia. Articulate no reclama propiedad sobre el contenido AI. Los activos generados (imágenes, audio) pueden usarse comercialmente e incluirse en portafolios sin pagar regalías adicionales.',
  'El contenido generado no se etiqueta automáticamente y Articulate prohíbe usar la IA para entrenar modelos competidores.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'aiassistant', 'comercial', 'Matriz Comercial', '#185FA5', 70,
  '¿Cómo se diferencia el AI Assistant frente a herramientas externas como ChatGPT o Gemini?',
  'Está diseñado específicamente para e-learning, entrenado en marcos instruccionales y conectado a las herramientas de Articulate, evitando flujos ineficientes de copiar y pegar. Mantiene el contenido dentro de la nube de Articulate 360, reduciendo riesgos de exposición.',
  'El control sobre el modelo es más limitado, no permitiendo usar prompts tan complejos ni modificar el ''System prompt'' libremente.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),

-- ==========================================
-- SECCIÓN: TÉCNICA
-- ==========================================
(
  'aiassistant', 'tecnica', 'Matriz Técnica', '#0F6E56', 80,
  '¿Qué tipos de contenido puede generar el AI Assistant?',
  'Genera texto (redacción, resúmenes), imágenes con estilos (foto, 3D, acuarela), cuestionarios (opción múltiple, completar), bloques completos de Rise, narraciones de voz IA y efectos de sonido. Amplia gama de formatos de contenido y amplia integración nativa.',
  'La generación o manipulación de triggers en Storyline a menudo requiere conocimientos de la API de JavaScript.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'aiassistant', 'tecnica', 'Matriz Técnica', '#0F6E56', 90,
  '¿Qué modelos de voz IA están disponibles y cuáles son sus diferencias?',
  'Existen varios: v3 (beta) expresivo con control emocional (risas, susurros); Multilingual v2 estable; y Flash v2.5 que es mucho más rápido. Soportan decenas de idiomas. Alto grado de realismo, control emocional (v3) y flexibilidad para elegir entre velocidad y precisión.',
  'El modelo v3 está en beta, y algunos planes pueden verse limitados por cuotas de caracteres muy grandes.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'aiassistant', 'tecnica', 'Matriz Técnica', '#0F6E56', 100,
  '¿Cuál es la calidad de la traducción o generación de contenido en idiomas distintos al inglés?',
  'AI Assistant soporta cualquier idioma compatible con OpenAI. En inglés, español y alemán los resultados son de muy alta calidad. Soporte para una amplia gama de idiomas, acelerando drásticamente implementaciones globales.',
  'La calidad en idiomas fuera del top tier (ej. coreano o francés canadiense modo turbo) puede tener errores o sonido ''robótico'', requiriendo ajustes.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'aiassistant', 'tecnica', 'Matriz Técnica', '#0F6E56', 110,
  '¿Existen límites de generación por sesión o caracteres?',
  'No hay límite mensual explícito de cuotas/créditos, pero hay un uso justo. Para voz, los límites son de 3,000 a 5,000 letras por guion dependiendo de la voz elegida. El no usar ''créditos'' visibles facilita la adopción masiva sin fricciones contables.',
  'Los límites de caracteres por fragmento restringen la conversión de enormes bloques de texto en un solo clip.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'aiassistant', 'tecnica', 'Matriz Técnica', '#0F6E56', 120,
  '¿Cómo se integra el contenido generado con los flujos de publicación estándar (SCORM, xAPI)?',
  'El contenido generado es técnicamente idéntico al manual. Cumple con las mismas pautas de accesibilidad y formatos de publicación (SCORM 1.2/2004, xAPI, cmi5). Integración perfecta sin pasos adicionales, un curso con IA publica igual.',
  'Debe auditarse manualmente la accesibilidad (ej. Alt text de las imágenes generadas).',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'aiassistant', 'tecnica', 'Matriz Técnica', '#0F6E56', 130,
  '¿Puedo usar AI Assistant para generar contenido a partir de mis propios documentos?',
  'Sí. AI Assistant puede generar borradores completos (AI Course Drafts) a partir de materiales fuente (PDF, Word, PPTX) subidos y URLs de sitios web. Permite iterar prototipos en minutos basándose en manuales de producto.',
  'En archivos subidos, la IA solo extrae el texto del documento; no procesa las imágenes, audio o video internos de la fuente.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),

-- ==========================================
-- SECCIÓN: TROUBLESHOOTING CRÍTICO
-- ==========================================
(
  'aiassistant', 'troubleshooting', 'Troubleshooting', '#D85A30', 140,
  'La ventana del AI Assistant aparece y desaparece o parpadea',
  'Problema conocido de gestión de ventanas en Storyline al usar múltiples monitores.',
  'El workaround documentado es usar Storyline en un solo monitor físico o desconectar extras temporales.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'aiassistant', 'troubleshooting', 'Troubleshooting', '#D85A30', 150,
  'El volumen de los clips de texto a voz es inconsistente (se desvanece al final)',
  'Problema asociado a ciertas voces del modelo Multilingual v2. Articulate proporciona actualizaciones continuas de los modelos TTS.',
  'Se recomienda dividir el texto en fragmentos más pequeños, cambiar la voz, o usar el modelo Flash v2.5.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'aiassistant', 'troubleshooting', 'Troubleshooting', '#D85A30', 160,
  'Error ''We couldn''''t generate your audio'' al usar Texto a Voz (TTS)',
  'Falla de procesamiento al intentar exceder el umbral límite u operar en el modo Turbo con ciertos caracteres. Se identifica fácilmente cuando la cadena supera ~650 letras en algunos modos.',
  'El workaround es dividir los scripts en bloques más de texto.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'aiassistant', 'troubleshooting', 'Troubleshooting', '#D85A30', 170,
  'Error al convertir texto en Flashcards en Rise: ''Sorry, I''''m not able to do that''',
  'Ocurre cuando el texto fuente excede drásticamente el espacio previsto del reverso de una tarjeta. Protege el diseño del interfaz, evitando tarjetas visualmente inmanejables.',
  'Requiere reducir manualmente el texto o usar el conversor base estándar (Instant Convert).',
  'Análisis IA · QA', true, '{interno}'
),
(
  'aiassistant', 'troubleshooting', 'Troubleshooting', '#D85A30', 180,
  'La interfaz de la IA es intrusiva al editar cada cuadro de texto en Storyline',
  'Actualmente no hay un botón en el UI de usuario final para apagar el botón flotante en objetos de texto. Recordatorio constante de la ayuda disponible.',
  'Desactivar AI a nivel sistema elimina este molestia pero apaga también las bondades gráficas y lógicas.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'aiassistant', 'troubleshooting', 'Troubleshooting', '#D85A30', 190,
  'Las voces preestablecidas de la biblioteca dejan de ser compatibles',
  'Voces de IA de proveedores externos cambian/deprecation cíclicamente. El audio subido se conservará pero la edición posterior forzará el cambio de narrador. Articulate añade orgánicamente nuevas variaciones de alta gama.',
  'Fuerza a reemplazar todas las secuencias pasadas de voz si se requiere edición unificada.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'aiassistant', 'troubleshooting', 'Troubleshooting', '#D85A30', 200,
  'Storyline 360 se cierra inesperadamente al trabajar asiduamente con IA',
  'Archivos con exceso de assets AI alta resolución saturan la arquitectura de memoria de la app actual. La optimización de la variante de 64-bits en beta promete resolver este tope arquitectónico.',
  'Crash obliga a guardados manuales intensivos y limitación de resoluciones importadas.',
  'Análisis IA · QA', true, '{interno}'
);
