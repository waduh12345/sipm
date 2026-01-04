"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

// Services
import { useGetPengaturanListQuery } from "@/services/customize/setting.service";

const BASE_IMAGE_URL = "https://api-content-web.naditechno.id/media/";

// Helper Safe Image
const safeImage = (img: string | null | undefined, fallback: string) => {
  if (typeof img === "string" && img.length > 0) {
    return img.startsWith("http") ? img : `${BASE_IMAGE_URL}${img}`;
  }
  return fallback;
};

function SiteHeaderContent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/v1";

  const { language, setLanguage, t } = useLanguage();

  // --- FETCH SETTINGS (Read Only di Header) ---
  // Kita hardcode clientCode di sini atau ambil dari context global jika ada
  const clientCode =
    "$2b$10$/pdGKqOqU7wOJUheZ07.H.AqTam8PZv5oLDtdxB5zT.25h3x491vy";

  const { data: settingsData } = useGetPengaturanListQuery(
    { client_code: clientCode },
    { skip: !clientCode }
  );

  const settings = settingsData?.data?.items?.[0];
  const logoUrl = safeImage(settings?.logo, "/logo-footer.png");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logic Warna & Style (Sama seperti sebelumnya)
  const textColorClass = isScrolled
    ? "text-gray-800"
    : isHome
    ? "text-white"
    : "text-gray-800";

  const hoverColorClass =
    isScrolled || !isHome ? "hover:text-[#2f4e9b]" : "hover:text-white/70";

  const langContainerClass =
    isScrolled || !isHome
      ? "bg-gray-100 border-gray-200 text-gray-500"
      : "bg-white/10 border-white/20 text-white/70 backdrop-blur-sm";

  const menuItems = [
    { name: t.nav.about, href: "/v1/about-us" },
    { name: t.nav.practice, href: "/v1/practise-areas" },
    { name: t.nav.client, href: "/v1/client" },
    { name: t.nav.article, href: "/v1/blog" },
    { name: t.nav.contact, href: "/v1/contact-us" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md py-3 shadow-sm border-b border-gray-100"
            : "bg-transparent py-6 border-b border-gray-400/30"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* --- DYNAMIC LOGO --- */}
          <Link href="/" className="relative z-50 block">
            <div
              className={`relative transition-all duration-300 ${
                isScrolled ? "h-14 w-40" : "h-20 w-52"
              }`}
            >
              <Image
                src={logoUrl}
                alt={settings?.judul || "Jon Bernard & Associates"}
                className="object-contain"
                fill
                priority
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            <nav
              className={`flex items-center gap-8 uppercase text-[13px] tracking-[0.1em] font-semibold transition-colors duration-300 ${textColorClass}`}
            >
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-all duration-300 ${hoverColorClass}`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-6">
              {/* Language Switcher */}
              <div
                className={`flex items-center p-1 rounded-full border transition-all duration-300 ${langContainerClass}`}
              >
                <button
                  onClick={() => setLanguage("id")}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all duration-300 ${
                    language === "id"
                      ? "bg-[#2f4e9b] text-white shadow-sm"
                      : "hover:text-[#2f4e9b]"
                  }`}
                >
                  ID
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all duration-300 ${
                    language === "en"
                      ? "bg-[#2f4e9b] text-white shadow-sm"
                      : "hover:text-[#2f4e9b]"
                  }`}
                >
                  EN
                </button>
              </div>

              <Link href="/v1/lets-talk">
                <button className="bg-[#58b0e3] hover:bg-[#2f4e9b] text-white rounded-full px-7 py-3 text-[12px] font-bold uppercase tracking-[0.15em] transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                  {t.nav.letsTalk}
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Section */}
          <div className="flex items-center gap-4 lg:hidden">
            <div
              className={`flex items-center p-0.5 rounded-full border ${langContainerClass}`}
            >
              <button
                onClick={() => setLanguage("id")}
                className={`w-7 h-7 flex items-center justify-center rounded-full text-[10px] font-bold transition-all ${
                  language === "id" ? "bg-[#2f4e9b] text-white" : ""
                }`}
              >
                ID
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`w-7 h-7 flex items-center justify-center rounded-full text-[10px] font-bold transition-all ${
                  language === "en" ? "bg-[#2f4e9b] text-white" : ""
                }`}
              >
                EN
              </button>
            </div>

            <button
              className={`z-50 transition-colors duration-300 ${textColorClass}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X size={28} className="text-gray-800" />
              ) : (
                <Menu size={28} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-0 w-full h-screen bg-white pt-28 px-6 flex flex-col z-40"
            >
              {/* Mobile Menu Content (Sama seperti sebelumnya) */}
              <nav className="flex flex-col gap-6 text-gray-800 text-xl font-light">
                <Link
                  href="/v1/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-gray-100 pb-4 hover:text-[#58b0e3]"
                >
                  {" "}
                  {t.nav.home}{" "}
                </Link>
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="border-b border-gray-100 pb-4 hover:text-[#58b0e3] transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/v1/lets-talk"
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-gray-100 pb-4 hover:text-[#58b0e3]"
                >
                  {" "}
                  {t.nav.letsTalk}{" "}
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

export function SiteHeader() {
  return (
    <Suspense fallback={<div>Loading Header...</div>}>
      <SiteHeaderContent />
    </Suspense>
  );
}