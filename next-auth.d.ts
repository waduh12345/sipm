/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession } from "next-auth";

type UserRole = {
  id: number;
  name: string;
  guard_name?: string;
  created_at?: string; // ← penting untuk "Bergabung sejak"
  updated_at?: string;
  pivot?: {
    model_type: string;
    model_id: number;
    role_id: number;
  };
};

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      token: string;
      phone: string;
      roles: UserRole[]; // ← sekarang menyertakan created_at
      shop:
        | {
            id: number;
            user_id: number;
            name: string;
            slug: string;
            phone: string;
            email: string;
            address: string;
            description: string;
            latitude: number | null;
            longitude: number | null;
            rating: string;
            total_reviews: number;
            status: boolean;
            created_at: string;
            updated_at: string;
            rajaongkir_province_id: number;
            rajaongkir_city_id: number;
            rajaongkir_district_id: string;
            logo: string;
            banner: string;
          }[]
        | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: number;
    token: string;
    phone: string;
    roles: UserRole[]; // ← konsisten
    shop:
      | {
          id: number;
          user_id: number;
          name: string;
          slug: string;
          phone: string;
          email: string;
          address: string;
          description: string;
          latitude: number | null;
          longitude: number | null;
          rating: string;
          total_reviews: number;
          status: boolean;
          created_at: string;
          updated_at: string;
          rajaongkir_province_id: number;
          rajaongkir_city_id: number;
          rajaongkir_district_id: string;
          logo: string;
          banner: string;
        }[]
      | null;
  }
}