"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight
} from "lucide-react";

import { SiteHeader } from "@/components/site-header"; // Import komponen baru
import Footer from "@/components/footer/footer";

// --- DATA DUMMY (Sesuai HTML Referensi) ---
const ATTORNEYS = [
  { id: 1, name: "Ira Andamara Eddymurthy", role: "Partner", type: "Partner" },
  { id: 2, name: "Rusmaini Lenggogeni", role: "Partner", type: "Partner" },
  { id: 3, name: "Michael D. Twomey", role: "Advisor", type: "Advisor" },
  { id: 4, name: "Jonathan M. Streifer", role: "Advisor", type: "Advisor" },
  { id: 5, name: "Fitriana Mahiddin", role: "Partner", type: "Partner" },
  { id: 6, name: "Michael S. Carl", role: "Advisor", type: "Advisor" },
  { id: 7, name: "Denny Rahmansyah", role: "Partner", type: "Partner" },
  { id: 8, name: "Stephen Igor Warokka", role: "Partner", type: "Partner" },
  { id: 9, name: "Dewi Savitri Reni", role: "Partner", type: "Partner" },
  { id: 10, name: "Syahdan Z. Aziz", role: "Partner", type: "Partner" },
  { id: 11, name: "Fransiscus Rodyanto", role: "Partner", type: "Partner" },
  { id: 12, name: "Winnie Yamashita Rolindrawan", role: "Partner", type: "Partner" },
  { id: 13, name: "Indrawan Dwi Yuriutomo", role: "Associate", type: "Associate" },
  { id: 14, name: "Maria Y. Eka Dewi", role: "Associate", type: "Associate" },
  { id: 15, name: "Charvia Tjhai", role: "Associate", type: "Associate" },
  { id: 16, name: "Juven Renaldi", role: "Associate", type: "Associate" },
  { id: 17, name: "Aldilla S. Suwana", role: "Associate", type: "Associate" },
  { id: 18, name: "Vinka D. A. Larasati", role: "Associate", type: "Associate" },
  { id: 19, name: "Mutiara Kasih Ramadhani", role: "Associate", type: "Associate" },
  { id: 20, name: "Raisya Majory", role: "Associate", type: "Associate" },
  { id: 21, name: "Dicky Tanjung", role: "Associate", type: "Associate" },
];

const FILTER_OPTIONS = ["All Attorneys", "Partner", "Advisor", "Associate", "Of Counsel"];

