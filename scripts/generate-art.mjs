// Generates the abstract science artwork in public/art as SVG.
//
// Run with: node scripts/generate-art.mjs
//
// The artwork is original vector work (no stock photos, no attribution
// required): DNA helices, molecular lattices and neural-network motifs drawn
// with deterministic math so the output is reproducible and diff-friendly.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "art");
mkdirSync(OUT, { recursive: true });

const TEAL = "#2dd4bf";
const TEAL_SOFT = "#5eead4";
const VIOLET = "#8b5cf6";
const VIOLET_SOFT = "#c4b5fd";
const GOLD = "#f0b775";
const INK = "#070b14";
const INK_2 = "#0d1526";

/** Deterministic PRNG so regenerating produces byte-identical files. */
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n) => Number(n.toFixed(2));

function defs({ id = "a", from = TEAL, to = VIOLET } = {}) {
  return `
  <defs>
    <linearGradient id="stroke-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}" />
      <stop offset="55%" stop-color="${TEAL_SOFT}" />
      <stop offset="100%" stop-color="${to}" />
    </linearGradient>
    <linearGradient id="fade-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${from}" stop-opacity="0.95" />
      <stop offset="100%" stop-color="${to}" stop-opacity="0.25" />
    </linearGradient>
    <radialGradient id="glow-${id}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${from}" stop-opacity="0.55" />
      <stop offset="55%" stop-color="${to}" stop-opacity="0.16" />
      <stop offset="100%" stop-color="${to}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glow2-${id}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${to}" stop-opacity="0.45" />
      <stop offset="100%" stop-color="${to}" stop-opacity="0" />
    </radialGradient>
    <filter id="soft-${id}" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="6" />
    </filter>
    <filter id="blur-${id}" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="18" />
    </filter>
  </defs>`;
}

function backdrop(w, h, id) {
  return `
  <rect width="${w}" height="${h}" fill="${INK}" />
  <rect width="${w}" height="${h}" fill="url(#glow-${id})" opacity="0.55" />
  <g opacity="0.16" stroke="${TEAL}">
    ${Array.from({ length: Math.ceil(w / 64) + 1 }, (_, i) => `<path d="M${i * 64} 0V${h}" stroke-width="0.6" />`).join("")}
    ${Array.from({ length: Math.ceil(h / 64) + 1 }, (_, i) => `<path d="M0 ${i * 64}H${w}" stroke-width="0.6" />`).join("")}
  </g>`;
}

function particles(w, h, seed, count = 46) {
  const r = rng(seed);
  return Array.from({ length: count }, () => {
    const x = f(r() * w);
    const y = f(r() * h);
    const rad = f(0.8 + r() * 2.2);
    const o = f(0.15 + r() * 0.6);
    const c = r() > 0.55 ? VIOLET_SOFT : TEAL_SOFT;
    return `<circle cx="${x}" cy="${y}" r="${rad}" fill="${c}" opacity="${o}" />`;
  }).join("");
}

