export interface TenagaPendidikInformasi {
  id: number;
  bahasa: string;
  judul: string;
  deskripsi?: string | null;
  status: number;

  created_at?: string;
  updated_at?: string;
}

// Respons mentah dari backend (items/total/pageTotal/currentPage)
export interface TenagaPendidikInformasiListRawResponse {
  success: boolean;
  message: string;
  data: {
    items: TenagaPendidikInformasi[];
    total: number;
    pageTotal: number;
    currentPage: number;
  };
}

// Bentuk hasil transform untuk FE
export interface TenagaPendidikInformasiListTransformed {
  data: TenagaPendidikInformasi[];
  total: number;
  page_total: number;
  current_page: number;
}

// Query params list
export interface TenagaPendidikInformasiListParams {
  page?: number; // default 1
  paginate?: number; // default 10
}