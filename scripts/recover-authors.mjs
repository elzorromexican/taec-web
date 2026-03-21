import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Obtenemos los archivos eliminados del commit específico (antes de ser borrados)
// Primero averiguamos en qué commit estaban. Usaremos el archivo de deleted_files si aún existe o lo sacaremos de HEAD~3.
let deletedFilesTxt = '';
try {
  deletedFilesTxt = execSync(`git diff-tree --no-commit-id --name-status -r HEAD~3 | grep '^D' | awk '{print $2}'`).toString('utf8');
} catch(e) {
  console.log("Git error:", e.message);
}

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
    // Leemos el fantasma borrado desde el historial de GIT (HEAD~4 ya que HEAD~3 es donde se borraron)
    // Usaremos HEAD~4 para asegurar su existencia.
    const oldContent = execSync(`git show HEAD~4:"${df}"`).toString('utf8');
    const titleMatch = oldContent.match(/title:\s*["']?(.+?)["']?$/m);
    if (!titleMatch) continue;
    
    // Extraer author: "name"
    const authorMatch = oldContent.match(/author:\s*["']([^"']+)["']/);
    if (authorMatch && authorMatch[1].trim() !== '') {
        const authorName = authorMatch[1].trim();
        const normTitle = normalizeTitle(titleMatch[1]);
        const realPath = realTitleMap.get(normTitle);
        
        if (realPath) {
          let realContent = fs.readFileSync(realPath, 'utf8');
          // Reemplazamos author: "TAEC" por el real
          const newContent = realContent.replace(/author:\s*["']TAEC["']/, `author: "${authorName}"`);
          if (realContent !== newContent) {
            fs.writeFileSync(realPath, newContent, 'utf8');
            recoveredCount++;
            console.log(`Recovered author for: ${normTitle} ->`, authorName);
          }
        }
    }
  } catch (err) {
    // Callar errores no críticos
  }
}

console.log(`\nAutores verdaderos reimplantados en ${recoveredCount} archivos.`);
