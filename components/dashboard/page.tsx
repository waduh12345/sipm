"use client";

import { useMemo, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Calendar,
  BookOpen,
  UserCheck
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
import { Line, Bar } from "react-chartjs-2";

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

// ===== Data Dummy Reviewer =====
const REVIEWER_DATA = {
  pending: 5,
  completed: 12,
  listPending: [
    { id: 1, judul: "Optimasi Jaringan Syaraf Tiruan...", deadline: "2023-10-25" },
    { id: 2, judul: "Analisis Dampak Sosial Ekonomi...", deadline: "2023-10-26" },
    { id: 3, judul: "Rancang Bangun Turbin Angin...", deadline: "2023-10-28" },
  ]
};

// ===== UTILS =====
const formatCurrency = (val: number) => 
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumSignificantDigits: 3 }).format(val * 1000000); // Asumsi input dalam juta

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
        
        {/* Development Only: Switcher Role */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg border shadow-sm">
          <span className="text-xs font-medium text-gray-500">View as:</span>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value as RoleType)}
            className="text-sm border-none bg-transparent font-semibold focus:ring-0 cursor-pointer"
          >
            <option value="admin">Admin LPPM</option>
            <option value="peneliti">Peneliti (Dosen)</option>
            <option value="reviewer">Reviewer</option>
          </select>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Render View Berdasarkan Role */}
      {role === "admin" && <AdminDashboardView />}
      {role === "peneliti" && <ResearcherDashboardView />}
      {role === "reviewer" && <ReviewerDashboardView />}
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

// ============================================================================
// 3. VIEW REVIEWER
// ============================================================================
function ReviewerDashboardView() {
  return (
    <div className="space-y-6">
      {/* Stats Reviewer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <StatsCard 
          title="Menunggu Penilaian" 
          value={REVIEWER_DATA.pending} 
          icon={Clock} 
          color="text-orange-600" 
          bg="bg-orange-100" 
          desc="Proposal perlu direview segera"
        />
        <StatsCard 
          title="Selesai Dinilai" 
          value={REVIEWER_DATA.completed} 
          icon={CheckCircle} 
          color="text-green-600" 
          bg="bg-green-100" 
          desc="Total proposal yang telah disubmit"
        />
      </div>

      {/* Daftar Proposal Pending */}
      <Card className="border-t-4 border-t-orange-500">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Daftar Review Pending</CardTitle>
            <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
              Prioritas Tinggi
            </Badge>
          </div>
          <CardDescription>Mohon selesaikan penilaian sebelum tenggat waktu</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {REVIEWER_DATA.listPending.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg hover:shadow-sm transition-shadow bg-white">
                <div className="mb-3 sm:mb-0">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{item.judul}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600">Penelitian Terapan</span>
                    <span className="text-xs text-gray-500">ID: #{item.id + 2030}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Tenggat Waktu</p>
                    <p className="text-sm font-bold text-red-600">{item.deadline}</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                    Nilai Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Informasi Honorarium (Opsional) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" /> 
            Informasi Honorarium
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Honorarium akan dicairkan setelah seluruh proses review batch ini selesai dan SK diterbitkan oleh LPPM.</p>
        </CardContent>
      </Card>
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