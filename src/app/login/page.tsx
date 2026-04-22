import { Suspense } from "react";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="min-h-svh bg-gradient-to-b from-primary/5 to-background">
      <Suspense
        fallback={
          <p className="p-8 text-center text-sm text-muted-foreground">Caricamento…</p>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
