"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
   ArrowRight, ChevronLeft, ChevronRight
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// --- DATA DUMMY (PROFESSIONAL DEVELOPMENT SLIDER) ---
const SLIDES = [
  {
    id: 1,
    title: "Focus Groups",
    text: "Jon Bernard & Associates attorneys are organized and encouraged to participate in focus groups that delve into issues facing a specific practice area. They involve senior lawyers working closely with junior associates.",
    image: "https://www.ssek.com/wp-content/uploads/2022/07/image-1-1024x596.png"
  },
  {
    id: 2,
    title: "Lawyer Classes",
    text: "Lawyer classes are held regularly to discuss a current and relevant Indonesian legal issue. Every associate is encouraged to lead a class in discussion and prepare and present materials on their chosen topic.",
    image: "https://www.ssek.com/wp-content/uploads/2022/07/image-2.png"
  },
  {
    id: 3,
    title: "Visiting Instructors",
    text: "Leading experts from government agencies and ministries and the private sector are invited to provide presentations to our lawyers in our training center.",
    image: "https://www.ssek.com/wp-content/uploads/2022/07/image-4-1024x613.png"
  },
  {
    id: 4,
    title: "Seminars, Conferences & Publications",
    text: "All our attorneys are encouraged to continue learning while on the job and participate in legal and business conferences and workshops. They are also encouraged to write articles and contribute to academic law journals.",
    image: "https://www.ssek.com/wp-content/uploads/2022/07/image-5-1024x615.png"
  },
  {
    id: 5,
    title: "Training Center",
    text: "Jon Bernard & Associates’s office features a large multifunction room capable of sitting up to 70 people and hosts many of our training programs and seminars. Local law organizations and student groups are encouraged to use our facility for their events and training.",
    image: "https://www.ssek.com/wp-content/uploads/2022/07/img-06-1024x618.jpeg"
  }
];

export default function WorkWithUsPage() {
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

  // Slider Scroll Logic
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

      <main>
        {/* --- INTRO SECTION --- */}
        <section className="py-12">
          <div className="container mx-auto px-6 mb-20 text-center flex flex-col items-center">
              <div className="w-full lg:w-4/5">
                  <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-6">
                      <div className="flex items-center gap-3 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b]">
                          <span className="w-1.5 h-4 bg-[#a3238e] -skew-x-12 inline-block"></span>
                          Work With Us
                      </div>
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-light text-[#2f4e9b] leading-tight">
                    Our goal is to meet the needs of clients in a positive work environment based on a team approach to the practice of law.
                  </h2>
              </div>
          </div>

          {/* Featured Image */}
          <div className="container mx-auto px-6 mb-20 flex justify-center">
            <div className="w-full lg:w-10/12 relative aspect-[2/1] overflow-hidden">
                <Image 
                    src="http://ssek.com/wp-content/uploads/2022/07/img-12.jpeg"
                    alt="Work With Us"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>
          </div>

          {/* Career Info */}
          <div className="container mx-auto px-6 mb-24 flex justify-center">
              <div className="w-full lg:w-10/12 flex flex-col lg:flex-row gap-12">
                  <div className="lg:w-1/3">
                      <div className="flex items-center gap-3 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b]">
                          <span className="w-1.5 h-4 bg-[#a3238e] -skew-x-12 inline-block"></span>
                          Career
                      </div>
                  </div>
                  <div className="lg:w-2/3">
                      <h3 className="text-3xl lg:text-4xl text-[#2f4e9b] font-light leading-snug mb-8">
                          We are always looking for energetic, dynamic, dedicated people to join the Jon Bernard & Associates family
                      </h3>
                      <div className="text-[#57595f] font-light leading-relaxed space-y-6 mb-10 text-sm lg:text-base columns-1 lg:columns-2 gap-10">
                          <p>
                              Jon Bernard & Associates is an open partnership. With the assistance of human resources experts, we have developed a transparent system for the ranking and promotion of our associate attorneys. Senior associates are considered for partnership upon achievement of clearly stated professional development objectives and the requirements of the firm.
                          </p>
                          <p>
                              We also welcome applications from foreign lawyers with a law degree from an accredited university, a valid license to practice law in their jurisdiction and relevant practice experience. Please note that our hiring of foreign legal consultants is subject to restrictions under local laws.
                          </p>
                      </div>
                      <a href="mailto:recruitment@ssek.com">
                          <button className="border border-[#2f4e9b] text-[#2f4e9b] hover:bg-[#2f4e9b] hover:text-white rounded-full px-8 py-3 text-[11px] uppercase tracking-[0.15em] transition-all duration-300">
                              Submit Your CV
                          </button>
                      </a>
                  </div>
              </div>
          </div>
          
          {/* Additional Image */}
          <div className="w-full h-[50vh] lg:h-[70vh] relative mb-0">
             <Image 
                src="http://ssek.com/wp-content/uploads/2022/07/img-13.jpeg"
                alt="Office Environment"
                fill
                className="object-cover"
             />
          </div>
        </section>

        {/* --- PROFESSIONAL DEVELOPMENT SLIDER --- */}
        <section className="bg-[#2f4e9b] py-24 text-white overflow-hidden relative">
            <div className="container mx-auto px-6 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-1/3">
                        <div className="flex items-center gap-3 mb-8 uppercase text-sm tracking-[0.15em] font-semibold text-[#50b848]">
                            <span className="w-1.5 h-4 bg-[#50b848] -skew-x-12 inline-block"></span>
                            Professional Development
                        </div>
                        <h3 className="text-3xl lg:text-4xl font-light leading-snug mb-6">
                            A challenging, dynamic, collaborative, inclusive and supportive work environment
                        </h3>
                        <p className="text-white/80 font-light text-sm leading-relaxed">
                            Jon Bernard & Associates encourages personal and professional development, and dedicates substantial resources to our in-house education and training programs, which include:
                        </p>
                    </div>
                </div>
            </div>

            {/* Horizontal Scroll Slider */}
            <div className="container mx-auto px-6 relative z-10">
                <div 
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-8 pb-12 snap-x scrollbar-hide pl-[35%] lg:pl-[35%]" // Offset start for visual effect
                >
                    {SLIDES.map((slide, index) => (
                        <div key={slide.id} className="min-w-[85vw] md:min-w-[45vw] lg:min-w-[30vw] snap-center group flex flex-col">
                            <div className="relative aspect-[1.6] w-full mb-6 overflow-hidden rounded-sm">
                                <Image 
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="text-2xl font-light opacity-50">0{index + 1}</div>
                                <div>
                                    <h4 className="text-xl font-medium mb-4">{slide.title}</h4>
                                    <p className="text-sm font-light leading-relaxed opacity-80">
                                        {slide.text}
                                    </p>
                                </div>
                            </div>
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