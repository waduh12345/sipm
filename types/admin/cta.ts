export interface Cta {
  id: number;
  bahasa: string;
  judul: string;

  deskripsi?: string | null;

  button_1?: string | null;
  button_2?: string | null;

  info_judul_1?: string | null;
  info_deskripsi_1?: string | null;

  info_judul_2?: string | null;
  info_deskripsi_2?: string | null;

  info_judul_3?: string | null;
  info_deskripsi_3?: string | null;

  info_judul_4?: string | null;
  info_deskripsi_4?: string | null;

  status: number;

  created_at?: string;
  updated_at?: string;
}

// Respons mentah dari backend (sesuai pola items/total/pageTotal/currentPage)
export interface CtaListRawResponse {
  success: boolean;
  message: string;
  data: {
    items: Cta[];
    total: number;
    pageTotal: number;
    currentPage: number;
  };
}

// Bentuk yang dipakai FE setelah transform
export interface CtaListTransformed {
  data: Cta[];
  total: number;
  page_total: number;
  current_page: number;
}

// Query params untuk list
export interface CtaListParams {
  page?: number; // default 1
  paginate?: number; // default 10 (atau sesuai kebutuhanmu)
}