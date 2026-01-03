export interface Cta {
  id: number;
  bahasa: string; // "id" | "en"
  client_id: string | number; // hardcode "5"
  judul: string;
  deskripsi: string;
  button_1: string;
  button_link_1: string;
  button_2: string;
  button_link_2: string;
  info_judul_1: string | null;
  info_deskripsi_1: string | null;
  info_judul_2: string | null;
  info_deskripsi_2: string | null;
  info_judul_3: string | null;
  info_deskripsi_3: string | null;
  info_judul_4: string | null;
  info_deskripsi_4: string | null;
  status: number;
}

export interface CtaParams {
  client_code: string;
  bahasa?: string;
}

export interface CtaListResponse {
  success: boolean;
  message: string;
  data: {
    items: Cta[];
    total: number;
    pageTotal: number;
    currentPage: number;
  };
}

export interface CtaDetailResponse {
  success: boolean;
  message: string;
  data: Cta;
}