import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-[oklch(0.22_0.05_155)] text-white/90">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Mango Kids logo"
              className="h-12 w-12 rounded-full bg-white/10 p-1"
              width={48}
              height={48}
            />
            <div>
              <div className="text-lg font-bold text-white">Mango Kids Pre School</div>
              <div className="text-xs uppercase tracking-widest text-secondary">Trichy</div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Nurturing young minds for a bright future through play, care and joyful learning.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-secondary">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/about", label: "About Us" },
              { to: "/activities", label: "Activities" },
              { to: "/gallery", label: "Gallery" },
              { to: "/facilities", label: "Facilities" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-white/80 transition hover:text-secondary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-secondary">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              118, Periyar Nagar Street, Subramaniyapuram, Tiruchirappalli, Tamil Nadu 620005
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-secondary" />
              <a href="tel:8778667028" className="hover:text-secondary">
                87786 67028
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-secondary" />
              <a href="mailto:info@mangokids.school" className="hover:text-secondary">
                info@mangokids.school
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-secondary">
            Follow Us
          </h4>
          <div className="flex gap-3">
            {[
              { icon: Facebook, href: "#", label: "Facebook" },
              { icon: Instagram, href: "#", label: "Instagram" },
              { icon: Youtube, href: "#", label: "YouTube" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-secondary hover:text-[oklch(0.22_0.05_155)]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <a
            href="https://wa.me/918778667028"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-white shadow-soft hover:brightness-110"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Mango Kids Pre School, Trichy. All rights reserved.
      </div>
    </footer>
  );
}
