import { companies, getCompany } from "./companies";
import { centriByCompany } from "./centri";
import { getKpi, getPreviousPeriod, kpiForCompany } from "./kpi";
import { defaultPeriodId, periods } from "./periods";
import { vociByCompany } from "./conto";
import { documentiByCompany } from "./documents";
import { scadenzeByCompany } from "./deadlines";
import { uploadJobs } from "./uploads";
import { users } from "./users";
import type { KpiRow } from "@/lib/types";

export { defaultPeriodId, periods };

const periodOrder: Record<string, number> = {
  "p-2024-12": 1,
  "p-2025-01": 2,
  "p-2025-02": 3,
  "p-2025-03": 4,
};

export function trendMensile(companyId: string): { label: string; ricavi: number; ebitda: number }[] {
  return kpiForCompany(companyId)
    .filter((k) => Boolean(periodOrder[k.periodId]))
    .sort((a, b) => (periodOrder[a.periodId] ?? 0) - (periodOrder[b.periodId] ?? 0))
    .map((k) => {
      const p = periods.find((x) => x.id === k.periodId);
      return {
        label: p?.label ?? k.periodId,
        ricavi: k.ricavi,
        ebitda: k.ebitda,
      };
    });
}

export function deltaKpi(companyId: string, periodId: string, field: keyof KpiRow) {
  const cur = getKpi(companyId, periodId);
  const prevId = getPreviousPeriod(periodId);
  const prev = prevId ? getKpi(companyId, prevId) : undefined;
  if (!cur) return { current: 0, prev: 0, pct: null };
  const curVal = cur[field];
  const prevVal = prev?.[field];
  const a =
    typeof curVal === "number"
      ? curVal
      : typeof curVal === "undefined"
        ? NaN
        : Number(curVal);
  if (Number.isNaN(a)) return { current: 0, prev: 0, pct: null };
  const b =
    typeof prevVal === "number"
      ? prevVal
      : typeof prevVal === "undefined" || prevVal === null
        ? null
        : Number(prevVal);
  if (b === null || b === 0) return { current: a, prev: b ?? 0, pct: null };
  return { current: a, prev: b, pct: ((a - b) / Math.abs(b)) * 100 };
}

export const dataApi = {
  company: getCompany,
  centri: centriByCompany,
  kpi: getKpi,
  previousPeriod: getPreviousPeriod,
  voci: vociByCompany,
  documenti: documentiByCompany,
  scadenze: scadenzeByCompany,
  uploads: () => [...uploadJobs],
  companies: () => [...companies],
  users: () => [...users],
  kpiList: kpiForCompany,
  trendMensile,
  deltaKpi,
};
