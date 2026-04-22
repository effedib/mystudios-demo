import type { UploadJob } from "@/lib/types";

export const uploadJobs: UploadJob[] = [
  {
    id: "j1",
    companyId: "c-alpha",
    companyName: "Azienda Alpha S.r.l.",
    fileName: "mastrini-m3-2025.csv",
    periodLabel: "Marzo 2025",
    centrotLabel: "Totale azienda",
    status: "ok",
    submittedAt: "2025-04-10T14:00:00.000Z",
  },
  {
    id: "j2",
    companyId: "c-beta",
    companyName: "Beta Consulting S.p.A.",
    fileName: "kpi-forecast-q2.xlsx",
    periodLabel: "Q2 2025",
    centrotLabel: "Sede + Progetti",
    status: "pending",
    submittedAt: "2025-04-20T11:20:00.000Z",
  },
  {
    id: "j3",
    companyId: "c-alpha",
    companyName: "Azienda Alpha S.r.l.",
    fileName: "upload-error-sample.csv",
    periodLabel: "Aprile 2025",
    centrotLabel: "Vendite",
    status: "error",
    submittedAt: "2025-04-21T09:00:00.000Z",
  },
];
