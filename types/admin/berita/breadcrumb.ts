// ===============================
// types/admin/faq/breadcrumb.ts
// ===============================
export interface Breadcrumb {
  id: number;
  bahasa: string;
  judul: string;
  sub_judul: string;
  deskripsi?: string | null;
  status: number;

  created_at?: string;
  updated_at?: string;
}

// Respons mentah dari backend (items/total/pageTotal/currentPage)
export interface BreadcrumbListRawResponse {
  success: boolean;
  message: string;
  data: {
    items: Breadcrumb[];
    total: number;
    pageTotal: number;
    currentPage: number;
  };
}

// Bentuk hasil transform untuk FE
export interface BreadcrumbListTransformed {
  data: Breadcrumb[];
  total: number;
  page_total: number;
  current_page: number;
}

// Query params list
export interface BreadcrumbListParams {
  page?: number; // default 1
  paginate?: number; // default 10
}