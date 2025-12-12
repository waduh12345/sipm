// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

// 1. IMPORT Provider yang sudah Anda buat
// Pastikan path-nya benar (sesuaikan jika folder context ada di src atau root)
import { LanguageProvider } from "@/contexts/LanguageContext"; 
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jon Bernard & Associates",
  description: "Jon Bernard & Associates Partner Hukum Terpercaya Anda. Firma hukum yang berdiri untuk melindungi kepentingan Anda dengan ketegasan, dedikasi dan strategi yang terukur.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. BUNGKUS seluruh konten (children) dengan LanguageProvider */}
        <LanguageProvider>
          
          {/* Header bisa masuk sini atau di dalam page, tapi harus di dalam Provider */}
          {/* Jika SiteHeader ada di sini, dia aman karena sudah di dalam Provider */}
          {children}

        </LanguageProvider>
      </body>
    </html>
  );
}