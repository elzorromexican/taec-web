// CHANGELOG: 2026-03-20 - Archivo de datos para landing Desarrollo de Contenidos (DDC).
// Fuente: "Info DDC para sitio web" — Directora de Desarrollo de Contenidos TAEC.

// ── HERO ──────────────────────────────────────────────────────────────────────
export const ddcHero = {
  eyebrow: "DDC · Desarrollo de Contenidos",
  titleHtml: `e-Learning con <em>metodología experta</em> e IA generativa`,
  subtitle: "Tu Project Manager dedicado coordina cada fase —desde el análisis instruccional hasta la entrega de archivos editables— garantizando calidad, tiempos y total autonomía sobre tus contenidos.",
  features: [
    "Metodología ADDIE + Agile SAM",
    "Entregas Alfa, Beta y Gold con Review 360",
    "Archivos editables siempre incluidos",
    "Garantía técnica 6 meses",
    "Project Manager dedicado en cada proyecto",
    "SCORM / xAPI · Compatible con cualquier LMS"
  ],
  cardBadgeText: "METODOLOGÍA CERTIFICADA · DDC TAEC",
  theme: "general" as const
};

// ── SERVICIOS ─────────────────────────────────────────────────────────────────
export const ddcServicios = [
  {
    icon: "💻",
    label: "e-Learning interactivo",
    desc: "Cursos con Articulate 360: microlearning, rapid learning, simuladores de software, gamificación, 360°, storytelling y más. 100% responsivos, con locución, animación 2D y video integrado."
  },
  {
    icon: "🎬",
    label: "Video formativo",
    desc: "Animación 2D con Vyond, Motion Graphic a la medida y video 3D. Montaje en objetos SCORM para registro en LMS e interactividad opcional."
  },
  {
    icon: "📋",
    label: "Recursos complementarios",
    desc: "Guías, manuales, infografías, carteles, e-actividades y evaluaciones. Integración en Documento Maestro con cartas descriptivas para programas completos."
  },
  {
    icon: "✨",
    label: "Servicios de IA",
    desc: "Locución digital realista, avatares animados, gemelos digitales y multiidioma automatizado. Guiones y storyboards potenciados con IA generativa en Articulate y Vyond."
  }
];

// ── BENEFICIOS ────────────────────────────────────────────────────────────────
export const ddcBeneficios = {
  eyebrow: "Por qué TAEC DDC",
  title: "Cuatro razones para confiar tu e-learning a TAEC",
  subtitle: "Más de 18 años produciendo cursos a medida para corporativos en México, LATAM, Europa y Estados Unidos.",
  columns: 4 as const,
  theme: "general" as const,
  cards: [
    {
      icon: "🛠️",
      title: "Herramientas líderes globales",
      description: "Desarrollamos con Articulate 360 (Storyline, Rise) y Vyond: la combinación más potente del mercado para cursos interactivos, animación 2D, Motion Graphic y video formativo."
    },
    {
      icon: "🤖",
      title: "IA Generativa integrada",
      description: "Locución digital realista, avatares animados, gemelos digitales y traducción multiidioma automática. Mayor velocidad de producción sin sacrificar identidad ni calidad instruccional."
    },
    {
      icon: "🏆",
      title: "Metodología con garantía",
      description: "ADDIE para diseño instruccional + Agile SAM para producción multimedia. Garantía técnica de 6 meses sobre funcionalidad y publicación en cualquier LMS o LXP."
    },
    {
      icon: "📂",
      title: "Transparencia y autonomía",
      description: "Siempre entregas los archivos fuente editables. Revisiones incluidas vía Articulate Review 360. Tú controlas tu contenido, sin dependencia del desarrollador."
    }
  ]
};

// ── PROCESO ───────────────────────────────────────────────────────────────────
export const ddcProceso = [
  {
    paso: "01",
    titulo: "Análisis",
    subtitulo: "ADDIE — Fase 1",
    desc: "Detectamos necesidades, definimos objetivos de aprendizaje y estrategia de contenido junto con tu experto temático."
  },
  {
    paso: "02",
    titulo: "Diseño instruccional",
    subtitulo: "Guión + Storyboard",
    desc: "Elaboramos el guión de diseño instruccional. Las revisiones se realizan sobre el documento o mediante sesión remota."
  },
  {
    paso: "03",
    titulo: "Prototipo Alfa",
    subtitulo: "Agile SAM — Iteración 1",
    desc: "Primera versión funcional del curso. Revisión en Articulate Review 360 con control de cambios en tiempo real."
  },
  {
    paso: "04",
    titulo: "Versión Beta",
    subtitulo: "Agile SAM — Iteración 2",
    desc: "Curso refinado con ajustes de la primera vuelta. Pruebas de funcionalidad en plataforma LMS propia de TAEC."
  },
  {
    paso: "05",
    titulo: "Versión Gold",
    subtitulo: "Entrega final",
    desc: "Entregable validado en SCORM/xAPI, archivos fuente editables y garantía técnica de 6 meses activada."
  }
];

