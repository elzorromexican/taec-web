import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

import { extractSemanticChunks } from './test-rag-chunking.js';

const SEED_URLS = [
  '/articulate-360-mexico',
  '/vyond-mexico',
  '/totara-lms-mexico',
  '/desarrollo-de-contenidos',
  '/contacto',
  '/capacitacion-abierta',
  '/soluciones'
];

async function run() {
  const { supabase, getEmbedding, indexKnowledgeChunk } = await import('../src/lib/tito/rag.js');
  
  console.log("=== INICIANDO REINDEXADO EN TIER 1 y TIER 2 ===");
  
  // 1. Purgar base de datos
  console.log("Purgando chunks existentes (eliminando vectores corruptos)...");
  const { error: deleteError } = await supabase.from('tito_knowledge_chunks').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Clean everything
  
  if (deleteError) {
    console.error("Error al purgar base de datos:", deleteError);
    process.exit(1);
  }
  
  console.log("Base de datos purgada.");

  let totalIndexed = 0;
  const siteUrl = 'http://localhost:4322';

  // 2. Extraer, Embedear e Indexar
  for (const pathname of SEED_URLS) {
    const fullUrl = `${siteUrl}${pathname}`;
    console.log(`\nProcesando: ${pathname}`);
    
    try {
      const response = await fetch(fullUrl);
      if (!response.ok) {
         console.warn(`WARN: Status ${response.status} en ${fullUrl}. Saltando.`);
         continue;
      }
      const html = await response.text();
      
      const chunks = extractSemanticChunks(html, pathname);
      console.log(`Extraídos ${chunks.length} chunks con Cheerio.`);
      
      let successChunks = 0;
      for (const chunk of chunks) {
        try {
          const emb = await getEmbedding(chunk.content);
          await indexKnowledgeChunk(chunk.content, emb, chunk.metadata);
          successChunks++;
        } catch (embErr) {
          console.error(`Error generando/insertando chunk para ${pathname}:`, embErr);
          // Fail fast general? Si falla un embedding paramos toda la corrida.
          throw embErr;
        }
      }
      
      console.log(`Indexación completada para ${pathname}. Chunks: ${successChunks}`);
      totalIndexed += successChunks;
    } catch (e) {
      console.error(`Fallo catastrófico indexando ${pathname}:`, e);
      process.exit(1);
    }
  }

  console.log(`\n=== REINDEXADO EXITOSO ===`);
  console.log(`Total Chunks Validados en RAG: ${totalIndexed}`);
}

run();
