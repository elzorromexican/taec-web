-- ==========================================
-- TAEC KB Reach 360 — INSERT COMPLETO
-- Versión: v1.0
-- Fecha: 2026-04-05
-- Owner: Dirección Comercial TAEC
-- ==========================================


-- Aseguramos idempotencia: primero purgar datos existentes
DELETE FROM kb_items WHERE producto = 'reach360';

INSERT INTO kb_items (
  producto, seccion, seccion_label, seccion_color, orden,
  pregunta, plus, menos, fuente, activo, audiencia
) VALUES
(
  'reach360', 'comercial', 'Matriz Comercial', '#185FA5', 10,
  '¿Qué tipo de producto es Reach 360 dentro de Articulate 360?',
  'Reach 360 es un LMS ligero integrado en Articulate 360 Teams, diseñado para distribuir y hacer seguimiento de cursos de Storyline 360, Rise 360 y otros contenidos sin necesidad de un LMS tradicional. Facilita la entrega de capacitación sin implementación compleja ni configuración de servidor.',
  'No reemplaza un LMS completo para escenarios con reglas complejas de certificación, SSO enterprise o integración profunda con RRHH.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'comercial', 'Matriz Comercial', '#185FA5', 20,
  '¿Se puede usar Reach 360 sin tener un LMS tradicional?',
  'Sí, Articulate indica expresamente que Reach 360 funciona como un LMS ligero y permite distribuir y hacer seguimiento de cursos sin necesidad de un LMS externo. Permite distribuir capacitación a equipos, clientes y socios sin depender de un LMS corporativo.',
  'Algunos partners y casos de uso recomiendan combinarlo con un LMS tradicional para cumplimiento y certificaciones complejas.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'comercial', 'Matriz Comercial', '#185FA5', 30,
  '¿Cómo se activa Reach 360 dentro de una cuenta Articulate 360 Teams?',
  'El administrador Articulate 360 Teams puede activar Reach 360 desde la pestaña “Manage Subscription” en el panel de control; después se accede directamente desde el dashboard. La activación es rápida y se hace desde la misma interfaz de Articulate 360, sin instalación adicional.',
  'Solo se puede asociar una instancia de Reach 360 por cuenta Articulate 360 Teams.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'comercial', 'Matriz Comercial', '#185FA5', 40,
  '¿Cuál es el modelo de licenciamiento y facturación de Reach 360?',
  'Articulate describe Reach 360 como un add‑on de Articulate 360 Teams, con precios basados en el número de “active learners” (no en usuarios nominales totales). Factura por activos reales, lo que abarata el uso cuando se distribuye a flotas grandes de usuarios no siempre activos.',
  'No se indica explícitamente en las fuentes un modelo de “licencias perpetuas”; todo el modelo gira en torno a suscripción por activos.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'comercial', 'Matriz Comercial', '#185FA5', 50,
  '¿Permite distribuir contenido a usuarios externos (no empleados)?',
  'Reach 360 está pensado para distribuir formación a empleados, contratistas, partners, clientes y otros usuarios externos que no acceden al LMS corporativo. Posibilita campañas de capacitación a clientes y socios sin necesidad de integración fuerte con SSO corporativo.',
  'Algunos casos y testimonios mencionan que la personalización de procesos de registro para usuarios externos aún es limitada frente a LMS graduales.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'comercial', 'Matriz Comercial', '#185FA5', 60,
  '¿Se puede personalizar marca y dominio en Reach 360?',
  'Reach soporta dominio personalizado para ocultar totalmente la URL reach360.com, además de personalización de colores, logos y mensajes en la experiencia del aprendiz. La personalización de dominio y marca ayuda a integrar la experiencia de capacitación en la identidad de la empresa.',
  'La personalización de marca se centra en colores, logos y dominio; no se mencionan plantillas avanzadas de UI o CSS/HTML personalizables.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'comercial', 'Matriz Comercial', '#185FA5', 70,
  '¿Cuál es el límite principal de usuarios o grupos en la documentación?',
  'No se indica un límite explícito de usuarios o grupos en la documentación oficial; Articulate describe el producto como “escalable” para grandes organizaciones y redes de partners. No se mencionan “cierres” por volumen de usuarios, lo que permite usarlo para grandes flotas sin barreras teóricas.',
  'No se publica un número máximo de usuarios, grupos, cursos o aprendices simultáneos, lo que genera incertidumbre en contratos grandes.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'comercial', 'Matriz Comercial', '#185FA5', 80,
  '¿Admite idiomas múltiples en el mismo curso (multi‑language delivery)?',
  'Articulate indica que Reach soporta “multi‑language course delivery” y permite gestionar varias versiones de curso como un solo ítem para la distribución. Reduce la complejidad de mantener múltiples cursos duplicados por idioma.',
  'No se detalla en la documentación pública si el cambio de idioma se puede hacer dinámicamente dentro del mismo curso o requiere versiones separadas.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'comercial', 'Matriz Comercial', '#185FA5', 90,
  '¿Qué tipo de informes de finalización y progreso ofrece a nivel comercial?',
  'Reach permite reportes de curso (completado, en progreso, no iniciado), por usuario y por grupo, con exportación a CSV y, en algunos casos, a PDF para learning paths. Los reportes están orientados a uso inmediato, con filtros por grupo, usuario y fecha, y exportación para alimentación de BI/RRHH.',
  'Los reportes no se describen como “certificación”, sino más bien como seguimiento de actividad y finalización, por lo que no reemplazan reportes de LMS complejos.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'comercial', 'Matriz Comercial', '#185FA5', 100,
  '¿Es Reach 360 compatible con LMS tradicionales o solo sustitutos?',
  'Algunos usuarios de la comunidad y casos de uso lo presentan como “complemento” a un LMS existente, especialmente para trabajadores de campo, proveedores y clientes externos. Permite integrar la formación de Articulate 360 con un LMS corporativo para mantener centralización de reportes, mientras Reach se usa para audiencias externas.',
  'No se describe en la documentación oficial una integración unificada de reportes con LMS externos; la integración se maneja por descarga de CSV/SCORM/xAPI.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'tecnica', 'Matriz Técnica', '#0F6E56', 110,
  '¿Con qué apps de Articulate 360 se integra natively para publicación?',
  'Reach se integra con Storyline 360, Rise 360 y permite publicar también contenido de terceros, todo desde el mismo entorno de Articulate 360. Publicar desde Storyline 360 y Rise 360 es “one‑click” y sin exportar/archivos adicionales.',
  'No se menciona integración directa con otros productores de e‑learning (por ejemplo, Adobe Captivate) sin exportar SCORM/xAPI.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'tecnica', 'Matriz Técnica', '#0F6E56', 120,
  '¿Qué estándares de seguimiento de aprendizaje soporta Reach 360?',
  'Articulate no detalla en las fuentes revisadas si Reach 360 actúa como LMS SCORM/xAPI o solo como “host” de contenido SCORM/xAPI; la documentación se centra en reportes internos, no en normas técnicas. Admite contenidos SCORM/xAPI de terceros y genera reportes de finalización basados en esos contenidos.',
  'No se aclara explícitamente el nivel de cumplimiento con SCORM/xAPI, ni si se puede usar Reach como LMS SCORM/xAPI “full” para todo tipo de player.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'tecnica', 'Matriz Técnica', '#0F6E56', 130,
  '¿Qué información de progreso se muestra a nivel de curso y de usuario?',
  'El reporte de curso muestra completado/en progreso/no iniciado, horas invertidas, número de lecciones y, si hay quiz, nota media y acceso a reportes de pregunta por pregunta. Los reportes de usuario permiten ver última actividad, progreso por lección, calificaciones de quiz y certificados de finalización.',
  'No se registra progreso en Storyline 360 o cursos de terceros del mismo modo que en Rise; se indican “completed” pero no porcentajes de lección detallados.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'tecnica', 'Matriz Técnica', '#0F6E56', 140,
  '¿Qué dispositivo y navegador soporta Reach 360 según la documentación?',
  'Articulate describe la experiencia de Reach 360 como “responsive” y accesible desde cualquier dispositivo, sin mencionar requerimientos específicos de navegador. Los usuarios reportan que la interfaz funciona en móviles modernos sin necesidad de app nativa.',
  'No se publica en la documentación revisada una lista oficial de navegadores soportados ni versiones mínimas requeridas.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'tecnica', 'Matriz Técnica', '#0F6E56', 150,
  '¿Cómo se maneja la actualización de un curso sin reiniciar el progreso de los usuarios?',
  'Al publicar una actualización de Storyline 360 o Rise 360 en Reach 360, los usuarios que ya estaban en el curso conservan su progreso completado; si lo rehacen, verán la versión nueva. No se resetean las marcas de “completed” cuando se publica una nueva versión, lo que protege certificaciones y reportes de 100%.',
  'No se puede forzar que ciertos usuarios “empiecen de nuevo” sin eliminarlos y re‑inscribirlos; no hay opción explícita de “resetear progreso” por curso.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'tecnica', 'Matriz Técnica', '#0F6E56', 160,
  '¿Qué tipo de campos de perfil de aprendiz se pueden personalizar en Reach 360?',
  'Articulate anuncia “custom learner profile fields” que se pueden ver por usuario y se incluyen en los CSV de reporte de cursos. Los campos de perfil permiten segmentar reportes por atributos adicionales (por ejemplo, filial, rol, sucursal) sin importar grupos separados.',
  'La personalización de campos de perfil parece limitada a tipos básicos; no se menciona soporte avanzado para dependencias dinámicas o reglas de negocio.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'tecnica', 'Matriz Técnica', '#0F6E56', 170,
  '¿Qué tipo de autenticación y acceso ofrece Reach 360?',
  'La documentación oficial solo menciona “self‑registration” y gestión de usuarios por correo, sin describir en profundidad SSO; algunos usuarios discuten la posibilidad de combinar SSO con usuarios externos, pero sin confirmación explícita del soporte. Soporta registro manual de usuarios y autenticación por correo, útil para usuarios externos que no están en directorios corporativos.',
  'Algunos usuarios de la comunidad preguntan explícitamente si se puede usar SSO junto con auto‑registro y no se responde de forma definitiva en la documentación.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'tecnica', 'Matriz Técnica', '#0F6E56', 180,
  '¿Dónde se hospeda y bajo qué modelo de servicio opera Reach 360?',
  'Microsoft indica que Reach 360 se ejecuta sobre AWS en un modelo IaaS, con data hosting gestionado por Articulate. La infraestructura en la nube reduce la carga de infraestructura local para el cliente.',
  'La información de seguridad y cumplimiento es limitada a la documentación de Microsoft y Articulate, sin una guía de GCP/Azure propia específica.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'tecnica', 'Matriz Técnica', '#0F6E56', 190,
  '¿Permite Reach 360 gestionar rutas de aprendizaje (learning paths) y reportes de ruta?',
  'Articulate describe que Reach 360 permite crear learning paths con múltiples cursos, mostrar progreso global y reportes de ruta exportables. Los reportes de ruta muestran completado/en progreso/no iniciado por usuario y por curso, y se pueden exportar para su análisis externo.',
  'Los learning paths no se describen como “rutas graduales con certificación” sino como agrupaciones de entrenamientos, con reportes menos complejos que los de LMS tradicionales.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'tecnica', 'Matriz Técnica', '#0F6E56', 200,
  '¿Qué tipo de reportes de preguntas por pregunta se pueden ver en Reach 360?',
  'Reach 360 permite ver reportes de preguntas por cada quiz, incluyendo porcentaje de aciertos, distribución de respuestas y detalle por usuario. Es útil para revisar qué preguntas fallan más y ajustar el diseño de evaluaciones.',
  'Los reportes de preguntas están limitados a quizzes que se marcan como “tracked for completion”; no se aplican a todos los contenidos.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'troubleshooting', 'Troubleshooting', '#D85A30', 210,
  'Algunos usuarios reportan que el temporizador de quiz en Rise 360 permite completar el cuestionario incluso después de que se agota el tiempo.',
  'La comunidad indica que el comportamiento ocurre tanto en LMS genéricos como en Reach 360; no hay solución oficial documentada en la documentación de Articulate, solo posibles workarounds de autoría en el propio Rise 360. Aunque no hay soporte oficial, los usuarios comparten ajustes de configuración de quiz que reducen el impacto.',
  'No se indica un fix oficial por parte de Articulate; el problema parece persistir sin solución estandarizada.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'troubleshooting', 'Troubleshooting', '#D85A30', 220,
  '¿Cómo se agrega un rol de usuario (Learner, Reporter, Manager) desde CSV al cargar usuarios en Reach 360?',
  'En la comunidad se pregunta explícitamente si es posible indicar el rol de usuario en el CSV y si existe un encabezado específico; no hay respuesta oficial publicada en la documentación de soporte revisada. El uso de CSV para agregar usuarios es admitido y descrito como forma estándar de carga en masa.',
  'No se documenta en la documentación pública el encabezado correcto para roles ni se confirma que el CSV pueda asignar roles; persiste la duda técnica.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'troubleshooting', 'Troubleshooting', '#D85A30', 230,
  '¿Es posible combinar SSO para administradores internos y auto‑registro para usuarios externos (correo personal) sin romper el acceso?',
  'Usuarios de la comunidad plantean el escenario de usar SSO para administradores “@empresa” y permitir que usuarios externos se registren con correo personal; no hay guía oficial que confirme esta configuración como soportada ni una solución estandarizada. Permite que administradores accedan sin contraseña extra y usuarios externos entren con registro simple.',
  'No hay documentación oficial que indique si esta combinación funciona o cómo configurarla exactamente; se deja en manos de pruebas del cliente.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'troubleshooting', 'Troubleshooting', '#D85A30', 240,
  'Algunos usuarios no pueden guardar las listas de opciones en “Custom learner profile fields” con tipo dropdown.',
  'Un usuario en la comunidad indica que no puede guardar una lista de opciones en un campo de perfil tipo dropdown y tampoco automatizar el cambio de grupo según la selección. La propia documentación de Reach 360 reconoce campos de perfil personalizados y su presencia en reportes CSV.',
  'No hay solución oficial publicada en el hilo; la funcionalidad parece limitada o no documentada, y se reporta como bloqueo de uso.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'troubleshooting', 'Troubleshooting', '#D85A30', 250,
  '¿Cómo se realiza el auto‑registro de aprendiz en Reach 360 si no hay tutoriales paso a paso?',
  'Un usuario comenta que intenta crear un recurso de ayuda para auto‑registro de aprendices, pero no encuentra un tutorial oficial detallado sobre el flujo de autoregistro. Reach 360 promueve el auto‑registro de usuarios externos como parte de su valor de distribución rápida.',
  'No se publica un flujo visual paso a paso para el auto‑registro; los usuarios deben deducirlo del propio UI o de soporte puntual.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'troubleshooting', 'Troubleshooting', '#D85A30', 260,
  '¿Qué es Reach 360 y cuál es su propósito principal?',
  'Reach 360 es una herramienta de distribución de contenido "ligera" (lightweight distribution tool) diseñada para desplegar cursos de e-learning. Está pensada para complementar un LMS tradicional existente, llegando a grupos de alumnos que suelen quedar fuera, como trabajadores sin escritorio (deskless), contratistas, socios y franquiciados. Requiere poco tiempo de implementación (días en lugar de meses) . Solución rápida y sin la complejidad de un LMS tradicional; ideal para alcanzar audiencias externas o de difícil acceso .',
  'No es un LMS completo; está diseñado específicamente para complementar sistemas existentes, no para reemplazar funcionalidades avanzadas de un LMS corporativo .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'troubleshooting', 'Troubleshooting', '#D85A30', 270,
  '¿Cómo se obtiene acceso a Reach 360 y cuál es su modelo de licenciamiento?',
  'Reach 360 está incluido exclusivamente en el plan **Articulate 360 Teams**. Los usuarios con una suscripción individual a Articulate 360 no tienen acceso. Se puede solicitar una prueba gratuita desde el dashboard de Articulate 360 . El precio de Articulate 360 Teams es de **$1,499 USD por usuario/creador al año** (frente a los $1,199 de la versión individual) . La facturación es unificada para el equipo y se pueden añadir licencias de creador según se necesite .',
  'sobre el costo específico de Reach 360 por separado o el costo por "alumno activo" (active learner) mencionado en la documentación .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'troubleshooting', 'Troubleshooting', '#D85A30', 280,
  '¿Qué casos de uso y tipos de audiencia están documentados para Reach 360?',
  'Está documentado para distribuir formación a "alumnos internos y externos, incluidos los alumnos de difícil acceso, como contratistas, socios, franquiciados y trabajadores sin escritorio" . Empresas como Westpac, Roche, General Dynamics y el Ministerio de Justicia del Reino Unido utilizan la plataforma Articulate 360 (que incluye Reach 360) . Permite llegar a audiencias que no tienen acceso directo a la intranet o LMS corporativo .',
  'Si se necesita gestión avanzada de competencias, evaluaciones complejas o informes de cumplimiento normativo detallado, el usuario debe seguir usando su LMS principal .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'troubleshooting', 'Troubleshooting', '#D85A30', 290,
  '¿Qué opciones de personalización de marca están disponibles?',
  'Se puede personalizar el **subdominio** (ej. nombre.reach360.com). También se puede utilizar un **dominio personalizado** propio mediante la creación de un registro CNAME en el DNS del cliente (ej. aprender.miempresa.com) . Es posible subir un logotipo y seleccionar un color de marca que se refleja en la página de auto-registro . El masking de dominio completo permite una experiencia de marca unificada, ocultando completamente la infraestructura de Reach 360 .',
  'La personalización se limita a aspectos visuales básicos (logo, colores, dominio). No se menciona la posibilidad de modificar profundamente la estructura de la interfaz del alumno (learner UX) .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'troubleshooting', 'Troubleshooting', '#D85A30', 300,
  '¿Cómo se gestiona la inscripción de usuarios externos sin IT?',
  'Reach 360 permite la **autoinscripción (Self-Registration)**. Los administradores pueden generar un enlace o código QR. Al acceder, el usuario crea su propia cuenta. Se puede configurar para que, al registrarse, el usuario sea añadido automáticamente a un Grupo específico y así recibir el contenido asignado a ese grupo . Elimina la fricción de dar de alta manualmente a cientos de externos. La autoinscripción dirigida a grupos agiliza enormemente la asignación de cursos .',
  'Si se usa SSO (Single Sign-On), la autoinscripción no está disponible para grupos gestionados por el proveedor de identidad (IdP) .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'tecnica', 'Matriz Técnica', '#0F6E56', 310,
  '¿Cómo se publica contenido desde Storyline 360 a Reach 360?',
  'Se requiere la actualización de **abril de 2023 o posterior** de Storyline 360. En la ventana de Publicar, se selecciona la pestaña "Reach 360". Es necesario que el administrador del equipo de Articulate 360 haya activado Reach 360; de lo contrario, la opción aparece gris . Integración nativa y directa desde la herramienta de autoría más popular del mercado .',
  'El creador de contenido (autor) depende de que el administrador del Teams active la funcionalidad en la cuenta .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'tecnica', 'Matriz Técnica', '#0F6E56', 320,
  '¿Qué estándares de tracking (SCORM/xAPI) soporta?',
  'Si bien la documentación habla de "Reporting and Tracking Options" en Storyline 360 al publicar, los fragmentos disponibles no especifican si soporta SCORM 1.2/2004, xAPI o si es propietario .',
  '',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'tecnica', 'Matriz Técnica', '#0F6E56', 330,
  '¿Cuáles son los requisitos de red y puertos?',
  'Se requiere el **puerto 443**. Si el firewall de la organización bloquea el acceso, el personal de TI debe añadir `articulate.com` a la lista de permitidos (allowlist) . Requisitos de red estándar para cualquier aplicación web moderna (HTTPS) .',
  'Dependencia de que el departamento de TI configure excepciones si las políticas de seguridad son muy restrictivas .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'tecnica', 'Matriz Técnica', '#0F6E56', 340,
  '¿Existe integración con sistemas externos (SSO, API)?',
  '**Sí**: Soporta **SSO** (Single Sign-On) y **SCIM** para gestionar usuarios y grupos. Permite gestionar **API Keys** para integraciones personalizadas. También tiene una integración nativa con **Zapier** para conectar con miles de aplicaciones sin código . La presencia de API, SCIM y Zapier indica un alto nivel de preparación para integraciones empresariales y automatización de flujos de trabajo .',
  'La configuración de SSO puede presentar problemas comunes (errores de coincidencia de email, configuración de atributos) que requieren soporte de TI .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'troubleshooting', 'Troubleshooting', '#D85A30', 350,
  'Error "AxiosError" al iniciar sesión en Articulate 360',
  '**Síntoma**: Se recibe un mensaje `{"name":"AxiosError"}` al intentar loguearse. **Solución reportada por la comunidad**: No hay una solución oficial en los hilos analizados, pero es un error reportado como problema general de acceso .',
  '**Persiste sin solución oficial en los registros analizados**. Se reporta en foros de discusión general (26 de septiembre, 2024) .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'troubleshooting', 'Troubleshooting', '#D85A30', 360,
  'Los enlaces de auto-registro dejan de funcionar',
  '**Problema**: Si se deshabilita y rehabilita la función de auto-registro en la cuenta, los enlaces de registro "no-grupo" anteriores ya no son válidos. **Workaround**: Se deben generar nuevos enlaces de auto-registro . **Solución para grupos**: Si es un enlace de grupo, el usuario debe limpiar la caché del navegador . La documentación oficial es clara y detallada sobre el ciclo de vida de estos enlaces .',
  '**Fricción operativa**: Los administradores deben redistribuir nuevos enlaces si ocurre un cambio en la configuración .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'troubleshooting', 'Troubleshooting', '#D85A30', 370,
  'Fallo al publicar a Reach 360 (Opción gris)',
  '**Problema**: La opción "Reach 360" en Storyline 360 aparece deshabilitada. **Solución Oficial**: 1. Actualizar Storyline 360 a la versión de Abril 2023 o posterior. 2. Verificar que el administrador del **Teams** (no el de la cuenta individual) haya activado Reach 360. Los admins de Teams no son admins de Reach 360 por defecto . Articulate Staff documenta claramente la diferencia de permisos entre Admin de Teams y Admin de Reach 360 .',
  '**Problema de permisos oculto**: Muchos usuarios pueden asumir que por ser admin de la suscripción tienen acceso, pero se requiere configuración adicional .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'troubleshooting', 'Troubleshooting', '#D85A30', 380,
  'Problemas de acceso por bloqueo de Firewall',
  '**Problema**: No se puede acceder a las aplicaciones de Articulate 360 (incluyendo Reach 360). **Solución Oficial**: Verificar que el **puerto 443** esté abierto. Solicitar a TI que añada `articulate.com` a la lista de dominios permitidos . El soporte proporciona instrucciones precisas para el departamento de TI .',
  '**Dependencia externa**: El usuario final no puede solucionarlo sin la intervención del equipo de redes/seguridad de su empresa .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'reach360', 'troubleshooting', 'Troubleshooting', '#D85A30', 390,
  'Las invitaciones a la plataforma expiran',
  '**Problema**: Los usuarios invitados no pueden crear su cuenta porque el enlace ha caducado. **Solución Oficial**: Las invitaciones para Articulate 360 Teams expiran después de **90 días**. Se debe enviar una nueva invitación al usuario .',
  '**Límite temporal no configurable** aparentemente (al menos no se menciona opción de cambiar el plazo de 90 días) .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
);

