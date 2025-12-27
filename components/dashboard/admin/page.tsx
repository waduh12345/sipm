"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  AlertCircle,
  Clock,
  DollarSign,
  TrendingUp,
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
  ChartData,
  ChartOptions
} from "chart.js";
import { Line } from "react-chartjs-2";

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

// ===== Data Dummy Admin =====
const ADMIN_STATS = {
  proposalMasuk: 145,
  proposalDidanai: 42,
  proposalDitolak: 20,
  belumLapor: 15, // Laporan kemajuan/akhir yang telat
};

const BUDGET_DATA = {
  labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
  rencana: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200],
  realisasi: [80, 150, 280, 350, 480, 550, 680, 720, 850, 0, 0, 0], // Data sampai Sep
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
      {role === "admin" && <AdminDashboardView />}
    </div>
  );
}

// ============================================================================
// 1. VIEW ADMIN
// ============================================================================
function AdminDashboardView() {
  // Config Chart Serapan Anggaran
  const budgetChartData: ChartData<"line"> = {
    labels: BUDGET_DATA.labels,
    datasets: [
      {
        label: "Rencana Anggaran (Kumulatif)",
        data: BUDGET_DATA.rencana,
        borderColor: "#94a3b8", // Slate 400
        borderDash: [5, 5],
        tension: 0.4,
        fill: false,
      },
      {
        label: "Realisasi Serapan",
        data: BUDGET_DATA.realisasi,
        borderColor: "#2563eb", // Blue 600
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        tension: 0.4,
        fill: true,
      }
    ]
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (ctx) => `Rp ${ctx.parsed.y} Juta`
        }
      }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div className="space-y-6">
      {/* Kartu Statistik Utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Proposal Masuk" 
          value={ADMIN_STATS.proposalMasuk} 
          icon={FileText} 
          color="text-blue-600" 
          bg="bg-blue-100" 
          desc="Total usulan tahun ini"
        />
        <StatsCard 
          title="Proposal Didanai" 
          value={ADMIN_STATS.proposalDidanai} 
          icon={DollarSign} 
          color="text-emerald-600" 
          bg="bg-emerald-100" 
          desc="Lolos seleksi & didanai"
        />
        <StatsCard 
          title="Belum Lapor" 
          value={ADMIN_STATS.belumLapor} 
          icon={AlertCircle} 
          color="text-orange-600" 
          bg="bg-orange-100" 
          desc="Peneliti telat lapor"
        />
        <StatsCard 
          title="Serapan Anggaran" 
          value="78%" 
          icon={TrendingUp} 
          color="text-purple-600" 
          bg="bg-purple-100" 
          desc="Realisasi vs Rencana"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grafik Serapan Anggaran */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Grafik Serapan Anggaran</CardTitle>
            <CardDescription>Perbandingan rencana vs realisasi (Dalam Juta Rupiah)</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <Line data={budgetChartData} options={chartOptions} />
          </CardContent>
        </Card>

        {/* Notifikasi Jadwal & Status Laporan */}
        <div className="space-y-6">
          {/* Notifikasi Jadwal */}
          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <CardTitle className="text-base">Jadwal Segera Berakhir</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-yellow-50 p-3 rounded-md">
                  <p className="text-sm font-semibold text-gray-800">Penerimaan Proposal Hibah Internal</p>
                  <p className="text-xs text-gray-500">Berakhir dalam: <span className="text-red-600 font-bold">2 Hari</span></p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-md">
                  <p className="text-sm font-semibold text-gray-800">Masa Review Tahap 1</p>
                  <p className="text-xs text-gray-500">Berakhir dalam: <span className="text-red-600 font-bold">5 Hari</span></p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monitoring Singkat */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Monitoring Laporan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-gray-600">Laporan Kemajuan</span>
                <Badge variant="destructive">{ADMIN_STATS.belumLapor} Belum</Badge>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-gray-600">Laporan Akhir</span>
                <Badge variant="secondary">Semua Tertib</Badge>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Logbook Harian</span>
                <Badge variant="outline">234 Update</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ===== Components Helper Kecil =====

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  bg: string;
  desc?: string;
}

function StatsCard({ title, value, icon: Icon, color, bg, desc }: StatsCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${bg}`}>
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
          </div>
        </div>
        {desc && <p className="text-xs text-gray-400 mt-4">{desc}</p>}
      </CardContent>
    </Card>
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