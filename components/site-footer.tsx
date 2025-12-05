"use client";

import Link from "next/link";
import { ArrowUpRight, Linkedin, Instagram, Twitter } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[#2f4e9b] text-white pt-20 pb-8">
      <div className="container mx-auto px-6 h-full flex flex-col justify-between">
        
        {/* Let's Talk Big Link */}
        <Link href="#" className="flex items-center justify-between group mb-16 border-b border-white/20 pb-8">
            <span className="text-4xl lg:text-7xl font-light opacity-100 group-hover:opacity-50 transition-opacity tracking-tight">Let&apos;s Talk</span>
            <div className="w-12 h-12 lg:w-16 lg:h-16 relative">
                <ArrowUpRight className="w-full h-full group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
            </div>
        </Link>

        {/* Footer Links & Info */}
        <div className="flex flex-col lg:flex-row justify-between border-t border-white/20 pt-12 pb-20">
            <div className="mb-10 lg:mb-0 lg:w-1/3">
                <h5 className="font-bold text-lg mb-6 tracking-widest">Jon Bernard & Associates LAW FIRM</h5>
                <div className="font-light text-sm leading-relaxed text-white/80">
                    <p>Mayapada Tower I, 12th and 14th Floor</p>
                    <p>Jl. Jend. Sudirman Kav. 28</p>
                    <p>Jakarta, 12920</p>
                    <p className="mb-4">Indonesia</p>
                    
                    <p className="font-bold">ISO 27701 | ISO 27001 Certification</p>
                    <p className="font-bold">Privacy Policy</p>
                </div>
            </div>

            <div className="mb-10 lg:mb-0 lg:w-1/3 font-light text-sm leading-relaxed text-white/80">
                <p>Tel. +62 21 2953 2000, 521 2038</p>
                <p>Fax. +62 21 521 2039</p>
                <p>Email. ssek@ssek.com</p>
            </div>

            <div className="flex flex-col lg:w-1/6 gap-4 text-sm uppercase tracking-widest font-light">
                <Link href="/" className="hover:opacity-60 transition-opacity">Home</Link>
                <Link href="/about-us" className="hover:opacity-60 transition-opacity">About Us</Link>
                <Link href="/our-attorneys" className="hover:opacity-60 transition-opacity">Our Attorneys</Link>
                <Link href="/practise-areas" className="hover:opacity-60 transition-opacity">Practise Areas</Link>
            </div>

             <div className="flex flex-col lg:w-1/6 gap-4 text-sm uppercase tracking-widest font-light mt-8 lg:mt-0">
                <Link href="/blog" className="hover:opacity-60 transition-opacity">Article</Link>
                <Link href="/csr" className="hover:opacity-60 transition-opacity">CSR</Link>
                <Link href="/work-with-us" className="hover:opacity-60 transition-opacity">Work With Us</Link>
                <Link href="/lets-talk" className="hover:opacity-60 transition-opacity">Let&apos;s Talk</Link>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between border-t border-white/20 pt-8">
            <div className="flex gap-6 mb-6 lg:mb-0">
                <Linkedin className="w-5 h-5 cursor-pointer hover:opacity-60" />
                <Instagram className="w-5 h-5 cursor-pointer hover:opacity-60" />
                <Twitter className="w-5 h-5 cursor-pointer hover:opacity-60" />
            </div>
            
            <div className="flex gap-4 mb-6 lg:mb-0">
                <span className="text-white font-bold text-sm">EN</span>
                <span className="text-white/50 text-sm">ID</span>
            </div>

            <div className="text-white/40 text-xs font-light">
                &copy; {new Date().getFullYear()} Jon Bernard & Associates Law Firm. All Rights Reserved.
            </div>
        </div>
      </div>
    </footer>
  );
}