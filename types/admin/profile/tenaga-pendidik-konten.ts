export interface TenagaPendidikKonten {
  id: number;

  bahasa: string;
  judul: string;
  deskripsi: string;

  // File saat upload (create/update), string URL saat fetch dari backend
  image?: File | string | null;

  status: number;

  created_at?: string;
  updated_at?: string;
}

// Respons mentah dari backend (items/total/pageTotal/currentPage)
export interface TenagaPendidikKontenListRawResponse {
  success: boolean;
  message: string;
  data: {
    items: TenagaPendidikKonten[];
    total: number;
    pageTotal: number;
    currentPage: number;
  };
}

// Bentuk hasil transform untuk FE
export interface TenagaPendidikKontenListTransformed {
  data: TenagaPendidikKonten[];
  total: number;
  page_total: number;
  current_page: number;
}

// Query params list
export interface TenagaPendidikKontenListParams {
  page?: number; // default 1
  paginate?: number; // default 10
}