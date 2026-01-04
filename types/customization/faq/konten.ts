export interface FaqKonten {
  id: number | string;
  client_id: number | string;
  kategori_id: number | string; // Based on lampiran: kategori_id
  judul: string; // Based on lampiran: judul
  deskripsi: string; // Based on lampiran: deskripsi
  image: string | null; // Based on lampiran: image (File -> string url from API)
  status: number; // Based on lampiran: status
  penulis: string; // Based on lampiran: penulis
  tanggal: string; // Based on lampiran: tanggal
  views: number | null; // Based on lampiran: views
}

export interface FaqKontenListParams {
  client_code: string;
  bahasa?: string;
  kategori_id?: string | number; // Optional filter
}

export interface FaqKontenListResponse {
  success: boolean;
  message: string;
  data: {
    items: FaqKonten[];
    total: number;
    pageTotal: number;
    currentPage: number;
  };
}

export interface FaqKontenDetailResponse {
  success: boolean;
  message: string;
  data: FaqKonten;
}