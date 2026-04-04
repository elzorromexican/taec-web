import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const audiencia = url.searchParams.get('audiencia') || 'titbits';
  const seccion = url.searchParams.get('seccion');

  let query = supabase
    .from('kb_items')
    .select('seccion, pregunta, plus, menos, fuente, version, updated_at')
    .eq('activo', true)
    .contains('audiencia', [audiencia])
    .order('orden', { ascending: true });

  if (seccion) {
    query = query.eq('seccion', seccion);
  }

  const { data, error } = await query;

  if (error) {
    return new Response(JSON.stringify({
      status: "error",
      message: "Falla al conectar con Supabase",
      details: error.message
    }), { status: 500 });
  }

  return new Response(JSON.stringify({
    status: "success",
    data
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
