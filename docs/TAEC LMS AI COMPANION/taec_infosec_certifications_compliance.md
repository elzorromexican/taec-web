# Compliance InfoSec: Guía de Respuestas a Áreas de TI

Cuando TAEC intente vender este Bot de IA a un Corporativo (Bancos, Retail, Educación), el Director de TI y el área de "Information Security" detendrán la compra y enviarán un largo cuestionario de seguridad. Aquí están las **4 Barreras de Fuego** y cómo TAEC las supera sin gastar millones en certificaciones propias prematuras:

## 1. El Miedo Máximo: "Plagio" o Entrenamiento Indeseado
**La Pregunta de TI:** *"Si subimos nuestros manuales secretos de inducción, ¿ChatGPT y Google van a usar nuestra información para entrenar su propia Inteligencia Artificial pública y luego mi competidor lo va a poder leer?"*
**Respuesta TAEC (El "Zero-Training Guarantee"):** NO. Explicamos al cliente que TAEC **no usa las interfaces comerciales públicas** (ChatGPT Web o Gemini Web). Operamos bajo **APIs Enterprise B2B** procesadas y orquestadas desde nuestra infraestructura privada en AWS. Bajo contrato B2B corporativo, proveedores como Microsoft, Google y Amazon tienen ESTRICTAMENTE PROHIBIDO (por "Zero Data Retention/Training Clause") retener o usar los datos y PDFs ingeridos en la API para entrenar modelos fundacionales. Sus documentos quedan 100% aislados.

## 2. La pesadilla de las Certificaciones (SOC2 e ISO 27001)
**La Pregunta de TI:** *"¿Tiene TAEC la certificación ISO 27001 y SOC 2 Tipo II para manejar nuestros datos universitarios o corporativos?"*
**Respuesta TAEC (El Modelo de Responsabilidad Compartida AWS):** TAEC se apalanca del marco de seguridad de máxima categoría del planeta. Nuestra arquitectura Serverless utiliza la infraestructura unificada de **Amazon Web Services (AWS)** operando siempre bajo un modelo de responsabilidad compartida:
*   **Hosting y Red (AWS Backbone):** Toda la comunicación asíncrona, enrutamientos lógicos y servidores de TAEC viven en la nube de Amazon (instancias dedicadas o sin servidor). AWS consolida certificaciones como **SOC 1/2/3, ISO 27001, ISO 27017, ISO 27018 y cumplimiento HIPAA**.
*   **Dato Vectorial:** Las bases de datos indexadas para la ingesta RAG se despliegan en redes estrictamente cifradas (TLS 1.2+ en tránsito y AES-256 en reposo), respaldadas nativamente por las bóvedas KMS (Key Management Service) de Amazon.
*   *Nota Comercial:* Mencionar "AWS Backbone" con sus respectivas certificaciones Cloud es la llave maestra para abrir y atravesar ágilmente los procesos de *compliance* o InfoSec del 90% de empresas de Forbes 500 y Universidades de élite.

## 3. Privacidad Activa (GDPR / LFPDPPP)
**La Pregunta de TI:** *"¿Están guardando el historial de búsquedas de mis empleados para venderles publicidad o retener PII (Información Personal Identificable)?"*
**Respuesta TAEC (Zero-Data Retention):** A diferencia de otros bots, la interfaz que desarrolló TAEC está basada en *Estados Efímeros Reactivos* (Justo lo que quitamos de `persistentAtom`). El historial conversacional del usuario reside exclusivamente en la Memoria RAM de la computadora de ese usuario en esa sesión. Si el empleado recarga la página, cierra sesión o apaga la laptop, los datos se auto-destruyen y TAEC no recolecta telemetría escondida en "Local Storage".

## 4. Gobernanza y "Alucinaciones" Académicas
**La Pregunta del Área Académica:** *"¿Qué impide que el alumno use el Moodle Bot para preguntarle temas explícitos prohibidos o código malicioso para hackearnos?"*
**Respuesta TAEC (System Guardrails):** Hemos programado una barrera de "Lista Blanca" de Roles y un Contexto Socrático. Si a la IA se le ordena algo fuera del mapa curricular del contenido PDF ingerido, matemáticamente arroja una "Negativa Programada" (Ej. *"Mi ámbito se limita exclusivamente al material E-Learning, no poseo conocimiento fuera de la base de datos de esta empresa"*). La IA está capada operativamente.
