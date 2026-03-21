import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backupDir = path.resolve(__dirname, '../backup-neocities');
const contentDir = path.resolve(__dirname, '../astro-web/src/content');

const collections = [
  { name: 'comparativos', file: 'comparativos-taec.html' },
  { name: 'quiz', file: 'quiz-taec.html' },
];

function clean(str) {
  if (!str) return '';
  return str.replace(/"/g, '\\"').replace(/[\r\n]+/g, ' ').trim();
}

function cleanSlug(text) {
  return text.toLowerCase()
    .normalize('NFD').replace(/[\\u0300-\\u036f]/g, "") 
    .replace(/[^a-z0-9]+/g, '-') 
    .replace(/(^-|-$)+/g, ''); 
}

function processCollection(collection) {
  const filePath = path.join(backupDir, collection.file);
  if (!fs.existsSync(filePath)) {
    console.warn(`[WARN] No se encontró el HTML base de ${collection.name} en ${filePath}`);
    return;
  }
  
  const html = fs.readFileSync(filePath, 'utf8');
  const destDir = path.join(contentDir, collection.name);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  let count = 0;

  if (collection.name === 'quiz') {
    // Buscar la variable CARDS
    const match = html.match(/var CARDS = (\[.*?\]);/s);
    if (match) {
      const cards = JSON.parse(match[1]);
      cards.forEach(card => {
        const slug = `pregunta-${card.id}`;
        let md = `---\n`;
        // Guardaremos la pregunta como titulo para tener una referencia
        // pero cortaremos si es muy larga
        const shortTitle = card.q.length > 60 ? card.q.substring(0, 57) + "..." : card.q;
        md += `title: "${clean(shortTitle)}"\n`;
        md += `description: "${clean(card.q)}"\n`;
        md += `---\n\n`;
        md += `**Pregunta:** ${card.q}\n\n`;
        md += `**Respuesta:** ${card.a}\n`;
        fs.writeFileSync(path.join(destDir, `${slug}.md`), md);
        count++;
      });
    }
  } 
  else if (collection.name === 'comparativos') {
    const parts = html.split('<details class="comp-accordion"');
    const items = parts.slice(1);
    items.forEach((item, idx) => {
      const fullHtml = '<details class="comp-accordion"' + item.split('</details>')[0] + '</details>';
      
      const titleMatch = fullHtml.match(/<span class="comp-summary-title">([^<]+)<\/span>/);
      const title = titleMatch ? titleMatch[1].trim() : `comparativo-${idx}`;
      
      const dateMatch = fullHtml.match(/<span class="comp-summary-date">([^<]+)<\/span>/);
      const date = dateMatch ? dateMatch[1].trim() : '';

      const descMatch = fullHtml.match(/<p class="comp-summary-desc">([^<]+)<\/p>/);
      const desc = descMatch ? descMatch[1].trim() : '';

      const tableMatch = fullHtml.match(/<div class="comp-body">([\s\S]*?)<\/div>\s*<\/details>/);
      const tableHtml = tableMatch ? tableMatch[1].trim() : '';

      const slug = cleanSlug(title);
      let md = `---\n`;
      md += `title: "${clean(title)}"\n`;
      md += `description: "${clean(desc)}"\n`;
      if (date) md += `date: "${clean(date)}"\n`;
      md += `---\n\n`;
      md += tableHtml + '\n';
      fs.writeFileSync(path.join(destDir, `${slug}.md`), md);
      count++;
    });
  }

  console.log(`[OK] Colección '${collection.name}': procesados ${count} archivos .md.`);
}

collections.forEach(processCollection);
console.log('Migración de quiz y comparativos finalizada.');
