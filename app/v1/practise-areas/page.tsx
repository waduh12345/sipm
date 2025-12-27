"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useLanguage } from "@/contexts/LanguageContext"; // 1. Import Context

export default function OurExpertisePage() {
  const { t } = useLanguage(); // 2. Gunakan Hook
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="min-h-screen font-sans text-gray-600 bg-white selection:bg-[#2f4e9b] selection:text-white">
      {/* --- HEADER --- */}
      <SiteHeader />

      {/* --- CONTENT SPACER --- */}
      {/* PERUBAHAN: h-28 jadi h-24 di mobile agar konten naik sedikit */}
      <div className="h-24 lg:h-32"></div>

      {/* --- HERO SECTION --- */}
      {/* PERUBAHAN: py-12 jadi py-10 */}
      <section className="pt-10 lg:py-20">
        <div className="container mx-auto px-6">
          {/* Intro Text */}
          {/* PERUBAHAN: mb-16 jadi mb-8 di mobile */}
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto mb-8 lg:mb-16">
            <div className="flex items-center gap-3 uppercase text-xs font-bold tracking-[0.2em] text-[#2f4e9b] mb-4 lg:mb-6">
              <span className="w-8 h-[2px] bg-[#2f4e9b]"></span>
              {t.expertise.label}
            </div>
            {/* PERUBAHAN: mb-8 jadi mb-6 */}
            <h2 className="text-2xl lg:text-4xl font-light text-gray-900 leading-tight mb-6 lg:mb-8">
              {t.expertise.hero.title}
            </h2>
            <p className="text-lg lg:text-xl text-gray-500 font-light leading-relaxed">
              {t.expertise.hero.desc}
            </p>
          </div>

          {/* Large Image */}
          {/* PERUBAHAN: mb-20 jadi mb-10 di mobile */}
          <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] mb-10 lg:mb-20 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <Image
              src="/WhatsApp Image 2025-12-08 at 18.09.38.jpeg"
              alt="Our Expertise Meeting"
              fill
              className="object-cover hover:scale-105 transition-transform duration-1000"
              priority
            />
          </div>

          {/* Practice Areas Intro */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start mb-12 lg:mb-24 border-b border-gray-100 pb-8 lg:pb-12">
            <div className="lg:w-1/3">
              <h3 className="text-2xl lg:text-3xl text-gray-900 font-light mb-4">
                {t.expertise.intro.title}
              </h3>
              <div className="w-16 h-1 bg-[#2f4e9b]"></div>
            </div>
            <div className="lg:w-2/3">
              <p className="text-gray-600 font-light leading-relaxed text-base lg:text-lg text-justify">
                {t.expertise.intro.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- ACCORDION LIST --- */}
      <section className="pb-2 lg:pb-32 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col">
            {/* 3. Map Data dari Translation (t.expertise.list) */}
            {t.expertise.list.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-100 last:border-0"
              >
                {/* Header Accordion */}
                <div
                  onClick={() => toggleAccordion(index)}
                  className="py-6 lg:py-8 cursor-pointer flex justify-between items-center group select-none"
                >
                  <h4
                    className={`text-lg lg:text-2xl font-light transition-colors duration-300 pr-4 lg:pr-8 ${
                      activeAccordion === index
                        ? "text-[#2f4e9b]"
                        : "text-gray-800 group-hover:text-[#2f4e9b]"
                    }`}
                  >
                    {item.title}
                  </h4>

                  {/* Animated Plus/Minus Icon */}
                  <div className="relative w-8 h-8 flex items-center justify-center shrink-0 border border-gray-200 rounded-full group-hover:border-[#2f4e9b] transition-colors">
                    {/* Horizontal line */}
                    <div
                      className={`absolute w-3 h-[1.5px] bg-current transition-colors ${
                        activeAccordion === index
                          ? "bg-[#2f4e9b]"
                          : "bg-gray-400 group-hover:bg-[#2f4e9b]"
                      }`}
                    ></div>
                    {/* Vertical line */}
                    <motion.div
                      initial={false}
                      animate={{
                        rotate: activeAccordion === index ? 90 : 0,
                        opacity: activeAccordion === index ? 0 : 1,
                      }}
                      className="absolute h-3 w-[1.5px] bg-gray-400 group-hover:bg-[#2f4e9b]"
                    ></motion.div>
                  </div>
                </div>

                {/* Content Accordion */}
                <AnimatePresence>
                  {activeAccordion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      {/* PERUBAHAN: pb-10 jadi pb-8 */}
                      <div className="pb-8 lg:pb-10 pl-0 lg:pl-4">
                        <div className="flex flex-col gap-3 lg:gap-4">
                          <div className="flex items-center gap-2 uppercase text-[10px] font-bold tracking-widest text-gray-400">
                            Overview
                          </div>
                          <p className="text-gray-600 font-light leading-relaxed text-base lg:text-lg">
                            {item.overview}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <SiteFooter />
    </div>
  );
}