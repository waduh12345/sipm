"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import {
  FileText,
  Upload,
  Search,
  Eye,
  CheckCircle,
  AlertCircle,
  Clock,
  BookOpen,
  DollarSign,
  Link as LinkIcon,
  Award,
  Download,
  Plus,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- Types ---
type StatusLaporan = "Belum Lapor" | "Menunggu Review" | "Revisi" | "Disetujui";
type StatusLuaran = "Belum Ada" | "Draft" | "Submitted" | "Accepted" | "Published" | "Granted";

interface PenelitianAkhir {
  id: string;
  judul: string;
  skema: string;
  tahun: string;
  dana_disetujui: number;
  status_laporan_akhir: StatusLaporan;
  status_luaran: StatusLuaran;
  catatan_revisi?: string;
  target_luaran_wajib: string;
}

interface LuaranItem {
    id: number;
    jenis: string;
    judul: string;
    status: string;
    link_bukti: string;
}

// --- Dummy Data ---
const FINAL_RESEARCH_DATA: PenelitianAkhir[] = [
  {
    id: "RSCH-2023-089",
    judul: "Model Pemberdayaan UMKM Batik di Era Digital",
    skema: "Penelitian Dosen Pemula",
    tahun: "2023",
    dana_disetujui: 20000000,
    status_laporan_akhir: "Revisi",
    status_luaran: "Submitted",
    catatan_revisi: "Laporan keuangan belum menyertakan bukti potong pajak.",
    target_luaran_wajib: "Jurnal Nasional Sinta 3"
  },
  {
    id: "RSCH-2023-012",
    judul: "Analisis Sentimen Pemilu 2024 Menggunakan SVM",
    skema: "Penelitian Terapan",
    tahun: "2023",
    dana_disetujui: 45000000,
    status_laporan_akhir: "Disetujui",
    status_luaran: "Published",
    target_luaran_wajib: "Jurnal Internasional Bereputasi"
  },
  {
    id: "RSCH-2023-045",
    judul: "Pengembangan E-Modul Interaktif Matematika SD",
    skema: "Penelitian Dasar",
    tahun: "2023",
    dana_disetujui: 30000000,
    status_laporan_akhir: "Belum Lapor",
    status_luaran: "Belum Ada",
    target_luaran_wajib: "Jurnal Nasional Sinta 2"
  }
];

