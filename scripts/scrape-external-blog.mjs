import fs from 'fs';
import path from 'path';
import axios from 'axios';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

const TARGET_DIR = path.join(process.cwd(), 'astro-web', 'src', 'content', 'blog');
const BASE_URL = 'https://blog.taec.com.mx';

// Slugify basico para nombres de archivo
function slugify(text) {
  return text.toString().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

async function scrapePage(page = 1) {
  const url = page === 1 ? BASE_URL : `${BASE_URL}/?paged=${page}`;
  console.log(`[+] Raspando paginación: ${url}`);
  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    
    // Asumiendo que los titulos de post estan en h2 class "entry-title" o similar con enlace "a"
    // Probablemente .type-post h2.entry-title a
    const links = [];
    $('.type-post h2.entry-title a').each((i, el) => {
      links.push($(el).attr('href'));
    });
    
    if(links.length === 0) {
      // Intento alternativo (si .type-post no funciona)
      $('article header.entry-header h2 a').each((i, el) => {
        links.push($(el).attr('href'));
      });
    }

    if(links.length === 0) {
      return false; // No more posts
    }

    for (const link of links) {
      await scrapePost(link);
    }
    
    return true; // Existen posts
  } catch (err) {
    if(err.response && err.response.status === 404) {
      return false; // Pagina no existe
    }
    console.error(`[-] Error leyendo la pagina ${page}:`, err.message);
    return false;
  }
}

async function scrapePost(url) {
  console.log(`  -> Extrayendo: ${url}`);
  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    
    // Intentar deducir la estructura comun de WordPress
    const title = $('h1.entry-title').text().trim() || $('h1').first().text().trim();
    if(!title) {
      console.log(`     (x) Omiso: Sin titulo`);
      return;
    }
    
    const dateText = $('time.entry-date.published').text().trim() || $('time').first().text().trim() || '2025';
    
    // Contenido
    let contentHtml = $('.entry-content').html();
    if(!contentHtml) {
      contentHtml = $('article').html(); // Fallback best-effort
    }
    
    if(!contentHtml) {
      console.log(`     (x) Omiso: Sin contenido entry`);
      return;
    }
    
    // Convertir a Markdown
    const markdown = turndownService.turndown(contentHtml);
    
    // Generar slug
    let slug = slugify(title);
    if(slug.length < 3) slug = `post-${Date.now()}`;
    
    // Frontmatter y contenido
    const fileContent = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${title.replace(/"/g, '\\"')}"
date: "${dateText}"
author: "TAEC"
tags: ["blog"]
---

${markdown}
`;

    fs.writeFileSync(path.join(TARGET_DIR, `${slug}.md`), fileContent, 'utf-8');
    console.log(`     (OK) Guardado: ${slug}.md`);
    
  } catch (err) {
    console.error(`  -> (x) Error en post:`, err.message);
  }
}

async function main() {
  if(!fs.existsSync(TARGET_DIR)){
    fs.mkdirSync(TARGET_DIR, {recursive: true});
  }
  
  let page = 1;
  while(true) {
    const hasMore = await scrapePage(page);
    if(!hasMore) break;
    page++;
  }
  
  console.log(`\n🎉 Extracción del Blog finalizada correctamente!`);
}

main();
