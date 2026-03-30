# Blueprint Técnico: Producto "TAEC LMS AI Companion"
*(Spinoff y Empaquetamiento de Tecnología LLM para Entornos Moodle/Totara)*

## 1. Visión y Oportunidad de Negocio
Todo el trabajo estructural, de seguridad y UI que inyectamos en `TitoBits` no pertenece estrictamente a una página web. Es, en esencia, un **Motor Conversacional de Interfaz Desacoplada**. TAEC tiene la oportunidad directa de aislar este código, compilarlo "en crudo" (Vanilla JS / WebComponents) y venderlo o integrarlo como un valor agregado masivo para sus clientes de **Totara** y **Moodle**.

## 2. Lo que YA construimos (Nuestros Assets Listos para Exportar)

Hemos resuelto problemas complejísimos que el 90% de los integradores de IA omiten. Todo esto es código que ya tenemos:

### A. Motor de "Context-Hopping" (Reconocimiento del Entorno)
En la web creamos un sistema que lee la URL para inyectar un contexto previo.
*   **Implementación LMS Admin:** Si el Administrador está en la URL `moodle/admin/settings.php?section=userpolicies`, el bot abre diciendo: *"Veo que estás configurando Políticas de Usuario. ¿Qué regla necesitas crear?"*.
*   **Implementación LMS Alumno:** Si el alumno navega a `/mod/quiz/view.php`, el bot cambia a Modo Silencio o advierte: *"Estás por iniciar una evaluación. Durante los próximos 30 minutos no podré ayudarte con el temario."*

### B. Frontera Segura de Gobernanza (System Instructions)
Nuestro `agente-ia.ts` tiene fronteras de dominio irrompibles para prospectos. 
*   **Implementación LMS Alumno:** Transmutamos esa barrera hacia un **Tutor Socrático**. Si el alumno pide *"Dame la respuesta de la pregunta 3"*, el bot se negará matemáticamente y responderá: *"No puedo darte la solución, pero en el Capítulo 2 revisamos este concepto. ¿Qué recuerdas de la teoría de Maxwell?"*. Esto evita fraudes académicos (Academic Dishonesty).

### C. UI Reactiva, Limpia y Segura (Anti-XSS)
El componente de React ya no tira la estructura. Soporta listas, links, colores y animaciones. Al tener implementado `rehype-sanitize`, evitaremos que alumnos de ingeniería inyecten scripts maliciosos para tumbar la plataforma de sus compañeros dentro del chat.

### D. Privacidad "Zero-Data Retention" (Compliance FERPA/GDPR corporativo)
Al haber quitado el `persistentAtom`, tu bot cumple por defecto con las legislaturas estrictas. El historial vive en la RAM del navegador; si el usuario cierra sesión obligatoria del LMS, el chat muere. Nadie que use la computadora después podrá leer lo que el usuario preguntó.

---

## 3. Arquitectura del Spinoff (Cómo separarlo)

Para volverlo un producto agnóstico que se instale en CUALQUIER Moodle/Totara, necesitas una arquitectura `Hub & Spoke`:

### FASE 1: El Widget Inyectable (Spoke / Frontend)
Se toma el archivo `ChatAgent.tsx`, se reescribe para que no dependa de Astro, y se compila utilizando **Vite** en un solo archivo plano (ej. `taec-ai-bubble.min.js` y `taec-ai-bubble.css`).
1.  **En Totara/Moodle:** El Administrador simplemente pega esta línea de código en la sección de *"Additional HTML / Before Body"* del Tema visual. El icono del bot aparece mágicamente en todo el sistema.

### FASE 2: El Cerebro Externo (Hub / Backend Serverless)
No ejecutas la IA en Moodle (los servidores PHP de Moodle son terribles para cálculos IA intensivos o conexiones de sockets).
1.  TAEC se queda con un servidor central (ej. un Endpoint subdominio en Vercel/Netlify o AWS).
2.  El Moodle del cliente manda un *Token JWT* oculto garantizando que son ellos.
3.  TAEC cobra por volumen de Tokens (SaaS) a las empresas que sub-arrendan esta IA.

---

## 4. Personalidad Dual Integrada

Para que este proyecto brille, el servidor (Hub) simplemente debe leer qué PERFIL tiene el usuario que escribe (Esta data la pasa Moodle al JWT):

| Perfil | Rol del Sistema | Instrucción Clave Oculta |
| :--- | :--- | :--- |
| **Administrador** | Copiloto Técnico | *"Eres un Ingeniero Especialista Nivel 3 en [Totara]. Tu objetivo es dar la guía paso a paso al administrador para configurar plugins, roles y reportes del sistema. Tienes acceso a toda la base de conocimiento oficial."* |
| **Líder (Manager)** | Consultor de Datos | *"Ayuda a este gerente a interpretar por qué su equipo regional de ventas tiene baja retención en el curso X. Sugiere planes de cierre de brechas (Gap Analysis)."* |
| **Alumno** | Tutor Socrático y Soporte | *"Resuelve dudas técnicas ('¿Cómo subo mi tarea?'). Si te preguntan sobre el curso, nunca des la respuesta: guía al alumno y evalúa si su lógica es correcta basándote en el contenido formativo del SCORM."* |

## Siguientes Pasos (Futuro)
Cuando este proyecto se arranque, la única diferencia vs. TitoBits, será agregar una **Base de Datos Vectorial (RAG - Pinecone)** donde cargaremos todos los PDFs del cliente corporativo, para que el bot responda exclusivamente en base al conocimiento privado de esa empresa.
