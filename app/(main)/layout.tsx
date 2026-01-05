'use client';
import { Inter } from "next/font/google";
import "../globals.css";

import { LanguageProvider } from "@/contexts/LanguageContext";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("mode") === "edit") {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href =
          "/v1/customize/login?callbackUrl=" +
          encodeURIComponent(window.location.href);
      }
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <LanguageProvider>
          {/* Header bisa masuk sini atau di dalam page, tapi harus di dalam Provider */}
          {/* Jika SiteHeader ada di sini, dia aman karena sudah di dalam Provider */}
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}