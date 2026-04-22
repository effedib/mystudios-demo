"use client";

import { useEffect } from "react";
import { decodeSession, SESSION_COOKIE } from "@/lib/session-cookie";
import { useAuthStore } from "@/stores/auth-store";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[$()*+./?[\\\]^{|}]/g, "\\$&")}=([^;]*)`)
  );
  return m ? decodeURIComponent(m[1]) : null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useAuthStore((s) => s.hydrateFromSession);

  useEffect(() => {
    const raw = readCookie(SESSION_COOKIE);
    if (!raw) return;
    const s = decodeSession(raw);
    if (s) hydrate(s);
  }, [hydrate]);

  return <>{children}</>;
}
