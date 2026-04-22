"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="text-sidebar-foreground/90 hover:text-sidebar-foreground"
      onClick={() => {
        logout();
        router.push("/login");
        router.refresh();
      }}
    >
      <LogOut className="mr-2 size-4" />
      Esci
    </Button>
  );
}
