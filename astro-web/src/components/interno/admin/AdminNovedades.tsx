import React, { useState, useEffect } from 'react';
import { getSupabaseClient } from './supabaseHelper';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
  const [editingId, setEditingId] = useState<string | null>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Preparamos payload excluyendo ID e informaciones generadas
    const { id, created_at, ...payload } = formData as any;

    if (editingId) {
      const { error } = await supabase
        .from('intranet_novedades')
        .update(payload)
        .eq('id', editingId);

      if (!error) {
        setShowModal(false);
        setEditingId(null);
        setFormData({ badge_color: 'blue', orden: 10, activo: true });
        fetchNovedades();
      } else {
        alert("Error actualizando novedad: " + error.message);
      }
    } else {
      const { error } = await supabase
        .from('intranet_novedades')
        .insert([payload]);

      if (!error) {
        setShowModal(false);
        setEditingId(null);
        setFormData({ badge_color: 'blue', orden: 10, activo: true });
        fetchNovedades();
      } else {
        alert("Error creando novedad: " + error.message);
      }
    }
  };

  const openCreate = () => {
    setEditingId(null);
    setFormData({ badge_color: 'blue', orden: 10, activo: true });
    setShowModal(true);
  };

  const openEdit = (nov: Novedad) => {
    setEditingId(nov.id);
    setFormData(nov);
    setShowModal(true);
  };

  return (
    <div className="admin-tab-content">
      <div className="content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3>Gestión de Novedades (Dashboard)</h3>
        <button 
          onClick={openCreate} 
          style={{ background: '#0f172a', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
          + Nuevo Aviso
        </button>
      </div>

      {loading ? (
        <p>Cargando información...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {novedades.map(nov => (
            <div key={nov.id} style={{ border: nov.activo ? '1px solid #cbd5e1' : '1px dashed #94a3b8', borderRadius: '8px', padding: '1rem', background: nov.activo ? '#ffffff' : '#f1f5f9', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
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
                    onClick={() => openEdit(nov)}
                    style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>
                    Editar
                  </button>
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
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>{editingId ? 'Editar Aviso' : 'Crear Nuevo Aviso'}</h3>
              <button 
                type="button" 
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                }} 
                style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', lineHeight: '1' }}>
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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

              <div className="quill-container">
                <label style={{ display: 'block', fontSize: '0.9rem', margin: '1rem 0 4px 0', fontWeight: 'bold' }}>Contenido de la Novedad (WYSIWYG Real)</label>
                <div style={{ borderRadius: '6px', overflow: 'hidden', background: '#fff' }}>
                  <ReactQuill 
                    theme="snow"
                    value={formData.contenido || ''}
                    onChange={(val) => setFormData({ ...formData, contenido: val })}
                    style={{ height: '300px', marginBottom: '50px' }} // Quill needs space for the bottom toolbar/editor area
                  />
                </div>
              </div>

              <button type="submit" style={{ background: '#0f172a', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' }}>
                {editingId ? 'Guardar Cambios' : 'Publicar Aviso'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
