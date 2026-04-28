---
capitulo: 23
titulo: "FAQ DISCOVERY — PLATAFORMAS COMPLEMENTARIAS"
version: "1.0"
---

==================================================
CAPÍTULO 23: FAQ DISCOVERY — PLATAFORMAS COMPLEMENTARIAS
==================================================
[BLOQUE FUNCIONAL: DISCOVERY_FAQ_COMPLEMENTARIAS]
[PROPÓSITO: Responder preguntas de evaluación y discovery sobre Totara, Pifini/NEtexam, Proctorizer y Strike Plagiarism durante el proceso comercial. NO es soporte técnico post-venta.]

[REGLA DE USO OBLIGATORIA]
Este capítulo responde dudas de evaluación técnica y funcional durante el proceso comercial.
Si el cliente pregunta sobre configuración, implementación o soporte post-compra, responder brevemente
y escalar: "Para la implementación, nuestro equipo técnico te acompaña paso a paso — ¿te conecto con un especialista?"

[REGLA DE DATOS VENDOR]
Los datos cuantitativos de las secciones EXEC (% reducción de costos, velocidad de cierre, ROI)
provienen de materiales propios de cada vendor. No presentarlos como estadísticas de mercado
independientes. Usar framing: "según datos de [vendor]" o "organizaciones reportan [según vendor]".
Siempre derivar a cotización y demo para validar con el contexto del cliente.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECCIÓN A — TOTARA LEARN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[23.A.1] ¿Cuál es la diferencia entre un Programa y una Certificación en Totara?

Programa: sin fecha de caducidad, seguimiento de cumplimiento básico, caso de uso: formación general.
Certificación: fecha de caducidad configurable, dos rutas (inicial + recertificación que puede ser más corta), seguimiento completo (vigente / vencido / próximo a vencer), caso de uso: obligaciones regulatorias con vencimiento.
Configura aviso previo al vencimiento (p. ej., 30 días) para notificaciones automáticas a usuarios y managers.

[23.A.2] ¿Totara soporta caducidad y recertificación automática?

Sí. Se configura el período de validez, la ventana de recertificación (período antes del vencimiento en que el usuario puede recertificarse sin perder su fecha original) y la acción al vencer (revertir a no completado o dejar en caducado). La ruta de recertificación puede ser más corta que la inicial (ej. solo un módulo de actualización).
Caso de uso típico: sector regulado con obligaciones de cumplimiento periódico (farma, salud, finanzas).

[23.A.3] ¿Cuál es la diferencia entre inscribir y asignar usuarios en Totara?

Asignar: añade el programa/certificación al panel del usuario y genera la obligación de completarlo.
Inscribir: únicamente da acceso al contenido.
Para certificaciones regulatorias usar siempre Asignación (vía Audiencias dinámicas, Posición u Organización): solo la asignación activa el seguimiento de caducidad y recertificación. La inscripción sin asignación puede provocar que el usuario acceda al contenido pero el sistema no registre su estado de cumplimiento.

[23.A.4] ¿Totara tiene app móvil? ¿Qué contenido está disponible offline?

Sí. La app incluye SCORM offline: descarga paquetes y los completa sin conexión; los datos se sincronizan al reconectar.
Disponible en app: Cursos, SCORM offline, Foros, Cuestionarios, Certificados, Totara Engage (workspaces, playlists).
No disponible en app: Lección interactiva, Taller, Base de datos, H5P (versiones anteriores a Totara 17).
Versión mínima recomendada: Totara 13. Engage requiere Totara 15+.

[23.A.5] ¿Qué es Totara Engage y para qué sirve?

Módulo de aprendizaje colaborativo integrado. Incluye Workspaces (comunidades con biblioteca compartida, discusiones, playlists), contenido generado por usuarios (UGC) y moderación. Los Workspaces pueden ser públicos, privados u ocultos. Desde Totara 17, Engage está incluido en la plataforma base sin licencia separada.

[23.A.6] ¿Totara soporta SSO?

Sí, soporta SAML 2.0 con integración a Azure AD, Okta, ADFS y otros Identity Providers estándar. La app móvil también soporta SSO. Si el sitio usa SSO, el restablecimiento de contraseñas se gestiona en el Identity Provider, no en Totara.

