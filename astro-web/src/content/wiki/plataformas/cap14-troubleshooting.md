---
capitulo: 14
titulo: "TROUBLESHOOTING FUNCIONAL B2B Y TRACKING"
version: "1.0"
---

==================================================
CAPÍTULO 14: TROUBLESHOOTING FUNCIONAL B2B Y TRACKING
==================================================
[BLOQUE FUNCIONAL: FUNCTIONAL_TROUBLESHOOTING_ENGINE]
[PROPÓSITO: Resolver problemas de tracking, completitud, resume data y comportamiento funcional entre contenido y LMS.]
[DEPENDENCIAS: Capítulos 1–13]
[ALIMENTA: Capítulos 15–18]
[REGLA DE MANTENIMIENTO: Toda falla funcional recurrente en LMS, Rise, Storyline, SCORM o xAPI se agrega aquí.]

[14.1] Suspend Data Freeze — El Más Común en Cursos Largos
Síntoma: El alumno avanza, cierra el curso y al volver pierde progreso. Siempre vuelve al mismo punto.

Diagnóstico: El campo suspend_data de SCORM 1.2 alcanzó su límite de 4,096 bytes. El LMS guardó avance hasta cierto punto y no puede guardar más. ESTE PROBLEMA NO ES UN BUG DE ARTICULATE. Es una limitación del protocolo SCORM 1.2 del año 2001.

Solución paso a paso:
1. Republica el curso desde Storyline 360 usando SCORM 2004 (3ra o 4ta Edición). El límite sube a 64 KB.
2. Alternativa: publicar en xAPI o cmi5. Sin límite artificial de memoria.
3. Si el LMS no soporta SCORM 2004: simplificar las interacciones del curso para reducir el volumen de datos guardados.

[14.2] Bloque Storyline Incompleto dentro de Rise 360
Síntoma: El bloque de Storyline incrustado en Rise aparece como "Incompleto" aunque el usuario terminó la actividad.

Diagnóstico: El trigger de "Complete Course" en Storyline no está configurado o no se definió como criterio de seguimiento al publicar el bloque.

Solución paso a paso:
1. Abrir el proyecto .story.
2. En la última diapositiva (o al aprobar el quiz), verificar que existe un trigger: "Complete course when [condición]."
3. Al publicar el bloque de Storyline a Review 360: ir a "Opciones de Registro" > seleccionar ese trigger como criterio de completitud.
4. Republica el paquete Rise 360 y sube la nueva versión al LMS.

ACLARACIÓN: El problema puede manifestarse en el Preview de Rise o en Review 360, pero no necesariamente en el LMS final. Si el LMS sigue reportando incompleto después de corregir los triggers, verificar también la configuración de tracking del módulo SCORM dentro del LMS (en Moodle: Administración del SCORM > Método de calificación).

[14.3] SCORM No Guarda Avance — Los 3 Culpables
Los tres causas más frecuentes cuando el alumno siempre vuelve al inicio:

1. Suspend_data desbordado (ver 14.1). Solución: migrar a SCORM 2004.

2. LMS configurado para reiniciar siempre el intento. El administrador del LMS tiene activa la opción "Forzar nuevo intento en cada entrada". Solución: desactivar esa opción en la configuración del módulo SCORM dentro del LMS.

3. Cookies o proxy bloqueando las llamadas SCORM. El navegador tiene bloqueadas cookies de terceros o un proxy corporativo intercepta las llamadas. Solución: pedir al área de TI que agregue el dominio del LMS como excepción de cookies y whitelist de proxy.

[14.4] Estados de SCORM Confusos en Moodle
- "Not Attempted": el alumno nunca abrió el curso.
- "Incomplete": abrió el curso pero no cumplió el criterio de completitud.
- "Passed": terminó y obtuvo calificación aprobatoria. Solo aparece si el curso tiene quiz con calificación mínima.
- "Completed": terminó el curso por criterio de completitud (última slide vista o % de slides). No implica que pasó un examen.
- "Failed": completó el intento pero no alcanzó la calificación mínima del quiz.
- "Complete + Failed" (SCORM 2004): el alumno terminó el curso pero reprobó el examen. No es un error.

[14.5] Señal de Escalamiento a Entorno Corporativo
Si la falla parece relacionada con: proxy, red corporativa, SSO, MSI, offline, Mac/Parallels, whitelisting o política de TI → redirigir al Capítulo 16.

==================================================
BLOQUE 5: FAQ, IT Y LOCALIZACIÓN
Capítulos 15–17
==================================================

