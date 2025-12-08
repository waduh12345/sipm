// ===============================
// types/admin/galeri/kategori.ts
// ===============================
export interface Kategori {
  id: number;
  bahasa: string;
  judul: string;
  status: number;

  created_at?: string;
  updated_at?: string;
}

// Respons mentah dari backend (items/total/pageTotal/currentPage)
export interface KategoriListRawResponse {
  success: boolean;
  message: string;
  data: {
    items: Kategori[];
    total: number;
    pageTotal: number;
    currentPage: number;
  };
}

// Bentuk hasil transform untuk FE
export interface KategoriListTransformed {
  data: Kategori[];
  total: number;
  page_total: number;
  current_page: number;
}

// Query params list
export interface KategoriListParams {
  page?: number; // default 1
  paginate?: number; // default 10
}