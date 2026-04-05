-- ==========================================
-- TAEC KB Vyond Mobile — INSERT COMPLETO
-- Versión: v1.0
-- Fecha: 2026-04-05
-- Owner: Dirección Comercial TAEC
-- ==========================================


-- Aseguramos idempotencia: primero purgar datos existentes
DELETE FROM kb_items WHERE producto = 'vyondmobile';

INSERT INTO kb_items (
  producto, seccion, seccion_label, seccion_color, orden,
  pregunta, plus, menos, fuente, activo, audiencia
) VALUES

-- ==========================================
-- SECCIÓN: COMERCIAL
-- ==========================================
(
  'vyondmobile', 'comercial', 'Matriz Comercial', '#185FA5', 10,
  '¿Qué es Vyond Mobile?',
  'App complementaria de Vyond para sincronizar videos entre computadora y móvil, la cual requiere iniciar sesión con una cuenta Vyond existente. Además, permite crear videos con Vyond Go usando inteligencia artificial directamente desde el teléfono.',
  'Requiere cuenta Vyond para uso completo.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondmobile', 'comercial', 'Matriz Comercial', '#185FA5', 20,
  '¿Qué funciones ofrece en el móvil?',
  'Ofrece Vyond Go para generar videos instantáneos con inteligencia artificial, editar guiones de texto, modificar personajes y voces, realizar Captura inteligente para fondos y accesorios, además de descargar y compartir el material. Todos los cambios se sincronizan de forma perfecta e inmediata entre los diversos dispositivos conectados.',
  'No se detalla paridad completa de herramientas de edición con el escritorio original.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondmobile', 'comercial', 'Matriz Comercial', '#185FA5', 30,
  '¿Requiere una cuenta Vyond activa?',
  'Sí, es estrictamente necesario iniciar sesión con una cuenta Vyond corporativa o comercial existente, aunque se puede acceder a una gestión de prueba gratuita por medio de la plataforma web. Utilizar el perfil homologado permite la sincronización continua en la matriz laboral.',
  'Es imposible el uso autónomo de la aplicación sin cuenta, e ingresos iniciales reportan fallos ocasionalmente.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondmobile', 'comercial', 'Matriz Comercial', '#185FA5', 40,
  '¿Existen diferencias funcionales marcadas con el entorno web de escritorio?',
  'Está enfocado principalmente en facilitar la captura e iteración rápida sobre la marcha con perfecta sincronización a la versión primaria de escritorio conectada. Se diferencia asombrosamente por permitir el uso del lente del dispositivo para capturar elementos tridimensionales del entorno físico de manera inmediata al flujo de trabajo.',
  'Las modificaciones están muy limitadas a la alteración superficial contra las capacidades maduras del editor web completo.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondmobile', 'comercial', 'Matriz Comercial', '#185FA5', 50,
  '¿Cómo se posiciona Vyond Mobile frente a las contrataciones Profesional y Enterprise?',
  'Vyond Mobile no opera ni se tarifica como producto fragmentado, sino como una extensión de movilidad gratuita asegurada para perfiles con abonos de pago Profesional o Enterprise. Otorga portabilidad inmediata al módulo Vyond Go para elaborar borradores narrativos sin sentarse a un monitor corporativo, acoplando los avances directamente a los proyectos centrales en preproducción de las sedes.',
  'Las funcionalidades avanzadas de arreglo audiovisual y el cronometraje temporal recaen como tarea exclusiva del ambiente tradicional por navegador.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondmobile', 'comercial', 'Matriz Comercial', '#185FA5', 60,
  '¿Cuáles casos documentados existen del aprovechamiento de campo corporativo?',
  'Se constata su contundente utilidad in situ durante programas de concientización de sanidad industrial, levantamiento presencial de minutas ejecutivas C-Suite e infraestructura de contingencia rápida del call center corporativo. Su módulo estrella radica en la tecnología Smart Capture que fotografía el universo exterior homologando personas para anexarlos artísticamente en minutos a los e-learning corporativos.',
  'No hay recuentos contundentes con métricas absolutas que evalúen resultados de esta función en estricta soledad prescindiendo de los editores web.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondmobile', 'comercial', 'Matriz Comercial', '#185FA5', 70,
  '¿Qué argumentos comerciales mitigan las críticas de no aportar verdadera innovación y limitarse a movilidad secundaria?',
  'Se proclama indiscutiblemente como la génesis en la industria permitiendo concebir estructuras completas de animación digital impulsadas por procesos de texto a través del teléfono personal, logrando que supervisores ausentes despachen comunicaciones oficiales asincrónicas instantáneamente al equipo digital abatiendo cuellos de botella geográficos de oficina presencial.',
  'Las políticas comerciales restringen las descargas mediante los límites de mensualidad originales consumidos desde múltiples fuentes conjuntas de la red.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondmobile', 'comercial', 'Matriz Comercial', '#185FA5', 80,
  '¿Aplican restricciones desiguales a cuentas Enterprise versus Profesional utilizando la variante portátil?',
  'Todo promotor operativo de dichas membresías goza del permiso para desplegar los instaladores desde las tiendas móviles asociándolos hacia perfiles en vigor corporativo sin coste paralelo subyacente. Únicamente surten efecto las demarcaciones dictadas legalmente por el tipo de nivel contratado por la organización respecto a plazos máximos de procesamiento y políticas seguras restrictivas vigentes que viajan inherentes al control jerárquico directivo.',
  'A diferencia de interfaces completas de ordenadores centrales, buscar asistencia interna o navegar chat en directo es incómodo y tosco en dimensiones reducidas celulares.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondmobile', 'comercial', 'Matriz Comercial', '#185FA5', 90,
  '¿Este apéndice Vyond Mobile incluye tarifas escaladas de inteligencia y crédito alterno en sus planes iniciales o altos?',
  'Representa explícitamente un brazo auxiliar gratuito embebido estructuralmente al abono general permitiendo que la suma operativa actúe en red enlazada y sin desangrar gastos adicionales fijos a la empresa contratante. Al unificar los módulos, la inteligencia artificial propulsa crecimientos asombrosos para quienes están sobre el asfalto operando fuera de computadoras presenciales sumando un plus al departamento sin necesidad presupuestos especiales.',
  'El despliegue de avatares a destajo repercute directamente al saldo volumétrico de inteligencia artificial contratado, agotando cuotas globales prontamente al crear contenido no planificado.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondmobile', 'comercial', 'Matriz Comercial', '#185FA5', 100,
  '¿Vyond Mobile opera como producto comercial aislado en facturación B2B o únicamente enlace web transformado?',
  'Se erige indiscutiblemente mediante descargas nativas separadas provistas en repositorios comerciales móviles como una verdadera plataforma encapsulada y concebida a la agilidad manual intermitente del recurso humano que no depende de páginas cargadas pesadas del explorador de dispositivo móvil, por ello ha sido perfilado deliberadamente a la asistencia remota veloz por ser app separada e integrada y no acceso web forzado por enlace responsivo de código general.',
  'Su orientación excluye cualquier tipo de montaje audiovisual largo o detallista por instrucción oficial de servicio desestimando expectativas irreales en el comprador.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),

-- ==========================================
-- SECCIÓN: TÉCNICA
-- ==========================================
(
  'vyondmobile', 'tecnica', 'Matriz Técnica', '#0F6E56', 110,
  '¿Con qué sistemas base es funcionalmente afín la estructura de software?',
  'Disyuntivamente compatible garantizándose optimizada al interior operativo iOS en versión dieciséis para Apple o bien mediante la base Android y sus onceavas generaciones adelante; además de soportarse paralelamente hacia computadoras de alta celeridad equipadas a chips modernos extendiendo una conectividad omnicanal en hardware cotidiano que afianza el trabajo persistente multi nivel logístico asegurado bajo sus parches perennes y automáticos corporativos.',
  'Adquisiciones corporativas muy rústicas o en hardware móvil caduco de flotilla comercial no asimilarán las arquitecturas actuales denegando las revisiones interactivas pedidas.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondmobile', 'tecnica', 'Matriz Técnica', '#0F6E56', 120,
  '¿Ostenta exactitud funcional compartida con los comandos directos de escritorio completo?',
  'Excluye intencionalmente dotarse a réplica asumiendo roles auxiliares muy rápidos para subsanar huecos productivos; sin embargo innova espectacularmente en puentear las transferencias masivas de archivos virgenes recopilados por fotografías corporativas integrándolos sin ataduras al depósito web para que expertos los manipulen tras pocos segundos, siendo uno de los ganchos de utilidad logística preferidos ineludibles por agencias modernas con reporteros a distancia incansables.',
  'Disminuye diametralmente toda aspiración creativa de edición por capas superpuestas, manipulación de vectores clave o movimientos progresivos elaborados de objetos complejos.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondmobile', 'tecnica', 'Matriz Técnica', '#0F6E56', 130,
  '¿Soporta operación de despliegue aislada sin redes disponibles de comunicación perenne inalámbrica instalada?',
  'Por arquitectura el programa vive interconectado a ecosistemas cerebrales macro donde despliega cálculos formidables ajenos al procesador del móvil para asegurar transiciones pulcras obligando inevitable y maravillosamente que las sincronizaciones y subidas protejan la data en una central evitando catastrofes o perdidas por destrucción en terreno asegurando a las directivas respaldos irrefutables guardados a segundos de editados.',
  'Frena totalmente su operatividad si los administradores de logística despachan agentes a zonas marginadas de la red celular al depender crónicamente en procesamientos online.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'vyondmobile', 'tecnica', 'Matriz Técnica', '#0F6E56', 140,
  '¿Cuál es el modelo de exportación soportado mediante interfase puramente móvil de distribución al usuario final o revisor?',
  'Soporta extraer y compilar la orden de render para obtener entregables de compresión de audio y video encapsulados desde la memoria virtual transfiriéndolos lícitamente a librerías locales telefónicas donde se posibilita encadenar con ecosistemas compartidos de aplicaciones corporativas autorizadas propulsando la socialización ejecutiva expedita por parte del directivo desde terminales portátiles.',
  'La rigurosa y correcta calidad superior, los vectores en movimiento transparente así como el peso comprimido de formatos de intercambio SCORM están relegados absolutamente a procedimientos hechos por un mando de teclado central.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondmobile', 'tecnica', 'Matriz Técnica', '#0F6E56', 150,
  '¿Qué estipulaciones o limitaciones se despliegan de tamaño e inserto de materiales desde la opción Quick Upload?',
  'Protegiendo latencias frustrantes al cargar datos brutos en líneas telefónicas en movimiento, se aplican retenes programáticos aproximados de tamaño cien megabytes totales para metrajes orgánicos e idénticamente una fracción de quince al momento de depositar capturas rasterizadas al vuelo empujando rutinas constantes ligeras previniendo drenajes caóticos de datos en agentes desplazados.',
  'Afecta agudamente el volcado masivo sobre directores gráficos independientes al verse imposibilitados forzando a recortes previos ineficientes reduciendo metrajes valiosos a píldoras breves.',
  'Análisis IA · QA', true, '{interno,titbits}'
),

-- ==========================================
-- SECCIÓN: TROUBLESHOOTING CRÍTICO
-- ==========================================
(
  'vyondmobile', 'troubleshooting', 'Troubleshooting', '#D85A30', 160,
  'Se bloquea el botón al iniciar cuenta o presenta pantalla negra imposibilitada sobre autenticación al aplicativo',
  'Intermitencias transitorias han exhibido choques de tokens y validaciones entre el dispositivo personal y el muro de logueo. Efectuar un enlace temporal empleando como puente el portal web abierto en la herramienta local base del navegador Safari reacciona inyectando los accesos faltantes para la posterior ejecución y reactivación inmediata de forma mágica permitiendo saltar escollos y entrar sin barreras técnicas duraderas a la línea principal productiva.',
  'Induce desesperante frustración a nóveles y no figura mitigada establemente por ingenieros del servicio requiriendo mañas o tácticas engorrosas manuales.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondmobile', 'troubleshooting', 'Troubleshooting', '#D85A30', 170,
  'El registro de grabados editado presencialmente rehúsa enlazarse en tiempo exacto y listarse al ingresar en una laptop nueva conectada',
  'Acongoja primariamente las memorias superpuestas cortadas entre el guardado de servicio por redes de telefonía que cortan sin finalizar indexación. Exigir terminación del hilo base relanzando de seco el gestor móvil destraba a la par los envíos truncos certificándose por arquitectura el depósito intacto a matriz centralizada donde nada llega a perderse ni corromperse pese a un aparente pánico visible transitorio y falso de pantalla vacía.',
  'Fustiga recurrentemente provocando angustias prolongadas y reportes agresivos hacia gerencias en condiciones con antenas telefónicas distantes saturadas ruralmente corporativas.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'vyondmobile', 'troubleshooting', 'Troubleshooting', '#D85A30', 180,
  'Apagados automáticos forzosos del aplicativo o salidas expulsadas repetidas (Crashes constantes previsualizando escenarios)',
  'Colapsos provenientes primordialmente por rebases físicos tangibles que atormentan RAM e índice virtual de saturaciones. Mantener hardware depurado sin sobrecarga y OS reciente mitiga holgadamente la interrupción fortuita porque los sistemas purgan cachés residuales internamente empujados a optimizaciones robustas incesantes dictadas por las oleadas correccionales de desarrollo asegurando sesiones continuas prolongadas resguardadas.',
  'Pésima o nula compatibilidad empujada sobre los modelos más austeros y básicos suministrados como gama introductoria corporativa masiva.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'vyondmobile', 'troubleshooting', 'Troubleshooting', '#D85A30', 190,
  'Falla integral o detección parcial pobre de objetos inanimados operando Smart Capture frontal corporativo.',
  'Radica mayormente de deficiencias lumínicas in situ que distorsionan contornos. Proyectar iluminarias o buscar enfoques limpios permite que la abstracción matemática capte excelso lográndose incrustar digitalmente prototipos físicos capturados en campo directamente hacia entornos corporacionados sin precisar bosquejos intermedios que tradicionalmente consumían jornadas plenas y lentísimas a expertos tercerizados resolviendo trabas físicas y contextuales insalvables.',
  'Atado inherentemente por los rigores empíricos a disponer iluminación equilibrada perdiendo confiabilidad radical en esquinas nocturnas productivas de fábricas o almacenes polvosos y ciegos.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'vyondmobile', 'troubleshooting', 'Troubleshooting', '#D85A30', 200,
  'Desaparición, inaccesibilidad y estancamiento interactivo del perfil completo mostrando candado o rechazo perpetuo y tajante indicando bloqueos',
  'Secuelas a raíz de repetición compulsiva de ingresos de verificación negativos superando rangos admisibles programados. Restringe contundentemente penetraciones agresivas logradas por ladrones oportunistas garantizando resguardo incorruptible protegiéndose patentes, manuales resguardados invaluables de operación confidencial y secretos mecánicos de clientes frente a extravío aleatorio de empleados dispersos y confusos.',
  'Un incordio crónico paralizante y definitivo si asola en jornada sabatina al capacitador que sin presencia digital superior disponible será erradicado improductivo todo su trayecto.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondmobile', 'troubleshooting', 'Troubleshooting', '#D85A30', 210,
  'Las interacciones gráficas visualizan omisión y falla al integrar bancos audiovisuales externos ligados formalmente al paquete',
  'Discordancia esporádica e inconsistencia cruzada ligando cuentas pesadas. Desenvueltamente corregible pero fundamentalmente el visualizador celular provee en suscripciones amplias el flujo liso y plano sin impedimento asimilando texturas provistas comercializadas externamente garantizandole a los instructivos una inmersión plástica variada exótica en manos corporativas de campo abierto y generalizado al instante.',
  'Rompimientos cosméticos y fallos tensionales momentáneos alterando apariencias de borradores impecables creados minuciosamente en torre de escritorio de oficina en previas horas a inspeccionarse.',
  'Análisis IA · QA', true, '{interno}'
),
(
  'vyondmobile', 'troubleshooting', 'Troubleshooting', '#D85A30', 220,
  'Arroja alarmas visuales incesantes denunciando desconexión perpetua pese a integrar recepción y ligas efectivas hacia Wifi habilitadas.',
  'Reacciones sintomáticas delatando filtros firewall empresariales recelosos activados sobre la IP restringiendo la fluidez natural. El corporativo se encuentra sólidamente resguardado al listar públicamente sus dominios autorizados lográndonse puentear filtros mediante los responsables de sistema agilizando ciberseguridad garantizada evitando aislamientos no planificados ni riesgos clandestinos oscuros al operar aplicaciones sobre móviles personales permitidos.',
  'Dilación de horas administrativas aborrecibles persiguiendo técnicos corporativos obligándolos por trámite regular levantar parches y liberar flujos a terminales privadas y prestadas en área laboral asignada.',
  'Análisis IA · QA', true, '{interno,titbits}'
),
(
  'vyondmobile', 'troubleshooting', 'Troubleshooting', '#D85A30', 230,
  'La edición o panel de construcción exhibe desajuste colosal y trabas dramáticas empleando tabletas y visores horizontales abriendo su plataforma desde web',
  'Decisión estructurada técnica desaconsejando de manera imperativa al abordaje responsivo directo. Fomentan inobjetable y directamente emigrar a las descargas directas promoviendo experiencias testeadas puramente de pantalla táctil reduciendo mermas dolorosas de tiempo en botones de precisión desfasados lográndose al migrarse la generación contundente interactiva fluida dictada a inteligencia asistida pulida para pulgares ágiles.',
  'Un impedimento desequilibrante a diseñadores que invirtieron capital oneroso de hardware como iPads Pro intentando evadir equipos fijos con esperanza de llevar un portafolio ligero sin lograr explotar el cien por cien sus dotes dibujados por lápiz.',
  'Análisis IA · QA', true, '{interno,titbits}'
)
;
