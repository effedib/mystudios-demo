const it = "it-IT";

export function formatEuro(n: number): string {
  return new Intl.NumberFormat(it, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(
    n
  );
}

export function formatPercent(n: number, digits = 1): string {
  return `${n.toFixed(digits).replace(".", ",")}%`;
}

export function formatDeltaPct(pct: number | null): string {
  if (pct === null) return "—";
  const sign = pct > 0 ? "+" : "";
  return `${sign}${pct.toFixed(1).replace(".", ",")}%`;
}
