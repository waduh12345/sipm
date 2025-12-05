"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight,
  ArrowUpRight
} from "lucide-react";
import { SiteHeader } from "@/components/site-header"; // Import komponen baru
import Footer from "@/components/footer/footer";

// --- DATA DUMMY (Sesuai Konten Asli) ---
const EXPERTISE_DATA = [
  {
    title: "Asuransi & Re-asuransi",
    overview: "Jon Bernard & Associates memiliki pengalaman luas dalam menangani berbagai aspek hukum asuransi dan re-asuransi, termasuk penyusunan kontrak, penyelesaian sengketa, dan kepatuhan terhadap regulasi yang berlaku.",
    news: [
      "Jon Bernard & Associates Named One of Indonesia’s Top Law Firms in the Asialaw 2025 Rankings",
      "Jon Bernard & Associates Lawyers Share Legal Insights with Siam Cement Group"
    ]
  },
  {
    title: "Litigasi Koorporasi, Arbitrase, Kepailitan dan Penundaan Kewajiban Pembayaran Utang (PKPU) Litigasi Kriminal",
    overview: "Jon Bernard & Associates memiliki pengalaman dalam litigasi korporasi, arbitrase, dan kepailitan, serta penundaan kewajiban pembayaran utang (PKPU) dan litigasi kriminal. Kami secara rutin menangani masalah terkait ketenagakerjaan termasuk mewakili klien korporat di pengadilan.",
    news: [
      "Jon Bernard & Associates Founding Partner Speaks at BANI Anniversary Seminar",
      "Jon Bernard & Associates Partner Leads Panel Discussion at 7th ICC Indonesia Arbitration Day"
    ]
  },
  {
    title: "Pasar Modal & Sekuritas",
    overview: "Jon Bernard & Associates memberikan nasihat kepada penerbit, penjamin emisi, dan investor dalam transaksi saham, obligasi, obligasi konversi, dan surat komersial, serta mempersiapkan dan membantu klien dengan IPO, penawaran sekunder atau berikutnya.",
    news: [
      "Indonesia Issues Draft OJK Regulation on Digital Financial Asset Offerings",
      "Jon Bernard & Associates Contributes Indonesia Banking Regulation Overview to Thomson Reuters"
    ]
  },
  {
    title: "Hukum Perusahaan (Aksi koorporasi: penggabungan, pengambilalihan dan restrukturisasi)",
    overview: "Jon Bernard & Associates memiliki pengalaman luas dalam menangani berbagai transaksi perusahaan, termasuk penggabungan, pengambilalihan, dan restrukturisasi. Kami memberikan nasihat strategis untuk membantu klien mencapai tujuan bisnis mereka secara efektif.",
    news: [
      "Hot Topics in Corporate Governance in Indonesia",
      "11 Jon Bernard & Associates Lawyers Recognized in IFLR1000 Indonesia 2025"
    ]
  },
  {
    title: "Perbankan & Keuangan",
    overview: "Jon Bernard & Associates memberikan nasihat kepada bank domestik dan internasional, lembaga keuangan non-bank, perusahaan pembiayaan, dan perusahaan modal ventura dalam berbagai transaksi pembiayaan, termasuk pembiayaan proyek, pembiayaan perdagangan, dan restrukturisasi utang.",
    news: [
      "Indonesia Issues New Environmental Standard: What Mining Companies Must Know",
      "Nine Jon Bernard & Associates Lawyers Recognized Among Indonesia’s Leading Practitioners"
    ]
  },
  {
    title: "Konstruksi dan Infrastruktur",
    overview: "Jon Bernard & Associates memiliki pengalaman dalam menangani berbagai proyek konstruksi dan infrastruktur, termasuk penyusunan kontrak, penyelesaian sengketa, dan kepatuhan terhadap regulasi yang berlaku di sektor ini.",
    news: [
      "ESG in APAC 2025 – Indonesia",
      "Landmark Court Ruling Expands Legal Protection for Environmental Activists"
    ]
  },
  {
    title: "Pertambangan, Energi, Minyak dan Gas",
    overview: "Jon Bernard & Associates memberikan nasihat kepada perusahaan pertambangan, energi, minyak, dan gas dalam berbagai aspek hukum, termasuk perizinan, kepatuhan regulasi, dan penyelesaian sengketa di sektor ini.",
    news: [
      "Jon Bernard & Associates Again a Recommended Firm for Indonesia in Asia Pacific Green Guide",
      "Jon Bernard & Associates Assists on Singapore Listing of Malaysian Plantation Group TSH Resources Berhad"
    ]
  },
  {
    title: "Kekayaan Intelektual dan Informasi Teknologi",
    overview: "Kami bertindak sebagai penasihat bagi pengembang dan pemberi pinjaman dalam semua jenis proyek pengembangan infrastruktur, termasuk proyek pembangkit listrik swasta senilai jutaan dolar, jalan tol, telekomunikasi, dan proyek pasokan air.",
    news: [
      "Jon Bernard & Associates Law Firm – 17 Recommended Lawyers Across 11 Practice Areas in Legal 500",
      "Construction and Projects in Indonesia – Practical Law Guide"
    ]
  }
];

