import { apiSlice } from "@/services/base-query";
import type {
  Konten,
  KontenListParams,
  KontenListRawResponse,
  KontenListTransformed,
} from "@/types/admin/galeri/konten";

export const galeriKontenApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All (pagination: items/total/pageTotal/currentPage)
    getGaleriKontenList: builder.query<
      KontenListTransformed,
      KontenListParams | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/galeri/konten`,
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
    getGaleriKontenById: builder.query<Konten, number>({
      query: (id) => ({
        url: `/website/galeri/konten/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Konten;
      }) => response.data,
    }),

    // ➕ Create (pakai FormData karena ada banyak image*)
    // isi FormData (optional sesuai DTO):
    // - judul, deskripsi, penulis, tanggal(ISO), status(number/string), views(optional)
    // - image, image_2, image_3, image_4, image_5, image_6 (File) optional
    createGaleriKonten: builder.mutation<Konten, FormData>({
      query: (payload) => ({
        url: `/website/galeri/konten`,
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
    updateGaleriKonten: builder.mutation<Konten, { id: number; payload: FormData }>(
      {
        query: ({ id, payload }) => ({
          url: `/website/galeri/konten/${id}`,
          method: "PUT",
          body: payload,
        }),
        transformResponse: (response: {
          success: boolean;
          message: string;
          data: Konten;
        }) => response.data,
      }
    ),

    // ❌ Delete by ID
    deleteGaleriKonten: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/website/galeri/konten/${id}`,
        method: "DELETE`",
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
  useGetGaleriKontenListQuery,
  useGetGaleriKontenByIdQuery,
  useCreateGaleriKontenMutation,
  useUpdateGaleriKontenMutation,
  useDeleteGaleriKontenMutation,
} = galeriKontenApi;