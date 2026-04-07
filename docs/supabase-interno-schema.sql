-- ==========================================
-- TAEC INTERNAL INTRANET & KNOWLEDGE BASE
-- SCHEMA SCRIPT (PARA VALIDACIÓN QA)
-- ==========================================

-- 1. EXTENSION PARA UUID (Ya viene por defecto en Supabase, pero buena práctica)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- TABLA: usuarios_autorizados (Whitelist)
-- ==========================================
-- Notas: Lista blanca de empleados permitidos (aún si su correo es @taec.com.mx).

CREATE TABLE IF NOT EXISTS usuarios_autorizados (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  nombre text,
  rol text DEFAULT 'empleado',
  activo boolean DEFAULT true,
  created_at timestamp DEFAULT now()
);

-- Habilitar Row Level Security (RLS) base para la tabla
ALTER TABLE usuarios_autorizados ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS para el Whitelist (Solo lectura para validación).
-- Para Astro Auth en SSR, validaremos desde base de datos evadiendo RLS con la "Service Role Key" internamente, o en su defecto permitiendo selects generales autenticados por ser intranet.
CREATE POLICY "La lista blanca es de lectura pública para autenticados" 
  ON usuarios_autorizados FOR SELECT TO authenticated USING (true);


-- ==========================================
-- TABLA: kb_items (Base de Conocimientos)
-- ==========================================
-- Notas: Para contenido de todas las subsecciones internas y de apoyo de IA (Titbits)

CREATE TABLE IF NOT EXISTS kb_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  producto text NOT NULL,
  seccion text NOT NULL,
  seccion_label text NOT NULL,
  seccion_color text, -- Sugerencia: navy, orange, teal
  orden integer,
  pregunta text NOT NULL,
  plus text,
  menos text,
  fuente text,
  activo boolean DEFAULT true,
  audiencia text[] DEFAULT '{interno}', -- Valores propuestos: interno, titbits, publico
  version text DEFAULT 'v1.0',
  updated_at timestamp DEFAULT now()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE kb_items ENABLE ROW LEVEL SECURITY;

-- Para visualizar internamente, cualquiera en auth puede leer.
CREATE POLICY "Visualizar KBs es posible para todo autenticado" 
  ON kb_items FOR SELECT TO authenticated USING (true);

-- (La modificación y eliminación será directo en Dashboard por admin)

-- ==========================================
-- INSERCIÓN INICIAL / DUMMY DATA ("SEEDS")
-- ==========================================

-- Usuarios Iniciales (Seed de la directiva)
INSERT INTO usuarios_autorizados (email, nombre, activo, rol) 
VALUES 
  ('slim@taec.com.mx', 'Slim Masmoudi', true, 'admin'),
  ('mauricio@taec.com.mx', 'Mauricio Ocampo', true, 'admin'),
  ('sonia@taec.com.mx', 'Sonia', true, 'empleado')
ON CONFLICT (email) DO UPDATE SET rol = EXCLUDED.rol;


-- Registros Rise 360 (Seed Base corregido. Inserta aquí los 40 registros completos según el HTML cuando estén disponibles)
INSERT INTO kb_items (
  producto,
  seccion, 
  seccion_label, 
  seccion_color, 
  orden, 
  pregunta, 
  plus, 
  menos, 
  fuente, 
  activo, 
  audiencia
) 
VALUES 
  (
    'rise360', 'accesibilidad', 'Accesibilidad', '#3B6D11', 10,
    '¿Rise 360 incluye opción de dictado a voz para accesibilidad?',
    'No nativamente, pero el HTML5 final sí es leído por navegadores modernos con Screen Readers (JAWS, NVDA).',
    'La curva de creación requiere colocar texto alt a imágenes manual.',
    'SOP-Ventas-2025', true, '{interno,titbits}'
  ),
  (
    'rise360', 'licencias', 'Licenciamiento', '#993556', 20,
    '¿Si un cliente cancela, pierde sus cursos de Rise?',
    'El cliente retiene sus paquetes exportados (SCORM/Web) a perpetuidad y seguirán funcionando en su LMS sin bloqueos.',
    'Ya no podrá editar ni descargar los fuentes hasta reactivar.',
    'Legal-Facturacion-TAEC', true, '{interno,titbits,publico}'
  ),
  (
    'rise360', 'lms', 'LMS e Integraciones', '#854F0B', 30,
    '¿Cómo conecta LMS Totara con Rise?',
    'Rise genera un SCORM 1.2 ó 2004 súper ligero. Totara lo renderiza 100% responsivo en iframe / new window sin problemas ni demoras.',
    'El límite de tracking nativo es por módulo (Completado/Aprobado) pero no traquea clics microscópicos.',
    'Technical-QA', true, '{interno}'
  );
