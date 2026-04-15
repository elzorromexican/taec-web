import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

function readDistHtml(route) {
	const file = join(process.cwd(), "dist", route, "index.html");
	if (!existsSync(file)) {
		throw new Error(`Missing built file for /${route}: ${file}`);
	}
	return readFileSync(file, "utf8");
}

function assert(condition, message) {
	if (!condition) {
		throw new Error(message);
	}
}

const clientesHtml = readDistHtml("clientes");
const nosotrosHtml = readDistHtml("nosotros");
const blogHtml = readDistHtml("blog");
const recursosHtml = readDistHtml("recursos");
const serviciosHtml = readDistHtml("servicios");

assert(
	clientesHtml.includes("Clientes y Casos de Éxito"),
	"Expected /clientes to include its own heading",
);
assert(
	!clientesHtml.includes(
		"18 años construyendo el futuro del aprendizaje corporativo",
	),
	"Expected /clientes not to contain the main /nosotros heading",
);
assert(
	nosotrosHtml.includes(
		"18 años construyendo el futuro del aprendizaje corporativo",
	),
	"Expected /nosotros to include its own heading",
);

assert(
	clientesHtml.includes('id="mobileNav"') &&
		clientesHtml.includes('id="mob0"') &&
		clientesHtml.includes('id="mob1"') &&
		clientesHtml.includes('id="mob3"'),
	"Expected built mobile nav to include the first-level accordion toggles",
);
assert(
	clientesHtml.includes("bindMobileNavAccordions") &&
		clientesHtml.includes("aria-expanded"),
	"Expected built mobile nav script to bind accordion click handlers",
);

const bookingCtaChecks = [
	{ route: "/clientes", html: clientesHtml },
	{ route: "/blog", html: blogHtml },
	{ route: "/recursos", html: recursosHtml },
	{ route: "/servicios", html: serviciosHtml },
];

for (const { route, html } of bookingCtaChecks) {
	assert(!html.includes('href=""'), `Expected no empty hrefs in ${route}`);
	if (html.includes("Agendar diagnóstico")) {
		assert(
			html.includes('href="/contacto"') || html.includes('href="https://'),
			`Expected agenda CTA in ${route} to resolve to fallback or external booking URL`,
		);
	}
}

assert(
	blogHtml.includes('id="blogGrid"') && blogHtml.includes("Blog TAEC"),
	"Expected /blog build to include the blog scaffold",
);
assert(
	recursosHtml.includes("Conocimiento práctico para") &&
		recursosHtml.includes("Agendar diagnóstico gratuito"),
	"Expected /recursos build to include the resources hub and CTA",
);
assert(
	serviciosHtml.includes("Página en construcción"),
	"Expected /servicios to remain explicitly in WIP state during development",
);

console.log("Development verification passed.");
