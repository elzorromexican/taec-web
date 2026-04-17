import { evaluateMessageForEscalation } from './astro-web/src/lib/tito/rules.ts';
console.log("Testing Handoff Trigger:");
console.log(evaluateMessageForEscalation("Quiero comprar 200 asientos para mi empresa."));
