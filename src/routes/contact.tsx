import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Phone, MapPin, Mail, MessageCircle, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact & Admissions | Mango Kids Pre School, Trichy" },
      {
        name: "description",
        content:
          "Contact Mango Kids Pre School Trichy — call 87786 67028, visit 118 Periyar Nagar Street, Subramaniyapuram, or send an admission enquiry.",
      },
    ],
  }),
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? "")
        .trim()
        .slice(0, 100),
      phone: String(fd.get("phone") ?? "")
        .trim()
        .slice(0, 20),
      email:
        String(fd.get("email") ?? "")
          .trim()
          .slice(0, 255) || null,
      child_name:
        String(fd.get("child") ?? "")
          .trim()
          .slice(0, 100) || null,
      child_age:
        String(fd.get("age") ?? "")
          .trim()
          .slice(0, 20) || null,
      message:
        String(fd.get("message") ?? "")
          .trim()
          .slice(0, 2000) || null,
    };
    if (!payload.name || !payload.phone) {
      setError("Name and phone are required.");
      setSaving(false);
      return;
    }
    const { error } = await supabase.from("enquiries").insert(payload);
    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSent(true);
    form.reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Get in touch"
        title="We'd love to meet you!"
        subtitle="Book a school visit, ask about admissions or just say hello — our team is happy to help."
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-3">
        {[
          {
            icon: Phone,
            title: "Call Us",
            value: "87786 67028",
            href: "tel:8778667028",
            tint: "bg-primary/10 text-primary",
          },
          {
            icon: MessageCircle,
            title: "WhatsApp",
            value: "Chat Now",
            href: "https://wa.me/918778667028",
            tint: "bg-[#25D366]/15 text-[#128C7E]",
          },
          {
            icon: MapPin,
            title: "Visit Us",
            value: "118, Periyar Nagar Street, Subramaniyapuram, Trichy 620005",
            href: "https://maps.google.com/?q=118,Periyar+Nagar+Street,+Subramaniyapuram,+Tiruchirappalli,+Tamil+Nadu+620005",
            tint: "bg-sunny/25 text-sunny-foreground",
          },
        ].map(({ icon: Icon, title, value, href, tint }) => (
          <a
            key={title}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group rounded-3xl border bg-card p-6 transition hover:-translate-y-1 hover:shadow-playful"
          >
            <div
              className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${tint}`}
            >
              <Icon className="h-7 w-7" />
            </div>
            <div className="mt-4 font-display text-lg font-bold">{title}</div>
            <div className="mt-1 text-sm text-muted-foreground">{value}</div>
          </a>
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-20 lg:grid-cols-2">
        <div className="rounded-3xl border bg-card p-8 shadow-sm">
          <h2 className="font-display text-2xl font-bold">Admission Enquiry</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Fill in your details — we'll get back within 24 hours.
          </p>
          <form onSubmit={onSubmit} className="mt-6 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Parent Name" name="name" required />
              <Field label="Phone Number" name="phone" type="tel" required />
            </div>
            <Field label="Email" name="email" type="email" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Child's Name" name="child" />
              <Field label="Child's Age" name="age" />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground/80">Message</label>
              <textarea
                name="message"
                rows={4}
                className="mt-1 w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Tell us a little about your child..."
              />
            </div>
            <button
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-playful transition hover:scale-[1.02] disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {saving ? "Sending..." : "Send Enquiry"}
            </button>
            {error && (
              <div className="rounded-xl bg-destructive/10 p-3 text-sm font-semibold text-destructive">
                {error}
              </div>
            )}
            {sent && (
              <div className="rounded-xl bg-primary/10 p-3 text-sm font-semibold text-primary">
                Thank you! We'll be in touch soon. 🌱
              </div>
            )}
          </form>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border shadow-sm">
            <iframe
              title="Mango Kids Pre School Location"
              src="https://www.google.com/maps?q=118,Periyar+Nagar+Street,+Subramaniyapuram,+Tiruchirappalli,+Tamil+Nadu+620005&output=embed"
              className="h-80 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="rounded-3xl bg-hero-gradient p-8 text-primary-foreground shadow-playful">
            <h3 className="font-display text-2xl font-bold">Email Us</h3>
            <p className="mt-2 text-white/85">
              For quick queries drop us an email — we love hearing from parents.
            </p>
            <a
              href="mailto:sripriyavenkatraman298@gmail.com"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-primary"
            >
              <Mail className="h-4 w-4" /> sripriyavenkatraman298@gmail.com
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <a
              href="tel:8778667028"
              className="rounded-2xl bg-primary p-5 text-center font-bold text-primary-foreground shadow-playful transition hover:scale-[1.02]"
            >
              <Phone className="mx-auto mb-2 h-6 w-6" /> Click to Call
            </a>
            <a
              href="https://wa.me/918778667028"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-[#25D366] p-5 text-center font-bold text-white shadow-playful transition hover:scale-[1.02]"
            >
              <MessageCircle className="mx-auto mb-2 h-6 w-6" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-foreground/80">
        {label}
        {required && <span className="text-berry"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
