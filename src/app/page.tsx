import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decodeSession, SESSION_COOKIE } from "@/lib/session-cookie";

export default async function Home() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;
  const token = raw ? decodeURIComponent(raw) : null;
  const s = token ? decodeSession(token) : null;
  if (s?.role === "client") redirect("/c/dashboard");
  if (s?.role === "studio") redirect("/studio");
  redirect("/login");
}
