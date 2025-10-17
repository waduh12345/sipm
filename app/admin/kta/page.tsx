"use client";

import { PrinterIcon, IdCard } from "lucide-react";
import { useRef, useMemo, Suspense } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { KTACard } from "@/components/kta-card-admin";
import KTACardBack from "@/components/kta-card-back-admin";
import { Button } from "@/components/ui/button";

function KtaPageFallback() {
  return (
    <div className="min-h-screen bg-background p-4 animate-pulse">
      <div className="h-10 w-1/3 bg-muted rounded mb-4" />
      <div className="h-6 w-2/3 bg-muted rounded mb-6" />
      <div className="h-[220px] bg-muted rounded mb-4" />
      <div className="h-[220px] bg-muted rounded mb-6" />
      <div className="h-12 w-full bg-muted rounded" />
    </div>
  );
}

// ... (imports remain the same)

function KtaPageContent() {
  const searchParams = useSearchParams();
  const params = useParams();

  // Ambil id dari: /admin/kta/[id]  → params.id
  // atau query:     ?id= / ?memberId=
  const rawId: string | undefined =
    (typeof params?.id === "string" ? (params.id as string) : undefined) ??
    searchParams?.get("id") ??
    searchParams?.get("memberId") ??
    undefined;

  const numericId = useMemo<number | undefined>(() => {
    if (!rawId) return undefined;
    return /^\d+$/.test(rawId) ? Number(rawId) : undefined;
  }, [rawId]);

  const backId: string = rawId ?? "KTA-001234";

  const printRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Global print styles */}
      <style jsx global>{`
        :root {
          /* Disesuaikan untuk dua kartu berdampingan */
          --card-width-preview: 90mm; /* Lebar pratinjau yang lebih kecil */
          --card-width-print: 90mm; /* Lebar kartu di cetakan */
          --page-margin: 8mm;
          --card-gap: 10mm; /* Jarak antar kartu */
        }

        .kta-card-frame {
          width: var(--card-width-preview);
          max-width: 100%;
        }

        @media print {
          @page {
            size: A4 portrait; /* **PENTING: Gunakan landscape untuk 2 kartu** */
            margin: var(--page-margin);
          }

          html,
          body,
          #__next {
            margin: 0 !important;
            padding: 0 !important;
            height: auto !important;
            overflow: visible !important;
            background: transparent !important;
          }

          body * {
            visibility: hidden !important;
          }

          .print-area,
          .print-area * {
            visibility: visible !important;
          }

          .print-area {
            position: fixed;
            inset: 0;
            margin: var(--page-margin);
            display: flex; /* **UBAH: Gunakan flex untuk satu baris** */
            flex-direction: row; /* **UBAH: Atur tata letak horizontal** */
            justify-content: center; /* Posisikan kartu di tengah */
            align-items: flex-start; /* Posisikan kartu di bagian atas */
            gap: var(--card-gap); /* Jarak antar kartu */
          }

          .kta-card-frame {
            width: var(--card-width-print) !important;
            /* Pastikan kartu tidak mengambil seluruh tinggi kolom flex */
            height: fit-content;
            /* Tambahkan property untuk memastikan setiap kartu tidak terpotong */
            break-inside: avoid;
          }

          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="space-y-6">
        {/* Header (hilang saat print) */}
        {/* ... (rest of the header remains the same) */}
        <div className="pt-2 flex gap-3 no-print">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <IdCard className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground leading-tight">
              Kartu Anggota
            </h1>
            <p className="text-sm text-muted-foreground">
              Tampilan depan dan belakang kartu, siap cetak
            </p>
          </div>
        </div>

        {/* === Area yang dicetak (dua kartu) === */}
        <div
          ref={printRef}
          // Hapus kelas flex-col karena sudah diatur oleh CSS print
          className="print-area flex items-center gap-[var(--card-gap)] md:flex-row flex-col"
        >
          {/* Depan */}
          <div className="kta-card-frame">
            <KTACard memberId={numericId} onClickRoute="/admin/kta" />
          </div>
          {/* Belakang */}
          <div className="kta-card-frame">
            <KTACardBack
              userId={numericId}
              reference={
                typeof backId === "string" && !/^\d+$/.test(backId)
                  ? backId
                  : undefined
              }
            />
          </div>
        </div>

        {/* Tombol Print (hilang saat print) */}
        <div className="no-print">
          <Button className="w-full" onClick={handlePrint} size="lg">
            <PrinterIcon className="mr-2 h-4 w-4" />
            <span> Print / Download PDF</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

// ... (KtaPage fallback and default export remain the same)

export default function KtaPage() {
  return (
    <Suspense fallback={<KtaPageFallback />}>
      <KtaPageContent />
    </Suspense>
  );
}