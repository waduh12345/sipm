"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowRight, Linkedin, Instagram, Twitter, 
  ArrowUpRight, ArrowDown
} from "lucide-react";
import { SiteHeader } from "@/components/site-header"; // Import komponen baru

// --- DATA DUMMY ---
const BLOG_POSTS = [
  {
    id: 1,
    title: "Jon Bernard & Associates Founding Partner Speaks at BANI Anniversary Seminar",
    category: "Events",
    date: "3 December 2025",
    image: "https://www.ssek.com/wp-content/uploads/2025/12/IEA-Hut-BANI-Blog-Image.jpg",
    link: "#"
  },
  {
    id: 2,
    title: "Jon Bernard & Associates Partner Winnie Y. Rolindrawan Receives Lexology Client Choice Award for Fintech",
    category: "Firm News",
    date: "2 December 2025",
    image: "https://www.ssek.com/wp-content/uploads/2025/12/WYR-Lexology-Client-Choice-2026-Blog-Image.jpg",
    link: "#"
  },
  {
    id: 3,
    title: "Indonesia Cybersecurity Laws and Regulations",
    category: "Publication",
    date: "25 November 2025",
    image: "https://www.ssek.com/wp-content/uploads/2025/11/The-International-Comparative-Legal-Guide-Cybersecurity-2026-Blog-Image.jpg",
    link: "#"
  },
  {
    id: 4,
    title: "Jon Bernard & Associates Named to GRR 100 Again in 2025 – Leading Restructuring & Insolvency Practice",
    category: "Firm News",
    date: "25 November 2025",
    image: "https://www.ssek.com/wp-content/uploads/2025/11/GRR_100_2025-Blog-Image.jpg",
    link: "#"
  },
  {
    id: 5,
    title: "Doing Business in Indonesia: ICCC–Jon Bernard & Associates Webinar Highlights Market Entry and Investment Guidance for Canadians",
    category: "Events",
    date: "24 November 2025",
    image: "https://www.ssek.com/wp-content/uploads/2025/11/ICCC-Jon Bernard & Associates-Webinar-Blog-Image.jpg",
    link: "#"
  },
  {
    id: 6,
    title: "Jon Bernard & Associates Hosts Briefing on Indonesia’s Updated Risk-Based Business Licensing Framework",
    category: "Events",
    date: "20 November 2025",
    image: "https://www.ssek.com/wp-content/uploads/2025/11/SSEK-Hosts-Briefing-on-Indonesias-Updated-Risk-Based-Business-Licensing-Framework-Blog-Image.jpg",
    link: "#"
  }
];

const CATEGORIES = [
  "All Categories", "Attorney in Focus", "Events", "Firm News", "Deal News", "Legal Updates", "Podcast", "Publication"
];

const EXPERTISE = [
  "Practice Area", "Antitrust & Competition Law", "Banking & Finance", "Capital Markets", "Corporate Law", "Data Privacy", "Energy & Mining", "Fintech", "Labor & Employment", "Litigation", "Real Estate", "Tax Law"
];

