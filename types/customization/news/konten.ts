export interface BeritaKonten {
  id: number | string;
  client_id: string; // '7'
  bahasa: string; // 'id' | 'en'

  // Field spesifik Berita Konten (berdasarkan form umum)
  id_category: string | number; // Relasi ke Kategori
  kategori_id: string | number;
  judul: string;
  slug?: string; // Biasanya digenerate backend
  deskripsi: string; // Isi berita (HTML/Rich Text)
  image: string | null; // URL gambar
  author: string;
  penulis: string;
  tanggal: string; // YYYY-MM-DD
  tag?: string; // Comma separated string

  status: number; // 1
  created_at?: string;
  updated_at?: string;
}

// Parameter untuk GET List (Query String)
export interface BeritaKontenListParams {
  client_code: string;
  bahasa?: string; // 'id' | 'en'
  id_category?: string; // Opsional: filter by kategori
}

// Response Get All
export interface BeritaKontenListResponse {
  success: boolean;
  message: string;
  data: {
    items: BeritaKonten[];
    total: number;
    pageTotal: number;
    currentPage: number;
  };
}

// Response Single Data (Create, Update, Get Detail)
export interface BeritaKontenDetailResponse {
  success: boolean;
  message: string;
  data: BeritaKonten;
}