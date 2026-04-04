export interface Insight {
  yes: string;
  no: string;
  plat: 'lms_agil' | 'lms_corp' | 'lms_cert' | 'fabrica_ddc' | 'tools_autor' | 'vilt_zoom' | 'eval_proctor' | 'ecommerce' | null;
}

export interface Question {
  text: string;
  why: string;
  insight: Insight;
}

export interface Dimension {
  num: string;
  eyebrow: string;
  title: string;
  ref: string;
  questions: Question[];
}

export const dimensions: Dimension[] = [
  {
    num: "01",
    eyebrow: "Dimensión 1 de 5",
    title: "¿Quién aprende?",
    ref: "Audiencia y Escala\nAnálisis TAEC",
    questions: [
      {
        text: "¿Sabes con precisión quién va a tomar los cursos: nombre del puesto, actividad diaria, nivel de estudios?",
        why: "El adulto aprende cuando el material es relevante a su realidad diaria. Sin un perfil claro, el contenido queda genérico y se desperdicia.",
        insight: { yes: "Excelente base. Con esto podemos estructurar rutas de carrera y contenido focalizado. Permite optimizar la inversión en la producción instruccional.", no: "Es el primer paso antes de adquirir cualquier solución. Sin datos de tu audiencia, no hay métricas de éxito. Sugerencia: Realiza entrevistas semilla a 5 prospectos clave.", plat: "fabrica_ddc" }
      },
      {
        text: "¿Tu audiencia es masiva (más de 500 usuarios) y está distribuida en diferentes localidades, ciudades o filiales?",
        why: "El volumen y la dispersión geográfica exigen que la infraestructura soporte concurrencia y despliegos por zonas horarias o regiones.",
        insight: { yes: "Requieres una <strong>Plataforma LMS Corporativa</strong> de alta jerarquía. No servirá una plataforma plana; necesitas estructuras organizacionales y multi-nodo.", no: "Para audiencias pequeñas o concentradas, una plataforma ágil SaaS es más eficiente, económica y fácil de gestionar.", plat: "lms_corp" }
      },
      {
        text: "¿Tus usuarios están ubicados en diferentes países y requieren consumir la capacitación en idiomas distintos?",
        why: "Localizar e impartir formación global requiere plataformas multi-idioma nativas y herramientas ágiles de traducción para contenido.",
        insight: { yes: "Esto impacta tu producción. Requieres <strong>Herramientas de Autoría avanzadas</strong> (que tengan traducción instantánea IA) para no triplicar tu presupuesto de desarrollo de contenido.", no: "El enfoque mono-idioma reduce drásticamente los costos de licenciamiento de traducciones y facilita la estandarización.", plat: "tools_autor" }
      },
      {
        text: "¿La mayoría de tu audiencia consume información principalmente desde su celular durante traslados o tiempos muertos?",
        why: "El dispositivo principal define el formato del curso. Un curso para escritorio fracasa rotundamente en una pantalla de 6 pulgadas.",
        insight: { yes: "La estrategia debe ser <strong>Mobile-First y LMS Ágil</strong>. Formatos en micro-cápsulas, diseño responsivo obligatorio y audios. El 70% de la formación de campo es auditiva.", no: "Puedes apostar por componentes visuales profundos (simulaciones, software, VR) y depender de equipos de escritorio.", plat: "lms_agil" }
      },
      {
        text: "¿El éxito de tu programa formativo depende de que el alumno aplique físicamente lo aprendido en su entorno de trabajo?",
        why: "Para cambiar un comportamiento operativo, leer PDFs no sirve. Se requiere un diseño basado en escenarios de decisión crítica.",
        insight: { yes: "El diseño instruccional es todo. Requiere interactividad estructurada y ramificación basada en decisiones tempranas. El modelo apunta hacia una <strong>Fábrica de Contenidos a Medida</strong>.", no: "Un modelo informativo (Microlearning lineal + Quiz simple) cumplirá tu objetivo a bajo costo.", plat: "fabrica_ddc" }
      },
    ]
  },
  {
    num: "02",
    eyebrow: "Dimensión 2 de 5",
    title: "¿Qué aprende?",
    ref: "Formatos y Certificación\nAnálisis TAEC",
    questions: [
      {
        text: "¿El contenido que enseñarás cambia con frecuencia por normas, políticas o nuevos productos (cambios mensuales o trimestrales)?",
        why: "Un curso dinámico no puede crearse como un bloque monolítico. Los cambios frecuentes elevan el costo de mantenimiento radicalmente.",
        insight: { yes: "Arquitectura modular obligatoria. Tu equipo necesitará licenciamiento de <strong>Herramientas de Autoría</strong> para aplicar actualizaciones rápidas sin depender de terceros.", no: "Para contenido duradero y estable, puedes invertir en máxima calidad audiovisual (animación, video HQ) ya que el ciclo de vida del material pagará el desarrollo.", plat: "tools_autor" }
      },
      {
        text: "¿Para el cumplimiento normativo (México), tu empresa requiere emitir masivamente Constancias de Habilidades Laborales (Formatos DC-3, DC-4) o evidencias NOM ante la STPS?",
        why: "La Ley Federal del Trabajo exige a las empresas acreditar la capacitación. Evidenciar inspecciones federales manualmente para cientos de usuarios paraliza a la organización.",
        insight: { yes: "Emitir DC-3 y DC-4 a mano es insostenible y riesgoso. Requieres un <strong>LMS Corporativo</strong> equipado con nuestros <strong>Add-ons nativos STPS</strong>, diseñados para auto-generar y compilar estas constancias por firmas masivamente al concluir rutas.", no: "Las constancias digitales estándar de completitud son suficientes. El esfuerzo administrativo actual no amerita automatizar la burocracia federal de competencias.", plat: "lms_corp" }
      },
      {
        text: "¿Requieres evaluar con alta seguridad la identidad del alumno al tomar sus pruebas (evitar trampas o plagios)?",
        why: "Si los resultados impactan contrataciones, pagos o certificaciones mayores, el examen debe estar blindado contra suplantación.",
        insight: { yes: "Tu arquitectura deberá integrar un motor de <strong>Evaluación y Proctoring</strong> (vigilancia algorítmica). La plataforma debe exigir cámara, control de navegador e inteligencia contra trampas.", no: "Las evaluaciones diagnósticas formativas confían en las credenciales simples del empleado. Mayor flexibilidad con menor fricción tecnológica.", plat: "eval_proctor" }
      },
      {
        text: "¿Cuentas con toda la documentación base estructurada (guías, manuales, presentaciones correctas) para iniciar?",
        why: "Sin información cruda madura, ninguna plataforma tecnológica puede generar el contenido por arte de magia.",
        insight: { yes: "Estás listo para migrar a digital. El equipo de producción o agencia podrá enfocarse netamente en el diseño instruccional y gráfico de la experiencia.", no: "Atención roja. Hay una brecha de contenido. La prioridad temporal es usar un servicio de <strong>Desarrollo de Contenido (Extracción)</strong> con especialistas antes de tocar la plataforma.", plat: "fabrica_ddc" }
      },
      {
        text: "¿Tienes que desplegar sesiones sincrónicas (en vivo) como parte fundamental para resolver dudas prácticas o talleres?",
        why: "El modelo mixto (blended) exige que el ecosistema empate la disponibilidad en tiempo real y el contenido bajo demanda.",
        insight: { yes: "Toda tu arquitectura apuntará hacia componentes de <strong>Aulas Virtuales (VILT)</strong>. Calendarios, recordatorios y enlaces de videoconferencia manejados de forma unificada.", no: "Ruta 100% asíncrona online. Maxímiza la autonomía del usuario y reduce el estrés operativo en tu personal.", plat: "vilt_zoom" }
      },
    ]
  },
  {
    num: "03",
    eyebrow: "Dimensión 3 de 5",
    title: "¿Cómo aprende?",
    ref: "Rutas y Modalidades\nAnálisis TAEC",
    questions: [
      {
        text: "¿Las rutas formativas deben ser personalizadas dependiendo de la jerarquía, filial o puesto específico del equipo?",
        why: "No todos encienden la misma máquina. Mapear quién toma qué curso es el dolor de cabeza número uno en Recursos Humanos.",
        insight: { yes: "Asignaciones dinámicas y complejas. Tu proyecto necesita imperativamente un <strong>LMS Corporativo Enterprise</strong> para manejar la lógica de audiencias de manera automatizada.", no: "Programas generales y planos. Puedes sobrevivir con herramientas ligeras o catálogos universales donde el usuario se auto inscribe.", plat: "lms_corp" }
      },
      {
        text: "¿Tu equipo operativo dispone de menos de 10 minutos al día ininterrumpidos para asimilar capacitaciones?",
        why: "En el sector retail, manufactura o ventas, pedirle al talento 60 minutos de su tiempo es imposible y perjudicial para el negocio.",
        insight: { yes: "La única vía es el microlearning. Se utilizará un <strong>LMS Ágil</strong> apoyado por módulos atómicos enfocados en una sola meta instruccional por turno laboral.", no: "Existen espacios protegidos de capacitación. Tus usuarios tolerarán procesos de e-learning narrativos y ricos en formatos largos.", plat: "lms_agil" }
      },
      {
        text: "¿Tienes la necesidad urgente de lanzar la primera academia virtual funcional en menos de una semana o dos?",
        why: "Los tiempos de implementación varían radicalmente entre un gigante corporativo hospedado y una solución SaaS de encendido instantáneo.",
        insight: { yes: "Fricción tecnológica casi cero. La recomendación es ir con una plataforma de despliegue en la nube tipo <strong>LMS Ágil</strong> (plug & play). No hay tiempo para grandes infraestructuras.", no: "Podemos diseñar con precisión y hacer instalaciones, arquitecturas y parametrizaciones profundas tomando el tiempo necesario a favor de la marca digital.", plat: "lms_agil" }
      },
      {
        text: "¿Tus usuarios externos (canales, clientes, afiliados) accederán al aprendizaje desde fuera de su red corporativa oficial?",
        why: "Abrir las puertas a externos expone reglas de seguridad, autogestión de contraseñas y portales dedicados con distinta imagen.",
        insight: { yes: "Saldremos del ecosistema cautivo. Requiere una infraestructura como un <strong>Sistema de Certificación Externo</strong>; es decir, portales multi-tenant con marcas visuales separadas.", no: "Seguiremos con una infraestructura cautiva e intranet (SSO activo directory). El nivel de seguridad sobre los dispositivos ya es un hecho.", plat: "lms_cert" }
      },
      {
        text: "¿Tu modelo formativo exige hacer una evaluación de conocimientos primero para omitirle al alumno lo que ya sabe?",
        why: "El aprendizaje adaptativo respeta el nivel del experto, reduciendo frustraciones organizacionales en talento de larga trayectoria.",
        insight: { yes: "Necesitas flujos condicionantes basados en pre-test. Es una configuración avanzada que apunta fuertemente al bloque de analítica y <strong>Evaluaciones Formales</strong>.", no: "Estructuras lineales secuenciales. Todos toman el Bloque A para abrir el Bloque B, estandarizando el piso de conocimiento base.", plat: "eval_proctor" }
      },
    ]
  },
  {
    num: "04",
    eyebrow: "Dimensión 4 de 5",
    title: "¿Con qué lo mides?",
    ref: "Métricas y Analíticas\nAnálisis TAEC",
    questions: [
      {
        text: "¿Debes enviar mes con mes tableros de control profundos automatizados a Vicepresidencias o Directores del proyecto?",
        why: "Un PDF no basta en los comités ejecutivos. La analítica automatizada con gráficos y envíos programados defiende la inversión.",
        insight: { yes: "No puedes pasar tiempo exportando en excel. Se implementará un <strong>LMS Corporativo Avanzado</strong> con creador de reportes SQL o interfaces visuales agendables.", no: "Reportes pre-construidos bajo demanda cubren las necesidades elementales de completitud para medir participación interna.", plat: "lms_corp" }
      },
      {
        text: "¿Tus diplomados y certificaciones generarán insignias públicas que se puedan postear en LinkedIn, o Códigos QR de valor de mercado?",
        why: "Convertir la capacitación en una divisa curricular valiosa genera marketing gratuito y eleva el compromiso inmensamente.",
        insight: { yes: "Generación de Open Badges y Trazabilidad Blockchain o Registros en Web Externa. Un rasgo muy característico de las soluciones enfocadas a <strong>Certificación Externa</strong>.", no: "Credenciales exclusivas para efectos de cumplimiento interno. Cierran y abren puertas operativas, nada más.", plat: "lms_cert" }
      },
      {
        text: "¿Requieres vincular forzosamente a tu departamento de Talento (SuccessFactors, SAP, Oracle) para reflejar las notas finales?",
        why: "La migración y sincronía de grandes bases de datos determina si usas una plataforma isla o un nodo conectado vía webservices.",
        insight: { yes: "Integraciones potentes (API/Webhooks). Requerimos la columna vertebral técnica y abierta de un gran <strong>LMS Corporativo</strong> para sincronizar nóminas con formaciones.", no: "Plataforma aislada (Stand-Alone). La creación y subida mensual o trimestral de un archivo plano CSV basta para la operación actual.", plat: "lms_corp" }
      },
      {
        text: "¿Requieres evaluar el retorno de la inversión de negocio de este programa vinculándolo directamente con ventas, siniestros o KPIs productivos operacionales?",
        why: "Medir sólo cuántos entran es el Nivel 1. El objetivo supremo Nivel 4 es ver en el cuadro de mando si el aumento en conocimiento impactó la productividad.",
        insight: { yes: "El diseño es altamente consultivo. Más allá de software comercial o LMS estricto, exige el desarrollo de simuladores, pruebas especializadas e integración con la capa de <strong>Evaluación Técnica Avanzada</strong> y Analítica predictiva en la suite general de soluciones de la industria.", no: "Los programas buscarán generar y estabilizar conocimientos teóricos clave con métricas de progresión tradicionales que muestran el alcance poblacional.", plat: "eval_proctor" }
      },
      {
        text: "¿El contenido formativo debe ser altamente audiovisual incluyendo escenarios inmersivos animados para mantener el enganche?",
        why: "En temáticas de onboarding o procesos complejos, la saturación visual estimula la memoria a largo plazo.",
        insight: { yes: "Tu producción exigirá <strong>Herramientas de Autoría de Video Animado</strong> para simplificar flujos duros mediante historias (Storytelling), evitando que el alumno reaccione con aburrimiento prematuro.", no: "Formatos editoriales o interactividades estándar como infografías cubren la necesidad técnica sin requerir renderización audiovisual masiva.", plat: "tools_autor" }
      },
    ]
  },
  {
    num: "05",
    eyebrow: "Dimensión 5 de 5",
    title: "¿Cómo escala?",
    ref: "Monetización y Equipo\nAnálisis TAEC",
    questions: [
      {
        text: "¿Los cursos que vas a emitir buscarán ser vendidos o cobrar por suscripción en el mercado abierto para generar utilidades orgánicas?",
        why: "Monetizar significa enganchar con pasarelas de cobro, tarjetas, carritos de compras y sistemas anti-fraude integrados al LMS.",
        insight: { yes: "El giro arquitectónico es 100% transaccional. Debe usarse un ecosistema <strong>E-commerce</strong> o portales B2C con control monetario automático para desbloqueo de acceso.", no: "Capacitación corporativa tradicional entregada libremente a los usuarios de la base instalada sin fricciones económicas secundarias. ", plat: "ecommerce" }
      },
      {
        text: "¿Pretendes que tu marca cobre fuerza ofreciendo licencias 'Marca Blanca' a tus propios clientes empresariales (B2B2B)?",
        why: "Otorgarles pedazos de ecosistema a terceros controlados por ti exige multi-entidades lógicas en un solo servidor base.",
        insight: { yes: "Modelo Multitenant nativo o Múltiples Portales Jerárquicos. Tu sistema entra rotundamente en la clasificación de un motor de <strong>Certificación o Emisión de Redes Externas</strong>.", no: "Suministro directo orgánico. Toda la estructura corre bajo tu única bandera maestra controlando desde la cúpula corporativa todos los dominios y nodos.", plat: "lms_cert" }
      },
      {
        text: "¿Tu equipo cuenta verdaderamente con el tiempo, el personal de diseño, e ingenieros instruccionales para sentarse a escribir los cursos semana a semana?",
        why: "Elegir la mejor plataforma sin gasolina es construir a medias. El cuello de botella no es tecnológico; suele ser la capacidad de creación interna.",
        insight: { yes: "El enfoque central es adquirir únicamente las licencias para <strong>Herramientas de Autoría y Empaquetado</strong>, ya que ustedes tienen las manos y mentes internamente para explotarlas y crear la fábrica.", no: "Delegación creativa recomendada. El enfoque total estará en los servicios de una <strong>Fábrica de Diseño y Desarrollo a Medida</strong> que externalice la operación y asegure lanzamientos masivos.", plat: "fabrica_ddc" }
      },
      {
        text: "¿El área tecnológica interna o la gerencia operativa tiene la capacidad de administrar y alojar actualizaciones de servidor?",
        why: "Comprar software instalable es un costo; mantenerlo en la nube por propia cuenta exige mantenimiento proactivo permanente de seguridad.",
        insight: { yes: "Se abre el abanico para soluciones Open Source hospedadas propiamente con libertad total de manipulación base en bases de datos abiertas del sistema de control del área técnica interna de la compañía proveedora de los datos.", no: "Fricción e infraestructura cero recomendada. Se necesita alojar el proyecto en Software como Servicio (SaaS) (Ej: un <strong>LMS Ágil</strong> hosteado) donde todo, absolutamente todos los componentes de seguridad corren transparentes por la marca tecnológica global y no por ti internamente en el día a día para evitar problemas catastróficos operativos.", plat: "lms_agil" }
      },
      {
        text: "¿Se espera que la operación del departamento de e-learning capacite o administre a nuevos perfiles en volúmenes masivos de inducciones sincrónicas periódicamente?",
        why: "Existen industrias con alta rotación o crecimientos explosivos (onboarding masivo). Sostener el volumen por clases en vivo desgasta radicalmente e inyecta errores.",
        insight: { yes: "La carga recaerá en estrategias unidas que amarran grabaciones corporativas de calidad mediante motores y simuladores <strong>VILT</strong> hacia cursos estructurados y asincronizados blindados automatizando la carga de ingreso para los facilitadores físicos.", no: "Progresiones estándar y cohortes estables de talento. No hay urgencia en balancear capacidades masivas simultáneas dentro del campus virtual orgánicamente con aulas persistentes de transmisión continuada masiva.", plat: "vilt_zoom" }
      },
    ]
  }
];
