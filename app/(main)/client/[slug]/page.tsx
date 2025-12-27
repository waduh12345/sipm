"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, FileText, ArrowRight } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// --- DATA DUMMY (Biasanya ini dari API/Database berdasarkan Slug) ---
interface IndustryStat {
  label: string;
  value: string;
}

interface IndustryClient {
  name: string;
  type: string;
  projects: string;
}

interface IndustryData {
  title: string;
  subtitle: string;
  description: string;
  stats: IndustryStat[];
  clients: IndustryClient[];
  heroImage: string;
}

const INDUSTRY_DATA: Record<string, IndustryData> = {
  "energy-mining": {
    title: "Energy & Mining",
    subtitle: "Powering the nation through sustainable legal frameworks.",
    description: "Our Energy & Mining practice is recognized as a leader in the field. We advise on major power projects, mining concessions, and oil & gas regulations, ensuring compliance with evolving environmental standards.",
    stats: [
        { label: "Projects Advised", value: "150+" },
        { label: "Total Value", value: "$5B+" },
    ],
    clients: [
      { name: "Pertamina Geothermal", type: "State-Owned Enterprise", projects: "IPO Advisory, Geothermal Expansion" },
      { name: "Adaro Energy", type: "Public Company", projects: "Coal Mining Concession, Sustainability Report" },
      { name: "Chevron Pacific", type: "MNC", projects: "Contract Renewal, Labor Disputes" },
      { name: "Medco Power", type: "Private", projects: "Solar Plant Acquisition" },
      { name: "Vale Indonesia", type: "MNC", projects: "Smelter Construction Legal Audit" },
      { name: "Indika Energy", type: "Public Company", projects: "Diversification Strategy Legal" },
    ],
    heroImage: "http://ssek.com/wp-content/uploads/2022/07/img-07.jpeg"
  },
  "banking-finance": {
    title: "Banking & Finance",
    subtitle: "Navigating complex financial regulations for global institutions.",
    description: "We represent major domestic and international banks, financial institutions, and fintech companies. Our expertise covers syndicated loans, project finance, and regulatory compliance.",
    stats: [
        { label: "Banks Represented", value: "20+" },
        { label: "Deals Closed", value: "300+" },
    ],
    clients: [
      { name: "Bank Central Asia (BCA)", type: "Public Bank", projects: "Digital Banking Licensing, Data Privacy" },
      { name: "Bank Mandiri", type: "State-Owned Bank", projects: "Corporate Restructuring, Syndicated Loan" },
      { name: "Standard Chartered", type: "International Bank", projects: "Cross-border Transaction" },
      { name: "OVO (Fintech)", type: "Tech / Finance", projects: "E-money License Compliance" },
      { name: "Bank Rakyat Indonesia", type: "State-Owned Bank", projects: "Micro-finance Regulation" },
    ],
    heroImage: "http://ssek.com/wp-content/uploads/2022/07/SSEK_Website-Photo_Our-Attorney-Page.jpg"
  },
  // Tambahkan data lain sesuai slug di halaman sebelumnya...
  // Default fallback data jika slug tidak ditemukan
  "default": {
    title: "Service Not Found",
    subtitle: "Please select a valid industry.",
    description: "",
    stats: [],
    clients: [],
    heroImage: ""
  }
};

