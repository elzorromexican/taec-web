import React, { useEffect, useState } from "react";

interface PortfolioItem {
	Software?: string;
	Industria?: string;
	Tipo: string;
	"Nombre del Curso": string;
	"URL del Demo": string;
	Thumbnail?: string;
}

export default function PortfolioDynamicGrid() {
	const [items, setItems] = useState<PortfolioItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [activeFilter, setActiveFilter] = useState<string>("Todos");
	const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

	useEffect(() => {
		// Endpoint conectado a Google Sheets en tiempo real
		const endpoint =
			"https://docs.google.com/spreadsheets/d/e/2PACX-1vQlAX64aluC1BzreG4nLQuOoCbA1M7hfef-mk1b9J1bx1_Zwfnm6_-UT46xk9mesIvrAvJdsPvaZGOb/pub?output=csv";

		fetch(endpoint)
			.then((res) => res.text())
			.then((csv) => {
				// Parseador CSV nativo simple para evitar crash de Vite/CJS
				const lines = csv.split("\n").filter((line) => line.trim() !== "");
				if (lines.length > 1) {
					const headers = lines[0].split(",").map((h) => h.trim());
					const data = lines.slice(1).map((line) => {
						const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
						return headers.reduce((obj: any, header, i) => {
							obj[header] = values[i]
								? values[i].replace(/^"|"$/g, "").trim()
								: "";
							return obj;
						}, {} as PortfolioItem);
					});
					const validData = data.filter((d) => Boolean(d["URL del Demo"]));
					setItems(validData);
				}
				setLoading(false);
			})
			.catch((err) => {
				console.error("Error cargando portafolio:", err);
				setLoading(false);
			});
	}, []);

	const types = [
		"Todos",
		...Array.from(new Set(items.map((item) => item.Tipo).filter(Boolean))),
	].slice(0, 8); // top 8 categories

	const filteredItems =
		activeFilter === "Todos"
			? items
			: items.filter((i) => i.Tipo === activeFilter);

	const isIframeable = (url: string) => {
		if (!url) return false;
		// Articulate Review bloquea activamente ser incrustado (X-Frame-Options)
		if (url.includes("360.articulate.com/review")) return false;
		// Otros dominios corporativos pueden requerir abrir por fuera
		return true;
	};

	return (
		<div className="portfolio-section">
			<div className="portfolio-header">
				<h2 className="section-title">Portafolio de Trabajo</h2>
				<p className="section-sub">
					Explora +120 casos de éxito reales desarrollados por TAEC.
				</p>

				{/* Capa 1: Filtros de Píldoras */}
				{loading ? (
					<p>Cargando portafolio interactivo...</p>
				) : (
					<div className="portfolio-filters">
						{types.map((tipo) => (
							<button
								key={tipo}
								onClick={() => setActiveFilter(tipo)}
								className={`filter-pill ${activeFilter === tipo ? "active" : ""}`}
							>
								{tipo}
							</button>
						))}
					</div>
				)}
			</div>

			{/* Capa 2: Muro de Inspiración (Grid) */}
			<div className="portfolio-grid">
				{filteredItems.map((item, i) => (
					<div className="portfolio-card" key={i}>
						{item.Thumbnail ? (
							<div
								className="card-thumbnail"
								style={{ backgroundImage: `url(${item.Thumbnail})` }}
							/>
						) : (
							<div className="card-thumbnail placeholder">
								<span className="placeholder-icon">🎥</span>
							</div>
						)}
						{item.Software && <div className="card-badge">{item.Software}</div>}
						<div className="card-body">
							<h3 className="card-title">
								{item["Nombre del Curso"] || "Demo de Capacitación"}
							</h3>
							<p className="card-meta">
								<strong>Tipo:</strong> {item.Tipo}
							</p>
						</div>
						<div className="card-footer">
							<button
								className="btn-view"
								onClick={() => {
									if (isIframeable(item["URL del Demo"])) {
										setActiveItem(item);
									} else {
										window.open(item["URL del Demo"], "_blank");
									}
								}}
							>
								{isIframeable(item["URL del Demo"])
									? "Interactuar con Demo"
									: "Abrir Curso ↗"}
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Capa 3: El "Teatro" interactivo (Lightbox de Consumo) */}
			{activeItem && (
				<div className="portfolio-lightbox" onClick={() => setActiveItem(null)}>
					<div
						className="lightbox-content"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="lightbox-header">
							<h3>{activeItem["Nombre del Curso"]}</h3>
							<div style={{ display: "flex", gap: "16px" }}>
								<button
									className="btn-close"
									onClick={() => {
										window.open(activeItem["URL del Demo"], "_blank");
										setActiveItem(null);
									}}
								>
									Abrir pantalla completa ↗
								</button>
								<button
									className="btn-close"
									onClick={() => setActiveItem(null)}
								>
									✕ Cerrar
								</button>
							</div>
						</div>
						<div className="lightbox-body">
							<iframe
								src={activeItem["URL del Demo"]}
								className="demo-iframe"
								frameBorder="0"
								allowFullScreen
								allow="autoplay; fullscreen"
								sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
