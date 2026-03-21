import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Obtenemos los archivos eliminados del log temporal
const deletedFilesTxt = fs.readFileSync('/tmp/deleted_files.txt', 'utf8');
const deletedFiles = deletedFilesTxt.split('\n').filter(f => f.trim().length > 0);

const realDir = path.join(__dirname, '../astro-web/src/content/blog');
const realFiles = fs.readdirSync(realDir).filter(f => f.endsWith('.md'));

// Función para normalizar títulos removiendo acentos y signos de puntuación
function normalizeTitle(title) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remueve acentos gráficos
    .replace(/[^\w\s]/gi, '') // Remueve cualquier sym non-word
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

// Mapear los títulos reales a sus rutas absolutas
const realTitleMap = new Map();
for (const f of realFiles) {
  const p = path.join(realDir, f);
  const content = fs.readFileSync(p, 'utf8');
  const titleMatch = content.match(/title:\s*["']?(.+?)["']?$/m);
  if (titleMatch) {
    const t = normalizeTitle(titleMatch[1]);
    realTitleMap.set(t, p);
  }
}

let recoveredCount = 0;

for (const df of deletedFiles) {
  if (!df.endsWith('.md')) continue;

  try {
    // Leemos el fantasma borrado desde el historial de GIT (HEAD~1)
    const oldContent = execSync(`git show HEAD~1:"${df}"`).toString('utf8');
    const titleMatch = oldContent.match(/title:\s*["']?(.+?)["']?$/m);
    if (!titleMatch) continue;
    
    // Extraer las etiquetas en YAML (líneas iniciando con `- "tag"`)
    const tagsMatch = oldContent.match(/tags:(.*?)(?=\n\w|$)/s);
    if (tagsMatch) {
      const tagLines = tagsMatch[1].split('\n').filter(l => l.trim().startsWith('-'));
      
      const tags = [];
      for (const l of tagLines) {
        // match limpio de la palabra entre las comillas o desnuda
        const match = l.match(/-\s*["']?([^"']+)["']?/);
        if (match && match[1]) {
          tags.push(`"${match[1].trim()}"`);
        }
      }
      
      const setTags = [...new Set(tags)];
      
      if (setTags.length > 0) {
        const normTitle = normalizeTitle(titleMatch[1]);
        const realPath = realTitleMap.get(normTitle);
        
        if (realPath) {
          let realContent = fs.readFileSync(realPath, 'utf8');
          // Reemplazamos limpiamente cualquier formación vieja en los reales
          realContent = realContent.replace(/tags:\s*\[([^\]]*)\]/, `tags: [${setTags.join(', ')}]`);
          fs.writeFileSync(realPath, realContent, 'utf8');
          recoveredCount++;
        }
      }
    }
  } catch (err) {
    // Callar errores no críticos
  }
}

console.log(`\nTags purificados y reimplantados con ruteo nativo en ${recoveredCount} archivos.`);
