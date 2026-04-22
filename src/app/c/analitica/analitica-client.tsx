"use client";

import { useMemo, useState } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { dataApi, defaultPeriodId, periods } from "@/mocks/data";
import { centriByCompany } from "@/mocks/centri";
import { vociByCompany } from "@/mocks/conto";
import { formatEuro } from "@/lib/format";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const period2 = "p-2024-12";

export function AnaliticaClient() {
  const companyId = useAuthStore((s) => s.session?.companyId) ?? "";
  const [periodId, setPeriodId] = useState(defaultPeriodId);
  const [centro, setCentro] = useState("totale");
  const [tab, setTab] = useState<"single" | "compare">("single");

  const company = dataApi.company(companyId);
  const centri = centriByCompany(companyId);
  const voci = vociByCompany(companyId, periodId, centro);
  const vociPrev = tab === "compare" ? vociByCompany(companyId, period2, centro) : [];
  const vociMap = new Map(vociPrev.map((v) => [v.voce, v.importo]));

  const rows = useMemo(() => {
    return voci.map((r) => {
      const prev = vociMap.get(r.voce);
      const delta = prev != null && prev !== 0 ? ((r.importo - prev) / Math.abs(prev)) * 100 : null;
      return { ...r, prev, delta };
    });
  }, [voci, vociMap]);

  if (!company) return null;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="border-b border-border/80 bg-card px-6 py-4">
        <h1 className="text-2xl font-semibold">Conto economico riclassificato</h1>
        <p className="text-sm text-muted-foreground">{company.name}</p>
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Periodo</p>
            <Select value={periodId} onValueChange={(v) => v && setPeriodId(v)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {periods.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Centro</p>
            <Select value={centro} onValueChange={(v) => v && setCentro(v)}>
              <SelectTrigger className="w-[220px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="totale">Totale azienda</SelectItem>
                {centri.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.code} — {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>
      <div className="flex-1 space-y-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Vista analitica</CardTitle>
            <CardDescription>
              Struttura semplificata; i dati sono statici (demo) e variano in base
              a periodo e centro.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={tab} onValueChange={(v) => setTab(v as "single" | "compare")}>
              <TabsList>
                <TabsTrigger value="single">Sintetico</TabsTrigger>
                <TabsTrigger value="compare">Confronto (vs dic. 2024)</TabsTrigger>
              </TabsList>
              <TabsContent value="single" className="pt-4">
                <div className="overflow-hidden rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Voce</TableHead>
                        <TableHead className="w-20">Liv.</TableHead>
                        <TableHead className="text-right">Importo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rows.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={3} className="text-muted-foreground">
                            Nessuna voce per la combinazione scelta. Prova
                            Azienda Alpha / marzo 2025 / totale.
                          </TableCell>
                        </TableRow>
                      )}
                      {rows.map((r) => (
                        <TableRow key={r.id}>
                          <TableCell
                            className={r.livello === 1 ? "font-semibold" : "pl-4 text-sm"}
                          >
                            {r.voce}
                          </TableCell>
                          <TableCell>{r.livello}</TableCell>
                          <TableCell className="text-right font-mono text-sm">
                            {formatEuro(r.importo)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="compare" className="pt-4">
                <p className="mb-2 text-sm text-muted-foreground">
                  Confronto puroamente dimostrativo (periodo fissato a {period2} in mock).
                </p>
                <div className="overflow-hidden rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Voce</TableHead>
                        <TableHead className="text-right">Corrente</TableHead>
                        <TableHead className="text-right">Precedente</TableHead>
                        <TableHead className="text-right">Var %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rows.map((r) => (
                        <TableRow key={r.id}>
                          <TableCell className="font-medium">{r.voce}</TableCell>
                          <TableCell className="text-right font-mono text-sm">
                            {formatEuro(r.importo)}
                          </TableCell>
                          <TableCell className="text-right font-mono text-sm text-muted-foreground">
                            {r.prev != null ? formatEuro(r.prev) : "—"}
                          </TableCell>
                          <TableCell className="text-right text-sm">
                            {r.delta == null
                              ? "—"
                              : `${r.delta > 0 ? "+" : ""}${r.delta.toFixed(1).replace(".", ",")}%`}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
