"use client";

import { useState } from "react";
import { dataApi } from "@/mocks/data";
import type { UploadJob } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusClass: Record<UploadJob["status"], "default" | "secondary" | "destructive"> = {
  ok: "default",
  pending: "secondary",
  error: "destructive",
};

const statusLabel: Record<UploadJob["status"], string> = {
  ok: "Completato",
  pending: "In elaborazione",
  error: "Errore",
};

export function CaricamentiClient() {
  const [jobs, setJobs] = useState<UploadJob[]>(() => dataApi.uploads());

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const id = `j-${Date.now()}`;
    const next: UploadJob = {
      id,
      companyId: "c-alpha",
      companyName: "Azienda Alpha S.r.l.",
      fileName: f.name,
      periodLabel: "Personalizzato (demo)",
      centrotLabel: "Non specificato",
      status: "pending",
      submittedAt: new Date().toISOString(),
    };
    setJobs((j) => [next, ...j]);
    window.setTimeout(() => {
      setJobs((j) =>
        j.map((x) =>
          x.id === id ? { ...x, status: "ok" as const } : x
        )
      );
    }, 800);
    e.target.value = "";
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Caricamento dati</h1>
        <p className="text-sm text-muted-foreground">
          Simulazione: il file resta in locale, viene solo mostrata una riga in tabella. In
          produzione: Excel/CSV, associazione periodo e centro, validazione lato server.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Nuovo upload</CardTitle>
          <CardDescription>
            Seleziona un file: dopo circa un secondo lo stato passa a &quot;Completato&quot; (mock).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="f">File (CSV / XLSX)</Label>
            <div className="flex flex-wrap items-center gap-2">
              <Input id="f" type="file" accept=".csv,.xlsx,.xls" onChange={onFile} className="max-w-md" />
              <span className="text-xs text-muted-foreground">Max dimensione: illimitata (demo)</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Monitoraggio caricamenti</CardTitle>
          <CardDescription>Storico (sessione) + esempi predefiniti.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File</TableHead>
                  <TableHead>Azienda</TableHead>
                  <TableHead>Periodo / centro</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead>Inviato</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((j) => (
                  <TableRow key={j.id}>
                    <TableCell className="font-mono text-sm">{j.fileName}</TableCell>
                    <TableCell>{j.companyName}</TableCell>
                    <TableCell className="text-sm">
                      {j.periodLabel} · {j.centrotLabel}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusClass[j.status]}>{statusLabel[j.status]}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(j.submittedAt).toLocaleString("it-IT")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
