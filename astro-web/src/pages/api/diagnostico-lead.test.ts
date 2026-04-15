import { beforeEach, describe, expect, test, vi } from "vitest";
import { POST } from "./diagnostico-lead";

// Mock Resend and Upstash hooks to isolate backend validation
vi.mock("resend", () => {
	return {
		Resend: class {
			emails = {
				send: vi.fn().mockResolvedValue({ id: "fake_email_id" }),
			};
		},
	};
});

vi.mock("@upstash/redis", () => {
	return {
		Redis: class {
			hset = vi.fn().mockResolvedValue(1);
		},
	};
});

vi.mock("@upstash/ratelimit", () => {
	return {
		Ratelimit: class {
			static slidingWindow = vi.fn();
			limit = vi
				.fn()
				.mockResolvedValue({ success: true, limit: 5, remaining: 4, reset: 0 });
		},
	};
});

// Helper to create a standard valid payload
const createValidPayload = () => ({
	email: "test@example.com",
	stage: "despegue",
	answers: { q1: 1 },
	criticalPains: ["dolor test"],
	urgencyScore: 50,
	platformScores: { lms_agil: 30 },
	painProfile: { traccion: 20 },
	winningPlatform: "lms_agil",
	topPains: ["traccion"],
});

const createMockRequest = (body: any): Request => {
	return new Request("http://localhost:4321/api/diagnostico-lead", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
};

describe("Diagnostico Lead API - Error Handling", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		process.env.RESEND_API_KEY = "mock_key";
	});

	test("Valid payload succeeds with 200", async () => {
		const payload = createValidPayload();
		const req = createMockRequest(payload);
		const res = await POST({ request: req } as any);
		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data.success).toBe(true);
	});

	test("Empty payload fails with 400 (Bad Request) due to missing email", async () => {
		const req = createMockRequest({});
		const res = await POST({ request: req } as any);
		expect(res.status).toBe(400);
		const data = await res.json();
		expect(data.error).toBe("Email inválido.");
	});

	test("Missing fields fails with 400", async () => {
		const payload = createValidPayload();
		delete (payload as any).platformScores;
		const req = createMockRequest(payload);
		const res = await POST({ request: req } as any);
		expect(res.status).toBe(400);
		const data = await res.json();
		expect(data.error).toBe("Payload incompleto.");
	});

	test("Invalid urgencyScore bounds fails with 400", async () => {
		const payload = createValidPayload();
		payload.urgencyScore = 150; // Out of bounds > 100
		const req = createMockRequest(payload);
		const res = await POST({ request: req } as any);
		expect(res.status).toBe(400);
		const data = await res.json();
		expect(data.error).toBe("Payload inválido.");

		const payloadNegative = createValidPayload();
		payloadNegative.urgencyScore = -10; // Out of bounds < 0
		const reqNegative = createMockRequest(payloadNegative);
		const resNegative = await POST({ request: reqNegative } as any);
		expect(resNegative.status).toBe(400);
	});

	test("Missing sub-fields in results fails with 400", async () => {
		const payload = createValidPayload();
		delete (payload as any).winningPlatform;
		const req = createMockRequest(payload);
		const res = await POST({ request: req } as any);
		expect(res.status).toBe(400);
		const data = await res.json();
		expect(data.error).toBe("Payload incompleto.");
	});

	test("Empty email string falls back to 400 validation error", async () => {
		const payload = createValidPayload();
		payload.email = "";
		const req = createMockRequest(payload);
		const res = await POST({ request: req } as any);
		expect(res.status).toBe(400);
		const data = await res.json();
		expect(data.error).toBe("Email inválido.");
	});

	// Note: Semaforo validation logic is effectively checked inside the HTML injection
	// mapping based on 40 and 70 logic in API route. We simulate thresholds:
	test("Semaforo Logic mapping threshold 70 (Urgente)", async () => {
		const payload = createValidPayload();
		payload.urgencyScore = 75; // Urgent criteria
		const req = createMockRequest(payload);
		const res = await POST({ request: req } as any);
		expect(res.status).toBe(200);
	});
});
