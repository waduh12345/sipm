"use client";

import { useState, useEffect, useRef, useMemo, Suspense } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Swal from "sweetalert2";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEditMode } from "@/hooks/use-edit-mode";
import DotdLoader from "@/components/loader/3dot";
import { Button } from "@/components/ui/button";

// --- Components Editable ---
import { EditableText, EditableImage } from "@/components/ui/editable";
import {
  EditableSection,
  BackgroundConfig,
} from "@/components/ui/editable-section";

// --- Services ---
import {
  useGetAboutUsListQuery,
  useCreateAboutUsMutation,
  useUpdateAboutUsMutation,
} from "@/services/customize/about/about-us.service";

import {
  useGetAchievementListQuery,
  useCreateAchievementMutation,
  useUpdateAchievementMutation,
} from "@/services/customize/about/pencapaian.service";

import {
  useGetValueListQuery,
  useCreateValueMutation,
  useUpdateValueMutation,
} from "@/services/customize/about/value.service";

import {
  useGetCtaListQuery,
  useCreateCtaMutation,
  useUpdateCtaMutation,
} from "@/services/customize/about/cta.service";

// --- CONSTANTS ---
const BASE_IMAGE_URL = "https://api-content-web.naditechno.id/media/";

// --- Helper: Safe Image Logic ---
const safeImage = (
  img: string | File | null | undefined,
  fallback: string
): string => {
  // 1. Preview saat upload (File object)
  if (img instanceof File) return URL.createObjectURL(img);

  // 2. Data dari API (String)
  if (typeof img === "string" && img.trim().length > 0) {
    // Jika API mengembalikan URL lengkap (dimulai http/https), pakai langsung
    if (img.startsWith("http")) return img;

    // Jika API hanya mengembalikan nama file (misal: "gambar.jpg"), gabungkan dengan BASE_URL
    return `${BASE_IMAGE_URL}${img}`;
  }

  // 3. Fallback jika null/kosong
  return fallback;
};

