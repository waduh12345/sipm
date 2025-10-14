"use client";

import { PrinterIcon, IdCard } from "lucide-react";
import { useRef, useMemo, Suspense } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { KTACard } from "@/components/kta-card-admin";
import KTACardBack from "@/components/kta-card-back-admin";
import { Button } from "@/components/ui/button";

/** Skeleton ringan saat menunggu router params/searchParams siap */
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

/** Komponen yang MEMAKAI useSearchParams / useParams */
function KtaPageContent() {
  const searchParams = useSearchParams();
  const params = useParams();

  // Ambil id dari path /admin/kta/[id] ATAU dari query ?id=...
  const rawId =
    (params?.id as string | undefined) ?? searchParams?.get("id") ?? undefined;

  // Untuk KTACard (frontend): butuh ID numerik untuk fetch detail
  const numericId = useMemo(() => {
    if (!rawId) return undefined;
    return /^\d+$/.test(rawId) ? Number(rawId) : undefined;
  }, [rawId]);

  // Untuk KTACardBack (backend): boleh pakai string nomor KTA atau id
  const backId = rawId ?? "KTA-001234"; // fallback demo

  const printRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Global print styles */}
      <style jsx global>{`
        .kta-card-frame {
          width: 360px;
        }
        @media (min-width: 640px) {
          .kta-card-frame {
            width: 420px;
          }
        }
        @media print {
          @page {
            size: A4;
            margin: 12mm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
          .print-area {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          .print-area > * {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          .kta-card-frame {
            width: 85.6mm;
          } /* ukuran CR80 */
        }
      `}</style>

      <div className="space-y-6">
        {/* Header */}
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

        {/* Area yang dicetak */}
        <div ref={printRef} className="space-y-6 print-area">
          {/* Depan */}
          <div className="flex items-center justify-center">
            <div className="kta-card-frame">
              <KTACard memberId={numericId} onClickRoute="/admin/kta/[id]" />
            </div>
          </div>
          {/* Belakang */}
          <div className="flex items-center justify-center">
            <div className="kta-card-frame">
              <KTACardBack memberId={backId} />
            </div>
          </div>
        </div>

        {/* Tombol Print */}
        <div>
          <Button className="w-full no-print" onClick={handlePrint} size="lg">
            <PrinterIcon />
            <span> Print / Download PDF</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function KtaPage() {
  return (
    <Suspense fallback={<KtaPageFallback />}>
      <KtaPageContent />
    </Suspense>
  );
}