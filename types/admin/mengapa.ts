export interface Mengapa {
  id: number;
  bahasa: string;
  judul: string;

  sub_judul?: string | null;
  tagline?: string | null;

  info_judul_1?: string | null;
  info_icon_1?: string | null;
  info_deskripsi_1?: string | null;

  info_judul_2?: string | null;
  info_icon_2?: string | null;
  info_deskripsi_2?: string | null;

  info_judul_3?: string | null;
  info_icon_3?: string | null;
  info_deskripsi_3?: string | null;

  status: number;

  created_at?: string;
  updated_at?: string;
}

// Respons mentah dari backend (items/total/pageTotal/currentPage)
export interface MengapaListRawResponse {
  success: boolean;
  message: string;
  data: {
    items: Mengapa[];
    total: number;
    pageTotal: number;
    currentPage: number;
  };
}

// Bentuk hasil transform untuk FE
export interface MengapaListTransformed {
  data: Mengapa[];
  total: number;
  page_total: number;
  current_page: number;
}

// Query params list
export interface MengapaListParams {
  page?: number; // default 1
  paginate?: number; // default 10
}