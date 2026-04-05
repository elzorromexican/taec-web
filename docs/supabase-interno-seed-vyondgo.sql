-- ==========================================
-- TAEC KB Vyond GO — INSERT COMPLETO
-- Versión: v1.0
-- Fecha: 2026-04-05
-- Owner: Dirección Comercial TAEC
-- ==========================================

INSERT INTO kb_items (
  producto, seccion, seccion_label, seccion_color, orden,
  pregunta, plus, menos, fuente, activo, audiencia
) VALUES

-- ==========================================
-- SECCIÓN: TROUBLESHOOTING CRÍTICO
-- ==========================================
(
  'vyondgo', 'troubleshooting', 'Troubleshooting', '#D85A30', 10,
  'Error al generar video desde URL o Documento',
  'Asegurarse de que el documento no sea un PDF escaneado (imagen) y que la URL sea pública. Workaround: Copiar el texto manualmente. La IA procesa mejor textos limpios y estructurados.',
  'Documentos muy largos o con tablas complejas fallan frecuentemente en la extracción de contexto.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondgo', 'troubleshooting', 'Troubleshooting', '#D85A30', 20,
  'Voces de IA suenan robóticas o con mala entonación',
  'Usar la función "Speech Enhancer" o seleccionar voces marcadas como "Ultra High Quality" (solo Profesional/Enterprise). Las voces Pro permiten control de entonación y énfasis en palabras clave.',
  '[DOLOR VALIDADO] Persisten inconsistencias en la pronunciación de términos técnicos o acrónimos [Reddit].',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondgo', 'troubleshooting', 'Troubleshooting', '#D85A30', 30,
  'Personaje de IA no realiza la acción deseada',
  'Usar la función "Video to Action" o editar manualmente el personaje en Vyond Studio tras la generación. La librería de acciones preestablecidas es la más grande del mercado B2B.',
  'Vyond Go por sí solo tiene acciones limitadas; la edición fina requiere saltar a Studio.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondgo', 'troubleshooting', 'Troubleshooting', '#D85A30', 40,
  'Lentitud o lag durante la edición de videos largos',
  'Limpiar caché del navegador o trabajar en segmentos (escenas) y unirlos al final. (Soporte Oficial). El sistema guarda cambios automáticamente en la nube (auto-save).',
  '[DOLOR VALIDADO] Reportes recurrentes de lentitud en proyectos con más de 20 escenas o múltiples assets 4K [G2].',
  'Análisis IA · QA', true, '{interno}'
),
(
  'vyondgo', 'troubleshooting', 'Troubleshooting', '#D85A30', 50,
  'Problemas de descarga: el video se queda en 99%',
  'Verificar conexión a internet y evitar cerrar la pestaña. Si persiste, generar el link de descarga desde el correo enviado. El procesamiento se hace en servidores de Vyond (AWS), no consume recursos locales de CPU.',
  'Fallos ocasionales en picos de tráfico del servidor pueden retrasar la generación de archivos 1080p.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'vyondgo', 'troubleshooting', 'Troubleshooting', '#D85A30', 60,
  'No puedo compartir carpetas con mi equipo',
  'Verificar que se tenga una licencia Profesional o Enterprise. Las carpetas compartidas se gestionan desde el panel de administrador. Permite flujos de trabajo colaborativos reales entre varios diseñadores.',
  '[DATO NO DISPONIBLE] No hay opción de co-edición en tiempo real (dos personas en el mismo video a la vez).',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondgo', 'troubleshooting', 'Troubleshooting', '#D85A30', 70,
  'Limitación de diversidad en personajes de IA',
  'Utilizar el "Character Creator" para generar avatares específicos o subir una foto para crear un avatar de IA personalizado. Permite crear personajes que reflejen la demografía real de la empresa.',
  '[DOLOR VALIDADO] Quejas sobre la falta de diversidad "out-of-the-box" en las plantillas rápidas [G2].',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondgo', 'troubleshooting', 'Troubleshooting', '#D85A30', 80,
  'Falta de activos específicos (props) para mi industria',
  'Cargar assets propios (SVG, PNG) o usar "Text to Image" para generar el objeto faltante con IA. La IA generativa de imágenes cubre vacíos de la librería estándar.',
  'Los assets generados por IA a veces no coinciden con el estilo artístico (Cartoon/Contemporary) del video.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondgo', 'troubleshooting', 'Troubleshooting', '#D85A30', 90,
  'SSO / Login no funciona en Enterprise',
  'Contactar al administrador de TI para revisar la configuración de SAML. (Soporte Staff). Provee una capa de seguridad crítica para cumplir con políticas de IT.',
  'Requiere configuración manual inicial por parte del departamento de sistemas del cliente.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondgo', 'troubleshooting', 'Troubleshooting', '#D85A30', 100,
  'Error de sincronización de audio (Lip-sync)',
  'El Lip-sync es automático. Si falla, borrar el audio y volver a asignarlo al personaje manualmente. Una de las funciones más potentes; el personaje mueve la boca automáticamente según el texto.',
  'En Vyond Go, el lip-sync puede desfasarse si hay muchos cambios de escena rápidos.',
  'Análisis IA · QA', true, '{interno,titbits}'
),

