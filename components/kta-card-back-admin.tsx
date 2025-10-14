"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Props = { memberId: string };

/* ===== Helpers ===== */
function encodeUtf8(s: string): Uint8Array {
  return new TextEncoder().encode(s);
}
function toBase64Url(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  const b64 = btoa(bin);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
/** Salin Uint8Array -> ArrayBuffer (bukan ArrayBufferLike) */
function toArrayBuffer(view: Uint8Array): ArrayBuffer {
  const ab = new ArrayBuffer(view.byteLength);
  new Uint8Array(ab).set(view);
  return ab;
}
/** sha256(secret) -> ArrayBuffer 32B */
async function sha256ArrayBuffer(text: string): Promise<ArrayBuffer> {
  const src = toArrayBuffer(encodeUtf8(text));
  return crypto.subtle.digest("SHA-256", src);
}
async function importAesKey(secret: string): Promise<CryptoKey> {
  const keyAB = await sha256ArrayBuffer(secret); // 32 bytes
  return crypto.subtle.importKey("raw", keyAB, { name: "AES-GCM" }, false, [
    "encrypt",
  ]);
}
/** Encrypt -> token base64url(IV|TAG|CT) */
async function encryptToToken(plain: string, secret: string): Promise<string> {
  const key = await importAesKey(secret);
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // ⬇️ kirim ArrayBuffer murni ke WebCrypto
  const dataAB = toArrayBuffer(encodeUtf8(plain));
  const resultAB = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv, tagLength: 128 },
    key,
    dataAB
  );

  const result = new Uint8Array(resultAB); // CT||TAG
  const tag = result.slice(-16);
  const ct = result.slice(0, -16);

  const out = new Uint8Array(iv.length + tag.length + ct.length);
  out.set(iv, 0);
  out.set(tag, iv.length);
  out.set(ct, iv.length + tag.length);

  return toBase64Url(out);
}
/* ==================== */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";
const FRONT_SECRET = process.env.NEXT_PUBLIC_KTA_URL_SECRET ?? "";

export default function KTACardBack({ memberId }: Props) {
  const [qrSrc, setQrSrc] = useState<string>("");

  const baseUrl = useMemo(() => {
    if (SITE_URL) return SITE_URL.replace(/\/+$/, "");
    if (typeof window !== "undefined") return window.location.origin;
    return "";
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function buildQr() {
      try {
        if (!FRONT_SECRET) {
          const url = `${baseUrl}/?ref=${encodeURIComponent(memberId)}`;
          const src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
            url
          )}`;
          if (!cancelled) setQrSrc(src);
          return;
        }

        const token = await encryptToToken(memberId, FRONT_SECRET);
        const url = `${baseUrl}/cek-validasi/${encodeURIComponent(token)}`;
        const src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
          url
        )}`;
        if (!cancelled) setQrSrc(src);
      } catch {
        const url = `${baseUrl}/?ref=${encodeURIComponent(memberId)}`;
        const src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
          url
        )}`;
        if (!cancelled) setQrSrc(src);
      }
    }

    buildQr();
    return () => {
      cancelled = true;
    };
  }, [memberId, baseUrl]);

  return (
    <div>
      <div
        className="w-full h-full rounded-xl shadow-xl overflow-hidden p-6 space-y-4"
        style={{
          background:
            "linear-gradient(145deg, var(--secondary) 0%, var(--primary) 95%)",
        }}
      >
        <div className="h-full flex text-white">
          {/* Left: terms */}
          <div className="w-2/3 pr-3 overflow-hidden">
            <h3 className="font-semibold mb-2">Ketentuan Keanggotaan</h3>
            <ul className="text-xs leading-snug list-disc pl-5 opacity-90 space-y-1">
              <li>Anggota wajib menjaga kerahasiaan data Digital KTA.</li>
              <li>Kartu hanya digunakan untuk keperluan resmi Digital KTA.</li>
              <li>Segera laporkan kehilangan atau penyalahgunaan ke admin.</li>
              <li>
                Hak dan kewajiban anggota mengikuti ketentuan Digital KTA.
              </li>
            </ul>
          </div>

          {/* Right: QR */}
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
          <span className="font-bold text-base italic text-white">
            🇮🇩 e-KTA
          </span>
        </div>
      </div>
    </div>
  );
}