/** Two antiparallel strands plus base-pair rungs. */
function helix({ cx, top, bottom, radius, turns, phase = 0, id, opacity = 1 }) {
  const samples = 180;
  const left = [];
  const right = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const y = f(top + (bottom - top) * t);
    const a = phase + t * turns * Math.PI * 2;
    left.push([f(cx + radius * Math.sin(a)), y, Math.cos(a)]);
    right.push([f(cx - radius * Math.sin(a)), y, Math.cos(a)]);
  }
  const toPath = (pts) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]} ${p[1]}`).join(" ");

  const rungCount = Math.max(6, Math.round(turns * 7));
  const rungs = Array.from({ length: rungCount }, (_, i) => {
    const t = (i + 0.5) / rungCount;
    const y = f(top + (bottom - top) * t);
    const a = phase + t * turns * Math.PI * 2;
    const x1 = f(cx + radius * Math.sin(a));
    const x2 = f(cx - radius * Math.sin(a));
    const depth = Math.abs(Math.cos(a));
    const o = f(0.2 + depth * 0.65);
    return `<path d="M${x1} ${y}L${x2} ${y}" stroke="url(#stroke-${id})" stroke-width="${f(1 + depth * 1.6)}" opacity="${o}" stroke-linecap="round" />`;
  }).join("");

  return `
  <g filter="url(#soft-${id})" opacity="${f(opacity * 0.55)}">
    <path d="${toPath(left)}" fill="none" stroke="${TEAL}" stroke-width="7" stroke-linecap="round" />
    <path d="${toPath(right)}" fill="none" stroke="${VIOLET}" stroke-width="7" stroke-linecap="round" />
  </g>
  <g opacity="${opacity}">
    ${rungs}
    <path d="${toPath(left)}" fill="none" stroke="url(#stroke-${id})" stroke-width="2.6" stroke-linecap="round" />
    <path d="${toPath(right)}" fill="none" stroke="url(#stroke-${id})" stroke-width="2.6" stroke-linecap="round" />
  </g>`;
}

/** Neural network: layered nodes with weighted edges. */
function network({ x, y, w, h, layers = [3, 5, 5, 3], seed = 7 }) {
  const r = rng(seed);
  const nodes = layers.map((count, li) => {
    const lx = x + (w / (layers.length - 1)) * li;
    return Array.from({ length: count }, (_, ni) => {
      const ly = y + (h / (count + 1)) * (ni + 1) + (r() - 0.5) * 14;
      return { lx, ly, key: `${li}-${ni}` };
    });
  });

  const edges = [];
  for (let li = 0; li < nodes.length - 1; li++) {
    for (const a of nodes[li]) {
      for (const b of nodes[li + 1]) {
        const o = f(0.06 + r() * 0.22);
        edges.push(
          `<path d="M${f(a.lx)} ${f(a.ly)}L${f(b.lx)} ${f(b.ly)}" stroke="${r() > 0.5 ? TEAL : VIOLET}" stroke-width="0.8" opacity="${o}" />`
        );
      }
    }
  }

  const dots = nodes.flat().map((n, i) => {
    const rad = f(2.6 + (i % 4) * 0.9);
    const c = i % 3 === 0 ? VIOLET_SOFT : TEAL_SOFT;
    return `<circle cx="${f(n.lx)}" cy="${f(n.ly)}" r="${f(rad * 2.6)}" fill="${c}" opacity="0.12" />
    <circle cx="${f(n.lx)}" cy="${f(n.ly)}" r="${rad}" fill="${c}" />`;
  });

  return `<g>${edges.join("")}${dots.join("")}</g>`;
}

function hexagon(cx, cy, r, stroke, width = 1.6, opacity = 0.7) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${f(cx + r * Math.cos(a))},${f(cy + r * Math.sin(a))}`;
  }).join(" ");
  return `<polygon points="${pts}" fill="none" stroke="${stroke}" stroke-width="${width}" opacity="${opacity}" />`;
}

function lattice({ cx, cy, r, rings = 3, stroke, seed = 3 }) {
  const rand = rng(seed);
  const cells = [];
  for (let ring = 0; ring < rings; ring++) {
    const count = ring === 0 ? 1 : ring * 6;
    for (let i = 0; i < count; i++) {
      const a = (Math.PI * 2 * i) / count + ring * 0.12;
      const d = ring * r * 1.74;
      cells.push(
        hexagon(
          cx + d * Math.cos(a),
          cy + d * Math.sin(a),
          r * (0.9 + rand() * 0.12),
          stroke,
          ring === 0 ? 2 : 1.2,
          ring === 0 ? 0.9 : f(0.28 + rand() * 0.3)
        )
      );
    }
  }
  return cells.join("");
}

function svg(w, h, body, id) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
  ${defs({ id })}
  ${body}
