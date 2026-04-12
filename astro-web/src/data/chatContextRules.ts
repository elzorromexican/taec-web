/**
 * REGLAS DE CONTEXTO PARA EL CHATBOT (TITO BITS)
 * 
 * Aquí puedes modificar libremente los textos que Tito Bits enviará a los clientes
 * dependiendo de la página en la que se encuentren navegando.
 * 
 * - paths: Las palabras clave en la URL que detonarán este contexto (ej. "/vyond").
 * - initialGreeting: Lo que dirá Tito si el cliente INICIA su primer chat en esta rama. Usa {name} para meter el nombre del prospecto.
 * - contextHop: Lo que dirá Tito si el cliente viene de otra página y SALTA a esta rama con la memoria ya activada.
 */

export const chatCategoryRules = {
  general: {
    paths: [],
    initialGreeting: "Hola {name}, soy Tito Bits, asesor comercial en TAEC.\n\nDime qué necesitas resolver hoy:\n\n1. **Crear cursos desde cero** (Licencias Articulate/Vyond)\n2. **Implementar plataforma** (LMS: Totara/Moodle)\n3. **Que TAEC desarrolle mis cursos** (Fábrica DDC llave en mano)\n\n*Responde con el número o platícame tu caso.*",
    contextHop: ""
  },

  // ── ARTICULATE ──────────────────────────────────────
  articulate: {
    paths: ['/articulate-360-mexico', '/articulate-360'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que estás explorando **Articulate 360** — la suite completa de autoría.\n\n¿Buscas licencias nuevas, renovar suscripciones o comparar los planes Teams vs Individual? *Platícame qué te urge.*",
    contextHop: "📌 Saltaste a **Articulate 360**. Si tienes dudas sobre licenciamiento o renovaciones, aquí sigo."
  },
  articulate_storyline: {
    paths: ['/articulate-storyline360'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras **Storyline 360** — la herramienta de autoría más potente de Articulate.\n\n¿Buscas licencias, quieres ver demos de interactividad avanzada o te interesa el curso de certificación? *Dime por dónde empezamos.*",
    contextHop: "📌 Saltaste a **Storyline 360**. Si tienes dudas técnicas o de licenciamiento, aquí sigo."
  },
  articulate_rise: {
    paths: ['/articulate-rise360'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras **Rise 360** — cursos responsive y nativo mobile sin código.\n\n¿Buscas producir contenido rápido para equipos distribuidos o móviles? *Platícame el caso.*",
    contextHop: "📌 Saltaste a **Rise 360**. Si necesitas cursos rápidos y mobile-first, aquí sigo."
  },
  articulate_ai: {
    paths: ['/articulate-ai-assistant'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras el **AI Assistant de Articulate**.\n\n¿Buscas acelerar la producción de cursos con IA integrada al ecosistema? *Cuéntame cómo produce contenido tu equipo hoy.*",
    contextHop: "📌 Saltaste al **AI Assistant de Articulate**. Si quieres ver cómo la IA reduce tiempos de producción, cuéntame."
  },
  articulate_review: {
    paths: ['/articulate-review360'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras **Review 360** — revisión colaborativa de cursos.\n\n¿Tu equipo necesita un flujo de feedback estructurado con clientes o stakeholders internos? *Platícame cómo gestionan las revisiones hoy.*",
    contextHop: "📌 Saltaste a **Review 360**. Si necesitas agilizar el proceso de revisión de contenidos, aquí sigo."
  },
  articulate_reach: {
    paths: ['/articulate-reach'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras **Reach 360** — distribución de cursos sin LMS.\n\n¿Necesitas entregar capacitación a audiencias externas sin infraestructura de plataforma? *Cuéntame el caso.*",
    contextHop: "📌 Saltaste a **Reach 360**. Si necesitas distribuir cursos sin LMS, aquí te oriento."
  },
  articulate_localization: {
    paths: ['/articulate-localization'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras **Articulate Localization** — traducción y validación de cursos multilingüe.\n\n¿Tienes proyectos en varios idiomas o regiones que necesitas escalar? *Platícame cuántos cursos y a qué idiomas.*",
    contextHop: "📌 Saltaste a **Articulate Localization**. Si manejas cursos en varios idiomas, aquí te oriento."
  },

  // ── VYOND ───────────────────────────────────────────
  vyond: {
    paths: ['/vyond-mexico'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras **Vyond** — video animado corporativo.\n\n¿Buscas cotizar licencias, comparar planes o ver qué tipo de videos puedes producir? *Dime cuántas personas van a usar la herramienta.*",
    contextHop: "📌 Saltaste a **Vyond**. Si necesitas licenciar o renovar, aquí sigo."
  },
  vyond_go: {
    paths: ['/vyond-go'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras **Vyond Go** — el plan de entrada para video animado.\n\n¿Es para un solo creador o un equipo pequeño? *Cuéntame cuántos van a producir contenido.*",
    contextHop: "📌 Saltaste a **Vyond Go**. Si buscas el plan de entrada para animación, aquí te oriento."
  },
  vyond_professional: {
    paths: ['/vyond-professional'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras **Vyond Professional** — producción avanzada con assets premium.\n\n¿Tu equipo necesita personajes custom, fondos a medida o integración con flujos de producción existentes? *Platícame el caso.*",
    contextHop: "📌 Saltaste a **Vyond Professional**. Si necesitas producción de video avanzada, aquí sigo."
  },
  vyond_enterprise: {
    paths: ['/vyond-enterprise'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras **Vyond Enterprise** — para equipos de producción a escala con SSO y gobierno.\n\n¿Cuántos creadores de contenido tiene tu organización y qué infraestructura IT manejan? *Eso define si Enterprise es la ruta.*",
    contextHop: "📌 Saltaste a **Vyond Enterprise**. Si necesitas SSO, gobierno centralizado y escala, aquí te oriento."
  },
  vyond_starter: {
    paths: ['/vyond-starter'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras **Vyond Starter**.\n\n¿Es tu primer acercamiento a video animado o ya tienes experiencia con otras herramientas? *Eso me ayuda a recomendarte el plan correcto.*",
    contextHop: "📌 Saltaste a **Vyond Starter**. Si quieres comparar planes, aquí te oriento."
  },
  vyond_mobile: {
    paths: ['/vyond-mobile'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras **Vyond Mobile** — producción de video desde dispositivos móviles.\n\n¿Tu equipo de contenido trabaja en campo o fuera de oficina? *Platícame el flujo de producción que buscan.*",
    contextHop: "📌 Saltaste a **Vyond Mobile**. Si necesitas producir video desde móvil, aquí sigo."
  },
  vyond_studio: {
    paths: ['/vyond-studio'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras **Vyond Studio**.\n\n¿Buscas una solución de producción de video corporativo a escala? *Cuéntame el equipo y volumen de contenido.*",
    contextHop: "📌 Saltaste a **Vyond Studio**. Si necesitas producción a escala, aquí te oriento."
  },

  // ── LMS ─────────────────────────────────────────────
  totara: {
    paths: ['/totara-lms-mexico'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras **Totara LMS** — plataforma enterprise de aprendizaje.\n\n¿Buscas implementar un LMS nuevo, migrar de otra plataforma o integrar con sistemas RH (SAP, Workday)? *Dime cuál es el objetivo.*",
    contextHop: "📌 Saltaste a **Totara LMS**. Si necesitas evaluar arquitectura enterprise, aquí sigo."
  },
  moodle: {
    paths: ['/moodle-mexico'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras **Moodle** — la plataforma LMS open source más usada del mundo.\n\n¿Buscas implementación nueva, soporte para una instalación existente o migración? *Platícame el contexto.*",
    contextHop: "📌 Saltaste a **Moodle**. Si necesitas implementación o soporte, aquí te oriento."
  },

  // ── DDC ─────────────────────────────────────────────
  ddc: {
    paths: ['/desarrollo-de-contenidos', '/ddc'],
    initialGreeting: "Hola {name}, soy Tito Bits. ¡La **Fábrica de Contenidos a la Medida (DDC)** es nuestra especialidad!\n\n¿Ya tienes guiones o material fuente, o necesitas que TAEC asuma el diseño instruccional desde cero? *Platícame tu caso.*",
    contextHop: "📌 Saltaste a **DDC**. Si necesitas que TAEC produzca tus cursos, aquí te oriento."
  },

  // ── SOLUCIONES COMPLEMENTARIAS ──────────────────────
  lys: {
    paths: ['/lys-mexico'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras **LYS** — aprendizaje ágil por WhatsApp.\n\n¿Buscas llegar a equipos en campo, distribuidos o sin acceso a LMS tradicional? *Platícame el reto de capacitación.*",
    contextHop: "📌 Saltaste a **LYS**. Si necesitas capacitación por WhatsApp sin apps adicionales, aquí sigo."
  },
  ottolearn: {
    paths: ['/ottolearn-mexico'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras **OttoLearn** — microlearning adaptativo y gamificado.\n\n¿Buscas reforzar conocimientos post-capacitación o construir cultura de aprendizaje continuo? *Cuéntame el contexto.*",
    contextHop: "📌 Saltaste a **OttoLearn**. Si quieres refuerzo adaptativo o gamificación continua, aquí sigo."
  },
  pifini: {
    paths: ['/pifini-mexico'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras **PIFINI / NetExam** — academias externas y customer education.\n\n¿El caso es capacitar a tu canal de distribución, clientes o comunidad externa? *Cuéntame el modelo.*",
    contextHop: "📌 Saltaste a **PIFINI / NetExam**. Si necesitas academia para externos con certificación, aquí te oriento."
  },
  proctorizer: {
    paths: ['/proctorizer-mexico'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras **Proctorizer** — supervisión de evaluaciones en línea.\n\n¿Son exámenes internos para colaboradores o evaluaciones académicas? *Eso me ayuda a dimensionar la solución.*",
    contextHop: "📌 Saltaste a **Proctorizer**. Si necesitas proteger la integridad de tus evaluaciones, aquí sigo."
  },
  strikeplagiarism: {
    paths: ['/strikeplagiarism-mexico'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras **StrikePlagiarism** — detección de plagio y contenido generado por IA.\n\n¿El caso es corporativo o académico? *Dime el contexto y volumen de entregas.*",
    contextHop: "📌 Saltaste a **StrikePlagiarism**. Si necesitas detectar similitud o contenido IA, aquí sigo."
  },
  class: {
    paths: ['/class-taec'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras **Class** — aula virtual para Zoom y Microsoft Teams.\n\n¿Actualmente usas Zoom o Teams para sesiones en vivo? *Eso me ayuda a ver cómo Class potencia lo que ya tienes.*",
    contextHop: "📌 Saltaste a **Class**. Si quieres convertir tus videollamadas en aulas con métricas, aquí sigo."
  },
  customguide: {
    paths: ['/customguide-mexico'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras **CustomGuide** — cursos editables de Microsoft 365 y Google Workspace.\n\n¿Buscas capacitar a tu equipo en herramientas de productividad con cursos listos para tu LMS? *Cuéntame el volumen y la herramienta.*",
    contextHop: "📌 Saltaste a **CustomGuide**. Si necesitas cursos de Office o Google listos para tu LMS, aquí sigo."
  },
  catalogo: {
    paths: ['/7minutes-learning'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras **7Minutes Learning** — microlearning de Soft Skills listo para usar.\n\n¿Buscas contenido SCORM off-the-shelf para tu LMS sin tiempos de producción? *Platícame qué temas necesita tu equipo.*",
    contextHop: "📌 Saltaste a **7Minutes Learning**. Si necesitas cursos de catálogo listos para usar, aquí sigo."
  },

  // ── CAPACITACIÓN ────────────────────────────────────
  capacitacion: {
    paths: ['/capacitacion-abierta', '/capacitacion-cerrada', '/capacitacion'],
    initialGreeting: "Hola {name}, soy Tito Bits. Entraste a nuestra área de **Capacitación y Talleres**.\n\n¿Te interesa un curso abierto para una persona o un taller cerrado para todo tu equipo? *Platícame qué herramienta quieren dominar.*",
    contextHop: "📌 Saltaste a **Capacitación y Talleres**. Si buscas certificar a tu equipo con instructores en vivo, dímelo."
  },
  curso_articulate: {
    paths: ['/curso-articulate'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras nuestros **cursos de Articulate 360**.\n\n¿Buscas el curso básico, avanzado o el completo? ¿Es para una persona o quieres cerrar un grupo corporativo? *Platícame.*",
    contextHop: "📌 Saltaste a **Cursos de Articulate**. Si necesitas capacitar a tu equipo, aquí te oriento."
  },
  curso_storyline: {
    paths: ['/curso-storyline'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras el **Curso de Storyline 360**.\n\n¿Buscas nivel básico, avanzado o técnicas expertas? *Dime el nivel actual de tu equipo.*",
    contextHop: "📌 Saltaste al **Curso de Storyline**. Si necesitas capacitación especializada, aquí sigo."
  },
  curso_vyond: {
    paths: ['/curso-vyond'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras el **Taller de Vyond**.\n\n¿Buscas capacitar a un solo diseñador o a todo el equipo de comunicación? *Cuéntame el contexto.*",
    contextHop: "📌 Saltaste al **Taller Vyond**. Si necesitas capacitar en video animado, aquí sigo."
  },
  curso_moodle: {
    paths: ['/curso-moodle'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que exploras los **Cursos de Moodle**.\n\n¿Buscas administración, creación de cursos o el combo completo? *Dime el perfil de quien se va a capacitar.*",
    contextHop: "📌 Saltaste a **Cursos de Moodle**. Si necesitas capacitar a tu admin o instructores, aquí sigo."
  },

  // ── STORE / CONTACTO ────────────────────────────────
  store: {
    paths: ['/tienda'],
    initialGreeting: "Hola {name}, soy Tito Bits, tu guía comercial. Veo que estás en nuestra **pasarela de licenciamiento**.\n\nPara licencias individuales puedes gestionar directo en línea. Si necesitas volumen, múltiples anualidades o factura empresarial, *avísame para escalar con mis consultores.*",
    contextHop: "📌 Entraste a la **Pasarela de E-commerce**. Para volumen B2B, te recomiendo alinear términos aquí antes del checkout."
  },
  diagnostico: {
    paths: ['/diagnostico'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que completaste el **Diagnóstico de e-learning**.\n\nCon base en tus respuestas, puedo orientarte a la solución más adecuada. *¿Quieres que revisemos los resultados juntos?*",
    contextHop: "📌 Saltaste al **Diagnóstico**. Si quieres interpretar tus resultados, aquí sigo."
  },
  contacto: {
    paths: ['/contacto'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que estás en nuestra página de **Contacto**.\n\n¿Prefieres que te ayude directamente aquí por chat, o necesitas orientación antes de llenar el formulario? *Dime en qué puedo ayudarte.*",
    contextHop: "📌 Saltaste a **Contacto**. Si necesitas orientación antes de escribirnos, aquí sigo."
  }
};
