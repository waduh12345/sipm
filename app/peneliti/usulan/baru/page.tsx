"use client";

import { useState, useMemo } from "react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  Users, 
  FileText, 
  DollarSign, 
  Send,
  Plus,
  Trash2,
  Info,
  Save,
  AlertCircle
} from "lucide-react";

// --- Types ---
type WizardStep = "identitas" | "tim" | "substansi" | "rab" | "preview";

interface AnggotaPeneliti {
  id: number;
  nidn_nim: string;
  nama: string;
  peran: "Anggota Peneliti" | "Mahasiswa";
  tugas: string;
}

interface ItemRAB {
  id: number;
  uraian: string;
  volume: number;
  satuan: string;
  harga_satuan: number;
  total: number;
  kelompok: "Honorarium" | "Bahan Habis Pakai" | "Perjalanan" | "Sewa" | "Lain-lain";
}

interface ProposalForm {
  judul: string;
  skema_id: string;
  tema_id: string;
  lama_kegiatan: number; // Tahun
  abstrak: string;
  kata_kunci: string;
  file_proposal: File | null;
  tim_peneliti: AnggotaPeneliti[];
  rab: ItemRAB[];
}

// --- Dummy Master Data ---
const LIST_SKEMA = [
  { id: "1", nama: "Penelitian Dosen Pemula (PDP)", plafon: 20000000 },
  { id: "2", nama: "Penelitian Dasar", plafon: 50000000 },
  { id: "3", nama: "Penelitian Terapan", plafon: 75000000 },
];

const LIST_TEMA = [
  { id: "1", nama: "Ketahanan Pangan" },
  { id: "2", nama: "Energi Baru Terbarukan" },
  { id: "3", nama: "Transformasi Digital" },
  { id: "4", nama: "Kesehatan & Obat" },
];

