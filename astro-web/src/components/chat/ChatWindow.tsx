import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import { chatStyles, markdownStyles } from './chatStyles';

export interface ChatWindowProps {
  isOpen: boolean;
  isExpanded: boolean;
  hasStarted: boolean;
  hasUnread: boolean;
  userData: {
    name: string;
    email: string;
    phone: string;
    location: string;
    countryCode: string;
  };
  messages: any[];
  isLoading: boolean;
  isSendingEmail: boolean;
  isCopied: boolean;
  input: string;
  chatMode: string;
  isRolloutActive: boolean;
  
  // Refs
  endRef: React.RefObject<HTMLDivElement | null>;
  inputChatRef: React.RefObject<HTMLTextAreaElement | null>;
  inputNameRef: React.RefObject<HTMLInputElement | null>;
  
  // Actions
  toggleChat: () => void;
  minimizeChat: () => void;
  closeChat: () => void;
  toggleExpand: () => void;
  resetChat: () => void;
  startChat: (e: React.FormEvent) => void;
  sendMessage: (e: React.FormEvent) => Promise<void>;
  sendExpandMessage: (msgId: string, targetId: string, lastAgentText: string) => Promise<void>;
  copyToClipboard: () => void;
  setInput: (value: string) => void;
  setUserDataName: (name: string) => void;
  handleCorrectEmail: () => void;
}

