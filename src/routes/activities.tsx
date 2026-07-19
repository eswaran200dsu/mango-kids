import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import {
  Palette,
  Brush,
  Music,
  BookOpen,
  Puzzle,
  Trees,
  HeartPulse,
  PartyPopper,
  Trophy,
  Star,
} from "lucide-react";

export const Route = createFileRoute("/activities")({
  component: Activities,
  head: () => ({
    meta: [
      { title: "Activities | Mango Kids Pre School, Trichy" },
      {
        name: "description",
        content:
          "Art, music, dance, storytelling, yoga, sports and celebrations — our activities help every child grow with joy at Mango Kids Trichy.",
      },
    ],
  }),
});

const activities = [
  {
    icon: Palette,
    title: "Art & Craft",
    text: "Hands-on creativity — paper, paints, clay and imagination.",
    color: "from-berry/20 to-berry/5",
    accent: "text-berry",
  },
  {
    icon: Brush,
    title: "Drawing & Coloring",
    text: "Fine motor skills and color recognition through fun drawing.",
    color: "from-sunny/30 to-sunny/5",
    accent: "text-sunny-foreground",
  },
  {
    icon: Music,
    title: "Dance & Music",
    text: "Rhythm, rhymes, movement and joyful expression.",
    color: "from-primary/20 to-primary/5",
    accent: "text-primary",
  },
  {
    icon: BookOpen,
    title: "Storytelling",
    text: "Wonderful stories that grow vocabulary and values.",
    color: "from-sky/25 to-sky/5",
    accent: "text-foreground",
  },
  {
    icon: Puzzle,
    title: "Indoor Activities",
    text: "Puzzles, blocks, role-play and thinking games.",
    color: "from-primary/15 to-secondary",
    accent: "text-primary",
  },
  {
    icon: Trees,
    title: "Outdoor Play",
    text: "Slides, swings and running around in the fresh air.",
    color: "from-sunny/25 to-primary/10",
    accent: "text-primary",
  },
  {
    icon: HeartPulse,
    title: "Yoga for Kids",
    text: "Little poses, big calm — mindful mornings for children.",
    color: "from-primary/20 to-sunny/10",
    accent: "text-primary",
  },
  {
    icon: PartyPopper,
    title: "Festival Celebrations",
    text: "Diwali, Pongal, Christmas — every festival, together!",
    color: "from-berry/15 to-sunny/10",
    accent: "text-berry",
  },
  {
    icon: Trophy,
    title: "Sports Activities",
    text: "Fun games that build teamwork and coordination.",
    color: "from-sunny/30 to-berry/10",
    accent: "text-sunny-foreground",
  },
  {
    icon: Star,
    title: "Annual Day Programs",
    text: "A grand stage for our little stars to shine bright.",
    color: "from-primary/25 to-sunny/15",
    accent: "text-primary",
  },
];

function Activities() {
  return (
    <div>
      <PageHeader
        eyebrow="Activities"
        title="Play. Learn. Discover."
        subtitle="From art to yoga, every day at Mango Kids is packed with joyful learning experiences designed for growing minds."
      />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {activities.map(({ icon: Icon, title, text, color, accent }) => (
            <div
              key={title}
              className={`group rounded-3xl border bg-gradient-to-br ${color} p-6 transition hover:-translate-y-1 hover:shadow-playful`}
            >
              <div
                className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 ${accent} shadow-sm transition group-hover:animate-wiggle`}
              >
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm text-foreground/75">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
