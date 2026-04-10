<!--
@name Plan Comercial y Arquitectónico: Evolución Tito Bits V4 (RAG)
@version 1.0
@description Análisis estratégico y arquitectónico para la transición de Tito Bits a un modelo de "Generación Aumentada por Recuperación" (RAG) y Agentes Ruteadores.
@inputs Discusión inicial de requerimientos (Sprint Q2)
@outputs Documento base para el desarrollo del MVP
@dependencies Chatbot V3.7, Astro Content Collections
@created 2026-04-09
@updated 2026-04-09 22:26:00
-->

# Análisis Estratégico: Evolución de Tito Bits V4

Este documento recopila la visión comercial y el planteamiento arquitectónico inicial discutido para llevar al asistente inteligente de TAEC (Tito Bits) al siguiente nivel, transitando de un sistema basado en reglas estáticas a un motor semántico (RAG).

## 1. Visión Comercial y Objetivo del Proyecto

El objetivo es transformar a Tito Bits de un modelo basado en respuestas inducidas por archivos estáticos, a una **arquitectura de conocimiento dinámica, modular y controlada**. 

*   **Identidad y Control:** Mantener la voz y los lineamientos de TAEC.
*   **Conocimiento Vivo:** Consultar en tiempo real el contenido del sitio web, FAQs internas y bases de conocimiento curadas de proveedores clave (Articulate, Vyond, Totara).
*   **Resultados Esperados:** Respuestas hiper-precisas, actualizadas, reducción de riesgo de información obsoleta, y un escalamiento en la calificación de leads sin incrementar la carga operativa humana. Tito Bits se convierte en un copiloto comercial que fortalece la preventa.

## 2. Estrategia de Implementación (Fases)

Se plantea un enfoque de bajo riesgo y alto impacto comercial:

*   **Fase 1 (MVP):** Orientado exclusivamente a interceptar el tráfico de las páginas clave de TAEC y armarlo con una *primera base curada* de FAQs de proveedores (ej. Articulate).
*   **Fase 2 (Escalabilidad y Seguridad):**
    *   Búsqueda Semántica Vectorial.
    *   Reglas avanzadas de enrutamiento de intención.
    *   Sistemas *Anti-Hallucination* mediante validadores.
    *   Reglas y escudos duros de *pricing* contra fuga de cotizaciones confidenciales.
    *   Protocolo de *Handoff* inteligente con transferencia de contexto resumido a ventas Enterprise.

## 3. Discusión Técnica y Arquitectónica

### 3.1. El Salto: De Diccionarios (Reglas) a Vectores (RAG)
El modelo actual (`chatContextRules.ts`) genera dependencias de mantenimiento manual (código duro). Se propone un esquema de **RAG (Retrieval-Augmented Generation)**:
*   Ingesta automatizada de los manuales y de la misma documentación del sitio.
*   Uso de **Astro Content Collections** guardando todo en formato puro de `.md` para simplificar la ingesta y no depender de servicios externos complejos.

### 3.2. Ruteador de Intenciones (Intelligent Routing)
Para proteger la integridad comercial, Tito Bits no será un solo "cerebro libre", sino una capa de orquestación (Router) que analiza la frase entrante:
*   **Intención Comercial/Pricing:** ElLLM generativo se desactiva. El router busca la respuesta exacta y autorizada en los diccionarios de variables y promociones del Frontend.
*   **Intención de Preventa/Soporte:** Se lanza una consulta a la base vectorial curada (documentos del proveedor).

### 3.3. Ventana de Calificación Silenciosa
Mientras el usuario hace preguntas casuales sobre E-learning o LMS, un sistema silencioso evalúa su nivel técnico e intención (ej. si menciona *Active Directory*, *SSO* y equipos grandes de TI). Esto permite:
*   Otorgarle una etiqueta interna como **Lead Enterprise**.
*   Preparar un resumen estructurado para el equipo comercial para realizar un *Handover* cálido, con herramientas valiosas, acortando su ciclo de venta.

### 3.4. Zona de Seguridad Estricta (Sandbox Anti-Alucinación)
Para evitar discursos incompatibles con la oferta de TAEC:
*   Reglas fundamentales de Sistema de estricto cumplimiento: "*Solo responder en base al contexto inyectado de los repositorios de TAEC*".
*   Freno de validación donde un modelo "centinela" verificará las aserciones hechas. Si detecta menciones de plataformas de la competencia o características inventadas, derivará la respuesta con un disculpa elegante ofreciendo contacto humano.

---
**Nota de Evolución:** Este draft servirá de punto de origen para continuar mañana definiendo las herramientas tecnológicas de indexación vectorial, validando si se usa Pinecone u otra base RAG *serverless* gratuita, y estructurando la Fase 1 del esquema de Content Collections.
