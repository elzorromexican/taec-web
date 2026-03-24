import React, { useState, useEffect } from 'react';

interface PortfolioItem {
  Software: string;
  Industria: string;
  Tipo: string;
  "Nombre del Curso": string;
  "URL del Demo": string;
}

export default function PortfolioDynamicGrid() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("Todos");
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    // Aquí el usuario cambiará el endpoint por el de su Google Apps Script, 
    // pero temporalmente leemos el CSV limpio generado.
    const endpoint = '/data/demos_publicos.csv';

    fetch(endpoint)
      .then(res => res.text())
      .then(csv => {
        // Parseador CSV nativo simple para evitar crash de Vite/CJS
        const lines = csv.split('\n').filter(line => line.trim() !== '');
        if (lines.length > 1) {
          const headers = lines[0].split(',').map(h => h.trim());
          const data = lines.slice(1).map(line => {
            const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            return headers.reduce((obj: any, header, i) => {
              obj[header] = values[i] ? values[i].replace(/^"|"$/g, '').trim() : '';
              return obj;
            }, {} as PortfolioItem);
          });
          const validData = data.filter(d => Boolean(d['URL del Demo']));
          setItems(validData);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando portafolio:", err);
        setLoading(false);
      });
  }, []);

  const types = ["Todos", ...Array.from(new Set(items.map(item => item.Tipo).filter(Boolean)))].slice(0, 8); // top 8 categories

  const filteredItems = activeFilter === "Todos" 
    ? items.slice(0, 16) // Limit to top 16 initially to not overwhelm the UI
    : items.filter(i => i.Tipo === activeFilter).slice(0, 16);

  return (
    <div className="portfolio-section">
      <div className="portfolio-header">
        <h2 className="section-title">Portafolio de Trabajo</h2>
        <p className="section-sub">Explora +120 casos de éxito reales desarrollados por TAEC.</p>
        
        {/* Capa 1: Filtros de Píldoras */}
        {loading ? (
          <p>Cargando portafolio interáctivo...</p>
        ) : (
          <div className="portfolio-filters">
            {types.map(tipo => (
              <button
                key={tipo}
                onClick={() => setActiveFilter(tipo)}
                className={`filter-pill ${activeFilter === tipo ? 'active' : ''}`}
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
            <div className="card-badge">{item.Software}</div>
            <div className="card-body">
              <h3 className="card-title">{item["Nombre del Curso"] || "Demo de Capacitación"}</h3>
              <p className="card-meta"><strong>Tipo:</strong> {item.Tipo}</p>
            </div>
            <div className="card-footer">
              <button className="btn-view" onClick={() => setActiveItem(item)}>
                Interactuar con Demo
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Capa 3: El "Teatro" interactivo (Lightbox de Consumo) */}
      {activeItem && (
        <div className="portfolio-lightbox" onClick={() => setActiveItem(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <div className="lightbox-header">
              <h3>{activeItem["Nombre del Curso"]}</h3>
              <button className="btn-close" onClick={() => setActiveItem(null)}>✕ Lector Cerrar</button>
            </div>
            <div className="lightbox-body">
              <iframe
                src={activeItem["URL del Demo"]}
                className="demo-iframe"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
