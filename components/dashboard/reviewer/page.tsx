"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  DollarSign,
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

export default function DashboardSippmPage() {
  // State untuk simulasi Role (Nanti diganti dengan session auth)
  const [role, setRole] = useState<RoleType>("reviewer");
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
      {role === "reviewer" && <ReviewerDashboardView />}
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
  value: number;
  icon: React.ComponentType<{ className?: string }>;
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