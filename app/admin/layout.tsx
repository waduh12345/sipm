"use client";
import React, { useState, useEffect } from "react";
import {
  User,
  GraduationCap,
  Phone,
  ImageIcon,
  HelpCircle,
  BookText,
  HomeIcon,
} from "lucide-react";
import Header from "@/components/admin-components/header";
import Sidebar from "@/components/admin-components/sidebar";
import { AdminLayoutProps, MenuItem } from "@/types";

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems: MenuItem[] = [
    {
      id: "home",
      label: "Home",
      icon: <HomeIcon className="h-5 w-5" />,
      href: "/admin/home",
      children: [
        { id: "hero", label: "Hero", href: "/admin/home/hero" },
        { id: "tentang", label: "Expertise", href: "/admin/home/tentang" },
        { id: "cta", label: "CTA", href: "/admin/home/cta" },
      ],
    },
    {
      id: "profile",
      label: "About Us",
      icon: <User className="h-5 w-5" />,
      href: "/admin/profile/breadcrumb",
      children: [
        {
          id: "breadcrumb",
          label: "Breadcrumb",
          href: "/admin/profile/breadcrumb",
        },
        { id: "tentang", label: "Tentang", href: "/admin/profile/tentang" },
        { id: "mengapa", label: "Mengapa", href: "/admin/profile/mengapa" },
        {
          id: "tenaga-pendidik-informasi",
          label: "Tenaga Pendidik Informasi",
          href: "/admin/profile/tenaga-pendidik-informasi",
        },
        {
          id: "tenaga-pendidik-konten",
          label: "Tenaga Pendidik Konten",
          href: "/admin/profile/tenaga-pendidik-konten",
        },
        {
          id: "alumni-informasi",
          label: "Alumni Informasi",
          href: "/admin/profile/alumni-informasi",
        },
        {
          id: "alumni-konten",
          label: "Alumni Konten",
          href: "/admin/profile/alumni-konten",
        },
      ],
    },
    {
      id: "faq",
      label: "Practiise Areas",
      icon: <HelpCircle className="h-5 w-5" />,
      href: "/admin/faq/breadcrumb",
      children: [
        {
          id: "breadcrumb",
          label: "Breadcrumb",
          href: "/admin/faq/breadcrumb",
        },
        { id: "kategori", label: "Kategori", href: "/admin/faq/kategori" },
        { id: "konten", label: "Konten", href: "/admin/faq/konten" },
      ],
    },
    {
      id: "faq",
      label: "Client",
      icon: <GraduationCap className="h-5 w-5" />,
      href: "/admin/faq/breadcrumb",
      children: [
        {
          id: "breadcrumb",
          label: "Breadcrumb",
          href: "/admin/faq/breadcrumb",
        },
        { id: "kategori", label: "Kategori", href: "/admin/faq/kategori" },
        { id: "konten", label: "Konten", href: "/admin/faq/konten" },
      ],
    },
    {
      id: "berita",
      label: "Artcile",
      icon: <BookText className="h-5 w-5" />,
      href: "/admin/berita/breadcrumb",
      children: [
        {
          id: "breadcrumb",
          label: "Breadcrumb",
          href: "/admin/berita/breadcrumb",
        },
        { id: "kategori", label: "Kategori", href: "/admin/berita/kategori" },
        { id: "konten", label: "Konten", href: "/admin/berita/konten" },
      ],
    },
    {
      id: "hubungi-kami",
      label: "Contact Us",
      icon: <Phone className="h-5 w-5" />,
      href: "/admin/hubungi-kami/breadcrumb",
      children: [
        {
          id: "breadcrumb",
          label: "Breadcrumb",
          href: "/admin/hubungi-kami/breadcrumb",
        },
        {
          id: "information",
          label: "Information",
          href: "/admin/hubungi-kami/information",
        },
      ],
    },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        menuItems={menuItems}
      />

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} title={title} />

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
