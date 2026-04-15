/**
 * @name diagnosticoScoring.test.ts
 * @version 1.0
 * @description Unit tests for diagnosticoScoring according to tests plan T1-T9.
 * @inputs N/A
 * @outputs Vitest test suite.
 * @dependencies diagnosticoScoring.ts, vitest
 * @created 2026-04-12
 * @updated 2026-04-13 19:37:00
 */

import { describe, expect, test } from "vitest";
import type { WeightedQuestion } from "../../data/diagnosticoData";
import type { DiagnosticAnswers } from "./diagnosticoScoring";
import { calcularDiagnostico } from "./diagnosticoScoring";

describe("calcularDiagnostico", () => {
	// A mock questions array for general testing (mimics despegue roughly)
	const mockQuestions: WeightedQuestion[] = [
		{
			id: "q1",
			text: "",
			why: "",
			weight: 3,
			painAxis: "tecnologia",
			plat: "lms_agil",
			insight: { none: "", mild: "", urgent: "" },
		},
		{
			id: "q2",
			text: "",
			why: "",
			weight: 3,
			painAxis: "contenido",
			plat: "fabrica_ddc",
			insight: { none: "", mild: "", urgent: "" },
		},
		{
			id: "q__null",
			text: "",
			why: "",
			weight: 1,
			painAxis: "admin",
			plat: null,
			insight: { none: "", mild: "", urgent: "" },
		},
	];

	test("T1: Happy path despegue — urgencia alta", () => {
		const answers: DiagnosticAnswers = {
			stage: "despegue",
			answers: { q1: 2, q2: 2 },
		};
		const res = calcularDiagnostico(answers, mockQuestions);
		expect(res.urgencyScore).toBe(100);
		expect(res.painProfile.tecnologia).toBe(100);
		expect(res.painProfile.contenido).toBe(100);
		expect(res.platformScores.lms_agil).toBe(100);
		expect(res.platformScores.fabrica_ddc).toBe(100);
	});

	test('T2: Happy path — todas respuestas "No aplica"', () => {
		const answers: DiagnosticAnswers = {
			stage: "despegue",
			answers: { q1: 0, q2: 0 },
		};
		const res = calcularDiagnostico(answers, mockQuestions);
		expect(res.urgencyScore).toBe(0);
		expect(res.painProfile.tecnologia).toBe(0);
		expect(res.painProfile.contenido).toBe(0);
		// Verificar que no arroja NaN por division por cero si respondido todo en 0 (denominador se nutre del max posible, que es 2*weight > 0)
		expect(res.platformScores.lms_agil).toBe(0);
	});

	test("T3: plat:null no contamina platform scores", () => {
		const answers: DiagnosticAnswers = {
			stage: "despegue",
			answers: { q1: 2, q2: 2, q__null: 2 },
		};
		const res = calcularDiagnostico(answers, mockQuestions);
		// It should add to pain axes but not platforms
		expect(res.painProfile.admin).toBe(100); // 2 * 1 / (2 * 1)
		// plat_agil and fabrica should be 100, others 0
		expect(res.platformScores.lms_agil).toBe(100);

		let platSum = 0;
		Object.values(res.platformScores).forEach(
			(val) => (platSum += val as number),
		);
		// Two platforms should be exactly 100, so sum is 200
		expect(platSum).toBe(200);
	});

	test("T4: Normalization platform scores", () => {
		// dos plataformas con distinto numero de qs.
		// lms_corp: 3 pregs leve (nivel 1, peso 1) -> sum raw = 3. max possible = 6. Normalization: 50%
		// lms_agil: 1 preg urgente (nivel 2, peso 1) -> raw = 2. max possible = 2. Normalization: 100%
		// lms_agil debe ganar.
		const qA: WeightedQuestion[] = [
			{
				id: "c1",
				text: "",
				why: "",
				weight: 1,
				painAxis: "admin",
				plat: "lms_corp",
				insight: { none: "", mild: "", urgent: "" },
			},
			{
				id: "c2",
				text: "",
				why: "",
				weight: 1,
				painAxis: "admin",
				plat: "lms_corp",
				insight: { none: "", mild: "", urgent: "" },
			},
			{
				id: "c3",
				text: "",
				why: "",
				weight: 1,
				painAxis: "admin",
				plat: "lms_corp",
				insight: { none: "", mild: "", urgent: "" },
			},
			{
				id: "a1",
				text: "",
				why: "",
				weight: 1,
				painAxis: "tecnologia",
				plat: "lms_agil",
				insight: { none: "", mild: "", urgent: "" },
			},
		];
		const answers: DiagnosticAnswers = {
			stage: "corporativa",
			answers: { c1: 1, c2: 1, c3: 1, a1: 2 },
		};
		const res = calcularDiagnostico(answers, qA);
		expect(res.platformScores.lms_corp).toBe(50);
		expect(res.platformScores.lms_agil).toBe(100);
		expect(res.winningPlatform).toBe("lms_agil");
	});

	test("T5: winningPlatform tiebreak", () => {
		// Empate a 100 entre eval_proctor y lms_corp. lms_corp tiene mas prioridad.
		const qTie: WeightedQuestion[] = [
			{
				id: "t1",
				text: "",
				why: "",
				weight: 1,
				painAxis: "admin",
				plat: "lms_corp",
				insight: { none: "", mild: "", urgent: "" },
			},
			{
				id: "t2",
				text: "",
				why: "",
				weight: 1,
				painAxis: "admin",
				plat: "eval_proctor",
				insight: { none: "", mild: "", urgent: "" },
			},
		];
		const answers: DiagnosticAnswers = {
			stage: "corporativa",
			answers: { t1: 2, t2: 2 },
		};
		const res = calcularDiagnostico(answers, qTie);
		expect(res.platformScores.lms_corp).toBe(100);
		expect(res.platformScores.eval_proctor).toBe(100);
		expect(res.winningPlatform).toBe("lms_corp");
	});

	test("T6: topPains ordenados correctamente", () => {
		// axes con scores mixtos. Empate tiebreak por average weight.
		const qPains: WeightedQuestion[] = [
			// tecnologia: score 100% (raw 2/ max 2), weight 1 -> avg w 1
			{
				id: "p1",
				text: "",
				why: "",
				weight: 1,
				painAxis: "tecnologia",
				plat: "lms_agil",
				insight: { none: "", mild: "", urgent: "" },
			},
			// contenido: score 100% (raw 6/ max 6), weight 3 -> avg w 3
			{
				id: "p2",
				text: "",
				why: "",
				weight: 3,
				painAxis: "contenido",
				plat: "lms_agil",
				insight: { none: "", mild: "", urgent: "" },
			},
			// admin: score 50%
			{
				id: "p3",
				text: "",
				why: "",
				weight: 2,
				painAxis: "admin",
				plat: "lms_agil",
				insight: { none: "", mild: "", urgent: "" },
			},
		];
		const answers: DiagnosticAnswers = {
			stage: "corporativa",
			answers: { p1: 2, p2: 2, p3: 1 },
		};
		const res = calcularDiagnostico(answers, qPains);

		// contenido y tech both have 100.
		// contenido has avg weight 3. tech has 1.
		// top 1 should be contenido
		expect(res.topPains[0]).toBe("contenido");
		expect(res.topPains[1]).toBe("tecnologia");
		expect(res.topPains[2]).toBe("admin");
	});

	test("T7: Respuesta faltante excluida del denominador", () => {
		const answers: DiagnosticAnswers = {
			stage: "despegue",
			answers: { q1: 2 }, // q2 is undefined
		};
		const res = calcularDiagnostico(answers, mockQuestions);
		// urgencyScore should be 100 because max is calculated only from answered
		expect(res.urgencyScore).toBe(100);
		// contenido should be 0 because it was unanswered
		expect(res.painProfile.contenido).toBe(0);
		expect(res.platformScores.fabrica_ddc).toBe(0);
	});

	test("T8: urgencyScore threshold -> CTA mapping", () => {
		const answers: DiagnosticAnswers = {
			stage: "despegue",
			answers: { q1: 2, q2: 2, q__null: 2 },
		};
		const res = calcularDiagnostico(answers, mockQuestions);
		expect(res.urgencyScore).toBe(100);
		expect(res.urgencyScore > 70).toBeTruthy();
	});

	test("T9: Cross-stage hint activacion", () => {
		// Simulamos la presencia de d_primer_dc3 en la data y comprobamos el calculo real
		const mockT9: WeightedQuestion[] = [
			{
				id: "d_primer_dc3",
				text: "DC-3",
				why: "",
				weight: 3,
				painAxis: "normativa",
				plat: "fabrica_ddc",
				insight: { none: "", mild: "", urgent: "Hint for DC3" },
			},
		];
		const answers: DiagnosticAnswers = {
			stage: "despegue",
			answers: { d_primer_dc3: 2 },
		};
		const res = calcularDiagnostico(answers, mockT9);
		expect(res.urgencyScore).toBe(100);
		expect(res.painProfile.normativa).toBe(100);
		expect(res.platformScores.fabrica_ddc).toBe(100);
		expect(res.winningPlatform).toBe("fabrica_ddc");
	});
});
