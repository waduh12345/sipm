import { apiSlice } from "@/services/base-query";
import type {
  FaqKonten,
  FaqKontenListParams,
  FaqKontenListRawResponse,
  FaqKontenListTransformed,
} from "@/types/admin/faq/konten";

type CreateFaqKontenPayload = Omit<
  FaqKonten,
  "id" | "created_at" | "updated_at"
>;
type UpdateFaqKontenPayload = Partial<CreateFaqKontenPayload>;

export const faqKontenApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All (pagination: items/total/pageTotal/currentPage)
    getFaqKontenList: builder.query<
      FaqKontenListTransformed,
      FaqKontenListParams | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/faq/konten`,
          method: "GET",
          params: { page, paginate },
        };
      },
      transformResponse: (
        response: FaqKontenListRawResponse
      ): FaqKontenListTransformed => ({
        data: response.data.items,
        total: response.data.total,
        page_total: response.data.pageTotal,
        current_page: response.data.currentPage,
      }),
    }),

    // 🔎 Get by ID
    getFaqKontenById: builder.query<FaqKonten, number>({
      query: (id) => ({
        url: `/website/faq/konten/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: FaqKonten;
      }) => response.data,
    }),

    // ➕ Create (JSON; DTO tanpa file)
    createFaqKonten: builder.mutation<FaqKonten, CreateFaqKontenPayload>({
      query: (payload) => ({
        url: `/website/faq/konten`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: FaqKonten;
      }) => response.data,
    }),

    // ✏️ Update by ID (JSON)
    updateFaqKonten: builder.mutation<
      FaqKonten,
      { id: number; payload: UpdateFaqKontenPayload }
    >({
      query: ({ id, payload }) => ({
        url: `/website/faq/konten/${id}`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: FaqKonten;
      }) => response.data,
    }),

    // ❌ Delete by ID
    deleteFaqKonten: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/website/faq/konten/${id}`,
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
  useGetFaqKontenListQuery,
  useGetFaqKontenByIdQuery,
  useCreateFaqKontenMutation,
  useUpdateFaqKontenMutation,
  useDeleteFaqKontenMutation,
} = faqKontenApi;