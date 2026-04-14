import { GoogleGenAI } from '@google/genai';
console.log(Object.keys(GoogleGenAI.prototype));
// test an API call
const ai = new GoogleGenAI();
// it reads GEMINI_API_KEY from env
try {
  const result = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: 'hola',
    config: {
      systemInstruction: 'eres un traductor'
    }
  });
  console.log("Success:", !!result);
} catch(e) {
  console.error("FAIL:", e.message);
}
