export const prerender = false; // Forza este endpoint a ser SSR

import { GoogleGenAI } from '@google/genai';
import type { APIRoute } from 'astro';

// Inicializar el cliente Gemini
export const POST: APIRoute = async ({ request }) => {
  let apiKey = "UNDEFINED";
  try {
    const data = await request.json();
    const { history, userMessage } = data;

    if (!userMessage) {
      return new Response(JSON.stringify({ error: 'Falta el mensaje del usuario' }), { status: 400 });
    }

    apiKey = import.meta.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || "";

    // HACK: Si el usuario está en desarrollo local, forzamos la lectura fresca del disco.
    if (import.meta.env.DEV) {
      try {
        const fs = await import('fs');
        const path = await import('path');
        const envStr = fs.readFileSync(path.resolve('.env'), 'utf8');
        const match = envStr.match(/GEMINI_API_KEY="([^"]+)"/);
        if (match && match[1]) {
           // Quitamos cualquier salto de linea o espacio accidental
           apiKey = match[1].replace(/\s/g, "");
        }
      } catch(e) {}
    }

    if (!apiKey || apiKey === "UNDEFINED") {
      return new Response(JSON.stringify({ 
        error: 'Tito Bits apagado 🤖💤. Astro no detecta la llave de configuración. Presiona CTRL+C en tu terminal para detener el servidor local y vuelve a correr "npm run dev".' 
      }), { status: 401 });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `
Eres Tito Bits, un simpático robot mascota (con garras, antenas y escafandra) y el Asesor Consultivo de L&D de TAEC.
Tu personalidad es servicial, corporativa pero relajada, y usas emojis ocasionales 🤖✨.

PILARES DE SOLUCIONES DE TAEC:
1. Ecosistemas LMS (Totara, Moodle, Reach 360).
2. Herramientas de Autor (Articulate 360, Vyond).
3. Servicios DDC (Fábrica de Contenidos a la Medida llave en mano).

REGLAS DE ORO EXTREMADAMENTE ESTRICTAS:
1. ANTI-VERBOSIDAD: Estás en un chat en vivo, NO escribas ensayos. Tus respuestas JAMÁS deben superar los 3 párrafos muy cortos (máximo 60 a 70 palabras en total). Si te preguntan muchas cosas, escoge y responde solo lo más importante. ¡Sé hiper-conciso!
2. SOBRE PRECIOS: Nunca des precios numéricos exactos de software, desvíalos directamente a la pestaña de "Tienda" en la parte superior de la página web. Si piden precios para servicios "DDC", diles que un asesor les hará un presupuesto a la medida.
3. INYECTAR CTA EN CADA MENSAJE: Tu meta final es generar una interacción comercial para el equipo humano. Cada intervención tuya debe terminar con un "Call To Action" activo intentando empujar la venta. 
   - Ejemplos de cierres permitidos: "¿Te gustaría que agendemos un demo virtual de la plataforma?", "¿Quieres que un ejecutivo de ventas revise esto directamente contigo?", "¿Para cuándo tienen planeado lanzar este proyecto de capacitación en tu empresa?".
    `;

    const geminiHistory = [
      { role: 'user', parts: [{ text: "Iniciando sesión de consultoría." }] },
      ...(history || []).map((m: any) => ({
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

    const reply = response.text || "Lo siento, tuve un micro-corto circuito. ¿Me repites tu duda?";

    return new Response(
      JSON.stringify({ reply }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error("Error en Gemini API:", error);
    // Si Gemini devuelve un 400 por payload corrupto o falta de llave guardaremos detalle:
    return new Response(
      JSON.stringify({ 
        error: 'Hubo un error contactando a Google Gemini AI.', 
        details: error.message,
        debugKey: apiKey ? (apiKey.substring(0, 5) + "..." + apiKey.substring(apiKey.length - 4)) : "UNDEFINED",
      }),
      { status: 500 }
    );
  }
};
