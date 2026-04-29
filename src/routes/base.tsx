import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { SignOutButton } from "@/components/SignOutButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import infomindLogo from "@/assets/infomind-logo-transparent.png";

export const Route = createFileRoute("/base")({
  component: BaseLayout,
});

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img src={infomindLogo} alt="InfoMind" className="h-12 w-auto object-contain" />
      <span
        style={{ fontFamily: "'Poppins', sans-serif" }}
        className="text-xl font-semibold tracking-wide"
      >
        <span style={{ color: "#e2b984" }}>INFO</span>
        <span style={{ color: "#ffffff" }}>MIND</span>
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
        <img
          src={infomindLogo}
          alt=""
          className="h-[70vmin] w-[70vmin] object-contain opacity-[0.04]"
        />
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
