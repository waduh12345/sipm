"use client";

import { useState, useMemo } from "react";
import Swal from "sweetalert2";
import {
  FileText,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  Download,
  Star,
  Save,
  X,
  Calculator
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// --- Types ---
type StatusReview = "Pending" | "Selesai";

interface ProposalReview {
  id: string;
  judul: string;
  ketua_peneliti: string;
  institusi: string;
  skema: string;
  tahun: string;
  tanggal_masuk: string;
  abstrak: string;
  file_proposal: string;
  status: StatusReview;
  nilai_akhir?: number;
  rekomendasi?: "Diterima" | "Revisi Mayor" | "Revisi Minor" | "Ditolak";
}

interface RubrikPenilaian {
  id: string;
  kriteria: string;
  bobot: number; // Dalam persen (misal 30)
  skor: number; // 0-100
  keterangan?: string;
}

// --- Dummy Data ---
const DATA_PROPOSAL: ProposalReview[] = [
  {
    id: "REV-001",
    judul: "Pengembangan Sistem Deteksi Dini Hama Padi Berbasis IoT dan Deep Learning",
    ketua_peneliti: "Dr. Budi Santoso, M.Kom",
    institusi: "Fakultas Ilmu Komputer",
    skema: "Penelitian Terapan",
    tahun: "2024",
    tanggal_masuk: "2024-02-20",
    abstrak: "Penelitian ini bertujuan mengembangkan sistem IoT yang terintegrasi dengan algoritma CNN untuk mendeteksi jenis hama pada tanaman padi secara real-time...",
    file_proposal: "Proposal_IoT_Padi.pdf",
    status: "Pending"
  },
  {
    id: "REV-002",
    judul: "Model Pemberdayaan Ekonomi Kreatif Pesisir Berbasis Kearifan Lokal",
    ketua_peneliti: "Siti Aminah, S.E., M.M.",
    institusi: "Fakultas Ekonomi",
    skema: "Pengabdian Masyarakat",
    tahun: "2024",
    tanggal_masuk: "2024-02-22",
    abstrak: "Program ini fokus pada pendampingan kelompok nelayan istri dalam mengolah limbah kerang menjadi kerajinan bernilai ekspor...",
    file_proposal: "Proposal_PKM_Pesisir.pdf",
    status: "Pending"
  },
  {
    id: "REV-003",
    judul: "Analisis Yuridis Perlindungan Data Pribadi di Era Fintech",
    ketua_peneliti: "Herman Lawyer, S.H., M.H.",
    institusi: "Fakultas Hukum",
    skema: "Penelitian Dasar",
    tahun: "2024",
    tanggal_masuk: "2024-02-15",
    abstrak: "Mengkaji celah hukum dalam UU PDP terkait penyalahgunaan data nasabah oleh aplikasi pinjaman online ilegal...",
    file_proposal: "Proposal_Hukum_Fintech.pdf",
    status: "Selesai",
    nilai_akhir: 85.5,
    rekomendasi: "Diterima"
  }
];

// Rubrik Standar
const INITIAL_RUBRIC: RubrikPenilaian[] = [
  { id: "k1", kriteria: "Relevansi & Urgensi Penelitian", bobot: 20, skor: 0 },
  { id: "k2", kriteria: "Tinjauan Pustaka & State of the Art", bobot: 15, skor: 0 },
  { id: "k3", kriteria: "Metodologi Penelitian", bobot: 25, skor: 0 },
  { id: "k4", kriteria: "Kelayakan Luaran (Output)", bobot: 20, skor: 0 },
  { id: "k5", kriteria: "Kewajaran RAB & Jadwal", bobot: 20, skor: 0 },
];

export default function PenilaianReviewerPage() {
  const [proposals, setProposals] = useState<ProposalReview[]>(DATA_PROPOSAL);
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  
  // State Modal & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<ProposalReview | null>(null);
  const [rubric, setRubric] = useState<RubrikPenilaian[]>(INITIAL_RUBRIC);
  const [catatan, setCatatan] = useState("");
  const [rekomendasi, setRekomendasi] = useState("");

  // --- Helpers ---
  const filteredData = useMemo(() => {
    let data = proposals;
    if (activeTab === "pending") {
      data = data.filter(p => p.status === "Pending");
    } else {
      data = data.filter(p => p.status === "Selesai");
    }
    
    if (searchQuery) {
      data = data.filter(p => p.judul.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return data;
  }, [proposals, activeTab, searchQuery]);

  const totalScore = useMemo(() => {
    return rubric.reduce((acc, item) => acc + (item.skor * item.bobot / 100), 0);
  }, [rubric]);

  // --- Handlers ---
  const handleOpenReview = (proposal: ProposalReview) => {
    setSelectedProposal(proposal);
    // Jika sudah selesai, load nilai (mock logic here, in real app fetch from DB)
    if (proposal.status === "Selesai") {
        // Mock loading existing score
        setRubric(INITIAL_RUBRIC.map(r => ({...r, skor: 85}))); // Dummy score
        setCatatan("Proposal sangat baik, namun perlu penajaman di metode.");
        setRekomendasi(proposal.rekomendasi || "");
    } else {
        // Reset form for new review
        setRubric(INITIAL_RUBRIC.map(r => ({...r, skor: 0})));
        setCatatan("");
        setRekomendasi("");
    }
    setIsModalOpen(true);
  };

  const handleScoreChange = (id: string, val: number) => {
    // Limit 0-100
    const score = Math.min(100, Math.max(0, val));
    setRubric(prev => prev.map(item => item.id === id ? { ...item, skor: score } : item));
  };

  const handleSubmitReview = () => {
    if (!rekomendasi) {
      Swal.fire("Peringatan", "Mohon pilih rekomendasi akhir.", "warning");
      return;
    }

    Swal.fire({
      title: "Simpan Penilaian?",
      text: `Total Skor: ${totalScore.toFixed(2)}. Data tidak dapat diubah setelah disimpan.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Simpan",
      confirmButtonColor: "#2563eb",
    }).then((result) => {
      if (result.isConfirmed) {
        // Update Local State (Mock)
        setProposals(prev => prev.map(p => 
            p.id === selectedProposal?.id 
            ? { ...p, status: "Selesai", nilai_akhir: totalScore, rekomendasi: rekomendasi as "Ditolak" | "Revisi Mayor" | "Revisi Minor" | "Diterima" } 
            : p
        ));
        setIsModalOpen(false);
        Swal.fire("Berhasil", "Penilaian berhasil dikirim.", "success");
      }
    });
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Star className="h-6 w-6 text-purple-600" />
            Penilaian Usulan
          </h1>
          <p className="text-sm text-gray-500">
            Daftar proposal yang perlu Anda review dan beri penilaian.
          </p>
        </div>
      </div>

      {/* Tabs & List */}
      {!isModalOpen ? (
        <Tabs defaultValue="pending" className="w-full" onValueChange={setActiveTab}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <TabsList className="grid w-full md:w-[400px] grid-cols-2">
                    <TabsTrigger value="pending">Belum Dinilai ({DATA_PROPOSAL.filter(p => p.status === "Pending").length})</TabsTrigger>
                    <TabsTrigger value="selesai">Riwayat Penilaian</TabsTrigger>
                </TabsList>

                <div className="relative w-full md:w-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input 
                        placeholder="Cari judul proposal..." 
                        className="pl-9 bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <TabsContent value="pending" className="mt-0 space-y-4">
                {filteredData.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg border border-dashed">
                        <CheckCircle className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">Semua tugas selesai!</h3>
                        <p className="text-gray-500 text-sm">Tidak ada proposal yang menunggu penilaian Anda.</p>
                    </div>
                ) : (
                    filteredData.map((item) => (
                        <ProposalCard key={item.id} item={item} onAction={() => handleOpenReview(item)} />
                    ))
                )}
            </TabsContent>

            <TabsContent value="selesai" className="mt-0 space-y-4">
                 {filteredData.map((item) => (
                    <ProposalCard key={item.id} item={item} onAction={() => handleOpenReview(item)} isHistory />
                ))}
            </TabsContent>
        </Tabs>
      ) : (
        
        // --- REVIEW MODAL / PAGE ---
        <div className="animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)} className="pl-0 hover:bg-transparent text-gray-500 hover:text-gray-900">
                    ← Kembali ke Daftar
                </Button>
                {selectedProposal?.status === "Selesai" && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" /> Sudah Dinilai
                    </Badge>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Kolom Kiri: Detail Proposal */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="border-t-4 border-t-purple-600 shadow-sm">
                        <CardHeader>
                            <Badge className="w-fit mb-2">{selectedProposal?.skema}</Badge>
                            <CardTitle className="text-lg leading-snug">{selectedProposal?.judul}</CardTitle>
                            <CardDescription>
                                Oleh: <span className="font-semibold text-gray-900">{selectedProposal?.ketua_peneliti}</span>
                                <br />
                                {selectedProposal?.institusi}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="bg-gray-50 p-3 rounded-md">
                                <span className="font-semibold text-gray-700 block mb-1">Abstrak</span>
                                <p className="text-gray-600 line-clamp-6 italic">&quot;{selectedProposal?.abstrak}&quot;</p>
                            </div>
                            
                            <Separator />

                            <div>
                                <span className="font-semibold text-gray-700 block mb-2">Dokumen Pendukung</span>
                                <Button variant="outline" className="w-full justify-start text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100">
                                    <FileText className="h-4 w-4 mr-2" /> 
                                    {selectedProposal?.file_proposal}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Kolom Kanan: Form Penilaian */}
                <Card className="lg:col-span-2 shadow-sm">
                    <CardHeader className="bg-gray-50/50 pb-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Calculator className="h-5 w-5 text-gray-500" /> Form Penilaian
                                </CardTitle>
                                <CardDescription>Berikan skor 0-100 untuk setiap kriteria.</CardDescription>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Total Skor</p>
                                <span className={`text-3xl font-bold ${totalScore >= 70 ? 'text-green-600' : 'text-orange-600'}`}>
                                    {totalScore.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="p-6 space-y-6">
                            {/* Rubrik Table */}
                            <div className="space-y-4">
                                {rubric.map((item) => (
                                    <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
                                        <div className="col-span-8 md:col-span-9">
                                            <Label htmlFor={item.id} className="text-base font-medium">{item.kriteria}</Label>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant="secondary" className="text-xs font-normal">Bobot: {item.bobot}%</Badge>
                                            </div>
                                        </div>
                                        <div className="col-span-4 md:col-span-3">
                                            <div className="relative">
                                                <Input 
                                                    id={item.id}
                                                    type="number" 
                                                    min="0" 
                                                    max="100"
                                                    className="pr-8 font-bold text-right"
                                                    value={item.skor}
                                                    onChange={(e) => handleScoreChange(item.id, parseFloat(e.target.value))}
                                                    disabled={selectedProposal?.status === "Selesai"}
                                                />
                                                <span className="absolute right-3 top-2 text-xs text-gray-400">/100</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Separator />

                            {/* Rekomendasi & Catatan */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Rekomendasi Reviewer</Label>
                                    <select 
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={rekomendasi}
                                        onChange={(e) => setRekomendasi(e.target.value)}
                                        disabled={selectedProposal?.status === "Selesai"}
                                    >
                                        <option value="">-- Pilih Rekomendasi --</option>
                                        <option value="Diterima">Diterima</option>
                                        <option value="Revisi Minor">Diterima dengan Revisi Minor</option>
                                        <option value="Revisi Mayor">Diterima dengan Revisi Mayor</option>
                                        <option value="Ditolak">Ditolak</option>
                                    </select>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Catatan / Masukan (Wajib)</Label>
                                    <Textarea 
                                        placeholder="Tuliskan masukan konstruktif untuk peneliti..."
                                        className="min-h-[100px]"
                                        value={catatan}
                                        onChange={(e) => setCatatan(e.target.value)}
                                        disabled={selectedProposal?.status === "Selesai"}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer Action */}
                        {selectedProposal?.status !== "Selesai" && (
                            <div className="bg-gray-50 px-6 py-4 border-t flex justify-end gap-3">
                                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Batal</Button>
                                <Button onClick={handleSubmitReview} className="bg-purple-600 hover:bg-purple-700">
                                    <Save className="h-4 w-4 mr-2" /> Simpan Penilaian
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
      )}
    </div>
  );
}

// --- Sub-Component: Proposal Card ---
function ProposalCard({ item, onAction, isHistory }: { item: ProposalReview, onAction: () => void, isHistory?: boolean }) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
                    <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-gray-500">{item.skema}</Badge>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Clock className="h-3 w-3" /> Masuk: {item.tanggal_masuk}
                            </span>
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{item.judul}</h3>
                        <div className="text-sm text-gray-600">
                            <span className="font-medium text-gray-900">{item.ketua_peneliti}</span> • {item.institusi}
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-3 min-w-[140px]">
                        {isHistory ? (
                            <div className="text-right">
                                <span className="text-xs text-gray-500 uppercase font-semibold">Nilai Akhir</span>
                                <div className="text-2xl font-bold text-purple-700">{item.nilai_akhir}</div>
                                <Badge className={
                                    item.rekomendasi === "Ditolak" ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-green-100 text-green-700 hover:bg-green-200"
                                }>
                                    {item.rekomendasi}
                                </Badge>
                            </div>
                        ) : (
                            <Button onClick={onAction} className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto">
                                Nilai Sekarang <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        )}
                        
                        {isHistory && (
                             <Button variant="outline" size="sm" onClick={onAction} className="w-full">
                                Lihat Detail
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}