export default function IndustryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<IndustryData | null>(null);

  // Ambil data berdasarkan slug URL
  useEffect(() => {
    const slug = params.slug as string;
    if (INDUSTRY_DATA[slug]) {
        setData(INDUSTRY_DATA[slug]);
    } else {
        // Jika slug tidak ada di data, redirect atau tampilkan default
        // Untuk demo, kita pakai data banking jika tidak ketemu, atau bisa buat logic 404
        setData(INDUSTRY_DATA["banking-finance"]); 
    }
  }, [params]);

  if (!data) return null; // Loading state

  return (
    <div className="min-h-screen font-sans text-[#57595f] bg-[#f7fbff]">
      <SiteHeader />

      {/* --- HERO SECTION --- */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <Image 
            src={data.heroImage}
            alt={data.title}
            fill
            className="object-cover"
        />
        <div className="absolute inset-0 bg-[#2f4e9b]/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f7fbff] via-transparent to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-center container mx-auto px-6 z-10 pt-20 mt-[-160px] md:mt-0">
            <button 
                onClick={() => router.back()} 
                className="group flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors w-fit"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform"/>
                <span className="text-xs uppercase tracking-widest">Back to Industries</span>
            </button>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex items-center gap-3 uppercase text-sm tracking-[0.15em] font-semibold text-[#a3238e] mb-4 bg-white/10 w-fit px-4 py-1 rounded-full backdrop-blur-sm border border-white/20">
                    Industry Expertise
                </div>
                <h1 className="text-4xl lg:text-6xl font-light text-white mb-4">
                    {data.title}
                </h1>
                <p className="text-xl lg:text-2xl text-white/80 font-light max-w-2xl leading-relaxed">
                    {data.subtitle}
                </p>
            </motion.div>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <section className="py-20 -mt-20 relative z-20">
        <div className="container mx-auto px-6">
            
            <div className="flex flex-col lg:flex-row gap-16">
                
                {/* LEFT: Description & Stats */}
                <div className="lg:w-1/3 space-y-8">
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-[#2f4e9b]/10">
                        <h3 className="text-[#2f4e9b] text-xl font-medium mb-4">Overview</h3>
                        <p className="leading-relaxed text-sm lg:text-base text-gray-600 mb-8">
                            {data.description}
                        </p>
                        
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-6 border-t border-gray-100 pt-6">
                            {data.stats.map((stat: IndustryStat, idx: number) => (
                                <div key={idx}>
                                    <div className="text-3xl font-light text-[#a3238e]">{stat.value}</div>
                                    <div className="text-xs uppercase tracking-wider text-gray-400 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#2f4e9b] text-white p-8 rounded-lg">
                        <h4 className="text-lg font-light mb-4">Need consultation in {data.title}?</h4>
                        <button className="w-full bg-white text-[#2f4e9b] py-3 uppercase text-xs tracking-[0.2em] hover:bg-[#a3238e] hover:text-white transition-colors">
                            Contact Us
                        </button>
                    </div>
                </div>

                {/* RIGHT: Client List Grid */}
                <div className="lg:w-2/3">
                    <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
                        <h2 className="text-3xl font-light text-[#2f4e9b]">Client Portfolio</h2>
                        <span className="text-sm text-gray-400">{data.clients.length} Active Clients</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.clients.map((client: IndustryClient, index: number) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white p-6 rounded-lg border border-gray-100 hover:border-[#a3238e]/30 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-[#2f4e9b]">
                                        {/* Placeholder Logo (Huruf Depan) */}
                                        <span className="font-bold text-xl">{client.name.charAt(0)}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-[#a3238e] bg-[#a3238e]/10 px-2 py-1 rounded uppercase tracking-wider">
                                        {client.type}
                                    </span>
                                </div>
                                
                                <h3 className="text-xl font-medium text-[#2f4e9b] mb-2 group-hover:text-[#a3238e] transition-colors">
                                    {client.name}
                                </h3>
                                
                                <div className="space-y-3">
                                    <div className="flex items-start gap-2 text-sm text-gray-500">
                                        <CheckCircle className="w-4 h-4 text-[#50b848] mt-0.5 flex-shrink-0" />
                                        <span>Key Work: <span className="text-gray-700 italic">{client.projects}</span></span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
      </section>

      {/* --- RELATED INSIGHTS --- */}
      <section className="py-20 bg-slate-50 mt-[-100px] md:mt-0">
        <div className="container mx-auto px-6">
            <h3 className="text-2xl font-light text-[#2f4e9b] mb-8">Latest Insights on {data.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="group cursor-pointer">
                        <div className="flex items-center gap-2 mb-3 text-xs text-[#a3238e] font-bold uppercase tracking-wider">
                            <FileText size={14} /> Regulation Update
                        </div>
                        <h4 className="text-lg font-medium text-[#57595f] group-hover:text-[#2f4e9b] transition-colors mb-2">
                            New Omnibus Law Impact on {data.title} Sector in 2024
                        </h4>
                        <p className="text-sm text-gray-400">October 12, 2024</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}