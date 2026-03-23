/**
 * @name supabase-comments-schema.sql
 * @version 1.0.0
 * @description Script SQL para inicializar tabla de comentarios, triggers y políticas RLS.
 * @inputs N/A
 * @outputs Estructura relacional Postgres de la tabla comments en Supabase.
 * @dependencies Postgres, Supabase
 * @created 2026-03-23
 * @updated 2026-03-23 12:05:00
 */

-- ==========================================
-- SCRIPT SQL DE SUPABASE PARA COMENTARIOS
-- ==========================================
-- Copia y pega este script completo en el SQL Editor de tu proyecto en Supabase (https://supabase.com) y córrelo.

-- 1. Crear la tabla de comentarios
CREATE TABLE comments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  post_slug text NOT NULL,
  author_name text NOT NULL,
  author_email text NOT NULL,
  author_url text,
  content text NOT NULL,
  status text DEFAULT 'pending' NOT NULL, -- Valores: pending, approved, rejected, spam
  created_at timestamptz DEFAULT now() NOT NULL
);

-- 2. Crear un Trigger para forzar siempre el estado 'pending' al insertar
-- Esto evita que un bot manipule la API REST y auto-apruebe sus comentarios.
CREATE OR REPLACE FUNCTION force_pending_status()
RETURNS TRIGGER AS $$
BEGIN
  NEW.status := 'pending';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_force_pending
BEFORE INSERT ON comments
FOR EACH ROW
EXECUTE FUNCTION force_pending_status();

-- 3. Habilitar Seguridad a Nivel de Fila (Row Level Security - RLS)
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 4. Pólizas de Seguridad (Polices)

-- POLÍTICA 1: Cualquiera (público) puede leer SOLO los comentarios aprobados.
CREATE POLICY "Public can view approved comments"
ON comments FOR SELECT
TO anon, authenticated
USING (status = 'approved');

-- POLÍTICA 2: Cualquiera (público) puede insertar nuevos comentarios.
CREATE POLICY "Public can insert comments"
ON comments FOR INSERT
TO anon
WITH CHECK (true);

-- POLÍTICA 3: Solo administradores (usuarios logueados en Supabase) pueden actualizar o borrar.
CREATE POLICY "Admins can update comments"
ON comments FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Admins can delete comments"
ON comments FOR DELETE
TO authenticated
USING (true);

-- 5. Crear tabla de roles o perfiles (Opcional para el futuro portal)
-- Esta tabla conectará con Supabase Auth si se requiere asignar roles más específicos
-- por ahora el rol de 'authenticated' es suficiente para los dueños del sitio.
