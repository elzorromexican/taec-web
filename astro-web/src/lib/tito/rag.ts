/**
 * @name rag.ts
 * @version 1.0
 * @description Motor 2: indexación y búsqueda vectorial interactuando con Supabase pgvector para TitoBits v2.
 * @inputs Vectores de embedding, parámetros de umbral
 * @outputs Contexto y chunks de conocimiento (Knowledge Chunks)
 * @dependencies @supabase/supabase-js
 * @created 2026-04-11
 * @updated 2026-04-11 11:58:00
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Searches pgvector within Supabase for relevant knowledge chunks.
 */
export async function searchSimilarChunks(embedding: number[], matchThreshold = 0.78, matchCount = 3) {
  const { data, error } = await supabase.rpc('match_tito_knowledge_chunks', {
    query_embedding: embedding,
    match_threshold: matchThreshold,
    match_count: matchCount
  });

  if (error) {
    console.error("Error en motor RAG al buscar chunks:", error);
    return [];
  }

  return data;
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