[23.A.7] ¿Totara genera reportes de cumplimiento de certificaciones?

Sí, mediante Report Builder. Los reportes incluyen usuario, estado de certificación, fecha de completación y fecha de caducidad. Se pueden filtrar por Estado = Caducado o Próximo a vencer, asignarse a managers para ver solo su equipo, y programar envío automático por correo. Desde Totara 20 hay bloque de Cumplimiento de Certificaciones para dashboard en tiempo real.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECCIÓN A.EXEC — TOTARA LEARN · JUSTIFICACIÓN EJECUTIVA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[23.A.EXEC.1] ¿Cómo se justifica Totara frente a un LMS básico o cursos sueltos?

Las organizaciones que migran a Totara reportan reducción significativa de horas administrativas
en L&D. El ROI proviene de tres fuentes: (1) reducción de horas de gestión manual, (2) eliminación
de incumplimientos en auditorías y sus costos asociados, (3) aceleración del onboarding con rutas
automáticas por rol.

[23.A.EXEC.2] ¿Por qué Totara frente a un LMS incluido en la suite de RH (SAP, Cornerstone)?

Totara suele ofrecer costo total más accesible con mayor flexibilidad de personalización que suites
HCM cerradas. Combina LMS + desempeño + engagement en una sola plataforma, reduciendo herramientas
aisladas.

[23.A.EXEC.3] ¿Qué métricas concretas puede presentar un director de capacitación para mostrar ROI?

Métricas comunes: reducción de horas de administración, disminución de incumplimientos en auditorías,
tiempos más cortos para certificar nuevos ingresos, aumento en tasas de finalización de rutas
críticas. Casos de referencia (según Totara): Clínica Alemana Chile centralizó 8,000 colaboradores
con 100% cumplimiento JCI; Salud Digna México gestionó +1 millón de cursos con 93% satisfacción.

[23.A.EXEC.4] ¿Cómo gestiona Totara el cumplimiento normativo en sectores regulados?

Certificaciones con fecha de caducidad, alertas automáticas de recertificación, reportes de
auditoría en tiempo real. Para PLD en sector financiero: registra historial de intentos y tiempo
de dedicación, proporcionando evidencias inalterables ante reguladores en México, Chile o Colombia.

[23.A.EXEC.5] ¿Cómo facilita Totara la capacitación de audiencias externas?

Mediante multi-tenencia: portales independientes y brandeados para cada socio comercial, gestionados
desde una sola instancia central con catálogos y experiencias privadas para cada aliado.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECCIÓN B — PIFINI LEARN / NETEXAM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[23.B.1] ¿Cómo funciona la inscripción automática con IA prescriptiva en Pifini?

El motor de IA monitorea el desempeño de cada usuario (puntajes en exámenes, tasa de completación, actividad en CRM) y detecta brechas de competencia. Cuando un socio o vendedor cae por debajo del umbral configurado, el sistema lo inscribe automáticamente en el curso o ruta remedial sin intervención manual del administrador.
Diferenciador clave: elimina el seguimiento manual de brechas en redes de distribución grandes.

[23.B.2] ¿Qué señales usa la IA de Pifini para detectar brechas de desempeño?

Combina cuatro fuentes: (1) Puntajes de certificaciones y exámenes en la plataforma, (2) Tasa de win/loss de oportunidades desde el CRM integrado, (3) Scoring de llamadas de ventas vía IA de coaching, (4) Actividad de consumo de contenido. El peso de cada señal es configurable por el administrador.

[23.B.3] ¿Pifini se integra con CRM como Salesforce o HubSpot?

Sí. Conector nativo para Salesforce (disponible en Salesforce AppExchange). Para HubSpot u otros CRMs usa la API REST de NEtexam o middleware como Zapier/Make. La integración sincroniza datos de contacto, oportunidades y registros de training en tiempo real.

[23.B.4] ¿Cómo funcionan las rutas de aprendizaje adaptativas en Pifini?

Define nodos de contenido con condiciones de avance (puntaje mínimo, tiempo mínimo). Con Modo Adaptativo activo, la IA reordena o sustituye módulos según el perfil de cada aprendiz. Requiere módulo de IA habilitado en el plan de suscripción.

