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
  Layers, 
  Coins, 
  Target,
  BookOpen,
  Users
} from "lucide-react";

// --- Tipe Data Skema ---
interface SkemaHibah {
  id: number;
  nama_skema: string;
  klaster: "Penelitian" | "Pengabdian";
  plafon_dana: number;
  target_tkt: string; // Tingkat Kesiapterapan Teknologi
  syarat_ketua: string; // Misal: Minimal Lektor
  status: boolean;
}

// --- Data Dummy Skema ---
const DUMMY_DATA: SkemaHibah[] = [
  { 
    id: 1, 
    nama_skema: "Penelitian Dosen Pemula (PDP)", 
    klaster: "Penelitian", 
    plafon_dana: 20000000, 
    target_tkt: "1 - 3", 
    syarat_ketua: "Asisten Ahli", 
    status: true 
  },
  { 
    id: 2, 
    nama_skema: "Penelitian Terapan Unggulan", 
    klaster: "Penelitian", 
    plafon_dana: 50000000, 
    target_tkt: "4 - 6", 
    syarat_ketua: "Lektor", 
    status: true 
  },
  { 
    id: 3, 
    nama_skema: "Pengabdian Desa Binaan", 
    klaster: "Pengabdian", 
    plafon_dana: 15000000, 
    target_tkt: "-", 
    syarat_ketua: "Semua Jenjang", 
    status: true 
  },
  { 
    id: 4, 
    nama_skema: "Program Kemitraan Masyarakat", 
    klaster: "Pengabdian", 
    plafon_dana: 25000000, 
    target_tkt: "-", 
    syarat_ketua: "Lektor", 
    status: false 
  },
];

