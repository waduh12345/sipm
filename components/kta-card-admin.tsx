"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import type { Anggota } from "@/types/admin/anggota";
import { useGetCurrentUserQuery } from "@/services/auth.service";
import { useGetAnggotaByIdQuery } from "@/services/admin/anggota.service";
import { skipToken } from "@reduxjs/toolkit/query";

// ---- Helpers ---------------------------------------------------------------
function fmtDate(value?: string | null): string | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value ?? undefined;
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

type KtaMemberView = {
  memberId?: string;
  memberName?: string;
  placeOfBirth?: string;
  dateOfBirth?: string;
  address?: string;
  kelurahan?: string;
  kecamatan?: string;
  province?: string;
  memberSince?: string;
};

function pickString(...candidates: Array<unknown>): string | undefined {
  for (const c of candidates) {
    if (typeof c === "string" && c.trim().length > 0) return c;
    if (typeof c === "number") return String(c);
  }
  return undefined;
}
function pickNamed(obj: Record<string, unknown> | undefined, key: string) {
  if (!obj) return undefined;
  const v = obj[key];
  return typeof v === "string" ? v : undefined;
}

// Build route with id: support "/admin/kta/[id]" or append "?id=..."
function buildRouteWithId(route: string, id?: number | string) {
  if (!id) return route;
  if (route.includes("[id]")) return route.replace("[id]", String(id));
  // append query param id, keeping existing query/hash
  const [pathAndQuery, hash = ""] = route.split("#");
  const joiner = pathAndQuery.includes("?") ? "&" : "?";
  const finalPath = `${pathAndQuery}${joiner}id=${encodeURIComponent(
    String(id)
  )}`;
  return hash ? `${finalPath}#${hash}` : finalPath;
}

// ---- Props ----------------------------------------------------------------
type KTACardProps = {
  /** Jika tidak diisi, component akan coba ambil dari session (user login) */
  memberId?: number | string;
  /** Route tujuan saat card di-click (default: "/admin/kta") */
  onClickRoute?: string;
  /** Override data (kalau sudah punya object-nya) — opsional */
  dataOverride?: Partial<Anggota>;
};

