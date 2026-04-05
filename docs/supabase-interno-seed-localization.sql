-- ==========================================
-- TAEC KB Localization — INSERT COMPLETO
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
  'localization', 'comercial', 'Matriz Comercial', '#185FA5', 10,
  '¿Qué diferencias clave existen entre Storyline 360 y Rise 360 para proyectos de localización?',
  'Storyline 360 permite exportación a XLIFF/DOCX para traducción externa y tiene soporte RTL manual. Rise 360 traduce automáticamente con IA en la nube, sin exportación manual XLIFF en flujos tradicionales. Su ventaja radica en que ambos están integrados en la herramienta "Articulate Localization", permitiendo la gestión unificada de cursos multilingües sin salir del ecosistema de Articulate 360.',
  'Rise 365 no permite a los alumnos reiniciar su progreso para cambiar de idioma en LMS externos (sí en Reach 360), mientras Storyline sí.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'localization', 'comercial', 'Matriz Comercial', '#185FA5', 20,
  '¿Cuáles son los idiomas oficialmente soportados por Articulate Localization?',
  'Soporta más de 70 idiomas, incluyendo RTL (Árabe, Hebreo, Farsi) y variantes regionales como Chino Simplificado y Tradicional. Además, la funcionalidad de IA incluye la parametrización de niveles de "formalidad" automática para idiomas que exigen tratamiento cultural diferencial (ej. alemán, francés, japonés).',
  'Las variantes regionales específicas (zh-cn, zh-tw) tienen limitaciones operativas de emparejamiento con el resto de la lista.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'localization', 'comercial', 'Matriz Comercial', '#185FA5', 30,
  '¿Cómo funciona la integración con agencias de traducción y herramientas CAT?',
  'Soporta la exportación nativa de archivos XLIFF (el estándar universal para herramientas CAT) y DOCX, lo que permite aprovechar plataformas corporativas del mercado como Trados o memoQ para sostener Memorias de Traducción (TM) propias sin integraciones de API costosas.',
  'La memoria de traducción (TM) propia de Articulate Localization está aún en evaluación en el roadmap; no hay integración nativa para TMs externas.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'localization', 'comercial', 'Matriz Comercial', '#185FA5', 40,
  '¿Cuál es el costo y modelo de licenciamiento para funciones de localización?',
  'Disponible de forma completa tras un Trial de 21 días para suscriptores. Es un costo adicional (Add-On) sobre la licencia base. El precio se basa en el consumo o "unidades de traducción". Como ventaja crítica, la re-traducción o actualización sobre un curso-idioma que ya fue creado y contabilizado en el contrato actual, no consume unidades adicionales.',
  'Duplicar cursos completos en Rise (Stacks alternativos) forzará al sistema a contabilizar y consumir nuevas unidades de traducciones vírgenes.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'localization', 'comercial', 'Matriz Comercial', '#185FA5', 50,
  '¿Qué herramientas de Articulate 360 soportan la característica de Localization y cuál es su beneficio principal?',
  'Rise 360 y Storyline 360 soportan localización robusta con flujos de traducción IA integrados en el ecosistema, agilizando drásticamente los timelines operacionales al unificar múltiples versiones lingüísticas dentro de la gestión de un solo entorno base unificado o archivo.',
  'Todo su flujo automatizado veloz está amurallado bajo la contratación específica de la suite pagada "Articulate Localization".',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),

