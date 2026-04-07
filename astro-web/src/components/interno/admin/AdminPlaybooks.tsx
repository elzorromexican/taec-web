import React, { useState, useEffect } from 'react';
import { getSupabaseClient } from './supabaseHelper';

type Playbook = {
  id_producto: string;
  familia: string;
  display_name: string;
  meta_l1: string;
  meta_v1: string;
  meta_l2: string;
  meta_v2: string;
  meta_l3: string;
  meta_v3: string;
  svg_icon: string;
  activo: boolean;
};

export default function AdminPlaybooks({
  supabaseUrl,
  supabaseKey,
  accessToken
}: {
  supabaseUrl: string;
  supabaseKey: string;
  accessToken: string;
}) {
  const [playbooks, setPlaybooks] = useState<Playbook[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPb, setSelectedPb] = useState<Playbook | null>(null);

  const supabase = getSupabaseClient(supabaseUrl, supabaseKey, accessToken);

  const fetchPlaybooks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('kb_playbooks')
      .select('*')
      .order('id_producto', { ascending: true });

    if (!error && data) {
      setPlaybooks(data);
    } else {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlaybooks();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPb) return;

    const { error } = await supabase
      .from('kb_playbooks')
      .update({
        familia: selectedPb.familia,
        meta_l1: selectedPb.meta_l1,
        meta_v1: selectedPb.meta_v1,
        meta_l2: selectedPb.meta_l2,
        meta_v2: selectedPb.meta_v2,
        meta_l3: selectedPb.meta_l3,
        meta_v3: selectedPb.meta_v3,
        svg_icon: selectedPb.svg_icon
      })
      .eq('id_producto', selectedPb.id_producto);

    if (!error) {
      setSelectedPb(null);
      fetchPlaybooks();
    } else {
      alert("Error actualizando playbook: " + error.message);
    }
  };

  return (
    <div className="admin-tab-content">
      <div className="content-header" style={{ marginBottom: '1rem' }}>
        <h3>Base de Datos de Metadatos de Playbooks</h3>
        <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Modifica las características clave y el diseño de la cabecera (Hero) para los 22 productos B2B.</p>
      </div>

      {loading ? (
        <p>Cargando información...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {playbooks.map(pb => (
            <div key={pb.id_producto} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', background: '#fff', display: 'flex', flexDirection: 'column' }}>
              <div>
                <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', background: '#f1f5f9', color: '#475569', marginBottom: '8px', textTransform: 'uppercase' }}>
                  {pb.id_producto}
                </span>
                <h4 style={{ margin: '0 0 0.25rem 0', color: '#0f172a' }}>{pb.display_name}</h4>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.8rem', color: '#64748b' }}>Familia: {pb.familia} | Ícono: {pb.svg_icon}</p>
              </div>
              <button 
                onClick={() => setSelectedPb(pb)}
                style={{ marginTop: 'auto', background: '#f8fafc', color: '#0f172a', border: '1px solid #cbd5e1', padding: '6px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' }}>
                Editar Cabecera
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedPb && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>Editar: {selectedPb.display_name}</h3>
              <button onClick={() => setSelectedPb(null)} style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>×</button>
            </div>
            
            <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px', fontWeight: 'bold' }}>Patrón de Fondo (Familia)</label>
                  <select value={selectedPb.familia} onChange={e => setSelectedPb({ ...selectedPb, familia: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                    <option value="articulate">Articulate (Grid)</option>
                    <option value="vyond">Vyond (Dots)</option>
                    <option value="lms">Plataformas LMS (Boxes)</option>
                    <option value="servicios">Add-ons y Servicios (Waves)</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px', fontWeight: 'bold' }}>Ícono Vectorial (SVG)</label>
                  <select value={selectedPb.svg_icon} onChange={e => setSelectedPb({ ...selectedPb, svg_icon: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                    <option value="clapperboard">Claqueta (Estudios/Videos)</option>
                    <option value="smartphone">Móvil / Vertical</option>
                    <option value="sparkles">Destellos (Inteligencia Artificial)</option>
                    <option value="building">Edificio / Enterprise / Plataforma</option>
                    <option value="check-circle">Check / Aprobación</option>
                    <option value="box">Caja (Genérico)</option>
                  </select>
                </div>
              </div>

              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>Metadato 1</h4>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.8rem', color: '#64748b' }}>Label (Max 15 char)</label>
                    <input type="text" value={selectedPb.meta_l1 || ''} onChange={e => setSelectedPb({ ...selectedPb, meta_l1: e.target.value })} style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px' }}/>
                  </div>
                  <div style={{ flex: 2 }}>
                    <label style={{ fontSize: '0.8rem', color: '#64748b' }}>Valor (Max 26 char)</label>
                    <input type="text" value={selectedPb.meta_v1 || ''} onChange={e => setSelectedPb({ ...selectedPb, meta_v1: e.target.value })} style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px' }}/>
                  </div>
                </div>
              </div>

              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>Metadato 2</h4>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.8rem', color: '#64748b' }}>Label</label>
                    <input type="text" value={selectedPb.meta_l2 || ''} onChange={e => setSelectedPb({ ...selectedPb, meta_l2: e.target.value })} style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px' }}/>
                  </div>
                  <div style={{ flex: 2 }}>
                    <label style={{ fontSize: '0.8rem', color: '#64748b' }}>Valor</label>
                    <input type="text" value={selectedPb.meta_v2 || ''} onChange={e => setSelectedPb({ ...selectedPb, meta_v2: e.target.value })} style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px' }}/>
                  </div>
                </div>
              </div>

              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>Metadato 3</h4>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.8rem', color: '#64748b' }}>Label</label>
                    <input type="text" value={selectedPb.meta_l3 || ''} onChange={e => setSelectedPb({ ...selectedPb, meta_l3: e.target.value })} style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px' }}/>
                  </div>
                  <div style={{ flex: 2 }}>
                    <label style={{ fontSize: '0.8rem', color: '#64748b' }}>Valor</label>
                    <input type="text" value={selectedPb.meta_v3 || ''} onChange={e => setSelectedPb({ ...selectedPb, meta_v3: e.target.value })} style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px' }}/>
                  </div>
                </div>
              </div>

              <button type="submit" style={{ background: '#0f172a', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' }}>
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
