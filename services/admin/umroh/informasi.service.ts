import { apiSlice } from "@/services/base-query";
import type {
  Informasi,
  InformasiListParams,
  InformasiListRawResponse,
  InformasiListTransformed,
} from "@/types/admin/umroh/informasi";

type CreateInformasiPayload = Omit<
  Informasi,
  "id" | "created_at" | "updated_at"
>;
type UpdateInformasiPayload = Partial<CreateInformasiPayload>;

export const umrohInformasiApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All (pagination: items/total/pageTotal/currentPage)
    getUmrohInformasiList: builder.query<
      InformasiListTransformed,
      InformasiListParams | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/umroh/informasi`,
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
    getUmrohInformasiById: builder.query<Informasi, number>({
      query: (id) => ({
        url: `/website/umroh/informasi/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Informasi;
      }) => response.data,
    }),

    // ➕ Create (JSON; DTO tidak ada file)
    createUmrohInformasi: builder.mutation<
      Informasi,
      CreateInformasiPayload
    >({
      query: (payload) => ({
        url: `/website/umroh/informasi`,
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
    updateUmrohInformasi: builder.mutation<
      Informasi,
      { id: number; payload: UpdateInformasiPayload }
    >({
      query: ({ id, payload }) => ({
        url: `/website/umroh/informasi/${id}`,
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
    deleteUmrohInformasi: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/website/umroh/informasi/${id}`,
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
  useGetUmrohInformasiListQuery,
  useGetUmrohInformasiByIdQuery,
  useCreateUmrohInformasiMutation,
  useUpdateUmrohInformasiMutation,
  useDeleteUmrohInformasiMutation,
} = umrohInformasiApi;