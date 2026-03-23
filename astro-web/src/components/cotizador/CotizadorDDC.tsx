import React, { useState } from 'react';
import './CotizadorDDC.css';

export default function CotizadorDDC() {
  const [product, setProduct] = useState('storyline');
  const [durationBand, setDurationBand] = useState('10');
  const [instructionalLevel, setInstructionalLevel] = useState('basic');
  const [visualLevel, setVisualLevel] = useState('medium');
  const [animationLevel, setAnimationLevel] = useState('medium');
  const [voiceType, setVoiceType] = useState('none');
  const [volumeBand, setVolumeBand] = useState('1');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/calcular-cotizacion-ddc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product,
          durationBand,
          instructionalLevel,
          visualLevel: product !== 'vyond' ? visualLevel : undefined,
          animationLevel: product === 'vyond' ? animationLevel : undefined,
          voiceType,
          volumeBand
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error calculando cotización.');

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isVyond = product === 'vyond';

  return (
    <div className="ddc-island">
      <div className="ddc-island-header">
        <h2>Estimador de Proyectos DDC</h2>
        <p>Configura las variables de tu desarrollo para obtener un rango base al instante.</p>
      </div>

      <form className="ddc-form" onSubmit={handleCalculate}>
        <div className="ddc-grid">
          
          <div className="ddc-field">
            <label>Plataforma o Formato</label>
            <select value={product} onChange={(e) => {
              setProduct(e.target.value);
              setDurationBand(e.target.value === 'vyond' ? '3' : '15');
            }}>
              <option value="storyline">Storyline 360 (A medida)</option>
              <option value="rise">Rise 360 (Responsivo)</option>
              <option value="vyond">Vyond (Video Animado)</option>
            </select>
          </div>

          <div className="ddc-field">
            <label>{isVyond ? 'Duración (Minutos)' : 'Duración / Extensión (Minutos aprox)'}</label>
            <select value={durationBand} onChange={(e) => setDurationBand(e.target.value)}>
              {isVyond ? (
                <>
                  <option value="1">1 Minuto</option>
                  <option value="2">2 Minutos</option>
                  <option value="3">3 Minutos</option>
                  <option value="5">5 Minutos</option>
                  <option value="10">10 Minutos</option>
                </>
              ) : (
                <>
                  <option value="5">Hasta 5 min</option>
                  <option value="10">Hasta 10 min</option>
                  <option value="15">11-15 min</option>
                  <option value="20">16-20 min</option>
                  <option value="30">21-30 min</option>
                  <option value="45">31-45 min</option>
                  <option value="60">46-60 min</option>
                </>
              )}
            </select>
          </div>

          <div className="ddc-field">
            <label>Nivel de Diseño Instruccional</label>
            <select value={instructionalLevel} onChange={(e) => setInstructionalLevel(e.target.value)}>
              <option value="none">Sin DI (Cliente entrega guion)</option>
              <option value="basic">Básico</option>
              <option value="medium">Medio</option>
              <option value="advanced">Alto (Levantamiento completo)</option>
            </select>
          </div>

          {isVyond ? (
            <div className="ddc-field">
              <label>Complejidad de Animación</label>
              <select value={animationLevel} onChange={(e) => setAnimationLevel(e.target.value)}>
                <option value="basic">Básica</option>
                <option value="medium">Media</option>
                <option value="advanced">Alta</option>
              </select>
            </div>
          ) : (
            <div className="ddc-field">
              <label>Complejidad Visual / Interactiva</label>
              <select value={visualLevel} onChange={(e) => setVisualLevel(e.target.value)}>
                <option value="basic">Básica (Plantillas simples)</option>
                <option value="medium">Media</option>
                <option value="advanced">Alta (A medida/Simulaciones)</option>
              </select>
            </div>
          )}

          <div className="ddc-field">
            <label>Locución Digital</label>
            <select value={voiceType} onChange={(e) => setVoiceType(e.target.value)}>
              <option value="none">Sin locución</option>
              <option value="tts">Sintética (TTS IA)</option>
              <option value="semi_pro">Semi-profesional</option>
              <option value="professional">Profesional (Estudio)</option>
            </select>
          </div>

          <div className="ddc-field">
            <label>Descuento por Volumen (Cursos)</label>
            <select value={volumeBand} onChange={(e) => setVolumeBand(e.target.value)}>
              <option value="1">1 Proyecto</option>
              <option value="2_5">De 2 a 5 Proyectos</option>
              <option value="6_10">De 6 a 10 Proyectos</option>
              <option value="11_plus">Más de 10 Proyectos</option>
            </select>
          </div>
        </div>

        <button type="submit" className="ddc-submit" disabled={loading}>
          {loading ? 'Calculando...' : 'Obtener Estimación'}
        </button>
      </form>

      {error && <div className="ddc-error">{error}</div>}

      {result && (
        <div className="ddc-result">
          <div className="ddc-price-box">
            <span className="label">Inversión Estimada:</span>
            <strong className="amount">
              ${result.estimatedFrom.toLocaleString('es-MX')} - ${result.estimatedTo.toLocaleString('es-MX')} {result.currency}
            </strong>
          </div>
          <div className="ddc-details">
            <p><strong>Tiempo de entrega:</strong> {result.deliveryRange}</p>
            <p className="disclaimer">{result.disclaimer}</p>
            <p className="lead-msg">{result.leadMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
