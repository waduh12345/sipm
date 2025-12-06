"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight,
  Calendar,
  ArrowUpRight // Icon baru untuk indikator link/hover
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// --- DATA DUMMY CLIENTS ---
// Pastikan file gambar ada di folder public/images/clients/ atau sesuaikan path-nya
const CLIENTS = [
  { id: 1, name: "Pertamina Geothermal", industry: "Energy", logo: "/digital-kta-logo.png" },
  { id: 2, name: "Bank Central Asia", industry: "Banking", logo: "/digital-kta-logo.png" },
  { id: 3, name: "Telkom Indonesia", industry: "Technology", logo: "/digital-kta-logo.png" },
  { id: 4, name: "Astra International", industry: "Automotive", logo: "/digital-kta-logo.png" },
  { id: 5, name: "Unilever Indonesia", industry: "Consumer Goods", logo: "/digital-kta-logo.png" },
  { id: 6, name: "Tokopedia", industry: "Technology", logo: "/digital-kta-logo.png" },
  { id: 7, name: "Bank Mandiri", industry: "Banking", logo: "/digital-kta-logo.png" },
  { id: 8, name: "Indofood", industry: "Consumer Goods", logo: "/digital-kta-logo.png" },
  { id: 9, name: "Adaro Energy", industry: "Mining", logo: "/digital-kta-logo.png" },
  { id: 10, name: "Garuda Indonesia", industry: "Transportation", logo: "/digital-kta-logo.png" },
  { id: 11, name: "Bukalapak", industry: "Technology", logo: "/digital-kta-logo.png" },
  { id: 12, name: "Kalbe Farma", industry: "Healthcare", logo: "/digital-kta-logo.png" },
];

// --- DATA DUMMY DOCUMENTATION ---
const DOCUMENTATIONS = [
  { 
    id: 1, 
    title: "Annual General Meeting 2024", 
    client: "Bank Central Asia",
    date: "August 12, 2024",
    image: "http://ssek.com/wp-content/uploads/2022/07/img-07.jpeg" 
  },
  { 
    id: 2, 
    title: "Merger & Acquisition Signing", 
    client: "Tokopedia & Gojek",
    date: "May 20, 2024",
    image: "http://ssek.com/wp-content/uploads/2022/07/SSEK_Website-Photo_Our-Attorney-Page.jpg" 
  },
  { 
    id: 3, 
    title: "Legal Workshop for Startups", 
    client: "Tech Community",
    date: "January 15, 2024",
    image: "http://ssek.com/wp-content/uploads/2022/07/img-07.jpeg" 
  },
];

const FILTER_OPTIONS = ["All Industries", "Energy", "Banking", "Technology", "Consumer Goods", "Mining", "Healthcare"];