[23.B.5] ¿Pifini tiene app móvil y funciona offline?

Sí. Disponible en Google Play y App Store. Permite descargar módulos para consumo offline; el progreso se sincroniza automáticamente al reconectar. Compatible con HTML5, video, PDF y SCORM 1.2/2004 mobile.

[23.B.6] ¿Pifini ofrece app de marca propia (white-label)?

Sí. Hasta 5 apps de marca propia por cuenta. Requiere: logotipo PNG 512x512 px mínimo, paleta de colores hexadecimal, nombre y descripción para tiendas. NEtexam gestiona la publicación en Play Store y App Store. Tiempo estimado: 4 a 6 semanas hábiles por primera publicación.
Diferenciador clave para canales de distribución que quieren mantener su propia marca.

[23.B.7] ¿Pifini gestiona certificaciones con fecha de vencimiento?

Sí. Define nombre, cursos requeridos, puntaje mínimo y vigencia en días. Al obtener la certificación, el sistema calcula la fecha de expiración y envía notificaciones de renovación configurables (30, 15 y 7 días antes del vencimiento).

[23.B.8] ¿Pifini genera reportes de cumplimiento para auditorías reguladas?

Sí. Filtrables por periodo, grupo, curso o certificación. Incluyen: usuario, estado (completado / en progreso / vencido), puntaje, fecha de completación y firma de auditoría. Para organizaciones reguladas (farma, salud), el audit trail se almacena con sello de tiempo inmutable. Exportable en CSV y PDF.

[23.B.9] ¿NEtexam soporta SCORM y xAPI?

Sí. Soporta SCORM 1.2, SCORM 2004 y xAPI. El sistema detecta automáticamente el estándar al importar el paquete ZIP y valida el imsmanifest.xml.

[23.B.10] ¿Pifini es la plataforma adecuada para partner enablement y canal de socios?

Sí, es su caso de uso principal. Los grupos controlan qué catálogo de cursos y certificaciones ve cada canal. Combinado con la IA prescriptiva y la integración CRM, es la plataforma más completa del portafolio TAEC para redes de distribución y habilitación de ventas externas. Ver también Cap 6 (PIFINI Discovery) para criterios de enrutamiento comercial.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECCIÓN B.EXEC — PIFINI LEARN / NETEXAM · JUSTIFICACIÓN EJECUTIVA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[23.B.EXEC.1] ¿Qué ROI pueden esperar las organizaciones de una plataforma de partner enablement?

Según datos internos del vendor: socios certificados cierran deals un 38% más rápido y generan
tratos en promedio un 32% más grandes. Pifini facilita medir la diferencia al correlacionar
formación, certificaciones y resultados de ventas vía integración CRM.
REGLA TITO: Presentar estos datos como referencia del vendor, no como estadística de mercado
neutral. Derivar a cotización para validar con datos del cliente.

[23.B.EXEC.2] ¿Cómo justifica Pifini la inversión ante un CFO?

Variables duras: aumento de ventas por partner certificado, reducción del churn en canales y menor
tiempo para activar nuevos socios. La integración con CRM permite mostrar cuántos dólares en ventas
ha generado cada dólar invertido en capacitar a un socio específico.

[23.B.EXEC.3] ¿Por qué Pifini en lugar de extender el LMS interno a socios?

En muchas organizaciones Pifini convive con el LMS interno (uno para empleados, otro para partners).
Pifini trae de serie procesos, analítica e integraciones para revenue y canal sin forzar el LMS
interno a casos de uso para los que no fue diseñado.

[23.B.EXEC.4] ¿Qué sectores obtienen más valor de Pifini en LATAM?

Mayor tracción en tecnología, SaaS B2B y fabricantes con redes de distribuidores. También en
organizaciones que ya operan con PRM y CRM y quieren conectar capacitación con esos flujos.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECCIÓN C — PROCTORIZER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[23.C.1] ¿Qué requisitos técnicos necesita el estudiante para usar Proctorizer?

