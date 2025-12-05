"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
    ArrowRight, ChevronLeft, ChevronRight,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

// --- DATA DUMMY (CSR ARTICLES) ---
const CSR_ARTICLES = [
  {
    id: 1,
    title: "Jon Bernard & Associates Hosts 9th Blood Drive as Part of CSR Commitment",
    category: "Events",
    date: "22 July 2025",
    image: "https://www.ssek.com/wp-content/uploads/2025/08/46-1024x616.jpg",
    link: "#"
  },
  {
    id: 2,
    title: "Jon Bernard & Associates Collects Ramadhan Donations for Islamic Boarding School",
    category: "Events",
    date: "22 April 2022",
    image: "https://www.ssek.com/wp-content/uploads/2022/07/cse-1.jpeg",
    link: "#"
  },
  {
    id: 3,
    title: "Jon Bernard & Associates Collects Ramadhan Donations for Islamic Boarding School",
    category: "Events",
    date: "29 May 2021",
    image: "https://www.ssek.com/wp-content/uploads/2022/07/csr-2.jpeg",
    link: "#"
  },
  {
    id: 4,
    title: "Jon Bernard & Associates Collects Donations for Jakarta Assisted Living Facility",
    category: "Events",
    date: "12 January 2021",
    image: "https://www.ssek.com/wp-content/uploads/2022/07/csr-3.jpeg",
    link: "#"
  },
  {
    id: 5,
    title: "Jon Bernard & Associates Donates to Victims of Jakarta Floods",
    category: "Events",
    date: "14 February 2020",
    image: "https://www.ssek.com/wp-content/uploads/2022/07/csr-4.jpeg",
    link: "#"
  }
];

export default function CSRPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handler scroll slider
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

      <SiteHeader />

      {/* --- CONTENT SPACER --- */}
      <div className="h-32"></div>

      <main>
        {/* --- INTRO SECTION --- */}
        <section className="py-12">
          <div className="container mx-auto px-6 mb-20 text-center flex flex-col items-center">
              <div className="w-full lg:w-4/5">
                  <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-6">
                      <div className="flex items-center gap-3 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b]">
                          <span className="w-1.5 h-4 bg-[#a3238e] -skew-x-12 inline-block"></span>
                          Corporate Social Responsibility
                      </div>
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-light text-[#2f4e9b] leading-tight">
                    Jon Bernard & Associates is aware of the advantages we enjoy and looks for opportunities to help our community and make a difference in people’s lives
                  </h2>
              </div>
          </div>

          {/* Featured Image */}
          <div className="container mx-auto px-6 mb-20">
            <div className="relative aspect-[2/1] w-full overflow-hidden">
                <Image 
                    src="http://ssek.com/wp-content/uploads/2022/07/img-10.jpeg"
                    alt="CSR Activity"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>
          </div>

          {/* Content Text (Columns) */}
          <div className="container mx-auto px-6 mb-24 flex justify-center">
              <div className="w-full lg:w-4/5 text-[#57595f] font-light leading-relaxed text-sm lg:text-base columns-1 lg:columns-2 gap-16 space-y-6">
                  <p>
                      We provided pro bono services to establish the Red Nose Foundation (in Indonesian, Yayasan Hidung Merah) as a non-profit organization. The Red Nose Foundation is an arts and education outreach program based in Indonesia’s capital city, Jakarta, which strives to help children gain self-confidence, discipline and teamwork skills through the structured study of different physical, visual and musical arts.
                  </p>
                  <p>
                      Its mission is to empower Indonesia’s underprivileged youth through the use of circus and other arts, as well as to support the children’s traditional and non-traditional educations.
                  </p>
                  <p>
                      Jon Bernard & Associates assisted the American Chamber of Commerce in Indonesia (AmCham Indonesia) with its fund-raising efforts for disaster relief programs in Indonesia, by reviewing its legal status and preparing constitutional amendments for the organization to become a 501(c)(3) non-profit corporation in the United States.
                  </p>
                  <p>
                      Our foreign advisors have lectured at the Faculties of Law of the University of Indonesia, Trisakti University and Gadjah Mada University, among others.
                  </p>
                  <p>
                      From 1992-1998, Jon Bernard & Associates attorneys were involved in Indonesia’s commercial law reform project, the ELIPS Project, the largest single-country effort of its kind in the world, and were founding members of the project’s Board of Advisors.
                  </p>
              </div>
          </div>
        </section>

        {/* --- CSR ARTICLES SLIDER --- */}
        <section className="bg-[#2f4e9b] py-24 text-white overflow-hidden relative">
            <div className="container mx-auto px-6 mb-12">
                <div className="flex items-center gap-3 mb-8 uppercase text-sm tracking-[0.15em] font-semibold text-[#50b848]">
                    <span className="w-1.5 h-4 bg-[#50b848] -skew-x-12 inline-block"></span>
                    CSR Articles
                </div>
                
                {/* Slider Controls (Top Right in Desktop, but simpler here) */}
            </div>

            {/* Horizontal Scroll Slider */}
            <div className="container mx-auto px-6">
                <div 
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-8 pb-12 snap-x scrollbar-hide"
                >
                    {CSR_ARTICLES.map((article) => (
                        <div key={article.id} className="min-w-[85vw] md:min-w-[45vw] lg:min-w-[30vw] snap-center group cursor-pointer">
                            <div className="relative aspect-[1.6] w-full mb-6 overflow-hidden rounded-sm">
                                <Image 
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="text-xs uppercase tracking-[0.15em] text-white/70 mb-3">
                                {article.category} / {article.date}
                            </div>
                            <h3 className="text-xl font-light leading-snug mb-6 group-hover:underline">
                                {article.title}
                            </h3>
                            <button className="border border-white text-white group-hover:bg-white group-hover:text-[#2f4e9b] rounded-full px-6 py-2 text-[10px] uppercase tracking-[0.15em] transition-all duration-300">
                                Read Article
                            </button>
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows & Progress Bar */}
                <div className="flex items-center justify-end gap-4 mt-4 border-t border-white/20 pt-6">
                    <div className="flex-1 h-[2px] bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white w-1/5"></div>
                    </div>
                    <button onClick={() => scrollSlider('left')} className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center hover:bg-white/20 transition-all">
                        <ChevronLeft size={18} />
                    </button>
                    <button onClick={() => scrollSlider('right')} className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center hover:bg-white/20 transition-all">
                        <ChevronRight size={18} />
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
      </main>

      {/* --- FOOTER --- */}
      <SiteFooter />
    </div>
  );
}