-- ==========================================
-- SECCIÓN: TÉCNICA
-- ==========================================
(
  'localization', 'tecnica', 'Matriz Técnica', '#0F6E56', 60,
  '¿Qué formatos de exportación son preferibles para flujos de traducción técnica?',
  'XLIFF manda y ordena para el gremio de agencias y traductores técnicos. Rise 360 ahora incorpora la traducción IA nativa para evitar exportar a ciegas. Storyline 360 además exporta el utilísimo DOCX con metadatos de las capas y diapositivas completas que ayudan a diagramar las pre-cotizaciones.',
  'El flujo oculto de Rise 360 bloquea usar su XLIFF libremente para agencias ajenas si se busca hacerlo manualmente sin la licencia AI correspondiente.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'localization', 'tecnica', 'Matriz Técnica', '#0F6E56', 70,
  '¿Cómo se comportan las fuentes con caracteres especiales (Chino, Cirílico, etc.) y desbordamientos?',
  'Storyline efectúa silenciosamente una sustitución de "Fallback font" sin alertar. Las mejores prácticas exigen ir a "Reemplazar fuentes" globalmente hacia opciones con pleno blindaje de glifos unicode (ej. Arial Unicode MS). Para el layout, la tecnología efectúa una detección constante advirtiendo al equipo.',
  'Ausencia crónica de un escalado o contracción automatizada óptima; demanda reajustar infaliblemente cajas para lenguas germánicas expansivas.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'localization', 'tecnica', 'Matriz Técnica', '#0F6E56', 80,
  '¿Hay soporte nativo para idiomas RTL (Árabe, Hebreo)?',
  'Rise 360 efectúa adaptaciones espejadas del total de su intefaz e UI maravillosamente de modo automatizado invirtiendo la polaridad y jerarquía LTR sin dolo. En Storyline 360, el proceso exige directivas explícitas de programación e inversión del player local, y variables como "Player.LanguageIsRightToLeft".',
  'En Storyline 360 no resulta automático el acomodo estético; y si se personaliza el "Modern Player", paradójicamente puede quebrar la inmersión visual estricta.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'localization', 'tecnica', 'Matriz Técnica', '#0F6E56', 90,
  '¿Qué sucede con las variables, logic, y activadores (triggers) al reimportar una traducción?',
  'La plataforma procesa un ecosistema intocable preservando milimétricamente el flujograma relacional y arquitectura lógica entera; incluso los "estados de objetos" (Hovers) engloban la traducción. Permite sustituir exclusivamente el esqueleto tipográfico y mantener el .story totalmente unificado.',
  'Los triggers cuya validación depende exclusivamente que el alumno tipee "textos duros literales" van a fracasar si no se homologan los scripts evaluativos.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'localization', 'tecnica', 'Matriz Técnica', '#0F6E56', 100,
  '¿Cuáles son los límites de capacidad, precisión y confidencialidad del AI Assistant en traducciones?',
  'Cumple con normativas "Zero Retention" de modo estricto en B2B no empleando bajo ningún aspecto data para re-entrenos genéricos. Además los "Glosarios Custom" unifican nomenclaturas en industrias precisas, segmentando el pipeline computarizado por batches de hasta 1000 iteraciones/palabras contra alucinaciones.',
  'Inhabilidad técnica permanente sobre la lectura OCR rasterizada en JPGs adjuntos, los textos escritos enteros Capitalizados ciegamente y jergas conectoras.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'localization', 'tecnica', 'Matriz Técnica', '#0F6E56', 110,
  '¿Cómo se gestiona la sincronización de audio localizado y narraciones TTS?',
  'Con un flujo enfocado para que el usuario despliegue el reemplazo asíncrono sobre el timeline de base, efectuando swap total de media por cada stack lingüístico. La AI Assistant asiste poderosamente generando doblaje de Text-to-Speech multilingüe a partir del CC / libreto base si así se demanda orgánicamente en el entorno.',
  'La imposibilidad de inyectar TTS editado individualmente posterga las modificaciones precisas; si hay cambio de acento se debe regenerar bloque.',
  'Análisis IA · QA', true, '{interno,titbits}'
),