export default function PengajuanBaruPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<ProposalForm>({
    judul: "",
    skema_id: "",
    tema_id: "",
    lama_kegiatan: 1,
    abstrak: "",
    kata_kunci: "",
    file_proposal: null,
    tim_peneliti: [],
    rab: [],
  });

  // State untuk Tim Peneliti Input
  const [newMember, setNewMember] = useState<Partial<AnggotaPeneliti>>({
    nidn_nim: "",
    nama: "",
    peran: "Anggota Peneliti",
    tugas: "",
  });

  // State untuk RAB Input
  const [newItemRAB, setNewItemRAB] = useState<Partial<ItemRAB>>({
    uraian: "",
    volume: 1,
    satuan: "Paket",
    harga_satuan: 0,
    kelompok: "Bahan Habis Pakai",
  });

  // --- Helpers ---
  const totalRAB = useMemo(() => {
    return formData.rab.reduce((acc, item) => acc + item.total, 0);
  }, [formData.rab]);

  const selectedSkema = useMemo(() => {
    return LIST_SKEMA.find(s => s.id === formData.skema_id);
  }, [formData.skema_id]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  // --- Handlers ---
  const handleNext = () => {
    // Validasi Step 1
    if (currentStep === 1) {
      if (!formData.judul || !formData.skema_id || !formData.tema_id) {
        Swal.fire("Peringatan", "Mohon lengkapi Judul, Skema, dan Tema.", "warning");
        return;
      }
    }
    // Validasi Step 3
    if (currentStep === 3) {
      if (!formData.abstrak || !formData.file_proposal) {
        Swal.fire("Peringatan", "Mohon isi Abstrak dan Upload Proposal.", "warning");
        return;
      }
    }
    // Validasi Step 4 (RAB)
    if (currentStep === 4) {
      if (selectedSkema && totalRAB > selectedSkema.plafon) {
        Swal.fire("Over Budget", `Total RAB melebihi plafon skema (${formatCurrency(selectedSkema.plafon)})`, "error");
        return;
      }
    }

    if (currentStep < 5) setCurrentStep(c => c + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(c => c - 1);
  };

  const handleAddMember = () => {
    if (!newMember.nama || !newMember.nidn_nim) return;
    const member: AnggotaPeneliti = {
      id: Math.random(),
      nidn_nim: newMember.nidn_nim!,
      nama: newMember.nama!,
      peran: newMember.peran as "Anggota Peneliti" | "Mahasiswa",
      tugas: newMember.tugas || "-",
    };
    setFormData(prev => ({ ...prev, tim_peneliti: [...prev.tim_peneliti, member] }));
    setNewMember({ nidn_nim: "", nama: "", peran: "Anggota Peneliti", tugas: "" });
  };

  const handleDeleteMember = (id: number) => {
    setFormData(prev => ({ ...prev, tim_peneliti: prev.tim_peneliti.filter(m => m.id !== id) }));
  };

  const handleAddItemRAB = () => {
    if (!newItemRAB.uraian || !newItemRAB.harga_satuan) return;
    const total = (newItemRAB.volume || 0) * (newItemRAB.harga_satuan || 0);
    const item: ItemRAB = {
      id: Math.random(),
      uraian: newItemRAB.uraian!,
      volume: newItemRAB.volume || 1,
      satuan: newItemRAB.satuan || "Paket",
      harga_satuan: newItemRAB.harga_satuan || 0,
      total: total,
      kelompok: newItemRAB.kelompok as "Honorarium" | "Bahan Habis Pakai" | "Perjalanan" | "Sewa" | "Lain-lain",
    };
    setFormData(prev => ({ ...prev, rab: [...prev.rab, item] }));
    setNewItemRAB({ uraian: "", volume: 1, satuan: "Paket", harga_satuan: 0, kelompok: "Bahan Habis Pakai" });
  };

  const handleDeleteRAB = (id: number) => {
    setFormData(prev => ({ ...prev, rab: prev.rab.filter(r => r.id !== id) }));
  };

  const handleSubmit = () => {
    Swal.fire({
      title: "Kirim Usulan?",
      text: "Pastikan data sudah benar. Data tidak dapat diubah setelah dikirim.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Kirim Usulan",
      confirmButtonColor: "#2563eb",
    }).then((result) => {
      if (result.isConfirmed) {
        // Simulasi Submit API
        Swal.fire("Terkirim!", "Usulan penelitian Anda berhasil dikirim.", "success");
        // Redirect logic here
      }
    });
  };

  // --- Render Steps ---
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <Label>Judul Penelitian</Label>
              <Input 
                value={formData.judul} 
                onChange={(e) => setFormData({...formData, judul: e.target.value})}
                placeholder="Masukkan judul penelitian lengkap..." 
                className="font-medium"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Skema Hibah</Label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.skema_id}
                  onChange={(e) => setFormData({...formData, skema_id: e.target.value})}
                >
                  <option value="">-- Pilih Skema --</option>
                  {LIST_SKEMA.map(s => (
                    <option key={s.id} value={s.id}>{s.nama} (Max {formatCurrency(s.plafon)})</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Tema Riset</Label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.tema_id}
                  onChange={(e) => setFormData({...formData, tema_id: e.target.value})}
                >
                  <option value="">-- Pilih Tema --</option>
                  {LIST_TEMA.map(t => (
                    <option key={t.id} value={t.id}>{t.nama}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2 w-full md:w-1/3">
              <Label>Lama Kegiatan (Tahun)</Label>
              <Input 
                type="number" 
                min={1} 
                max={3} 
                value={formData.lama_kegiatan}
                onChange={(e) => setFormData({...formData, lama_kegiatan: parseInt(e.target.value)})} 
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
              <h4 className="font-semibold text-blue-900 mb-2">Tambah Anggota Tim</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                <div className="space-y-1">
                    <Label className="text-xs">NIDN / NIM</Label>
                    <Input 
                        value={newMember.nidn_nim}
                        onChange={(e) => setNewMember({...newMember, nidn_nim: e.target.value})}
                        placeholder="Cari..."
                        className="bg-white"
                    />
                </div>
                <div className="space-y-1 md:col-span-2">
                    <Label className="text-xs">Nama Lengkap</Label>
                    <Input 
                        value={newMember.nama}
                        onChange={(e) => setNewMember({...newMember, nama: e.target.value})}
                        placeholder="Nama Anggota"
                        className="bg-white"
                    />
                </div>
                <div className="space-y-1">
                    <Label className="text-xs">Peran</Label>
                    <select 
                        className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                        value={newMember.peran}
                        onChange={(e) => setNewMember({...newMember, peran: e.target.value as "Anggota Peneliti" | "Mahasiswa"})}
                    >
                        <option>Anggota Peneliti</option>
                        <option>Mahasiswa</option>
                    </select>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                 <Input 
                    value={newMember.tugas}
                    onChange={(e) => setNewMember({...newMember, tugas: e.target.value})}
                    placeholder="Uraian Tugas (Opsional)"
                    className="bg-white"
                 />
                 <Button onClick={handleAddMember} size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-1" /> Tambah
                 </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100 font-semibold text-gray-700">
                        <tr>
                            <th className="px-4 py-3">NIDN/NIM</th>
                            <th className="px-4 py-3">Nama</th>
                            <th className="px-4 py-3">Peran</th>
                            <th className="px-4 py-3">Tugas</th>
                            <th className="px-4 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {formData.tim_peneliti.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-4 text-gray-500">Belum ada anggota tim.</td></tr>
                        ) : (
                            formData.tim_peneliti.map((m) => (
                                <tr key={m.id}>
                                    <td className="px-4 py-3 font-mono text-xs">{m.nidn_nim}</td>
                                    <td className="px-4 py-3 font-medium">{m.nama}</td>
                                    <td className="px-4 py-3"><Badge variant="outline">{m.peran}</Badge></td>
                                    <td className="px-4 py-3 text-gray-500">{m.tugas}</td>
                                    <td className="px-4 py-3 text-center">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDeleteMember(m.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="space-y-2">
              <Label>Abstrak Penelitian</Label>
              <Textarea 
                value={formData.abstrak} 
                onChange={(e) => setFormData({...formData, abstrak: e.target.value})}
                placeholder="Tuliskan ringkasan penelitian (Latar belakang, tujuan, metode, urgensi) maks 500 kata..." 
                className="min-h-[200px]"
              />
              <p className="text-xs text-gray-500 text-right">Maksimal 500 kata</p>
            </div>
            <div className="space-y-2">
              <Label>Kata Kunci</Label>
              <Input 
                value={formData.kata_kunci} 
                onChange={(e) => setFormData({...formData, kata_kunci: e.target.value})}
                placeholder="Contoh: AI, Pertanian, IoT (Pisahkan dengan koma)" 
              />
            </div>
            <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-center hover:bg-gray-100 transition-colors cursor-pointer">
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-gray-700">Upload File Proposal Lengkap</h3>
                <p className="text-xs text-gray-500 mt-1">Format PDF, Maksimal 5 MB</p>
                <Input 
                    type="file" 
                    className="hidden" 
                    id="file-upload" 
                    accept=".pdf"
                    onChange={(e) => setFormData({...formData, file_proposal: e.target.files ? e.target.files[0] : null})}
                />
                <label htmlFor="file-upload" className="mt-4 inline-block px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                    Pilih File
                </label>
                {formData.file_proposal && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-green-600 bg-green-50 p-2 rounded inline-block">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm font-medium">{formData.file_proposal.name}</span>
                    </div>
                )}
            </div>
          </div>
        );

      case 4:
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <div>
                        <p className="text-xs text-blue-600 font-semibold uppercase">Plafon Dana Skema</p>
                        <p className="text-lg font-bold text-blue-900">{selectedSkema ? formatCurrency(selectedSkema.plafon) : "-"}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-600 font-semibold uppercase">Total Usulan</p>
                        <p className={`text-lg font-bold ${selectedSkema && totalRAB > selectedSkema.plafon ? 'text-red-600' : 'text-green-600'}`}>
                            {formatCurrency(totalRAB)}
                        </p>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-3 text-sm">Input Item Anggaran</h4>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                        <div className="md:col-span-4 space-y-1">
                            <Label className="text-xs">Uraian</Label>
                            <Input 
                                value={newItemRAB.uraian} 
                                onChange={(e) => setNewItemRAB({...newItemRAB, uraian: e.target.value})} 
                                className="bg-white h-9 text-sm" 
                                placeholder="Nama Barang/Jasa" 
                            />
                        </div>
                        <div className="md:col-span-2 space-y-1">
                            <Label className="text-xs">Kelompok</Label>
                            <select 
                                value={newItemRAB.kelompok} 
                                onChange={(e) => setNewItemRAB({...newItemRAB, kelompok: e.target.value as "Honorarium" | "Bahan Habis Pakai" | "Perjalanan" | "Sewa" | "Lain-lain"})}
                                className="w-full h-9 rounded-md border bg-white px-2 text-sm"
                            >
                                <option>Honorarium</option>
                                <option>Bahan Habis Pakai</option>
                                <option>Perjalanan</option>
                                <option>Sewa</option>
                                <option>Lain-lain</option>
                            </select>
                        </div>
                        <div className="md:col-span-1 space-y-1">
                            <Label className="text-xs">Vol</Label>
                            <Input 
                                type="number" 
                                value={newItemRAB.volume} 
                                onChange={(e) => setNewItemRAB({...newItemRAB, volume: parseInt(e.target.value)})} 
                                className="bg-white h-9 text-sm" 
                            />
                        </div>
                        <div className="md:col-span-2 space-y-1">
                            <Label className="text-xs">Satuan</Label>
                            <Input 
                                value={newItemRAB.satuan} 
                                onChange={(e) => setNewItemRAB({...newItemRAB, satuan: e.target.value})} 
                                className="bg-white h-9 text-sm" 
                                placeholder="Unit/Jam" 
                            />
                        </div>
                        <div className="md:col-span-2 space-y-1">
                            <Label className="text-xs">Harga (@)</Label>
                            <Input 
                                type="number" 
                                value={newItemRAB.harga_satuan} 
                                onChange={(e) => setNewItemRAB({...newItemRAB, harga_satuan: parseInt(e.target.value)})} 
                                className="bg-white h-9 text-sm" 
                            />
                        </div>
                        <div className="md:col-span-1">
                            <Button onClick={handleAddItemRAB} className="w-full h-9 bg-blue-600 hover:bg-blue-700">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 font-semibold text-gray-700">
                            <tr>
                                <th className="px-4 py-3">Uraian</th>
                                <th className="px-4 py-3">Kelompok</th>
                                <th className="px-4 py-3 text-center">Vol</th>
                                <th className="px-4 py-3 text-right">Harga Satuan</th>
                                <th className="px-4 py-3 text-right">Total</th>
                                <th className="px-4 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {formData.rab.length === 0 ? (
                                <tr><td colSpan={6} className="text-center py-4 text-gray-500">Belum ada item anggaran.</td></tr>
                            ) : (
                                formData.rab.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-4 py-3">{item.uraian}</td>
                                        <td className="px-4 py-3"><Badge variant="outline" className="font-normal">{item.kelompok}</Badge></td>
                                        <td className="px-4 py-3 text-center">{item.volume} {item.satuan}</td>
                                        <td className="px-4 py-3 text-right">{formatCurrency(item.harga_satuan)}</td>
                                        <td className="px-4 py-3 text-right font-medium">{formatCurrency(item.total)}</td>
                                        <td className="px-4 py-3 text-center">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDeleteRAB(item.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                        <tfoot className="bg-gray-50 font-bold text-gray-900 border-t">
                             <tr>
                                <td colSpan={4} className="px-4 py-3 text-right">Total Anggaran</td>
                                <td className="px-4 py-3 text-right">{formatCurrency(totalRAB)}</td>
                                <td></td>
                             </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        );

      case 5:
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex gap-3 items-start">
                    <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                        <h4 className="font-semibold text-yellow-800 text-sm">Periksa Kembali Data Anda</h4>
                        <p className="text-xs text-yellow-700">Pastikan seluruh isian sudah benar. Usulan yang sudah dikirim tidak dapat disunting kembali.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-base">Informasi Umum</CardTitle></CardHeader>
                        <CardContent className="text-sm space-y-2">
                            <p><span className="text-gray-500 block">Judul:</span> {formData.judul}</p>
                            <p><span className="text-gray-500 block">Skema:</span> {selectedSkema?.nama}</p>
                            <p><span className="text-gray-500 block">Tema:</span> {LIST_TEMA.find(t => t.id === formData.tema_id)?.nama}</p>
                            <p><span className="text-gray-500 block">Lama:</span> {formData.lama_kegiatan} Tahun</p>
                        </CardContent>
                    </Card>
                    <Card>
                         <CardHeader className="pb-2"><CardTitle className="text-base">Dokumen</CardTitle></CardHeader>
                         <CardContent className="text-sm space-y-2">
                             <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-gray-400" /> 
                                <span className="font-medium">{formData.file_proposal?.name || "Belum upload file"}</span>
                             </div>
                             <p><span className="text-gray-500 block">Tim Peneliti:</span> {formData.tim_peneliti.length} Orang</p>
                             <p><span className="text-gray-500 block">Total RAB:</span> {formatCurrency(totalRAB)}</p>
                         </CardContent>
                    </Card>
                </div>
            </div>
        );
      default: return null;
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      
      {/* Header Halaman */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pengajuan Usulan Baru</h1>
        <p className="text-sm text-gray-500">Formulir pengajuan proposal penelitian/pengabdian.</p>
      </div>

      {/* Stepper Navigation */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
            {/* Connecting Line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
            
            {/* Steps */}
            {[
                { step: 1, label: "Identitas", icon: FileText },
                { step: 2, label: "Tim", icon: Users },
                { step: 3, label: "Substansi", icon: Upload },
                { step: 4, label: "RAB", icon: DollarSign },
                { step: 5, label: "Kirim", icon: Send }
            ].map((s) => {
                const isActive = s.step === currentStep;
                const isCompleted = s.step < currentStep;
                const Icon = s.icon;
                
                return (
                    <div key={s.step} className="flex flex-col items-center bg-gray-50 px-2">
                        <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                            ${isActive ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-110' : 
                              isCompleted ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 text-gray-400'}
                        `}>
                            {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                        </div>
                        <span className={`mt-2 text-xs font-medium ${isActive ? 'text-blue-700' : 'text-gray-500'}`}>
                            {s.label}
                        </span>
                    </div>
                );
            })}
        </div>
      </div>

      {/* Main Content Card */}
      <Card className="max-w-4xl mx-auto shadow-md border-t-4 border-t-blue-600">
        <CardHeader>
             <CardTitle className="flex justify-between items-center">
                 <span>
                    {currentStep === 1 && "Langkah 1: Identitas Penelitian"}
                    {currentStep === 2 && "Langkah 2: Susunan Tim Peneliti"}
                    {currentStep === 3 && "Langkah 3: Substansi & Dokumen"}
                    {currentStep === 4 && "Langkah 4: Rencana Anggaran Biaya"}
                    {currentStep === 5 && "Langkah 5: Pratinjau & Kirim"}
                 </span>
                 <Badge variant="outline" className="font-normal text-gray-500">Step {currentStep} of 5</Badge>
             </CardTitle>
             <CardDescription>
                Isi data dengan lengkap dan benar sesuai panduan.
             </CardDescription>
        </CardHeader>
        <CardContent>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 mt-6 border-t">
                <Button 
                    variant="outline" 
                    onClick={handlePrev} 
                    disabled={currentStep === 1}
                    className="w-32"
                >
                    <ChevronLeft className="h-4 w-4 mr-2" /> Kembali
                </Button>

                {currentStep === 5 ? (
                    <Button 
                        onClick={handleSubmit} 
                        className="w-40 bg-green-600 hover:bg-green-700"
                    >
                        <Send className="h-4 w-4 mr-2" /> Kirim Usulan
                    </Button>
                ) : (
                    <Button 
                        onClick={handleNext} 
                        className="w-32 bg-blue-600 hover:bg-blue-700"
                    >
                        Lanjut <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                )}
            </div>
        </CardContent>
      </Card>

    </div>
  );
}