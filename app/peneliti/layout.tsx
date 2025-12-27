"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FileBarChart,
  UserCircle,
  Upload,
  ClipboardList
} from "lucide-react";
import Header from "@/components/admin-components/header";
import Sidebar from "@/components/admin-components/sidebar";
import { MenuItem } from "@/types";
import { useSession } from "next-auth/react";
import type { User } from "@/types/user";
import ClientAuthGuard from "@/components/client-guards";

// Fungsi untuk mendapatkan judul berdasarkan path aktif
const getPageTitle = (menuItems: MenuItem[], pathname: string): string => {
  for (const item of menuItems) {
    if (item.href === pathname) return item.label;
    if (item.children) {
      const childMatch = item.children.find((c) => c.href === pathname);
      if (childMatch) return childMatch.label;
    }
  }
  return "Sistem Informasi PPM"; // Default title
};

// Hapus AdminLayoutProps, gunakan standar layout props Next.js
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user as User | undefined;
  const pathname = usePathname();
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // =================================================================
  // 2. MENU PENELITI (DOSEN)
  // =================================================================
  const penelitiMenuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/peneliti/dashboard",
    },
    {
      id: "profil",
      label: "Profil Peneliti",
      icon: <UserCircle className="h-5 w-5" />,
      href: "/peneliti/profil",
    },
    {
      id: "usulan",
      label: "Data Usulan",
      icon: <FileText className="h-5 w-5" />,
      href: "#",
      children: [
        {
          id: "usulan/baru",
          label: "Pengajuan Baru",
          icon: <Upload className="h-4 w-4" />,
          href: "/peneliti/usulan/baru",
        },
        {
          id: "usulan/riwayat",
          label: "Riwayat Usulan",
          icon: <ClipboardList className="h-4 w-4" />,
          href: "/peneliti/usulan/riwayat",
        },
      ]
    },
    {
      id: "laporan",
      label: "Laporan Kegiatan",
      icon: <FileBarChart className="h-5 w-5" />,
      href: "#",
      children: [
        {
          id: "laporan/kemajuan",
          label: "Laporan Kemajuan",
          icon: <FileText className="h-4 w-4" />,
          href: "/peneliti/laporan/kemajuan",
        },
        {
          id: "laporan/akhir",
          label: "Laporan Akhir",
          icon: <FileText className="h-4 w-4" />,
          href: "/peneliti/laporan/akhir",
        },
      ]
    },
  ];


  // ✅ LOGIKA PENENTUAN MENU BERDASARKAN ROLE
  let menuItems: MenuItem[] = [];
  
  if (user) {
    menuItems = penelitiMenuItems;
  }

  // Tentukan judul header secara dinamis
  const dynamicTitle = getPageTitle(menuItems, pathname);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        menuItems={menuItems}
      />

      {/* Konten Utama */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Header dengan Dynamic Title */}
        <Header onMenuClick={() => setSidebarOpen(true)} title={dynamicTitle} />

        {/* Konten Halaman */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-2">
            <div className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-2">
              <ClientAuthGuard
                excludedRoutes={["/auth", "/auth/login", "/public", "/"]}
                excludedFetchPrefixes={["/api/auth/", "/auth/"]}
                loginPath="/auth/login"
              />
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};