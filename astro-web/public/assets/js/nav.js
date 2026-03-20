/* ═══════════════════════════════════════════════════════════════
   TAEC · nav.js · Navegación global: año, active nav, hamburger,
                   acordeón móvil, dropdown click-toggle
   Extraído de los HTML en Fase 1 (refactor/fase1-css-js-global)
   Fuente canónica: v2.5 · 18 mar 2026
   Carga: <script src="assets/js/nav.js" defer></script>
   ═══════════════════════════════════════════════════════════════ */

/* ── AÑO DINÁMICO EN FOOTER ── */
(function () {
  var el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ── ACTIVE NAV: marca la ficha de cardex del ítem activo ── */
(function () {
  // 1. Obtenemos los valores de forma segura y los pasamos a minúsculas para evitar errores tipográficos
  var activeSection = (document.body.getAttribute('data-section') || '').toLowerCase();
  var activePage = (document.body.getAttribute('data-page') || '').toLowerCase();

  // 1b. Fallback por keywords en URL cuando data-section no distingue la sección correcta
  if (!activeSection) {
    var urlPath = location.pathname.toLowerCase();
    var solucionesKeywords = ['articulate', 'vyond', 'totara', 'moodle', 'ottolearn', 'lys', 'bigbluebutton', 'zoola', 'proctorizer', 'strikeplagiarism', '7minutes', 'go1', 'customguide', 'class-taec'];
    var recursosKeywords   = ['blog', 'glosario', 'comparativos', 'estandares', 'radar', 'quiz', 'articulos', 'recursos'];
    if (solucionesKeywords.some(function(k) { return urlPath.indexOf(k) !== -1; })) {
      activeSection = 'soluciones';
    } else if (recursosKeywords.some(function(k) { return urlPath.indexOf(k) !== -1; })) {
      activeSection = 'recursos';
    }
  }

  // 2. Marcar la sección principal (Dropdowns/Botones Y Enlaces directos en el header)
  if (activeSection) {
    // Usamos el selector robusto para atrapar '.nav-link' y también <a> sueltos (ej. Nosotros/Clientes)
    document.querySelectorAll('header .nav-link, header nav > a').forEach(function (el) {
      var text = el.textContent.trim().toLowerCase();
      if (text.indexOf(activeSection) === 0) {
        el.classList.add('active');
      }
    });
  }

  // 3. Marcar enlaces individuales directos (para el submenú o casos sin data-section)
  var path = location.pathname;
  // Si la ruta termina en '/', asumimos que es index.html
  var currentPage = path.endsWith('/') ? 'index.html' : path.split('/').pop() || 'index.html';
  currentPage = currentPage.toLowerCase();
  
  document.querySelectorAll('header a[href]').forEach(function (a) {
    var href = a.getAttribute('href') || '';
    
    // Ignorar links de utilidad o externos
    if (!href || href === '#' || href.indexOf('mailto:') === 0 ||
        href.indexOf('tel:') === 0 || href.indexOf('http') === 0 ||
        a.classList.contains('logo-link') || a.classList.contains('btn-cta')) return;
    
    // Ignorar items dentro de los dropdowns si solo queremos marcar el nivel superior
    if (a.closest('.mega-menu') || a.closest('.simple-dropdown')) return;
    
    var linked = href.endsWith('/') ? 'index.html' : href.split('/').pop() || 'index.html';
    linked = linked.toLowerCase();
    
    // Validar prioridad: data-page estricto > fallback a la URL actual
    if (activePage) {
      if (linked === activePage) a.classList.add('active');
    } else {
      if (linked === currentPage) a.classList.add('active');
    }
  });
})();

/* ── HAMBURGER TOGGLE ── */
(function () {
  var menuBtn   = document.getElementById('menuBtn');
  var mobileNav = document.getElementById('mobileNav');
  if (!menuBtn || !mobileNav) return;
  menuBtn.addEventListener('click', function () {
    menuBtn.classList.toggle('open');
    mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-label',
      mobileNav.classList.contains('open') ? 'Cerrar menú' : 'Abrir menú');
  });
})();

/* ── ACORDEÓN MÓVIL (toggleMob llamado por onclick en HTML) ── */
function toggleMob(sectionId, btnId) {
  var sec = document.getElementById(sectionId);
  var btn = document.getElementById(btnId);
  if (!sec || !btn) return;
  sec.classList.toggle('open');
  btn.classList.toggle('open');
  btn.setAttribute('aria-expanded', btn.classList.contains('open') ? 'true' : 'false');
}

/* ── DROPDOWN DESKTOP: click-toggle + cierre al hacer clic fuera ── */
(function () {
  document.querySelectorAll('.nav-item').forEach(function (item) {
    var btn = item.querySelector('button.nav-link');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.nav-item').forEach(function (i) {
        i.classList.remove('open');
        var b = i.querySelector('button.nav-link');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.nav-item').forEach(function (i) {
      i.classList.remove('open');
      var b = i.querySelector('button.nav-link');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  });
})();
