"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Award, 
  BookOpen, 
  Edit2, 
  Save, 
  GraduationCap,
  Link as LinkIcon,
  FileText,
  X,
  School
} from "lucide-react";
import Swal from "sweetalert2";

// --- Types ---
interface ResearcherProfile {
  name: string;
  nidn: string;
  nip: string;
  email: string;
  phone: string;
  institution: string;
  department: string; // Prodi
  faculty: string;
  functional_position: string; // Jafung (Asisten Ahli, Lektor, etc.)
  academic_degree: string; // Gelar (S.Kom, M.T, Dr.)
  expertise: string; // Bidang Keahlian (comma separated string for simplicity in edit)
  sinta_id: string;
  scopus_id: string;
  google_scholar_id: string;
  sinta_score_overall: number;
  sinta_score_3yr: number;
  scopus_h_index: number;
  google_h_index: number;
}

// --- Dummy Data ---
const INITIAL_PROFILE: ResearcherProfile = {
  name: "Dr. Budi Santoso, S.T., M.Kom.",
  nidn: "0412058801",
  nip: "198805122015041001",
  email: "budi.santoso@university.ac.id",
  phone: "+62 812-3456-7890",
  institution: "Universitas Teknologi Maju",
  department: "Teknik Informatika",
  faculty: "Fakultas Ilmu Komputer",
  functional_position: "Lektor Kepala",
  academic_degree: "Doktor (S3)",
  expertise: "Artificial Intelligence, Data Mining, Decision Support System",
  sinta_id: "6671234",
  scopus_id: "57201234567",
  google_scholar_id: "A1B2C3D4",
  sinta_score_overall: 1250,
  sinta_score_3yr: 450,
  scopus_h_index: 4,
  google_h_index: 8,
};

