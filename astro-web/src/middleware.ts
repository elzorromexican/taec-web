import { defineMiddleware } from 'astro:middleware';
import { supabase } from './lib/supabase';

// Helper para instanciar cliente de service_role (Admin bypass) si se requiere saltar RLS en SSR. 
// Para mayor seguridad la lista autorizados debe ser chequeada del lado seguro.
import { createClient } from '@supabase/supabase-js';

export const onRequest = defineMiddleware(async ({ request, url, cookies, redirect, locals }, next) => {
  if (url.pathname.startsWith('/interno') && !url.pathname.startsWith('/interno/login') && !url.pathname.startsWith('/interno/denegado') && !url.pathname.startsWith('/interno/auth')) {
    
    // Obtenemos sesión desde los headers/cookies que llegan al server
    const accessToken = cookies.get('sb-access-token')?.value;
    const refreshToken = cookies.get('sb-refresh-token')?.value;

    if (!accessToken || !refreshToken) {
      return redirect('/interno/login');
    }

    const { data: { session }, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    });

    if (error || !session) {
      return redirect('/interno/login');
    }

    const userEmail = session.user.email;
    const userNameRaw = session.user.user_metadata?.full_name || session.user.user_metadata?.name || userEmail;

    // Validación 1: El correo debe terminar en @taec.com.mx
    if (!userEmail?.endsWith('@taec.com.mx')) {
      return redirect('/interno/denegado?reason=domain');
    }

    // Validación 2: Obtener Rol y Estatus (Auto-Confianza)
    // No bloqueamos si no existe en la BD. Si existe explícitamente como inactivo, lo bloqueamos.
    const { data: userData } = await supabase
      .from('usuarios_autorizados')
      .select('activo, rol')
      .eq('email', userEmail)
      .single();

    // Soft-Ban: Si RRHH lo desactivó aquí antes de que TI borre el correo en Google
    if (userData && userData.activo === false) {
      return redirect('/interno/denegado?reason=whitelist');
    }

    // Guardamos la identidad (Si no está en la base, asume rol base de empleado)
    locals.email = userEmail;
    locals.name = userNameRaw;
    locals.rol = userData?.rol || 'empleado';
    // Pasamos el token FRESCO (puede haber sido renovado por setSession) a locals
    // para que las páginas SSR lo usen sin leer el cookie potencialmente expirado
    locals.accessToken = session.access_token;
  }

  // Decomiso para endpoints no protegidos
  return next();
});