export default function KonfigurasiKlasterPage() {
  // State Data
  const [dataList, setDataList] = useState<SkemaHibah[]>(DUMMY_DATA);
  const [query, setQuery] = useState("");
  
  // State Modal & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // State Form Data
  const [formData, setFormData] = useState<Partial<SkemaHibah>>({
    nama_skema: "",
    klaster: "Penelitian",
    plafon_dana: 0,
    target_tkt: "",
    syarat_ketua: "",
    status: true,
  });

  // Filter Data
  const filteredData = useMemo(() => {
    if (!query) return dataList;
    const lowerQuery = query.toLowerCase();
    return dataList.filter(
      (item) =>
        item.nama_skema.toLowerCase().includes(lowerQuery) ||
        item.klaster.toLowerCase().includes(lowerQuery)
    );
  }, [dataList, query]);

  // --- Helpers ---
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // --- Handlers ---

  const handleOpenModal = (item?: SkemaHibah) => {
    if (item) {
      // Mode Edit
      setIsEditing(true);
      setFormData({ ...item });
    } else {
      // Mode Tambah
      setIsEditing(false);
      setFormData({
        nama_skema: "",
        klaster: "Penelitian",
        plafon_dana: 0,
        target_tkt: "",
        syarat_ketua: "",
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
    if (!formData.nama_skema || !formData.plafon_dana) {
      Swal.fire("Error", "Nama Skema dan Plafon Dana wajib diisi!", "error");
      return;
    }

    if (isEditing && formData.id) {
      // Update Data
      const updatedList = dataList.map((item) => 
        item.id === formData.id ? { ...item, ...formData } as SkemaHibah : item
      );
      setDataList(updatedList);
      Swal.fire("Sukses", "Data skema berhasil diperbarui", "success");
    } else {
      // Create Data
      const newItem: SkemaHibah = {
        ...formData as SkemaHibah,
        id: Math.random(), 
      };
      setDataList([...dataList, newItem]);
      Swal.fire("Sukses", "Skema baru berhasil ditambahkan", "success");
    }

    handleCloseModal();
  };

  const handleDelete = async (item: SkemaHibah) => {
    const result = await Swal.fire({
      title: "Hapus Skema?",
      text: `Anda yakin ingin menghapus skema "${item.nama_skema}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      const filtered = dataList.filter((d) => d.id !== item.id);
      setDataList(filtered);
      Swal.fire("Terhapus!", "Data skema telah dihapus.", "success");
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Layers className="h-6 w-6 text-blue-600" />
            Konfigurasi Klaster & Skema
          </h1>
          <p className="text-sm text-gray-500">
            Atur jenis skema hibah, plafon dana maksimal, dan syarat pengajuan.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Tambah Skema
        </Button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-lg border shadow-sm flex items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Cari nama skema atau klaster..."
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
                  <th className="px-6 py-4">Nama Skema</th>
                  <th className="px-6 py-4">Klaster</th>
                  <th className="px-6 py-4">Plafon Dana</th>
                  <th className="px-6 py-4">Syarat & Target</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      Tidak ada data skema ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {item.nama_skema}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className={
                            item.klaster === "Penelitian" 
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-orange-50 text-orange-700 border-orange-200"
                        }>
                          {item.klaster}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 font-mono font-medium text-gray-700">
                        {formatCurrency(item.plafon_dana)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 text-xs text-gray-600">
                            <span className="flex items-center gap-1" title="Target TKT">
                                <Target className="h-3 w-3 text-red-500" /> 
                                TKT: {item.target_tkt || "-"}
                            </span>
                            <span className="flex items-center gap-1" title="Syarat Ketua">
                                <Users className="h-3 w-3 text-blue-500" /> 
                                {item.syarat_ketua}
                            </span>
                        </div>
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
                {isEditing ? "Edit Skema Hibah" : "Tambah Skema Baru"}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-500">
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSave}>
              <div className="p-6 space-y-4">
                
                {/* Field Klaster */}
                <div className="space-y-2">
                    <Label htmlFor="klaster">Klaster Kegiatan</Label>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer border p-3 rounded-md w-full hover:bg-gray-50">
                            <input 
                                type="radio" 
                                name="klaster" 
                                value="Penelitian"
                                checked={formData.klaster === "Penelitian"}
                                onChange={() => setFormData({...formData, klaster: "Penelitian"})}
                                className="text-blue-600"
                            />
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-gray-500" />
                                <span className="text-sm font-medium">Penelitian</span>
                            </div>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer border p-3 rounded-md w-full hover:bg-gray-50">
                            <input 
                                type="radio" 
                                name="klaster" 
                                value="Pengabdian"
                                checked={formData.klaster === "Pengabdian"}
                                onChange={() => setFormData({...formData, klaster: "Pengabdian"})}
                                className="text-blue-600"
                            />
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-gray-500" />
                                <span className="text-sm font-medium">Pengabdian</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Field Nama Skema */}
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Skema</Label>
                  <Input 
                    id="nama" 
                    placeholder="Contoh: Penelitian Dosen Pemula" 
                    value={formData.nama_skema}
                    onChange={(e) => setFormData({...formData, nama_skema: e.target.value})}
                    required
                  />
                </div>

                {/* Field Plafon Dana */}
                <div className="space-y-2">
                  <Label htmlFor="plafon">Plafon Dana Maksimal (Rp)</Label>
                  <div className="relative">
                    <Coins className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input 
                      id="plafon" 
                      type="number"
                      placeholder="0" 
                      className="pl-9"
                      value={formData.plafon_dana}
                      onChange={(e) => setFormData({...formData, plafon_dana: Number(e.target.value)})}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 text-right">
                    {formatCurrency(formData.plafon_dana || 0)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Field TKT */}
                    <div className="space-y-2">
                        <Label htmlFor="tkt">Target TKT</Label>
                        <Input 
                            id="tkt" 
                            placeholder="Contoh: 1-3" 
                            value={formData.target_tkt}
                            onChange={(e) => setFormData({...formData, target_tkt: e.target.value})}
                        />
                    </div>

                    {/* Field Syarat Ketua */}
                    <div className="space-y-2">
                        <Label htmlFor="ketua">Syarat Ketua</Label>
                        <Input 
                            id="ketua" 
                            placeholder="Min. Jabatan" 
                            value={formData.syarat_ketua}
                            onChange={(e) => setFormData({...formData, syarat_ketua: e.target.value})}
                        />
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
                    Status Aktif
                  </Label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleCloseModal}>
                  Batal
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {isEditing ? "Simpan Perubahan" : "Simpan Skema"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}