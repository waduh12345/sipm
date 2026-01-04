// Tipe data untuk satu item Kategori
export interface BeritaKategori {
  id: number | string;
  bahasa: string; // 'id' | 'en'
  client_id: string; // '7'
  judul: string;
  status: number; // 1
  created_at?: string;
  updated_at?: string;
  kategori_id: number;
}

// Parameter untuk GET (Query String)
export interface BeritaKategoriListParams {
  client_code: string;
  bahasa?: string; // 'id' | 'en'
}

// Response Get All
export interface BeritaKategoriListResponse {
  success: boolean;
  message: string;
  data: {
    items: BeritaKategori[];
    total: number;
    pageTotal: number;
    currentPage: number;
  };
}

// Response Single Data (Create, Update)
export interface BeritaKategoriDetailResponse {
  success: boolean;
  message: string;
  data: BeritaKategori;
}