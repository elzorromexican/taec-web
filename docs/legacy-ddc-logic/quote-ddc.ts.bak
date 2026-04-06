export const prerender = false;

import { z } from "zod";
import type { APIContext } from "astro";
import pricingMatrixData from "../../../data/ddc-pricing-matrix.json";

// Type definitions for the JSON matrix
type PricingMatrix = Record<string, Record<string, Record<string, Record<string, number>>>>;
const matrix = pricingMatrixData as PricingMatrix;

// Validate the payload coming from the client
const EstimateRequestSchema = z.object({
  product: z.enum(["storyline", "rise", "vyond", "adobe_video"]),
  durationBand: z.string(), // e.g., "5", "10", "15" for storyline/rise, or "1", "2" for vyond
  instructionalLevel: z.enum(["none", "basic", "medium", "advanced"]),
  visualLevel: z.enum(["basic", "medium", "advanced"]).optional(), // Optional since Vyond might not use 'visualLevel' but rather animation level if we mapped it so, but our script mapped both to multimedia (basic, medium, advanced). We'll assume frontend sends visualLevel.
  voiceType: z.enum(["none", "tts", "semi_pro", "professional"]),
  volumeBand: z.enum(["1", "2_5", "6_10", "11_plus"]),
  clientProfile: z.enum(["clear", "average", "unclear"]).default("average")
});

const BASE_RATE_HH = 680.00; // MXN per Hour

const VOICEOVER_MARKUP = {
  none: 0.0,
  tts: 0.05,
  semi_pro: 0.10,
  professional: 0.18
};

const VOLUME_DISCOUNT = {
  "1": 0.0,
  "2_5": 0.05,
  "6_10": 0.08,
  "11_plus": 0.10
};

// Dynamic Margin Configuration based on Client Profile
// This dictates the upper variation to provide a safe buffer for quotes.
const CLIENT_PROFILE_MARGINS = {
  clear: { min: -0.05, max: 0.10 },
  average: { min: -0.05, max: 0.15 },
  unclear: { min: 0.00, max: 0.25 }
};

export async function POST({ request, locals }: APIContext) {
  try {
    // 0. Server-Side Authentication
    if (locals.rol !== 'admin') {
      return new Response(JSON.stringify({
        errorCode: "UNAUTHORIZED",
        message: "Acceso denegado. Se requiere nivel de administrador."
      }), { status: 401, headers: { "Content-Type": "application/json" } });
    }

    const body = await request.json();
    
    // 1. Zod Validation to prevent malicious payloads
    const parsed = EstimateRequestSchema.safeParse(body);
    if (!parsed.success) {
      return new Response(JSON.stringify({
        errorCode: "INVALID_PAYLOAD",
        message: "Los datos enviados no son válidos.",
        details: parsed.error.format()
      }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const {
      product,
      durationBand,
      instructionalLevel,
      visualLevel,
      voiceType,
      volumeBand,
      clientProfile
    } = parsed.data;

    // Default to basic if visualLevel is somehow omitted
    const multimediaLevel = visualLevel || "basic";

    // 2. Query the Matrix
    const productData = matrix[product];
    if (!productData) {
      return new Response(JSON.stringify({
        errorCode: "COMBINATION_NOT_AVAILABLE",
        message: "Tu proyecto requiere una valoración consultiva. Déjanos tus datos y te contactaremos.",
        version: "1.0.0"
      }), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    const instructionalData = productData[instructionalLevel];
    if (!instructionalData) {
      return new Response(JSON.stringify({
         errorCode: "COMBINATION_NOT_AVAILABLE", message: "Tu proyecto requiere valoración consultiva.", version: "1.0.0"
      }), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    const multimediaData = instructionalData[multimediaLevel];
    if (!multimediaData) {
      return new Response(JSON.stringify({
         errorCode: "COMBINATION_NOT_AVAILABLE", message: "Tu proyecto requiere valoración consultiva.", version: "1.0.0"
      }), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    const baseHH = multimediaData[durationBand];
    if (typeof baseHH !== 'number') {
      return new Response(JSON.stringify({
         errorCode: "COMBINATION_NOT_AVAILABLE", message: "Duración o alcance fuera del estimador automático. Déjanos tus datos.", version: "1.0.0"
      }), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    // 3. Mathematical Base Calculation
    let baseCost = baseHH * BASE_RATE_HH;

    // 4. Voiceover Markup
    baseCost = baseCost * (1 + VOICEOVER_MARKUP[voiceType]);

    // 5. Volume Discount
    // Wait, typically markup is applied before discount
    const discountedCost = baseCost * (1 - VOLUME_DISCOUNT[volumeBand]);

    // 6. Final Error Margins
    const margins = CLIENT_PROFILE_MARGINS[clientProfile];
    let estimatedFrom = discountedCost * (1 + margins.min);
    let estimatedTo = discountedCost * (1 + margins.max);

    // Apply smart rounding. Thousands for large numbers, hundreds for small ones (e.x. Vyond)
    estimatedFrom = estimatedFrom > 5000 ? Math.round(estimatedFrom / 1000) * 1000 : Math.ceil(estimatedFrom / 100) * 100;
    estimatedTo = estimatedTo > 5000 ? Math.round(estimatedTo / 1000) * 1000 : Math.ceil(estimatedTo / 100) * 100;

    // Ensure they are not exactly the same (in very small amounts)
    if (estimatedFrom === estimatedTo) {
      estimatedTo += 1000;
    }

    // 7. Success Response formatted as specified
    return new Response(JSON.stringify({
      product,
      estimatedFrom,
      estimatedTo,
      currency: "MXN",
      deliveryRange: "15-20 días hábiles",
      disclaimer: "Este es un precio estimado referencial. La cotización formal puede variar según el análisis detallado del proyecto.",
      leadMessage: "Si quieres una propuesta más precisa, podemos revisar contigo el alcance real del proyecto.",
      version: "1.0.0"
    }), { status: 200, headers: { "Content-Type": "application/json" } });

  } catch (err) {
    console.error("DDC Estimate Error", err);
    return new Response(JSON.stringify({
      errorCode: "SERVER_ERROR",
      message: "Ocurrió un error al procesar tu cotización. Intenta de nuevo más tarde."
    }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
