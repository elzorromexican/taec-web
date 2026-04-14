import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const genai = new GoogleGenAI({ apiKey: process.env.TAEC_GEMINI_KEY });

async function run() {
  try {
    const response = await genai.models.embedContent({
      model: 'gemini-embedding-001',
      contents: "Testing 1 2 3",
      config: {
        outputDimensionality: 768
      }
    });
    console.log("Response exists:", !!response);
    console.log("Embeddings length:", response.embeddings?.[0]?.values?.length);
    console.log("Sample values (first 2):", response.embeddings?.[0]?.values?.slice(0, 2));
  } catch (e) {
    console.error("Error:", e);
  }
}
run();
