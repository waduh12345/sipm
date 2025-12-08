export interface AlumniKonten {
  id: number;

  bahasa: string;
  judul: string;
  sub_judul: string;
  deskripsi: string;

  image?: File | string | null; // File saat upload, URL/path saat fetch

  status: number;

  created_at?: string;
  updated_at?: string;
}

// Respons mentah dari backend (items/total/pageTotal/currentPage)
export interface AlumniKontenListRawResponse {
  success: boolean;
  message: string;
  data: {
    items: AlumniKonten[];
    total: number;
    pageTotal: number;
    currentPage: number;
  };
}

// Bentuk hasil transform untuk FE
export interface AlumniKontenListTransformed {
  data: AlumniKonten[];
  total: number;
  page_total: number;
  current_page: number;
}

// Query params list
export interface AlumniKontenListParams {
  page?: number; // default 1
  paginate?: number; // default 10
}