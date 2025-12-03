"use client";

import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  Lightbulb, 
  CalendarRange,
  Target
} from "lucide-react";

// --- Tipe Data Tema Riset ---
interface TemaRiset {
  id: number;
  judul_tema: string;
  tahun: string;
  deskripsi: string;
  status: boolean;
}

// --- Data Dummy Tema ---
const DUMMY_DATA: TemaRiset[] = [
  { 
    id: 1, 
    judul_tema: "Ketahanan Pangan dan Energi Baru Terbarukan", 
    tahun: "2024", 
    deskripsi: "Fokus pada pengembangan varietas tanaman unggul dan pemanfaatan energi surya/biomassa.", 
    status: true 
  },
  { 
    id: 2, 
    judul_tema: "Transformasi Digital UMKM & Ekonomi Kreatif", 
    tahun: "2024", 
    deskripsi: "Implementasi teknologi tepat guna untuk peningkatan daya saing usaha kecil menengah.", 
    status: true 
  },
  { 
    id: 3, 
    judul_tema: "Kesehatan Masyarakat & Penanggulangan Stunting", 
    tahun: "2024", 
    deskripsi: "Penyuluhan, pengembangan suplemen makanan, dan sistem monitoring kesehatan ibu anak.", 
    status: true 
  },
  { 
    id: 4, 
    judul_tema: "Mitigasi Bencana & Lingkungan Hidup", 
    tahun: "2023", 
    deskripsi: "Sistem peringatan dini dan rehabilitasi lahan kritis.", 
    status: false 
  },
];

export default function KonfigurasiTemaPage() {
  // State Data
  const [dataList, setDataList] = useState<TemaRiset[]>(DUMMY_DATA);
  const [query, setQuery] = useState("");
  
  // State Modal & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // State Form Data
  const [formData, setFormData] = useState<Partial<TemaRiset>>({
    judul_tema: "",
    tahun: new Date().getFullYear().toString(),
    deskripsi: "",
    status: true,
  });

  // Filter Data
  const filteredData = useMemo(() => {
    if (!query) return dataList;
    const lowerQuery = query.toLowerCase();
    return dataList.filter(
      (item) =>
        item.judul_tema.toLowerCase().includes(lowerQuery) ||
        item.tahun.includes(lowerQuery)
    );
  }, [dataList, query]);

  // --- Handlers ---

  const handleOpenModal = (item?: TemaRiset) => {
    if (item) {
      // Mode Edit
      setIsEditing(true);
      setFormData({ ...item });
    } else {
      // Mode Tambah
      setIsEditing(false);
      setFormData({
        judul_tema: "",
        tahun: new Date().getFullYear().toString(),
        deskripsi: "",
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
    if (!formData.judul_tema || !formData.tahun) {
      Swal.fire("Error", "Judul Tema dan Tahun wajib diisi!", "error");
      return;
    }

    if (isEditing && formData.id) {
      // Update Data
      const updatedList = dataList.map((item) => 
        item.id === formData.id ? { ...item, ...formData } as TemaRiset : item
      );
      setDataList(updatedList);
      Swal.fire("Sukses", "Data tema riset berhasil diperbarui", "success");
    } else {
      // Create Data
      const newItem: TemaRiset = {
        ...formData as TemaRiset,
        id: Math.random(), 
      };
      setDataList([newItem, ...dataList]);
      Swal.fire("Sukses", "Tema riset baru berhasil ditambahkan", "success");
    }

    handleCloseModal();
  };

  const handleDelete = async (item: TemaRiset) => {
    const result = await Swal.fire({
      title: "Hapus Tema?",
      text: `Anda yakin ingin menghapus tema "${item.judul_tema}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      const filtered = dataList.filter((d) => d.id !== item.id);
      setDataList(filtered);
      Swal.fire("Terhapus!", "Data tema telah dihapus.", "success");
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-blue-600" />
            Konfigurasi Tema Riset
          </h1>
          <p className="text-sm text-gray-500">
            Tentukan fokus dan tema unggulan penelitian/pengabdian untuk tahun berjalan.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Tambah Tema
        </Button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-lg border shadow-sm flex items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Cari tema atau tahun..."
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
                  <th className="px-6 py-4 w-[100px]">Tahun</th>
                  <th className="px-6 py-4">Judul Tema Unggulan</th>
                  <th className="px-6 py-4">Deskripsi / Fokus</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">
                      Tidak ada data tema riset ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
                          {item.tahun}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {item.judul_tema}
                      </td>
                      <td className="px-6 py-4 text-gray-600 max-w-md truncate" title={item.deskripsi}>
                        {item.deskripsi || "-"}
                      </td>
                      <td className="px-6 py-4">
                        {item.status ? (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-200 shadow-none">Aktif</Badge>
                        ) : (
                          <Badge variant="destructive" className="shadow-none">Non-Aktif</Badge>
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
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {isEditing ? "Edit Tema Riset" : "Tambah Tema Riset"}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-500">
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSave}>
              <div className="p-6 space-y-4">
                
                {/* Field Tahun */}
                <div className="space-y-2">
                  <Label htmlFor="tahun">Tahun Pelaksanaan</Label>
                  <div className="relative">
                    <CalendarRange className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input 
                        id="tahun" 
                        type="number"
                        placeholder="2024" 
                        className="pl-9 w-full sm:w-1/3"
                        value={formData.tahun}
                        onChange={(e) => setFormData({...formData, tahun: e.target.value})}
                        required
                    />
                  </div>
                </div>

                {/* Field Judul Tema */}
                <div className="space-y-2">
                  <Label htmlFor="judul">Judul Tema Unggulan</Label>
                  <div className="relative">
                    <Target className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input 
                        id="judul" 
                        placeholder="Contoh: Ketahanan Pangan Lokal" 
                        className="pl-9"
                        value={formData.judul_tema}
                        onChange={(e) => setFormData({...formData, judul_tema: e.target.value})}
                        required
                    />
                  </div>
                </div>

                {/* Field Deskripsi */}
                <div className="space-y-2">
                  <Label htmlFor="deskripsi">Deskripsi & Fokus Riset</Label>
                  <Textarea 
                    id="deskripsi" 
                    placeholder="Jelaskan ruang lingkup atau fokus spesifik dari tema ini..." 
                    className="resize-none"
                    rows={4}
                    value={formData.deskripsi}
                    onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                  />
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
                    Status Aktif (Tampil di pilihan pengusul)
                  </Label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleCloseModal}>
                  Batal
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {isEditing ? "Simpan Perubahan" : "Simpan Data"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}