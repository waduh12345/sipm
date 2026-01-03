"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { 
  Search, 
  Menu, 
  X, 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {

  const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
    // Scroll effect for Navbar
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-gray-200/20 ${
        isScrolled
          ? "bg-[#2f4e9b] py-2 shadow-lg"
          : "bg-white/5 backdrop-blur-sm py-6 border-b border-gray-300"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="relative z-50">
          {/* Logo Swap Logic */}
          {isScrolled ? (
            <div className="flex flex-col leading-none text-white">
              <h1 className="text-2xl font-bold tracking-widest">
                Jon Bernard & Associates
              </h1>
              <span className="text-[10px] tracking-[0.3em] uppercase">
                Law Firm
              </span>
            </div>
          ) : (
            <div className="relative w-32 h-10">
              <Image
                src="/jon-bernard-associates-logo.png"
                alt="Jon Bernard & Associates Logo"
                fill
                className="object-contain"
              />
            </div>
          )}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <nav
            className={`flex items-center gap-8 uppercase text-[11px] tracking-[0.15em] font-medium ${
              isScrolled ? "text-white/80" : "text-[#2f4e9b]/80"
            }`}
          >
            {[
              { label: "Our Firm", href: "/our-firm" },
              { label: "Our Attorneys", href: "/our-attorneys" },
              { label: "Our Expertise", href: "/our-expertise" },
              { label: "Indonesia Law Blog", href: "/blog" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={`transition-all duration-300 ${
                  isScrolled
                    ? "hover:text-white"
                    : "hover:text-[#2f4e9b] hover:font-bold"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <div
              className={`flex items-center gap-2 cursor-pointer group ${
                isScrolled ? "text-white" : "text-[#2f4e9b]"
              }`}
            >
              <Search className="w-4 h-4" />
              <span className="text-[11px] uppercase tracking-[0.15em] opacity-80 group-hover:opacity-100 transition-opacity">
                Search
              </span>
            </div>

            <div
              className={`flex items-center gap-2 text-[11px] font-bold ${
                isScrolled ? "text-white" : "text-[#2f4e9b]"
              }`}
            >
              <span>EN</span>
              <span className="opacity-50">|</span>
              <span className="opacity-50 hover:opacity-100 cursor-pointer">
                ID
              </span>
            </div>

            <Link href="#">
              <Button className="bg-[#58b0e3] hover:brightness-90 text-white rounded-full px-6 py-5 text-[11px] uppercase tracking-[0.15em] transition-all">
                Let&apos;s Talk
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`lg:hidden z-50 ${
            isScrolled ? "text-white" : "text-[#2f4e9b]"
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
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
                "Home",
                "Our Firm",
                "Our Attorneys",
                "Our Expertise",
                "Indonesia Law Blog",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

