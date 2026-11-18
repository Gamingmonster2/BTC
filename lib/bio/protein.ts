// Protein sequence features used as inputs to machine-learning models.
//
// Everything here is a *descriptor*, not a prediction: the functions compute
// well-defined physicochemical values from the primary sequence. Where a value
// depends on a model or a reference table, the source is named in a comment.
//
// References:
// - Residue masses: average (not monoisotopic) residue masses, plus H2O.
// - Hydropathy: Kyte & Doolittle (1982), J. Mol. Biol. 157:105-132.
// - pKa set: EMBOSS / Bjellqvist-style values, used for the iterative pI search.
// - Extinction coefficient: Pace et al. (1995), Protein Sci. 4:2411-2423.
// - Aliphatic index: Ikai (1980), J. Biochem. 88:1895-1896.
//
// Deliberately not implemented: the GRAVY-based transmembrane prediction, the
// instability index (needs the 400-entry dipeptide table), and secondary
// structure prediction. The UI states these limits instead of guessing.

export const AMINO_ACIDS = [
  "A",
  "R",
  "N",
  "D",
  "C",
  "E",
  "Q",
  "G",
  "H",
  "I",
  "L",
  "K",
  "M",
  "F",
  "P",
  "S",
  "T",
  "W",
  "Y",
  "V",
] as const;

export type AminoAcid = (typeof AMINO_ACIDS)[number];

/** Average residue masses in daltons (Da). */
const RESIDUE_MASS: Record<AminoAcid, number> = {
  A: 71.0788,
  R: 156.1875,
  N: 114.1038,
  D: 115.0886,
  C: 103.1388,
  E: 129.1155,
  Q: 128.1307,
  G: 57.0519,
  H: 137.1411,
  I: 113.1594,
  L: 113.1594,
  K: 128.1741,
  M: 131.1926,
  F: 147.1766,
  P: 97.1167,
  S: 87.0782,
  T: 101.1051,
  W: 186.2132,
  Y: 163.176,
  V: 99.1326,
};

/** Water lost/added when residues are joined into a chain. */
const WATER = 18.01524;

/** Kyte-Doolittle hydropathy values (positive = hydrophobic). */
const HYDROPATHY: Record<AminoAcid, number> = {
  A: 1.8,
  R: -4.5,
  N: -3.5,
  D: -3.5,
  C: 2.5,
  E: -3.5,
  Q: -3.5,
  G: -0.4,
  H: -3.2,
  I: 4.5,
  L: 3.8,
  K: -3.9,
  M: 1.9,
  F: 2.8,
  P: -1.6,
  S: -0.8,
  T: -0.7,
  W: -0.9,
  Y: -1.3,
  V: 4.2,
};

/** Ionisable-group pKa values used by the pI search. */
const PKA = {
  cTerm: 3.65,
  nTerm: 8.2,
  D: 3.9,
  E: 4.25,
  C: 8.5,
  Y: 10.07,
  H: 6.54,
  K: 10.53,
  R: 12.48,
} as const;

/** Hydrophobic, polar and charged groupings (standard textbook classes). */
const HYDROPHOBIC = new Set<AminoAcid>(["A", "V", "I", "L", "M", "F", "W", "Y", "C"]);
const CHARGED = new Set<AminoAcid>(["D", "E", "K", "R", "H"]);

/** Hard input limit: keeps the client-side analysis instant. */
export const MAX_PROTEIN_INPUT = 100_000;

export interface ProteinFeatures {
  /** Sequence length in residues. */
  length: number;
  counts: Record<AminoAcid, number>;
  /** Fraction of each residue (0–1). */
  frequencies: Record<AminoAcid, number>;
  /** Average molecular weight in daltons. */
  molecularWeight: number;
  /** Grand average of hydropathy (Kyte-Doolittle). */
  gravy: number;
  /** (F + W + Y) / length. */
  aromaticity: number;
  /** Ikai aliphatic index (0–100+). */
  aliphaticIndex: number;
  /** Isoelectric point from the iterative charge model. */
  isoelectricPoint: number;
  /** Net charge at pH 7.0. */
  netChargeAt7: number;
  /** Molar extinction coefficient at 280 nm (reduced cysteines). */
  extinctionCoefficient: number;
  /** Absorbance of a 1 g/L solution at 280 nm. */
  absorbance01: number;
  hydrophobicFraction: number;
  chargedFraction: number;
  /** Shannon entropy of the residue composition, in bits. */
  entropy: number;
  /** Entropy divided by log2(20), i.e. 0–1. */
  normalizedEntropy: number;
}

/** Remove whitespace, digits and punctuation; uppercase the rest. */
export function sanitizeProtein(input: string): string {
  return input.toUpperCase().replace(/[^A-Z]/g, "");
}

/** Characters that are not one of the 20 standard residues. */
export function invalidProteinChars(sequence: string): string[] {
  const seen = new Set<string>();
  for (const char of sequence) {
    if (!(AMINO_ACIDS as readonly string[]).includes(char)) seen.add(char);
  }
  return [...seen];
}

