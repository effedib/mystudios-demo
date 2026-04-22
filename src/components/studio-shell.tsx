"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { Briefcase, Building2, LayoutDashboard, Upload } from "lucide-react";

const links = [
  { href: "/studio", label: "Riepilogo", icon: LayoutDashboard },
  { href: "/studio/clienti", label: "Clienti e utenti", icon: Building2 },
  { href: "/studio/caricamenti", label: "Caricamenti", icon: Upload },
] as const;

export function StudioShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const name = useAuthStore((s) => s.session?.name) ?? "Operatore";

  return (
    <div className="flex min-h-0 min-h-svh w-full">
      <aside className="flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Briefcase className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Backoffice</p>
            <p className="truncate text-xs text-sidebar-foreground/80">My Studio MS</p>
          </div>
        </div>
        <div className="p-3 text-xs text-sidebar-foreground/80">
          <p className="font-medium text-sidebar-foreground">{name}</p>
          <p className="text-[10px]">Pannello caricamenti e anagrafiche (demo)</p>
        </div>
        <nav className="flex-1 space-y-0.5 px-2">
          {links.map((l) => {
            const active =
              l.href === "/studio" ? pathname === "/studio" : pathname.startsWith(l.href);
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-sidebar-primary text-primary-foreground"
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
      <div className="min-w-0 flex-1 flex flex-col bg-background">
        {children}
      </div>
    </div>
  );
}
