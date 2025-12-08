export interface Konten {
  id: number;

  judul: string;
  deskripsi: string;
  penulis: string;
  tanggal: string; // simpan sebagai ISO string dari backend (atau Date kalau backend kirim date ISO)
  views?: number | null;

  image?: File | string | null; // File saat upload, string URL/path saat fetch

  status: number;

  created_at?: string;
  updated_at?: string;
}

// Respons mentah dari backend (items/total/pageTotal/currentPage)
export interface KontenListRawResponse {
  success: boolean;
  message: string;
  data: {
    items: Konten[];
    total: number;
    pageTotal: number;
    currentPage: number;
  };
}

// Bentuk hasil transform untuk FE
export interface KontenListTransformed {
  data: Konten[];
  total: number;
  page_total: number;
  current_page: number;
}

// Query params list
export interface KontenListParams {
  page?: number; // default 1
  paginate?: number; // default 10
}