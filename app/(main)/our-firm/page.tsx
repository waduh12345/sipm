"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, ArrowRight,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { SiteHeader } from "@/components/site-header"; // Import komponen baru
import Footer from "@/components/footer/footer";

// --- DATA DUMMY (Sesuai Konten HTML) ---

const JOURNEY_DATA = [
  { year: "'92", title: "1992", text: "Jon Bernard & Associates is founded by four women, including Dyah Soewito and Ira A. Eddymurthy, and moves into Mayapada Tower, in the heart of Jakarta’s business district." },
  { year: "'97", title: "1997", text: "During the Asian economic crisis, Jon Bernard & Associates participates in the Initiative Group and contributes ideas on ways to deal with unsettled debt, including Indonesia’s new Bankruptcy Law." },
  { year: "'98-'00", title: "1998-2000", text: "Jon Bernard & Associates advises several clients with assets held by the Indonesian Bank Restructuring Agency (IBRA)." },
  { year: "'02", title: "2002", text: "Jon Bernard & Associates celebrates its 10th anniversary at Gedung Arsip Jakarta (National Archives Building) with more than 1,000 guests." },
  { year: "'03", title: "2003", text: "Jon Bernard & Associates appoints new partners for the first time, welcoming Rusmaini Lenggogeni, among others, to the firm’s partnership team." },
  { year: "'04", title: "2004", text: "Jon Bernard & Associates advises the creditor group on the restructuring of Asian Pulp & Paper, the largest debt restructuring in Asian history." },
  { year: "'06", title: "2006", text: "Jon Bernard & Associates is named Indonesia Law Firm of the Year by Who’s Who Legal. Jon Bernard & Associates is the first Indonesian law firm to receive this recognition." },
  { year: "'09", title: "2009", text: "Jon Bernard & Associates introduces three new partners, including Fitriana Mahiddin, and becomes the largest independent law firm in Indonesia." },
  { year: "'17", title: "2017", text: "Jon Bernard & Associates celebrates its 25th anniversary with a gala event at Grand Hyatt Jakarta and a cocktail party in Sydney." },
  { year: "'22", title: "2022", text: "Jon Bernard & Associates celebrates its 30th anniversary and unveils a new-look logo." },
];

const AFFILIATIONS = [
  { id: 1, name: "American Chamber of Commerce Indonesia", image: "https://www.ssek.com/wp-content/uploads/2022/07/aff-amchan.jpeg", url: "https://www.amcham.or.id/en/home" },
  { id: 2, name: "Employment Law Alliance", image: "https://www.ssek.com/wp-content/uploads/2022/07/aff-ela.png", url: "http://www.employmentlawalliance.com/" },
  { id: 3, name: "The Law Firm Network", image: "https://www.ssek.com/wp-content/uploads/2022/07/aff-lfn.png", url: "http://lfnglobal.com/" },
  { id: 4, name: "The Interlex Group", image: "https://www.ssek.com/wp-content/uploads/2022/07/aff-interlex.png", url: "https://www.interlexgroup.com/" },
  { id: 5, name: "Transatlantic Law International", image: "https://www.ssek.com/wp-content/uploads/2022/07/aff-translatic-law.png", url: "http://www.transatlanticlaw.com/" },
];

const AWARDS = [
  { id: 1, title: "Global Restructuring Review", image: "https://www.ssek.com/wp-content/uploads/2025/11/GRR_100_2025-Awards-Page.png" },
  { id: 2, title: "Asian Legal Business - Fintech", image: "https://www.ssek.com/wp-content/uploads/2025/10/ALB-Fintech-Awards-Page.png" },
  { id: 3, title: "Asialaw", image: "https://www.ssek.com/wp-content/uploads/2025/10/Asialaw-2025-Awards-Page.png" },
  { id: 4, title: "Asia Business Law Journal", image: "https://www.ssek.com/wp-content/uploads/2025/09/ABLJ-2025-Awards-Page.png" },
  { id: 5, title: "IFLR1000", image: "https://www.ssek.com/wp-content/uploads/2025/09/Top-Tier-Firm-2025-IFLR1000.png" },
  { id: 6, title: "Hukumonline Top 100", image: "https://www.ssek.com/wp-content/uploads/2025/07/Top-100-Indonesian-Law-Firms-2025-Awards-Page.png" },
];

