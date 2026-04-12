# SPECS — TitoBits v4: 3 Fixes Críticos

**Para:** Antigravity  
**Auditoría:** Claude Code — 11 Abr 2026  
**Rama:** `fix/titobits-v2-issues`  
**Prioridad:** Alta — Fix 1 es seguridad activa

---

## Contexto

TitoBits v4 está desplegado y funcional en sus flujos de escalamiento (Motor 1 + Handoff). Sin embargo la auditoría de código encontró 3 issues: uno de seguridad, uno funcional crítico y uno de UX.

---

## FIX 1 — Seguridad: `getSafeEnv` en `rag.ts` expone `TAEC_GEMINI_KEY`

**Archivo:** `astro-web/src/lib/tito/rag.ts` (líneas 14-18)

**Problema:**

```typescript
// VULNERABLE — Vite inlinea import.meta.env como diccionario en bundle SSR
const getSafeEnv = (key: string) => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) return process.env[key];
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) return import.meta.env[key]; // ← ESTE
  return '';
};
```

Vite ve `import.meta.env` y serializa TODAS las variables de entorno en el bundle. El acceso dinámico `import.meta.env[key]` evita el tree-shaking y expone `TAEC_GEMINI_KEY`, `SUPABASE_SERVICE_ROLE_KEY` y `PUBLIC_SUPABASE_ANON_KEY` en el HTML generado por SSR.

**Fix — copiar exactamente el patrón de `agente-ia.ts` (commit 83078ce):**

```typescript
// CORRECTO — solo process.env, sin import.meta.env dinámico
const getSafeEnv = (k: string) => {
  if (typeof process !== 'undefined' && process.env && process.env[k]) {
    return process.env[k] as string;
  }
  return undefined;
};

const supabaseUrl  = getSafeEnv('SUPABASE_URL') ?? getSafeEnv('PUBLIC_SUPABASE_URL') ?? '';
const supabaseKey  = getSafeEnv('SUPABASE_SERVICE_ROLE_KEY') ?? getSafeEnv('PUBLIC_SUPABASE_ANON_KEY') ?? '';
const geminiApiKey = getSafeEnv('TAEC_GEMINI_KEY') ?? getSafeEnv('GEMINI_API_KEY') ?? '';
```

**Nada más cambia en `rag.ts`.** Solo el bloque `getSafeEnv` y los fallbacks de las 3 variables.

---

## FIX 2 — Funcional: Motor 3 usa mock signals — scoring no funciona

**Archivo:** `astro-web/src/pages/api/tito-chat.ts` (líneas ~107-119)

**Problema:**

```typescript
// MOCK — hardcodeado, no extrae datos reales de la conversación
const mockSignals: LeadSignals = {
  productos_interes: ['articulate-360'],
  seats_mencionados: escalationCheck === 'ESCALATE' ? 120 : null,
  requiere_integracion: false,
  tiene_lms_actual: message.toLowerCase().includes('lms'),
  es_cliente_nuevo: true,
  urgencia: null,
  presupuesto_aprobado: false
};
```

La tabla `tito_leads` en Supabase se llena con datos inventados. El score calculado no refleja lo que el usuario comunicó.

**Fix — extraer señales reales vía Gemini con structured output:**

Reemplazar el bloque `mockSignals` por una llamada a Gemini que analice `message` (y opcionalmente el historial si se pasa en el body) y devuelva JSON estructurado:

```typescript
// Reemplazar mockSignals por esto:
import { GoogleGenAI } from '@google/genai';

const geminiKey = typeof process !== 'undefined' ? process.env.TAEC_GEMINI_KEY ?? '' : '';
const ai = new GoogleGenAI({ apiKey: geminiKey });

const extractionPrompt = `
Analiza este mensaje de un prospecto B2B y extrae señales de calificación.
Responde SOLO con JSON válido, sin texto adicional.

Mensaje: "${message}"

