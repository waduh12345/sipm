export interface Achievement {
  id: number;
  client_id: number; // hardcode 7
  bahasa: string; // "id" | "en"
  judul: string;
  deskripsi: string;
  image_1: File | string | null;
  image_2: File | string | null;
  image_3: File | string | null;
  image_4: File | string | null;
  status: boolean | number;

  // Info Items 1-4
  info_judul_1: string | null;
  info_deskripsi_1: string | null;
  info_icon_1: string | null;

  info_judul_2: string | null;
  info_deskripsi_2: string | null;
  info_icon_2: string | null;

  info_judul_3: string | null;
  info_deskripsi_3: string | null;
  info_icon_3: string | null;

  info_judul_4: string | null;
  info_deskripsi_4: string | null; 
  info_icon_4: string | null;
}

export interface AchievementParams {
  client_code: string;
  bahasa?: string;
}

export interface AchievementListResponse {
  success: boolean;
  message: string;
  data: {
    items: Achievement[];
    total: number;
    pageTotal: number;
    currentPage: number;
  };
}

export interface AchievementDetailResponse {
  success: boolean;
  message: string;
  data: Achievement;
}