</svg>
`;
}

function write(name, content) {
  writeFileSync(join(OUT, name), content);
  console.log(`${name}: ${(content.length / 1024).toFixed(1)} kB`);
}

// ---------------------------------------------------------------------------
// Hero: a helix on the left dissolving into a neural network on the right.
// ---------------------------------------------------------------------------
{
  const id = "hero";
  const body = `
  ${backdrop(1200, 760, id)}
  <ellipse cx="330" cy="380" rx="330" ry="360" fill="url(#glow-${id})" opacity="0.7" />
  <ellipse cx="880" cy="360" rx="300" ry="300" fill="url(#glow2-${id})" opacity="0.6" />
  ${helix({ cx: 320, top: 90, bottom: 690, radius: 92, turns: 3.4, id })}
  ${network({ x: 690, y: 170, w: 400, h: 400, layers: [3, 6, 6, 4], id, seed: 11 })}
  <g opacity="0.75">
    ${Array.from({ length: 16 }, (_, i) => {
      const t = i / 15;
      const x = 430 + t * 250;
      const y = 380 + Math.sin(t * Math.PI * 3) * 70;
      return `<circle cx="${f(x)}" cy="${f(y)}" r="${f(2 + (1 - t) * 3)}" fill="${i % 2 ? VIOLET_SOFT : TEAL_SOFT}" opacity="${f(0.85 - t * 0.6)}" />`;
    }).join("")}
  </g>
  ${particles(1200, 760, 42, 60)}`;
  write("hero.svg", svg(1200, 760, body, id));
}

// ---------------------------------------------------------------------------
// Step 1: sequence entering a glass panel.
// ---------------------------------------------------------------------------
{
  const id = "paste";
  const bars = Array.from({ length: 13 }, (_, i) => {
    const y = 210 + i * 30;
    const w = 300 + (i % 4) * 46;
    const c = i % 3 === 0 ? VIOLET : TEAL;
    return `<rect x="${f(600 - w / 2)}" y="${y}" width="${w}" height="9" rx="4.5" fill="${c}" opacity="${f(0.28 + (i % 5) * 0.1)}" />`;
  }).join("");

  const body = `
  ${backdrop(1200, 800, id)}
  <ellipse cx="600" cy="400" rx="460" ry="330" fill="url(#glow-${id})" opacity="0.5" />
  <rect x="420" y="140" width="360" height="520" rx="28" fill="${INK_2}" stroke="url(#stroke-${id})" stroke-width="1.5" opacity="0.95" />
  <rect x="420" y="140" width="360" height="520" rx="28" fill="url(#glow2-${id})" opacity="0.25" />
  <g>${bars}</g>
  <rect x="470" y="600" width="260" height="12" rx="6" fill="${TEAL}" opacity="0.5" />
  ${helix({ cx: 250, top: 230, bottom: 620, radius: 58, turns: 2.4, id, opacity: 0.9 })}
  <g opacity="0.85">
    <path d="M350 420C420 420 430 380 470 372" stroke="${TEAL_SOFT}" stroke-width="2" fill="none" stroke-dasharray="6 8" />
    <path d="M350 470C420 470 440 520 470 512" stroke="${VIOLET_SOFT}" stroke-width="2" fill="none" stroke-dasharray="6 8" />
  </g>
  ${particles(1200, 800, 5, 40)}`;
  write("step-paste.svg", svg(1200, 800, body, id));
}

// ---------------------------------------------------------------------------
// Step 2: a computational core processing a molecule.
// ---------------------------------------------------------------------------
{
  const id = "analyze";
  const rings = [300, 232, 168, 112]
    .map(
      (r, i) =>
        `<circle cx="600" cy="400" r="${r}" fill="none" stroke="${i % 2 ? VIOLET : TEAL}" stroke-width="${f(1.6 - i * 0.2)}" opacity="${f(0.35 - i * 0.05)}" stroke-dasharray="${i === 1 ? "3 10" : "none"}" />`
    )
    .join("");

  const spokes = Array.from({ length: 12 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 12;
    return `<path d="M${f(600 + Math.cos(a) * 112)} ${f(400 + Math.sin(a) * 112)}L${f(600 + Math.cos(a) * 300)} ${f(400 + Math.sin(a) * 300)}" stroke="${i % 2 ? TEAL : VIOLET}" stroke-width="0.8" opacity="0.25" />`;
  }).join("");

  const tiles = Array.from({ length: 7 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 7 + 0.3;
    const d = 250;
    const x = 600 + Math.cos(a) * d;
    const y = 400 + Math.sin(a) * d * 0.82;
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f((a * 180) / Math.PI)})">
      <rect x="-22" y="-16" width="44" height="32" rx="7" fill="${INK_2}" stroke="${i % 2 ? VIOLET : TEAL}" stroke-width="1" opacity="0.85" />
      <path d="M-13 5L-5 -3L3 2L13 -7" stroke="${TEAL_SOFT}" stroke-width="1.4" fill="none" opacity="0.8" />
    </g>`;
  }).join("");

  const body = `
  ${backdrop(1200, 800, id)}
  <circle cx="600" cy="400" r="380" fill="url(#glow-${id})" opacity="0.6" />
  ${rings}
  ${spokes}
  ${lattice({ cx: 600, cy: 400, r: 44, rings: 2, stroke: TEAL_SOFT, seed: 9 })}
  <circle cx="600" cy="400" r="34" fill="${VIOLET}" opacity="0.18" filter="url(#blur-${id})" />
  <circle cx="600" cy="400" r="10" fill="${VIOLET_SOFT}" />
  ${tiles}
  ${particles(1200, 800, 21, 44)}`;
  write("step-analyze.svg", svg(1200, 800, body, id));
}

