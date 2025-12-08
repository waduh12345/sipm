import { apiSlice } from "@/services/base-query";
import type {
  Paket,
  PaketListParams,
  PaketListRawResponse,
  PaketListTransformed,
} from "@/types/admin/haji/paket";

export const hajiPaketApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All (pagination: items/total/pageTotal/currentPage)
    getHajiPaketList: builder.query<
      PaketListTransformed,
      PaketListParams | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/haji/paket`,
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
    getHajiPaketById: builder.query<Paket, number>({
      query: (id) => ({
        url: `/website/haji/paket/${id}`,
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
    createHajiPaket: builder.mutation<Paket, FormData>({
      query: (payload) => ({
        url: `/website/haji/paket`,
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
    updateHajiPaket: builder.mutation<Paket, { id: number; payload: FormData }>(
      {
        query: ({ id, payload }) => ({
          url: `/website/haji/paket/${id}`,
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
    deleteHajiPaket: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/website/haji/paket/${id}`,
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
  useGetHajiPaketListQuery,
  useGetHajiPaketByIdQuery,
  useCreateHajiPaketMutation,
  useUpdateHajiPaketMutation,
  useDeleteHajiPaketMutation,
} = hajiPaketApi;