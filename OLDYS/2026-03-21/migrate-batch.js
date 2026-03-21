const fs = require('fs');
const path = require('path');

const pagesDir = '/Users/slimmasmoudi/taec-web/pages';
const astroPagesDir = '/Users/slimmasmoudi/taec-web/astro-web/src/pages';

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

let migrated = [];
let skipped = [];

for (const file of files) {
  const astroFile = file.replace('.html', '.astro');
  const astroPath = path.join(astroPagesDir, astroFile);
  
  if (fs.existsSync(astroPath)) {
    skipped.push(file);
    continue;
  }

  let html = fs.readFileSync(path.join(pagesDir, file), 'utf8');

  // Title
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/);
  const title = titleMatch ? titleMatch[1].trim() : 'TAEC';

  // Desc
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const description = descMatch ? descMatch[1] : '';

  // Body data
  let section = '';
  let pageData = file;
  const bodyMatch = html.match(/<body([^>]+)>/i);
  if(bodyMatch) {
     const sectionMatch = bodyMatch[1].match(/data-section="([^"]*)"/i);
     if(sectionMatch) section = sectionMatch[1];
     const pageMatch = bodyMatch[1].match(/data-page="([^"]*)"/i);
     if(pageMatch) pageData = pageMatch[1];
  }

  // Styles
  let styles = '';
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
  let sMatch;
  while((sMatch = styleRegex.exec(html)) !== null) {
      styles += sMatch[1] + '\n';
  }

  // Scripts in head
  let extraScripts = '';
  const scriptRegex = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
  let scpMatch;
  let headEnd = html.indexOf('</head>');
  if(headEnd === -1) headEnd = html.indexOf('<body');
  
  while((scpMatch = scriptRegex.exec(html)) !== null) {
      if (scpMatch[1].includes('nav.js')) continue;
      // Fetch scripts from head section
      if (scpMatch.index < headEnd) {
          let attrs = scpMatch[1];
          if(!attrs.includes('is:inline')) attrs += ' is:inline';
          extraScripts += `<script${attrs}>${scpMatch[2]}</script>\n`;
      }
  }

  // Main content
  let mainContent = '';
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  
  if (mainMatch) {
    mainContent = mainMatch[0];
  } else {
    // Fallback: extract between mobileNav and footer
    const navMatchRegex = /<nav[^>]*id="mobileNav"[^>]*>[\s\S]*?<\/nav>/i;
    const navMatch = html.match(navMatchRegex);
    let startIndex = html.indexOf('<body');
    startIndex = html.indexOf('>', startIndex) + 1;
    if (navMatch) {
        startIndex = navMatch.index + navMatch[0].length;
    }
    const footerIndex = html.indexOf('<footer');
    if (footerIndex > -1 && footerIndex > startIndex) {
       let content = html.substring(startIndex, footerIndex);
       content = content.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
       mainContent = `<main id="main-content">\n${content.trim()}\n</main>`;
    } else {
       mainContent = `<main id="main-content"><p>Página en construcción</p></main>`;
    }
  }

  // append wa-float
  const waMatch = html.match(/<a[^>]*class="wa-float"[^>]*>[\s\S]*?<\/a>/i);
  if(waMatch && !mainContent.includes('wa-float')) {
     mainContent += '\n' + waMatch[0];
  }

  // append sticky bar
  const stickyMatch = html.match(/<div id="[a-zA-Z0-9_-]*sticky-bar"[\s\S]*?<\/div>\r?\n?\s*<script>[\s\S]*?<\/script>/i);
  if(stickyMatch && !mainContent.includes('sticky-bar')) {
     mainContent += '\n' + stickyMatch[0];
  }

  // paths fix inside mainContent
  mainContent = mainContent.replace(/href="(?!http|mailto|tel|#|\/)([a-zA-Z0-9_-]+)\.html(#.*?)?"/g, 'href="/$1$2"');
  mainContent = mainContent.replace(/src="\.\.\/assets\//g, 'src="/assets/');
  mainContent = mainContent.replace(/href="\.\.\/assets\//g, 'href="/assets/');
  mainContent = mainContent.replace(/href="\.\.\/index\.html"/g, 'href="/"');

  let finalAstro = `---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout 
  title="${title.replace(/"/g, '&quot;')}"
  description="${description.replace(/"/g, '&quot;')}"
  section="${section}"
  page="${pageData}"
>
`;
  if (styles.trim() !== '') {
    finalAstro += `  <style is:global>\n${styles}  </style>\n\n`;
  }
  
  if (extraScripts.trim() !== '') {
    finalAstro += `  ${extraScripts}\n`;
  }

  finalAstro += `${mainContent}
</BaseLayout>
`;

  // ensure all script tags that are not already is:inline get it
  finalAstro = finalAstro.replace(/<script(?!\s+is:inline)([^>]*)>/g, '<script is:inline$1>');

  fs.writeFileSync(astroPath, finalAstro, 'utf8');
  migrated.push(file);
}

console.log('Migrated (' + migrated.length + ' files):');
console.log(migrated.join(', '));
console.log('Skipped (' + skipped.length + ') -> already migrated.');
