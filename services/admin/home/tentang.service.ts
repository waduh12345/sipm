import { apiSlice } from "@/services/base-query";
import type {
  Tentang,
  TentangListParams,
  TentangListRawResponse,
  TentangListTransformed,
} from "@/types/admin/tentang";

export const tentangApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All (pagination: items/total/pageTotal/currentPage)
    getTentangList: builder.query<
      TentangListTransformed,
      TentangListParams | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/home/tentang`,
          method: "GET",
          params: { page, paginate },
        };
      },
      transformResponse: (
        response: TentangListRawResponse
      ): TentangListTransformed => ({
        data: response.data.items,
        total: response.data.total,
        page_total: response.data.pageTotal,
        current_page: response.data.currentPage,
      }),
    }),

    // 🔎 Get by ID
    getTentangById: builder.query<Tentang, number>({
      query: (id) => ({
        url: `/website/home/tentang/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Tentang;
      }) => response.data,
    }),

    // ➕ Create (pakai FormData karena ada image)
    createTentang: builder.mutation<Tentang, FormData>({
      query: (payload) => ({
        url: `/website/home/tentang`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Tentang;
      }) => response.data,
    }),

    // ✏️ Update by ID (FormData)
    updateTentang: builder.mutation<Tentang, { id: number; payload: FormData }>(
      {
        query: ({ id, payload }) => ({
          url: `/website/home/tentang/${id}`,
          method: "PUT",
          body: payload,
        }),
        transformResponse: (response: {
          success: boolean;
          message: string;
          data: Tentang;
        }) => response.data,
      }
    ),

    // ❌ Delete by ID
    deleteTentang: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/website/home/tentang/${id}`,
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
  useGetTentangListQuery,
  useGetTentangByIdQuery,
  useCreateTentangMutation,
  useUpdateTentangMutation,
  useDeleteTentangMutation,
} = tentangApi;
