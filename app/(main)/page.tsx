"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, 
  BookOpen, 
  Users, 
  Lightbulb, 
  Award, 
  BarChart, 
  Calendar, 
  FileText,
  Search,
  Menu,
  X,
  ChevronRight,
  Globe,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --- Dummy Data ---
const STATS = [
  { label: "Proposal Didanai", value: "1,240+", icon: FileText },
  { label: "Dana Tersalurkan", value: "Rp 15.4M", icon: BarChart },
  { label: "Publikasi Ilmiah", value: "3,500+", icon: BookOpen },
  { label: "H.K.I Terdaftar", value: "450+", icon: Award },
];

const LATEST_NEWS = [
  {
    id: 1,
    category: "Pengumuman",
    title: "Penerimaan Proposal Hibah Penelitian Internal Tahun Anggaran 2024",
    date: "10 Agustus 2024",
    excerpt: "LPPM membuka kesempatan bagi para dosen untuk mengajukan proposal penelitian skema dasar dan terapan. Batas akhir pengumpulan...",
    image: "/images/news-1.jpg" // Ganti dengan path image yang valid
  },
  {
    id: 2,
    category: "Berita",
    title: "Workshop Penulisan Jurnal Internasional Bereputasi",
    date: "05 Agustus 2024",
    excerpt: "Meningkatkan kualitas luaran penelitian, LPPM mengadakan klinik manuskrip bersama narasumber dari...",
    image: "/images/news-2.jpg"
  },
  {
    id: 3,
    category: "Pengabdian",
    title: "KKN Tematik: Mahasiswa dan Dosen Bangun Desa Digital",
    date: "01 Agustus 2024",
    excerpt: "Kolaborasi dosen dan mahasiswa dalam menerapkan teknologi tepat guna untuk UMKM di desa binaan...",
    image: "/images/news-3.jpg"
  }
];

