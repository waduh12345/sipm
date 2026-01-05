"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  Linkedin,
  Twitter,
  Facebook,
  Loader2,
  Share2,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useLanguage } from "@/contexts/LanguageContext";

// --- Services ---
import { useGetBeritaKontenListQuery } from "@/services/customize/news/konten.service";
import { useGetBeritaKategoriListQuery } from "@/services/customize/news/kategori.service";

// --- Utils ---
import { displayDate } from "@/lib/format-utils";
import { BeritaKategori } from "@/types/customization/news/kategori";

// --- CONSTANTS ---
const BASE_IMAGE_URL = "https://api-content-web.naditechno.id/media/";

// --- HELPER: Safe Image ---
const safeImage = (
  img: string | null | undefined,
  fallback: string
): string => {
  if (typeof img === "string" && img.trim().length > 0) {
    if (img.startsWith("http")) return img;
    return `${BASE_IMAGE_URL}${img}`;
  }
  return fallback;
};

// =========================================================================
// MAIN COMPONENT
// =========================================================================
function BlogDetailContent() {
  const params = useParams();
  const id = params?.id as string; // Ambil ID dari URL params
  const { language } = useLanguage();
  const [clientCode, setClientCode] = useState<string>("");

  // --- INIT ---
  useEffect(() => {
    const code = "$2b$10$/pdGKqOqU7wOJUheZ07.H.AqTam8PZv5oLDtdxB5zT.25h3x491vy";
    if (code) setClientCode(code);
  }, []);

  const {
    data: contentData,
    isLoading: isContentLoading,
    error: contentError,
  } = useGetBeritaKontenListQuery(
    { client_code: clientCode, bahasa: language },
    { skip: !clientCode }
  );

  // Ambil post berdasarkan ID dari URL
  const post = useMemo(() => {
    return contentData?.data?.items?.find(
      (item) => String(item.id) === String(id)
    );
  }, [contentData, id]);

  // ==========================
  // 2. DATA FETCHING (RELATED & CATEGORY NAME)
  // ==========================

  // Ambil semua kategori untuk mapping ID -> Nama Kategori
  const { data: categoryData } = useGetBeritaKategoriListQuery(
    { client_code: clientCode, bahasa: language },
    { skip: !clientCode }
  );

  // Ambil list konten untuk "Related Articles" (bisa difilter by category jika mau)
  const { data: relatedData } = useGetBeritaKontenListQuery(
    { client_code: clientCode, bahasa: language },
    { skip: !clientCode }
  );

  // ==========================
  // 3. DATA PROCESSING
  // ==========================

  const categories = useMemo(
    () => categoryData?.data?.items || [],
    [categoryData]
  );

  const getCategoryId = (category: BeritaKategori) =>
    category?.id ?? category?.kategori_id;

  const categoryMap = useMemo(() => {
    const map = new Map<string, string>();
    categories.forEach((c) => {
      const id = getCategoryId(c);
      if (id) map.set(String(id), c.judul);
    });
    return map;
  }, [categories]);

  const getCategoryName = (catId?: string | number) =>
    categoryMap.get(String(catId)) || "Uncategorized";

  // Logic Related Posts: Ambil 3 post terbaru SELAIN post yang sedang dibuka
  const relatedPosts = useMemo(() => {
    const allItems = relatedData?.data?.items || [];
    return allItems
      .filter((item) => String(item.id) !== String(id)) // Exclude current post
      .slice(0, 3); // Take top 3
  }, [relatedData, id]);

  // ==========================
  // 4. RENDER STATES
  // ==========================

  if (isContentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7fbff]">
        <Loader2 className="animate-spin text-[#2f4e9b] w-10 h-10" />
      </div>
    );
  }

  if (contentError || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7fbff] text-gray-500 gap-4">
        <p className="text-xl">Article not found or error loading data.</p>
        <Link href="/v1/blog">
          <button className="px-6 py-2 bg-[#2f4e9b] text-white rounded-lg hover:bg-blue-800 transition-colors">
            Back to Blog
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-[#57595f] bg-[#f7fbff] selection:bg-[#2f4e9b] selection:text-white">
      {/* --- HEADER --- */}
      <SiteHeader />

      {/* --- CONTENT SPACER --- */}
      <div className="h-32"></div>

      {/* --- MAIN CONTENT --- */}
      <main className="pb-24">
        <div className="container mx-auto px-6 flex flex-col items-center">
          {/* Featured Image */}
          <div className="w-full lg:w-10/12 mb-12 relative aspect-[1.66] rounded-sm overflow-hidden shadow-sm bg-gray-200">
            <Image
              src={safeImage(post.image, "/blog-sample.webp")}
              alt={post.judul}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content Wrapper */}
          <div className="w-full lg:w-10/12 flex flex-col">
            {/* Category */}
            {/* <div className="flex items-center gap-3 mb-4 uppercase text-sm tracking-[0.15em] font-semibold text-[#57595f]">
              <span className="w-1.5 h-4 bg-[#58b0e3] -skew-x-12 inline-block"></span>
              {getCategoryName(post.kategori_id || post.id_category)}
            </div> */}

            {/* Title */}
            <h1 className="text-3xl lg:text-5xl font-light text-[#2f4e9b] leading-tight mb-12">
              {post.judul}
            </h1>

            {/* Split Layout: Meta vs Content */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
              {/* Left Column (Meta & Share) */}
              <div className="lg:w-1/4 flex flex-col gap-8">
                {/* Date */}
                <div>
                  <span className="text-[#2f4e9b] uppercase tracking-[0.15em] text-xs font-medium">
                    {displayDate(post.tanggal)}
                  </span>
                </div>

                {/* Author (Optional if available) */}
                {post.author && (
                  <div>
                    <span className="block text-[#57595f] text-xs uppercase tracking-widest mb-1">
                      Written By
                    </span>
                    <span className="text-[#2f4e9b] font-medium">
                      {post.author}
                    </span>
                  </div>
                )}

                {/* Share Buttons */}
                <div>
                  <span className="text-[#2f4e9b] uppercase tracking-[0.15em] text-xs font-medium block mb-4">
                    Share
                  </span>
                  <div className="flex gap-4">
                    <button className="w-8 h-8 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                      <Facebook size={14} />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-[#1da1f2] text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                      <Twitter size={14} />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                      <Linkedin size={14} />
                    </button>
                    <button
                      className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center hover:opacity-80 transition-opacity"
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: post.judul,
                            text: post.judul,
                            url: window.location.href,
                          });
                        }
                      }}
                    >
                      <Share2 size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column (Article Body) */}
              <div className="lg:w-3/4 text-[#57595f] font-light leading-relaxed space-y-6 text-sm lg:text-[1.05rem]">
                {/* Render HTML content safely */}
                <div
                  className="prose prose-blue max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.deskripsi }}
                />

                {/* Back Button */}
                <div className="pt-12">
                  <Link href="/v1/blog">
                    <button className="border border-[#2f4e9b] text-[#2f4e9b] hover:bg-[#2f4e9b] hover:text-white rounded-full px-8 py-3 text-[11px] uppercase tracking-[0.15em] transition-all duration-300">
                      Back to Article
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- RELATED ARTICLES --- */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-white overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-3 mb-12 uppercase text-sm tracking-[0.15em] font-semibold text-[#2f4e9b]">
              <span className="w-1.5 h-4 bg-[#50b848] -skew-x-12 inline-block"></span>
              Related Articles
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((item) => (
                <Link
                  key={item.id}
                  href={`/v1/blog/${item.id}`}
                  className="flex flex-col group cursor-pointer"
                >
                  <div className="relative aspect-[1.66] w-full mb-6 overflow-hidden rounded-sm bg-gray-100">
                    <Image
                      src={safeImage(item.image, "/blog-sample.webp")}
                      alt={item.judul}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="text-xs uppercase tracking-[0.15em] text-[#57595f] mb-3">
                    {/* {getCategoryName(item.kategori_id || item.id_category)} /{" "} */}
                    {displayDate(item.tanggal)}
                  </div>
                  <h3 className="text-xl font-light text-[#2f4e9b] leading-tight mb-6 line-clamp-3 group-hover:opacity-80 transition-opacity">
                    {item.judul}
                  </h3>
                  <div className="mt-auto">
                    <button className="border border-[#2f4e9b] text-[#2f4e9b] group-hover:bg-[#2f4e9b] group-hover:text-white rounded-full px-6 py-2 text-[10px] uppercase tracking-[0.15em] transition-all duration-300">
                      Read Article
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
              Stay up to date with the latest legal developments in Indonesia,
              upcoming events, new publications and firm news.
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            <form className="flex border-b border-white/50 pb-4 relative items-center">
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL ADDRESS"
                className="bg-transparent w-full text-white placeholder:text-white/70 placeholder:font-light text-sm lg:text-lg outline-none uppercase tracking-widest"
              />
              <button
                type="submit"
                className="text-white uppercase tracking-widest text-sm flex items-center gap-2 hover:opacity-70 transition-opacity whitespace-nowrap ml-4"
              >
                Send <ArrowRight className="w-4 h-4" />
              </button>
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

// Wrapper Suspense Wajib untuk App Router
export default function BlogDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#2f4e9b] rounded-full animate-spin"></div>
        </div>
      }
    >
      <BlogDetailContent />
    </Suspense>
  );
}
