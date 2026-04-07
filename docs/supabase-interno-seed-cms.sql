/* ==========================================
-- SEED DATA: CMS DASHBOARD & PLAYBOOKS 
-- Ejecutar en SQL Editor Supabase
========================================== */

-- Limpieza preventiva (opcional, usar con cuidado si ya hay datos en prod)
-- TRUNCATE TABLE kb_playbooks, intranet_novedades;

-- 1. NOVEDADES DEL DASHBOARD
INSERT INTO intranet_novedades (badge_text, badge_color, titulo, contenido, fecha_display, orden) VALUES
('Uso Interno', 'orange', 'Nueva versión del Cotizador DDC 2026', '⚠️ <strong>Exclusivo para el equipo comercial TAEC.</strong> Hemos relocalizado la calculadora financiera de Desarrollo de Contenidos. Esta herramienta está diseñada para ayudarles a formular estimaciones rápidas de costos con sus prospectos. Ingresen desde el menú izquierdo en la pestaña "Cotizadores".', '06 Abr 2026', 10),
('Noticia', 'blue', 'KB de Rise 360 actualizada', 'Sonia ya subió los 40 artículos curados sobre el comportamiento, limitantes y pros del ecosistema de Rise para refutar clientes complejos.', '03 Abr 2026', 20);

-- 2. METADATOS DE PLAYBOOKS (22 Herramientas)

-- 2.1 FAMILIA: Articulate 360 (familia = articulate, icon = clapperboard)
INSERT INTO kb_playbooks (id_producto, familia, display_name, meta_l1, meta_v1, meta_l2, meta_v2, meta_l3, meta_v3, svg_icon) VALUES
('rise360', 'articulate', 'Rise 360', 'Complejidad', 'Baja / Web Responsive', 'Formato', 'Microlearning Rápido', 'Diferenciador', 'Velocidad de Ensamblado', 'clapperboard'),
('storyline360', 'articulate', 'Storyline 360', 'Complejidad', 'Avanzada / Variables', 'Formato', 'Cursos Interactivos', 'Diferenciador', 'Lógica Ramificada Libre', 'clapperboard'),
('review360', 'articulate', 'Review 360', 'Fase de Vida', 'Aprobación / QA', 'Audiencia', 'Stakeholders Internos', 'Diferenciador', 'Feedback Contextual Web', 'check-circle'),
('reach360', 'articulate', 'Reach 360', 'Ecosistema', 'LMS Ligero (Integrado)', 'Audiencia', 'Contratistras / Alianzas', 'Diferenciador', 'Despliegue sin fricción', 'clapperboard'),
('aiassistant', 'articulate', 'AI Assistant', 'Tecnología', 'IA Generativa (LLMs)', 'Casos de Uso', 'Drafting y Cuestionarios', 'Diferenciador', 'Acelerador de Autores', 'sparkles'),
('localization', 'articulate', 'Localization', 'Proceso', 'Tradución Automatizada', 'Formato', 'Exportación a XLIFF', 'Diferenciador', 'Escalabilidad Global', 'clapperboard');

-- 2.2 FAMILIA: Vyond (familia = vyond, icon = variado)
INSERT INTO kb_playbooks (id_producto, familia, display_name, meta_l1, meta_v1, meta_l2, meta_v2, meta_l3, meta_v3, svg_icon) VALUES
('vyondstudio', 'vyond', 'Vyond Studio', 'Complejidad', 'Media / Línea de tiempo', 'Target', 'Diseño Instruccional', 'Diferenciador', 'Control de Canvas y Labios', 'clapperboard'),
('vyondgo', 'vyond', 'Vyond Go (IA)', 'Complejidad', 'Baja / Prompt-to-Video', 'Target', 'Ventas, Soporte, RRHH', 'Diferenciador', 'IA Generativa Ultra rápida', 'sparkles'),
('vyondmobile', 'vyond', 'Vyond Mobile', 'Formato', 'Video Vertical Extendido', 'Dispositivo', 'Smartphones y Tablets', 'Diferenciador', 'Creación On-the-Go', 'smartphone'),
('vyondenterprise', 'vyond', 'Vyond Enterprise', 'Escalamiento', 'Cuentas Globales Masivas', 'Seguridad', 'SSO y Single-Tenant', 'Diferenciador', 'Gobernanza Institucional', 'building'),
('vyondprofessional', 'vyond', 'Vyond Professional', 'Licencia', 'Por Asiento Individual', 'Target', 'Agencias y Consultores', 'Diferenciador', 'Exportación H.264 Pura', 'building');

-- 2.3 FAMILIA: Plataformas LMS (familia = plataformas, icon = building)
INSERT INTO kb_playbooks (id_producto, familia, display_name, meta_l1, meta_v1, meta_l2, meta_v2, meta_l3, meta_v3, svg_icon) VALUES
('moodle', 'plataformas', 'Moodle Workspace', 'Arquitectura', 'Open Source Personalizado', 'Audiencia', 'Academias y Corporativos', 'Diferenciador', 'Flexibilidad de Plugins', 'building'),
('totara', 'plataformas', 'Totara LMS', 'Arquitectura', 'Enterprise TXP / LXP', 'Audiencia', 'Ecosistemas Complejos', 'Diferenciador', 'Múltiples Organizaciones', 'building'),
('pifinilearn', 'plataformas', 'Pifini Learn', 'Modalidad', 'LMS Cloud Llave en Mano', 'Target', 'PYMES / Onboarding', 'Diferenciador', 'Simplicidad de Admin.', 'building'),
('ottolearn', 'plataformas', 'Ottolearn', 'Metodología', 'Agile Microlearning', 'Mecánica', 'A.I. de Retención', 'Diferenciador', 'Combate Curva de Olvido', 'building'),
('lys', 'plataformas', 'Lys LMS', 'Enfoque', 'Learning Management System', 'Casos de Uso', 'Capacitaciones Fijas', 'Diferenciador', 'Implementación Veloz', 'building');

-- 2.4 FAMILIA: Add-ons y Catálogos (familia = catalogos, icon = variado)
INSERT INTO kb_playbooks (id_producto, familia, display_name, meta_l1, meta_v1, meta_l2, meta_v2, meta_l3, meta_v3, svg_icon) VALUES
('ddc', 'catalogos', 'Desarrollo de Contenidos (DDC)', 'Modelo', 'Agencia a la Medida', 'Entregables', 'SCORM, Web, Custom HTML', 'Diferenciador', 'Outsourcing Integral', 'clapperboard'),
('class', 'catalogos', 'Class (Videoclases)', 'Tecnología', 'Zoom Enhanced VILT', 'Modalidad', 'Clases 100% Sincrónicas', 'Diferenciador', 'Métricas de Atención IA', 'building'),
('proctorizer', 'catalogos', 'Proctorizer', 'Categoría', 'Monitoreo Académico', 'Conexión', 'Integración vía LTI', 'Diferenciador', 'Verificación Facial IA', 'building'),
('strikeplagiarism', 'catalogos', 'StrikePlagiarism', 'Categoría', 'Integridad Anti-Copia', 'Integración', 'Nativo con Moodle LMS', 'Diferenciador', 'Detección Multi-fuente', 'building'),
('7minutes', 'catalogos', '7minutes Microlearning', 'Formato', 'Video Animado (Micro)', 'Categoría', 'Soft Skills B2B', 'Diferenciador', 'Retención de Atención', 'smartphone'),
('customguide', 'catalogos', 'Custom Guide', 'Metodología', 'Simulación Software', 'Categoría', 'IT / Microsoft 365', 'Diferenciador', 'Aprender Haciendo (Lab)', 'smartphone');