export default function ResearcherProfilePage() {
  const [profile, setProfile] = useState<ResearcherProfile>(INITIAL_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<ResearcherProfile>(INITIAL_PROFILE);

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel logic
      setEditForm(profile); // Reset form to current profile
      setIsEditing(false);
    } else {
      // Start edit logic
      setEditForm(profile);
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    // Validasi sederhana
    if (!editForm.name || !editForm.email || !editForm.nidn) {
      Swal.fire("Gagal", "Nama, Email, dan NIDN wajib diisi!", "error");
      return;
    }

    Swal.fire({
      title: "Simpan Perubahan?",
      text: "Data profil Anda akan diperbarui di sistem.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Simpan",
      confirmButtonColor: "#2563eb",
    }).then((result) => {
      if (result.isConfirmed) {
        setProfile(editForm);
        setIsEditing(false);
        Swal.fire("Berhasil", "Profil berhasil diperbarui.", "success");
      }
    });
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header Profile */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar Placeholder */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-bold border-4 border-white shadow-md">
            {profile.name.charAt(0)}
          </div>
          
          <div className="flex-1 space-y-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-1 text-gray-600 text-sm">
                <span className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" /> {profile.functional_position}
                </span>
                <span className="hidden md:inline">•</span>
                <span className="flex items-center gap-1">
                  <School className="h-4 w-4" /> {profile.department}, {profile.faculty}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {profile.expertise.split(",").map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                  {tag.trim()}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full md:w-auto">
             {!isEditing ? (
                <Button onClick={handleEditToggle} className="bg-blue-600 hover:bg-blue-700">
                  <Edit2 className="h-4 w-4 mr-2" /> Edit Profil
                </Button>
             ) : (
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleEditToggle} className="text-red-600 border-red-200 bg-red-50 hover:bg-red-100">
                        <X className="h-4 w-4 mr-2" /> Batal
                    </Button>
                    <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                        <Save className="h-4 w-4 mr-2" /> Simpan
                    </Button>
                </div>
             )}
          </div>
        </div>
      </div>

      {/* Metrics Cards (SINTA, Scopus, Google Scholar) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* SINTA */}
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-none">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-orange-100 text-xs uppercase font-semibold tracking-wider">SINTA Score Overall</p>
                <h3 className="text-3xl font-bold mt-1">{profile.sinta_score_overall}</h3>
                <p className="text-orange-100 text-xs mt-1">3Yr Score: {profile.sinta_score_3yr}</p>
              </div>
              <div className="bg-white/20 p-2 rounded-lg">
                <Award className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scopus */}
        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-none">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-xs uppercase font-semibold tracking-wider">Scopus H-Index</p>
                <h3 className="text-3xl font-bold mt-1">{profile.scopus_h_index}</h3>
                <p className="text-blue-100 text-xs mt-1">ID: {profile.scopus_id}</p>
              </div>
              <div className="bg-white/20 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Google Scholar */}
        <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white border-none">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100 text-xs uppercase font-semibold tracking-wider">Google Scholar H-Index</p>
                <h3 className="text-3xl font-bold mt-1">{profile.google_h_index}</h3>
                <p className="text-green-100 text-xs mt-1">ID: {profile.google_scholar_id}</p>
              </div>
              <div className="bg-white/20 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Detail */}
      <Tabs defaultValue="biodata" className="w-full">
        <TabsList className="bg-white w-full justify-start rounded-lg border p-1 h-auto flex-wrap">
            <TabsTrigger value="biodata" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 px-4 py-2">Biodata Peneliti</TabsTrigger>
            <TabsTrigger value="penelitian" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 px-4 py-2">Riwayat Penelitian</TabsTrigger>
            <TabsTrigger value="pengabdian" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 px-4 py-2">Riwayat Pengabdian</TabsTrigger>
        </TabsList>

        <TabsContent value="biodata" className="mt-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <User className="h-5 w-5 text-blue-600" /> Informasi Pribadi & Akademik
                    </CardTitle>
                    <CardDescription>Data ini digunakan sebagai dasar kelayakan pengusul hibah.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Baris 1: Identitas Dasar */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="nidn">NIDN / NIDK</Label>
                            <Input 
                                id="nidn" 
                                value={isEditing ? editForm.nidn : profile.nidn} 
                                disabled={!isEditing}
                                onChange={(e) => setEditForm({...editForm, nidn: e.target.value})}
                                className={!isEditing ? "bg-gray-50 text-gray-600" : ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="nip">NIP / NIK Institusi</Label>
                            <Input 
                                id="nip" 
                                value={isEditing ? editForm.nip : profile.nip} 
                                disabled={!isEditing}
                                onChange={(e) => setEditForm({...editForm, nip: e.target.value})}
                                className={!isEditing ? "bg-gray-50 text-gray-600" : ""}
                            />
                        </div>
                    </div>

                    {/* Baris 2: Kontak */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-gray-400" /> Email Institusi
                            </Label>
                            <Input 
                                id="email" 
                                value={isEditing ? editForm.email : profile.email} 
                                disabled={!isEditing}
                                onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                className={!isEditing ? "bg-gray-50 text-gray-600" : ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-gray-400" /> No. Handphone / WA
                            </Label>
                            <Input 
                                id="phone" 
                                value={isEditing ? editForm.phone : profile.phone} 
                                disabled={!isEditing}
                                onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                                className={!isEditing ? "bg-gray-50 text-gray-600" : ""}
                            />
                        </div>
                    </div>

                    {/* Baris 3: Akademik */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="jafung">Jabatan Fungsional</Label>
                            {isEditing ? (
                                <select 
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    value={editForm.functional_position}
                                    onChange={(e) => setEditForm({...editForm, functional_position: e.target.value})}
                                >
                                    <option value="Tenaga Pengajar">Tenaga Pengajar</option>
                                    <option value="Asisten Ahli">Asisten Ahli</option>
                                    <option value="Lektor">Lektor</option>
                                    <option value="Lektor Kepala">Lektor Kepala</option>
                                    <option value="Guru Besar">Guru Besar</option>
                                </select>
                            ) : (
                                <Input value={profile.functional_position} disabled className="bg-gray-50 text-gray-600" />
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="prodi">Program Studi</Label>
                            <Input 
                                id="prodi" 
                                value={isEditing ? editForm.department : profile.department} 
                                disabled={!isEditing}
                                onChange={(e) => setEditForm({...editForm, department: e.target.value})}
                                className={!isEditing ? "bg-gray-50 text-gray-600" : ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="keahlian">Bidang Keahlian</Label>
                            <Input 
                                id="keahlian" 
                                value={isEditing ? editForm.expertise : profile.expertise} 
                                disabled={!isEditing}
                                onChange={(e) => setEditForm({...editForm, expertise: e.target.value})}
                                className={!isEditing ? "bg-gray-50 text-gray-600" : ""}
                                placeholder="Pisahkan dengan koma"
                            />
                        </div>
                    </div>

                     {/* Baris 4: IDs */}
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="sinta_id">SINTA ID</Label>
                            <Input 
                                id="sinta_id" 
                                value={isEditing ? editForm.sinta_id : profile.sinta_id} 
                                disabled={!isEditing}
                                onChange={(e) => setEditForm({...editForm, sinta_id: e.target.value})}
                                className={!isEditing ? "bg-gray-50 text-gray-600" : ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="scopus_id">Scopus ID</Label>
                            <Input 
                                id="scopus_id" 
                                value={isEditing ? editForm.scopus_id : profile.scopus_id} 
                                disabled={!isEditing}
                                onChange={(e) => setEditForm({...editForm, scopus_id: e.target.value})}
                                className={!isEditing ? "bg-gray-50 text-gray-600" : ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gs_id">Google Scholar ID</Label>
                            <Input 
                                id="gs_id" 
                                value={isEditing ? editForm.google_scholar_id : profile.google_scholar_id} 
                                disabled={!isEditing}
                                onChange={(e) => setEditForm({...editForm, google_scholar_id: e.target.value})}
                                className={!isEditing ? "bg-gray-50 text-gray-600" : ""}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

        {/* Dummy Tab Content for History */}
        <TabsContent value="penelitian" className="mt-4">
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Riwayat Penelitian Terdahulu</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-md overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-700 font-semibold border-b">
                                <tr>
                                    <th className="px-6 py-3 w-16">Tahun</th>
                                    <th className="px-6 py-3">Judul Penelitian</th>
                                    <th className="px-6 py-3">Skema</th>
                                    <th className="px-6 py-3">Peran</th>
                                    <th className="px-6 py-3 text-right">Dana Disetujui</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="px-6 py-4">2023</td>
                                    <td className="px-6 py-4 font-medium">Analisis Sentimen Pemilu 2024 Menggunakan SVM</td>
                                    <td className="px-6 py-4"><Badge variant="outline">Penelitian Terapan</Badge></td>
                                    <td className="px-6 py-4">Ketua</td>
                                    <td className="px-6 py-4 text-right">Rp 45.000.000</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4">2022</td>
                                    <td className="px-6 py-4 font-medium">Pengembangan E-Learning Adaptif untuk SMK</td>
                                    <td className="px-6 py-4"><Badge variant="outline">Penelitian Dasar</Badge></td>
                                    <td className="px-6 py-4">Anggota</td>
                                    <td className="px-6 py-4 text-right">Rp 15.000.000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="pengabdian" className="mt-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Riwayat Pengabdian Masyarakat</CardTitle>
                </CardHeader>
                <CardContent>
                     <div className="border rounded-md overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-700 font-semibold border-b">
                                <tr>
                                    <th className="px-6 py-3 w-16">Tahun</th>
                                    <th className="px-6 py-3">Judul Kegiatan</th>
                                    <th className="px-6 py-3">Lokasi Mitra</th>
                                    <th className="px-6 py-3">Peran</th>
                                    <th className="px-6 py-3 text-right">Dana Disetujui</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="px-6 py-4">2023</td>
                                    <td className="px-6 py-4 font-medium">Pelatihan Digital Marketing untuk UMKM Desa Sukamaju</td>
                                    <td className="px-6 py-4">Desa Sukamaju</td>
                                    <td className="px-6 py-4">Ketua</td>
                                    <td className="px-6 py-4 text-right">Rp 10.000.000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}