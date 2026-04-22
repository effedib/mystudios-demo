"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/auth-store";

const presets = [
  { label: "Cliente — Azienda Alpha", email: "cliente.alpha@demo.it", password: "demo" },
  { label: "Cliente — Azienda Beta", email: "cliente.beta@demo.it", password: "demo" },
  { label: "Operatore / Backoffice", email: "studio@demo.it", password: "demo" },
] as const;

export function LoginForm() {
  const router = useRouter();
  const next = useSearchParams().get("next") || "";
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  function goAfter() {
    const s = useAuthStore.getState().session;
    if (!s) return; // after login, session is set
    if (s.role === "client") {
      router.push(next && next.startsWith("/c") ? next : "/c/dashboard");
    } else {
      router.push(next && next.startsWith("/studio") ? next : "/studio");
    }
    router.refresh();
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const ok = login(email, password);
    if (!ok) setErr("Email o password non riconosciute (demo).");
    else goAfter();
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/80 bg-card shadow-md">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center">
            <Image
              src="/brand/logo-ms.png"
              alt="My Studio MS"
              width={3330}
              height={1259}
              className="h-16 w-auto max-w-[min(100%,18rem)] object-contain sm:h-[4.5rem]"
              priority
            />
          </div>
          <div className="space-y-1.5">
            <CardTitle className="text-2xl">My Studio MS</CardTitle>
            <CardDescription>
              Accesso demo: dati fittizi, solo per presentare l&apos;esperienza del
              portale.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@esempio.it"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pass">Password</Label>
              <Input
                id="pass"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {err && <p className="text-sm text-destructive">{err}</p>}
            <Button type="submit" className="w-full">
              Accedi
            </Button>
          </form>
          <div className="mt-6 space-y-2">
            <p className="text-xs text-muted-foreground">Accesso rapido (demo)</p>
            {presets.map((p) => (
              <Button
                key={p.email}
                type="button"
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => {
                  setErr(null);
                  if (login(p.email, p.password)) goAfter();
                }}
              >
                {p.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
