export interface Insight {
  yes: string;
  no: string;
  plat: 'reach360' | 'moodle' | 'totara' | 'netexam' | null;
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
    ref: "Knowles (Andragogía)\nKnowles, 1980",
    questions: [
      {
        text: "¿Sabes con precisión quién va a tomar los cursos: nombre del puesto, actividad diaria, nivel de estudios?",
        why: "Sin perfil claro, el contenido queda genérico. El adulto aprende cuando el material es relevante a su realidad.",
        insight: { yes: "Bien. Con ese perfil podemos calibrar nivel, tono, duración y formato. El siguiente paso es confirmar en qué dispositivo aprenderán y cuánto tiempo libre real tienen.", no: "Este es el primer trabajo antes de comprar cualquier plataforma. Sin saber quién aprende, no se puede diseñar nada útil. <strong>Acción:</strong> Entrevista a 3-5 personas que tomarán los cursos. Pregúntales qué dispositivo usan más y cuántos minutos libres tienen en su jornada.", plat: null }
      },
      {
        text: "¿Tu audiencia tiene acceso regular a computadora durante su jornada laboral?",
        why: "El dispositivo principal define el formato del contenido. Un enfermero en turno aprende diferente que un ejecutivo en oficina.",
        insight: { yes: "Puedes apostar por contenido más rico: interactividades, simulaciones, videos HD. El aula virtual síncrona también es viable.", no: "<strong>Mobile-first obligatorio.</strong> Cápsulas cortas, audio prioritario, sin videos pesados. Según Articulate, el 70% del uso en cursos médicos es audio. Diseña para el celular primero.", plat: "reach360" }
      },
      {
        text: "¿Tus alumnos ya han tomado algún curso en línea antes (cualquier plataforma)?",
        why: "La madurez digital del alumno afecta el onboarding, la navegación y el soporte necesario.",
        insight: { yes: "Puedes reducir el tiempo de onboarding y usar funciones más avanzadas desde el inicio.", no: "Planea una sesión de inducción antes del primer curso. La familiaridad con la plataforma aumenta significativamente la tasa de finalización. <strong>Dato:</strong> Una sesión guiada inicial reduce el abandono en los primeros 3 días.", plat: "reach360" }
      },
      {
        text: "¿Tienes más de 3 grupos distintos de alumnos con necesidades de aprendizaje diferentes?",
        why: "La segmentación de audiencias requiere funciones avanzadas de LMS que no todas las plataformas ofrecen.",
        insight: { yes: "Necesitas un LMS con gestión de audiencias, rutas diferenciadas y permisos por rol. Esto apunta a Totara o Moodle según tu escala.", no: "Una plataforma simple es suficiente. No compliques la arquitectura si tu audiencia es homogénea.", plat: "totara" }
      },
      {
        text: "¿El éxito de tu programa depende de que el alumno aplique lo aprendido en situaciones reales (no solo que lo sepa)?",
        why: "El cambio de comportamiento requiere práctica, feedback y refuerzo. Eso implica diseño instruccional diferente al de un curso informativo.",
        insight: { yes: "<strong>Diseño basado en escenarios.</strong> El contenido debe incluir simulaciones, casos reales y práctica supervisada. Según investigación de la Research Institute of America, agregar elementos interactivos eleva la retención de 20-30% hasta 70-90%.", no: "Un curso informativo bien diseñado es suficiente. Microlearning + evaluación de comprensión cumple el objetivo.", plat: null }
      },
    ]
  },
  {
    num: "02",
    eyebrow: "Dimensión 2 de 5",
    title: "¿Qué aprende?",
    ref: "Gagné (9 eventos)\nGagné, 1965",
    questions: [
      {
        text: "¿El contenido que vas a enseñar cambia con frecuencia (normativas, actualizaciones de producto, procedimientos)?",
        why: "El contenido dinámico requiere arquitectura modular. Un curso monolítico que cambia cada 6 meses es costoso de mantener.",
        insight: { yes: "<strong>Arquitectura modular obligatoria.</strong> Diseña el curso en cápsulas independientes para poder actualizar solo el módulo afectado sin reconstruir todo. Según eLearning Industry, los módulos de microlearning se desarrollan hasta 300% más rápido que los materiales tradicionales.", no: "Puedes apostar por producción más elaborada y duradera. El contenido estable justifica mayor inversión en diseño gráfico y producción audiovisual.", plat: null }
      },
      {
        text: "¿El aprendizaje incluye habilidades que requieren práctica física o presencia (procedimientos clínicos, manejo de equipos, atención al cliente)?",
        why: "Hay habilidades que no se pueden certificar solo con un examen en línea. Requieren componente presencial o práctico.",
        insight: { yes: "<strong>Modelo blended obligatorio.</strong> La parte online enseña la teoría; la parte presencial o supervisada certifica la habilidad. Articulate describe exactamente este modelo para certificación de productos médicos: microlearning + taller práctico + certificación.", no: "El aprendizaje puede ser 100% en línea. Aprovecha formatos interactivos y evaluaciones ramificadas para simular la aplicación.", plat: null }
      },
      {
        text: "¿Necesitas acreditar que el alumno aprendió ante una autoridad externa (certificadora, regulador, cliente corporativo)?",
        why: "Las acreditaciones externas requieren trazabilidad de evidencias, registros auditables y mecanismos de validación.",
        insight: { yes: "Necesitas un sistema con constancias verificables, registros auditables y posiblemente open badges. <strong>PIFINI/NetExam</strong> está diseñado exactamente para este caso.", no: "Una constancia interna con QR de validación es suficiente para la mayoría de los casos B2B.", plat: "netexam" }
      },
      {
        text: "¿Tienes material base existente: presentaciones, manuales, videos, protocolos?",
        why: "El punto de partida del contenido define cuánto tiempo y presupuesto requiere la producción.",
        insight: { yes: "Ese material es el 40-60% del trabajo de producción. Con lo que tienes, TAEC puede construir el guión instruccional y completar el curso en menos tiempo.", no: "Hay que crear desde cero. Esto implica mayor inversión de tiempo del especialista y del equipo de producción. Prioriza el primer curso como piloto antes de comprometerte con un catálogo amplio.", plat: null }
      },
      {
        text: "¿El contenido tiene un componente de cumplimiento regulatorio (NOM, COFEPRIS, ISO, STPS)?",
        why: "El compliance training requiere trazabilidad de quién tomó el curso, cuándo y con qué resultado. Es un requerimiento legal, no opcional.",
        insight: { yes: "<strong>Compliance = trazabilidad total.</strong> Necesitas reporting auditables, fechas de vencimiento de certificación y notificaciones automáticas. Moodle o Totara son las opciones más robustas para este requerimiento.", no: "La estructura puede ser más flexible. Sin obligación regulatoria, puedes priorizar experiencia del alumno sobre trazabilidad exhaustiva.", plat: "totara" }
      },
    ]
  },
  {
    num: "03",
    eyebrow: "Dimensión 3 de 5",
    title: "¿Cómo aprende?",
    ref: "Articulate / Mindstamp\n2025",
    questions: [
      {
        text: "¿Puedes reunir a todos tus alumnos en un mismo horario para sesiones en vivo (webinar, clase virtual)?",
        why: "La disponibilidad de agenda define si el modelo puede ser síncrono o debe ser completamente asíncrono.",
        insight: { yes: "<strong>Blended estratégico:</strong> usa sesiones síncronas para aplicación y resolución de casos complejos; reserva el asíncrono para contenido informativo. Según investigación 2025, el síncrono genera motivación intrínseca significativamente mayor.", no: "<strong>Modelo asíncrono + refuerzo:</strong> El asíncrono es ideal para transferencia de conocimiento escalable. Complementa con foros o canales de preguntas para mantener la sensación de comunidad.", plat: null }
      },
      {
        text: "¿Tus alumnos tienen más de 30 minutos continuos disponibles para aprender en un solo bloque?",
        why: "Según LinkedIn Learning, cursos menores a 5 minutos tienen 74% de finalización; mayores a 15 minutos bajan al 36%.",
        insight: { yes: "Puedes usar módulos más largos con actividades intercaladas. Mantén bloques de contenido no mayores a 7-10 minutos con micro-actividades entre ellos para sostener la atención.", no: "<strong>Microlearning obligatorio.</strong> Diseña cápsulas de 3-7 minutos con un solo objetivo de aprendizaje. Según ATD, el microlearning crea 50% más engagement que los formatos tradicionales.", plat: "reach360" }
      },
      {
        text: "¿Quieres que el alumno pueda aprender a su propio ritmo, sin fechas límite estrictas?",
        why: "El aprendizaje autodirigido aumenta la satisfacción pero reduce la tasa de finalización si no hay estructura de fechas.",
        insight: { yes: "Flujo libre bien diseñado: incluye nudges automáticos (recordatorios) para alumnos inactivos. Sin ellos, el 60%+ abandona sin terminar. Una fecha de vencimiento suave mejora la finalización sin presionar.", no: "Las cohortes con fecha fija tienen tasas de finalización hasta 3 veces mayores que el flujo libre. Define fechas de cierre claras y comunícalas desde el inicio.", plat: null }
      },
      {
        text: "¿Tu programa incluye o necesita incluir sesiones presenciales además del contenido en línea?",
        why: "El modelo blended presencial requiere coordinación logística y herramientas de gestión de calendarios y asistencia.",
        insight: { yes: "<strong>Modelo blended:</strong> El contenido en línea prepara al alumno para la sesión presencial (modelo flipped). Esto maximiza el valor del tiempo cara a cara. Moodle y Totara tienen gestión de ILT (instructor-led training) integrada.", no: "Modelo 100% digital. Maximiza la producción asíncrona y complementa con sesiones virtuales síncronas opcionales para resolver dudas.", plat: "moodle" }
      },
      {
        text: "¿Quieres que el contenido se adapte al alumno según lo que ya sabe (aprendizaje adaptativo)?",
        why: "El aprendizaje adaptativo evita que el alumno repase lo que ya domina, reduciendo abandono y mejorando eficiencia.",
        insight: { yes: "<strong>Evaluación diagnóstica al inicio:</strong> El alumno hace un pre-test; el sistema lo manda al módulo correspondiente según su nivel. Esto respeta su tiempo y aumenta el compromiso. Especialmente importante en audiencias expertas como médicos y técnicos.", no: "El modelo lineal es más simple de producir y administrar. Funciona bien cuando la audiencia tiene un nivel de partida homogéneo.", plat: null }
      },
    ]
  },
  {
    num: "04",
    eyebrow: "Dimensión 4 de 5",
    title: "¿Con qué lo mides?",
    ref: "Kirkpatrick / xAPI\n2024",
    questions: [
      {
        text: "¿Necesitas saber exactamente quién completó el curso, cuándo y con qué calificación?",
        why: "El tracking básico (completion + score) es el mínimo para cualquier programa corporativo. Sin él, no puedes demostrar impacto.",
        insight: { yes: "Cualquiera de las plataformas TAEC cubre esto. La diferencia está en el detalle del reporte: tiempo por módulo, intentos por pregunta, patrones de abandono.", no: "Si no necesitas tracking formal, considera si realmente necesitas un LMS o si una solución más ligera (PDF + formulario + constancia manual) sirve para arrancar.", plat: null }
      },
      {
        text: "¿Tienes que reportar el avance de capacitación a un cliente externo, consejo directivo o autoridad regulatoria?",
        why: "Los reportes externos requieren datos auditables, formatos específicos y en algunos casos exportación a sistemas de terceros.",
        insight: { yes: "Necesitas un LMS con reporting robusto y exportable. Moodle y Totara tienen conectores nativos para sistemas externos. Define desde ahora qué campos necesita el reporte.", no: "Un reporte interno es suficiente. Todas las plataformas TAEC generan dashboards básicos que cubren este nivel.", plat: "totara" }
      },
      {
        text: "¿Quieres medir si el aprendizaje tuvo impacto real en el desempeño (ventas, errores, satisfacción del cliente)?",
        why: "Medir más allá del examen — el nivel 3 y 4 de Kirkpatrick — requiere integración con datos operativos y un plan de evaluación.",
        insight: { yes: "<strong>ROI del aprendizaje:</strong> Define antes del lanzamiento los indicadores de negocio que quieres mover. Sin línea base no hay comparación. xAPI permite registrar comportamiento fuera del LMS. TAEC puede ayudarte a diseñar ese plan.", no: "Medir completion rate y satisfacción (nivel 1-2 de Kirkpatrick) es suficiente para arrancar. Puedes escalar la medición en etapas posteriores.", plat: null }
      },
      {
        text: "¿La certificación que emites necesita tener vigencia y renovarse periódicamente?",
        why: "Las certificaciones con vigencia crean ciclos de negocio recurrentes y mantienen el contacto con el cliente certificado.",
        insight: { yes: "<strong>Modelo de relación continua:</strong> Configura notificaciones automáticas de vencimiento. Según los datos del sector, este mecanismo es el canal de marketing más económico para la renovación de producto. La plataforma debe soportar fechas de vencimiento por usuario.", no: "Certificación permanente. Simple de gestionar. Considera si en el futuro querrás convertirla en renovable cuando el programa escale.", plat: "totara" }
      },
      {
        text: "¿Necesitas que el certificado sea verificable públicamente (QR, open badge, directorio online)?",
        why: "Los certificados verificables tienen valor curricular y de mercado para el alumno, lo que aumenta la demanda del programa.",
        insight: { yes: "<strong>Open badges + directorio público:</strong> El alumno puede publicar su certificado en LinkedIn. Tú publicas el directorio de certificados en tu web. Eso genera marketing de referidos sin costo adicional.", no: "Constancia PDF con folio interno es suficiente para uso corporativo. Puedes agregar verificabilidad pública en una etapa posterior sin reconstruir el sistema.", plat: "netexam" }
      },
    ]
  },
  {
    num: "05",
    eyebrow: "Dimensión 5 de 5",
    title: "¿Cómo escala?",
    ref: "eLearning Industry\n2025",
    questions: [
      {
        text: "¿Tu programa de aprendizaje necesita crecer más allá de 200 usuarios en los próximos 12 meses?",
        why: "El costo por usuario y la arquitectura de la plataforma cambian significativamente a partir de ciertos volúmenes.",
        insight: { yes: "Evalúa desde el inicio el modelo de precios a escala. Plataformas que cobran por usuario activo pueden ser más económicas que las de asientos fijos si el uso es estacional.", no: "Una plataforma ligera como Reach 360 es suficiente para arrancar. Puedes migrar cuando el volumen lo justifique.", plat: "totara" }
      },
      {
        text: "¿Tienes o tendrás catálogos de cursos para audiencias externas (clientes, distribuidores, socios)?",
        why: "El e-learning para audiencias externas requiere gestión de acceso, control de contenido y en muchos casos integración con e-commerce.",
        insight: { yes: "Necesitas un portal separado del LMS interno, o un LMS con funciones multiportal. PIFINI/NetExam está diseñado para distribución externa de certificaciones.", no: "Un LMS interno es suficiente. La gestión de acceso es más simple cuando la audiencia es captiva.", plat: "netexam" }
      },
      {
        text: "¿Quieres vender acceso a tus cursos directamente (cobrar por curso o por suscripción)?",
        why: "La comercialización de cursos requiere integración con pasarelas de pago, gestión de licencias y control de acceso por transacción.",
        insight: { yes: "Define desde ahora el modelo: pago único, suscripción mensual o bundle con producto. Cada modelo implica una configuración diferente. TAEC puede orientarte en cuál es más viable para tu mercado.", no: "El acceso gratuito o incluido con el producto es el modelo más simple de gestionar y el más efectivo para arrancar.", plat: null }
      },
      {
        text: "¿Tu área de TI o un equipo técnico interno va a administrar la plataforma?",
        why: "El nivel de autonomía técnica define qué tipo de plataforma es sostenible a largo plazo.",
        insight: { yes: "Moodle o Totara en servidor propio son opciones viables. Mayor control, mayor responsabilidad de mantenimiento.", no: "Cloud SaaS es la opción correcta. Reach 360, Totara Cloud o PIFINI no requieren administración técnica interna.", plat: "moodle" }
      },
      {
        text: "¿Necesitas que la plataforma se integre con otros sistemas de tu empresa (HRIS, ERP, CRM)?",
        why: "Las integraciones determinan el stack técnico requerido y los costos de implementación.",
        insight: { yes: "<strong>Integración = xAPI + API abierta.</strong> Define exactamente qué datos necesitas intercambiar y con qué sistema. Moodle y Totara tienen las APIs más flexibles del stack TAEC.", no: "Una plataforma autónoma es suficiente. Sin integración, el tiempo de implementación es significativamente menor.", plat: "moodle" }
      },
    ]
  }
];