// ---- Component -------------------------------------------------------------
export function KTACard({
  memberId,
  onClickRoute = "/admin/kta",
  dataOverride,
}: KTACardProps) {
  const router = useRouter();

  // 1) Kalau memberId tidak ada, ambil dari user yang login
  const meShouldSkip = Boolean(memberId || dataOverride);
  const { data: meData } = useGetCurrentUserQuery(
    meShouldSkip ? skipToken : undefined
  );

  // Cari "anggota id" dari response meData secara defensif
  const meRaw = (meData ?? {}) as Record<string, unknown>;
  const meAnggotaId =
    typeof meRaw["anggota_id"] === "number" ||
    typeof meRaw["anggota_id"] === "string"
      ? (meRaw["anggota_id"] as number | string)
      : typeof meRaw["anggota"] === "object" && meRaw["anggota"] !== null
      ? (() => {
          const a = meRaw["anggota"] as Record<string, unknown>;
          return typeof a["id"] === "number" || typeof a["id"] === "string"
            ? (a["id"] as number | string)
            : undefined;
        })()
      : undefined;

  const resolvedId = memberId ?? meAnggotaId;

  // Ubah ke number (sesuai tipe service) atau undefined bila tidak valid
  const anggotaId: number | undefined =
    typeof resolvedId === "number"
      ? resolvedId
      : typeof resolvedId === "string" && /^\d+$/.test(resolvedId)
      ? Number(resolvedId)
      : undefined;

  const shouldSkip = !anggotaId || Boolean(dataOverride);

  // 2) Ambil detail anggota bila ada id (kecuali kita sudah diberi dataOverride)
  const { data: anggotaData, isLoading } = useGetAnggotaByIdQuery(
    shouldSkip ? skipToken : anggotaId
  );

  // 3) Tentukan sumber data akhir
  const raw: Record<string, unknown> | undefined = useMemo(() => {
    if (dataOverride && Object.keys(dataOverride).length > 0) {
      return dataOverride as unknown as Record<string, unknown>;
    }
    if (anggotaData) return anggotaData as unknown as Record<string, unknown>;
    return undefined;
  }, [anggotaData, dataOverride]);

  // 3b) Fallback id dari payload jika ada
  const rawId: number | undefined =
    typeof raw?.["id"] === "number"
      ? (raw["id"] as number)
      : typeof raw?.["id"] === "string" && /^\d+$/.test(raw["id"] as string)
      ? Number(raw?.["id"] as string)
      : undefined;
  const idToSend = anggotaId ?? rawId;

  // 4) Bentuk view model kartu KTA
  const view: KtaMemberView = useMemo(() => {
    const idStr = pickString(
      raw?.["member_id"],
      raw?.["memberId"],
      raw?.["kta_number"],
      raw?.["card_number"],
      raw?.["reference"],
      raw?.["ref_number"] && `KTA-${raw?.["ref_number"] as number}`
    );
    const nameStr = pickString(
      raw?.["name"],
      raw?.["member_name"],
      meRaw["name"]
    );
    const pob = pickString(raw?.["birth_place"], raw?.["place_of_birth"]);
    const dob = pickString(raw?.["birth_date"], raw?.["date_of_birth"]);
    const addr = pickString(raw?.["address"], raw?.["alamat"]);

    const provinceName =
      pickString(
        pickNamed(raw, "province_name"),
        pickNamed(
          raw?.["province"] as Record<string, unknown> | undefined,
          "name"
        )
      ) ?? undefined;
    const regencyName =
      pickString(
        pickNamed(raw, "regency_name"),
        pickNamed(
          raw?.["regency"] as Record<string, unknown> | undefined,
          "name"
        )
      ) ?? undefined;
    const districtName =
      pickString(
        pickNamed(raw, "district_name"),
        pickNamed(
          raw?.["district"] as Record<string, unknown> | undefined,
          "name"
        )
      ) ?? undefined;
    const villageName =
      pickString(
        pickNamed(raw, "village_name"),
        pickNamed(
          raw?.["village"] as Record<string, unknown> | undefined,
          "name"
        )
      ) ?? undefined;

    const since = pickString(raw?.["member_since"], raw?.["created_at"]);

    return {
      memberId: idStr,
      memberName: nameStr,
      placeOfBirth: pob,
      dateOfBirth: fmtDate(dob),
      address: addr,
      kelurahan: villageName,
      kecamatan: districtName,
      province: provinceName ?? regencyName,
      memberSince: fmtDate(since),
    };
  }, [raw, meRaw]);

  // 5) Loading skeleton
  if (!raw && isLoading) {
    return (
      <Card className="relative w-full overflow-hidden rounded-xl shadow-xl border-0 text-[13px] p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-5 w-40 bg-gray-200 dark:bg-zinc-700 rounded" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded" />
            <div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded" />
            <div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded" />
            <div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded" />
            <div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded" />
            <div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded" />
          </div>
        </div>
      </Card>
    );
  }

  const empty = !raw || !view.memberName;

  return (
    <Card
      onClick={() => router.push(buildRouteWithId(onClickRoute, idToSend))}
      role="button"
      aria-label="Buka Kartu Anggota"
      className="relative w-full overflow-hidden rounded-xl shadow-xl border-0 text-[13px] p-6 cursor-pointer"
      style={{
        background:
          "linear-gradient(145deg, var(--primary) 0%, var(--secondary) 95%)",
        color: "var(--primary-foreground)",
      }}
    >
      {/* Decorative accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-white/10 rounded-full" />
      </div>

      <div className="relative flex flex-col justify-between space-y-4 text-white">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium opacity-90 tracking-widest">
              KARTU TANDA ANGGOTA
            </p>
          </div>
          <div className="w-10 h-7 bg-yellow-300 rounded-md relative shadow-inner">
            <div className="absolute inset-1 border border-yellow-600 rounded-md" />
            <div className="absolute inset-x-2 top-1/2 h-[1px] bg-yellow-600 opacity-60" />
          </div>
        </div>

        {/* Content */}
        {empty ? (
          <div className="py-4">
            <p className="text-sm opacity-90">Data anggota belum tersedia.</p>
            <p className="text-xs opacity-80">Klik untuk melengkapi data.</p>
          </div>
        ) : (
          <div className="grid grid-cols-[auto_1fr] gap-x-10 sm:gap-x-14 gap-y-1">
            <span className="opacity-90">No. Anggota</span>
            <span className="font-semibold ">{view.memberId ?? "-"}</span>

            <span className="opacity-90">Nama</span>
            <span className="font-semibold ">{view.memberName ?? "-"}</span>

            <span className="opacity-90">Tempat/Tgl Lahir</span>
            <span className="">
              {view.placeOfBirth ?? "-"}
              {view.dateOfBirth ? `, ${view.dateOfBirth}` : ""}
            </span>

            <span className="opacity-90">Alamat</span>
            <span className="leading-snug">{view.address ?? "-"}</span>

            <span className="opacity-90">Kelurahan</span>
            <span className="">{view.kelurahan ?? "-"}</span>

            <span className="opacity-90">Kecamatan</span>
            <span className="">{view.kecamatan ?? "-"}</span>

            <span className="opacity-90">Provinsi</span>
            <span className="">{view.province ?? "-"}</span>
          </div>
        )}

        {/* Footer branding */}
        <div className="flex justify-between items-center pt-2 border-t border-white/20">
          <span className="text-xs opacity-85">
            {view.memberSince ? `Anggota sejak ${view.memberSince}` : ""}
          </span>
          <span className="font-bold text-base italic text-white">
            🇮🇩 e-KTA
          </span>
        </div>
      </div>
    </Card>
  );
}

export default KTACard;