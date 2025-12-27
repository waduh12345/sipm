"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, ChevronRight, ChevronDown
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

// --- DATA DUMMY (MENSIMULASIKAN DATA DINAMIS DARI SLUG) ---
const ATTORNEY_DATA = {
  name: "Ira Andamara Eddymurthy",
  role: "Partner",
  email: "iraeddymurthy@ssek.com",
  linkedin: "https://id.linkedin.com/pub/ira-eddymurthy/28/347/920",
  image: "https://www.ssek.com/wp-content/uploads/2022/07/Ira-Andamara-Eddymurthy-wpcf_1000x504.jpg",
  bio: [
    "Ira A. Eddymurthy is a founding partner of SSEK Law Firm and one of Indonesia’s most experienced and highly regarded lawyers. She has more than three decades of experience advising multinationals and domestic companies on Indonesia’s complex regulatory environment.",
    "Chambers & Partners, a leading independent legal directory, quotes clients praising Ira’s “sophisticated knowledge of Indonesian law” and “comprehensive knowledge and understanding of the commercial aims of clients.”",
    "Ira was named to IFLR Asia Best Lawyers 2022, which recognizes the top individual legal practitioners in the region, and was included in the 2022 IFLR1000 Women Leaders, a ranking of the most prominent women lawyers across the world. Ira has been included in the Asia Business Law Journal A-List of the Top 100 lawyers in Indonesia every year since the list was introduced in 2018.",
    "Ira has been admitted to the Indonesian National Board of Arbitration (BANI) panel of arbitrators."
  ],
  accordions: [
    {
      title: "Areas of Focus",
      content: (
        <ul className="list-disc pl-5 space-y-2 font-light text-sm text-[#57595f]">
          <li>Banking and finance, including project finance</li>
          <li>Capital markets</li>
          <li>Corporate law and mergers and acquisitions</li>
          <li>Insurance law</li>
          <li>Oil and gas law</li>
          <li>Tax law</li>
        </ul>
      )
    },
    {
      title: "Representative Matters",
      content: (
        <ul className="list-disc pl-5 space-y-2 font-light text-sm text-[#57595f]">
          <li>Acted for PT Indo Kordsa Tbk, a leader in tire cord technology, in a merger with its subsidiary PT Indo Kordsa Polyester.</li>
          <li>Advised PT Indosat Tbk on the establishment of a data center joint venture.</li>
          <li>Assisted Restaurant Brands Asia Limited as Indonesian counsel in the acquisition of a controlling stake in PT Sari Burger Indonesia.</li>
          <li>Advised on the formation of the Indonesian Oil and Gas Holding SOE, a US$4 billion deal.</li>
        </ul>
      )
    },
    {
      title: "Education",
      content: (
        <ul className="list-disc pl-5 space-y-2 font-light text-sm text-[#57595f]">
           <li>University of Indonesia, S.H., 1984</li>
           <li>Visiting scholar at the University of California, Berkeley, School of Law, 1990-91</li>
           <li>Academy of American and International Law in Dallas, Texas, 1991</li>
           <li>King’s College London, LL.M., International Corporate and Commercial Law, 2023</li>
        </ul>
      )
    },
    {
        title: "Recognition",
        type: "awards" // Special type to render logos
    }
  ]
};

const AWARD_LOGOS = [
    "https://www.ssek.com/wp-content/uploads/2024/09/3.png",
    "https://www.ssek.com/wp-content/uploads/2025/09/Women-Leader-2025-IFLR1000.png",
    "https://www.ssek.com/wp-content/uploads/2025/09/Highly-Regarded-Lawyer-2025-IFLR1000.png",
    "https://www.ssek.com/wp-content/uploads/2025/06/Hukumonline-Practice-Leaders-2025-Logo-Awards-Page.png",
    "https://www.ssek.com/wp-content/uploads/2025/05/Rosette-A-List-Indonesia-2025-Transparant_Icon_Awards-Page.png",
    "https://www.ssek.com/wp-content/uploads/2022/07/Indonesias-Most-Influential-Lawyers-Awards-Page.png",
];

const RELATED_NEWS = [
    {
        id: 1,
        title: "SSEK Founding Partner Speaks at BANI Anniversary Seminar",
        date: "3 December 2025",
        category: "Events",
        image: "https://www.ssek.com/wp-content/uploads/2025/12/IEA-Hut-BANI-Blog-Image.jpg"
    },
    {
        id: 2,
        title: "Indonesia Halal Certification Compliance Strengthened",
        date: "7 November 2025",
        category: "Legal Updates",
        image: "https://www.ssek.com/wp-content/uploads/2025/11/Indonesia-Strengthens-Halal-Compliance-Framework-Blog-Image.jpg"
    }
];

