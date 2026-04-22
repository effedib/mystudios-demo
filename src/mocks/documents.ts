import type { DocumentItem } from "@/lib/types";

export const documenti: DocumentItem[] = [
  {
    id: "d1",
    companyId: "c-alpha",
    title: "Bilancio d'esame UE 2024",
    kind: "contabile",
    periodLabel: "Esercizio 2024",
    uploadedAt: "2025-04-01",
    fileName: "bilancio-ue-2024.pdf",
    publicPath: "/mocks/bilancio-ue-2024.pdf",
  },
  {
    id: "d2",
    companyId: "c-alpha",
    title: "Bilancio di verifica (marzo 2025)",
    kind: "contabile",
    periodLabel: "Marzo 2025",
    uploadedAt: "2025-04-05",
    fileName: "verifica-2025-03.xlsx",
    publicPath: "/mocks/verifica-2025-03.csv",
  },
  {
    id: "d3",
    companyId: "c-alpha",
    title: "Report gestionale - sintesi",
    kind: "contabile",
    periodLabel: "Q1 2025",
    uploadedAt: "2025-04-08",
    fileName: "report-sintesi.pdf",
    publicPath: "/mocks/report-sintesi.pdf",
  },
  {
    id: "d4",
    companyId: "c-alpha",
    title: "Busta paga - marzo 2025",
    kind: "hr",
    periodLabel: "Marzo 2025",
    uploadedAt: "2025-04-02",
    fileName: "busta-2025-03.pdf",
    publicPath: "/mocks/busta-2025-03.pdf",
  },
  {
    id: "d5",
    companyId: "c-beta",
    title: "Bilancio d'esame UE 2024",
    kind: "contabile",
    periodLabel: "Esercizio 2024",
    uploadedAt: "2025-04-12",
    fileName: "beta-bilancio-ue-2024.pdf",
    publicPath: "/mocks/bilancio-ue-2024.pdf",
  },
  {
    id: "d6",
    companyId: "c-beta",
    title: "Rilevazione presenze e Unilav (demo)",
    kind: "hr",
    periodLabel: "Marzo 2025",
    uploadedAt: "2025-04-09",
    fileName: "unilav-mock.pdf",
    publicPath: "/mocks/busta-2025-03.pdf",
  },
];

export function documentiByCompany(companyId: string): DocumentItem[] {
  return documenti.filter((d) => d.companyId === companyId);
}
