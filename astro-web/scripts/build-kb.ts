import fs from 'fs';
import path from 'path';

const kbPath = path.join(process.cwd(), 'src/data/titoKnowledgeBase.ts');
const inDir = path.join(process.cwd(), 'src/content/wiki/plataformas');

let content = fs.readFileSync(kbPath, 'utf8');

const startMarker = '==================================================\nCAPÍTULO 7';
const startIndex = content.indexOf(startMarker);

// Depending on the current file, the suffix could start with two newlines or one newline before // ══ CAPÍTULO PROMOS
let endMarker = '==================================================\n\n// ══ CAPÍTULO PROMOS';
let endIndex = content.indexOf(endMarker);
if (endIndex === -1) {
  endMarker = '==================================================\n// ══ CAPÍTULO PROMOS';
  endIndex = content.indexOf(endMarker);
}

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find start or end markers in titoKnowledgeBase.ts");
  process.exit(1);
}

const prefix = content.substring(0, startIndex);
const suffix = content.substring(endIndex);

// Read markdown files
const files = fs.readdirSync(inDir).filter(f => f.endsWith('.md')).sort();

let compiledChapters = '';

for (const file of files) {
  const filePath = path.join(inDir, file);
  const mdContent = fs.readFileSync(filePath, 'utf8');
  
  // Extract content without frontmatter
  // Frontmatter is between the first two '---'
  const parts = mdContent.split('---');
  let body = mdContent;
  if (parts.length >= 3 && parts[0].trim() === '') {
    // Has frontmatter
    body = parts.slice(2).join('---').replace(/^\n\n/, '');
  }
  
  compiledChapters += body;
  if (!body.endsWith('\n')) {
    compiledChapters += '\n';
  }
}

// Ensure the compiled chapters end with a single newline or double newline to match original formatting
// Wait, the original end marker starts with "==================================================\n\n// ══ CAPÍTULO PROMOS"
// Let's just concatenate them cleanly.
const finalContent = prefix + compiledChapters + suffix;

fs.writeFileSync(kbPath, finalContent, 'utf8');
console.log('Successfully built titoKnowledgeBase.ts');
