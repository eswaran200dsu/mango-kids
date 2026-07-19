import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Target, Eye, GraduationCap, Users, Sparkles, HeartHandshake } from "lucide-react";
import friendship from "@/assets/art-craft.jpg";
import award from "@/assets/dance-music.jpg";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About Us | Mango Kids Pre School, Trichy" },
      {
        name: "description",
        content:
          "Meet Mango Kids Pre School Trichy — our vision, mission, learning methodology, qualified teachers and child-first approach to early education.",
      },
    ],
  }),
});

function About() {
  return (
    <div>
      <PageHeader
        eyebrow="About Us"
        title="A Warm Home for Little Learners"
        subtitle="Mango Kids Pre School, Trichy is a place where children discover, imagine and grow — guided by teachers who truly care."
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
        <img
          src={friendship}
          alt="Our friendship tree"
          className="rounded-3xl object-cover shadow-playful"
        />
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-primary">Who We Are</div>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Where every child feels like a star
          </h2>
          <p className="mt-4 text-muted-foreground">
            Founded with a simple mission — to make early childhood joyful and meaningful — Mango
            Kids has grown into a trusted preschool for families across Trichy. Our bright
            classrooms, thoughtful curriculum and loving teachers create the perfect environment for
            children aged 2 to 6.
          </p>
          <p className="mt-4 text-muted-foreground">
            We believe learning should feel like play, discipline should feel like love, and school
            should feel like a second home. That belief shapes every corner of our campus.
          </p>
        </div>
      </section>

      <section className="bg-secondary/50 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2">
          {[
            {
              icon: Eye,
              title: "Our Vision",
              text: "To nurture confident, kind and curious children who are ready to embrace the world with joy.",
            },
            {
              icon: Target,
              title: "Our Mission",
              text: "To deliver early learning through play, creativity and love — building strong foundations for lifelong learners.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl bg-card p-8 shadow-sm">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold">{title}</h3>
              <p className="mt-3 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-primary">
            Principal's Message
          </div>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            "Every child is a promise."
          </h2>
          <p className="mt-4 text-muted-foreground">
            Welcome to Mango Kids. As a mother and educator, I know how precious these early years
            are. Our team is committed to giving your child a warm, safe and stimulating environment
            — one where confidence is built through kindness, and knowledge grows through curiosity.
          </p>
          <p className="mt-4 text-muted-foreground">
            We would love to welcome you and your little one to our school family.
          </p>
          <div className="mt-6 font-display text-lg font-bold text-primary">
            — Principal, Mango Kids Pre School
          </div>
        </div>
        <img
          src={award}
          alt="Principal with student"
          className="rounded-3xl object-cover shadow-playful"
        />
      </section>

      <section className="bg-sunny/15 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Our Learning Approach</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              A balanced blend of play, phonics, arts, motor skills and social learning.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: "Play-Based Learning",
                text: "Structured play that develops thinking, communication and problem solving.",
              },
              {
                icon: GraduationCap,
                title: "Qualified Teachers",
                text: "Trained early-childhood educators with a genuine love for children.",
              },
              {
                icon: HeartHandshake,
                title: "Child Development",
                text: "Focus on emotional, social, physical and cognitive growth — the whole child.",
              },
              {
                icon: Users,
                title: "Small Class Sizes",
                text: "So every child gets personal attention and space to shine.",
              },
              {
                icon: Target,
                title: "Skill Building",
                text: "Phonics, numeracy, arts, music and life skills — all age-appropriate.",
              },
              {
                icon: Eye,
                title: "Progress Tracking",
                text: "Regular updates and parent-teacher conversations to celebrate growth.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl bg-card p-6 shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sunny/40 text-sunny-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
