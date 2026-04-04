import React, { useState, useMemo } from 'react';
import type { Dimension, Question } from '../../data/diagnosticoData';
import { dimensions } from '../../data/diagnosticoData';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

type Platforms = 'lms_agil' | 'lms_corp' | 'lms_cert' | 'fabrica_ddc' | 'tools_autor' | 'vilt_zoom' | 'eval_proctor' | 'ecommerce';
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

  // Calculate scores (Baseline 1 to prevent empty radar)
  const scores = useMemo(() => {
    const s = { 
      lms_agil: 1, lms_corp: 1, lms_cert: 1, 
      fabrica_ddc: 1, tools_autor: 1, vilt_zoom: 1, 
      eval_proctor: 1, ecommerce: 1 
    };
    Object.values(answers).forEach((ans) => {
      if (ans.val === 'yes' && ans.insightPlat) {
        s[ans.insightPlat]++;
      }
    });
    return s;
  }, [answers]);

  const maxScore = Math.max(...Object.values(scores), 1); // Avoid 0

  const platNames = {
    lms_agil: "Ecosistema LMS Ágil",
    lms_corp: "Arquitectura LMS Corporativa",
    lms_cert: "Sistema de Certificación Externa",
    fabrica_ddc: "Servicio de Fábrica DDC",
    tools_autor: "Suite de Herramientas de Autor",
    vilt_zoom: "Ecosistema Sincrónico (VILT)",
    eval_proctor: "Sistema de Evaluación y Proctoring",
    ecommerce: "Acelerador E-Commerce Educativo"
  };

  const platPriority: Platforms[] = [
    'lms_corp', 'fabrica_ddc', 'tools_autor', 'lms_cert',
    'eval_proctor', 'ecommerce', 'vilt_zoom', 'lms_agil'
  ];
  const winningPlatformId = (Object.keys(scores) as Platforms[]).reduce((a, b) => {
    if (scores[b] > scores[a]) return b;
    if (scores[b] === scores[a]) return platPriority.indexOf(b) < platPriority.indexOf(a) ? b : a;
    return a;
  });
  const winningPlatformName = platNames[winningPlatformId];

  const chartData = [
    { subject: 'LMS Ágil', A: scores.lms_agil, fullMark: 6 },
    { subject: 'LMS Corporativo', A: scores.lms_corp, fullMark: 6 },
    { subject: 'Externa/Cert', A: scores.lms_cert, fullMark: 6 },
    { subject: 'Fábrica DDC', A: scores.fabrica_ddc, fullMark: 6 },
    { subject: 'Herramientas', A: scores.tools_autor, fullMark: 6 },
    { subject: 'Clases Zoom', A: scores.vilt_zoom, fullMark: 6 },
    { subject: 'Evaluaciones', A: scores.eval_proctor, fullMark: 6 },
    { subject: 'E-Commerce', A: scores.ecommerce, fullMark: 6 },
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

      // Extraer los "Dolores" críticos donde el prospecto respondió Sí (para inyectarlo al IA)
      const userSummary = Object.keys(answers)
        .filter(key => answers[key].val === 'yes')
        .map(key => {
          const [dIdx, qIdx] = key.split('-');
          return dimensions[dIdx as any].questions[qIdx as any].text;
        });

      // System Prompt Oculto para TitoBits ("Sacar Sopa" consultivamente)
      const prompt = `El prospecto con correo [${email}] acaba de completar su Diagnostico de TAEC con mayores puntajes en: [${winningPlatformName}].
El prospecto afirmó positivamente tener los siguientes desafíos exactos en su operación actual: 
"${userSummary.join('", "')}"

INSTRUCCIÓN SECRETA METODOLOGÍA CHALLENGER B2B:
- NO SAlUDES CON FRASES TÍPICAS O REPETITIVAS. Usa un enfoque consultivo agresivo y humano. Toma UNO de los dolores reales que el usuario acaba de aceptar de la lista de arriba y ábrele conversación sobre eso. 
- Por ejemplo, si aceptó tener audiencias de diferentes países, dile "Cerraste tus respuestas diciendo que tienes alumnos globales...".
- Si aceptó que requieren cumplimiento regulatorio estricto, profundiza diciendo "¿Qué auditoría o NOM los está persiguiendo?" o "Veo que traen urgencia por regulaciones externas".
- IMPORTANTE: TIENES ESTRICTAMENTE PROHIBIDO volver a pedir su correo, teléfono o nombre en todo el resto de la sesión. Ya sabemos quién es y su correo, no lo fastidies con burocracia.`;

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
                  <div style={{ marginTop: '2.5rem', marginBottom: '8rem', textAlign: 'center', animation: 'fadeSlideIn 0.5s ease' }}>
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
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '3rem', marginBottom: '8rem', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            {!emailSent ? (
              <>
                <h2 style={{ fontFamily: '"Fraunces", serif', fontSize: '32px', color: '#1B2A4A', marginBottom: '1rem' }}>
                  Tu Diagnóstico: <span style={{ color: '#0A7A70' }}>{winningPlatformName}</span>
                </h2>
                <p style={{ fontSize: '15px', color: '#4A4A5A', maxWidth: '600px', margin: '0 auto 2rem' }}>
                  Hemos mapeado tus 25 respuestas y estas son las dimensiones tecnológicas críticas para tu caso.
                </p>

                <div style={{ width: '100%', height: '400px', marginBottom: '3rem' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                      <PolarGrid stroke="#E5E7EB" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#4A4A5A', fontSize: 13, fontFamily: 'DM Mono' }} />
                      <PolarRadiusAxis angle={30} domain={[0, Math.max(5, maxScore)]} tick={false} axisLine={false} />
                      <Radar name="Afinidad" dataKey="A" stroke="#0A7A70" fill="#0A7A70" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div style={{ background: '#F8FAFC', padding: '2rem', borderRadius: '12px', border: '1.5px solid #E5E7EB' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '1rem', color: '#1B2A4A' }}>Profundiza tus Resultados</h3>
                  <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '1.5rem' }}>Ingresa tu correo para recibir las arquitecturas recomendadas y habilitar la consultoría interactiva inteligente (Tito Bits) con un ejecutivo en la esquina de la pantalla.</p>
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
                      {isSending ? 'Autorizando...' : 'Hablar Inmediatamente'}
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div style={{ padding: '3rem 1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#F4FBF9', border: '3px solid #0A7A70', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>🎯</div>
                </div>
                <h2 style={{ fontFamily: '"Fraunces", serif', fontSize: '32px', color: '#1B2A4A', marginBottom: '1.5rem' }}>
                  Arquitectura Autorizada
                </h2>
                <div style={{ background: '#F8F8F5', padding: '2rem', borderRadius: '12px', border: '1px solid #E5E7EB', maxWidth: '600px', margin: '0 auto 2.5rem', textAlign: 'left' }}>
                  <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#0A7A70', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.1em', fontWeight: 600 }}>Tito Bits ya está al mando</div>
                  <p style={{ fontSize: '15px', color: '#4A4A5A', lineHeight: 1.6, margin: 0 }}>
                    Tu correo <b style={{ color: '#1B2A4A' }}>{email}</b> se verificó de forma segura. Ocultamos el desglose público por políticas de privacidad.<br/><br/>
                    En este momento la ventana del asesor virtual en la <b>esquina inferior derecha</b> ya se despertó y analizó todas tus respuestas y vulnerabilidades detectadas.<br/><br/>
                    <b>Siguiente Paso Crítico:</b> Interactúa con Tito Bits en el chat para complementar el análisis de tu diagnóstico respondiendo un par de preguntas clave de tu operación.
                  </p>
                </div>
                <button onClick={resetDiagnostic} style={{ background: 'transparent', border: 'none', color: '#4A4A5A', fontSize: '13px', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}>
                  Empezar flujo de diagnóstico nuevo
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
