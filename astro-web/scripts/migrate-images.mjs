import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../src/content');
const UPLOADS_DIR = path.join(__dirname, '../public/assets/uploads');

const DIRS_TO_PROCESS = [
  'blog', 'articulos', 'recursos', 'glosario', 'newsletters', 
  'comparativos', 'partners', 'casos', 'estandares', 'radar', 'quiz'
];

// Regular expressions para capturar frontmatter e imágenes
const FRONTMATTER_REGEX = /^---\n([\s\S]*?)\n---/;
const MD_IMAGE_REGEX = /!\[.*?\]\((https?:\/\/[^\)]+)\)/;
const HTML_IMAGE_REGEX = /<img[^>]+src=["'](https?:\/\/[^"']+)["'][^>]*>/i;

// Regex para limpiar restos de listas o asteriscos vacíos después de borrar la imagen
const EMPTY_LIST_REGEX = /\n\s*\*\s*\n/g; 

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const dest = path.join(UPLOADS_DIR, filename);
    if (fs.existsSync(dest)) {
      return resolve(`/assets/uploads/${filename}`);
    }

    const client = url.startsWith('https') ? https : http;
    client.get(url, (response) => {
      // Manejar redirecciones (301, 302)
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadImage(response.headers.location, filename).then(resolve).catch(reject);
      }
      
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(`/assets/uploads/${filename}`);
        });
      } else {
        reject(new Error(`Fallo HTTP: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function extractAndRemoveFirstImage(content) {
  let match = content.match(MD_IMAGE_REGEX);
  
  if (!match) {
    match = content.match(HTML_IMAGE_REGEX);
  }

  if (match) {
    const fullTag = match[0];
    let url = match[1];
    
    // Remover la etiqueta de la imagen del contenido y limpiar posibles viñetas vacías
    let newContent = content.replace(fullTag, '');
    newContent = newContent.replace(EMPTY_LIST_REGEX, '\n');
    
    return { url, newContent };
  }
  return { url: null, newContent: content };
}

async function processFiles() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  for (const dirName of DIRS_TO_PROCESS) {
    const dirPath = path.join(CONTENT_DIR, dirName);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    
    if (files.length > 0) {
      console.log(`\n===========================================`);
      console.log(`Procesando colección: [${dirName}] - ${files.length} archivos`);
      console.log(`===========================================`);
    }

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      let content = fs.readFileSync(filePath, 'utf-8');

      const frontmatterMatch = content.match(FRONTMATTER_REGEX);
      if (!frontmatterMatch) {
        console.log(`[WARN] Frontmatter inválido en: ${file}`);
        continue;
      }

      const frontmatter = frontmatterMatch[1].trim();
      const bodyContent = content.slice(frontmatterMatch[0].length);
      
      // Si ya tiene la imagen registrada en Decap
      if (frontmatter.includes('\nimage: ') || frontmatter.startsWith('image: ')) {
        const { newContent } = extractAndRemoveFirstImage(bodyContent);
        if (newContent !== bodyContent) {
            const newFileContent = `---\n${frontmatter}\n---${newContent}`;
            fs.writeFileSync(filePath, newFileContent, 'utf-8');
            console.log(`[CLEANUP] Redundancia removida en ${file}`);
        }
        continue;
      }

      // Buscar si hay una imagen en el cuerpo
      const { url, newContent } = extractAndRemoveFirstImage(bodyContent);

      if (url) {
        try {
          
          let filename = url.split('/').pop().split('?')[0];
          // Quitar caracteres raros del filename
          filename = filename.replace(/[^a-zA-Z0-9.\-_]/g, '');
          
          if (!filename.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
            filename = `${file.replace('.md', '')}-${Date.now()}.jpg`; 
          } else {
            filename = `${file.replace('.md', '')}-${filename}`;
          }

          const localPath = await downloadImage(url, filename);

          // Actualizar frontmatter
          const newFrontmatter = frontmatter + `\nimage: ${localPath}\n`;
          const newFileContent = `---\n${newFrontmatter}---${newContent}`;
          
          fs.writeFileSync(filePath, newFileContent, 'utf-8');
          console.log(`[SUCCESS] Migrado: ${filename}`);
        } catch (err) {
          console.error(`[ERROR] Falló descarga en ${file}:`, err.message);
        }
      }
    }
  }
}

processFiles().then(() => console.log('\n¡Todas las carpetas migradas! 🎉')).catch(console.error);