Schema esperado:
{
  "productos_interes": string[],        // productos mencionados: articulate-360, vyond, moodle, totara, reach, lys, ottolearn, proctorizer, strikeplagiarism, customguide
  "seats_mencionados": number | null,   // número de licencias/usuarios mencionados, null si no se menciona
  "requiere_integracion": boolean,      // menciona integración con otro sistema
  "tiene_lms_actual": boolean,          // ya tiene un LMS en uso
  "es_cliente_nuevo": boolean,          // parece ser nuevo cliente (true por defecto)
  "urgencia": "alta" | "media" | "baja" | null,  // señales de urgencia o plazo
  "presupuesto_aprobado": boolean       // menciona presupuesto aprobado o autorizado
}
`;

let realSignals: LeadSignals;
try {
  const extraction = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: extractionPrompt
  });
  const rawJson = extraction.text?.replace(/```json|```/g, '').trim() ?? '{}';
  realSignals = JSON.parse(rawJson);
} catch {
  // Fallback conservador si falla la extracción
  realSignals = {
    productos_interes: [],
    seats_mencionados: null,
    requiere_integracion: false,
    tiene_lms_actual: message.toLowerCase().includes('lms'),
    es_cliente_nuevo: true,
    urgencia: null,
    presupuesto_aprobado: false
  };
}

const score = calcularScore(realSignals);
let handoffTipo = determinarHandoff(realSignals, score);
```

**Importante:** la variable se llama `realSignals` — actualizar todas las referencias a `mockSignals` en el resto del archivo.

---

## FIX 3 — UX: Path CONTINUE no llama a Gemini — el usuario recibe texto de debug

**Archivo:** `astro-web/src/pages/api/tito-chat.ts`

**Problema:**

Cuando no hay escalamiento ni INFORM, el usuario recibe:

```
"Utilicé la base de conocimiento vectorial (X chunks) para evaluar tu solicitud con score Y."
```

Esto es texto de estado interno. No es una respuesta al usuario.

**Fix — conectar el path CONTINUE a una llamada real a Gemini:**

```typescript
} else {
  // CONTINUE — responder con Gemini usando contexto RAG
  const geminiKey = typeof process !== 'undefined' ? process.env.TAEC_GEMINI_KEY ?? '' : '';
  const ai = new GoogleGenAI({ apiKey: geminiKey });

  const ragContext = contextChunks.map((c: any) => c.content).join('\n\n');
  const systemRules = getSystemRulesString();

  const conversationPrompt = `
Eres TitoBits, el asistente comercial de TAEC — empresa líder en tecnología de aprendizaje corporativo en México y LATAM.
Resuelves preguntas sobre productos e-learning (Articulate 360, Vyond, Moodle, Totara, LYS, OttoLearn, Proctorizer).

REGLAS:
${systemRules}

CONTEXTO DE LA BASE DE CONOCIMIENTO:
${ragContext || 'No se encontró contexto relevante.'}

Responde al siguiente mensaje del usuario de forma concisa, directa y sin emojis.
Si no tienes la información precisa en el contexto, transfiere a ventas.

Usuario: ${message}
`;

  const geminiResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: conversationPrompt
  });

  reply = geminiResponse.text?.trim() ?? 'Gracias por tu consulta. Un especialista de TAEC te contactará pronto.';
}
```

---

## Validación post-fix

Antes del PR, verificar en local:

```bash
# 1. Build sin errores
cd astro-web && npx astro build

# 2. Verificar que rag.ts no tenga import.meta.env dinámico
grep "import.meta.env\[" src/lib/tito/rag.ts  # debe devolver vacío

# 3. Smoke test del endpoint (con servidor local)
curl -X POST http://localhost:4321/api/tito-chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Quiero cotizar Articulate para 25 personas", "session_id": "test-001"}'
# El reply debe ser texto generado por Gemini, no "Utilicé la base de conocimiento..."
```

---

## Variables de entorno requeridas (ya en Netlify)

```
TAEC_GEMINI_KEY        ← Gemini API key (Motor 1 RAG + FIX 2 + FIX 3)
SUPABASE_URL           ← ya existe
SUPABASE_SERVICE_ROLE_KEY ← ya existe
RESEND_API_KEY         ← ya existe (handoff emails)
GOOGLE_CHAT_WEBHOOK_URL ← ya existe (handoff chat)
VENTAS_EMAIL           ← ya existe
TITO_INDEX_SECRET      ← ya existe (indexer auth)
```

---

## Archivos a tocar

| Archivo | Fix |
|---|---|
| `astro-web/src/lib/tito/rag.ts` | Fix 1 — getSafeEnv |
| `astro-web/src/pages/api/tito-chat.ts` | Fix 2 + Fix 3 — signals reales + respuesta Gemini |

**No tocar:** `rules.ts`, `scoring.ts`, `handoff.ts`, `tito-index.ts` — están correctos.
