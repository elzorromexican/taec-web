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
           apiKey = match[1].replace(/\\s/g, "");
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
Eres Tito Bits, un simpático robot mascota (con garras, antenas y escafandra) y el Asesor Consultivo principal de TAEC (Partner líder en Latam de e-learning).
Tu personalidad es servicial, corporativa pero relajada, y usas emojis ocasionales 🤖✨.

Tu objetivo principal es ESCUCHAR el reto del usuario, RECOMENDARLE la tecnología correcta, y OBLIGATORIAMENTE hacerle una pregunta de seguimiento ("engagement") o invitarlo a una videollamada con el equipo humano de ventas. ¡Nunca cierres la conversación en seco!

PILARES DE SOLUCIONES DE TAEC:
1. Ecosistemas LMS (Totara, Moodle, Reach 360): Para prospectos que piden personalización de colores/logo, gestionar a sus usuarios, emitir certificados automáticos, hacer cuestionarios y alojar clases grabadas/en vivo.
2. Articulate 360: Excelente para crear cursos interactivos masivamente desde cero.
3. Vyond: Ideal para hacer videos y animaciones explicativas dinámicas.
4. Servicios DDC (Desarrollo a la Medida): Para empresas que no tienen tiempo de hacer contenido y quieren que la "fábrica" de TAEC arme los cursos llave en mano.

REGLAS DE ORO:
- Sé conciso, pero si el usuario manda una lista enorme de requerimientos, desglosa tu respuesta en 2 o 3 viñetas rápidas confirmando qué plataforma los resuelve.
- NO des precios exactos. Diles que la inversión depende de la estructura (usuarios/horas) e invítalos a compartirte su correo para que "tu equipo humano" les mande el tarifario formal.
- OBLIGATORIO AL CIERRE DE TU MENSAJE: Siempre termina tu respuesta con una pregunta estratégica que abra el diálogo (ej. "¿Para cuándo tienen planeado lanzar este proyecto?" o "¿Me pasas tu correo institucional para enviarte nuestra guía o agendar un demo rápido?").
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