Compatible con Windows, macOS y Linux. PC, laptop, tablets y móviles sin instalación adicional. Requisitos: Chrome o Edge actualizado, webcam, micrófono y conexión a internet. Opera también bajo condiciones inestables (sincronización diferida). No compatible con Firefox ni Safari en modo nativo.

[23.C.2] ¿Proctorizer funciona con internet inestable? (relevante para LATAM)

Sí. Diseñado específicamente para entornos latinoamericanos con conectividad variable. Almacena datos de sesión localmente y sincroniza al reconectar. No interrumpe el examen por caídas momentáneas. Mínimo recomendado: 1 Mbps estable para video en tiempo real.
Diferenciador clave frente a soluciones de proctoring norteamericanas no optimizadas para LATAM.

[23.C.3] ¿Con qué LMS es compatible Proctorizer?

Se integra vía LTI con Moodle, Blackboard, Canvas y otras plataformas LMS estándar. El examen se lanza directamente desde el LMS sin redireccionamiento. Los estudiantes ingresan con sus credenciales habituales del LMS, no crean cuenta separada en Proctorizer.

[23.C.4] ¿Qué niveles de supervisión ofrece Proctorizer?

Tres niveles configurables por examen:
1. Supervisión Automatizada: IA sin intervención humana, con alertas y reporte post-examen.
2. Supervisión en Vivo: proctor humano monitorea en tiempo real con capacidad de intervenir.
3. Modo Híbrido: IA en tiempo real con revisión humana de incidentes flagueados.

[23.C.5] ¿Qué comportamientos detecta Proctorizer automáticamente?

Detecta y registra: cambios de ventana/pestaña, intentos de copiar/pegar, múltiples monitores, personas adicionales en cámara, dispositivos móviles visibles, ruidos o voces sospechosas, abandono del campo visual de la cámara, acceso a URLs no permitidas. Genera alertas en tiempo real al proctor.

[23.C.6] ¿Qué contienen los reportes post-examen de Proctorizer?

Grabación completa de video y audio, capturas de incidentes específicos, registro cronológico de alertas con severidad, puntuación de riesgo (score de integridad) por estudiante, actividad del sistema operativo durante el examen y resumen estadístico por examen. Descargables en PDF y exportables a CSV.

[23.C.7] ¿Proctorizer tiene app móvil?

No requiere app nativa: accede desde Chrome o Edge en el dispositivo móvil. Compatible con tablets iOS y Android (pantalla igual o mayor a 7 pulgadas) y smartphones.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECCIÓN C.EXEC — PROCTORIZER · JUSTIFICACIÓN EJECUTIVA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[23.C.EXEC.1] ¿Qué ROI se puede argumentar al implementar proctoring remoto vs exámenes presenciales?

Elimina costos de logística, sedes, viáticos y tiempos muertos. Según datos del vendor:
organizaciones reportan reducciones de más del 60% en costos operativos de certificación masiva.
Permite escalar evaluaciones a más sedes o países sin multiplicar personal de supervisión.
REGLA TITO: Presentar como referencia del vendor.

[23.C.EXEC.2] ¿Cómo se responde a "confiamos en la honestidad de nuestros empleados"?

La confianza no es una métrica de cumplimiento. En auditorías externas o certificaciones legales,
la evidencia forense de Proctorizer blinda a la empresa ante demandas y garantiza la validez
jurídica de las certificaciones. La supervisión es escalonada: ligera para cursos internos,
máximo rigor para exámenes con consecuencias salariales o regulatorias.

[23.C.EXEC.3] ¿Qué sectores lideran el uso de proctoring en LATAM?

Sector financiero (PLD, CNBV), salud (validación de conocimientos técnicos) y telecomunicaciones
(reclutamiento masivo). Caso de referencia: Claro Colombia trasladó sus evaluaciones psicométricas
de reclutamiento a Proctorizer.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECCIÓN D — STRIKE PLAGIARISM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[23.D.1] ¿Qué formatos de archivo acepta Strike Plagiarism?

Acepta: .doc, .docx, .rtf, .txt, .odt (textos), .ppt, .pptx (presentaciones), .pdf y HTML. Para PDFs escaneados sin capa de texto se recomienda convertir a .docx previamente.

[23.D.2] ¿Contra qué bases de datos compara Strike Plagiarism los documentos?