export default function ChatWindow({
  isOpen, isExpanded, hasStarted, hasUnread, userData, messages, isLoading, isSendingEmail, isCopied, input, chatMode, isRolloutActive,
  endRef, inputChatRef, inputNameRef,
  toggleChat, minimizeChat, closeChat, toggleExpand, resetChat, startChat, sendMessage, sendExpandMessage, copyToClipboard, setInput, setUserDataName, handleCorrectEmail
}: ChatWindowProps) {
  return (
    <>
      {/* Botón Flotante */}
      <button 
        onClick={toggleChat}
        title="Hablar con Tito Bits"
        style={{
          ...chatStyles.floatingButton,
          display: isOpen ? 'none' : 'flex'
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {!isOpen && (
          <div style={{
            ...chatStyles.notificationBadge,
            background: userData.countryCode === 'MX' ? '#10B981' : '#F59E0B'
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
          ...chatStyles.windowContainer,
          width: isExpanded ? 'min(95vw, 500px)' : 'min(90vw, 380px)', 
          height: isExpanded ? '80vh' : '65vh',
          maxHeight: isExpanded ? '700px' : '560px'
        }}>
          {/* Barra de título estilo Windows — colores Mac */}
          <div style={chatStyles.titleBar}>
            {/* 🔴 Cerrar */}
            <button onClick={closeChat} title="Cerrar"
              style={{ ...chatStyles.windowButton, background: '#FF5F56' }}>
              <span style={chatStyles.windowButtonIcon}>✕</span>
            </button>

            {/* 🟡 Minimizar */}
            <button onClick={minimizeChat} title="Minimizar"
              style={{ ...chatStyles.windowButton, background: '#FFBD2E' }}>
              <span style={chatStyles.windowButtonIcon}>─</span>
            </button>

            {/* 🟢 Expandir/Contraer */}
            <button onClick={toggleExpand} title={isExpanded ? 'Contraer' : 'Expandir'}
              style={{ ...chatStyles.windowButton, background: '#27C93F' }}>
              <span style={chatStyles.windowButtonIcon}>
                {isExpanded ? '⧠' : '❐'}
              </span>
            </button>
          </div>

          {/* Header */}
          <div style={chatStyles.headerContainer}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
              <div style={chatStyles.headerIconWrapper}>
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
                <h3 style={chatStyles.headerTitle}>Tito Bits</h3>
                <p style={chatStyles.headerSubtitle}>Partner IA de TAEC</p>
              </div>
            </div>
            
            <div style={chatStyles.headerControlsContainer}>
              {hasStarted && messages.length > 1 && (
                <button
                  onClick={copyToClipboard}
                  disabled={isCopied}
                  style={{
                    background: isCopied ? '#10B981' : 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.45)',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '11px',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    cursor: isCopied ? 'default' : 'pointer',
                    transition: 'background 0.2s'
                  }}
                >
                  {isCopied ? 'Copiado ✅' : 'Copiar 📋'}
                </button>
              )}
              {hasStarted && (
                <button
                  onClick={resetChat}
                  title="Reiniciar conversación"
                  style={{
                    background: 'rgba(220, 38, 38, 0.75)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '11px',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = '#dc2626'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(220, 38, 38, 0.75)'; }}
                >
                  Reiniciar ⟲
                </button>
              )}
            </div>
          </div>

          {/* Body */}
          <div style={chatStyles.chatBody}>
            {!hasStarted ? (
              <div style={chatStyles.startScreenContainer}>
                <div style={chatStyles.startScreenTextContainer}>
                  <h4 style={chatStyles.startScreenTitle}>¡Hola!</h4>
                  <p style={chatStyles.startScreenSubtitle}>Yo soy Tito Bits. ¿Con quién tengo el gusto?</p>
                </div>
                <form onSubmit={startChat} style={chatStyles.startScreenForm}>
                  <input 
                    ref={inputNameRef}
                    required type="text" placeholder="Tu nombre o empresa"
                    value={userData.name} onChange={e => setUserDataName(e.target.value)}
                    style={chatStyles.startScreenInput}
                  />
                  <button type="submit" style={chatStyles.startScreenButton}>
                    Comenzar chat
                  </button>
                </form>
              </div>
            ) : (
              <>
                {messages.filter((m: any) => !m.text.includes('[SYSTEM_HIDDEN_CONTEXT]')).map((m: any, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      ...chatStyles.messageBubble,
                      background: m.role === 'user' ? '#3179C2' : (m.role === 'error' ? '#FEE2E2' : '#fff'),
                      color: m.role === 'user' ? '#fff' : (m.role === 'error' ? '#B91C1C' : '#111827'),
                      border: m.role === 'user' ? 'none' : (m.role === 'error' ? '1px solid #EF4444' : '1px solid #E5E7EB'),
                      borderBottomRightRadius: m.role === 'user' ? '4px' : '12px',
                      borderBottomLeftRadius: (m.role === 'agent' || m.role === 'error') ? '4px' : '12px',
                      boxShadow: (m.role === 'agent' || m.role === 'error') ? '0 2px 4px rgba(0,0,0,0.02)' : 'none'
                    }}>
                      {(m.role === 'agent' || m.role === 'error') ? (
                        <div className="react-markdown-container">
                          <ReactMarkdown 
                            rehypePlugins={[rehypeSanitize]}
                            components={{
                              p: ({node, ...props}) => <p style={markdownStyles.p} {...props} />,
                              ul: ({node, ...props}) => <ul style={markdownStyles.ul} {...props} />,
                              li: ({node, ...props}) => <li style={markdownStyles.li} {...props} />,
                              strong: ({node, ...props}) => <strong style={m.role === 'error' ? {color: '#B91C1C'} : markdownStyles.strong} {...props} />,
                              a: ({node, ...props}) => <a style={{color: m.role === 'user' ? '#fff' : '#3179C2', textDecoration: 'underline', fontWeight: 'bold'}} target="_blank" rel="noopener noreferrer" {...props} />
                            }}
                          >
                            {m.text}
                          </ReactMarkdown>
                          {m.promo && (
                            <div style={chatStyles.promoContainer}>
                              <div style={chatStyles.promoBadge}>{m.promo.badgeText}</div>
                              <h4 style={chatStyles.promoTitle}>{m.promo.title}</h4>
                              <p style={chatStyles.promoDescription}>{m.promo.description}</p>
                              {m.promo.link && (
                                <a href={m.promo.link} target="_blank" rel="noopener noreferrer" style={chatStyles.promoLink}>Ver oferta →</a>
                              )}
                            </div>
                          )}
                          {isRolloutActive && m.role === 'agent' && !isLoading && !m.hasChildren && m.targetId && i === messages.filter((x:any) => !x.text.includes('[SYSTEM_HIDDEN_CONTEXT]')).length - 1 && (
                            <button
                              onClick={(e) => {
                                  e.currentTarget.disabled = true;
                                  e.currentTarget.style.opacity = '0.5';
                                  sendExpandMessage(m.id || `msg-${i}`, m.targetId, m.text);
                              }}
                              style={chatStyles.expandButton}
                              onMouseOver={e => { if (!e.currentTarget.disabled) e.currentTarget.style.background = '#EFF6FF'; }}
                              onMouseOut={e => { if (!e.currentTarget.disabled) e.currentTarget.style.background = 'none'; }}
                            >
                              + info
                            </button>
                          )}
                        </div>
                      ) : (
                        m.text
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div style={chatStyles.loadingText}>
                    TitoBits está escribiendo...
                  </div>
                )}
                {/* Spacer físico irrompible ampliado a 60px para forzar el vacío inferior */}
                <div ref={endRef} style={chatStyles.spacer} />
              </>
            )}
          </div>

          {/* Footer Input */}
          {hasStarted && (
            <div style={chatStyles.footerContainer}>
              {chatMode === 'handoff_closed' || chatMode === 'handoff_pending' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '10px' }}>
                    <button 
                         onClick={(e) => {
                             e.currentTarget.disabled = true;
                             handleCorrectEmail();
                         }} 
                         style={{...chatStyles.footerSubmitButton, background: '#004775', width: '100%', borderRadius: '4px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'}}
                     >
                        Corregir correo
                    </button>
                    <button
                        onClick={(e) => {
                            e.currentTarget.disabled = true;
                            resetChat();
                        }}
                        style={{...chatStyles.footerSubmitButton, background: '#F59E0B', width: '100%', borderRadius: '4px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'}}
                    >
                        Empezar nueva conversación
                    </button>
                </div>
              ) : (
              <form onSubmit={sendMessage} style={chatStyles.footerForm}>
                <textarea 
                  ref={inputChatRef}
                  maxLength={1000} 
                  rows={1}
                  value={input}
                  onChange={e => {
                    setInput(e.target.value);
                    e.target.style.height = 'auto'; // Reset para calcular bien
                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(e as any);
                    }
                  }}
                  placeholder="Escribe... (Shift+Enter salto línea)" 
                  disabled={isLoading}
                  style={chatStyles.footerTextarea}
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || isLoading}
                  style={{
                    ...chatStyles.footerSubmitButton,
                    background: (!input.trim() || isLoading) ? '#D1D5DB' : '#F59E0B',
                    cursor: (!input.trim() || isLoading) ? 'not-allowed' : 'pointer'
                  }}
                >
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width:'20px', height:'20px', marginLeft:'2px'}}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
              )}
              
              <div style={chatStyles.footerDisclaimer}>
                Tito Bits es una IA en entrenamiento y puede cometer errores. Por favor, consulta cualquier duda técnica o financiera con tu Asesor de Ventas.
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
