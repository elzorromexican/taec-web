import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDir = path.join(__dirname, '../astro-web/src/content/blog');
const articlesDir = path.join(__dirname, '../astro-web/src/content/articulos');

function processDirectory(directory) {
  if (!fs.existsSync(directory)) return;
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = path.join(directory, file);
      let content = fs.readFileSync(filePath, 'utf8');

      // 1. Un-wrap clickable images: [![](...)](https://blog...) -> ![](...)
      const clickableImgRegex = /\[(\!\[[^\]]*\]\([^)]+\))\]\(https?:\/\/blog\.taec\.com\.mx[^)]+\)/gi;
      content = content.replace(clickableImgRegex, '$1');

      // 2. Un-wrap external post links: [Link Text](https://blog.taec...) -> Link Text
      const postLinkRegex = /\[([^\]]+)\]\(https?:\/\/blog\.taec\.com\.mx[^)]+\)/gi;
      content = content.replace(postLinkRegex, '$1');

      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
}

console.log('--- Iniciando limpieza de links de WordPress ---');
processDirectory(blogDir);
processDirectory(articlesDir);
console.log('--- Limpieza completada exitosamente ---');
