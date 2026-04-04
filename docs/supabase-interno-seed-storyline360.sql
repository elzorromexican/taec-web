-- ==========================================
-- TAEC KB Storyline 360 — INSERT COMPLETO
-- Versión: v1.0
-- Fecha: 2026-04-04
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
  'storyline360', 'comercial', 'Matriz Comercial', '#185FA5', 10,
  '¿El software permite trabajo sin conexión permanente?',
  'Sí. Requiere autenticación inicial y después permite uso offline por periodos limitados antes de exigir nueva validación. Flexibilidad para trabajar en entornos sin conectividad constante (aviones, zonas remotas, transporte).',
  'La necesidad de reautenticación periódica puede interrumpir flujos de trabajo en desconexiones prolongadas.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'storyline360', 'comercial', 'Matriz Comercial', '#185FA5', 20,
  '¿La instalación y actualización se realiza desde una aplicación de escritorio centralizada?',
  'Sí. La instalación y las actualizaciones se gestionan desde una aplicación de escritorio que centraliza el acceso a los componentes instalables. Simplifica la administración de parches y versiones; experiencia unificada para el usuario final.',
  'Dependencia de la aplicación central para todas las operaciones; fallos en ella bloquean actualizaciones e instalaciones.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'storyline360', 'comercial', 'Matriz Comercial', '#185FA5', 30,
  '¿El entorno se ejecuta de forma nativa en macOS?',
  'No de forma nativa para el editor principal; el uso en macOS depende de virtualización.',
  'Excluye a equipos que utilizan macOS como plataforma principal de desarrollo sin soluciones de virtualización adicionales.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'storyline360', 'comercial', 'Matriz Comercial', '#185FA5', 40,
  '¿Permite publicar cursos para web, LMS y LRS?',
  'Sí. Soporta publicación para web y para entornos LMS/LRS con estándares de seguimiento. Un solo flujo de publicación sirve a múltiples destinos (web, LMS, LRS).',
  'La configuración para cada destino puede requerir ajustes específicos y pruebas separadas.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'storyline360', 'comercial', 'Matriz Comercial', '#185FA5', 50,
  '¿Permite seguimiento por resultados de evaluación?',
  'Sí. Puede configurarse para rastrear la finalización mediante resultados de cuestionarios. Alinea el tracking con la evaluación real del usuario, no solo con la visualización pasiva.',
  'El seguimiento por resultados requiere diseño cuidadoso de la lógica de evaluación dentro del curso.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'storyline360', 'comercial', 'Matriz Comercial', '#185FA5', 60,
  '¿Permite distribuir contenido a usuarios móviles?',
  'Sí. La entrega en móvil se realiza por HTML5 en navegador. Sin necesidad de apps nativas; funciona en navegadores móviles estándar.',
  'La experiencia y rendimiento dependen del navegador y la conectividad; limitaciones de autoplay y almacenamiento local.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'storyline360', 'comercial', 'Matriz Comercial', '#185FA5', 70,
  '¿La salida Flash sigue siendo una opción válida?',
  'No como vía vigente para nuevas funciones. Las funciones recientes dependen de HTML5 y ciertos proyectos ya no ofrecen salida Flash. La transición a HTML5 es definitiva y alineada con el fin del soporte global a Flash.',
  'Proyectos heredados que dependían de Flash pueden requerir migración completa.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'storyline360', 'comercial', 'Matriz Comercial', '#185FA5', 80,
  '¿La suscripción incluye actualizaciones continuas y biblioteca de activos?',
  'Sí. La oferta incluye aplicaciones de autoría, revisión, biblioteca de recursos y actualizaciones continuas. Modelo "todo incluido" (autoría, recursos, revisión, despliegue ligero) con mejora continua.',
  'El valor percibido depende de la frecuencia y calidad de las actualizaciones; el cese de la suscripción implica pérdida de acceso a la biblioteca y actualizaciones.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),

