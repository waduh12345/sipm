import { apiSlice } from "@/services/base-query";
import type {
  Mengapa,
  MengapaListParams,
  MengapaListRawResponse,
  MengapaListTransformed,
} from "@/types/admin/mengapa";

type CreateMengapaPayload = Omit<Mengapa, "id" | "created_at" | "updated_at">;
type UpdateMengapaPayload = Partial<CreateMengapaPayload>;

export const mengapaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All (pagination)
    getMengapaList: builder.query<
      MengapaListTransformed,
      MengapaListParams | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/home/mengapa`,
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
    getMengapaById: builder.query<Mengapa, number>({
      query: (id) => ({
        url: `/website/home/mengapa/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Mengapa;
      }) => response.data,
    }),

    // ➕ Create (JSON body — tidak ada file di DTO)
    createMengapa: builder.mutation<Mengapa, CreateMengapaPayload>({
      query: (payload) => ({
        url: `/website/home/mengapa`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Mengapa;
      }) => response.data,
    }),

    // ✏️ Update by ID (PUT JSON)
    updateMengapa: builder.mutation<
      Mengapa,
      { id: number; payload: UpdateMengapaPayload }
    >({
      query: ({ id, payload }) => ({
        url: `/website/home/mengapa/${id}`,
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
    deleteMengapa: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/website/home/mengapa/${id}`,
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
  useGetMengapaListQuery,
  useGetMengapaByIdQuery,
  useCreateMengapaMutation,
  useUpdateMengapaMutation,
  useDeleteMengapaMutation,
} = mengapaApi;