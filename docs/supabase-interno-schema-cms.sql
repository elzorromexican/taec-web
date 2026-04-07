-- ==========================================
-- TAEC Intranet CMS - Supabase Schema
-- ==========================================

-- 1. Tabla de Playbooks (Metadatos de Productos)
CREATE TABLE IF NOT EXISTS kb_playbooks (
    id_producto TEXT PRIMARY KEY,
    display_name TEXT NOT NULL,
    familia TEXT NOT NULL,
    icono TEXT NOT NULL DEFAULT 'box',
    meta_l1 TEXT,
    meta_v1 TEXT,
    meta_l2 TEXT,
    meta_v2 TEXT,
    meta_l3 TEXT,
    meta_v3 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS en kb_playbooks
ALTER TABLE kb_playbooks ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura para kb_playbooks
-- Permitir lectura a usuarios autenticados (y anónimos si se requiere SSR public, idealmente anon o authenticated)
CREATE POLICY "Lectura publica kb_playbooks" 
ON kb_playbooks FOR SELECT 
TO public 
USING (true);


-- 2. Tabla de Novedades del Dashboard
CREATE TABLE IF NOT EXISTS intranet_novedades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    badge_text TEXT NOT NULL,
    badge_color TEXT NOT NULL DEFAULT 'blue',
    titulo TEXT NOT NULL,
    contenido TEXT NOT NULL,
    fecha_display TEXT NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT true,
    orden INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS en intranet_novedades
ALTER TABLE intranet_novedades ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura para intranet_novedades
CREATE POLICY "Lectura publica intranet_novedades" 
ON intranet_novedades FOR SELECT 
TO public 
USING (activo = true);
