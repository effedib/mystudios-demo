import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeSession, SESSION_COOKIE } from "@/lib/session-cookie";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isClient = pathname.startsWith("/c");
  const isStudio = pathname.startsWith("/studio");
  if (!isClient && !isStudio) return NextResponse.next();

  const raw = request.cookies.get(SESSION_COOKIE)?.value;
  const token = raw ? decodeURIComponent(raw) : null;
  const s = token ? decodeSession(token) : null;
  if (!s) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }
  if (isClient && s.role !== "client") {
    return NextResponse.redirect(new URL("/studio", request.url));
  }
  if (isStudio && s.role !== "studio") {
    return NextResponse.redirect(new URL("/c/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/c/:path*", "/studio/:path*"],
};
