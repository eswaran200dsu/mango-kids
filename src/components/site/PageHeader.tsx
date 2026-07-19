import type { ReactNode } from "react";

export function PageHeader({
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
    <section className="relative overflow-hidden bg-hero-gradient text-primary-foreground">
      <div className="absolute inset-0 opacity-30 bubble-bg" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
        {eyebrow && (
          <div className="text-xs font-bold uppercase tracking-widest text-sunny">{eyebrow}</div>
        )}
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-white/90">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
