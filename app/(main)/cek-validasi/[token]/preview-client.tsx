"use client";

import { useMemo } from "react";
import { KTACard } from "@/components/kta-card-admin";
import KTACardBack from "@/components/kta-card-back-admin";
import { useGetAnggotaByIdQuery } from "@/services/admin/anggota.service";
import type { Anggota } from "@/types/admin/anggota";

/** sensor nomor: tampilkan hanya 5 digit terakhir */
function maskMemberNumber(source: string, visible: number = 5): string {
  const s = String(source ?? "");
  const last = s.slice(-visible);
  const masked = "*".repeat(Math.max(0, s.length - visible)) + last;
  return masked;
}

type Props = {
  /** hasil dekripsi dari server (bisa angka sebagai string) */
  memberIdDecrypted: string;
  /** token terenkripsi asli (untuk QR di belakang, biar tetap aman) */
  token: string;
};

export default function CekValidasiClient({ memberIdDecrypted, token }: Props) {
  // id numerik untuk query
  const numericId = useMemo(() => {
    return /^\d+$/.test(memberIdDecrypted)
      ? Number(memberIdDecrypted)
      : undefined;
  }, [memberIdDecrypted]);

  const { data, isFetching } = useGetAnggotaByIdQuery(numericId as number, {
    skip: typeof numericId !== "number",
  });

  // siapkan override: sama seperti data, tapi nomor KTA disensor
  const override:
    | (Partial<Anggota> &
        Partial<
          Record<
            | "kta_number"
            | "member_id"
            | "memberId"
            | "card_number"
            | "reference",
            string
          >
        >)
    | undefined = useMemo(() => {
    if (!data) return undefined;

    // ambil kandidat nomor yang mungkin ada di payload
    const candidates: string[] = [];
    const pushIf = (v: unknown) =>
      typeof v === "string" && v.trim() && candidates.push(v);

    pushIf((data as unknown as Record<string, unknown>)["kta_number"]);
    pushIf((data as unknown as Record<string, unknown>)["member_id"]);
    pushIf((data as unknown as Record<string, unknown>)["memberId"]);
    pushIf((data as unknown as Record<string, unknown>)["card_number"]);
    pushIf((data as unknown as Record<string, unknown>)["reference"]);

    const original = candidates[0] ?? memberIdDecrypted;
    const masked = maskMemberNumber(original, 5);

    return {
      ...(data as Anggota),
      kta_number: masked,
      member_id: masked,
      memberId: masked,
      card_number: masked,
      reference: masked,
    };
  }, [data, memberIdDecrypted]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Validasi Kartu Anggota</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Halaman contoh untuk menampilkan e-KTA. Nomor anggota disensor demi
        keamanan.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Depan: pakai dataOverride agar nomor tersensor */}
        <div className="w-full">
          <KTACard dataOverride={override} />
        </div>

        {/* Belakang: QR mengandung token terenkripsi, bukan nomor asli */}
        <div className="w-full">
          {/* komponen back versi publik (pakai token) */}
          <KTACardBack memberId={token} />
        </div>
      </div>

      {isFetching && (
        <p className="mt-4 text-xs text-muted-foreground">
          Memuat data anggota…
        </p>
      )}
    </div>
  );
}