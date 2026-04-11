/**
 * @name rag.ts
 * @version 1.1
 * @description Motor 2: indexación, generación de embeddings genéricos mediante API y búsqueda con Supabase pgvector.
 * @inputs Texto natural de consulta
 * @outputs Chunks de contexto relevante
 * @dependencies @supabase/supabase-js
 * @created 2026-04-11
 * @updated 2026-04-11 12:00:00
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const geminiApiKey = import.meta.env.TAEC_GEMINI_KEY || process.env.TAEC_GEMINI_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Recupera el embedding vectorial llamando a Gemini Embeddings API u otro proveedor.
 */
export async function getEmbedding(text: string): Promise<number[]> {
  try {
    if (!geminiApiKey) {
      console.warn("Falta TAEC_GEMINI_KEY, mockeando embedding.");
      return new Array(768).fill(0.1); 
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${geminiApiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "models/text-embedding-004",
        content: { parts: [{ text }] }
      })
    });

    if (!response.ok) {
      throw new Error(`Embedding API error: ${response.statusText}`);
    }

    const json = await response.json();
    return json.embedding.values;
  } catch (error) {
    console.error("Error generando embedding:", error);
    // Fallback a array de ceros para no romper el flujo
    return new Array(768).fill(0);
  }
}

/**
 * Busca en la base de datos Supabase usando el embedding.
 */
export async function searchSimilarChunks(embedding: number[], matchThreshold = 0.75, matchCount = 3) {
  const { data, error } = await supabase.rpc('match_tito_knowledge_chunks', {
    query_embedding: embedding,
    match_threshold: matchThreshold,
    match_count: matchCount
  });

  if (error) {
    console.error("Error en pgvector RPC match_tito_knowledge_chunks:", error);
    return [];
  }

  return data || [];
}

/**
 * Upserts a new knowledge chunk with its embedding vector.
 */
export async function indexKnowledgeChunk(content: string, embedding: number[], metadata: Record<string, any> = {}) {
  const { error } = await supabase.from('tito_knowledge_chunks').insert([
    {
      content,
      embedding,
      metadata
    }
  ]);

  if (error) {
    console.error("Error indexando conocimiento:", error);
    throw error;
  }
}
