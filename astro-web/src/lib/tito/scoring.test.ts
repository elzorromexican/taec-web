import { describe, it, expect } from "vitest";
import { determinarHandoff, type LeadSignals } from "./scoring";

describe("Tito Lead Scoring - determinarHandoff", () => {
	const defaultSignals: LeadSignals = {
		productos_interes: [],
		seats_mencionados: null,
		requiere_integracion: false,
		tiene_lms_actual: false,
		es_cliente_nuevo: true,
		urgencia: null,
		presupuesto_aprobado: false,
		quiere_cotizacion: false,
		quiere_demo: false,
		quiere_contacto: false,
		empresa_mencionada: null,
		cargo_mencionado: null,
		dolor_negocio: null,
	};

	it("debería retornar null para score 39 (por debajo del threshold)", () => {
		expect(determinarHandoff(defaultSignals, 39)).toBeNull();
	});

	it("debería retornar null para score 45 sin intent flags (nuevo gate lo bloquea)", () => {
		expect(determinarHandoff(defaultSignals, 45)).toBeNull();
	});

	it("debería retornar 'ventas' para score 45 con quiere_demo = true", () => {
		const signals: LeadSignals = { ...defaultSignals, quiere_demo: true };
		expect(determinarHandoff(signals, 45)).toBe("ventas");
	});

	it("debería retornar 'ventas' para score 71 sin intent flags (isHighValue bypass)", () => {
		expect(determinarHandoff(defaultSignals, 71)).toBe("ventas");
	});

	it("debería retornar 'preventa_tecnica' para score 45 con requiere_integracion = true y quiere_cotizacion = true", () => {
		const signals: LeadSignals = {
			...defaultSignals,
			requiere_integracion: true,
			quiere_cotizacion: true,
		};
		expect(determinarHandoff(signals, 45)).toBe("preventa_tecnica");
	});
});
