"use client";

import { useState, useMemo } from "react";
import { 
  Search, 
  FileText, 
  Eye, 
  Download, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  MoreHorizontal,
  CalendarDays,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- Types ---
type StatusUsulan = "Draft" | "Submitted" | "Review Administrasi" | "Review Substansi" | "Revisi" | "Diterima" | "Ditolak";

interface HistoryProposal {
  id: string;
  judul: string;
  skema: string;
  tahun_usulan: string;
  peran: "Ketua" | "Anggota";
  tanggal_submit: string;
  status: StatusUsulan;
  dana_disetujui?: number;
}

// --- Dummy Data ---
const HISTORY_DATA: HistoryProposal[] = [
  {
    id: "PROP-2024-001",
    judul: "Pengembangan Sistem Deteksi Dini Hama Padi Berbasis IoT dan Machine Learning",
    skema: "Penelitian Terapan",
    tahun_usulan: "2024",
    peran: "Ketua",
    tanggal_submit: "2024-02-15",
    status: "Review Substansi",
  },
  {
    id: "PROP-2024-005",
    judul: "Analisis Dampak Transformasi Digital Terhadap UMKM Sektor Kuliner",
    skema: "Penelitian Dosen Pemula",
    tahun_usulan: "2024",
    peran: "Anggota",
    tanggal_submit: "2024-02-10",
    status: "Submitted",
  },
  {
    id: "PROP-2023-089",
    judul: "Implementasi Smart Grid untuk Efisiensi Energi di Gedung Kampus",
    skema: "Penelitian Dasar",
    tahun_usulan: "2023",
    peran: "Ketua",
    tanggal_submit: "2023-03-01",
    status: "Diterima",
    dana_disetujui: 45000000,
  },
  {
    id: "PROP-2023-012",
    judul: "Pemberdayaan Masyarakat Pesisir Melalui Pengolahan Limbah Kerang",
    skema: "Pengabdian Masyarakat",
    tahun_usulan: "2023",
    peran: "Ketua",
    tanggal_submit: "2023-03-05",
    status: "Ditolak",
  },
  {
    id: "PROP-2022-150",
    judul: "Rancang Bangun Aplikasi Edukasi Anak Usia Dini",
    skema: "Penelitian Dosen Pemula",
    tahun_usulan: "2022",
    peran: "Anggota",
    tanggal_submit: "2022-04-12",
    status: "Diterima",
    dana_disetujui: 15000000,
  },
];

export default function RiwayatUsulanPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("Semua");
  const [yearFilter, setYearFilter] = useState<string>("Semua");

  // --- Filter Logic ---
  const filteredData = useMemo(() => {
    return HISTORY_DATA.filter((item) => {
      const matchSearch = item.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.skema.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === "Semua" || item.status === statusFilter;
      const matchYear = yearFilter === "Semua" || item.tahun_usulan === yearFilter;

      return matchSearch && matchStatus && matchYear;
    });
  }, [searchQuery, statusFilter, yearFilter]);

  // --- Helpers ---
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  const getStatusBadge = (status: StatusUsulan) => {
    switch (status) {
      case "Diterima":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200 shadow-none"><CheckCircle className="w-3 h-3 mr-1"/> Diterima</Badge>;
      case "Ditolak":
        return <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200 shadow-none"><XCircle className="w-3 h-3 mr-1"/> Ditolak</Badge>;
      case "Revisi":
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200 shadow-none"><AlertCircle className="w-3 h-3 mr-1"/> Perlu Revisi</Badge>;
      case "Review Substansi":
      case "Review Administrasi":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200 shadow-none"><Clock className="w-3 h-3 mr-1"/> Dalam Review</Badge>;
      case "Submitted":
        return <Badge variant="outline" className="text-gray-600 border-gray-300"><FileText className="w-3 h-3 mr-1"/> Submitted</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Clock className="h-6 w-6 text-blue-600" />
            Riwayat Usulan
          </h1>
          <p className="text-sm text-gray-500">
            Daftar seluruh proposal penelitian dan pengabdian yang pernah Anda ajukan.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => window.location.href='/peneliti/usulan/baru'}>
            + Ajukan Usulan Baru
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-2 w-full md:w-auto flex-1">
                    <div className="relative w-full md:max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input 
                            placeholder="Cari judul atau skema..." 
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-white">
                        <Filter className="h-4 w-4 text-gray-500" />
                        <select 
                            className="text-sm bg-transparent border-none focus:ring-0 cursor-pointer text-gray-700"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="Semua">Semua Status</option>
                            <option value="Submitted">Submitted</option>
                            <option value="Review Substansi">Dalam Review</option>
                            <option value="Revisi">Perlu Revisi</option>
                            <option value="Diterima">Diterima</option>
                            <option value="Ditolak">Ditolak</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-white">
                        <CalendarDays className="h-4 w-4 text-gray-500" />
                        <select 
                            className="text-sm bg-transparent border-none focus:ring-0 cursor-pointer text-gray-700"
                            value={yearFilter}
                            onChange={(e) => setYearFilter(e.target.value)}
                        >
                            <option value="Semua">Semua Tahun</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                        </select>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>

      {/* Data Table / List */}
      <div className="space-y-4">
        {filteredData.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-dashed">
                <FileText className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900">Belum ada usulan ditemukan</h3>
                <p className="text-gray-500 text-sm">Coba sesuaikan filter atau kata kunci pencarian Anda.</p>
            </div>
        ) : (
            filteredData.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                            {/* Status Indicator Stripe */}
                            <div className={`w-full md:w-2 h-2 md:h-auto ${
                                item.status === "Diterima" ? "bg-green-500" : 
                                item.status === "Ditolak" ? "bg-red-500" : 
                                item.status === "Submitted" ? "bg-gray-400" : "bg-blue-500"
                            }`}></div>
                            
                            <div className="flex-1 p-5">
                                <div className="flex flex-col md:flex-row justify-between gap-4 mb-2">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{item.id}</span>
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <CalendarDays className="h-3 w-3" /> {item.tanggal_submit}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 leading-tight">
                                            {item.judul}
                                        </h3>
                                    </div>
                                    <div className="shrink-0 flex items-start gap-2">
                                        {getStatusBadge(item.status)}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-4 text-gray-600">
                                    <div>
                                        <span className="block text-xs text-gray-400 uppercase font-semibold">Skema & Tahun</span>
                                        <span className="font-medium text-gray-800">{item.skema} ({item.tahun_usulan})</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-gray-400 uppercase font-semibold">Peran</span>
                                        <span className="font-medium text-gray-800">{item.peran}</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-gray-400 uppercase font-semibold">Dana Disetujui</span>
                                        <span className="font-medium text-gray-800">
                                            {item.dana_disetujui ? formatCurrency(item.dana_disetujui) : "-"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="p-4 border-t md:border-t-0 md:border-l bg-gray-50 flex md:flex-col justify-center items-center gap-2 w-full md:w-40">
                                <Button variant="outline" size="sm" className="w-full justify-start text-gray-700 bg-white hover:bg-gray-100">
                                    <Eye className="h-4 w-4 mr-2" /> Detail
                                </Button>
                                
                                {item.status === "Diterima" && (
                                    <Button size="sm" className="w-full justify-start bg-green-600 hover:bg-green-700">
                                        <FileText className="h-4 w-4 mr-2" /> Lapor
                                    </Button>
                                )}

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="w-full justify-start text-gray-500">
                                            <MoreHorizontal className="h-4 w-4 mr-2" /> Lainnya
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Aksi Lain</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Download className="h-4 w-4 mr-2" /> Unduh Proposal
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <FileText className="h-4 w-4 mr-2" /> Bukti Submit
                                        </DropdownMenuItem>
                                        {item.status === "Revisi" && (
                                            <>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-orange-600 font-medium">
                                                    <AlertCircle className="h-4 w-4 mr-2" /> Kirim Revisi
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))
        )}
      </div>

    </div>
  );
}