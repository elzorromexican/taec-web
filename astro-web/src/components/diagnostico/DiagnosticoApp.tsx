import React, { useState, useMemo } from 'react';
import type { Dimension, Question } from '../../data/diagnosticoData';
import { dimensions } from '../../data/diagnosticoData';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

type Platforms = 'reach360' | 'moodle' | 'totara' | 'netexam';
type Answer = 'yes' | 'no' | null;

interface AnswerState {
  val: Answer;
  insightPlat: Platforms | null;
}

export default function DiagnosticoApp() {
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [currentDimIndex, setCurrentDimIndex] = useState(0);
  const [activeInsight, setActiveInsight] = useState<string | null>(null);

  const handleAnswer = (dimIndex: number, qIndex: number, val: Answer, plat: Platforms | null) => {
    const key = `${dimIndex}-${qIndex}`;
    setAnswers(prev => ({
      ...prev,
      [key]: { val, insightPlat: plat }
    }));
    setActiveInsight(key);
  };

  const totalQuestions = dimensions.reduce((acc, dim) => acc + dim.questions.length, 0);
  const totalAnswered = Object.keys(answers).length;
  const pct = Math.round((totalAnswered / totalQuestions) * 100);

  const isFinished = currentDimIndex === dimensions.length;
  
  const currentDimQuestions = !isFinished ? dimensions[currentDimIndex].questions : [];
  const isCurrentDimComplete = !isFinished && currentDimQuestions.every((_, qi) => {
    return answers[`${currentDimIndex}-${qi}`] !== undefined;
  });

  const nextDimension = () => {
    setCurrentDimIndex(prev => prev + 1);
    setActiveInsight(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetDiagnostic = () => {
    setAnswers({});
    setEmail('');
    setEmailSent(false);
    setCurrentDimIndex(0);
    setActiveInsight(null);
    window.scrollTo({ top: 0 });
  };

  const displayDimNum = isFinished ? 5 : currentDimIndex + 1;

  // Calculate scores
  const scores = useMemo(() => {
    const s = { reach360: 0, moodle: 0, totara: 0, netexam: 0 };
    Object.values(answers).forEach((ans) => {
      if (ans.val === 'yes' && ans.insightPlat) {
        s[ans.insightPlat]++;
      }
    });
    return s;
  }, [answers]);

  const maxScore = Math.max(...Object.values(scores), 1); // Avoid 0

  const platNames = {
    reach360: "Reach 360",
    moodle: "Moodle",
    totara: "Totara",
    netexam: "PIFINI / NetExam"
  };

  const platPriority: Platforms[] = ['reach360', 'moodle', 'totara', 'netexam'];
  const winningPlatformId = (Object.keys(scores) as Platforms[]).reduce((a, b) => {
    if (scores[b] > scores[a]) return b;
    if (scores[b] === scores[a]) return platPriority.indexOf(b) < platPriority.indexOf(a) ? b : a;
    return a;
  });
  const winningPlatformName = platNames[winningPlatformId];

  const chartData = [
    { subject: 'Arranque Rápido (Reach)', A: scores.reach360, fullMark: 5 },
    { subject: 'Flexibilidad (Moodle)', A: scores.moodle, fullMark: 5 },
    { subject: 'Enterprise (Totara)', A: scores.totara, fullMark: 5 },
    { subject: 'Certificación Externa (PIFINI)', A: scores.netexam, fullMark: 5 },
  ];

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    setIsSending(true);
    
    try {
      // Enviar el lead al backend
      await fetch('/api/diagnostico-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, scores, winningPlatform: winningPlatformName })
      });

      setEmailSent(true);

      // System Prompt Oculto para TitoBits ("Sacar Sopa")
      const prompt = `El prospecto con correo ${email} acaba de completar su Diagnóstico de Aprendizaje TAEC con los siguientes scores de afinidad: Reach360 (${scores.reach360}), Moodle (${scores.moodle}), Totara (${scores.totara}), PIFINI/NetExam (${scores.netexam}). 
La plataforma recomendada por el sistema fue: ${winningPlatformName}.

INSTRUCCIÓN SECRETA Y ESTRICTA: No vendas ni cotices costos de inmediato. Asume el rol de "Consultor Diagnóstico". Analiza estos datos rígidos y tu única tarea inicial es hacerle 2 (máximo 3) preguntas consultivas sutiles y cálidas enfocadas en el lado "subjetivo" de su proyecto:
Ejemplo de temas: ¿Tienen experiencias pasadas (buenas o malas) con LMS?, ¿Quiénes más en el equipo aprueban el proyecto?, ¿Qué frustración principal les llevó a buscar esto ahora?
Recopila esta info para luego poder estructurar tu clásico reporte de "Situación, Dolor, Solución, Tiempos, y Riesgos".`;

      // Disparar evento para que ChatAgent inyecte el prompt y abra
      window.dispatchEvent(new CustomEvent('OpenTitoDiagnostic', {
        detail: { email, diagnosticResult: winningPlatformName, prompt }
      }));

    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

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
            {pct}% completado
          </div>
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: '#80DDD5', borderRadius: '2px', transition: 'width 0.4s ease', width: `${pct}%` }} />
          </div>
        </div>
        <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#80DDD5', flexShrink: 0, whiteSpace: 'nowrap' }}>
          Dimensión {displayDimNum} / 5
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
        
        {!isFinished ? (
          /* Preguntas y Dimensiones (WIZARD MODE) */
          (() => {
            const di = currentDimIndex;
            const dim = dimensions[di];
            return (
            <div key={di} style={{ marginBottom: '3rem', animation: 'fadeSlideIn 0.5s ease-out' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '2px solid #1B2A4A' }}>
                <div style={{ fontFamily: '"Fraunces", serif', fontSize: '42px', fontWeight: 300, fontStyle: 'italic', color: '#C8C8D4', lineHeight: 1, flexShrink: 0 }}>
                  {dim.num}
                </div>
                <div>
                  <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4A4A5A', marginBottom: '3px' }}>{dim.eyebrow}</div>
                  <div style={{ fontFamily: '"Fraunces", serif', fontSize: '22px', fontWeight: 600, color: '#1B2A4A', lineHeight: 1.2 }}>{dim.title}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {dim.questions.map((q, qi) => {
                  const id = `${di}-${qi}`;
                  const ans = answers[id]?.val;
                  const isAnswered = ans !== undefined;
                  const globalNum = dimensions.slice(0, di).reduce((a, d) => a + d.questions.length, 0) + qi + 1;

                  return (
                    <div key={id} 
                      onClick={() => isAnswered && setActiveInsight(activeInsight === id ? null : id)}
                      style={{ 
                        background: isAnswered ? '#F4FBF9' : '#FFFFFF', 
                        border: isAnswered ? '1.5px solid #0A7A70' : '1.5px solid #C8C8D4', 
                        borderRadius: '8px', overflow: 'hidden', transition: 'border-color 0.2s',
                        cursor: isAnswered ? 'pointer' : 'default'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 16px' }}>
                        <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '12px', fontWeight: 500, color: isAnswered ? '#0A7A70' : '#C8C8D4', flexShrink: 0, minWidth: '28px', marginTop: '2px' }}>
                          {String(globalNum).padStart(2, '0')}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '15px', fontWeight: 400, color: isAnswered ? '#0A7A70' : '#1B2A4A', lineHeight: 1.4, marginBottom: '4px' }}>{q.text}</div>
                          <div style={{ fontSize: '12px', color: '#4A4A5A', fontWeight: 300, fontStyle: 'italic' }}>{q.why}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '6px', flexShrink: 0, marginTop: '2px' }}>
                          <button onClick={(e) => { e.stopPropagation(); handleAnswer(di, qi, 'yes', q.insight.plat); }} title="Sí"
                            style={{ width: '28px', height: '28px', borderRadius: '5px', border: ans === 'yes' ? '1.5px solid #0A7A70' : '1.5px solid #C8C8D4', background: ans === 'yes' ? '#0A7A70' : '#FFFFFF', color: ans === 'yes' ? '#FFF' : '#1B2A4A', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', transition: 'all 0.15s' }}>
                            ✓
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); handleAnswer(di, qi, 'no', q.insight.plat); }} title="No"
                            style={{ width: '28px', height: '28px', borderRadius: '5px', border: ans === 'no' ? '1.5px solid #E53935' : '1.5px solid #C8C8D4', background: ans === 'no' ? '#E53935' : '#FFFFFF', color: ans === 'no' ? '#FFF' : '#1B2A4A', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', transition: 'all 0.15s' }}>
                            ✗
                          </button>
                        </div>
                      </div>
                      
                      {/* Animación fluida CSS Grid */}
                      <div style={{ display: 'grid', gridTemplateRows: activeInsight === id ? '1fr' : '0fr', transition: 'grid-template-rows 0.3s ease-out' }}>
                        <div style={{ overflow: 'hidden' }}>
                          <div style={{ padding: '10px 16px 14px 56px', borderTop: '1px solid #C8C8D4', background: '#F8F8F5' }}>
                            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0A7A70', marginBottom: '5px', fontWeight: 500 }}>
                              Qué significa para tu proyecto
                            </div>
                            <div style={{ fontSize: '13px', color: '#4A4A5A', lineHeight: 1.5, fontWeight: 300 }} dangerouslySetInnerHTML={{ __html: ans === 'yes' ? q.insight.yes : q.insight.no }} />
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Siguiente Boton */}
              {isCurrentDimComplete && (
                <div style={{ marginTop: '2.5rem', textAlign: 'center', animation: 'fadeSlideIn 0.5s ease' }}>
                  <button 
                    onClick={nextDimension}
                    style={{ background: '#1B2A4A', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', boxShadow: '0 4px 12px rgba(27,42,74,0.2)' }}
                  >
                    {currentDimIndex === dimensions.length - 1 ? 'Ver Resultado Final →' : 'Siguiente Dimensión →'}
                  </button>
                </div>
              )}
            </div>
          );
          })()
        ) : (
          /* PANTALLA FIN DE DIAGNÓSTICO */
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '3rem', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <h2 style={{ fontFamily: '"Fraunces", serif', fontSize: '32px', color: '#1B2A4A', marginBottom: '1rem' }}>
              Tu Perfil de Plataforma: <span style={{ color: '#0A7A70' }}>{winningPlatformName}</span>
            </h2>
            <p style={{ fontSize: '15px', color: '#4A4A5A', maxWidth: '600px', margin: '0 auto 2rem' }}>
              De acuerdo a tus 25 respuestas, este es el análisis multidimensional de afinidad tecnológica para tu ecosistema.
            </p>
            
            <div style={{ width: '100%', height: '350px', marginBottom: '2rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid stroke="#E5E7EB" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#4A4A5A', fontSize: 13, fontFamily: 'DM Mono' }} />
                  <PolarRadiusAxis angle={30} domain={[0, Math.max(5, maxScore)]} tick={false} axisLine={false} />
                  <Radar name="Afinidad" dataKey="A" stroke="#0A7A70" fill="#0A7A70" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {!emailSent ? (
              <div style={{ background: '#F8FAFC', padding: '2rem', borderRadius: '12px', border: '1.5px solid #E5E7EB' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '1rem', color: '#1B2A4A' }}>Recibe tu reporte metodológico</h3>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '1.5rem' }}>Ingresa tu correo para enviarte el análisis completo en PDF y habilitar la consultoría interactiva con <b>Tito Bits</b>, nuestro AI IA.</p>
                <form onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: '10px', maxWidth: '400px', margin: '0 auto' }}>
                  <input 
                    type="email" 
                    required 
                    placeholder="tucorreo@empresa.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #D1D5DB', outline: 'none', fontFamily: '"DM Sans", sans-serif' }}
                  />
                  <button type="submit" disabled={isSending} style={{ background: '#D95A1E', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: isSending ? 'not-allowed' : 'pointer', fontFamily: '"DM Sans", sans-serif' }}>
                    {isSending ? 'Enviando...' : 'Obtener Reporte'}
                  </button>
                </form>
              </div>
            ) : (
              <div style={{ background: '#ECFDF5', padding: '2rem', borderRadius: '12px', border: '1.5px solid #10B981' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '0.5rem' }}>
                  <div style={{ fontSize: '24px' }}>🎯</div>
                  <h3 style={{ fontSize: '18px', color: '#065F46', margin: 0 }}>¡Reporte ENVIADO a {email}!</h3>
                </div>
                <p style={{ fontSize: '14px', color: '#047857', marginBottom: '1.5rem' }}>Revisa la ventana emergente de chat en la esquina inferior derecha. Tito Bits ya tiene tus respuestas y te está esperando para profundizar en tu estudio de caso.</p>
                <button onClick={resetDiagnostic} style={{ background: '#FFF', border: '1px solid #10B981', color: '#065F46', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: 600, transition: 'background 0.2s' }}>
                  ↺ Iniciar nuevo diagnóstico
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
