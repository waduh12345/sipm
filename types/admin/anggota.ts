export interface Anggota {
  id: number;
  name: string;
  email: string;
  gender: string;
  birth_place: string;
  birth_date: string;
  address: string;
  phone: string;
  password?: string;
  password_confirmation?: string;
  status: number;
  // New fields from the desired JSON structure:
  province_id?: string;
  regency_id?: string;
  district_id?: string;
  village_id?: string;
  rt?: number;
  rw?: number;
  ktp?: string;
  religion?: string;
  marital_status?: string;
  occupation?: string;
  last_education?: string;
  phone_home?: string;
  phone_office?: string;
  phone_faksimili?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  whatsapp?: string;
  tiktok?: string;
  path?: string;
}
