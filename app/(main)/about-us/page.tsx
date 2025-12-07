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
import { SiteFooter } from "@/components/site-footer";

// --- DATA DUMMY (Sesuai Konten HTML) ---

const JOURNEY_DATA = [
  { year: "-2013", title: "2008 - 2013", text: "Jon Bernard & Associates is founded by four women, including Dyah Soewito and Ira A. Eddymurthy, and moves into Mayapada Tower, in the heart of Jakarta’s business district." },
  { year: "-2019", title: "2014 - 2019", text: "During the Asian economic crisis, Jon Bernard & Associates participates in the Initiative Group and contributes ideas on ways to deal with unsettled debt, including Indonesia’s new Bankruptcy Law." },
  { year: "-2025", title: "2020-2025", text: "Jon Bernard & Associates advises several clients with assets held by the Indonesian Bank Restructuring Agency (IBRA)." },
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
                <div className="w-12/12 flex flex-col lg:flex-row gap-8">
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
                    <h3 className="text-md lg:text-lg text-[#2f4e9b] font-light leading-snug mb-8 text-justify">
                        Jon Bernard & Associates (“Firma Hukum”) berkomitmen penuh untuk memberikan jasa hukum yang baik dan bermutu serta memberikan perhatian yang penuh kepada klien.
                    </h3>
                    <div className="text-[#57595f] font-light leading-relaxed space-y-6 text-sm lg:text-base text-justify">
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
                        <div className="text-sm lg:text-base font-light leading-relaxed h-48 overflow-y-auto pr-2 custom-scrollbar text-justify">
                            {item.text}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* --- CO-FOUNDER TRIBUTE --- */}
    <section className="py-12 md:py-12 bg-[#f7fbff]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex flex-col lg:flex-row items-start gap-8 w-full">
                {/* Image: 1/3 width on large screens */}
                <div className="w-full lg:w-1/3 flex-shrink-0">
                    <button
                        className="w-full aspect-[1.3] group relative focus:outline-none"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Show Jon Bernard Pasaribu Profile"
                        style={{ background: "none", border: "none", padding: 0 }}
                    >
                        <Image 
                            src="https://jonb-lawfirm.com/wp-content/uploads/2017/04/foto.png"
                            alt="Jon Bernard Pasaribu"
                            fill
                            className="object-contain object-left group-hover:scale-105 transition-transform rounded-xl border border-gray-200"
                        />
                    </button>
                </div>
                {/* Text: 2/3 width on large screens */}
                <div className="flex-1 lg:w-2/3">
                    <h3 className="text-3xl text-[#2f4e9b] font-light mb-6">
                        JON BERNARD PASARIBU, S.H., M.H.
                    </h3>
                    <p className="text-[#57595f] font-light mb-2 text-justify leading-relaxed">
                        Jon Bernard Pasaribu adalah Pendiri dan Managing Partners pada Firma Hukum Jon Bernard & Associates, memperoleh gelar Sarjana Hukum dari Universitas Sumatera Utara (USU), Medan dan meraih gelar Magister Hukum pada Universitas Pancasila, Jakarta. Jon Bernard Pasaribu memulai karier hukum dan pengacara sebagai Associates pada Hendro Kanon & Partners kemudian berubah menjadi Kanon Arruanpitu Lawfirm dengan jabatan terakhir sebagai Senior Lawyer, kemudian mendirikan firma hukumnya sendiri bernama Jon Bernard & Associates pada tahun 2008.
                    </p>
                    <p className="text-[#57595f] font-light mb-2 text-justify leading-relaxed">
                        Jon Bernard Pasaribu memiliki keahlian khusus dalam melakukan Investigasi terhadap kecurangan, penipuan serta klaim fiktif dibidang asuransi, baik asuransi jiwa maupun asuransi kerugian. Disamping keahlian Investigasi, Jon Bernard Pasaribu juga mempunyai banyak pengalaman menangani litigasi dan transaksi perusahaan, antara lain sebagai berikut:
                    </p>
                    <ul className="list-disc pl-6 text-[#57595f] font-light mb-2 text-justify leading-relaxed space-y-2">
                        <li>Asuransi & Re-asuransi (adviser and claim investigator)</li>
                        <li>Litigasi Koorporasi, Arbitrase, Kepailitan dan Penundaan Kewajiban Pembayaran Utang (PKPU)</li>
                        <li>Litigasi Kriminal</li>
                        <li>Pasar Modal & Sekuritas</li>
                        <li>Hukum Perusahaan (Aksi koorporasi: Penggabungan, pengambilalihan dan restrukturisassi)</li>
                        <li>Perbankan & Keuangan</li>
                        <li>Konstruksi dan Infrastruktur</li>
                        <li>Pertambangan, Energi, Minyak dan Gas</li>
                        <li>Kekayaan Intelektual dan Informasi Teknologi</li>
                    </ul>
                    <p className="text-[#57595f] font-light mb-2 text-justify leading-relaxed">
                        Dalam menjalankan kegiatannya, Jon Bernard Pasaribu mempunyai izin untuk memberikan jasa hukum di Indonesia dan terdaftar sebagai anggota PERADI. Jon Bernard Pasaribu juga mempunyai izin untuk memberikan jasa hukum di bidang Pasar Modal dan terdaftar sebagai anggota HKHPM (Himpunan Konsultan Hukum Pasar Modal).
                    </p>
                    <p className="text-[#57595f] font-light text-justify leading-relaxed">
                        Bahasa yang dikuasai: Indonesia dan Inggris.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>

      {/* --- AFFILIATIONS & MEMBERSHIPS --- */}
    <section className="py-12 bg-[#f7fbff]">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-3 mb-6 uppercase text-sm tracking-[0.15em] font-semibold text-[#58b0e3]">
            <span className="w-1 h-3 bg-[#58b0e3] -skew-x-12 inline-block"></span>
            Associates
        </div>
        
        <div className="flex flex-col lg:flex-row gap-16 mb-20">
            {/* Andy Section */}
            <div className="lg:w-12/12 flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <h3 className="text-2xl text-[#2f4e9b] font-light mb-6">
                    Andy Edward Pasaribu, SH.
                </h3>
                <p className="text-[#57595f] font-light mb-8 text-justify leading-relaxed">
                    Andy Edward Pasaribu memperoleh gelar Sarjana Hukum dari Universitas Katholik St. Thomas (UNIKA ST. Thomas), Medan. Andy Edward Pasaribu memulai karier hukum dan pengacara sebagai pembela umum pada Posbakum PN. Jakarta Timur dan bergabung dengan Firma Hukum Jon Bernard & Associates sejak tahun 2008.<br /><br />
                    Andy Edward Pasaribu mempunyai banyak pengalaman menangani litigasi dibidang Pidana antara lain menangani kasus-kasus korupsi, penipuan dan narkoba dan litigasi dibidang keperdataan antara lain sengketa pertanahan, sengketa saham, sengketa Kekayaan Intelektual dan Informasi Teknologi dan sengketa perburuhan.<br /><br />
                    Bahasa yang dikuasai: <b>Indonesia dan Inggris</b>
                </p>
              </div>
              <div className="w-60 h-72 relative shrink-0">
                <Image 
                    src="/profile-default.jpeg" 
                    alt="Andy Edward Pasaribu" 
                    fill 
                    className="object-cover rounded-xl border border-gray-200"
                />
              </div>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 mb-20">
            {/* Felix Section */}
            <div className="lg:w-12/12 flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <h3 className="text-2xl text-[#2f4e9b] font-light mb-6 mt-4">
                    Felix Nixon Hawer N Mahulae, S.E., S.H.
                </h3>
                <p className="text-[#57595f] font-light mb-8 text-justify leading-relaxed">
                    Felix Nixon Hawer N Mahulae memperoleh gelar Sarjana Hukum dari Sekolah Tinggi Ilmu Hukum Gunung Jati, Jakarta dan meraih gelar Sarjana Ekonomi pada Universitas HKBP Nomensen, Medan. Felix Nixon Hawer N Mahulaememulai karier hukum sebagai Legal Manager pada perusahaan swasta nasional terkemuka di Indonesia dan bergabung dengan Firma Hukum Jon Bernard & Associates sejak tahun 2008.<br /><br />
                    Felix Nixon Hawer N Mahulaemempunyai banyak pengalaman dalam bidang hukum perusahaan dan hukum Bisnis terutama dalam bidang perbankan, Finacial, Energi, Minyak dan Gas<br /><br />
                    Bahasa yang dikuasai: <b>Indonesia dan Inggris</b>
                </p>
              </div>
              <div className="w-60 h-72 relative shrink-0">
                <Image 
                    src="/profile-default.jpeg" 
                    alt="Felix Nixon Hawer N Mahulae" 
                    fill 
                    className="object-cover rounded-xl border border-gray-200"
                />
              </div>
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
        <SiteFooter />
    </div>
  );
}