const FEATURES = [
  {
    title: "Manajemen Penelitian",
    desc: "Siklus penuh pengelolaan hibah mulai dari pengajuan proposal, seleksi reviewer, hingga pelaporan akhir.",
    icon: Lightbulb,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Pengabdian Masyarakat",
    desc: "Fasilitas pelaporan dan monitoring kegiatan pengabdian kepada masyarakat yang berdampak nyata.",
    icon: Users,
    color: "bg-green-100 text-green-600"
  },
  {
    title: "Publikasi & Luaran",
    desc: "Integrasi data luaran penelitian seperti Jurnal, Buku Ajar, dan HKI untuk portofolio dosen.",
    icon: BookOpen,
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "Klinik Proposal",
    desc: "Layanan pendampingan dan review pra-submit untuk meningkatkan peluang lolos hibah eksternal.",
    icon: Search,
    color: "bg-orange-100 text-orange-600"
  }
];

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  // Handle Scroll Effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* --- NAVBAR --- */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
              S
            </div>
            <div>
              <h1 className={`text-xl font-bold leading-none ${isScrolled ? "text-gray-900" : "text-gray-900 lg:text-white"}`}>
                SIPPM
              </h1>
              <p className={`text-[10px] tracking-widest uppercase ${isScrolled ? "text-gray-500" : "text-gray-300"}`}>
                Research Center
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {["Beranda", "Tentang", "Layanan", "Berita", "Panduan"].map((item) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={`text-sm font-medium hover:text-blue-500 transition-colors ${
                  isScrolled ? "text-gray-600" : "text-white/90 hover:text-white"
                }`}
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
             <Link href="/auth/login">
                <Button variant="ghost" className={isScrolled ? "text-gray-700" : "text-white hover:bg-white/20 hover:text-white"}>
                    Masuk
                </Button>
             </Link>
             <Link href="/auth/register">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg border-0">
                    Daftar Peneliti
                </Button>
             </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu className={isScrolled ? "text-gray-900" : "text-white"} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t p-4 flex flex-col gap-4 shadow-xl">
            {["Beranda", "Tentang", "Layanan", "Berita", "Panduan"].map((item) => (
              <Link key={item} href="#" className="text-gray-700 font-medium py-2 border-b border-gray-100">
                {item}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-2">
                <Link href="/auth/login"><Button variant="outline" className="w-full">Masuk</Button></Link>
                <Link href="/auth/register"><Button className="w-full bg-blue-600">Daftar</Button></Link>
            </div>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-slate-900">
        {/* Background Image Parallax */}
        <motion.div 
            style={{ y: y1 }}
            className="absolute inset-0 z-0 opacity-40"
        >
            {/* Ganti src dengan gambar kampus yang relevan */}
             <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        </motion.div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Badge className="mb-4 bg-blue-500/20 text-blue-200 border-blue-500/30 hover:bg-blue-500/30 backdrop-blur-sm px-4 py-1 text-sm">
               #InovasiUntukNegeri
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Akselerasi Riset & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Pengabdian Masyarakat
              </span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
              Platform terintegrasi Lembaga Penelitian dan Pengabdian kepada Masyarakat (LPPM). 
              Mewujudkan sinergi akademisi, industri, dan masyarakat melalui inovasi berkelanjutan.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/auth/login">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 text-lg rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                    Ajukan Proposal <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white/20 text-blue-900 hover:bg-white/10 hover:text-white backdrop-blur-sm">
                  Unduh Panduan
              </Button>
            </div>

            {/* Quick Stats in Hero */}
            <div className="mt-12 flex items-center gap-8 text-white/80 border-t border-white/10 pt-8">
               <div>
                  <p className="text-3xl font-bold text-white">500+</p>
                  <p className="text-xs uppercase tracking-wider">Peneliti Aktif</p>
               </div>
               <div className="w-px h-10 bg-white/20"></div>
               <div>
                  <p className="text-3xl font-bold text-white">50+</p>
                  <p className="text-xs uppercase tracking-wider">Mitra Industri</p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- STATISTIK SECTION --- */}
      <section className="py-12 bg-white relative -mt-10 z-30">
        <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {STATS.map((stat, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Card className="border-none shadow-xl hover:-translate-y-1 transition-transform duration-300">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="p-4 bg-blue-50 rounded-full text-blue-600">
                                    <stat.icon className="h-8 w-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                                    <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* --- LAYANAN & FITUR --- */}
      <section id="layanan" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <Badge variant="outline" className="mb-2 border-blue-200 text-blue-700 bg-blue-50">Layanan Kami</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ekosistem Riset Terpadu</h2>
                <p className="text-gray-600">
                    Memfasilitasi seluruh tahapan kegiatan tridharma mulai dari perencanaan, pelaksanaan, hingga hilirisasi produk.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {FEATURES.map((feature, idx) => (
                    <Card key={idx} className="border-0 shadow-sm hover:shadow-xl transition-shadow duration-300 group">
                        <CardHeader>
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${feature.color}`}>
                                <feature.icon className="h-7 w-7" />
                            </div>
                            <CardTitle className="text-xl">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base leading-relaxed">
                                {feature.desc}
                            </CardDescription>
                            <div className="mt-6">
                                <Link href="#" className="text-sm font-semibold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Selengkapnya <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </section>

      {/* --- BERITA & PENGUMUMAN --- */}
      <section id="berita" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Berita & Pengumuman</h2>
                    <p className="text-gray-600">Update terbaru seputar kegiatan penelitian dan pengabdian.</p>
                </div>
                <Link href="/berita">
                    <Button variant="outline" className="hidden md:flex">Lihat Semua Berita</Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {LATEST_NEWS.map((item) => (
                    <Card key={item.id} className="overflow-hidden border-0 shadow-lg group h-full flex flex-col">
                        <div className="relative h-48 bg-gray-200 overflow-hidden">
                            {/* Placeholder Image jika file tidak ada */}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent z-10" />
                            <div className="w-full h-full bg-slate-300 group-hover:scale-105 transition-transform duration-500">
                                {/* Gunakan Image Next.js di production */}
                                {/* <Image src={item.image} fill className="object-cover" /> */}
                            </div>
                            <Badge className="absolute top-4 left-4 z-20 bg-blue-600 border-none">{item.category}</Badge>
                        </div>
                        <CardContent className="p-6 flex-1 flex flex-col">
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                <Calendar className="h-3 w-3" /> {item.date}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                <Link href={`/berita/${item.id}`}>{item.title}</Link>
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                                {item.excerpt}
                            </p>
                            <Link href={`/berita/${item.id}`} className="inline-flex items-center text-sm font-semibold text-blue-600 hover:underline">
                                Baca Selengkapnya
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
            
            <div className="mt-8 text-center md:hidden">
                <Button variant="outline" className="w-full">Lihat Semua Berita</Button>
            </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Siap Berkontribusi?</h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
                Bergabunglah dengan ribuan peneliti lainnya untuk mengembangkan inovasi yang berdampak bagi masyarakat dan bangsa.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/auth/login">
                    <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold h-14 px-8 w-full sm:w-auto">
                        Masuk ke Dashboard
                    </Button>
                </Link>
                <Link href="/auth/register">
                    <Button size="lg" variant="outline" className="border-blue-300 text-blue-100 hover:bg-blue-800 hover:text-white h-14 px-8 w-full sm:w-auto">
                        Registrasi Akun Baru
                    </Button>
                </Link>
            </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                {/* About */}
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">S</div>
                        <h4 className="text-xl font-bold text-white">SIPPM</h4>
                    </div>
                    <p className="text-sm leading-relaxed mb-6">
                        Sistem Informasi Penelitian dan Pengabdian Masyarakat. Platform terpadu pengelolaan hibah tridharma perguruan tinggi.
                    </p>
                    <div className="flex gap-4">
                        {/* Social Icons Placeholder */}
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                                <Globe className="w-4 h-4" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-bold mb-6">Tautan Cepat</h4>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="#" className="hover:text-blue-400 transition-colors">Beranda</Link></li>
                        <li><Link href="#" className="hover:text-blue-400 transition-colors">Tentang Kami</Link></li>
                        <li><Link href="#" className="hover:text-blue-400 transition-colors">Panduan Peneliti</Link></li>
                        <li><Link href="#" className="hover:text-blue-400 transition-colors">Jurnal & Publikasi</Link></li>
                        <li><Link href="#" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
                    </ul>
                </div>

                {/* Kontak */}
                <div>
                    <h4 className="text-white font-bold mb-6">Hubungi Kami</h4>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                            <span>Gedung Rektorat Lt. 2,<br/>Jl. Pendidikan No. 123, Kota Ilmu</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                            <span>(021) 1234-5678</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                            <span>lppm@universitas.ac.id</span>
                        </li>
                    </ul>
                </div>

                {/* Jam Operasional */}
                <div>
                    <h4 className="text-white font-bold mb-6">Jam Pelayanan</h4>
                    <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                            <span>Senin - Kamis</span>
                            <span className="text-white font-medium">08.00 - 16.00</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Jumat</span>
                            <span className="text-white font-medium">08.00 - 14.30</span>
                        </li>
                        <li className="flex justify-between text-gray-500">
                            <span>Sabtu - Minggu</span>
                            <span>Tutup</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} LPPM Universitas. All rights reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}