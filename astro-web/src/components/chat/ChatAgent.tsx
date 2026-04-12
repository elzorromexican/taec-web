import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';

import { useStore } from '@nanostores/react';
import { chatCategoryRules } from '../../data/chatContextRules';
import { 
  isOpenStore, 
  isExpandedStore, 
  hasStartedStore, 
  userDataStore, 
  messagesStore,
  lastGreetedCategoryStore,
  hasUnreadMessagesStore,
  transcriptSentStore
} from '../../stores/chatStore';

export default function ChatAgent({ isApp = false, userName = '' }: { isApp?: boolean, userName?: string }) {
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => setIsHydrated(true), []);

  if (!isHydrated) return null; // Previene hydration mismatch en Astro SSR

  const isOpen = useStore(isOpenStore);
  const isExpanded = useStore(isExpandedStore);
  const hasStarted = useStore(hasStartedStore);
  const userData = useStore(userDataStore);
  const messages = useStore(messagesStore);
  const lastCategory = useStore(lastGreetedCategoryStore);
  const hasUnread = useStore(hasUnreadMessagesStore);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [activePromo, setActivePromo] = useState<any>(null);
  
  const endRef = useRef<HTMLDivElement>(null);
  const inputChatRef = useRef<HTMLTextAreaElement>(null);
  const inputNameRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const prevIsOpen = useRef(isOpen);

  // Cargar Geopromos silenciosamente al inicio
  useEffect(() => {
    fetch(`/api/get-promo?path=${encodeURIComponent(window.location.pathname)}`)
      .then(res => res.json())
      .then(data => {
         if (data.promo) setActivePromo(data.promo);
      })
      .catch(() => {});
  }, []);

  // Auto-scroll garantizado hacia el último mensaje usando la API nativa
  useEffect(() => {
    if (isOpen && endRef.current) {
      // Timeout corto para permitir que el motor de React/Markdown termine de pintar el DOM y calcular la altura de los textos
      setTimeout(() => {
        try {
          endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        } catch(e) { /* fallback ignorado */ }
      }, 150);
    }
    prevIsOpen.current = isOpen;
  }, [messages, isLoading, isOpen]);

  // Geolocalización y dependencias a terceros (GeoJS) ELIMINADAS. 
  // Ahora la Geo se maneja privada y silenciosamente en el Serverless Edge de Netlify vía `x-nf-country`.

  // Aseguramos que el correo se envíe SIEMPRE cuando se cierre la pestaña
  const stateRef = useRef({ messages, userData, isSendingEmail });
  useEffect(() => {
    stateRef.current = { messages, userData, isSendingEmail };
  }, [messages, userData, isSendingEmail]);

  // Si estamos en la Intranet (isApp), hacemos bypass del onboarding
  useEffect(() => {
    if (isApp && userName && !hasStarted && messages.length === 0) {
      userDataStore.set({ ...userDataStore.get(), name: userName });
      hasStartedStore.set(true);
      messagesStore.set([{ 
        role: 'agent', 
        text: `Hola ${userName}, ¿en qué te puedo ayudar?`,
        promo: activePromo 
      }]);
    }
  }, [isApp, userName, activePromo]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Enviar siempre que haya más de un mensaje (el saludo inicial de la IA + la primera interacción del usuario)
      if (!isSendingEmail && !transcriptSentStore.get() && messages.length > 1) {
        transcriptSentStore.set(true);
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

  // Timer de Inactividad de 15 minutos (900,000 ms) para asegurar el envío de leads abandonados
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (messages.length > 1 && hasStarted && !transcriptSentStore.get() && !isSendingEmail) {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      
      inactivityTimerRef.current = setTimeout(() => {
        if (!transcriptSentStore.get()) {
          console.log('[TitoBits] 15 minutos de inactividad detectados. Disparando email de respaldo automágicamente...');
          transcriptSentStore.set(true);
          // Necesitamos usar la ref del estado actual para no atrapar hooks desactualizados en el closure del timeout
          const currentState = stateRef.current;
          const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          const localTime = new Date().toLocaleString('es-MX', { timeZone });
          fetch('/api/send-transcript', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userData: currentState.userData,
              messages: currentState.messages,
              metadata: { time: localTime, timeZone, url: window.location.href, reason: '15m_timeout_inactivity' }
            }),
            keepalive: true
          }).catch(() => {});
        }
      }, 15 * 60 * 1000); // 15 minutos
    }

    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [messages, hasStarted, isSendingEmail]);

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

  // Manejo de Inyección desde el Diagnóstico de Aprendizaje
  useEffect(() => {
    const handleDiagnosticContext = (e: any) => {
      const { email, diagnosticResult, prompt } = e.detail;
      
      // Configuramos la identidad
      const aliasName = email.split('@')[0];
      userDataStore.set({ ...userDataStore.get(), email, name: aliasName });
      
      // Forzamos la apertura e inicio del chat
      hasStartedStore.set(true);
      isOpenStore.set(true);
      hasUnreadMessagesStore.set(false);
      
      // Inyectamos el contexto como si fuera un mensaje del usuario (invisible) 
      // y la primera respuesta de TitoBits (visible).
      messagesStore.set([
        { role: 'user', text: `[SYSTEM_HIDDEN_CONTEXT]\n${prompt}\n[/SYSTEM_HIDDEN_CONTEXT]` },
        { 
          role: 'agent', 
          text: `¡Hola ${aliasName}! Soy Tito Bits, Partner IA de TAEC. Acabo de procesar tu Diagnóstico y evaluar tus resultados para **${diagnosticResult}**.\n\nHe leído en las respuestas anteriores los retos específicos que tienes en tu operación. Como siguiente paso, ¿podrías confirmarme aproximadamente cuántos usuarios (empleados/clientes) usarían la plataforma en el primer año para poder dimensionar la arquitectura?` 
        }
      ]);
    };

    window.addEventListener('OpenTitoDiagnostic', handleDiagnosticContext);
    return () => window.removeEventListener('OpenTitoDiagnostic', handleDiagnosticContext);
  }, []);

  const toggleChat = () => {
    if (isOpen && hasStarted && !isSendingEmail && messages.length > 1 && !transcriptSentStore.get()) {
      transcriptSentStore.set(true);
      sendSilentEmail();
    }
    isOpenStore.set(!isOpen);
    if (!isOpen && hasUnreadMessagesStore.get()) {
      hasUnreadMessagesStore.set(false);
    }
  };

  const startChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData.name) return;

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
    messagesStore.set([{ role: 'agent', text: initialGreeting, promo: activePromo }]);
  };

  // Context Hopping: Inyección proactiva de mensajes al SPA Navigation 
  useEffect(() => {
    const handleContextHop = () => {
      if (!hasStartedStore.get()) return;
      const currentMessages = messagesStore.get();
      if (currentMessages.length === 0) return;

      const path = window.location.pathname.toLowerCase();
      let currentCategory = 'general';

      for (const [key, rule] of Object.entries(chatCategoryRules)) {
        if (key !== 'general' && rule.paths.some(p => path.includes(p))) {
          currentCategory = key;
          break;
        }
      }

      const typeSafeKey = currentCategory as keyof typeof chatCategoryRules;
      const newGreeting = chatCategoryRules[typeSafeKey].contextHop;

      if (currentCategory !== 'general' && currentCategory !== lastGreetedCategoryStore.get()) {
        const lastMsg = currentMessages[currentMessages.length - 1];
        
        let promoToInject = null;
        if (activePromo) {
           const promosShown = messagesStore.get().filter(m => m.promo).length;
           const isProductMatch = activePromo.urlTrigger && path.includes(activePromo.urlTrigger);
           if (isProductMatch || promosShown < 2) {
               promoToInject = activePromo;
           }
        }

        if (lastMsg && lastMsg.role === 'agent' && lastMsg.text.includes('📌 *Contexto Actualizado*')) {
          const withoutLast = currentMessages.slice(0, -1);
          // Si el mensaje anterior ya tenía una promo incrustada, la heredamos para que no desaparezca visualmente "debajo"
          messagesStore.set([...withoutLast, { role: 'agent', text: newGreeting, promo: promoToInject || lastMsg.promo }]);
        } else {
          messagesStore.set([...currentMessages, { role: 'agent', text: newGreeting, promo: promoToInject }]);
        }
        
        lastGreetedCategoryStore.set(currentCategory);
          
        if (!isOpenStore.get()) {
          hasUnreadMessagesStore.set(true);
        }
      } else if (currentCategory === 'general' && lastGreetedCategoryStore.get() !== 'general') {
         lastGreetedCategoryStore.set('general');
      }
    };

    // Ejecutar al montar y delegar a Astro Events para SPA View Transitions
    handleContextHop();
    
    // Si cambia de ruta y estábamos streameando, cancelar
    const abortStream = () => { if (abortControllerRef.current) abortControllerRef.current.abort(); };

    document.addEventListener('astro:page-load', handleContextHop);
    document.addEventListener('astro:page-load', abortStream);
    return () => {
       document.removeEventListener('astro:page-load', handleContextHop);
       document.removeEventListener('astro:page-load', abortStream);
    };
  }, []); // El event listener hace que funcione dinámicamente sin amarrar dependencias pesadas.

  const updateMessage = (id: string, text: string, isStreaming: boolean, newRole?: 'agent' | 'error' | 'user') => {
       const msgs = messagesStore.get();
       const idx = msgs.findIndex((m: any) => m.id === id);
       if (idx !== -1) {
           const updated = [...msgs];
           // @ts-ignore
           updated[idx] = { ...updated[idx], text, isStreaming };
           if (newRole) {
               updated[idx].role = newRole as any;
           }
           messagesStore.set(updated);
       }
  };

  const sendExpandMessage = async (lastAgentText: string) => {
    if (isLoading) return;
    const triggerMessage = `[TITO_EXPAND]\n\nÚltima respuesta de Tito:\n${lastAgentText.substring(0, 500)}`;
    messagesStore.set([...messagesStore.get(), { role: 'user', text: '+ info' }]);
    
    const currentMessages = messagesStore.get();
    const safeLLMHistory = currentMessages
      .filter((m: any) => !m.text.includes('[SYSTEM_HIDDEN_CONTEXT]') && !m.text.includes('[TITO_EXPAND]'))
      .slice(-10)
      .map((m: any) => ({ role: m.role, text: m.text }));
  
    setIsLoading(true);
    abortControllerRef.current = new AbortController();
  
    try {
      const res = await fetch('/api/agente-ia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortControllerRef.current.signal,
        body: JSON.stringify({
          history: safeLLMHistory,
          userMessage: triggerMessage,
          email: userData.email,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          currentPath: window.location.pathname,
          pageContext: {
            title: document.title?.substring(0, 150) ?? '',
            description: document.querySelector('meta[name="description"]')
              ?.getAttribute('content')?.substring(0, 200) ?? '',
            h1: document.querySelector('h1')?.textContent?.trim().substring(0, 150) ?? ''
          }
        })
      });
  
      if (!res.ok || !res.body) throw new Error('Error en expand');
  
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';
      messagesStore.set([...messagesStore.get(), { role: 'agent', text: '' }]);
  
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data:')) {
            try {
              const parsed = JSON.parse(line.slice(5).trim());
              if (parsed.text) {
                fullText += parsed.text;
                const msgs = messagesStore.get();
                const updated = [...msgs];
                updated[updated.length - 1] = { role: 'agent', text: fullText };
                messagesStore.set(updated);
              }
            } catch {}
          }
        }
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        messagesStore.set([...messagesStore.get(), { role: 'error', text: 'No pude expandir la respuesta.' }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setIsLoading(true);

    const msgId = 'msg-' + Math.random().toString(36).substring(2, 10);
    
    // Congelamos Snapshot para evitar Race Conditions y enviar el array limpio al backend (P0)
    const snapshot = [...messagesStore.get(), { role: 'user' as const, text: userMsg }];
    
    // Insertamos Placeholder para el streaming visual
    messagesStore.set([...snapshot, { role: 'agent' as any, text: '', isStreaming: true, id: msgId }]);

    // AI Pollution Prevention: Excluimos mensajes insertados por el sistema (UI_Context)
    const ruleTexts = Object.values(chatCategoryRules).map(r => r.contextHop);
    const safeLLMHistory = snapshot.filter((m: any) => m.role !== 'error' && !ruleTexts.includes(m.text) && !m.text.includes('📍 *Explorando la sección de'));
    
    if (abortControllerRef.current) {
        abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    let accumulatedText = "";

    try {
      const res = await fetch('/api/agente-ia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortControllerRef.current.signal,
        body: JSON.stringify({ 
          userMessage: userMsg, 
          history: safeLLMHistory,
          email: userData.email,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          currentPath: window.location.pathname,
          pageContext: {
            title: document.title?.substring(0, 150) ?? '',
            description: document.querySelector('meta[name="description"]')
              ?.getAttribute('content')?.substring(0, 200) ?? '',
            h1: document.querySelector('h1')?.textContent?.trim().substring(0, 150) ?? ''
          }
        })
      });
      
      setIsLoading(false); // Apagamos el indicador general, ya tenemos conexión

      if (!res.ok) {
         let errorTxt = '¡Ups! Múltiples circuitos saturados. Intenta de nuevo por favor.';
         try {
           const errData = await res.json();
           if (errData.error) errorTxt = errData.error;
         } catch(e) {}
         updateMessage(msgId, errorTxt, false, 'error');
         return;
      }

      // Streaming Reader
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader available");
      const decoder = new TextDecoder("utf-8");
      
      let chunkData = "";
      
      while (true) {
         const { done, value } = await reader.read();
         if (done) {
             updateMessage(msgId, accumulatedText, false);
             break;
         }
         
         chunkData += decoder.decode(value, { stream: true });
         const parts = chunkData.split('\n\n');
         chunkData = parts.pop() || "";
         
         for (const part of parts) {
             if (part.trim().startsWith('event:')) {
                 const lines = part.split('\n');
                 const eventLine = lines.find(l => l.startsWith('event:'));
                 const dataLine = lines.find(l => l.startsWith('data:'));
                 
                 if (eventLine && dataLine) {
                    const eventName = eventLine.replace('event:', '').trim();
                    const jsonData = dataLine.replace('data:', '').trim();
                    try {
                       const parsed = JSON.parse(jsonData);
                       if (eventName === 'context_ready') {
                          // No actualizamos texto por context_ready, es background.
                       } else if (eventName === 'token') {
                          if (parsed.text) {
                              accumulatedText += parsed.text;
                              updateMessage(msgId, accumulatedText, true, 'agent');
                          }
                       } else if (eventName === 'error') {
                          updateMessage(msgId, parsed.text || "No pude completarlo, un humano seguirá el caso.", false, 'error');
                          return;
                       } else if (eventName === 'done') {
                          updateMessage(msgId, accumulatedText, false, 'agent');
                          return;
                       }
                    } catch(e) {}
                 }
             }
         }
      }

    } catch (error: any) {
      setIsLoading(false);
      if (error.name === 'AbortError') {
         updateMessage(msgId, accumulatedText || 'Mensaje cancelado.', false, accumulatedText ? 'agent' : 'error');
      } else {
         updateMessage(msgId, 'No pude completar la respuesta con suficiente conexión. Revisa tu red e intenta de nuevo.', false, 'error');
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
      if (window.innerWidth > 768) {
        setTimeout(() => inputChatRef.current?.focus(), 50);
      }
    }
  };

  const copyToClipboard = () => {
    const visibleMessages = messages.filter(m => !m.text.includes('[SYSTEM_HIDDEN_CONTEXT]'));
    const text = visibleMessages.map(m => `${m.role === 'user' ? 'Tú' : 'Tito Bits'}: ${m.text}`).join('\\n\\n');
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3500);
  };

  const resetChat = () => {
    if (window.confirm('🚨 ¿Seguro que deseas reiniciar el chat y borrar tu memoria de sesión?')) {
      if (abortControllerRef.current) abortControllerRef.current.abort();
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
          messages: messages.filter(m => !m.text.includes('[SYSTEM_HIDDEN_CONTEXT]')),
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
          display: isOpen ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center',
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
          position: 'fixed', bottom: '110px', 
          right: 'clamp(10px, 5vw, 30px)',
          width: isExpanded ? 'min(95vw, 500px)' : 'min(90vw, 380px)', 
          height: isExpanded ? '80vh' : '65vh',
          maxHeight: isExpanded ? '700px' : '560px',
          background: '#fff', borderRadius: '16px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
          display: 'flex', flexDirection: 'column', zIndex: 9999,
          overflow: 'hidden', fontFamily: '"Inter", sans-serif',
          border: '1px solid #E5E7EB',
          transition: 'all 0.3s ease'
        }}>
          {/* Barra de título estilo Windows — colores Mac */}
          <div style={{
            display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
            gap: '8px', padding: '6px 12px',
            background: '#002d4a', borderBottom: '1px solid rgba(255,255,255,0.08)'
          }}>
            {/* 🔴 Cerrar */}
            <button onClick={() => {
              if (hasStarted && !isSendingEmail && messages.length > 1 && !transcriptSentStore.get()) {
                transcriptSentStore.set(true);
                sendSilentEmail();
              }
              isOpenStore.set(false);
            }} title="Cerrar"
              style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#FF5F56',
                border: 'none', cursor: 'pointer', padding: 0, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)' }}>
              <span style={{ fontSize: '8px', color: 'rgba(0,0,0,0.5)', lineHeight: 1 }}>✕</span>
            </button>

            {/* 🟡 Minimizar */}
            <button onClick={() => isOpenStore.set(false)} title="Minimizar"
              style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#FFBD2E',
                border: 'none', cursor: 'pointer', padding: 0, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)' }}>
              <span style={{ fontSize: '8px', color: 'rgba(0,0,0,0.5)', lineHeight: 1 }}>─</span>
            </button>

            {/* 🟢 Expandir/Contraer */}
            <button onClick={() => isExpandedStore.set(!isExpanded)} title={isExpanded ? 'Contraer' : 'Expandir'}
              style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#27C93F',
                border: 'none', cursor: 'pointer', padding: 0, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)' }}>
              <span style={{ fontSize: '8px', color: 'rgba(0,0,0,0.5)', lineHeight: 1 }}>
                {isExpanded ? '⧠' : '❐'}
              </span>
            </button>
          </div>

          {/* Header */}
          <div style={{
            background: '#004775', padding: '12px 16px', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '8px'
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
            
            <div style={{display: 'flex', gap: '6px', alignItems: 'center'}}>
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
                <>
                <button 
                  onClick={copyToClipboard} 
                  disabled={isCopied}
                  style={{
                    background: isCopied ? '#10B981' : '#3179C2', border: 'none', color: '#fff', fontWeight: 'bold',
                    fontSize: '11px', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer',
                    transition: 'background 0.3s', marginRight: '4px'
                  }}
                >
                  {isCopied ? 'Copiado ✅' : 'Copiar 📋'}
                </button>
                <button 
                  onClick={sendSilentEmail} 
                  disabled={isSendingEmail}
                  style={{
                    background: isSendingEmail ? '#10B981' : '#3179C2', border: 'none', color: '#fff', fontWeight: 'bold',
                    fontSize: '11px', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer',
                    transition: 'background 0.3s'
                  }}
                >
                  {isSendingEmail ? 'Enviando...' : 'Enviar 📧'}
                </button>
                </>
              )}
            </div>
          </div>

          {/* Body */}
          <div style={{
            flex: 1, padding: '16px', background: '#F8FAFC',
            overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px',
            overscrollBehavior: 'contain'
          }}>
            {!hasStarted ? (
              <div style={{marginTop: '20px'}}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <h4 style={{margin: '0 0 8px', color: '#004775', fontSize: '18px'}}>¡Hola!</h4>
                  <p style={{margin: 0, fontSize: '14px', color: '#6B7280'}}>Yo soy Tito Bits. ¿Con quién tengo el gusto?</p>
                </div>
                <form onSubmit={startChat} style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                  <input 
                    ref={inputNameRef}
                    required type="text" placeholder="Tu nombre o empresa"
                    value={userData.name} onChange={e => userDataStore.set({...userData, name: e.target.value})}
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
                {messages.filter((m: any) => !m.text.includes('[SYSTEM_HIDDEN_CONTEXT]')).map((m: any, i) => (
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
                            <div style={{
                              marginTop: '12px', padding: '14px', background: '#FFF7ED', border: '1px solid #F97316',
                              borderRadius: '8px', borderLeft: '4px solid #F97316'
                            }}>
                              <div style={{ fontSize: '10px', fontWeight: '900', color: '#EA580C', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{m.promo.badgeText}</div>
                              <h4 style={{ margin: '0 0 6px 0', color: '#9A3412', fontSize: '14px', fontWeight: '800' }}>{m.promo.title}</h4>
                              <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#C2410C', lineHeight: '1.4' }}>{m.promo.description}</p>
                              {m.promo.link && (
                                <a href={m.promo.link} target="_blank" rel="noopener noreferrer" style={{
                                  display: 'inline-block', background: '#F97316', color: 'white', fontWeight: 'bold',
                                  fontSize: '12px', padding: '6px 14px', borderRadius: '6px', textDecoration: 'none',
                                  boxShadow: '0 2px 4px rgba(249,115,22,0.2)'
                                 }}>Ver oferta →</a>
                              )}
                            </div>
                          )}
                          {m.role === 'agent' && !isLoading && i === messages.filter((x:any) => !x.text.includes('[SYSTEM_HIDDEN_CONTEXT]')).length - 1 && 
                           !m.text.includes('1.') && (m.text.match(/\n-/g) || []).length < 3 && (
                            <button
                              onClick={() => sendExpandMessage(m.text)}
                              style={{
                                marginTop: '6px', fontSize: '11px', color: '#3179C2',
                                background: 'none', border: '1px solid #DBEAFE',
                                borderRadius: '12px', padding: '3px 10px', cursor: 'pointer',
                                display: 'inline-block', transition: 'background 0.2s'
                              }}
                              onMouseOver={e => { e.currentTarget.style.background = '#EFF6FF'; }}
                              onMouseOut={e => { e.currentTarget.style.background = 'none'; }}
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
                  <div style={{ padding: '8px', alignSelf: 'flex-start', fontSize: '13px', color: '#64748B' }}>
                    TitoBits está escribiendo...
                  </div>
                )}
                {/* Spacer físico irrompible ampliado a 60px para forzar el vacío inferior */}
                <div ref={endRef} style={{ height: '60px', width: '100%', flexShrink: 0 }} />
              </>
            )}
          </div>

          {/* Footer Input */}
          {hasStarted && (
            <div style={{ background: '#fff', borderTop: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column' }}>
              <form onSubmit={sendMessage} style={{
                padding: '12px', display: 'flex', gap: '8px'
              }}>
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
                  style={{
                    flex: 1, padding: '10px 16px', borderRadius: '20px',
                    border: '1px solid #E5E7EB', background: '#F3F4F6',
                    fontSize: '14px', outline: 'none', resize: 'none',
                    lineHeight: '1.4', minHeight: '40px', maxHeight: '120px',
                    fontFamily: 'inherit'
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
