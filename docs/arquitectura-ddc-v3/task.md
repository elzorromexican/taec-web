# Backlog: Calculadora "Estimador de Costos DDC" (Astro)

## 1. Fase de Definición (Bloqueos Abiertos Relevados por Claude e IA)
- [ ] Extraer tabuladores fantasma del Excel original: `pmFromInstructionalDesign` y `pmFromGraphicDesign`.
- [ ] Extraer variables faltantes para Rise: `instructionalDesignMinutesPerBlock` y `blocksPerPage`.
- [ ] Definir explícitamente el valor de amortización para `internalLicenseCostPerVideo` en Vyond.
- [ ] Eliminar del frontend las menciones a: `hourlyRate` (340), `margins` (0.5 y 0.3).
- [ ] Decisión comercial: Definir si el toggle de `banco_imagenes` sumará valor o se elimina del MVP.
- [ ] Decisión comercial: Aclarar en el disclaimer si el estimado es *antes de IVA*.

## 2. Configuración Backend (Astro SSR & API)
- [ ] Convertir la configuración de `astro.config.mjs` para habilitar `output: 'server'` o `'hybrid'`.
- [ ] Crear el archivo `.env` para almacenar en crudo: tarifas HH, márgenes brutos, y costos de licencias en la nube (seguros).
- [ ] Crear la Astro API Route `src/pages/api/calcular-cotizacion-ddc.ts`.
- [ ] Implementar validador Zod Schema para sanitizar los payloads entrantes (`duracion`, `nivel_di`, etc).
- [ ] Codificar el motor de estimación derivado de 3 productos limitados (Storyline, Rise, Vyond).

## 3. Fase de Validación y Pruebas Unitarias
- [ ] Validar EndPoint contra **5 cotizaciones históricas reales** sacadas del Excel.
- [ ] Confirmar que el margen de error del "Estimador" no supere un ±15% de desviación vs Operación.

## 4. Fase Frontend (Desarrollo y Renderizado)
- [ ] Diseñar Componente Island en React o Svelte (`CotizadorDDC`) embebido en la landing.
- [ ] Integrar el formulario de inputs limpios estandarizados para el usuario.
- [ ] Realizar Fetch pasivo y asíncrono al endpoint.
- [ ] Mostrar en UI el resultado encapsulado (`"Desde $XX,XXX MXN"`) e inyectar *disclaimer* legal.
- [ ] (Bonus Track Phase 3): Hacer *POST* webhook enviando los datos cotizados hacia Zoho CRM si capturamos el lead.
