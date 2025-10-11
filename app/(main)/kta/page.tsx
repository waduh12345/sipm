"use client";

import { PrinterIcon } from "lucide-react";
import { useRef } from "react";
import { KTACard } from "@/components/kta-card";
import KTACardBack from "@/components/kta-card-back";
import { Button } from "@/components/ui/button";

export default function KtaPage() {
  const memberId = "KTA-001234";
  const printRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="space-y-6">
        <div className="space-y-2 no-print">
          <div>
            <h1 className="text-2xl font-semibold">Kartu Anggota</h1>
            <p className="text-sm text-muted-foreground">
              Tampilan depan dan belakang kartu, siap cetak
            </p>
          </div>
        </div>

        <div ref={printRef} className="space-y-6">
          <div className="flex items-center justify-center">
            <KTACard />
          </div>
          <div className="flex items-center justify-center">
            <KTACardBack memberId={memberId} />
          </div>
        </div>

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
