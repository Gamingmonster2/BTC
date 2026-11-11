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
  /** The Wallace rule is only reliable for primers 14–20 nt long. */
  wallaceReliable: boolean;
  reverseComplement: string;
  /** True when the primer ends (3' end) with G or C. */
  gcClamp: boolean;
  /** Number of G/C bases among the last five 3' bases (0–5). */
  gcClampCount: number;
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
 * Salt-adjusted melting temperature for short primers.
 *
 * Howley et al. (1979) / OligoCalc form, with the ionic-strength correction
 * [Na+] / (1 + 0.7 [Na+]) and the 500/N term used for oligonucleotides:
 *
 *   Tm = 81.5 + 16.6*log10([Na+]/(1+0.7[Na+])) + 0.41*(%GC) - 500/N
 *
 * @param saltConcentration monovalent cation concentration in mol/L (default 50 mM)
 */
export function tmSaltAdjusted(
  sequence: string,
  saltConcentration = 0.05
): number {
  const length = sequence.length;
  if (length === 0) return 0;
  const gc = gcContent(sequence);
  const correctedSalt = saltConcentration / (1 + 0.7 * saltConcentration);
  return (
    81.5 + 16.6 * Math.log10(correctedSalt) + 0.41 * gc - 500 / length
  );
}

/** True when the primer's 3' end is a G or C (GC clamp). */
export function hasGcClamp(sequence: string): boolean {
  if (sequence.length === 0) return false;
  const last = sequence[sequence.length - 1];
  return last === "G" || last === "C";
}

/** Number of G/C bases among the last five 3' bases (GC clamp strength). */
export function gcClampCount(sequence: string): number {
  let count = 0;
  for (const base of sequence.slice(-5)) {
    if (base === "G" || base === "C") count++;
  }
  return count;
}

/** The Wallace rule is only reliable for primers between 14 and 20 nt. */
export function isWallaceReliable(sequence: string): boolean {
  return sequence.length >= 14 && sequence.length <= 20;
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
    wallaceReliable: isWallaceReliable(sequence),
    reverseComplement: reverseComplement(sequence),
    gcClamp: hasGcClamp(sequence),
    gcClampCount: gcClampCount(sequence),
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
