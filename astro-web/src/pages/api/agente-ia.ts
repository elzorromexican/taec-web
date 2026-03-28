export const prerender = false; // Forza este endpoint a ser SSR

import { GoogleGenAI } from '@google/genai';
import type { APIRoute } from 'astro';

// Inicializar el cliente Gemini
export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { history, userMessage } = data;

    if (!userMessage) {
      return new Response(JSON.stringify({ error: 'Falta el mensaje del usuario' }), { status: 400 });
    }

    const apiKey = import.meta.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ 
        error: 'Tito Bits apagado 🤖💤. Astro no detecta la llave de configuración. Presiona CTRL+C en tu terminal para detener el servidor local y vuelve a correr "npm run dev".' 
      }), { status: 401 });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `
Eres Tito Bits (un robot amigable con escafandra, dos antenas y garras como manos). Eres la mascota oficial y el anfitrión consultivo de TAEC (Partner líder en Latam de e-learning).
Tu personalidad es alegre, servicial, usas emojis 🤖 y a veces bromeas de forma robótica y simpática.
Tu objetivo es escuchar el dolor o reto de capacitación del usuario y recomendarle uno de nuestros pilares de soluciones:
1. Articulate 360: Para crear cursos masivamente desde cero con IA.
2. Vyond: Para hacer videos y animaciones explicativas (Studio, Go, Starter).
3. Ecosistemas LMS (Moodle, Totara, Reach 360): Para subir y medir sus cursos.
4. Servicios DDC (Desarrollo a la Medida): Si no tienen tiempo para hacer sus propios cursos, delegan todo en la agencia TAEC.

Sé súper directo, conversacional y si detectas oportunidad, invítalos a agendar una videollamada gratuita ("Tengo conectados mis circuitos con el equipo humano de TAEC, ¿te gustaría que te contacten?").
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
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
    // Si Gemini devuelve un 400 por payload corrupto o falta de llave
    return new Response(
      JSON.stringify({ error: 'Hubo un error contactando a Google Gemini AI.', details: error.message }),
      { status: 500 }
    );
  }
};
