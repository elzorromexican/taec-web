import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const envStr = fs.readFileSync('.env', 'utf8');
const match = envStr.match(/GEMINI_API_KEY="([^"]+)"/);
const apiKey = match[1].replace(/\s/g, "");

const ai = new GoogleGenAI({ apiKey });

const systemPrompt = "Eres Tito Bits, un asesor..."; // simplificado
const history = [
  { role: 'agent', text: "¡Hola! Soy Tito Bits..." },
  { role: 'user', text: "hola" },
  { role: 'agent', text: "¡Hola! Soy Tito Bits, tu asesor L&D..." }
];
const userMessage = "Requerimos una plataforma personalizable logo , colores corporativos , con acceso por usuario y password disponible 12 semanas, 500 usuarios, posibilidad  de hacer 1 prueba de selección múltiple al final(45 preguntas aprox)  y/o por módulo y que entregue idealmente el certificado automático una vez aprobado el curso. Debe alojar 9 clases de 40 a 50 minutos aprox. 7 clases serán grabadas, 2 probablemente en vivo grabadas, que luego quedan en la plataforma. Esto como requerimiento, muy básico";

const geminiHistory = [
  { role: 'user', parts: [{ text: "Iniciando sesión de consultoría." }] },
  ...history.map((m) => ({
    role: m.role === 'agent' ? 'model' : 'user',
    parts: [{ text: m.text }]
  })),
  { role: 'user', parts: [{ text: userMessage }] }
];

async function run() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: geminiHistory,
      config: { systemInstruction: systemPrompt }
    });
    console.log("SUCCESS:", response.text);
  } catch (e) {
    console.error("ERROR CAUGHT:");
    console.error(e);
  }
}
run();
