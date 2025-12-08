export interface Information {
  id: number;

  bahasa: string;
  judul: string;
  sub_judul: string;
  deskripsi?: string | null;

  // Section icon/judul/deskripsi (1..3)
  icon_1?: string | null;
  judul_1?: string | null;
  deskripsi_1?: string | null;

  icon_2?: string | null;
  judul_2?: string | null;
  deskripsi_2?: string | null;

  icon_3?: string | null;
  judul_3?: string | null;
  deskripsi_3?: string | null;

  // Button
  text_button?: string | null;
  link_button?: string | null;

  // Kontak (1..3)
  kontak_icon_1?: string | null;
  kontak_judul_1?: string | null;
  kontak_isi_1?: string | null;
  kontak_keterangan_1?: string | null;

  kontak_icon_2?: string | null;
  kontak_judul_2?: string | null;
  kontak_isi_2?: string | null;
  kontak_keterangan_2?: string | null;

  kontak_icon_3?: string | null;
  kontak_judul_3?: string | null;
  kontak_isi_3?: string | null;
  kontak_keterangan_3?: string | null;

  status: number;

  created_at?: string;
  updated_at?: string;
}

// Respons mentah dari backend (items/total/pageTotal/currentPage)
export interface InformationListRawResponse {
  success: boolean;
  message: string;
  data: {
    items: Information[];
    total: number;
    pageTotal: number;
    currentPage: number;
  };
}

// Bentuk hasil transform untuk FE
export interface InformationListTransformed {
  data: Information[];
  total: number;
  page_total: number;
  current_page: number;
}

// Query params list
export interface InformationListParams {
  page?: number; // default 1
  paginate?: number; // default 10
}