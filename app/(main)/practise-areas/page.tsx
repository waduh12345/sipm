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
import { SiteFooter } from "@/components/site-footer";

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
        <div className="container mx-auto px-6 mb-20 text-center flex flex-col items-center mt-[-60px] md:mt-0">
            <div className="w-full lg:w-4/5">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-6">
                    <div className="flex items-center gap-3 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b]">
                        <span className="w-1.5 h-4 bg-[#a3238e] -skew-x-12 inline-block"></span>
                        Our Expertise
                    </div>
                </div>
                <h2 className="text-2xl lg:text-2xl font-light text-[#2f4e9b] leading-tight mb-12">
                    Jon Bernard & Associates memiliki pengalaman luas dalam menangani perkara hukum di bidang asuransi, korporasi, pasar modal, dan ketenagakerjaan, baik melalui jalur litigasi maupun non-litigasi. Dengan pendekatan strategis dan berorientasi hasil, kami siap mendampingi klien dalam penyelesaian sengketa di pengadilan, forum arbitrase, maupun melalui proses negosiasi yang efektif.
                </h2>
            </div>
        </div>

        {/* Large Image */}
        <div className="container mx-auto px-6 mb-20 mt-[-80px] md:mt-0">
            <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full">
                <Image 
                    src="/WhatsApp Image 2025-12-08 at 18.09.38.jpeg" 
                    alt="Our Expertise Meeting" 
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        </div>

        {/* What We Do Text */}
        <div className="container mx-auto px-6 mb-24 mt-[-40px] md:mt-0">
            <div className="flex items-center gap-3 mb-8 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b]">
                <span className="w-1.5 h-4 bg-[#50b848] -skew-x-12 inline-block"></span>
                What We Do
            </div>
            
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mt-[-20px] md:mt-0">
                <div className="lg:w-1/2">
                    <h3 className="text-2xl lg:text-4xl text-[#2f4e9b] font-light leading-snug">
                        Kami menyederhanakan masalah hukum yang kompleks dan memberikan solusi strategis yang dapat Anda andalkan.
                    </h3>
                </div>
                <div className="lg:w-1/2">
                    <p className="text-[#57595f] font-light leading-relaxed text-lg lg:text-base text-justify mt-[-30px] md:mt-0">
                        kami fokus menyediakan layanan hukum yang menyeluruh dan berorientasi pada hasil. Dengan pengalaman mendalam di bidang asuransi, hukum perusahaan, pasar modal, dan ketenagakerjaan, kami menangani setiap perkara melalui pendekatan litigasi maupun non-litigasi. Tim kami siap mewakili kepentingan Anda di pengadilan, arbitrase, hingga proses negosiasi, dengan strategi yang dirancang untuk melindungi posisi Anda secara maksimal.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* --- ACCORDION SECTION --- */}
      <section className="pb-12 md:pb-32 mt-[-80px] md:mt-0">
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
                                            <p className="text-[#57595f] font-light leading-relaxed text-lg lg:text-base">
                                                {item.overview}
                                            </p>
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

      {/* --- FOOTER --- */}
      <SiteFooter />
    </div>
  );
}