# Protección de Propiedad Intelectual (IP) en Ecosistemas LMS

Desplegar software en la infraestructura de un cliente (ej. un Moodle On-Premise o un servidor privado de Totara) conlleva un riesgo de "fuga de código" altísimo si no se diseña con una arquitectura **Hub-and-Spoke (SaaS)**.

## 🚨 El Peligro de un Plugin Tradicional
Moodle y Totara están construidos en **PHP** (un lenguaje interpretado sin binarios compilados ocultos). 
Si tú programas la lógica de tu IA (Tus *System Prompts* magistrales, tu conexión a Gemini, tus reglas estrictas de contexto, tu código de RAG vectorial) dentro de un *Plugin Local de Moodle* y lo instalas en el servidor del cliente:
1.  **Código Expuesto:** El equipo de TI del cliente puede abrir el archivo `.php`, leer todo tu código, copiar tus prompts y robarse tu "Salsa Secreta".
2.  **Riesgo Comercial:** Si dejan de pagarte la mensualidad, el código sigue físicamente en su servidor. Podrían simplemente borrar tu sistema de licencias y seguir usando el bot gratis por siempre.
3.  **Virus Legal (GPL):** Moodle opera bajo la estricta licencia Open Source GPL. Técnicamente, cualquier plugin que interactúe profundamente con su Core PHP podría verse forzado legalmente a ser de código abierto.

---

## 🛡️ La Solución Inquebrantable: Arquitectura de "Cascarón Vacío" (Decoupled SaaS)

Para que TAEC sea **100% inmune al robo de código y garantice el pago mensual**, NUNCA debes instalar el "Cerebro" de la IA en el servidor del cliente. 

### 1. El Frontend (Lo que ve el cliente) = "El Cascarón"
Lo que se instala en el Moodle del cliente es simplemente la Ventana de Chat visual (nuestro React compilado e ilegible) y un pequeño plugin PHP "tonto".
*   **Función del Plugin PHP de Moodle:** Su única tarea es saber quién está logueado (Ej. "Juan Pérez, Alumno del Curso 5"), empaquetar esa info, firmarla criptográficamente y mandarla por internet hacia los servidores de TAEC.
*   **Nivel de Riesgo:** Cero. Si el cliente abre el código de este plugin, solo verá una función genérica que manda textos por internet. No hay Prompts, no hay lógica, no hay IA.

### 2. El Backend Serverless (El Cofre del Tesoro de TAEC)
Toda la Propiedad Intelectual vive fortificada en los servidores privados de TAEC (Ej. en AWS, GCP o Vercel Edge).
*   **La Mecánica:** Los servidores privados de TAEC reciben el mensaje de "Juan Pérez" enviado por el Cascarón Moodle. Tu servidor privado inyecta el *System Prompt*, busca en tu Base de Datos secreta corporativa, contacta a Gemini, y devuelve la respuesta empaquetada de regreso al Moodle del cliente.
*   **Protección Total:** El cliente JAMÁS ve cómo se procesa la información, qué llaves usaste, ni tu lógica de negocio. Es una caja negra para ellos.

---

## 🔒 El Botón de Apagado (Kill Switch) Comercial

Al basarte en esta arquitectura, tú tienes el control absoluto del negocio. Cada Moodle cliente tendrá un `TAEC_API_TOKEN` único (Ej. Token del Cliente A).

Si el Cliente A decide no renovar su contrato anual o no paga su factura el día 1 del mes:
1.  Entras al panel de control de TAEC.
2.  Inactivas el Token del Cliente A.
3.  Automáticamente, el bot en el Moodle del cliente arrojará el error: *"Licencia inactiva o cuota excedida. Contacte a su administrador."* 
4.  No importa que tengan el Moodle alojado en sus propios servidores corporativos bajo 7 candados; al cortar el cordón umbilical hacia tu cerebro SaaS, su asistente IA se vuelve decoración inútil.
