"use client";

import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Eye, 
  BarChart3,
  AlertCircle,
  Download,
  BookOpen,
  Receipt
} from "lucide-react";

// --- Tipe Data ---
type StatusLaporan = "Belum Upload" | "Menunggu Review" | "Revisi" | "Disetujui";

interface MonitoringData {
  id: number;
  judul: string;
  peneliti: string;
  skema: string;
  progress_logbook: number; // Persentase pengisian logbook
  laporan_kemajuan: StatusLaporan;
  laporan_akhir: StatusLaporan;
  laporan_keuangan: StatusLaporan;
  luaran_wajib: string; // Misal: Jurnal Nasional Terakreditasi
  status_luaran: StatusLaporan;
}

// --- Data Dummy ---
const MONEV_DATA: MonitoringData[] = [
  { 
    id: 1, 
    judul: "Pengembangan Sistem Deteksi Dini Hama Padi Berbasis IoT", 
    peneliti: "Drs. Ahmad Dahlan, M.T.", 
    skema: "Penelitian Terapan", 
    progress_logbook: 85,
    laporan_kemajuan: "Disetujui",
    laporan_akhir: "Menunggu Review",
    laporan_keuangan: "Menunggu Review",
    luaran_wajib: "Jurnal Internasional",
    status_luaran: "Belum Upload"
  },
  { 
    id: 2, 
    judul: "Model Pemberdayaan UMKM Batik di Era Digital", 
    peneliti: "Rini Suhartini, S.E., M.M.", 
    skema: "Penelitian Dosen Pemula", 
    progress_logbook: 40,
    laporan_kemajuan: "Revisi",
    laporan_akhir: "Belum Upload",
    laporan_keuangan: "Belum Upload",
    luaran_wajib: "Jurnal Nasional Sinta 3",
    status_luaran: "Belum Upload"
  },
  { 
    id: 3, 
    judul: "Analisis Yuridis Perlindungan Konsumen E-Commerce", 
    peneliti: "Dr. Herman Lawyer, S.H.", 
    skema: "Penelitian Dasar", 
    progress_logbook: 100,
    laporan_kemajuan: "Disetujui",
    laporan_akhir: "Disetujui",
    laporan_keuangan: "Disetujui",
    luaran_wajib: "Buku Ajar",
    status_luaran: "Disetujui"
  },
  { 
    id: 4, 
    judul: "Optimasi Algoritma Genetic untuk Penjadwalan Kuliah", 
    peneliti: "Fajar Shiddiq, M.Kom", 
    skema: "Penelitian Dosen Pemula", 
    progress_logbook: 60,
    laporan_kemajuan: "Menunggu Review",
    laporan_akhir: "Belum Upload",
    laporan_keuangan: "Belum Upload",
    luaran_wajib: "Prosiding Nasional",
    status_luaran: "Belum Upload"
  },
];

