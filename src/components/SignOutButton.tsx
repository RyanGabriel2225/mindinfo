import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function SignOutButton() {
  const { user, signOut } = useAuth();
  if (!user) return null;
  return (
    <button
      onClick={() => signOut()}
      title={user.email ?? "Sair"}
      className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm transition hover:border-primary/40 hover:text-primary"
    >
      <LogOut className="h-3.5 w-3.5" />
      Sair
    </button>
  );
}
