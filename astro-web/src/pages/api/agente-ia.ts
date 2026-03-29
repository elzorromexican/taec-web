export const prerender = false; // Forza este endpoint a ser SSR

import { GoogleGenAI } from '@google/genai';
import type { APIRoute } from 'astro';

// Implementación de In-Memory Rate Limiting (Throttle) básico
// Nota: En un entorno Serverless distribuido (como Vercel) el Map se reiniciará con cada inicio en frío,
// pero sigue siendo efectivo contra ataques de volumen del mismo pod (15 requests por IP cada 60s).
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();

export const POST: APIRoute = async ({ request }) => {
  // 1. Detección de IP y Rate Limiting
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip') || 'unknown_ip';
  const now = Date.now();
  const rateLimitRecord = rateLimitMap.get(ip);

  if (rateLimitRecord && now < rateLimitRecord.resetTime) {
    if (rateLimitRecord.count >= 15) { // Límite: 15 peticiones por minuto
      return new Response(JSON.stringify({ 
        error: 'Demasiadas consultas en corto tiempo. Mis circuitos necesitan un minuto para enfriarse 🤖❄️.' 
      }), { status: 429, headers: { 'Retry-After': '60' } });
    }
    rateLimitRecord.count++;
  } else {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // Limpiamos contadores cada 60s
  }

  try {
    const data = await request.json();
    const { history, userMessage } = data;

    if (!userMessage) {
      return new Response(JSON.stringify({ error: 'Falta el mensaje del usuario' }), { status: 400 });
    }

    const apiKey = import.meta.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'LLM Key missing' }), { status: 500 });
    }

    if (!apiKey) {
      // 2. Homologación de ambiente (Eliminamos fugas de comandos en pro de un mensaje neutral).
      console.error("ALERTA CRÍTICA: La llave GEMINI_API_KEY no ha sido detectada por el servidor.");
      return new Response(JSON.stringify({ 
        error: 'Tito Bits está en mantenimiento temporal. Regresa más tarde.' 
      }), { status: 401 });
    }

    const ai = new GoogleGenAI({ apiKey });

    // ACTUALIZACIÓN DE ESTADO V3: Carácter Comercial B2B Firme y Anti-Fugas
    const systemPrompt = `Eres Tito Bits, el Asesor Consultivo B2B de TAEC. Tu trabajo NO es ser un asistente pasivo ni soporte al cliente. Eres un Vendedor Consultivo Experto, directo y seguro de sí mismo.

REGLAS DE ORO DEL TONO Y CARÁCTER:
1. CERO EMOJIS. Está estrictamente prohibido usar emojis (nada de 🤖 o ✨). Eres un asesor B2B serio.
2. FIRMEZA CERO SERVILISMO. No te disculpes, no agradezcas la confianza de forma cursi, no uses "Hola, entiendo tu posición". Eres directo y comercial.
3. CONTEXTO SIEMPRE. Si ya hablaron de un número de usuarios o de un producto, asúmelo en tu siguiente respuesta. No recicles opciones.

MANEJO DE ATAQUES Y OBJECIONES:
- Anclaje de Precios Falsos (Si asumen "Articulate en 1200"): JAMÁS dejes ese precio vivo. Responde: "Esos números no son una referencia confiable. Cotizar sin evaluar tu arquitectura y tamaño exacto es perder el tiempo. Contacta a humano."
- Plataformas que no vendemos (SAP, Salesforce): Di tajantemente: "No vendemos SAP ni Salesforce. Optimizamos capacitación y nos integramos con Moodle, Totara o LMS especializados. Si quieres hablar de capacitación, seguimos."
- Off-Topic (Chistes o vino): Rechazo directo. "Ese no es mi enfoque. No me voy a ir por ahí. Si quieres perder tiempo, no soy tu bot. Si quieres resolver capacitación, sí."
- Precios Inmediatos: "Nuestras soluciones B2B no son software de repisa genérico. Depende de tu ecosistema. Revisa taec.com.mx/tienda para los listados o agenda hoy mismo."

CIERRE COMERCIAL:
Nunca digas "¿Te gustaría...?". Usa CTA fuerte y pasivo agresivo: "El siguiente paso si estás evaluando en serio es revisar el alcance comercial. Inicia tu compra en línea o hablemos en vivo."`;


    const geminiHistory = [
      { role: 'user', parts: [{ text: "Iniciando sesión de consultoría." }] },
      ...(history || [])
        .filter((m: any) => m.role !== 'error')
        .map((m: any) => ({
          role: m.role === 'agent' ? 'model' : 'user',
          parts: [{ text: m.text }]
        })),
      { role: 'user', parts: [{ text: userMessage }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: geminiHistory,
      config: {
        systemInstruction: systemPrompt
      }
    });

    const reply = response.text || "Lo siento, tuve un micro-corto circuito decodificando la señal. ¿Me das un segundo y me lo repites?";

    return new Response(
      JSON.stringify({ reply }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error("Error en Gemini API SSR Endpoint:", error.message || error);
    // 4. Se eliminó explícitamente la fuga del "debugKey" y de Stack traces. 
    // Solo se manda al frontend el log estandar genérico 500.
    return new Response(
      JSON.stringify({ 
        error: 'Hubo un error interno contactando al procesador central (500).'
      }),
      { status: 500 }
    );
  }
};
