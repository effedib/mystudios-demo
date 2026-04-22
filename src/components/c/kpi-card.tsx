"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDeltaPct } from "@/lib/format";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";

type Props = {
  title: string;
  value: string;
  deltaPct: number | null;
  hint?: string;
};

export function KpiCard({ title, value, deltaPct, hint }: Props) {
  const up = deltaPct !== null && deltaPct > 0;
  const down = deltaPct !== null && deltaPct < 0;
  return (
    <Card className="border-border/80">
      <CardHeader className="space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          {up && <TrendingUp className="size-3.5 text-emerald-600" aria-hidden />}
          {down && <TrendingDown className="size-3.5 text-red-600" aria-hidden />}
          <span
            className={cn(
              up && "text-emerald-700",
              down && "text-red-700",
              !up && !down && "text-muted-foreground"
            )}
          >
            vs periodo prec.: {formatDeltaPct(deltaPct)}
          </span>
        </div>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  );
}
