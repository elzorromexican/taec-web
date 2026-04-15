/**
 * Controlador de interacciones exclusivas para la Landing de Totara LMS
 * Maneja el envío del formulario usando Fetch hacia Contact Endpoint SSR y el comportamiento de la barra interactiva.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Lógica de Formulario SSR
  const form = document.getElementById('tot-lead-form') as HTMLFormElement;
  if(form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn  = document.getElementById('tot-lead-btn') as HTMLButtonElement;
      const msg  = document.getElementById('tot-lead-msg');
      const link = document.getElementById('tot-download-link');
      
      if(btn) {
        btn.textContent = 'Enviando...';
        btn.disabled = true;
      }

      const getVal = (id: string) => (document.getElementById(id) as HTMLInputElement)?.value || '';
      
      // Auto-detección país vía encabezados Netlify (API lo manejará si mandamos MX)
      const payload = {
        nombre: getVal('tot-nombre'),
        empresa: getVal('tot-empresa'),
        correo: getVal('tot-email'),
        telefono: 'N/A',
        pais: 'N/A', // Se resolverá por IA o Netlify headers en SSR
        interes: 'Totara V20 PDF',
        mensaje: 'Cargo: ' + (getVal('tot-cargo') || '—'),
        pagina_origen: '/totara-lms-mexico',
        cta_origen: 'Descarga Lead Magnet'
      };

      try {
        const response = await fetch('/api/submit-contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          if(form) form.style.display = 'none';
          if(link) link.style.display = 'block';
          if(msg) {
            msg.style.display  = 'block';
            msg.style.color    = 'var(--check-green)';
            msg.textContent    = '✓ ¡Listo! Haz clic para descargar.';
          }
        } else {
          throw new Error('Error en API');
        }
      } catch (err) {
        // Fallback gracioso en caso de error para no truncar la descarga
        if(form) form.style.display = 'none';
        if(link) link.style.display = 'block';
        if(msg) {
          msg.style.display  = 'block';
          msg.style.color    = '#64748B';
          msg.textContent    = 'Descarga lista.';
        }
      }
    });
  }

  // 2. Lógica de Sticky Action Bar (Scroll Observer)
  const bar = document.getElementById('tot-sticky-bar');
  if(bar) {
    let shown = false;
    const btnDown = document.getElementById('tot-sticky-down');
    const btnClose = document.getElementById('tot-sticky-close');
    
    const hideBar = () => { bar.style.transform = 'translateY(100%)'; };
    
    if(btnDown) btnDown.addEventListener('click', hideBar);
    if(btnClose) btnClose.addEventListener('click', hideBar);

    window.addEventListener('scroll', () => {
      if(!shown && window.scrollY > 600){
        bar.style.transform = 'translateY(0)';
        shown = true;
      }
    }, { passive: true });
  }
});
