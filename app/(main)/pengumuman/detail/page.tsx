import { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// --- DATA SAMPLE ---
// Kita akan menampilkan data pertama (id: "1") secara statis.
const announcementsData: Record<
  string,
  {
    id: string
    title: string
    content: string
    imageUrl: string
    date: string
    category: string
    author: string
  }
> = {
  "1": {
    id: "1",
    title: "Pendaftaran Anggota Baru Dibuka",
    content: `Kami dengan senang hati mengumumkan bahwa pendaftaran anggota baru telah dibuka untuk periode ini. Sebagai anggota, Anda akan mendapatkan berbagai benefit eksklusif termasuk akses ke program pelatihan, networking events, dan kesempatan untuk berkontribusi dalam berbagai kegiatan organisasi.\n\nProgram keanggotaan kami dirancang untuk memberikan nilai maksimal bagi setiap anggota. Dengan bergabung, Anda akan menjadi bagian dari komunitas yang solid dan saling mendukung dalam mencapai tujuan bersama.\n\nBeberapa benefit yang akan Anda dapatkan:\n• Akses ke semua program pelatihan dan workshop\n• Networking dengan profesional dari berbagai bidang\n• Kesempatan untuk mengikuti kegiatan sosial dan pengabdian masyarakat\n• Dukungan dalam pengembangan karir dan bisnis\n• Akses ke platform digital eksklusif untuk anggota\n\nJangan lewatkan kesempatan emas ini! Daftarkan diri Anda sekarang juga dan jadilah bagian dari perubahan positif. Untuk informasi lebih lanjut dan pendaftaran, silakan hubungi sekretariat kami atau kunjungi website resmi organisasi.`,
    imageUrl: "https://placehold.co/1200x400/a3e635/172554?text=Pendaftaran+Dibuka",
    date: "15 Jan 2024",
    category: "Keanggotaan",
    author: "Tim Sekretariat",
  },
  // Data lain bisa dihapus jika tidak lagi diperlukan, tapi kita biarkan saja untuk saat ini.
  "2": {
    id: "2",
    title: "Rapat Koordinasi Bulanan",
    content: `Rapat koordinasi bulanan akan dilaksanakan pada tanggal 20 Januari 2024. Agenda rapat meliputi evaluasi program bulan lalu, pembahasan program kerja bulan ini, dan diskusi mengenai strategi pengembangan organisasi ke depan.\n\nKehadiran seluruh anggota sangat diharapkan untuk memastikan koordinasi yang baik dalam menjalankan program-program organisasi. Rapat akan dilaksanakan secara hybrid, baik offline maupun online melalui platform video conference.\n\nDetail Acara:\n• Tanggal: 20 Januari 2024\n• Waktu: 09.00 - 12.00 WIB\n• Tempat: Kantor Pusat / Online via Zoom\n• Dresscode: Smart Casual\n\nAgenda Rapat:\n1. Pembukaan dan laporan ketua\n2. Evaluasi program bulan lalu\n3. Presentasi program kerja bulan ini\n4. Diskusi dan masukan dari anggota\n5. Penutupan\n\nMohon konfirmasi kehadiran Anda paling lambat 2 hari sebelum acara. Untuk yang berhalangan hadir, dapat mengikuti secara online dengan mendaftar terlebih dahulu.`,
    imageUrl: "https://placehold.co/1200x400/67e8f9/164e63?text=Rapat+Koordinasi",
    date: "12 Jan 2024",
    category: "Acara",
    author: "Koordinator Acara",
  },
  "3": {
    id: "3",
    title: "Program Pelatihan Gratis",
    content: `Organisasi kami menyelenggarakan program pelatihan gratis untuk seluruh anggota. Pelatihan ini mencakup berbagai topik seperti leadership, public speaking, dan digital marketing. Daftarkan diri Anda segera karena kuota terbatas.\n\nProgram pelatihan ini dirancang khusus untuk meningkatkan kompetensi dan skill anggota dalam berbagai bidang yang relevan dengan perkembangan zaman. Semua materi akan disampaikan oleh praktisi dan ahli yang berpengalaman di bidangnya.\n\nTopik Pelatihan:\n• Leadership & Management Skills\n• Public Speaking & Communication\n• Digital Marketing & Social Media\n• Personal Branding\n• Financial Literacy\n\nFasilitas:\n• Materi pelatihan lengkap\n• Sertifikat resmi\n• Networking session\n• Konsultasi gratis dengan mentor\n• Akses ke komunitas alumni pelatihan\n\nSyarat & Ketentuan:\n• Anggota aktif organisasi\n• Mengisi formulir pendaftaran\n• Komitmen mengikuti seluruh sesi pelatihan\n• Kuota terbatas 50 peserta\n\nSegera daftarkan diri Anda dan tingkatkan kompetensi untuk masa depan yang lebih baik!`,
    imageUrl: "https://placehold.co/1200x400/f9a8d4/831843?text=Pelatihan+Gratis",
    date: "10 Jan 2024",
    category: "Pelatihan",
    author: "Divisi Pengembangan SDM",
  },
}

// --- FUNGSI METADATA STATIS ---
// generateStaticParams dihapus karena halaman ini tidak lagi dinamis.
export async function generateMetadata(): Promise<Metadata> {
  const announcement = announcementsData["1"] // Langsung ambil data pertama

  return {
    title: announcement.title,
    description: `Baca pengumuman lengkap tentang ${announcement.title}`,
  }
}

// --- KOMPONEN HALAMAN STATIS ---
// Komponen tidak lagi menerima 'params' sebagai props.
export default function PengumumanDetailPage() {
  const announcement = announcementsData["1"] // Langsung gunakan data pertama

  return (
    <div className="min-h-screen bg-background">
      {/* Placeholder untuk header */}
      <div
        className="h-64 bg-cover bg-center flex items-end p-8"
        style={{ backgroundImage: `url(${announcement.imageUrl})` }}
      >
        <h1 className="text-4xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>{announcement.title}</h1>
      </div>


      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6 pb-8">
        {/* Meta Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <Badge>{announcement.category}</Badge>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{announcement.date}</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Bagikan
              </Button>
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Dipublikasikan oleh <span className="font-semibold text-foreground">{announcement.author}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <Card>
          <CardContent className="p-6">
            <div className="prose prose-sm max-w-none">
              {/* Memisahkan paragraf berdasarkan baris baru ganda */}
              {announcement.content.split("\n\n").map((paragraph, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  {paragraph.split('\n').map((line, lineIndex) => (
                    <p key={lineIndex} className="text-sm text-foreground leading-relaxed text-pretty">
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
