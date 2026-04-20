import { defineMiddleware } from "astro:middleware";
import { createClient } from "@supabase/supabase-js";

export const onRequest = defineMiddleware(
	async ({ request, url, cookies, redirect, locals }, next) => {
		if (
			url.pathname.startsWith("/interno") &&
			!url.pathname.startsWith("/interno/login") &&
			!url.pathname.startsWith("/interno/denegado") &&
			!url.pathname.startsWith("/interno/auth")
		) {
			// Obtenemos sesión desde los headers/cookies que llegan al server
			const accessToken = cookies.get("sb-access-token")?.value;
			const refreshToken = cookies.get("sb-refresh-token")?.value;

			if (!accessToken || !refreshToken) {
				return redirect("/interno/login?reason=missing");
			}

			// Instancia limpia para SSR (Evita fuga de memoria cruzada entre peticiones GET simultáneas)
			const supabaseUrl =
				import.meta.env.PUBLIC_SUPABASE_URL ||
				process.env.PUBLIC_SUPABASE_URL ||
				"";
			const supabaseAnonKey =
				import.meta.env.PUBLIC_SUPABASE_ANON_KEY ||
				process.env.PUBLIC_SUPABASE_ANON_KEY ||
				"";
			// Service role key para consultas internas — bypasea RLS y garantiza que la whitelist
			// siempre es consultable independientemente de la configuración de políticas en Supabase.
			const serviceKey =
				import.meta.env.SUPABASE_SERVICE_ROLE_KEY ||
				(process.env as Record<string, string | undefined>)[
					"SUPABASE_SERVICE_ROLE_KEY"
				] ||
				supabaseAnonKey; // fallback seguro mientras no esté configurada

			// Cliente para auth (necesita anonKey para setSession con JWT del usuario)
			const supabase = createClient(supabaseUrl, supabaseAnonKey);
			// Cliente para consultas internas de servidor (usa serviceKey)
			const supabaseAdmin = createClient(supabaseUrl, serviceKey);

			const {
				data: { session },
				error,
			} = await supabase.auth.setSession({
				access_token: accessToken,
				refresh_token: refreshToken,
			});

			if (error || !session) {
				return redirect("/interno/login?reason=expired");
			}

			// Actualizamos las cookies en el cliente si es que Supabase renovó la sesión por debajo
			if (session.access_token !== accessToken) {
				cookies.set("sb-access-token", session.access_token, { path: "/" });
			}
			if (session.refresh_token !== refreshToken) {
				cookies.set("sb-refresh-token", session.refresh_token, { path: "/" });
			}

			const userEmail = session.user.email;
			const userNameRaw =
				session.user.user_metadata?.full_name ||
				session.user.user_metadata?.name ||
				userEmail;

			// Validación 1: El correo debe terminar en @taec.com.mx
			if (!userEmail?.endsWith("@taec.com.mx")) {
				console.warn(
					`[SECURITY ALERT] Tentativa de acceso rechazada por dominio ajeno: ${userEmail} a ${url.pathname}`,
				);
				return redirect("/interno/denegado?reason=domain");
			}

			// Validación 2: Obtener Rol y Estatus — usamos el cliente auth ya que el usuario está logueado
			// Esto funciona porque RLS de usuarios_autorizados permite SELECT a "authenticated".
			const { data: userData, error: userError } = await supabase
				.from("usuarios_autorizados")
				.select("activo, rol")
				.ilike("email", userEmail)
				.single();

			console.log(
				`[DEBUG AUTH] Evaluando perfil de: ${userEmail}. Result:`,
				userData,
				`Error DB:`,
				userError?.message,
			);

			// Soft-Ban: Si RRHH lo desactivó aquí antes de que TI borre el correo en Google
			if (userData && userData.activo === false) {
				console.warn(
					`[SECURITY ALERT] Intento de acceso por usuario suspendido (Soft-Ban): ${userEmail}`,
				);
				return redirect("/interno/denegado?reason=whitelist");
			}

			// Guardamos la identidad (Si no está en la base, asume rol base de empleado)
			locals.email = userEmail;
			locals.name = userNameRaw;
			locals.rol = userData?.rol || "empleado";
			// Pasamos el token FRESCO (puede haber sido renovado por setSession) a locals
			// para que las páginas SSR lo usen sin leer el cookie potencialmente expirado
			locals.accessToken = session.access_token;

			// Role-Guard: Protección estricta de rutas administrativas B2B
			if (url.pathname.startsWith("/interno/admin") && locals.rol !== "admin") {
				console.warn(
					`[SECURITY ALERT] Intento de escalación de privilegios hacia /admin por: ${userEmail} (Rol: ${locals.rol})`,
				);
				return redirect("/interno/denegado?reason=unauthorized");
			}
		}

		// Decomiso para endpoints no protegidos
		return next();
	},
);
