import { dataApi } from "@/mocks/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function StudioClientiPage() {
  const companies = dataApi.companies();
  const users = dataApi.users();

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Clienti e utenti</h1>
        <p className="text-sm text-muted-foreground">
          Anagrafica di esempio; in produzione l&apos;inserimento è riservato agli
          amministratori.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Aziende</CardTitle>
          <CardDescription>Elenco clienti (mock).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ragione sociale</TableHead>
                  <TableHead>P.IVA</TableHead>
                  <TableHead>Ultimo aggiornamento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell className="font-mono text-sm">{c.vat}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(c.lastUpdate).toLocaleString("it-IT")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Account utenti</CardTitle>
          <CardDescription>
            Ruoli: cliente portale, operatore studio. Password demo:{" "}
            <code className="rounded bg-muted px-1">demo</code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Ruolo</TableHead>
                  <TableHead>Azienda</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-mono text-sm">{u.email}</TableCell>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>
                      <Badge variant={u.role === "studio" ? "default" : "secondary"}>
                        {u.role === "studio" ? "Operatore / Studio" : "Cliente"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {u.companyId
                        ? companies.find((c) => c.id === u.companyId)?.name ?? "—"
                        : "—"}
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
