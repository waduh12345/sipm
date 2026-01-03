"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle } from "lucide-react";

// --- IMPORTS UNTUK EDITABLE SYSTEM ---
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/use-translation";
import Swal from "sweetalert2";
import DotdLoader from "@/components/loader/3dot";
import { useEditMode } from "@/hooks/use-edit-mode";

// Import Components Editable
import { EditableText, EditableLink } from "@/components/ui/editable";
import {
  EditableSection,
  BackgroundConfig,
} from "@/components/ui/editable-section";

// Import Services
import {
  useGetHeroListQuery,
  useCreateHeroMutation,
  useUpdateHeroMutation,
} from "@/services/customize/home/hero.service";

import {
  useGetMengapaListQuery,
  useCreateMengapaMutation,
  useUpdateMengapaMutation,
} from "@/services/customize/home/why.service";

import {
  useGetCTAListQuery,
  useCreateCTAMutation,
  useUpdateCTAMutation,
} from "@/services/customize/home/cta.service";

// Dummy Translations
const en = {
  "hero-welcome": "Welcome to",
  "hero-subtitle": "JON BERNARD & ASSOCIATES\nATTORNEY & LEGAL ADVISOR",
  "hero-desc":
    "We are a law firm dedicated to providing the best legal solutions for you. With an experienced and professional team, we are ready to assist you in handling various legal cases with high integrity.",
  "hero-cta": "Read More",
  "exp-title": "OUR EXPERTISE",
  "exp-p1":
    "Jon Bernard & Associates handles matters related to corporate law and capital markets, and assists clients with labor (employment) issues. The handling of every legal case, whether insurance law, corporate law, or capital markets, can be pursued through non-litigation and/or litigation methods.",
  "exp-p2":
    "Jon Bernard & Associates assists clients by striving to achieve favorable results in case resolution. In our experience, we have successfully handled various cases in both court and arbitration. If necessary, we can also assist clients in conducting negotiations with other parties.",
  "contact-title": "HAVE QUESTIONS OR NEED LEGAL CONSULTATION?",
  "contact-desc":
    "The JonB & Associates Law Firm team is ready to assist you with clear explanations, fast responses, and appropriate solutions. Please send your questions via email or click the Whatsapp button. We will respond to your message as soon as possible.",
  "contact-email-btn": "Email",
  "contact-wa-btn": "Whatsapp",
};

const id = {
  "hero-welcome": "Selamat Datang di",
  "hero-subtitle": "JON BERNARD & ASSOCIATES\nPENGACARA & PENASIHAT HUKUM",
  "hero-desc":
    "Kami adalah firma hukum yang berdedikasi untuk memberikan solusi hukum terbaik bagi Anda. Dengan tim yang berpengalaman dan profesional, kami siap membantu Anda menangani berbagai kasus hukum dengan integritas tinggi.",
  "hero-cta": "Baca Selengkapnya",
  "exp-title": "KEAHLIAN KAMI",
  "exp-p1":
    "Jon Bernard & Associates menangani masalah terkait hukum perusahaan dan pasar modal, serta membantu klien dengan masalah ketenagakerjaan. Penanganan setiap kasus hukum, baik hukum asuransi, hukum perusahaan, atau pasar modal, dapat ditempuh melalui metode non-litigasi dan/atau litigasi.",
  "exp-p2":
    "Jon Bernard & Associates membantu klien dengan berupaya mencapai hasil yang menguntungkan dalam penyelesaian kasus. Dalam pengalaman kami, kami telah berhasil menangani berbagai kasus baik di pengadilan maupun arbitrase. Jika diperlukan, kami juga dapat membantu klien dalam melakukan negosiasi dengan pihak lain.",
  "contact-title": "PUNYA PERTANYAAN ATAU BUTUH KONSULTASI HUKUM?",
  "contact-desc":
    "Tim JonB & Associates Law Firm siap membantu Anda dengan penjelasan yang jelas, respon cepat, dan solusi yang tepat. Silakan kirim pertanyaan Anda melalui email atau klik tombol Whatsapp. Kami akan membalas pesan Anda sesegera mungkin.",
  "contact-email-btn": "Email",
  "contact-wa-btn": "Whatsapp",
};

