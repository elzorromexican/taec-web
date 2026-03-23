# ❌ OBSOLETO: Respaldo Técnico Calculadora DDC (Matemática Cruda)
> [!CAUTION]
> **ESTE DOCUMENTO HA SIDO DEPRECADO TEMPRANAMENTE TRAS AUDITORÍA TÉCNICA (21 Mar 2026).**
> Motivo: Contiene constantes matemáticas internas (HH, Márgenes, Costos Base) cuya exposición es un riesgo comercial y su estructura presenta inconsistencias.
> **Nueva fuente de verdad arquitectónica:** `especificacion_tecnica_calculadora_ddc.md` y el actual `task.md`.

---

## 1. Esquema Conceptual (Propuesto por Claude)
Este JSON define la estructura semántica de la Interfaz de Usuario (UI) y las tablas maestras de datos.

```json
{
  "_meta": {
    "nombre": "TAEC_DDC_Calculadora_Logica",
    "version": "1.0",
    "estado": "Borrador – requiere revisión",
    "variables_confidenciales_excluir": [
      "Costo interno HH (680 MXN/hr actual)",
      "Margen exacto por categoría",
      "Nombres y precios de proveedores externos",
      "Costos de licencias TAEC"
    ]
  },
  "variables_entrada": {
    "1_tipo_producto": {
      "tipo_control": "select",
      "opciones": ["storyline", "rise_grafico", "rise_basico", "vyond", "mograph"]
    },
    "2_duracion_minutos": {
      "tipo_control": "select",
      "aplica_a": ["storyline", "rise_grafico", "rise_basico"],
      "opciones": [20, 30, 40, 50, 60]
    },
    "3_nivel_di": {
      "label": "Diseño Instruccional",
      "opciones": ["sin_di", "basico", "medio", "alto"]
    },
    "4_nivel_dm": {
      "label": "Diseño Multimedia",
      "opciones": ["simple", "basico", "medio", "alto"]
    },
    "5_locucion": {
      "label": "Locución",
      "opciones": ["sin_locucion", "tts", "semipro", "profesional"]
    },
    "6_banco_imagenes": {
      "tipo_control": "toggle"
    },
    "8_cantidad_cursos": {
      "label": "Volumen",
      "opciones": ["1", "2_5", "6_10", "mas_10"]
    }
  },
  "logica_calculo": {
    "pseudocodigo": [
      "switch(tipo_producto) {",
      "  case 'storyline': precio_base = tablas_precios_storyline[nivel_di][nivel_dm][duracion]; break;",
      "  case 'rise': precio_base = tablas_precios_rise[tipo_rise][nivel_di][slides]; break;",
      "  case 'vyond': precio_base = tabla_precios_vyond[nivel_di][duracion_min] * duracion_min; break;",
      "}",
      "if (locucion) { precio_base += locucion_calculada; }",
      "precio_final = precio_base * (1 - descuento_volumen);"
    ]
  }
}
```

---

## 2. Tablas y Fórmulas Matemáticas de Costeo (Motor ChatGPT)
JSON duro con las matrices de multiplicadores precisas (sin margen original, para aplicar las fórmulas del cotizador).

```json
{
  "products": {
    "storylineCourse": {
      "internalConstants": {
        "generalMargin": 0.5,
        "professionalVoiceMargin": 0.3,
        "volumeDiscounts": [
          { "min": 2, "max": 5, "discount": 0.05 },
          { "min": 6, "max": 10, "discount": 0.08 },
          { "min": 11, "max": null, "discount": 0.1 }
        ]
      },
      "formula": {
        "pmWithoutMargin": "pmFromInstructionalDesign[di][duration] + pmFromGraphicDesign[dg][duration] + (qa[dg][duration] * 0.25)",
        "subtotal50WithoutMargin": "di + dg + pm + qa + semiproVoice + animation2D",
        "subtotal30WithoutMargin": "professionalVoice",
        "subtotalWithMargin": "(subtotal50 / 0.5) + (subtotal30 / 0.7)",
        "finalPrice": "subtotalWithMargin * (1 - volumeDiscount)"
      }
    },
    "riseCourse": {
      "internalConstants": {
        "hourlyRate": 340,
        "graphicMultimediaMix": {
          "infographicsProportion": 0.25,
          "gifsProportion": 0.25,
          "colorBlocksProportion": 0.5
        }
      },
      "formula": {
        "totalBlocks": "slidesOrPages * blocksPerPage",
        "instructionalDesignCost": "ceil((totalBlocks * instructionalDesignMinutesPerBlock[level]) / 60) * hourlyRate"
      }
    },
    "vyondVideo": {
      "internalConstants": {
        "margin": 0.5,
        "costPerMinute": {
          "instructionalDesign": { "Bajo": 340, "Medio": 340, "Alto": 680 },
          "multimedia": { "Bajo": 510, "Medio": 850, "Alto": 1190 },
          "qa": { "Bajo": 102, "Medio": 102, "Alto": 170 },
          "pm": { "Bajo": 102, "Medio": 102, "Alto": 102 }
        }
      },
      "formula": {
        "baseWithoutMargin": "(videoMinutes * componentCostPerMinute) + (videoMinutes * internalLicenseCostPerVideo)",
        "subtotalWithMargin": "baseWithoutMargin / 0.5"
      }
    }
  }
}
```

---

## 3. Directivas de MVP
- **Alcance Limitado:** Solo **Storyline**, **Rise**, y **Vyond**.
- **Variables Ocultas:** `hourlyRate` (Sueldos/HH), Márgenes brutos por componente y Proveedores.
- **Leyenda Legal Obligatoria:** *"Este es un precio estimado referencial. La cotización formal puede variar según el análisis detallado del proyecto."*