// =========================================================================
// MAIN CONTENT COMPONENT
// =========================================================================
function OurFirmContent() {
  const { language, t } = useLanguage();
  const isEditMode = useEditMode();
  const [clientCode, setClientCode] = useState<string>("");

  useEffect(() => {
    // Hardcoded Client Code
    const code = "$2b$10$/pdGKqOqU7wOJUheZ07.H.AqTam8PZv5oLDtdxB5zT.25h3x491vy";
    if (code) setClientCode(code);
  }, []);

  // --- 1. API HOOKS ---
  const { data: aboutData, refetch: refetchAbout } = useGetAboutUsListQuery(
    { client_code: clientCode, bahasa: language },
    { skip: !clientCode }
  );
  const [updateAbout, { isLoading: isUpdatingAbout }] =
    useUpdateAboutUsMutation();
  const [createAbout, { isLoading: isCreatingAbout }] =
    useCreateAboutUsMutation();
  const currentAbout = useMemo(
    () => aboutData?.data?.items?.[0] || null,
    [aboutData]
  );

  const { data: journeyData, refetch: refetchJourney } =
    useGetAchievementListQuery(
      { client_code: clientCode, bahasa: language },
      { skip: !clientCode }
    );
  const [updateJourney, { isLoading: isUpdatingJourney }] =
    useUpdateAchievementMutation();
  const [createJourney, { isLoading: isCreatingJourney }] =
    useCreateAchievementMutation();
  const currentJourney = useMemo(
    () => journeyData?.data?.items?.[0] || null,
    [journeyData]
  );

  const { data: founderData, refetch: refetchFounder } = useGetValueListQuery(
    { client_code: clientCode, bahasa: language },
    { skip: !clientCode }
  );
  const [updateFounder, { isLoading: isUpdatingFounder }] =
    useUpdateValueMutation();
  const [createFounder, { isLoading: isCreatingFounder }] =
    useCreateValueMutation();
  const currentFounder = useMemo(
    () => founderData?.data?.items?.[0] || null,
    [founderData]
  );

  const { data: associatesData, refetch: refetchAssociates } =
    useGetCtaListQuery(
      { client_code: clientCode, bahasa: language },
      { skip: !clientCode }
    );
  const [updateAssociates, { isLoading: isUpdatingAssociates }] =
    useUpdateCtaMutation();
  const [createAssociates, { isLoading: isCreatingAssociates }] =
    useCreateCtaMutation();
  const currentAssociates = useMemo(
    () => associatesData?.data?.items?.[0] || null,
    [associatesData]
  );

  // --- 2. LOCAL STATE ---
  const [editableData, setEditableData] = useState({
    // Hero
    heroLabel: t.about.sectionLabel,
    heroTitle: t.about.heroTitle,
    heroSubtitle: "Jon Bernard & Associates",
    heroIntro: t.about.heroIntro,
    heroDesc1: t.about.heroDesc1,
    heroDesc2: t.about.heroDesc2,
    heroImage: "/about-image.jpg", // Default Fallback 1

    // Journey
    journeyLabel: t.about.history.label,
    journeyTitle: t.about.history.title,
    j1Year: "2013",
    j1Title: "2008 - 2013",
    j1Desc: t.about.history.item1,
    j2Year: "2019",
    j2Title: "2014 - 2019",
    j2Desc: t.about.history.item2,
    j3Year: "2025",
    j3Title: "2020 - 2025",
    j3Desc: t.about.history.item3,

    // Founder
    founderLabel: t.about.founder.label,
    founderName: "JON BERNARD PASARIBU, S.H., M.H.",
    founderBio1: t.about.founder.bio1,
    founderBio2: t.about.founder.bio2,
    founderAreas: Array.isArray(t.about.founder.areas)
      ? t.about.founder.areas.join("\n")
      : "",
    founderQuote: t.about.founder.footer,
    founderImage:
      "https://jonb-lawfirm.com/wp-content/uploads/2017/04/foto.png", // Default Fallback 2

    // Associates
    assocLabel: t.about.associates.label,
    andyName: "Andy Edward Pasaribu, SH.",
    andyRole: t.about.associates.role,
    andyBio1: t.about.associates.andy.bio1,
    andyBio2: t.about.associates.andy.bio2,
    andyLang: t.about.associates.andy.lang,
    // Felix
    felixName: "Felix Nixon Hawer N Mahulae, S.E., S.H.",
    felixRole: t.about.associates.role,
    felixBio1: t.about.associates.felix.bio1,
    felixBio2: t.about.associates.felix.bio2,
    felixLang: t.about.associates.felix.lang,
  });

  // Background configs
  const [heroBg, setHeroBg] = useState<BackgroundConfig>({
    type: "solid",
    color1: "#ffffff",
  });
  const [journeyBg, setJourneyBg] = useState<BackgroundConfig>({
    type: "solid",
    color1: "#2f4e9b",
  });

  // --- 3. SYNC DATA ---
  useEffect(() => {
    setEditableData((prev) => ({
      ...prev,
      // Hero
      heroTitle: currentAbout?.judul || t.about.heroTitle,
      heroSubtitle: currentAbout?.info_judul_1 || "Jon Bernard & Associates",
      heroIntro: currentAbout?.deskripsi || t.about.heroIntro,
      heroDesc1: currentAbout?.info_deskripsi_1 || t.about.heroDesc1,
      heroDesc2: currentAbout?.info_deskripsi_2 || t.about.heroDesc2,
      // LOGIC IMAGE: API vs Hardcode
      heroImage: safeImage(currentAbout?.image, "/about-image.jpg"),

      // Journey
      journeyLabel: t.about.history.label,
      journeyTitle: currentJourney?.judul || t.about.history.title,
      j1Title: currentJourney?.info_judul_1 || "2008 - 2013",
      j1Desc: currentJourney?.info_deskripsi_1 || t.about.history.item1,
      j1Year: currentJourney?.info_icon_1 || "2013",
      j2Title: currentJourney?.info_judul_2 || "2014 - 2019",
      j2Desc: currentJourney?.info_deskripsi_2 || t.about.history.item2,
      j2Year: currentJourney?.info_icon_2 || "2019",
      j3Title: currentJourney?.info_judul_3 || "2020 - 2025",
      j3Desc: currentJourney?.info_deskripsi_3 || t.about.history.item3,
      j3Year: currentJourney?.info_icon_3 || "2025",

      // Founder
      founderLabel: t.about.founder.label,
      founderName: currentFounder?.judul || "JON BERNARD PASARIBU, S.H., M.H.",
      founderBio1: currentFounder?.deskripsi || t.about.founder.bio1,
      founderBio2: currentFounder?.info_deskripsi_1 || t.about.founder.bio2,
      founderAreas:
        currentFounder?.info_deskripsi_2 ||
        (Array.isArray(t.about.founder.areas)
          ? t.about.founder.areas.join("\n")
          : ""),
      founderQuote: currentFounder?.info_deskripsi_3 || t.about.founder.footer,
      // LOGIC IMAGE: API vs Hardcode
      founderImage: safeImage(
        currentFounder?.image_1,
        "https://jonb-lawfirm.com/wp-content/uploads/2017/04/foto.png"
      ),

      // Associates
      assocLabel: t.about.associates.label,
      andyName: currentAssociates?.info_judul_1 || "Andy Edward Pasaribu, SH.",
      andyBio1:
        currentAssociates?.info_deskripsi_1 || t.about.associates.andy.bio1,
      andyRole: currentAssociates?.info_judul_2 || t.about.associates.role,
      andyBio2:
        currentAssociates?.info_deskripsi_2 || t.about.associates.andy.bio2,
      felixName:
        currentAssociates?.info_judul_3 ||
        "Felix Nixon Hawer N Mahulae, S.E., S.H.",
      felixBio1:
        currentAssociates?.info_deskripsi_3 || t.about.associates.felix.bio1,
      felixRole: currentAssociates?.info_judul_4 || t.about.associates.role,
      felixBio2:
        currentAssociates?.info_deskripsi_4 || t.about.associates.felix.bio2,
    }));
  }, [currentAbout, currentJourney, currentFounder, currentAssociates, t]);

  // --- 4. HANDLERS (SAVE & UPLOAD) ---
  const updateContent = (key: keyof typeof editableData, val: string) => {
    setEditableData((prev) => ({ ...prev, [key]: val }));
  };

  const handleSaveHero = async () => {
    if (!clientCode) return;
    try {
      const formData = new FormData();
      formData.append("client_id", "7");
      formData.append("bahasa", language);
      formData.append("status", "1");
      formData.append("judul", editableData.heroTitle);
      formData.append("info_judul_1", editableData.heroSubtitle);
      formData.append("deskripsi", editableData.heroIntro);
      formData.append("info_deskripsi_1", editableData.heroDesc1);
      formData.append("info_deskripsi_2", editableData.heroDesc2);
      // Defaults
      formData.append("visi_judul", "-");
      formData.append("visi_deskripsi", "-");
      formData.append("visi_icon", "-");
      formData.append("misi_judul", "-");
      formData.append("misi_deskripsi", "-");
      formData.append("misi_icon", "-");
      formData.append("info_judul_2", "-");
      formData.append("info_judul_3", "-");
      formData.append("info_deskripsi_3", "-");

      if (currentAbout?.id) {
        await updateAbout({ id: currentAbout.id, data: formData }).unwrap();
      } else {
        await createAbout(formData).unwrap();
      }
      Swal.fire("Success", "Hero section updated", "success");
      refetchAbout();
    } catch (e) {
      console.error(e);
      Swal.fire("Error", "Failed to save Hero", "error");
    }
  };

  const handleSaveJourney = async () => {
    if (!clientCode) return;
    try {
      const formData = new FormData();
      formData.append("client_id", "7");
      formData.append("bahasa", language);
      formData.append("status", "1");
      formData.append("judul", editableData.journeyTitle);
      formData.append("deskripsi", "Journey Timeline");
      formData.append("info_judul_1", editableData.j1Title);
      formData.append("info_deskripsi_1", editableData.j1Desc);
      formData.append("info_icon_1", editableData.j1Year);
      formData.append("info_judul_2", editableData.j2Title);
      formData.append("info_deskripsi_2", editableData.j2Desc);
      formData.append("info_icon_2", editableData.j2Year);
      formData.append("info_judul_3", editableData.j3Title);
      formData.append("info_deskripsi_3", editableData.j3Desc);
      formData.append("info_icon_3", editableData.j3Year);
      formData.append("info_judul_4", "-");
      formData.append("info_deskripsi_4", "-");
      formData.append("info_icon_4", "-");

      if (currentJourney?.id) {
        await updateJourney({ id: currentJourney.id, data: formData }).unwrap();
      } else {
        await createJourney(formData).unwrap();
      }
      Swal.fire("Success", "Journey section updated", "success");
      refetchJourney();
    } catch (e) {
      console.error(e);
      Swal.fire("Error", "Failed to save Journey", "error");
    }
  };

  const handleSaveFounder = async () => {
    if (!clientCode) return;
    try {
      const formData = new FormData();
      formData.append("client_id", "7");
      formData.append("bahasa", language);
      formData.append("status", "1");
      formData.append("judul", editableData.founderName);
      formData.append("deskripsi", editableData.founderBio1);
      formData.append("info_deskripsi_1", editableData.founderBio2);
      formData.append("info_deskripsi_2", editableData.founderAreas);
      formData.append("info_deskripsi_3", editableData.founderQuote);
      formData.append("info_judul_1", "Bio Part 2");
      formData.append("info_judul_2", "Areas");
      formData.append("info_judul_3", "Quote");
      formData.append("info_judul_4", "-");
      formData.append("info_deskripsi_4", "-");
      formData.append("info_icon_1", "-");
      formData.append("info_icon_2", "-");
      formData.append("info_icon_3", "-");
      formData.append("info_icon_4", "-");

      if (currentFounder?.id) {
        await updateFounder({ id: currentFounder.id, data: formData }).unwrap();
      } else {
        await createFounder(formData).unwrap();
      }
      Swal.fire("Success", "Managing Partner updated", "success");
      refetchFounder();
    } catch (e) {
      console.error(e);
      Swal.fire("Error", "Failed to save Founder", "error");
    }
  };

  const handleSaveAssociates = async () => {
    if (!clientCode) return;
    try {
      const payload = {
        client_id: "5",
        bahasa: language,
        status: 1,
        judul: "Associates Data",
        deskripsi: "List of associates",
        info_judul_1: editableData.andyName,
        info_deskripsi_1: editableData.andyBio1,
        info_judul_2: editableData.andyRole,
        info_deskripsi_2: editableData.andyBio2,
        info_judul_3: editableData.felixName,
        info_deskripsi_3: editableData.felixBio1,
        info_judul_4: editableData.felixRole,
        info_deskripsi_4: editableData.felixBio2,
        button_1: "-",
        button_link_1: "-",
        button_2: "-",
        button_link_2: "-",
      };
      if (currentAssociates?.id) {
        await updateAssociates({
          id: currentAssociates.id,
          data: payload,
        }).unwrap();
      } else {
        await createAssociates(payload).unwrap();
      }
      Swal.fire("Success", "Associates updated", "success");
      refetchAssociates();
    } catch (e) {
      console.error(e);
      Swal.fire("Error", "Failed to save Associates", "error");
    }
  };

  // --- HANDLER UPLOAD IMAGE ---
  const handleUploadHeroImage = async (file: File) => {
    if (!clientCode || !(file instanceof File)) return;

    // Optimistic Preview
    const previewUrl = URL.createObjectURL(file);
    setEditableData((prev) => ({ ...prev, heroImage: previewUrl }));

    try {
      const formData = new FormData();
      formData.append("client_id", "7");
      formData.append("bahasa", language);
      formData.append("status", "1"); // Status required
      formData.append("image", file);
      formData.append("judul", editableData.heroTitle);
      formData.append("deskripsi", editableData.heroIntro);

      if (currentAbout?.id) {
        await updateAbout({ id: currentAbout.id, data: formData }).unwrap();
        refetchAbout();
      }
    } catch (error) {
      console.error("Upload failed", error);
      Swal.fire("Error", "Failed to upload image", "error");
    }
  };

  const handleUploadFounderImage = async (file: File) => {
    if (!clientCode || !(file instanceof File)) return;

    // Optimistic Preview
    const previewUrl = URL.createObjectURL(file);
    setEditableData((prev) => ({ ...prev, founderImage: previewUrl }));

    try {
      const formData = new FormData();
      formData.append("client_id", "7");
      formData.append("bahasa", language);
      formData.append("status", "1"); // Status required
      formData.append("image_1", file);
      formData.append("judul", editableData.founderName);
      formData.append("deskripsi", editableData.founderBio1);

      if (currentFounder?.id) {
        await updateFounder({ id: currentFounder.id, data: formData }).unwrap();
        refetchFounder();
      }
    } catch (error) {
      console.error("Upload failed", error);
      Swal.fire("Error", "Failed to upload image", "error");
    }
  };

  // --- UI LOGIC ---
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollJourney = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 350;
      if (direction === "left")
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      else current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const JOURNEY_ITEMS = [
    {
      year: editableData.j1Year,
      title: editableData.j1Title,
      text: editableData.j1Desc,
      id: 1,
    },
    {
      year: editableData.j2Year,
      title: editableData.j2Title,
      text: editableData.j2Desc,
      id: 2,
    },
    {
      year: editableData.j3Year,
      title: editableData.j3Title,
      text: editableData.j3Desc,
      id: 3,
    },
  ];

  return (
    <div className="min-h-screen font-sans text-gray-600 selection:bg-[#2f4e9b] selection:text-white bg-white">
      <SiteHeader />

      {/* --- CONTENT SPACER --- */}
      <div className="h-24 lg:h-32"></div>

      {/* --- INTRO SECTION (AboutUs) --- */}
      <EditableSection
        isEditMode={isEditMode}
        config={heroBg}
        onSave={setHeroBg}
        className="py-10 lg:py-20 relative"
      >
        {isEditMode && (
          <div className="absolute top-4 left-6 z-50">
            <Button
              onClick={handleSaveHero}
              disabled={isCreatingAbout || isUpdatingAbout}
              size="sm"
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              {isCreatingAbout || isUpdatingAbout ? (
                <DotdLoader />
              ) : (
                "💾 Save Hero"
              )}
            </Button>
          </div>
        )}

        <div className="container mx-auto px-6">
          {/* Header Title */}
          <div className="flex flex-col items-start mb-8 lg:mb-16">
            <div className="flex items-center gap-3 uppercase text-xs font-bold tracking-[0.2em] text-[#2f4e9b] mb-4">
              <span className="w-8 h-[2px] bg-[#2f4e9b]"></span>
              <EditableText
                isEditMode={isEditMode}
                text={editableData.heroLabel}
                onSave={(v) => updateContent("heroLabel", v)}
                as="span"
              />
            </div>
            <h2 className="text-3xl lg:text-5xl font-light text-gray-900 leading-tight">
              <EditableText
                isEditMode={isEditMode}
                text={editableData.heroTitle}
                onSave={(v) => updateContent("heroTitle", v)}
                as="span"
              />{" "}
              <span className="text-[#2f4e9b] font-medium">
                <EditableText
                  isEditMode={isEditMode}
                  text={editableData.heroSubtitle}
                  onSave={(v) => updateContent("heroSubtitle", v)}
                  as="span"
                />
              </span>
            </h2>
          </div>

          {/* Content Split */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">
            <div className="lg:w-1/2 relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-sm group">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <EditableImage
                  src={editableData.heroImage}
                  alt="hero image"
                  onSave={handleUploadHeroImage}
                  width={1200}
                  height={800}
                  isEditMode={isEditMode}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center">
              <h3 className="text-xl text-[#2f4e9b] font-normal leading-relaxed mb-4 lg:mb-6 text-justify lg:text-left border-l-4 border-[#58b0e3] pl-6">
                <EditableText
                  isEditMode={isEditMode}
                  text={editableData.heroIntro}
                  onSave={(v) => updateContent("heroIntro", v)}
                  multiline
                  as="span"
                />
              </h3>
              <div className="text-gray-600 font-light leading-relaxed space-y-4 lg:space-y-6 text-base text-justify lg:text-left">
                <EditableText
                  isEditMode={isEditMode}
                  text={editableData.heroDesc1}
                  onSave={(v) => updateContent("heroDesc1", v)}
                  multiline
                  as="p"
                />
                <EditableText
                  isEditMode={isEditMode}
                  text={editableData.heroDesc2}
                  onSave={(v) => updateContent("heroDesc2", v)}
                  multiline
                  as="p"
                />
              </div>
            </div>
          </div>
        </div>
      </EditableSection>

      {/* --- JOURNEY SECTION (Achievement) --- */}
      <EditableSection
        isEditMode={isEditMode}
        config={journeyBg}
        onSave={setJourneyBg}
        className="bg-[#2f4e9b] py-12 md:py-24 text-white overflow-hidden relative"
      >
        {isEditMode && (
          <div className="absolute top-4 left-6 z-50">
            <Button
              onClick={handleSaveJourney}
              disabled={isCreatingJourney || isUpdatingJourney}
              size="sm"
              className="bg-white text-[#2f4e9b] hover:bg-gray-100"
            >
              {isCreatingJourney || isUpdatingJourney ? (
                <DotdLoader />
              ) : (
                "💾 Save Journey"
              )}
            </Button>
          </div>
        )}

        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

        <div className="container mx-auto px-6 mb-8 lg:mb-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4 uppercase text-xs font-bold tracking-[0.2em] text-[#58b0e3]">
                <span className="w-8 h-[2px] bg-[#58b0e3]"></span>
                <EditableText
                  isEditMode={isEditMode}
                  text={editableData.journeyLabel}
                  onSave={(v) => updateContent("journeyLabel", v)}
                  as="span"
                />
              </div>
              <h3 className="text-3xl lg:text-4xl font-light text-white">
                <EditableText
                  isEditMode={isEditMode}
                  text={editableData.journeyTitle}
                  onSave={(v) => updateContent("journeyTitle", v)}
                  as="span"
                />
              </h3>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => scrollJourney("left")}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#2f4e9b] transition-all duration-300"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollJourney("right")}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#2f4e9b] transition-all duration-300"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 md:gap-6 px-6 pb-4 snap-x scrollbar-hide container mx-auto"
        >
          {JOURNEY_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="min-w-[80vw] md:min-w-[45vw] lg:min-w-[28vw] snap-start bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col h-[300px] md:h-[450px] relative overflow-hidden group hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-[60px] md:text-[80px] font-bold text-white/10 absolute -top-4 md:-top-6 -right-2 md:-right-4 select-none leading-none group-hover:text-white/20 transition-colors">
                <EditableText
                  isEditMode={isEditMode}
                  text={item.year}
                  onSave={(v) =>
                    updateContent(
                      `j${item.id}Year` as keyof typeof editableData,
                      v
                    )
                  }
                  as="span"
                />
              </div>
              <div className="relative z-10 mt-auto">
                <div className="w-12 h-1 bg-[#58b0e3] mb-4 md:mb-6"></div>
                <h4 className="text-xl md:text-2xl font-medium mb-3 md:mb-4">
                  <EditableText
                    isEditMode={isEditMode}
                    text={item.title}
                    onSave={(v) =>
                      updateContent(
                        `j${item.id}Title` as keyof typeof editableData,
                        v
                      )
                    }
                    as="span"
                  />
                </h4>
                <p className="text-sm lg:text-base font-light leading-relaxed text-white/80 text-justify">
                  <EditableText
                    isEditMode={isEditMode}
                    text={item.text}
                    onSave={(v) =>
                      updateContent(
                        `j${item.id}Desc` as keyof typeof editableData,
                        v
                      )
                    }
                    multiline
                    as="span"
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
      </EditableSection>

      {/* --- MANAGING PARTNER SECTION (Value) --- */}
      <section className="py-12 lg:py-20 bg-white relative group">
        {isEditMode && (
          <div className="absolute top-4 left-6 z-50">
            <Button
              onClick={handleSaveFounder}
              disabled={isCreatingFounder || isUpdatingFounder}
              size="sm"
              className="bg-[#2f4e9b] text-white hover:bg-blue-800"
            >
              {isCreatingFounder || isUpdatingFounder ? (
                <DotdLoader />
              ) : (
                "💾 Save Founder"
              )}
            </Button>
          </div>
        )}
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
            <div className="w-full lg:w-1/3 flex-shrink-0">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100 group">
                <EditableImage
                  isEditMode={isEditMode}
                  src={editableData.founderImage}
                  alt="Jon Bernard Pasaribu"
                  width={800}
                  height={800}
                  className="h-[40vh] object-cover object-center"
                  onSave={handleUploadFounderImage}
                />

                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6 lg:hidden">
                  <p className="text-white font-medium">
                    {editableData.founderName}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 lg:w-2/3">
              <div className="mb-6">
                <h4 className="text-[#2f4e9b] text-sm uppercase tracking-widest font-bold mb-2">
                  <EditableText
                    isEditMode={isEditMode}
                    text={editableData.founderLabel}
                    onSave={(v) => updateContent("founderLabel", v)}
                    as="span"
                  />
                </h4>
                <h3 className="text-2xl lg:text-3xl text-gray-900 font-light mb-4 lg:mb-6">
                  <EditableText
                    isEditMode={isEditMode}
                    text={editableData.founderName}
                    onSave={(v) => updateContent("founderName", v)}
                    as="span"
                  />
                </h3>
                <div className="h-[2px] w-20 bg-[#2f4e9b]"></div>
              </div>

              <div className="text-gray-600 font-light space-y-4 text-justify leading-relaxed">
                <EditableText
                  isEditMode={isEditMode}
                  text={editableData.founderBio1}
                  onSave={(v) => updateContent("founderBio1", v)}
                  multiline
                  as="p"
                />
                <EditableText
                  isEditMode={isEditMode}
                  text={editableData.founderBio2}
                  onSave={(v) => updateContent("founderBio2", v)}
                  multiline
                  as="p"
                />
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 pl-4 list-disc marker:text-[#2f4e9b]">
                  {editableData.founderAreas.split("\n").map((area, idx) => (
                    <li key={idx}>
                      {isEditMode ? (
                        <span className="text-gray-400 text-xs italic">
                          (Edit below)
                        </span>
                      ) : (
                        area
                      )}
                    </li>
                  ))}
                </ul>
                {isEditMode && (
                  <div className="p-4 bg-gray-100 rounded-lg">
                    <label className="text-xs font-bold text-gray-500 mb-1 block">
                      Edit Areas (Separate by Enter)
                    </label>
                    <textarea
                      value={editableData.founderAreas}
                      onChange={(e) =>
                        updateContent("founderAreas", e.target.value)
                      }
                      className="w-full p-2 border rounded text-sm h-24"
                    />
                  </div>
                )}
                <div className="pt-4 border-t border-gray-100 mt-6">
                  <p className="font-light italic text-sm text-gray-500">
                    <EditableText
                      isEditMode={isEditMode}
                      text={editableData.founderQuote}
                      onSave={(v) => updateContent("founderQuote", v)}
                      multiline
                      as="span"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ASSOCIATES SECTION (CTA) --- */}
      <section className="py-12 lg:py-20 bg-gray-50 border-t border-gray-100 relative group">
        {isEditMode && (
          <div className="absolute top-4 left-6 z-50">
            <Button
              onClick={handleSaveAssociates}
              disabled={isCreatingAssociates || isUpdatingAssociates}
              size="sm"
              className="bg-[#2f4e9b] text-white hover:bg-blue-800"
            >
              {isCreatingAssociates || isUpdatingAssociates ? (
                <DotdLoader />
              ) : (
                "💾 Save Associates"
              )}
            </Button>
          </div>
        )}
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8 lg:mb-12 uppercase text-xs font-bold tracking-[0.2em] text-[#2f4e9b]">
            <span className="w-8 h-[2px] bg-[#2f4e9b]"></span>
            <EditableText
              isEditMode={isEditMode}
              text={editableData.assocLabel}
              onSave={(v) => updateContent("assocLabel", v)}
              as="span"
            />
          </div>

          <div className="space-y-12 lg:space-y-20">
            {/* Andy Section */}
            <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-16 items-start">
              <div className="w-full lg:w-1/4 shrink-0">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm border border-gray-200">
                  <Image
                    src="/profile-default.jpeg"
                    alt="Andy Edward Pasaribu"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl text-gray-900 font-light mb-2">
                  <EditableText
                    isEditMode={isEditMode}
                    text={editableData.andyName}
                    onSave={(v) => updateContent("andyName", v)}
                    as="span"
                  />
                </h3>
                <p className="text-[#2f4e9b] text-sm font-medium tracking-wide mb-4 lg:mb-6">
                  <EditableText
                    isEditMode={isEditMode}
                    text={editableData.andyRole}
                    onSave={(v) => updateContent("andyRole", v)}
                    as="span"
                  />
                </p>
                <div className="text-gray-600 font-light space-y-4 text-justify leading-relaxed">
                  <EditableText
                    isEditMode={isEditMode}
                    text={editableData.andyBio1}
                    onSave={(v) => updateContent("andyBio1", v)}
                    multiline
                    as="p"
                  />
                  <EditableText
                    isEditMode={isEditMode}
                    text={editableData.andyBio2}
                    onSave={(v) => updateContent("andyBio2", v)}
                    multiline
                    as="p"
                  />
                  <p className="text-sm font-medium text-gray-800">
                    {editableData.andyLang}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-gray-200"></div>

            {/* Felix Section */}
            <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-16 items-start">
              <div className="w-full lg:w-1/4 shrink-0">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm border border-gray-200">
                  <Image
                    src="/profile-default.jpeg"
                    alt="Felix Nixon Hawer N Mahulae"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl text-gray-900 font-light mb-2">
                  <EditableText
                    isEditMode={isEditMode}
                    text={editableData.felixName}
                    onSave={(v) => updateContent("felixName", v)}
                    as="span"
                  />
                </h3>
                <p className="text-[#2f4e9b] text-sm font-medium tracking-wide mb-4 lg:mb-6">
                  <EditableText
                    isEditMode={isEditMode}
                    text={editableData.felixRole}
                    onSave={(v) => updateContent("felixRole", v)}
                    as="span"
                  />
                </p>
                <div className="text-gray-600 font-light space-y-4 text-justify leading-relaxed">
                  <EditableText
                    isEditMode={isEditMode}
                    text={editableData.felixBio1}
                    onSave={(v) => updateContent("felixBio1", v)}
                    multiline
                    as="p"
                  />
                  <EditableText
                    isEditMode={isEditMode}
                    text={editableData.felixBio2}
                    onSave={(v) => updateContent("felixBio2", v)}
                    multiline
                    as="p"
                  />
                  <p className="text-sm font-medium text-gray-800">
                    {editableData.felixLang}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

// Wrapper Suspense Wajib untuk App Router
export default function OurFirmPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#2f4e9b] rounded-full animate-spin"></div>
        </div>
      }
    >
      <OurFirmContent />
    </Suspense>
  );
}