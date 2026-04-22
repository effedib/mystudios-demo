"use client";

import { useMemo, useState } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { dataApi } from "@/mocks/data";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Download, Search } from "lucide-react";
import type { DocumentKind } from "@/lib/types";

const kindAll = "tutti" as const;
type FilterKind = typeof kindAll | DocumentKind;

export function DocumentiClient() {
  const companyId = useAuthStore((s) => s.session?.companyId) ?? "";
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<FilterKind>(kindAll);

  const items = useMemo(() => {
    return dataApi
      .documenti(companyId)
      .filter((d) => (kind === kindAll ? true : d.kind === kind))
      .filter(
        (d) =>
          q.trim() === "" ||
          d.title.toLowerCase().includes(q.toLowerCase()) ||
          d.periodLabel.toLowerCase().includes(q.toLowerCase())
      )
      .sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
  }, [companyId, kind, q]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="border-b border-border/80 bg-card px-6 py-4">
        <h1 className="text-2xl font-semibold">Archivio documenti</h1>
        <p className="text-sm text-muted-foreground">
          Contabili (bilanci, report) e HR (buste paga, contratti — in demo: file
          fittizi).
        </p>
        <div className="mt-4 flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              className="pl-8"
              placeholder="Cerca per titolo o periodo…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <Select
            value={kind}
            onValueChange={(v) => v && setKind(v as FilterKind)}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={kindAll}>Tutte le tipologie</SelectItem>
              <SelectItem value="contabile">Contabile</SelectItem>
              <SelectItem value="hr">HR / personale</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>
      <div className="flex-1 p-6">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Documento</TableHead>
                <TableHead>Periodo</TableHead>
                <TableHead>Tipologia</TableHead>
                <TableHead>Caricato il</TableHead>
                <TableHead className="w-[120px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Nessun documento con questi filtri.
                  </TableCell>
                </TableRow>
              )}
              {items.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">{d.title}</TableCell>
                  <TableCell className="text-sm">{d.periodLabel}</TableCell>
                  <TableCell>
                    <Badge variant={d.kind === "contabile" ? "secondary" : "outline"}>
                      {d.kind === "contabile" ? "Contabile" : "HR"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(d.uploadedAt).toLocaleDateString("it-IT")}
                  </TableCell>
                  <TableCell>
                    <a
                      href={d.publicPath}
                      download={d.fileName}
                      className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
                    >
                      <Download className="mr-1 size-4" />
                      Scarica
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
