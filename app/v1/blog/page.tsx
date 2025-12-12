"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowRight, ArrowDown
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// --- DATA DUMMY ---
const BLOG_POSTS = [
  {
    id: 1,
    title: "KONSEP KEADILAN MENURUT AJARAN FILSAFAT HUKUM PANCASILA",
    category: "Article",
    date: "3 December 2025",
    image: "/blog-sample.webp", // Pastikan file ini ada atau ganti URL
    link: "#"
  },
  {
    id: 2,
    title: "Jon Bernard & Associates Partner Receives Lexology Client Choice Award for Fintech",
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
    title: "Jon Bernard & Associates Named to GRR 100 Again in 2025 – Leading Restructuring Practice",
    category: "Firm News",
    date: "25 November 2025",
    image: "https://www.ssek.com/wp-content/uploads/2025/11/GRR_100_2025-Blog-Image.jpg",
    link: "#"
  },
  {
    id: 5,
    title: "Doing Business in Indonesia: Webinar Highlights Market Entry and Investment Guidance",
    category: "Events",
    date: "24 November 2025",
    image: "https://www.ssek.com/wp-content/uploads/2025/11/ICCC-Jon Bernard & Associates-Webinar-Blog-Image.jpg",
    link: "#"
  },
  {
    id: 6,
    title: "Briefing on Indonesia’s Updated Risk-Based Business Licensing Framework",
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
    <div className="min-h-screen font-sans text-gray-600 bg-white selection:bg-[#2f4e9b] selection:text-white">
      
      {/* --- HEADER --- */}
      <SiteHeader />

      {/* --- CONTENT SPACER --- */}
      <div className="h-28 lg:h-32"></div>

      {/* --- PAGE TITLE & FILTERS --- */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-6">
            
            {/* Title Section */}
            <div className="flex flex-col mb-16">
                <div className="flex items-center gap-3 uppercase text-xs font-bold tracking-[0.2em] text-[#2f4e9b] mb-4">
                    <span className="w-8 h-[2px] bg-[#2f4e9b]"></span>
                    Knowledge Centre
                </div>
                <h1 className="text-4xl lg:text-5xl font-light text-gray-900">
                    Articles & News
                </h1>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mb-20 border-b border-gray-100 pb-12">
                {/* Category Filter */}
                <div className="relative w-full md:w-1/3">
                    <label className="text-xs uppercase tracking-widest text-gray-400 mb-2 block">Filter by Category</label>
                    <select className="w-full appearance-none bg-transparent border-b border-gray-200 py-3 pr-10 text-gray-800 text-lg lg:text-xl font-light focus:outline-none focus:border-[#2f4e9b] focus:text-[#2f4e9b] transition-colors cursor-pointer">
                        {CATEGORIES.map((cat, idx) => (
                            <option key={idx} value={cat}>{cat}</option>
                        ))}
                    </select>
                    {/* Custom Plus Sign */}
                    <div className="absolute right-0 bottom-4 pointer-events-none">
                         <div className="relative w-4 h-4 flex items-center justify-center text-[#2f4e9b]">
                            {/* Simple chevron down using borders for cleaner look or Lucide icon */}
                            <ArrowDown className="w-4 h-4 opacity-50" />
                        </div>
                    </div>
                </div>

                {/* Expertise Filter */}
                <div className="relative w-full md:w-1/3">
                    <label className="text-xs uppercase tracking-widest text-gray-400 mb-2 block">Filter by Practice Area</label>
                    <select className="w-full appearance-none bg-transparent border-b border-gray-200 py-3 pr-10 text-gray-800 text-lg lg:text-xl font-light focus:outline-none focus:border-[#2f4e9b] focus:text-[#2f4e9b] transition-colors cursor-pointer">
                        {EXPERTISE.map((exp, idx) => (
                            <option key={idx} value={exp}>{exp}</option>
                        ))}
                    </select>
                    <div className="absolute right-0 bottom-4 pointer-events-none">
                        <ArrowDown className="w-4 h-4 opacity-50 text-[#2f4e9b]" />
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
                        className="group cursor-pointer flex flex-col h-full"
                    >
                        {/* Image Container */}
                        <div className="relative aspect-[16/10] w-full mb-6 overflow-hidden rounded-2xl shadow-sm border border-gray-100">
                            <Image 
                                src={post.image} 
                                alt={post.title} 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay on hover (optional) */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                        </div>

                        {/* Meta Data */}
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#2f4e9b] font-medium mb-3">
                            <span>{post.category}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span className="text-gray-400">{post.date}</span>
                        </div>

                        {/* Title */}
                        <Link href={`/blog/${encodeURIComponent(post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''))}`} className="flex-1">
                            <h3 className="text-xl lg:text-2xl font-normal text-gray-900 leading-snug mb-6 line-clamp-3 group-hover:text-[#2f4e9b] transition-colors">
                                {post.title}
                            </h3>
                        </Link>

                        {/* Action Button - Clean Outline */}
                        <div className="mt-auto">
                           <Link href={`/blog/${encodeURIComponent(post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''))}`}>
                            <button className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold text-gray-400 group-hover:text-[#2f4e9b] transition-colors">
                                Read Article
                                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </button>
                           </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center mt-24">
                <button className="px-8 py-3 rounded-full border border-gray-200 text-xs uppercase tracking-widest text-gray-500 hover:border-[#2f4e9b] hover:text-[#2f4e9b] hover:bg-white transition-all duration-300">
                    Load More Articles
                </button>
            </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <SiteFooter />
    </div>
  );
}