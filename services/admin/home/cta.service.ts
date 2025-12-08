import { apiSlice } from "@/services/base-query";
import type {
  Cta,
  CtaListParams,
  CtaListRawResponse,
  CtaListTransformed,
} from "@/types/admin/cta";

type CreateCtaPayload = Omit<Cta, "id" | "created_at" | "updated_at">;
type UpdateCtaPayload = Partial<CreateCtaPayload>;

export const ctaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All CTA (pagination)
    getCtaList: builder.query<CtaListTransformed, CtaListParams | void>({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/home/cta`,
          method: "GET",
          params: { page, paginate },
        };
      },
      transformResponse: (
        response: CtaListRawResponse
      ): CtaListTransformed => ({
        data: response.data.items,
        total: response.data.total,
        page_total: response.data.pageTotal,
        current_page: response.data.currentPage,
      }),
    }),

    // 🔎 Get CTA by ID
    getCtaById: builder.query<Cta, number>({
      query: (id) => ({
        url: `/website/home/cta/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Cta;
      }) => response.data,
    }),

    // ➕ Create CTA (DTO tidak ada file → kirim JSON)
    createCta: builder.mutation<Cta, CreateCtaPayload>({
      query: (payload) => ({
        url: `/website/home/cta`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Cta;
      }) => response.data,
    }),

    // ✏️ Update CTA by ID (PUT JSON)
    updateCta: builder.mutation<Cta, { id: number; payload: UpdateCtaPayload }>(
      {
        query: ({ id, payload }) => ({
          url: `/website/home/cta/${id}`,
          method: "PUT",
          body: payload,
        }),
        transformResponse: (response: {
          success: boolean;
          message: string;
          data: Cta;
        }) => response.data,
      }
    ),

    // ❌ Delete CTA by ID
    deleteCta: builder.mutation<{ success: boolean; message: string }, number>({
      query: (id) => ({
        url: `/website/home/cta/${id}`,
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
  useGetCtaListQuery,
  useGetCtaByIdQuery,
  useCreateCtaMutation,
  useUpdateCtaMutation,
  useDeleteCtaMutation,
} = ctaApi;