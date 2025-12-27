"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// --- TIPE DATA ---
type BadgeType = {
  type: "single" | "double";
  text1: string;
  text2?: string;
  color: string;
};

type Product = {
  id: number;
  name: string;
  desc: string;
  size: string;
  price: string;
  image: string;
  badge?: BadgeType;
};

export default function HomePage() {
  // --- STATE MANAGEMENT ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileSubMenu, setActiveMobileSubMenu] = useState<string | null>(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState("New Product");
  const [cartStatus, setCartStatus] = useState<{ [key: number]: string }>({});
  
  // State untuk Hero Slider
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // --- DATA SLIDES HERO ---
  const HERO_SLIDES = [
    {
      id: 1,
      image: "/slide/slide-asuransi-dan-reasuransi.webp",
      title: "Insurance & Reinsurance",
      subtitle: "Comprehensive Protection"
    },
    {
      id: 2,
      image: "/slide/slide-hukum-perusahaan.webp",
      title: "Corporate Law",
      subtitle: "Professional Legal Solutions"
    }
  ];

  // --- DATA MOCKUP PRODUK ---
  const PRODUCTS: Product[] = [
    { id: 1, name: "Brassica", desc: "Brightening Facial Serum", size: "15 ml | 30 ml", price: "IDR 255,000", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Brassica", desc: "Brightening Facial Serum", size: "15 ml | 30 ml", price: "IDR 255,000", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Brassica", desc: "Brightening Facial Serum", size: "15 ml | 30 ml", price: "IDR 255,000", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80" },
    { id: 4, name: "Brassica", desc: "Brightening Facial Serum", size: "15 ml | 30 ml", price: "IDR 255,000", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80" },
  ];

  const BEST_SELLERS: Product[] = [
    { 
      id: 101, name: "Brassica", desc: "Brightening Facial Serum", size: "15 ml | 30 ml", price: "IDR 255,000", 
      image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=500&q=80" 
    },
    { 
      id: 102, name: "Brassica", desc: "Brightening Facial Serum", size: "15 ml | 30 ml", price: "IDR 255,000", 
      image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=500&q=80",
      badge: { type: "double", text1: "NEW", text2: "15% OFF", color: "bg-[#5f6343]" }
    },
    { 
      id: 103, name: "Brassica", desc: "Brightening Facial Serum", size: "15 ml | 30 ml", price: "IDR 255,000", 
      image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=500&q=80",
      badge: { type: "single", text1: "NEW", color: "bg-[#a08c75]" }
    },
  ];

  // --- EFFECTS ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  // --- HANDLERS ---
  const handleAddToCart = (id: number, name: string) => {
    alert(`${name} telah ditambahkan ke keranjang belanja Anda!`);
    setCartStatus((prev) => ({ ...prev, [id]: "added" }));
    setTimeout(() => {
      setCartStatus((prev) => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }, 2000);
  };

  const toggleMobileSubMenu = (menuId: string) => {
    setActiveMobileSubMenu(activeMobileSubMenu === menuId ? null : menuId);
  };

  return (
    <div className="min-h-screen font-sans bg-[#f9f7f2] text-[#3e2b1d] overflow-x-hidden scroll-smooth selection:bg-[#5f6343] selection:text-white">
      {/* Global Styles & Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        
        .font-serif { font-family: 'Playfair Display', serif; }
        .fade-enter { opacity: 0; }
        .fade-enter-active { opacity: 1; transition: opacity 1000ms ease-in-out; }
        .fade-exit { opacity: 1; }
        .fade-exit-active { opacity: 0; transition: opacity 1000ms ease-in-out; }

        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
      `}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />

      {/* --- TOP BAR --- */}
      <div className="bg-[#5f6343] text-white py-2 overflow-hidden whitespace-nowrap text-xs tracking-wider relative z-[60]">
        <div className="inline-block animate-marquee w-full text-center md:text-left md:w-auto md:animate-none md:flex md:justify-center">
          <span className="md:hidden">Enjoy complimentary shipping on orders over IDR 500K</span>
          <span className="hidden md:inline">Enjoy complimentary shipping on orders over IDR 500K</span>
        </div>
      </div>

      {/* --- NAVBAR (STICKY & ACTIVE) --- */}
      <nav 
        className="sticky top-0 z-50 py-4 px-6 lg:px-12 flex justify-between items-center bg-[#f9f7f2]/95 backdrop-blur-md shadow-sm transition-all duration-300"
        onMouseLeave={() => setIsMegaMenuOpen(false)} 
      >
        
        {/* 1. BRAND/LOGO */}
        <Link href="#" className="text-xl lg:text-2xl font-bold tracking-widest text-[#3e2b1d] flex-shrink-0">
          THE BATH BOX®
        </Link>

        {/* MOBILE TOGGLER */}
        <button 
          className="lg:hidden text-[#3e2b1d] focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl transition-all duration-300`}></i>
        </button>

        {/* 2. MENU & ICONS (Desktop) */}
        <div className="hidden lg:flex items-center gap-12"> 
          
          {/* MENU LINKS */}
          <div className="flex items-center gap-8">
            <Link href="#" className="uppercase text-sm font-bold tracking-widest hover:text-[#5f6343] transition-colors relative group">
              Store
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5f6343] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            {/* SHOP (Trigger Mega Menu) */}
            <div 
              className="relative h-full flex items-center py-4 cursor-pointer"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
            >
              <Link href="#" className={`uppercase text-sm font-bold tracking-widest transition-colors relative group ${isMegaMenuOpen ? 'text-[#5f6343]' : 'text-[#3e2b1d]'}`}>
                Shop
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#5f6343] transition-all duration-300 ${isMegaMenuOpen ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            </div>
          </div>

          {/* ICONS */}
          <div className="flex items-center gap-6 border-l border-[#3e2b1d]/20 pl-8 h-6">
            <Link href="#" className="text-[#3e2b1d] hover:text-[#5f6343] hover:scale-110 transition-all"><i className="fab fa-whatsapp text-lg"></i></Link>
            <Link href="#" className="text-[#3e2b1d] hover:text-[#5f6343] hover:scale-110 transition-all"><i className="fas fa-search text-lg"></i></Link>
            <Link href="#" className="text-[#3e2b1d] hover:text-[#5f6343] hover:scale-110 transition-all relative">
              <i className="fas fa-shopping-cart text-lg"></i>
              {Object.keys(cartStatus).length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">!</span>
              )}
            </Link>
          </div>
        </div>

        {/* --- MEGA MENU DESKTOP (DIRECT CHILD OF NAV - ABSOLUTE FULL WIDTH) --- */}
        <div 
            className={`absolute top-full left-0 w-full bg-[#EAECE2] shadow-xl border-t border-gray-300 transition-all duration-300 ease-out origin-top ${
            isMegaMenuOpen 
                ? 'opacity-100 visible translate-y-0' 
                : 'opacity-0 invisible -translate-y-2 pointer-events-none'
            }`}
            onMouseEnter={() => setIsMegaMenuOpen(true)}
        >
            <div className="container mx-auto px-12 py-8 text-left">
                {/* Tabs Categories */}
                <div className="flex justify-center gap-10 mb-8 border-b border-gray-300/50 pb-4">
                    {['New Product', 'Body Care', 'Skincare', 'Haircare', 'Skin Concern'].map((cat) => (
                        <button 
                        key={cat}
                        className={`text-sm font-bold uppercase tracking-wide pb-4 -mb-4 border-b-2 transition-all duration-300 ${
                            activeMegaCategory === cat 
                            ? 'border-[#a08c75] text-[#3e2b1d]' 
                            : 'border-transparent text-gray-400 hover:text-[#3e2b1d]'
                        }`}
                        onMouseEnter={() => setActiveMegaCategory(cat)}
                        >
                        {cat}
                        </button>
                    ))}
                </div>
                
                {/* Mega Menu Content Area */}
                <div className="grid grid-cols-12 gap-8 animate-fadeIn min-h-[250px]">
                    {/* Featured Image */}
                    <div className="col-span-2 flex items-end">
                        <div className="relative h-48 w-full rounded-lg overflow-hidden shadow-sm">
                            <Image src="https://images.unsplash.com/photo-1556228552-523de5147bb6?auto=format&fit=crop&w=500&q=80" alt="Featured" fill className="object-cover" />
                        </div>
                    </div>

                    {/* Sub Menus Grid */}
                    <div className="col-span-10 grid grid-cols-4 gap-x-8 gap-y-6 content-start pt-2">
                        {/* Sub Menu Example 1 */}
                        <div className="group">
                            <h6 className="font-bold mb-3 text-sm text-[#3e2b1d] uppercase tracking-wide border-l-2 border-transparent group-hover:border-[#5f6343] pl-0 group-hover:pl-3 transition-all duration-300">
                                Eczema + Sensitive
                            </h6>
                            <ul className="text-sm text-gray-500 space-y-2">
                                <li><Link href="#" className="hover:text-[#5f6343] hover:pl-1 transition-all block">GDL Tea Tree</Link></li>
                                <li><Link href="#" className="hover:text-[#5f6343] hover:pl-1 transition-all block">Ocha</Link></li>
                            </ul>
                        </div>
                        {/* Sub Menu Example 2 */}
                        <div className="group">
                            <h6 className="font-bold mb-3 text-sm text-[#3e2b1d] uppercase tracking-wide border-l-2 border-transparent group-hover:border-[#5f6343] pl-0 group-hover:pl-3 transition-all duration-300">
                                Rough + Dry Skin
                            </h6>
                            <ul className="text-sm text-gray-500 space-y-2">
                                <li><Link href="#" className="hover:text-[#5f6343] hover:pl-1 transition-all block">GDL Original</Link></li>
                                <li><Link href="#" className="hover:text-[#5f6343] hover:pl-1 transition-all block">Almond Oil</Link></li>
                            </ul>
                        </div>
                        {/* Sub Menu Example 3 */}
                        <div className="group">
                            <h6 className="font-bold mb-3 text-sm text-[#3e2b1d] uppercase tracking-wide border-l-2 border-transparent group-hover:border-[#5f6343] pl-0 group-hover:pl-3 transition-all duration-300">
                                Acne Prone
                            </h6>
                            <ul className="text-sm text-gray-500 space-y-2">
                                <li><Link href="#" className="hover:text-[#5f6343] hover:pl-1 transition-all block">Tea Tree Oil</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </nav>

      {/* --- HERO SLIDER SECTION --- */}
      <header className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center lg:justify-end lg:pr-20 text-center lg:text-right">
        {HERO_SLIDES.map((slide, index) => (
            <div 
                key={slide.id}
                className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${index === currentHeroIndex ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="absolute inset-0 bg-black/30 z-10" />
                <Image 
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0} 
                />
            </div>
        ))}
        
        <div className="relative z-20 text-white px-4 animate-fadeIn">
          <h1 className="font-serif text-5xl lg:text-7xl italic mb-4 drop-shadow-lg leading-tight">
            {HERO_SLIDES[currentHeroIndex].title}
          </h1>
          <p className="text-lg lg:text-2xl mb-8 font-light drop-shadow-md tracking-wider">
             {HERO_SLIDES[currentHeroIndex].subtitle}
          </p>
          <button className="border border-white bg-transparent text-white hover:bg-white hover:text-[#3e2b1d] px-8 py-3 rounded-full uppercase tracking-widest text-xs font-bold transition-all duration-300 transform hover:scale-105">
            Discover More
          </button>
          
          <div className="absolute bottom-[-100px] right-0 flex gap-2 justify-end">
              {HERO_SLIDES.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1 rounded-full transition-all duration-300 ${idx === currentHeroIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'}`}
                  ></div>
              ))}
          </div>
        </div>
      </header>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div className={`lg:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} pt-24 px-8`}>
        <ul className="flex flex-col gap-6">
          <li className="border-b border-gray-100 pb-2">
            <Link href="#" className="text-xl font-bold uppercase text-[#3e2b1d] tracking-widest">Store</Link>
          </li>
          <li className="border-b border-gray-100 pb-2">
            <div 
              className="flex justify-between items-center cursor-pointer group"
              onClick={() => toggleMobileSubMenu('shop')}
            >
              <span className="text-xl font-bold uppercase text-[#3e2b1d] tracking-widest group-hover:text-[#5f6343] transition-colors">Shop</span>
              <i className={`fas fa-chevron-down transition-transform duration-300 ${activeMobileSubMenu === 'shop' ? 'rotate-180 text-[#5f6343]' : ''}`}></i>
            </div>
            
            {/* Mobile Submenu */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeMobileSubMenu === 'shop' ? 'max-h-[500px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
              <ul className="pl-4 flex flex-col gap-4 text-gray-600">
                <li><Link href="#" className="text-sm uppercase tracking-wide hover:text-[#5f6343]">New Product</Link></li>
                
                {/* Mobile Nested Submenu */}
                <li>
                   <div className="flex justify-between items-center cursor-pointer hover:text-[#5f6343]" onClick={(e) => { e.stopPropagation(); toggleMobileSubMenu('bodycare'); }}>
                      <span className="text-sm uppercase tracking-wide">Body Care</span>
                      <i className={`fas fa-plus text-xs transition-transform ${activeMobileSubMenu === 'bodycare' ? 'rotate-45' : ''}`}></i>
                   </div>
                   <div className={`overflow-hidden transition-all duration-300 border-l-2 border-[#5f6343]/30 ml-1 ${activeMobileSubMenu === 'bodycare' ? 'max-h-40 mt-3 pl-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <Link href="#" className="block py-1 text-sm text-gray-500 hover:text-[#5f6343]">Body Wash</Link>
                      <Link href="#" className="block py-1 text-sm text-gray-500 hover:text-[#5f6343]">Body Lotion</Link>
                   </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      {/* --- INTRO SECTION --- */}
      <section className="py-24 text-center container mx-auto px-4">
        <h2 className="font-serif text-3xl lg:text-5xl mb-3 text-[#3e2b1d]">Natural, Powerful, Timeless</h2>
        <p className="text-[#5f6343] text-xl font-light italic">Since 2013</p>
      </section>

      {/* --- PRODUCT OF THE MONTH --- */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative h-[400px] lg:h-auto flex items-center justify-center text-center text-white bg-[#5f6343] overflow-hidden group">
           <div className="absolute inset-0 z-0 opacity-60 group-hover:scale-105 transition-transform duration-700">
             <Image src="https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Texture" fill className="object-cover" />
           </div>
           <div className="relative z-10 p-8">
             <h3 className="font-serif text-5xl mb-4 leading-tight">Product of<br/>The Month</h3>
             <p className="text-lg font-light tracking-wide">Shop our products<br/>conveniently.</p>
           </div>
        </div>

        <div className="bg-[#EDEDED] p-8 lg:p-16">
           <div className="grid grid-cols-2 gap-x-8 gap-y-12">
              {PRODUCTS.map((prod, idx) => (
                <div key={idx} className="group text-center cursor-pointer">
                   <div className="relative h-48 w-full mb-4 overflow-hidden rounded-lg bg-white/50 group-hover:bg-white transition-colors duration-300">
                      <Image 
                        src={prod.image} 
                        alt={prod.name} 
                        fill 
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500" 
                      />
                   </div>
                   <h6 className="font-bold text-sm uppercase tracking-widest">{prod.name}</h6>
                   <p className="text-xs text-gray-500 mt-1">{prod.desc}</p>
                   <p className="text-xs text-gray-500 mb-2">{prod.size}</p>
                   <p className="text-sm font-bold text-red-700">{prod.price}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- BEST SELLER --- */}
      <section className="py-24 container mx-auto px-6 bg-[#f9f7f2]">
        <h2 className="font-serif text-4xl mb-12 text-center lg:text-left">Best Seller</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BEST_SELLERS.map((item) => (
              <div key={item.id} className="group relative bg-transparent hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-xl p-6 flex flex-col h-full">
                  
                  {/* Badges */}
                  {item.badge && (
                    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                       {item.badge.type === 'double' ? (
                          <>
                             <div className="w-[50px] h-[50px] rounded-full bg-[#5f6343] text-white flex items-center justify-center text-[10px] font-bold shadow-md">NEW</div>
                             <div className="w-[50px] h-[50px] rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold text-center leading-tight shadow-md">15%<br/>OFF</div>
                          </>
                       ) : (
                          <div className={`w-[50px] h-[50px] rounded-full ${item.badge.color} text-white flex items-center justify-center text-[10px] font-bold shadow-md`}>{item.badge.text1}</div>
                       )}
                    </div>
                  )}

                  <div className="relative w-full h-72 mb-6 overflow-hidden">
                     <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                     />
                  </div>

                  <div className="flex flex-col flex-grow text-center">
                     <h5 className="font-bold text-lg uppercase tracking-widest">{item.name}</h5>
                     <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                     <p className="text-xs text-gray-400 mt-1 mb-3">{item.size}</p>
                     <p className="text-red-700 font-bold text-lg mb-6">{item.price}</p>
                     
                     <div className="mt-auto pt-4 border-t border-gray-100 group-hover:border-gray-200 transition-colors">
                        <button 
                           onClick={() => handleAddToCart(item.id, item.name)}
                           className={`w-full py-2 text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 outline-none ${
                             cartStatus[item.id] === 'added' 
                             ? 'text-green-600' 
                             : 'text-[#3e2b1d] hover:text-[#5f6343]'
                           }`}
                        >
                           {cartStatus[item.id] === 'added' ? 'ADDED TO BAG' : 'ADD TO CART'}
                        </button>
                     </div>
                  </div>
              </div>
            ))}
        </div>
      </section>

      {/* --- BANNER --- */}
      <section className="relative h-[500px] w-full parallax-container">
         <Image 
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Banner Sink" 
            fill 
            className="object-cover"
         />
      </section>

      {/* --- STORE LOCATION --- */}
      <section className="py-24 container mx-auto px-6 bg-[#f9f7f2]">
         <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 text-center md:text-left">
               <h2 className="font-serif text-4xl mb-4">Store Location</h2>
               <p className="text-gray-500 mb-8 leading-relaxed text-lg font-light">
                  The Store Locator is designed to help you find<br/>the nearest TBB Store from you.
               </p>
               <button className="flex items-center justify-between w-full md:w-auto min-w-[280px] px-8 py-4 border border-[#3e2b1d] text-[#3e2b1d] hover:bg-[#3e2b1d] hover:text-white transition-all duration-300 rounded-sm text-sm uppercase font-bold tracking-widest group">
                  Find a nearby store <i className="fas fa-chevron-right group-hover:translate-x-2 transition-transform"></i>
               </button>
            </div>
            <div className="md:w-1/2 w-full">
               <ul className="divide-y divide-[#3e2b1d]/20">
                  {['Mall Kelapa Gading', 'Pakuwon Mall Bekasi', 'AEON Mall BSD'].map((loc) => (
                     <li key={loc} className="py-5 text-center md:text-left text-[#3e2b1d] text-lg font-light hover:pl-4 transition-all duration-300 cursor-default">{loc}</li>
                  ))}
               </ul>
            </div>
         </div>
         <div className="text-center mt-16">
            <Link href="#" className="text-gray-400 text-lg hover:text-[#3e2b1d] transition-colors border-b border-transparent hover:border-[#3e2b1d] pb-1">Continue Shopping</Link>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#3a291a] text-white pt-20 pb-10">
         <div className="container mx-auto px-8">
            <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-12">
               <div className="lg:w-1/2 text-center lg:text-left">
                  <h2 className="font-serif text-4xl lg:text-5xl mb-6">Subscribe To Our Newsletter</h2>
                  <p className="text-white/60 mb-8 font-light text-lg">Be the first to know about new arrivals and exclusive offers.</p>
                  <div className="relative max-w-md mx-auto lg:mx-0 group">
                     <input type="email" placeholder="Type your E-mail here" className="w-full bg-transparent border-b border-white/30 py-4 text-white placeholder-white/40 focus:outline-none focus:border-white transition-colors" />
                     <button className="absolute right-0 top-4 text-white/70 hover:text-white hover:translate-x-1 transition-all">
                        <i className="fas fa-arrow-right text-xl"></i>
                     </button>
                  </div>
               </div>
               <div className="lg:w-1/2 flex justify-center lg:justify-end">
                  <div className="w-40 h-40 rounded-full border border-white/20 flex items-center justify-center bg-[#3e2b1d]/30 hover:bg-[#3a291a] hover:scale-105 hover:border-white transition-all duration-500 cursor-pointer">
                     <span className="font-serif text-6xl leading-[0.8] text-center">TB<br/>B</span>
                  </div>
               </div>
            </div>

            <hr className="border-white/10 mb-12" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16 text-sm">
               <div>
                  <h6 className="font-serif text-xl mb-6">At Your Service</h6>
                  <ul className="space-y-3 text-white/60 font-light">
                     {['Chat Us', 'FAQ', 'Return & Exchange', 'Track My Order', 'Privacy Policy'].map(item => (
                        <li key={item}><Link href="#" className="hover:text-white hover:translate-x-2 inline-block transition-transform duration-300">{item}</Link></li>
                     ))}
                  </ul>
               </div>
               <div>
                  <h6 className="font-serif text-xl mb-6">About Us</h6>
                  <ul className="space-y-3 text-white/60 font-light">
                     {['Find Our Store', 'The Bottle Bank', 'Our Story', 'Ingredients'].map(item => (
                        <li key={item}><Link href="#" className="hover:text-white hover:translate-x-2 inline-block transition-transform duration-300">{item}</Link></li>
                     ))}
                  </ul>
               </div>
               <div>
                  <h6 className="font-serif text-xl mb-6">Corporate</h6>
                  <ul className="space-y-3 text-white/60 font-light">
                     {['Wholesale', 'Affiliate Program', 'Collaborate', 'Careers'].map(item => (
                        <li key={item}><Link href="#" className="hover:text-white hover:translate-x-2 inline-block transition-transform duration-300">{item}</Link></li>
                     ))}
                  </ul>
               </div>
               <div>
                  <h6 className="font-serif text-xl mb-6">Follow Us</h6>
                  <ul className="space-y-3 text-white/60 font-light">
                     <li className="flex items-center gap-3 group"><i className="fab fa-instagram group-hover:text-white transition-colors"></i> <Link href="#" className="group-hover:text-white group-hover:translate-x-2 inline-block transition-transform duration-300">Instagram</Link></li>
                     <li className="flex items-center gap-3 group"><i className="fab fa-tiktok group-hover:text-white transition-colors"></i> <Link href="#" className="group-hover:text-white group-hover:translate-x-2 inline-block transition-transform duration-300">TikTok</Link></li>
                     <li className="flex items-center gap-3 group"><i className="fab fa-youtube group-hover:text-white transition-colors"></i> <Link href="#" className="group-hover:text-white group-hover:translate-x-2 inline-block transition-transform duration-300">Youtube</Link></li>
                  </ul>
               </div>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 tracking-wider">
               <p className="uppercase mb-2 md:mb-0">&copy; 2025 THE BATH BOX. All Rights Reserved.</p>
               <p>Designed with <i className="fas fa-heart text-red-500/70 mx-1"></i> in Indonesia</p>
            </div>
         </div>
      </footer>
    </div>
  );
}