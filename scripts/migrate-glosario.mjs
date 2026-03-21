import fs from 'fs';
import path from 'path';

async function migrate() {
  console.log("Iniciando migración de Glosario de Neocities a Markdown...");
  const htmlObj = await fetch("https://taec-elearning.neocities.org/glosario-taec.html");
  const html = await htmlObj.text();
  
  const outDir = path.join(process.cwd(), 'astro-web', 'src', 'content', 'glosario');
  fs.mkdirSync(outDir, { recursive: true });

  const articleRegex = /<article class="term-card"[\s\S]*?<\/article>/g;
  const nameRegex = /<div class="term-name">([\s\S]*?)<\/div>/;
  const catRegex = /<div class="term-cat">([\s\S]*?)<\/div>/;
  const defRegex = /<div class="term-def">([\s\S]*?)<\/div>/;
  const relatedRegex = /<div class="term-related">Ver también:\s*([\s\S]*?)<\/div>/;

  const matches = [...html.matchAll(articleRegex)];
  console.log(`Encontrados ${matches.length} términos.`);
  
  let validCount = 0;

  for (const match of matches) {
    const articleHtml = match[0];
    const nameMatch = articleHtml.match(nameRegex);
    const catMatch = articleHtml.match(catRegex);
    const defMatch = articleHtml.match(defRegex);
    const relatedMatch = articleHtml.match(relatedRegex);

    if (!nameMatch || !defMatch) continue;

    validCount++;
    const title = nameMatch[1].trim();
    const def = defMatch[1].trim();
    const cat = catMatch ? catMatch[1].trim() : '';
    let relatedArr = [];
    if (relatedMatch) {
       relatedArr = relatedMatch[1].split(';').map(s => s.trim()).filter(Boolean);
    }

    // Generate slug
    const slug = title.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Format frontmatter
    let relatedYaml = '';
    if (relatedArr.length > 0) {
      relatedYaml = `\nrelated:\n` + relatedArr.map(r => `  - "${r.replace(/"/g, '\\"')}"`).join('\n');
    }

    const mdContent = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${def.replace(/"/g, '\\"')}"
category: "${cat.replace(/"/g, '\\"')}"${relatedYaml}
---
`;

    fs.writeFileSync(path.join(outDir, `${slug}.md`), mdContent);
  }
  console.log(`Migración completada. Generados ${validCount} archivos Markdown en src/content/glosario.`);
}

migrate();
