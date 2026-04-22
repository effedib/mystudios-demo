"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { dataApi } from "@/mocks/data";
import { Building2, FileBarChart, FileText, LayoutDashboard, CalendarDays } from "lucide-react";

const links = [
  { href: "/c/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/c/analitica", label: "Conto economico", icon: FileBarChart },
  { href: "/c/documenti", label: "Documenti", icon: FileText },
  { href: "/c/scadenze", label: "Scadenze", icon: CalendarDays },
] as const;

export function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const session = useAuthStore((s) => s.session);
  const company = session?.companyId
    ? dataApi.company(session.companyId)
    : undefined;

  return (
    <div className="flex min-h-0 min-h-svh w-full">
      <aside className="flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-3">
          <Image
            src="/brand/logo-ms.png"
            alt="My Studio MS"
            width={320}
            height={190}
            className="h-9 w-auto max-w-[140px] shrink-0 object-contain object-left"
            priority
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">My Studio MS</p>
            <p className="truncate text-xs text-sidebar-foreground/80">Portale clienti</p>
          </div>
        </div>
        <div className="p-3">
          {company && (
            <div className="mb-2 flex items-start gap-2 rounded-lg bg-sidebar-accent/40 px-2 py-2">
              <Building2 className="mt-0.5 size-4 shrink-0 text-primary" />
              <div className="min-w-0 text-xs">
                <p className="truncate font-medium">{company.name}</p>
                <p className="text-[10px] text-sidebar-foreground/70">P.IVA {company.vat}</p>
              </div>
            </div>
          )}
        </div>
        <nav className="flex-1 space-y-0.5 px-2">
          {links.map((l) => {
            const active = pathname === l.href;
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/90 hover:bg-sidebar-accent/60"
                )}
              >
                <Icon className="size-4 shrink-0" />
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-2">
          <LogoutButton />
        </div>
      </aside>
      <div className="min-w-0 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
