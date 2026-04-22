import type { MockUser } from "@/lib/types";

export const users: MockUser[] = [
  {
    id: "u-client-alpha",
    email: "cliente.alpha@demo.it",
    name: "Mario Rossi",
    role: "client",
    companyId: "c-alpha",
    password: "demo",
  },
  {
    id: "u-client-beta",
    email: "cliente.beta@demo.it",
    name: "Laura Bianchi",
    role: "client",
    companyId: "c-beta",
    password: "demo",
  },
  {
    id: "u-studio-1",
    email: "studio@demo.it",
    name: "Operatore Backoffice",
    role: "studio",
    password: "demo",
  },
];

export function findUser(
  email: string,
  password: string
): MockUser | undefined {
  return users.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
  );
}
