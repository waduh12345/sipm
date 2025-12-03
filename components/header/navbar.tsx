"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { 
  Search, 
  Menu, 
  X, 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-white/20 ${
        isScrolled ? "bg-[#2f4e9b] py-2 shadow-lg" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="relative z-50">
          {/* Menggunakan Text sebagai placeholder logo, ganti dengan Image jika ada file logo */}
          <div className="flex flex-col leading-none text-white">
              <h1 className="text-2xl font-bold tracking-widest">JONB</h1>
              <span className="text-[10px] tracking-[0.3em] uppercase">Law Firm</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex items-center gap-8 uppercase text-[11px] tracking-[0.15em] font-medium text-white/80">
            {[
              { label: "Our Firm", href: "/our-firm" },
              { label: "Our Attorneys", href: "/our-attorneys" },
              { label: "Our Expertise", href: "/our-expertise" },
              { label: "Indonesia Law Blog", href: "/blog" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="hover:text-white hover:tracking-[0.2em] transition-all duration-300"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
              {/* Search */}
              <div className="flex items-center gap-2 cursor-pointer group">
                <Search className="w-4 h-4 text-white" />
                <span className="text-[11px] uppercase tracking-[0.15em] text-white/80 group-hover:text-white transition-colors">Search</span>
              </div>

              {/* Lang */}
              <div className="flex items-center gap-2 text-[11px] font-bold text-white">
                <span>EN</span>
                <span className="text-white/50">|</span>
                <span className="opacity-50 hover:opacity-100 cursor-pointer">ID</span>
              </div>

              {/* CTA */}
              <Link href="#">
              <Button className="bg-[#58b0e3] hover:brightness-90 text-white rounded-full px-6 py-5 text-[11px] uppercase tracking-[0.15em] transition-all">
                  Let&apos;s Talk
              </Button>
              </Link>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="lg:hidden text-white z-50"
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
              {["Home", "Our Firm", "Our Attorneys", "Our Expertise", "Indonesia Law Blog"].map((item) => (
                  <Link key={item} href="#" onClick={() => setMobileMenuOpen(false)}>{item}</Link>
              ))}
              </nav>
              <div className="mt-auto mb-12 text-white/60 text-sm">
                <p>Mayapada Tower I, 12th Floor</p>
                <p>Jakarta, Indonesia</p>
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}