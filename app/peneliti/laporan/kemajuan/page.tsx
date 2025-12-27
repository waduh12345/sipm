"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { 
  FileText, 
  Upload, 
  Search, 
  Eye, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Download,
  XCircle,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// --- Types ---
type StatusLaporan = "Belum Lapor" | "Menunggu Review" | "Revisi" | "Disetujui";

interface PenelitianBerjalan {
  id: string;
  judul: string;
  skema: string;
  tahun: string;
  dana_disetujui: number;
  dana_cair_tahap_1: number;
  target_luaran: string;
  status_laporan: StatusLaporan;
  progress_fisik: number; // 0-100
  catatan_revisi?: string;
  last_update?: string;
}

// --- Dummy Data ---
const RESEARCH_DATA: PenelitianBerjalan[] = [
  {
    id: "RSCH-2024-001",
    judul: "Pengembangan Sistem Deteksi Dini Hama Padi Berbasis IoT",
    skema: "Penelitian Terapan",
    tahun: "2024",
    dana_disetujui: 45000000,
    dana_cair_tahap_1: 31500000, // 70%
    target_luaran: "Jurnal Internasional",
    status_laporan: "Revisi",
    progress_fisik: 65,
    catatan_revisi: "Mohon lengkapi data logbook kegiatan bulan Februari dan perbaiki format bab metodologi.",
    last_update: "2024-07-20"
  },
  {
    id: "RSCH-2024-005",
    judul: "Implementasi Smart Grid untuk Efisiensi Energi di Gedung Kampus",
    skema: "Penelitian Dasar",
    tahun: "2024",
    dana_disetujui: 30000000,
    dana_cair_tahap_1: 21000000,
    target_luaran: "Jurnal Nasional Sinta 2",
    status_laporan: "Belum Lapor",
    progress_fisik: 40,
  },
  {
    id: "RSCH-2023-089",
    judul: "Model Pemberdayaan UMKM Batik di Era Digital",
    skema: "Penelitian Dosen Pemula",
    tahun: "2024",
    dana_disetujui: 20000000,
    dana_cair_tahap_1: 14000000,
    target_luaran: "Prosiding Nasional",
    status_laporan: "Disetujui",
    progress_fisik: 75,
    last_update: "2024-08-01"
  }
];

