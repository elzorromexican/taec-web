import * as cheerio from 'cheerio';
import crypto from 'crypto';

interface ChunkMetadata {
  source_url: string;
  page_title: string;
  section_title: string;
  chunk_index: number;
  content_hash: string;
  indexed_at: string;
  source_type: string;
  intent_hint: string;
  product_hint: string;
  lang: string;
}

export interface DocumentChunk {
  content: string;
  metadata: ChunkMetadata;
}

/**
 * Extracts and semantic-chunks the HTML using cheerio
 */
export function extractSemanticChunks(html: string, url: string): DocumentChunk[] {
  const $ = cheerio.load(html);
  
  // 1. Hygiene: Remove garbage nodes
  $('nav, header, footer, script, style, noscript, svg, iframe, [id^="bar-promo"]').remove();
  
  // Retrieve Title
  const pageTitle = $('title').text().replace(/\s+/g, ' ').trim() || '';
  
  let productHint = '';
  if (url.includes('articulate')) productHint = 'articulate';
  if (url.includes('vyond')) productHint = 'vyond';

  // Find Main Container
  let $main = $('main').first();
  if ($main.length === 0) {
    $main = $('body');
  }

  const chunks: { text: string; sectionTitle: string; intentHint: string }[] = [];
  let currentSectionTitle = '';
  let currentIntentHint = 'general';

  // Basic DOM traversal to chunk by H2/H3 or generic blocks
  // Since Astro generates flat structures sometimes or nested sections, we'll iterate over elements
  $main.find('*').each((i, el) => {
    // If it's a heading, update the current section title
    if ($(el).is('h1, h2, h3, h4')) {
      currentSectionTitle = $(el).text().replace(/\s+/g, ' ').trim();
      if (currentSectionTitle.toLowerCase().includes('precio')) currentIntentHint = 'pricing';
      else if (currentSectionTitle.toLowerCase().includes('faq') || currentSectionTitle.toLowerCase().includes('preguntas')) currentIntentHint = 'faq';
      else if (currentSectionTitle.toLowerCase().includes('feature') || currentSectionTitle.toLowerCase().includes('beneficio')) currentIntentHint = 'features';
      else currentIntentHint = 'general';
    }

    // Special block 1: FAQ / Details
    if ($(el).is('details')) {
      const summary = $(el).find('summary').text().replace(/\s+/g, ' ').trim();
      const content = $(el).text().replace(/\s+/g, ' ').trim();
      if (content.length > 20) {
        chunks.push({ text: `FAQ: ${summary} - Respuesta: ${content}`, sectionTitle: currentSectionTitle, intentHint: 'faq' });
      }
      $(el).remove(); // Remove to prevent parsing its children
      return;
    }

    // Special block 2: Table
    if ($(el).is('table')) {
      const tableText = $(el).text().replace(/\s+/g, ' ').trim();
      if (tableText.length > 20) {
         chunks.push({ text: `Tabla/Comparativo: ${tableText}`, sectionTitle: currentSectionTitle, intentHint: currentIntentHint });
      }
      $(el).remove(); // Remove to prevent dups
      return;
    }

    // Typical text blocks
    if ($(el).is('p, li')) {
      // check if it's already part of a bigger block we're about to parse, 
      // actually, just extracting <p> and <li> is safe, but we can combine them.
      const text = $(el).text().replace(/\s+/g, ' ').trim();
      // Skip very short generic items
      if (text.length > 30) {
        // Do we have siblings that we can bundle?
        if ($(el).parent().is('ul, ol')) {
           // Skip direct `li` here if we prefer to bundle by `ul`
           return;
        }
        chunks.push({ text, sectionTitle: currentSectionTitle, intentHint: currentIntentHint });
      }
    }

    // Bundle UL/OL completely
    if ($(el).is('ul, ol')) {
      const listText = $(el).children('li').map((_, li) => '• ' + $(li).text().replace(/\s+/g, ' ').trim()).get().join('\n');
      if (listText.length > 20) {
        chunks.push({ text: listText, sectionTitle: currentSectionTitle, intentHint: currentIntentHint });
      }
      $(el).empty(); // Clear so li aren't double parsed
      return;
    }
  });

  // Now we might have many small chunks (e.g. adjacent <p> tags in the same section).
  // Let's bundle adjacent chunks if they share the same section title and intent hint
  // up to ~500 chars to form a cohesive DocumentChunk.
  
  const bundledChunks: DocumentChunk[] = [];
  let currentGroupText = "";
  let lastSectionTitle = "";
  let lastIntentHint = "";
  let globalChunkIndex = 0;

  for (const c of chunks) {
    if (c.sectionTitle !== lastSectionTitle || c.intentHint !== lastIntentHint || currentGroupText.length > 1000) {
      if (currentGroupText.trim() !== "") {
        const hash = crypto.createHash('sha256').update(currentGroupText).digest('hex');
        bundledChunks.push({
          content: currentGroupText.trim(),
          metadata: {
            source_url: url,
            page_title: pageTitle,
            section_title: lastSectionTitle,
            chunk_index: globalChunkIndex++,
            content_hash: hash,
            indexed_at: new Date().toISOString(),
            source_type: 'website_html',
            intent_hint: lastIntentHint,
            product_hint: productHint,
            lang: 'es'
          }
        });
      }
      currentGroupText = c.text;
      lastSectionTitle = c.sectionTitle;
      lastIntentHint = c.intentHint;
    } else {
      currentGroupText += "\n\n" + c.text;
    }
  }

  // Push remainder
  if (currentGroupText.trim() !== "") {
    const hash = crypto.createHash('sha256').update(currentGroupText).digest('hex');
    bundledChunks.push({
      content: currentGroupText.trim(),
      metadata: {
        source_url: url,
        page_title: pageTitle,
        section_title: lastSectionTitle,
        chunk_index: globalChunkIndex++,
        content_hash: hash,
        indexed_at: new Date().toISOString(),
        source_type: 'website_html',
        intent_hint: lastIntentHint,
        product_hint: productHint,
        lang: 'es'
      }
    });
  }

  return bundledChunks;
}

// -----------------------------------------
// CLI TEST BLOCK
// -----------------------------------------
if (process.argv[1] && process.argv[1].includes('test-rag-chunking')) {
  (async () => {
    const URLS_TEST = [
      'https://stellar-mermaid-3ba7f1.netlify.app/articulate-360-mexico',
      'https://stellar-mermaid-3ba7f1.netlify.app/vyond-mexico'
    ];

    for (const u of URLS_TEST) {
      console.log(`\n\n=== Probando Extracción: ${u} ===`);
      const response = await fetch(u);
      const html = await response.text();
      const chunks = extractSemanticChunks(html, u.replace('https://stellar-mermaid-3ba7f1.netlify.app', ''));
      
      console.log(`Chunks generados: ${chunks.length}`);
      // Show 2 examples
      for (let i = 0; i < Math.min(3, chunks.length); i++) {
        console.log(`\n--- CHUNK ${i} ---`);
        console.log(`[META] Section: ${chunks[i].metadata.section_title}`);
        console.log(`[META] Intent: ${chunks[i].metadata.intent_hint}`);
        console.log(`[META] Hash: ${chunks[i].metadata.content_hash}`);
        console.log(`[TEXT]\n${chunks[i].content}`);
      }
    }
  })();
}
