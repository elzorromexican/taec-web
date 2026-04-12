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

const getSafeEnv = (k: string) => {
  if (typeof process !== 'undefined' && process.env && process.env[k]) {
    return process.env[k] as string;
  }
  return undefined;
};

const supabaseUrl  = getSafeEnv('SUPABASE_URL') ?? getSafeEnv('PUBLIC_SUPABASE_URL') ?? '';
const supabaseKey  = getSafeEnv('SUPABASE_SERVICE_ROLE_KEY') ?? getSafeEnv('PUBLIC_SUPABASE_ANON_KEY') ?? '';
const geminiApiKey = getSafeEnv('TAEC_GEMINI_KEY') ?? getSafeEnv('GEMINI_API_KEY') ?? '';

export const supabase = createClient(supabaseUrl, supabaseKey);

import { GoogleGenAI } from '@google/genai';

export const EMBEDDING_DIMENSION = 768;

/**
 * Recupera el embedding vectorial llamando a Gemini Embeddings API u otro proveedor.
 */
export async function getEmbedding(text: string): Promise<number[]> {
  if (!geminiApiKey) {
    throw new Error("Falta TAEC_GEMINI_KEY. Abortando embedding real fail-fast.");
  }

  const ai = new GoogleGenAI({ apiKey: geminiApiKey });
  const response = await ai.models.embedContent({
    model: 'gemini-embedding-001',
    contents: text,
    config: {
      outputDimensionality: EMBEDDING_DIMENSION
    }
  });

  if (!response.embeddings || response.embeddings.length === 0) {
    throw new Error(`Embedding API returned empty results`);
  }

  const result = response.embeddings[0].values;
  if (!result || result.length !== EMBEDDING_DIMENSION) {
    throw new Error(`Dimensión errónea recibida: ${result?.length || 0} vs esperada ${EMBEDDING_DIMENSION}`);
  }

  return result;
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
