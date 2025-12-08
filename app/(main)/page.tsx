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
    title: "Asuransi & Re-asuransi (adviser and claim investigator)",
    image: "/slide/slide-asuransi-dan-reasuransi.webp", // Placeholder visual legal
    link: "#"
  },
  {
    id: 2,
    title: "Litigasi Koorporasi, Arbitrase, Kepailitan dan Penundaan Kewajiban Pembayaran Utang (PKPU)",
    image: "/slide/slide-litigasi-koorporasi.webp",
    link: "#"
  },
  {
    id: 3,
    title: "Litigasi Kriminal",
    image: "/slide/slide-litigasi-kriminal.webp",
    link: "#"
  },
  {
    id: 4,
    title: "Kekayaan Intelektual dan Informasi Teknologi",
    image: "/slide/slide-kekayaan-intelektual-informasi-teknologi.webp",
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
                    <h2 className="text-2xl lg:text-5xl font-light text-[#FCD400] leading-tight relative inline-block">
                        Welcome
                        <span className="block h-1 md:w-52 bg-[#FCD400] rounded"></span>
                    </h2>
                    <div className="flex items-center gap-3 mb-4 text-[#FCD400] uppercase text-xl md:text-3xl mt-4 tracking-[0.15em] font-semibold">
                        Jon Bernard & Associates Your Trusted Legal Partner
                    </div>
                    <h2 className="text-md lg:text-2xl font-light text-white leading-tight">
                        Firma hukum yang berdiri untuk melindungi kepentingan Anda dengan ketegasan, dedikasi dan strategi yang terukur
                    </h2>
                    <Button className="mt-8 border border-white bg-transparent hover:bg-white hover:text-[#2f4e9b] text-white rounded-full px-8 py-6 text-xs uppercase tracking-wider">
                        Find our more
                    </Button>
                </div>

                {/* Right Slider (News Widget) */}
                <div className="w-full lg:w-4/12 bg-white/10 backdrop-blur-md rounded-lg p-3 lg:p-6 border border-white/20">
                    <div className="relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentHeroSlide}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col gap-3"
                            >
                                <div className="relative h-40 sm:h-48 w-full rounded overflow-hidden">
                                    <Image
                                        src={HERO_SLIDES[currentHeroSlide].image}
                                        alt="Slide"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 100vw, 33vw"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-white text-base sm:text-lg font-medium leading-snug mb-3 sm:mb-4 line-clamp-3">
                                        {HERO_SLIDES[currentHeroSlide].title}
                                    </h3>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <div className="flex justify-between sm:justify-end gap-2 sm:gap-3 mt-3 sm:mt-4">
                            <button
                                onClick={prevHeroSlide}
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                                aria-label="Previous Slide"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                onClick={nextHeroSlide}
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                                aria-label="Next Slide"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

      {/* --- OUR EXPERTISE --- */}
    <section className="py-12 md:py-32 bg-[#f7fbff]">
        <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-12/12">
                     <div className="flex items-center gap-3 mb-6 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b]">
                        <span className="w-1 h-3 bg-[#a3238e] -skew-x-12 inline-block"></span>
                        Our Expertise
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"></div>
                        <div>
                            <h2 className="text-2xl lg:text-4xl font-light text-[#2f4e9b] leading-tight mb-8">
                                Jon Bernard & Associates memiliki kompetensi profesional dalam penanganan perkara hukum di bidang asuransi serta keahlian khusus dalam melaksanakan investigasi klaim secara sistematis dan sesuai standar regulasi.
                            </h2>
                        </div>
                        <div className="text-[#57595f] font-light leading-relaxed mb-10 text-md lg:text-base">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                    <p className="text-justify mb-4">
                                        Jon Bernard & Associates menangani hal-hal yang berkaitan dengan hukum perusahaan dan pasar modal serta membantu kliennya dalam permasalahan perburuhan (tenaga kerja). Penanganan setiap kasus hukum, baik hukum asuransi, hukum perusahaan maupun pasar modal dapat ditempuh dengan caranon litigasi dan/atau cara litigasi
                                    </p>
                                </div>
                                <div>
                                    <p className="text-justify mb-4">
                                        Jon Bernard & Associates dapat membantu klien dengan berupaya mencapai hasil yang baik dalam penyelesaian suatu perkara. Dalam beberapa pengalaman menangani kasus, kami telah berhasil dengan baik menangani beberapa perkara baik perkara di pengadilan dan juga perkara di arbitrase. Jika diperlukan kami dapat membantu klien dalam melakukan negosiasi kepada pihak lain.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </section>

      {/* --- NEWSLETTER SUBSCRIBE --- */}
    <section className="relative py-12 md:py-32 bg-slate-900 mt-[-60px] md:mt-0">
        <div className="absolute inset-0 z-0">
            <Image
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
                alt="Meeting"
                fill
                className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-black/40 z-10" />
        </div>
        <div className="container mx-auto px-6 relative z-20 flex flex-col lg:flex-row items-center gap-16">
            {/* Left Text */}
            <div className="lg:w-2/3 w-full">
                <div className="flex items-center gap-3 mb-6 uppercase text-sm tracking-[0.15em] font-semibold text-[#FCD400]">
                    <span className="w-1 h-3 bg-[#50b848] -skew-x-12 inline-block"></span>
                    Ada pertanyaan atau membutuhkan konsultasi hukum?
                </div>
                <p className="text-2xl lg:text-3xl font-light text-white mb-8">
                    Tim Kantor Hukum JonB & Associates siap membantu Anda dengan penjelasan yang jelas, respons cepat, dan solusi yang tepat. Silakan kirim pertanyaan Anda melalui email atau klik tombol Whatsapp. Kami akan menanggapi setiap pesan secara profesional dan menjaga kerahasiaan penuh.
                </p>
            </div>
            {/* Right Buttons */}
            <div className="lg:w-1/3 w-full flex flex-col items-center lg:items-end justify-center mt-[-80px] md:mt-0">
                <div className="flex flex-col lg:flex-row gap-6 mt-4 w-full">
                    <a
                        href="mailto:info@jonb-associates.com"
                        className="flex items-center gap-2 px-6 py-4 rounded-none lg:rounded-full bg-[#FCD400] text-black font-semibold hover:bg-[#3a8c36] transition w-full lg:w-auto justify-center rounded rounded-lg"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 3h-9A2.5 2.5 0 005 5.5v13A2.5 2.5 0 007.5 21h9a2.5 2.5 0 002.5-2.5v-13A2.5 2.5 0 0016.5 3zM5 7l7 5 7-5" />
                        </svg>
                        Email
                    </a>
                    <a
                        href="https://wa.me/6281234567890"
                        className="flex items-center gap-2 px-6 py-4 rounded-none lg:rounded-full bg-[#FCD400] text-black font-semibold hover:bg-[#1da851] transition w-full lg:w-auto justify-center rounded rounded-lg"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 32 32" fill="currentColor">
                            <path d="M16 3C9.373 3 4 8.373 4 15c0 2.637.86 5.09 2.48 7.18L4 29l7.09-2.32A12.93 12.93 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.97 0-3.89-.52-5.56-1.5l-.4-.23-4.2 1.37 1.37-4.09-.26-.42A9.97 9.97 0 016 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.07-7.75c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.36-.26.28-1 1-1 2.43s1.03 2.82 1.18 3.02c.15.2 2.03 3.11 5.01 4.23.7.24 1.25.38 1.68.49.71.18 1.36.16 1.87.1.57-.07 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/>
                        </svg>
                        Whatsapp
                    </a>
                </div>
            </div>
        </div>
    </section>
    <SiteFooter />
    </div>
  );
}