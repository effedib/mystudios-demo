import type { ContoVoce } from "@/lib/types";

export const vociConto: ContoVoce[] = [
  // TOTALE azienda alpha marzo 25
  { id: "v1", companyId: "c-alpha", periodId: "p-2025-03", centrotId: "totale", voce: "Ricavi delle vendite", importo: 510_000, livello: 1 },
  { id: "v2", companyId: "c-alpha", periodId: "p-2025-03", centrotId: "totale", voce: "Costo del venduto", importo: -210_000, livello: 2 },
  { id: "v3", companyId: "c-alpha", periodId: "p-2025-03", centrotId: "totale", voce: "Valore aggiunto", importo: 300_000, livello: 1 },
  { id: "v4", companyId: "c-alpha", periodId: "p-2025-03", centrotId: "totale", voce: "Personale", importo: -130_000, livello: 2 },
  { id: "v5", companyId: "c-alpha", periodId: "p-2025-03", centrotId: "totale", voce: "EBITDA", importo: 118_000, livello: 1 },
  { id: "v6", companyId: "c-alpha", periodId: "p-2025-03", centrotId: "totale", voce: "Ammortamenti", importo: -18_000, livello: 2 },
  { id: "v7", companyId: "c-alpha", periodId: "p-2025-03", centrotId: "totale", voce: "EBIT", importo: 91_000, livello: 1 },
  { id: "v8", companyId: "c-alpha", periodId: "p-2025-03", centrotId: "ce-alpha-2", voce: "Ricavi vendite", importo: 300_000, livello: 1 },
  { id: "v9", companyId: "c-alpha", periodId: "p-2025-03", centrotId: "ce-alpha-2", voce: "Costi comm.", importo: -80_000, livello: 2 },
  { id: "v10", companyId: "c-alpha", periodId: "p-2025-03", centrotId: "ce-alpha-1", voce: "Costi amministrativi", importo: -45_000, livello: 1 },
  // beta marzo
  { id: "b1", companyId: "c-beta", periodId: "p-2025-03", centrotId: "totale", voce: "Ricavi delle vendite", importo: 1_250_000, livello: 1 },
  { id: "b2", companyId: "c-beta", periodId: "p-2025-03", centrotId: "totale", voce: "Rimanenze iniz./fin.", importo: -12_000, livello: 2 },
  { id: "b3", companyId: "c-beta", periodId: "p-2025-03", centrotId: "totale", voce: "Valore aggiunto", importo: 610_000, livello: 1 },
  { id: "b4", companyId: "c-beta", periodId: "p-2025-03", centrotId: "totale", voce: "EBITDA", importo: 220_000, livello: 1 },
  { id: "b5", companyId: "c-beta", periodId: "p-2025-03", centrotId: "totale", voce: "EBIT", importo: 175_000, livello: 1 },
];

export function vociByCompany(
  companyId: string,
  periodId: string,
  centrotId: string
): ContoVoce[] {
  return vociConto.filter(
    (v) => v.companyId === companyId && v.periodId === periodId && v.centrotId === centrotId
  );
}