// ---------------------------------------------------------------------------
// Step 3: result cards.
// ---------------------------------------------------------------------------
{
  const id = "result";
  const card = (x, y, w, h, accent, bars) => `
    <g transform="translate(${x} ${y})">
      <rect width="${w}" height="${h}" rx="20" fill="${INK_2}" stroke="${accent}" stroke-width="1.2" opacity="0.96" />
      <rect width="${w}" height="${h}" rx="20" fill="url(#glow2-${id})" opacity="0.18" />
      <rect x="26" y="26" width="${w * 0.42}" height="8" rx="4" fill="${accent}" opacity="0.7" />
      <rect x="26" y="44" width="${w * 0.26}" height="6" rx="3" fill="#ffffff" opacity="0.2" />
      ${bars
        .map(
          (b, i) =>
            `<rect x="26" y="${78 + i * 26}" width="${b}" height="10" rx="5" fill="${i % 2 ? accent : TEAL_SOFT}" opacity="${f(0.85 - i * 0.09)}" />`
        )
        .join("")}
    </g>`;

  const body = `
  ${backdrop(1200, 800, id)}
  <ellipse cx="600" cy="400" rx="500" ry="340" fill="url(#glow-${id})" opacity="0.45" />
  ${card(170, 190, 300, 300, TEAL, [200, 150, 120, 180, 90])}
  ${card(700, 250, 330, 290, VIOLET, [220, 170, 140, 110, 190])}
  ${card(430, 470, 280, 210, GOLD, [170, 130, 190, 100])}
  <g transform="translate(930 130)">
    ${hexagon(0, 0, 46, TEAL_SOFT, 1.6, 0.8)}
    ${hexagon(0, 0, 24, VIOLET_SOFT, 1.2, 0.6)}
    <circle cx="0" cy="0" r="6" fill="${TEAL_SOFT}" />
  </g>
  ${particles(1200, 800, 33, 36)}`;
  write("step-result.svg", svg(1200, 800, body, id));
}

// ---------------------------------------------------------------------------
// Article covers.
// ---------------------------------------------------------------------------
{
  const id = "dna";
  const body = `
  ${backdrop(1200, 800, id)}
  <ellipse cx="600" cy="400" rx="420" ry="400" fill="url(#glow-${id})" opacity="0.65" />
  ${helix({ cx: 600, top: 60, bottom: 740, radius: 150, turns: 3.2, id })}
  ${helix({ cx: 600, top: 120, bottom: 680, radius: 88, turns: 2.6, phase: 1.2, id, opacity: 0.35 })}
  ${particles(1200, 800, 77, 70)}`;
  write("article-dna.svg", svg(1200, 800, body, id));
}

