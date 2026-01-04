"use client";

import {
  useState,
  useEffect,
  useMemo,
  ChangeEvent,
  FormEvent,
  Suspense,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  Plus,
  Pencil,
  X,
  Upload,
  Loader2,
} from "lucide-react";
import Swal from "sweetalert2";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEditMode } from "@/hooks/use-edit-mode";

// --- Services ---
import {
  useGetBeritaKategoriListQuery,
  useCreateBeritaKategoriMutation,
  useUpdateBeritaKategoriMutation,
} from "@/services/customize/news/kategori.service";

import {
  useGetBeritaKontenListQuery,
  useCreateBeritaKontenMutation,
  useUpdateBeritaKontenMutation,
} from "@/services/customize/news/konten.service";

import { BeritaKategori } from "@/types/customization/news/kategori";
import { BeritaKonten } from "@/types/customization/news/konten";

// --- Utils ---
import { displayDate } from "@/lib/format-utils";
import {
  isFetchBaseQueryError,
  hasErrorString,
  extractApiErrorMessage,
} from "@/lib/error-format";

// --- CONSTANTS ---
const BASE_IMAGE_URL = "https://api-content-web.naditechno.id/media/";
const ITEMS_PER_PAGE = 9;

// --- TRANSLATIONS ---
const TRANSLATIONS = {
  id: {
    knowledgeCentre: "Pusat Pengetahuan",
    articlesNews: "Artikel & Berita",
    addArticle: "Tambah Artikel",
    filterCategory: "Filter Berdasarkan Kategori",
    newCategory: "KATEGORI BARU",
    allCategories: "Semua Kategori",
    editCategoryTooltip: "Edit kategori terpilih",
    filterPractice: "Filter Berdasarkan Area Praktik",
    allPractice: "Semua Area Praktik",
    corporateLaw: "Hukum Perusahaan",
    litigation: "Litigasi",
    noArticles: "Tidak ada artikel ditemukan.",
    readArticle: "Baca Artikel",
    loadMore: "Muat Lebih Banyak",
    // Modals
    editCategoryTitle: "Edit Kategori",
    addCategoryTitle: "Tambah Kategori",
    titleLabel: "Judul",
    saveBtn: "Simpan",
    editArticleTitle: "Edit Artikel",
    createArticleTitle: "Buat Artikel Baru",
    categoryLabel: "Kategori",
    selectCategoryPlaceholder: "Pilih Kategori",
    dateLabel: "Tanggal",
    titlePlaceholder: "Masukkan judul artikel",
    authorLabel: "Penulis",
    contentLabel: "Konten / Deskripsi",
    contentPlaceholder: "Tulis konten di sini (mendukung HTML)...",
    coverImageLabel: "Gambar Sampul",
    uploadPlaceholder: "Klik atau seret untuk unggah gambar",
    changeImage: "Ubah Gambar",
    updateArticleBtn: "Perbarui Artikel",
    publishArticleBtn: "Terbitkan Artikel",
    warningImage: "Gambar wajib diisi untuk artikel baru",
  },
  en: {
    knowledgeCentre: "Knowledge Centre",
    articlesNews: "Articles & News",
    addArticle: "Add Article",
    filterCategory: "Filter by Category",
    newCategory: "NEW CATEGORY",
    allCategories: "All Categories",
    editCategoryTooltip: "Edit selected category",
    filterPractice: "Filter by Practice Area",
    allPractice: "All Practice Areas",
    corporateLaw: "Corporate Law",
    litigation: "Litigation",
    noArticles: "No articles found.",
    readArticle: "Read Article",
    loadMore: "Load More Articles",
    // Modals
    editCategoryTitle: "Edit Category",
    addCategoryTitle: "Add Category",
    titleLabel: "Title",
    saveBtn: "Save",
    editArticleTitle: "Edit Article",
    createArticleTitle: "Create New Article",
    categoryLabel: "Category",
    selectCategoryPlaceholder: "Select Category",
    dateLabel: "Date",
    titlePlaceholder: "Enter article title",
    authorLabel: "Author",
    contentLabel: "Content / Description",
    contentPlaceholder: "Write content here (HTML supported)...",
    coverImageLabel: "Cover Image",
    uploadPlaceholder: "Click or drag to upload image",
    changeImage: "Change Image",
    updateArticleBtn: "Update Article",
    publishArticleBtn: "Publish Article",
    warningImage: "Image is required for new post",
  },
};

