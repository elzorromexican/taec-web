import type { APIRoute } from "astro";
import { RAG_SOURCES } from "../../lib/tito/rules";
import { getEmbedding, supabase } from "../../lib/tito/rag";

/**
 * Helper to split text into overlapping chunks
 */
function chunkText(text: string, maxWords = 500, overlapWords = 50): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const chunks: string[] = [];
  let i = 0;
  
  if (words.length === 0) return chunks;

  while (i < words.length) {
    const chunkWords = words.slice(i, i + maxWords);
    chunks.push(chunkWords.join(' '));
    if (i + maxWords >= words.length) break;
    i += maxWords - overlapWords;
  }
  return chunks;
}

/**
 * Basic HTML text extractor
 */
function extractTextFromHtml(html: string): string {
  // Extract body
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let content = bodyMatch ? bodyMatch[1] : html;
  
  // Strip out irrelevant tags
  content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ');
  content = content.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ');
  content = content.replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, ' ');
  content = content.replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, ' ');
  content = content.replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, ' ');
  content = content.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, ' ');

  // Prioritize <main> or <article> if available
  const mainMatch = content.match(/<main[^>]*>([\s\S]*?)<\/main>/i) || content.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (mainMatch) {
    content = mainMatch[1];
  }

  // Strip all HTML tags
  let text = content.replace(/<[^>]+>/g, ' ');
  
  // Normalize whitespace & entities
  text = text.replace(/&nbsp;/ig, ' ')
             .replace(/&amp;/ig, '&')
             .replace(/&#39;/g, "'")
             .replace(/&quot;/ig, '"');
             
  text = text.replace(/\s+/g, ' ').trim();
  
  return text;
}

export const GET: APIRoute = async ({ request }) => {
  const authHeader = request.headers.get('authorization');
  const secret = import.meta.env.TITO_INDEX_SECRET || process.env.TITO_INDEX_SECRET;
  
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { 
      status: 401, 
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const siteUrl = import.meta.env.SITE_URL || process.env.SITE_URL;
  if (!siteUrl) {
    return new Response(JSON.stringify({ error: "SITE_URL no configurada" }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let indexedCount = 0;
  let totalChunks = 0;
  const errors: string[] = [];

  for (const source of RAG_SOURCES) {
    try {
      const pageUrl = `${siteUrl.replace(/\/$/, '')}${source}`;
      const response = await fetch(pageUrl);
      
      if (!response.ok) {
        errors.push(`Error fetching ${pageUrl}: ${response.statusText}`);
        continue;
      }

      const html = await response.text();
      const text = extractTextFromHtml(html);
      const chunks = chunkText(text, 500, 50);

      // Obtener chunks existentes para este source_url
      const { data: existingChunks, error: dbError } = await supabase
        .from('tito_knowledge_chunks')
        .select('id, content')
        .eq('source_url', source);

      if (dbError) {
        errors.push(`Error consultando BD para ${source}: ${dbError.message}`);
        continue;
      }

      const existing = existingChunks || [];

      for (const chunk of chunks) {
        // Idempotencia: Verificar por las primeras 100 letras del contenido
        const prefix = chunk.substring(0, 100);
        const existingChunk = existing.find(e => e.content.startsWith(prefix));

        const embedding = await getEmbedding(chunk);

        if (existingChunk) {
          // Atualizar
          await supabase.from('tito_knowledge_chunks').update({
            content: chunk,
            embedding: embedding,
            updated_at: new Date().toISOString()
          }).eq('id', existingChunk.id);
        } else {
          // Insertar
          await supabase.from('tito_knowledge_chunks').insert({
            source_url: source,
            content: chunk,
            embedding: embedding
          });
        }
        totalChunks++;
      }
      
      indexedCount++;

    } catch (err: any) {
      errors.push(`Excepción procesando ${source}: ${err.message}`);
    }
  }

  return new Response(JSON.stringify({
    indexed: indexedCount,
    chunks_total: totalChunks,
    errors: errors.length > 0 ? errors : undefined
  }), { 
    status: 200, 
    headers: { 'Content-Type': 'application/json' }
  });
};
