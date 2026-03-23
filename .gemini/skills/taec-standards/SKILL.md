---
name: Formato de Documentacion TAEC
description: Reglas de encabezado, documentación y trazabilidad (equivalente a cursorrules) aplicables a todos los nuevos archivos o ediciones en TAEC Web.
---

# Reglas Generales de Documentación (taec-web)

**CRÍTICO:** Cada vez que la IA cree un NUEVO archivo de código (.js, .mjs, .astro, .css, .sql, etc.) o modifique de forma importante uno existente que no tenga metadatos, DEBE incluir obligatoriamente la siguiente plantilla de metadatos al inicio del archivo.

Se debe usar la sintaxis de comentarios adecuada para el lenguaje abordado:
- JS/TS: `/** ... */`
- HTML/Astro: `/** ... */` dentro del Frontmatter `---` o equivalente.
- CSS/SQL: `/* ... */` o equivalente.

**FORMATO ESTRICTO REQUERIDO:**
@name [Nombre o Título del Archivo]
@version [1.0 para nuevos, v1.x para cambios, v2.0 para reescrituras]
@description [Descripción de 1-2 líneas sobre qué hace el archivo]
@inputs [Datos que recibe, props, o N/A]
@outputs [Qué devuelve, exporta o renderiza]
@dependencies [Librerías, componentes o archivos que importa/usa]
@created YYYY-MM-DD
@updated YYYY-MM-DD HH:MM:SS

**Refactorización (Regla del Boy Scout):**
Al modificar código EXISTENTE que no tenga la cabecera anterior documentada, antes de dar por terminada la tarea, el agente insertará el bloque de metadatos en la parte superior con los datos que correspondan, actualizando el `@updated` con la hora local.
