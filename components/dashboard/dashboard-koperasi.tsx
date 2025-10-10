"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  HeartHandshake,
  Megaphone,
  Building2,
  Landmark,
  Tent,
  Vote,
  Shield,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
  type ChartData,
  type ChartOptions,
  type TooltipItem,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

// Registrasi komponen Chart.js yang akan digunakan
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement, // Tambahkan BarElement untuk grafik batang
  Tooltip,
  Legend,
  Filler
);

// ===== Utilitas =====
const formatNumber = (num: number): string =>
  new Intl.NumberFormat("id-ID").format(num);

// ===== Data Statis =====
const summaryData = {
  totalAnggota: 125430,
  totalRelawan: 88720,
  totalSimpatisan: 215600,
  totalKantorPartai: 34,
  totalKantorOrmas: 12,
  totalPoskoRelawan: 350,
  totalSimses: 5210,
  totalTimsus: 1850,
};

const labels = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", 
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
];

// Data statis untuk grafik kenaikan anggota (12 bulan)
const monthlyAnggotaData = [
  110500, 112300, 113800, 115100, 116900, 118200, 
  119500, 121000, 122400, 123600, 124500, 125430
];

// Data statis untuk grafik kenaikan non-anggota (12 bulan)
const monthlySimpatisanData = [
  180200, 183500, 187800, 191200, 195600, 199900, 
  203400, 206700, 209800, 212300, 214100, 215600
];
const monthlyRelawanData = [
  75100, 76400, 77900, 79200, 80800, 82100, 
  83500, 84900, 86300, 87500, 88100, 88720
];

export default function DashboardPartaiPage() {
  const cards = [
    { title: "Total Anggota", value: formatNumber(summaryData.totalAnggota), icon: Users, color: "text-blue-600", bgColor: "bg-blue-100" },
    { title: "Total Relawan", value: formatNumber(summaryData.totalRelawan), icon: HeartHandshake, color: "text-emerald-600", bgColor: "bg-emerald-100" },
    { title: "Total Simpatisan", value: formatNumber(summaryData.totalSimpatisan), icon: Megaphone, color: "text-orange-600", bgColor: "bg-orange-100" },
    { title: "Total Kantor Partai", value: formatNumber(summaryData.totalKantorPartai), icon: Building2, color: "text-purple-600", bgColor: "bg-purple-100" },
    { title: "Total Kantor Ormas", value: formatNumber(summaryData.totalKantorOrmas), icon: Landmark, color: "text-red-600", bgColor: "bg-red-100" },
    { title: "Total Posko Relawan", value: formatNumber(summaryData.totalPoskoRelawan), icon: Tent, color: "text-yellow-600", bgColor: "bg-yellow-100" },
    { title: "Total Simses", value: formatNumber(summaryData.totalSimses), icon: Vote, color: "text-indigo-600", bgColor: "bg-indigo-100" },
    { title: "Total Timsus", value: formatNumber(summaryData.totalTimsus), icon: Shield, color: "text-gray-600", bgColor: "bg-gray-200" },
  ] as const;

  // ===== Konfigurasi Grafik (Umum) =====
  const commonChartOptions: ChartOptions<"line" | "bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<"line" | "bar">): string => {
            const v = ctx.parsed.y ?? 0;
            return `${ctx.dataset.label ?? "Data"}: ${formatNumber(v)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (tickValue: string | number) => formatNumber(Number(tickValue)),
        },
      },
    },
  };
  
  // Data untuk Grafik Anggota (Line Chart)
  const anggotaChartData: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: "Total Anggota",
        data: monthlyAnggotaData,
        borderColor: "rgba(59,130,246,1)", // blue-500
        backgroundColor: "rgba(59,130,246,0.2)",
        fill: true,
        tension: 0.35,
        pointRadius: 2,
      },
    ],
  };

  // Data untuk Grafik Non-Anggota (Bar Chart)
  const nonAnggotaChartData: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "Simpatisan",
        data: monthlySimpatisanData,
        backgroundColor: "rgba(249,115,22, 0.6)", // orange-500
        borderColor: "rgba(249,115,22, 1)",
        borderWidth: 1,
      },
      {
        label: "Relawan",
        data: monthlyRelawanData,
        backgroundColor: "rgba(16,185,129, 0.6)", // emerald-500
        borderColor: "rgba(16,185,129, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Digital KTA</h1>
        <p className="text-sm text-gray-500 mt-1 sm:mt-0">
          Ringkasan data keanggotaan dan infrastruktur
        </p>
      </div>

      {/* Kartu Ringkasan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Card
              key={i}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-full ${card.bgColor}`}>
                    <Icon className={`h-12 w-12 ${card.color}`} />
                  </div>
                  <CardTitle className="text-md font-medium text-gray-600">
                    {card.title}
                    <div className="text-2xl font-bold text-gray-900 text-left">
                      {card.value}
                    </div>
                  </CardTitle>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* Grafik */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Grafik Kenaikan Anggota (1 Tahun Terakhir)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <Line data={anggotaChartData} options={commonChartOptions} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Grafik Kenaikan Non-Anggota (1 Tahun Terakhir)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <Bar data={nonAnggotaChartData} options={commonChartOptions} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
