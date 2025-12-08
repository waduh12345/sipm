// ===============================
// types/admin/faq/konten.ts
// ===============================
export interface FaqKonten {
  id: number;
  judul: string;
  deskripsi: string;
  status: number;

  created_at?: string;
  updated_at?: string;
}

// Respons mentah dari backend (items/total/pageTotal/currentPage)
export interface FaqKontenListRawResponse {
  success: boolean;
  message: string;
  data: {
    items: FaqKonten[];
    total: number;
    pageTotal: number;
    currentPage: number;
  };
}

// Bentuk hasil transform untuk FE
export interface FaqKontenListTransformed {
  data: FaqKonten[];
  total: number;
  page_total: number;
  current_page: number;
}

// Query params list
export interface FaqKontenListParams {
  page?: number; // default 1
  paginate?: number; // default 10
}