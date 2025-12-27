"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useLanguage } from "@/contexts/LanguageContext"; // 1. Import Context

export default function OurClientsPage() {
  const { t } = useLanguage(); // 2. Gunakan Hook

  // 3. Definisikan Data di dalam komponen agar dinamis sesuai bahasa
  const SERVICES = [
    {
      id: 1,
      title: t.client.industries[0].title,
      description: t.client.industries[0].desc,
      slug: "energy-mining",
      image: "http://ssek.com/wp-content/uploads/2022/07/img-07.jpeg",
    },
    {
      id: 2,
      title: t.client.industries[1].title,
      description: t.client.industries[1].desc,
      slug: "banking-finance",
      image:
        "http://ssek.com/wp-content/uploads/2022/07/SSEK_Website-Photo_Our-Attorney-Page.jpg",
    },
    {
      id: 3,
      title: t.client.industries[2].title,
      description: t.client.industries[2].desc,
      slug: "technology",
      image: "http://ssek.com/wp-content/uploads/2022/07/img-07.jpeg",
    },
    {
      id: 4,
      title: t.client.industries[3].title,
      description: t.client.industries[3].desc,
      slug: "consumer-goods",
      image:
        "http://ssek.com/wp-content/uploads/2022/07/SSEK_Website-Photo_Our-Attorney-Page.jpg",
    },
    {
      id: 5,
      title: t.client.industries[4].title,
      description: t.client.industries[4].desc,
      slug: "healthcare",
      image: "http://ssek.com/wp-content/uploads/2022/07/img-07.jpeg",
    },
    {
      id: 6,
      title: t.client.industries[5].title,
      description: t.client.industries[5].desc,
      slug: "transportation",
      image:
        "http://ssek.com/wp-content/uploads/2022/07/SSEK_Website-Photo_Our-Attorney-Page.jpg",
    },
  ];

  // 4. State menyimpan ID aktif
  const [activeId, setActiveId] = useState(1);

  // Cari object service berdasarkan ID yang aktif
  const activeService = SERVICES.find((s) => s.id === activeId) || SERVICES[0];

  return (
    <div className="min-h-screen font-sans text-gray-600 selection:bg-[#2f4e9b] selection:text-white bg-white">
      <SiteHeader />

      {/* --- CONTENT SPACER --- */}
      {/* PERUBAHAN: h-28 jadi h-24 di mobile agar konten naik sedikit */}
      <div className="h-24 lg:h-32"></div>

      {/* --- MAIN SPLIT SECTION --- */}
      {/* PERUBAHAN: py-12 jadi py-10 di mobile */}
      <section className="min-h-[80vh] flex flex-col justify-center py-10 lg:py-20">
        <div className="container mx-auto px-6">
          {/* PERUBAHAN: gap-12 jadi gap-8 di mobile */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-start">
            {/* --- LEFT COLUMN: LIST SERVICES --- */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              {/* Section Title */}
              {/* PERUBAHAN: mb-12 jadi mb-8 di mobile */}
              <div className="mb-8 lg:mb-12">
                <div className="flex items-center gap-3 uppercase text-xs font-bold tracking-[0.2em] text-[#2f4e9b] mb-4">
                  <span className="w-8 h-[2px] bg-[#2f4e9b]"></span>
                  {t.client.label}
                </div>
                <h1 className="text-3xl lg:text-5xl font-light text-gray-900 leading-tight">
                  {t.client.heroTitle}
                </h1>
              </div>

              {/* The List */}
              <div className="flex flex-col border-t border-gray-100">
                {SERVICES.map((service) => (
                  <div
                    key={service.id}
                    // PERUBAHAN: py-6 jadi py-5 di mobile agar list lebih rapat
                    className={`group relative border-b border-gray-100 py-5 lg:py-8 cursor-pointer transition-all duration-500 flex items-center justify-between
                                ${
                                  activeId === service.id
                                    ? "pl-4 bg-gray-50/50"
                                    : "hover:pl-4 hover:bg-gray-50"
                                }`}
                    onMouseEnter={() => setActiveId(service.id)}
                    onClick={() => setActiveId(service.id)} // Support tap di mobile
                  >
                    <div className="w-full">
                      <h3
                        className={`text-2xl lg:text-3xl font-light transition-colors duration-300 flex items-center gap-4 
                                    ${
                                      activeId === service.id
                                        ? "text-[#2f4e9b]"
                                        : "text-gray-800 group-hover:text-[#2f4e9b]"
                                    }`}
                      >
                        {service.title}
                        {activeId === service.id && (
                          <ArrowRight className="w-5 h-5 opacity-0 animate-fadeIn ml-2" />
                        )}
                      </h3>
                      {/* Description Animation */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          activeId === service.id
                            ? "max-h-32 opacity-100 mt-3"
                            : "max-h-0 opacity-0 mt-0"
                        }`}
                      >
                        <p className="text-sm text-gray-500 font-light leading-relaxed max-w-md">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Active Indicator (Border Left) */}
                    <div
                      className={`absolute left-0 top-0 h-full w-[3px] bg-[#2f4e9b] transition-all duration-300 ${
                        activeId === service.id
                          ? "opacity-100 scale-y-100"
                          : "opacity-0 scale-y-0"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* --- RIGHT COLUMN: DYNAMIC IMAGE (Sticky) --- */}
            <div className="lg:w-1/2 relative hidden lg:block h-[600px] sticky top-32">
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeService.image}
                      alt={activeService.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Overlay Gradient Halus */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Label Overlay - Clean Style */}
                    <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-md p-6 border-l-4 border-[#2f4e9b] shadow-lg max-w-xs">
                      <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                        {t.client.viewLabel}
                      </span>
                      <span className="block text-xl font-medium text-gray-900">
                        {activeService.title}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MOBILE IMAGE FALLBACK --- */}
      {/* PERUBAHAN: pb-20 jadi pb-12 di mobile agar tidak terlalu jauh dari footer */}
      <section className="lg:hidden pb-12 px-6">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full h-full"
            >
              <Image
                src={activeService.image}
                alt={activeService.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 border-t border-gray-100">
                <p className="text-[10px] uppercase tracking-widest text-gray-400">
                  {t.client.selectedLabel}
                </p>
                <p className="font-bold text-gray-900">{activeService.title}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}