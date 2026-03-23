/**
 * Lógica genérica para filtrado y búsqueda en rejillas de contenido (Blog, Artículos, Estándares)
 * Encapsulado para evitar colisiones en el scope global y facilitar su reutilización.
 */

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.grid-item');
  const noResults = document.getElementById('no-results');
  const resultsCount = document.getElementById('results-count');
  
  if (!searchInput && filterBtns.length === 0) return; // Salir si no estamos en una página de contenido

  let currentSearch = '';
  let currentTag = 'ALL';

  const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  function filterItems() {
    let visibleCount = 0;
    const searchNorm = normalize(currentSearch);

    items.forEach(item => {
      const el = item as HTMLElement;
      const titleStr = normalize(el.getAttribute('data-title') || '');
      const descStr = normalize(el.getAttribute('data-desc') || '');
      const tagsStr = el.getAttribute('data-tags') || '';
      
      let matchesSearch = searchNorm ? (titleStr.includes(searchNorm) || descStr.includes(searchNorm)) : true;
      let matchesTag = currentTag !== 'ALL' ? (tagsStr.includes(currentTag)) : true;
      
      if (matchesSearch && matchesTag) {
        el.style.display = 'block';
        visibleCount++;
      } else {
        el.style.display = 'none';
      }
    });
    
    if (resultsCount) {
      resultsCount.textContent = `${visibleCount} post${visibleCount !== 1 ? 's' : ''}`;
    }
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = (e.target as HTMLInputElement).value.trim();
      filterItems();
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      const target = e.target as HTMLElement;
      target.classList.add('active');
      currentTag = target.getAttribute('data-tag') || 'ALL';
      
      if (searchInput) {
        searchInput.value = '';
        currentSearch = '';
      }
      
      filterItems();
    });
  });
});
