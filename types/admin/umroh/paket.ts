export interface Paket {
  id: number;
  bahasa: string;
  kategori_id: number;
  judul: string;
  harga: string;
  detail_judul_1?: string | null;
  detail_sub_judul_1?: string | null;
  detail_deskripsi_1?: string | null;
  detail_judul_2?: string | null;
  detail_sub_judul_2?: string | null;
  detail_deskripsi_2?: string | null;
  detail_judul_3?: string | null;
  detail_sub_judul_3?: string | null;
  detail_deskripsi_3?: string | null;
  detail_judul_4?: string | null;
  detail_sub_judul_4?: string | null;
  detail_deskripsi_4?: string | null;
  image?: File | string | null;
  image_2?: File | string | null;
  image_3?: File | string | null;
  status: number;

  created_at?: string;
  updated_at?: string;
}

// Respons mentah dari backend (items/total/pageTotal/currentPage)
export interface PaketListRawResponse {
  success: boolean;
  message: string;
  data: {
    items: Paket[];
    total: number;
    pageTotal: number;
    currentPage: number;
  };
}

// Bentuk hasil transform untuk FE
export interface PaketListTransformed {
  data: Paket[];
  total: number;
  page_total: number;
  current_page: number;
}

// Query params list
export interface PaketListParams {
  page?: number; // default 1
  paginate?: number; // default 10
}