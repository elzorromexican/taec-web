import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Load .env from project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

// Mock import.meta.env para evitar crash en SSR/Node
// @ts-ignore
import.meta.env = import.meta.env || {};
// @ts-ignore
import.meta.env.SUPABASE_URL = process.env.SUPABASE_URL;
// @ts-ignore
import.meta.env.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
// @ts-ignore
import.meta.env.TAEC_GEMINI_KEY = process.env.TAEC_GEMINI_KEY;

import * as fs from 'fs';

const queries = [
  "¿Cuáles son las promociones vigentes de Articulate?",
  "¿Cuáles son las principales diferencias entre Rise 360 y Storyline 360?",
  "¿Cómo es el proceso de instalación y onboarding para Articulate?",
  "¿Qué características tiene la versión enterprise de Vyond?",
  "¿Ofrecen soporte y atención técnica en español?",
  "¿Se puede contratar DDC (Desarrollo de Cursos) usando Rise o Storyline?",
  "¿Es posible integrar Totara con SSO y Active Directory?",
  "¿Cuáles son los tiempos promedio de implementación de un LMS?",
  "¿Tienen soluciones centradas en customer education?",
  "¿Cuáles son las diferencias entre exportar a SCORM o xAPI?",
  "¿Se brinda soporte local para LATAM (América Latina)?",
  "¿Cómo es el proceso de migración de Moodle hacia Totara?",
  "¿Sirven sus plataformas para la capacitación de equipos comerciales?",
  "¿Tienen opciones para programas de canales y partner enablement?",
  "¿Tienen algún caso de éxito enterprise con más de 1000 usuarios?"
];

async function runReport() {
  console.log("Iniciando validación RAG...");
  const results = [];
  
  // Dynamic import to ensure dotenv works first
  const rag = await import('../src/lib/tito/rag.js');
  const getEmbedding = rag.getEmbedding;
  const searchSimilarChunks = rag.searchSimilarChunks;
  
  for (let i = 0; i < queries.length; i++) {
    const q = queries[i];
    let queryResult = { query: q, chunks: [] };
    try {
      const embedding = await getEmbedding(q);
      const chunks = await searchSimilarChunks(embedding, 0.2, 3);
      if (chunks && chunks.length > 0) {
        queryResult.chunks = chunks.map((c: any) => ({
          content: c.content,
          similarity: c.similarity,
          metadata: c.metadata
        }));
      }
    } catch (e: any) {
      console.error(`Error procesando query ${i}:`, e.message);
    }
    results.push(queryResult);
    // Be gentle to Gemini API
    await new Promise(r => setTimeout(r, 1000));
  }
  
  fs.writeFileSync('rag-validation.json', JSON.stringify(results, null, 2));
  console.log("Resultados guardados en rag-validation.json");
}

runReport();
