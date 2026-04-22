"use client";

import { create } from "zustand";
import type { SessionPayloadV1 } from "@/lib/types";
import {
  clearSessionCookieClient,
  encodeSession,
  setSessionCookieClient,
} from "@/lib/session-cookie";
import { findUser } from "@/mocks/users";

type AuthState = {
  session: SessionPayloadV1 | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  hydrateFromSession: (s: SessionPayloadV1 | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  login: (email, password) => {
    const u = findUser(email, password);
    if (!u) return false;
    const payload: SessionPayloadV1 = {
      v: 1,
      role: u.role,
      sub: u.id,
      email: u.email,
      name: u.name,
      companyId: u.companyId,
    };
    const token = encodeSession(payload);
    setSessionCookieClient(token);
    set({ session: payload });
    return true;
  },
  logout: () => {
    clearSessionCookieClient();
    set({ session: null });
  },
  hydrateFromSession: (s) => {
    if (s) set({ session: s });
  },
}));
