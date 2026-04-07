# TAEC B2B Intranet - Admin Panel Roadmap

## Visión General
Actualmente, la intranet de TAEC opera con un modelo "Headless CMS" donde el backend es Supabase y el frontend es Astro, pero la administración del contenido recae en editar directamente en el panel de Supabase.

El objetivo de este roadmap es delinear la estrategia para la creación de un **Panel de Administración nativo (Admin UI)**. Esto permitirá que el equipo comercial, de marketing o administrativo pueda crear novedades, actualizar metadatos y redactar documentación sin depender del equipo técnico ni tener acceso a la base de datos subyacente.

## 1. Arquitectura del Panel

El panel se integrará dentro del mismo ecosistema de la intranet como rutas protegidas bajo `/interno/admin/`.

*   **Autenticación y Autorización:** Se expandirá el middleware actual (`src/middleware/auth.ts`) para incluir verificación de roles basados en Claims (`Role-Based Access Control`), asegurando que solo usuarios con rol de `editor` o `admin` tengan acceso.
*   **Editor de Contenido WYSIWYG:** Integración de un editor enriquecido para las novedades y la base de conocimientos que mapee a HTML ligero en Supabase.
*   **Gestión de Metadatos (Formularios Dinámicos):** UI que parsee la estructura JSON o las columnas fijas (como `meta_l1`, `meta_v1`) y exponga inputs clásicos para actualizar fácilmente los metadatos de los productos.

## 2. Fases de Desarrollo

### Fase 1: Gestión de Novedades (Dashboard)
*   **Ruta:** `/interno/admin/novedades`
*   **Acciones:** CRUD (Create, Read, Update, Delete) de alertas y novedades del dashboard.
*   **Campos UI:**
    *   Dropdown de color (Badge Color)
    *   Input corto para Texto del Badge
    *   Input para Título
    *   Textarea/WYSIWYG para el mensaje
    *   Toggle de "Activo"

### Fase 2: Configuración de Playbooks
*   **Ruta:** `/interno/admin/playbooks`
*   **Acciones:** Edición de metadatos estáticos por producto.
*   **Campos UI:** Edición de los tres metadatos (Label y Valor) del hero de cada producto, selección de íconos (dropdown con previsualización) y patrón de estilo.

### Fase 3: Gestión de Knowledge Base (KB)
*   **Ruta:** `/interno/admin/kb`
*   **Acciones:** Crear y mantener la lógica de preguntas y respuestas (`kb_items`) de resoluciones de casos y pre-ventas.
*   **Automatización IA:** Botón opcional para re-edición sintáctica antes de publicar usando el asistente TAEC.

### Fase 4: Auditoría y Rollback
*   Tabla de log de cambios: Rastro de quién editó y cuándo para garantizar control de versiones (gobernabilidad total sobre el contenido B2B).

## 3. Consideraciones Técnicas

*   Al estar en Astro, el panel de administración puede estar renderizado puramente con Server Actions (Formularios POST a Astro) o mediante la adopción de algún micro-front con React/Preact montado con `client:load` para experiencia tipo App.
*   Se aconseja que todo guardado detone una revalidación de caché o trigger en caso de haber un CDN en Netlify sobre las páginas más estáticas, aunque dado el esquema dinámico de `[producto].astro`, el cambio será en tiempo real. 
