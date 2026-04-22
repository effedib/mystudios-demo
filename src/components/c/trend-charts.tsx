"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatEuro } from "@/lib/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Row = { label: string; ricavi: number; ebitda: number };

function fmtAxis(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".", ",")}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
  return String(n);
}

type Props = { data: Row[]; periodLabel: string };

export function TrendCharts({ data, periodLabel }: Props) {
  return (
    <Card className="border-border/80">
      <CardHeader>
        <CardTitle className="text-base">Andamento (serie mensile, demo)</CardTitle>
        <p className="text-sm text-muted-foreground">
          Periodo in evidenza: {periodLabel}
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="trend" className="w-full">
          <TabsList>
            <TabsTrigger value="trend">Trend ricavi / EBITDA</TabsTrigger>
            <TabsTrigger value="bar">Confronto barre (ultime voci)</TabsTrigger>
          </TabsList>
          <TabsContent value="trend" className="pt-4">
            <div className="h-[300px] w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="label" fontSize={11} tickMargin={6} />
                  <YAxis tickFormatter={fmtAxis} width={40} fontSize={11} />
                  <Tooltip
                    formatter={(v, name) => {
                      const n = typeof v === "number" ? v : Number(v);
                      const label = name === "ricavi" ? "Ricavi" : "EBITDA";
                      return [formatEuro(Number.isFinite(n) ? n : 0), label];
                    }}
                    labelClassName="text-foreground"
                    contentStyle={{ borderRadius: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="ricavi"
                    stroke="hsl(222 50% 45%)"
                    name="Ricavi"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="ebitda"
                    stroke="hsl(43 70% 45%)"
                    name="EBITDA"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="bar" className="pt-4">
            <div className="h-[300px] w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="label" fontSize={11} />
                  <YAxis tickFormatter={fmtAxis} width={40} fontSize={11} />
                  <Tooltip
                    formatter={(v) => {
                      const n = typeof v === "number" ? v : Number(v);
                      return formatEuro(Number.isFinite(n) ? n : 0);
                    }}
                  />
                  <Bar dataKey="ricavi" fill="hsl(222 50% 45%)" name="Ricavi" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="ebitda" fill="hsl(43 70% 45%)" name="EBITDA" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