-- ==========================================
-- SECCIÓN: TÉCNICA
-- ==========================================
(
  'storyline360', 'tecnica', 'Matriz Técnica', '#0F6E56', 10,
  '¿Qué estándares de publicación soporta?',
  'cmi5, xAPI, SCORM 2004, SCORM 1.2 y AICC. Cobertura completa del espectro de estándares e-learning, incluyendo los modernos (cmi5, xAPI).',
  'La variedad de estándares puede generar confusión en la selección para proyectos no especializados.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'storyline360', 'tecnica', 'Matriz Técnica', '#0F6E56', 20,
  '¿Qué funciones dependen exclusivamente de HTML5?',
  'Seguimiento ampliado de quiz, múltiples criterios de finalización, publicación a cmi5, trigger jump-to-time y reproductor moderno. Las funcionalidades más avanzadas están disponibles solo en el estándar moderno (HTML5).',
  'Los proyectos que requieren compatibilidad con entornos muy antiguos (que no soportan HTML5) no pueden usar estas funciones.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'storyline360', 'tecnica', 'Matriz Técnica', '#0F6E56', 30,
  '¿Existe límite técnico en la longitud de la ruta de publicación?',
  'Sí. Si la ruta excede 247 caracteres, la publicación puede fallar.',
  'Limitación técnica significativa en entornos con estructuras de carpetas profundas (ej. SharePoint, redes corporativas).',
  'Análisis IA · QA', true, '{interno}'
),
(
  'storyline360', 'tecnica', 'Matriz Técnica', '#0F6E56', 40,
  '¿Qué causas técnicas comunes explican un fallo de publicación?',
  'Archivo no encontrado, carpeta no encontrada, unidad inaccesible o ruta demasiado larga. Las causas están bien identificadas y documentadas.',
  'La resolución puede requerir reestructuración de directorios o permisos de red, fuera del control directo del autor.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'storyline360', 'tecnica', 'Matriz Técnica', '#0F6E56', 50,
  '¿La conformidad SCORM está declarada?',
  'Sí, pero la certificación externa formal disponible se limita a una edición concreta de SCORM 2004; la versión actual no figura sometida a certificación independiente reciente. Declaración de conformidad por parte del fabricante.',
  'Ausencia de certificación externa reciente puede ser una objeción en licitaciones que exijan validación independiente.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'storyline360', 'tecnica', 'Matriz Técnica', '#0F6E56', 60,
  '¿El contenido requiere HTML5 para las capacidades más nuevas?',
  'Sí. Las funcionalidades recientes y ciertos modos de seguimiento solo están disponibles en HTML5. La plataforma evoluciona hacia estándares web modernos.',
  'La salida HTML5 puede tener comportamientos diferentes según el navegador y versión.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'storyline360', 'tecnica', 'Matriz Técnica', '#0F6E56', 70,
  '¿Hay incompatibilidades documentadas con navegadores?',
  'Sí. Compatibility View de Internet Explorer no está soportado.',
  'Puede afectar a organizaciones que aún dependen de configuraciones heredadas de IE.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'storyline360', 'tecnica', 'Matriz Técnica', '#0F6E56', 80,
  '¿Safari/iOS puede afectar contenido incrustado o finalización?',
  'Sí. La función de prevención de rastreo entre sitios (ITP) puede interferir con carga, embebidos y registro de finalización. El problema está identificado y documentado.',
  'Impacta directamente la fiabilidad de los cursos desplegados en dispositivos Apple (iPad, iPhone, Mac).',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'storyline360', 'tecnica', 'Matriz Técnica', '#0F6E56', 90,
  '¿La configuración de LRS exige datos técnicos específicos?',
  'Sí. Requiere actor, endpoint y credenciales; cambios posteriores exigen republicación. Configuración estándar para cualquier LRS (endpoint, credenciales).',
  'La republicación obligatoria ante cambios en el LRS es costosa y poco ágil.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'storyline360', 'tecnica', 'Matriz Técnica', '#0F6E56', 100,
  '¿El producto dispone de versión de 64 bits?',
  'Sí. La edición de 64 bits se asocia a mejor estabilidad y manejo de proyectos con mucho contenido multimedia. Mejora significativa para proyectos grandes y complejos.',
  'La versión de 64 bits puede no ser la predeterminada o requerir instalación explícita.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'storyline360', 'tecnica', 'Matriz Técnica', '#0F6E56', 110,
  '¿Soporta video adaptativo y subtítulos cerrados?',
  'Sí. Soporta streaming adaptativo, importación de closed captions y control de velocidad de reproducción. Características modernas de video (adaptativo, velocidad, subtítulos) integradas.',
  'El soporte de streaming adaptativo puede depender del formato de video y del servidor de alojamiento.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'storyline360', 'tecnica', 'Matriz Técnica', '#0F6E56', 120,
  '¿Las capas de retroalimentación tienen mejoras de accesibilidad?',
  'Sí. Se documentan mejoras de contraste, color y foco para cumplimiento de accesibilidad. Mejoras activas en accesibilidad, alineadas con WCAG.',
  'El cumplimiento final sigue dependiendo de la correcta implementación por parte del autor.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'storyline360', 'tecnica', 'Matriz Técnica', '#0F6E56', 130,
  '¿El modo paso a paso puede presentar limitaciones en LMS?',
  'Sí. Se reportan bloqueos, cargas infinitas y detenciones en interacciones concretas.',
  'Modo problemático en ciertos LMS; requiere pruebas extensivas.',
  'Análisis IA · QA', true, '{interno}'
),

