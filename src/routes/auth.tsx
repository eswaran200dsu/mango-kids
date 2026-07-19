import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Lock } from "lucide-react";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({ meta: [{ title: "Admin Sign In | Mango Kids Pre School" }] }),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        setInfo("Account created! You can now sign in.");
        setMode("signin");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-hero-gradient">
      <div className="relative mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-6 py-16">
        <Link
          to="/"
          className="mb-6 flex items-center justify-center gap-3 text-primary-foreground"
        >
          <img src={logo} alt="Mango Kids" className="h-14 w-14 rounded-full bg-white p-1" />
          <div>
            <div className="font-display text-xl font-bold">Mango Kids</div>
            <div className="text-xs uppercase tracking-wider opacity-80">Admin Portal</div>
          </div>
        </Link>
        <div className="rounded-3xl bg-card p-8 shadow-playful">
          <div className="mb-6 flex items-center gap-3">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">
                {mode === "signin" ? "Admin Sign In" : "Create Admin Account"}
              </h1>
              <p className="text-xs text-muted-foreground">Access the school dashboard</p>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && (
              <Input label="Full Name" value={fullName} onChange={setFullName} />
            )}
            <Input label="Email" type="email" value={email} onChange={setEmail} required />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              required
              minLength={6}
            />

            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            {info && (
              <div className="rounded-lg bg-primary/10 p-3 text-sm text-primary">{info}</div>
            )}

            <button
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-playful transition hover:scale-[1.02] disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "signin" ? (
              <>
                New here?{" "}
                <button className="font-semibold text-primary" onClick={() => setMode("signup")}>
                  Create account
                </button>
              </>
            ) : (
              <>
                Have an account?{" "}
                <button className="font-semibold text-primary" onClick={() => setMode("signin")}>
                  Sign in
                </button>
              </>
            )}
          </div>

          <div className="mt-6 rounded-xl bg-sunny/20 p-3 text-xs text-foreground/70">
            <strong>Note:</strong> The very first account created automatically becomes admin.
            Additional accounts require an existing admin to grant access.
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  type = "text",
  value,
  onChange,
  required,
  minLength,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-foreground/80">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        minLength={minLength}
        className="mt-1 w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
