import type { SessionPayloadV1 } from "@/lib/types";

export const SESSION_COOKIE = "mystudios_session";

function utf8ToBase64url(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  const b64 = btoa(bin);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64urlToUtf8(b64url: string): string {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 === 0 ? "" : "====".slice(b64.length % 4);
  const str = atob(b64 + pad);
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) bytes[i] = str.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

export function encodeSession(p: SessionPayloadV1): string {
  return utf8ToBase64url(JSON.stringify(p));
}

export function decodeSession(raw: string): SessionPayloadV1 | null {
  try {
    const t = base64urlToUtf8(raw);
    const p = JSON.parse(t) as SessionPayloadV1;
    if (p?.v !== 1) return null;
    if (p.role !== "client" && p.role !== "studio") return null;
    if (!p.sub || !p.email) return null;
    if (p.role === "client" && !p.companyId) return null;
    return p;
  } catch {
    return null;
  }
}

export function setSessionCookieClient(token: string): void {
  if (typeof document === "undefined") return;
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${SESSION_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${60 * 60 * 8}; SameSite=Lax${secure}`;
}

export function clearSessionCookieClient(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0`;
}
