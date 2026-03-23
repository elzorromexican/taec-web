# Especificación Técnica: Calculadora DDC MVP
**Versión:** 1.0.0
**Fecha:** 21 de marzo de 2026
**Estado:** Documento de Planificación (Aprobado por Arquitectura)
**Objetivo:** Definir un estimador público seguro, mantenible y comercialmente útil para la rama B2B de DDC (Desarrollo de Contenidos).

---

## 1. Decisión de Arquitectura y Seguridad
La calculadora NO replicará matemáticas ni costeo interno (horas hombre, márgenes de 50/30%, proveedores, etc.). Operará **estrictamente con una Matriz Comercial Derivada**.
*   **Capa Pública (Frontend Astro/React):** Formulario "tonto" que solo recibe y renderiza opciones. Llama a la API mostrando un estimado ("Desde $X MXN").
*   **Capa Oculta (Astro API Route):** Endpoint robusto (`/api/ddc-estimate`). Recibe, valida payloads y consulta la "Matriz Comercial". Las entrañas jamas viajan al cliente.
*   **Costeo Interno (Excel):** Archivo offline exclusivo para la operación de negocio, el cual se usa trimestral/semestralmente para actualizar las "Bandas de Precios" quemadas en la Matriz Comercial.

## 2. Catálogo Final del Estimador (MVP Público)
Solo incluye los tres productos maduros. Variantes como Mograph, Rise Básico/Gráfico (separados) y Simuladores Especiales quedan fuera.
1. `storyline` (Curso interactivo en Storyline)
2. `rise` (Curso ágil en Rise)
3. `vyond` (Video animado en Vyond)

## 3. Entradas Normalizadas (Payloads del Frontend)
Para eliminar la ambigüedad (ej. minutos vs slides), se normalizan las variables a las siguientes bandas públicas que cualquier director comercial entiende:

- **Duración Estimada (`durationBand`):** Bandas estables: `15_20`, `25_30`, ..., `55_60` (Storyline/Rise). Bandas cortas: `1_2`, `3_4`, ..., `9_10` (Vyond).
- **Complejidad Instruccional (`instructionalLevel`):** `basic` | `medium` | `advanced`.
- **Complejidad Visual (`visualLevel` - Solo Story/Rise):** `basic` | `medium` | `advanced`.
- **Nivel de Animación (`animationLevel` - Solo Vyond):** `basic` | `medium` | `advanced`.
- **Locución (`voiceType` - Recargo en %):** `none` (0%), `tts` (5-8%), `semi_pro` (10-14%), `professional` (18-22%).
- **Volumen Comercial (`volumeBand` - Descuento visible en %):** `1` (0%), `2_5` (-5%), `6_10` (-8%), `11_plus` (-10%).

## 4. Contrato Técnico del Endpoint (Backend Astro)
### 4.1. Request de Ejemplo (POST `/api/ddc-estimate`)
```json
{
  "product": "storyline",
  "durationBand": "25_30",
  "instructionalLevel": "medium",
  "visualLevel": "medium",
  "voiceType": "tts",
  "volumeBand": "2_5"
}
```

### 4.2. Response Exitosa
```json
{
  "product": "storyline",
  "estimatedFrom": 89000,
  "estimatedTo": 115000,
  "currency": "MXN",
  "deliveryRange": "15-20 días hábiles",
  "disclaimer": "Este es un precio estimado referencial. La cotización formal puede variar según el análisis detallado del proyecto.",
  "leadMessage": "Si quieres una propuesta más precisa, podemos revisar contigo el alcance real del proyecto.",
  "version": "1.0.0"
}
```

### 4.3. Excepción de Negocio Controlada
Si la combinación visual/instruccional no existe en la matriz comercial (ej. pedir diseño altísimo con cero instrucción):
```json
{
  "errorCode": "COMBINATION_NOT_AVAILABLE",
  "message": "Tu proyecto requiere una valoración consultiva. Déjanos tus datos y te contactaremos.",
  "version": "1.0.0"
}
```

## 5. Criterios de Calidad (Go/No-Go)
El MVP se considerará finalizado solo cuando cumpla estos requisitos obligatorios:
1. El archivo JSON crudo/viejo del Excel **ya no exista** en el código por ningún lado.
2. El endpoint de Astro retorne bandas lógicas que tengan un máximo de ±15% de varianza respecto al Excel real (pruebas manuales de QA).
3. Inspecciones de red en el navegador (`DevTools -> Network`) comprueben que **no se está transmitiendo** ninguna fórmula financiera compleja al cliente.
4. El cálculo esté protegido por tipado estricto (Zod/TypeScript).
5. Se muestra siempre el `legalDisclaimer`.
