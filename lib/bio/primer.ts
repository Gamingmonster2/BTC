// Primer analysis utilities for the Tm calculator.

import {
  sanitizeSequence,
  isValidDna,
  countBases,
  gcContent,
  reverseComplement,
  type BaseCounts,
} from "./dna";

export interface PrimerAnalysis {
  sequence: string;
  length: number;
  counts: BaseCounts;
  gcPercent: number;
  /** Wallace rule: Tm = 2*(A+T) + 4*(G+C) — simple approximation. */
  tmBasic: number;
  /**
   * Salt-adjusted estimate for short primers (50 mM Na+):
   * Tm = 81.5 + 16.6*log10([Na+]) + 0.41*(%GC) - 675/length
   */
  tmSaltAdjusted: number;
  reverseComplement: string;
  /** True when the primer ends (3' end) with G or C. */
  gcClamp: boolean;
}

/** Normalize an input to uppercase DNA with whitespace/digits removed. */
export function preparePrimer(input: string): string {
  return sanitizeSequence(input);
}

/** Wallace "2+4" rule melting temperature in °C. */
export function tmBasic(sequence: string): number {
  const counts = countBases(sequence);
  return 2 * (counts.A + counts.T) + 4 * (counts.G + counts.C);
}

/**
 * Salt-adjusted melting temperature for short primers (default 50 mM monovalent Na+).
 * Formula (Howley et al. / OligoCalc basis):
 * Tm = 81.5 + 16.6*log10([Na+]) + 0.41*(%GC) - 675/length
 */
export function tmSaltAdjusted(
  sequence: string,
  saltConcentration = 0.05
): number {
  const length = sequence.length;
  if (length === 0) return 0;
  const gc = gcContent(sequence);
  const logSalt = Math.log10(saltConcentration);
  return 81.5 + 16.6 * logSalt + 0.41 * gc - 675 / length;
}

/** True when the primer's 3' end is a G or C (GC clamp). */
export function hasGcClamp(sequence: string): boolean {
  if (sequence.length === 0) return false;
  const last = sequence[sequence.length - 1];
  return last === "G" || last === "C";
}

/** Full primer analysis. Expects an already-sanitized, validated sequence. */
export function analyzePrimer(sequence: string): PrimerAnalysis {
  return {
    sequence,
    length: sequence.length,
    counts: countBases(sequence),
    gcPercent: gcContent(sequence),
    tmBasic: tmBasic(sequence),
    tmSaltAdjusted: tmSaltAdjusted(sequence),
    reverseComplement: reverseComplement(sequence),
    gcClamp: hasGcClamp(sequence),
  };
}

/** Convenience validation wrapper returning an error key or null. */
export function validatePrimerInput(raw: string): {
  sequence: string;
  error: "empty" | "invalid" | "tooShort" | null;
} {
  const sequence = preparePrimer(raw);
  if (sequence.length === 0) return { sequence, error: "empty" };
  if (!isValidDna(sequence)) return { sequence, error: "invalid" };
  if (sequence.length < 8) return { sequence, error: "tooShort" };
  return { sequence, error: null };
}
