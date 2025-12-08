export interface Tentang {
  id: number;
  bahasa: string;
  judul: string;
  sub_judul?: string | null;
  deskripsi: string;

  info_1?: string | null;
  info_2?: string | null;
  info_3?: string | null;
  info_4?: string | null;

  image?: File | string | null; // URL/path dari backend atau File saat upload
  status: number;

  created_at?: string;
  updated_at?: string;
}

// Respons mentah dari backend (items/total/pageTotal/currentPage)
export interface TentangListRawResponse {
  success: boolean;
  message: string;
  data: {
    items: Tentang[];
    total: number;
    pageTotal: number;
    currentPage: number;
  };
}

// Bentuk hasil transform untuk FE
export interface TentangListTransformed {
  data: Tentang[];
  total: number;
  page_total: number;
  current_page: number;
}

// Query params list
export interface TentangListParams {
  page?: number; // default 1
  paginate?: number; // default 10
}