// --- HELPER: Safe Image ---
const safeImage = (
  img: string | File | null | undefined,
  fallback: string
): string => {
  if (img instanceof File) return URL.createObjectURL(img);
  if (typeof img === "string" && img.trim().length > 0) {
    if (img.startsWith("http")) return img;
    return `${BASE_IMAGE_URL}${img}`;
  }
  return fallback;
};

// =========================================================================
// MAIN LOGIC COMPONENT (Renamed from default export)
// =========================================================================
function BlogContent() {
  const { language } = useLanguage();
  const isEditMode = useEditMode();
  const [clientCode, setClientCode] = useState<string>("");

  // Translation based on context
  const t = language === "id" ? TRANSLATIONS.id : TRANSLATIONS.en;

  // --- STATE: Filters & Pagination ---
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);

  // --- STATE: Modals & Form ---
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BeritaKategori | null>(
    null
  );

  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<BeritaKonten | null>(
    null
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // --- INIT ---
  useEffect(() => {
    const code = "$2b$10$/pdGKqOqU7wOJUheZ07.H.AqTam8PZv5oLDtdxB5zT.25h3x491vy";
    if (code) setClientCode(code);
  }, []);

  // ==========================
  // 1. DATA FETCHING
  // ==========================
  const { data: categoryData } = useGetBeritaKategoriListQuery(
    { client_code: clientCode, bahasa: language },
    { skip: !clientCode }
  );

  const {
    data: contentData,
    isLoading: isContentLoading,
    refetch: refetchContent,
  } = useGetBeritaKontenListQuery(
    { client_code: clientCode, bahasa: language },
    { skip: !clientCode }
  );

  const [createCategory, { isLoading: isCreatingCat }] =
    useCreateBeritaKategoriMutation();
  const [updateCategory, { isLoading: isUpdatingCat }] =
    useUpdateBeritaKategoriMutation();

  const [createContent, { isLoading: isCreatingContent }] =
    useCreateBeritaKontenMutation();
  const [updateContent, { isLoading: isUpdatingContent }] =
    useUpdateBeritaKontenMutation();

  // ==========================
  // 2. DATA PROCESSING
  // ==========================
  const categories = useMemo(
    () => categoryData?.data?.items || [],
    [categoryData]
  );
  const allPosts = useMemo(() => contentData?.data?.items || [], [contentData]);

  // Filter Logic
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return allPosts;
    return allPosts.filter(
      // Pastikan konversi ke string agar aman
      (post) =>
        String(post.kategori_id || post.id_category) ===
        String(selectedCategory)
    );
  }, [allPosts, selectedCategory]);

  // Pagination Logic
  const displayedPosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

  const hasMore = visibleCount < filteredPosts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const getCategoryName = (catId: string | number) => {
    const cat = categories.find((c) => String(c.id) === String(catId));
    return cat ? cat.judul : "Uncategorized";
  };

  // ==========================
  // 3. HANDLERS (CRUD)
  // ==========================

  // --- Category ---
  const openCategoryModal = (category?: BeritaKategori) => {
    setEditingCategory(category || null);
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const judul = formData.get("judul") as string;

    try {
      const payload = {
        client_id: "7",
        bahasa: language,
        judul: judul,
        status: 1,
      };

      if (editingCategory) {
        await updateCategory({
          id: editingCategory.id,
          data: payload,
        }).unwrap();
        Swal.fire("Success", "Category updated!", "success");
      } else {
        await createCategory(payload).unwrap();
        Swal.fire("Success", "Category created!", "success");
      }
      setIsCategoryModalOpen(false);
    } catch (error) {
      let errorMsg = "Failed to save category";
      if (isFetchBaseQueryError(error)) {
        const extracted = extractApiErrorMessage(error.data);
        if (extracted) errorMsg = extracted;
      } else if (hasErrorString(error)) {
        errorMsg = error.error;
      }
      Swal.fire("Error", errorMsg, "error");
    }
  };

  // --- Content ---
  const openContentModal = (content?: BeritaKonten) => {
    setEditingContent(content || null);
    if (content && content.image) {
      setPreviewImage(safeImage(content.image, ""));
    } else {
      setPreviewImage(null);
    }
    setIsContentModalOpen(true);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Set preview lokal
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSaveContent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // --- FIX PAYLOAD ---
    // 1. Rename id_category -> kategori_id
    const idCategory = formData.get("id_category");
    if (idCategory) {
      formData.append("kategori_id", idCategory);
      formData.delete("id_category");
    }

    // 2. Default values
    formData.append("client_id", "7");
    formData.append("bahasa", language);
    formData.append("status", "1");

    // 3. Handle Image
    const file = formData.get("image") as File;
    if (!editingContent && (!file || file.size === 0)) {
      Swal.fire("Warning", t.warningImage, "warning");
      return;
    }
    // Jika update dan tidak ada file baru dipilih, hapus key agar tidak menimpa data lama dengan null
    if (editingContent && (!file || file.size === 0)) {
      formData.delete("image");
    }

    try {
      if (editingContent) {
        await updateContent({ id: editingContent.id, data: formData }).unwrap();
        Swal.fire("Success", "Article updated!", "success");
      } else {
        await createContent(formData).unwrap();
        Swal.fire("Success", "Article created!", "success");
      }
      refetchContent();
      setIsContentModalOpen(false);
    } catch (error) {
      console.error("Failed to save content:", error);
      let errorMsg = "Failed to save article";
      if (isFetchBaseQueryError(error)) {
        const extracted = extractApiErrorMessage(error.data);
        if (extracted) errorMsg = extracted;
      } else if (hasErrorString(error)) {
        errorMsg = error.error;
      }
      Swal.fire("Error", errorMsg, "error");
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-600 bg-white selection:bg-[#2f4e9b] selection:text-white relative">
      <SiteHeader />

      <div className="h-24 lg:h-32"></div>

      <section className="py-10 lg:py-20">
        <div className="container mx-auto px-6">
          {/* --- TITLE --- */}
          <div className="flex flex-col mb-8 lg:mb-16">
            <div className="flex items-center gap-3 uppercase text-xs font-bold tracking-[0.2em] text-[#2f4e9b] mb-4">
              <span className="w-8 h-[2px] bg-[#2f4e9b]"></span>
              {t.knowledgeCentre}
            </div>
            <div className="flex justify-between items-end">
              <h1 className="text-4xl lg:text-5xl font-light text-gray-900">
                {t.articlesNews}
              </h1>
              {isEditMode && (
                <button
                  onClick={() => openContentModal()}
                  className="bg-[#2f4e9b] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-800 transition-colors"
                >
                  <Plus size={16} /> {t.addArticle}
                </button>
              )}
            </div>
          </div>

          {/* --- FILTERS --- */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 mb-10 lg:mb-20 border-b border-gray-100 pb-8 lg:pb-12 items-end">
            {/* Category Filter */}
            <div className="relative w-full md:w-1/3">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 block">
                  {t.filterCategory}
                </label>
                {isEditMode && (
                  <button
                    onClick={() => openCategoryModal()}
                    className="text-[10px] text-[#2f4e9b] font-bold hover:underline flex items-center gap-1"
                  >
                    <Plus size={10} /> {t.newCategory}
                  </button>
                )}
              </div>

              <div className="flex gap-2 items-center">
                <div className="relative w-full">
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setVisibleCount(ITEMS_PER_PAGE); // Reset pagination
                    }}
                    className="w-full appearance-none bg-transparent border-b border-gray-200 py-3 pr-10 text-gray-800 text-lg lg:text-xl font-light focus:outline-none focus:border-[#2f4e9b] focus:text-[#2f4e9b] transition-colors cursor-pointer"
                  >
                    <option value="All">{t.allCategories}</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.judul}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-0 bottom-4 pointer-events-none">
                    <ArrowDown className="w-4 h-4 opacity-50" />
                  </div>
                </div>

                {isEditMode && selectedCategory !== "All" && (
                  <button
                    onClick={() => {
                      const cat = categories.find(
                        (c) => String(c.id) === String(selectedCategory)
                      );
                      if (cat) openCategoryModal(cat);
                    }}
                    className="p-2 text-gray-400 hover:text-[#2f4e9b] border-b border-gray-200"
                    title={t.editCategoryTooltip}
                  >
                    <Pencil size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Practice Area Filter (Static Placeholder) */}
            <div className="relative w-full md:w-1/3">
              <label className="text-xs uppercase tracking-widest text-gray-400 mb-2 block">
                {t.filterPractice}
              </label>
              <select className="w-full appearance-none bg-transparent border-b border-gray-200 py-3 pr-10 text-gray-800 text-lg lg:text-xl font-light focus:outline-none focus:border-[#2f4e9b] focus:text-[#2f4e9b] transition-colors cursor-pointer">
                <option>{t.allPractice}</option>
                <option>{t.corporateLaw}</option>
                <option>{t.litigation}</option>
              </select>
              <div className="absolute right-0 bottom-4 pointer-events-none">
                <ArrowDown className="w-4 h-4 opacity-50 text-[#2f4e9b]" />
              </div>
            </div>
          </div>

          {/* --- CONTENT GRID --- */}
          {isContentLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-[#2f4e9b] rounded-full animate-spin"></div>
            </div>
          ) : displayedPosts.length === 0 ? (
            <div className="text-center py-20 text-gray-400 font-light">
              {t.noArticles}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-16">
              {displayedPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer flex flex-col h-full relative"
                >
                  {/* Edit Button */}
                  {isEditMode && (
                    <div className="absolute top-2 right-2 z-20">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          openContentModal(post);
                        }}
                        className="bg-white/90 p-2 rounded-full shadow-md text-gray-600 hover:text-[#2f4e9b] hover:scale-110 transition-all"
                      >
                        <Pencil size={16} />
                      </button>
                    </div>
                  )}

                  {/* Card Image */}
                  <div className="relative aspect-[16/10] w-full mb-4 lg:mb-6 overflow-hidden rounded-2xl shadow-sm border border-gray-100 bg-gray-100">
                    <Image
                      src={safeImage(post.image, "/blog-sample.webp")}
                      alt={post.judul}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                  </div>

                  {/* Card Meta */}
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#2f4e9b] font-medium mb-3">
                    {/* Handle field name mismatch: kategori_id or id_category */}
                    <span>
                      {getCategoryName(post.kategori_id || post.id_category)}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="text-gray-400">
                      {displayDate(post.tanggal)}
                    </span>
                  </div>

                  {/* Card Title */}
                  <Link href={`/blog/${post.id}`} className="flex-1">
                    <h3 className="text-xl lg:text-2xl font-normal text-gray-900 leading-snug mb-4 lg:mb-6 line-clamp-3 group-hover:text-[#2f4e9b] transition-colors">
                      {post.judul}
                    </h3>
                  </Link>

                  <div className="mt-auto">
                    <Link href={`/v1/blog/${post.id}`}>
                      <button className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold text-gray-400 group-hover:text-[#2f4e9b] transition-colors">
                        {t.readArticle}
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Load More */}
          {hasMore && !isContentLoading && (
            <div className="flex justify-center mt-12 lg:mt-24">
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 rounded-full border border-gray-200 text-xs uppercase tracking-widest text-gray-500 hover:border-[#2f4e9b] hover:text-[#2f4e9b] hover:bg-white transition-all duration-300"
              >
                {t.loadMore}
              </button>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />

      {/* ======================= */}
      {/* MODALS */}
      {/* ======================= */}

      {/* 1. CATEGORY MODAL */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsCategoryModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              {editingCategory ? t.editCategoryTitle : t.addCategoryTitle}
            </h2>
            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.titleLabel}
                </label>
                <input
                  name="judul"
                  defaultValue={editingCategory?.judul || ""}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#2f4e9b] outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isCreatingCat || isUpdatingCat}
                className="w-full bg-[#2f4e9b] text-white py-2 rounded-lg hover:bg-blue-800 disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {(isCreatingCat || isUpdatingCat) && (
                  <Loader2 className="animate-spin" size={16} />
                )}
                {t.saveBtn}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. CONTENT MODAL */}
      {isContentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsContentModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-6 text-gray-900 border-b pb-2">
              {editingContent ? t.editArticleTitle : t.createArticleTitle}
            </h2>
            <form onSubmit={handleSaveContent} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.categoryLabel}
                  </label>
                  <select
                    name="id_category"
                    // Handle mismatch: Backend pakai kategori_id, form kita butuh defaultValue
                    defaultValue={
                      editingContent?.kategori_id ||
                      editingContent?.id_category ||
                      ""
                    }
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#2f4e9b] outline-none bg-white"
                    required
                  >
                    <option value="" disabled>
                      {t.selectCategoryPlaceholder}
                    </option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.judul}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.dateLabel}
                  </label>
                  <input
                    type="date"
                    name="tanggal"
                    defaultValue={
                      editingContent?.tanggal
                        ? new Date(editingContent.tanggal)
                            .toISOString()
                            .split("T")[0]
                        : new Date().toISOString().split("T")[0]
                    }
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#2f4e9b] outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.titleLabel}
                </label>
                <input
                  name="judul"
                  defaultValue={editingContent?.judul || ""}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#2f4e9b] outline-none"
                  placeholder={t.titlePlaceholder}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.authorLabel}
                </label>
                <input
                  name="penulis"
                  defaultValue={
                    editingContent?.author || editingContent?.penulis || "Admin"
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#2f4e9b] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.contentLabel}
                </label>
                <textarea
                  name="deskripsi"
                  defaultValue={editingContent?.deskripsi || ""}
                  rows={6}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#2f4e9b] outline-none"
                  placeholder={t.contentPlaceholder}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.coverImageLabel}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors relative overflow-hidden">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                    onChange={handleImageChange}
                  />

                  {previewImage ? (
                    <div className="relative w-full h-48">
                      <Image
                        src={previewImage}
                        alt="Preview"
                        fill
                        className="object-contain"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity z-10">
                        <span className="bg-black/50 px-3 py-1 rounded">
                          {t.changeImage}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload size={24} className="mb-2" />
                      <span className="text-sm">{t.uploadPlaceholder}</span>
                    </>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isCreatingContent || isUpdatingContent}
                className="w-full bg-[#2f4e9b] text-white py-3 rounded-lg hover:bg-blue-800 disabled:opacity-50 flex justify-center items-center gap-2 font-semibold"
              >
                {(isCreatingContent || isUpdatingContent) && (
                  <Loader2 className="animate-spin" size={18} />
                )}
                {editingContent ? t.updateArticleBtn : t.publishArticleBtn}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// DEFAULT EXPORT WRAPPED IN SUSPENSE
// =========================================================================
export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#2f4e9b] rounded-full animate-spin"></div>
        </div>
      }
    >
      <BlogContent />
    </Suspense>
  );
}