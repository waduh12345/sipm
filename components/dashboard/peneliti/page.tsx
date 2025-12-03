"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  Calendar,
  BookOpen,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Registrasi Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// ===== Tipe Data Mock =====
type RoleType = "admin" | "peneliti" | "reviewer";

// ===== Data Dummy Peneliti =====
const PENELITI_DATA = {
  lastProposal: {
    judul: "Pengembangan AI untuk Deteksi Hama Padi",
    skema: "Penelitian Terapan",
    status: "Revisi Mayor",
    tanggalPengajuan: "2023-08-15",
  },
  kewajiban: [
    { jenis: "Laporan Kemajuan", deadline: "2023-11-30", status: "Pending" },
    { jenis: "Logbook Bulan Oktober", deadline: "2023-11-10", status: "Selesai" },
  ],
  jadwalTerdekat: {
    kegiatan: "Pembukaan Hibah Internal Batch 2",
    tanggal: "2023-12-01",
  }
};

export default function DashboardSippmPage() {
  // State untuk simulasi Role (Nanti diganti dengan session auth)
  const [role, setRole] = useState<RoleType>("admin");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50/50">
      {/* Header & Role Switcher (Untuk Demo) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard SIPPM</h1>
          <p className="text-sm text-gray-500 mt-1">
            Sistem Informasi Penelitian & Pengabdian Masyarakat
          </p>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Render View Berdasarkan Role */}
      {role === "peneliti" && <ResearcherDashboardView />}
    </div>
  );
}

// ============================================================================
// 2. VIEW PENELITI
// ============================================================================
function ResearcherDashboardView() {
  const statusColor = 
    PENELITI_DATA.lastProposal.status === "Diterima" ? "text-green-600 bg-green-100" :
    PENELITI_DATA.lastProposal.status === "Ditolak" ? "text-red-600 bg-red-100" :
    "text-yellow-600 bg-yellow-100"; // Revisi

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Status Proposal Terakhir */}
        <Card className="lg:col-span-2 border-t-4 border-t-blue-600">
          <CardHeader>
            <CardTitle>Status Proposal Terakhir</CardTitle>
            <CardDescription>Informasi usulan yang paling baru diajukan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{PENELITI_DATA.lastProposal.judul}</h3>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <BookOpen className="h-4 w-4" />
                  <span>{PENELITI_DATA.lastProposal.skema}</span>
                  <span className="mx-1">•</span>
                  <Calendar className="h-4 w-4" />
                  <span>Diajukan: {PENELITI_DATA.lastProposal.tanggalPengajuan}</span>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-lg font-bold ${statusColor}`}>
                {PENELITI_DATA.lastProposal.status}
              </div>
            </div>
            
            {/* Timeline Progress Mockup */}
            <div className="mt-8 relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded"></div>
              <div className="relative flex justify-between text-xs md:text-sm">
                <TimelinePoint label="Diajukan" active />
                <TimelinePoint label="Seleksi Admin" active />
                <TimelinePoint label="Review" active />
                <TimelinePoint label="Revisi" current />
                <TimelinePoint label="Pengumuman" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jadwal & Kewajiban */}
        <div className="space-y-6">
          {/* Jadwal Terdekat */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-blue-700">
                <Calendar className="h-5 w-5" />
                <CardTitle className="text-base">Jadwal Terdekat</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-gray-800">{PENELITI_DATA.jadwalTerdekat.kegiatan}</p>
              <p className="text-sm text-gray-600 mt-1">Tanggal: {PENELITI_DATA.jadwalTerdekat.tanggal}</p>
            </CardContent>
          </Card>

          {/* Kewajiban Laporan */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <CardTitle className="text-base">Kewajiban Laporan</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {PENELITI_DATA.kewajiban.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium">{item.jenis}</p>
                    <p className="text-xs text-gray-500">Deadline: {item.deadline}</p>
                  </div>
                  <Badge variant={item.status === "Pending" ? "destructive" : "default"}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Riwayat Penelitian Singkat */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Penelitian</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Tahun</th>
                  <th className="px-6 py-3">Judul Penelitian</th>
                  <th className="px-6 py-3">Peran</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">2022</td>
                  <td className="px-6 py-4">Implementasi IoT pada Smart Farming</td>
                  <td className="px-6 py-4">Ketua</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">Selesai</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">2021</td>
                  <td className="px-6 py-4">Analisis Big Data E-Commerce</td>
                  <td className="px-6 py-4">Anggota</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">Selesai</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TimelinePoint({ label, active, current }: { label: string, active?: boolean, current?: boolean }) {
  let circleClass = "bg-gray-200 border-gray-300";
  let textClass = "text-gray-400";

  if (active) {
    circleClass = "bg-blue-600 border-blue-600";
    textClass = "text-blue-700 font-medium";
  } else if (current) {
    circleClass = "bg-yellow-400 border-yellow-500 ring-4 ring-yellow-100";
    textClass = "text-yellow-700 font-bold";
  }

  return (
    <div className="flex flex-col items-center z-10">
      <div className={`w-4 h-4 rounded-full border-2 ${circleClass} transition-all`}></div>
      <span className={`mt-2 text-[10px] md:text-xs ${textClass}`}>{label}</span>
    </div>
  );
}