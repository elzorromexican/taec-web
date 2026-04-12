import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { chatCategoryRules } from '../../data/chatContextRules';
import ChatWindow from './ChatWindow';
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
    if (!isOpen) {
      isExpandedStore.set(false);
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
    const text = visibleMessages.map(m => `${m.role === 'user' ? 'Tú' : 'Tito Bits'}: ${m.text}`).join('\n\n');
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

  if (!isHydrated) return null; // Previene hydration mismatch en Astro SSR

  return (
    <ChatWindow
      isOpen={isOpen}
      isExpanded={isExpanded}
      hasStarted={hasStarted}
      hasUnread={hasUnread}
      userData={userData}
      messages={messages}
      isLoading={isLoading}
      isSendingEmail={isSendingEmail}
      isCopied={isCopied}
      input={input}
      endRef={endRef}
      inputChatRef={inputChatRef}
      inputNameRef={inputNameRef}
      toggleChat={toggleChat}
      minimizeChat={() => isOpenStore.set(false)}
      closeChat={() => {
        if (hasStarted && !isSendingEmail && messages.length > 1 && !transcriptSentStore.get()) {
          transcriptSentStore.set(true);
          sendSilentEmail();
        }
        isOpenStore.set(false);
        hasStartedStore.set(false);
        userDataStore.set({ name: '', email: '', phone: '', location: 'Ubicación Desconocida', countryCode: '' });
        messagesStore.set([]);
        transcriptSentStore.set(false);
        lastGreetedCategoryStore.set('');
        hasUnreadMessagesStore.set(false);
        isExpandedStore.set(false);
      }}
      toggleExpand={() => isExpandedStore.set(!isExpandedStore.get())}
      resetChat={resetChat}
      sendSilentEmail={sendSilentEmail}
      startChat={startChat}
      sendMessage={sendMessage}
      sendExpandMessage={sendExpandMessage}
      copyToClipboard={copyToClipboard}
      setInput={setInput}
      setUserDataName={(name: string) => userDataStore.set({...userData, name})}
    />
  );
}