export default function OurAttorneysPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Attorneys");

  // Scroll handler untuk navbar transisi
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter Logic
  const filteredAttorneys = selectedFilter === "All Attorneys" 
    ? ATTORNEYS 
    : ATTORNEYS.filter(att => att.type === selectedFilter);

  return (
    <div className="min-h-screen font-sans text-[#57595f] selection:bg-[#2f4e9b] selection:text-white bg-[#f7fbff]">
      
      {/* --- HEADER --- */}
      <SiteHeader />

      {/* --- CONTENT SPACER --- */}
      <div className="h-32"></div>

      {/* --- HERO / INTRO SECTION --- */}
      <section className="py-12">
        <div className="container mx-auto px-6 mb-20">
            {/* Title Block */}
            <div className="flex flex-col items-center mb-16">
                <div className="w-10/12 flex flex-col items-start gap-4">
                    <div className="flex items-center gap-3 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b]">
                        <span className="w-1 h-3 bg-[#a3238e] -skew-x-12 inline-block"></span>
                        Our Attorneys
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-light text-[#2f4e9b] leading-tight uppercase">
                        FORWARD THINKERS WITH DIVERSE AND DIFFERENT PERSPECTIVES
                    </h2>
                </div>
            </div>

            {/* Image & Text Content */}
            <div className="w-11/12 mx-auto flex flex-col items-end">
                <div className="lg:w-3/4 relative aspect-[2/1] w-full mb-10">
                    <Image 
                        src="http://ssek.com/wp-content/uploads/2022/07/SSEK_Website-Photo_Our-Attorney-Page.jpg" 
                        alt="Our Attorneys Team" 
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="lg:w-3/4 flex justify-end">
                    <div className="lg:w-2/3 text-[#57595f] font-light leading-relaxed space-y-6 text-sm lg:text-base columns-1 lg:columns-2 gap-12">
                        <p>JONB lawyers are recognized for their professional excellence and outstanding service to clients.</p>
                        <p>They are among the best-trained and most experienced Indonesian and expatriate practitioners in the country.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- FILTER & GRID SECTION --- */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
            
            {/* Filter Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-end mb-16 border-b border-[#2f4e9b]/20 pb-4">
                <div className="text-3xl lg:text-5xl font-light text-[#2f4e9b] mb-6 lg:mb-0">
                    All Profiles
                </div>
                <div className="relative min-w-[300px]">
                    <select 
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        className="w-full appearance-none bg-transparent border-b border-gray-300 py-3 pr-10 text-xl lg:text-2xl text-[#2f4e9b] focus:outline-none cursor-pointer"
                    >
                        {FILTER_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    {/* Custom Plus Sign Arrow */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                        <div className="relative w-6 h-6">
                            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#2f4e9b]"></div>
                            <div className="absolute left-1/2 top-0 h-full w-[1px] bg-[#2f4e9b]"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Attorneys Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 border-b border-[#2f4e9b] pb-20">
                <AnimatePresence mode="wait">
                    {filteredAttorneys.map((att) => (
                        <motion.div 
                            key={att.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="group cursor-pointer"
                        >
                            <div className="text-xs uppercase tracking-[0.15em] text-[#2f4e9b] mb-2 font-medium">
                                {att.role}
                            </div>
                            <h3 className="text-3xl font-light text-[#2f4e9b] mb-6 leading-tight group-hover:opacity-80 transition-opacity">
                                {att.name}
                            </h3>
                            <a
                                href={`/our-attorneys/${att.name.toLowerCase().replace(/[\s.]+/g, "-")}`}
                                className="border border-[#2f4e9b] text-[#2f4e9b] group-hover:bg-[#2f4e9b] group-hover:text-white rounded-full px-6 py-2 text-[10px] uppercase tracking-[0.15em] transition-all duration-300"
                            >
                                Read Bio
                            </a>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Pagination / Load More (Static representation) */}
            <div className="flex justify-end mt-12">
                <div className="flex gap-2">
                    <span className="w-8 h-8 flex items-center justify-center font-bold text-[#2f4e9b]">1</span>
                    <button className="w-8 h-8 flex items-center justify-center text-[#2f4e9b] hover:font-bold transition-all">2</button>
                    <button className="text-[#2f4e9b] hover:font-bold ml-4 uppercase text-sm tracking-widest flex items-center">
                        Next
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* --- NEWSLETTER SECTION --- */}
      <section className="relative py-32 bg-slate-900">
         <div className="absolute inset-0 z-0">
             <Image 
                src="http://ssek.com/wp-content/uploads/2022/07/img-07.jpeg" 
                alt="Building Background" 
                fill 
                className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
         </div>
         
         <div className="container mx-auto px-6 relative z-20 flex flex-col lg:flex-row items-end gap-16">
            <div className="lg:w-1/2">
                <div className="flex items-center gap-3 mb-6 uppercase text-sm tracking-[0.15em] font-semibold text-[#50b848]">
                    <span className="w-1 h-3 bg-[#50b848] -skew-x-12 inline-block"></span>
                    Subscribe to Our Newsletter
                </div>
                <p className="text-2xl lg:text-4xl font-light text-white">
                    Stay up to date with the latest legal developments in Indonesia, upcoming events, new publications and firm news.
                </p>
            </div>
            <div className="lg:w-1/2 w-full">
                <form className="flex border-b border-white/50 pb-4 relative">
                    <input 
                        type="email" 
                        placeholder="ENTER YOUR EMAIL ADDRESS" 
                        className="bg-transparent w-full text-white placeholder:text-white/70 placeholder:font-light text-sm lg:text-lg outline-none uppercase tracking-widest"
                    />
                    <button type="submit" className="text-white uppercase tracking-widest text-sm flex items-center gap-2 hover:opacity-70 transition-opacity">
                        Send <ArrowRight className="w-4 h-4" />
                    </button>
                    {/* Garis vertikal dekorasi */}
                    <div className="absolute top-0 left-[-20px] h-[70%] w-[1px] bg-white hidden lg:block"></div>
                </form>
            </div>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <Footer />
    </div>
  );
}