import type React from "react";
import { useEffect, useState } from "react";
import { getSupabaseClient } from "./supabaseHelper";

type TitoConfig = {
	id: number;
	mode: "breve" | "medio" | "bavardo";
};

export default function AdminTitoConfig({
	supabaseUrl,
	supabaseKey,
	accessToken,
}: {
	supabaseUrl: string;
	supabaseKey: string;
	accessToken: string;
}) {
	const [config, setConfig] = useState<TitoConfig | null>(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [mode, setMode] = useState<"breve" | "medio" | "bavardo">("medio");

	const supabase = getSupabaseClient(supabaseUrl, supabaseKey, accessToken);

	const fetchConfig = async () => {
		setLoading(true);
		const { data, error } = await supabase
			.from("tito_config")
			.select("*")
			.eq("id", 1)
			.single();

		if (!error && data) {
			setConfig(data);
			setMode(data.mode);
		} else {
			console.error("Error fetching config:", error);
			// Fallback si no existe la tabla o el registro
			setMode("medio");
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchConfig();
	}, []);

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();
		setSaving(true);
		
		const { error } = await supabase
			.from("tito_config")
			.update({ mode })
			.eq("id", 1);

		if (!error) {
			alert("Personalidad actualizada correctamente.");
			fetchConfig();
		} else {
			alert("Error actualizando la personalidad: " + error.message);
		}
		setSaving(false);
	};

	return (
		<div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
			<h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>Configuración de Personalidad de TitoBits</h2>
			<p style={{ color: "#64748b", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
				Selecciona cómo quieres que TitoBits se comunique con los usuarios. Este cambio será inmediato.
			</p>
			
			{loading ? (
				<p>Cargando configuración...</p>
			) : (
				<form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
					<label style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
						<span style={{ fontWeight: "600", fontSize: "0.9rem" }}>Modo de Personalidad</span>
						<select
							value={mode}
							onChange={(e) => setMode(e.target.value as "breve" | "medio" | "bavardo")}
							style={{
								padding: "0.5rem",
								borderRadius: "4px",
								border: "1px solid #cbd5e1",
								backgroundColor: "white",
								fontSize: "0.95rem"
							}}
						>
							<option value="breve">Breve (Directo, telegrafico, 1 párrafo máximo)</option>
							<option value="medio">Medio (Equilibrado, 2-3 párrafos)</option>
							<option value="bavardo">Bavardo (Explicativo, detallado)</option>
						</select>
					</label>
					<button
						type="submit"
						disabled={saving}
						style={{
							padding: "0.75rem 1rem",
							backgroundColor: "var(--navy-slate, #1e293b)",
							color: "white",
							border: "none",
							borderRadius: "4px",
							cursor: saving ? "not-allowed" : "pointer",
							fontWeight: "bold",
							opacity: saving ? 0.7 : 1,
							marginTop: "0.5rem"
						}}
					>
						{saving ? "Guardando..." : "Guardar Personalidad"}
					</button>
				</form>
			)}
		</div>
	);
}
