"use client";

import Image from "next/image";
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
      <div className="h-28 lg:h-32"></div>

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
                        className="w-full bg-transparent border-b border-gray-200 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#2f4e9b] transition-colors text-sm tracking-widest"
                      />
                    </div>
                    <div className="group">
                      <input
                        type="email"
                        placeholder={t.contact.form.email}
                        className="w-full bg-transparent border-b border-gray-200 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#2f4e9b] transition-colors text-sm tracking-widest"
                      />
                    </div>
                  </div>
                  <div className="group">
                    <input
                      type="text"
                      placeholder={t.contact.form.subject}
                      className="w-full bg-transparent border-b border-gray-200 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#2f4e9b] transition-colors text-sm tracking-widest"
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
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-[#2f4e9b] text-white hover:bg-[#253e7d] rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            {t.contact.form.submit}
                        </button>
                        <a
                            href={`https://wa.me/6285353222568?text=${encodeURIComponent(
                                `Halo, saya pengunjung website.\nNama:\nJenis Permasalahan:\nDomisili:\nMohon informasi konsultasi hukum. Terima kasih.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto flex items-center justify-center bg-[#25D366] text-white hover:bg-[#1DA851] rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="mr-2"
                            >
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.029-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.941 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.363.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.617h-.001a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.455 4.436-9.89 9.893-9.89 2.64 0 5.122 1.029 6.988 2.896a9.825 9.825 0 0 1 2.897 6.991c-.002 5.455-4.437 9.889-9.893 9.889m8.413-18.303C19.099 2.905 16.208 1.75 12.999 1.75c-6.627 0-12 5.373-12 12 0 2.118.555 4.199 1.607 6.032L.25 23.25l6.408-1.684c1.782.974 3.801 1.488 5.841 1.488h.005c6.626 0 12-5.373 12-12 0-3.209-1.254-6.099-3.537-8.382"/>
                            </svg>
                            Whatsapp
                        </a>
                    </div>
                  </div>
                </form>
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