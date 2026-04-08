# Manual de Implementación — Registro de Documentos Controlados
**Feature:** Catálogo de documentos institucionales en Dashboard & News  
**Para:** Antigravity  
**Fecha:** 07 abr 2026  
**Estimado:** 1 sesión (~3-4 hrs)

---

## 1. Contexto y objetivo

Las cards "Formatos Comerciales" y "Machotes de Contrato" del Dashboard de la Intranet actualmente solo abren un link genérico a Drive. La dirección necesita un **registro de documentos controlados**: catálogo con versiones, estados de aprobación y restricciones de uso, donde los empleados puedan identificar el documento oficial y hacer una copia de trabajo sin tocar el original.

**Flujo del usuario:**
1. Entra al Dashboard
2. Hace clic en una card (Formatos Comerciales o Machotes de Contrato)
3. Se abre un modal con una tabla filtrada por categoría
4. Identifica el documento que necesita
5. Hace clic en **"Hacer copia"** → se abre `{url_drive}/copy` en nueva pestaña
6. Google Drive le pregunta dónde guardar su copia personal
7. Trabaja sobre la copia — el original nunca se toca

> **Nota técnica:** El botón "Hacer copia" no requiere OAuth adicional. Usa la URL nativa de Google Drive `https://docs.google.com/document/d/{FILE_ID}/copy`. El OAuth de Supabase existente no se modifica.

---

## 2. Modelo de datos — Supabase

### 2.1 Crear la tabla

Ejecutar en Supabase SQL Editor:

```sql
CREATE TABLE documentos_internos (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  ref           text NOT NULL,           -- Ej: FC-001, MC-003
  categoria     text NOT NULL,           -- 'formatos_comerciales' | 'machotes_contrato'
  nombre        text NOT NULL,           -- Nombre homologado oficial
  descripcion   text,                    -- Para qué sirve el documento
  version       text NOT NULL DEFAULT 'draft',  -- '1.0', '1.1', 'draft'
  fecha_edicion date,                    -- Fecha de última edición autorizada
  autorizado_por text,                   -- Lista controlada (ver abajo)
  url_drive     text,                    -- URL del archivo en Google Drive
  estado        text NOT NULL DEFAULT 'borrador', -- 'borrador' | 'en_revision' | 'aprobado'
  visibilidad   text NOT NULL DEFAULT 'publico_interno', -- ver sección 2.3
  activo        boolean NOT NULL DEFAULT true,
  created_at    timestamptz DEFAULT now()
);
```

### 2.2 Lista controlada — `autorizado_por`

Valores permitidos (validar en frontend, no en DB por ahora):
- `Dirección General`
- `Dirección Comercial`

### 2.3 Valores de `visibilidad`

| Valor | Etiqueta UI | Comportamiento |
|---|---|---|
| `publico_interno` | ✅ Uso Interno | Sin advertencia al copiar |
| `requiere_nda` | ⚠️ Confidencial NDA | Aviso: "Requiere NDA firmado antes de compartir externamente" |
| `interno_exclusivo` | 🔒 Sólo Interno | Aviso: "Este documento no debe salir de TAEC bajo ninguna circunstancia" |

### 2.4 Valores de `estado`

| Valor | Badge UI | Botón "Hacer copia" |
|---|---|---|
| `borrador` | Gris — Borrador | Oculto |
| `en_revision` | Naranja — En revisión | Oculto |
| `aprobado` | Verde — Aprobado | Visible |

### 2.5 RLS — Row Level Security

```sql
-- Solo usuarios autenticados con dominio @taec.com.mx pueden leer
ALTER TABLE documentos_internos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "lectura_interna" ON documentos_internos
  FOR SELECT
  USING (auth.jwt() ->> 'email' LIKE '%@taec.com.mx');

-- Solo admins pueden insertar/editar/eliminar (via service role en SSR)
```

### 2.6 Seed de ejemplo (para QA)

```sql
INSERT INTO documentos_internos 
  (ref, categoria, nombre, descripcion, version, fecha_edicion, autorizado_por, url_drive, estado, visibilidad)
VALUES
  ('FC-001', 'formatos_comerciales', 'Propuesta Comercial Estándar',
   'Plantilla base para propuestas a prospectos B2B. Incluye secciones de diagnóstico, solución y pricing.',
   '1.0', '2026-04-01', 'Dirección Comercial',
   'https://docs.google.com/document/d/EXAMPLE_ID_1/copy',
   'aprobado', 'publico_interno'),

  ('FC-002', 'formatos_comerciales', 'Presentación Corporativa TAEC',
   'Deck de presentación institucional. Usar solo la versión aprobada para reuniones con clientes.',
   '1.0', '2026-04-01', 'Dirección General',
   'https://docs.google.com/presentation/d/EXAMPLE_ID_2/copy',
   'aprobado', 'publico_interno'),

  ('MC-001', 'machotes_contrato', 'NDA Estándar (Español)',
   'Acuerdo de confidencialidad bilateral. Aplica para demos de producto y reuniones de preventa.',
   'draft', NULL, NULL, NULL,
   'borrador', 'requiere_nda'),

  ('MC-002', 'machotes_contrato', 'Contrato de Servicios DDC',
   'Contrato base para proyectos de Desarrollo de Contenidos. Incluye alcance, entregables y penalizaciones.',
   'draft', NULL, NULL, NULL,
   'borrador', 'interno_exclusivo');
```

---

## 3. Admin Panel — gestión del catálogo

Agregar una tercera pestaña **"Documentos"** en `AdminUI.tsx`, siguiendo el patrón exacto de `AdminNovedades.tsx`.

### 3.1 Componente a crear

`src/components/interno/admin/AdminDocumentos.tsx`

