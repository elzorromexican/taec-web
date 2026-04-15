require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

async function test() {
	try {
		const ai = new GoogleGenAI({
			apiKey: process.env.TAEC_GEMINI_KEY || process.env.GEMINI_API_KEY,
		});
		const response = await ai.models.generateContent({
			model: "gemini-2.5-flash",
			contents: [{ role: "user", parts: [{ text: "hola" }] }],
			config: { systemInstruction: "Eres un bot." },
		});
		console.log(response.text);
	} catch (e) {
		console.error("ERROR", e);
	}
}
test();
