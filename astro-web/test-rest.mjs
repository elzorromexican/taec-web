import { GoogleGenAI } from '@google/genai';

async function testRest() {
    const apiKey = process.env.TAEC_GEMINI_KEY || process.env.GEMINI_API_KEY;
    const model = 'gemini-2.5-flash';
    
    const googleUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`;
    console.log("Fetching...", googleUrl.replace(apiKey, '[KEY]'));
    
    const restRes = await fetch(googleUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{role: "user", parts: [{text: "hola"}]}],
        system_instruction: { parts: [{ text: "Respuestas directas." }] }
      })
    });
    
    if (!restRes.ok) {
        console.error("HTTP ERROR:", restRes.status);
        console.error(await restRes.text());
        return;
    }
    
    const reader = restRes.body.getReader();
    const decoder = new TextDecoder("utf-8");
    
    while(true) {
        const {done, value} = await reader.read();
        if (done) break;
        const text = decoder.decode(value, {stream: true});
        console.log("---- RAW RECEIVE ----");
        console.log(text);
    }
}
testRest();