Campos del formulario:
- `ref` — input texto (Ej: FC-001)
- `categoria` — select: Formatos Comerciales / Machotes de Contrato
- `nombre` — input texto
- `descripcion` — textarea (no necesita WYSIWYG)
- `version` — input texto
- `fecha_edicion` — input date
- `autorizado_por` — select: Dirección General / Dirección Comercial
- `url_drive` — input texto (URL completa del Drive)
- `estado` — select: Borrador / En Revisión / Aprobado
- `visibilidad` — select: Uso Interno / Requiere NDA / Sólo Interno
- `activo` — checkbox

### 3.2 Lógica de `url_drive`

Al guardar, si la URL de Drive no termina en `/copy`, el Admin Panel debe agregarla automáticamente:

```ts
const normalizeUrl = (url: string) => {
  if (!url) return url;
  return url.endsWith('/copy') ? url : url.replace(/\/edit.*$/, '') + '/copy';
};
```

---

## 4. Componente modal del Dashboard

### 4.1 Archivo a crear

`src/components/interno/DocumentosCatalogo.tsx`

### 4.2 Props

```ts
type Props = {
  supabaseUrl: string;
  supabaseKey: string;
  accessToken: string;
  categoria: 'formatos_comerciales' | 'machotes_contrato';
  titulo: string; // Ej: "Formatos Comerciales"
  onClose: () => void;
}
```

### 4.3 Query Supabase

```ts
const { data } = await supabase
  .from('documentos_internos')
  .select('*')
  .eq('categoria', categoria)
  .eq('activo', true)
  .order('ref', { ascending: true });
```

### 4.4 Estructura de la tabla

```
| Ref   | Nombre | Descripción | Versión | Fecha | Autorizado por | Restricción | Acción |
```

- **Ref:** texto plano (`FC-001`)
- **Nombre:** bold
- **Descripción:** texto en gris, máx 2 líneas (`line-clamp: 2`)
- **Versión:** badge neutro
- **Fecha:** formato `DD Mmm YYYY`
- **Autorizado por:** texto
- **Restricción:** badge de color según `visibilidad` (ver sección 2.3)
- **Acción:**
  - Si `estado === 'aprobado'` → botón azul **"Hacer copia"** → `window.open(url_drive, '_blank')`
  - Si `estado !== 'aprobado'` → badge del estado (Borrador / En revisión), sin botón

### 4.5 Modal de advertencia antes de copiar

Para documentos `requiere_nda` o `interno_exclusivo`, antes de abrir Drive mostrar un modal de confirmación:

```
⚠️ Documento Confidencial
[texto según visibilidad]
[ Cancelar ]  [ Entendido, hacer copia ]
```

---

## 5. Integración en el Dashboard

### 5.1 Archivo a modificar

`src/pages/interno/dashboard.astro`

### 5.2 Cards actuales (localizar y reemplazar comportamiento)

```html
<!-- Cambiar el href de estas dos cards por onClick que abra el modal -->
📁 Formatos Comerciales
📄 Machotes de Contrato
```

### 5.3 Estado a manejar en el componente island

Las cards deben ser parte de un componente React island que maneje:

```ts
const [modalAbierto, setModalAbierto] = useState<
  'formatos_comerciales' | 'machotes_contrato' | null
>(null);
```

Al hacer clic en una card → `setModalAbierto('formatos_comerciales')` → renderiza `<DocumentosCatalogo categoria="formatos_comerciales" />`

---

## 6. Checklist de implementación

### Supabase
- [ ] Ejecutar SQL de creación de tabla `documentos_internos`
- [ ] Activar RLS con policy de lectura `@taec.com.mx`
- [ ] Cargar seed de documentos de ejemplo para QA

### Admin Panel
- [ ] Crear `AdminDocumentos.tsx` siguiendo patrón de `AdminNovedades.tsx`
- [ ] Agregar pestaña "Documentos" en `AdminUI.tsx`
- [ ] Implementar `normalizeUrl()` para URLs de Drive

### Dashboard
- [ ] Crear `DocumentosCatalogo.tsx` con tabla + modal de advertencia
- [ ] Modificar `dashboard.astro` para que las cards abran el modal
- [ ] QA: verificar que botón "Hacer copia" abre Drive en nueva pestaña
- [ ] QA: verificar que documentos no aprobados no muestran botón de copia
- [ ] QA: verificar modal de advertencia para `requiere_nda` e `interno_exclusivo`

---

## 7. Notas de arquitectura

- **No se necesita OAuth adicional.** El botón "Hacer copia" usa `window.open(url_drive, '_blank')` donde `url_drive` termina en `/copy`. Google Drive maneja el flujo de copia nativo.
- **El original en Drive debe ser read-only** para todos excepto admin. Esto se configura directamente en Drive — fuera del alcance del código.
- **La tabla crece con el tiempo.** Si supera ~50 documentos por categoría, agregar un input de búsqueda por `nombre` filtrado en cliente (no requiere cambio en Supabase).
- **Patrón de hard reload:** Los links a `/interno/admin` ya usan `window.location.href` — no modificar.

---

## 8. Referencia de archivos

| Archivo | Acción |
|---|---|
| `docs/implementacion-registro-documentos.md` | Este documento |
| `src/components/interno/admin/AdminDocumentos.tsx` | **Crear** |
| `src/components/interno/admin/AdminUI.tsx` | **Modificar** — agregar pestaña |
| `src/components/interno/DocumentosCatalogo.tsx` | **Crear** |
| `src/pages/interno/dashboard.astro` | **Modificar** — conectar cards al modal |
| Supabase SQL Editor | **Ejecutar** — tabla + RLS + seed |