// ── FAQs ───────────────────────────────────────────────────────────────────────
export const ddcFaqs = [
  {
    question: "¿Cómo se cotiza un desarrollo de curso?",
    answerHtml: "El precio se presenta como presupuesto <strong>por proyecto</strong>, una vez analizados los contenidos fuente y definidas las características del curso. También existe la modalidad <strong>por Hora Hombre</strong>, ideal para proyectos de alcance variable o desarrollo atípico. Incluimos descuentos por volumen y frecuencia."
  },
  {
    question: "¿Necesito tener el contenido listo para cotizar?",
    answerHtml: "Para una cotización precisa necesitamos el <strong>contenido fuente final y validado</strong>. A partir de él estimamos duración, nivel de interactividad y costo real. Si el contenido está en borrador, podemos hacer una estimación preliminar en sesión; los ajustes se afinarán una vez validado."
  },
  {
    question: "¿Cuánto tiempo toma producir un curso?",
    answerHtml: "Definimos <strong>planes de trabajo específicos</strong> según la disponibilidad de tu equipo revisor. Es posible producir varios cursos de forma <strong>simultánea y escalonada</strong>, liberando objetos de aprendizaje semanalmente para cumplir fechas de lanzamiento ajustadas."
  },
  {
    question: "¿Qué estándares de eLearning soportan?",
    answerHtml: "Producimos bajo <strong>SCORM 1.2, SCORM 2004 y xAPI (Tin Can)</strong>. El paquete garantiza registro de avance, evaluaciones y seguimiento individual en cualquier LMS o LXP. Probamos funcionamiento en nuestra plataforma LMS antes de entregar."
  },
  {
    question: "¿Me entregan los archivos editables del curso?",
    answerHtml: "<strong>Sí, siempre.</strong> Es una política de TAEC DDC. Recibirás los archivos fuente de Articulate (<code>.story</code> / <code>.rise</code>) y los archivos de Vyond, para que puedas actualizar el contenido de forma independiente, sin depender del desarrollador."
  },
  {
    question: "¿Qué cubre la garantía de 6 meses?",
    answerHtml: "Cubre <strong>aspectos técnicos y funcionales</strong> relacionados con la construcción o publicación: reproducción en navegadores modernos, tracking SCORM, visualización responsive y compatibilidad con plataforma LMS. No cubre cambios de contenido solicitados después de aprobada la versión Gold."
  },
  {
    question: "¿Pueden coordinar con el área de TI de mi empresa?",
    answerHtml: "Sí. Tenemos amplia experiencia coordinando con equipos de TI corporativos para implementación en plataformas internas, configuración de SCORM y pruebas de integración con el LMS del cliente. Respaldamos a tu equipo de L&D en todo el proceso."
  }
];

// ── LOGOS — Prueba social ──────────────────────────────────────────────────────
// Fuente: Lista de clientes del PDF (sección 9)
export const ddcLogos = [
  { type: "text" as const, text: "DHL Supply Chain" },
  { type: "text" as const, text: "Eli Lilly" },
  { type: "text" as const, text: "Banorte" },
  { type: "text" as const, text: "MARS" },
  { type: "text" as const, text: "Hyundai" },
  { type: "text" as const, text: "Palacio de Hierro" },
  { type: "text" as const, text: "Unilever" },
  { type: "text" as const, text: "Volaris" },
  { type: "text" as const, text: "BID" },
  { type: "text" as const, text: "Daimler Trucks" }
];

// ── CTA FINAL ─────────────────────────────────────────────────────────────────
export const ddcCta = {
  title: "¿Listo para ver ejemplos de nuestro trabajo?",
  subtitle: "Agendemos una sesión sin costo: te mostramos casos reales, resolvemos tus dudas y diseñamos una propuesta a medida para tu programa de formación.",
  primaryBtnText: "Agendar sesión de demostración →",
  theme: "general" as const
};
