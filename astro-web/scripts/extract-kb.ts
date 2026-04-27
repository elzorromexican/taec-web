import fs from 'fs';
import path from 'path';

const kbPath = path.join(process.cwd(), 'src/data/titoKnowledgeBase.ts');
const outDir = path.join(process.cwd(), 'src/content/wiki/plataformas');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const content = fs.readFileSync(kbPath, 'utf8');

const chapters = [
  { num: '07', id: 'cap07-articulate-360-teams', title: 'ARTICULATE 360 TEAMS — SUITE CORPORATIVA DE CREACIÓN' },
  { num: '08', id: 'cap08-storyline-rise-review-reach', title: 'STORYLINE / RISE / REVIEW / REACH — ECOSISTEMA FUNCIONAL' },
  { num: '09', id: 'cap09-vyond', title: 'VYOND — COMUNICACIÓN VISUAL Y STORYTELLING' },
  { num: '10', id: 'cap10-totara-funcional', title: 'TOTARA — PLATAFORMA FUNCIONAL Y GOBIERNO LMS' },
  { num: '11', id: 'cap11-pifini-netexam', title: 'PIFINI / NETEXAM — PLATAFORMA FUNCIONAL DE ENABLEMENT' },
  { num: '12', id: 'cap12-ddc-metodologia', title: 'DDC — METODOLOGÍA INTERNA DE ENTREGA TAEC' },
  { num: '13', id: 'cap13-estandares-scorm-xapi', title: 'ESTÁNDARES DE DISTRIBUCIÓN — SCORM, xAPI Y cmi5' },
  { num: '14', id: 'cap14-troubleshooting', title: 'TROUBLESHOOTING FUNCIONAL B2B Y TRACKING' },
  { num: '15', id: 'cap15-faq', title: 'FAQ CURADA CON RESPUESTAS ANCLADAS' },
  { num: '16', id: 'cap16-instalacion-empresarial', title: 'INSTALACIÓN EMPRESARIAL, SSO, MAC Y ENTORNO CORPORATIVO' },
  { num: '17', id: 'cap17-localizacion', title: 'LOCALIZACIÓN, TRADUCCIÓN AI Y DESPLIEGUE MULTI IDIOMA' },
  { num: '18', id: 'cap18-pricing-mexico', title: 'PRICING, MÉXICO, REGLAS FISCALES Y ESCALAMIENTO COMERCIAL' },
  { num: '19', id: 'cap19-catalogo-cursos', title: 'CATÁLOGO DE CURSOS Y CAPACITACIÓN TAEC' },
  { num: '20', id: 'cap20-integridad-academica', title: 'INTEGRIDAD ACADÉMICA, AULA VIRTUAL Y SOLUCIONES COMPLEMENTARIAS' },
  { num: '21', id: 'cap21-ottolearn', title: 'OTTOLEARN — MICROLEARNING ADAPTATIVO Y GAMIFICADO' },
  { num: '22', id: 'cap22-lys', title: 'LYS — APRENDIZAJE ÁGIL POR WHATSAPP' }
];

let currentIndex = content.indexOf('==================================================\nCAPÍTULO 7');
if (currentIndex === -1) {
  console.error("Could not find chapter 7");
  process.exit(1);
}

for (let i = 0; i < chapters.length; i++) {
  const currentChapter = chapters[i];
  const nextChapter = chapters[i + 1];
  
  let nextIndex;
  if (nextChapter) {
    const nextChapterStr = parseInt(nextChapter.num).toString();
    nextIndex = content.indexOf(`==================================================\nCAPÍTULO ${nextChapterStr}`, currentIndex + 1);
  } else {
    // For the last chapter (22), look for the end marker.
    nextIndex = content.indexOf('==================================================\n\n// ══ CAPÍTULO PROMOS', currentIndex + 1);
  }

  if (nextIndex === -1) {
    console.error(`Could not find next index for chapter ${currentChapter.num}`);
    break;
  }

  let chapterContent = content.substring(currentIndex, nextIndex);

  const frontmatter = `---
capitulo: ${parseInt(currentChapter.num)}
titulo: "${currentChapter.title}"
version: "1.0"
---

`;

  fs.writeFileSync(path.join(outDir, `${currentChapter.id}.md`), frontmatter + chapterContent, 'utf8');
  console.log(`Wrote ${currentChapter.id}.md`);
  
  currentIndex = nextIndex;
}
