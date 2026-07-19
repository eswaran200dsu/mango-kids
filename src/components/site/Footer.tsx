import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-foreground text-background">
      <div className="absolute inset-0 opacity-10 bubble-bg" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="Mango Kids" className="h-12 w-12 rounded-full bg-white p-1" />
            <div>
              <div className="font-display text-xl font-bold text-sunny">Mango Kids</div>
              <div className="text-xs uppercase tracking-wider text-background/70">
                Pre School · Trichy
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-background/70">
            Nurturing young minds for a bright future with love, play and discovery.
          </p>
          <div className="mt-4 flex gap-3">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="rounded-full bg-background/10 p-2 transition hover:bg-sunny hover:text-sunny-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold text-sunny">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["/", "Home"],
              ["/about", "About Us"],
              ["/activities", "Activities"],
              ["/gallery", "Gallery"],
              ["/facilities", "Facilities"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-background/75 transition hover:text-sunny">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold text-sunny">Reach Us</h4>
          <ul className="mt-4 space-y-3 text-sm text-background/80">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sunny" /> 118, Periyar Nagar Street,
              Subramaniyapuram, Tiruchirappalli, Tamil Nadu 620005
            </li>
            <li className="flex gap-3">
              <Phone className="h-4 w-4 shrink-0 text-sunny" />{" "}
              <a href="tel:8778667028" className="hover:text-sunny">
                87786 67028
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="h-4 w-4 shrink-0 text-sunny" /> sripriyavenkatraman298@gmail.com
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold text-sunny">Admissions Open</h4>
          <p className="mt-4 text-sm text-background/75">
            Book a school visit and see our happy classrooms in person.
          </p>
          <Link
            to="/contact"
            className="mt-4 inline-flex rounded-full bg-sunny-gradient px-5 py-2 text-sm font-bold text-sunny-foreground shadow-sunny"
          >
            Book a Visit
          </Link>
        </div>
      </div>
      <div className="relative border-t border-background/10">
        <div className="mx-auto max-w-7xl px-6 py-5 text-center text-xs text-background/60">
          © {new Date().getFullYear()} Mango Kids Pre School, Trichy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
