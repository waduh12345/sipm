"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useLanguage } from "@/contexts/LanguageContext"; // 1. Import Context

export default function HomePage() {
  const { t } = useLanguage(); // 2. Gunakan Hook
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // 3. Pindahkan Data Slide ke dalam component agar teksnya dinamis
  const HERO_SLIDES = [
    {
      id: 1,
      title: t.home.slides.insurance, // Gunakan translasi
      image: "/slide/slide-asuransi-dan-reasuransi.webp",
      link: "#"
    },
    {
      id: 2,
      title: t.home.slides.corp,
      image: "/slide/slide-litigasi-koorporasi.webp",
      link: "#"
    },
    {
      id: 3,
      title: t.home.slides.criminal,
      image: "/slide/slide-litigasi-kriminal.webp",
      link: "#"
    },
    {
      id: 4,
      title: t.home.slides.ip,
      image: "/slide/slide-kekayaan-intelektual-informasi-teknologi.webp",
      link: "#"
    }
  ];

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto slide hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [HERO_SLIDES.length]); // Dependency updated

  return (
    <div className="min-h-screen font-sans text-gray-600 selection:bg-[#2f4e9b] selection:text-white bg-white">
      {/* --- HEADER / NAVBAR --- */}
      <SiteHeader />

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/WhatsApp Image 2025-12-08 at 18.01.25.jpeg"
            alt="Building"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay Gradient agar teks terbaca lebih jelas */}
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>

        <div className="container mx-auto px-6 h-full relative z-20 flex flex-col justify-center">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center lg:justify-between w-full h-full pt-20 lg:pt-0">
            {/* Left Text */}
            <div className="lg:w-8/12">
              <h2 className="text-2xl lg:text-5xl font-light text-[#FCD400] leading-tight relative inline-block mb-4">
                {t.home.hero.welcome}
              </h2>
              <div className="flex flex-col items-start gap-1 mb-6 text-[#FCD400] uppercase text-sm md:text-xl tracking-[0.15em] font-semibold whitespace-pre-line leading-snug">
                {t.home.hero.subtitle}
              </div>
              <h2 className="text-lg lg:text-3xl font-light text-white leading-snug max-w-4xl">
                {t.home.hero.desc}
              </h2>
              <Button className="mt-10 border border-white bg-transparent hover:bg-white hover:text-[#2f4e9b] text-white rounded-full px-10 py-6 text-xs uppercase tracking-wider transition-all duration-300">
                {t.home.hero.cta}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- OUR EXPERTISE --- */}
      <section className="py-10 md:py-32 bg-[#f7fbff]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full">
              <div className="flex items-center gap-3 mb-6 uppercase text-xs font-bold tracking-[0.2em] text-[#2f4e9b]">
                <span className="w-8 h-[2px] bg-[#2f4e9b]"></span>
                {t.home.expertise.title}
              </div>

              <div className="text-gray-600 font-light leading-relaxed mb-0 text-base lg:text-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20">
                  <div>
                    <p className="text-justify leading-relaxed">
                      {t.home.expertise.p1}
                    </p>
                  </div>
                  <div>
                    <p className="text-justify leading-relaxed">
                      {t.home.expertise.p2}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER / CONTACT --- */}
      <section className="relative py-12 md:py-32 bg-[#2f4e9b] overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 z-0 opacity-10">
          <Image
            src="/WhatsApp Image 2025-12-08 at 18.09.38.jpeg"
            alt="Meeting"
            fill
            className="object-cover"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left Text */}
          <div className="lg:w-2/3 w-full text-white">
            <div className="flex items-center gap-3 mb-4 lg:mb-6 uppercase text-xs font-bold tracking-[0.2em] text-[#FCD400]">
              <span className="w-8 h-[2px] bg-[#FCD400]"></span>
              {t.home.contact.title}
            </div>
            <p className="text-lg lg:text-2xl font-light text-white/90 leading-relaxed text-justify">
              {t.home.contact.desc}
            </p>
          </div>

          {/* Right Buttons */}
          <div className="lg:w-1/3 w-full flex flex-col items-center lg:items-end justify-center">
            <div className="flex flex-col gap-4 w-full">
              <a
                href="mailto:info@jonb-associates.com"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#2f4e9b] font-medium hover:bg-[#FCD400] hover:text-[#2f4e9b] transition-all duration-300 rounded-lg shadow-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16.5 3h-9A2.5 2.5 0 005 5.5v13A2.5 2.5 0 007.5 21h9a2.5 2.5 0 002.5-2.5v-13A2.5 2.5 0 0016.5 3zM5 7l7 5 7-5"
                  />
                </svg>
                {t.home.contact.emailBtn}
              </a>
              <a
                href="https://wa.me/6281234567890"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white font-medium hover:bg-[#128C7E] transition-all duration-300 rounded-lg shadow-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                >
                  <path d="M16 3C9.373 3 4 8.373 4 15c0 2.637.86 5.09 2.48 7.18L4 29l7.09-2.32A12.93 12.93 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.97 0-3.89-.52-5.56-1.5l-.4-.23-4.2 1.37 1.37-4.09-.26-.42A9.97 9.97 0 016 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.07-7.75c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.36-.26.28-1 1-1 2.43s1.03 2.82 1.18 3.02c.15.2 2.03 3.11 5.01 4.23.7.24 1.25.38 1.68.49.71.18 1.36.16 1.87.1.57-.07 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z" />
                </svg>
                {t.home.contact.waBtn}
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}