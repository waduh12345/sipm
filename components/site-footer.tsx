"use client";

import Link from "next/link";
import { 
  ArrowUpRight, 
  Linkedin, 
  Instagram, 
  Twitter, 
  MapPin, 
  Phone, 
  Printer,
  Mail
} from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[#2f4e9b] text-white pt-20 pb-8 font-sans">
      <div className="container mx-auto px-6 h-full flex flex-col justify-between">
        
        {/* --- Top Section: Big CTA --- */}
        <Link href="/lets-talk" className="flex items-center justify-between group mb-16 border-b border-white/20 pb-8">
            <span className="text-4xl lg:text-7xl font-light opacity-100 group-hover:opacity-70 transition-opacity tracking-tight">
              Let&apos;s Talk
            </span>
            <div className="w-12 h-12 lg:w-16 lg:h-16 relative">
                <ArrowUpRight className="w-full h-full group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
            </div>
        </Link>

        {/* --- Middle Section: Grid Content --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-8 pb-20">
            
            {/* Column 1: Brand & General Info */}
            <div className="flex flex-col gap-6">
                <h5 className="font-bold text-xl tracking-widest leading-tight">
                    JON BERNARD <br/> & ASSOCIATES
                </h5>
                <div className="flex items-start gap-3 text-white/70 hover:text-white transition-colors">
                    <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div className="text-sm font-light">
                        <p className="uppercase text-xs tracking-widest mb-1 opacity-50">General Inquiries</p>
                        <a href="mailto:jonbernard@jonb-lawfirm.com">jonbernard@jonb-lawfirm.com</a>
                    </div>
                </div>
                {/* Socials moved here for better balance */}
                <div className="flex gap-4 mt-4">
                    <Linkedin className="w-5 h-5 cursor-pointer hover:opacity-60 transition-opacity" />
                    <Instagram className="w-5 h-5 cursor-pointer hover:opacity-60 transition-opacity" />
                    <Twitter className="w-5 h-5 cursor-pointer hover:opacity-60 transition-opacity" />
                </div>
            </div>

            {/* Column 2: JAKARTA OFFICE */}
            <div className="flex flex-col gap-6">
                <h6 className="font-semibold text-sm uppercase tracking-[0.2em] text-[#FCD400]">Jakarta</h6>
                
                <div className="flex flex-col gap-4 text-sm font-light text-white/80">
                    <div className="flex items-start gap-3">
                        <Phone className="w-4 h-4 mt-1 flex-shrink-0 opacity-70" />
                        <span>(021) 29391190</span>
                    </div>
                    <div className="flex items-start gap-3">
                        <Printer className="w-4 h-4 mt-1 flex-shrink-0 opacity-70" />
                        <span>(021) 29391222</span>
                    </div>
                    <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 mt-1 flex-shrink-0 opacity-70" />
                        <address className="not-italic leading-relaxed">
                            Menara Palma 12th Floor<br/>
                            Jl.HR.Rasuna Said Kav.6 Blok X-2<br/>
                            Jakarta 12950, Indonesia
                        </address>
                    </div>
                </div>
            </div>

            {/* Column 3: BEKASI OFFICE */}
            <div className="flex flex-col gap-6">
                <h6 className="font-semibold text-sm uppercase tracking-[0.2em] text-[#FCD400]">Bekasi</h6>
                
                <div className="flex flex-col gap-4 text-sm font-light text-white/80">
                    <div className="flex items-start gap-3">
                        <Phone className="w-4 h-4 mt-1 flex-shrink-0 opacity-70" />
                        <span>(021) 89454773</span>
                    </div>
                    <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 mt-1 flex-shrink-0 opacity-70" />
                        <address className="not-italic leading-relaxed">
                            Ruko Mutiara Bekasi Center<br/>
                            Blok B9 No. 18, Jl. Ahmad Yani<br/>
                            Bekasi 17141, Indonesia
                        </address>
                    </div>
                </div>
            </div>

            {/* Column 4: Navigation Links */}
            <div className="flex flex-col gap-6 lg:pl-10">
                <h6 className="font-semibold text-sm uppercase tracking-[0.2em] text-[#FCD400]">Menu</h6>
                <nav className="flex flex-col gap-3 text-sm uppercase tracking-widest font-light text-white/70">
                    <Link href="/" className="hover:text-white hover:translate-x-2 transition-all">Home</Link>
                    <Link href="/about-us" className="hover:text-white hover:translate-x-2 transition-all">About Us</Link>
                    <Link href="/practise-areas" className="hover:text-white hover:translate-x-2 transition-all">Practise Areas</Link>
                    <Link href="/client" className="hover:text-white hover:translate-x-2 transition-all">Client</Link>
                    <Link href="/blog" className="hover:text-white hover:translate-x-2 transition-all">Article</Link>
                    <Link href="/csr" className="hover:text-white hover:translate-x-2 transition-all">CSR</Link>
                    <Link href="/work-with-us" className="hover:text-white hover:translate-x-2 transition-all">Work With Us</Link>
                </nav>
            </div>

        </div>

        {/* --- Bottom Section: Copyright --- */}
        <div className="flex flex-col lg:flex-row items-center justify-between border-t border-white/20 pt-8">
            <div className="text-white/40 text-xs font-light tracking-wide">
                &copy; {new Date().getFullYear()} Jon Bernard & Associates Law Firm. All Rights Reserved.
            </div>
            <div className="flex gap-6 mt-4 lg:mt-0 text-xs text-white/40 uppercase tracking-widest">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}