-- ==========================================
-- SECCIÓN: TROUBLESHOOTING CRÍTICO
-- ==========================================
(
  'localization', 'troubleshooting', 'Troubleshooting', '#D85A30', 120,
  'Al importar un XLIFF en Rise 360, el estado se queda colgado en "Processing translation"',
  'Atribuible invariablemente a divergencias sobre el flujo exacto por metadatos rotos. Hay que respetar los 4 pasos inquebrantables: Duplicar curso > Exportar XLIFF > Traducir obligadamente por una herramienta CAT (No bloc notas) > y finalmente Importar sobre ese mismo archivo. Usar Smartcat/Trados anula de facto cuelgues sintácticos.',
  'Plataforma no indica qué renglón o label presenta la asimetría XML en el código, arrojando falsas pantallas blancas (Caja Negra).',
  'Análisis IA · QA', true, '{interno}'
),
(
  'localization', 'troubleshooting', 'Troubleshooting', '#D85A30', 130,
  'Storyline importa la traducción pero arroja caracteres raros "mojibake" o cuadrados vacíos',
  'Signo fehaciente que la familia de fuente carece de los glyphs correctos de esa región idiomática. Hay que usar la funcionalidad nativa de "Reemplazar Fuentes" a un soporte universal como "Arial Unicode MS" o "Noto Sans" proactivamente para eliminar vacíos de visualización defectuosos.',
  'Fallo indetectable preventivamente dado que Storyline no alerta carencia de caracteres en lienzo sino al publicar la vista preliminar final.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'localization', 'troubleshooting', 'Troubleshooting', '#D85A30', 140,
  'El texto traducido desborda y se sale o se superpone en botones/cajas en Storyline',
  'Storyline no ejecuta un auto-resizing dinámico post compilación en lenguajes latinos más holgados que el inglés, forzando a revisar layout. Se puede desplegar y aprovechar la advertencia escaneada automatizada de "Design Assistant" detectando hasta 147 fallos en encuadres y mitigándolos con ajuste individual.',
  'Ajustes repetitivos masivos a realizar; además, la modalidad "shrink to fit" exhibe fallas que rompen métricas con scrollbars innecesarias temporalmente.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'localization', 'troubleshooting', 'Troubleshooting', '#D85A30', 150,
  'Si anido bloques de Storyline en Rise 360 y localizo; los bloques no se traducen',
  'Es natural debido a la barrera arquitectónica base (iFrame cerrado). La directriz corporativa obliga que se exporte la pieza original en el software Storyline primeramente, traduciendo a los blancos idóneos de modo independiente, republicando y anidándolos otra vez en cada stack de la división de Rise 360.',
  'Desbaratador esfuerzo e incremento radical en la carga de tareas si se operan micro-modificaciones en 15 lenguas bajo 4 iteraciones distintas de updates.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'localization', 'troubleshooting', 'Troubleshooting', '#D85A30', 160,
  'Los hipervínculos marcados al interior de un párrafo en texto Árabe no responden ni clican',
  'Genuino bug documentado a lo largo del tiempo de renderizado de la envoltura HTML por codificación BiDi/RTL en la que no se detecta la frontera virtual. La acción correctiva definitiva validada reside en "aislar" el link añadiendo imperceptibles puntuaciones al inicio e final con un color igual al fondo de la cartilla.',
  'Imposición arcaica sobre el QA B2B, forzando una intervención individual titánica e incomodísima curso por curso si el volumen de referencias es abismal.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'localization', 'troubleshooting', 'Troubleshooting', '#D85A30', 170,
  'Etiquetas "object Object" invaden textos de Storyline tras la vuelta del XLIFF',
  'Surgen irrebatiblemente por carencia de parametrización especializada en regex por parte de agencias traductoras operando Trados/MemoQ; por lo cual devoran recursos blob numéricos como si fuesen cadenas traducibles. Deben establecerse filtros directos en los pipelines de traducción de entrada (software externo) del XML.',
  'Suele culparse injustificadamente a la herramienta Storyline cuando deriva de impericias estructurales en la importación por de parte de los terceros outsourcing.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'localization', 'troubleshooting', 'Troubleshooting', '#D85A30', 180,
  'El alumno no logra resetear idioma en medio de la currícula albergada en el SCORM/LMS',
  'Mientras los desarrollos hosteados en los servidores de Reach 360 retendrán progresos de modo dinámico tolerante, Rise carece de la opción Mid-course. Solución obligatoria para Storyline es marcar los parámetros de "Reanudar comportamiento" como opcionales pidiendo si desea arrancar un reinicio limpio desde el Prompt inicial.',
  'Rise 360 exterior no permite purgar el estatus ni caché salvo erradicando métricas de tracking operacionales desde la ficha matricial de los LMS genéricos.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'localization', 'troubleshooting', 'Troubleshooting', '#D85A30', 190,
  'Los estados condicionales Hover (Flotación) o de pulsación de objeto salieron siempre en Inglés',
  'Suele representar omisiones al momento de configurar exportes matriciales no abarcando integralmente las capas ocultas ni los estados extra del tablero durante el empaquetamiento inicial XML. Si la exportación asume exclusiones de checklist, esto es evitable controlando proactivamente.',
  'Incertidumbre altísima durante empaquetamiento masivo de traductores ignorando las divisiones en subpestañas y capas sin percatarse hasta el Quality Assurance final.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'localization', 'troubleshooting', 'Troubleshooting', '#D85A30', 200,
  'Textos dentro de imágenes elaboradas de infografías (JPG/PNG) quedaron sin traducción e intactas',
  'La plataforma IA omite aplicar OCR intrusivo para no destruir la interpolación de los cuadros bitmapped resguardando su diseño. Resulta crucial valerse de "Exportar a nivel de Librería Masiva" y valiéndose de Photoshop superponer etiquetas, recargando simultáneamente a todo el proyecto con "Reemplazar Recurso" magistralmente en la matriz visual.',
  'Agujero funcional insoslayable con inmersiones de trabajo externas demandando pericia ineludible en software Adobe frente a layouts flat elaborados excesivamente pixelizados.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'localization', 'troubleshooting', 'Troubleshooting', '#D85A30', 210,
  'Modificaciones o revisiones al idioma padre/master causan desincronías y rechazos catastróficos',
  'Se prohíbe retocar cualquier ramaje de la lección tras emitir el pase XLIFF de migración y aún transita en manos de traductores; alterará las ID relacionales que la Base exige. En paralelo, en ecosistema Rise local, un Punto Azul advertirá sabiamente desactualizaciones demandantes entre el Stack origen frente al filial por cambios recientes asíncronos.',
  'Una vez reingresada tarde la copia de Trados, el mismatch o desajuste de párrafos arrojará "Something went wrong", lapidando la posibilidad de salvamento fácil.',
  'Análisis IA · QA', true, '{interno}'
);
