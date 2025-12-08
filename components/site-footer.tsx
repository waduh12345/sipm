"use client";

import Link from "next/link";
import { 
  Linkedin, 
  Instagram, 
  Twitter, 
  MapPin, 
  Phone, 
  Mail,
  ArrowRight
} from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[#2f4e9b] text-white pt-24 pb-10 font-sans border-t border-[#2f4e9b]">
      <div className="container mx-auto px-6 h-full flex flex-col justify-between">
        
        {/* --- Top Section: CTA (Call to Action) --- */}
        {/* Dibuat lebih clean dengan border halus */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-20 pb-10 border-b border-white/10 group">
            <div className="flex flex-col">
              <span className="text-4xl lg:text-7xl font-light tracking-tight mb-2">
                Let&apos;s Talk
              </span>
              <span className="text-white/60 text-sm tracking-widest uppercase">
                Ready to assist your legal needs
              </span>
            </div>
            
            {/* WhatsApp Button - Styled Circle */}
            <a
              href="https://wa.me/6282122024678?text=Halo%20Jon%20Bernard%20Law%20Firm%2C%20saya%20ingin%20bertanya."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group/btn"
            >
              <span className="hidden md:block text-sm uppercase tracking-widest font-medium opacity-0 group-hover/btn:opacity-100 transition-opacity transform translate-x-4 group-hover/btn:translate-x-0 duration-300">
                Chat via WhatsApp
              </span>
              <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center bg-white/5 group-hover/btn:bg-[#FCD400] group-hover/btn:border-[#FCD400] group-hover/btn:text-[#2f4e9b] transition-all duration-300">
                 {/* Icon WhatsApp SVG */}
                 <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8"
                  >
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.19-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.16-.36-.33-.37-.48-.37-.15 0-.32 0-.49.03-.17.03-.45.06-.68.31-.23.26-.88.86-.88 2.1s.9 2.44 1.02 2.61c.13.17 1.77 2.7 4.28 3.79 1.66.72 2.3.58 3.12.54.82-.04 1.81-.74 2.06-1.46s.25-1.33.18-1.46c-.07-.12-.26-.2-.54-.33-.28-.14-1.64-.81-1.89-.9-.26-.1-.44-.15-.62.14-.18.29-.69.86-.85 1.05-.16.19-.33.22-.61.08a7.84 7.84 0 0 1-2.29-1.41c-.69-.59-1.15-1.32-1.28-1.58-.13-.27-.01-.41.13-.54.12-.12.27-.31.4-.47.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.08-.13-.67-1.6-.92-2.19z" />
                  </svg>
              </div>
            </a>
        </div>

        {/* --- Main Content: 12-Column Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
            
            {/* 1. Brand Section (Span 4) */}
            <div className="lg:col-span-4 flex flex-col items-start">
                <h5 className="font-bold text-2xl tracking-[0.1em] leading-tight mb-6 text-white">
                    JON BERNARD <span className="font-light opacity-80">& ASSOCIATES</span>
                </h5>
                
                <div className="flex flex-col gap-4 text-white/70 font-light text-sm mb-8">
                    <a href="mailto:jonbernard@jonb-lawfirm.com" className="flex items-center gap-3 hover:text-[#FCD400] transition-colors group">
                        <Mail className="w-4 h-4 text-[#FCD400] group-hover:scale-110 transition-transform" />
                        jonbernard@jonb-lawfirm.com
                    </a>
                </div>

                {/* Socials */}
                <div className="flex gap-4">
                    {[Linkedin, Instagram, Twitter].map((Icon, idx) => (
                        <div key={idx} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#FCD400] hover:border-[#FCD400] hover:text-[#2f4e9b] transition-all cursor-pointer">
                            <Icon className="w-4 h-4" />
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. Office Section (Span 5) - Center aligned visual weight */}
            <div className="lg:col-span-5 flex flex-col">
                <h6 className="font-semibold text-xs uppercase tracking-[0.2em] text-[#FCD400] mb-6 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-[#FCD400]"></span>
                    Bekasi Office
                </h6>
                
                <div className="flex flex-col gap-5 text-sm font-light text-white/80">
                    <div className="flex items-start gap-4 group">
                        <MapPin className="w-5 h-5 text-white/40 mt-1 flex-shrink-0 group-hover:text-[#FCD400] transition-colors" />
                        <address className="not-italic leading-relaxed">
                            Ruko Commercial Park 2<br/>
                            Jl. Harapan Indah Raya, Blok CP 2.2 No.1<br/>
                            Bekasi 17214, Indonesia
                        </address>
                    </div>
                    <div className="flex items-center gap-4 group">
                        <Phone className="w-5 h-5 text-white/40 flex-shrink-0 group-hover:text-[#FCD400] transition-colors" />
                        <span>(021) 89454773</span>
                    </div>
                </div>
            </div>

            {/* 3. Navigation (Span 3) - Right aligned */}
            <div className="lg:col-span-3 flex flex-col lg:items-end">
                <h6 className="font-semibold text-xs uppercase tracking-[0.2em] text-[#FCD400] mb-6 flex items-center gap-2 lg:flex-row-reverse">
                    <span className="w-8 h-[1px] bg-[#FCD400]"></span>
                    Menu
                </h6>
                <nav className="flex flex-col gap-3 text-sm uppercase tracking-widest font-light text-white/70 lg:text-right">
                    {['Home', 'About Us', 'Practise Areas', 'Client', 'Article'].map((item) => (
                         <Link 
                            key={item} 
                            href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                            className="hover:text-white hover:translate-x-2 lg:hover:-translate-x-2 transition-all duration-300 flex items-center gap-2 lg:flex-row-reverse"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>
            </div>

        </div>

        {/* --- Bottom Section: Copyright & Legal --- */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8 mt-4">
            <div className="text-white/40 text-[10px] uppercase tracking-wider mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Jon Bernard & Associates. All Rights Reserved.
            </div>
            
            <div className="flex gap-8 text-[10px] text-white/40 uppercase tracking-wider font-medium">
                <Link href="/privacy" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all">
                    Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all">
                    Terms of Use
                </Link>
            </div>
        </div>
      </div>
    </footer>
  );
}