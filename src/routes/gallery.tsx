import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { useEffect, useState } from "react";
import { X, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import friendshipPhoto from "@/assets/art-craft.jpg";
import friendship2Photo from "@/assets/classroom.jpg";
import bigSmallPhoto from "@/assets/storytelling.jpg";
import vowelsPhoto from "@/assets/outdoor-play.jpg";
import blueDayPhoto from "@/assets/dance-music.jpg";
import awardPhoto from "@/assets/yoga.jpg";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
  head: () => ({
    meta: [
      {
        title: "Gallery | Mango Kids Pre School, Trichy",
      },
      {
        name: "description",
        content:
          "Peek into life at Mango Kids Pre School — classroom moments, celebrations, activities and happy little faces.",
      },
    ],
  }),
});

const staticPhotos = [
  {
    src: friendshipPhoto,
    caption: "Our Friendship Tree",
  },
  {
    src: friendship2Photo,
    caption: "Adding My Handprint",
  },
  {
    src: bigSmallPhoto,
    caption: "Big & Small Activity",
  },
  {
    src: vowelsPhoto,
    caption: "Learning Vowels",
  },
  {
    src: blueDayPhoto,
    caption: "Blue Day Celebration",
  },
  {
    src: awardPhoto,
    caption: "Award Ceremony",
  },
];

const staticVideos = [
  {
    title: "Annual Day Performance",
    thumb: blueDayPhoto,
  },
  {
    title: "Storytelling Session",
    thumb: friendshipPhoto,
  },
  {
    title: "Yoga for Kids",
    thumb: bigSmallPhoto,
  },
];

function Gallery() {
  const [tab, setTab] = useState<"photos" | "videos">("photos");

  const [lightbox, setLightbox] = useState<{
    src: string;
    caption: string;
  } | null>(null);

  const [uploaded, setUploaded] = useState<
    {
      id: string;
      type: string;
      url: string;
      caption: string | null;
    }[]
  >([]);

  useEffect(() => {
    async function loadGallery() {
      const { data } = await supabase
        .from("gallery_media")
        .select("id,type,url,caption")
        .order("created_at", { ascending: false });

      setUploaded(data ?? []);
    }

    loadGallery();
  }, []);

  const photos = [
    ...uploaded
      .filter((item) => item.type === "photo")
      .map((item) => ({
        src: item.url,
        caption: item.caption ?? "",
      })),
    ...staticPhotos,
  ];

  const videos = [
    ...uploaded
      .filter((item) => item.type === "video")
      .map((item) => ({
        title: item.caption ?? "Video",
        thumb: item.url,
      })),
    ...staticVideos,
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Gallery"
        title="Little Moments, Big Memories"
        subtitle="Every day is a new adventure. Here's a glimpse of the joy that fills our classrooms."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex justify-center gap-3">
          <button
            onClick={() => setTab("photos")}
            className={`rounded-full px-6 py-2 font-bold transition ${
              tab === "photos" ? "bg-primary text-primary-foreground" : "bg-secondary"
            }`}
          >
            Photos
          </button>

          <button
            onClick={() => setTab("videos")}
            className={`rounded-full px-6 py-2 font-bold transition ${
              tab === "videos" ? "bg-primary text-primary-foreground" : "bg-secondary"
            }`}
          >
            Videos
          </button>
        </div>

        {tab === "photos" && (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {photos.map((photo) => (
              <button
                key={photo.src}
                onClick={() => setLightbox(photo)}
                className="group relative overflow-hidden rounded-2xl shadow-lg"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-left text-white opacity-0 transition group-hover:opacity-100">
                  {photo.caption}
                </div>
              </button>
            ))}
          </div>
        )}

        {tab === "videos" && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {videos.map((video) => (
              <div
                key={video.title}
                className="group relative overflow-hidden rounded-2xl shadow-lg"
              >
                <img src={video.thumb} alt={video.title} className="h-64 w-full object-cover" />

                <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition group-hover:bg-black/60">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-primary">
                    <Play className="h-8 w-8 fill-current" />
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-center text-white font-semibold">
                  {video.title}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-5 top-5 rounded-full bg-white/20 p-2 text-white"
          >
            <X className="h-6 w-6" />
          </button>

          <figure className="max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.caption}
              className="max-h-[80vh] rounded-2xl object-contain"
            />

            <figcaption className="mt-4 text-center text-lg text-white">
              {lightbox.caption}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
