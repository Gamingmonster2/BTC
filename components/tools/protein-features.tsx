"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CopyButton } from "@/components/site/copy-button";
import {
  AMINO_ACIDS,
  MAX_PROTEIN_INPUT,
  analyzeProtein,
  featureCsv,
  featureVector,
  invalidProteinChars,
  sanitizeProtein,
  type ProteinFeatures,
} from "@/lib/bio/protein";

type ErrorKey = "empty" | "invalid" | "tooLong";

/** Insulin A chain — a short, well-known peptide used as the example input. */
const EXAMPLE = "GIVEQCCTSICSLYQLENYCN";

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border bg-muted/40 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-mono text-lg font-semibold tracking-tight" dir="ltr">
        {value}
      </p>
      {hint && <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function ProteinFeaturesTool() {
  const t = useTranslations("protein");
  const [input, setInput] = useState("");
  const [error, setError] = useState<ErrorKey | null>(null);
  const [invalidChars, setInvalidChars] = useState<string[]>([]);
  const [features, setFeatures] = useState<ProteinFeatures | null>(null);
  const [sequence, setSequence] = useState("");

  function run() {
    const cleaned = sanitizeProtein(input);

    if (cleaned.length === 0) {
      setError("empty");
      setFeatures(null);
      return;
    }

    const bad = invalidProteinChars(cleaned);
    if (bad.length > 0) {
      setInvalidChars(bad);
      setError("invalid");
      setFeatures(null);
      return;
    }

    if (cleaned.length > MAX_PROTEIN_INPUT) {
      setError("tooLong");
      setFeatures(null);
      return;
    }

    setError(null);
    setInvalidChars([]);
    setSequence(cleaned);
    setFeatures(analyzeProtein(cleaned));
  }

  function clear() {
    setInput("");
    setError(null);
    setFeatures(null);
    setSequence("");
  }

  const vector = features ? featureVector(features) : null;
  const json = features
    ? JSON.stringify(
        {
          length: features.length,
          ...Object.fromEntries(
            vector!.labels.map((label, i) => [label, Number(vector!.values[i].toFixed(6))])
          ),
        },
        null,
        2
      )
    : "";
  const csv = features ? featureCsv(features) : "";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="protein-input">{t("inputLabel")}</Label>
        <Textarea
          id="protein-input"
          dir="ltr"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={t("inputPlaceholder")}
          className="min-h-32 font-mono text-sm"
          spellCheck={false}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={run}>{t("analyze")}</Button>
        <Button variant="outline" onClick={() => setInput(EXAMPLE)}>
          {t("example")}
        </Button>
        <Button variant="ghost" onClick={clear}>
          {t("clear")}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>{t("errors.title")}</AlertTitle>
          <AlertDescription>
            {error === "invalid"
              ? t("errors.invalid", { chars: invalidChars.join(", ") })
              : t(`errors.${error}`)}
          </AlertDescription>
        </Alert>
      )}

      {features && vector && (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label={t("stats.length")} value={`${features.length}`} />
            <Stat
              label={t("stats.mw")}
              value={`${features.molecularWeight.toFixed(1)}`}
              hint={t("units.da")}
            />
            <Stat
              label={t("stats.pi")}
              value={features.isoelectricPoint.toFixed(2)}
            />
            <Stat
              label={t("stats.charge")}
              value={features.netChargeAt7.toFixed(2)}
            />
            <Stat label={t("stats.gravy")} value={features.gravy.toFixed(3)} />
            <Stat
              label={t("stats.aromaticity")}
              value={features.aromaticity.toFixed(3)}
            />
            <Stat
              label={t("stats.aliphatic")}
              value={features.aliphaticIndex.toFixed(1)}
            />
            <Stat
              label={t("stats.extinction")}
              value={features.extinctionCoefficient.toLocaleString("en-US")}
              hint={`${t("units.molar")} · A0.1% ${features.absorbance01.toFixed(3)}`}
            />
          </div>

          <Card>
            <CardHeader className="gap-1">
              <CardTitle className="text-sm font-medium">
                {t("composition.title")}
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                {t("composition.hint", { count: features.length })}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                {AMINO_ACIDS.map((aa) => {
                  const count = features.counts[aa];
                  const pct = features.frequencies[aa] * 100;
                  return (
                    <div key={aa} className="flex items-center gap-2">
                      <span className="w-4 font-mono text-xs font-semibold">
                        {aa}
                      </span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand to-brand-2"
                          style={{ width: `${Math.min(pct * 4, 100)}%` }}
                        />
                      </div>
                      <span
                        className="w-16 text-end font-mono text-[11px] text-muted-foreground"
                        dir="ltr"
                      >
                        {count} · {pct.toFixed(1)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="gap-1">
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-sm font-medium">
                  {t("vector.title")}
                </CardTitle>
                <div className="flex items-center gap-1">
                  <CopyButton text={json} />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const blob = new Blob([csv], { type: "text/csv" });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.href = url;
                      link.download = `protein-features-${sequence.length}aa.csv`;
                      link.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    {t("vector.downloadCsv")}
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {t("vector.hint", { count: vector.values.length })}
              </p>
            </CardHeader>
            <CardContent>
              <pre
                dir="ltr"
                className="max-h-72 overflow-auto rounded-lg border bg-muted/40 p-3 font-mono text-[11px] leading-relaxed"
              >
                {json}
              </pre>
            </CardContent>
          </Card>

          <div className="rounded-lg border border-s-4 border-s-brand/50 bg-muted/40 p-4 text-sm leading-6 text-muted-foreground">
            {t("note")}
          </div>
        </>
      )}
    </div>
  );
}
