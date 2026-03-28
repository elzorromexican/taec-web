import React, { useState, useRef, useEffect } from 'react';

export default function ChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'agent', text: string}[]>([
    { role: 'agent', text: '¡Hola! 🦊 Soy el Asesor L&D virtual de TAEC. ¿Cuál es el mayor reto de capacitación en tu empresa hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/agente-ia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: userMsg })
      });
      
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'agent', text: data.reply || data.error }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'agent', text: 'Error de conexión. Nuestros servidores están saturados, intenta en un minuto.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Botón flotante */}
      <button 
        onClick={toggleChat}
        style={{
          position: 'fixed', bottom: '24px', right: '24px',
          background: '#004775', color: 'white',
          width: '60px', height: '60px', borderRadius: '50%',
          boxShadow: '0 4px 14px rgba(0,71,117,0.4)',
          border: 'none', cursor: 'pointer', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s'
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {!isOpen ? (
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width:'30px', height:'30px'}}>
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        ) : (
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width:'30px', height:'30px'}}>
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>

      {/* Ventana de chat */}
      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '96px', right: '24px',
          width: '360px', height: '520px', maxHeight: '75vh',
          background: '#fff', borderRadius: '16px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
          display: 'flex', flexDirection: 'column', zIndex: 9999,
          overflow: 'hidden', fontFamily: '"Inter", sans-serif',
          border: '1px solid #E5E7EB'
        }}>
          {/* Header */}
          <div style={{
            background: '#004775', padding: '16px', color: 'white',
            display: 'flex', alignItems: 'center', gap: '12px'
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%', background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#004775', fontWeight: 'bold', fontSize: '13px'
            }}>AI</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Asesor L&D TAEC</h3>
              <p style={{ margin: 0, fontSize: '12px', color: '#A8DBD9' }}>En línea (Gemini Flash)</p>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, padding: '16px', background: '#F8FAFC',
            overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px'
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '85%', padding: '12px 16px', fontSize: '14px', lineHeight: '1.5',
                  borderRadius: '12px',
                  background: m.role === 'user' ? '#3179C2' : '#fff',
                  color: m.role === 'user' ? '#fff' : '#111827',
                  border: m.role === 'user' ? 'none' : '1px solid #E5E7EB',
                  borderBottomRightRadius: m.role === 'user' ? '4px' : '12px',
                  borderBottomLeftRadius: m.role === 'agent' ? '4px' : '12px',
                  boxShadow: m.role === 'agent' ? '0 2px 4px rgba(0,0,0,0.02)' : 'none'
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '12px 16px', background: '#fff', border: '1px solid #E5E7EB',
                  borderRadius: '12px', borderBottomLeftRadius: '4px',
                  display: 'flex', gap: '4px', alignItems: 'center'
                }}>
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>Pensando...</span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} style={{
            padding: '12px', background: '#fff', borderTop: '1px solid #E5E7EB',
            display: 'flex', gap: '8px'
          }}>
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..." 
              style={{
                flex: 1, padding: '10px 16px', borderRadius: '24px',
                border: '1px solid #E5E7EB', background: '#F3F4F6',
                fontSize: '14px', outline: 'none'
              }}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: (!input.trim() || isLoading) ? '#D1D5DB' : '#F59E0B',
                color: 'white', border: 'none', cursor: (!input.trim() || isLoading) ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width:'20px', height:'20px', marginLeft:'2px'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
