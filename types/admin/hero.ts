// ===============================
// types/admin/hero.ts
// ===============================
export interface Hero {
  id: number;
  bahasa: string;
  judul: string;
  sub_judul?: string | null;
  tagline?: string | null;
  deskripsi: string;

  button_text_1?: string | null;
  button_text_2?: string | null;

  info_1?: string | null;
  info_2?: string | null;
  info_3?: string | null;

  info_nilai_1?: string | null;
  info_nilai_2?: string | null;
  info_nilai_3?: string | null;

  image?: File | string | null; // URL/path dari backend atau File saat upload
  status: number;

  created_at?: string;
  updated_at?: string;
}

// Respons mentah dari backend
export interface HeroListRawResponse {
  success: boolean;
  message: string;
  data: {
    items: Hero[];
    total: number;
    pageTotal: number;
    currentPage: number;
  };
}

// Bentuk yang dipakai FE setelah transform
export interface HeroListTransformed {
  data: Hero[];
  total: number;
  page_total: number;
  current_page: number;
}

// Query params untuk list
export interface HeroListParams {
  page?: number; // default 1
  paginate?: number; // default 10
}