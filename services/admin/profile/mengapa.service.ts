import { apiSlice } from "@/services/base-query";
import type {
  Mengapa,
  MengapaListParams,
  MengapaListRawResponse,
  MengapaListTransformed,
} from "@/types/admin/profile/mengapa";

export const profileMengapaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All (pagination: items/total/pageTotal/currentPage)
    getProfileMengapaList: builder.query<
      MengapaListTransformed,
      MengapaListParams | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/profile/mengapa`,
          method: "GET",
          params: { page, paginate },
        };
      },
      transformResponse: (
        response: MengapaListRawResponse
      ): MengapaListTransformed => ({
        data: response.data.items,
        total: response.data.total,
        page_total: response.data.pageTotal,
        current_page: response.data.currentPage,
      }),
    }),

    // 🔎 Get by ID
    getProfileMengapaById: builder.query<Mengapa, number>({
      query: (id) => ({
        url: `/website/profile/mengapa/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Mengapa;
      }) => response.data,
    }),

    // ➕ Create (FormData — karena ada image)
    // Isi FormData sesuai DTO: bahasa, judul, deskripsi, info_* (opsional), image (opsional), status
    createProfileMengapa: builder.mutation<Mengapa, FormData>({
      query: (payload) => ({
        url: `/website/profile/mengapa`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Mengapa;
      }) => response.data,
    }),

    // ✏️ Update by ID (FormData)
    updateProfileMengapa: builder.mutation<
      Mengapa,
      { id: number; payload: FormData }
    >({
      query: ({ id, payload }) => ({
        url: `/website/profile/mengapa/${id}`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Mengapa;
      }) => response.data,
    }),

    // ❌ Delete by ID
    deleteProfileMengapa: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/website/profile/mengapa/${id}`,
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
  useGetProfileMengapaListQuery,
  useGetProfileMengapaByIdQuery,
  useCreateProfileMengapaMutation,
  useUpdateProfileMengapaMutation,
  useDeleteProfileMengapaMutation,
} = profileMengapaApi;