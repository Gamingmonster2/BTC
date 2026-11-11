"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  validatePrimerInput,
  analyzePrimer,
  type PrimerAnalysis,
} from "@/lib/bio/primer";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-muted/40 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold tracking-tight">{value}</p>
    </div>
  );
}

export function PrimerTm() {
  const t = useTranslations("primer");
  const [input, setInput] = useState("");
  const [error, setError] = useState<"empty" | "invalid" | "tooShort" | null>(
    null
  );
  const [result, setResult] = useState<PrimerAnalysis | null>(null);

  function run() {
    const { sequence, error: validationError } = validatePrimerInput(input);
    if (validationError) {
      setError(validationError);
      setResult(null);
      return;
    }
    setError(null);
    setResult(analyzePrimer(sequence));
  }

  function clear() {
    setInput("");
    setError(null);
    setResult(null);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="primer-input">{t("inputLabel")}</Label>
        <Input
          id="primer-input"
          dir="ltr"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("inputPlaceholder")}
          className="h-10 font-mono text-sm"
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
            <Stat label={t("results.length")} value={`${result.length} bp`} />
            <Stat
              label={t("results.gcContent")}
              value={`${result.gcPercent.toFixed(1)}%`}
            />
            <Stat
              label={t("results.tmBasic")}
              value={`${result.tmBasic.toFixed(1)}°C`}
            />
            <Stat
              label={t("results.tmSalt")}
              value={`${result.tmSaltAdjusted.toFixed(1)}°C`}
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{result.counts.A}</TableCell>
                    <TableCell>{result.counts.C}</TableCell>
                    <TableCell>{result.counts.G}</TableCell>
                    <TableCell>{result.counts.T}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                {t("results.gcClamp")}
              </CardTitle>
              <Badge variant={result.gcClamp ? "default" : "outline"}>
                {result.gcClamp ? t("results.gcClampYes") : t("results.gcClampNo")}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {t("results.reverseComplement")}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <p className="min-w-0 flex-1 break-all font-mono text-xs text-foreground/80">
                  {result.reverseComplement}
                </p>
                <CopyButton text={result.reverseComplement} />
              </div>
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground">{t("results.note")}</p>
        </div>
      )}
    </div>
  );
}