-- Nuevas Q&As — Auditoría de contenido 2026-04-05
INSERT INTO kb_items
  (producto, seccion, seccion_label, seccion_color, orden,
   pregunta, plus, menos, fuente, activo, audiencia)
VALUES
(
  'reach360', 'comercial', 'Comercial', '#185FA5', 400,
  '¿Qué requisitos mínimos necesita la organización para activar y operar Reach 360?',
  'Para activar Reach 360 la organización necesita: (1) suscripción activa a Articulate 360 Teams (Reach 360 está incluido en el plan Teams; no está disponible en el plan Personal); (2) al menos un administrador con acceso al panel de Reach 360 en articulate.com; (3) los learners solo necesitan un navegador moderno y conexión a internet — no instalan nada. La distribución de cursos se hace por enlace o por invitación de correo desde el panel.',
  'Reach 360 está disponible únicamente en Articulate 360 Teams. Clientes con licencia Personal no tienen acceso. Además, Reach 360 no reemplaza a un LMS completo: no tiene catálogo avanzado, rutas de aprendizaje complejas ni integración HRIS nativa.',
  'Articulate · Reach 360 · articulate.com/reach-360', true, '{interno,titbits}'
),
(
  'reach360', 'comercial', 'Comercial', '#185FA5', 410,
  '¿Cómo se adquiere Reach 360 en México y qué implica el licenciamiento?',
  'TAEC es el distribuidor exclusivo de Articulate 360 en México y LATAM. Reach 360 se adquiere como parte de la suscripción Articulate 360 Teams — no tiene precio independiente. La cotización se gestiona con TAEC en pesos mexicanos con facturación local. El licenciamiento de Reach 360 es por autor (quien crea y administra cursos); los learners que consumen el contenido no requieren licencia adicional dentro del límite del plan.',
  'Reach 360 no es un LMS independiente. Organizaciones con necesidades avanzadas de gestión (reportes detallados por cohorte, integraciones HRIS, rutas de aprendizaje complejas) deben complementarlo con un LMS como Moodle o Totara, también disponibles a través de TAEC.',
  'TAEC · taec.com.mx', true, '{interno,titbits}'
);
