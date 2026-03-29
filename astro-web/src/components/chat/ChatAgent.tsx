import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

import { useStore } from '@nanostores/react';
import { chatCategoryRules } from '../../data/chatContextRules';
import { 
  isOpenStore, 
  isExpandedStore, 
  hasStartedStore, 
  userDataStore, 
  messagesStore,
  hasFetchedGeoStore,
  lastGreetedCategoryStore,
  hasUnreadMessagesStore
} from '../../stores/chatStore';

export default function ChatAgent() {
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => setIsHydrated(true), []);

  const isOpen = useStore(isOpenStore);
  const isExpanded = useStore(isExpandedStore);
  const hasStarted = useStore(hasStartedStore);
  const userData = useStore(userDataStore);
  const messages = useStore(messagesStore);
  const hasFetchedGeo = useStore(hasFetchedGeoStore);
  const lastCategory = useStore(lastGreetedCategoryStore);
  const hasUnread = useStore(hasUnreadMessagesStore);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const endRef = useRef<HTMLDivElement>(null);
  const inputChatRef = useRef<HTMLInputElement>(null);
  const inputNameRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Capturar Geolocalización silenciosamente al cargar el chat
  useEffect(() => {
    if (!hasFetchedGeo) {
      fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(res => res.json())
        .then(data => {
          userDataStore.set({
            ...userDataStore.get(), 
            location: `${data.city}, ${data.country}`,
            countryCode: data.country_code
          });
          hasFetchedGeoStore.set(true);
        })
        .catch(() => console.warn('Geolocalización bloqueada por red o adblocker.'));
    }
  }, [hasFetchedGeo]);

  // Aseguramos que el correo se envíe SIEMPRE cuando se cierre la pestaña
  const stateRef = useRef({ messages, userData, isSendingEmail });
  useEffect(() => {
    stateRef.current = { messages, userData, isSendingEmail };
  }, [messages, userData, isSendingEmail]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const { messages, userData, isSendingEmail } = stateRef.current;
      if (userData.email && !isSendingEmail) {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const localTime = new Date().toLocaleString('es-MX', { timeZone });
        fetch('/api/send-transcript', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            userData, 
            messages, 
            metadata: { 
              time: localTime, 
              timeZone,
              url: window.location.href 
            } 
          }),
          keepalive: true
        }).catch(() => {});
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Auto-focus en el formulario al abrir
  useEffect(() => {
    if (isOpen && !hasStarted && window.innerWidth > 768) {
      setTimeout(() => inputNameRef.current?.focus(), 150);
    }
  }, [isOpen, hasStarted]);

  // Auto-focus en el chat cuando ya inició
  useEffect(() => {
    if (isOpen && hasStarted && window.innerWidth > 768) {
      setTimeout(() => inputChatRef.current?.focus(), 150);
    }
  }, [isOpen, hasStarted]);

  const toggleChat = () => {
    if (isOpen && hasStarted && !isSendingEmail && messages.length > 1) {
      sendSilentEmail();
    }
    isOpenStore.set(!isOpen);
    if (!isOpen && hasUnreadMessagesStore.get()) {
      hasUnreadMessagesStore.set(false);
    }
  };

  const startChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData.name || !userData.email) return;

    hasStartedStore.set(true);
    
    if (messages.length > 0) return;

    const path = window.location.pathname.toLowerCase();
    let currentCategory = 'general';

    // Motor de mapeo de RUTAS vs REGLAS (del archivo TS global)
    for (const [key, rule] of Object.entries(chatCategoryRules)) {
      if (key !== 'general' && rule.paths.some(p => path.includes(p))) {
        currentCategory = key;
        break;
      }
    }

    const typeSafeKey = currentCategory as keyof typeof chatCategoryRules;
    const initialGreeting = chatCategoryRules[typeSafeKey].initialGreeting.replace('{name}', userData.name);

    lastGreetedCategoryStore.set(currentCategory);
    messagesStore.set([{ role: 'agent', text: initialGreeting }]);
  };

  // Context Hopping: Inyección proactiva de mensajes al cambiar de página navegando
  useEffect(() => {
    if (!hasStarted) return;
    if (messages.length === 0) return;

    const path = window.location.pathname.toLowerCase();
    let currentCategory = 'general';

    // Motor de salto de contextos usando la matriz global TS
    for (const [key, rule] of Object.entries(chatCategoryRules)) {
      if (key !== 'general' && rule.paths.some(p => path.includes(p))) {
        currentCategory = key;
        break;
      }
    }

    const typeSafeKey = currentCategory as keyof typeof chatCategoryRules;
    const newGreeting = chatCategoryRules[typeSafeKey].contextHop;

    // Si cambió de sección
    if (currentCategory !== 'general' && currentCategory !== lastGreetedCategoryStore.get()) {
      const lastMsg = messages[messages.length - 1];
      
      // Si el último mensaje EXACTAMENTE fue otra alerta de contexto que nuestro humano ni siquiera peló,
      // entonces lo machacamos y lo sustituimos por el nuevo paradero, para que no se apilen como spam.
      if (lastMsg && lastMsg.role === 'agent' && lastMsg.text.includes('📌 *Contexto Actualizado*')) {
        const withoutLast = messages.slice(0, -1);
        messagesStore.set([...withoutLast, { role: 'agent', text: newGreeting }]);
      } else {
        messagesStore.set([...messagesStore.get(), { role: 'agent', text: newGreeting }]);
      }
      
      lastGreetedCategoryStore.set(currentCategory);
        
      if (!isOpen) {
        hasUnreadMessagesStore.set(true);
      }
    } else if (currentCategory === 'general' && lastGreetedCategoryStore.get() !== 'general') {
       // Reset base state silence to allow hopping back later if needed
       lastGreetedCategoryStore.set('general');
    }
  }, []); // Run on mount (Page layout trigger in Astro MPAs)

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    messagesStore.set([...messagesStore.get(), { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/agente-ia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userMessage: userMsg, 
          history: messagesStore.get(),
          location: userData.location,
          countryCode: userData.countryCode
        })
      });
      
      const data = await res.json();

      if (!res.ok || data.error) {
        messagesStore.set([...messagesStore.get(), { role: 'error', text: '¡Ups! 🤖 Mis circuitos están un poco saturados en este momento y no pude procesar tu mensaje. Por favor, espera unos segundos e inténtalo de nuevo, o si prefieres, escríbele directo a nuestro equipo humano a **info@taec.com.mx** 📧.' }]);
      } else {
        messagesStore.set([...messagesStore.get(), { role: 'agent', text: data.reply }]);
      }
    } catch (error) {
      messagesStore.set([...messagesStore.get(), { role: 'error', text: '¡Vaya! 📡 Parece que hay un problema con la conexión a internet. Revisa tu red e inténtalo de nuevo.' }]);
    } finally {
      setIsLoading(false);
      if (window.innerWidth > 768) {
        setTimeout(() => inputChatRef.current?.focus(), 50);
      }
    }
  };

  const copyToClipboard = () => {
    const text = messages.map(m => `${m.role === 'user' ? 'Tú' : 'Tito Bits'}: ${m.text}`).join('\\n\\n');
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3500);
  };

  const resetChat = () => {
    if (window.confirm('🚨 ¿Seguro que deseas reiniciar el chat y borrar tu memoria de sesión?')) {
      messagesStore.set([]);
      hasStartedStore.set(false);
      lastGreetedCategoryStore.set('');
      hasUnreadMessagesStore.set(false);
      // Mantener la geolocalización viva pero vaciar la identidad
      userDataStore.set({ name: '', email: '', phone: '', location: userData.location, countryCode: userData.countryCode });
    }
  };

  const sendSilentEmail = async () => {
    setIsSendingEmail(true);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localTime = new Date().toLocaleString('es-MX', { timeZone });

    try {
      await fetch('/api/send-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userData,
          messages,
          metadata: { 
            time: localTime, 
            timeZone,
            url: window.location.href 
          }
        }),
        keepalive: true
      });
    } catch (error) {
      console.warn('Silently failed storing transcript');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const markdownStyles = {
    p: { margin: '0 0 8px 0' },
    ul: { margin: '0 0 8px 16px', padding: 0 },
    li: { margin: '4px 0' },
    strong: { color: '#004775' }
  };

  if (!isHydrated) return null; // Previene hydration mismatch en Astro SSR sin romper el conteo de Hooks

  return (
    <>
      {/* Botón Flotante */}
      <button 
        onClick={toggleChat}
        title="Hablar con Tito Bits"
        style={{
          position: 'fixed', bottom: '30px', right: '30px',
          background: '#004775', color: 'white',
          width: '65px', height: '65px', borderRadius: '50%',
          boxShadow: '0 8px 24px rgba(0,71,117,0.5)',
          border: '2px solid #fff', cursor: 'pointer', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {!isOpen && (
          <div style={{
            position: 'absolute', top: '-15px', right: '-20px',
            background: userData.countryCode === 'MX' ? '#10B981' : '#F59E0B', color: 'white', padding: '4px 8px',
            borderRadius: '12px', fontSize: '11px', fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)', animation: 'bounce 2s infinite',
            whiteSpace: 'nowrap', zIndex: 10000
          }}>
            {hasUnread ? '¡Tito tiene un mensaje nuevo! 💬' : (userData.countryCode === 'MX' ? '¡Promo MX Desbloqueada! 🇲🇽' : 'Diagnóstico de e-learning ⚡')}
          </div>
        )}
        <style dangerouslySetInnerHTML={{__html: "@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }"}} />
        
        {!isOpen ? (
          <svg viewBox="0 0 100 100" style={{width: '38px', height: '38px', fill: 'white'}}>
             <circle cx="50" cy="40" r="35" fill="none" stroke="white" strokeWidth="5"/>
             <rect x="32" y="32" width="36" height="22" rx="2" fill="white" />
             <line x1="40" y1="32" x2="35" y2="15" stroke="white" strokeWidth="4" strokeLinecap="round"/>
             <line x1="60" y1="32" x2="65" y2="15" stroke="white" strokeWidth="4" strokeLinecap="round"/>
             <path d="M38 56 L30 75 A 5 5 0 0 0 40 75 L42 56 Z" fill="white"/>
             <path d="M62 56 L70 75 A 5 5 0 0 1 60 75 L58 56 Z" fill="white"/>
             <circle cx="42" cy="43" r="5" fill="#004775" />
             <circle cx="58" cy="43" r="5" fill="#004775" />
          </svg>
        ) : (
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width:'30px', height:'30px'}}>
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>

      {/* Ventana */}
      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '110px', right: '30px',
          width: isExpanded ? '500px' : '380px', 
          height: isExpanded ? '700px' : '560px',
          maxHeight: '85vh', maxWidth: '90vw',
          background: '#fff', borderRadius: '16px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
          display: 'flex', flexDirection: 'column', zIndex: 9999,
          overflow: 'hidden', fontFamily: '"Inter", sans-serif',
          border: '1px solid #E5E7EB',
          transition: 'all 0.3s ease'
        }}>
          {/* Header */}
          <div style={{
            background: '#004775', padding: '16px', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '50%', background: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <svg viewBox="0 0 100 100" style={{width: '28px', height: '28px', fill: '#004775'}}>
                  <circle cx="50" cy="40" r="35" fill="none" stroke="#004775" strokeWidth="5"/>
                  <rect x="32" y="32" width="36" height="22" rx="2" />
                  <circle cx="42" cy="43" r="4.5" fill="white" />
                  <circle cx="58" cy="43" r="4.5" fill="white" />
                  <line x1="40" y1="32" x2="35" y2="18" stroke="#004775" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="60" y1="32" x2="65" y2="18" stroke="#004775" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M38 56 L30 75 A 5 5 0 0 0 40 75 L42 56 Z" />
                  <path d="M62 56 L70 75 A 5 5 0 0 1 60 75 L58 56 Z" />
                </svg>
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>Tito Bits</h3>
                <p style={{ margin: 0, fontSize: '12px', color: '#A8DBD9' }}>Partner IA de TAEC</p>
              </div>
            </div>
            
            <div style={{display: 'flex', gap: '8px'}}>
              <button 
                onClick={() => isExpandedStore.set(!isExpanded)} 
                style={{
                  background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', 
                  fontSize: '11px', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer'
                }}
              >
                {isExpanded ? 'Contraer 📉' : 'Expandir 📈'}
              </button>
              
              {hasStarted && (
                <button 
                  onClick={resetChat} 
                  title="Borrar memoria y reiniciar plática"
                  style={{
                    background: 'rgba(255, 59, 48, 0.15)', border: '1px solid rgba(255, 59, 48, 0.3)', color: '#FFD1D1', 
                    fontSize: '11px', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.3s'
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = 'rgba(255, 59, 48, 0.8)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(255, 59, 48, 0.15)'; e.currentTarget.style.color = '#FFD1D1'; }}
                >
                  Reiniciar ⟲
                </button>
              )}
              
              {hasStarted && messages.length > 1 && (
                <button 
                  onClick={copyToClipboard} 
                  disabled={isCopied}
                  style={{
                    background: isCopied ? '#10B981' : '#3179C2', border: 'none', color: '#fff', fontWeight: 'bold',
                    fontSize: '11px', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer',
                    transition: 'background 0.3s'
                  }}
                >
                  {isCopied ? 'Texto del chat guardado en el portapapeles ✅' : 'Copiar Chat 📋'}
                </button>
              )}
            </div>
          </div>

          {/* Body */}
          <div style={{
            flex: 1, padding: '16px', background: '#F8FAFC',
            overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px'
          }}>
            {!hasStarted ? (
              <div style={{marginTop: '20px'}}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <h4 style={{margin: '0 0 8px', color: '#004775', fontSize: '18px'}}>¡Bienvenido!</h4>
                  <p style={{margin: 0, fontSize: '14px', color: '#6B7280'}}>Para brindarte un mejor servicio, por favor indícanos quién eres.</p>
                </div>
                <form onSubmit={startChat} style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                  <input 
                    ref={inputNameRef}
                    required type="text" placeholder="Nombre completo"
                    value={userData.name} onChange={e => userDataStore.set({...userData, name: e.target.value})}
                    style={{padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px'}}
                  />
                  <input 
                    required type="email" placeholder="Correo corporativo"
                    value={userData.email} onChange={e => userDataStore.set({...userData, email: e.target.value})}
                    style={{padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px'}}
                  />
                  <input 
                    required type="tel" placeholder="Teléfono / WhatsApp" minLength={10} title="El teléfono debe tener un mínimo de 10 dígitos"
                    value={userData.phone} onChange={e => userDataStore.set({...userData, phone: e.target.value})}
                    style={{padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px'}}
                  />
                  <button type="submit" style={{
                    padding: '12px', background: '#F59E0B', color: '#fff', 
                    border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'
                  }}>
                    Comenzar chat
                  </button>
                </form>
              </div>
            ) : (
              <>
                {messages.map((m: any, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      maxWidth: '85%', padding: '12px 16px', fontSize: '14px', lineHeight: '1.5',
                      borderRadius: '12px',
                      background: m.role === 'user' ? '#3179C2' : (m.role === 'error' ? '#FEE2E2' : '#fff'),
                      color: m.role === 'user' ? '#fff' : (m.role === 'error' ? '#B91C1C' : '#111827'),
                      border: m.role === 'user' ? 'none' : (m.role === 'error' ? '1px solid #EF4444' : '1px solid #E5E7EB'),
                      borderBottomRightRadius: m.role === 'user' ? '4px' : '12px',
                      borderBottomLeftRadius: (m.role === 'agent' || m.role === 'error') ? '4px' : '12px',
                      boxShadow: (m.role === 'agent' || m.role === 'error') ? '0 2px 4px rgba(0,0,0,0.02)' : 'none'
                    }}>
                      {(m.role === 'agent' || m.role === 'error') ? (
                        <div className="react-markdown-container">
                          <ReactMarkdown components={{
                            p: ({node, ...props}) => <p style={markdownStyles.p} {...props} />,
                            ul: ({node, ...props}) => <ul style={markdownStyles.ul} {...props} />,
                            li: ({node, ...props}) => <li style={markdownStyles.li} {...props} />,
                            strong: ({node, ...props}) => <strong style={m.role === 'error' ? {color: '#B91C1C'} : markdownStyles.strong} {...props} />
                          }}>
                            {m.text}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        m.text
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{
                      padding: '12px 16px', background: '#fff', border: '1px solid #E5E7EB',
                      borderRadius: '12px', borderBottomLeftRadius: '4px', fontSize: '12px', color: '#6B7280'
                    }}>Pensando...</div>
                  </div>
                )}
                <div ref={endRef} />
              </>
            )}
          </div>

          {/* Footer Input */}
          {hasStarted && (
            <div style={{ background: '#fff', borderTop: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column' }}>
              <form onSubmit={sendMessage} style={{
                padding: '12px', display: 'flex', gap: '8px'
              }}>
                <input 
                  ref={inputChatRef}
                  type="text" 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Escribe tu mensaje..." 
                  disabled={isLoading}
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
              
              <div style={{ textAlign: 'center', paddingBottom: '10px', fontSize: '10px', color: '#9CA3AF', paddingLeft: '16px', paddingRight: '16px' }}>
                Tito Bits es una IA en entrenamiento y puede cometer errores. Por favor, consulta cualquier duda técnica o financiera con tu Asesor de Ventas.
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
