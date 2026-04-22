"use client";

import { useMemo, useState } from "react";
import { KpiCard } from "@/components/c/kpi-card";
import { TrendCharts } from "@/components/c/trend-charts";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthStore } from "@/stores/auth-store";
import { dataApi, defaultPeriodId, periods } from "@/mocks/data";
import { centriByCompany } from "@/mocks/centri";
import { centroRicaviShare } from "@/mocks/centro-breakdown";
import { formatEuro, formatPercent } from "@/lib/format";
import { Download, FileDown } from "lucide-react";
import type { KpiRow } from "@/lib/types";

const kpiOrder: (keyof KpiRow)[] = [
  "ricavi",
  "valoreAggiunto",
  "ebitda",
  "ebit",
  "ebt",
  "utile",
  "ebitdaMargin",
  "ebitMargin",
  "personaleSuRicavi",
  "materieSuRicavi",
];

const labels: Partial<Record<keyof KpiRow, string>> = {
  ricavi: "Ricavi",
  valoreAggiunto: "Valore aggiunto",
  ebitda: "EBITDA",
  ebit: "EBIT",
  utile: "Utile (netto)",
  ebt: "EBT (anticipato)",
  ebitdaMargin: "Margine EBITDA %",
  ebitMargin: "Margine EBIT %",
  personaleSuRicavi: "Costo del personale / ricavi",
  materieSuRicavi: "Materie e merci / ricavi",
};

function formatKpiValue(key: keyof KpiRow, v: number): string {
  if (key === "ebitdaMargin" || key === "ebitMargin" || key === "personaleSuRicavi" || key === "materieSuRicavi") {
    return formatPercent(v);
  }
  return formatEuro(v);
}

function shouldShowKpi(key: keyof KpiRow, k: KpiRow): boolean {
  if (key === "ebt") return k.ebt != null;
  return true;
}

export function DashboardClient() {
  const companyId = useAuthStore((s) => s.session?.companyId);
  const [periodId, setPeriodId] = useState(defaultPeriodId);
  const [centro, setCentro] = useState<string>("totale");

  const company = companyId ? dataApi.company(companyId) : undefined;
  const kpi = companyId ? dataApi.kpi(companyId, periodId) : undefined;
  const pLabel = periods.find((p) => p.id === periodId)?.label ?? periodId;
  const trend = companyId ? dataApi.trendMensile(companyId) : [];
  const centri = companyId ? centriByCompany(companyId) : [];
  const shares = companyId ? centroRicaviShare[companyId] : undefined;

  const rows = useMemo(() => {
    if (!companyId || !kpi) return [];
    if (centro === "totale") {
      if (!shares) return [];
      return shares.map((s) => {
        const c = centri.find((x) => x.id === s.centroId);
        return {
          id: s.centroId,
          name: c ? `${c.code} — ${c.name}` : s.centroId,
          ricavi: kpi.ricavi * s.share,
          ebitda: kpi.ebitda * s.share * 0.95,
        };
      });
    }
    const sh = shares?.find((x) => x.centroId === centro)?.share ?? 1;
    const c = centri.find((x) => x.id === centro);
    return c
      ? [
          {
            id: c.id,
            name: `${c.code} — ${c.name}`,
            ricavi: kpi.ricavi * sh,
            ebitda: kpi.ebitda * sh * 0.95,
          },
        ]
      : [];
  }, [companyId, kpi, centro, shares, centri]);

  if (!companyId || !company) {
    return <p className="p-6 text-sm text-muted-foreground">Nessun profilo azienda.</p>;
  }

  if (!kpi) {
    return <p className="p-6 text-sm">Nessun dato per il periodo selezionato.</p>;
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="border-b border-border/80 bg-card px-6 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{company.name}</h1>
            <p className="text-sm text-muted-foreground">
              Ultimo aggiornamento dati:{" "}
              {new Date(company.lastUpdate).toLocaleString("it-IT", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Periodo</p>
              <Select value={periodId} onValueChange={(v) => v && setPeriodId(v)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {periods.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Centro di imputazione</p>
              <Select value={centro} onValueChange={(v) => v && setCentro(v)}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="totale">Totale azienda</SelectItem>
                  {centri.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.code} — {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="/mocks/report-sintesi.pdf"
                download
                className={cn(buttonVariants({ size: "sm", variant: "secondary" }))}
              >
                <FileDown className="mr-1.5 size-4" />
                PDF riepilogo
              </a>
              <a
                href="/mocks/verifica-2025-03.csv"
                download
                className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
              >
                <Download className="mr-1.5 size-4" />
                Excel analitico
              </a>
            </div>
          </div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Vista economica: <strong className="text-foreground">{pLabel}</strong>
          {centro !== "totale" && (
            <span> — dettaglio centro (distribuzioni interne, demo)</span>
          )}
        </p>
      </header>

      <div className="flex-1 space-y-6 p-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {kpiOrder
            .filter((key) => labels[key] && shouldShowKpi(key, kpi))
            .map((key) => {
              const d = dataApi.deltaKpi(companyId, periodId, key);
              const val = d.current;
              return (
                <KpiCard
                  key={key}
                  title={labels[key]!}
                  value={formatKpiValue(key, val as number)}
                  deltaPct={d.pct}
                />
              );
            })}
        </div>

        <TrendCharts data={trend} periodLabel={pLabel} />

        <div className="space-y-2">
          <h2 className="text-lg font-medium">Ripartizione su centri (stima, demo)</h2>
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Centro</TableHead>
                  <TableHead className="text-right">Ricavi allocati</TableHead>
                  <TableHead className="text-right">EBITDA allocato</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-muted-foreground">
                      Seleziona un periodo con dati.
                    </TableCell>
                  </TableRow>
                )}
                {rows.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatEuro(r.ricavi)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatEuro(r.ebitda)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-muted-foreground">
            Queste ripartizioni sono simulacri per la demo; in produzione verranno da contabilità
            analitica.
          </p>
        </div>
      </div>
    </div>
  );
}
