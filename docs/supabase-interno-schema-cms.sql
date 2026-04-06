/* ==========================================
-- TAEC INTERNAL INTRANET 
-- MÓDULO CMS: DASHBOARD & PLAYBOOK METADATA
-- Ejecutar en SQL Editor Supabase
========================================== */

-- ==========================================
-- 1. TABLA PARA METADATOS DE PLAYBOOKS
-- ==========================================
CREATE TABLE IF NOT EXISTS kb_playbooks (
  id_producto text PRIMARY KEY, -- Ej: 'vyondstudio' (Slug corto)
  familia text NOT NULL,        -- Ej: 'vyond', 'lms', 'addons' (Controla textura CSS)
  display_name text NOT NULL,   -- Ej: 'Vyond Studio'
  meta_l1 text,
  meta_v1 text,
  meta_l2 text,
  meta_v2 text,
  meta_l3 text,
  meta_v3 text,
  svg_icon text,                -- Ej: 'clapperboard', 'smartphone'
  activo boolean DEFAULT true,
  created_at timestamp DEFAULT now()
);

-- Permisos (RLS)
ALTER TABLE kb_playbooks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visibilidad pública autenticada playbooks" 
  ON kb_playbooks FOR SELECT TO authenticated USING (true);

-- ==========================================
-- 2. TABLA PARA NOVEDADES DEL DASHBOARD
-- ==========================================
CREATE TABLE IF NOT EXISTS intranet_novedades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  badge_text text NOT NULL,      -- Ej: 'Uso Interno', 'Noticia'
  badge_color text DEFAULT 'blue', -- Ej: 'orange', 'blue' (Clases CSS mapeadas)
  titulo text NOT NULL,          -- Ej: 'Nueva KB de Articulate' 
  contenido text NOT NULL,       -- Contenido descriptivo del aviso (Soporta HTML/Markdown básico)
  fecha_display text,            -- Ej: '06 Abr 2026'
  orden integer DEFAULT 10,      -- Para definir en qué orden aparecen en pantalla
  activo boolean DEFAULT true,
  created_at timestamp DEFAULT now()
);

-- Permisos (RLS)
ALTER TABLE intranet_novedades ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visibilidad pública autenticada novedades" 
  ON intranet_novedades FOR SELECT TO authenticated USING (true);
