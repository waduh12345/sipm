import { apiSlice } from "@/services/base-query";
import type {
  Paket,
  PaketListParams,
  PaketListRawResponse,
  PaketListTransformed,
} from "@/types/admin/umroh/paket";

export const umrohPaketApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All (pagination: items/total/pageTotal/currentPage)
    getUmrohPaketList: builder.query<
      PaketListTransformed,
      PaketListParams | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/umroh/paket`,
          method: "GET",
          params: { page, paginate },
        };
      },
      transformResponse: (
        response: PaketListRawResponse
      ): PaketListTransformed => ({
        data: response.data.items,
        total: response.data.total,
        page_total: response.data.pageTotal,
        current_page: response.data.currentPage,
      }),
    }),

    // 🔎 Get by ID
    getUmrohPaketById: builder.query<Paket, number>({
      query: (id) => ({
        url: `/website/umroh/paket/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Paket;
      }) => response.data,
    }),

    // ➕ Create (pakai FormData karena ada banyak image*)
    // isi FormData (optional sesuai DTO):
    // - judul, deskripsi, penulis, tanggal(ISO), status(number/string), views(optional)
    // - image, image_2, image_3, image_4, image_5, image_6 (File) optional
    createUmrohPaket: builder.mutation<Paket, FormData>({
      query: (payload) => ({
        url: `/website/umroh/paket`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Paket;
      }) => response.data,
    }),

    // ✏️ Update by ID (FormData)
    updateUmrohPaket: builder.mutation<Paket, { id: number; payload: FormData }>(
      {
        query: ({ id, payload }) => ({
          url: `/website/umroh/paket/${id}`,
          method: "PUT",
          body: payload,
        }),
        transformResponse: (response: {
          success: boolean;
          message: string;
          data: Paket;
        }) => response.data,
      }
    ),

    // ❌ Delete by ID
    deleteUmrohPaket: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/website/umroh/paket/${id}`,
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
  useGetUmrohPaketListQuery,
  useGetUmrohPaketByIdQuery,
  useCreateUmrohPaketMutation,
  useUpdateUmrohPaketMutation,
  useDeleteUmrohPaketMutation,
} = umrohPaketApi;