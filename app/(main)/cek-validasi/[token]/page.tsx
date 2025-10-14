import { decryptToken } from "@/lib/kta-crypto";
import CekValidasiClient from "./preview-client";

type PageProps = { params: { token: string } };

export default async function Page({ params }: PageProps) {
  const res = decryptToken(params.token);

  if (!res.ok) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-semibold">Token tidak valid</h1>
          <p className="text-sm text-muted-foreground">
            Pastikan URL yang Anda buka benar atau belum kadaluarsa.
          </p>
        </div>
      </div>
    );
  }

  // id hasil dekripsi dipassing ke client untuk fetch data
  return <CekValidasiClient memberIdDecrypted={res.id} token={params.token} />;
}