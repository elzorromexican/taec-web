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
  articulate: {
    paths: ['/articulate'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que estás explorando el ecosistema **Articulate 360**.\n\n¿Estás buscando precios para licencias nuevas, requieres renovar tus suscripciones actuales, o quieres informes sobre talleres certificados? *Platícame qué te urge.*",
    contextHop: "📌 *Contexto Actualizado*: Veo que saltaste a la sección de **Articulate 360**.\n\nSi tienes dudas sobre licenciamiento, renovaciones o soporte oficial en México, aquí sigo disponible. *O podemos seguir con el tema inicial.*"
  },
  vyond: {
    paths: ['/vyond'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que estás explorando **Vyond**.\n\n¿Estás buscando cotizar licencias para tu estudio de animación o necesitas renovar cuentas existentes? *Dime cuántas ocupas.*",
    contextHop: "📌 *Contexto Actualizado*: Veo que saltaste a la sección de **Vyond**.\n\nSi necesitas licenciar o consultar por el estudio de animación Vyond Go, avísame. *(Si fue por error, ignora esto y prosigamos).*"
  },
  lms: {
    paths: ['/totara', '/moodle', '/lms'],
    initialGreeting: "Hola {name}, soy Tito Bits. Veo que te interesan nuestras arquitecturas **LMS (Plataformas Empresariales)**.\n\n¿Buscas implementar un ecosistema nuevo, necesitas auditar una plataforma existente, o quieres integrar un LMS con tus sistemas de RR.HH. (como SAP o Workday)? *Dime cuál es tu objetivo.*",
    contextHop: "📌 *Contexto Actualizado*: Veo que estás explorando nuestros ecosistemas **LMS**.\n\nSi necesitas evaluar integraciones técnicas o estrategias de migración, ¡dispara tus preguntas! *Sigo recordando de qué estábamos hablando.*"
  },
  ddc: {
    paths: ['/desarrollo', '/ddc'],
    initialGreeting: "Hola {name}, soy Tito Bits. ¡La **Fábrica de Contenidos a la Medida (DDC)** es nuestra especialidad!\n\nPara empezar a estructurar tu alcance: ¿ya tienes los guiones o PDFs de los cursos que quieres digitalizar, o prefieres que TAEC asuma la creación instruccional desde cero? *Platícame tu caso.*",
    contextHop: "📌 *Contexto Actualizado*: Pasaste a la **Fábrica de Contenidos a la Medida (DDC)**.\n\nSi ocupas que nuestro equipo humano ensamble tus cursos, te ayudo a estimar los pesos presupuestales. *De lo contrario, ignora este mensaje.*"
  },
  capacitacion: {
    paths: ['/curso', '/capacitacion'],
    initialGreeting: "Hola {name}, soy Tito Bits. Entraste a nuestra área de **Capacitación y Talleres**.\n\n¿Te interesa un curso abierto para una sola persona, o requieres armar un taller cerrado exclusivo para capacitar a todo tu equipo corporativo? *Platícame qué herramienta quieren dominar.*",
    contextHop: "📌 *Contexto Actualizado*: Entraste al catálogo de **Capacitación y Talleres**.\n\nSi buscas certificar a tu equipo o a ti mismo en nuestras herramientas con instructores en vivo, dímelo y revisamos currículas."
  },
  store: {
    paths: ['/tienda'],
    initialGreeting: "Hola {name}, soy Tito Bits, tu guía comercial. Veo que estás en nuestra **pasarela de licenciamiento**.\n\nPara licencias aisladas, puedes gestionar la transacción seguro(a) directamente en línea. Si necesitas licenciamiento por volumen, múltiples anualidades o pagos inter-empresariales, *avísame cuántas necesitas para escalar tu cuenta con mis consultores humanos.*",
    contextHop: "📌 *Contexto Actualizado*: Has entrado a nuestra **Pasarela de E-commerce**.\n\nPara transacciones de volumen B2B, te recomiendo siempre apoyarte conmigo por este chat para alinear los términos antes del checkout."
  }
};
