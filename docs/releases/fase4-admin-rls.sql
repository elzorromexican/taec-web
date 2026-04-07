-- ==========================================
-- SCRIPT DE MIGRACIÓN: PERMISOS RLS CMS FASE 4
-- Ejecutar en Supabase SQL Editor
-- ==========================================

-- 1. Función auxiliar (Security Definer) para no repetir el sub-query.
-- Verifica si el token JWT le pertenece a un email que esté en 'usuarios_autorizados'
-- marcado como 'activo' = true y 'rol' = 'admin'.
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM usuarios_autorizados 
    WHERE email = auth.jwt()->>'email' AND rol = 'admin' AND activo = true
  );
$$;

-- 2. Políticas (RLS) para intranet_novedades
DROP POLICY IF EXISTS "Admins pueden insertar novedades" ON intranet_novedades;
CREATE POLICY "Admins pueden insertar novedades" ON intranet_novedades FOR INSERT WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins pueden actualizar novedades" ON intranet_novedades;
CREATE POLICY "Admins pueden actualizar novedades" ON intranet_novedades FOR UPDATE USING (is_admin());

DROP POLICY IF EXISTS "Admins pueden borrar novedades" ON intranet_novedades;
CREATE POLICY "Admins pueden borrar novedades" ON intranet_novedades FOR DELETE USING (is_admin());

-- 3. Políticas (RLS) para kb_playbooks
DROP POLICY IF EXISTS "Admins pueden actualizar playbooks" ON kb_playbooks;
CREATE POLICY "Admins pueden actualizar playbooks" ON kb_playbooks FOR UPDATE USING (is_admin());