export default function OurClientsPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Industries");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredClients = selectedFilter === "All Industries" 
    ? CLIENTS 
    : CLIENTS.filter(client => client.industry === selectedFilter);

  return (
    <div className="min-h-screen font-sans text-[#57595f] selection:bg-[#2f4e9b] selection:text-white bg-[#f7fbff]">
      
      <SiteHeader />

      {/* --- CONTENT SPACER --- */}
      <div className="h-32"></div>

      {/* --- HERO SECTION --- */}
      <section className="py-12">
        <div className="container mx-auto px-6 mb-20">
            {/* Title Block */}
            <div className="flex flex-col items-center mb-16">
                <div className="w-10/12 flex flex-col items-start gap-4">
                    <div className="flex items-center gap-3 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b]">
                        <span className="w-1 h-3 bg-[#a3238e] -skew-x-12 inline-block"></span>
                        Our Clients
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-light text-[#2f4e9b] leading-tight uppercase">
                        TRUSTED PARTNERSHIPS BUILT ON EXCELLENCE AND INTEGRITY
                    </h2>
                </div>
            </div>

            {/* Image & Text Content */}
            <div className="w-11/12 mx-auto flex flex-col items-end">
                <div className="lg:w-3/4 relative aspect-[2/1] w-full mb-10 overflow-hidden">
                    <Image 
                        src="http://ssek.com/wp-content/uploads/2022/07/SSEK_Website-Photo_Our-Attorney-Page.jpg" 
                        alt="Client Meeting" 
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="lg:w-3/4 flex justify-end">
                    <div className="lg:w-2/3 text-[#57595f] font-light leading-relaxed space-y-6 text-sm lg:text-base columns-1 lg:columns-2 gap-12">
                        <p>We are privileged to work with a diverse range of clients, from multinational corporations to local enterprises.</p>
                        <p>Our commitment to understanding their business needs allows us to provide tailored legal solutions that drive success.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- CLIENT LIST SECTION (REDESIGNED) --- */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
            
            {/* Filter Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-end mb-12 border-b-2 border-[#2f4e9b] pb-4">
                <div className="text-3xl lg:text-5xl font-light text-[#2f4e9b] mb-6 lg:mb-0">
                    Client List
                </div>
                <div className="relative min-w-[300px]">
                    <select 
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        className="w-full appearance-none bg-transparent font-medium py-3 pr-10 text-xl text-[#2f4e9b] focus:outline-none cursor-pointer text-right"
                    >
                        {FILTER_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    {/* Arrow Icon */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#2f4e9b]">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m6 9 6 6 6-6"/>
                        </svg>
                    </div>
                </div>
            </div>

            {/* NEW LIST LAYOUT */}
            <div className="flex flex-col">
                <AnimatePresence mode="wait">
                    {filteredClients.map((client, index) => (
                        <motion.div 
                            key={client.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative border-b border-[#2f4e9b]/20 py-8 lg:py-10 transition-all duration-300 hover:bg-white hover:px-6 hover:shadow-sm -mx-0 lg:-mx-6 lg:px-6 rounded-lg cursor-default"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                
                                {/* Bagian Kiri: Nama & Industri */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-2">
                                        <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#a3238e] uppercase border border-[#a3238e]/30 px-3 py-1 rounded-full">
                                            {client.industry}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-2xl md:text-4xl font-light text-[#2f4e9b] group-hover:translate-x-2 transition-transform duration-300">
                                            {client.name}
                                        </h3>
                                        <ArrowUpRight className="w-5 h-5 text-[#a3238e] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                    </div>
                                </div>

                                {/* Bagian Kanan: Logo */}
                                {/* Logo dibuat opacity rendah dan grayscale saat normal, full color saat hover */}
                                <div className="relative w-32 md:w-40 h-16 flex-shrink-0 flex items-center justify-start md:justify-end">
                                    <div className="relative w-full h-full opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                                        {/* Gunakan Image component seperti biasa */}
                                        <Image 
                                            src={client.logo}
                                            alt={client.name}
                                            fill
                                            className="object-contain object-left md:object-right"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredClients.length === 0 && (
                    <div className="py-20 text-center text-gray-400 font-light italic">
                        No clients found in this industry.
                    </div>
                )}
            </div>
            
            {/* Simple Pagination/Footer for List */}
            <div className="mt-12 text-center">
                 <p className="text-sm text-[#2f4e9b]/60 uppercase tracking-widest">Showing {filteredClients.length} Clients</p>
            </div>

        </div>
      </section>

      {/* --- DOCUMENTATION / GALLERY SECTION --- */}
      <section className="py-20 bg-slate-50 border-t border-gray-200">
        <div className="container mx-auto px-6">
            <div className="flex items-center gap-3 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b] mb-10">
                <span className="w-1 h-3 bg-[#a3238e] -skew-x-12 inline-block"></span>
                Recent Collaborations & Documentation
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {DOCUMENTATIONS.map((doc) => (
                    <div key={doc.id} className="group cursor-pointer">
                        <div className="relative aspect-[4/3] overflow-hidden mb-6 rounded-sm">
                            <Image 
                                src={doc.image}
                                alt={doc.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Overlay Date */}
                            <div className="absolute bottom-0 left-0 bg-[#2f4e9b] text-white px-4 py-2 text-xs uppercase tracking-widest flex items-center gap-2">
                                <Calendar className="w-3 h-3" /> {doc.date}
                            </div>
                        </div>
                        <h4 className="text-xs uppercase tracking-[0.15em] text-[#a3238e] mb-2 font-medium">
                            {doc.client}
                        </h4>
                        <h3 className="text-xl font-light text-[#2f4e9b] leading-tight group-hover:text-[#a3238e] transition-colors">
                            {doc.title}
                        </h3>
                    </div>
                ))}
            </div>

             {/* Pagination for Documentation */}
             <div className="flex justify-center mt-12">
                <button className="border border-[#2f4e9b] text-[#2f4e9b] hover:bg-[#2f4e9b] hover:text-white px-8 py-3 text-xs uppercase tracking-[0.2em] transition-all duration-300">
                    View Full Archive
                </button>
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
                    Work With Us
                </div>
                <p className="text-2xl lg:text-4xl font-light text-white">
                    Interested in becoming our partner? Let&apos;s discuss how we can help your business grow.
                </p>
            </div>
            <div className="lg:w-1/2 w-full">
                <button className="group flex items-center gap-4 text-white text-xl lg:text-2xl font-light hover:opacity-80 transition-opacity border-b border-white pb-4 w-full">
                    <span>CONTACT OUR TEAM</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
            </div>
         </div>
      </section>

      <SiteFooter />
    </div>
  );
}