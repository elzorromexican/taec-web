-- ==========================================
-- TAEC KB Vyond Enterprise — INSERT COMPLETO
-- Versión: v1.0
-- Fecha: 2026-04-05
-- Owner: Dirección Comercial TAEC
-- ==========================================

DELETE FROM kb_items WHERE producto = 'vyondenterprise';

INSERT INTO kb_items (
  producto, seccion, seccion_label, seccion_color, orden,
  pregunta, plus, menos, fuente, activo, audiencia
) VALUES

(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 20,
  'Fallo en traducción automática (80+ idiomas)',
  'Revisar el script original; la IA puede fallar con jerga técnica excesivamente específica.\n\nTraducción instantánea integrada en la plataforma.',
  'A menudo requiere una revisión humana final para contexto corporativo local.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 30,
  'Límite de descargas mensuales',
  'Enterprise ofrece descargas virtualmente ilimitadas frente a las 200 de Professional .\n\nElimina la preocupación por cuotas de exportación en equipos grandes.',
  'El procesamiento de videos pesados en alta resolución puede demorar en horas pico.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 40,
  'Rigidez contractual (Renovación)',
  'Las renovaciones son automáticas a menos que se notifique con la antelación estipulada en el contrato Master.\n\nEstabilidad para presupuestos anuales de L&D.',
  'Dificultad reportada para reducir el número de asientos a mitad de término .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 50,
  'Usuarios desactivados siguen ocupando seat',
  'Usar procesos de deactivate/suspend seats desde administración Professional & Enterprise. Vyond Staff.\n\nWorkaround operativo claro.',
  'Sin SCIM, sigue siendo manual.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 60,
  'Videos demasiado largos para exportar',
  'En Enterprise el límite es 90 min; dividir módulos si supera ese tiempo. Oficial.\n\nLímite mayor que Professional.',
  'Para academias largas sigue requiriendo modularización.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 70,
  '¿Argumentos de venta para CTO/CLO/L&D/IT?',
  'CTO/IT: Seguridad robusta (ISO 27001, SSO/SCIM, GDPR/CCPA); CLO/L&D: Videos para training/marketing a escala con AI tools y brand compliance.\n\nSoporte dedicado y recursos exclusivos (webinars, templates).',
  'Información no disponible.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 80,
  '¿Casos de uso corporativos a escala?',
  'Colaboración global en equipos/time zones, transformación de info crítica en videos engaging, uso en Fortune 500 para eficiencia y resultados business.\n\nFacilita onboarding/offboarding con Shared Spaces y User Groups.',
  'Información no disponible.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 90,
  '¿Comparación con competidores a escala?',
  'Vs otros AI video: Integra avatars con estilos mixtos, text-to-video/script, traducción 80+ idiomas en plataforma única.\n\nAll-in-one sin stack tech extra.',
  'Información no disponible.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 100,
  '¿Cuál es la propuesta de valor de Vyond Enterprise vs Professional?',
  'Vyond Enterprise ofrece creación de video a escala con Brand Management Suite, colaboración avanzada, seguridad enterprise (SSO, SCIM), créditos virtualmente ilimitados y soporte dedicado; Professional incluye colaboración básica, 20,000 créditos/mes y sin Brand Management Suite exclusiva.\n\nReduce costos y aumenta eficiencia en organizaciones globales con 65% Fortune 500 usando Vyond.',
  'Enterprise solo anual, sin suscripción mensual.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 110,
  '¿Cuál es la propuesta de valor principal de Vyond Enterprise frente a Professional?',
  'Vyond Enterprise está diseñado para organizaciones que requieren seguridad, control administrativo centralizado y escalabilidad. Incluye el conjunto completo de funciones de creación de video con IA, más herramientas de administración como User Groups y Shared Spaces, características de seguridad como Data Partitioning y opciones de cumplimiento normativo . El plan Professional está orientado a la colaboración en equipos pequeños, pero carece de los controles de seguridad y administración centralizada del Enterprise .\n\nEnterprise ofrece el "Brand Management Suite" para garantizar la consistencia de la marca a escala y herramientas de colaboración para organizaciones globales .',
  'El Professional no incluye funciones de seguridad a nivel empresarial como SSO/SCIM, Data Partitioning, ni Brand Kits centralizados .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 120,
  '¿Cuáles son funciones exclusivas de Enterprise?',
  'Brand Management Suite (Brand Kit, watermark, approval, logo en ropa), Advanced Collaboration (carpetas compartidas), Vyond Secure Suite (SSO, SCIM, IP whitelisting, inactivity logout), ultra high quality TTS, créditos ilimitados.\n\nCumple estándares IT enterprise con ISO 27001 y AWS.',
  'Requiere contacto para multi-seat pricing.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 130,
  '¿Cómo aprovisionar grupos de usuarios de forma automática desde el IdP?',
  'No es posible. La documentación oficial de Vyond para SCIM indica explícitamente: "Please note that ''Groups'' is not supported in the current version" .\n\nVyond recomienda usar "User Groups" manuales dentro de la plataforma para organizar a los usuarios después de que se hayan aprovisionado individualmente .',
  'Esta es una limitación funcional significativa para empresas grandes. No hay una hoja de ruta pública para implementar el aprovisionamiento de grupos, lo que obliga a la gestión dual de grupos.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 140,
  '¿Cómo añadir personajes u objetos personalizados (como un sloth)?',
  'No es posible a través de medios estándar. Un usuario solicitó un personaje animal específico y la respuesta de Vyond fue negativa, sin opción de personalización pagada . El workaround es crear el activo en Illustrator e importarlo como un elemento gráfico estático o una serie de imágenes .\n\nVyond permite importar activos personalizados (como SVG) para complementar su librería, aunque con la limitación de que no serán personajes animables con el sistema de huesos .',
  'Vyond no ofrece un servicio para crear personajes animables a medida. Si la librería estándar (solo humanos) no cubre una necesidad narrativa, no hay una solución oficial.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 150,
  '¿Cómo es el proceso de onboarding y entrenamiento para clientes Enterprise?',
  'El onboarding para clientes Enterprise incluye "tailored training and onboarding" y un "dedicated account manager" . Se menciona un equipo de "Customer Success" que proporciona guías y sesiones de Q&A .\n\nEl enfoque está en la capacitación personalizada para asegurar la adopción y el éxito a gran escala, adaptada a las necesidades específicas de la organización .',
  'sobre la duración, estructura específica o si hay costos adicionales asociados al onboarding más allá de la suscripción anual.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 160,
  '¿Cómo se compara a escala con Synthesia/Camtasia/Stream?',
  'La señal de mercado encontrada enfatiza ventaja en mezcla de estilos (avatar + animación + mixed media) dentro de una sola plataforma Enterprise-ready.\n\nMenos cambio de herramienta entre departamentos.',
  'Quejas externas apuntan a menor diferenciación visual extrema que workflows muy custom.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 170,
  '¿Cómo se gestiona centralizadamente a los usuarios en Vyond Enterprise?',
  'Vyond Enterprise permite la gestión centralizada de usuarios mediante integración SSO/SCIM. La función SCIM permite aprovisionar (crear, actualizar y desactivar) usuarios automáticamente desde un proveedor de identidad como Okta . Las "User Groups" permiten organizar a los usuarios por departamento para compartir recursos de forma eficiente y simplificar el acceso y desactivación .\n\nLa integración SCIM automatiza el "onboarding" y "offboarding", reduciendo la carga administrativa de TI. Es una funcionalidad exclusiva para clientes Enterprise con SSO habilitado .',
  'El SCIM de Vyond no soporta el aprovisionamiento de "Groups" en su versión actual, lo que limita la automatización completa basada en estructuras organizacionales complejas .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 180,
  '¿Cómo se gestiona la facturación y las licencias en un contrato Enterprise?',
  'Vyond Enterprise ofrece "flexible procurement", permitiendo a las organizaciones elegir entre facturación centralizada o descentralizada por departamentos . El precio está disponible "por solicitud", lo que indica un modelo de cotización personalizada basado en el número de usuarios, características y volumen .\n\nLa flexibilidad de facturación es una ventaja para grandes corporaciones con estructuras de centros de coste complejos y múltiples unidades de negocio .',
  'No se especifica un volumen mínimo de licencias, pero por la naturaleza Enterprise, se asume un número significativo. El modelo de precios por solicitud reduce la transparencia inicial para los compradores.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 190,
  '¿Fallo data partitioning?',
  'Opcional add-on para separate DB. Contact sales.\n\nMayor aislamiento datos.',
  'Add-on extra costo.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 200,
  '¿Inactivity logout prematuro?',
  'Definir tiempo por admin en Secure Suite. Solución oficial.\n\nCumple políticas password company-wide.',
  'Interrumpe workflows largos.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 210,
  '¿Objeciones frecuentes en ventas Enterprise?',
  'Preocupaciones por seguridad datos, integración SSO, costos anuales obligatorios.\n\nFedRAMP autorizado para government.',
  'Planes Enterprise no mensuales.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 220,
  '¿Objeción frecuente: branding corporativo rígido?',
  'Usuarios externos reportan que mantener una experiencia muy única de marca puede ser más difícil frente a herramientas más abiertas.\n\nBrand Management Suite mitiga parcialmente al centralizar assets y lineamientos.',
  'Tensión entre rapidez y personalización profunda de marca en contextos de training externo.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 230,
  '¿Qué argumentos de venta resuenan con CTO/CLO/L&D/IT?',
  'SSO/SCIM, ISO 27001, AWS, GDPR, data retention 18 meses, colaboración por equipos, assets custom y brand governance.\n\nConversación orientada a riesgo: gobernanza, cumplimiento, continuidad operativa.',
  'SLA formal con tiempos de respuesta no está publicado en abierto.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 240,
  '¿Qué casos de uso corporativos a escala están documentados?',
  'L&D, HR, internal communications, sales enablement, soporte al cliente y customer education. Se documenta uso en Fortune 500 y entrenamiento de equipos grandes.\n\nFácil vender a CLO y Director de CX por onboarding, simulaciones y refreshers.',
  'No hay métricas públicas de tiempo de despliegue por tamaño de tenant.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 250,
  '¿Qué funciones exclusivas para la gestión de marca ofrece Vyond Enterprise?',
  'La suite de gestión de marca incluye la funcionalidad de "Custom Color Palettes" (Paletas de color personalizadas) para mantener una imagen de marca consistente . Además, cuenta con "Approval Management", que permite restringir la descarga de videos solo a aquellos que han sido aprobados, asegurando el cumplimiento de las directrices de marca . Los "Brand Kits" permiten centralizar activos de marca.\n\nLa función de "Video Approval" está en fase beta, permitiendo a los "Team Owners" controlar la publicación de contenido . Las paletas de color son accesibles para todos los usuarios de una cuenta Enterprise .',
  'El "Video Approval" es una función en beta que solo permite aprobar a los "Team Owners". No se menciona un flujo de trabajo de aprobación más granular por roles .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 260,
  '¿Qué funciones son exclusivas de Enterprise?',
  'SCIM con SSO habilitado, Brand Management Suite, shared folders por propósito/proyecto/grupo, longitud máxima de exportación de 90 min, controles de seguridad Enterprise.\n\nSCIM reduce alta/baja manual y alinea IAM corporativo con Okta/IdP.',
  'SCIM depende obligatoriamente de SSO; si no hay SSO no aplica.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 270,
  '¿Qué hacer si el generador de IA consume muchos créditos?',
  'Vyond introdujo un sistema de créditos de IA por usuario/mes para funciones como avatares, traducción, etc. Si un equipo se queda sin créditos, los usuarios no podrán generar más contenido con IA hasta el siguiente ciclo de facturación .\n\nLos administradores de cuenta Enterprise tienen la flexibilidad de solicitar a Vyond que desactive las funciones de IA para todo el equipo si desean evitar el consumo de créditos .',
  'Para equipos con alta demanda de IA, el modelo de créditos puede convertirse en un cuello de botella o un costo imprevisto si se exceden. No hay mención de la compra de paquetes de créditos adicionales.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'comercial', 'Matriz Comercial', '#185FA5', 280,
  '¿Qué hacer si un usuario no puede descargar un video?',
  'Si la organización ha habilitado la función "Approval Management" con la opción "Approved videos only", los usuarios no podrán descargar ningún video que no tenga el estado "Approved" . La solución es solicitar al "Team Owner" que revise y apruebe el video .\n\nLa función de aprobación da control total sobre el contenido publicado, evitando la distribución de materiales no autorizados .',
  'La función de aprobación está en beta. Si un "Team Owner" no está disponible, el flujo de trabajo se bloquea. No hay un rol de "approver" delegable, solo el "Team Owner" puede aprobar .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 110,
  'Integración con LMS pierde trazabilidad fina',
  'Exportar como SCORM y delegar analítica al LMS. Workaround documentado.\n\nCompatible con LMS corporativos.',
  'Sin xAPI avanzado público documentado.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 120,
  '¿Brand Kit y control activos?',
  'Brand Kit (fonts/imágenes/logos), Company Watermark, Approval Management, Logo Application en characters.\n\nAsegura consistencia brand enterprise-wide.',
  'Información no disponible.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 130,
  '¿Con qué sistemas corporativos (LMS, HRMS) se integra Vyond Enterprise?',
  'Vyond no tiene integraciones nativas documentadas con LMS o HRMS en las fuentes oficiales. Una fuente externa indica que Vyond no posee integración nativa con LMS . Sin embargo, Vyond anunció una asociación estratégica con Vbrick, una plataforma de gestión de video empresarial, para integrar la creación de Vyond con la distribución, gestión y analítica segura de Vbrick .\n\nLa integración con Vbrick permite a las empresas altamente reguladas (gobierno, salud) distribuir videos de Vyond de forma segura y con analítica, aprovechando las certificaciones FedRAMP de Vbrick .',
  'La falta de integración nativa con LMS o SCORM es una limitación significativa, forzando a las empresas a depender de soluciones de terceros o procesos manuales para el seguimiento del aprendizaje .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 140,
  '¿Cuáles son los requisitos de infraestructura para implementar Vyond Enterprise?',
  'Vyond es una solución 100% basada en la nube, accesible a través de navegador web. No requiere infraestructura local por parte del cliente . Los administradores de red pueden necesitar añadir URLs de Vyond a una lista blanca para garantizar el acceso .\n\nLa naturaleza cloud-first elimina la necesidad de servidores, actualizaciones o mantenimiento de software por parte de TI, simplificando la implementación .',
  'Al ser solo en la nube, la plataforma es susceptible a caídas o lentitud si los servidores de Vyond experimentan problemas, dejando a los usuarios sin acceso .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 150,
  '¿Cómo funciona el "Brand Kit" o control de marca centralizado?',
  'El control de marca se ejerce a través de "Custom Color Palettes" que pueden crear los usuarios Enterprise y son utilizables por todos en la cuenta . La función "Video Approval" permite a los "Team Owners" restringir la descarga de videos hasta que sean aprobados, garantizando que solo el contenido verificado salga al exterior .\n\nLas "Custom Color Palettes" son una forma sencilla de democratizar el uso de la marca sin entregar archivos maestros complejos a todos los creadores .',
  'La funcionalidad de "Brand Kit" es limitada (principalmente colores). No se menciona la capacidad de centralizar y compartir activos como logotipos, fuentes, plantillas de personajes o escenas a nivel de toda la empresa.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 160,
  '¿Cómo opera SSO/SCIM y gestión centralizada?',
  'SCIM es exclusivo de Enterprise y requiere SSO activo. El owner genera token desde Security y configura el IdP (ej. Okta).\n\nAutomatiza provisioning/deprovisioning, útil para HRIS + IAM.',
  'Dependencia técnica del equipo de identidad; no self-service para admins no owners.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 170,
  '¿Cómo se implementa el SSO/SCIM en Vyond Enterprise?',
  'El SSO se habilita a nivel de cuenta Enterprise. Para SCIM, el "Team Owner" debe generar un token de autorización en la sección "Security" de la cuenta . Este token se configura en el proveedor de identidad (ej. Okta), y se habilita el aprovisionamiento para "Create Users", "Update User Attributes" y "Deactivate Users" .\n\nLa automatización del ciclo de vida del usuario reduce drásticamente el trabajo manual de TI y los riesgos de seguridad asociados con cuentas huérfanas .',
  'El SCIM de Vyond no soporta el aprovisionamiento de "Groups" . Los administradores deben gestionar la pertenencia a grupos manualmente dentro de Vyond, lo que añade fricción.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 180,
  '¿Fallo SCIM provisioning?',
  'Habilitar SCIM en Enterprise; integra con auth service. Solución oficial docs.\n\nAutomatiza user lifecycle.',
  'Solo Enterprise; opcional.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 190,
  '¿Hay control de marca y activos?',
  'Sí. Brand Management Suite protege consistencia visual y Shared Spaces/folders por grupo permiten aislar activos por BU o país.\n\nIdeal para TAEC: múltiples clientes o academias internas por línea de negocio.',
  'No se documentan límites públicos de capacidad por librería o DAM externo.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 200,
  '¿Integraciones LMS/HRMS/DAM?',
  'Google Docs, Slack, Zapier (7k+ apps), Shutterstock assets; no LMS/HRMS/DAM directo mencionado.\n\nAutomatiza video creation via Zapier.',
  'No integraciones directas LMS/HRMS/DAM.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 210,
  '¿Integraciones corporativas con LMS/HRMS/DAM?',
  'Exporta SCORM; integra Google Docs, Slack y Zapier (7,000+ apps). Esto habilita flujos con LMS, HRMS o DAM vía middleware.\n\nMuy defendible en venta Enterprise con ecosistemas heterogéneos.',
  'No se encontraron conectores nativos documentados a Workday/SAP SuccessFactors.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 220,
  '¿Permisos y roles?',
  'Team owners controlan permisos/seats/usuarios/billing; managers asignados; advanced permissions en Secure Suite.\n\nFlexible centralized/decentralized billing.',
  'Información no disponible.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 230,
  '¿Proceso implementación?',
  'Flexible procurement, dedicated customer success expert, onboarding resources (tutorials/webinars).\n\nFirst-name basis con expert.',
  'Información no disponible.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 240,
  '¿Qué certificaciones de seguridad y cumplimiento normativo tiene Vyond Enterprise?',
  'Vyond Enterprise cumple con ISO 27001, GDPR, CCPA y está verificado por TrustArc . La plataforma es FedRAMP Authorized, crucial para trabajar con el gobierno de EE. UU. . La infraestructura para el plan FedRAMP se aloja en una instancia separada (help.vyond-fedramp.com) . Los servidores están ubicados en Estados Unidos, aunque la página de ayuda en japonés sugiere posibles réplicas o traducciones para otras regiones .\n\nLa autorización FedRAMP posiciona a Vyond como una opción viable para organizaciones en industrias altamente reguladas . Vyond permite el "data partitioning", aislando los datos de un cliente en su propia base de datos como un add-on opcional .',
  'El plan Enterprise base no incluye el "data partitioning"; es un add-on opcional de pago. La información sobre la ubicación exacta de los servidores y la disponibilidad de réplicas en otras regiones no es clara en la documentación estándar.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 250,
  '¿Qué controles de permisos y roles están disponibles?',
  'Existen roles principales: "Team Owner" (control total: permisos, facturación, invitaciones), "Team Manager" (puede asignar roles de usuario), y "User" . A nivel de contenido, se puede compartir carpetas y videos con permisos de solo vista o edición, incluso a través de "User Groups" y "Shared Spaces" .\n\nLos "Shared Spaces" y "User Groups" permiten una gestión de permisos eficiente a escala, simplificando el acceso a recursos para equipos grandes .',
  'El sistema de roles es relativamente simple. No se mencionan roles más granulares como "Creator", "Reviewer", "Viewer" a nivel de toda la cuenta, más allá de los espacios compartidos.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 260,
  '¿Qué medidas de seguridad y cumplimiento (GDPR, CCPA, ISO) certifica Vyond?',
  'Vyond Enterprise cumple con los estándares ISO 27001, GDPR, CCPA, y está verificado por TrustArc . La plataforma cuenta con la certificación FedRAMP, que es un estándar de seguridad riguroso para servicios en la nube utilizados por el gobierno de EE. UU. . Vyond también ofrece Data Partitioning como un add-on opcional .\n\nLa certificación FedRAMP es un diferenciador clave en el mercado, abriendo oportunidades en sectores altamente regulados y gubernamentales donde la seguridad es primordial .',
  'La información detallada sobre la gestión de parches, las pruebas de penetración y los planes de respuesta a incidentes no está disponible en la documentación pública analizada. El data partitioning tiene un costo adicional.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 270,
  '¿Qué permisos y roles existen?',
  'Hay owner-level controls, user groups, managing access y espacios compartidos; artículos específicos de granularidad avanzada no están completamente públicos.\n\nSuficiente para segmentar por equipos.',
  'Matriz detallada RBAC por rol no está disponible públicamente.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 280,
  '¿Qué seguridad y cumplimiento ofrece?',
  'ISO 27001, AWS, GDPR, Trust Center con políticas, privacidad, transparencia; FedRAMP disponible en variante Government.\n\nResponde objeciones de InfoSec y procurement.',
  'Ubicación regional exacta de datos por cliente no se publica.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 290,
  '¿Qué tipo de reportes de uso y analítica están disponibles en Vyond Enterprise?',
  'Las fuentes oficiales analizadas no proporcionan detalles específicos sobre las capacidades de "reportes de uso y analítica" nativas de Vyond Enterprise. Se menciona que, a través de la asociación con Vbrick, se pueden obtener capacidades avanzadas de analítica de video a nivel empresarial .\n\nen fuentes oficiales para analítica nativa. La integración con Vbrick es la vía principal para obtener analítica a gran escala .',
  'La ausencia de paneles de analítica detallados sobre el uso de la herramienta (creación, engagement, etc.) dentro de la plataforma Vyond es un vacío de información.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 300,
  '¿Qué tipo de soporte y Acuerdo de Nivel de Servicio (SLA) ofrece Vyond Enterprise?',
  'Vyond Enterprise incluye un "dedicated account manager" y entrenamiento personalizado . El plan Professional tiene "priority customer service" . No se especifican métricas de SLA (ej. tiempo de actividad, tiempo de respuesta) en las fuentes oficiales analizadas.\n\nTener un "account manager" dedicado implica un soporte proactivo y estratégico, no solo reactivo. Vyond cuenta con un equipo de "Customer Success" .',
  'en fuentes oficiales para métricas concretas de SLA (ej. 99.9% de tiempo de actividad, tiempos de respuesta para incidentes críticos).',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 310,
  '¿Reportes de uso y analítica?',
  'Se mencionan reportes de desempeño vía videos y colaboración, pero la analítica administrativa de tenant no está documentada en abierto.\n\nPuede resolverse parcialmente con SSO logs + Zapier + LMS tracking.',
  'Falta evidencia pública de dashboards de adopción por usuario/departamento.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 320,
  '¿Reportes uso y analítica?',
  'Event Logging en Secure Suite.',
  'Reportes limitados a logging básico.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 330,
  '¿Requisitos de infraestructura e implementación?',
  'Plataforma 100% cloud, browser-based en Chrome/Edge/Safari desktop; no requiere instalación. Implementación técnica principal: SSO/SCIM + gobernanza de assets.\n\nDespliegue rápido comparado con suites on-prem.',
  'Experiencia full authoring no recomendada en móvil.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 340,
  '¿SLA técnico y soporte dedicado?',
  'Hay onboarding, webinars, Office Hours, Bootcamp y Help Center. SLA contractual con tiempos exactos no visible en fuentes públicas.\n\nCustomer Success sí está documentado como motion de adopción.',
  'Sin SLA público, la negociación pasa a MSA/orden de compra.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 350,
  '¿SLA técnico?',
  'Todos Enterprise plans incluyen contractual SLAs.\n\nPriority phone support.',
  'Detalles SLA no especificados.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 360,
  '¿SSO/SCIM y gestión usuarios?',
  'SSO SAML 2.0 (IdP/SP, Google/MS365), SCIM provisioning, User Management Panel, User Groups, Shared Spaces para onboarding/offboarding.\n\nReduce gestión a un click con groups/spaces.',
  'Información no disponible.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 370,
  '¿Seguridad y cumplimiento?',
  'ISO 27001:2022, GDPR/CCPA, FedRAMP (2025), AWS US East/West, TLS 1.2, AES-256, TrustArc verified, no uso datos para AI training.\n\nBrute force/IP whitelisting/inactivity logout/password complexity.',
  'Data partitioning opcional add-on.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'tecnica', 'Matriz Técnica', '#0F6E56', 380,
  '¿Vyond permite la integración con sistemas de gestión de aprendizaje (LMS) o de recursos humanos (HRMS)?',
  'No, Vyond no ofrece integraciones nativas con LMS o HRMS. Un análisis de la competencia señala esta falta de integración nativa como una limitación . Vyond se integra con Vbrick para la gestión y distribución de video, y la publicación en Microsoft Teams, Salesforce, etc., pero no con LMS de e-learning .\n\nLa asociación con Vbrick permite una integración profunda con sistemas corporativos críticos como ServiceNow, Salesforce y Microsoft Teams, centrada en comunicación interna .',
  'La ausencia de integración nativa con LMS (como SCORM o xAPI) es una desventaja crítica para los departamentos de formación corporativa que necesitan rastrear el completado de cursos y el rendimiento de los alumnos .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 210,
  'Adopción baja post-onboarding',
  'Usar Bootcamp, Office Hours y Quickstart kits. Oficial Customer Success.\n\nPrograma repetible para customer education.',
  'Requiere champion interno.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 220,
  'Bloqueo por inconsistencia de branding entre equipos',
  'Centralizar templates/assets en Brand Management Suite y Shared Spaces. Oficial.\n\nReduce dispersión global.',
  'No evita completamente creatividad fuera de estándar.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 230,
  'Control de activos de marca (Logo no aplica)',
  'Asegurar que los activos estén cargados en el "Shared Space" y no solo en la biblioteca personal.\n\nPermite flujos de aprobación para asegurar que se use el kit correcto.',
  'Requiere disciplina de equipo; el sistema no bloquea el uso de activos no-brand si no se configura estrictamente.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 240,
  'Desactivación de usuarios (Pérdida de contenido)',
  'Al desactivar vía SCIM, el contenido debe ser transferido por un administrador antes de la eliminación definitiva.\n\nSCIM automatiza la revocación de acceso por seguridad.',
  'Si no se transfieren los activos, pueden quedar inaccesibles temporalmente.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 250,
  'Error de acceso SSO (Bucle de login)',
  'Limpiar cookies o verificar que el correo del IdP coincida exactamente con el de Vyond.\n\nGeneralmente resuelto por el soporte dedicado de nivel Enterprise.',
  'Fricción inicial durante la configuración de aserciones SAML personalizadas .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 260,
  'Error en la sincronización SCIM (Usuarios no aparecen)',
  'Verificar la generación del API Token en la sección de seguridad y asegurar que "Create Users" esté activo en Okta .\n\nEl centro de ayuda ofrece guías paso a paso para Okta y Azure AD.',
  'Requiere que el propietario de la cuenta genere el token; administradores estándar no pueden .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 270,
  'Fallas de acceso SSO después de cambio de dominio',
  'Revalidar correo principal y claims del IdP; owner debe revisar Security. Parcial oficial.\n\nSuele resolverse sin soporte L2.',
  'Puede afectar lotes grandes en migraciones M&A.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 280,
  'Fricción en Onboarding (Curva de aprendizaje)',
  'Uso de plantillas predefinidas y tutoriales del Vyond Learning Center para reducir tiempo de adopción .\n\nVyond Go (IA) permite crear borradores en segundos para usuarios novatos.',
  'Usuarios avanzados reportan que transiciones complejas siguen siendo manuales y lentas .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 290,
  'Limitación de duración de video (90 min)',
  'El plan Enterprise extiende el límite de video hasta 90 minutos frente a los 40 de Professional .\n\nPermite contenidos de entrenamiento largos y complejos.',
  'La estabilidad del editor disminuye en proyectos extremadamente largos (Reportado en Reddit/G2).',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 300,
  'Personalización muy específica de marca no alcanza',
  'Combinar custom assets + templates corporativos + revisión central. Oficial + dolor de mercado .\n\nBuen equilibrio entre velocidad y control.',
  'cuando se exige identidad visual extrema en training externo.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 310,
  'Problemas de derechos comerciales en videos antiguos',
  'Los planes Enterprise incluyen derechos ilimitados, pero videos creados bajo licencias expiradas pueden requerir revisión .\n\nInclusión automática de derechos en el tier Enterprise actual.',
  'En Professional, cada transferencia de derechos cuesta $99 si no se gestiona bien .',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 320,
  'Queja por soporte lento en temas no documentados',
  'Escalar por Customer Success / sales rep Enterprise. Parcial por proceso comercial.\n\nExiste motion de acompañamiento.',
  'SLA de escalación no público.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 330,
  'SCIM no sincroniza usuarios',
  'Validar que el tenant sea Enterprise y que SSO esté activo; regenerar token y revisar mapeo en Okta/IdP. Solución oficial Vyond Staff.\n\nFix permanente si el mapping queda estandarizado.',
  'Persiste cuando RRHH cambia atributos sin gobernanza.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 340,
  'Usuarios no encuentran assets compartidos',
  'Revisar pertenencia a grupo/folder específico Enterprise. Oficial.\n\nFix rápido por permisos de carpeta.',
  'La visibilidad depende de disciplina administrativa.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 350,
  '¿Bloqueo por IP whitelisting?',
  'Configurar IPs trusted en admin; previene logins no autorizados. Workaround: Vyond Secure Suite.\n\nAumenta seguridad enterprise.',
  'Puede bloquear accesos legítimos si mal config.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 360,
  '¿Cómo se gestiona la desactivación de un empleado?',
  'Se puede hacer de forma centralizada. Si se utiliza SCIM, la desactivación del usuario en el IdP (ej. Okta) automáticamente desactivará su cuenta de Vyond ("Deactivate Users") . También se puede hacer manualmente por un "Team Owner".\n\nLa automatización con SCIM asegura que el acceso se revoque inmediatamente al desvincular al empleado, un requisito crítico de seguridad .',
  'Si no se usa SCIM, el proceso es manual y propenso a errores humanos, pudiendo dejar cuentas huérfanas y activas por accidente.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 370,
  '¿Cómo solucionar la falta de integración nativa con LMS?',
  'No existe una solución oficial de Vyond, ya que no tiene integración nativa . El workaround validado por la industria es exportar el video en formato MP4 (o GIF) y luego subir ese archivo como un recurso dentro del LMS .\n\nLa asociación con Vbrick ofrece una solución robusta de gestión de video, pero no es una integración directa con un LMS tradicional .',
  'La falta de integración nativa es una limitación arquitectónica de Vyond. No hay una solución oficial de Vyond para convertir sus videos en paquetes SCORM/xAPI con seguimiento nativo.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 380,
  '¿Error en configuración SSO SAML?',
  'Configurar via Entra ID > Enterprise apps > Vyond > SAML; soporta IdP/SP. Solución oficial Vyond Help.\n\nIntegración seamless con MS365/Google.',
  'Requiere admin setup manual.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 390,
  '¿Error sharing Shared Spaces?',
  'Invitar users a space; populate con content. User Groups para quick share.\n\nFacilita collab global.',
  'Limitado a Enterprise users.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 400,
  '¿Hay problemas conocidos con la función de "Text to Avatar"?',
  'La función "Text to Avatar" no estaba disponible en la fecha del anuncio del sistema de créditos (Agosto 2025). Vyond declaró que "no será lanzada el 7 de mayo, esta función se lanzará más tarde" .\n\nsobre la solución o estado actual. Se espera que esté disponible en una fecha posterior.',
  'La función estaba anunciada pero no implementada en el momento de la publicación. Para los clientes que la esperaban, esto representa un retraso en la hoja de ruta del producto.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 410,
  '¿La plataforma es inestable o lenta al ser solo para navegador?',
  'Sí, usuarios reportan que "el aspecto de solo navegador se bloquea regularmente y se ralentiza mucho", expresando el deseo de que existiera un software descargable. Este es un punto de dolor recurrente .\n\nsobre una solución o mejora. Vyond no ha anunciado planes para una aplicación de escritorio.',
  'Vyond es una aplicación 100% web, por lo que su rendimiento depende de la conexión a internet y la optimización del servidor.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 420,
  '¿Límite créditos AI agotado?',
  'Virtually unlimited en Enterprise; monitor via panel. Upgrade si needed.\n\nIlimitado evita interrupciones.',
  'Consumo alto en TTS ultra (5/10 chars).',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 430,
  '¿Password complexity no cumple?',
  'Configurar requirements company-wide en Secure Suite.\n\nBrute force protection.',
  'Fuerza cambios frecuentes.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 440,
  '¿Problema Brand Kit no aplica?',
  'Verificar Brand Kit setup (fonts/logos); share via libraries. Oficial.\n\nCentraliza assets enterprise.',
  'Requiere admin para approval.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 450,
  '¿Video cache expiration issues?',
  'Definir expiración server-side en Secure Suite.\n\nControl granular privacidad.',
  'Custom setup needed.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 460,
  '¿Vyond puede quedarse inaccesible por problemas en sus servidores?',
  'Sí. Como aplicación puramente web, "si los servidores experimentan problemas, es posible que no se pueda acceder a Vyond" . No hay una versión offline que funcione como respaldo.\n\nsobre un plan de contingencia o una ventana de tiempo de actividad garantizada (SLA) publicada.',
  'Vyond es un servicio, no un producto. La dependencia total de la infraestructura de Vyond significa que cualquier interrupción del servicio detiene toda la creación de contenido.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
),
(
  'vyondenterprise', 'troubleshooting', 'Troubleshooting', '#D85A30', 470,
  '¿Vyond sufre de bugs y caídas tras actualizaciones?',
  'Sí, usuarios han reportado que "algunas actualizaciones se realizan sin pruebas de calidad suficientes", encontrando "bugs que rompen el software" días después del lanzamiento. El usuario tuvo que proporcionar un informe de bug completo para que se solucionara .\n\nVyond respondió al usuario agradeciendo el feedback y pidiendo que se reporten los bugs a soporte o en la comunidad de clientes . Esto indica que hay canales para reportar y resolver incidentes.',
  'El problema persiste como una fricción recurrente. Vyond no ha declarado oficialmente un cambio en sus procesos de QA para evitar bugs post-lanzamiento.',
  'Análisis IA · QA', true, '{interno,titbits,publico}'
)
;