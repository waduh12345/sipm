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
  Briefcase, 
  Award, 
  Edit2, 
  Save, 
  School,
  CreditCard,
  FileCheck,
  Clock,
  ThumbsUp,
  X
} from "lucide-react";
import Swal from "sweetalert2";

// --- Types ---
interface ReviewerProfile {
  name: string;
  nidn: string;
  email: string;
  phone: string;
  institution: string;
  functional_position: string; // Jafung
  academic_degree: string; // Gelar
  expertise_tags: string[]; // Array of strings for tags
  bank_name: string;
  account_number: string;
  account_holder: string;
  npwp: string;
  stats: {
    total_reviewed: number;
    pending_reviews: number;
    avg_completion_days: number;
    on_time_rate: number; // Percentage
  };
}

// --- Dummy Data ---
const INITIAL_PROFILE: ReviewerProfile = {
  name: "Prof. Dr. Ir. Siti Aminah, M.Eng.",
  nidn: "0011223344",
  email: "siti.aminah@univ-negeri.ac.id",
  phone: "+62 811-9988-7766",
  institution: "Universitas Negeri Contoh",
  functional_position: "Guru Besar",
  academic_degree: "Doktor (S3)",
  expertise_tags: ["Renewable Energy", "Smart Grid", "Power Systems", "IoT"],
  bank_name: "Bank Mandiri",
  account_number: "123-00-9876543-2",
  account_holder: "Siti Aminah",
  npwp: "12.345.678.9-012.000",
  stats: {
    total_reviewed: 45,
    pending_reviews: 3,
    avg_completion_days: 4.2,
    on_time_rate: 98,
  },
};

