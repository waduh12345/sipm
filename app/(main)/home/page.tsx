"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";


const HERO_SLIDES = [
  {
    id: 1,
    title: "Jon Bernard & Associates Founding Partner Speaks at BANI Anniversary Seminar",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop", // Placeholder visual legal
    link: "#"
  },
  {
    id: 2,
    title: "Jon Bernard & Associates Partner Winnie Y. Rolindrawan Receives Lexology Client Choice Award for Fintech",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 3,
    title: "Indonesia Cybersecurity Laws and Regulations",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 4,
    title: "Jon Bernard & Associates Named to GRR 100 Again in 2025 – Leading Restructuring & Insolvency Practice",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000&auto=format&fit=crop",
    link: "#"
  }
];

const LATEST_UPDATES = [
  {
    id: 1,
    category: "Events",
    date: "3 December 2025",
    title: "Jon Bernard & Associates Founding Partner Speaks at BANI Anniversary Seminar",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    category: "Firm News",
    date: "2 December 2025",
    title: "Jon Bernard & Associates Partner Winnie Y. Rolindrawan Receives Lexology Client Choice Award for Fintech",
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    category: "Publication",
    date: "25 November 2025",
    title: "Indonesia Cybersecurity Laws and Regulations",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    category: "Firm News 4",
    date: "2 December 2025",
    title: "Jon Bernard & Associates Partner Winnie Y. Rolindrawan Receives Lexology Client Choice Award for Fintech",
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 5,
    category: "Firm News 5",
    date: "2 December 2025",
    title: "Jon Bernard & Associates Partner Winnie Y. Rolindrawan Receives Lexology Client Choice Award for Fintech",
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=1000&auto=format&fit=crop"
  },
];

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // State for Legal Updates slider
  const [latestStart, setLatestStart] = useState(0);
  const maxLatestStart = Math.max(0, LATEST_UPDATES.length - 3);

  // Handle Scroll untuk Navbar Transparan -> Solid
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
      nextHeroSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentHeroSlide]);

  const nextHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <div className="min-h-screen font-sans text-[#57595f] selection:bg-[#2f4e9b] selection:text-white">
      
      {/* --- HEADER / NAVBAR --- */}
    {/* --- HEADER / NAVBAR --- */}
    <SiteHeader />

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
            <Image 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                alt="Building" 
                fill 
                className="object-cover"
                priority
            />
            {/* Gradient Overlay seseuai referensi */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#2f4e9b] opacity-90 z-10" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/50 z-10" />
        </div>

        <div className="container mx-auto px-6 h-full relative z-20 flex flex-col justify-center">
            <div className="flex flex-col lg:flex-row items-end lg:items-center justify-between w-full h-full pb-20 lg:pb-0 pt-32">
                
                {/* Left Text */}
                <div className="lg:w-7/12 mb-10 lg:mb-0">
                    <div className="flex items-center gap-3 mb-4 text-white uppercase text-xs tracking-[0.15em] font-semibold">
                        <span className="w-1 h-3 bg-[#a3238e] -skew-x-12 inline-block"></span>
                        Shaping Tomorrow, Today
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-light text-white leading-tight">
                        EXPERIENCE AND INNOVATION TO NAVIGATE A CHANGING WORLD
                    </h2>
                </div>

                {/* Right Slider (News Widget) */}
                <div className="w-full lg:w-4/12 bg-white/10 backdrop-blur-md rounded-lg p-4 lg:p-6 border border-white/20">
                    <div className="relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={currentHeroSlide}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col gap-4"
                            >
                                <div className="relative h-48 w-full rounded overflow-hidden">
                                    <Image 
                                        src={HERO_SLIDES[currentHeroSlide].image}
                                        alt="Slide"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-white text-lg font-medium leading-snug mb-4 line-clamp-3">
                                        {HERO_SLIDES[currentHeroSlide].title}
                                    </h3>
                                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#2f4e9b] rounded-full text-xs uppercase tracking-wider h-8 px-4 bg-transparent transition-all">
                                        Read Article
                                    </Button>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <div className="flex justify-end gap-3 mt-4">
                             <button onClick={prevHeroSlide} className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                                <ChevronLeft size={16} />
                             </button>
                             <button onClick={nextHeroSlide} className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                                <ChevronRight size={16} />
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- WHO WE ARE --- */}
      <section className="bg-[#2f4e9b] py-24 text-white">
        <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 mb-20">
                <div className="lg:w-1/2">
                    <div className="flex items-center gap-3 mb-6 uppercase text-sm tracking-[0.15em] font-semibold text-[#50b848]">
                        <span className="w-1 h-3 bg-[#50b848] -skew-x-12 inline-block"></span>
                        Who We Are
                    </div>
                    <h3 className="text-3xl lg:text-5xl font-light leading-tight mb-8">
                        Jon Bernard & Associates is one of the largest and most highly regarded independent law firms in Indonesia.
                    </h3>
                </div>
                <div className="lg:w-1/2 flex flex-col justify-between">
                     <div className="relative h-64 lg:h-80 w-full mb-8">
                        <Image 
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
                            alt="Office" 
                            fill 
                            className="object-cover"
                        />
                     </div>
                     <div>
                        <p className="text-xl lg:text-2xl font-light mb-6">
                            The first point of reference and a reliable source of guidance.
                        </p>
                        <p className="text-white/80 font-light leading-relaxed mb-8 text-sm lg:text-base">
                            We understand not only the legal environment as it affects clients, but also their business and the environment in which they operate.
                        </p>
                        <Button className="border border-white bg-transparent hover:bg-white hover:text-[#2f4e9b] text-white rounded-full px-8 py-6 text-xs uppercase tracking-wider">
                            Discover Our Firm
                        </Button>
                     </div>
                </div>
            </div>

            {/* Legal Updates Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between border-t border-white/20 pt-16">
                 <div>
                    <div className="flex items-center gap-3 mb-4 uppercase text-sm tracking-[0.15em] font-semibold text-[#50b848]">
                        <span className="w-1 h-3 bg-[#50b848] -skew-x-12 inline-block"></span>
                        Legal Updates, Publications & News
                    </div>
                    <p className="text-2xl lg:text-4xl font-light max-w-2xl">
                        Keeping you up to date on the latest legal developments in Indonesia
                    </p>
                 </div>
                 <Button className="mt-8 lg:mt-0 border border-white bg-transparent hover:bg-white hover:text-[#2f4e9b] text-white rounded-full px-8 py-6 text-xs uppercase tracking-wider">
                    Discover The Indonesia Law Blog
                 </Button>
            </div>
        </div>
      </section>

      {/* --- SLIDER SECTION (Legal Updates) --- */}
    <section className="bg-[#2f4e9b] pb-24 text-white overflow-hidden">
        <div className="container mx-auto px-6">
            {/* Slider Controls */}
            <div className="flex justify-end mb-6 gap-3">
                <button
                    onClick={() =>
                        setLatestStart((prev) =>
                            prev === 0 ? maxLatestStart : prev - 1
                        )
                    }
                    className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white/20 transition-all disabled:opacity-40"
                    disabled={latestStart === 0}
                    aria-label="Previous"
                >
                    <ChevronLeft size={16} />
                </button>
                <button
                    onClick={() =>
                        setLatestStart((prev) =>
                            prev === maxLatestStart ? 0 : prev + 1
                        )
                    }
                    className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white/20 transition-all disabled:opacity-40"
                    disabled={latestStart === maxLatestStart}
                    aria-label="Next"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
            <div className="relative overflow-x-hidden pb-8">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={latestStart}
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -60 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="flex gap-8 snap-x"
                    >
                        {LATEST_UPDATES.slice(latestStart, latestStart + 3).map((item) => (
                            <div key={item.id} className="min-w-[85%] lg:min-w-[30%] snap-center">
                                <div className="relative aspect-[5/3] mb-6 group cursor-pointer">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="text-xs uppercase tracking-widest text-white/70 mb-3">
                                    {item.category} / {item.date}
                                </div>
                                <h4 className="text-xl lg:text-2xl font-light leading-snug mb-6 hover:underline cursor-pointer">
                                    {item.title}
                                </h4>
                                <Button className="border border-white bg-transparent hover:bg-white hover:text-[#2f4e9b] text-white rounded-full px-6 py-2 text-[10px] uppercase tracking-wider">
                                    Read Article
                                </Button>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
            {/* Progress Bar Visual */}
            <div className="w-full h-[2px] bg-white/20 mt-8 relative">
                <div
                    className="absolute top-0 left-0 h-full bg-white transition-all duration-300"
                    style={{
                        width: `${((latestStart + 1) / (maxLatestStart + 1)) * 100}%`,
                    }}
                ></div>
            </div>
        </div>
    </section>

      {/* --- OUR EXPERTISE --- */}
      <section className="py-32 bg-[#f7fbff]">
        <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-8/12">
                     <div className="flex items-center gap-3 mb-6 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b]">
                        <span className="w-1 h-3 bg-[#a3238e] -skew-x-12 inline-block"></span>
                        Our Expertise
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-light text-[#2f4e9b] leading-tight mb-8">
                        Jon Bernard & Associates assists Indonesian, foreign, transnational and multinational clients across a wide range of specialist areas.
                    </h2>
                    <div className="columns-1 lg:columns-2 gap-10 text-[#57595f] font-light leading-relaxed mb-10 text-sm lg:text-base">
                        <p>
                            Our expertise covers all essential areas of Indonesian law and has been honed over three decades of meeting the legal needs of clients. We work with clients to understand their specific needs and goals.
                        </p>
                    </div>
                </div>
                <div className="lg:w-4/12 flex justify-center lg:justify-end">
                     <Button className="bg-transparent border border-[#2f4e9b] text-[#2f4e9b] hover:bg-[#2f4e9b] hover:text-white rounded-full px-8 py-6 text-xs uppercase tracking-wider transition-all">
                        Discover What We Do
                     </Button>
                </div>
            </div>
        </div>
      </section>

      {/* --- NEWSLETTER SUBSCRIBE --- */}
      <section className="relative py-32 bg-slate-900">
         <div className="absolute inset-0 z-0">
             {/* Background image gelap sesuai referensi */}
             <Image 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop" 
                alt="Meeting" 
                fill 
                className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-black/40 z-10" />
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
                    {/* Vertical line accent */}
                    <div className="absolute top-0 left-[-20px] h-[70%] w-[1px] bg-white hidden lg:block"></div>
                </form>
            </div>
         </div>
      </section>
    <SiteFooter />
    </div>
  );
}