export default function OurExpertisePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  // Scroll effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="min-h-screen font-sans text-[#57595f] bg-[#f7fbff] selection:bg-[#2f4e9b] selection:text-white">
      
      {/* --- HEADER --- */}
      <SiteHeader />

      {/* --- CONTENT SPACER --- */}
      <div className="h-32"></div>

      {/* --- HERO SECTION --- */}
      <section className="py-12">
        <div className="container mx-auto px-6 mb-20 text-center flex flex-col items-center">
            <div className="w-full lg:w-4/5">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-6">
                    <div className="flex items-center gap-3 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b]">
                        <span className="w-1.5 h-4 bg-[#a3238e] -skew-x-12 inline-block"></span>
                        Our Expertise
                    </div>
                </div>
                <h2 className="text-3xl lg:text-4xl font-light text-[#2f4e9b] leading-tight mb-12">
                    Jon Bernard & Associates berpengalaman menangani kasus hukum asuransi, perusahaan, pasar modal, dan ketenagakerjaan, baik secara litigasi maupun non-litigasi. Kami siap membantu klien menyelesaikan perkara di pengadilan, arbitrase, maupun melalui negosiasi.
                </h2>
            </div>
        </div>

        {/* Large Image */}
        <div className="container mx-auto px-6 mb-20">
            <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full">
                <Image 
                    src="http://ssek.com/wp-content/uploads/2022/07/SSEK_Website-Photo_Our-Expertise-Page.jpg" 
                    alt="Our Expertise Meeting" 
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        </div>

        {/* What We Do Text */}
        <div className="container mx-auto px-6 mb-24">
            <div className="flex items-center gap-3 mb-8 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b]">
                <span className="w-1.5 h-4 bg-[#50b848] -skew-x-12 inline-block"></span>
                What We Do
            </div>
            
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                <div className="lg:w-1/2">
                    <h3 className="text-3xl lg:text-4xl text-[#2f4e9b] font-light leading-snug">
                        Our work for local, foreign and multinational clients spans specialist areas
                    </h3>
                </div>
                <div className="lg:w-1/2">
                    <p className="text-[#57595f] font-light leading-relaxed text-sm lg:text-base">
                        We provide an informed perspective on issues faced by companies navigating Indonesia’s legal landscape. We have the depth and breadth of Indonesian legal experience and knowledge to deliver creative commercial solutions to real-world business problems.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* --- ACCORDION SECTION --- */}
      <section className="pb-32">
        <div className="container mx-auto px-6 lg:px-24">
            <div className="border-t border-gray-200">
                {EXPERTISE_DATA.map((item, index) => (
                    <div key={index} className="border-b border-gray-200">
                        {/* Header */}
                        <div 
                            onClick={() => toggleAccordion(index)}
                            className="py-8 cursor-pointer flex justify-between items-center group select-none"
                        >
                            <h4 className={`text-2xl lg:text-3xl font-light transition-colors duration-300 ${activeAccordion === index ? 'text-[#2f4e9b]' : 'text-[#2f4e9b] hover:opacity-70'}`}>
                                {item.title}
                            </h4>
                            <div className="relative w-6 h-6 flex items-center justify-center">
                                {/* Horizontal line (always visible) */}
                                <div className="absolute w-full h-[1px] bg-[#2f4e9b]"></div>
                                {/* Vertical line (rotates/fades) */}
                                <motion.div 
                                    initial={false}
                                    animate={{ rotate: activeAccordion === index ? 90 : 0, opacity: activeAccordion === index ? 0 : 1 }}
                                    className="absolute h-full w-[1px] bg-[#2f4e9b]"
                                ></motion.div>
                            </div>
                        </div>

                        {/* Content */}
                        <AnimatePresence>
                            {activeAccordion === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-10 pl-4 lg:pl-8">
                                        {/* Overview */}
                                        <div className="mb-8">
                                            <div className="flex items-center gap-3 mb-4 uppercase text-xs tracking-[0.15em] font-semibold text-[#2f4e9b]">
                                                <span className="w-1 h-3 bg-[#50b848] -skew-x-12 inline-block"></span>
                                                Overview
                                            </div>
                                            <p className="text-[#57595f] font-light leading-relaxed text-sm lg:text-base">
                                                {item.overview}
                                            </p>
                                        </div>

                                        {/* News & Insights */}
                                        <div>
                                            <div className="flex items-center gap-3 mb-4 uppercase text-xs tracking-[0.15em] font-semibold text-[#2f4e9b]">
                                                <span className="w-1 h-3 bg-[#58b0e3] -skew-x-12 inline-block"></span>
                                                News & Insights
                                            </div>
                                            <ul className="flex flex-col gap-3">
                                                {item.news.map((newsItem, i) => (
                                                    <li key={i} className="group">
                                                        <Link href="#" className="flex items-start gap-2 text-[#2f4e9b] text-sm uppercase font-normal tracking-wide hover:opacity-70 transition-opacity">
                                                            <span>{newsItem}</span>
                                                            <ArrowUpRight className="w-4 h-4 rotate-45 mt-0.5 shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
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
                    {/* Vertical line decoration */}
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