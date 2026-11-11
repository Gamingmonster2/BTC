"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CopyButton } from "@/components/site/copy-button";
import {
  sanitizeSequence,
  isValidDna,
  analyzeDna,
  type DnaAnalysis,
  type ReadingFrame,
} from "@/lib/bio/dna";

type ErrorKey = "empty" | "invalid" | "tooShort";

const FRAMES: ReadingFrame[] = [1, 2, 3];

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-muted/40 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold tracking-tight">{value}</p>
    </div>
  );
}

function SequenceBlock({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        <CopyButton text={value} />
      </CardHeader>
      <CardContent>
        <p className="break-all font-mono text-xs leading-relaxed text-foreground/80">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

export function DnaAnalyzer() {
  const t = useTranslations("dna");
  const [input, setInput] = useState("");
  const [frame, setFrame] = useState<ReadingFrame>(1);
  const [error, setError] = useState<ErrorKey | null>(null);
  const [result, setResult] = useState<DnaAnalysis | null>(null);

  function run() {
    const seq = sanitizeSequence(input);
    if (seq.length === 0) {
      setError("empty");
      setResult(null);
      return;
    }
    if (!isValidDna(seq)) {
      setError("invalid");
      setResult(null);
      return;
    }
    if (seq.length < 3) {
      setError("tooShort");
      setResult(null);
      return;
    }
    setError(null);
    setResult(analyzeDna(seq, frame));
  }

  function changeFrame(next: ReadingFrame) {
    setFrame(next);
    if (result) setResult(analyzeDna(result.sequence, next));
  }

  function clear() {
    setInput("");
    setError(null);
    setResult(null);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="dna-input">{t("inputLabel")}</Label>
        <Textarea
          id="dna-input"
          dir="ltr"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("inputPlaceholder")}
          className="min-h-28 font-mono text-sm"
          spellCheck={false}
        />
        <div className="flex items-center gap-2">
          <Button onClick={run}>{t("analyze")}</Button>
          <Button variant="outline" onClick={clear}>
            {t("clear")}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>{t("errors.title")}</AlertTitle>
          <AlertDescription>{t(`errors.${error}`)}</AlertDescription>
        </Alert>
      )}

      {result && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat
              label={t("results.length")}
              value={`${result.length} ${t("results.basesUnit")}`}
            />
            <Stat
              label={t("results.gcContent")}
              value={`${result.gcPercent.toFixed(2)}%`}
            />
            <Stat
              label={t("results.atGc")}
              value={`${result.counts.A + result.counts.T} / ${result.counts.G + result.counts.C}`}
            />
            <Stat
              label={t("results.molecularWeight")}
              value={`${result.molecularWeightSs.toLocaleString()} g/mol`}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                {t("results.bases")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>A</TableHead>
                    <TableHead>C</TableHead>
                    <TableHead>G</TableHead>
                    <TableHead>T</TableHead>
                    <TableHead>Other</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{result.counts.A}</TableCell>
                    <TableCell>{result.counts.C}</TableCell>
                    <TableCell>{result.counts.G}</TableCell>
                    <TableCell>{result.counts.T}</TableCell>
                    <TableCell>{result.counts.other}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <SequenceBlock
            label={t("results.reverseComplement")}
            value={result.reverseComplement}
          />
          <SequenceBlock label={t("results.transcription")} value={result.mrna} />
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium">{t("frameLabel")}</span>
              {FRAMES.map((f) => (
                <Button
                  key={f}
                  type="button"
                  size="sm"
                  variant={result.frame === f ? "default" : "outline"}
                  onClick={() => changeFrame(f)}
                >
                  +{f}
                </Button>
              ))}
            </div>
            <SequenceBlock
              label={`${t("results.translation")} · ${t("frameLabel")} +${result.frame}`}
              value={result.protein}
            />
          </div>
        </div>
      )}
    </div>
  );
}
