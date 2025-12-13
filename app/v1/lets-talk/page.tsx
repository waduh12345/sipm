"use client";

import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LetsTalkPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen font-sans text-gray-600 selection:bg-[#2f4e9b] selection:text-white bg-white">
      {/* --- HEADER --- */}
      <SiteHeader />

      {/* --- CONTENT SPACER --- */}
      <div className="h-24 lg:h-32"></div>

      <main>
        {/* --- HERO IMAGE --- */}
        <div className="container mx-auto px-6 mb-6 md:mb-14">
          <div className="relative aspect-[1.5] md:aspect-[2.5] w-full overflow-hidden rounded-2xl shadow-sm border border-gray-100">
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
        <section className="pb-10 md:pb-24 border-b border-gray-100 mb-12 lg:mb-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-start">
              {/* Left: Heading */}
              <div className="lg:w-1/3">
                <div className="flex items-center gap-3 uppercase text-xs font-bold tracking-[0.2em] text-[#2f4e9b] lg:mb-4 lg:sticky lg:top-32">
                  <span className="w-8 h-[2px] bg-[#2f4e9b]"></span>
                  {t.contact.label}
                </div>
              </div>

              {/* Right: Form & Text */}
              <div className="lg:w-2/3 w-full">
                <h2 className="text-xl lg:text-3xl font-light text-justify text-gray-900 leading-snug mb-4 lg:mb-12 whitespace-pre-line">
                  {t.contact.intro}
                </h2>

                <form className="space-y-6 lg:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    <div className="group">
                      <input
                        type="text"
                        placeholder={t.contact.form.name}
                        className="w-full bg-transparent border-b border-gray-200 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#2f4e9b] transition-colors uppercase text-sm tracking-widest"
                      />
                    </div>
                    <div className="group">
                      <input
                        type="email"
                        placeholder={t.contact.form.email}
                        className="w-full bg-transparent border-b border-gray-200 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#2f4e9b] transition-colors uppercase text-sm tracking-widest"
                      />
                    </div>
                  </div>
                  <div className="group">
                    <input
                      type="text"
                      placeholder={t.contact.form.subject}
                      className="w-full bg-transparent border-b border-gray-200 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#2f4e9b] transition-colors uppercase text-sm tracking-widest"
                    />
                  </div>
                  <div className="group">
                    <textarea
                      rows={4}
                      placeholder={t.contact.form.message}
                      className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#2f4e9b] focus:bg-white transition-colors text-sm tracking-wide resize-none mt-2 lg:mt-4"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="bg-[#2f4e9b] text-white hover:bg-[#253e7d] rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full md:w-auto"
                    >
                      {t.contact.form.submit}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* --- OFFICE LOCATIONS SECTION --- */}
        <section className="pb-16 lg:pb-32">
          <div className="container mx-auto px-6">
            {/* Title */}
            <div className="flex flex-col items-center mb-10 lg:mb-16">
              <div className="flex items-center gap-3 uppercase text-xs font-bold tracking-[0.2em] text-[#2f4e9b] mb-4">
                <span className="w-8 h-[2px] bg-[#2f4e9b]"></span>
                {t.contact.office.label}
              </div>
              <h2 className="text-3xl lg:text-5xl font-light text-gray-900 uppercase text-center">
                {t.contact.office.title}
              </h2>
            </div>

            {/* LOCATIONS STACK */}
            <div className="flex flex-col gap-12 max-w-2xl mx-auto">
              {/* --- OFFICE: BEKASI --- */}
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-500">
                {/* TOP: MAP */}
                <div className="w-full h-[300px] relative bg-gray-100">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.666427009756!2d106.96914237498993!3d-6.175392393811984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698b61c28c8b1d%3A0x6c9b0e2b9b8b8b8b!2sRuko%20Commercial%20Park%202!5e0!3m2!1sen!2sid!4v1689123456789!5m2!1sen!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>

                {/* BOTTOM: CONTENT */}
                <div className="w-full p-8 flex flex-col items-center text-center bg-white z-10">
                  <h3 className="text-2xl lg:text-3xl font-light text-gray-900 mb-4">
                    {t.contact.office.bekasi}
                  </h3>

                  <div className="space-y-3 text-sm font-light text-gray-600 leading-relaxed">
                    {/* Address */}
                    <div className="text-base whitespace-pre-line">
                      {t.contact.office.address}
                    </div>

                    {/* Phone */}
                    <p className="text-lg tracking-wide font-normal text-gray-800">
                      Tel: (021) 89454773
                    </p>

                    {/* Contoh Fax & Email jika diperlukan, sesuaikan dengan data Anda */}
                    {/* <p>Fax: +62 21 2995 1501</p> */}
                    {/* <p>E-mail: wplaw@widyawanpartners.com</p> */}
                  </div>
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