"use client";

import { useMemo, useState } from "react";
import { parseISO, format } from "date-fns";
import { it } from "date-fns/locale";
import { useAuthStore } from "@/stores/auth-store";
import { dataApi } from "@/mocks/data";
import { buildIcsCalendar } from "@/lib/ics";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarPlus } from "lucide-react";

export function ScadenzeClient() {
  const companyId = useAuthStore((s) => s.session?.companyId) ?? "";
  const company = dataApi.company(companyId);
  const list = dataApi.scadenze(companyId);
  const dates = useMemo(() => list.map((s) => parseISO(s.date)), [list]);
  const [month, setMonth] = useState(() => new Date());

  function downloadIcs() {
    if (!company) return;
    const text = buildIcsCalendar(`Scadenze — ${company.name}`, list);
    const blob = new Blob([text], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `scadenze-${company.id}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!company) return null;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="border-b border-border/80 bg-card px-6 py-4">
        <h1 className="text-2xl font-semibold">Scadenze fiscali</h1>
        <p className="text-sm text-muted-foreground">
          Calendario dimostrativo; in futuro potrai sottoscrivere queste scadenze nel
          tuo calendario (Google, Outlook, Apple).
        </p>
        <div className="mt-3">
          <Button type="button" size="sm" variant="secondary" onClick={downloadIcs}>
            <CalendarPlus className="mr-2 size-4" />
            Scarica .ics (demo)
          </Button>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-6 p-6 lg:flex-row">
        <Card className="w-full max-w-md shrink-0">
          <CardHeader>
            <CardTitle>Calendario</CardTitle>
            <CardDescription>
              Le date evidenziate contengono almeno una scadenza per {company.name}.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              locale={it}
              month={month}
              onMonthChange={setMonth}
              modifiers={{ scadenza: dates }}
              modifiersClassNames={{
                scadenza:
                  "relative after:absolute after:bottom-1 after:left-1/2 after:size-1.5 after:-translate-x-1/2 after:rounded-full after:bg-primary",
              }}
            />
          </CardContent>
        </Card>
        <Card className="min-w-0 flex-1">
          <CardHeader>
            <CardTitle>Elenco</CardTitle>
            <CardDescription>Prossime attività e adempimenti (dati mock).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {list.map((s) => (
              <div
                key={s.id}
                className="flex flex-col gap-1 rounded-lg border border-border/80 p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">{s.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(parseISO(s.date), "d MMMM yyyy", { locale: it })}
                  </p>
                  {s.description && (
                    <p className="text-xs text-muted-foreground">{s.description}</p>
                  )}
                </div>
                <Badge variant="outline" className="w-fit capitalize">
                  {s.type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
