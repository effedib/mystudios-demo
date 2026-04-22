import type { Period } from "@/lib/types";

export const periods: Period[] = [
  { id: "p-2024-12", label: "Dicembre 2024", year: 2024, month: 12 },
  { id: "p-2025-01", label: "Gennaio 2025", year: 2025, month: 1 },
  { id: "p-2025-02", label: "Febbraio 2025", year: 2025, month: 2 },
  { id: "p-2025-03", label: "Marzo 2025", year: 2025, month: 3 },
  { id: "p-2024-q4", label: "Q4 2024", year: 2024, quarter: 4 },
  { id: "p-2024", label: "Esercizio 2024", year: 2024 },
];

export const defaultPeriodId = "p-2025-03";
