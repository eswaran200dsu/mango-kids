import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  LogOut,
  Upload,
  Trash2,
  Image as ImageIcon,
  Video,
  Inbox,
  Loader2,
  Home,
  Phone,
  Mail,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  component: Admin,
  head: () => ({ meta: [{ title: "Admin Dashboard | Mango Kids" }] }),
});

type Media = {
  id: string;
  type: "photo" | "video";
  url: string;
  caption: string | null;
  storage_path: string | null;
  created_at: string;
};
type Enquiry = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  child_name: string | null;
  child_age: string | null;
  message: string | null;
  created_at: string;
};

function Admin() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<"gallery" | "enquiries">("gallery");
  const [media, setMedia] = useState<Media[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!data);
    })();
  }, []);

  const loadMedia = async () => {
    const { data } = await supabase
      .from("gallery_media")
      .select("*")
      .order("created_at", { ascending: false });
    setMedia((data as Media[]) ?? []);
  };
  const loadEnquiries = async () => {
    const { data } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    setEnquiries((data as Enquiry[]) ?? []);
  };

  useEffect(() => {
    if (isAdmin) {
      loadMedia();
      loadEnquiries();
    }
  }, [isAdmin]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const isVideo = file.type.startsWith("video/");
      const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const { error: upErr } = await supabase.storage
        .from("gallery")
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (upErr) throw upErr;
      const { data: signed, error: sErr } = await supabase.storage
        .from("gallery")
        .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
      if (sErr) throw sErr;
      const { error: insErr } = await supabase.from("gallery_media").insert({
        type: isVideo ? "video" : "photo",
        url: signed.signedUrl,
        storage_path: path,
        caption: caption || null,
      });
      if (insErr) throw insErr;
      setCaption("");
      e.target.value = "";
      await loadMedia();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const deleteMedia = async (m: Media) => {
    if (!confirm("Delete this item?")) return;
    if (m.storage_path) await supabase.storage.from("gallery").remove([m.storage_path]);
    await supabase.from("gallery_media").delete().eq("id", m.id);
    await loadMedia();
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    await supabase.from("enquiries").delete().eq("id", id);
    await loadEnquiries();
  };

  if (isAdmin === null) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Not authorized</h1>
        <p className="mt-3 text-muted-foreground">
          Your account isn't an admin. Contact the existing admin to grant access.
        </p>
        <button
          onClick={signOut}
          className="mt-6 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="bg-secondary/40 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-primary">
              Admin Dashboard
            </div>
            <h1 className="mt-1 font-display text-3xl font-bold">Mango Kids Control Center</h1>
          </div>
          <div className="flex gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold shadow-sm"
            >
              <Home className="h-4 w-4" /> Site
            </Link>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-full bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>

        <div className="mb-6 flex gap-2">
          <TabBtn
            active={tab === "gallery"}
            onClick={() => setTab("gallery")}
            icon={<ImageIcon className="h-4 w-4" />}
          >
            Gallery ({media.length})
          </TabBtn>
          <TabBtn
            active={tab === "enquiries"}
            onClick={() => setTab("enquiries")}
            icon={<Inbox className="h-4 w-4" />}
          >
            Enquiries ({enquiries.length})
          </TabBtn>
        </div>

        {tab === "gallery" && (
          <div className="space-y-6">
            <div className="rounded-3xl bg-card p-6 shadow-sm">
              <h2 className="font-display text-xl font-bold">Upload Photo or Video</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Images and videos are added to the public school gallery.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <label className="text-sm font-semibold text-foreground/80">
                    Caption (optional)
                  </label>
                  <input
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="mt-1 w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. Sports Day 2026"
                  />
                </div>
                <label
                  className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground shadow-playful transition hover:scale-[1.02] ${uploading ? "opacity-60" : ""}`}
                >
                  {uploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  {uploading ? "Uploading..." : "Choose file"}
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleUpload}
                    disabled={uploading}
                  />
                </label>
              </div>
              {error && (
                <div className="mt-3 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {media.length === 0 && (
                <div className="col-span-full rounded-3xl border-2 border-dashed p-10 text-center text-muted-foreground">
                  No media yet. Upload your first photo or video above.
                </div>
              )}
              {media.map((m) => (
                <div
                  key={m.id}
                  className="group relative overflow-hidden rounded-2xl bg-card shadow-sm"
                >
                  {m.type === "video" ? (
                    <video src={m.url} controls className="h-52 w-full object-cover" />
                  ) : (
                    <img src={m.url} alt={m.caption ?? ""} className="h-52 w-full object-cover" />
                  )}
                  <div className="p-3">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary">
                      {m.type === "video" ? (
                        <Video className="h-3.5 w-3.5" />
                      ) : (
                        <ImageIcon className="h-3.5 w-3.5" />
                      )}{" "}
                      {m.type}
                    </div>
                    <div className="mt-1 truncate text-sm font-semibold">
                      {m.caption || "Untitled"}
                    </div>
                    <button
                      onClick={() => deleteMedia(m)}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1.5 text-xs font-bold text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "enquiries" && (
          <div className="rounded-3xl bg-card shadow-sm">
            {enquiries.length === 0 ? (
              <div className="p-10 text-center text-muted-foreground">No enquiries yet.</div>
            ) : (
              <div className="divide-y">
                {enquiries.map((e) => (
                  <div key={e.id} className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="font-display text-lg font-bold">{e.name}</div>
                        <div className="mt-1 flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <a
                            href={`tel:${e.phone}`}
                            className="inline-flex items-center gap-1.5 hover:text-primary"
                          >
                            <Phone className="h-3.5 w-3.5" /> {e.phone}
                          </a>
                          {e.email && (
                            <a
                              href={`mailto:${e.email}`}
                              className="inline-flex items-center gap-1.5 hover:text-primary"
                            >
                              <Mail className="h-3.5 w-3.5" /> {e.email}
                            </a>
                          )}
                        </div>
                        {(e.child_name || e.child_age) && (
                          <div className="mt-2 text-sm">
                            Child: <strong>{e.child_name || "—"}</strong>
                            {e.child_age && <> · Age {e.child_age}</>}
                          </div>
                        )}
                        {e.message && (
                          <p className="mt-3 max-w-2xl rounded-xl bg-secondary/60 p-3 text-sm">
                            {e.message}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-xs text-muted-foreground">
                          {new Date(e.created_at).toLocaleString()}
                        </div>
                        <button
                          onClick={() => deleteEnquiry(e.id)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1.5 text-xs font-bold text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition ${active ? "bg-primary text-primary-foreground shadow-playful" : "bg-card text-foreground/70 hover:bg-primary/10"}`}
    >
      {icon} {children}
    </button>
  );
}
