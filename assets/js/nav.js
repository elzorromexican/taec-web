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
  var page = location.pathname.split('/').pop() || 'index.html';
  var p    = location.pathname;

  var isCurso = /curso-/.test(p);
  var secMap = {
    'Soluciones': !isCurso && /articulate|vyond|moodle|totara|ottolearn|lys|bigbluebutton|zoola|class-taec|proctorizer|strikeplagiarism|servicios/.test(p),
    'Capacitaci': /capacitacion|7minutes|go1|customguide|curso-/.test(p),
    'Recursos':   /blog|articulos|glosario|comparativos|estandares|radar|quiz|recursos/.test(p)
  };

  Object.keys(secMap).forEach(function (sec) {
    if (secMap[sec]) {
      document.querySelectorAll('header button.nav-link').forEach(function (btn) {
        if (btn.textContent.trim().indexOf(sec) === 0) btn.classList.add('active');
      });
    }
  });

  document.querySelectorAll('header a[href]').forEach(function (a) {
    var href = a.getAttribute('href') || '';
    if (!href || href === '#' || href.indexOf('mailto:') === 0 ||
        href.indexOf('tel:') === 0 || href.indexOf('http') === 0 ||
        a.classList.contains('logo-link') || a.classList.contains('btn-cta')) return;
    if (a.closest('.mega-menu') || a.closest('.simple-dropdown')) return;
    var linked = href.split('/').pop();
    if (linked && linked === page) a.classList.add('active');
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
