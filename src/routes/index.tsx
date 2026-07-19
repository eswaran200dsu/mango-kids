import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Heart,
  ShieldCheck,
  GraduationCap,
  Palette,
  Music,
  Trees,
  BookOpen,
  Camera,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import logo from "@/assets/logo.png";
import classroom from "@/assets/classroom.jpg";
import artCraft from "@/assets/art-craft.jpg";
import storytelling from "@/assets/storytelling.jpg";
import outdoorPlay from "@/assets/outdoor-play.jpg";
import danceMusic from "@/assets/dance-music.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Mango Kids Pre School, Trichy | Admissions Open" },
      {
        name: "description",
        content:
          "A joyful, safe and modern preschool in Trichy. Smart classrooms, qualified teachers, creative activities and a warm learning atmosphere. Admissions open.",
      },
    ],
  }),
});

const whyUs = [
  {
    icon: Heart,
    title: "Loving Environment",
    desc: "Warm, nurturing teachers who treat every child like their own.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    desc: "CCTV monitored campus, child-safe furniture and hygienic play zones.",
  },
  {
    icon: GraduationCap,
    title: "Play-based Learning",
    desc: "Montessori-inspired activities that build curiosity and confidence.",
  },
  {
    icon: Sparkles,
    title: "Creative Curriculum",
    desc: "Art, music, storytelling, yoga and outdoor play — every single day.",
  },
];

const quickNav = [
  { to: "/about", label: "About Us", icon: BookOpen, tint: "bg-primary/10 text-primary" },
  {
    to: "/activities",
    label: "Activities",
    icon: Palette,
    tint: "bg-sunny/20 text-sunny-foreground",
  },
  { to: "/gallery", label: "Gallery", icon: Camera, tint: "bg-berry/10 text-berry" },
  { to: "/facilities", label: "Facilities", icon: ShieldCheck, tint: "bg-sky/20 text-foreground" },
  { to: "/contact", label: "Contact", icon: Phone, tint: "bg-primary/10 text-primary" },
] as const;

const testimonials = [
  {
    name: "Priya R.",
    role: "Parent of Aarav (LKG)",
    text: "My son runs into class every morning! The teachers are so caring and the activities are wonderful.",
  },
  {
    name: "Karthik S.",
    role: "Parent of Diya (Nursery)",
    text: "Clean campus, safe environment and my daughter has learned so many rhymes and manners.",
  },
  {
    name: "Meena V.",
    role: "Parent of Ishaan (UKG)",
    text: "Mango Kids has that warm home-like feeling. We couldn't have asked for a better start.",
  },
];

function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 opacity-30 bubble-bg" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="text-primary-foreground animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur">
              <Sparkles className="h-4 w-4 text-sunny" /> Admissions Open 2026 – 27
            </div>
            <h1 className="mt-5 font-display text-4xl leading-tight font-bold sm:text-5xl md:text-6xl">
              Nurturing Young Minds
              <br />
              for a <span className="text-sunny">Bright Future</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-white/90 sm:text-lg">
              Welcome to <strong>Mango Kids Pre School</strong>, Trichy — where every child is
              celebrated, every day is playful, and learning happens with a smile.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="rounded-full bg-sunny-gradient px-6 py-3 text-sm font-bold text-sunny-foreground shadow-sunny transition hover:scale-105"
              >
                Enroll Now
              </Link>
              <Link
                to="/contact"
                className="rounded-full bg-white/95 px-6 py-3 text-sm font-bold text-primary transition hover:scale-105"
              >
                Book a Visit
              </Link>
              <a
                href="tel:8778667028"
                className="rounded-full border-2 border-white/70 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Call 87786 67028
              </a>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-white/85">
              <div className="flex -space-x-2">
                {[classroom, artCraft].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="h-10 w-10 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 text-sunny">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                Loved by <strong className="text-white">200+ happy families</strong>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-sunny animate-float-slow" />
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-white/30 animate-float-slow" />
            <img
              src={hero}
              alt="Happy children at Mango Kids Pre School"
              width={1920}
              height={1280}
              className="relative w-full rounded-3xl border-8 border-white/40 object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-playful">
              <img src={logo} alt="Mango Kids logo" className="h-12 w-12" />
              <div>
                <div className="font-display text-sm font-bold text-primary">Mango Kids</div>
                <div className="text-xs text-muted-foreground">Play · Learn · Grow</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WELCOME */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <div className="text-xs font-bold uppercase tracking-widest text-primary">
          Welcome to Mango Kids
        </div>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
          A Happy Place to Start School
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
          At Mango Kids Pre School, Trichy, we blend structured learning with joyful play. Our
          curriculum is designed to spark curiosity, build strong social skills, and prepare little
          ones for a confident tomorrow — all in a bright, safe and colorful environment.
        </p>
      </section>

      {/* WHY US */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 text-center">
          <div className="text-xs font-bold uppercase tracking-widest text-primary">
            Why Choose Us
          </div>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Everything Little Learners Need
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-3xl border bg-card p-6 transition hover:-translate-y-1 hover:shadow-playful"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK NAV */}
      <section className="bg-secondary/50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Explore Our School</h2>
            <p className="mt-3 text-muted-foreground">Peek into what makes Mango Kids special.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {quickNav.map(({ to, label, icon: Icon, tint }) => (
              <Link
                key={to}
                to={to}
                className="group rounded-2xl bg-card p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-playful"
              >
                <div
                  className={`mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl ${tint} transition group-hover:animate-wiggle`}
                >
                  <Icon className="h-8 w-8" />
                </div>
                <div className="mt-4 font-display text-lg font-bold">{label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GLIMPSES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-primary">
              A Glimpse
            </div>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Moments From Our Classrooms
            </h2>
          </div>
          <Link
            to="/gallery"
            className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-playful"
          >
            See Gallery →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[classroom, storytelling, artCraft, outdoorPlay, danceMusic]
            .slice(0, 4)
            .map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Mango Kids classroom moment"
                className="h-56 w-full rounded-2xl object-cover shadow-sm transition hover:scale-[1.02]"
                loading="lazy"
              />
            ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-sunny/20 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-primary">
              Happy Parents
            </div>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              What Families Say About Us
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-3xl bg-card p-7 shadow-sm">
                <div className="flex gap-0.5 text-sunny">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-foreground/85">"{t.text}"</p>
                <div className="mt-5 border-t pt-4">
                  <div className="font-display font-bold text-primary">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-hero-gradient p-10 text-primary-foreground md:p-14">
          <div className="absolute inset-0 opacity-25 bubble-bg" />
          <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h3 className="font-display text-3xl font-bold sm:text-4xl">
                Ready to give your child a joyful start?
              </h3>
              <p className="mt-3 text-white/90">
                Visit our campus in Subramaniyapuram, Trichy — meet the teachers, tour the
                classrooms.
              </p>
              <div className="mt-3 flex items-center gap-2 text-sm text-white/85">
                <MapPin className="h-4 w-4 text-sunny" /> 118, Periyar Nagar Street,
                Subramaniyapuram, Trichy 620005
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="rounded-full bg-sunny-gradient px-6 py-3 text-sm font-bold text-sunny-foreground shadow-sunny"
              >
                Enroll Now
              </Link>
              <a
                href="tel:8778667028"
                className="rounded-full bg-white px-6 py-3 text-sm font-bold text-primary"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