const SIDEBAR_LINKS = {
    partners: ["Rusmaini Lenggogeni", "Fitriana Mahiddin", "Denny Rahmansyah", "Syahdan Z. Aziz"],
    advisors: ["Michael D. Twomey", "Jonathan M. Streifer", "Michael S. Carl"],
    associates: ["Dicky Tanjung", "Indrawan Dwi Yuriutomo", "Maria Y. Eka Dewi"]
};

export default function AttorneyDetailPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [sidebarAccordion, setSidebarAccordion] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleAccordion = (idx: number) => {
    setActiveAccordion(activeAccordion === idx ? null : idx);
  };
  
  const toggleSidebar = (section: string) => {
    setSidebarAccordion(sidebarAccordion === section ? null : section);
  };

    const scrollSlider = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 400;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen font-sans text-[#57595f] bg-[#f7fbff] selection:bg-[#2f4e9b] selection:text-white">
      
      {/* --- HEADER --- */}
      <SiteHeader />

      {/* --- CONTENT SPACER --- */}
      <div className="h-32"></div>

      <main className="pb-24">
        <div className="container mx-auto px-6 flex flex-col-reverse lg:flex-row gap-12">
            
            {/* --- SIDEBAR (ATTORNEYS LIST) --- */}
            <div className="w-full lg:w-1/4 lg:pr-8">
                <div className="flex items-center gap-3 mb-6 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b] lg:hidden">
                    <span className="w-1.5 h-4 bg-gray-400 -skew-x-12 inline-block"></span>
                    Attorneys
                </div>

                {/* Sidebar Accordions */}
                <div className="border-t border-gray-200">
                     {/* Partner */}
                     <div className="border-b border-gray-200">
                        <div onClick={() => toggleSidebar('partner')} className="py-4 cursor-pointer flex justify-between items-center text-[#2f4e9b] uppercase text-xs tracking-widest font-medium">
                            Partner
                            <ChevronDown className={`w-4 h-4 transition-transform ${sidebarAccordion === 'partner' ? 'rotate-180' : ''}`} />
                        </div>
                        <AnimatePresence>
                            {sidebarAccordion === 'partner' && (
                                <motion.div 
                                    initial={{height: 0}} animate={{height: 'auto'}} exit={{height: 0}}
                                    className="overflow-hidden"
                                >
                                    <ul className="pb-4 pl-4 space-y-2 text-sm font-light">
                                        {SIDEBAR_LINKS.partners.map((p, i) => <li key={i}><Link href="#" className="hover:text-[#2f4e9b]">{p}</Link></li>)}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                     </div>

                     {/* Advisor */}
                     <div className="border-b border-gray-200">
                        <div onClick={() => toggleSidebar('advisor')} className="py-4 cursor-pointer flex justify-between items-center text-[#2f4e9b] uppercase text-xs tracking-widest font-medium">
                            Advisor
                            <ChevronDown className={`w-4 h-4 transition-transform ${sidebarAccordion === 'advisor' ? 'rotate-180' : ''}`} />
                        </div>
                        <AnimatePresence>
                            {sidebarAccordion === 'advisor' && (
                                <motion.div 
                                    initial={{height: 0}} animate={{height: 'auto'}} exit={{height: 0}}
                                    className="overflow-hidden"
                                >
                                    <ul className="pb-4 pl-4 space-y-2 text-sm font-light">
                                        {SIDEBAR_LINKS.advisors.map((p, i) => <li key={i}><Link href="#" className="hover:text-[#2f4e9b]">{p}</Link></li>)}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                     </div>

                     {/* Associate */}
                     <div className="border-b border-gray-200">
                        <div onClick={() => toggleSidebar('associate')} className="py-4 cursor-pointer flex justify-between items-center text-[#2f4e9b] uppercase text-xs tracking-widest font-medium">
                            Associate
                            <ChevronDown className={`w-4 h-4 transition-transform ${sidebarAccordion === 'associate' ? 'rotate-180' : ''}`} />
                        </div>
                        <AnimatePresence>
                            {sidebarAccordion === 'associate' && (
                                <motion.div 
                                    initial={{height: 0}} animate={{height: 'auto'}} exit={{height: 0}}
                                    className="overflow-hidden"
                                >
                                    <ul className="pb-4 pl-4 space-y-2 text-sm font-light">
                                        {SIDEBAR_LINKS.associates.map((p, i) => <li key={i}><Link href="#" className="hover:text-[#2f4e9b]">{p}</Link></li>)}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                     </div>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="w-full lg:w-3/4">
                {/* Header Section */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4 uppercase text-sm tracking-[0.15em] font-semibold text-[#58b0e3]">
                        <span className="w-1.5 h-4 bg-[#58b0e3] -skew-x-12 inline-block"></span>
                        {ATTORNEY_DATA.role}
                    </div>
                    <h1 className="text-4xl lg:text-5xl text-[#2f4e9b] font-light mb-8">{ATTORNEY_DATA.name}</h1>
                    
                    <div className="w-full relative aspect-[2/1] mb-8 rounded-sm overflow-hidden">
                        <Image src={ATTORNEY_DATA.image} alt={ATTORNEY_DATA.name} fill className="object-cover object-top" />
                    </div>

                    {/* Contact Bar */}
                    <div className="flex flex-col md:flex-row gap-6 md:items-center border-b border-gray-200 pb-8 mb-8">
                        <a href={`mailto:${ATTORNEY_DATA.email}`} className="text-[#2f4e9b] uppercase text-xs tracking-widest font-semibold hover:underline">
                            {ATTORNEY_DATA.email}
                        </a>
                        <div className="flex items-center gap-4">
                             <a href={ATTORNEY_DATA.linkedin} target="_blank" rel="noreferrer">
                                <img src="https://www.ssek.com/wp-content/uploads/2022/07/icon-linkedin-1.png" alt="LinkedIn" className="h-5 w-auto" />
                             </a>
                             <div className="flex items-center gap-2 cursor-pointer group">
                                <img src="https://www.ssek.com/wp-content/uploads/2022/07/icon-download.png" alt="Download" className="h-5 w-auto" />
                                <span className="text-[#2f4e9b] uppercase text-xs tracking-widest font-semibold group-hover:underline">Download Profile</span>
                             </div>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-6 text-[#57595f] font-light leading-relaxed text-sm lg:text-base">
                        {ATTORNEY_DATA.bio.map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </div>
                </div>

                {/* Accordions */}
                <div className="border-t border-gray-200 mt-12">
                    {ATTORNEY_DATA.accordions.map((item, index) => (
                        <div key={index} className="border-b border-gray-200">
                            <div 
                                onClick={() => toggleAccordion(index)}
                                className="py-6 cursor-pointer flex justify-between items-center group select-none"
                            >
                                <h4 className="text-xl lg:text-2xl font-light text-[#2f4e9b] transition-opacity group-hover:opacity-70">
                                    {item.title}
                                </h4>
                                <div className="relative w-5 h-5 flex items-center justify-center">
                                    <div className="absolute w-full h-[1px] bg-[#2f4e9b]"></div>
                                    <motion.div 
                                        initial={false}
                                        animate={{ rotate: activeAccordion === index ? 90 : 0, opacity: activeAccordion === index ? 0 : 1 }}
                                        className="absolute h-full w-[1px] bg-[#2f4e9b]"
                                    ></motion.div>
                                </div>
                            </div>
                            <AnimatePresence>
                                {activeAccordion === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-8 pl-4">
                                            {item.type === 'awards' ? (
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                                    {AWARD_LOGOS.map((logo, i) => (
                                                        <div key={i} className="relative h-24 w-full grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100">
                                                            <Image src={logo} alt="Award" fill className="object-contain" />
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : item.content}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* News & Insights */}
                <div className="mt-16">
                    <div className="flex items-center gap-3 mb-8 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b]">
                        <span className="w-1.5 h-4 bg-[#a3238e] -skew-x-12 inline-block"></span>
                        News & Insights
                    </div>
                    
                    <div className="relative">
                        <div className="flex overflow-x-auto gap-6 pb-8 snap-x scrollbar-hide" ref={scrollRef}>
                            {RELATED_NEWS.map((news) => (
                                <div key={news.id} className="min-w-[300px] w-[300px] snap-center group cursor-pointer">
                                    <div className="relative aspect-[1.6] w-full mb-4 overflow-hidden rounded-sm">
                                        <Image src={news.image} alt={news.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                    </div>
                                    <div className="text-xs uppercase tracking-widest text-[#57595f] mb-2">
                                        {news.category} / {news.date}
                                    </div>
                                    <h4 className="text-lg font-light text-[#2f4e9b] leading-tight mb-4 group-hover:opacity-80">
                                        {news.title}
                                    </h4>
                                    <button className="border border-[#2f4e9b] text-[#2f4e9b] group-hover:bg-[#2f4e9b] group-hover:text-white rounded-full px-6 py-2 text-[10px] uppercase tracking-widest transition-all">
                                        Read Article
                                    </button>
                                </div>
                            ))}
                        </div>
                        {/* Arrows */}
                        <div className="flex gap-3 mt-4 justify-end lg:hidden">
                             <button onClick={() => scrollSlider('left')} className="w-10 h-10 rounded-full border border-[#2f4e9b] flex items-center justify-center text-[#2f4e9b]">
                                <ChevronLeft size={18} />
                             </button>
                             <button onClick={() => scrollSlider('right')} className="w-10 h-10 rounded-full border border-[#2f4e9b] flex items-center justify-center text-[#2f4e9b]">
                                <ChevronRight size={18} />
                             </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <SiteFooter />
    </div>
  );
}