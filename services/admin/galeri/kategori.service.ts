import { apiSlice } from "@/services/base-query";
import type {
  Kategori,
  KategoriListParams,
  KategoriListRawResponse,
  KategoriListTransformed,
} from "@/types/admin/galeri/kategori";

type CreateKategoriPayload = Omit<Kategori, "id" | "created_at" | "updated_at">;
type UpdateKategoriPayload = Partial<CreateKategoriPayload>;

export const galeriKategoriApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All (pagination: items/total/pageTotal/currentPage)
    getGaleriKategoriList: builder.query<
      KategoriListTransformed,
      KategoriListParams | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/galeri/kategori`,
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
    getGaleriKategoriById: builder.query<Kategori, number>({
      query: (id) => ({
        url: `/website/galeri/kategori/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Kategori;
      }) => response.data,
    }),

    // ➕ Create (JSON)
    createGaleriKategori: builder.mutation<Kategori, CreateKategoriPayload>({
      query: (payload) => ({
        url: `/website/galeri/kategori`,
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
    updateGaleriKategori: builder.mutation<
      Kategori,
      { id: number; payload: UpdateKategoriPayload }
    >({
      query: ({ id, payload }) => ({
        url: `/website/galeri/kategori/${id}`,
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
    deleteGaleriKategori: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/website/galeri/kategori/${id}`,
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
  useGetGaleriKategoriListQuery,
  useGetGaleriKategoriByIdQuery,
  useCreateGaleriKategoriMutation,
  useUpdateGaleriKategoriMutation,
  useDeleteGaleriKategoriMutation,
} = galeriKategoriApi;