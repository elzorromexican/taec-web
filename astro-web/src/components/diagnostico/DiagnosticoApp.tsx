import React, { useState, useEffect, useMemo } from 'react';
import { stages } from '../../data/diagnosticoData';
import type { StageId, PainLevel, DiagnosticStage, PainAxis, PlatformId } from '../../data/diagnosticoData';
import { PLATFORM_AXIS_ORDER } from '../../data/diagnosticoData';
import { calcularDiagnostico, type DiagnosticResult } from '../../lib/diagnostico/diagnosticoScoring';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

type AppPhase = 'p0' | 'questions' | 'email_gate' | 'results';

interface DiagnosticSession {
  phase: AppPhase;
  stage: StageId | null;
  answers: Record<string, PainLevel>;
  email: string;
  result: DiagnosticResult | null;
}

const defaultSession: DiagnosticSession = {
  phase: 'p0',
  stage: null,
  answers: {},
  email: '',
  result: null
};

const platformLabels: Record<PlatformId, string> = {
  lms_agil: "LMS Ágil",
  lms_corp: "LMS Corp",
  lms_cert: "Externa/Cert",
  fabrica_ddc: "Fábrica DDC",
  tools_autor: "Herramientas",
  vilt_zoom: "VILT/Zoom",
  eval_proctor: "Proctoring",
  ecommerce: "E-Commerce"
};

const painLabels: Record<PainAxis, string> = {
  admin: "Administrativo",
  contenido: "Contenido",
  tecnologia: "Tecnología",
  normativa: "Normativo",
  escala: "Escala",
  monetizacion: "Monetización"
};

