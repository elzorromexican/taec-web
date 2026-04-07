import React, { useState, useEffect } from 'react';
import { getSupabaseClient } from './supabaseHelper';

type Novedad = {
  id: string;
  badge_text: string;
  badge_color: string;
  titulo: string;
  contenido: string;
  fecha_display: string;
  orden: number;
  activo: boolean;
};

export default function AdminNovedades({
  supabaseUrl,
  supabaseKey,
  accessToken
}: {
  supabaseUrl: string;
  supabaseKey: string;
  accessToken: string;
}) {
  const [novedades, setNovedades] = useState<Novedad[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<Novedad>>({
    badge_color: 'blue',
    orden: 10,
    activo: true,
  });

  const supabase = getSupabaseClient(supabaseUrl, supabaseKey, accessToken);

  const fetchNovedades = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('intranet_novedades')
      .select('*')
      .order('orden', { ascending: true })
      .order('created_at', { ascending: false });

    if (!error && data) {
      setNovedades(data);
    } else {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNovedades();
  }, []);

  const toggleActivo = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from('intranet_novedades')
      .update({ activo: !current })
      .eq('id', id);
    if (!error) {
      fetchNovedades();
    } else {
      alert("Error actualizando registro");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('intranet_novedades')
      .insert([{ ...formData }]);
    if (!error) {
      setShowModal(false);
      setFormData({ badge_color: 'blue', orden: 10, activo: true });
      fetchNovedades();
    } else {
      alert("Error creando novedad: " + error.message);
    }
  };

  return (
    <div className="admin-tab-content">
      <div className="content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3>Gestión de Novedades (Dashboard)</h3>
        <button 
          onClick={() => setShowModal(true)} 
          style={{ background: '#0f172a', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
          + Nuevo Aviso
        </button>
      </div>

      {loading ? (
        <p>Cargando información...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {novedades.map(nov => (
            <div key={nov.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', background: nov.activo ? '#fff' : '#f8fafc', opacity: nov.activo ? 1 : 0.6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 'bold', background: nov.badge_color === 'orange' ? '#ffedd5' : '#dbeafe', color: nov.badge_color === 'orange' ? '#c2410c' : '#1d4ed8', marginBottom: '8px' }}>
                    {nov.badge_text}
                  </span>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>{nov.titulo}</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569' }}>{nov.fecha_display} | Orden: {nov.orden}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <button 
                    onClick={() => toggleActivo(nov.id, nov.activo)}
                    style={{ background: nov.activo ? '#ef4444' : '#10b981', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>
                    {nov.activo ? 'Desactivar' : 'Activar'}
                  </button>
                  <button 
                    onClick={async () => {
                      if(confirm('¿Eliminar definitivamente?')) {
                        await supabase.from('intranet_novedades').delete().eq('id', nov.id);
                        fetchNovedades();
                      }
                    }}
                    style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>Crear Nuevo Aviso</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>×</button>
            </div>
            
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px', fontWeight: 'bold' }}>Título</label>
                <input required type="text" value={formData.titulo || ''} onChange={e => setFormData({ ...formData, titulo: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px', fontWeight: 'bold' }}>Badge Text (Ej: Uso Interno)</label>
                  <input required type="text" value={formData.badge_text || ''} onChange={e => setFormData({ ...formData, badge_text: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px', fontWeight: 'bold' }}>Badge Color</label>
                  <select value={formData.badge_color} onChange={e => setFormData({ ...formData, badge_color: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                    <option value="blue">Azul (Informativo)</option>
                    <option value="orange">Naranja (Importante)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px', fontWeight: 'bold' }}>Fecha (Display)</label>
                  <input required type="text" placeholder="Ej: 06 Abr 2026" value={formData.fecha_display || ''} onChange={e => setFormData({ ...formData, fecha_display: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px', fontWeight: 'bold' }}>Prioridad (Orden)</label>
                  <input type="number" value={formData.orden || 10} onChange={e => setFormData({ ...formData, orden: parseInt(e.target.value) })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px', fontWeight: 'bold' }}>Contenido (Permite tags HTML básicos)</label>
                <textarea required value={formData.contenido || ''} onChange={e => setFormData({ ...formData, contenido: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', minHeight: '100px' }} />
              </div>

              <button type="submit" style={{ background: '#0f172a', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' }}>
                Publicar Aviso
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