Cuatro fuentes: (1) Internet con más de 20 billones de páginas web indexadas, (2) RefBooks con más de 200 millones de textos científico-académicos, (3) Base de datos interna de la institución con documentos previamente verificados, (4) Repositorios de trabajos de estudiantes si la institución lo activa. El administrador puede activar o desactivar fuentes según política institucional.

[23.D.3] ¿Qué es el coeficiente de similitud y cómo interpretarlo?

Es el porcentaje del texto que coincide con fuentes externas. No hay umbral universal: cada institución define su política (ej. menor de 15% aceptable, entre 15 y 30% requiere revisión, mayor de 30% sospechoso). El Reporte Interactivo muestra similitud desglosada por fuente y permite excluir citas correctamente referenciadas. Un porcentaje alto no equivale automáticamente a plagio: el docente toma la decisión final.

[23.D.4] ¿Strike detecta parafraseo y manipulación de texto?

Sí. Dos módulos: (1) Detección de parafraseo: cambios de orden, sustitución de sinónimos y reformulaciones por análisis semántico. (2) Detección de manipulación: caracteres Unicode invisibles, espacios de ancho cero, sustitución de letras por caracteres de otros alfabetos (ej. Cirílico), texto en color blanco. El reporte incluye sección de Alertas de manipulación separada del coeficiente de similitud.

[23.D.5] ¿Strike detecta contenido generado por IA como ChatGPT?

Sí. Aplica modelos tipo BERT para analizar patrones lingüísticos de texto artificial: uniformidad estadística, frases repetitivas, sintaxis inusual, baja variabilidad en complejidad de oraciones. Funciona en más de 30 idiomas. Precisión declarada: 98% con menos de 1% de falsos positivos (según documentación oficial). El resultado se muestra como probabilidad, no como veredicto definitivo: se complementa con juicio docente para casos límite.

[23.D.6] ¿Qué métodos de integración ofrece Strike Plagiarism?

API v2 REST (envío de docs y recepción de reportes programática), LTI 1.3 (integración estándar con cualquier LMS compatible), Plugins nativos para Moodle, Canvas, Blackboard, Brightspace y OJS, LDAP y Active Directory (sincronización de directorio corporativo), SSO (inicio de sesión único con IdPs institucionales).

[23.D.7] ¿Cómo funciona el modelo de tokens de Strike Plagiarism?

1 Token equivale a 18,000 caracteres verificados. Los tokens no tienen fecha de vencimiento. Un trabajo promedio de 5,000 palabras (aproximadamente 30,000 caracteres) consume aproximadamente 2 tokens.
REGLA TITO: No citar la tarifa pública individual como precio final. Los contratos institucionales negocian paquetes de volumen con condiciones específicas. Derivar siempre a cotización oficial TAEC.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECCIÓN D.EXEC — STRIKE PLAGIARISM · JUSTIFICACIÓN EJECUTIVA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[23.D.EXEC.1] ¿Cuál es el riesgo de no contar con detección de IA en documentos corporativos?

El riesgo es reputacional y legal: publicar como propios reportes generados por IA puede invalidar
patentes y destruir la credibilidad ante clientes. Para agencias de marketing, el contenido
generado masivamente por IA es penalizado por Google, arruinando la estrategia SEO.

[23.D.EXEC.2] ¿Por qué Strike frente a Turnitin?

(1) Modelo de pago por tokens (flexible) vs suscripción institucional rígida de Turnitin.
(2) Detección de IA especializada en español — precisión declarada >99% según vendor (Turnitin
tiene enfoque primario en inglés).
(3) Módulo de detección de plagio por traducción (texto en inglés traducido al español).
(4) Soporte regional con oficinas en LATAM.
REGLA TITO: Los datos de precisión son declarados por el vendor. Derivar a demo para validar con
textos reales del cliente.

[23.D.EXEC.3] ¿Es viable Strike para una empresa pequeña o mediana?

Sí. El modelo de tokens permite comprar solo lo necesario. Un token = 18,000 caracteres ≈ trabajo
de 3,000-4,000 palabras. Los tokens no vencen. Elimina las barreras de entrada de suscripciones
anuales de otros competidores.
