// Open reading frame (ORF) detection.
//
// Conventions used here (documented in README → Accuracy notes):
// - The standard genetic code is assumed; alternative codes are not supported.
// - An ORF starts at ATG and ends at the first in-frame stop codon (TAA, TAG, TGA)
//   or at the end of the sequence when no stop codon is found.
// - All six frames are scanned: three on the plus strand and three on the
//   reverse complement (minus strand).
// - Up to `MAX_NESTED_STARTS` ATGs inside the same stop-delimited region are
//   reported (the earliest, therefore longest, ones). This mirrors the nested
//   ORFs that NCBI ORFfinder shows without exploding the result list.
// - Ambiguity codes (N, R, Y, ...) are neither start nor stop codons; they are
//   translated to `X`, so a codon containing one can never start or end an ORF.

import { reverseComplement, translate, type ReadingFrame } from "./dna";

export type Strand = "+" | "-";

export interface Orf {
  strand: Strand;
  frame: ReadingFrame;
  /** 1-based inclusive start on the plus strand. */
  start: number;
  /** 1-based inclusive end on the plus strand. */
  end: number;
  /** Length of the coding region in nucleotides, excluding the stop codon. */
  lengthNt: number;
  /** Length of the protein in amino acids. */
  lengthAa: number;
  /** Protein sequence (one-letter codes, no stop character). */
  protein: string;
  /** Coding nucleotide sequence in 5' → 3' orientation. */
  sequence: string;
  /** False when the ORF runs into the end of the sequence without a stop. */
  hasStop: boolean;
}

/** Maximum number of ORFs returned, longest first. */
export const MAX_ORFS = 200;

/** Maximum number of nested ATGs reported per stop-delimited region. */
const MAX_NESTED_STARTS = 10;

/** Hard input limit: keeps the six-frame scan fast in the browser. */
export const MAX_ORF_INPUT = 50_000;

const START_CODON = "ATG";
const STOP_CODONS = new Set(["TAA", "TAG", "TGA"]);

function makeOrf(
  start0: number,
  end0: number,
  hasStop: boolean,
  frame: ReadingFrame,
  strand: Strand,
  sequence: string
): Orf {
  const coding = sequence.slice(start0, end0);
  const protein = translate(coding, 1);

  // Map coordinates back to the plus strand. For the minus strand, position p
  // in the reverse complement corresponds to L - 1 - p on the plus strand.
  const length = sequence.length;
  const start = strand === "+" ? start0 + 1 : length - end0 + 1;
  const end = strand === "+" ? end0 : length - start0;

  return {
    strand,
    frame,
    start,
    end,
    lengthNt: coding.length,
    lengthAa: protein.length,
    protein,
    sequence: coding,
    hasStop,
  };
}

/** Keep only the `MAX_ORFS` longest ORFs while scanning. */
function pushBounded(list: Orf[], orf: Orf): void {
  if (list.length < MAX_ORFS) {
    list.push(orf);
    return;
  }
  let shortest = 0;
  for (let i = 1; i < list.length; i++) {
    if (list[i].lengthAa < list[shortest].lengthAa) shortest = i;
  }
  if (orf.lengthAa > list[shortest].lengthAa) list[shortest] = orf;
}

function scanStrand(
  sequence: string,
  strand: Strand,
  minAa: number,
  out: Orf[]
): void {
  const length = sequence.length;

  for (let frame = 1 as ReadingFrame; frame <= 3; frame++) {
    const starts: number[] = [];

    for (let i = frame - 1; i + 3 <= length; i += 3) {
      const codon = sequence.slice(i, i + 3);

      if (codon === START_CODON) {
        starts.push(i);
        continue;
      }

      if (STOP_CODONS.has(codon) && starts.length > 0) {
        // Report the longest nested ORFs for this stop codon, then reset:
        // any later ATG belongs to the next stop-delimited region.
        const nested = starts.slice(0, MAX_NESTED_STARTS);
        for (const start of nested) {
          const aa = (i - start) / 3;
          if (aa >= minAa) {
            pushBounded(out, makeOrf(start, i, true, frame, strand, sequence));
          }
        }
        starts.length = 0;
      }
    }

    // No stop codon before the end of the sequence.
    for (const start of starts.slice(0, MAX_NESTED_STARTS)) {
      const aa = Math.floor((length - start) / 3);
      if (aa >= minAa) {
        pushBounded(out, makeOrf(start, length, false, frame, strand, sequence));
      }
    }
  }
}

/**
 * Find open reading frames in a DNA sequence on both strands.
 *
 * @param sequence Sanitized uppercase DNA (see `sanitizeSequence`).
 * @param minAa Minimum protein length in amino acids (default 30).
 */
export function findOrfs(sequence: string, minAa = 30): Orf[] {
  const out: Orf[] = [];

  scanStrand(sequence, "+", minAa, out);
  scanStrand(reverseComplement(sequence), "-", minAa, out);

  return out.sort(
    (a, b) =>
      b.lengthAa - a.lengthAa ||
      a.start - b.start ||
      (a.strand === b.strand ? 0 : a.strand === "+" ? -1 : 1)
  );
}
