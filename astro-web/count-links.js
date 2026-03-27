const fs = require('fs');
const path = require('path');

function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      getFiles(path.join(dir, file), fileList);
    } else if (file.endsWith('.astro') || file.endsWith('.md')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const allFiles = [...getFiles('src/pages'), ...getFiles('src/components'), ...getFiles('src/layouts')];
let externalLinks = 0;
let internalLinks = 0;
let mailtoLinks = 0;
let telLinks = 0;

for (const f of allFiles) {
  const content = fs.readFileSync(f, 'utf8');
  
  const hrefRegex = /href=["'{]([^\"'}]+)["']/g;
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    let link = match[1];
    
    // Some links look like: r('/contacto') -> we extract /contacto
    if (link.startsWith('r(')) {
        link = link.replace(/r\(['"]([^'"]+)['"]\)/, '$1');
    }
    // Some use getBookingUrl('vyond')
    if (link.startsWith('getBookingUrl')) {
        externalLinks++; continue; // Maps to Zoho
    }
    
    if (link.startsWith('http://') || link.startsWith('https://') || link.includes('zohobookings')) {
      externalLinks++;
    } else if (link.startsWith('mailto:')) {
      mailtoLinks++;
    } else if (link.startsWith('tel:')) {
      telLinks++;
    } else {
      internalLinks++;
    }
  }
}

console.log('--- Resumen de Enlaces en el Codigo ---');
console.log('Externos (https://, Zoho): ' + externalLinks);
console.log('Internos (/ruta, #ancla): ' + internalLinks);
console.log('Correos (mailto:): ' + mailtoLinks);
console.log('Telefonos (tel:): ' + telLinks);
console.log('Archivos analizados: ' + allFiles.length);
