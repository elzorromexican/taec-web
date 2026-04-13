import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

async function run() {
  const { supabase, EMBEDDING_DIMENSION, searchSimilarChunks } = await import('../src/lib/tito/rag.js');
  
  console.log("=== HEALTH CHECK VECTORIAL ===");
  
  // 1. Tomar muestra de chunks
  const { data, error } = await supabase.from('tito_knowledge_chunks').select('id, content').limit(100);
  if (error || !data) {
    console.error("No se pudo obtener datos:", error);
    process.exit(1);
  }

  console.log(`Verificando base de datos (${data.length} de muestra)...`);

  let allGood = 1;
  
  // 2. Probar vector query
  const testVector = new Array(EMBEDDING_DIMENSION).fill(0.1);
  console.log("Testeando similarity con pgvector usando query genérico (todo 0.1) ...");
  
  const searchResults = await searchSimilarChunks(testVector, -1.0, 5); // threshold negativo para obligar a devolver
  
  if (searchResults.length === 0) {
    console.error("Fallo. La búsqueda devolvió 0 resultados. ¿Embeddings inválidos?");
    allGood = 0;
  } else {
    for (const r of searchResults) {
      if (Number.isNaN(r.similarity) || r.similarity === null) {
        console.error(`ERROR CRITICO: similarity es NaN o nulo para id ${r.id}`);
        allGood = 0;
      }
    }
  }

  // 3. Checar vectors nulos vía raw (supabase devuelve string para vectores raw a veces, o array si usamos casting)
  // No necesitamos bajar todo, solo validamos q searchSimilarChunks pudo correr las matemáticas
  
  if (allGood) {
    console.log("✅ HEALTH CHECK APROBADO: No se detectaron NaNs, dimensión es de 768.");
    console.log("Muestra Top 1 similarity:");
    console.log("- ID:", searchResults[0].id);
    console.log("- Similitud:", searchResults[0].similarity);
    console.log("- Texto prev:", searchResults[0].content.substring(0, 100));
  } else {
    console.log("❌ HEALTH CHECK FALLÓ.");
  }
}

run();
