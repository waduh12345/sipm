"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ShieldCheck, Lock, FileText } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer"; // Sesuaikan path import footer Anda

// --- DATA KONTEN POLICY ---
const POLICY_SECTIONS = [
  { id: "introduction", title: "1. Introduction" },
  { id: "information-collection", title: "2. Information We Collect" },
  { id: "use-of-information", title: "3. How We Use Information" },
  { id: "data-protection", title: "4. Data Protection & Security" },
  { id: "disclosure", title: "5. Disclosure to Third Parties" },
  { id: "cookies", title: "6. Cookies & Tracking" },
  { id: "rights", title: "7. Your Rights" },
  { id: "changes", title: "8. Changes to Policy" },
  { id: "contact", title: "9. Contact Us" },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  // Simple scroll spy untuk highlight menu aktif
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      
      POLICY_SECTIONS.forEach((section) => {
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
        top: element.offsetTop - 120, // Offset untuk header
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
                    Privacy Policy
                </h1>
                <p className="text-lg font-light text-[#57595f]/80 max-w-2xl">
                    At Jon Bernard & Associates, we value the trust you place in us. This policy outlines how we protect your personal data and maintain client confidentiality.
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
                            Table of Contents
                        </h3>
                        <nav className="flex flex-col space-y-1">
                            {POLICY_SECTIONS.map((section) => (
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
                        
                        {/* Trust Badge / Small Info */}
                        <div className="mt-12 bg-[#2f4e9b]/5 p-6 rounded-sm border border-[#2f4e9b]/10">
                            <ShieldCheck className="w-8 h-8 text-[#2f4e9b] mb-3" />
                            <p className="text-xs text-[#57595f] leading-relaxed">
                                Your privacy is protected by Attorney-Client Privilege and applicable Indonesian Data Protection Laws.
                            </p>
                        </div>
                    </div>
                </aside>

                {/* --- RIGHT: CONTENT --- */}
                <article className="lg:w-3/4 space-y-16">
                    
                    {/* 1. Introduction */}
                    <div id="introduction" className="scroll-mt-32">
                        <h2 className="text-2xl md:text-3xl font-light text-[#2f4e9b] mb-6">1. Introduction</h2>
                        <div className="prose prose-lg text-[#57595f] font-light leading-relaxed max-w-none">
                            <p>
                                <strong>Jon Bernard & Associates</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting the privacy and security of your personal information. As a law firm, we adhere to the highest standards of professional confidentiality and data protection.
                            </p>
                            <p className="mt-4">
                                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, engage our legal services, or communicate with us. By using our services, you consent to the data practices described in this policy.
                            </p>
                        </div>
                    </div>

                    {/* 2. Information We Collect */}
                    <div id="information-collection" className="scroll-mt-32 border-t border-gray-100 pt-10">
                        <h2 className="text-2xl md:text-3xl font-light text-[#2f4e9b] mb-6">2. Information We Collect</h2>
                        <div className="prose prose-lg text-[#57595f] font-light leading-relaxed max-w-none">
                            <p>We collect information that you voluntarily provide to us when expressing an interest in obtaining information about us or our services.</p>
                            <ul className="list-disc pl-5 mt-4 space-y-2 marker:text-[#a3238e]">
                                <li><strong>Personal Identification Information:</strong> Name, email address, phone number, job title, and company name.</li>
                                <li><strong>Case-Related Information:</strong> Documents, correspondence, and details relevant to legal matters you consult us about.</li>
                                <li><strong>Technical Data:</strong> IP address, browser type, operating system, and access times when you visit our website.</li>
                            </ul>
                        </div>
                    </div>

                    {/* 3. How We Use */}
                    <div id="use-of-information" className="scroll-mt-32 border-t border-gray-100 pt-10">
                        <h2 className="text-2xl md:text-3xl font-light text-[#2f4e9b] mb-6">3. How We Use Information</h2>
                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                                <FileText className="w-6 h-6 text-[#a3238e] mb-4" />
                                <h4 className="font-semibold text-[#2f4e9b] mb-2">Legal Services</h4>
                                <p className="text-sm">To provide legal advice, representation, and prepare documents necessary for your case.</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                                <Lock className="w-6 h-6 text-[#a3238e] mb-4" />
                                <h4 className="font-semibold text-[#2f4e9b] mb-2">Compliance</h4>
                                <p className="text-sm">To comply with applicable laws, regulations, and court orders in Indonesia.</p>
                            </div>
                        </div>
                        <p className="mt-6 text-lg font-light">
                            We may also use your information to send you newsletters, legal updates (client alerts), and invitations to seminars, provided you have opted in to receive such communications.
                        </p>
                    </div>

                    {/* 4. Data Protection */}
                    <div id="data-protection" className="scroll-mt-32 border-t border-gray-100 pt-10">
                        <h2 className="text-2xl md:text-3xl font-light text-[#2f4e9b] mb-6">4. Data Protection & Security</h2>
                        <p className="text-lg font-light leading-relaxed">
                            We use administrative, technical, and physical security measures to help protect your personal information. All client data is stored on secure servers with restricted access.
                        </p>
                        <p className="mt-4 text-lg font-light leading-relaxed">
                            However, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                        </p>
                    </div>

                    {/* 5. Disclosure */}
                    <div id="disclosure" className="scroll-mt-32 border-t border-gray-100 pt-10">
                        <h2 className="text-2xl md:text-3xl font-light text-[#2f4e9b] mb-6">5. Disclosure to Third Parties</h2>
                        <p className="text-lg font-light leading-relaxed mb-4">
                            Jon Bernard & Associates does <strong>not</strong> sell, trade, or rent your personal identification information to others. We may share information only in the following circumstances:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 marker:text-[#a3238e] font-light">
                            <li>To trusted third-party service providers (e.g., IT support, auditors) who assist us in operating our firm, so long as those parties agree to keep this information confidential.</li>
                            <li>When required by law or to protect our rights, property, or safety.</li>
                        </ul>
                    </div>

                     {/* 6. Cookies */}
                     <div id="cookies" className="scroll-mt-32 border-t border-gray-100 pt-10">
                        <h2 className="text-2xl md:text-3xl font-light text-[#2f4e9b] mb-6">6. Cookies & Tracking</h2>
                        <p className="text-lg font-light leading-relaxed">
                            Our website uses cookies to enhance user experience. You may choose to set your web browser to refuse cookies or to alert you when cookies are being sent. If you do so, note that some parts of the Site may not function properly.
                        </p>
                    </div>

                    {/* 7. Rights */}
                    <div id="rights" className="scroll-mt-32 border-t border-gray-100 pt-10">
                        <h2 className="text-2xl md:text-3xl font-light text-[#2f4e9b] mb-6">7. Your Rights</h2>
                        <p className="text-lg font-light leading-relaxed">
                            Under applicable laws (including the Personal Data Protection Law in Indonesia), you have the right to:
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <li className="flex items-center gap-3 bg-white border border-[#2f4e9b]/20 p-4 rounded text-sm">
                                <span className="w-2 h-2 bg-[#a3238e] rounded-full"></span> Access your personal data
                            </li>
                            <li className="flex items-center gap-3 bg-white border border-[#2f4e9b]/20 p-4 rounded text-sm">
                                <span className="w-2 h-2 bg-[#a3238e] rounded-full"></span> Request correction of data
                            </li>
                            <li className="flex items-center gap-3 bg-white border border-[#2f4e9b]/20 p-4 rounded text-sm">
                                <span className="w-2 h-2 bg-[#a3238e] rounded-full"></span> Request deletion of data
                            </li>
                            <li className="flex items-center gap-3 bg-white border border-[#2f4e9b]/20 p-4 rounded text-sm">
                                <span className="w-2 h-2 bg-[#a3238e] rounded-full"></span> Withdraw consent
                            </li>
                        </ul>
                    </div>

                    {/* 8. Changes */}
                    <div id="changes" className="scroll-mt-32 border-t border-gray-100 pt-10">
                        <h2 className="text-2xl md:text-3xl font-light text-[#2f4e9b] mb-6">8. Changes to This Policy</h2>
                        <p className="text-lg font-light leading-relaxed">
                            Jon Bernard & Associates has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the top of this page. We encourage users to frequently check this page for any changes.
                        </p>
                    </div>

                    {/* 9. Contact */}
                    <div id="contact" className="scroll-mt-32 border-t border-gray-100 pt-10 pb-20">
                        <h2 className="text-2xl md:text-3xl font-light text-[#2f4e9b] mb-6">9. Contact Us</h2>
                        <div className="bg-[#2f4e9b] text-white p-8 md:p-10 rounded-lg relative overflow-hidden">
                            {/* Decorative BG */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#a3238e] opacity-20 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>
                            
                            <p className="font-light mb-6 relative z-10">
                                If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:
                            </p>
                            
                            <div className="space-y-2 relative z-10 font-medium tracking-wide">
                                <p className="text-xl">Jon Bernard & Associates</p>
                                <p>Attn: Data Protection Officer</p>
                                <p className="text-white/70 font-light">Menara Palma 12th Floor, Jakarta 12950</p>
                                <a href="mailto:privacy@jonb-lawfirm.com" className="inline-flex items-center gap-2 text-[#a3238e] bg-white px-4 py-2 mt-4 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors">
                                    privacy@jonb-lawfirm.com <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
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