export default function BlogPage() {
  return (
    <div className="min-h-screen font-sans text-[#57595f] bg-[#f7fbff] selection:bg-[#2f4e9b] selection:text-white">
      
      {/* --- HEADER COMPONENT --- */}
      <SiteHeader />

      {/* --- CONTENT SPACER --- */}
      {/* Spacer ini penting agar konten tidak tertutup header yang posisinya fixed */}
      <div className="h-32"></div>

      {/* --- PAGE TITLE & FILTERS --- */}
      <section className="py-12">
        <div className="container mx-auto px-6 mb-16">
            <div className="flex flex-col mb-12">
                <div className="flex items-center gap-3 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b] mb-4">
                    <span className="w-1.5 h-4 bg-[#58b0e3] -skew-x-12 inline-block"></span>
                    Indonesia Law Blog
                </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-col md:flex-row gap-6 lg:gap-12 mb-16">
                {/* Category Filter */}
                <div className="relative w-full md:w-1/2 lg:w-1/3">
                    <select className="w-full appearance-none bg-transparent border-b border-gray-300 py-3 pr-10 text-[#2f4e9b] text-lg lg:text-xl font-light focus:outline-none cursor-pointer">
                        {CATEGORIES.map((cat, idx) => (
                            <option key={idx} value={cat}>{cat}</option>
                        ))}
                    </select>
                    {/* Custom Plus Sign */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                        <div className="relative w-6 h-4 flex items-center justify-center">
                            <div className="absolute w-full h-[1px] bg-[#2f4e9b]"></div>
                            <div className="absolute h-full w-[1px] bg-[#2f4e9b]"></div>
                        </div>
                    </div>
                </div>

                {/* Expertise Filter */}
                <div className="relative w-full md:w-1/2 lg:w-1/3">
                    <select className="w-full appearance-none bg-transparent border-b border-gray-300 py-3 pr-10 text-[#2f4e9b] text-lg lg:text-xl font-light focus:outline-none cursor-pointer">
                        {EXPERTISE.map((exp, idx) => (
                            <option key={idx} value={exp}>{exp}</option>
                        ))}
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                        <div className="relative w-6 h-4 flex items-center justify-center">
                            <div className="absolute w-full h-[1px] bg-[#2f4e9b]"></div>
                            <div className="absolute h-full w-[1px] bg-[#2f4e9b]"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- BLOG GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {BLOG_POSTS.map((post) => (
                    <motion.div 
                        key={post.id} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group cursor-pointer flex flex-col"
                    >
                        <div className="relative aspect-[1.66] w-full mb-6 overflow-hidden rounded-sm">
                            <Image 
                                src={post.image} 
                                alt={post.title} 
                                fill 
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="text-xs uppercase tracking-[0.15em] text-[#57595f] mb-3">
                            {post.category} / {post.date}
                        </div>
                        <Link href={`/blog/${encodeURIComponent(post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''))}`}>
                            <h3 className="text-2xl font-light text-[#2f4e9b] leading-tight mb-6 line-clamp-3 group-hover:opacity-80 transition-opacity">
                                {post.title}
                            </h3>
                            <div className="mt-auto">
                                <button className="border border-[#2f4e9b] text-[#2f4e9b] group-hover:bg-[#2f4e9b] group-hover:text-white rounded-full px-6 py-2 text-[10px] uppercase tracking-[0.15em] transition-all duration-300">
                                    Read Article
                                </button>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Load More */}
            <div className="flex justify-center mt-20">
                <div className="flex flex-col items-center gap-2 cursor-pointer text-[#2f4e9b] opacity-80 hover:opacity-100 group">
                    <span className="uppercase text-xs tracking-widest group-hover:font-semibold transition-all">Load More</span>
                    <div className="relative h-12 w-6 flex justify-center">
                         <div className="w-[1px] h-full bg-[#2f4e9b] group-hover:translate-y-2 transition-transform"></div>
                         <ArrowDown className="absolute bottom-0 text-[#2f4e9b] w-3 h-3 group-hover:translate-y-2 transition-transform" />
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- NEWSLETTER --- */}
      <section className="relative py-32 bg-slate-900">
         <div className="absolute inset-0 z-0">
             <Image 
                src="http://ssek.com/wp-content/uploads/2022/07/img-07.jpeg" 
                alt="Background" 
                fill 
                className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
         </div>
         
         <div className="container mx-auto px-6 relative z-20 flex flex-col lg:flex-row items-end gap-16">
            <div className="lg:w-1/2">
                <div className="flex items-center gap-3 mb-6 uppercase text-sm tracking-[0.15em] font-semibold text-[#50b848]">
                    <span className="w-1.5 h-4 bg-[#50b848] -skew-x-12 inline-block"></span>
                    Subscribe to Our Newsletter
                </div>
                <p className="text-2xl lg:text-4xl font-light text-white">
                    Stay up to date with the latest legal developments in Indonesia, upcoming events, new publications and firm news.
                </p>
            </div>
            <div className="lg:w-1/2 w-full">
                <form className="flex border-b border-white/50 pb-4 relative items-center">
                    <input 
                        type="email" 
                        placeholder="ENTER YOUR EMAIL ADDRESS" 
                        className="bg-transparent w-full text-white placeholder:text-white/70 placeholder:font-light text-sm lg:text-lg outline-none uppercase tracking-widest"
                    />
                    <button type="submit" className="text-white uppercase tracking-widest text-sm flex items-center gap-2 hover:opacity-70 transition-opacity whitespace-nowrap ml-4">
                        Send <ArrowRight className="w-4 h-4" />
                    </button>
                    <div className="absolute top-0 left-[-20px] h-[70%] w-[1px] bg-white hidden lg:block"></div>
                </form>
            </div>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#2f4e9b] text-white pt-20 pb-8">
        <div className="container mx-auto px-6 h-full flex flex-col justify-between">
            
            <Link href="#" className="flex items-center justify-between group mb-16 border-b border-white/20 pb-8">
                <span className="text-4xl lg:text-7xl font-light opacity-100 group-hover:opacity-50 transition-opacity tracking-tight">Let&apos;s Talk</span>
                <div className="w-12 h-12 lg:w-16 lg:h-16 relative">
                    <ArrowUpRight className="w-full h-full group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
                </div>
            </Link>

            <div className="flex flex-col lg:flex-row justify-between border-t border-white/20 pt-12 pb-20">
                <div className="mb-10 lg:mb-0 lg:w-1/3">
                    <h5 className="font-bold text-lg mb-6 tracking-widest">Jon Bernard & Associates LAW FIRM</h5>
                    <div className="font-light text-sm leading-relaxed text-white/80">
                        <p>Mayapada Tower I, 12th and 14th Floor</p>
                        <p>Jl. Jend. Sudirman Kav. 28</p>
                        <p>Jakarta, 12920</p>
                        <p className="mb-4">Indonesia</p>
                        
                        <p className="font-bold">ISO 27701 | ISO 27001 Certification</p>
                        <p className="font-bold">Privacy Policy</p>
                    </div>
                </div>

                <div className="mb-10 lg:mb-0 lg:w-1/3 font-light text-sm leading-relaxed text-white/80">
                    <p>Tel. +62 21 2953 2000, 521 2038</p>
                    <p>Fax. +62 21 521 2039</p>
                    <p>Email. ssek@ssek.com</p>
                </div>

                <div className="flex flex-col lg:w-1/6 gap-4 text-sm uppercase tracking-widest font-light">
                    <Link href="#" className="hover:opacity-60 transition-opacity">Home</Link>
                    <Link href="#" className="hover:opacity-60 transition-opacity">Our Firm</Link>
                    <Link href="#" className="hover:opacity-60 transition-opacity">Our Attorneys</Link>
                    <Link href="#" className="hover:opacity-60 transition-opacity">Our Expertise</Link>
                </div>

                 <div className="flex flex-col lg:w-1/6 gap-4 text-sm uppercase tracking-widest font-light mt-8 lg:mt-0">
                    <Link href="#" className="hover:opacity-60 transition-opacity">Indonesia Law Blog</Link>
                    <Link href="#" className="hover:opacity-60 transition-opacity">CSR</Link>
                    <Link href="#" className="hover:opacity-60 transition-opacity">Work With Us</Link>
                    <Link href="#" className="hover:opacity-60 transition-opacity">Let&apos;s Talk</Link>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between border-t border-white/20 pt-8">
                <div className="flex gap-6 mb-6 lg:mb-0">
                    <Linkedin className="w-5 h-5 cursor-pointer hover:opacity-60" />
                    <Instagram className="w-5 h-5 cursor-pointer hover:opacity-60" />
                    <Twitter className="w-5 h-5 cursor-pointer hover:opacity-60" />
                </div>
                
                <div className="flex gap-4 mb-6 lg:mb-0">
                    <span className="text-white font-bold text-sm">EN</span>
                    <span className="text-white/50 text-sm">ID</span>
                </div>

                <div className="text-white/40 text-xs font-light">
                    &copy; {new Date().getFullYear()} Jon Bernard & Associates Law Firm. All Rights Reserved.
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}