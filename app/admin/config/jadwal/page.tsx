"use client";

import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  CalendarDays,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle
} from "lucide-react";

// --- Tipe Data Jadwal ---
interface JadwalUsulan {
  id: number;
  nama_kegiatan: string;
  tahun_anggaran: string;
  tgl_mulai_pengajuan: string;
  tgl_akhir_pengajuan: string;
  tgl_mulai_review: string;
  tgl_akhir_review: string;
  status: boolean; // True = Buka, False = Tutup
}

// --- Data Dummy Jadwal ---
const DUMMY_DATA: JadwalUsulan[] = [
  { 
    id: 1, 
    nama_kegiatan: "Hibah Penelitian Internal Batch 1", 
    tahun_anggaran: "2024",
    tgl_mulai_pengajuan: "2024-01-15", 
    tgl_akhir_pengajuan: "2024-02-28", 
    tgl_mulai_review: "2024-03-01", 
    tgl_akhir_review: "2024-03-15", 
    status: false 
  },
  { 
    id: 2, 
    nama_kegiatan: "Hibah Pengabdian Masyarakat Semester Genap", 
    tahun_anggaran: "2024",
    tgl_mulai_pengajuan: "2024-06-01", 
    tgl_akhir_pengajuan: "2024-07-15", 
    tgl_mulai_review: "2024-07-16", 
    tgl_akhir_review: "2024-07-30", 
    status: true 
  },
  { 
    id: 3, 
    nama_kegiatan: "Program Kreativitas Mahasiswa (Internal)", 
    tahun_anggaran: "2024",
    tgl_mulai_pengajuan: "2024-08-01", 
    tgl_akhir_pengajuan: "2024-08-31", 
    tgl_mulai_review: "2024-09-01", 
    tgl_akhir_review: "2024-09-10", 
    status: false 
  },
];

