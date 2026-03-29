const fs = require('fs');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

async function testKey() {
  const envStr = fs.readFileSync(path.resolve('/Users/slimmasmoudi/taec-web/.env'), 'utf8');
  const match = envStr.match(/GEMINI_API_KEY="?([^"\n]+)"?/);
  if (!match || !match[1]) {
    console.error("ERROR: No se encontró GEMINI_API_KEY en el .env");
    return;
  }
  
  const apiKey = match[1].replace(/\s/g, "");
  console.log("Llave detectada en archivo físico", apiKey.substring(0, 10) + "..." + apiKey.slice(-4));
  
  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: "Prueba rápida hola" }] }]
    });
    console.log("ÉXITO! Google respondió:", response.text);
  } catch (error) {
    console.log("FALLÓ en conexión directa a Google:");
    console.error(error.message);
  }
}

testKey();
