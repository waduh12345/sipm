export interface Informasi {
  id: number;
  bahasa: string;
  judul: string;
  icon: string;
  deskripsi?: string | null;
  status: number;

  created_at?: string;
  updated_at?: string;
}

// Respons mentah dari backend (items/total/pageTotal/currentPage)
export interface InformasiListRawResponse {
  success: boolean;
  message: string;
  data: {
    items: Informasi[];
    total: number;
    pageTotal: number;
    currentPage: number;
  };
}

// Bentuk hasil transform untuk FE
export interface InformasiListTransformed {
  data: Informasi[];
  total: number;
  page_total: number;
  current_page: number;
}

// Query params list
export interface InformasiListParams {
  page?: number; // default 1
  paginate?: number; // default 10
}