{
  const id = "tm";
  const waves = Array.from({ length: 5 }, (_, i) => {
    const y = 430 + i * 34;
    const amp = 12 + i * 5;
    const pts = Array.from({ length: 41 }, (_, k) => {
      const x = 140 + k * 23;
      return `${k === 0 ? "M" : "L"}${x} ${f(y + Math.sin((k / 40) * Math.PI * 3 + i) * amp)}`;
    }).join(" ");
    return `<path d="${pts}" fill="none" stroke="${i % 2 ? GOLD : TEAL}" stroke-width="${f(1.6 - i * 0.15)}" opacity="${f(0.55 - i * 0.07)}" />`;
  }).join("");

  const body = `
  ${backdrop(1200, 800, id)}
  <ellipse cx="600" cy="470" rx="460" ry="260" fill="url(#glow-${id})" opacity="0.5" />
  <g opacity="0.9">
    ${helix({ cx: 430, top: 120, bottom: 470, radius: 78, turns: 2.1, id })}
    ${helix({ cx: 770, top: 120, bottom: 470, radius: 78, turns: 2.1, phase: 2.4, id })}
  </g>
  <path d="M430 470C520 560 680 560 770 470" stroke="${GOLD}" stroke-width="2.5" fill="none" opacity="0.8" />
  <circle cx="600" cy="560" r="60" fill="${GOLD}" opacity="0.12" filter="url(#blur-${id})" />
  ${waves}
  ${particles(1200, 800, 91, 40)}`;
  write("article-tm.svg", svg(1200, 800, body, id));
}

{
  const id = "orf";
  const codons = Array.from({ length: 9 }, (_, i) => {
    const x = 300 + i * 70;
    const c =
      i === 1 ? TEAL : i === 8 ? GOLD : i % 2 ? VIOLET : TEAL_SOFT;
    return `<g transform="translate(${x} 470)">
      <rect x="0" y="0" width="52" height="36" rx="8" fill="${INK_2}" stroke="${c}" stroke-width="1.4" opacity="0.95" />
      <rect x="8" y="12" width="10" height="12" rx="2" fill="${c}" opacity="0.75" />
      <rect x="22" y="12" width="10" height="12" rx="2" fill="${c}" opacity="0.45" />
      <rect x="36" y="12" width="8" height="12" rx="2" fill="${c}" opacity="0.25" />
    </g>`;
  }).join("");

  const body = `
  ${backdrop(1200, 800, id)}
  <ellipse cx="600" cy="380" rx="460" ry="320" fill="url(#glow-${id})" opacity="0.5" />
  <path d="M180 488H1020" stroke="${TEAL}" stroke-width="1" opacity="0.25" stroke-dasharray="8 10" />
  ${codons}
  <g transform="translate(600 300)">
    <rect x="-150" y="-96" width="300" height="192" rx="30" fill="${INK_2}" stroke="url(#stroke-${id})" stroke-width="1.6" opacity="0.95" />
    <path d="M-70 -40H70M-70 0H70M-70 40H70" stroke="${VIOLET_SOFT}" stroke-width="2" opacity="0.35" stroke-dasharray="10 12" />
    <circle cx="0" cy="0" r="18" fill="${VIOLET}" opacity="0.35" filter="url(#soft-${id})" />
    <circle cx="0" cy="0" r="7" fill="${VIOLET_SOFT}" />
  </g>
  <path d="M600 396V452" stroke="${TEAL_SOFT}" stroke-width="2" opacity="0.6" />
  <circle cx="300" cy="470" r="14" fill="${TEAL}" opacity="0.25" filter="url(#soft-${id})" />
  <circle cx="860" cy="470" r="14" fill="${GOLD}" opacity="0.3" filter="url(#soft-${id})" />
  ${particles(1200, 800, 55, 36)}`;
  write("article-orf.svg", svg(1200, 800, body, id));
}

