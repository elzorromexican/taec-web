# Roadmap: Panel de Administración Web (Fase 4)

Este documento traza la ruta técnica para automatizar la gestión de contenido en la Intranet de TAEC. El objetivo es eliminar la necesidad de usar el panel técnico de Supabase mediante la construcción de un "CMS interno" diseñado específicamente para el equipo directivo.

## Contexto Actual (Fase 3 Completada)
La intranet (Dashboard y Playbooks) lee en vivo de la base de datos de Supabase. Ya no hay contenido *hardcodeado* en el frontend de Astro, lo que significa que la arquitectura está lista para ser conectada a una interfaz de usuario.

## Requerimiento Funcional
> *"Quiero un botón para encender y apagar. Las herramientas van atrás, no quiero saber de cómo se genera la electricidad."*

## Especificaciones de la Fase 4

### 1. Nueva Ruta de Administración
Se creará un portal protegido por permisos de Rol (RLS) en la ruta `/interno/admin`. 
Solo los usuarios marcados como `rol = 'admin'` en la tabla `usuarios_autorizados` tendrán acceso.

### 2. Tablero de Control de "Novedades" (Dashboard)
Una interfaz tipo WordPress:
* **Lista Dinámica**: Ver las noticias pasadas, activarlas o desactivarlas con un "Toggle Switch" (Botón de encender/apagar).
* **Nuevo Aviso**: Un pequeño formulario flotante (Modal) con los siguientes campos:
  * Título del Aviso.
  * Selector de importacia (Color / Etiqueta tipo "Uso Interno" o "Noticia").
  * Caja de texto enriquecido para redactar el mensaje.
  * Botón: **"Publicar Inmediatamente"**.

### 3. Editor de Playbooks (Cabeceras Técnicas)
Una tabla interactiva mostrando los 22 productos. Al hacer clic en uno (ej. *Vyond Go*), se abre una ventana modal con:
* 3 secciones de Metadatos (Campos de texto limitados a 15 y 26 caracteres para proteger el diseño UI).
* Selector visual del patrón (Fondo: Grid, Dots, Waves).
* Un botón de "Guardar Cambios".

## Arquitectura Técnica (Developer Notes)
1. **Frontend**: Se crearán componentes en `/src/components/interno/admin/` utilizando React (`.tsx`) para la reactividad de los formularios sin recargar la página.
2. **Autenticación**: El *middleware* actual de Astro ya mapea la sesión. Solo será necesario extenderlo para validar que `Astro.locals.user.rol === 'admin'` antes de servir la página `/admin`.
3. **Peticiones SWR**: Se usará cliente SSR de Supabase para los `INSERT` y `UPDATE`. Después de ejecutar la acción, Astro invalidará el caché local obligando a que la página maestra recargue en los clientes.

---
Con este documento de referencia, cualquier desarrollador puede proceder a construir los componentes visuales sabiendo que la base de datos subyacente (`kb_playbooks` y `intranet_novedades`) ya existe y tiene las políticas de RLS adecuadas.
