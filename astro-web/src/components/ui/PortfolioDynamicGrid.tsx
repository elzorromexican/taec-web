import React, { useState } from "react";

interface PortfolioItem {
	Software?: string;
	Industria?: string;
	Tipo: string;
	"Nombre del Curso": string;
	"URL del Demo": string;
	Thumbnail?: string;
}

const DEMOS: PortfolioItem[] = [
  { Tipo: "Interactivo", "Nombre del Curso": "Interactivo mograph", "URL del Demo": "https://360.articulate.com/review/content/e962c265-1806-42dd-94bd-aa333a4c47bb/review" },
  { Tipo: "Interactivo", "Nombre del Curso": "Interactivo con animación 2D", "URL del Demo": "https://360.articulate.com/review/content/7d518f0a-a43b-4ec5-9e85-70d5c930e16e/review" },
  { Tipo: "Gamificado", "Nombre del Curso": "Gamificado", "URL del Demo": "https://360.articulate.com/review/content/c0445a4b-3851-4eff-890c-99e8e4198d33/review" },
  { Tipo: "Microlearning", "Nombre del Curso": "Microlearning Responsive Mobile", "URL del Demo": "https://share.articulate.com/JQxr3A_YDn-jGIVQ8jDxi" },
  { Tipo: "IA", "Nombre del Curso": "Curso con IA de Rise — generado con prompt", "URL del Demo": "https://share.articulate.com/5cs6pmkDlsg2xb8BxkiJ2" },
  { Tipo: "IA", "Nombre del Curso": "Curso con IA de Rise — guion + IA", "URL del Demo": "https://share.articulate.com/oEvXt57gjDutqPm5r1ZuW" },
];

export default function PortfolioDynamicGrid() {
	const [items, setItems] = useState<PortfolioItem[]>(DEMOS);
	const [loading, setLoading] = useState(false);
	const [activeFilter, setActiveFilter] = useState<string>("Todos");
	const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

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
					Una muestra de lo que hacemos: 6 cursos-demo con diferentes formatos y niveles de interactividad.
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
