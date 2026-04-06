export const prerender = false;

import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const CommentSchema = z.object({
  post_slug:              z.string().min(1).max(200),
  author_name:            z.string().min(1).max(100),
  author_email:           z.string().email().max(150),
  author_url:             z.string().max(300).optional().default(''),
  content:                z.string().min(1).max(3000),
  'cf-turnstile-response': z.string().min(1, 'Falta token de verificación Turnstile'),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Payload inválido.' }), { status: 400 });
    }

    const parsed = CommentSchema.safeParse(body);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: 'Datos inválidos.', details: parsed.error.flatten() }),
        { status: 400 }
      );
    }

    const { 'cf-turnstile-response': token, author_url, ...commentData } = parsed.data;

    // ── Verificación Turnstile server-side ──────────────────────────────────
    const secretKey =
      import.meta.env.CF_TURNSTILE_SECRET_KEY ||
      (process.env as Record<string, string | undefined>)['CF_TURNSTILE_SECRET_KEY'];

    if (!secretKey) {
      console.error('CF_TURNSTILE_SECRET_KEY no configurada');
      return new Response(JSON.stringify({ error: 'Configuración de seguridad incompleta.' }), { status: 500 });
    }

    const ip =
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-forwarded-for') ||
      '';

    const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: secretKey, response: token, remoteip: ip }),
    });

    const turnstileData = await turnstileRes.json() as { success: boolean };

    if (!turnstileData.success) {
      return new Response(
        JSON.stringify({ error: 'Verificación de seguridad fallida. Intenta de nuevo.' }),
        { status: 403 }
      );
    }

    // ── Insertar en Supabase con service role key (omite RLS) ───────────────
    const supabaseUrl =
      import.meta.env.PUBLIC_SUPABASE_URL ||
      (process.env as Record<string, string | undefined>)['PUBLIC_SUPABASE_URL'] || '';

    const serviceKey =
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY ||
      (process.env as Record<string, string | undefined>)['SUPABASE_SERVICE_ROLE_KEY'] || '';

    if (!supabaseUrl || !serviceKey) {
      console.error('Variables de Supabase no configuradas en el servidor');
      return new Response(JSON.stringify({ error: 'Error de configuración del servidor.' }), { status: 500 });
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    const { error: dbError } = await supabase.from('comments').insert({
      post_slug:    commentData.post_slug,
      author_name:  commentData.author_name,
      author_email: commentData.author_email,
      author_url:   author_url || null,
      content:      commentData.content,
      status:       'pending', // siempre pending — nunca confiar en el cliente
    });

    if (dbError) {
      console.error('Supabase insert error:', dbError.message);
      return new Response(JSON.stringify({ error: 'Error al guardar el comentario.' }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 201 });

  } catch (err) {
    console.error('submit-comment unexpected error:', err);
    return new Response(JSON.stringify({ error: 'Error interno del servidor.' }), { status: 500 });
  }
};
