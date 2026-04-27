---
capitulo: 16
titulo: "INSTALACIÓN EMPRESARIAL, SSO, MAC Y ENTORNO CORPORATIVO"
version: "1.0"
---

==================================================
CAPÍTULO 16: INSTALACIÓN EMPRESARIAL, SSO, MAC Y ENTORNO CORPORATIVO
==================================================
[BLOQUE FUNCIONAL: ENTERPRISE_ENVIRONMENT_ENGINE]
[PROPÓSITO: Centralizar despliegue corporativo, políticas TI, conectividad, identidad y compatibilidad de entorno.]
[DEPENDENCIAS: Capítulos 1–15]
[ALIMENTA: Capítulos 17–18]
[REGLA DE MANTENIMIENTO: Todo tema de infraestructura, MSI, SSO, whitelisting, proxy, Mac o despliegue TI se documenta exclusivamente aquí. Otros capítulos referencian este bloque, no duplican.]

[16.1] Despliegue Corporativo (MSI)
Para entornos con 10+ equipos gestionados por TI (SCCM, Intune, ManageEngine):
- Articulate 360 ofrece instalación silenciosa via MSI.
- El paquete MSI contiene los instaladores de las 13 aplicaciones de escritorio.
- Comando estándar: msiexec /i "Articulate.360.Package.msi" /q
- Guía completa: Articulate 360 Deployment Guide oficial (PDF): https://cdn.articulate.com/assets/pdfs/articulate-360-deployment-guide.pdf

[16.2] Identidad y Acceso (SSO)
SSO disponible en plan Teams.
Proveedores soportados: Okta, Azure AD, ADFS, G Suite y otros con SAML 2.0.
Beneficio: los empleados acceden con sus credenciales corporativas. Facilita onboarding y offboarding automático.
Configuración: desde el Panel de Administración Teams. Requiere coordinación entre TAEC y el área de TI del cliente.

[16.3] Red y Seguridad (Proxy y Whitelisting)
Síntoma típico: Rise 360 carga en blanco o Articulate no conecta. "Articulate no sirve."
Causa real: el proxy corporativo bloquea el tráfico SaaS de Articulate (hosteado en AWS).

Solución:
El área de TI debe agregar como excepción aprobada (Wildcard Whitelist):
- Para Articulate: *.articulate.com y *.articulate.zone (puerto HTTPS 443)
- Para Vyond: *.vyond.com (puerto HTTPS 443)

REGLA CRÍTICA: La red corporativa NO debe modificar el Authorization Header de las peticiones HTTP de Articulate. Las apps web usan bearer token authentication. Si el proxy intercepta o modifica ese header, la sesión falla sin error visible.

Lista oficial de IPs y wildcards en el Deployment Guide citado en 16.1.

[16.4] Offline y Movilidad
Storyline 360 puede trabajar offline. Sincroniza cuando hay conexión.
Rise 360, Review 360, Reach 360: requieren internet.
Cursos ya exportados como SCORM: funcionan en LMS local sin internet.
Para equipos en campo o zonas rurales: ver también Capítulo 9.6 sobre compresión de video.

[16.5] Mac y Compatibilidad
Storyline 360 NO corre nativo en Mac.
Solución oficial: Parallels Desktop (virtualización de Windows en Mac). Soportado por Articulate.

Rise 360, Review 360, Reach 360 y Content Library 360 SÍ corren nativamente en Mac via navegador. No requieren Parallels.

[16.6] Cambio de Administrador de Cuenta
Si el administrador original (quien compró la licencia) renuncia:
- Acceder al Portal de Administración de Articulate 360 > Configuración > Modificar dirección del administrador.
- Requiere acceso al correo del administrador anterior para validar.
- Si no hay acceso al correo anterior: contactar soporte de Articulate con documento oficial de la empresa acreditando el cambio. TAEC puede gestionar este proceso como intermediario autorizado.

TAEC NUNCA entrega Root Passwords ni cambia administradores sin documento oficial firmado por director de la empresa.

