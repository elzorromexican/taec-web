/**
 * @name diagnosticoData.ts
 * @version 2.0
 * @description Data and types for the updated (v2) Diagnostico process. Includes Stage, Pain scores and weights.
 * @inputs N/A
 * @outputs Types and the stages array with questions.
 * @dependencies N/A
 * @created 2026-04-12
 * @updated 2026-04-13 19:37:00
 */

// Ejes de dolor — lo que mide el radar principal
export type PainAxis =
	| "admin" // Dolor Administrativo (STPS, nóminas, reportes)
	| "contenido" // Brecha de Contenido (sin material, updates frecuentes)
	| "tecnologia" // Brecha Tecnológica (sin LMS, integraciones faltantes)
	| "normativa" // Riesgo Normativo (DC-3, cumplimiento)
	| "escala" // Ineficiencia de Escala (rotación alta, geografía)
	| "monetizacion"; // Oportunidad de Monetización (certificación externa, ecommerce)

// IDs de producto (sin cambio vs. actual)
export type PlatformId =
	| "lms_agil"
	| "lms_corp"
	| "lms_cert"
	| "fabrica_ddc"
	| "tools_autor"
	| "vilt_zoom"
	| "eval_proctor"
	| "ecommerce";

// Niveles de respuesta del usuario
export type PainLevel = 0 | 1 | 2; // 0=No aplica, 1=Dolor leve, 2=Problema urgente

// Pesos de criticidad (ocultos al usuario)
export type CriticalityWeight = 1 | 2 | 3; // 1=Deseable, 2=Moderado, 3=Crítico

export interface WeightedQuestion {
	id: string; // Ej: "d_stps_masiva" (único, snake_case)
	text: string; // Formulado como "¿Les duele Y?" (no "¿Quieren X?")
	why: string; // Contexto visible al usuario en tooltip/expand
	weight: CriticalityWeight;
	painAxis: PainAxis; // Qué eje de dolor alimenta esta pregunta
	plat: PlatformId | null; // Qué producto recomienda cuando score es alto
	insight: {
		none: string; // Texto si "No aplica"
		mild: string; // Texto si "Dolor leve"
		urgent: string; // Texto si "Problema urgente"
	};
}

export type StageId = "despegue" | "corporativa" | "expansion";

export interface DiagnosticStage {
	id: StageId;
	label: string;
	eyebrow: string; // Ej: "Fase 1 de 3"
	description: string; // Descripción para auto-identificación
	examples: string; // Criterios numéricos: "<50 usuarios", "500+ usuarios"
	questions: WeightedQuestion[];
}

