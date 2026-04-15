import React, { useState } from 'react';
import AdminNovedades from './AdminNovedades';
import AdminPlaybooks from './AdminPlaybooks';

export default function AdminUI({
  supabaseUrl,
  supabaseKey,
  accessToken
}: {
  supabaseUrl: string;
  supabaseKey: string;
  accessToken: string;
}) {
  const [activeTab, setActiveTab] = useState<'novedades' | 'playbooks'>('novedades');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* TABS NAVIGATION */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', gap: '1rem' }}>
        <button
          onClick={() => setActiveTab('novedades')}
          style={{
            background: 'transparent',
            border: 'none',
            padding: '0.75rem 0',
            cursor: 'pointer',
            fontSize: '1.05rem',
            fontWeight: activeTab === 'novedades' ? 'bold' : 'normal',
            color: activeTab === 'novedades' ? 'var(--navy-slate)' : '#64748b',
            borderBottom: activeTab === 'novedades' ? '2px solid var(--navy-slate)' : '2px solid transparent',
            outline: 'none'
          }}
        >
          Novedades del Dashboard
        </button>
        <button
          onClick={() => setActiveTab('playbooks')}
          style={{
            background: 'transparent',
            border: 'none',
            padding: '0.75rem 0',
            cursor: 'pointer',
            fontSize: '1.05rem',
            fontWeight: activeTab === 'playbooks' ? 'bold' : 'normal',
            color: activeTab === 'playbooks' ? 'var(--navy-slate)' : '#64748b',
            borderBottom: activeTab === 'playbooks' ? '2px solid var(--navy-slate)' : '2px solid transparent',
            outline: 'none'
          }}
        >
          Metadatos de Playbooks
        </button>
      </div>

      {/* TAB CONTENT */}
      <div>
        {activeTab === 'novedades' && (
          <AdminNovedades supabaseUrl={supabaseUrl} supabaseKey={supabaseKey} accessToken={accessToken} />
        )}
        {activeTab === 'playbooks' && (
          <AdminPlaybooks supabaseUrl={supabaseUrl} supabaseKey={supabaseKey} accessToken={accessToken} />
        )}
      </div>

    </div>
  );
}
