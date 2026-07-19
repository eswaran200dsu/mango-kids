import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/20 to-secondary/40">
      <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[oklch(0.88_0.17_95)]/40 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-4 py-20 text-center md:py-24 md:px-6">
        {eyebrow && (
          <div className="mb-4 inline-block rounded-full border border-primary/30 bg-white/60 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            {eyebrow}
          </div>
        )}
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