-- FALLOS EXTRA
(
  'vyondgo', 'troubleshooting', 'Troubleshooting', '#D85A30', 110,
  'El personaje se desplaza al reemplazarlo en Quick Edit',
  'Al reemplazar personajes dentro de Quick Edit con plantillas "Talking Head", el personaje sufre desplazamiento. Se recomienda ajustar el video en Vyond Studio para corregir la posición.',
  'No existe una solución oficial dentro de Quick Edit. Requiere salir al editor completo.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondgo', 'troubleshooting', 'Troubleshooting', '#D85A30', 120,
  'El video no se abre al hacer clic en "Editar"',
  'Una nueva pestaña no se abre o se bloquea. Verificar la configuración del bloqueador de pop-ups del navegador y permitir que Vyond abra nuevas pestañas.',
  'Problema de usabilidad que depende de la configuración del navegador.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'vyondgo', 'troubleshooting', 'Troubleshooting', '#D85A30', 130,
  'El archivo PPTX subido produce un error',
  'Al usar "Document-to-video" falla. Asegurarse de quitar efectos y animaciones del PPTX antes de subirlo.',
  'Requiere modificar el archivo fuente, añadiendo trabajo intermedio no documentado.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondgo', 'troubleshooting', 'Troubleshooting', '#D85A30', 140,
  'La IA genera resultados inexactos o sin sentido',
  'Los videos por IA no siempre logran precisión. Revisar cuidadosamente el contenido generado y re-editarlo. Guiar a Vyond GO con descripciones claras.',
  'Limitación inherente a la IA generativa. El componente necesita trabajo logíco.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondgo', 'troubleshooting', 'Troubleshooting', '#D85A30', 150,
  'El video tarda mucho en generarse con avatar',
  'Plantillas de AI avatar pueden tardar de 30 a 60 minutos en procesar. No existe solución técnica, se aconseja planificar pausas.',
  'Genera lentitud y frena el flujo iterativo al requerir espera prolongada.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondgo', 'troubleshooting', 'Troubleshooting', '#D85A30', 160,
  'No se puede previsualizar avatares en la ventana de edición rápida',
  'La función "Preview" en Quick Edit no despliega avatares de IA generativos aún cargando.',
  'Obliga a los usuarios a generar y exportar el video completo para ver los cambios.',
  'Análisis IA · QA', true, '{interno,titbits}'
),

