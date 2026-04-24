import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/base")({
  component: BaseLayout,
});

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden>
        <circle cx="24" cy="24" r="22" fill="none" stroke="var(--gold)" strokeWidth="1.2" />
        <text
          x="50%"
          y="54%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="Playfair Display, serif"
          fontSize="18"
          fill="var(--gold)"
          fontWeight="700"
        >
          IM
        </text>
        <line x1="14" y1="34" x2="34" y2="34" stroke="var(--gold)" strokeWidth="0.8" />
      </svg>
      <span className="font-display text-2xl font-bold tracking-tight">
        <span className="text-foreground">Info</span>
        <span className="text-primary">Mind</span>
      </span>
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
        <div className="w-24" />
      </header>

      <Outlet />
    </div>
  );
}
