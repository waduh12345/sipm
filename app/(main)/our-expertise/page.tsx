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
    title: "Antitrust & Competition Law",
    overview: "Jon Bernard & Associates advises clients on unfair trade practices and other competition law restrictions. Our competition law practice group works closely with our M&A team in securing approvals from Indonesia’s Business Competition Supervisory Commission (KPPU).",
    news: [
      "Jon Bernard & Associates Named One of Indonesia’s Top Law Firms in the Asialaw 2025 Rankings",
      "Jon Bernard & Associates Lawyers Share Legal Insights with Siam Cement Group"
    ]
  },
  {
    title: "Arbitration & Dispute Resolution",
    overview: "Jon Bernard & Associates is experienced in civil litigation, arbitrations and dealing with the Indonesian national police in criminal investigations and complaints. We regularly handle employment-related matters including representing corporate clients in court.",
    news: [
      "Jon Bernard & Associates Founding Partner Speaks at BANI Anniversary Seminar",
      "Jon Bernard & Associates Partner Leads Panel Discussion at 7th ICC Indonesia Arbitration Day"
    ]
  },
  {
    title: "Banking & Finance",
    overview: "We assist clients who want to enter Indonesia’s banking, financing and insurance markets, advising on all legal aspects of establishing and operating financial institutions in Indonesia.",
    news: [
      "Indonesia Issues Draft OJK Regulation on Digital Financial Asset Offerings",
      "Jon Bernard & Associates Contributes Indonesia Banking Regulation Overview to Thomson Reuters"
    ]
  },
  {
    title: "Capital Markets & Securities",
    overview: "Jon Bernard & Associates advises issuers, underwriters and investors in stock, bond, convertible bond and commercial paper transactions, and prepares for and assists clients with IPOs, secondary or subsequent offerings.",
    news: [
      "Hot Topics in Corporate Governance in Indonesia",
      "11 Jon Bernard & Associates Lawyers Recognized in IFLR1000 Indonesia 2025"
    ]
  },
  {
    title: "Energy, Mining & Geothermal",
    overview: "Jon Bernard & Associates counsels foreign investors in the coal and hard rock mining sector and keeps up to date with new mining regulations that have radically changed the investment climate.",
    news: [
      "Indonesia Issues New Environmental Standard: What Mining Companies Must Know",
      "Nine Jon Bernard & Associates Lawyers Recognized Among Indonesia’s Leading Practitioners"
    ]
  },
  {
    title: "Environment",
    overview: "Jon Bernard & Associates does a lot of work in the environmental and blue and green energy spaces, from working with multinationals on the clean-up of project sites to advising on first-of-their-kind projects for Indonesia involving plastic credits.",
    news: [
      "ESG in APAC 2025 – Indonesia",
      "Landmark Court Ruling Expands Legal Protection for Environmental Activists"
    ]
  },
  {
    title: "Forestry & Plantation",
    overview: "Jon Bernard & Associates counsels investors working to establish companies in the forestry and palm oil plantation businesses, and the service companies that support them.",
    news: [
      "Jon Bernard & Associates Again a Recommended Firm for Indonesia in Asia Pacific Green Guide",
      "Jon Bernard & Associates Assists on Singapore Listing of Malaysian Plantation Group TSH Resources Berhad"
    ]
  },
  {
    title: "Infrastructure & Project Finance",
    overview: "We act as counsel to developers and lenders in all types of infrastructure development projects, including multimillion-dollar private power, toll road, telecommunications and water supply projects.",
    news: [
      "Jon Bernard & Associates Law Firm – 17 Recommended Lawyers Across 11 Practice Areas in Legal 500",
      "Construction and Projects in Indonesia – Practical Law Guide"
    ]
  },
  {
    title: "Intellectual Property",
    overview: "Jon Bernard & Associates’s IP practice assists domestic and multinational companies in protecting their trademarks, patents, copyrights and industrial designs in Indonesia.",
    news: [
      "Jon Bernard & Associates’s Michael S. Carl Appointed to INTA Legislation and Regulation Committee",
      "Legal Framework for Establishing a Padel Court Business in Jakarta"
    ]
  },
  {
    title: "Labor & Employment",
    overview: "Indonesia’s labor environment is exceptionally complicated. We keep abreast of all these changes and advise corporate clients on severance matters, personnel policies and work rules.",
    news: [
      "Doing Business in Indonesia: ICCC–Jon Bernard & Associates Webinar Highlights Market Entry",
      "Jon Bernard & Associates Contributes Indonesia Chapter to Global Employment Law Fact Sheet"
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
                <h2 className="text-3xl lg:text-5xl font-light text-[#2f4e9b] leading-tight mb-12">
                    Jon Bernard & Associates’s expertise embraces all essential areas of the law and has been honed over three decades of meeting the legal needs of clients
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