export default function MonitoringMonevPage() {
  const [dataList, setDataList] = useState<MonitoringData[]>(MONEV_DATA);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("kemajuan");

  // State Modal Detail
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MonitoringData | null>(null);
  const [reviewContext, setReviewContext] = useState<"kemajuan" | "akhir" | "luaran">("kemajuan");

  // --- Filter Data ---
  const filteredData = useMemo(() => {
    let data = dataList;
    if (query) {
      const lowerQuery = query.toLowerCase();
      data = data.filter(
        (p) =>
          p.judul.toLowerCase().includes(lowerQuery) ||
          p.peneliti.toLowerCase().includes(lowerQuery)
      );
    }
    return data;
  }, [dataList, query]);

  // --- Helpers ---
  const getStatusBadge = (status: StatusLaporan) => {
    switch (status) {
      case "Disetujui": return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 shadow-none border-green-200">Disetujui</Badge>;
      case "Menunggu Review": return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 shadow-none border-yellow-200">Menunggu Review</Badge>;
      case "Revisi": return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 shadow-none border-red-200">Revisi</Badge>;
      default: return <Badge variant="outline" className="text-gray-400">Belum Upload</Badge>;
    }
  };

  const getLogbookColor = (percent: number) => {
    if (percent >= 80) return "bg-green-500";
    if (percent >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  // --- Handlers ---
  const handleOpenDetail = (item: MonitoringData, context: "kemajuan" | "akhir" | "luaran") => {
    setSelectedItem(item);
    setReviewContext(context);
    setIsDetailOpen(true);
  };

  const handleReviewAction = async (action: "approve" | "reject") => {
    if (!selectedItem) return;

    if (action === "approve") {
      const result = await Swal.fire({
        title: "Setujui Laporan?",
        text: "Status laporan akan berubah menjadi Disetujui.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya, Setujui",
        confirmButtonColor: "#10b981",
      });

      if (result.isConfirmed) {
        // Update logic dummy
        const updatedList = dataList.map(item => {
            if (item.id === selectedItem.id) {
                if (reviewContext === "kemajuan") return { ...item, laporan_kemajuan: "Disetujui" as StatusLaporan };
                if (reviewContext === "akhir") return { ...item, laporan_akhir: "Disetujui" as StatusLaporan };
                if (reviewContext === "luaran") return { ...item, status_luaran: "Disetujui" as StatusLaporan };
            }
            return item;
        });
        setDataList(updatedList);
        setIsDetailOpen(false);
        Swal.fire("Berhasil", "Laporan berhasil disetujui.", "success");
      }
    } else {
        const { value: text } = await Swal.fire({
            title: "Minta Revisi?",
            input: "textarea",
            inputLabel: "Catatan Revisi",
            inputPlaceholder: "Tuliskan bagian yang perlu diperbaiki...",
            showCancelButton: true,
            confirmButtonText: "Kirim Revisi",
            confirmButtonColor: "#ef4444",
        });

        if (text) {
             const updatedList = dataList.map(item => {
                if (item.id === selectedItem.id) {
                    if (reviewContext === "kemajuan") return { ...item, laporan_kemajuan: "Revisi" as StatusLaporan };
                    if (reviewContext === "akhir") return { ...item, laporan_akhir: "Revisi" as StatusLaporan };
                    if (reviewContext === "luaran") return { ...item, status_luaran: "Revisi" as StatusLaporan };
                }
                return item;
            });
            setDataList(updatedList);
            setIsDetailOpen(false);
            Swal.fire("Terkirim", "Catatan revisi telah dikirim ke peneliti.", "info");
        }
    }
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
            Pantau kemajuan penelitian, logbook, laporan akhir, dan luaran.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-600 text-white border-none">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-full">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs opacity-80">Total Penelitian Berjalan</p>
              <h3 className="text-2xl font-bold">{MONEV_DATA.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Menunggu Review Kemajuan</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {MONEV_DATA.filter(i => i.laporan_kemajuan === "Menunggu Review").length}
              </h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <BookOpen className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Menunggu Review Akhir</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {MONEV_DATA.filter(i => i.laporan_akhir === "Menunggu Review").length}
              </h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Luaran Valid</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {MONEV_DATA.filter(i => i.status_luaran === "Disetujui").length}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="kemajuan" className="w-full" onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <TabsList className="grid w-full md:w-[500px] grid-cols-3">
                <TabsTrigger value="kemajuan">Laporan Kemajuan</TabsTrigger>
                <TabsTrigger value="akhir">Laporan Akhir</TabsTrigger>
                <TabsTrigger value="luaran">Luaran (Output)</TabsTrigger>
            </TabsList>

            <div className="relative w-full md:w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                placeholder="Cari peneliti atau judul..."
                className="pl-9 bg-white"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                />
            </div>
        </div>

        {/* TAB 1: LAPORAN KEMAJUAN & LOGBOOK */}
        <TabsContent value="kemajuan">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg">Monitoring Kemajuan (70%)</CardTitle>
              <CardDescription>Validasi logbook harian dan dokumen laporan kemajuan.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 uppercase font-semibold text-xs">
                            <tr>
                                <th className="px-6 py-3 w-1/3">Informasi Penelitian</th>
                                <th className="px-6 py-3">Logbook</th>
                                <th className="px-6 py-3 text-center">Status Laporan</th>
                                <th className="px-6 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredData.map((item) => (
                                <tr key={item.id} className="bg-white hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-900 line-clamp-2">{item.judul}</p>
                                        <div className="text-xs text-gray-500 mt-1">{item.peneliti} • {item.skema}</div>
                                    </td>
                                    <td className="px-6 py-4 w-1/4">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span>Progress</span>
                                            <span className="font-semibold">{item.progress_logbook}%</span>
                                        </div>
                                        <Progress value={item.progress_logbook} className={`h-2 ${getLogbookColor(item.progress_logbook)}`} />
                                        <p className="text-[10px] text-gray-400 mt-1">Target: 100% saat Laporan Akhir</p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {getStatusBadge(item.laporan_kemajuan)}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                            onClick={() => handleOpenDetail(item, "kemajuan")}
                                            disabled={item.laporan_kemajuan === "Belum Upload"}
                                        >
                                            <Eye className="h-4 w-4 mr-2" />
                                            Review
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: LAPORAN AKHIR & KEUANGAN */}
        <TabsContent value="akhir">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg">Monitoring Laporan Akhir (100%)</CardTitle>
              <CardDescription>Validasi dokumen laporan akhir dan pertanggungjawaban keuangan.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 uppercase font-semibold text-xs">
                            <tr>
                                <th className="px-6 py-3 w-1/3">Informasi Penelitian</th>
                                <th className="px-6 py-3 text-center">Status Laporan Akhir</th>
                                <th className="px-6 py-3 text-center">Status Keuangan (RAB)</th>
                                <th className="px-6 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredData.map((item) => (
                                <tr key={item.id} className="bg-white hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-900 line-clamp-2">{item.judul}</p>
                                        <div className="text-xs text-gray-500 mt-1">{item.peneliti}</div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {getStatusBadge(item.laporan_akhir)}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {getStatusBadge(item.laporan_keuangan)}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            className="text-orange-600 border-orange-200 hover:bg-orange-50"
                                            onClick={() => handleOpenDetail(item, "akhir")}
                                            disabled={item.laporan_akhir === "Belum Upload"}
                                        >
                                            <Eye className="h-4 w-4 mr-2" />
                                            Validasi
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: LUARAN (OUTPUT) */}
        <TabsContent value="luaran">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg">Validasi Luaran Wajib</CardTitle>
              <CardDescription>Verifikasi bukti luaran (Publikasi Jurnal, Buku, HKI, dll).</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 uppercase font-semibold text-xs">
                            <tr>
                                <th className="px-6 py-3 w-1/3">Informasi Penelitian</th>
                                <th className="px-6 py-3">Target Luaran</th>
                                <th className="px-6 py-3 text-center">Status Validasi</th>
                                <th className="px-6 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredData.map((item) => (
                                <tr key={item.id} className="bg-white hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-900 line-clamp-2">{item.judul}</p>
                                        <div className="text-xs text-gray-500 mt-1">{item.peneliti}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="h-4 w-4 text-blue-500" />
                                            <span className="font-medium text-gray-700">{item.luaran_wajib}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {getStatusBadge(item.status_luaran)}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            className="text-purple-600 border-purple-200 hover:bg-purple-50"
                                            onClick={() => handleOpenDetail(item, "luaran")}
                                            disabled={item.status_luaran === "Belum Upload"}
                                        >
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            Cek Bukti
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* --- MODAL DETAIL / REVIEW --- */}
      {isDetailOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                    {reviewContext === "kemajuan" ? "Review Laporan Kemajuan" : 
                     reviewContext === "akhir" ? "Validasi Laporan Akhir" : "Validasi Luaran"}
                </h3>
                <p className="text-xs text-gray-500 max-w-md truncate">{selectedItem.judul}</p>
              </div>
              <button onClick={() => setIsDetailOpen(false)} className="text-gray-400 hover:text-gray-500">
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            <div className="p-6 space-y-6">
                {/* Info Peneliti */}
                <div className="grid grid-cols-2 gap-4 text-sm p-4 bg-gray-50 rounded-lg">
                    <div>
                        <span className="text-gray-500 block">Ketua Peneliti</span>
                        <span className="font-semibold text-gray-800">{selectedItem.peneliti}</span>
                    </div>
                    <div>
                        <span className="text-gray-500 block">Skema</span>
                        <span className="font-semibold text-gray-800">{selectedItem.skema}</span>
                    </div>
                </div>

                {/* Dokumen Preview Dummy */}
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                        <FileText className="h-4 w-4" /> Dokumen Terlampir
                    </h4>
                    
                    <div className="space-y-2">
                        {/* Dokumen 1 */}
                        <div className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                            <div className="flex items-center gap-3">
                                <div className="bg-red-100 p-2 rounded text-red-600 font-bold text-xs">PDF</div>
                                <div>
                                    <p className="text-sm font-medium">
                                        {reviewContext === "kemajuan" ? "Laporan_Kemajuan_70.pdf" :
                                         reviewContext === "akhir" ? "Laporan_Akhir_Lengkap.pdf" : "Bukti_Luaran_Jurnal.pdf"}
                                    </p>
                                    <p className="text-xs text-gray-500">2.4 MB • Diupload 2 hari lalu</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-blue-600">
                                <Download className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Dokumen Tambahan jika Laporan Akhir */}
                        {reviewContext === "akhir" && (
                             <div className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded text-green-600 font-bold text-xs">XLS</div>
                                    <div>
                                        <p className="text-sm font-medium">Rekap_Penggunaan_Dana_100.xlsx</p>
                                        <p className="text-xs text-gray-500">500 KB • Diupload 2 hari lalu</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" className="text-blue-600">
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                        
                        {/* Dokumen Tambahan jika Luaran */}
                        {reviewContext === "luaran" && (
                             <div className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-100 p-2 rounded text-blue-600 font-bold text-xs">URL</div>
                                    <div>
                                        <p className="text-sm font-medium">Link OJS / Repository</p>
                                        <a href="#" className="text-xs text-blue-500 underline">https://journal.univ.ac.id/index...</a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Logbook Preview (Hanya di tab kemajuan) */}
                {reviewContext === "kemajuan" && (
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                            <BookOpen className="h-4 w-4" /> Logbook Harian
                        </h4>
                        <div className="text-sm text-gray-600 border p-3 rounded bg-gray-50">
                            Peneliti telah mengisi <strong>{selectedItem.progress_logbook}%</strong> dari total hari pelaksanaan.
                            <br />
                            <span className="text-xs italic">Cek detail logbook untuk memastikan kesesuaian aktivitas.</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t flex justify-end gap-2">
              <Button 
                variant="destructive" 
                onClick={() => handleReviewAction("reject")}
              >
                <XCircle className="h-4 w-4 mr-2" /> Minta Revisi
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700" 
                onClick={() => handleReviewAction("approve")}
              >
                <CheckCircle className="h-4 w-4 mr-2" /> Setujui Laporan
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}