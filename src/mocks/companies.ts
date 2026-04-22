import type { Company } from "@/lib/types";

export const companies: Company[] = [
  {
    id: "c-alpha",
    name: "Azienda Alpha S.r.l.",
    vat: "IT01234567890",
    lastUpdate: "2025-03-28T10:00:00.000Z",
  },
  {
    id: "c-beta",
    name: "Beta Consulting S.p.A.",
    vat: "IT09876543210",
    lastUpdate: "2025-04-10T15:30:00.000Z",
  },
];

export function getCompany(id: string): Company | undefined {
  return companies.find((c) => c.id === id);
}
