import type { CentroImputazione } from "@/lib/types";

export const centri: CentroImputazione[] = [
  { id: "ce-alpha-1", companyId: "c-alpha", code: "ADM", name: "Amministrazione" },
  { id: "ce-alpha-2", companyId: "c-alpha", code: "VND", name: "Vendite" },
  { id: "ce-alpha-3", companyId: "c-alpha", code: "OPR", name: "Operatività" },
  { id: "ce-beta-1", companyId: "c-beta", code: "HQ", name: "Sede" },
  { id: "ce-beta-2", companyId: "c-beta", code: "PRJ", name: "Progetti" },
];

export function centriByCompany(companyId: string): CentroImputazione[] {
  return centri.filter((c) => c.companyId === companyId);
}
