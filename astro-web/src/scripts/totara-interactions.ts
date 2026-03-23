/**
 * Controlador de interacciones exclusivas para la Landing de Totara LMS
 * Maneja el envío del formulario usando EmailJS y el comportamiento de la barra interactiva.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Lógica de Formulario EmailJS
  const form = document.getElementById('tot-lead-form') as HTMLFormElement;
  if(form) {
    const rawKeys = form.getAttribute('data-keys');
    if(rawKeys && typeof (window as any).emailjs !== 'undefined') {
      try {
        const totaraEjs = JSON.parse(rawKeys);
        (window as any).emailjs.init(totaraEjs.publicKey);

        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const btn  = document.getElementById('tot-lead-btn') as HTMLButtonElement;
          const msg  = document.getElementById('tot-lead-msg');
          const link = document.getElementById('tot-download-link');
          
          if(btn) {
            btn.textContent = 'Enviando...';
            btn.disabled = true;
          }

          const getVal = (id: string) => (document.getElementById(id) as HTMLInputElement)?.value || '';

          const params = {
            from_name: getVal('tot-nombre'),
            empresa:   getVal('tot-empresa'),
            reply_to:  getVal('tot-email'),
            message:   'Cargo: ' + (getVal('tot-cargo') || '—') + '\nRecurso: Totara V20 Novedades PDF'
          };

          (window as any).emailjs.send(totaraEjs.serviceId, totaraEjs.templateId, params)
            .then(() => {
              if(form) form.style.display = 'none';
              if(link) link.style.display = 'block';
              if(msg) {
                msg.style.display  = 'block';
                msg.style.color    = '#10B981';
                msg.textContent    = '✓ ¡Listo! Haz clic para descargar.';
              }
            })
            .catch(() => {
              // Fallback gracioso en caso de error para no truncar la descarga
              if(form) form.style.display = 'none';
              if(link) link.style.display = 'block';
              if(msg) {
                msg.style.display  = 'block';
                msg.style.color    = '#64748B';
                msg.textContent    = 'Descarga lista.';
              }
            });
        });
      } catch(err) {
        console.error("Configuración EmailJS inválida", err);
      }
    }
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
