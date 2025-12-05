"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
    ArrowRight, Linkedin, Instagram, Twitter, 
   Facebook, 
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// --- DATA DUMMY (RELATED POSTS) ---
const RELATED_POSTS = [
  {
    id: 1,
    category: "Firm News",
    date: "25 November 2025",
    title: "Jon Bernard & Associates Named to GRR 100 Again in 2025 – Leading Restructuring & Insolvency Practice",
    image: "https://www.ssek.com/wp-content/uploads/2025/11/GRR_100_2025-Blog-Image.jpg"
  },
  {
    id: 2,
    category: "Legal Updates",
    date: "19 November 2025",
    title: "Indonesia Issues Draft OJK Regulation on Digital Financial Asset Offerings",
    image: "https://www.ssek.com/wp-content/uploads/2025/11/Indonesia-Issues-Draft-OJK-Regulation-on-Digital-Financial-Asset-Offerings-Blog-Image.jpg"
  },
  {
    id: 3,
    category: "Firm News",
    date: "24 October 2025",
    title: "Jon Bernard & Associates Named Indonesia Fintech Law Firm of the Year",
    image: "https://www.ssek.com/wp-content/uploads/2025/10/2-ALB-Indonesia-2025-Blog-Image.jpg"
  }
];

export default function BlogDetailPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans text-[#57595f] bg-[#f7fbff] selection:bg-[#2f4e9b] selection:text-white">
      
      {/* --- HEADER --- */}
      <SiteHeader />

      {/* --- CONTENT SPACER --- */}
      <div className="h-32"></div>

      {/* --- MAIN CONTENT --- */}
      <main className="pb-24">
        <div className="container mx-auto px-6 flex flex-col items-center">
            
            {/* Featured Image */}
            <div className="w-full lg:w-10/12 mb-12 relative aspect-[1.66] rounded-sm overflow-hidden shadow-sm">
                <Image 
                    src="https://www.ssek.com/wp-content/uploads/2025/12/WYR-Lexology-Client-Choice-2026-Blog-Image.jpg"
                    alt="Winnie Y. Rolindrawan Lexology Award"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content Wrapper */}
            <div className="w-full lg:w-10/12 flex flex-col">
                
                {/* Category */}
                <div className="flex items-center gap-3 mb-4 uppercase text-sm tracking-[0.15em] font-semibold text-[#57595f]">
                    <span className="w-1.5 h-4 bg-[#58b0e3] -skew-x-12 inline-block"></span>
                    Firm News
                </div>

                {/* Title */}
                <h1 className="text-3xl lg:text-5xl font-light text-[#2f4e9b] leading-tight mb-12">
                    Jon Bernard & Associates Partner Winnie Y. Rolindrawan Receives Lexology Client Choice Award for Fintech
                </h1>

                {/* Split Layout: Meta vs Content */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                    
                    {/* Left Column (Meta & Share) */}
                    <div className="lg:w-1/4 flex flex-col gap-8">
                        {/* Date */}
                        <div>
                            <span className="text-[#2f4e9b] uppercase tracking-[0.15em] text-xs font-medium">
                                2 December 2025
                            </span>
                        </div>

                        {/* Share Buttons */}
                        <div>
                            <span className="text-[#2f4e9b] uppercase tracking-[0.15em] text-xs font-medium block mb-4">
                                Share
                            </span>
                            <div className="flex gap-4">
                                <button className="w-8 h-8 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                                    <Facebook size={14} />
                                </button>
                                <button className="w-8 h-8 rounded-full bg-[#1da1f2] text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                                    <Twitter size={14} />
                                </button>
                                <button className="w-8 h-8 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                                    <Linkedin size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Article Body) */}
                    <div className="lg:w-3/4 text-[#57595f] font-light leading-relaxed space-y-6 text-sm lg:text-[1.05rem]">
                        <p>
                            Jon Bernard & Associates Law Firm is pleased to announce that partner <Link href="#" className="text-[#2f4e9b] hover:underline">Winnie Yamashita Rolindrawan</Link> has been named a Winner of a <Link href="#" className="text-[#2f4e9b] hover:underline">2026 Lexology Index Client Choice Award</Link> for her work in the fintech sector in Indonesia. Winnie was one of only three lawyers from Indonesia recognized in the 2026 Lexology Index Client Choice Awards.
                        </p>
                        <p>
                            The Client Choice Awards honor legal and consulting professionals around the world who demonstrate exceptional standards of client service. The awards are conferred exclusively on individuals who consistently deliver outstanding value, provide commercially focused advice and exceed client expectations.
                        </p>
                        <p>
                            Winners are selected solely on the basis of client nominations, offering an independent and highly credible endorsement from those who work most closely with the nominees and entrust them with matters of significant importance. As part of the evaluation process, clients assess lawyers on a broad range of service criteria, including the quality of legal advice, commercial insight, industry knowledge, strategic judgement, transparency in billing, value for money, responsiveness and professional integrity.
                        </p>
                        <p>
                            To preserve the independence of the research, law firms are not notified when the initial assessment process begins.
                        </p>
                        <p>
                            Winnie will be formally recognized at the award ceremony in London in March. Jon Bernard & Associates congratulates her on this well-deserved achievement.
                        </p>

                        {/* Back Button */}
                        <div className="pt-12">
                            <Link href="/blog">
                                <button className="border border-[#2f4e9b] text-[#2f4e9b] hover:bg-[#2f4e9b] hover:text-white rounded-full px-8 py-3 text-[11px] uppercase tracking-[0.15em] transition-all duration-300">
                                    Back to Indonesia Law Blog
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>

      {/* --- RELATED ARTICLES --- */}
      <section className="py-20 bg-white overflow-hidden">
         <div className="container mx-auto px-6">
            <div className="flex items-center gap-3 mb-12 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b]">
                <span className="w-1.5 h-4 bg-[#50b848] -skew-x-12 inline-block"></span>
                Related Articles
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {RELATED_POSTS.map((post) => (
                    <div key={post.id} className="flex flex-col group cursor-pointer">
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
                        <h3 className="text-xl font-light text-[#2f4e9b] leading-tight mb-6 line-clamp-3 group-hover:opacity-80 transition-opacity">
                            {post.title}
                        </h3>
                        <div className="mt-auto">
                            <button className="border border-[#2f4e9b] text-[#2f4e9b] group-hover:bg-[#2f4e9b] group-hover:text-white rounded-full px-6 py-2 text-[10px] uppercase tracking-[0.15em] transition-all duration-300">
                                Read Article
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile Navigation Arrows (Visual Only) */}
            <div className="flex justify-end gap-4 mt-8 md:hidden">
                 <button className="w-10 h-10 border border-[#2f4e9b] rounded-full flex items-center justify-center text-[#2f4e9b]">
                    <ArrowRight className="rotate-180 w-4 h-4" />
                 </button>
                 <button className="w-10 h-10 border border-[#2f4e9b] rounded-full flex items-center justify-center text-[#2f4e9b]">
                    <ArrowRight className="w-4 h-4" />
                 </button>
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
        <SiteFooter />
    </div>
  );
}