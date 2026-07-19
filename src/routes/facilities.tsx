import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import {
  Monitor,
  Camera,
  ShieldCheck,
  Puzzle,
  Trees,
  BookOpen,
  Bus,
  Cross,
  Sparkles,
  Baby,
} from "lucide-react";

export const Route = createFileRoute("/facilities")({
  component: Facilities,
  head: () => ({
    meta: [
      { title: "Facilities | Mango Kids Pre School, Trichy" },
      {
        name: "description",
        content:
          "Smart classrooms, CCTV security, safe campus, indoor & outdoor play zones, library corner, transportation and more at Mango Kids Trichy.",
      },
    ],
  }),
});

const facilities = [
  {
    icon: Monitor,
    title: "Smart Classrooms",
    desc: "Interactive digital learning combined with hands-on activities.",
  },
  {
    icon: Camera,
    title: "CCTV Security",
    desc: "24/7 monitored campus for the safety of every child.",
  },
  {
    icon: ShieldCheck,
    title: "Safe Campus",
    desc: "Secure entry, trained staff and child-first safety protocols.",
  },
  {
    icon: Puzzle,
    title: "Indoor Activity Area",
    desc: "A vibrant space for games, puzzles and creative play.",
  },
  {
    icon: Trees,
    title: "Outdoor Play Zone",
    desc: "Sunshine, swings, slides and space to run free.",
  },
  {
    icon: BookOpen,
    title: "Library Corner",
    desc: "Colourful storybooks that spark early love for reading.",
  },
  {
    icon: Bus,
    title: "Transportation",
    desc: "Safe pick-up and drop service across nearby areas.",
  },
  {
    icon: Cross,
    title: "First Aid Support",
    desc: "On-campus first aid and quick medical response.",
  },
  { icon: Sparkles, title: "Clean & Hygienic", desc: "Daily sanitised classrooms and washrooms." },
  {
    icon: Baby,
    title: "Child-Friendly Space",
    desc: "Furniture and design built entirely around little ones.",
  },
];

function Facilities() {
  return (
    <div>
      <PageHeader
        eyebrow="Facilities"
        title="A Safe, Modern & Joyful Campus"
        subtitle="Everything a growing child needs — thoughtfully designed and carefully maintained."
      />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {facilities.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-3xl border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-playful"
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
    </div>
  );
}
