import re

customWhys = {
    'd_sin_plataforma': 'Si la gestión sigue en WhatsApp o Excel con más de 50 personas, el costo oculto en tiempo de coordinación supera el de cualquier LMS básico. → conviene priorizar LMS Ágil.',
    'd_contenido_crudo': 'Capacitar usando PDFs o conocimiento tácito impide escalar y estandarizar el proceso organizativo. → conviene priorizar Fábrica DDC.',
    'd_velocidad_lanzamiento': 'Un lanzamiento lento puede retrasar los objetivos de negocio y la apropiación de los colaboradores. → conviene priorizar LMS Ágil.',
    'd_movil_campo': 'Ignorar el acceso móvil para el personal en campo desconecta a los trabajadores de la matriz operativa. → conviene priorizar LMS Ágil.',
    'd_autor_interno': 'Una alta dependencia de agencias retrasa actualizaciones y eleva exponencialmente los costos continuos. → conviene priorizar Herramientas de Autor.',
    'd_audiencia_difusa': 'Si no se comprende el perfil o las métricas de éxito, la capacitación se convierte en un gasto sin ROI verificable. → conviene priorizar Fábrica DDC.',
    'd_presupuesto_acotado': 'Proyectos sin flujo sólido exigen tecnología rápida de implementar para demostrar rápido impacto y asegurar fondos. → conviene priorizar LMS Ágil.',
    'd_primer_dc3': 'La falta de formalidad en constancias DC-3 alerta sobre inminentes sanciones por incumplimiento STPS. → conviene priorizar LMS Corp.',
    'd_vilt_despegue': 'Retrasar toda la academia hasta tener contenido final genera pausas bruscas en la curva de aprendizaje. → conviene priorizar VILT/Zoom.',
    'd_mobile_first': 'Falta de acceso a computadora significa que la única vía de absorción del contenido es móvil y asíncrona. → conviene priorizar LMS Ágil.',
    'c_dc3_insostenible': 'Emitir constancias manuales en volumen es insostenible y vulnera la confidencialidad y rapidez ante una visita STPS. → conviene priorizar LMS Corp.',
    'c_integracion_nomina': 'Bases no sincronizadas aumentan las discrepancias de datos de talento complicando las auditorías internas. → conviene priorizar LMS Corp.',
    'c_jerarquias_complejas': 'La asignación manual de cursos a múltiples variables jerárquicas es un cuello de botella que bloquea al área de talento. → conviene priorizar LMS Corp.',
    'c_reportes_directivos': 'La ausencia de tableros centralizados ralentiza la toma de decisiones críticas para vicepresidencias. → conviene priorizar LMS Corp.',
    'c_proctoring': 'Fraudes en exámenes clave destruyen la validez del modelo e incrementan riesgos legales o de reclutamiento. → conviene priorizar Eval/Proctoring.',
    'c_actualizacion_contenido': 'Contenido estático en una industria dinámica vuelve a todo el plan de capacitación obsoleto en semanas. → conviene priorizar Herramientas de Autor.',
    'c_blended_vilt': 'Usar plataformas desconectadas genera reportes fragmentados y peor experiencia de usuario para los aprendices. → conviene priorizar VILT/Zoom.',
    'c_audiencia_masiva': 'La infraestructura actual colapsará bajo la demanda concurrente de más usuarios, afectando la experiencia. → conviene priorizar LMS Corp.',
    'c_contenido_externo': 'Excluir a la red externa frena la calidad de la cadena de valor o los ingresos adicionales. → conviene priorizar Externa/Cert.',
    'c_roi_capacitacion': 'Los directivos necesitan una trazabilidad nítida del impacto de la inversión para autorizar presupuestos futuros. → conviene priorizar LMS Corp/Eval.',
    'c_adaptativo': 'Obligar a expertos a repasar lo básico eleva la deserción y devalúa la percepción del departamento de talento. → conviene priorizar Eval/Proctoring.',
    'c_carga_masiva': 'Los cuellos de botella en inducción reducen el tiempo-al-ingreso de los nuevos talentos. → conviene priorizar VILT/Zoom.',
    'e_multitenant': 'Desaprovechar el esquema multitenant frena la posibilidad de monetizar el producto con aliados empresariales B2B. → conviene priorizar Externa/Cert.',
    'e_ecommerce': 'Sin ecosistema de e-commerce la venta abierta al público queda bloqueada o depende de procesos manuales ineficientes. → conviene priorizar E-Commerce.',
    'e_openbadges': 'Certificados sin portabilidad ni respaldo en el mercado pierden su valor principal para el profesionista externo. → conviene priorizar Externa/Cert.',
    'e_filiales': 'No contar con instancias dedicadas satura la gobernanza corporativa, mezclando dominios de diversas marcas. → conviene priorizar Externa/Cert.',
    'e_idiomas': 'Traducir individualmente es prohibitivo, cerrando mercados globales por costos excesivos. → conviene priorizar Herramientas de Autor.',
    'e_contenido_volumen': 'Una producción colapsada no puede alimentar el apetito de expansión de la academia digital. → conviene priorizar Fábrica DDC.',
    'e_certificadora': 'La ausencia de credibilidad tecnológica como certificadora mina las alianzas estratégicas del sector. → conviene priorizar Externa/Cert.',
    'e_integraciones_avanzadas': 'Sistemas en silos provocan que la certificación final no detone acciones inmediatas en CRM o ERP comerciales. → conviene priorizar LMS Corp.',
    'e_analytics_predictivo': 'Sin analítica predictiva, la expansión se da a ciegas y las oportunidades de optimización se escapan. → conviene priorizar Eval/Proctoring.',
    'e_autoservicio': 'Fricción en el alta reduce las tasas de conversión y obstaculiza los ingresos recurrentes masivos. → conviene priorizar Externa/Cert.'
}

path = 'astro-web/src/data/diagnosticoData.ts'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

orderConst = """
export const PLATFORM_AXIS_ORDER: PlatformId[] = [
  'lms_agil',
  'lms_corp',
  'lms_cert',
  'fabrica_ddc',
  'tools_autor',
  'vilt_zoom',
  'eval_proctor',
  'ecommerce'
];
"""

if 'PLATFORM_AXIS_ORDER' not in content:
    content += '\n' + orderConst

def repl(match):
    id_ = match.group(1)
    between = match.group(2)
    if id_ in customWhys:
        return f"id: '{id_}',{between}why: '{customWhys[id_]}'"
    return match.group(0)

pattern = r"id:\s*'([^']+)',([\s\S]*?)why:\s*'El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B\.'"

content, count = re.subn(pattern, repl, content)
print(f"Replaced custom whys: {count}")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