export default function OurFirmPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAffiliation, setActiveAffiliation] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll handler untuk navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handler scroll timeline journey
  const scrollJourney = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen font-sans text-[#57595f] selection:bg-[#2f4e9b] selection:text-white bg-[#f7fbff]">
      
      {/* --- HEADER --- */}
      <SiteHeader />

      {/* --- CONTENT SPACER --- */}
      <div className="h-32"></div>

      {/* --- INTRO SECTION --- */}
      <section className="py-12">
        <div className="container mx-auto px-6 mb-20">
            <div className="flex flex-col items-center mb-24">
                <div className="w-10/12 flex flex-col lg:flex-row gap-8">
                    <div className="flex items-center gap-3 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b] min-w-[200px]">
                        <span className="w-1 h-3 bg-[#50b848] -skew-x-12 inline-block"></span>
                        About Us
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-light text-[#2f4e9b] leading-tight">
                        Firma Hukum Jon Bernard & Associates
                    </h2>
                </div>
            </div>

            <div className="w-11/12 mx-auto flex flex-col lg:flex-row gap-12 items-center">
                <div className="lg:w-7/12 relative aspect-[4/3] w-full">
                    <Image 
                        src="http://ssek.com/wp-content/uploads/2022/07/SSEK_Website-Photo_Our-Firm-Page.jpg" 
                        alt="Our Firm Meeting" 
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="lg:w-5/12">
                    <h3 className="text-2xl lg:text-2xl text-[#2f4e9b] font-light leading-snug mb-8">
                        Jon Bernard & Associates (“Firma Hukum”) berkomitmen penuh untuk memberikan jasa hukum yang baik dan bermutu serta memberikan perhatian yang penuh kepada klien.
                    </h3>
                    <div className="text-[#57595f] font-light leading-relaxed space-y-6 text-sm lg:text-base">
                        <p>Tujuan Firma Hukum ini adalah membantu para klien secara efektif dan efisien untuk mencapai tujuannya dan menyelesaikan segala transaksi dan permasalahan yang sedang dan/atau akan dihadapinya.</p>
                        <p>Firma Hukum ini didirikan pada bulan Mei 2008 dan telah dipercaya oleh banyak perusahaan, termasuk perusahaan modal asing yang melakukan kegiatan usaha di Indonesia dan/atau didirikan dengan hukum Indonesia, mulai dari industri asuransi, perbankan, keuangan, industri manufaktur, perdagangan hingga pertambangan.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- Jon Bernard & Associates JOURNEY (Blue Background) --- */}
      <section className="bg-[#2f4e9b] py-24 text-white overflow-hidden">
        <div className="container mx-auto px-6 mb-12">
            <div className="flex items-center gap-3 mb-6 uppercase text-sm tracking-[0.15em] font-semibold text-[#50b848]">
                <span className="w-1 h-3 bg-[#50b848] -skew-x-12 inline-block"></span>
                Jon Bernard & Associates Journey
            </div>
            <div className="flex justify-between items-end">
                <h3 className="text-4xl font-light">Story of Growth</h3>
                <div className="flex gap-4">
                    <button onClick={() => scrollJourney('left')} className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center hover:bg-white/20 transition-all">
                        <ChevronLeft size={18} />
                    </button>
                    <button onClick={() => scrollJourney('right')} className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center hover:bg-white/20 transition-all">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>

        {/* Timeline Slider */}
        <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 px-6 pb-12 snap-x scrollbar-hide container mx-auto"
        >
            {JOURNEY_DATA.map((item, idx) => (
                <div key={idx} className="min-w-[85vw] lg:min-w-[30vw] snap-center bg-[#4a67b5] rounded-xl p-8 lg:p-10 flex flex-col h-[60vh] relative overflow-hidden group hover:bg-[#58b0e3] transition-colors duration-500 cursor-pointer">
                    <div className="text-[120px] lg:text-[180px] font-bold absolute -top-10 -left-4 opacity-20 select-none leading-none">
                        {item.year}
                    </div>
                    <div className="relative z-10 mt-20 lg:mt-32">
                        <h4 className="text-3xl font-light mb-6">{item.title}</h4>
                        <div className="text-sm lg:text-base font-light leading-relaxed h-48 overflow-y-auto pr-2 custom-scrollbar">
                            {item.text}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* --- AFFILIATIONS & MEMBERSHIPS --- */}
      <section className="py-24 bg-[#f7fbff]">
        <div className="container mx-auto px-6">
            <div className="flex items-center gap-3 mb-6 uppercase text-sm tracking-[0.15em] font-semibold text-[#58b0e3]">
                <span className="w-1 h-3 bg-[#58b0e3] -skew-x-12 inline-block"></span>
                Our Team
            </div>
            
            <div className="flex flex-col lg:flex-row gap-16 mb-20">
                <div className="lg:w-5/12">
                    <h3 className="text-2xl lg:text-2xl text-[#2f4e9b] text-justify font-light leading-snug mb-8">
                        Partner dan semua associate Firma Hukum adalah lulusan dari fakultas hukum terkemuka di Indonesia. Firma Hukum secara berkelanjutan berusaha mengembangkan keterampilan hukum dan pengetahuan khusus para associate. Semua lawyer berbahasa Indonesia dan Inggris. Di samping ini adalah uraian singkat mengenai lawyers kami.
                    </h3>
                </div>
                
                {/* Logo Grid */}
                <div className="lg:w-7/12 grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {AFFILIATIONS.map((aff) => (
                        <div 
                            key={aff.id} 
                            className="group cursor-pointer relative"
                            onClick={() => setActiveAffiliation(aff.id)}
                        >
                            <div className="relative h-24 w-full mb-4 border-b border-transparent group-hover:border-[#2f4e9b] transition-all pb-2">
                                <Image src={aff.image} alt={aff.name} fill className="object-contain object-left" />
                            </div>
                            <p className="text-[#2f4e9b] text-sm group-hover:font-semibold transition-all">
                                {aff.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Affiliation Popup / Modal Simulation */}
        <AnimatePresence>
            {activeAffiliation && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] flex"
                >
                    {/* Curtain Overlay */}
                    <div className="w-full lg:w-[43%] h-full bg-[#2f4e9b] opacity-90" onClick={() => setActiveAffiliation(null)}></div>
                    
                    {/* Content */}
                    <div className="w-full lg:w-[57%] h-full bg-[#f7fbff] p-8 lg:p-20 overflow-y-auto relative shadow-2xl">
                        <button onClick={() => setActiveAffiliation(null)} className="absolute top-10 right-10">
                            <X className="w-8 h-8 text-[#2f4e9b]" />
                        </button>
                        
                        {AFFILIATIONS.filter(a => a.id === activeAffiliation).map(aff => (
                            <div key={aff.id} className="mt-10">
                                <div className="flex items-center gap-3 mb-6 uppercase text-sm tracking-[0.15em] font-semibold text-[#58b0e3]">
                                    <span className="w-1 h-3 bg-[#58b0e3] -skew-x-12 inline-block"></span>
                                    Affiliations & Memberships
                                </div>
                                <h3 className="text-3xl text-[#2f4e9b] font-bold mb-10">{aff.name}</h3>
                                <div className="relative w-full h-64 border border-gray-300 bg-white mb-10 flex items-center justify-center p-8">
                                    <Image src={aff.image} alt={aff.name} width={300} height={150} className="object-contain" />
                                </div>
                                <div className="flex gap-12">
                                    <div className="w-1/4 uppercase text-[#2f4e9b] tracking-widest text-sm font-semibold">Overview</div>
                                    <div className="w-3/4">
                                        <p className="text-sm leading-relaxed mb-8">
                                            Jon Bernard & Associates is a longstanding member of {aff.name}, leveraging global networks to provide best-in-class legal services.
                                        </p>
                                        <a href={aff.url} target="_blank" rel="noreferrer">
                                            <Button variant="outline" className="border-[#2f4e9b] text-[#2f4e9b] hover:bg-[#2f4e9b] hover:text-white rounded-full px-6 uppercase text-xs tracking-wider">
                                                Go To Website
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </section>

      {/* --- AWARDS & ACCOLADES --- */}
      <section className="pb-24 bg-[#f7fbff]">
        <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-12 border-b border-[#2f4e9b]/20 pb-8">
                <div>
                    <div className="flex items-center gap-3 mb-4 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b]">
                        <span className="w-1 h-3 bg-[#50b848] -skew-x-12 inline-block"></span>
                        Awards & Accolades
                    </div>
                    <p className="text-2xl lg:text-3xl text-[#2f4e9b] font-light max-w-xl">
                        We are recognized as a top-tier firm across multiple practice areas.
                    </p>
                </div>
                <div className="mt-6 lg:mt-0 min-w-[200px]">
                    <Select defaultValue="2025">
                        <SelectTrigger className="w-full border-0 border-b border-gray-300 rounded-none bg-transparent focus:ring-0 text-[#2f4e9b] text-xl">
                            <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2025">2025</SelectItem>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2023">2023</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                {AWARDS.map((award) => (
                    <div key={award.id} className="h-32 flex flex-col justify-between group cursor-pointer">
                        <div className="relative h-20 w-full">
                            <Image src={award.image} alt={award.title} fill className="object-contain object-left" />
                        </div>
                        <div className="border-b border-gray-200 group-hover:border-[#2f4e9b] pb-2 transition-colors">
                            <span className="text-xs text-gray-500 group-hover:text-[#2f4e9b]">{award.title}</span>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="flex justify-center mt-12">
                <div className="flex flex-col items-center gap-2 cursor-pointer text-[#2f4e9b] opacity-80 hover:opacity-100">
                    <span className="uppercase text-xs tracking-widest">Load More</span>
                    <div className="w-[1px] h-10 bg-[#2f4e9b]"></div>
                </div>
            </div>
        </div>
      </section>

      {/* --- CO-FOUNDER TRIBUTE --- */}
      <section className="py-24 bg-[#f7fbff]">
        <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2">
                    <div className="relative aspect-[1.3] w-full">
                        <Image 
                            src="http://ssek.com/wp-content/uploads/2022/07/co-founder-image.png"
                            alt="Dyah Soewito"
                            fill
                            className="object-contain object-left"
                        />
                    </div>
                </div>
                <div className="lg:w-1/2">
                    <div className="flex items-center gap-3 mb-6 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b]">
                        <span className="w-1 h-3 bg-[#a3238e] -skew-x-12 inline-block"></span>
                        Jon Bernard & Associates Co-Founder Dyah Soewito
                    </div>
                    <h3 className="text-3xl text-[#2f4e9b] font-light mb-6">
                        A friend and mentor for countless lawyers over thirty-plus years.
                    </h3>
                    <p className="text-[#57595f] font-light mb-8">
                        Jon Bernard & Associates remembers Dyah Soewito, a founding partner, one of the country’s leading corporate lawyers and a mentor to generations of lawyers.
                    </p>
                    <Link href="#">
                        <Button variant="outline" className="border-[#2f4e9b] text-[#2f4e9b] hover:bg-[#2f4e9b] hover:text-white rounded-full px-8 py-6 uppercase text-xs tracking-wider">
                            Read More About Dyah Soewito
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* --- NEWSLETTER --- */}
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