"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight,
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
                    src="http://ssek.com/wp-content/uploads/2022/07/SSEK_Website-Photo_Lets-Talk-Subcribe-Letter.jpg" 
                    alt="Let's Talk" 
                    fill 
                    className="object-cover"
                    priority
                />
            </div>
        </div>

        {/* --- CONTACT FORM SECTION --- */}
        <section className="pb-24">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                    {/* Left: Heading */}
                    <div className="lg:w-1/3">
                        <div className="flex items-center gap-3 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b] sticky top-32">
                            <span className="w-1.5 h-4 bg-[#58b0e3] -skew-x-12 inline-block"></span>
                            Let&apos;s Talk
                        </div>
                    </div>

                    {/* Right: Form & Text */}
                    <div className="lg:w-2/3">
                        <h2 className="text-3xl lg:text-4xl font-light text-[#2f4e9b] leading-snug mb-12">
                            Should you require any additional information regarding Jon Bernard & Associates or any aspect of our practice, please do not hesitate to contact us at ssek@ssek.com
                        </h2>

                        {/* Recreated Form (Design System Style) */}
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

        {/* --- LOCATION & MAP SECTION --- */}
        <section className="pb-32">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    
                    {/* Map (Left) */}
                    <div className="w-full lg:w-1/2 h-[400px] lg:h-[500px] bg-gray-200 relative rounded-sm overflow-hidden shadow-sm">
                         <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3363576711275!2d106.82051231476915!3d-6.219300995497872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e329794b57%3A0x4351d6c42725258!2sMayapada%20Tower%201!5e0!3m2!1sen!2sid!4v1657081234567!5m2!1sen!2sid" 
                            width="100%" 
                            height="100%" 
                            style={{border:0}} 
                            allowFullScreen={true} 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale hover:grayscale-0 transition-all duration-500"
                         ></iframe>
                    </div>

                    {/* Info (Right) */}
                    <div className="w-full lg:w-1/2">
                        <div className="flex items-center gap-3 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b] mb-6">
                            <span className="w-1.5 h-4 bg-[#a3238e] -skew-x-12 inline-block"></span>
                            Our Location
                        </div>
                        
                        <h3 className="text-4xl font-light text-[#2f4e9b] mb-8">Jon Bernard & Associates LAW FIRM</h3>
                        
                        <div className="flex flex-col md:flex-row gap-10 text-[#57595f] font-light text-sm leading-relaxed mb-10">
                            <div className="md:w-3/5">
                                <p className="mb-6">
                                    Mayapada Tower I, 12th and 14th Floor <br/>
                                    Jl. Jend. Sudirman Kav. 28 <br/>
                                    Jakarta, 12920 <br/>
                                    Indonesia
                                </p>
                                <div className="space-y-1 font-medium">
                                    <Link href="#" className="block hover:text-[#2f4e9b] hover:underline">ISO 27701 | ISO 27001 Certification</Link>
                                    <Link href="#" className="block hover:text-[#2f4e9b] hover:underline">Privacy Policy</Link>
                                </div>
                            </div>
                            <div className="md:w-2/5">
                                <p className="mb-1">Tel: +62 21 2953 2000, 521 2038</p>
                                <p className="mb-1">Fax: +62 21 521 2039</p>
                                <p>Email: ssek@ssek.com</p>
                            </div>
                        </div>

                        <a 
                            href="https://goo.gl/maps/generic-placeholder" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <button className="border border-[#2f4e9b] text-[#2f4e9b] hover:bg-[#2f4e9b] hover:text-white rounded-full px-8 py-3 text-[11px] uppercase tracking-[0.15em] transition-all duration-300">
                                Get Directions
                            </button>
                        </a>
                    </div>

                </div>
            </div>
        </section>
      </main>

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
      <SiteFooter />
    </div>
  );
}