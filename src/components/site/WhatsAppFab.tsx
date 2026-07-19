import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/918778667028?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Mango%20Kids%20Pre%20School"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 font-bold text-white shadow-playful transition hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" /> <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
