export const prerender = false;

import { z } from 'astro/zod';
import pricingMatrix from '../../data/ddc-pricing-matrix.json';

const quoteSchema = z.object({
  product: z.enum(['storyline', 'rise', 'vyond']),
  durationBand: z.string(),
  instructionalLevel: z.enum(['none', 'basic', 'medium', 'advanced']),
  visualLevel: z.enum(['basic', 'medium', 'advanced']).optional(),
  animationLevel: z.enum(['basic', 'medium', 'advanced']).optional(),
  voiceType: z.enum(['none', 'tts', 'semi_pro', 'professional']),
  volumeBand: z.enum(['1', '2_5', '6_10', '11_plus'])
});

const TARIFA_HH = Number(import.meta.env.TARIFA_BASE_HH || 680);

const mapLevel = (level: string) => {
  if (level === 'none') return 'Sin DI';
  if (level === 'basic') return 'Básico';
  if (level === 'medium') return 'Medio';
  if (level === 'advanced') return 'Alto';
  return 'Básico';
};

const mapDuration = (band: string) => {
  const parts = band.split('_');
  return parts[parts.length - 1]; // "15_20" -> "20"
};

const getVoiceMargin = (type: string) => {
  if (type === 'tts') return 1.05;
  if (type === 'semi_pro') return 1.10;
  if (type === 'professional') return 1.20;
  return 1.0;
};

const getVolumeDiscount = (band: string) => {
  if (band === '2_5') return 0.05;
  if (band === '6_10') return 0.08;
  if (band === '11_plus') return 0.10;
  return 0.0;
};

export const POST = async ({ request }: any) => {
  try {
    const data = await request.json();
    const payload = quoteSchema.safeParse(data);

    if (!payload.success) {
      return new Response(JSON.stringify({
        errorCode: 'BAD_REQUEST',
        message: 'Payload inválido o incompleto.',
        details: payload.error.issues,
        version: '1.0.0'
      }), { status: 400 });
    }

    const { product, durationBand, instructionalLevel, visualLevel, animationLevel, voiceType, volumeBand } = payload.data;

    let targetMatrix = (pricingMatrix as any)[product];
    let dmLevel = mapLevel((product === 'vyond' ? animationLevel : visualLevel) || 'basic');
    let diLevel = mapLevel(instructionalLevel);
    let durationKey = mapDuration(durationBand);
    
    let matrixKey = `${dmLevel}_${diLevel}`;
    let baseHH = targetMatrix[matrixKey]?.[durationKey] || 0;

    let subtotal = baseHH * TARIFA_HH;
    subtotal = subtotal * getVoiceMargin(voiceType);
    subtotal = subtotal * (1 - getVolumeDiscount(volumeBand));

    const marginRange = 0.15;
    const estimatedFrom = Math.floor(subtotal * (1 - marginRange));
    const estimatedTo = Math.ceil(subtotal * (1 + marginRange));

    return new Response(JSON.stringify({
      product,
      estimatedFrom,
      estimatedTo,
      currency: 'MXN',
      deliveryRange: '15-20 días hábiles',
      disclaimer: 'Este es un precio estimado referencial (antes de IVA). La cotización formal puede variar según el análisis detallado del proyecto.',
      leadMessage: 'Si quieres una propuesta más precisa, podemos revisar contigo el alcance real del proyecto.',
      version: '1.0.0'
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (err) {
    return new Response(JSON.stringify({
      errorCode: 'JSON_PARSE_ERROR',
      message: 'El servidor no pudo procesar la solicitud.',
      version: '1.0.0'
    }), { status: 500 });
  }
};
