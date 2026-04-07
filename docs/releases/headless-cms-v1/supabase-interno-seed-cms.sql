-- ==========================================
-- TAEC Intranet CMS - Seed Data
-- ==========================================

-- Limpiar datos existentes (opcional pero recomendado para re-seeding seguro)
DELETE FROM kb_playbooks;
DELETE FROM intranet_novedades;

-- ==========================================
-- 1. Insertando Metadatos de Playbooks (22 Productos)
-- ==========================================
INSERT INTO kb_playbooks (id_producto, display_name, familia, icono, meta_l1, meta_v1, meta_l2, meta_v2, meta_l3, meta_v3) VALUES
('rise360', 'Rise 360', 'articulate', 'box', 'Complejidad', 'Baja / Web Responsive', 'Formato', 'Microlearning Rápido', 'Diferenciador', 'Velocidad de Ensamblado'),
('storyline360', 'Storyline 360', 'articulate', 'clapperboard', 'Complejidad', 'Avanzada / Variables', 'Formato', 'Cursos Interactivos', 'Diferenciador', 'Lógica Ramificada Libre'),
('review360', 'Review 360', 'articulate', 'check-circle', 'Fase de Vida', 'Aprobación / QA', 'Audiencia', 'Stakeholders Internos', 'Diferenciador', 'Feedback Contextual Web'),
('reach360', 'Reach 360', 'articulate', 'clapperboard', 'Ecosistema', 'LMS Ligero (Integrado)', 'Audiencia', 'Contratistras / Alianzas', 'Diferenciador', 'Despliegue sin fricción'),
('aiassistant', 'AI Assistant', 'articulate', 'sparkles', 'Tecnología', 'IA Generativa (LLMs)', 'Casos de Uso', 'Drafting y Cuestionarios', 'Diferenciador', 'Acelerador de Autores'),
('localization', 'Localization', 'articulate', 'box', 'Proceso', 'Tradución Automatizada', 'Formato', 'Exportación a XLIFF', 'Diferenciador', 'Escalabilidad Global'),
('vyondstudio', 'Vyond Studio', 'vyond', 'clapperboard', 'Complejidad', 'Media / Línea de tiempo', 'Target', 'Diseño Instruccional', 'Diferenciador', 'Control de Canvas y Labios'),
('vyondgo', 'Vyond Go (IA)', 'vyond', 'sparkles', 'Complejidad', 'Baja / Prompt-to-Video', 'Target', 'Ventas, Soporte, RRHH', 'Diferenciador', 'IA Generativa Ultra rápida'),
('vyondmobile', 'Vyond Mobile', 'vyond', 'smartphone', 'Formato', 'Video Vertical Extendido', 'Dispositivo', 'Smartphones y Tablets', 'Diferenciador', 'Creación On-the-Go'),
('vyondenterprise', 'Vyond Enterprise', 'vyond', 'building', 'Escalamiento', 'Cuentas Globales Masivas', 'Seguridad', 'SSO y Single-Tenant', 'Diferenciador', 'Gobernanza Institucional'),
('vyondprofessional', 'Vyond Professional', 'vyond', 'box', 'Licencia', 'Por Asiento Individual', 'Target', 'Agencias y Consultores', 'Diferenciador', 'Exportación H.264 Pura'),
('moodle', 'Moodle Workspace', 'lms', 'building', 'Arquitectura', 'Open Source Personalizado', 'Audiencia', 'Academias y Corporativos', 'Diferenciador', 'Flexibilidad de Plugins'),
('totara', 'Totara LMS', 'lms', 'building', 'Arquitectura', 'Enterprise TXP / LXP', 'Audiencia', 'Ecosistemas Complejos', 'Diferenciador', 'Múltiples Organizaciones'),
('pifinilearn', 'Pifini Learn', 'lms', 'box', 'Modalidad', 'LMS Cloud Llave en Mano', 'Target', 'PYMES / Onboarding', 'Diferenciador', 'Simplicidad de Admin.'),
('ottolearn', 'Ottolearn', 'lms', 'box', 'Metodología', 'Agile Microlearning', 'Mecánica', 'A.I. de Retención', 'Diferenciador', 'Combate Curva de Olvido'),
('lys', 'Lys LMS', 'lms', 'building', 'Enfoque', 'Learning Management System', 'Casos de Uso', 'Capacitaciones Fijas', 'Diferenciador', 'Implementación Veloz'),
('ddc', 'Desarrollo de Contenidos (DDC)', 'servicios', 'box', 'Modelo', 'Agencia a la Medida', 'Entregables', 'SCORM, Web, Custom HTML', 'Diferenciador', 'Outsourcing Integral'),
('class', 'Class (Videoclases)', 'servicios', 'box', 'Tecnología', 'Zoom Enhanced VILT', 'Modalidad', 'Clases 100% Sincrónicas', 'Diferenciador', 'Métricas de Atención IA'),
('proctorizer', 'Proctorizer', 'servicios', 'box', 'Categoría', 'Monitoreo Académico', 'Conexión', 'Integración vía LTI', 'Diferenciador', 'Verificación Facial IA'),
('strikeplagiarism', 'StrikePlagiarism', 'servicios', 'box', 'Categoría', 'Integridad Anti-Copia', 'Integración', 'Nativo con Moodle LMS', 'Diferenciador', 'Detección Multi-fuente'),
('7minutes', '7minutes Microlearning', 'servicios', 'smartphone', 'Formato', 'Video Animado (Micro)', 'Categoría', 'Soft Skills B2B', 'Diferenciador', 'Retención de Atención'),
('customguide', 'Custom Guide', 'servicios', 'box', 'Metodología', 'Simulación Software', 'Categoría', 'IT / Microsoft 365', 'Diferenciador', 'Aprender Haciendo (Lab)');

-- ==========================================
-- 2. Insertando Novedades de Muestra (Dashboard)
-- ==========================================
INSERT INTO intranet_novedades (badge_text, badge_color, titulo, contenido, fecha_display, activo, orden) VALUES
('Uso Interno', 'orange', 'Nueva versión del Cotizador DDC 2026', '⚠️ <strong>Exclusivo para el equipo comercial TAEC.</strong> Hemos relocalizado la calculadora financiera de Desarrollo de Contenidos. Esta herramienta está diseñada para ayudarles a formular estimaciones rápidas de costos con sus prospectos. Ingresen desde el menú izquierdo en la pestaña "Cotizadores".', '06 Abr 2026', true, 1),
('Promoción Q2', 'blue', 'Localization integrado (Uso Libre)', 'Articulate 360 ha integrado "Localization" de uso libre para traducir cursos internamente. <strong>Ojo:</strong> No se pueden exportar ni publicar sin adquirir el paquete base y los paquetes adicionales. Tenemos una promoción activa durante todo el Q2 con un <strong>25% de descuento</strong> en todos los paquetes de Localization.', '06 Abr 2026', true, 2);
