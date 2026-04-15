const puppeteer = require("puppeteer");
(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.on("console", (msg) =>
		console.log("BROWSER_LOG:", msg.type(), msg.text()),
	);
	page.on("pageerror", (err) => console.log("BROWSER_ERROR:", err.toString()));
	await page.goto("http://localhost:4321/diagnostico", {
		waitUntil: "networkidle0",
	});
	await browser.close();
})();
