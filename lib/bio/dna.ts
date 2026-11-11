// Core DNA sequence utilities.
// All functions are pure and operate on uppercase strings without whitespace/digits.

/** Remove whitespace and digits, and uppercase a raw input sequence. */
export function sanitizeSequence(input: string): string {
  return input.toUpperCase().replace(/[\s0-9]/g, "");
}

/** Valid DNA alphabet including IUPAC ambiguity codes. */
const VALID_DNA = /^[ACGTURYSWKMBDHVN]+$/;

/** True when the (sanitized) sequence is a non-empty valid DNA string. */
export function isValidDna(sequence: string): boolean {
  return sequence.length > 0 && VALID_DNA.test(sequence);
}

/** Complement map (supports IUPAC ambiguity codes). */
const COMPLEMENT: Record<string, string> = {
  A: "T",
  T: "A",
  U: "A",
  C: "G",
  G: "C",
  R: "Y",
  Y: "R",
  S: "S",
  W: "W",
  K: "M",
  M: "K",
  B: "V",
  V: "B",
  D: "H",
  H: "D",
  N: "N",
};

/** Return the reverse complement of a DNA/RNA sequence (5' -> 3'). */
export function reverseComplement(sequence: string): string {
  return sequence
    .split("")
    .reverse()
    .map((base) => COMPLEMENT[base] ?? "N")
    .join("");
}

export interface BaseCounts {
  A: number;
  C: number;
  G: number;
  T: number;
  other: number;
}

/** Count A/C/G/T (and other IUPAC codes) in a sequence. */
export function countBases(sequence: string): BaseCounts {
  const counts: BaseCounts = { A: 0, C: 0, G: 0, T: 0, other: 0 };
  for (const base of sequence) {
    if (base === "A") counts.A++;
    else if (base === "C") counts.C++;
    else if (base === "G") counts.G++;
    else if (base === "T" || base === "U") counts.T++;
    else counts.other++;
  }
  return counts;
}

/** GC content as a percentage (0-100). */
export function gcContent(sequence: string): number {
  if (sequence.length === 0) return 0;
  const counts = countBases(sequence);
  const gc = counts.G + counts.C;
  return (gc / sequence.length) * 100;
}

/** Transcribe DNA to RNA by replacing T with U. */
export function transcribe(sequence: string): string {
  return sequence.replace(/T/g, "U");
}

/** Standard genetic code (DNA codons -> amino acid one-letter code, * = stop). */
const CODON_TABLE: Record<string, string> = {
  TTT: "F", TTC: "F", TTA: "L", TTG: "L",
  TCT: "S", TCC: "S", TCA: "S", TCG: "S",
  TAT: "Y", TAC: "Y", TAA: "*", TAG: "*",
  TGT: "C", TGC: "C", TGA: "*", TGG: "W",
  CTT: "L", CTC: "L", CTA: "L", CTG: "L",
  CCT: "P", CCC: "P", CCA: "P", CCG: "P",
  CAT: "H", CAC: "H", CAA: "Q", CAG: "Q",
  CGT: "R", CGC: "R", CGA: "R", CGG: "R",
  ATT: "I", ATC: "I", ATA: "I", ATG: "M",
  ACT: "T", ACC: "T", ACA: "T", ACG: "T",
  AAT: "N", AAC: "N", AAA: "K", AAG: "K",
  AGT: "S", AGC: "S", AGA: "R", AGG: "R",
  GTT: "V", GTC: "V", GTA: "V", GTG: "V",
  GCT: "A", GCC: "A", GCA: "A", GCG: "A",
  GAT: "D", GAC: "D", GAA: "E", GAG: "E",
  GGT: "G", GGC: "G", GGA: "G", GGG: "G",
};

export type ReadingFrame = 1 | 2 | 3;

/**
 * Translate a DNA sequence to a protein sequence.
 * The codon table is keyed by DNA codons, so the input must stay as DNA
 * (U is normalized to T to also accept RNA input).
 *
 * `frame` selects the first base of the first codon (1, 2 or 3). Trailing bases
 * that do not form a complete codon are ignored; a stop codon is shown as `*`.
 */
export function translate(sequence: string, frame: ReadingFrame = 1): string {
  const dna = sequence.replace(/U/g, "T");
  let protein = "";
  for (let i = frame - 1; i + 3 <= dna.length; i += 3) {
    const codon = dna.slice(i, i + 3);
    protein += CODON_TABLE[codon] ?? "X";
  }
  return protein;
}

/**
 * Molecular weight of a single-stranded DNA sequence (g/mol).
 * Standard residue masses (Sambrook & Russell):
 *   A 313.21, T 304.20, G 329.21, C 289.18, minus 61.96 for the 5' phosphate.
 * Ambiguity codes are ignored. A double-stranded molecule weighs roughly twice
 * as much.
 */
export function molecularWeightSs(sequence: string): number {
  const c = countBases(sequence);
  const mass =
    c.A * 313.21 + c.T * 304.2 + c.G * 329.21 + c.C * 289.18 - 61.96;
  return Math.max(0, Math.round(mass));
}

export interface DnaAnalysis {
  sequence: string;
  length: number;
  counts: BaseCounts;
  gcPercent: number;
  reverseComplement: string;
  mrna: string;
  protein: string;
  frame: ReadingFrame;
  molecularWeightSs: number;
}

/** Run the full DNA analysis pipeline on a sanitized, validated sequence. */
export function analyzeDna(
  sequence: string,
  frame: ReadingFrame = 1
): DnaAnalysis {
  return {
    sequence,
    length: sequence.length,
    counts: countBases(sequence),
    gcPercent: gcContent(sequence),
    reverseComplement: reverseComplement(sequence),
    mrna: transcribe(sequence),
    protein: translate(sequence, frame),
    frame,
    molecularWeightSs: molecularWeightSs(sequence),
  };
}
