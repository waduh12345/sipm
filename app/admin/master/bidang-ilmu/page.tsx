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
  Atom,
  BookOpen
} from "lucide-react";

// --- Tipe Data Bidang Ilmu ---
interface BidangIlmu {
  id: number;
  kode_bidang: string;
  nama_bidang: string;
  rumpun_ilmu: "Saintek" | "Soshum" | "Kesehatan" | "Agro" | "Seni";
  keterangan: string;
  status: boolean;
}

// --- Data Dummy Bidang Ilmu ---
const DUMMY_DATA: BidangIlmu[] = [
  { id: 1, kode_bidang: "BI-001", nama_bidang: "Artificial Intelligence", rumpun_ilmu: "Saintek", keterangan: "Machine Learning, Deep Learning, Expert System", status: true },
  { id: 2, kode_bidang: "BI-002", nama_bidang: "Manajemen Pemasaran", rumpun_ilmu: "Soshum", keterangan: "Digital Marketing, Consumer Behavior", status: true },
  { id: 3, kode_bidang: "BI-003", nama_bidang: "Kesehatan Masyarakat", rumpun_ilmu: "Kesehatan", keterangan: "Epidemiologi, Kebijakan Kesehatan", status: true },
  { id: 4, kode_bidang: "BI-004", nama_bidang: "Hukum Perdata", rumpun_ilmu: "Soshum", keterangan: "Hukum Bisnis, Hukum Keluarga", status: true },
  { id: 5, kode_bidang: "BI-005", nama_bidang: "Teknologi Pangan", rumpun_ilmu: "Agro", keterangan: "Pengolahan Hasil Pertanian, Keamanan Pangan", status: true },
  { id: 6, kode_bidang: "BI-006", nama_bidang: "Energi Terbarukan", rumpun_ilmu: "Saintek", keterangan: "Solar Cell, Microhydro, Biomass", status: true },
  { id: 7, kode_bidang: "BI-007", nama_bidang: "Desain Produk", rumpun_ilmu: "Seni", keterangan: "Ergonomi, Estetika Industri", status: false },
];

export default function MasterBidangIlmuPage() {
  // State Data
  const [dataList, setDataList] = useState<BidangIlmu[]>(DUMMY_DATA);
  const [query, setQuery] = useState("");
  
  // State Modal & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<BidangIlmu>>({
    kode_bidang: "",
    nama_bidang: "",
    rumpun_ilmu: "Saintek",
    keterangan: "",
    status: true,
  });

  // Filter Data
  const filteredData = useMemo(() => {
    if (!query) return dataList;
    const lowerQuery = query.toLowerCase();
    return dataList.filter(
      (item) =>
        item.nama_bidang.toLowerCase().includes(lowerQuery) ||
        item.kode_bidang.toLowerCase().includes(lowerQuery) ||
        item.rumpun_ilmu.toLowerCase().includes(lowerQuery)
    );
  }, [dataList, query]);

  // --- Handlers ---

  const handleOpenModal = (item?: BidangIlmu) => {
    if (item) {
      // Mode Edit
      setIsEditing(true);
      setFormData({ ...item });
    } else {
      // Mode Tambah
      setIsEditing(false);
      setFormData({
        kode_bidang: "",
        nama_bidang: "",
        rumpun_ilmu: "Saintek",
        keterangan: "",
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
    if (!formData.nama_bidang || !formData.kode_bidang) {
      Swal.fire("Error", "Kode dan Nama Bidang Ilmu wajib diisi!", "error");
      return;
    }

    if (isEditing && formData.id) {
      // Update Data
      const updatedList = dataList.map((item) => 
        item.id === formData.id ? { ...item, ...formData } as BidangIlmu : item
      );
      setDataList(updatedList);
      Swal.fire("Sukses", "Data Bidang Ilmu berhasil diperbarui", "success");
    } else {
      // Create Data
      const newItem: BidangIlmu = {
        ...formData as BidangIlmu,
        id: Math.random(), // ID Random dummy
      };
      setDataList([...dataList, newItem]);
      Swal.fire("Sukses", "Bidang Ilmu berhasil ditambahkan", "success");
    }

    handleCloseModal();
  };

  const handleDelete = async (item: BidangIlmu) => {
    const result = await Swal.fire({
      title: "Hapus Data?",
      text: `Anda yakin ingin menghapus bidang ilmu ${item.nama_bidang}?`,
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
            <Layers className="h-6 w-6 text-blue-600" />
            Master Bidang Ilmu
          </h1>
          <p className="text-sm text-gray-500">
            Referensi kepakaran untuk plotting reviewer dan klasifikasi proposal.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Tambah Bidang
        </Button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-lg border shadow-sm flex items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Cari bidang ilmu, kode, atau rumpun..."
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
                  <th className="px-6 py-4 w-[120px]">Kode</th>
                  <th className="px-6 py-4">Bidang Ilmu</th>
                  <th className="px-6 py-4">Rumpun Ilmu</th>
                  <th className="px-6 py-4">Keterangan/Tags</th>
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
                        {item.kode_bidang}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {item.nama_bidang}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary" className="font-normal">
                          {item.rumpun_ilmu}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-xs italic">
                        {item.keterangan || "-"}
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
                {isEditing ? "Edit Bidang Ilmu" : "Tambah Bidang Ilmu Baru"}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-500">
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSave}>
              <div className="p-6 space-y-4">
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Field Kode Bidang */}
                  <div className="space-y-2">
                    <Label htmlFor="kode">Kode Bidang</Label>
                    <Input 
                      id="kode" 
                      placeholder="Misal: BI-001" 
                      value={formData.kode_bidang}
                      onChange={(e) => setFormData({...formData, kode_bidang: e.target.value})}
                      required
                    />
                  </div>

                  {/* Field Rumpun Ilmu */}
                  <div className="space-y-2">
                    <Label htmlFor="rumpun">Rumpun Ilmu</Label>
                    <select
                      id="rumpun"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={formData.rumpun_ilmu}
                      onChange={(e) => setFormData({ ...formData, rumpun_ilmu: e.target.value as BidangIlmu["rumpun_ilmu"] })}
                    >
                      <option value="Saintek">Saintek (Sains & Teknologi)</option>
                      <option value="Soshum">Soshum (Sosial Humaniora)</option>
                      <option value="Kesehatan">Kesehatan & Kedokteran</option>
                      <option value="Agro">Agro & Maritim</option>
                      <option value="Seni">Seni & Desain</option>
                    </select>
                  </div>
                </div>

                {/* Field Nama Bidang */}
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Bidang Ilmu</Label>
                  <div className="relative">
                    <Atom className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input 
                      id="nama" 
                      placeholder="Contoh: Artificial Intelligence" 
                      className="pl-9"
                      value={formData.nama_bidang}
                      onChange={(e) => setFormData({...formData, nama_bidang: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* Field Keterangan */}
                <div className="space-y-2">
                  <Label htmlFor="keterangan">Keterangan / Keywords</Label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input 
                      id="keterangan" 
                      placeholder="Contoh: Machine Learning, Neural Networks" 
                      className="pl-9"
                      value={formData.keterangan}
                      onChange={(e) => setFormData({...formData, keterangan: e.target.value})}
                    />
                  </div>
                  <p className="text-[10px] text-gray-500">Pisahkan dengan koma jika lebih dari satu kata kunci.</p>
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