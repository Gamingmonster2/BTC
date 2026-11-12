"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { sanitizeSequence, isValidDna } from "@/lib/bio/dna";
import { findOrfs, MAX_ORF_INPUT, type Orf } from "@/lib/bio/orf";

type ErrorKey = "empty" | "invalid" | "tooShort" | "tooLong";

export function OrfFinder() {
  const t = useTranslations("orf");
  const [input, setInput] = useState("");
  const [minAaInput, setMinAaInput] = useState("30");
  const [error, setError] = useState<ErrorKey | null>(null);
  const [results, setResults] = useState<Orf[] | null>(null);
  const [scanned, setScanned] = useState(0);

  function run() {
    const sequence = sanitizeSequence(input);

    if (sequence.length === 0) {
      setError("empty");
      setResults(null);
      return;
    }
    if (!isValidDna(sequence)) {
      setError("invalid");
      setResults(null);
      return;
    }
    if (sequence.length < 6) {
      setError("tooShort");
      setResults(null);
      return;
    }
    if (sequence.length > MAX_ORF_INPUT) {
      setError("tooLong");
      setResults(null);
      return;
    }

    const parsed = Number.parseInt(minAaInput, 10);
    const minAa = Number.isFinite(parsed) && parsed > 0 ? parsed : 30;

    setError(null);
    setScanned(sequence.length);
    setResults(findOrfs(sequence, minAa));
  }

  function clear() {
    setInput("");
    setError(null);
    setResults(null);
    setScanned(0);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="orf-input">{t("inputLabel")}</Label>
        <Textarea
          id="orf-input"
          dir="ltr"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={t("inputPlaceholder")}
          className="min-h-32 font-mono text-sm"
          spellCheck={false}
        />
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <div className="space-y-2">
          <Label htmlFor="orf-min-length">{t("minLengthLabel")}</Label>
          <Input
            id="orf-min-length"
            type="number"
            min={1}
            max={1000}
            inputMode="numeric"
            value={minAaInput}
            onChange={(event) => setMinAaInput(event.target.value)}
            className="w-28"
          />
        </div>
        <div className="flex items-center gap-2 pb-0.5">
          <Button onClick={run}>{t("find")}</Button>
          <Button variant="outline" onClick={clear}>
            {t("clear")}
          </Button>
        </div>
      </div>
      <p className="-mt-3 text-xs text-muted-foreground">{t("minLengthHint")}</p>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>{t("errors.title")}</AlertTitle>
          <AlertDescription>{t(`errors.${error}`)}</AlertDescription>
        </Alert>
      )}

      {results && (
        <Card>
          <CardHeader className="gap-1">
            <CardTitle className="text-sm font-medium">
              {t("results.title")}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              {t("results.count", { count: results.length })} ·{" "}
              {t("results.scanned", { bases: scanned.toLocaleString() })}
            </p>
          </CardHeader>
          <CardContent>
            {results.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {t("results.none")}
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("results.strand")}</TableHead>
                      <TableHead>{t("results.frame")}</TableHead>
                      <TableHead>{t("results.position")}</TableHead>
                      <TableHead>{t("results.lengthAa")}</TableHead>
                      <TableHead>{t("results.protein")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((orf) => (
                      <TableRow
                        key={`${orf.strand}${orf.frame}-${orf.start}-${orf.end}`}
                      >
                        <TableCell className="font-mono">
                          {orf.strand}
                        </TableCell>
                        <TableCell className="font-mono">
                          {orf.strand === "+" ? "+" : "−"}
                          {orf.frame}
                        </TableCell>
                        <TableCell
                          className="whitespace-nowrap font-mono text-xs"
                          dir="ltr"
                        >
                          {orf.start}–{orf.end}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-xs">
                          {orf.lengthAa}
                          {!orf.hasStop && (
                            <span className="ms-1 text-muted-foreground">
                              {t("results.noStop")}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-start gap-2">
                            <span
                              className="line-clamp-2 max-w-[28rem] break-all font-mono text-[11px] leading-relaxed"
                              dir="ltr"
                            >
                              {orf.protein}
                            </span>
                            <CopyButton text={orf.protein} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <p className="rounded-lg border border-s-4 border-s-primary/50 bg-muted/40 p-4 text-sm leading-6 text-muted-foreground">
        {t("note")}
      </p>
    </div>
  );
}