export default function ReviewerProfilePage() {
  const [profile, setProfile] = useState<ReviewerProfile>(INITIAL_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<ReviewerProfile>(INITIAL_PROFILE);
  const [newTag, setNewTag] = useState("");

  // --- Handlers ---
  const handleEditToggle = () => {
    if (isEditing) {
      setEditForm(profile); // Reset form
      setIsEditing(false);
    } else {
      setEditForm(profile);
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (!editForm.name || !editForm.email || !editForm.account_number) {
      Swal.fire("Gagal", "Nama, Email, dan No. Rekening wajib diisi!", "error");
      return;
    }

    Swal.fire({
      title: "Simpan Perubahan?",
      text: "Data profil reviewer akan diperbarui.",
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

  // Expertise Tag Handlers
  const addTag = () => {
    if (newTag && !editForm.expertise_tags.includes(newTag)) {
      setEditForm({
        ...editForm,
        expertise_tags: [...editForm.expertise_tags, newTag]
      });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setEditForm({
      ...editForm,
      expertise_tags: editForm.expertise_tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      
      {/* Header Profile */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-4xl font-bold border-4 border-white shadow-md shrink-0">
            {profile.name.charAt(0)}
          </div>
          
          <div className="flex-1 space-y-2">
            <div>
              <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200">Reviewer Aktif</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-1 text-gray-600 text-sm">
                <span className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" /> {profile.functional_position}
                </span>
                <span className="hidden md:inline">•</span>
                <span className="flex items-center gap-1">
                  <School className="h-4 w-4" /> {profile.institution}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {profile.expertise_tags.map((tag, idx) => (
                <Badge key={idx} variant="outline" className="text-gray-600 border-gray-300">
                  {tag}
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

      {/* Stats Cards (Reviewer Specific) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FileCheck className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Total Review</p>
              <h3 className="text-2xl font-bold text-gray-900">{profile.stats.total_reviewed}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Pending Review</p>
              <h3 className="text-2xl font-bold text-gray-900">{profile.stats.pending_reviews}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <ThumbsUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">On-Time Rate</p>
              <h3 className="text-2xl font-bold text-gray-900">{profile.stats.on_time_rate}%</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Rata-rata Durasi</p>
              <h3 className="text-2xl font-bold text-gray-900">{profile.stats.avg_completion_days} <span className="text-xs font-normal text-gray-500">Hari</span></h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Detail */}
      <Tabs defaultValue="biodata" className="w-full">
        <TabsList className="bg-white w-full justify-start rounded-lg border p-1 h-auto flex-wrap">
            <TabsTrigger value="biodata" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 px-4 py-2">Biodata Diri</TabsTrigger>
            <TabsTrigger value="kepakaran" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 px-4 py-2">Bidang Kepakaran</TabsTrigger>
            <TabsTrigger value="rekening" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 px-4 py-2">Data Rekening (Honorarium)</TabsTrigger>
        </TabsList>

        {/* TAB 1: Biodata */}
        <TabsContent value="biodata" className="mt-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <User className="h-5 w-5 text-purple-600" /> Informasi Akademik & Kontak
                    </CardTitle>
                    <CardDescription>Data ini digunakan untuk identifikasi profil reviewer.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama Lengkap & Gelar</Label>
                            <Input 
                                id="name" 
                                value={isEditing ? editForm.name : profile.name} 
                                disabled={!isEditing}
                                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                className={!isEditing ? "bg-gray-50 text-gray-600" : ""}
                            />
                        </div>
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <Label htmlFor="institution">Institusi Asal</Label>
                            <Input 
                                id="institution" 
                                value={isEditing ? editForm.institution : profile.institution} 
                                disabled={!isEditing}
                                onChange={(e) => setEditForm({...editForm, institution: e.target.value})}
                                className={!isEditing ? "bg-gray-50 text-gray-600" : ""}
                            />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="jafung">Jabatan Fungsional</Label>
                            {isEditing ? (
                                <select 
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    value={editForm.functional_position}
                                    onChange={(e) => setEditForm({...editForm, functional_position: e.target.value})}
                                >
                                    <option value="Lektor">Lektor</option>
                                    <option value="Lektor Kepala">Lektor Kepala</option>
                                    <option value="Guru Besar">Guru Besar</option>
                                </select>
                            ) : (
                                <Input value={profile.functional_position} disabled className="bg-gray-50 text-gray-600" />
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-gray-400" /> Email
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
                </CardContent>
            </Card>
        </TabsContent>

        {/* TAB 2: Kepakaran */}
        <TabsContent value="kepakaran" className="mt-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Award className="h-5 w-5 text-purple-600" /> Bidang Kepakaran (Expertise)
                    </CardTitle>
                    <CardDescription>
                        Kata kunci ini digunakan oleh sistem untuk mencocokkan proposal dengan kompetensi Anda.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {isEditing && (
                        <div className="flex gap-2 mb-4">
                            <Input 
                                placeholder="Tambah keahlian baru (misal: Data Mining)..." 
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addTag()}
                            />
                            <Button onClick={addTag} type="button" variant="secondary">Tambah</Button>
                        </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 min-h-[100px] items-start">
                        {editForm.expertise_tags.length === 0 ? (
                            <span className="text-gray-400 text-sm italic">Belum ada data kepakaran.</span>
                        ) : (
                            editForm.expertise_tags.map((tag, idx) => (
                                <Badge 
                                    key={idx} 
                                    className={`text-sm py-1 px-3 ${isEditing ? 'pr-1' : ''}`} 
                                    variant="secondary"
                                >
                                    {tag}
                                    {isEditing && (
                                        <button 
                                            onClick={() => removeTag(tag)}
                                            className="ml-2 hover:bg-gray-200 rounded-full p-0.5"
                                        >
                                            <X className="h-3 w-3 text-gray-500" />
                                        </button>
                                    )}
                                </Badge>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

        {/* TAB 3: Rekening */}
        <TabsContent value="rekening" className="mt-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-purple-600" /> Data Rekening & NPWP
                    </CardTitle>
                    <CardDescription>
                        Informasi ini kerahasiaannya terjamin dan hanya digunakan untuk keperluan transfer honorarium review.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="bank_name">Nama Bank</Label>
                            <Input 
                                id="bank_name" 
                                value={isEditing ? editForm.bank_name : profile.bank_name} 
                                disabled={!isEditing}
                                onChange={(e) => setEditForm({...editForm, bank_name: e.target.value})}
                                placeholder="Contoh: Bank Mandiri"
                                className={!isEditing ? "bg-gray-50 text-gray-600" : ""}
                            />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="account_number">Nomor Rekening</Label>
                            <Input 
                                id="account_number" 
                                value={isEditing ? editForm.account_number : profile.account_number} 
                                disabled={!isEditing}
                                onChange={(e) => setEditForm({...editForm, account_number: e.target.value})}
                                className={!isEditing ? "bg-gray-50 text-gray-600 font-mono" : "font-mono"}
                            />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="account_holder">Nama Pemilik Rekening</Label>
                            <Input 
                                id="account_holder" 
                                value={isEditing ? editForm.account_holder : profile.account_holder} 
                                disabled={!isEditing}
                                onChange={(e) => setEditForm({...editForm, account_holder: e.target.value})}
                                className={!isEditing ? "bg-gray-50 text-gray-600" : ""}
                            />
                            <p className="text-xs text-gray-500">Pastikan nama sesuai dengan buku tabungan.</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="npwp">NPWP</Label>
                            <Input 
                                id="npwp" 
                                value={isEditing ? editForm.npwp : profile.npwp} 
                                disabled={!isEditing}
                                onChange={(e) => setEditForm({...editForm, npwp: e.target.value})}
                                className={!isEditing ? "bg-gray-50 text-gray-600 font-mono" : "font-mono"}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}