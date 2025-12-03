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
  GraduationCap, 
  School 
} from "lucide-react";

// --- Tipe Data ---
interface ProgramStudi {
  id: number;
  kode_prodi: string;
  nama_prodi: string;
  jenjang: "D3" | "S1" | "S2" | "S3";
  fakultas: string;
  status: boolean;
}

// --- Data Dummy ---
const DUMMY_DATA: ProgramStudi[] = [
  { id: 1, kode_prodi: "TI-001", nama_prodi: "Teknik Informatika", jenjang: "S1", fakultas: "Fakultas Ilmu Komputer", status: true },
  { id: 2, kode_prodi: "SI-002", nama_prodi: "Sistem Informasi", jenjang: "S1", fakultas: "Fakultas Ilmu Komputer", status: true },
  { id: 3, kode_prodi: "HK-101", nama_prodi: "Ilmu Hukum", jenjang: "S1", fakultas: "Fakultas Hukum", status: true },
  { id: 4, kode_prodi: "MN-201", nama_prodi: "Manajemen", jenjang: "S1", fakultas: "Fakultas Ekonomi & Bisnis", status: true },
  { id: 5, kode_prodi: "AK-202", nama_prodi: "Akuntansi", jenjang: "D3", fakultas: "Fakultas Ekonomi & Bisnis", status: true },
  { id: 6, kode_prodi: "TS-301", nama_prodi: "Teknik Sipil", jenjang: "S1", fakultas: "Fakultas Teknik", status: true },
  { id: 7, kode_prodi: "TM-302", nama_prodi: "Magister Teknik Mesin", jenjang: "S2", fakultas: "Fakultas Teknik", status: false },
];

export default function MasterFakultasPage() {
  // State Data
  const [dataList, setDataList] = useState<ProgramStudi[]>(DUMMY_DATA);
  const [query, setQuery] = useState("");
  
  // State Modal & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<ProgramStudi>>({
    kode_prodi: "",
    nama_prodi: "",
    jenjang: "S1",
    fakultas: "",
    status: true,
  });

  // Filter Data
  const filteredData = useMemo(() => {
    if (!query) return dataList;
    const lowerQuery = query.toLowerCase();
    return dataList.filter(
      (item) =>
        item.nama_prodi.toLowerCase().includes(lowerQuery) ||
        item.fakultas.toLowerCase().includes(lowerQuery) ||
        item.kode_prodi.toLowerCase().includes(lowerQuery)
    );
  }, [dataList, query]);

  // --- Handlers ---

  const handleOpenModal = (item?: ProgramStudi) => {
    if (item) {
      // Mode Edit
      setIsEditing(true);
      setFormData({ ...item });
    } else {
      // Mode Tambah
      setIsEditing(false);
      setFormData({
        kode_prodi: "",
        nama_prodi: "",
        jenjang: "S1",
        fakultas: "",
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
    if (!formData.nama_prodi || !formData.fakultas) {
      Swal.fire("Error", "Nama Prodi dan Fakultas wajib diisi!", "error");
      return;
    }

    if (isEditing && formData.id) {
      // Update Data
      const updatedList = dataList.map((item) => 
        item.id === formData.id ? { ...item, ...formData } as ProgramStudi : item
      );
      setDataList(updatedList);
      Swal.fire("Sukses", "Data berhasil diperbarui", "success");
    } else {
      // Create Data
      const newItem: ProgramStudi = {
        ...formData as ProgramStudi,
        id: Math.random(), // ID Random dummy
      };
      setDataList([...dataList, newItem]);
      Swal.fire("Sukses", "Program Studi berhasil ditambahkan", "success");
    }

    handleCloseModal();
  };

  const handleDelete = async (item: ProgramStudi) => {
    const result = await Swal.fire({
      title: "Hapus Data?",
      text: `Anda yakin ingin menghapus ${item.nama_prodi}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      const filtered = dataList.filter((d) => d.id !== item.id);
      setDataList(filtered);
      Swal.fire("Terhapus!", "Data telah dihapus.", "success");
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <School className="h-6 w-6 text-blue-600" />
            Master Fakultas & Prodi
          </h1>
          <p className="text-sm text-gray-500">
            Manajemen data referensi akademik untuk pengajuan proposal.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Tambah Data
        </Button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-lg border shadow-sm flex items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Cari prodi, fakultas, atau kode..."
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
                  <th className="px-6 py-4 w-[100px]">Kode</th>
                  <th className="px-6 py-4">Program Studi</th>
                  <th className="px-6 py-4">Jenjang</th>
                  <th className="px-6 py-4">Fakultas</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      Tidak ada data ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs font-medium text-gray-600">
                        {item.kode_prodi}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {item.nama_prodi}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {item.jenjang}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {item.fakultas}
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
                {isEditing ? "Edit Program Studi" : "Tambah Program Studi Baru"}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-500">
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSave}>
              <div className="p-6 space-y-4">
                
                {/* Field Fakultas */}
                <div className="space-y-2">
                  <Label htmlFor="fakultas">Nama Fakultas</Label>
                  <select
                    id="fakultas"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.fakultas}
                    onChange={(e) => setFormData({ ...formData, fakultas: e.target.value })}
                    required
                  >
                    <option value="">-- Pilih Fakultas --</option>
                    <option value="Fakultas Ilmu Komputer">Fakultas Ilmu Komputer</option>
                    <option value="Fakultas Ekonomi & Bisnis">Fakultas Ekonomi & Bisnis</option>
                    <option value="Fakultas Teknik">Fakultas Teknik</option>
                    <option value="Fakultas Hukum">Fakultas Hukum</option>
                    <option value="Fakultas Psikologi">Fakultas Psikologi</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Field Kode Prodi */}
                  <div className="space-y-2">
                    <Label htmlFor="kode">Kode Prodi</Label>
                    <Input 
                      id="kode" 
                      placeholder="Contoh: TI-001" 
                      value={formData.kode_prodi}
                      onChange={(e) => setFormData({...formData, kode_prodi: e.target.value})}
                      required
                    />
                  </div>

                  {/* Field Jenjang */}
                  <div className="space-y-2">
                    <Label htmlFor="jenjang">Jenjang</Label>
                    <select
                      id="jenjang"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={formData.jenjang}
                      onChange={(e) => setFormData({ ...formData, jenjang: e.target.value as "D3" | "S1" | "S2" | "S3" })}
                    >
                      <option value="D3">D3 (Diploma)</option>
                      <option value="S1">S1 (Sarjana)</option>
                      <option value="S2">S2 (Magister)</option>
                      <option value="S3">S3 (Doktor)</option>
                    </select>
                  </div>
                </div>

                {/* Field Nama Prodi */}
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Program Studi</Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input 
                      id="nama" 
                      placeholder="Contoh: Teknik Informatika" 
                      className="pl-9"
                      value={formData.nama_prodi}
                      onChange={(e) => setFormData({...formData, nama_prodi: e.target.value})}
                      required
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