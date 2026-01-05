"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, Plus, Pencil, Upload, X } from "lucide-react";
import Swal from "sweetalert2";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEditMode } from "@/hooks/use-edit-mode";

// --- Components ---
import { EditableText, EditableImage } from "@/components/ui/editable"; // Assumed existing path

// --- Services ---
import {
  useGetFaqKategoriListQuery,
  useGetFaqKontenListQuery,
  useCreateFaqKontenMutation,
  useUpdateFaqKontenMutation,
} from "@/services/customize/faq.service";
import { FaqKonten } from "@/types/customization/faq/konten";
import { extractApiErrorMessage, isFetchBaseQueryError } from "@/lib/error-format";

// --- CONSTANTS ---
const BASE_IMAGE_URL = "https://api-content-web.naditechno.id/media/";

// --- HELPER ---
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

function OurClientsContent() {
  const { language, t } = useLanguage();
  const isEditMode = useEditMode();
  const [clientCode, setClientCode] = useState<string>("");

  // --- STATE: Content Selection & Modal ---
  const [activeId, setActiveId] = useState<number | string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FaqKonten | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    // Hardcoded Client Code
    const code = "$2b$10$/pdGKqOqU7wOJUheZ07.H.AqTam8PZv5oLDtdxB5zT.25h3x491vy";
    if (code) setClientCode(code);
  }, []);

  // --- 1. DATA FETCHING ---

  // A. Kategori (Hardcoded ID based on language)
  // ID: 1, EN: 2
  const targetCategoryId = language === "id" ? 1 : 2;

  // We actually don't need to fetch the category list to *find* it if we hardcode the ID for the content filter.
  // But if you want to edit the category title itself, you might need a way to fetch/update that specific category.
  // For now, I will focus on fetching the CONTENT based on this category ID.

  // B. Konten List
  const {
    data: kontenData,
    isLoading: isContentLoading,
    refetch: refetchContent,
  } = useGetFaqKontenListQuery(
    {
      client_code: clientCode,
      bahasa: language,
      kategori_id: targetCategoryId,
    },
    { skip: !clientCode }
  );

  // C. Mutations
  const [createKonten, { isLoading: isCreating }] =
    useCreateFaqKontenMutation();
  const [updateKonten, { isLoading: isUpdating }] =
    useUpdateFaqKontenMutation();

  // --- 2. DATA PROCESSING ---
  const services = useMemo(() => kontenData?.data?.items || [], [kontenData]);

  // Set default active ID to the first item if not set
  useEffect(() => {
    if (services.length > 0 && activeId === null) {
      setActiveId(services[0].id);
    }
  }, [services, activeId]);

  const activeService = services.find((s) => s.id === activeId) || services[0];

  // --- 3. HANDLERS ---

  const handleOpenModal = (item?: FaqKonten) => {
    setEditingItem(item || null);
    if (item?.image) {
      setPreviewImage(safeImage(item.image, ""));
    } else {
      setPreviewImage(null);
    }
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Append required hidden fields
    formData.append("client_id", "7");
    formData.append("kategori_id", String(targetCategoryId));
    formData.append("status", "1");
    // 'penulis' and 'tanggal' are assumed handled by backend or not critical for this specific "Service/Industry" view,
    // but if needed, append default values:
    formData.append("penulis", "Admin");
    formData.append("tanggal", new Date().toISOString().split("T")[0]);

    // Handle Image
    const file = formData.get("image") as File;
    if (!editingItem && (!file || file.size === 0)) {
      // Optional: force image on create if UI depends on it
    }
    if (editingItem && (!file || file.size === 0)) {
      formData.delete("image");
    }

    try {
      if (editingItem) {
        await updateKonten({ id: editingItem.id, data: formData }).unwrap();
        Swal.fire("Success", "Item updated successfully", "success");
      } else {
        await createKonten(formData).unwrap();
        Swal.fire("Success", "Item created successfully", "success");
      }
      setIsModalOpen(false);
      refetchContent();
    } catch (error) {
      console.error(error);
      
      let errorMsg = "Failed to save item";

      if (isFetchBaseQueryError(error)) {
        const extracted = extractApiErrorMessage(error.data);
        if (extracted) errorMsg = extracted;
      } 
      else if (error instanceof Error) {
        errorMsg = error.message;
      }

      Swal.fire("Error", errorMsg, "error");
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-600 selection:bg-[#2f4e9b] selection:text-white bg-white relative">
      <SiteHeader />

      {/* --- CONTENT SPACER --- */}
      <div className="h-24 lg:h-32"></div>

      {/* --- MAIN SPLIT SECTION --- */}
      <section className="min-h-[80vh] flex flex-col justify-center py-10 lg:py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-start">
            {/* --- LEFT COLUMN: LIST SERVICES --- */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              {/* Section Title */}
              <div className="mb-8 lg:mb-12">
                <div className="flex items-center gap-3 uppercase text-xs font-bold tracking-[0.2em] text-[#2f4e9b] mb-4">
                  <span className="w-8 h-[2px] bg-[#2f4e9b]"></span>
                  {t.client.label}
                </div>
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl lg:text-5xl font-light text-gray-900 leading-tight">
                    {t.client.heroTitle}
                  </h1>
                  {isEditMode && (
                    <button
                      onClick={() => handleOpenModal()}
                      className="text-sm bg-[#2f4e9b] text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-800 transition-colors"
                    >
                      <Plus size={16} /> Add
                    </button>
                  )}
                </div>
              </div>

              {/* The List */}
              <div className="flex flex-col border-t border-gray-100">
                {isContentLoading ? (
                  <div className="py-10 text-center">Loading...</div>
                ) : services.length === 0 ? (
                  <div className="py-10 text-center text-gray-400">
                    No items found.
                  </div>
                ) : (
                  services.map((service) => (
                    <div
                      key={service.id}
                      className={`group relative border-b border-gray-100 py-5 lg:py-8 cursor-pointer transition-all duration-500 flex items-center justify-between
                                ${
                                  activeId === service.id
                                    ? "pl-4 bg-gray-50/50"
                                    : "hover:pl-4 hover:bg-gray-50"
                                }`}
                      onMouseEnter={() => setActiveId(service.id)}
                      onClick={() => setActiveId(service.id)}
                    >
                      <div className="w-full relative">
                        {isEditMode && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenModal(service);
                            }}
                            className="absolute right-0 top-0 p-2 text-gray-400 hover:text-[#2f4e9b] z-10"
                          >
                            <Pencil size={16} />
                          </button>
                        )}
                        <h3
                          className={`text-2xl lg:text-3xl font-light transition-colors duration-300 flex items-center gap-4 
                                    ${
                                      activeId === service.id
                                        ? "text-[#2f4e9b]"
                                        : "text-gray-800 group-hover:text-[#2f4e9b]"
                                    }`}
                        >
                          {service.judul}
                          {activeId === service.id && (
                            <ArrowRight className="w-5 h-5 opacity-0 animate-fadeIn ml-2" />
                          )}
                        </h3>
                        {/* Description Animation */}
                        <div
                          className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            activeId === service.id
                              ? "max-h-32 opacity-100 mt-3"
                              : "max-h-0 opacity-0 mt-0"
                          }`}
                        >
                          <p className="text-sm text-gray-500 font-light leading-relaxed max-w-md">
                            {/* Render HTML content safely if needed, or plain text */}
                            <span
                              dangerouslySetInnerHTML={{
                                __html: service.deskripsi || "",
                              }}
                            />
                          </p>
                        </div>
                      </div>

                      {/* Active Indicator (Border Left) */}
                      <div
                        className={`absolute left-0 top-0 h-full w-[3px] bg-[#2f4e9b] transition-all duration-300 ${
                          activeId === service.id
                            ? "opacity-100 scale-y-100"
                            : "opacity-0 scale-y-0"
                        }`}
                      ></div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* --- RIGHT COLUMN: DYNAMIC IMAGE (Sticky) --- */}
            <div className="lg:w-1/2 relative hidden lg:block h-[600px] sticky top-32">
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                <AnimatePresence mode="wait">
                  {activeService && (
                    <motion.div
                      key={activeService.id}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={safeImage(
                          activeService.image,
                          "/placeholder-image.jpg"
                        )}
                        alt={activeService.judul}
                        fill
                        className="object-cover"
                        priority
                      />
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                      {/* Label Overlay */}
                      <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-md p-6 border-l-4 border-[#2f4e9b] shadow-lg max-w-xs">
                        <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                          {t.client.viewLabel}
                        </span>
                        <span className="block text-xl font-medium text-gray-900">
                          {activeService.judul}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MOBILE IMAGE FALLBACK --- */}
      <section className="lg:hidden pb-12 px-6">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-100">
          <AnimatePresence mode="wait">
            {activeService && (
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full h-full"
              >
                <Image
                  src={safeImage(activeService.image, "/placeholder-image.jpg")}
                  alt={activeService.judul}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 border-t border-gray-100">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">
                    {t.client.selectedLabel}
                  </p>
                  <p className="font-bold text-gray-900">
                    {activeService.judul}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <SiteFooter />

      {/* --- MODAL (Create/Update Content) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              {editingItem ? "Edit Item" : "Add New Item"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  name="judul"
                  defaultValue={editingItem?.judul || ""}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#2f4e9b] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="deskripsi"
                  defaultValue={editingItem?.deskripsi || ""}
                  rows={4}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#2f4e9b] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center relative hover:bg-gray-50 transition-colors">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                    onChange={handleImageChange}
                  />
                  {previewImage ? (
                    <div className="relative w-full h-40">
                      <Image
                        src={previewImage}
                        alt="Preview"
                        fill
                        className="object-contain"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity z-10">
                        <span className="bg-black/50 px-2 py-1 text-xs rounded">
                          Change
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload size={20} className="mb-2 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        Upload Image
                      </span>
                    </>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isCreating || isUpdating}
                className="w-full bg-[#2f4e9b] text-white py-2.5 rounded-lg hover:bg-blue-800 disabled:opacity-50 flex justify-center items-center gap-2 font-medium"
              >
                {(isCreating || isUpdating) && (
                  <Loader2 className="animate-spin" size={18} />
                )}
                Save Item
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Wrapper Suspense
export default function OurClientsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#2f4e9b] rounded-full animate-spin"></div>
        </div>
      }
    >
      <OurClientsContent />
    </Suspense>
  );
}