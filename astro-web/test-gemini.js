import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("No API KEY found");
    process.exit(1);
}

try {
    const ai = new GoogleGenAI({ apiKey });

    const geminiHistory = [
      { role: 'user', parts: [{ text: "Hello" }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: geminiHistory,
      config: {
        systemInstruction: "You are a helpful assistant."
      }
    });
    
    console.log("SUCCESS:", response.text);
} catch (e) {
    console.error("ERROR from GoogleGenAI:", e);
}
