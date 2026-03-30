import type { APIRoute } from 'astro';
import { promos } from '../../data/promos';

export const GET: APIRoute = async ({ request, url }) => {
  // RED TEAM: Geo se resuelve 100% Server Side mediante los headers de Netlify/Vercel
  const countryCode = request.headers.get('x-nf-country') || 'MX'; // Fallback a MX para dev
  const path = url.searchParams.get('path') || '';

  // Filtramos si la promo está activa y si el país hace match con nuestro catálogo
  const applicablePromos = promos.filter(p => p.active && (p.countries.includes(countryCode) || p.countries.includes('GLOBAL')));
  
  let promoToInject = null;
  if (applicablePromos.length > 0) {
    // Escenario 1: Si hay una URL de Producto en específico en la promo (ej. 'vyond') le damos prioridad
    const urlMatchedPromo = applicablePromos.find(p => p.urlTrigger && path.includes(p.urlTrigger));
    // Escenario 2: La genérica del país
    promoToInject = urlMatchedPromo || applicablePromos[0];
  }

  return new Response(JSON.stringify({ promo: promoToInject }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
