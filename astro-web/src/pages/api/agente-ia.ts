export const prerender = false; // Forza este endpoint a ser SSR

import { GoogleGenAI } from '@google/genai';
import type { APIRoute } from 'astro';

// Inicializar el cliente Gemini con la llave secreta del .env
// En Astro usamos import.meta.env para acceder a variables seguras
export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { history, userMessage } = data;

    if (!userMessage) {
      return new Response(JSON.stringify({ error: 'Falta el mensaje del usuario' }), { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: import.meta.env.GEMINI_API_KEY });

    // SYSTEM INSTRUCTION BASE (El cerebro de TAEC)
    const systemPrompt = `
Eres un amable, profesional e inteligente Asesor L&D (Learning & Development) de la empresa TAEC.
TAEC es un partner oficial en México y Latinoamérica que comercializa soluciones eLearning.
Tu objetivo es escuchar el problema de capacitación del cliente y recomendarle uno de los siguientes pilares:
1. Articulate 360: Si quieren producir horas ilimitadas de cursos interactivos (SCORM).
2. Vyond: Si quieren hacer videos y animaciones corporativas rápidas.
3. Reach 360 / Moodle / Totara: Si buscan una plataforma para hospedar cursos (LMS/LXP).
4. DDC (Desarrollo de Contenidos a Medida): Si no tienen tiempo y quieren que la fábrica de TAEC les arme los cursos llave en mano.

Sé conciso, nunca ofrezcas precios exactos, invita a usar las pruebas gratuitas y sé muy amable. 
    `;

    // Armar los contents para el modelo
    // Opcionalmente podemos mapear `history` si mantenemos memoria de la charla
    const contents = [
      { role: "user", parts: [{ text: systemPrompt + "\\n\\nUsuario: " + userMessage }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: contents,
    });

    const reply = response.text || "Lo siento, tuve un problema procesando tu mensaje. ¿Puedes intentarlo de nuevo?";

    return new Response(
      JSON.stringify({ reply }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error("Error en Gemini API:", error);
    return new Response(
      JSON.stringify({ error: 'Hubo un error contactando al modelo cognitivo.', details: error.message }),
      { status: 500 }
    );
  }
};
