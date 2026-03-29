import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

// Leer el .env manualmente para evitar el caché de Vite
const envPath = path.resolve('.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const keyMatch = envContent.match(/GEMINI_API_KEY="([^"]+)"/);

if (!keyMatch) {
  console.log("NO SE ENCONTRÓ LA LLAVE EN EL .ENV");
  process.exit(1);
}

const key = keyMatch[1];
console.log("Llave interceptada empieza con: " + key.substring(0, 15) + "...");

const ai = new GoogleGenAI({ apiKey: key });

async function run() {
  try {
    const systemPrompt = "Eres Tito Bits.";
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "hola tito",
      config: {
        systemInstruction: systemPrompt
      }
    });

    console.log("✅ ÉXITO. Respuesta de Google:", response.text);
  } catch (error) {
    console.error("❌ ERROR GENERATING CONTENT:", error.message);
  }
}

run();
