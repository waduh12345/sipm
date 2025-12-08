export interface Cara {
  id: number;
  bahasa: string;
  judul: string;
  sub_judul?: string | null;

  info_judul_1?: string | null;
  info_deskripsi_1?: string | null;
  info_icon_1?: string | null;

  info_judul_2?: string | null;
  info_deskripsi_2?: string | null;
  info_icon_2?: string | null;

  info_judul_3?: string | null;
  info_deskripsi_3?: string | null;
  info_icon_3?: string | null;

  image?: File |string | null; // URL/path dari backend
  status: number;

  // optional meta timestamps bila ada di backend
  created_at?: string;
  updated_at?: string;
}

// Bentuk response mentah dari contoh yang kamu beri
export interface CaraListRawResponse {
  success: boolean;
  message: string;
  data: {
    items: Cara[];
    total: number;
    pageTotal: number;
    currentPage: number;
  };
}

// Bentuk tertransformasi agar konsisten di FE
export interface CaraListTransformed {
  data: Cara[];
  total: number;
  page_total: number;
  current_page: number;
}

// Query params untuk list
export interface CaraListParams {
  page?: number; // default 1
  paginate?: number; // default 10/ sesuai backend
}