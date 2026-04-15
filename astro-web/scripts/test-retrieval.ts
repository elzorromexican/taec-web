import * as dotenv from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

// Load .env from project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, "../.env") });

process.env.SUPABASE_URL =
	process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
process.env.SUPABASE_SERVICE_ROLE_KEY =
	process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY;
process.env.TAEC_GEMINI_KEY = ""; // Force mock embeddings

import { getEmbedding, searchSimilarChunks } from "../src/lib/tito/rag.js";

const BATERIA_PRUEBAS = [
	"¿Cuánto cuesta Storyline 360 y qué incluye?",
	"Necesito traducir un curso a portugués automáticamente, ¿Reach 360 puede hacerlo?",
	"¿Vyond permite exportar a SCORM?",
	"Quiero comprar Articulate 360 para mi equipo de 5 personas. ¿Hay descuentos?",
	"¿Cuál es la diferencia principal entre Storyline 360 y Rise 360?",
	"Mi empresa necesita facturar en México con CFDI. ¿Puedo obtener factura de Vyond?",
	"¿Reach 360 incluye cursos prehechos, o solo sirve para LMS?",
	"¿Cuánto cuesta el plan Teams de Articulate y qué ventajas tiene sobre el Personal?",
	"Ya tenemos LMS corporativo, ¿se puede integrar Reach 360 con nuestro LMS, o es por separado?",
	"¿Puedo probar Vyond gratis sin meter mi tarjeta de crédito?",
];

async function runTests() {
	console.log("=========================================");
	console.log(" BATERÍA DE PRUEBAS DE RETRIEVAL (TITO)  ");
	console.log("=========================================");

	if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
		console.error(
			"❌ Faltan variables de entorno. Asegúrate de tener SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY.",
		);
		return;
	}

	let pasadas = 0;

	for (let i = 0; i < BATERIA_PRUEBAS.length; i++) {
		const q = BATERIA_PRUEBAS[i];
		console.log(`\n\n📝 Q${i + 1}: "${q}"`);
		console.log("-----------------------------------------");

		try {
			const embedding = await getEmbedding(q);
			const chunks = await searchSimilarChunks(embedding, 0.4, 3);

			if (!chunks || chunks.length === 0) {
				console.log(
					"❌ SIN RESULTADOS (Threshold muy alto o indexación vacía)",
				);
				continue;
			}

			pasadas++;
			chunks.forEach((c: any, idx: number) => {
				const metadata = c.metadata || {};
				console.log(
					`[Top ${idx + 1}] SIMILITUD: ${(c.similarity * 100).toFixed(1)}%`,
				);
				console.log(
					`> Fuente: ${metadata.source_url} | Sección: ${metadata.section_title} | Intención: ${metadata.intent_hint}`,
				);
				if (c.content.length > 200) {
					console.log(
						`> Extracto: ${c.content.substring(0, 200).replace(/\\n/g, " ")}...`,
					);
				} else {
					console.log(`> Extracto: ${c.content.replace(/\\n/g, " ")}`);
				}
			});
		} catch (e: any) {
			console.error("❌ Error en la prueba:", e.message);
		}
	}

	console.log("\n=========================================");
	console.log(
		` FIN DE LA PRUEBA - Con Resultados: ${pasadas}/${BATERIA_PRUEBAS.length}`,
	);
	console.log("=========================================");
}

runTests();
