"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/+$/, "");
const FRONT_SECRET = process.env.NEXT_PUBLIC_KTA_URL_SECRET ?? "";

/* ======= Helpers (browser) ======= */
const te = new TextEncoder();

function b64urlEncode(bytes: Uint8Array): string {
  // Browser
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function deriveKey(secret: string): Promise<CryptoKey> {
  const h = await crypto.subtle.digest("SHA-256", te.encode(secret));
  return crypto.subtle.importKey("raw", h, { name: "AES-GCM" }, false, [
    "encrypt",
  ]);
}

async function encryptToToken(plain: string, secret: string): Promise<string> {
  const key = await deriveKey(secret);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const enc = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    te.encode(plain)
  );
  const ctTag = new Uint8Array(enc as ArrayBuffer);

  const out = new Uint8Array(iv.length + ctTag.length);
  out.set(iv, 0);
  out.set(ctTag, iv.length);

  return b64urlEncode(out);
}
/* ================================= */

type Props = { memberId: string };

export default function KTACardBack({ memberId }: Props) {
  const origin = useMemo(() => {
    if (SITE_URL) return SITE_URL;
    if (typeof window !== "undefined") return window.location.origin;
    return process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  }, []);

  const [qrSrc, setQrSrc] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function build() {
      try {
        if (!FRONT_SECRET) {
          // fallback dev: tanpa enkripsi
          const url = `${origin}/?ref=${encodeURIComponent(memberId)}`;
          const img = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
            url
          )}`;
          if (!cancelled) setQrSrc(img);
          return;
        }
        const token = await encryptToToken(memberId, FRONT_SECRET);
        const url = `${origin}/cek-validasi/${token}`;
        const img = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
          url
        )}`;
        if (!cancelled) setQrSrc(img);
      } catch {
        // fallback terakhir
        const url = `${origin}/?ref=${encodeURIComponent(memberId)}`;
        const img = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
          url
        )}`;
        if (!cancelled) setQrSrc(img);
      }
    }

    build();
    return () => {
      cancelled = true;
    };
  }, [memberId, origin]);

  return (
    <div
      className="w-full h-full rounded-xl shadow-xl overflow-hidden p-6 space-y-4"
      style={{
        background:
          "linear-gradient(145deg, var(--secondary) 0%, var(--primary) 95%)",
      }}
    >
      <div className="h-full flex text-white">
        {/* Terms */}
        <div className="w-2/3 pr-3 overflow-hidden">
          <h3 className="font-semibold mb-2">Ketentuan Keanggotaan</h3>
          <ul className="text-xs leading-snug list-disc pl-5 opacity-90 space-y-1">
            <li>Anggota wajib menjaga kerahasiaan data Digital KTA.</li>
            <li>Kartu hanya digunakan untuk keperluan resmi Digital KTA.</li>
            <li>Segera laporkan kehilangan atau penyalahgunaan ke admin.</li>
            <li>Hak dan kewajiban anggota mengikuti ketentuan Digital KTA.</li>
          </ul>
        </div>

        {/* QR */}
        <div className="w-1/3 flex items-center justify-center">
          <div className="bg-white p-2 rounded-md">
            {qrSrc ? (
              <Image src={qrSrc} alt="QR KTA" width={220} height={220} />
            ) : (
              <div className="w-[220px] h-[220px] bg-white/60 animate-pulse rounded" />
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-white/20">
        <span className="text-xs opacity-85" />
        <span className="font-bold text-base italic text-white">🇮🇩 e-KTA</span>
      </div>
    </div>
  );
}