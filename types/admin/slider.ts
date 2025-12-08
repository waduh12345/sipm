export interface Slider {
  id: number;
  judul: string;
  image?: File | string | null; // URL/path dari backend atau File saat upload
  status: number;

  created_at?: string;
  updated_at?: string;
}

// Respons mentah dari backend (items/total/pageTotal/currentPage)
export interface SliderListRawResponse {
  success: boolean;
  message: string;
  data: {
    items: Slider[];
    total: number;
    pageTotal: number;
    currentPage: number;
  };
}

// Bentuk hasil transform untuk FE
export interface SliderListTransformed {
  data: Slider[];
  total: number;
  page_total: number;
  current_page: number;
}

// Query params list
export interface SliderListParams {
  page?: number; // default 1
  paginate?: number; // default 10
}