-- ==========================================
-- SECCIÓN: TROUBLESHOOTING CRÍTICO
-- ==========================================
(
  'storyline360', 'troubleshooting', 'Troubleshooting', '#D85A30', 10,
  '¿Qué hacer cuando el comportamiento del proyecto es errático?',
  'Trabajar con archivos guardados en disco local, no en red ni USB; si persiste, reinstalar, reiniciar y revisar dependencias del sistema. Solución clara y escalonada (localización, reinstalación, dependencias).',
  'La dependencia del disco local limita flujos de trabajo colaborativos en red.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'storyline360', 'troubleshooting', 'Troubleshooting', '#D85A30', 20,
  '¿Qué hacer cuando falla la publicación por ruta o acceso?',
  'Verificar que archivo, carpeta y unidad existan y sean accesibles; acortar la ruta a menos de 247 caracteres. Diagnóstico preciso (ruta larga, acceso, existencia).',
  'Límite de 247 caracteres es bajo para estándares modernos de sistemas de archivos.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'storyline360', 'troubleshooting', 'Troubleshooting', '#D85A30', 30,
  '¿Qué hacer si el proyecto no abre o parece corrupto?',
  'Intentar recuperar una copia temporal renombrando un archivo temporal a formato de proyecto; si no funciona, escalar a soporte para recuperación. Existe un mecanismo de recuperación manual mediante archivos temporales.',
  'La recuperación no está garantizada y puede requerir intervención de soporte.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'storyline360', 'troubleshooting', 'Troubleshooting', '#D85A30', 40,
  '¿Qué hacer si un trigger desde master slide no funciona correctamente?',
  'Mover el trigger desde la master slide a la diapositiva afectada como workaround. Workaround documentado y efectivo.',
  'La solución implica modificar la estructura del proyecto (salir del patrón master slide).',
  'Análisis IA · QA', true, '{interno}'
),
(
  'storyline360', 'troubleshooting', 'Troubleshooting', '#D85A30', 50,
  '¿Qué hacer si falla la publicación a la plataforma de revisión?',
  'Actualizar la aplicación, reinstalar si es necesario y publicar desde una ubicación local limpia.',
  'Problema recurrente; la solución es genérica (actualizar/reinstalar/ubicación local).',
  'Análisis IA · QA', true, '{interno}'
),
(
  'storyline360', 'troubleshooting', 'Troubleshooting', '#D85A30', 60,
  '¿Qué hacer si una inserción desde la biblioteca de contenido congela la aplicación?',
  'Usar una versión previa estable mientras se corrige la incidencia y evitar la compilación afectada.',
  'La solución es regresiva (usar versión anterior), no resolutiva.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'storyline360', 'troubleshooting', 'Troubleshooting', '#D85A30', 70,
  '¿Qué hacer si el contenido se desalineó tras guardar o reabrir?',
  'Validar si el problema coincide con una actualización reciente y probar en una versión anterior o reconstrucción parcial del contenido afectado.',
  'Respuesta vaga; la reconstrucción parcial es costosa.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'storyline360', 'troubleshooting', 'Troubleshooting', '#D85A30', 80,
  '¿Qué hacer si la instalación, actualización o desinstalación falla?',
  'Reiniciar el sistema, ejecutar con privilegios de administrador y hacer desinstalación manual si el instalador no resuelve el error. Existe procedimiento de desinstalación manual como último recurso.',
  'La necesidad de desinstalación manual indica fragilidad en el instalador.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'storyline360', 'troubleshooting', 'Troubleshooting', '#D85A30', 90,
  '¿Qué hacer si el LMS no registra avance o finalización?',
  'Revisar la configuración de reporting, el estándar elegido y probar el paquete en otro LMS o entorno de prueba. Estrategia de diagnóstico por aislamiento (probar en otro LMS).',
  'El problema puede ser específico del LMS del cliente, lo que prolonga el soporte.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'storyline360', 'troubleshooting', 'Troubleshooting', '#D85A30', 100,
  '¿Qué hacer si un bloque incrustado no marca completado en un curso mayor?',
  'Añadir un trigger explícito de finalización en la última pantalla y usarlo como criterio de tracking al publicar. Workaround técnico claro y replicable.',
  'Requiere modificar la lógica del curso para compensar el comportamiento del bloque.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'storyline360', 'troubleshooting', 'Troubleshooting', '#D85A30', 110,
  '¿Qué hacer si el preview no refleja correctamente el comportamiento del bloque incrustado?',
  'Validar en publicación final a LMS/LRS, ya que el preview puede no ejecutar correctamente el bloque.',
  'El preview no es fiable para bloques incrustados, lo que alarga el ciclo de pruebas.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'storyline360', 'troubleshooting', 'Troubleshooting', '#D85A30', 120,
  '¿Qué hacer si móviles no reproducen contenido automáticamente?',
  'Considerar que el autoplay puede bloquearse por políticas del navegador y exigir interacción manual del usuario. La limitación es conocida y corresponde a políticas de navegadores, no al producto.',
  'La experiencia de usuario en móviles puede ser degradada (necesidad de clic para iniciar).',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'storyline360', 'troubleshooting', 'Troubleshooting', '#D85A30', 130,
  '¿Qué hacer si las aplicaciones instaladas no aparecen en la app de escritorio?',
  'Cerrar sesión y volver a iniciar sesión. Solución simple (relogin).',
  'Problema de sincronización entre la app central y los componentes instalados.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'storyline360', 'troubleshooting', 'Troubleshooting', '#D85A30', 140,
  '¿Qué hacer si el SSO del entorno de equipo presenta errores?',
  'Revisar la configuración SSO y los errores comunes documentados para identidad y acceso. Existe documentación sobre errores comunes de SSO.',
  'La resolución puede requerir intervención del equipo de identidad de la organización.',
  'Análisis IA · QA', true, '{interno}'
),

