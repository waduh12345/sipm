"use client";

import { PrinterIcon, IdCard } from "lucide-react";
import { useRef, useMemo } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { KTACard } from "@/components/kta-card-admin";
import KTACardBack from "@/components/kta-card-back-admin";
import { Button } from "@/components/ui/button";

export default function KtaPage() {
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
        /* Samain lebar kartu depan & belakang */
        .kta-card-frame {
          width: 360px; /* lebar di layar */
        }
        @media (min-width: 640px) {
          .kta-card-frame {
            width: 420px; /* sedikit lebih besar di layar lebar */
          }
        }

        /* Print-safe */
        @media print {
          @page {
            size: A4; /* bisa ganti ke 'A4 portrait/landscape' sesuai kebutuhan */
            margin: 12mm; /* spasi aman biar tidak terpotong */
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
            width: 85.6mm; /* ukuran CR80 (kartu ID) */
          }
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
              {/* Kirim ID numerik ke KTACard agar data terisi dari ID */}
              <KTACard memberId={numericId} onClickRoute="/admin/kta/[id]" />
            </div>
          </div>

          {/* Belakang */}
          <div className="flex items-center justify-center">
            <div className="kta-card-frame">
              {/* Belakang kartu boleh pakai nomor KTA (string) */}
              <KTACardBack memberId={backId} />
            </div>
          </div>
        </div>

        {/* Tombol Print */}
        <div>
          <Button
            className="w-full no-print"
            onClick={handlePrint}
            size="lg"
            variant="default"
          >
            <PrinterIcon />
            <span> Print / Download PDF</span>
          </Button>
        </div>
      </div>
    </div>
  );
}