function emptyCounts(): Record<AminoAcid, number> {
  return Object.fromEntries(AMINO_ACIDS.map((aa) => [aa, 0])) as Record<
    AminoAcid,
    number
  >;
}

/** Net charge of the peptide at a given pH. */
function netCharge(counts: Record<AminoAcid, number>, pH: number): number {
  const positive =
    1 / (1 + 10 ** (pH - PKA.nTerm)) +
    counts.K / (1 + 10 ** (pH - PKA.K)) +
    counts.R / (1 + 10 ** (pH - PKA.R)) +
    counts.H / (1 + 10 ** (pH - PKA.H));

  const negative =
    1 / (1 + 10 ** (PKA.cTerm - pH)) +
    counts.D / (1 + 10 ** (PKA.D - pH)) +
    counts.E / (1 + 10 ** (PKA.E - pH)) +
    counts.C / (1 + 10 ** (PKA.C - pH)) +
    counts.Y / (1 + 10 ** (PKA.Y - pH));

  return positive - negative;
}

/**
 * Isoelectric point: the pH at which the net charge is zero. The charge is
 * monotonically decreasing in pH, so a bisection over [0, 14] converges.
 */
function isoelectricPoint(counts: Record<AminoAcid, number>): number {
  let low = 0;
  let high = 14;
  for (let i = 0; i < 80; i++) {
    const mid = (low + high) / 2;
    if (netCharge(counts, mid) > 0) low = mid;
    else high = mid;
  }
  return (low + high) / 2;
}

/** Compute every descriptor in one pass over the sequence. */
export function analyzeProtein(sequence: string): ProteinFeatures {
  const counts = emptyCounts();
  for (const char of sequence) {
    if ((AMINO_ACIDS as readonly string[]).includes(char)) {
      counts[char as AminoAcid] += 1;
    }
  }

  const length = sequence.length;
  const frequencies = emptyCounts();
  let molecularWeight = WATER;
  let hydropathySum = 0;

  for (const aa of AMINO_ACIDS) {
    frequencies[aa] = length === 0 ? 0 : counts[aa] / length;
    molecularWeight += counts[aa] * RESIDUE_MASS[aa];
    hydropathySum += counts[aa] * HYDROPATHY[aa];
  }

  const aromatic = counts.F + counts.W + counts.Y;
  const hydrophobic = [...HYDROPHOBIC].reduce((sum, aa) => sum + counts[aa], 0);
  const charged = [...CHARGED].reduce((sum, aa) => sum + counts[aa], 0);

  const molePercent = (aa: AminoAcid) =>
    length === 0 ? 0 : (counts[aa] / length) * 100;

  const aliphaticIndex =
    molePercent("A") +
    2.9 * molePercent("V") +
    3.9 * (molePercent("I") + molePercent("L")) +
    0.74 * molePercent("P");

  // Extinction coefficient, reduced cysteines (Pace et al. 1995).
  const extinctionCoefficient =
    5500 * counts.W + 1490 * counts.Y + 125 * counts.C;

  let entropy = 0;
  for (const aa of AMINO_ACIDS) {
    const p = frequencies[aa];
    if (p > 0) entropy -= p * Math.log2(p);
  }

  return {
    length,
    counts,
    frequencies,
    molecularWeight,
    gravy: length === 0 ? 0 : hydropathySum / length,
    aromaticity: length === 0 ? 0 : aromatic / length,
    aliphaticIndex,
    isoelectricPoint: isoelectricPoint(counts),
    netChargeAt7: netCharge(counts, 7),
    extinctionCoefficient,
    absorbance01:
      molecularWeight === 0 ? 0 : extinctionCoefficient / molecularWeight,
    hydrophobicFraction: length === 0 ? 0 : hydrophobic / length,
    chargedFraction: length === 0 ? 0 : charged / length,
    entropy,
    normalizedEntropy: entropy / Math.log2(AMINO_ACIDS.length),
  };
}

/** Ordered feature vector, ready for a CSV or a model input layer. */
export function featureVector(features: ProteinFeatures): {
  labels: string[];
  values: number[];
} {
  const labels = [
    ...AMINO_ACIDS.map((aa) => `freq_${aa}`),
    "molecular_weight",
    "gravy",
    "aromaticity",
    "aliphatic_index",
    "isoelectric_point",
    "net_charge_ph7",
    "extinction_coefficient",
    "hydrophobic_fraction",
    "charged_fraction",
    "entropy",
    "normalized_entropy",
  ];

  const values = [
    ...AMINO_ACIDS.map((aa) => features.frequencies[aa]),
    features.molecularWeight,
    features.gravy,
    features.aromaticity,
    features.aliphaticIndex,
    features.isoelectricPoint,
    features.netChargeAt7,
    features.extinctionCoefficient,
    features.hydrophobicFraction,
    features.chargedFraction,
    features.entropy,
    features.normalizedEntropy,
  ];

  return { labels, values };
}

/** CSV with a header row and one data row. */
export function featureCsv(features: ProteinFeatures): string {
  const { labels, values } = featureVector(features);
  return `${labels.join(",")}\n${values.map((v) => v.toFixed(6)).join(",")}`;
}