function HomeContent() {
  const { language } = useLanguage();
  const t = useTranslation({ en, id });
  const isEditMode = useEditMode();

  const [clientCode, setClientCode] = useState<string>("");

  useEffect(() => {
    const code = "$2b$10$/pdGKqOqU7wOJUheZ07.H.AqTam8PZv5oLDtdxB5zT.25h3x491vy";
    if (code) setClientCode(code);
  }, []);

  // State Background (Default diset sama persis dengan kode lama)
  const [heroBg, setHeroBg] = useState<BackgroundConfig>({
    type: "image",
    imageUrl: "/WhatsApp Image 2025-12-08 at 18.01.25.jpeg",
    color1: "#000000",
  });

  const [expertiseBg, setExpertiseBg] = useState<BackgroundConfig>({
    type: "solid",
    color1: "#f7fbff",
  });

  const [contactBg, setContactBg] = useState<BackgroundConfig>({
    type: "solid",
    color1: "#2f4e9b",
  });

  // --- API SERVICE HOOKS ---
  const { data: heroApiResult, refetch: refetchHero } = useGetHeroListQuery(
    { client_code: clientCode, bahasa: language },
    { skip: !clientCode }
  );
  const [createHero, { isLoading: isCreatingHero }] = useCreateHeroMutation();
  const [updateHero, { isLoading: isUpdatingHero }] = useUpdateHeroMutation();

  const currentHeroData = useMemo(
    () => heroApiResult?.data?.items?.[0] || null,
    [heroApiResult]
  );

  const { data: mengapaApiResult, refetch: refetchMengapa } =
    useGetMengapaListQuery(
      { client_code: clientCode, bahasa: language },
      { skip: !clientCode }
    );
  const [createMengapa, { isLoading: isCreatingMengapa }] =
    useCreateMengapaMutation();
  const [updateMengapa, { isLoading: isUpdatingMengapa }] =
    useUpdateMengapaMutation();

  const currentMengapaData = useMemo(
    () => mengapaApiResult?.data?.items?.[0] || null,
    [mengapaApiResult]
  );

  const { data: ctaApiResult, refetch: refetchCTA } = useGetCTAListQuery(
    { client_code: clientCode, bahasa: language },
    { skip: !clientCode }
  );
  const [createCTA, { isLoading: isCreatingCTA }] = useCreateCTAMutation();
  const [updateCTA, { isLoading: isUpdatingCTA }] = useUpdateCTAMutation();

  const currentCTAData = useMemo(
    () => ctaApiResult?.data?.items?.[0] || null,
    [ctaApiResult]
  );

  // --- LOCAL EDITABLE STATE ---
  const [editableData, setEditableData] = useState({
    heroWelcome: t["hero-welcome"],
    heroSubtitle: t["hero-subtitle"],
    heroDesc: t["hero-desc"],
    heroCtaText: t["hero-cta"],
    expTitle: t["exp-title"],
    expP1: t["exp-p1"],
    expP2: t["exp-p2"],
    contactTitle: t["contact-title"],
    contactDesc: t["contact-desc"],
    contactEmailBtn: t["contact-email-btn"],
    contactEmailUrl: "mailto:info@jonb-associates.com",
    contactWaBtn: t["contact-wa-btn"],
    contactWaUrl: "https://wa.me/6281234567890",
  });

  // Sync Data
  useEffect(() => {
    const defaults = {
      heroWelcome: t["hero-welcome"],
      heroSubtitle: t["hero-subtitle"],
      heroDesc: t["hero-desc"],
      heroCtaText: t["hero-cta"],
      expTitle: t["exp-title"],
      expP1: t["exp-p1"],
      expP2: t["exp-p2"],
      contactTitle: t["contact-title"],
      contactDesc: t["contact-desc"],
      contactEmailBtn: t["contact-email-btn"],
      contactEmailUrl: "mailto:info@jonb-associates.com",
      contactWaBtn: t["contact-wa-btn"],
      contactWaUrl: "https://wa.me/6281234567890",
    };

    setEditableData((prev) => ({
      ...prev,
      heroWelcome: currentHeroData?.judul || defaults.heroWelcome,
      heroSubtitle: currentHeroData?.sub_judul || defaults.heroSubtitle,
      heroDesc: currentHeroData?.deskripsi || defaults.heroDesc,
      heroCtaText: currentHeroData?.button_text_1 || defaults.heroCtaText,
      expTitle: currentMengapaData?.judul || defaults.expTitle,
      expP1: currentMengapaData?.info_deskripsi_1 || defaults.expP1,
      expP2: currentMengapaData?.info_deskripsi_2 || defaults.expP2,
      contactTitle: currentCTAData?.judul || defaults.contactTitle,
      contactDesc: currentCTAData?.deskripsi || defaults.contactDesc,
      contactEmailBtn: currentCTAData?.button_1 || defaults.contactEmailBtn,
      contactEmailUrl:
        currentCTAData?.button_link_1 || defaults.contactEmailUrl,
      contactWaBtn: currentCTAData?.button_2 || defaults.contactWaBtn,
      contactWaUrl: currentCTAData?.button_link_2 || defaults.contactWaUrl,
    }));
  }, [currentHeroData, currentMengapaData, currentCTAData, t]);

  // --- HANDLERS ---
  const updateContent = (key: keyof typeof editableData, val: string) => {
    setEditableData((prev) => ({ ...prev, [key]: val }));
  };

  const handleSaveHero = async () => {
    if (!clientCode) return Swal.fire("Error", "Client Code missing", "error");
    try {
      const formData = new FormData();
      formData.append("client_id", "7");
      formData.append("bahasa", language);
      formData.append("status", "1");
      formData.append("judul", editableData.heroWelcome);
      formData.append("sub_judul", editableData.heroSubtitle);
      formData.append("deskripsi", editableData.heroDesc);
      formData.append("button_text_1", editableData.heroCtaText);
      formData.append("tagline", "-");
      formData.append("button_text_2", "-");
      formData.append("info_1", "-");
      formData.append("info_nilai_1", "-");

      if (currentHeroData?.id) {
        await updateHero({ id: currentHeroData.id, data: formData }).unwrap();
      } else {
        await createHero(formData).unwrap();
      }
      Swal.fire(
        "Success",
        `Hero (${language.toUpperCase()}) updated!`,
        "success"
      );
      refetchHero();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to save Hero", "error");
    }
  };

  const handleSaveExpertise = async () => {
    if (!clientCode) return Swal.fire("Error", "Client Code missing", "error");
    try {
      const formData = new FormData();
      formData.append("client_id", "7");
      formData.append("bahasa", language);
      formData.append("status", "1");
      formData.append("judul", editableData.expTitle);
      formData.append("sub_judul", "-");
      formData.append("tagline", "Expertise");
      formData.append("info_judul_1", "Paragraph 1");
      formData.append("info_deskripsi_1", editableData.expP1);
      formData.append("info_judul_2", "Paragraph 2");
      formData.append("info_deskripsi_2", editableData.expP2);
      formData.append("info_judul_3", "-");
      formData.append("info_deskripsi_3", "-");
      formData.append("info_judul_4", "-");
      formData.append("info_deskripsi_4", "-");

      if (currentMengapaData?.id) {
        await updateMengapa({
          id: currentMengapaData.id,
          data: formData,
        }).unwrap();
      } else {
        await createMengapa(formData).unwrap();
      }
      Swal.fire(
        "Success",
        `Expertise (${language.toUpperCase()}) updated!`,
        "success"
      );
      refetchMengapa();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to save Expertise", "error");
    }
  };

  const handleSaveContact = async () => {
    if (!clientCode) return Swal.fire("Error", "Client Code missing", "error");
    try {
      const formData = new FormData();
      formData.append("client_id", "7");
      formData.append("bahasa", language);
      formData.append("status", "1");
      formData.append("judul", editableData.contactTitle);
      formData.append("deskripsi", editableData.contactDesc);
      formData.append("button_1", editableData.contactEmailBtn);
      formData.append("button_link_1", editableData.contactEmailUrl);
      formData.append("button_2", editableData.contactWaBtn);
      formData.append("button_link_2", editableData.contactWaUrl);
      formData.append("sub_judul", "-");
      formData.append("info_judul_1", "-");
      formData.append("info_deskripsi_1", "-");
      formData.append("info_judul_2", "-");
      formData.append("info_deskripsi_2", "-");
      formData.append("info_judul_3", "-");
      formData.append("info_deskripsi_3", "-");
      formData.append("info_judul_4", "-");
      formData.append("info_deskripsi_4", "-");

      if (currentCTAData?.id) {
        await updateCTA({ id: currentCTAData.id, data: formData }).unwrap();
      } else {
        await createCTA(formData).unwrap();
      }
      Swal.fire(
        "Success",
        `Contact (${language.toUpperCase()}) updated!`,
        "success"
      );
      refetchCTA();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to save Contact", "error");
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-600 selection:bg-[#2f4e9b] selection:text-white bg-white">
      {/* --- HEADER / NAVBAR --- */}
      <SiteHeader />

      {/* --- HERO SECTION --- */}
      <EditableSection
        isEditMode={isEditMode}
        config={heroBg}
        onSave={setHeroBg}
        className="relative h-screen w-full overflow-hidden"
        // Tambahkan props ini untuk disable rendering gambar background via EditableSection
        // Karena Hero sudah punya Next.js Image manual di children.
        disableImageRender={true}
      >
        {isEditMode && (
          <div className="absolute top-24 left-6 z-50 animate-in fade-in zoom-in duration-300">
            <Button
              onClick={handleSaveHero}
              disabled={isCreatingHero || isUpdatingHero}
              className="bg-yellow-500 hover:bg-yellow-600 text-black shadow-lg border-2 border-white/20"
              size="sm"
            >
              {isCreatingHero || isUpdatingHero ? (
                <DotdLoader />
              ) : (
                `💾 Save Hero (${language.toUpperCase()})`
              )}
            </Button>
          </div>
        )}

        {/* Gambar manual via Next.js Image (Priority) */}
        <div className="absolute inset-0 z-0">
          <Image
            src={
              heroBg.imageUrl || "/WhatsApp Image 2025-12-08 at 18.01.25.jpeg"
            }
            alt="Building"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>

        <div className="container mx-auto px-6 h-full relative z-20 flex flex-col justify-center">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center lg:justify-between w-full h-full pt-20 lg:pt-0">
            {/* Left Text */}
            <div className="lg:w-8/12">
              <h2 className="text-2xl lg:text-5xl font-light text-[#FCD400] leading-tight relative inline-block mb-4">
                <EditableText
                  isEditMode={isEditMode}
                  text={editableData.heroWelcome}
                  onSave={(val) => updateContent("heroWelcome", val)}
                  as="span"
                />
              </h2>
              <div className="flex flex-col items-start gap-1 mb-6 text-[#FCD400] uppercase text-sm md:text-xl tracking-[0.15em] font-semibold whitespace-pre-line leading-snug">
                <EditableText
                  isEditMode={isEditMode}
                  text={editableData.heroSubtitle}
                  onSave={(val) => updateContent("heroSubtitle", val)}
                  multiline={true}
                  as="div"
                />
              </div>
              <div className="text-lg lg:text-3xl font-light text-white leading-snug max-w-4xl">
                <EditableText
                  isEditMode={isEditMode}
                  text={editableData.heroDesc}
                  onSave={(val) => updateContent("heroDesc", val)}
                  multiline={true}
                  as="h2"
                />
              </div>

              <div className="mt-10">
                <Button className="border border-white bg-transparent hover:bg-white hover:text-[#2f4e9b] text-white rounded-full px-10 py-6 text-xs uppercase tracking-wider transition-all duration-300">
                  <EditableText
                    isEditMode={isEditMode}
                    text={editableData.heroCtaText}
                    onSave={(val) => updateContent("heroCtaText", val)}
                    as="span"
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </EditableSection>

      {/* --- OUR EXPERTISE --- */}
      <EditableSection
        isEditMode={isEditMode}
        config={expertiseBg}
        onSave={setExpertiseBg}
        className="py-10 md:py-32 bg-[#f7fbff]"
      >
        {isEditMode && (
          <div className="absolute top-4 left-6 z-50">
            <Button
              onClick={handleSaveExpertise}
              disabled={isCreatingMengapa || isUpdatingMengapa}
              className="bg-[#2f4e9b] hover:bg-blue-800 text-white shadow-lg border-2 border-white/20"
              size="sm"
            >
              {isCreatingMengapa || isUpdatingMengapa ? (
                <DotdLoader />
              ) : (
                `💾 Save Expertise (${language.toUpperCase()})`
              )}
            </Button>
          </div>
        )}

        <div className="container mx-auto px-6 relative">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full">
              <div className="flex items-center gap-3 mb-6 uppercase text-xs font-bold tracking-[0.2em] text-[#2f4e9b]">
                <span className="w-8 h-[2px] bg-[#2f4e9b]"></span>
                <EditableText
                  isEditMode={isEditMode}
                  text={editableData.expTitle}
                  onSave={(val) => updateContent("expTitle", val)}
                  as="span"
                />
              </div>

              <div className="text-gray-600 font-light leading-relaxed mb-0 text-base lg:text-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20">
                  <div>
                    <EditableText
                      isEditMode={isEditMode}
                      text={editableData.expP1}
                      onSave={(val) => updateContent("expP1", val)}
                      multiline={true}
                      as="p"
                      className="text-justify leading-relaxed"
                    />
                  </div>
                  <div>
                    <EditableText
                      isEditMode={isEditMode}
                      text={editableData.expP2}
                      onSave={(val) => updateContent("expP2", val)}
                      multiline={true}
                      as="p"
                      className="text-justify leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </EditableSection>

      {/* --- NEWSLETTER / CONTACT --- */}
      <EditableSection
        isEditMode={isEditMode}
        config={contactBg}
        onSave={setContactBg}
        className="relative py-12 md:py-32 bg-[#2f4e9b] overflow-hidden"
      >
        {isEditMode && (
          <div className="absolute top-4 left-6 z-50">
            <Button
              onClick={handleSaveContact}
              disabled={isCreatingCTA || isUpdatingCTA}
              className="bg-[#FCD400] hover:bg-yellow-500 text-black shadow-lg border-2 border-white/20"
              size="sm"
            >
              {isCreatingCTA || isUpdatingCTA ? (
                <DotdLoader />
              ) : (
                `💾 Save Contact (${language.toUpperCase()})`
              )}
            </Button>
          </div>
        )}

        <div className="absolute inset-0 z-0 opacity-10">
          <Image
            src="/WhatsApp Image 2025-12-08 at 18.09.38.jpeg"
            alt="Meeting"
            fill
            className="object-cover"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="lg:w-2/3 w-full text-white">
            <div className="flex items-center gap-3 mb-4 lg:mb-6 uppercase text-xs font-bold tracking-[0.2em] text-[#FCD400]">
              <span className="w-8 h-[2px] bg-[#FCD400]"></span>
              <EditableText
                isEditMode={isEditMode}
                text={editableData.contactTitle}
                onSave={(val) => updateContent("contactTitle", val)}
                as="span"
              />
            </div>
            <div className="text-lg lg:text-2xl font-light text-white/90 leading-relaxed text-justify">
              <EditableText
                isEditMode={isEditMode}
                text={editableData.contactDesc}
                onSave={(val) => updateContent("contactDesc", val)}
                multiline={true}
                as="p"
              />
            </div>
          </div>

          <div className="lg:w-1/3 w-full flex flex-col items-center lg:items-end justify-center">
            <div className="flex flex-col gap-4 w-full">
              <EditableLink
                isEditMode={isEditMode}
                label={editableData.contactEmailBtn}
                href={editableData.contactEmailUrl}
                onSave={(l, h) => {
                  updateContent("contactEmailBtn", l);
                  updateContent("contactEmailUrl", h);
                }}
                icon={Mail}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#2f4e9b] font-medium hover:bg-[#FCD400] hover:text-[#2f4e9b] transition-all duration-300 rounded-lg shadow-lg"
              />

              <EditableLink
                isEditMode={isEditMode}
                label={editableData.contactWaBtn}
                href={editableData.contactWaUrl}
                onSave={(l, h) => {
                  updateContent("contactWaBtn", l);
                  updateContent("contactWaUrl", h);
                }}
                icon={MessageCircle}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white font-medium hover:bg-[#128C7E] transition-all duration-300 rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </EditableSection>

      {/* INDIKATOR MODE EDIT */}
      {isEditMode && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg z-50 text-sm font-bold flex items-center gap-2 animate-bounce pointer-events-none">
          Mode Editor Aktif
        </div>
      )}

      <SiteFooter />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#2f4e9b] rounded-full animate-spin"></div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}