export default function DiagnosticoApp() {
  const [isMounted, setIsMounted] = useState(false);
  const [session, setSession] = useState<DiagnosticSession>(defaultSession);
  const [isSending, setIsSending] = useState(false);
  const [activeInsight, setActiveInsight] = useState<string | null>(null);
  const [renderError, setRenderError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const stored = sessionStorage.getItem('diagnostico_v2');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
           setSession({
             ...defaultSession,
             ...parsed,
             answers: parsed.answers || {}
           });
        }
      } catch (e) { 
        console.error("Session storage parse error", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      sessionStorage.setItem('diagnostico_v2', JSON.stringify(session));
    }
  }, [session, isMounted]);

  const updateSession = (partial: Partial<DiagnosticSession>) => {
    setSession(prev => ({ ...prev, ...partial }));
    setActiveInsight(null);
  };

  const currentStage = useMemo(() => stages.find(s => s.id === session.stage) || null, [session.stage]);

  const handleStageSelect = (stageId: StageId) => {
    updateSession({ phase: 'questions', stage: stageId, answers: {}, result: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLevelSelect = (questionId: string, level: PainLevel) => {
    setSession(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: level
      }
    }));
    setActiveInsight(questionId);
  };

  const isCurrentStageComplete = useMemo(() => {
    if (!currentStage) return false;
    return currentStage.questions.every(q => session.answers[q.id] !== undefined);
  }, [currentStage, session.answers]);

  const pct = useMemo(() => {
    if (!currentStage) return 0;
    const answered = Object.keys(session.answers).length;
    const total = currentStage.questions.length;
    return total === 0 ? 0 : Math.round((answered / total) * 100);
  }, [currentStage, session.answers]);

  const goToEmailGate = () => {
    updateSession({ phase: 'email_gate' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session.email || !session.email.includes('@') || !currentStage) return;

    setIsSending(true);

    try {
      const res = calcularDiagnostico(
        { stage: session.stage!, answers: session.answers },
        currentStage.questions
      );

      // Enviar el lead al backend
      const apiRes = await fetch('/api/diagnostico-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: session.email, 
          stage: session.stage,
          painProfile: res.painProfile,
          platformScores: res.platformScores,
          urgencyScore: res.urgencyScore,
          winningPlatform: res.winningPlatform
        })
      });

      if (!apiRes.ok) {
        alert('Error conectando al sistema. Por favor revisa los datos e intenta de nuevo.');
        return;
      }

      // Extraer los Dolores Críticos respondidos como "Urgente" (2)
      const criticalPains = Object.entries(session.answers)
        .filter(([_, val]) => val === 2)
        .map(([id]) => {
          const q = currentStage.questions.find(x => x.id === id);
          return q ? q.text : '';
        }).filter(Boolean);

      const sortedPlats = PLATFORM_AXIS_ORDER
        .map(p => ({ id: p, score: res.platformScores[p] || 0 }))
        .sort((a, b) => b.score - a.score);

      const motorInicial = sortedPlats[0]; // siempre existe
      const segundaCapa  = sortedPlats[1]?.score >= 40 ? sortedPlats[1] : null;
      const evolucion    = sortedPlats[2]?.score >= 25 ? sortedPlats[2] : null;

      const arquitectura = [
        `motor inicial: ${platformLabels[motorInicial.id]}`,
        segundaCapa ? `segunda capa: ${platformLabels[segundaCapa.id]}` : null,
      ].filter(Boolean).join(' · ');

      // System Prompt Oculto para TitoBits
      const prompt = `El prospecto con correo [${session.email}] acaba de completar su Diagnostico de TAEC. Etapa: ${session.stage}.
Resultados:
- Arquitectura recomendada: ${arquitectura}
- Puntuación de urgencia: ${res.urgencyScore}%
- Top Ejes de Dolor: ${res.topPains.join(', ')}

El prospecto calificó como "Urgente / Crítico" los siguientes dolores en su operación:
"${criticalPains.join('", "')}"

INSTRUCCIÓN SECRETA METODOLOGÍA CHALLENGER B2B:
- NO SALUDES CON FRASES TÍPICAS O REPETITIVAS. Usa un enfoque consultivo agresivo y humano. Toma UNO de los dolores reales que el prospecto catalogó como urgente de la lista de arriba y ábrele conversación sobre eso. 
- Por ejemplo, si un dolor urgente es sobre normativas o constancias DC-3, pregúntale "¿qué auditoría o NOM los está persiguiendo ahora mismo?".
- Céntrate en justificar cómo la arquitectura recomendada (${arquitectura}) alivia ese dolor.
- IMPORTANTE: TIENES ESTRICTAMENTE PROHIBIDO volver a pedir su correo, teléfono o nombre en todo el resto de la sesión. Ya sabemos quién es, atiende directamente sus dolores.`;

      updateSession({ phase: 'results', result: res });

      window.dispatchEvent(new CustomEvent('OpenTitoDiagnostic', {
        detail: { email: session.email, diagnosticResult: res.winningPlatform, prompt }
      }));

    } catch (err) {
      console.error(err);
      alert('Error inesperado. Inténtalo más tarde.');
    } finally {
      setIsSending(false);
    }
  };

  const restartDiagnostic = () => {
    sessionStorage.removeItem('diagnostico_v2');
    updateSession(defaultSession);
    window.scrollTo({ top: 0 });
  };

  const changeStage = () => {
    updateSession({ phase: 'p0', stage: null, answers: {}, result: null });
    window.scrollTo({ top: 0 });
  };

  if (!isMounted) return null;
  if (renderError) return <div style={{padding: '3rem', color: 'red'}}><h1>Error Fatal (Frontend)</h1><pre>{renderError}</pre><button onClick={() => { sessionStorage.clear(); window.location.reload(); }}>Clear Session</button></div>;

  try {
    return (
      <div style={{ fontFamily: '"DM Sans", sans-serif', background: '#F2F1EC', color: '#1B2A4A', minHeight: '100vh', paddingBottom: '4rem' }}>
        <style>{`
          @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      
      {/* Sticky Bar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, background: '#1B2A4A', padding: '10px 2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ fontFamily: '"Fraunces", serif', fontSize: '14px', fontWeight: 600, color: 'white', flexShrink: 0 }}>
          TAEC <em style={{ fontStyle: 'italic', color: '#FFAA80' }}>·</em>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '12px', color: 'rgba(255,255,255,0.6)', textAlign: 'right', marginBottom: '3px' }}>
            {session.phase === 'p0' ? '0% completado' : `${pct}% completado`}
          </div>
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: '#80DDD5', borderRadius: '2px', transition: 'width 0.4s ease', width: `${session.phase === 'p0' ? 0 : pct}%` }} />
          </div>
        </div>
        <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#80DDD5', flexShrink: 0, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '12px' }}>
          {session.stage && (
            <button onClick={changeStage} style={{ background: 'transparent', border: '1px solid rgba(128, 221, 213, 0.4)', color: '#80DDD5', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer', transition: 'background 0.2s' }}>
              Cambiar etapa
            </button>
          )}
          <span>Etapa: {currentStage ? currentStage.label : 'Sin seleccionar'}</span>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
        {session.phase === 'p0' && (
          <div style={{ textAlign: 'center', animation: 'fadeSlideIn 0.5s ease', marginTop: '2rem' }}>
            <h1 style={{ fontFamily: '"Fraunces", serif', fontSize: '36px', color: '#1B2A4A', marginBottom: '1rem' }}>Selecciona tu Nivel Operativo</h1>
            <p style={{ fontSize: '16px', color: '#4A4A5A', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
              Para ofrecerte un diagnóstico preciso y contextualizado, necesitamos clasificar la madurez y alcance inicial de tus necesidades de digitalización de conocimiento.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', textAlign: 'left' }}>
              {stages.map(st => (
                <div key={st.id} 
                     onClick={() => handleStageSelect(st.id as StageId)}
                     style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '12px', border: '1.5px solid #C8C8D4', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}
                     onMouseEnter={e => e.currentTarget.style.borderColor = '#0A7A70'}
                     onMouseLeave={e => e.currentTarget.style.borderColor = '#C8C8D4'}>
                  <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#0A7A70', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 600 }}>{st.eyebrow}</div>
                  <h2 style={{ fontFamily: '"Fraunces", serif', fontSize: '24px', color: '#1B2A4A', marginBottom: '1rem' }}>{st.label}</h2>
                  <p style={{ fontSize: '14px', color: '#4A4A5A', lineHeight: 1.5, marginBottom: '1.5rem', flex: 1 }}>{st.description}</p>
                  <div style={{ fontSize: '12px', background: '#F4FBF9', color: '#0A7A70', padding: '8px 12px', borderRadius: '6px', fontWeight: 500, alignSelf: 'flex-start' }}>
                    {st.examples}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {session.phase === 'questions' && currentStage && (
          <div style={{ animation: 'fadeSlideIn 0.5s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '2px solid #1B2A4A' }}>
              <div>
                <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4A4A5A', marginBottom: '3px' }}>{currentStage.eyebrow}</div>
                <div style={{ fontFamily: '"Fraunces", serif', fontSize: '28px', fontWeight: 600, color: '#1B2A4A', lineHeight: 1.2 }}>Diagnóstico de {currentStage.label}</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentStage.questions.map((q, qi) => {
                const ans = session.answers[q.id];
                const isAnswered = ans !== undefined;
                
                return (
                  <div key={q.id}
                    onClick={() => isAnswered && setActiveInsight(activeInsight === q.id ? null : q.id)}
                    style={{
                      background: isAnswered ? '#F4FBF9' : '#FFFFFF',
                      border: isAnswered ? '1.5px solid #0A7A70' : '1.5px solid #C8C8D4',
                      borderRadius: '8px', overflow: 'hidden', transition: 'border-color 0.2s',
                      cursor: isAnswered ? 'pointer' : 'default'
                    }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', padding: '16px' }}>
                      <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '12px', fontWeight: 500, color: isAnswered ? '#0A7A70' : '#C8C8D4', flexShrink: 0, minWidth: '28px', marginTop: '2px' }}>
                        {String(qi + 1).padStart(2, '0')}
                      </div>
                      <div style={{ flex: '1 1 250px' }}>
                        <div style={{ fontSize: '15px', fontWeight: 400, color: isAnswered ? '#0A7A70' : '#1B2A4A', lineHeight: 1.4, marginBottom: '6px' }}>{q.text}</div>
                        <div style={{ fontSize: '12px', color: '#4A4A5A', fontWeight: 300, fontStyle: 'italic' }}>{q.why}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '6px', flexShrink: 0, marginTop: '2px', background: '#F2F1EC', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '4px' }}>
                        {[0, 1, 2].map((level) => {
                          const selected = ans === level;
                          const labels: Record<number, string> = {
                            0: 'Bajo',
                            1: 'Medio',
                            2: 'Alto'
                          };
                          return (
                            <button key={level}
                                onClick={(e) => { e.stopPropagation(); handleLevelSelect(q.id, level as PainLevel); }}
                                style={{
                                    padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', border: 'none', transition: 'all 0.15s',
                                    background: selected 
                                        ? (level === 2 ? '#E53935' : level === 1 ? '#F59E0B' : '#0A7A70')
                                        : 'transparent',
                                    color: selected ? '#FFF' : '#4A4A5A',
                                    fontSize: '12px', fontWeight: selected ? 600 : 400
                                }}>
                                {labels[level]}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateRows: activeInsight === q.id ? '1fr' : '0fr', transition: 'grid-template-rows 0.3s ease-out' }}>
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ padding: '12px 16px 16px 60px', borderTop: '1px solid #C8C8D4', background: '#F8F8F5' }}>
                          <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0A7A70', marginBottom: '6px', fontWeight: 600 }}>
                            Qué significa para tu proyecto
                          </div>
                          <div style={{ fontSize: '13px', color: '#4A4A5A', lineHeight: 1.5, fontWeight: 300 }} 
                               dangerouslySetInnerHTML={{ __html: ans === 2 ? q.insight.urgent : ans === 1 ? q.insight.mild : q.insight.none }} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {isCurrentStageComplete && (
              <div style={{ marginTop: '3rem', marginBottom: '6rem', textAlign: 'center', animation: 'fadeSlideIn 0.5s ease' }}>
                <button
                  onClick={goToEmailGate}
                  style={{ background: '#1B2A4A', color: 'white', border: 'none', padding: '16px 36px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', boxShadow: '0 4px 12px rgba(27,42,74,0.2)' }}
                >
                  Finalizar Mapeo Operativo →
                </button>
              </div>
            )}
          </div>
        )}

        {session.phase === 'email_gate' && (
          <div style={{ animation: 'fadeSlideIn 0.5s ease', background: '#FFFFFF', borderRadius: '16px', padding: '4rem 3rem', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', textAlign: 'center', marginTop: '4rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#F4FBF9', border: '2px solid #0A7A70', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '24px' }}>📊</div>
            <h2 style={{ fontFamily: '"Fraunces", serif', fontSize: '32px', color: '#1B2A4A', marginBottom: '1rem' }}>Último Paso para ver tus Resultados</h2>
            <p style={{ fontSize: '16px', color: '#4A4A5A', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
              Hemos consolidado tu matriz operativa en base a las vulnerabilidades reportadas. Ingresa tu correo corporativo para liberar la arquitectura recomendada.
            </p>
            
            <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '380px', margin: '0 auto' }}>
              <input
                type="email"
                required
                placeholder="ejemplo@tuempresa.com"
                value={session.email}
                onChange={(e) => updateSession({ email: e.target.value })}
                style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid #C8C8D4', outline: 'none', fontFamily: '"DM Sans", sans-serif', fontSize: '15px' }}
              />
              <button type="submit" disabled={isSending} style={{ background: '#D95A1E', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: isSending ? 'not-allowed' : 'pointer', fontFamily: '"DM Sans", sans-serif', transition: 'background 0.2s' }}>
                {isSending ? 'Procesando Radiografía...' : 'Ver Diagnóstico Arquitectónico →'}
              </button>
            </form>
          </div>
        )}

        {session.phase === 'results' && session.result && (
          <div style={{ animation: 'fadeSlideIn 0.5s ease', marginBottom: '8rem' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '3.5rem', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-block', background: 'rgba(217, 90, 30, 0.1)', color: '#D95A1E', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                Índice de Urgencia Operativa: {session.result.urgencyScore}%
              </div>
              
              <h2 style={{ fontFamily: '"Fraunces", serif', fontSize: '32px', color: '#1B2A4A', marginBottom: '1rem' }}>
                Arquitectura Recomendada
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', marginBottom: '1.5rem', fontSize: '18px', color: '#1B2A4A' }}>
                {(() => {
                  const sortedPlats = PLATFORM_AXIS_ORDER
                    .map(p => ({ id: p, score: session.result!.platformScores[p] || 0 }))
                    .sort((a, b) => b.score - a.score);
                  const motorInicial = sortedPlats[0];
                  const segundaCapa  = sortedPlats[1]?.score >= 40 ? sortedPlats[1] : null;
                  const evolucion    = sortedPlats[2]?.score >= 25 ? sortedPlats[2] : null;

                  return (
                    <>
                      <div>Motor inicial · <strong style={{ color: '#0A7A70' }}>{platformLabels[motorInicial.id]}</strong></div>
                      {segundaCapa && <div>Segunda capa · <strong style={{ color: '#0A7A70' }}>{platformLabels[segundaCapa.id]}</strong></div>}
                      {evolucion && <div>Evolución futura · <strong style={{ color: '#0A7A70' }}>{platformLabels[evolucion.id]}</strong></div>}
                    </>
                  );
                })()}
              </div>
              <p style={{ fontSize: '15px', color: '#4A4A5A', maxWidth: '600px', margin: '0 auto 3rem' }}>
                Tu operación requiere intervenciones prioritarias en: <b>{session.result.topPains.map(p => painLabels[p as PainAxis]).join(', ')}</b>.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                <div style={{ background: '#F8F8F5', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E5E7EB' }}>
                  <h3 style={{ fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#4A4A5A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Matriz de Dolor (Pains)</h3>
                  <div style={{ height: '250px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={
                        Object.entries(session.result.painProfile).map(([axis, score]) => ({
                          subject: painLabels[axis as PainAxis],
                          A: score,
                          fullMark: 100
                        }))
                      }>
                        <PolarGrid stroke="#E5E7EB" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#4A4A5A', fontSize: 11, fontFamily: 'DM Mono' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="Pain" dataKey="A" stroke="#E53935" fill="#E53935" fillOpacity={0.4} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div style={{ background: '#F8F8F5', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E5E7EB' }}>
                  <h3 style={{ fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#4A4A5A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Alineación Arquitectónica (Plataformas)</h3>
                  <div style={{ height: '250px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={
                        PLATFORM_AXIS_ORDER.map(plat => ({
                          subject: platformLabels[plat],
                          A: session.result.platformScores[plat] || 0,
                          fullMark: 100
                        }))
                      }>
                        <PolarGrid stroke="#E5E7EB" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#4A4A5A', fontSize: 11, fontFamily: 'DM Mono' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="Afinidad" dataKey="A" stroke="#0A7A70" fill="#0A7A70" fillOpacity={0.4} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div style={{ background: '#F4FBF9', padding: '2rem', borderRadius: '12px', border: '1.5px solid #0A7A70', textAlign: 'left', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#0A7A70', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>🤖</div>
                <div>
                  <h3 style={{ fontSize: '18px', color: '#0A7A70', marginBottom: '0.5rem', fontFamily: '"Fraunces", serif' }}>Tito Bits ya recibió tu expediente</h3>
                  <p style={{ fontSize: '14px', color: '#4A4A5A', lineHeight: 1.6, margin: 0 }}>
                    Nuestro arquitecto virtual ha asimilado tus puntos críticos de dolor y la tecnología ganadora. La ventana emergente en la <b>esquina inferior derecha</b> ya está activa. <b>Escríbele para revisar a profundidad tu mapa de riesgo.</b>
                  </p>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button onClick={restartDiagnostic} style={{ background: 'transparent', border: 'none', color: '#4A4A5A', fontSize: '13px', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}>
                Empezar flujo de diagnóstico nuevo
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
    );
  } catch (err: any) {
    if (!renderError) {
      setTimeout(() => setRenderError(err?.message || String(err)), 0);
    }
    return null;
  }
}
