"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Share2, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetTugasByIdQuery } from "@/services/admin/tugas.service";
import { skipToken } from "@reduxjs/toolkit/query";

/* helpers */
const formatDate = (iso: string): string => {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
};

const renderContent = (content: string) =>
  content.split("\n\n").map((p, i) => (
    <div key={i} className="mb-4 last:mb-0">
      {p.split("\n").map((line, j) => (
        <p
          key={j}
          className="text-base text-foreground leading-relaxed text-pretty"
        >
          <span dangerouslySetInnerHTML={{ __html: line }} />
        </p>
      ))}
    </div>
  ));

export default function TugasDetailPage() {
  const { id } = useParams<{ id: string }>();

  // parse to number; undefined if invalid
  const numericId = (() => {
    const raw = Array.isArray(id) ? id[0] : id;
    const n = Number(raw);
    return Number.isFinite(n) ? n : undefined;
  })();

  // ALWAYS call the hook; skip when id invalid/absent
  const {
    data: announcement,
    isLoading,
    isError,
  } = useGetTugasByIdQuery(numericId ?? skipToken);

  // Invalid URL (after hook call -> OK for rules-of-hooks)
  if (!numericId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <XCircle className="w-12 h-12 text-destructive" />
        <h1 className="text-xl font-bold mt-4">URL tidak valid</h1>
        <p className="mt-2 text-muted-foreground text-center">
          Parameter <code>[id]</code> harus berupa angka.
        </p>
        <Button asChild className="mt-6">
          <Link href="/task">Kembali ke Daftar Tugas</Link>
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="mt-2 text-muted-foreground">
          Memuat detail task...
        </p>
      </div>
    );
  }

  if (isError || !announcement) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <XCircle className="w-12 h-12 text-destructive" />
        <h1 className="text-xl font-bold mt-4">Tugas Tidak Ditemukan</h1>
        <p className="mt-2 text-muted-foreground text-center">
          {isError
            ? "Terjadi kesalahan saat mengambil data."
            : `Tugas dengan ID "${numericId}" tidak ada.`}
        </p>
        <Button asChild className="mt-6">
          <Link href="/task">Kembali ke Daftar Tugas</Link>
        </Button>
      </div>
    );
  }

  const formattedDate = announcement.start_date ? formatDate(announcement.start_date) : "";

  return (
    <div className="min-h-screen bg-background">

      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6 pb-8">
        <Card>
          <CardContent className="p-4">
            <h1 className="text-xl text-black">{announcement.name}</h1>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    void navigator.clipboard.writeText(window.location.href);
                  }
                }}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Bagikan
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="prose prose-sm max-w-none">
              {renderContent(announcement.description)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}