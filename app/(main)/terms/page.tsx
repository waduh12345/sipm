"use client";

import { useState, useEffect } from "react";
import { 
  Scale, 
  AlertTriangle, 
  FileWarning, 
  Copyright, 
  Gavel, 
  Globe 
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer"; 

// --- DATA SECTION ---
const TERMS_SECTIONS = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "no-legal-advice", title: "2. No Legal Advice (Disclaimer)" },
  { id: "no-relationship", title: "3. No Attorney-Client Relationship" },
  { id: "intellectual-property", title: "4. Intellectual Property" },
  { id: "use-of-site", title: "5. Acceptable Use" },
  { id: "limitation", title: "6. Limitation of Liability" },
  { id: "third-party", title: "7. Third-Party Links" },
  { id: "governing-law", title: "8. Governing Law" },
  { id: "contact", title: "9. Contact Information" },
];

export default function TermsOfUsePage() {
  const [activeSection, setActiveSection] = useState("acceptance");

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset adjustment
      
      TERMS_SECTIONS.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen font-sans text-[#57595f] selection:bg-[#2f4e9b] selection:text-white bg-white">
      
      <SiteHeader />

      {/* --- CONTENT SPACER --- */}
      <div className="h-32"></div>

      {/* --- HERO SECTION --- */}
      <section className="bg-[#f7fbff] py-16 border-b border-gray-200">
        <div className="container mx-auto px-6">
            <div className="max-w-4xl">
                <div className="flex items-center gap-3 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b] mb-4">
                    <span className="w-1 h-3 bg-[#a3238e] -skew-x-12 inline-block"></span>
                    Legal Information
                </div>
                <h1 className="text-4xl md:text-6xl font-light text-[#2f4e9b] mb-6">
                    Terms of Use
                </h1>
                <p className="text-lg font-light text-[#57595f]/80 max-w-2xl">
                    Please read these terms carefully before using the Jon Bernard & Associates website. Accessing this site constitutes your agreement to these terms.
                </p>
                <div className="mt-8 text-sm text-[#a3238e] uppercase tracking-widest font-medium">
                    Last Updated: December 5, 2025
                </div>
            </div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <section className="py-20">
        <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16">
                
                {/* --- LEFT: STICKY NAVIGATION --- */}
                <aside className="lg:w-1/4 hidden lg:block">
                    <div className="sticky top-32">
                        <h3 className="uppercase text-xs font-bold tracking-widest text-[#2f4e9b] mb-6 border-b border-gray-200 pb-4">
                            Terms Navigation
                        </h3>
                        <nav className="flex flex-col space-y-1">
                            {TERMS_SECTIONS.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`text-left py-2 px-3 text-sm transition-all duration-300 border-l-2 ${
                                        activeSection === section.id
                                            ? "border-[#a3238e] text-[#2f4e9b] font-medium bg-gray-50 pl-4"
                                            : "border-transparent text-gray-500 hover:text-[#2f4e9b] hover:pl-4"
                                    }`}
                                >
                                    {section.title}
                                </button>
                            ))}
                        </nav>
                        
                        {/* Disclaimer Badge */}
                        <div className="mt-12 bg-amber-50 p-6 rounded-sm border border-amber-100">
                            <AlertTriangle className="w-8 h-8 text-amber-500 mb-3" />
                            <p className="text-xs text-amber-900 leading-relaxed font-medium">
                                Important: The content on this site is for informational purposes only and does not constitute legal advice.
                            </p>
                        </div>
                    </div>
                </aside>

                {/* --- RIGHT: CONTENT --- */}
                <article className="lg:w-3/4 space-y-16">
                    
                    {/* 1. Acceptance */}
                    <div id="acceptance" className="scroll-mt-32">
                        <h2 className="text-2xl md:text-3xl font-light text-[#2f4e9b] mb-6">1. Acceptance of Terms</h2>
                        <p className="text-lg font-light leading-relaxed">
                            Welcome to the website of <strong>Jon Bernard & Associates</strong> (&quot;the Firm,&quot; &quot;we,&quot; &quot;us&quot;). By accessing or using this website (jonb-lawfirm.com), you agree to comply with and be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please do not use our website.
                        </p>
                    </div>

                    {/* 2. No Legal Advice (CRITICAL SECTION) */}
                    <div id="no-legal-advice" className="scroll-mt-32 border-t border-gray-100 pt-10">
                        <div className="flex items-center gap-4 mb-6">
                             <FileWarning className="w-8 h-8 text-[#a3238e]" />
                             <h2 className="text-2xl md:text-3xl font-light text-[#2f4e9b]">2. No Legal Advice</h2>
                        </div>
                        <div className="bg-gray-50 p-8 border-l-4 border-[#a3238e] rounded-r-lg">
                            <p className="text-lg font-light leading-relaxed mb-4">
                                The materials available on this website have been prepared by Jon Bernard & Associates for informational purposes only and are <strong>not legal advice</strong>.
                            </p>
                            <p className="text-lg font-light leading-relaxed">
                                You should not act upon this information without seeking professional counsel. The information provided is general in nature and may not reflect current legal developments, verdicts, or settlements.
                            </p>
                        </div>
                    </div>

                    {/* 3. No Attorney-Client Relationship */}
                    <div id="no-relationship" className="scroll-mt-32 border-t border-gray-100 pt-10">
                         <div className="flex items-center gap-4 mb-6">
                             <Scale className="w-8 h-8 text-[#2f4e9b]" />
                             <h2 className="text-2xl md:text-3xl font-light text-[#2f4e9b]">3. No Attorney-Client Relationship</h2>
                        </div>
                        <p className="text-lg font-light leading-relaxed mb-4">
                            Accessing this website or sending email communications to us does not create an attorney-client relationship. An attorney-client relationship is formed only when:
                        </p>
                        <ul className="list-disc pl-5 space-y-3 marker:text-[#a3238e] font-light text-lg">
                            <li>We have expressly agreed to represent you; and</li>
                            <li>A formal engagement letter has been signed by both parties.</li>
                        </ul>
                        <p className="mt-4 text-sm text-gray-500 italic">
                            Please do not send us confidential information until an attorney-client relationship has been established.
                        </p>
                    </div>

                    {/* 4. IP Rights */}
                    <div id="intellectual-property" className="scroll-mt-32 border-t border-gray-100 pt-10">
                        <div className="flex items-center gap-4 mb-6">
                             <Copyright className="w-8 h-8 text-[#2f4e9b]" />
                             <h2 className="text-2xl md:text-3xl font-light text-[#2f4e9b]">4. Intellectual Property</h2>
                        </div>
                        <p className="text-lg font-light leading-relaxed">
                            All content on this site, including but not limited to text, graphics, logos, images, articles, and code, is the property of Jon Bernard & Associates and is protected by Indonesian and international copyright laws.
                        </p>
                        <p className="mt-4 text-lg font-light leading-relaxed">
                            You may view, download, and print pages for personal, non-commercial use only. Any other use without our prior written consent is strictly prohibited.
                        </p>
                    </div>

                    {/* 5. Acceptable Use */}
                    <div id="use-of-site" className="scroll-mt-32 border-t border-gray-100 pt-10">
                        <h2 className="text-2xl md:text-3xl font-light text-[#2f4e9b] mb-6">5. Acceptable Use</h2>
                        <p className="text-lg font-light leading-relaxed mb-4">
                            You agree not to use the website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website; or in any way which is unlawful, illegal, fraudulent, or harmful.
                        </p>
                    </div>

                    {/* 6. Limitation */}
                    <div id="limitation" className="scroll-mt-32 border-t border-gray-100 pt-10">
                        <h2 className="text-2xl md:text-3xl font-light text-[#2f4e9b] mb-6">6. Limitation of Liability</h2>
                        <p className="text-lg font-light leading-relaxed">
                            This website is provided &quot;as is&quot; without any representations or warranties, express or implied. Jon Bernard & Associates makes no representations or warranties in relation to this website or the information and materials provided on this website. We will not be liable for any errors or omissions in the content or for any damages arising from your use of this site.
                        </p>
                    </div>

                    {/* 7. Third Party Links */}
                    <div id="third-party" className="scroll-mt-32 border-t border-gray-100 pt-10">
                        <div className="flex items-center gap-4 mb-6">
                             <Globe className="w-8 h-8 text-[#2f4e9b]" />
                             <h2 className="text-2xl md:text-3xl font-light text-[#2f4e9b]">7. Third-Party Links</h2>
                        </div>
                        <p className="text-lg font-light leading-relaxed">
                            Our Service may contain links to third-party web sites or services that are not owned or controlled by Jon Bernard & Associates. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites.
                        </p>
                    </div>

                    {/* 8. Governing Law */}
                    <div id="governing-law" className="scroll-mt-32 border-t border-gray-100 pt-10">
                        <div className="flex items-center gap-4 mb-6">
                             <Gavel className="w-8 h-8 text-[#2f4e9b]" />
                             <h2 className="text-2xl md:text-3xl font-light text-[#2f4e9b]">8. Governing Law</h2>
                        </div>
                        <p className="text-lg font-light leading-relaxed">
                            These Terms shall be governed and construed in accordance with the laws of the <strong>Republic of Indonesia</strong>, without regard to its conflict of law provisions. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Indonesia.
                        </p>
                    </div>

                    {/* 9. Contact */}
                    <div id="contact" className="scroll-mt-32 border-t border-gray-100 pt-10 pb-20">
                        <h2 className="text-2xl md:text-3xl font-light text-[#2f4e9b] mb-6">9. Contact Information</h2>
                        <div className="bg-slate-50 p-8 rounded-lg border border-slate-200">
                            <p className="font-light mb-4">
                                If you have any questions about these Terms of Use, please contact us:
                            </p>
                            <address className="not-italic text-[#2f4e9b] space-y-1 font-medium">
                                <p>Jon Bernard & Associates</p>
                                <p>Menara Palma 12th Floor, Jakarta</p>
                                <p>Email: <a href="mailto:jonbernard@jonb-lawfirm.com" className="text-[#a3238e] hover:underline">jonbernard@jonb-lawfirm.com</a></p>
                            </address>
                        </div>
                    </div>

                </article>
            </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}