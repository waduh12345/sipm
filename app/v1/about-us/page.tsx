"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useLanguage } from "@/contexts/LanguageContext"; // 1. Import Context

export default function OurFirmPage() {
  const { t } = useLanguage(); // 2. Gunakan Hook
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 3. Data Timeline dipindah ke dalam component supaya dinamis
  const JOURNEY_DATA = [
    { year: "2013", title: "2008 - 2013", text: t.about.history.item1 },
    { year: "2019", title: "2014 - 2019", text: t.about.history.item2 },
    { year: "2025", title: "2020 - 2025", text: t.about.history.item3 },
  ];

  // Scroll handler untuk navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handler scroll timeline journey
  const scrollJourney = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 350;
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-600 selection:bg-[#2f4e9b] selection:text-white bg-white">
      {/* --- HEADER --- */}
      <SiteHeader />

      {/* --- CONTENT SPACER --- */}
      {/* PERUBAHAN: h-28 jadi h-24 di mobile agar konten naik sedikit */}
      <div className="h-24 lg:h-32"></div>

      {/* --- INTRO SECTION --- */}
      {/* PERUBAHAN: py-12 jadi py-10 di mobile */}
      <section className="py-10 lg:py-20">
        <div className="container mx-auto px-6">
          {/* Header Title */}
          {/* PERUBAHAN: mb-16 jadi mb-8 di mobile */}
          <div className="flex flex-col items-start mb-8 lg:mb-16">
            <div className="flex items-center gap-3 uppercase text-xs font-bold tracking-[0.2em] text-[#2f4e9b] mb-4">
              <span className="w-8 h-[2px] bg-[#2f4e9b]"></span>
              {t.about.sectionLabel}
            </div>
            <h2 className="text-3xl lg:text-5xl font-light text-gray-900 leading-tight">
              {t.about.heroTitle}{" "}
              <span className="text-[#2f4e9b] font-medium">
                Jon Bernard & Associates
              </span>
            </h2>
          </div>

          {/* Content Split */}
          {/* PERUBAHAN: gap-12 jadi gap-8 di mobile */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">
            <div className="lg:w-1/2 relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-sm">
              <Image
                src="/about-image.jpg"
                alt="Our Firm Meeting"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center">
              <h3 className="text-xl text-[#2f4e9b] font-normal leading-relaxed mb-4 lg:mb-6 text-justify lg:text-left border-l-4 border-[#58b0e3] pl-6">
                {t.about.heroIntro}
              </h3>
              <div className="text-gray-600 font-light leading-relaxed space-y-4 lg:space-y-6 text-base text-justify lg:text-left">
                <p>{t.about.heroDesc1}</p>
                <p>{t.about.heroDesc2}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- JOURNEY SECTION --- */}
      {/* PERUBAHAN: py-24 jadi py-12 md:py-24 */}
      <section className="bg-[#2f4e9b] py-12 md:py-24 text-white overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

        {/* PERUBAHAN: mb-12 jadi mb-8 di mobile */}
        <div className="container mx-auto px-6 mb-8 lg:mb-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4 uppercase text-xs font-bold tracking-[0.2em] text-[#58b0e3]">
                <span className="w-8 h-[2px] bg-[#58b0e3]"></span>
                {t.about.history.label}
              </div>
              <h3 className="text-3xl lg:text-4xl font-light text-white">
                {t.about.history.title}
              </h3>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => scrollJourney("left")}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#2f4e9b] transition-all duration-300"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollJourney("right")}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#2f4e9b] transition-all duration-300"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Slider */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 md:gap-6 px-6 pb-4 snap-x scrollbar-hide container mx-auto"
        >
          {JOURNEY_DATA.map((item, idx) => (
            <div
              key={idx}
              className="min-w-[80vw] md:min-w-[45vw] lg:min-w-[28vw] snap-start bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col h-[300px] md:h-[450px] relative overflow-hidden group hover:bg-white/20 transition-all duration-300"
            >
              {/* <div className="text-[60px] md:text-[80px] font-bold text-white/10 absolute -top-4 md:-top-6 -right-2 md:-right-4 select-none leading-none group-hover:text-white/20 transition-colors">
                {item.year}
              </div> */}
              <div className="relative z-10 mt-auto">
                <div className="w-12 h-1 bg-[#58b0e3] mb-4 md:mb-6"></div>
                <h4 className="text-xl md:text-2xl font-medium mb-3 md:mb-4">
                  {item.title}
                </h4>
                <p className="text-sm lg:text-base font-light leading-relaxed text-white/80 text-justify">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- MANAGING PARTNER SECTION --- */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-6">
          {/* PERUBAHAN: gap-12 jadi gap-8 */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
            {/* Image Column */}
            <div className="w-full lg:w-1/3 flex-shrink-0">
              <div className="relative w-full aspect-[4/3] md:aspect-[4/4] rounded-2xl overflow-hidden shadow-lg border border-gray-100 group">
                <Image
                  src="https://jonb-lawfirm.com/wp-content/uploads/2017/04/foto.png"
                  alt="Jon Bernard Pasaribu"
                  fill
                  className="group-hover:scale-105 transition-transform duration-700"
                />
                {/* Name overlay on mobile */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6 lg:hidden">
                  <p className="text-white font-medium">Jon Bernard Pasaribu</p>
                </div>
              </div>
            </div>

            {/* Text Column */}
            <div className="flex-1 lg:w-2/3">
              <div className="mb-6">
                <h4 className="text-[#2f4e9b] text-sm uppercase tracking-widest font-bold mb-2">
                  {t.about.founder.label}
                </h4>
                <h3 className="text-2xl lg:text-3xl text-gray-900 font-light mb-4 lg:mb-6">
                  JON BERNARD PASARIBU, S.H., M.H.
                </h3>
                <div className="h-[2px] w-20 bg-[#2f4e9b]"></div>
              </div>

              <div className="text-gray-600 font-light space-y-4 text-justify leading-relaxed">
                <p>{t.about.founder.bio1}</p>
                <p>{t.about.founder.bio2}</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 pl-4 list-disc marker:text-[#2f4e9b]">
                  {t.about.founder.areas.map((area, idx) => (
                    <li key={idx}>{area}</li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-gray-100 mt-6">
                  <p className="font-light italic text-sm text-gray-500">
                    {t.about.founder.footer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ASSOCIATES SECTION --- */}
      {/* PERUBAHAN: py-20 jadi py-12 lg:py-20 */}
      <section className="py-12 lg:py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6">
          {/* PERUBAHAN: mb-12 jadi mb-8 */}
          <div className="flex items-center gap-3 mb-8 lg:mb-12 uppercase text-xs font-bold tracking-[0.2em] text-[#2f4e9b]">
            <span className="w-8 h-[2px] bg-[#2f4e9b]"></span>
            {t.about.associates.label}
          </div>

          {/* PERUBAHAN: space-y-20 jadi space-y-12 lg:space-y-20 */}
          <div className="space-y-12 lg:space-y-20">
            {/* Andy Section */}
            {/* PERUBAHAN: gap-12 jadi gap-8 */}
            <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-16 items-start">
              <div className="w-full lg:w-1/4 shrink-0">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm border border-gray-200">
                  <Image
                    src="/profile-default.jpeg"
                    alt="Andy Edward Pasaribu"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl text-gray-900 font-light mb-2">
                  Andy Edward Pasaribu, SH.
                </h3>
                <p className="text-[#2f4e9b] text-sm font-medium tracking-wide mb-4 lg:mb-6">
                  {t.about.associates.role}
                </p>

                <div className="text-gray-600 font-light space-y-4 text-justify leading-relaxed">
                  <p>{t.about.associates.andy.bio1}</p>
                  <p>{t.about.associates.andy.bio2}</p>
                  <p className="text-sm font-medium text-gray-800">
                    {t.about.associates.andy.lang}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-gray-200"></div>

            {/* Felix Section */}
            {/* PERUBAHAN: gap-12 jadi gap-8 */}
            <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-16 items-start">
              <div className="w-full lg:w-1/4 shrink-0">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm border border-gray-200">
                  <Image
                    src="/profile-default.jpeg"
                    alt="Felix Nixon Hawer N Mahulae"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl text-gray-900 font-light mb-2">
                  Felix Nixon Hawer N Mahulae, S.E., S.H.
                </h3>
                <p className="text-[#2f4e9b] text-sm font-medium tracking-wide mb-4 lg:mb-6">
                  {t.about.associates.role}
                </p>

                <div className="text-gray-600 font-light space-y-4 text-justify leading-relaxed">
                  <p>{t.about.associates.felix.bio1}</p>
                  <p>{t.about.associates.felix.bio2}</p>
                  <p className="text-sm font-medium text-gray-800">
                    {t.about.associates.felix.lang}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <SiteFooter />
    </div>
  );
}