export default function KonfigurasiJadwalPage() {
  // State Data
  const [dataList, setDataList] = useState<JadwalUsulan[]>(DUMMY_DATA);
  const [query, setQuery] = useState("");
  
  // State Modal & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // State Form Data
  const [formData, setFormData] = useState<Partial<JadwalUsulan>>({
    nama_kegiatan: "",
    tahun_anggaran: new Date().getFullYear().toString(),
    tgl_mulai_pengajuan: "",
    tgl_akhir_pengajuan: "",
    tgl_mulai_review: "",
    tgl_akhir_review: "",
    status: true,
  });

  // Filter Data
  const filteredData = useMemo(() => {
    if (!query) return dataList;
    const lowerQuery = query.toLowerCase();
    return dataList.filter(
      (item) =>
        item.nama_kegiatan.toLowerCase().includes(lowerQuery) ||
        item.tahun_anggaran.includes(lowerQuery)
    );
  }, [dataList, query]);

  // --- Handlers ---

  const handleOpenModal = (item?: JadwalUsulan) => {
    if (item) {
      // Mode Edit
      setIsEditing(true);
      setFormData({ ...item });
    } else {
      // Mode Tambah
      setIsEditing(false);
      setFormData({
        nama_kegiatan: "",
        tahun_anggaran: new Date().getFullYear().toString(),
        tgl_mulai_pengajuan: "",
        tgl_akhir_pengajuan: "",
        tgl_mulai_review: "",
        tgl_akhir_review: "",
        status: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({});
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi sederhana
    if (!formData.nama_kegiatan || !formData.tgl_mulai_pengajuan || !formData.tgl_akhir_pengajuan) {
      Swal.fire("Error", "Nama Kegiatan dan Tanggal Pengajuan wajib diisi!", "error");
      return;
    }

    if (isEditing && formData.id) {
      // Update Data (Simulasi)
      const updatedList = dataList.map((item) => 
        item.id === formData.id ? { ...item, ...formData } as JadwalUsulan : item
      );
      setDataList(updatedList);
      Swal.fire("Sukses", "Jadwal kegiatan berhasil diperbarui", "success");
    } else {
      // Create Data (Simulasi)
      const newItem: JadwalUsulan = {
        ...formData as JadwalUsulan,
        id: Math.random(), 
      };
      setDataList([newItem, ...dataList]);
      Swal.fire("Sukses", "Jadwal kegiatan baru berhasil ditambahkan", "success");
    }

    handleCloseModal();
  };

  const handleDelete = async (item: JadwalUsulan) => {
    const result = await Swal.fire({
      title: "Hapus Jadwal?",
      text: `Anda yakin ingin menghapus jadwal "${item.nama_kegiatan}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      const filtered = dataList.filter((d) => d.id !== item.id);
      setDataList(filtered);
      Swal.fire("Terhapus!", "Data jadwal telah dihapus.", "success");
    }
  };

  // Helper format tanggal indo
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-blue-600" />
            Konfigurasi Jadwal Usulan
          </h1>
          <p className="text-sm text-gray-500">
            Atur periode pembukaan proposal, seleksi, dan review kegiatan.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Tambah Jadwal
        </Button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-lg border shadow-sm flex items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Cari nama kegiatan..."
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabel Data */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase font-semibold text-xs border-b">
                <tr>
                  <th className="px-6 py-4">Nama Kegiatan</th>
                  <th className="px-6 py-4">Masa Pengajuan</th>
                  <th className="px-6 py-4">Masa Review</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">
                      Tidak ada jadwal kegiatan ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{item.nama_kegiatan}</div>
                        <div className="text-xs text-gray-500 mt-1">TA: {item.tahun_anggaran}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700 text-xs md:text-sm">
                           <Calendar className="h-4 w-4 text-blue-500" />
                           <span>{formatDate(item.tgl_mulai_pengajuan)} - {formatDate(item.tgl_akhir_pengajuan)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700 text-xs md:text-sm">
                           <Clock className="h-4 w-4 text-orange-500" />
                           <span>{formatDate(item.tgl_mulai_review)} - {formatDate(item.tgl_akhir_review)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.status ? (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-200 shadow-none border-green-200 gap-1 pl-1 pr-2">
                             <CheckCircle2 className="h-3 w-3" /> Buka
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="bg-gray-100 text-gray-500 hover:bg-gray-200 border-gray-200 shadow-none gap-1 pl-1 pr-2">
                             <XCircle className="h-3 w-3" /> Tutup
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            onClick={() => handleOpenModal(item)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(item)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* --- MODAL FORM (INLINE) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {isEditing ? "Edit Jadwal Kegiatan" : "Tambah Jadwal Baru"}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-500">
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSave}>
              <div className="p-6 space-y-4">
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Field Tahun Anggaran */}
                    <div className="space-y-2 md:col-span-1">
                      <Label htmlFor="tahun">Tahun</Label>
                      <Input 
                        id="tahun" 
                        type="number"
                        placeholder="2024" 
                        value={formData.tahun_anggaran}
                        onChange={(e) => setFormData({...formData, tahun_anggaran: e.target.value})}
                        required
                      />
                    </div>
                    
                    {/* Field Nama Kegiatan */}
                    <div className="space-y-2 md:col-span-3">
                      <Label htmlFor="nama">Nama Kegiatan</Label>
                      <Input 
                        id="nama" 
                        placeholder="Contoh: Hibah Penelitian Internal Batch 2" 
                        value={formData.nama_kegiatan}
                        onChange={(e) => setFormData({...formData, nama_kegiatan: e.target.value})}
                        required
                      />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Group Tanggal Pengajuan */}
                    <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <h4 className="font-semibold text-sm text-blue-800 flex items-center gap-2">
                            <Calendar className="h-4 w-4" /> Masa Pengajuan (Upload)
                        </h4>
                        <div className="space-y-2">
                            <Label htmlFor="tgl_mulai_pengajuan" className="text-xs">Tanggal Buka</Label>
                            <Input 
                                id="tgl_mulai_pengajuan" 
                                type="date"
                                value={formData.tgl_mulai_pengajuan}
                                onChange={(e) => setFormData({...formData, tgl_mulai_pengajuan: e.target.value})}
                                required
                                className="bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tgl_akhir_pengajuan" className="text-xs">Tanggal Tutup</Label>
                            <Input 
                                id="tgl_akhir_pengajuan" 
                                type="date"
                                value={formData.tgl_akhir_pengajuan}
                                onChange={(e) => setFormData({...formData, tgl_akhir_pengajuan: e.target.value})}
                                required
                                className="bg-white"
                            />
                        </div>
                    </div>

                    {/* Group Tanggal Review */}
                    <div className="space-y-3 p-4 bg-orange-50 rounded-lg border border-orange-100">
                        <h4 className="font-semibold text-sm text-orange-800 flex items-center gap-2">
                            <Clock className="h-4 w-4" /> Masa Review & Seleksi
                        </h4>
                        <div className="space-y-2">
                            <Label htmlFor="tgl_mulai_review" className="text-xs">Mulai Review</Label>
                            <Input 
                                id="tgl_mulai_review" 
                                type="date"
                                value={formData.tgl_mulai_review}
                                onChange={(e) => setFormData({...formData, tgl_mulai_review: e.target.value})}
                                required
                                className="bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tgl_akhir_review" className="text-xs">Selesai Review</Label>
                            <Input 
                                id="tgl_akhir_review" 
                                type="date"
                                value={formData.tgl_akhir_review}
                                onChange={(e) => setFormData({...formData, tgl_akhir_review: e.target.value})}
                                required
                                className="bg-white"
                            />
                        </div>
                    </div>
                </div>

                {/* Field Status */}
                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="status"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                  />
                  <Label htmlFor="status" className="font-normal cursor-pointer">
                    Status Aktif (Buka Pendaftaran)
                  </Label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleCloseModal}>
                  Batal
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {isEditing ? "Simpan Perubahan" : "Buat Jadwal"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}