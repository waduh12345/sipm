"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Settings } from "lucide-react";
import { useEditMode } from "@/hooks/use-edit-mode";

// Services
import { useGetPengaturanListQuery } from "@/services/customize/setting.service";

// Components
import { GlobalSettingsModal } from "./global-setting-modal";

const BASE_IMAGE_URL = "https://api-content-web.naditechno.id/media/";

// Helper Safe Image
const safeImage = (img: string | null | undefined, fallback: string) => {
  if (typeof img === "string" && img.length > 0) {
    return img.startsWith("http") ? img : `${BASE_IMAGE_URL}${img}`;
  }
  return fallback;
};

// --- CONTENT COMPONENT (Logic & Fetching) ---
function SiteFooterContent() {
  const isEditMode = useEditMode();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- FETCH SETTINGS ---
  const clientCode =
    "$2b$10$/pdGKqOqU7wOJUheZ07.H.AqTam8PZv5oLDtdxB5zT.25h3x491vy";

  const { data: settingsData } = useGetPengaturanListQuery(
    { client_code: clientCode },
    { skip: !clientCode }
  );

  const settings = settingsData?.data?.items?.[0];
  const logoFooterUrl = safeImage(settings?.logo_footer, "/logo-footer.png");

  // Dynamic Socials Logic
  const socials = [];
  if (settings?.instagram)
    socials.push({
      name: "Instagram",
      icon: "/icons/instagram.svg",
      url: settings.instagram,
    });
  if (settings?.tiktok)
    socials.push({
      name: "TikTok",
      icon: "/icons/tiktok.svg",
      url: settings.tiktok,
    });

  // Default fallback if api empty
  if (socials.length === 0) {
    socials.push({ name: "Instagram", icon: "/icons/instagram.svg", url: "#" });
    socials.push({ name: "Twitter", icon: "/icons/twitter.svg", url: "#" });
  }

  return (
    <>
      <footer className="bg-white text-gray-600 pt-8 pb-8 md:pt-24 md:pb-10 font-sans border-t border-gray-100 relative group/footer">
        {/* EDIT BUTTON (Only in Edit Mode) */}
        {isEditMode && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute top-4 right-4 bg-yellow-500 text-black px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-xs font-bold uppercase tracking-wider hover:bg-yellow-400 transition-all z-20"
          >
            <Settings size={16} /> Edit Global Settings
          </button>
        )}

        <div className="container mx-auto px-6 h-full flex flex-col justify-between">
          {/* --- Top CTA Section --- */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-4 pb-6 md:mb-20 md:pb-10 border-b border-gray-100 group">
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl lg:text-7xl font-light tracking-tight mb-2 text-gray-900">
                Let&apos;s Talk
              </span>
              <span className="text-gray-400 text-xs md:text-sm tracking-widest uppercase">
                Ready to assist your legal needs
              </span>
            </div>

            <a
              href={`https://wa.me/${
                settings?.nomer_whatsapp || "6282122024678"
              }?text=Halo...`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group/btn"
            >
              <span className="hidden md:block text-sm uppercase tracking-widest font-medium opacity-0 group-hover/btn:opacity-100 transition-opacity transform translate-x-4 group-hover/btn:translate-x-0 duration-300 text-[#2f4e9b]">
                Chat via WhatsApp
              </span>
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-gray-200 flex items-center justify-center bg-white text-[#2f4e9b] group-hover/btn:bg-[#2f4e9b] group-hover/btn:border-[#2f4e9b] group-hover/btn:text-white transition-all duration-300 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 md:w-8 md:h-8"
                >
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.19-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.16-.36-.33-.37-.48-.37-.15 0-.32 0-.49.03-.17.03-.45.06-.68.31-.23.26-.88.86-.88 2.1s.9 2.44 1.02 2.61c.13.17 1.77 2.7 4.28 3.79 1.66.72 2.3.58 3.12.54.82-.04 1.81-.74 2.06-1.46s.25-1.33.18-1.46c-.07-.12-.26-.2-.54-.33-.28-.14-1.64-.81-1.89-.9-.26-.1-.44-.15-.62.14-.18.29-.69.86-.85 1.05-.16.19-.33.22-.61.08a7.84 7.84 0 0 1-2.29-1.41c-.69-.59-1.15-1.32-1.28-1.58-.13-.27-.01-.41.13-.54.12-.12.27-.31.4-.47.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.08-.13-.67-1.6-.92-2.19z" />
                </svg>
              </div>
            </a>
          </div>

          {/* --- Main Content: 12-Column Grid --- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-10 md:mb-20">
            {/* 1. Brand Section */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <div className="relative h-20 w-52 mb-6">
                <Image
                  src={logoFooterUrl}
                  alt={settings?.judul || "Logo Footer"}
                  fill
                  className="object-contain object-left"
                />
              </div>
              <div className="flex flex-col gap-4 text-gray-500 font-light text-md mb-8">
                <a
                  href={`mailto:${settings?.email || "info@lawfirm.com"}`}
                  className="flex items-center gap-3 hover:text-[#2f4e9b] transition-colors group"
                >
                  <Mail className="w-4 h-4 text-[#2f4e9b] group-hover:scale-110 transition-transform" />
                  {settings?.email || "info@lawfirm.com"}
                </a>
              </div>

              {/* Socials Dynamic */}
              <div className="flex gap-4">
                {socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    className="group w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-[#2f4e9b] hover:border-[#2f4e9b] transition-all cursor-pointer shadow-sm"
                  >
                    <div className="relative w-4 h-4">
                      <Image
                        src={social.icon}
                        alt={social.name}
                        fill
                        className="object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* 2. Office Section */}
            <div className="lg:col-span-4 flex flex-col">
              <h6 className="font-semibold text-xs uppercase tracking-[0.2em] text-[#2f4e9b] mb-4 md:mb-6 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-[#2f4e9b]"></span>
                Office
              </h6>

              <div className="flex flex-col gap-5 text-sm font-light text-gray-600">
                <div className="flex items-start gap-4 group">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0 group-hover:text-[#2f4e9b] transition-colors" />
                  <address className="not-italic leading-relaxed whitespace-pre-line">
                    {settings?.alamat || "Alamat belum diatur"}
                  </address>
                </div>
                <div className="flex items-center gap-4 group">
                  <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 group-hover:text-[#2f4e9b] transition-colors" />
                  <span>{settings?.no_telepon || "-"}</span>
                </div>
              </div>
            </div>

            {/* 3. Navigation */}
            <div className="lg:col-span-3 flex flex-col lg:items-end">
              <h6 className="font-semibold text-xs uppercase tracking-[0.2em] text-[#2f4e9b] mb-4 md:mb-6 flex items-center gap-2 lg:flex-row-reverse">
                <span className="w-8 h-[1px] bg-[#2f4e9b]"></span>
                Menu
              </h6>
              <nav className="flex flex-col gap-3 text-sm uppercase tracking-widest font-light text-gray-500 lg:text-right">
                {[
                  { name: "Home", url: "/" },
                  { name: "About Us", url: "/about-us" },
                  { name: "Practise Areas", url: "/practise-areas" },
                  { name: "Client", url: "/client" },
                  { name: "Article", url: "/blog" },
                  { name: "Lets Talk", url: "/lets-talk" },
                  { name: "Contact Us", url: "/contact-us" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.url}
                    className="hover:text-[#2f4e9b] hover:translate-x-2 lg:hover:-translate-x-2 transition-all duration-300 flex items-center gap-2 lg:flex-row-reverse"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* --- Bottom Section: Copyright & Legal --- */}
          <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-100 pt-6 md:pt-8">
            <div className="text-gray-400 text-[10px] uppercase tracking-wider mb-4 md:mb-0 text-center md:text-left">
              &copy; {new Date().getFullYear()}{" "}
              {settings?.judul || "Jon Bernard & Associates"}. All Rights
              Reserved.
            </div>

            <div className="flex gap-6 md:gap-8 text-[10px] text-gray-400 uppercase tracking-wider font-medium">
              <Link
                href="/privacy"
                className="hover:text-[#2f4e9b] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-[#2f4e9b] transition-colors"
              >
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* GLOBAL SETTINGS MODAL */}
      <GlobalSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        clientCode={clientCode}
      />
    </>
  );
}

// --- MAIN COMPONENT (Wrapped in Suspense) ---
export function SiteFooter() {
  return (
    <Suspense
      fallback={
        <div className="bg-white py-10 text-center text-gray-400">
          Loading Footer...
        </div>
      }
    >
      <SiteFooterContent />
    </Suspense>
  );
}