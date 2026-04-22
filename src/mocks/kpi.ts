import type { KpiRow } from "@/lib/types";

const rows: KpiRow[] = [
  // Azienda Alpha
  { companyId: "c-alpha", periodId: "p-2024-12", ricavi: 420_000, valoreAggiunto: 210_000, ebitda: 95_000, ebit: 72_000, ebt: 68_000, utile: 52_000, ebitdaMargin: 22.6, ebitMargin: 17.1, personaleSuRicavi: 28, materieSuRicavi: 32 },
  { companyId: "c-alpha", periodId: "p-2025-01", ricavi: 380_000, valoreAggiunto: 198_000, ebitda: 88_000, ebit: 65_000, ebt: 62_000, utile: 48_000, ebitdaMargin: 23.1, ebitMargin: 17.1, personaleSuRicavi: 29, materieSuRicavi: 30 },
  { companyId: "c-alpha", periodId: "p-2025-02", ricavi: 450_000, valoreAggiunto: 225_000, ebitda: 102_000, ebit: 78_000, ebt: 75_000, utile: 57_000, ebitdaMargin: 22.6, ebitMargin: 17.3, personaleSuRicavi: 27, materieSuRicavi: 33 },
  { companyId: "c-alpha", periodId: "p-2025-03", ricavi: 510_000, valoreAggiunto: 252_000, ebitda: 118_000, ebit: 91_000, ebt: 87_000, utile: 64_000, ebitdaMargin: 23.1, ebitMargin: 17.8, personaleSuRicavi: 26, materieSuRicavi: 32 },
  { companyId: "c-alpha", periodId: "p-2024", ricavi: 4_200_000, valoreAggiunto: 2_080_000, ebitda: 960_000, ebit: 720_000, ebt: 700_000, utile: 520_000, ebitdaMargin: 22.8, ebitMargin: 17.1, personaleSuRicavi: 28, materieSuRicavi: 31 },
  // Azienda Beta
  { companyId: "c-beta", periodId: "p-2024-12", ricavi: 1_200_000, valoreAggiunto: 580_000, ebitda: 210_000, ebit: 165_000, ebt: 158_000, utile: 120_000, ebitdaMargin: 17.5, ebitMargin: 13.8, personaleSuRicavi: 35, materieSuRicavi: 18 },
  { companyId: "c-beta", periodId: "p-2025-01", ricavi: 1_100_000, valoreAggiunto: 540_000, ebitda: 195_000, ebit: 150_000, ebt: 145_000, utile: 110_000, ebitdaMargin: 17.7, ebitMargin: 13.6, personaleSuRicavi: 36, materieSuRicavi: 19 },
  { companyId: "c-beta", periodId: "p-2025-02", ricavi: 1_180_000, valoreAggiunto: 575_000, ebitda: 208_000, ebit: 162_000, ebt: 155_000, utile: 115_000, ebitdaMargin: 17.6, ebitMargin: 13.7, personaleSuRicavi: 35, materieSuRicavi: 18 },
  { companyId: "c-beta", periodId: "p-2025-03", ricavi: 1_250_000, valoreAggiunto: 610_000, ebitda: 220_000, ebit: 175_000, ebt: 168_000, utile: 128_000, ebitdaMargin: 17.6, ebitMargin: 14, personaleSuRicavi: 34, materieSuRicavi: 18 },
  { companyId: "c-beta", periodId: "p-2024", ricavi: 13_200_000, valoreAggiunto: 6_400_000, ebitda: 2_300_000, ebit: 1_800_000, ebt: 1_750_000, utile: 1_300_000, ebitdaMargin: 17.4, ebitMargin: 13.6, personaleSuRicavi: 35, materieSuRicavi: 19 },
];

export function getKpi(companyId: string, periodId: string): KpiRow | undefined {
  return rows.find((r) => r.companyId === companyId && r.periodId === periodId);
}

export function kpiForCompany(companyId: string): KpiRow[] {
  return rows.filter((r) => r.companyId === companyId);
}

/** Periodo precedente per delta (semplificato: mappa fissa per i periodi mensili demo). */
export function getPreviousPeriod(periodId: string): string | undefined {
  const map: Record<string, string> = {
    "p-2025-03": "p-2025-02",
    "p-2025-02": "p-2025-01",
    "p-2025-01": "p-2024-12",
    "p-2024-12": "p-2024-11",
  };
  if (map[periodId]) return map[periodId];
  if (periodId === "p-2024-q4") return "p-2024-q3";
  if (periodId === "p-2024") return undefined;
  return undefined;
}