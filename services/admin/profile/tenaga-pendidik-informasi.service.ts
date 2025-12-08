import { apiSlice } from "@/services/base-query";
import type {
  TenagaPendidikInformasi,
  TenagaPendidikInformasiListParams,
  TenagaPendidikInformasiListRawResponse,
  TenagaPendidikInformasiListTransformed,
} from "@/types/admin/profile/tenaga-pendidik-informasi";

type CreateTenagaPendidikInformasiPayload = Omit<
  TenagaPendidikInformasi,
  "id" | "created_at" | "updated_at"
>;
type UpdateTenagaPendidikInformasiPayload =
  Partial<CreateTenagaPendidikInformasiPayload>;

export const profileTenagaPendidikInformasiApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All (pagination: items/total/pageTotal/currentPage)
    getProfileTenagaPendidikInformasiList: builder.query<
      TenagaPendidikInformasiListTransformed,
      TenagaPendidikInformasiListParams | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/profile/tenaga-pendidik-informasi`,
          method: "GET",
          params: { page, paginate },
        };
      },
      transformResponse: (
        response: TenagaPendidikInformasiListRawResponse
      ): TenagaPendidikInformasiListTransformed => ({
        data: response.data.items,
        total: response.data.total,
        page_total: response.data.pageTotal,
        current_page: response.data.currentPage,
      }),
    }),

    // 🔎 Get by ID
    getProfileTenagaPendidikInformasiById: builder.query<
      TenagaPendidikInformasi,
      number
    >({
      query: (id) => ({
        url: `/website/profile/tenaga-pendidik-informasi/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: TenagaPendidikInformasi;
      }) => response.data,
    }),

    // ➕ Create (JSON; DTO tidak ada file)
    createProfileTenagaPendidikInformasi: builder.mutation<
      TenagaPendidikInformasi,
      CreateTenagaPendidikInformasiPayload
    >({
      query: (payload) => ({
        url: `/website/profile/tenaga-pendidik-informasi`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: TenagaPendidikInformasi;
      }) => response.data,
    }),

    // ✏️ Update by ID (JSON)
    updateProfileTenagaPendidikInformasi: builder.mutation<
      TenagaPendidikInformasi,
      { id: number; payload: UpdateTenagaPendidikInformasiPayload }
    >({
      query: ({ id, payload }) => ({
        url: `/website/profile/tenaga-pendidik-informasi/${id}`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: TenagaPendidikInformasi;
      }) => response.data,
    }),

    // ❌ Delete by ID
    deleteProfileTenagaPendidikInformasi: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/website/profile/tenaga-pendidik-informasi/${id}`,
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
  useGetProfileTenagaPendidikInformasiListQuery,
  useGetProfileTenagaPendidikInformasiByIdQuery,
  useCreateProfileTenagaPendidikInformasiMutation,
  useUpdateProfileTenagaPendidikInformasiMutation,
  useDeleteProfileTenagaPendidikInformasiMutation,
} = profileTenagaPendidikInformasiApi;