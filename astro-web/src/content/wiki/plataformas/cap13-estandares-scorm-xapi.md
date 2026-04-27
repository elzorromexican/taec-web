---
capitulo: 13
titulo: "ESTÁNDARES DE DISTRIBUCIÓN — SCORM, xAPI Y cmi5"
version: "1.0"
---

==================================================
CAPÍTULO 13: ESTÁNDARES DE DISTRIBUCIÓN — SCORM, xAPI Y cmi5
==================================================
[BLOQUE FUNCIONAL: LEARNING_STANDARDS_ENGINE]
[PROPÓSITO: Explicar qué estándar conviene según tracking, compatibilidad y complejidad del ecosistema.]
[DEPENDENCIAS: Capítulos 1–12]
[ALIMENTA: Capítulos 14–18]
[REGLA DE MANTENIMIENTO: Actualizaciones sobre SCORM, xAPI, cmi5 o compatibilidad LMS se documentan aquí antes de troubleshooting.]

[13.1] SCORM 1.2 — El Estándar de Batalla
Cuándo usar:
- LMS legacy con máxima compatibilidad requerida
- tracking básico (completitud, calificación, tiempo)
- cliente que prioriza estabilidad sobre features avanzadas

CÓMO FUNCIONA: Articulate genera un .zip con HTML/JS y el archivo maestro "imsmanifest.xml". El LMS lee ese manifest para trackear: calificación (cmi.core.score), tiempo (cmi.core.session_time) y estado (cmi.core.lesson_status: Passed / Failed / Incomplete / Not Attempted).

LIMITACIÓN CRÍTICA: El campo suspend_data de SCORM 1.2 tiene un límite estricto de 4,096 caracteres (4 KB).
Para cursos largos o con muchas interacciones, este límite se desborda y el LMS deja de guardar el avance correctamente. Ver Capítulo 14.1 para diagnóstico y solución.

[13.2] SCORM 2004 — Tracking Avanzado
Cuándo usar:
- cursos complejos con más de 50 slides interactivas
- rutas secuenciales condicionales
- LMS moderno con soporte validado

MEJORA CLAVE: El suspend_data sube a 64,000 bytes (64 KB). Resuelve el problema de desbordamiento de SCORM 1.2 en cursos largos.

ESTADOS SCORM 2004: A diferencia de SCORM 1.2 (un solo estado), SCORM 2004 maneja DOS:
- Completion Status: Complete / Incomplete
- Success Status: Passed / Failed

Esto puede generar confusión en reportes. Ejemplo: un curso puede estar "Complete + Failed" = el alumno terminó el curso pero no pasó el quiz. No es un error del sistema.

ADVERTENCIA: Muchos LMS antiguos tienen soporte parcial de SCORM 2004. Validar siempre en SCORM Cloud antes de desplegar en producción.

[13.3] xAPI (Tin Can API) — Tracking Fuera del LMS
Cuándo usar:
- tracking fuera del LMS (apps móviles, realidad virtual, simuladores físicos)
- academias distribuidas con aprendizaje en campo
- learning analytics avanzados por comportamiento real

ESQUEMA BASE: "Actor + Verbo + Objeto."
Ejemplo: "Juan Pérez + completó + Módulo 1 de Seguridad."
Los datos van a un LRS (Learning Record Store) independiente del LMS.

Ideal cuando el KPI depende de comportamiento real, no solo finalización de pantalla.

[13.4] cmi5 — Lo Mejor de Ambos Mundos
Combina: estructura distribuible de SCORM + flexibilidad de xAPI + tracking moderno.
Muy útil para ecosistemas híbridos con distribución multi canal.
Articulate Storyline 360 y Rise 360 exportan nativamente a cmi5.

[13.5] Regla Consultiva
No recomendar estándar solo por tendencia.
Primero evaluar: LMS destino + compatibilidad validada + tipo de experiencia + profundidad analítica requerida + movilidad + limitaciones del cliente.

