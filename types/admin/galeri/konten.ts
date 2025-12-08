export interface Konten {
  id: number;

  judul: string;
  deskripsi: string;
  penulis: string;
  tanggal: string; // simpan sebagai ISO string dari backend
  views?: number | null;

  image?: File | string | null;
  image_2?: File | string | null;
  image_3?: File | string | null;
  image_4?: File | string | null;
  image_5?: File | string | null;
  image_6?: File | string | null;

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