export default function LaporanAkhirPage() {
  const [selectedResearch, setSelectedResearch] = useState<PenelitianAkhir | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("laporan");

  // Form State
  const [formData, setFormData] = useState({
    file_laporan_akhir: null as File | null,
    file_laporan_keuangan: null as File | null,
    total_realisasi: 0,
    abstrak_akhir: "",
    luaran_list: [] as LuaranItem[]
  });

  // State untuk Input Luaran Baru
  const [newLuaran, setNewLuaran] = useState<Partial<LuaranItem>>({
      jenis: "Jurnal Nasional",
      judul: "",
      status: "Submitted",
      link_bukti: ""
  });

  // --- Helpers ---
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  const getStatusBadge = (status: StatusLaporan) => {
    switch (status) {
      case "Disetujui":
        return <Badge className="bg-green-100 text-green-700 border-green-200 shadow-none"><CheckCircle className="w-3 h-3 mr-1"/> Selesai</Badge>;
      case "Revisi":
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200 shadow-none"><AlertCircle className="w-3 h-3 mr-1"/> Revisi</Badge>;
      case "Menunggu Review":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200 shadow-none"><Clock className="w-3 h-3 mr-1"/> Submitted</Badge>;
      default:
        return <Badge variant="outline" className="text-gray-500 border-gray-300">Belum Upload</Badge>;
    }
  };

  const getLuaranBadge = (status: StatusLuaran) => {
      if (["Published", "Granted"].includes(status)) return <Badge className="bg-green-100 text-green-700 border-green-200 shadow-none">{status}</Badge>;
      if (status === "Accepted") return <Badge className="bg-blue-100 text-blue-700 border-blue-200 shadow-none">{status}</Badge>;
      if (status === "Belum Ada") return <Badge variant="outline" className="text-red-500 border-red-200">{status}</Badge>;
      return <Badge variant="outline" className="text-gray-500">{status}</Badge>;
  }

  // --- Handlers ---
  const handleOpenReport = (item: PenelitianAkhir) => {
    setSelectedResearch(item);
    // Reset Form
    setFormData({
      file_laporan_akhir: null,
      file_laporan_keuangan: null,
      total_realisasi: item.dana_disetujui, // Default penuh
      abstrak_akhir: "",
      luaran_list: []
    });
    setIsFormOpen(true);
  };

  const handleAddLuaran = () => {
      if(!newLuaran.judul || !newLuaran.link_bukti) return;
      
      const item: LuaranItem = {
          id: Math.random(),
          jenis: newLuaran.jenis!,
          judul: newLuaran.judul!,
          status: newLuaran.status!,
          link_bukti: newLuaran.link_bukti!
      };

      setFormData(prev => ({...prev, luaran_list: [...prev.luaran_list, item]}));
      setNewLuaran({ jenis: "Jurnal Nasional", judul: "", status: "Submitted", link_bukti: "" }); // Reset input
  };

  const handleDeleteLuaran = (id: number) => {
      setFormData(prev => ({...prev, luaran_list: prev.luaran_list.filter(l => l.id !== id)}));
  };

  const handleSubmit = () => {
    if (!formData.file_laporan_akhir || !formData.file_laporan_keuangan) {
      Swal.fire("Data Tidak Lengkap", "Mohon upload Dokumen Laporan Akhir dan Laporan Keuangan.", "warning");
      return;
    }
    
    if (formData.luaran_list.length === 0) {
       Swal.fire("Peringatan Luaran", "Anda belum menambahkan data Luaran Wajib.", "warning");
       return;
    }

    Swal.fire({
      title: "Kirim Laporan Akhir?",
      text: "Pastikan seluruh kewajiban luaran dan laporan keuangan sudah benar.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Finalisasi",
      confirmButtonColor: "#2563eb",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Berhasil", "Laporan Akhir berhasil dikirim.", "success");
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
            <CheckCircle className="h-6 w-6 text-green-600" />
            Laporan Akhir & Luaran
          </h1>
          <p className="text-sm text-gray-500">
            Unggah laporan hasil akhir penelitian (100%) dan klaim capaian luaran wajib.
          </p>
        </div>
      </div>

      {!isFormOpen ? (
        // --- LIST VIEW ---
        <div className="space-y-6">
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
                {FINAL_RESEARCH_DATA.filter(item => item.judul.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => (
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
                                        {getStatusBadge(item.status_laporan_akhir)}
                                    </div>

                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                                        <div className="bg-blue-50 px-3 py-1.5 rounded-md flex items-center gap-2">
                                            <Award className="h-4 w-4 text-blue-600" />
                                            <span>Wajib: <strong>{item.target_luaran_wajib}</strong></span>
                                        </div>
                                        <div className="bg-gray-50 px-3 py-1.5 rounded-md flex items-center gap-2">
                                            <span className="text-gray-500">Status Luaran:</span>
                                            {getLuaranBadge(item.status_luaran)}
                                        </div>
                                    </div>

                                    {item.status_laporan_akhir === "Revisi" && (
                                        <div className="bg-red-50 border border-red-100 p-3 rounded-md text-sm text-red-700 flex gap-2 items-start mt-2">
                                            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                                            <div>
                                                <span className="font-semibold block">Catatan Revisi:</span>
                                                {item.catatan_revisi}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="w-full md:w-48 shrink-0 flex flex-col justify-center border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
                                    {item.status_laporan_akhir === "Disetujui" ? (
                                        <Button variant="outline" className="w-full border-green-200 text-green-700 bg-green-50 hover:bg-green-100">
                                            <Eye className="h-4 w-4 mr-2" /> Lihat Arsip
                                        </Button>
                                    ) : (
                                        <Button 
                                            className="w-full bg-green-600 hover:bg-green-700" 
                                            onClick={() => handleOpenReport(item)}
                                        >
                                            {item.status_laporan_akhir === "Revisi" ? "Perbaiki Laporan" : "Lapor Akhir"}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      ) : (
        // --- FORM VIEW ---
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <Button variant="ghost" onClick={() => setIsFormOpen(false)} className="mb-4 pl-0 hover:bg-transparent hover:text-green-600">
                ← Kembali ke Daftar
            </Button>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 {/* Sidebar Info */}
                 <div className="lg:col-span-1 space-y-6">
                    <Card className="bg-green-50 border-green-100">
                        <CardHeader>
                            <CardTitle className="text-base text-green-800">Target Penelitian</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div>
                                <span className="text-gray-500 block text-xs uppercase">Judul</span>
                                <p className="font-semibold text-gray-900">{selectedResearch?.judul}</p>
                            </div>
                            <div>
                                <span className="text-gray-500 block text-xs uppercase">Luaran Wajib</span>
                                <p className="font-medium text-blue-700">{selectedResearch?.target_luaran_wajib}</p>
                            </div>
                            <div>
                                <span className="text-gray-500 block text-xs uppercase">Dana Disetujui</span>
                                <p className="font-mono font-medium">{formatCurrency(selectedResearch?.dana_disetujui || 0)}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Form Input */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Formulir Laporan Akhir</CardTitle>
                        <CardDescription>Lengkapi laporan akhir (100%) dan bukti luaran.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="laporan" className="w-full" onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-2 mb-6">
                                <TabsTrigger value="laporan">Laporan & Keuangan</TabsTrigger>
                                <TabsTrigger value="luaran">Capaian Luaran</TabsTrigger>
                            </TabsList>

                            {/* TAB 1: Dokumen & Keuangan */}
                            <TabsContent value="laporan" className="space-y-6">
                                {/* Upload Laporan Akhir */}
                                <div className="space-y-2">
                                    <Label>Dokumen Laporan Akhir Lengkap (PDF)</Label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                                        <Input 
                                            type="file" 
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            accept=".pdf"
                                            onChange={(e) => setFormData({...formData, file_laporan_akhir: e.target.files ? e.target.files[0] : null})}
                                        />
                                        <div className="flex flex-col items-center">
                                            <FileText className="h-8 w-8 text-green-500 mb-2" />
                                            <span className="text-sm font-medium text-gray-700">
                                                {formData.file_laporan_akhir ? formData.file_laporan_akhir.name : "Klik untuk upload Laporan Akhir"}
                                            </span>
                                            <span className="text-xs text-gray-400 mt-1">Maks 10 MB (Termasuk Lampiran)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Keuangan */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Laporan Keuangan 100% (PDF)</Label>
                                        <div className="border rounded-md p-3 flex items-center gap-2">
                                            <Input 
                                                type="file" 
                                                accept=".pdf"
                                                className="text-xs"
                                                onChange={(e) => setFormData({...formData, file_laporan_keuangan: e.target.files ? e.target.files[0] : null})}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Total Realisasi Anggaran</Label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                                            <Input 
                                                type="number" 
                                                className="pl-9" 
                                                value={formData.total_realisasi}
                                                onChange={(e) => setFormData({...formData, total_realisasi: parseInt(e.target.value)})}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            Sisa Dana: {formatCurrency((selectedResearch?.dana_disetujui || 0) - formData.total_realisasi)}
                                            <br />(Wajib dikembalikan ke kas negara/institusi)
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label>Abstrak Akhir (Ringkasan Hasil)</Label>
                                    <Textarea 
                                        placeholder="Tuliskan ringkasan hasil penelitian..." 
                                        className="min-h-[100px]"
                                        value={formData.abstrak_akhir}
                                        onChange={(e) => setFormData({...formData, abstrak_akhir: e.target.value})}
                                    />
                                </div>
                            </TabsContent>

                            {/* TAB 2: Luaran */}
                            <TabsContent value="luaran" className="space-y-6">
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                                    <h4 className="font-semibold text-blue-800 text-sm mb-2">Tambah Data Luaran</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                        <div className="space-y-1">
                                            <Label className="text-xs">Jenis Luaran</Label>
                                            <select 
                                                className="w-full h-9 rounded-md border bg-white px-2 text-sm"
                                                value={newLuaran.jenis}
                                                onChange={(e) => setNewLuaran({...newLuaran, jenis: e.target.value})}
                                            >
                                                <option>Jurnal Nasional</option>
                                                <option>Jurnal Internasional</option>
                                                <option>Prosiding Seminar</option>
                                                <option>Buku Ajar/Referensi</option>
                                                <option>HKI (Hak Cipta/Paten)</option>
                                                <option>Lainnya</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs">Status Saat Ini</Label>
                                            <select 
                                                className="w-full h-9 rounded-md border bg-white px-2 text-sm"
                                                value={newLuaran.status}
                                                onChange={(e) => setNewLuaran({...newLuaran, status: e.target.value})}
                                            >
                                                <option value="Draft">Draft</option>
                                                <option value="Submitted">Submitted (Sudah Submit)</option>
                                                <option value="Accepted">Accepted (LoA)</option>
                                                <option value="Published">Published (Terbit)</option>
                                                <option value="Granted">Granted (Khusus HKI)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-1 mb-3">
                                        <Label className="text-xs">Judul Luaran</Label>
                                        <Input 
                                            className="h-9 bg-white" 
                                            placeholder="Judul Artikel / Buku / HKI"
                                            value={newLuaran.judul}
                                            onChange={(e) => setNewLuaran({...newLuaran, judul: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-1 mb-3">
                                        <Label className="text-xs">Link Bukti / URL / DOI</Label>
                                        <div className="relative">
                                            <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                            <Input 
                                                className="h-9 pl-9 bg-white" 
                                                placeholder="https://journal.example.com/..."
                                                value={newLuaran.link_bukti}
                                                onChange={(e) => setNewLuaran({...newLuaran, link_bukti: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <Button onClick={handleAddLuaran} size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                                        <Plus className="h-4 w-4 mr-2" /> Tambahkan Luaran
                                    </Button>
                                </div>

                                {/* List Luaran Added */}
                                <div className="space-y-2">
                                    <Label>Daftar Luaran yang Dilaporkan</Label>
                                    {formData.luaran_list.length === 0 ? (
                                        <div className="text-center py-6 border rounded-md text-gray-400 text-sm">
                                            Belum ada luaran ditambahkan.
                                        </div>
                                    ) : (
                                        formData.luaran_list.map((item) => (
                                            <div key={item.id} className="flex justify-between items-start p-3 border rounded-md bg-white">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Badge variant="outline">{item.jenis}</Badge>
                                                        {getLuaranBadge(item.status as StatusLuaran)}
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-900">{item.judul}</p>
                                                    <a href={item.link_bukti} target="_blank" className="text-xs text-blue-600 hover:underline truncate block max-w-xs">
                                                        {item.link_bukti}
                                                    </a>
                                                </div>
                                                <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50" onClick={() => handleDeleteLuaran(item.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>

                        <div className="pt-6 flex justify-end gap-3 border-t mt-6">
                            <Button variant="outline" onClick={() => setIsFormOpen(false)}>
                                Batal
                            </Button>
                            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                                <CheckCircle className="h-4 w-4 mr-2" /> Finalisasi Laporan
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      )}

    </div>
  );
}