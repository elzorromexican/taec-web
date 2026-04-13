/**
 * @name diagnosticoScoring.ts
 * @version 1.0
 * @description Logic for scoring the v2 diagnostic questionnaire with dynamic axes.
 * @inputs Object containing stage and user answers.
 * @outputs DiagnosticResult including scaled pain metrics and recommended platforms.
 * @dependencies diagnosticoData.ts
 * @created 2026-04-12
 * @updated 2026-04-13 19:37:00
 */

import {
  StageId, PainAxis, PlatformId, PainLevel,
  WeightedQuestion, DiagnosticStage
} from '../../data/diagnosticoData';

export interface DiagnosticAnswers {
  stage: StageId;
  answers: Record<string, PainLevel>; // questionId → 0|1|2
}

export interface PainProfile {
  admin: number;
  contenido: number;
  tecnologia: number;
  normativa: number;
  escala: number;
  monetizacion: number;
}

export interface PlatformScores {
  lms_agil: number;
  lms_corp: number;
  lms_cert: number;
  fabrica_ddc: number;
  tools_autor: number;
  vilt_zoom: number;
  eval_proctor: number;
  ecommerce: number;
}

export interface DiagnosticResult {
  stage: StageId;
  painProfile: PainProfile;
  platformScores: PlatformScores;
  topPains: PainAxis[];
  winningPlatform: PlatformId;
  urgencyScore: number;
}

export function calcularDiagnostico(
  answers: DiagnosticAnswers,
  questions: WeightedQuestion[]
): DiagnosticResult {
  const painRaw: Record<PainAxis, number> = { admin: 0, contenido: 0, tecnologia: 0, normativa: 0, escala: 0, monetizacion: 0 };
  const painMax: Record<PainAxis, number> = { admin: 0, contenido: 0, tecnologia: 0, normativa: 0, escala: 0, monetizacion: 0 };

  const platRaw: Record<PlatformId, number> = { lms_agil: 0, lms_corp: 0, lms_cert: 0, fabrica_ddc: 0, tools_autor: 0, vilt_zoom: 0, eval_proctor: 0, ecommerce: 0 };
  const platMax: Record<PlatformId, number> = { lms_agil: 0, lms_corp: 0, lms_cert: 0, fabrica_ddc: 0, tools_autor: 0, vilt_zoom: 0, eval_proctor: 0, ecommerce: 0 };

  let totalRaw = 0;
  let totalMax = 0;

  const painWeights: Record<PainAxis, number[]> = { admin: [], contenido: [], tecnologia: [], normativa: [], escala: [], monetizacion: [] };

  questions.forEach(q => {
    const ans = answers.answers[q.id];
    if (ans === undefined) return; // ignore unanswered questions

    const rawScore = ans * q.weight;
    const maxPossScore = 2 * q.weight;

    painRaw[q.painAxis] += rawScore;
    painMax[q.painAxis] += maxPossScore;
    painWeights[q.painAxis].push(q.weight);

    if (q.plat !== null) {
      platRaw[q.plat] += rawScore;
      platMax[q.plat] += maxPossScore;
    }

    totalRaw += rawScore;
    totalMax += maxPossScore;
  });

  const painProfile = {
    admin: painMax.admin ? Math.round((painRaw.admin / painMax.admin) * 100) : 0,
    contenido: painMax.contenido ? Math.round((painRaw.contenido / painMax.contenido) * 100) : 0,
    tecnologia: painMax.tecnologia ? Math.round((painRaw.tecnologia / painMax.tecnologia) * 100) : 0,
    normativa: painMax.normativa ? Math.round((painRaw.normativa / painMax.normativa) * 100) : 0,
    escala: painMax.escala ? Math.round((painRaw.escala / painMax.escala) * 100) : 0,
    monetizacion: painMax.monetizacion ? Math.round((painRaw.monetizacion / painMax.monetizacion) * 100) : 0,
  };

  const platformScores = {
    lms_agil: platMax.lms_agil ? Math.round((platRaw.lms_agil / platMax.lms_agil) * 100) : 0,
    lms_corp: platMax.lms_corp ? Math.round((platRaw.lms_corp / platMax.lms_corp) * 100) : 0,
    lms_cert: platMax.lms_cert ? Math.round((platRaw.lms_cert / platMax.lms_cert) * 100) : 0,
    fabrica_ddc: platMax.fabrica_ddc ? Math.round((platRaw.fabrica_ddc / platMax.fabrica_ddc) * 100) : 0,
    tools_autor: platMax.tools_autor ? Math.round((platRaw.tools_autor / platMax.tools_autor) * 100) : 0,
    vilt_zoom: platMax.vilt_zoom ? Math.round((platRaw.vilt_zoom / platMax.vilt_zoom) * 100) : 0,
    eval_proctor: platMax.eval_proctor ? Math.round((platRaw.eval_proctor / platMax.eval_proctor) * 100) : 0,
    ecommerce: platMax.ecommerce ? Math.round((platRaw.ecommerce / platMax.ecommerce) * 100) : 0,
  };

  const urgencyScore = totalMax ? Math.round((totalRaw / totalMax) * 100) : 0;

  // topPains: top 3 by score, tiebreak by average weight
  const axes = Object.keys(painProfile) as PainAxis[];
  axes.sort((a, b) => {
    if (painProfile[a] !== painProfile[b]) {
      return painProfile[b] - painProfile[a];
    }
    const avgWeightA = painWeights[a].length ? painWeights[a].reduce((x, y) => x + y, 0) / painWeights[a].length : 0;
    const avgWeightB = painWeights[b].length ? painWeights[b].reduce((x, y) => x + y, 0) / painWeights[b].length : 0;
    return avgWeightB - avgWeightA;
  });
  const topPains = axes.slice(0, 3);

  // winningPlatform
  const platPriority: PlatformId[] = ['lms_corp', 'fabrica_ddc', 'tools_autor', 'lms_cert', 'eval_proctor', 'ecommerce', 'vilt_zoom', 'lms_agil'];
  let winningPlatform: PlatformId = platPriority[0];

  const platforms = Object.keys(platformScores) as PlatformId[];
  platforms.sort((a, b) => {
    if (platformScores[a] !== platformScores[b]) {
      return platformScores[b] - platformScores[a];
    }
    return platPriority.indexOf(a) - platPriority.indexOf(b);
  });
  winningPlatform = platforms[0];

  return {
    stage: answers.stage,
    painProfile,
    platformScores,
    topPains,
    winningPlatform,
    urgencyScore
  };
}