-- ==========================================
-- SECCIÓN: OBJECIONES RECURRENTES
-- ==========================================
(
  'storyline360', 'objeciones', 'Objeciones Recurrentes', '#993556', 10,
  'La publicación falla sin mensaje útil.',
  'Hay mensajes de error detallados asociados a ruta larga, archivo faltante, carpeta faltante o unidad inaccesible. Los mensajes existen y son específicos.',
  'El usuario puede no interpretarlos correctamente sin conocimiento previo de las causas.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'storyline360', 'objeciones', 'Objeciones Recurrentes', '#993556', 20,
  'El curso no termina de registrar completitud en LMS.',
  'El problema suele estar en el criterio de tracking, el estándar seleccionado o la lógica de finalización configurada. El diagnóstico apunta a tres áreas concretas y verificables.',
  'La solución requiere revisar y posiblemente reconfigurar la lógica del curso y la publicación.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'storyline360', 'objeciones', 'Objeciones Recurrentes', '#993556', 30,
  'El preview no coincide con el comportamiento real.',
  'El preview no siempre reproduce el comportamiento final, especialmente en bloques incrustados o pruebas móviles. La limitación está documentada.',
  'Obliga a publicar y probar en el entorno destino (LMS/LRS) para validación completa.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'storyline360', 'objeciones', 'Objeciones Recurrentes', '#993556', 40,
  'Hay funciones que ya no operan en entornos antiguos.',
  'Las funciones nuevas dependen de HTML5; compatibilidades heredadas como Flash o ciertos modos de IE no cubren el mismo alcance. La evolución técnica es necesaria y está alineada con el mercado.',
  'Organizaciones con infraestructura antigua (LMS que no soporta HTML5 plenamente) quedan excluidas de nuevas funcionalidades.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'storyline360', 'objeciones', 'Objeciones Recurrentes', '#993556', 50,
  'Los proyectos grandes se vuelven inestables.',
  'La edición de 64 bits mejora estabilidad, pero sigue siendo recomendable trabajar en local y controlar assets, fuentes y rutas. Existe una versión específica (64 bits) para proyectos grandes.',
  'La estabilidad no está completamente garantizada incluso en 64 bits; requiere buenas prácticas adicionales del autor.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'storyline360', 'objeciones', 'Objeciones Recurrentes', '#993556', 60,
  'El contenido embebido falla en ciertos dispositivos Apple.',
  'Safari en iOS puede bloquear contenido embebido o afectar el tracking por restricciones de rastreo entre sitios (ITP). La causa está identificada (ITP de Apple).',
  'El autor no puede controlar ni deshabilitar ITP; la solución está fuera del alcance del producto.',
  'Análisis IA · QA', true, '{interno,titbits}'
);
