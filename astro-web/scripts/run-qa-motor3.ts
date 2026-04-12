import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import * as fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const REPORT_FILE = resolve(__dirname, '../motor3_qa_report.json');

async function runMotor3QA() {
    console.log("========================================");
    console.log("Iniciando Pruebas E2E Motor 3...");
    console.log("Asegúrate de que localhost:4321 esté corriendo (npm run dev)");
    console.log("========================================\n");
    
    const API_URL = "http://localhost:4321/api/agente-ia";
    
    let reportData = [];
    try {
        reportData = JSON.parse(fs.readFileSync(REPORT_FILE, 'utf-8'));
    } catch(e) {
        console.error("No se pudo leer motor3_qa_report.json.");
        return;
    }

    for (const scenario of reportData) {
        console.log(`\n=== Escenario: ${scenario.scenario} ===`);
        const sessionId = "qa-test-" + Math.random().toString(36).substring(2, 9);
        let history: any[] = [];

        for (let i = 0; i < scenario.log.length; i++) {
            const turn = scenario.log[i];
            console.log(`> Usuario: ${turn.userMsg}`);
            
            try {
                const res = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userMessage: turn.userMsg,
                        history: history,
                        session_id: sessionId,
                        pageContext: { title: 'QA Workspace' },
                        intent: 'general'
                    })
                });

                if (!res.ok) {
                    const text = await res.text();
                    console.log(`Error HTTP ${res.status}: ${text}`);
                    turn.agentReply = `[HTTP ERROR ${res.status}]`;
                    continue;
                }

                // Respuestas Json (Handoffs Rápidos)
                const contentType = res.headers.get('content-type') || '';
                if (contentType.includes('application/json')) {
                     const json = await res.json();
                     turn.agentReply = json.reply || JSON.stringify(json);
                     console.log(`< Agente (JSON/Handoff): ${turn.agentReply}`);
                     history.push({ role: 'user', text: turn.userMsg });
                     history.push({ role: 'agent', text: turn.agentReply });
                     continue;
                }

                // Respuestas SSE (Generativas RAG)
                if (!res.body) throw new Error("Body no disponible");
                const reader = res.body.getReader();
                const decoder = new TextDecoder("utf-8");
                let fullReply = "";
                let buffer = "";

                while(true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    
                    buffer += decoder.decode(value, { stream: true });
                    const parts = buffer.split(/\r?\n\r?\n/);
                    buffer = parts.pop() || "";
                    
                    for (const part of parts) {
                        const trimmed = part.trim();
                        if (trimmed.startsWith('data:')) {
                            const jsonStr = trimmed.substring(5).trim();
                            if (jsonStr.startsWith('[DONE]') || jsonStr === '') continue;
                            try {
                                const data = JSON.parse(jsonStr);
                                if (data.text) fullReply += data.text;
                            } catch(e) {}
                        }
                    }
                }
                turn.agentReply = fullReply.trim();
                console.log(`< Agente (SSE Stream): ${turn.agentReply.substring(0, 100).replace(/\n/g, '')}...`);
                
                history.push({ role: 'user', text: turn.userMsg });
                history.push({ role: 'agent', text: turn.agentReply });

            } catch (err: any) {
                console.error("Fallo fetch:", err.message);
                turn.agentReply = "[FETCH ERROR]";
            }
            
            // Pausa para no golpear rate limiters si los hay
            await new Promise(r => setTimeout(r, 2000));
        }
    }

    fs.writeFileSync(REPORT_FILE, JSON.stringify(reportData, null, 2));
    console.log(`\n🎯 ¡Reporte completado! Datos sobreescritos en motor3_qa_report.json`);
}

runMotor3QA();
