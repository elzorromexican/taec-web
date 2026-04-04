/* ==========================================
-- TAEC INTERNAL INTRANET (FASE 3)
-- ACTUALIZACIÓN DE ESQUEMA (CORRER EN SQL EDITOR)
========================================== */

-- 1. Añadir columna de ROL a la tabla existente
ALTER TABLE usuarios_autorizados ADD COLUMN IF NOT EXISTS rol text DEFAULT 'empleado';

-- Opcional: Actualizar a Admin a los directivos conocidos
UPDATE usuarios_autorizados SET rol = 'admin' WHERE email IN ('slim@taec.com.mx', 'mauricio@taec.com.mx');

-- ==========================================
-- 2. TABLA PARA ENLACES DINÁMICOS (Cotizadores, Drive, Proveedores)
-- ==========================================
CREATE TABLE IF NOT EXISTS enlaces_internos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  url text NOT NULL,
  categoria text DEFAULT 'herramienta', -- Ej: 'cotizador', 'drive', 'proveedor'
  orden integer DEFAULT 10,
  icono text, -- SVG string o nombre de icono
  requiere_admin boolean DEFAULT false,
  activo boolean DEFAULT true,
  created_at timestamp DEFAULT now()
);

ALTER TABLE enlaces_internos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enlaces visibles para todo autenticado" 
  ON enlaces_internos FOR SELECT TO authenticated USING (true);


-- ==========================================
-- 3. TABLA PARA COLABORACIÓN (Feedback, notas, mejoras)
-- ==========================================
CREATE TABLE IF NOT EXISTS input_colaboradores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  autor_email text NOT NULL,
  tipo text NOT NULL, -- Ej: 'sugerencia_web', 'nota_ventas', 'blog_draft'
  contenido text NOT NULL,
  estado text DEFAULT 'pendiente', -- 'pendiente', 'aprobado', 'rechazado'
  feedback_admin text,
  created_at timestamp DEFAULT now()
);

ALTER TABLE input_colaboradores ENABLE ROW LEVEL SECURITY;

-- Empleados pueden ver sus propios inputs
CREATE POLICY "Empleados ven sus inputs" 
  ON input_colaboradores FOR SELECT TO authenticated USING (autor_email = current_user);

-- Empleados pueden insertars
CREATE POLICY "Empleados insertan" 
  ON input_colaboradores FOR INSERT TO authenticated WITH CHECK (true);

-- ==========================================
-- 4. ACTUALIZAR KB_ITEMS CON PRODUCTO (Para el ruteo dinámico)
-- ==========================================
ALTER TABLE kb_items ADD COLUMN IF NOT EXISTS producto text DEFAULT 'rise360';

-- Garantizar que la data histórica se asigna al playbook correspondiente
UPDATE kb_items SET producto = 'rise360' WHERE producto IS NULL;


-- Admins (Asumimos validación en backend Node/Astro con service_key, o RLS si configuran claims)
