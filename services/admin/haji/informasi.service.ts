import { apiSlice } from "@/services/base-query";
import type {
  Informasi,
  InformasiListParams,
  InformasiListRawResponse,
  InformasiListTransformed,
} from "@/types/admin/haji/informasi";

type CreateInformasiPayload = Omit<
  Informasi,
  "id" | "created_at" | "updated_at"
>;
type UpdateInformasiPayload = Partial<CreateInformasiPayload>;

export const hajiInformasiApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All (pagination: items/total/pageTotal/currentPage)
    getHajiInformasiList: builder.query<
      InformasiListTransformed,
      InformasiListParams | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/haji/informasi`,
          method: "GET",
          params: { page, paginate },
        };
      },
      transformResponse: (
        response: InformasiListRawResponse
      ): InformasiListTransformed => ({
        data: response.data.items,
        total: response.data.total,
        page_total: response.data.pageTotal,
        current_page: response.data.currentPage,
      }),
    }),

    // 🔎 Get by ID
    getHajiInformasiById: builder.query<Informasi, number>({
      query: (id) => ({
        url: `/website/haji/informasi/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Informasi;
      }) => response.data,
    }),

    // ➕ Create (JSON; DTO tidak ada file)
    createHajiInformasi: builder.mutation<
      Informasi,
      CreateInformasiPayload
    >({
      query: (payload) => ({
        url: `/website/haji/informasi`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Informasi;
      }) => response.data,
    }),

    // ✏️ Update by ID (JSON)
    updateHajiInformasi: builder.mutation<
      Informasi,
      { id: number; payload: UpdateInformasiPayload }
    >({
      query: ({ id, payload }) => ({
        url: `/website/haji/informasi/${id}`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Informasi;
      }) => response.data,
    }),

    // ❌ Delete by ID
    deleteHajiInformasi: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/website/haji/informasi/${id}`,
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
  useGetHajiInformasiListQuery,
  useGetHajiInformasiByIdQuery,
  useCreateHajiInformasiMutation,
  useUpdateHajiInformasiMutation,
  useDeleteHajiInformasiMutation,
} = hajiInformasiApi;