-- ==========================================
-- SECCIÓN: COMERCIAL
-- ==========================================
(
  'vyondgo', 'comercial', 'Matriz Comercial', '#185FA5', 170,
  '¿Qué capacidades de Vyond Go están incluidas en el plan Profesional?',
  'Generación de video por IA mediante prompt, script, documento o URL (400 créditos generacionales, unos 20,000 al mes). Selección de idioma, "Vibe" y edición rápida "Quick Edit" disponible integrándose hacia Vyond Studio.',
  'Créditos limitados pueden quedarse escasos. Las voces de IA a nivel estándar pueden ser menos fluidas frente al nivel Enterprise.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondgo', 'comercial', 'Matriz Comercial', '#185FA5', 180,
  '¿Qué capacidades adicionales de Vyond Go ofrece el plan Enterprise?',
  'Todo el plan Professional + créditos "Virtualmente Ilimitados". Además proporciona marca de agua personalizada, espacios compartidos (Shared Spaces), voces Speech-to-Text de UHQ e integraciones como Vbrick para corporativos robustos.',
  '[DATO NO DISPONIBLE] No se reportan contras significativos limitantes de este plan.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondgo', 'comercial', 'Matriz Comercial', '#185FA5', 190,
  '¿Cuáles son los casos de uso corporativos documentados para Vyond Go?',
  'Comunicaciones, onboarding de RH, compliance y ventas/marketing. Resulta ideal para acortar tiempos en agencias que manejan volúmen, usando el generador y exportando rápido a Studio.',
  'El estilo está limitado a las plantillas predefinidas que la IA asigna.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondgo', 'comercial', 'Matriz Comercial', '#185FA5', 200,
  '¿Cuál es la diferencia clave entre Vyond Go y Vyond Studio?',
  'Vyond Go es un creador instantáneo por prompt generativo, que produce borradores 10x más rápido. Vyond Studio es el editor granular y completo en la nube con línea de tiempo detallada, el cual reciba los borradores limpios desde Vyond Go.',
  'El flujo inicial en Go es impredecible comparado a la construcción paso a paso de Studio.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondgo', 'comercial', 'Matriz Comercial', '#185FA5', 210,
  '¿Cuáles son los argumentos de venta validados para Vyond Go?',
  'Extremo ahorro en TTM (Time-to-Market), reduce tiempo de días a horas. Sencillez sin necesidad de habilidades de animación profundas. Transición de material denso (URLs/PPTXs) a un formato dinámico validado mundialmente.',
  'Precios de plan alto, dependencia mandatoria de la nube (internet always-on).',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondgo', 'comercial', 'Matriz Comercial', '#185FA5', 220,
  '¿Qué políticas de seguridad y cumplimiento normativo aplican a clientes Enterprise?',
  'Es FedRAMP Authorized, cumple GDPR con políticas de divulgación estricta y se blinda gracias a integraciones Enterprise-ready como VBrick o Teams.',
  '[DATO NO DISPONIBLE]',
  'Análisis IA · QA', true, '{interno,titbits}'
),

-- ==========================================
-- SECCIÓN: TÉCNICA
-- ==========================================
(
  'vyondgo', 'tecnica', 'Matriz Técnica', '#0F6E56', 230,
  '¿Cuál es el flujo de creación de video con IA generativa en Vyond Go?',
  'Dentro del portal: Escoger Input (Prompt/Doc/URL) -> Determinar Layout -> Elegir Personaje y Voz -> Ajustar Vibe. Go devuelve un script y genera el Storyboard. El editor "Quick Edit" se usa para refinar superficialmente.',
  'La generación gasta créditos de IA y las plantillas complejas tardan. Exige prompt engineering.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondgo', 'tecnica', 'Matriz Técnica', '#0F6E56', 240,
  '¿Cómo se integra Vyond Go en los flujos de producción de contenido L&D?',
  'Acelera iteraciones "Borrador" usando docs pre-existentes (PPTX), Zapier, Slack, liberando al ID para optimizar pedagogía en lugar del montaje desde cero.',
  'No exporta a formato SCORM nativo desde Go. Hay que mover el proyecto a Studio para finalizar ese paso.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondgo', 'tecnica', 'Matriz Técnica', '#0F6E56', 250,
  '¿Qué formatos de exportación están disponibles al terminar?',
  'MP4, webM, imágenes estáticas y gifs dinámicos. También SCORM pero ejecutando el export desde Vyond Studio.',
  'Existen marcas de agua en versiones gratuitas.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondgo', 'tecnica', 'Matriz Técnica', '#0F6E56', 260,
  '¿Cuáles son los límites de duración y resolución de los videos?',
  'Por lo general duran ~2 min como estándar de generación IA. Se pueden exportar con resoluciones hasta 1080p, y la plataforma tolera escalabilidad.',
  'Imposible ordenar desde el prompt cuántos minutos exactos debe tener el clip.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondgo', 'tecnica', 'Matriz Técnica', '#0F6E56', 270,
  '¿Qué integraciones con herramientas externas están documentadas?',
  'Integrado fuertemente a canal de comandos en Slack, y workflows de n8n/Zapier, incluyendo automatizaciones con Google Docs para extraer scripts limpios.',
  'Requiere configuración inicial externa (Autenticaciones vía API).',
  'Análisis IA · QA', true, '{interno,titbits}'
)
;