{
  const id = "arabic";
  const star = (() => {
    const points = [];
    const spokes = 8;
    for (let i = 0; i < spokes * 2; i++) {
      const a = (Math.PI * i) / spokes - Math.PI / 2;
      const r = i % 2 === 0 ? 210 : 118;
      points.push(`${f(600 + r * Math.cos(a))},${f(400 + r * Math.sin(a))}`);
    }
    return `<polygon points="${points.join(" ")}" fill="none" stroke="${GOLD}" stroke-width="2" opacity="0.85" />`;
  })();

  const inner = Array.from({ length: 8 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 8 - Math.PI / 2;
    return `<circle cx="${f(600 + 260 * Math.cos(a))}" cy="${f(400 + 260 * Math.sin(a))}" r="7" fill="${TEAL_SOFT}" opacity="0.8" />`;
  }).join("");

  const body = `
  ${backdrop(1200, 800, id)}
  <circle cx="600" cy="400" r="360" fill="url(#glow-${id})" opacity="0.55" />
  ${lattice({ cx: 600, cy: 400, r: 40, rings: 2, stroke: TEAL, seed: 4 })}
  ${star}
  <circle cx="600" cy="400" r="118" fill="none" stroke="${TEAL}" stroke-width="1.2" opacity="0.5" />
  <circle cx="600" cy="400" r="210" fill="none" stroke="${VIOLET}" stroke-width="1" opacity="0.35" stroke-dasharray="4 12" />
  ${inner}
  ${particles(1200, 800, 13, 34)}`;
  write("article-arabic.svg", svg(1200, 800, body, id));
}

{
  const id = "protein";
  const ribbon = (() => {
    const pts = [];
    for (let i = 0; i <= 120; i++) {
      const t = i / 120;
      const x = 220 + t * 760;
      const y = 400 + Math.sin(t * Math.PI * 3.1) * 120 + Math.cos(t * Math.PI * 5) * 34;
      pts.push([f(x), f(y)]);
    }
    return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]} ${p[1]}`).join(" ");
  })();

  const nodes = Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 10;
    const x = 600 + Math.cos(a) * 330;
    const y = 400 + Math.sin(a) * 250;
    return `<g>
      <circle cx="${f(x)}" cy="${f(y)}" r="26" fill="${i % 2 ? VIOLET : TEAL}" opacity="0.1" />
      <circle cx="${f(x)}" cy="${f(y)}" r="6" fill="${i % 2 ? VIOLET_SOFT : TEAL_SOFT}" />
      <path d="M${f(x)} ${f(y)}L${f(600 + Math.cos(a) * 180)} ${f(400 + Math.sin(a) * 140)}" stroke="${i % 2 ? VIOLET : TEAL}" stroke-width="0.7" opacity="0.2" />
    </g>`;
  }).join("");

  const tiles = [
    [300, 210, "0.42"],
    [880, 240, "7.1"],
    [340, 600, "-0.31"],
    [860, 590, "4.9"],
  ]
    .map(
      ([x, y]) => `<g transform="translate(${x} ${y})">
        <rect x="-34" y="-18" width="68" height="36" rx="9" fill="${INK_2}" stroke="${TEAL}" stroke-width="1" opacity="0.9" />
        <rect x="-20" y="-3" width="40" height="6" rx="3" fill="${TEAL_SOFT}" opacity="0.55" />
      </g>`
    )
    .join("");

  const body = `
  ${backdrop(1200, 800, id)}
  <ellipse cx="600" cy="400" rx="470" ry="330" fill="url(#glow-${id})" opacity="0.55" />
  ${nodes}
  <path d="${ribbon}" fill="none" stroke="url(#stroke-${id})" stroke-width="26" stroke-linecap="round" opacity="0.22" filter="url(#blur-${id})" />
  <path d="${ribbon}" fill="none" stroke="url(#stroke-${id})" stroke-width="12" stroke-linecap="round" opacity="0.95" />
  <path d="${ribbon}" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.18" />
  ${tiles}
  ${particles(1200, 800, 8, 38)}`;
  write("tool-protein.svg", svg(1200, 800, body, id));
}
