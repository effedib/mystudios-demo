import { dataApi } from "@/mocks/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, CheckCircle, Upload, Users } from "lucide-react";

export default function StudioHomePage() {
  const companies = dataApi.companies();
  const users = dataApi.users();
  const uploads = dataApi.uploads();
  const ok = uploads.filter((u) => u.status === "ok").length;
  const err = uploads.filter((u) => u.status === "error").length;
  const pend = uploads.filter((u) => u.status === "pending").length;

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Pannello Studio</h1>
        <p className="text-sm text-muted-foreground">
          Riepilogo sintetico su clienti, utenti e caricamenti (dati finti per la
          dimostrazione).
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aziende</CardTitle>
            <Building2 className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{companies.length}</p>
            <p className="text-xs text-muted-foreground">in anagrafica demo</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utenti</CardTitle>
            <Users className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{users.length}</p>
            <p className="text-xs text-muted-foreground">account mock</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Caricamenti</CardTitle>
            <Upload className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{uploads.length}</p>
            <p className="text-xs text-muted-foreground">job registrati (demo)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stato lavorazione</CardTitle>
            <CheckCircle className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              <span className="font-semibold text-emerald-600">{ok}</span> completati,{" "}
              <span className="text-amber-600">{pend}</span> in coda,{" "}
              <span className="text-red-600">{err}</span> in errore
            </p>
            <p className="text-xs text-muted-foreground">KPI su mock statici</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
