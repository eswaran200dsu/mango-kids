import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Phone, LogIn, LayoutDashboard } from "lucide-react";
import logo from "@/assets/logo.png";
import { useAuth } from "@/hooks/use-auth";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/activities", label: "Activities" },
  { to: "/gallery", label: "Gallery" },
  { to: "/facilities", label: "Facilities" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { location } = useRouterState();
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled
          ? "bg-background/90 backdrop-blur border-b border-border shadow-sm"
          : "bg-background/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Mango Kids Pre School logo"
            className="h-11 w-11 rounded-full bg-secondary/40 p-1"
            width={44}
            height={44}
          />
          <div className="leading-tight">
            <div className="text-base font-bold tracking-tight md:text-lg">
              <span className="text-primary">Mango</span>{" "}
              <span className="text-[oklch(0.65_0.18_75)]">Kids</span>
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground md:text-xs">
              Pre School · Trichy
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active =
              item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-foreground/80 hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <Link
              to="/admin"
              className="hidden items-center gap-2 rounded-full border border-primary/40 bg-card px-4 py-2 text-sm font-bold text-primary md:inline-flex"
            >
              <LayoutDashboard className="h-4 w-4" /> Admin
            </Link>
          ) : (
            <Link
              to="/auth"
              className="hidden items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-bold text-foreground/80 hover:bg-muted md:inline-flex"
            >
              <LogIn className="h-4 w-4" /> Sign in
            </Link>
          )}
          <a
            href="tel:8778667028"
            className="hidden items-center gap-2 rounded-full gradient-brand px-4 py-2 text-sm font-bold text-white shadow-soft transition hover:brightness-105 md:inline-flex"
          >
            <Phone className="h-4 w-4" /> 87786 67028
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-border bg-background p-2 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground/90 hover:bg-secondary/40"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={user ? "/admin" : "/auth"}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-primary hover:bg-secondary/40"
            >
              {user ? "Admin Dashboard" : "Sign in"}
            </Link>
            <a
              href="tel:8778667028"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full gradient-brand px-4 py-2 text-sm font-bold text-white"
            >
              <Phone className="h-4 w-4" /> Call 87786 67028
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
