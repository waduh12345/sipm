"use client";

import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  UserCheck, 
  FileText, 
  CheckCircle, 
  XCircle,
  UserPlus,
  Filter,
  Eye,
  MoreHorizontal
} from "lucide-react";

// --- Tipe Data ---
type StatusProposal = "Submitted" | "Lolos Admin" | "Ditolak Admin" | "Dalam Review" | "Selesai Review";

interface Reviewer {
  id: number;
  nama: string;
  kepakaran: string;
  kuota: number; // Sisa kuota review
}

interface Proposal {
  id: number;
  judul: string;
  ketua_peneliti: string;
  skema: string;
  fakultas: string;
  status: StatusProposal;
  reviewer_1?: string; // Nama reviewer 1
  reviewer_2?: string; // Nama reviewer 2
  tanggal_submit: string;
}

// --- Data Dummy ---
const REVIEWER_LIST: Reviewer[] = [
  { id: 101, nama: "Prof. Dr. Budi Santoso", kepakaran: "Teknologi Informasi, AI", kuota: 3 },
  { id: 102, nama: "Dr. Siti Aminah, M.Kom", kepakaran: "Sistem Informasi, E-Gov", kuota: 5 },
  { id: 103, nama: "Dr. Eng. Andi Wijaya", kepakaran: "Teknik Mesin, Energi", kuota: 2 },
  { id: 104, nama: "Prof. Rina Hartati", kepakaran: "Manajemen, Ekonomi", kuota: 4 },
];

const PROPOSAL_DATA: Proposal[] = [
  { 
    id: 1, 
    judul: "Pengembangan Sistem Deteksi Dini Hama Padi Berbasis IoT", 
    ketua_peneliti: "Drs. Ahmad Dahlan, M.T.", 
    skema: "Penelitian Terapan", 
    fakultas: "Fakultas Teknik",
    status: "Submitted",
    tanggal_submit: "2024-02-10"
  },
  { 
    id: 2, 
    judul: "Model Pemberdayaan UMKM Batik di Era Digital", 
    ketua_peneliti: "Rini Suhartini, S.E., M.M.", 
    skema: "Penelitian Dosen Pemula", 
    fakultas: "Fakultas Ekonomi",
    status: "Submitted",
    tanggal_submit: "2024-02-12"
  },
  { 
    id: 3, 
    judul: "Analisis Yuridis Perlindungan Konsumen E-Commerce", 
    ketua_peneliti: "Dr. Herman Lawyer, S.H.", 
    skema: "Penelitian Dasar", 
    fakultas: "Fakultas Hukum",
    status: "Lolos Admin", // Siap di-plotting
    tanggal_submit: "2024-02-01"
  },
  { 
    id: 4, 
    judul: "Optimasi Algoritma Genetic untuk Penjadwalan Kuliah", 
    ketua_peneliti: "Fajar Shiddiq, M.Kom", 
    skema: "Penelitian Dosen Pemula", 
    fakultas: "Fakultas Ilmu Komputer",
    status: "Lolos Admin",
    reviewer_1: "Prof. Dr. Budi Santoso", // Sudah dapat 1 reviewer
    tanggal_submit: "2024-02-05"
  },
];

