"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/home";

  // Scroll effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-gray-200/20 ${
          isScrolled ? "bg-[#2f4e9b] py-2 shadow-lg" : "bg-transparent py-6 border-b border-gray-400/50"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="relative z-50 block">
             {isScrolled ? (
                <div className="relative w-48 h-20 mt-[-10px] mb-[-10px]">
                  <Image 
                    src="https://jonb-lawfirm.com/wp-content/uploads/2017/03/JB-new-logo.png" 
                    alt="JONB Logo" 
                    fill 
                    className="object-contain" 
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
             ) : (
                <div className="relative w-48 h-20 mt-[-20px] mb-[-20px]">
                  <Image 
                    src="https://jonb-lawfirm.com/wp-content/uploads/2017/03/JB-new-logo.png" 
                    alt="JONB Logo" 
                    fill 
                    className="object-contain" 
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
             )}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className={`flex items-center gap-8 uppercase text-[11px] tracking-[0.15em] font-medium ${
              isHome ? 'text-white' : (isScrolled ? 'text-white/80' : 'text-[#2f4e9b]/80')
            }`}>
              {[
                { name: "About Us", href: "/about-us" },
                { name: "Our Attorneys", href: "/our-attorneys" },
                { name: "Practice Areas", href: "/practise-areas" },
                { name: "Article", href: "/blog" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-all duration-300 ${
                    isHome ? 'hover:text-white' : (isScrolled ? 'hover:text-white' : 'hover:text-[#2f4e9b] hover:font-bold')
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-6">
               <div className={`flex items-center gap-2 cursor-pointer group ${isScrolled ? 'text-white' : 'text-[#2f4e9b]'}`}>
                  <Search className="w-4 h-4" />
                  <span className="text-[11px] uppercase tracking-[0.15em] opacity-80 group-hover:opacity-100 transition-opacity">Search</span>
               </div>

               <div className={`flex items-center gap-2 text-[11px] font-bold ${isScrolled ? 'text-white' : 'text-[#2f4e9b]'}`}>
                  <span>EN</span>
                  <span className="opacity-50">|</span>
                  <span className="opacity-50 hover:opacity-100 cursor-pointer">ID</span>
               </div>

               <Link href="/lets-talk">
                <button className="bg-[#58b0e3] hover:brightness-90 text-white rounded-full px-6 py-3 text-[11px] uppercase tracking-[0.15em] transition-all">
                    Let&apos;s Talk
                </button>
               </Link>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button 
            className={`lg:hidden z-50 ${isScrolled ? 'text-white' : 'text-[#2f4e9b]'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        
        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-0 w-full h-screen bg-[#2f4e9b] pt-24 px-6 flex flex-col z-40"
            >
                <nav className="flex flex-col gap-6 text-white text-2xl font-light">
                {[
                  { name: "Home", href: "/" },
                  { name: "About Us", href: "/about-us" },
                  { name: "Our Attorneys", href: "/our-attorneys" },
                  { name: "Practise Areas", href: "/practise-areas" },
                  { name: "Article", href: "/blog" },
                ].map((item) => (
                  <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                  {item.name}
                  </Link>
                ))}
                </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}