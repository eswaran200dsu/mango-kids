import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/activities", label: "Activities" },
  { to: "/gallery", label: "Gallery" },
  { to: "/facilities", label: "Facilities" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-background/70 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img
            src={logo}
            alt="Mango Kids Play School"
            className="h-12 w-12 shrink-0 rounded-full object-contain"
            width={48}
            height={48}
          />
          <div className="min-w-0 leading-tight">
            <div className="truncate font-display text-lg font-bold text-primary sm:text-xl">
              Mango Kids
            </div>
            <div className="truncate text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              Pre School · Trichy
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-primary bg-primary/10" }}
              className="rounded-full px-4 py-2 text-sm font-semibold text-foreground/80 transition hover:text-primary hover:bg-primary/5"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="tel:8778667028"
            className="inline-flex items-center gap-2 rounded-full bg-sunny-gradient px-4 py-2 text-sm font-bold text-sunny-foreground shadow-sunny transition hover:scale-105"
          >
            <Phone className="h-4 w-4" /> 87786 67028
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-playful transition hover:scale-105"
          >
            Enroll Now
          </Link>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-full p-2 text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-primary bg-primary/10" }}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground/80"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <a
                href="tel:8778667028"
                className="flex-1 rounded-full bg-sunny-gradient px-4 py-2 text-center text-sm font-bold text-sunny-foreground"
              >
                Call
              </a>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full bg-primary px-4 py-2 text-center text-sm font-bold text-primary-foreground"
              >
                Enroll
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
