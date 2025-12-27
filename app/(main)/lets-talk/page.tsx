"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight,
  MapPin,
  Phone,
  Printer
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer"; 
import { SiteHeader } from "@/components/site-header";

export default function LetsTalkPage() {

  return (
    <div className="min-h-screen font-sans text-[#57595f] bg-[#f7fbff] selection:bg-[#2f4e9b] selection:text-white">
      
      {/* --- HEADER --- */}
      <SiteHeader />

      {/* --- CONTENT SPACER --- */}
      <div className="h-32"></div>

      <main>
        {/* --- HERO IMAGE --- */}
        <div className="container mx-auto px-6 mb-20">
            <div className="relative aspect-[2.5] w-full overflow-hidden rounded-sm shadow-sm">
                <Image 
                    src="/WhatsApp Image 2025-12-08 at 18.04.25.jpeg" 
                    alt="Jon Bernard Office" 
                    fill 
                    className="object-cover"
                    priority
                />
            </div>
        </div>

        {/* --- CONTACT FORM SECTION --- */}
        <section className="pb-12 md:pb-24 border-b border-[#2f4e9b]/10 mb-20">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mt-[-40px] md:mt-0">
                    {/* Left: Heading */}
                    <div className="lg:w-1/3">
                        <div className="flex items-center gap-3 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b] sticky top-32">
                            <span className="w-1.5 h-4 bg-[#58b0e3] -skew-x-12 inline-block"></span>
                            Let&apos;s Talk
                        </div>
                    </div>

                    {/* Right: Form & Text */}
                    <div className="lg:w-2/3 mt-[-20px] md:mt-0">
                        <h2 className="text-md lg:text-4xl font-light text-[#2f4e9b] leading-snug mb-12">
                            Should you require any additional information regarding Jon Bernard & Associates or any aspect of our practice, please do not hesitate to contact us.
                        </h2>

                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="group">
                                    <input 
                                        type="text" 
                                        placeholder="NAME" 
                                        className="w-full bg-transparent border-b border-gray-300 py-3 text-[#2f4e9b] placeholder:text-[#2f4e9b] placeholder:opacity-50 focus:outline-none focus:border-[#2f4e9b] transition-colors uppercase text-sm tracking-widest"
                                    />
                                </div>
                                <div className="group">
                                    <input 
                                        type="email" 
                                        placeholder="EMAIL" 
                                        className="w-full bg-transparent border-b border-gray-300 py-3 text-[#2f4e9b] placeholder:text-[#2f4e9b] placeholder:opacity-50 focus:outline-none focus:border-[#2f4e9b] transition-colors uppercase text-sm tracking-widest"
                                    />
                                </div>
                            </div>
                            <div className="group">
                                <input 
                                    type="text" 
                                    placeholder="SUBJECT" 
                                    className="w-full bg-transparent border-b border-gray-300 py-3 text-[#2f4e9b] placeholder:text-[#2f4e9b] placeholder:opacity-50 focus:outline-none focus:border-[#2f4e9b] transition-colors uppercase text-sm tracking-widest"
                                />
                            </div>
                            <div className="group">
                                <textarea 
                                    rows={4}
                                    placeholder="MESSAGE" 
                                    className="w-full bg-transparent border border-gray-300 p-3 rounded-md text-[#2f4e9b] placeholder:text-[#2f4e9b] placeholder:opacity-50 focus:outline-none focus:border-[#2f4e9b] transition-colors uppercase text-sm tracking-widest resize-none mt-4"
                                />
                            </div>
                            <div>
                                <button type="submit" className="border border-[#2f4e9b] text-[#2f4e9b] hover:bg-[#2f4e9b] hover:text-white rounded-full px-8 py-3 text-[11px] uppercase tracking-[0.15em] transition-all duration-300">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        {/* --- OFFICE LOCATIONS SECTION --- */}
        <section className="pb-12 md:pb-32">
            <div className="container mx-auto px-6">
                
                {/* Title */}
                <div className="flex flex-col items-center mb-16 mt-[-40px] md:mt-0">
                     <div className="flex items-center gap-3 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b] mb-4">
                        <span className="w-1.5 h-4 bg-[#a3238e] -skew-x-12 inline-block"></span>
                        Our Offices
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-light text-[#2f4e9b] uppercase">
                        Visit Us
                    </h2>
                </div>

                {/* LOCATIONS STACK */}
                <div className="flex flex-col gap-12 mt-[-20px] md:mt-0">
                    
                    {/* --- OFFICE 2: BEKASI --- */}
                    <div className="bg-white border border-gray-200 shadow-sm flex flex-col lg:flex-row overflow-hidden group">
                        
                        {/* LEFT: CONTENT */}
                        <div className="lg:w-5/12 p-8 lg:p-12 flex flex-col justify-center">
                            <h3 className="text-3xl font-light text-[#2f4e9b] mb-8 border-b border-[#a3238e]/30 pb-4 inline-block">
                                BEKASI
                            </h3>
                            
                            <div className="space-y-5 text-sm font-light text-[#57595f] leading-relaxed">
                                <div className="flex items-center gap-4">
                                    <Phone className="w-5 h-5 text-[#a3238e] flex-shrink-0" />
                                    <span className="text-lg tracking-wide">(021) 89454773</span>
                                </div>
                                {/* Hide Printer if not available for Bekasi, or add N/A */}
                                <div className="flex items-start gap-4 mt-2">
                                    <MapPin className="w-5 h-5 text-[#a3238e] flex-shrink-0 mt-1" />
                                    <div className="text-base">
                                        Ruko Commercial Park 2<br/>
                                        Jl. Harapan Indah Raya, Blok CP 2.2 No.1<br/>
                                        Bekasi 17214, Indonesia
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: MAP */}
                        <div className="lg:w-7/12 min-h-[350px] relative bg-gray-100 border-l border-gray-200">
                             <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d507669.03765582875!2d106.71357287303417!3d-6.242058418836014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698c3a9dadd66d%3A0x2fa72b89582a8389!2sJon+Bernard+%26+Associates!5e0!3m2!1sid!2ssg!4v1491516802243" 
                                width="100%" 
                                height="100%" 
                                style={{border:0}} 
                                allowFullScreen={true} 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale group-hover:grayscale-0 transition-all duration-700 absolute inset-0 w-full h-full"
                             ></iframe>
                        </div>
                    </div>

                </div>
            </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <SiteFooter />
    </div>
  );
}