# Plan de Arquitectura Corregida: Estimador DDC (CTO Audit)
**Fecha:** 21 de Marzo de 2026  
**Propósito:** Especificación técnica maestra tras la auditoría de seguridad del modelo comercial. Reemplaza los JSON vulnerables de cálculo matemático en crudo que teníamos antes.

---

## 1. Reglas Duras del Catálogo MVP
Queda estrictamente limitado a los siguientes 3 productos para garantizar coherencia:
1. **Storyline 360**
2. **Rise 360**
3. **Vyond (Video 2D)**
*(Mograph y otros servicios menores quedan descartados del alcance inicial).*

## 2. Estandarización de Inputs (UI Pública)
Reparación de la ambigüedad matemática detectada en la auditoría. El Frontend preguntará exactamente las unidades que utiliza el motor real:
- **Storyline:** `Duración (min) + Complejidad Instruccional (DI) + Complejidad Multimedia (DM) + Locución + Volumen`.
- **Rise:** `Número de Páginas/Bloques + Complejidad Instruccional + Mix Multimedia + Volumen`. *(Se abandona la solicitud de duración en minutos por ser inexacta para la estructura modular de Rise).*
- **Vyond:** `Minutos de Video + Complejidad Instruccional + Complejidad de Animación + Locución + Volumen`.

## 3. Nueva Arquitectura de Seguridad en 4 Capas
El enfoque de "ocultar" constantes matemáticas en el cliente es reemplazado por un desacople real dictado por la IA auditora:

1. **Capa 1: UI Frontend (Formularios e Islas Astro)**
   - Su única responsabilidad es renderizar opciones y recolectar las variables descritas arriba. No conoce ningún dato financiero.
2. **Capa 2: Endpoint Seguro (Astro SSR - API Route)**
   - `/api/quote-ddc` recibe el estado del formulario. Sanidad de datos mediante **Zod** para prevenir inyecciones.
3. **Capa 3: Matriz Comercial Derivada (Server-Only)**
   - Adiós fórmulas con sumas de HH y divisiones por márgenes. El servidor consultará un **Tarifario Fijo Estructurado** previamente curado (ej. `Storyline + 30m + Alto = Banda $60k - $75k`).
4. **Capa 4: Excel Financiero (Offline)**
   - El maestro de Costos Operativos (`HH`, `proveedores`, `licencias`) abandona el ecosistema web por completo. Solo los directivos lo tocan para alimentar y actualizar la "Matriz Comercial" semestralmente.

## 4. Notas Técnicas sobre la Experiencia Visual (Fase 3)
*   **Scroll Storytelling:** Implementación restrictiva. Para proteger el *Performance* de Astro, los efectos visuales de la landing page de DDC se ejecutarán usando **CSS (`@keyframes` + `IntersectionObserver`)** o **View Transitions Nativas**, vetando librerías pesadas como *Framer Motion* que puedan arruinar el TTFB ni el CLS en móviles.
*   **Hero Banner Inteligente:** Queda relegado a futuros sprints para evitar parpadeos y retrasos en la generación de la página por manejo dinámico en el cliente.
