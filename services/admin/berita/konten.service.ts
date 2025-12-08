import { apiSlice } from "@/services/base-query";
import type {
  Konten,
  KontenListParams,
  KontenListRawResponse,
  KontenListTransformed,
} from "@/types/admin/berita/konten";

export const kontenApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All (pagination: items/total/pageTotal/currentPage)
    getKontenList: builder.query<
      KontenListTransformed,
      KontenListParams | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/berita/konten`,
          method: "GET",
          params: { page, paginate },
        };
      },
      transformResponse: (
        response: KontenListRawResponse
      ): KontenListTransformed => ({
        data: response.data.items,
        total: response.data.total,
        page_total: response.data.pageTotal,
        current_page: response.data.currentPage,
      }),
    }),

    // 🔎 Get by ID
    getKontenById: builder.query<Konten, number>({
      query: (id) => ({
        url: `/website/berita/konten/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Konten;
      }) => response.data,
    }),

    // ➕ Create (pakai FormData karena ada image)
    // Catatan: isi payload:
    // - judul, deskripsi, penulis, tanggal (string/ISO), status (string/number), views (optional)
    // - image (File) optional
    createKonten: builder.mutation<Konten, FormData>({
      query: (payload) => ({
        url: `/website/berita/konten`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Konten;
      }) => response.data,
    }),

    // ✏️ Update by ID (FormData)
    updateKonten: builder.mutation<Konten, { id: number; payload: FormData }>({
      query: ({ id, payload }) => ({
        url: `/website/berita/konten/${id}`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Konten;
      }) => response.data,
    }),

    // ❌ Delete by ID
    deleteKonten: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/website/berita/konten/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: null;
      }) => ({ success: response.success, message: response.message }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetKontenListQuery,
  useGetKontenByIdQuery,
  useCreateKontenMutation,
  useUpdateKontenMutation,
  useDeleteKontenMutation,
} = kontenApi;