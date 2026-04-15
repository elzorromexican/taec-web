import * as dotenv from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, "../.env") });

// Setup globals before import
process.env.SITE_URL = "http://localhost:4322";
process.env.SITE_URL = "http://localhost:4322";
process.env.TITO_INDEX_SECRET = process.env.TITO_INDEX_SECRET || "localtest";
process.env.SUPABASE_URL =
	process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
process.env.SUPABASE_SERVICE_ROLE_KEY =
	process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY;
process.env.TAEC_GEMINI_KEY = ""; // Force mock embeddings

async function run() {
	console.log("Triggering Index API...");

	const { GET } = await import("../src/pages/api/tito-index.ts");
	const fakeRequest = new Request("http://localhost/api/tito-index", {
		headers: {
			authorization: `Bearer ${process.env.TITO_INDEX_SECRET}`,
		},
	});

	try {
		const res = await GET({ request: fakeRequest } as any);
		const json = await res.json();
		console.log("Result:", json);
	} catch (e) {
		console.error("Error executing index trigger", e);
	}
}

run();
