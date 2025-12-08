import { apiSlice } from "@/services/base-query";
import type {
  TenagaPendidikKonten,
  TenagaPendidikKontenListParams,
  TenagaPendidikKontenListRawResponse,
  TenagaPendidikKontenListTransformed,
} from "@/types/admin/profile/tenaga-pendidik-konten";

export const tenagaPendidikKontenApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All (pagination: items/total/pageTotal/currentPage)
    getTenagaPendidikKontenList: builder.query<
      TenagaPendidikKontenListTransformed,
      TenagaPendidikKontenListParams | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/profile/tenaga-pendidik-konten`,
          method: "GET",
          params: { page, paginate },
        };
      },
      transformResponse: (
        response: TenagaPendidikKontenListRawResponse
      ): TenagaPendidikKontenListTransformed => ({
        data: response.data.items,
        total: response.data.total,
        page_total: response.data.pageTotal,
        current_page: response.data.currentPage,
      }),
    }),

    // 🔎 Get by ID
    getTenagaPendidikKontenById: builder.query<TenagaPendidikKonten, number>({
      query: (id) => ({
        url: `/website/profile/tenaga-pendidik-konten/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: TenagaPendidikKonten;
      }) => response.data,
    }),

    // ➕ Create (FormData — ada image)
    // Isi FormData sesuai DTO: bahasa, judul, deskripsi, status, (image optional)
    createTenagaPendidikKonten: builder.mutation<
      TenagaPendidikKonten,
      FormData
    >({
      query: (payload) => ({
        url: `/website/profile/tenaga-pendidik-konten`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: TenagaPendidikKonten;
      }) => response.data,
    }),

    // ✏️ Update by ID (FormData)
    updateTenagaPendidikKonten: builder.mutation<
      TenagaPendidikKonten,
      { id: number; payload: FormData }
    >({
      query: ({ id, payload }) => ({
        url: `/website/profile/tenaga-pendidik-konten/${id}`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: TenagaPendidikKonten;
      }) => response.data,
    }),

    // ❌ Delete by ID
    deleteTenagaPendidikKonten: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/website/profile/tenaga-pendidik-konten/${id}`,
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
  useGetTenagaPendidikKontenListQuery,
  useGetTenagaPendidikKontenByIdQuery,
  useCreateTenagaPendidikKontenMutation,
  useUpdateTenagaPendidikKontenMutation,
  useDeleteTenagaPendidikKontenMutation,
} = tenagaPendidikKontenApi;