import React, { useState } from 'react';
import './CotizadorDDC.css';
import pricingMatrix from '../../data/ddc-pricing-matrix.json';

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
      // Bypass: Motor Client-Side temporal para GitHub Pages
      const TARIFA_HH = 680; // Hardcode temporal del ENV
      
      const getVoiceMargin = (type: string) => {
        if (type === 'tts') return 1.05;
        if (type === 'semi_pro') return 1.10;
        if (type === 'professional') return 1.20;
        return 1.0;
      };

      const getVolumeDiscount = (band: string) => {
        if (band === '2_5') return 0.05;
        if (band === '6_10') return 0.08;
        if (band === '11_plus') return 0.10;
        return 0.0;
      };
      
      const mapLevel = (level: string) => {
        if (level === 'none') return 'Sin DI';
        if (level === 'basic') return 'Básico';
        if (level === 'medium') return 'Medio';
        if (level === 'advanced') return 'Alto';
        return 'Básico';
      };

      const mapDuration = (band: string) => {
        const parts = String(band).split('_');
        return parts[parts.length - 1]; 
      };

      // Simular delay de cálculo para la UX de React
      await new Promise(r => setTimeout(r, 600));

      let targetMatrix = (pricingMatrix as any)[product];
      let dmLevel = mapLevel((product === 'vyond' ? animationLevel : visualLevel) || 'basic');
      let diLevel = mapLevel(instructionalLevel);
      let durationKey = mapDuration(durationBand);
      
      let matrixKey = `${dmLevel}_${diLevel}`;
      let baseHH = targetMatrix?.[matrixKey]?.[durationKey] || 0;

      if (!baseHH) {
        throw new Error('No hay tarifas base definidas para esta combinación exacta de niveles y duración. Ajusta los parámetros.');
      }

      let subtotal = baseHH * TARIFA_HH;
      subtotal = subtotal * getVoiceMargin(voiceType);
      subtotal = subtotal * (1 - getVolumeDiscount(volumeBand));

      // REGLA COMERCIAL: El subtotal calculado YA INCLUYE el margen de la tarifa por hora ($680). 
      // Por lo tanto, el subtotal debe ser siempre el PISO MÍNIMO, nunca pivotar hacia abajo para no romper el suelo de rentabilidad.
      const estimatedFrom = Math.floor(subtotal);
      
      // Hacia arriba, dejamos una ventana presupuestal para contingencias/scope-creep del 20%.
      const marginCeiling = 1.20;
      const estimatedTo = Math.ceil(subtotal * marginCeiling);

      setResult({
        product,
        estimatedFrom,
        estimatedTo,
        currency: 'MXN',
        deliveryRange: '15-20 días hábiles (Promedio)',
        disclaimer: '⚠️ ESTIMADOR INTERNO (Modo Client-Side). El componente React ha procesado exitosamente la matemática del JSON base sin depender del Backend SSG.',
        leadMessage: 'Si los números cuadran a las métricas del Q2, podemos habilitar esta matriz oficial en Vercel.'
      });

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
