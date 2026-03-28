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
    const response = await ai.models.list();
    for await (const model of response) {
      console.log(model.name);
    }
  } catch (error) {
    console.error("❌ ERROR LISTANDO MODELOS:", error.message);
  }
}

run();