export default function LaporanKemajuanPage() {
  const [selectedResearch, setSelectedResearch] = useState<PenelitianBerjalan | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    persentase_fisik: 0,
    file_laporan: null as File | null,
    file_logbook: null as File | null,
    realisasi_dana: 0,
    ringkasan_kemajuan: "",
  });

  // --- Helpers ---
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  const getStatusBadge = (status: StatusLaporan) => {
    switch (status) {
      case "Disetujui":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200 shadow-none"><CheckCircle className="w-3 h-3 mr-1"/> Disetujui</Badge>;
      case "Revisi":
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200 shadow-none"><AlertCircle className="w-3 h-3 mr-1"/> Revisi</Badge>;
      case "Menunggu Review":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200 shadow-none"><Clock className="w-3 h-3 mr-1"/> Submitted</Badge>;
      default:
        return <Badge variant="outline" className="text-gray-500 border-gray-300"><Clock className="w-3 h-3 mr-1"/> Belum Lapor</Badge>;
    }
  };

  // --- Handlers ---
  const handleOpenReport = (item: PenelitianBerjalan) => {
    setSelectedResearch(item);
    setFormData({
      persentase_fisik: item.progress_fisik,
      file_laporan: null,
      file_logbook: null,
      realisasi_dana: 0,
      ringkasan_kemajuan: "",
    });
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedResearch(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file_laporan || !formData.file_logbook) {
      Swal.fire("Peringatan", "Mohon upload Dokumen Laporan dan Logbook.", "warning");
      return;
    }

    Swal.fire({
      title: "Kirim Laporan?",
      text: "Pastikan data yang Anda masukkan sudah benar.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Kirim",
      confirmButtonColor: "#2563eb",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Berhasil", "Laporan Kemajuan berhasil dikirim.", "success");
        setIsFormOpen(false);
      }
    });
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            Laporan Kemajuan
          </h1>
          <p className="text-sm text-gray-500">
            Laporkan progres penelitian, penggunaan dana, dan logbook kegiatan (Target 70%).
          </p>
        </div>
      </div>

      {/* Main Content: List Penelitian */}
      {!isFormOpen ? (
        <div className="space-y-6">
            {/* Search */}
            <div className="bg-white p-4 rounded-lg border shadow-sm flex items-center gap-3">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input 
                        placeholder="Cari judul penelitian..." 
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {RESEARCH_DATA.filter(item => item.judul.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => (
                    <Card key={item.id} className="hover:shadow-md transition-all">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                                                <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{item.id}</span>
                                                <span>• {item.skema} ({item.tahun})</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 leading-snug">{item.judul}</h3>
                                        </div>
                                        {getStatusBadge(item.status_laporan)}
                                    </div>

                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                                        <div className="bg-blue-50 px-3 py-1.5 rounded-md flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-blue-600" />
                                            <span>Dana Tahap 1: <strong>{formatCurrency(item.dana_cair_tahap_1)}</strong></span>
                                        </div>
                                        <div className="bg-purple-50 px-3 py-1.5 rounded-md flex items-center gap-2">
                                            <BookOpen className="h-4 w-4 text-purple-600" />
                                            <span>Target: {item.target_luaran}</span>
                                        </div>
                                    </div>

                                    {item.status_laporan === "Revisi" && (
                                        <div className="bg-red-50 border border-red-100 p-3 rounded-md text-sm text-red-700 flex gap-2 items-start mt-2">
                                            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                                            <div>
                                                <span className="font-semibold block">Catatan Revisi:</span>
                                                {item.catatan_revisi}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="w-full md:w-64 shrink-0 flex flex-col gap-3 justify-center border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-500">Progress Fisik</span>
                                            <span className="font-bold text-blue-600">{item.progress_fisik}%</span>
                                        </div>
                                        <Progress value={item.progress_fisik} className="h-2" />
                                    </div>
                                    
                                    <div className="flex flex-col gap-2">
                                        {item.status_laporan === "Disetujui" ? (
                                            <Button variant="outline" className="w-full border-green-200 text-green-700 bg-green-50 hover:bg-green-100">
                                                <Eye className="h-4 w-4 mr-2" /> Lihat Laporan
                                            </Button>
                                        ) : (
                                            <Button 
                                                className="w-full bg-blue-600 hover:bg-blue-700" 
                                                onClick={() => handleOpenReport(item)}
                                            >
                                                {item.status_laporan === "Revisi" ? "Perbaiki Laporan" : "Isi Laporan Kemajuan"}
                                            </Button>
                                        )}
                                        {item.last_update && (
                                            <p className="text-xs text-center text-gray-400">Update: {item.last_update}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      ) : (
        // Form View
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <Button variant="ghost" onClick={handleCloseForm} className="mb-4 pl-0 hover:bg-transparent hover:text-blue-600">
                ← Kembali ke Daftar
            </Button>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Kolom Kiri: Info Penelitian */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="bg-blue-50 border-blue-100">
                        <CardHeader>
                            <CardTitle className="text-base text-blue-800">Informasi Penelitian</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div>
                                <span className="text-gray-500 block text-xs uppercase">Judul</span>
                                <p className="font-semibold text-gray-900">{selectedResearch?.judul}</p>
                            </div>
                            <div>
                                <span className="text-gray-500 block text-xs uppercase">Skema</span>
                                <p className="font-medium">{selectedResearch?.skema}</p>
                            </div>
                            <div>
                                <span className="text-gray-500 block text-xs uppercase">Dana Tahap 1 (70%)</span>
                                <p className="font-mono font-medium text-blue-700">{formatCurrency(selectedResearch?.dana_cair_tahap_1 || 0)}</p>
                            </div>
                            {selectedResearch?.status_laporan === "Revisi" && (
                                <div className="p-3 bg-white rounded border border-red-200 text-red-600">
                                    <span className="font-bold text-xs uppercase block mb-1 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" /> Perlu Revisi
                                    </span>
                                    {selectedResearch.catatan_revisi}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                         <CardHeader>
                            <CardTitle className="text-base">Panduan Pelaporan</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-600 space-y-2">
                            <p>1. Laporan Kemajuan wajib diunggah saat penelitian mencapai minimal <strong>70%</strong>.</p>
                            <p>2. Format laporan mengikuti template yang tersedia di menu Master Data.</p>
                            <p>3. Sertakan Logbook harian yang mencatat aktivitas penelitian.</p>
                            <p>4. Input realisasi penggunaan dana sesuai kwitansi yang ada.</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Kolom Kanan: Form Input */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Formulir Laporan Kemajuan</CardTitle>
                        <CardDescription>Lengkapi data di bawah ini untuk melaporkan progres penelitian.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Progres Fisik */}
                            <div className="space-y-3">
                                <Label>Persentase Kemajuan Fisik (%)</Label>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <Progress value={formData.persentase_fisik} className="h-3" />
                                    </div>
                                    <Input 
                                        type="number" 
                                        min="0" 
                                        max="100" 
                                        className="w-20 text-center font-bold"
                                        value={formData.persentase_fisik}
                                        onChange={(e) => setFormData({...formData, persentase_fisik: parseInt(e.target.value)})}
                                    />
                                </div>
                                <p className="text-xs text-gray-500">Estimasi persentase capaian target penelitian hingga saat ini.</p>
                            </div>

                            {/* Ringkasan */}
                            <div className="space-y-2">
                                <Label>Ringkasan Kemajuan</Label>
                                <Textarea 
                                    placeholder="Jelaskan secara singkat apa saja yang sudah dikerjakan..." 
                                    className="min-h-[100px]"
                                    value={formData.ringkasan_kemajuan}
                                    onChange={(e) => setFormData({...formData, ringkasan_kemajuan: e.target.value})}
                                />
                            </div>

                            {/* Upload Dokumen */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Dokumen Laporan (PDF)</Label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                                        <Input 
                                            type="file" 
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            accept=".pdf"
                                            onChange={(e) => setFormData({...formData, file_laporan: e.target.files ? e.target.files[0] : null})}
                                        />
                                        <div className="flex flex-col items-center">
                                            <FileText className="h-8 w-8 text-blue-500 mb-2" />
                                            <span className="text-sm font-medium text-gray-700">
                                                {formData.file_laporan ? formData.file_laporan.name : "Klik untuk upload PDF"}
                                            </span>
                                            <span className="text-xs text-gray-400 mt-1">Maks 5 MB</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Logbook Kegiatan (PDF/XLS)</Label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                                        <Input 
                                            type="file" 
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            accept=".pdf,.xls,.xlsx"
                                            onChange={(e) => setFormData({...formData, file_logbook: e.target.files ? e.target.files[0] : null})}
                                        />
                                        <div className="flex flex-col items-center">
                                            <Calendar className="h-8 w-8 text-orange-500 mb-2" />
                                            <span className="text-sm font-medium text-gray-700">
                                                {formData.file_logbook ? formData.file_logbook.name : "Klik untuk upload Logbook"}
                                            </span>
                                            <span className="text-xs text-gray-400 mt-1">Maks 2 MB</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Realisasi Dana */}
                            <div className="space-y-2">
                                <Label>Realisasi Penggunaan Dana (Sementara)</Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                                    <Input 
                                        type="number" 
                                        className="pl-9" 
                                        placeholder="0"
                                        value={formData.realisasi_dana}
                                        onChange={(e) => setFormData({...formData, realisasi_dana: parseInt(e.target.value)})}
                                    />
                                </div>
                                <p className="text-xs text-gray-500">
                                    Total dana yang sudah terpakai dari termin 1. Sisa dana: 
                                    <span className="font-semibold text-gray-700 ml-1">
                                        {formatCurrency((selectedResearch?.dana_cair_tahap_1 || 0) - formData.realisasi_dana)}
                                    </span>
                                </p>
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t">
                                <Button type="button" variant="outline" onClick={handleCloseForm}>
                                    Batal
                                </Button>
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                    <Upload className="h-4 w-4 mr-2" /> Kirim Laporan
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
      )}

    </div>
  );
}