export interface FaqKategori {
  id: number | string;
  client_id: number | string; // Based on response "client_id": 7 (number) or "7" (string)
  bahasa: string; // 'id' | 'en'
  judul: string;
  status: number; // 1
}

export interface FaqKategoriListParams {
  client_code: string;
  bahasa?: string;
}

export interface FaqKategoriListResponse {
  success: boolean;
  message: string;
  data: {
    items: FaqKategori[];
    total: number;
    pageTotal: number;
    currentPage: number;
  };
}

export interface FaqKategoriDetailResponse {
  success: boolean;
  message: string;
  data: FaqKategori;
}