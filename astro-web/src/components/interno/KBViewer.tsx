import React, { useState, useMemo, useEffect } from 'react';
import './KBViewer.css';

type KBItem = {
  id: string;
  producto?: string;
  seccion: string;
  seccion_label: string;
  seccion_color: string;
  pregunta: string;
  plus: string;
  menos: string;
  fuente?: string;
};

type Seccion = {
  id: string;
  label: string;
  color: string;
};

export default function KBViewer({ items, secciones }: { items: KBItem[], secciones: Seccion[] }) {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // Cerrar acordeones automáticamente al cambiar de filtro o buscar
  useEffect(() => {
    setExpandedId(null);
  }, [activeTab, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: prev[id] === undefined ? true : !prev[id]
    }));
  };

  const selectTab = (id: string) => {
    setActiveTab(id);
    if (id !== 'all') {
      setExpandedSections(prev => ({ ...prev, [id]: true }));
    }
  };

  const isSectionExpanded = (id: string) => {
    if (searchQuery.length > 0) return true;
    if (activeTab === id) return true;
    const val = expandedSections[id];
    // Por defecto cerrado para que funcione como acordeón doble (a menos que se busque o filtre)
    return val === undefined ? false : val;
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchTab = activeTab === 'all' || item.seccion === activeTab;
      const searchLower = searchQuery.toLowerCase();
      const matchSearch = 
        item.pregunta.toLowerCase().includes(searchLower) ||
        (item.plus && item.plus.toLowerCase().includes(searchLower)) ||
        (item.menos && item.menos.toLowerCase().includes(searchLower));
      
      return matchTab && matchSearch;
    });
  }, [items, activeTab, searchQuery]);

  return (
    <div className="kb-viewer-wrapper">
      <div className="controls">
        <div className="search-row">
          <span className="search-icon">⌕</span>
          <input 
            type="text" 
            placeholder="Buscar por tema, palabra clave, producto..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-row">
          <span className="filter-lbl">Sección</span>
          <button 
            className={`ftab ${activeTab === 'all' ? 'on' : ''}`} 
            onClick={() => selectTab('all')}
          >
            Todas
          </button>
          {secciones.map((sec: any) => (
            <button 
              key={sec.id}
              className={`ftab ${activeTab === sec.id ? 'on' : ''}`}
              onClick={() => selectTab(sec.id)}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      <div className="status-bar">
        <div className="status-count"><b>{filteredItems.length}</b> preguntas visibles</div>
        <div className="status-note">Documentación Interna · TAEC</div>
      </div>

      {secciones.map(sec => {
        const sectionItems = filteredItems.filter(item => item.seccion === sec.id);
        if (sectionItems.length === 0) return null;

        return (
          <div key={sec.id} className={`sec-group ${isSectionExpanded(sec.id) ? 'open' : ''}`}>
            <button className="sec-hdr" onClick={() => toggleSection(sec.id)}>
              <span className="sec-hdr-left">
                <span className="sec-dot" style={{ background: sec.color }}></span>
                {sec.label}
              </span>
              <span className="sec-arr">▾</span>
            </button>
            
            <div className="qa-list">
              {sectionItems.map((item, idx) => {
                const isExpanded = expandedId === item.id;
                const displayIndex = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;
                
                return (
                  <div key={item.id} className={`qi ${isExpanded ? 'open' : ''}`}>
                    <button className="qbtn" onClick={() => toggleExpand(item.id)}>
                      <span className="qn">{displayIndex}</span>
                      <span className="qt">{item.pregunta}</span>
                      <span className="qarr">▾</span>
                    </button>
                    
                    <div className="qans">
                      {item.plus && (
                        <div className="ablock aplus">
                          <span className="albl">Respuesta</span>
                          <span className="aval">{item.plus}</span>
                        </div>
                      )}
                      
                      {item.menos && (
                        <div className="ablock aminus">
                          <span className="albl">A considerar</span>
                          <span className="aval">{item.menos}</span>
                        </div>
                      )}
                      
                      {(!item.plus && !item.menos) && (
                        <div className="ablock" style={{ color: 'var(--text-faint)' }}>
                          <span>No hay notas operativas adicionales.</span>
                        </div>
                      )}
                      
                      {item.fuente && (
                        <span className="src-tag">Fuente: {item.fuente}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {filteredItems.length === 0 && (
        <div className="nores" style={{ display: 'block' }}>
          <div className="nores-icon">○</div>
          Sin resultados para esta búsqueda.
        </div>
      )}
    </div>
  );
}
