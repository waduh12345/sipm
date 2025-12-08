import { apiSlice } from "@/services/base-query";
import type {
  Kategori,
  KategoriListParams,
  KategoriListRawResponse,
  KategoriListTransformed,
} from "@/types/admin/berita/kategori";

type CreateKategoriPayload = Omit<Kategori, "id" | "created_at" | "updated_at">;
type UpdateKategoriPayload = Partial<CreateKategoriPayload>;

export const kategoriApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All (pagination: items/total/pageTotal/currentPage)
    getKategoriList: builder.query<
      KategoriListTransformed,
      KategoriListParams | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/berita/kategori`,
          method: "GET",
          params: { page, paginate },
        };
      },
      transformResponse: (
        response: KategoriListRawResponse
      ): KategoriListTransformed => ({
        data: response.data.items,
        total: response.data.total,
        page_total: response.data.pageTotal,
        current_page: response.data.currentPage,
      }),
    }),

    // 🔎 Get by ID
    getKategoriById: builder.query<Kategori, number>({
      query: (id) => ({
        url: `/website/berita/kategori/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Kategori;
      }) => response.data,
    }),

    // ➕ Create (JSON)
    createKategori: builder.mutation<Kategori, CreateKategoriPayload>({
      query: (payload) => ({
        url: `/website/berita/kategori`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Kategori;
      }) => response.data,
    }),

    // ✏️ Update by ID (JSON)
    updateKategori: builder.mutation<
      Kategori,
      { id: number; payload: UpdateKategoriPayload }
    >({
      query: ({ id, payload }) => ({
        url: `/website/berita/kategori/${id}`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Kategori;
      }) => response.data,
    }),

    // ❌ Delete by ID
    deleteKategori: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/website/berita/kategori/${id}`,
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
  useGetKategoriListQuery,
  useGetKategoriByIdQuery,
  useCreateKategoriMutation,
  useUpdateKategoriMutation,
  useDeleteKategoriMutation,
} = kategoriApi;