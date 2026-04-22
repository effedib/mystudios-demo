import type { FiscalDeadline } from "@/lib/types";

export const scadenze: FiscalDeadline[] = [
  { id: "s1", companyId: "c-alpha", title: "Liquidazione IVA mensile", date: "2025-04-16", type: "iva" },
  { id: "s2", companyId: "c-alpha", title: "Ritenute su redditi lavoro auton.", date: "2025-04-16", type: "dichiarazione" },
  { id: "s3", companyId: "c-alpha", title: "Acconto IRAP", date: "2025-06-16", type: "irap" },
  { id: "s4", companyId: "c-alpha", title: "Deposito bilancio in Camera di Commercio", date: "2025-05-30", type: "bilancio" },
  { id: "s5", companyId: "c-beta", title: "Liquidazione IVA trimestrale", date: "2025-04-16", type: "iva" },
  { id: "s6", companyId: "c-beta", title: "Modello Redditi (scadenze collegate - demo)", date: "2025-11-30", type: "dichiarazione" },
];

export function scadenzeByCompany(companyId: string): FiscalDeadline[] {
  return scadenze
    .filter((s) => s.companyId === companyId)
    .sort((a, b) => a.date.localeCompare(b.date));
}
