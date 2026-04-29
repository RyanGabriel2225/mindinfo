import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { SignOutButton } from "@/components/SignOutButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import infomindLogo from "@/assets/infomind-logo.png";

export const Route = createFileRoute("/base")({
  component: BaseLayout,
});

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img src={infomindLogo} alt="InfoMind" className="h-12 w-auto object-contain" />
    </div>
  );
}

function BaseLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center"
      >
        <svg viewBox="0 0 400 400" className="h-[70vmin] w-[70vmin] opacity-[0.04]">
          <circle cx="200" cy="200" r="190" fill="none" stroke="var(--gold)" strokeWidth="2" />
          <text
            x="50%"
            y="54%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Playfair Display, serif"
            fontSize="160"
            fill="var(--gold)"
            fontWeight="700"
          >
            IM
          </text>
          <line x1="120" y1="280" x2="280" y2="280" stroke="var(--gold)" strokeWidth="2" />
        </svg>
      </div>

      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link to="/" className="text-muted-foreground transition hover:text-foreground">
            Início
          </Link>
          <Link
            to="/base"
            className="text-primary"
            activeProps={{ className: "text-primary" }}
          >
            Base
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <SignOutButton />
        </div>
      </header>

      <Outlet />
    </div>
  );
}