export default function SeleksiPlottingPage() {
  const [proposals, setProposals] = useState<Proposal[]>(PROPOSAL_DATA);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("seleksi");

  // State Modal
  const [isPlottingModalOpen, setIsPlottingModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [selectedReviewer1, setSelectedReviewer1] = useState<string>("");
  const [selectedReviewer2, setSelectedReviewer2] = useState<string>("");

  // --- Filter Data Berdasarkan Tab ---
  const filteredProposals = useMemo(() => {
    let data = proposals;

    // Filter Tab Logic
    if (activeTab === "seleksi") {
      // Tampilkan yang baru submit atau sudah diproses admin (untuk history)
      data = data.filter(p => ["Submitted", "Ditolak Admin"].includes(p.status));
    } else if (activeTab === "plotting") {
      // Tampilkan yang sudah lolos admin dan butuh reviewer
      data = data.filter(p => ["Lolos Admin", "Dalam Review"].includes(p.status));
    }

    // Filter Search
    if (query) {
      const lowerQuery = query.toLowerCase();
      data = data.filter(
        (p) =>
          p.judul.toLowerCase().includes(lowerQuery) ||
          p.ketua_peneliti.toLowerCase().includes(lowerQuery) ||
          p.skema.toLowerCase().includes(lowerQuery)
      );
    }
    return data;
  }, [proposals, query, activeTab]);

  // --- Handlers Seleksi Admin ---

  const handleApproveAdmin = async (id: number) => {
    const result = await Swal.fire({
      title: "Loloskan Seleksi Administrasi?",
      text: "Proposal akan masuk ke tahap plotting reviewer.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Loloskan",
      confirmButtonColor: "#10b981", // Emerald 500
    });

    if (result.isConfirmed) {
      setProposals(prev => prev.map(p => p.id === id ? { ...p, status: "Lolos Admin" } : p));
      Swal.fire("Berhasil", "Status proposal diubah menjadi Lolos Admin", "success");
    }
  };

  const handleRejectAdmin = async (id: number) => {
    const { value: text } = await Swal.fire({
      title: "Tolak Proposal?",
      input: "textarea",
      inputLabel: "Alasan Penolakan",
      inputPlaceholder: "Tuliskan alasan penolakan administrasi...",
      showCancelButton: true,
      confirmButtonText: "Tolak",
      confirmButtonColor: "#ef4444",
      inputValidator: (value) => {
        if (!value) return "Alasan penolakan wajib diisi!";
      }
    });

    if (text) {
      setProposals(prev => prev.map(p => p.id === id ? { ...p, status: "Ditolak Admin" } : p));
      Swal.fire("Ditolak", "Proposal telah ditolak secara administrasi.", "info");
    }
  };

  // --- Handlers Plotting Reviewer ---

  const openPlottingModal = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    // Pre-fill jika sudah ada reviewer sebelumnya
    setSelectedReviewer1(proposal.reviewer_1 ? REVIEWER_LIST.find(r => r.nama === proposal.reviewer_1)?.id.toString() || "" : "");
    setSelectedReviewer2(proposal.reviewer_2 ? REVIEWER_LIST.find(r => r.nama === proposal.reviewer_2)?.id.toString() || "" : "");
    setIsPlottingModalOpen(true);
  };

  const savePlotting = () => {
    if (!selectedProposal) return;
    if (!selectedReviewer1 && !selectedReviewer2) {
      Swal.fire("Peringatan", "Pilih minimal satu reviewer", "warning");
      return;
    }

    const r1Name = REVIEWER_LIST.find(r => r.id.toString() === selectedReviewer1)?.nama;
    const r2Name = REVIEWER_LIST.find(r => r.id.toString() === selectedReviewer2)?.nama;

    setProposals(prev => prev.map(p => 
      p.id === selectedProposal.id 
      ? { ...p, reviewer_1: r1Name, reviewer_2: r2Name, status: "Dalam Review" } 
      : p
    ));

    setIsPlottingModalOpen(false);
    Swal.fire("Berhasil", "Reviewer berhasil ditetapkan!", "success");
  };

  // Helper Badge Color
  const getStatusBadge = (status: StatusProposal) => {
    switch (status) {
      case "Submitted": return <Badge variant="secondary" className="bg-blue-100 text-blue-700">Baru Masuk</Badge>;
      case "Lolos Admin": return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Lolos Admin</Badge>;
      case "Ditolak Admin": return <Badge variant="destructive">Ditolak</Badge>;
      case "Dalam Review": return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">Dalam Review</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <UserCheck className="h-6 w-6 text-blue-600" />
            Seleksi & Plotting
          </h1>
          <p className="text-sm text-gray-500">
            Kelola seleksi administrasi proposal dan penetapan reviewer.
          </p>
        </div>
      </div>

      {/* Tabs Layout */}
      <Tabs defaultValue="seleksi" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="seleksi">Seleksi Administrasi</TabsTrigger>
          <TabsTrigger value="plotting">Plotting Reviewer</TabsTrigger>
        </TabsList>

        {/* Filter Bar Common */}
        <div className="bg-white p-4 rounded-lg border shadow-sm mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Cari judul, nama peneliti..."
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" /> Filter Lanjutan
          </Button>
        </div>

        {/* --- TAB 1: SELEKSI ADMINISTRASI --- */}
        <TabsContent value="seleksi">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Daftar Proposal Masuk</CardTitle>
              <CardDescription>Periksa kelengkapan dokumen sebelum lanjut ke tahap review.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100 text-gray-700 uppercase font-semibold text-xs border-b">
                    <tr>
                      <th className="px-6 py-4">Judul Proposal</th>
                      <th className="px-6 py-4">Peneliti & Skema</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredProposals.length === 0 ? (
                      <tr><td colSpan={4} className="text-center py-8 text-gray-500">Tidak ada proposal baru.</td></tr>
                    ) : filteredProposals.map((item) => (
                      <tr key={item.id} className="bg-white hover:bg-gray-50">
                        <td className="px-6 py-4 max-w-xs">
                          <p className="font-medium text-gray-900 line-clamp-2">{item.judul}</p>
                          <span className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <FileText className="h-3 w-3" /> Dokumen Lengkap
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-900 font-medium">{item.ketua_peneliti}</p>
                          <p className="text-xs text-gray-500">{item.fakultas}</p>
                          <Badge variant="outline" className="mt-1 text-xs font-normal">{item.skema}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(item.status)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {item.status === "Submitted" ? (
                            <div className="flex items-center justify-center gap-2">
                              <Button 
                                size="sm" 
                                className="bg-emerald-600 hover:bg-emerald-700 h-8 px-2"
                                onClick={() => handleApproveAdmin(item.id)}
                                title="Terima (Lolos Admin)"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" /> Terima
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive" 
                                className="h-8 px-2"
                                onClick={() => handleRejectAdmin(item.id)}
                                title="Tolak"
                              >
                                <XCircle className="h-4 w-4 mr-1" /> Tolak
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8" title="Lihat Detail">
                                <Eye className="h-4 w-4 text-gray-500" />
                              </Button>
                            </div>
                          ) : (
                             <span className="text-gray-400 text-xs italic">Sudah diproses</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- TAB 2: PLOTTING REVIEWER --- */}
        <TabsContent value="plotting">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Penetapan Reviewer</CardTitle>
              <CardDescription>Tentukan reviewer untuk proposal yang telah lolos seleksi administrasi.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100 text-gray-700 uppercase font-semibold text-xs border-b">
                    <tr>
                      <th className="px-6 py-4 w-1/3">Proposal Info</th>
                      <th className="px-6 py-4">Reviewer 1</th>
                      <th className="px-6 py-4">Reviewer 2</th>
                      <th className="px-6 py-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredProposals.length === 0 ? (
                      <tr><td colSpan={4} className="text-center py-8 text-gray-500">Tidak ada proposal yang perlu di-plot.</td></tr>
                    ) : filteredProposals.map((item) => (
                      <tr key={item.id} className="bg-white hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900 line-clamp-2">{item.judul}</p>
                          <div className="text-xs text-gray-500 mt-1">
                            {item.ketua_peneliti} • {item.skema}
                          </div>
                          {getStatusBadge(item.status)}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {item.reviewer_1 ? (
                            <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
                                    R1
                                </div>
                                <span className="text-sm">{item.reviewer_1}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400 italic text-xs">Belum ditentukan</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {item.reviewer_2 ? (
                            <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-600">
                                    R2
                                </div>
                                <span className="text-sm">{item.reviewer_2}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400 italic text-xs">Belum ditentukan</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                            onClick={() => openPlottingModal(item)}
                          >
                            <UserPlus className="h-4 w-4 mr-2" />
                            {item.reviewer_1 || item.reviewer_2 ? "Edit Plot" : "Plotting"}
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

      {/* --- MODAL PLOTTING REVIEWER --- */}
      {isPlottingModalOpen && selectedProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Plotting Reviewer</h3>
                <p className="text-xs text-gray-500 max-w-[300px] truncate">{selectedProposal.judul}</p>
              </div>
              <button onClick={() => setIsPlottingModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-3 bg-blue-50 rounded-md border border-blue-100 mb-4">
                <p className="text-xs text-blue-800">
                  <span className="font-semibold">Saran Sistem:</span> Berdasarkan bidang ilmu &quot;Teknologi Informasi&quot;, reviewer yang disarankan adalah Prof. Budi Santoso.
                </p>
              </div>

              {/* Select Reviewer 1 */}
              <div className="space-y-2">
                <Label>Reviewer 1</Label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={selectedReviewer1}
                  onChange={(e) => setSelectedReviewer1(e.target.value)}
                >
                  <option value="">-- Pilih Reviewer 1 --</option>
                  {REVIEWER_LIST.map((r) => (
                    <option key={r.id} value={r.id} disabled={selectedReviewer2 === r.id.toString()}>
                      {r.nama} (Kuota: {r.kuota}) - {r.kepakaran}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Reviewer 2 */}
              <div className="space-y-2">
                <Label>Reviewer 2 (Opsional)</Label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={selectedReviewer2}
                  onChange={(e) => setSelectedReviewer2(e.target.value)}
                >
                  <option value="">-- Pilih Reviewer 2 --</option>
                  {REVIEWER_LIST.map((r) => (
                    <option key={r.id} value={r.id} disabled={selectedReviewer1 === r.id.toString()}>
                      {r.nama} (Kuota: {r.kuota}) - {r.kepakaran}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsPlottingModalOpen(false)}>
                Batal
              </Button>
              <Button onClick={savePlotting} className="bg-blue-600 hover:bg-blue-700">
                Simpan Plotting
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}