export const stages: DiagnosticStage[] = [
	{
		id: "despegue",
		label: "Despegue",
		eyebrow: "Fase Inicial",
		description:
			"Empresas con menos de 100 usuarios, que no tienen un LMS formal o recién inician su camino en e-learning corporativo.",
		examples: "< 100 usuarios · sin LMS activo · primeros pasos",
		questions: [
			{
				id: "d_sin_plataforma",
				text: "¿Están gestionando la capacitación con Excel, WhatsApp o carpetas compartidas y la operación ya los está rebasando?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 3,
				painAxis: "tecnologia",
				plat: "lms_agil",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "d_contenido_crudo",
				text: "¿El material de capacitación existe solo en manuales físicos, PDFs no estructurados o en la cabeza de los expertos?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 3,
				painAxis: "contenido",
				plat: "fabrica_ddc",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "d_velocidad_lanzamiento",
				text: "¿Necesitan tener una academia virtual funcional operando en menos de 2 semanas?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 2,
				painAxis: "tecnologia",
				plat: "lms_agil",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "d_movil_campo",
				text: "¿La mayoría de sus aprendices están en campo o en piso y consumen información desde celular en tiempos muertos?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 2,
				painAxis: "escala",
				plat: "lms_agil",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "d_autor_interno",
				text: "¿Depender de una agencia externa para cada actualización de contenido está generando retrasos o costos que ya son un problema?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 2,
				painAxis: "contenido",
				plat: "tools_autor",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "d_audiencia_difusa",
				text: "¿No tienen claro todavía quién exactamente va a tomar los cursos ni qué medir como éxito?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 2,
				painAxis: "admin",
				plat: "fabrica_ddc",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "d_presupuesto_acotado",
				text: "¿El presupuesto del proyecto es limitado o aún no está formalmente aprobado?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 1,
				painAxis: "tecnologia",
				plat: "lms_agil",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "d_primer_dc3",
				text: "¿Han tenido alguna inspección STPS o alguien en la empresa ha preguntado por las constancias DC-3?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 1,
				painAxis: "normativa",
				plat: "lms_corp",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "d_vilt_despegue",
				text: "¿Necesitan complementar con sesiones en vivo o webinars mientras el contenido asíncrono no está listo?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 1,
				painAxis: "escala",
				plat: "vilt_zoom",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "d_mobile_first",
				text: "¿El 70%+ de sus usuarios no tiene acceso regular a una computadora durante su jornada?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 2,
				painAxis: "escala",
				plat: "lms_agil",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
		],
	},
	{
		id: "corporativa",
		label: "Corporativa",
		eyebrow: "Fase Intermedia",
		description:
			"Empresas con 100 a 5,000 usuarios, con LMS activo o en evaluación, y requerimientos de cumplimiento normativo.",
		examples:
			"100-5,000 usuarios · LMS activo o en evaluación · cumplimiento normativo",
		questions: [
			{
				id: "c_dc3_insostenible",
				text: "¿Emitir DC-3 y DC-4 de forma manual para cientos de empleados ya es un problema de tiempo o ha generado incidentes con STPS?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 3,
				painAxis: "normativa",
				plat: "lms_corp",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "c_integracion_nomina",
				text: "¿La desincronización entre el LMS y SuccessFactors/SAP/Oracle les provoca errores en reportes de talento o auditorías?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 3,
				painAxis: "admin",
				plat: "lms_corp",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "c_jerarquias_complejas",
				text: "¿Asignar cursos por puesto, filial y región manualmente consume horas de administración cada semana?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 3,
				painAxis: "admin",
				plat: "lms_corp",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "c_reportes_directivos",
				text: "¿Generar los tableros de cumplimiento para Vicepresidencias o auditorías requiere exportar datos manualmente de múltiples fuentes?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 2,
				painAxis: "admin",
				plat: "lms_corp",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "c_proctoring",
				text: "¿Tienen evaluaciones cuyo resultado impacta contratación, bonos o certificaciones críticas y necesitan garantizar que el examen es a prueba de trampas?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 3,
				painAxis: "tecnologia",
				plat: "eval_proctor",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "c_actualizacion_contenido",
				text: "¿El contenido regulatorio o de producto cambia tan frecuentemente que mantenerlo actualizado consume más tiempo que crearlo?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 2,
				painAxis: "contenido",
				plat: "tools_autor",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "c_blended_vilt",
				text: "¿Una parte crítica del aprendizaje requiere sesiones en vivo y hoy están usando plataformas desconectadas (Zoom + LMS por separado)?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 2,
				painAxis: "tecnologia",
				plat: "vilt_zoom",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "c_audiencia_masiva",
				text: "¿Tienen más de 500 usuarios activos o están creciendo a ese ritmo y la plataforma actual empieza a mostrar limitaciones?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 2,
				painAxis: "escala",
				plat: "lms_corp",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "c_contenido_externo",
				text: "¿Usuarios externos (distribuidores, clientes, contratistas) necesitan acceder a la capacitación pero no pueden entrar al sistema interno?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 2,
				painAxis: "tecnologia",
				plat: "lms_cert",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "c_roi_capacitacion",
				text: "¿La dirección les está pidiendo demostrar el impacto de la capacitación en KPIs de negocio (ventas, siniestros, productividad)?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 2,
				painAxis: "admin",
				plat: "eval_proctor",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "c_adaptativo",
				text: "¿Tienen empleados expertos que se frustran tomando cursos de contenido que ya dominan, con impacto en completitud?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 1,
				painAxis: "contenido",
				plat: "eval_proctor",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "c_carga_masiva",
				text: "¿Los procesos de inducción para contrataciones masivas están saturando a los facilitadores y generando errores?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 2,
				painAxis: "escala",
				plat: "vilt_zoom",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
		],
	},
	{
		id: "expansion",
		label: "Expansión",
		eyebrow: "Fase Avanzada",
		description:
			"Empresas con LMS estable que buscan certificar a terceros, monetizar contenidos, o administrar múltiples entidades formativas autónomas.",
		examples: "LMS maduro · quieren certificar terceros o vender cursos",
		questions: [
			{
				id: "e_multitenant",
				text: "¿Quieren ofrecer su plataforma de capacitación a clientes empresariales con su propia marca y administración independiente (B2B2B)?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 3,
				painAxis: "monetizacion",
				plat: "lms_cert",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "e_ecommerce",
				text: "¿El negocio contempla vender cursos o certificaciones al mercado abierto con pasarela de pago integrada?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 3,
				painAxis: "monetizacion",
				plat: "ecommerce",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "e_openbadges",
				text: "¿Las certificaciones que emiten necesitan ser reconocidas públicamente (LinkedIn, Open Badges, QR de valor de mercado)?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 2,
				painAxis: "monetizacion",
				plat: "lms_cert",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "e_filiales",
				text: "¿Tienen filiales en otros países o con marcas diferentes que necesitan su propia instancia pero bajo control centralizado?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 3,
				painAxis: "escala",
				plat: "lms_cert",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "e_idiomas",
				text: "¿La expansión requiere entregar cursos en múltiples idiomas y el costo de traducción manual ya es un problema real?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 2,
				painAxis: "contenido",
				plat: "tools_autor",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "e_contenido_volumen",
				text: "¿El volumen de contenido nuevo que necesitan producir supera la capacidad interna y están buscando escalar la fábrica?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 2,
				painAxis: "contenido",
				plat: "fabrica_ddc",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "e_certificadora",
				text: "¿Quieren posicionar a la organización como entidad certificadora reconocida en su industria?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 2,
				painAxis: "monetizacion",
				plat: "lms_cert",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "e_integraciones_avanzadas",
				text: "¿Necesitan integraciones con sistemas de terceros (CRM, ERP de clientes, APIs custom) que el LMS actual no soporta?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 2,
				painAxis: "tecnologia",
				plat: "lms_corp",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "e_analytics_predictivo",
				text: "¿Necesitan analítica predictiva que conecte el desempeño de aprendizaje con resultados de negocio a nivel ejecutivo?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 2,
				painAxis: "admin",
				plat: "eval_proctor",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
			{
				id: "e_autoservicio",
				text: "¿Los nuevos clientes/socios necesitan registrarse y acceder a la formación de manera autónoma sin intervención administrativa?",
				why: "El contexto operativo detrás de esta fricción afecta directamente a la escalabilidad de tus procesos B2B.",
				weight: 1,
				painAxis: "tecnologia",
				plat: "lms_cert",
				insight: {
					none: "Operación estabilizada en este rubro.",
					mild: "Alerta temprana. Si continúa creciendo, la fricción aquí se convertirá en un cuello de botella o riesgo regulatorio.",
					urgent:
						"Falla crítica detectada. Este dolor te está costando dinero, tiempo clave del management o exponiendo a multas.",
				},
			},
		],
	},
];

export const PLATFORM_AXIS_ORDER: PlatformId[] = [
	"lms_agil",
	"lms_corp",
	"lms_cert",
	"fabrica_ddc",
	"tools_autor",
	"vilt_zoom",
	"eval_proctor",
	"ecommerce",
];
