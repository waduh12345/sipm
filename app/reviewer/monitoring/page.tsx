"use client";

import { useState, useMemo } from "react";
import Swal from "sweetalert2";
import {
  BarChart3,
  Search,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Eye,
  Download,
  BookOpen,
  DollarSign,
  TrendingUp,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

// --- Types ---
type StatusMonev = "Menunggu Review" | "Revisi" | "Disetujui" | "Belum Upload";

interface MonevProject {
  id: string;
  judul: string;
  ketua_peneliti: string;
  skema: string;
  tahun: string;
  progress_fisik: number; // %
  status_kemajuan: StatusMonev;
  status_akhir: StatusMonev;
  status_luaran: StatusMonev;
  file_kemajuan?: string;
  file_logbook?: string;
  file_akhir?: string;
  target_luaran?: string;
  catatan_reviewer?: string;
}

// --- Dummy Data ---
const DATA_MONEV: MonevProject[] = [
  {
    id: "MON-001",
    judul: "Pengembangan Sistem Deteksi Dini Hama Padi Berbasis IoT dan Deep Learning",
    ketua_peneliti: "Dr. Budi Santoso, M.Kom",
    skema: "Penelitian Terapan",
    tahun: "2024",
    progress_fisik: 75,
    status_kemajuan: "Menunggu Review",
    status_akhir: "Belum Upload",
    status_luaran: "Belum Upload",
    file_kemajuan: "Laporan_Kemajuan_IoT.pdf",
    file_logbook: "Logbook_IoT.xls",
    target_luaran: "Jurnal Internasional"
  },
  {
    id: "MON-002",
    judul: "Model Pemberdayaan Ekonomi Kreatif Pesisir Berbasis Kearifan Lokal",
    ketua_peneliti: "Siti Aminah, S.E., M.M.",
    skema: "Pengabdian Masyarakat",
    tahun: "2024",
    progress_fisik: 40,
    status_kemajuan: "Revisi",
    status_akhir: "Belum Upload",
    status_luaran: "Belum Upload",
    catatan_reviewer: "Mohon lengkapi dokumentasi foto kegiatan pada logbook."
  },
  {
    id: "MON-003",
    judul: "Analisis Yuridis Perlindungan Data Pribadi di Era Fintech",
    ketua_peneliti: "Herman Lawyer, S.H., M.H.",
    skema: "Penelitian Dasar",
    tahun: "2024",
    progress_fisik: 100,
    status_kemajuan: "Disetujui",
    status_akhir: "Menunggu Review",
    status_luaran: "Menunggu Review",
    file_akhir: "Laporan_Akhir_Hukum.pdf",
    target_luaran: "Jurnal Nasional Sinta 2"
  }
];

export default function MonevReviewerPage() {
  const [projects, setProjects] = useState<MonevProject[]>(DATA_MONEV);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("kemajuan");

  // State Modal Review
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<MonevProject | null>(null);
  const [reviewContext, setReviewContext] = useState<"kemajuan" | "akhir" | "luaran">("kemajuan");
  const [catatan, setCatatan] = useState("");

  // --- Helpers ---
  const filteredData = useMemo(() => {
    let data = projects;
    if (searchQuery) {
      data = data.filter(p => p.judul.toLowerCase().includes(searchQuery.toLowerCase()) || p.ketua_peneliti.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return data;
  }, [projects, searchQuery]);

  const getStatusBadge = (status: StatusMonev) => {
    switch (status) {
      case "Disetujui": return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">Disetujui</Badge>;
      case "Menunggu Review": return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">Menunggu Review</Badge>;
      case "Revisi": return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200">Perlu Revisi</Badge>;
      default: return <Badge variant="outline" className="text-gray-400">Belum Upload</Badge>;
    }
  };

  const getLogbookColor = (percent: number) => {
    if (percent >= 80) return "bg-green-500";
    if (percent >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  // --- Handlers ---
  const handleOpenReview = (project: MonevProject, context: "kemajuan" | "akhir" | "luaran") => {
    setSelectedProject(project);
    setReviewContext(context);
    setCatatan(project.catatan_reviewer || "");
    setIsReviewModalOpen(true);
  };

  const submitReview = (verdict: "Approve" | "Revise") => {
    if (verdict === "Revise" && !catatan) {
      Swal.fire("Gagal", "Wajib menyertakan catatan jika meminta revisi.", "error");
      return;
    }

    Swal.fire({
      title: verdict === "Approve" ? "Setujui Laporan?" : "Minta Revisi?",
      text: verdict === "Approve" 
        ? "Laporan akan ditandai selesai dan peneliti dapat melanjutkan ke tahap berikutnya."
        : "Notifikasi revisi akan dikirim ke peneliti.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: verdict === "Approve" ? "Ya, Setujui" : "Kirim Revisi",
      confirmButtonColor: verdict === "Approve" ? "#16a34a" : "#ea580c",
    }).then((result) => {
      if (result.isConfirmed) {
        // Update Mock Data
        setProjects(prev => prev.map(p => {
            if (p.id === selectedProject?.id) {
                const newStatus = verdict === "Approve" ? "Disetujui" : "Revisi";
                if (reviewContext === "kemajuan") return { ...p, status_kemajuan: newStatus, catatan_reviewer: catatan };
                if (reviewContext === "akhir") return { ...p, status_akhir: newStatus, catatan_reviewer: catatan };
                if (reviewContext === "luaran") return { ...p, status_luaran: newStatus, catatan_reviewer: catatan };
            }
            return p;
        }));
        setIsReviewModalOpen(false);
        Swal.fire("Berhasil", "Review monev berhasil disimpan.", "success");
      }
    });
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            Monitoring & Evaluasi (Monev)
          </h1>
          <p className="text-sm text-gray-500">
            Pantau kemajuan penelitian dan validasi laporan dari peneliti binaan Anda.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Total Penelitian</p>
              <h3 className="text-2xl font-bold text-gray-900">{projects.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Menunggu Review</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {projects.filter(p => p.status_kemajuan === "Menunggu Review" || p.status_akhir === "Menunggu Review").length}
              </h3>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Selesai (Akhir)</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {projects.filter(p => p.status_akhir === "Disetujui").length}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {!isReviewModalOpen ? (
        <Tabs defaultValue="kemajuan" className="w-full" onValueChange={setActiveTab}>
             <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <TabsList className="grid w-full md:w-[500px] grid-cols-3">
                    <TabsTrigger value="kemajuan">Laporan Kemajuan</TabsTrigger>
                    <TabsTrigger value="akhir">Laporan Akhir</TabsTrigger>
                    <TabsTrigger value="luaran">Luaran</TabsTrigger>
                </TabsList>

                <div className="relative w-full md:w-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input 
                        placeholder="Cari peneliti / judul..." 
                        className="pl-9 bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* TAB: KEMAJUAN */}
            <TabsContent value="kemajuan">
                <div className="space-y-4">
                    {filteredData.map(item => (
                        <Card key={item.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-5">
                                <div className="flex flex-col md:flex-row gap-5">
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline">{item.skema}</Badge>
                                            <span className="text-xs text-gray-400">ID: {item.id}</span>
                                        </div>
                                        <h3 className="font-bold text-gray-900">{item.judul}</h3>
                                        <p className="text-sm text-gray-600">Ketua: {item.ketua_peneliti}</p>
                                        
                                        <div className="mt-3">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span>Progress Fisik</span>
                                                <span className="font-semibold">{item.progress_fisik}%</span>
                                            </div>
                                            <Progress value={item.progress_fisik} className={`h-2 ${getLogbookColor(item.progress_fisik)}`} />
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-center items-end gap-3 min-w-[150px] border-l pl-4 border-gray-100">
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Status Laporan</p>
                                            {getStatusBadge(item.status_kemajuan)}
                                        </div>
                                        <Button 
                                            size="sm" 
                                            className="w-full bg-blue-600 hover:bg-blue-700"
                                            disabled={item.status_kemajuan === "Belum Upload"}
                                            onClick={() => handleOpenReview(item, "kemajuan")}
                                        >
                                            <Eye className="h-4 w-4 mr-2" /> Review
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </TabsContent>

            {/* TAB: AKHIR */}
            <TabsContent value="akhir">
                 <div className="space-y-4">
                    {filteredData.map(item => (
                        <Card key={item.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-5">
                                <div className="flex flex-col md:flex-row gap-5">
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline">{item.skema}</Badge>
                                        </div>
                                        <h3 className="font-bold text-gray-900">{item.judul}</h3>
                                        <p className="text-sm text-gray-600">Ketua: {item.ketua_peneliti}</p>
                                    </div>

                                    <div className="flex flex-col justify-center items-end gap-3 min-w-[150px] border-l pl-4 border-gray-100">
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Status Akhir</p>
                                            {getStatusBadge(item.status_akhir)}
                                        </div>
                                        <Button 
                                            size="sm" 
                                            className="w-full bg-green-600 hover:bg-green-700"
                                            disabled={item.status_akhir === "Belum Upload"}
                                            onClick={() => handleOpenReview(item, "akhir")}
                                        >
                                            <CheckCircle className="h-4 w-4 mr-2" /> Validasi
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </TabsContent>

            {/* TAB: LUARAN */}
            <TabsContent value="luaran">
                <div className="space-y-4">
                    {filteredData.map(item => (
                        <Card key={item.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-5">
                                <div className="flex flex-col md:flex-row gap-5">
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className="bg-purple-100 text-purple-700">Target: {item.target_luaran}</Badge>
                                        </div>
                                        <h3 className="font-bold text-gray-900">{item.judul}</h3>
                                        <p className="text-sm text-gray-600">Ketua: {item.ketua_peneliti}</p>
                                    </div>

                                    <div className="flex flex-col justify-center items-end gap-3 min-w-[150px] border-l pl-4 border-gray-100">
                                        <div className="text-right">
                                          <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Status Luaran</p>
                                          {getStatusBadge(item.status_luaran)}
                                        </div>
                                        <Button 
                                          size="sm" 
                                          variant="outline"
                                          className="w-full"
                                          disabled={item.status_luaran === "Belum Upload"}
                                          onClick={() => handleOpenReview(item, "luaran")}
                                        >
                                          <BookOpen className="h-4 w-4 mr-2" /> Cek Luaran
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </TabsContent>

        </Tabs>
      ) : (

        // --- REVIEW MODAL / PAGE ---
        <div className="animate-in zoom-in-95 duration-200">
             <div className="flex items-center justify-between mb-4">
                <Button variant="ghost" onClick={() => setIsReviewModalOpen(false)} className="pl-0 hover:bg-transparent text-gray-500 hover:text-gray-900">
                    ← Kembali ke Daftar Monev
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Kolom Kiri: Info Project */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="bg-gray-50 border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-base text-gray-800">Informasi Penelitian</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                             <div>
                                <span className="text-gray-500 block text-xs uppercase">Judul</span>
                                <p className="font-semibold text-gray-900">{selectedProject?.judul}</p>
                            </div>
                            <div>
                                <span className="text-gray-500 block text-xs uppercase">Ketua Peneliti</span>
                                <p className="font-medium">{selectedProject?.ketua_peneliti}</p>
                            </div>
                            <div>
                                <span className="text-gray-500 block text-xs uppercase">Skema & Tahun</span>
                                <p className="font-medium">{selectedProject?.skema} ({selectedProject?.tahun})</p>
                            </div>
                            {reviewContext === "kemajuan" && (
                                <div>
                                    <span className="text-gray-500 block text-xs uppercase">Progress Fisik Klaim</span>
                                    <div className="flex items-center gap-2">
                                        <Progress value={selectedProject?.progress_fisik} className="h-2 w-24" />
                                        <span className="font-bold">{selectedProject?.progress_fisik}%</span>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Kolom Kanan: Form Review */}
                <Card className="lg:col-span-2 shadow-sm border-t-4 border-t-blue-600">
                    <CardHeader className="bg-blue-50/30">
                        <CardTitle>
                            {reviewContext === "kemajuan" ? "Review Laporan Kemajuan" : 
                             reviewContext === "akhir" ? "Validasi Laporan Akhir" : "Validasi Luaran"}
                        </CardTitle>
                        <CardDescription>
                            Periksa kelengkapan dokumen dan kesesuaian substansi laporan.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        
                        {/* 1. Dokumen Check */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold flex items-center gap-2">
                                <FileText className="h-4 w-4" /> Dokumen Terlampir
                            </h4>
                            <div className="grid grid-cols-1 gap-2">
                                <div className="flex items-center justify-between p-3 border rounded bg-white hover:bg-gray-50">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-red-100 p-2 rounded text-red-600 text-xs font-bold">PDF</div>
                                        <div>
                                            <p className="text-sm font-medium">Laporan_Lengkap.pdf</p>
                                            <p className="text-xs text-gray-500">2.4 MB • Diupload 2 hari lalu</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-blue-600">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                                {reviewContext === "kemajuan" && (
                                     <div className="flex items-center justify-between p-3 border rounded bg-white hover:bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-green-100 p-2 rounded text-green-600 text-xs font-bold">XLS</div>
                                            <div>
                                                <p className="text-sm font-medium">Logbook_Harian.xlsx</p>
                                                <p className="text-xs text-gray-500">500 KB</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-blue-600">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Separator />

                        {/* 2. Catatan Reviewer */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" /> Catatan / Masukan
                            </Label>
                            <Textarea 
                                placeholder="Berikan catatan jika ada bagian yang perlu direvisi atau diperbaiki..." 
                                className="min-h-[120px]"
                                value={catatan}
                                onChange={(e) => setCatatan(e.target.value)}
                            />
                            <p className="text-xs text-gray-500">Catatan ini akan muncul di dashboard peneliti jika Anda meminta revisi.</p>
                        </div>

                        {/* 3. Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button 
                                variant="outline" 
                                className="text-orange-600 border-orange-200 hover:bg-orange-50"
                                onClick={() => submitReview("Revise")}
                            >
                                <AlertCircle className="h-4 w-4 mr-2" /> Minta Revisi
                            </Button>
                            <Button 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => submitReview("Approve")}
                            >
                                <CheckCircle className="h-4 w-4 mr-2" /> Setujui Laporan
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