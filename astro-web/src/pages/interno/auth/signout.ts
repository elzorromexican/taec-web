import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies, redirect }) => {
	cookies.delete("sb-access-token", { path: "/" });
	cookies.delete("sb-refresh-token", { path: "/" });

	// Destruimos explícitamente y mandamos de regreso al login
	return redirect("/interno/login");
};
