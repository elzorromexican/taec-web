/**
 * @name rag.ts
 * @version 1.2
 * @description Motor 2: indexación, generación de embeddings genéricos mediante API y búsqueda con Supabase pgvector.
 * @inputs Texto natural de consulta
 * @outputs Chunks de contexto relevante
 * @dependencies @supabase/supabase-js
 * @created 2026-04-11
 * @updated 2026-04-23 10:46:00
 *
 * Changelog:
 *   v1.2 (2026-04-23) — Autor: Antigravity
 *     - [FIX] Resolución de env vars compatible con Astro SSR (import.meta.env + process.env) para config Supabase y Gemini
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
	(typeof process !== "undefined" && process.env.SUPABASE_URL) ||
	(typeof process !== "undefined" && process.env.PUBLIC_SUPABASE_URL) ||
	(typeof import.meta !== "undefined" && import.meta.env && import.meta.env.PUBLIC_SUPABASE_URL) ||
	"";

const supabaseKey =
	(typeof process !== "undefined" && process.env.SUPABASE_SERVICE_ROLE_KEY) ||
	(typeof process !== "undefined" && process.env.PUBLIC_SUPABASE_ANON_KEY) ||
	(typeof import.meta !== "undefined" && import.meta.env && import.meta.env.PUBLIC_SUPABASE_ANON_KEY) ||
	"";

const geminiApiKey =
	(typeof process !== "undefined" && process.env.TAEC_GEMINI_KEY) ||
	(typeof process !== "undefined" && process.env.GEMINI_API_KEY) ||
	(typeof import.meta !== "undefined" && import.meta.env && import.meta.env.TAEC_GEMINI_KEY) ||
	"";

export const supabase = createClient(supabaseUrl, supabaseKey);

import { GoogleGenAI } from "@google/genai";

export const EMBEDDING_DIMENSION = 768;

/**
 * Recupera el embedding vectorial llamando a Gemini Embeddings API u otro proveedor.
 */
export async function getEmbedding(text: string): Promise<number[]> {
	if (!geminiApiKey) {
		throw new Error(
			"Falta TAEC_GEMINI_KEY. Abortando embedding real fail-fast.",
		);
	}

	const ai = new GoogleGenAI({ apiKey: geminiApiKey });
	const response = await ai.models.embedContent({
		model: "gemini-embedding-001",
		contents: text,
		config: {
			outputDimensionality: EMBEDDING_DIMENSION,
		},
	});

	if (!response.embeddings || response.embeddings.length === 0) {
		throw new Error(`Embedding API returned empty results`);
	}

	const result = response.embeddings[0].values;
	if (!result || result.length !== EMBEDDING_DIMENSION) {
		throw new Error(
			`Dimensión errónea recibida: ${result?.length || 0} vs esperada ${EMBEDDING_DIMENSION}`,
		);
	}

	return result;
}

/**
 * Busca en la base de datos Supabase usando el embedding.
 */
export async function searchSimilarChunks(
	embedding: number[],
	matchThreshold = 0.75,
	matchCount = 3,
) {
	const { data, error } = await supabase.rpc("match_tito_knowledge_chunks", {
		query_embedding: embedding,
		match_threshold: matchThreshold,
		match_count: matchCount,
	});

	if (error) {
		console.error("Error en pgvector RPC match_tito_knowledge_chunks:", error);
		return [];
	}

	return data || [];
}

/**
 * Busca en la base de datos Supabase usando el embedding sobre kb_items.
 */
export async function searchKbItems(
	embedding: number[],
	matchThreshold = 0.75,
	matchCount = 3,
) {
	const { data, error } = await supabase.rpc("match_kb_items", {
		query_embedding: embedding,
		match_threshold: matchThreshold,
		match_count: matchCount,
	});

	if (error) {
		console.error("Error en pgvector RPC match_kb_items:", error);
		return [];
	}

	return data || [];
}

/**
 * Upserts a new knowledge chunk with its embedding vector.
 */
export async function indexKnowledgeChunk(
	content: string,
	embedding: number[],
	metadata: Record<string, any> = {},
) {
	const { error } = await supabase.from("tito_knowledge_chunks").insert([
		{
			content,
			embedding,
			metadata,
		},
	]);

	if (error) {
		console.error("Error indexando conocimiento:", error);
		throw error;
	}
}
