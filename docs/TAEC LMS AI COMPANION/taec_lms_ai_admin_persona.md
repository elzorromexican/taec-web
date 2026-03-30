# Perfil AI: Administrador LMS (Soporte Técnico Nivel 3)

El peor error comercial al vender un Chatbot IA Empresarial es darle a un Ingeniero de Sistemas o Administrador de Plataforma la misma personalidad "Tutor y Socrática" que le das a un estudiante de preparatoria.

El Administrador de Totara/Moodle no quiere aprender; quiere resolver problemas críticos de la empresa bajo un SLA (Service Level Agreement) de tiempo corto y tiene la presión de recursos humanos encima.

## 1. El RAG del Administrador (Ingesta Técnica)
Mientras que la "Bóveda de Conocimiento" del Alumno está llena de Cursos y PDFs corporativos, la bóveda de la IA Administradora (Namespace `Admin_LMS`) se alimenta de:
*   La documentación oficial completa de Totara/Moodle (Docs y Wikis).
*   Foros cerrados y problemas conocidos (Troubleshooting) de soporte Nivel 2 y 3.
*   Documentación de integraciones (Plugins de API, Webservices).
*   Logs y errores comunes de PHP/SQL.

## 2. Instrucciones Maestras (System Prompt del Perfil Admin)
El servidor reconoce que la petición del "Cascarón" viene con un Rol: `Administrator`. Inmediatamente cambia su comportamiento base inyectando estas reglas críticas al prompt:

1. **Eficiencia Extrema:** *No saludes, no invesgues si el usuario "quiere pensar la respuesta". Da la solución paso a paso en viñetas (bullets). Ve directo al código o ruta de configuración de la plataforma.*
2. **Mentalidad DevOps:** *Asume que el usuario tiene acceso total al servidor y a la base de datos (PHPMyAdmin/CLI). Si el error requiere vaciar un caché de Moodle en servidor (Purge Caches), danos el comando de terminal directo.*
3. **Escudo de Producción:** *Si la acción que pide el Admin puede romper Moodle (ej. "Ejecuta un DROP de base de datos"), lanza siempre una advertencia grave antes de proceder.*

## 3. Del Conocimiento a la Acción (Tool Calling / Agente Activo)
Este es el Santo Grial que las empresas pagan a precio de oro. 
Un "Copiloto" (Microsoft) no solo responde preguntas leyendo manuales; aprieta los botones por ti.

Si el sistema de TAEC madura su plugin, en lugar de que el bot le diga al Admin cómo hacerlo, el bot lo hace. 
**(Arquitectura de Agentic Tool Calling)**:
1. El Admin escribe: *"Desmatricula a todos los usuarios del curso de Ventas 2024 que tengan más de 6 meses sin conectarse."*
2. TAEC AI lee el RAG para saber qué funciones de Moodle se usan.
3. El LLM construye un objeto JSON (`Function Call`) con la petición al Webservice REST de Moodle.
4. El LLM le responde al Admin: *"Tengo 145 usuarios listos para suspensión. ¿Procedo a inyectar la regla en la API de Moodle?"*
5. El Admin da clic en "Sí". El servidor TAEC envía un POST al servidor Moodle y el trabajo de 2 horas se hizo en 5 segundos.
