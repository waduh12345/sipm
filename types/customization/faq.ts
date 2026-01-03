export interface FAQCustom {
  id: number; // Dibutuhkan untuk identitas dan operasi PUT
  client_id: number;
  kategori_id: number;
  bahasa: string; // Biasanya diperlukan untuk filter bahasa
  judul: string;
  deskripsi: string;
  status: number;
}

export interface FAQParams {
  client_code: string;
  bahasa?: string;
}

export interface FAQListResponse {
  success: boolean;
  message: string;
  data: {
    items: FAQCustom[];
    total: number;
    pageTotal: number;
    currentPage: number;
  };
}

export interface FAQDetailResponse {
  success: boolean;
  message: string;
  data: FAQCustom;
}
