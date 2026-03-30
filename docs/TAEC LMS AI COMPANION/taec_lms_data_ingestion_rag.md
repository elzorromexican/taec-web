# ¿Cómo aprende el Bot? (Pipeline de Datos RAG para LMS)

Esa es **la pregunta del millón** en el negocio B2B. A diferencia de ChatGPT, un LLM "en crudo" (como Gemini o OpenAI) NO SABE NADA sobre los cursos internos corporativos de tus clientes. Es un disco duro en blanco.

Para que el servidor central de TAEC pueda responder dudas específicas sobre un curso de Moodle, tenemos que construir un sistema llamado **RAG (Retrieval-Augmented Generation)**. Así es como funciona la magia en tres pasos:

## PASO 1: Ingestión (La Aspiradora de Conocimiento)
La IA no lee PDFs en tiempo real cada que un alumno pregunta algo (sería lentísimo y carísimo). Cuando TAEC cierra el contrato con el cliente, se hace una "Carga Inicial":
1.  **Extracción:** A través del plugin que instalas en Moodle, descargas los textos puros de los cursos del cliente (El HTML, los manuales PDF de RH, las transcripciones de SCORM y los Glosarios).
2.  **Trituración (Chunking):** El backend de TAEC corta esos PDFs en pedacitos pequeños (párrafos de unas 10 líneas cada uno).
3.  **Vectorización (Embeddings):** TAEC pasa esos párrafos por un traductor matemático que convierte el texto en números (vectores) y los guarda en una bóveda inteligente llamada **Base de Datos Vectorial (ej. Pinecone)**.
4.  **Etiquetado Lógico (Metadata):** A cada pedacito de PDF le pones una etiqueta clave. Ej. `[EMPRESA: BIMBO, CURSO_ID: Liderazgo2025]`.

## PASO 2: El Contexto en Tiempo Real (Context-Hopping)
Cuando el alumno "Juan" abre el Moodle y escribe: *"¿Cuál es la política de vacaciones?"*, el plugin inteligente de Moodle (El Cascarón vacío) **no solo envía la pregunta**, sino que envía un "Sobre con Datos de Contexto":
```json
{
  "usuario": "Juan Perez",
  "empresa_id": "Bimbo",
  "curso_actual_id": "Liderazgo2025",
  "pregunta": "¿Cuál es la política de vacaciones?"
}
```

## PASO 3: La Respuesta Inteligente (RAG Retrieval)
Este es el momento donde TAEC justifica su costo millonario:

1.  El Cerebro Central de TAEC recibe el sobre de Juan.
2.  TAEC **no manda la pregunta directo a Gemini**. Primero, TAEC va a la base de datos vectorial (Pinecone) y le ordena: *"Búscame los 3 párrafos matemáticamente más relevantes para 'política de vacaciones', pero SOLO busca dentro de las etiquetas [EMPRESA: BIMBO] y [CURSO_ID: Liderazgo2025]"*. 
**(Esto evita que a Juan de Bimbo le respondas con el manual de CFE).**
3.  La Base Vectorial devuelve los 3 párrafos correctos en 1 segundo.
4.  Ahora sí, TAEC arma un **Prompt Maestro Secreto** hacia Gemini que dice algo así:

> **[SISTEMA ORQUESTADOR TAEC]:**
> Eres un tutor corporativo. El alumno 'Juan Perez' hizo la siguiente pregunta: *"¿Cuál es la política de vacaciones?"*
> 
> Tienes PROHIBIDO inventar cosas. Basándote ESTRICTAMENTE en estos 3 documentos encontrados en el curso actual:
> <Documento 1>: "Los empleados tienen 12 días de vacaciones el primer año..."
> <Documento 2>: "Las vacaciones deben pedirse a RH con 2 semanas de anticipación..."
> 
> Responde la pregunta de forma amigable.

### Resultado Final
Gemini lee esos párrafos que tú le inyectaste (los "Documentos") y redacta una respuesta perfectamente humana, basada 100% en las políticas reales de la empresa del cliente, de manera segura, privada y sin "Alucinaciones".
