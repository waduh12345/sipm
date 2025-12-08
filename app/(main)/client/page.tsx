"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// --- DATA SERVICES (6 Items) ---
const SERVICES = [
  { 
    id: 1, 
    title: "Energy & Mining", 
    slug: "energy-mining", // Ini untuk URL tujuan
    description: "Legal solutions for oil, gas, and renewable energy sectors.",
    image: "http://ssek.com/wp-content/uploads/2022/07/img-07.jpeg" // Ganti dengan gambar relevan
  },
  { 
    id: 2, 
    title: "Banking & Finance", 
    slug: "banking-finance",
    description: "Comprehensive advisory for financial institutions and fintech.",
    image: "http://ssek.com/wp-content/uploads/2022/07/SSEK_Website-Photo_Our-Attorney-Page.jpg"
  },
  { 
    id: 3, 
    title: "Technology & TMT", 
    slug: "technology",
    description: "Navigating regulations for digital platforms and startups.",
    image: "http://ssek.com/wp-content/uploads/2022/07/img-07.jpeg"
  },
  { 
    id: 4, 
    title: "Consumer Goods", 
    slug: "consumer-goods",
    description: "Supporting manufacturing, distribution, and retail giants.",
    image: "http://ssek.com/wp-content/uploads/2022/07/SSEK_Website-Photo_Our-Attorney-Page.jpg"
  },
  { 
    id: 5, 
    title: "Healthcare", 
    slug: "healthcare",
    description: "Regulatory compliance for hospitals and pharmaceuticals.",
    image: "http://ssek.com/wp-content/uploads/2022/07/img-07.jpeg"
  },
  { 
    id: 6, 
    title: "Transportation", 
    slug: "transportation",
    description: "Aviation, maritime, and logistics legal frameworks.",
    image: "http://ssek.com/wp-content/uploads/2022/07/SSEK_Website-Photo_Our-Attorney-Page.jpg"
  },
];

export default function OurClientsPage() {
  // State untuk menyimpan service mana yang sedang di-hover
  // Defaultnya adalah service pertama
  const [activeService, setActiveService] = useState(SERVICES[0]);

  return (
    <div className="min-h-screen font-sans text-[#57595f] selection:bg-[#2f4e9b] selection:text-white bg-[#f7fbff]">
      
      <SiteHeader />

      {/* --- CONTENT SPACER --- */}
      <div className="h-24 lg:h-32"></div>

      {/* --- MAIN SPLIT SECTION --- */}
      <section className="min-h-[80vh] flex flex-col justify-center py-10">
        <div className="container mx-auto px-6">
          
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">
            
            {/* --- LEFT COLUMN: LIST SERVICES --- */}
            <div className="lg:w-1/2 flex flex-col justify-center">
                
                {/* Section Title */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b] mb-4">
                        <span className="w-1 h-3 bg-[#a3238e] -skew-x-12 inline-block"></span>
                        Our Expertise
                    </div>
                    <h1 className="text-3xl lg:text-5xl font-light text-[#2f4e9b] leading-tight">
                        Industries We Serve
                    </h1>
                </div>

                {/* The List */}
                <div className="flex flex-col">
                    {SERVICES.map((service) => (
                        <Link 
                            key={service.id}
                            href={`/client/${service.slug}`} // Link ke halaman detail
                            className="group relative border-b border-[#2f4e9b]/20 py-6 lg:py-8 cursor-pointer transition-all duration-300"
                            onMouseEnter={() => setActiveService(service)} // Ubah gambar saat hover
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className={`text-2xl lg:text-3xl font-light transition-colors duration-300 ${activeService.id === service.id ? "text-[#a3238e]" : "text-[#2f4e9b] group-hover:text-[#2f4e9b]"}`}>
                                        {service.title}
                                    </h3>
                                    {/* Description hanya muncul jika aktif/hover */}
                                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeService.id === service.id ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`}>
                                        <p className="text-sm text-gray-500 font-light">{service.description}</p>
                                    </div>
                                </div>

                                {/* Icon Arrow */}
                                <ArrowUpRight className={`w-6 h-6 transition-all duration-300 ${activeService.id === service.id ? "text-[#a3238e] rotate-45" : "text-gray-300 group-hover:text-[#2f4e9b]"}`} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* --- RIGHT COLUMN: DYNAMIC IMAGE --- */}
            <div className="lg:w-1/2 relative hidden lg:block h-[600px] sticky top-32">
                <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeService.id}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            <Image 
                                src={activeService.image} 
                                alt={activeService.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Overlay Gradient agar teks di atas gambar terbaca (opsional) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2f4e9b]/40 to-transparent mix-blend-multiply" />
                            
                            {/* Label Overlay Pojok Kanan Bawah */}
                            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm px-6 py-3 border-l-4 border-[#a3238e]">
                                <span className="block text-xs uppercase tracking-widest text-gray-500">View Clients In</span>
                                <span className="block text-xl font-medium text-[#2f4e9b]">{activeService.title}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- MOBILE IMAGE FALLBACK (Hanya muncul di HP) --- */}
      <section className="lg:hidden pb-20 px-6">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
             <Image 
                src={activeService.image} 
                alt={activeService.title}
                fill
                className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
                <p className="text-xs uppercase">Selected Industry</p>
                <p className="font-bold">{activeService.title}</p>
            </div>
        </div>
        <div className="mt-6 text-center">
            <Link href={`/clients/${activeService.slug}`} className="inline-flex items-center gap-2 bg-[#2f4e9b] text-white px-6 py-3 rounded-sm uppercase tracking-widest text-xs hover:bg-[#a3238e] transition-colors">
                View Clients <ArrowRight size={16}/>
            </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}