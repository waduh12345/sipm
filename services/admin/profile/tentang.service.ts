import { apiSlice } from "@/services/base-query";
import type {
  Tentang,
  TentangListParams,
  TentangListRawResponse,
  TentangListTransformed,
} from "@/types/admin/profile/tentang";

export const profileTentangApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All (pagination: items/total/pageTotal/currentPage)
    getProfileTentangList: builder.query<
      TentangListTransformed,
      TentangListParams | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/profile/tentang`,
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
    getProfileTentangById: builder.query<Tentang, number>({
      query: (id) => ({
        url: `/website/profile/tentang/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Tentang;
      }) => response.data,
    }),

    // ➕ Create (FormData — ada image)
    // Isi FormData sesuai DTO: bahasa, judul, deskripsi, info_* (opsional), status, image (opsional)
    createProfileTentang: builder.mutation<Tentang, FormData>({
      query: (payload) => ({
        url: `/website/profile/tentang`,
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
    updateProfileTentang: builder.mutation<
      Tentang,
      { id: number; payload: FormData }
    >({
      query: ({ id, payload }) => ({
        url: `/website/profile/tentang/${id}`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Tentang;
      }) => response.data,
    }),

    // ❌ Delete by ID
    deleteProfileTentang: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/website/profile/tentang/${id}`,
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
  useGetProfileTentangListQuery,
  useGetProfileTentangByIdQuery,
  useCreateProfileTentangMutation,
  useUpdateProfileTentangMutation,
  useDeleteProfileTentangMutation,
} = profileTentangApi;