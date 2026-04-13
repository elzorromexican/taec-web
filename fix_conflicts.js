const fs = require('fs');

// 1. Fix diagnostico-lead.ts
let diagContent = fs.readFileSync('astro-web/src/pages/api/diagnostico-lead.ts', 'utf8');
diagContent = diagContent.replace(/<<<<<<< HEAD\n\s*const axisLabels = \{[\s\S]*?=======\n([\s\S]*?)>>>>>>> origin\/main/g, '$1');
diagContent = diagContent.replace(/<<<<<<< HEAD\n\s*\/\/ Categorización Semáforo\n[\s\S]*?=======\n([\s\S]*?)>>>>>>> origin\/main/g, '$1');
// The second emailHtml block uses `scores.` so we can remove it with regex specifically searching for it.
diagContent = diagContent.replace(/\s*const emailHtml = '<div style="font-family: Arial, sans-serif;[\s\S]*?\(scores\.lms_agil[\s\S]*?\/\/ 2\. Envío al Usuario Prospecto \(quien hizo la prueba\) - EL "HORÓSCOPO" DETALLADO\n{0,2}/g, '');
fs.writeFileSync('astro-web/src/pages/api/diagnostico-lead.ts', diagContent);

// 2. Fix ChatAgent.tsx
let chatContent = fs.readFileSync('astro-web/src/components/chat/ChatAgent.tsx', 'utf8');
// Take origin/main version which uses sendMessage
chatContent = chatContent.replace(/<<<<<<< HEAD\n[\s\S]*?=======\n([\s\S]*?)>>>>>>> origin\/main/g, '$1');
fs.writeFileSync('astro-web/src/components/chat/ChatAgent.tsx', chatContent);

// 3. Fix agente-ia.ts
let agentContent = fs.readFileSync('astro-web/src/pages/api/agente-ia.ts', 'utf8');
// Conflict 1: Keep gibberishGuard
agentContent = agentContent.replace(/<<<<<<< HEAD\nimport \{ extractLeadSignalsConIA \} from '\.\.\/\.\.\/lib\/tito\/signalExtractor';\nimport \{ gibberishGuard \} from '\.\.\/\.\.\/lib\/tito\/titoAnalytics';\n=======\n\n>>>>>>> origin\/main/g, "import { gibberishGuard } from '../../lib/tito/titoAnalytics';\n");

// Conflict 2: Take origin/main
agentContent = agentContent.replace(/<<<<<<< HEAD\n\s*let prospectName = '';\n\s*let prospectCompany = '';\n\s*if \(sessionId !== 'anonymous-session'\) {\n=======\n([\s\S]*?)>>>>>>> origin\/main/g, '$1');

// Conflict 3: Take origin/main
agentContent = agentContent.replace(/<<<<<<< HEAD\n→ Responde: "Para este tipo de proyecto, el dimensionamiento es muy específico\. \$\{promptContactReq\}"\n→ NO sigas haciendo preguntas técnicas\n=======\n([\s\S]*?)>>>>>>> origin\/main/g, '$1');
fs.writeFileSync('astro-web/src/pages/api/agente-ia.ts', agentContent);

console.log("Conflicts resolved.");
