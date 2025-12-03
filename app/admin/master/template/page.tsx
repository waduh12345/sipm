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
  FileText, 
  Upload,
  Download,
  FileType
} from "lucide-react";

// --- Tipe Data Template Dokumen ---
interface TemplateDokumen {
  id: number;
  nama_template: string;
  jenis: "Proposal" | "RAB" | "Laporan Kemajuan" | "Laporan Akhir" | "Surat Pernyataan" | "Lainnya";
  keterangan: string;
  ukuran_file: string;
  tanggal_upload: string;
  status: boolean;
}

// --- Data Dummy Template ---
const DUMMY_DATA: TemplateDokumen[] = [
  { id: 1, nama_template: "Template Proposal Penelitian Dasar 2024", jenis: "Proposal", keterangan: "Format standar untuk skema Penelitian Dasar.", ukuran_file: "1.2 MB", tanggal_upload: "2023-11-01", status: true },
  { id: 2, nama_template: "Template RAB (Rencana Anggaran Biaya)", jenis: "RAB", keterangan: "Excel sheet perhitungan anggaran dengan rumus otomatis.", ukuran_file: "450 KB", tanggal_upload: "2023-10-15", status: true },
  { id: 3, nama_template: "Format Laporan Kemajuan 70%", jenis: "Laporan Kemajuan", keterangan: "Wajib digunakan untuk pelaporan termin 1.", ukuran_file: "800 KB", tanggal_upload: "2023-12-01", status: true },
  { id: 4, nama_template: "Surat Pernyataan Ketua Peneliti", jenis: "Surat Pernyataan", keterangan: "Bermaterai 10.000", ukuran_file: "120 KB", tanggal_upload: "2023-09-20", status: true },
  { id: 5, nama_template: "Panduan Penggunaan Sistem", jenis: "Lainnya", keterangan: "Manual book untuk dosen dan reviewer.", ukuran_file: "2.5 MB", tanggal_upload: "2023-08-10", status: true },
];

export default function MasterTemplateDokumenPage() {
  // State Data
  const [dataList, setDataList] = useState<TemplateDokumen[]>(DUMMY_DATA);
  const [query, setQuery] = useState("");
  
  // State Modal & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // State Form Data
  const [formData, setFormData] = useState<Partial<TemplateDokumen>>({
    nama_template: "",
    jenis: "Proposal",
    keterangan: "",
    status: true,
  });

  // Filter Data
  const filteredData = useMemo(() => {
    if (!query) return dataList;
    const lowerQuery = query.toLowerCase();
    return dataList.filter(
      (item) =>
        item.nama_template.toLowerCase().includes(lowerQuery) ||
        item.jenis.toLowerCase().includes(lowerQuery)
    );
  }, [dataList, query]);

  // --- Handlers ---

  const handleOpenModal = (item?: TemplateDokumen) => {
    if (item) {
      // Mode Edit
      setIsEditing(true);
      setFormData({ ...item });
    } else {
      // Mode Tambah
      setIsEditing(false);
      setFormData({
        nama_template: "",
        jenis: "Proposal",
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
    if (!formData.nama_template || !formData.jenis) {
      Swal.fire("Error", "Nama Template dan Jenis Dokumen wajib diisi!", "error");
      return;
    }

    if (isEditing && formData.id) {
      // Update Data (Simulasi)
      const updatedList = dataList.map((item) => 
        item.id === formData.id ? { ...item, ...formData } as TemplateDokumen : item
      );
      setDataList(updatedList);
      Swal.fire("Sukses", "Data Template berhasil diperbarui", "success");
    } else {
      // Create Data (Simulasi)
      const newItem: TemplateDokumen = {
        ...formData as TemplateDokumen,
        id: Math.random(), // ID Random dummy
        ukuran_file: "0 KB", // Default dummy
        tanggal_upload: new Date().toISOString().split('T')[0], // Tanggal hari ini
      };
      setDataList([newItem, ...dataList]); // Add to top
      Swal.fire("Sukses", "Template dokumen berhasil ditambahkan", "success");
    }

    handleCloseModal();
  };

  const handleDelete = async (item: TemplateDokumen) => {
    const result = await Swal.fire({
      title: "Hapus File?",
      text: `Anda yakin ingin menghapus ${item.nama_template}? File yang sudah dihapus tidak dapat dikembalikan.`,
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
            <FileText className="h-6 w-6 text-blue-600" />
            Master Template Dokumen
          </h1>
          <p className="text-sm text-gray-500">
            Kelola file template yang dapat diunduh oleh peneliti (Proposal, RAB, Laporan).
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700">
          <Upload className="mr-2 h-4 w-4" /> Upload Template
        </Button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-lg border shadow-sm flex items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Cari nama template..."
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
                  <th className="px-6 py-4">Nama Template</th>
                  <th className="px-6 py-4">Jenis</th>
                  <th className="px-6 py-4">Keterangan</th>
                  <th className="px-6 py-4">Info File</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      Tidak ada template dokumen ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900 flex items-center gap-2">
                          <FileType className="h-4 w-4 text-blue-500" />
                          {item.nama_template}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {item.jenis}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-gray-600 max-w-[200px] truncate" title={item.keterangan}>
                        {item.keterangan || "-"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-gray-500">
                          <p>Size: {item.ukuran_file}</p>
                          <p>Date: {item.tanggal_upload}</p>
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
                            className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                            title="Download Preview"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
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
                {isEditing ? "Edit Template Dokumen" : "Upload Template Baru"}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-500">
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSave}>
              <div className="p-6 space-y-4">
                
                {/* Field Nama Template */}
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Template</Label>
                  <Input 
                    id="nama" 
                    placeholder="Contoh: Template Proposal 2024" 
                    value={formData.nama_template}
                    onChange={(e) => setFormData({...formData, nama_template: e.target.value})}
                    required
                  />
                </div>

                {/* Field Jenis & File Upload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jenis">Jenis Dokumen</Label>
                    <select
                      id="jenis"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={formData.jenis}
                      onChange={(e) => setFormData({ ...formData, jenis: e.target.value as TemplateDokumen["jenis"] })}
                    >
                      <option value="Proposal">Proposal</option>
                      <option value="RAB">RAB (Anggaran)</option>
                      <option value="Laporan Kemajuan">Laporan Kemajuan</option>
                      <option value="Laporan Akhir">Laporan Akhir</option>
                      <option value="Surat Pernyataan">Surat Pernyataan</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  {/* Mock File Upload - Hanya Visual */}
                  <div className="space-y-2">
                    <Label htmlFor="file">File Dokumen</Label>
                    <div className="flex items-center gap-2">
                      <Input id="file" type="file" className="cursor-pointer text-xs" />
                    </div>
                  </div>
                </div>

                {/* Field Keterangan */}
                <div className="space-y-2">
                  <Label htmlFor="keterangan">Keterangan / Instruksi</Label>
                  <Textarea 
                    id="keterangan" 
                    placeholder="Contoh: Wajib menggunakan font Times New Roman 12pt." 
                    className="resize-none"
                    rows={3}
                    value={formData.keterangan}
                    onChange={(e) => setFormData({...formData, keterangan: e.target.value})}
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
                    Aktif (Dapat diunduh user)
                  </Label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleCloseModal}>
                  Batal
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {isEditing ? "Simpan Perubahan" : "Upload File"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}