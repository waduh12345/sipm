import { apiSecondSlice } from "@/services/base-query";
import {
  FAQCustom,
  FAQParams,
  FAQListResponse,
  FAQDetailResponse,
} from "@/types/customization/faq";

export const faqApi = apiSecondSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 📋 Get List FAQ
    // URL: /website/faq/konten?client_code=...
    getFAQList: builder.query<FAQListResponse, FAQParams>({
      query: (params) => ({
        url: "/website/faq/konten",
        method: "GET",
        params: params,
      }),
      providesTags: (result) =>
        result?.data?.items
          ? [
              ...result.data.items.map(({ id }) => ({
                type: "FAQ" as const,
                id,
              })),
              { type: "FAQ", id: "LIST" },
            ]
          : [{ type: "FAQ", id: "LIST" }],
    }),

    // ➕ Create FAQ (POST) - Menggunakan JSON
    createFAQ: builder.mutation<FAQDetailResponse, Partial<FAQCustom>>({
      query: (body) => ({
        url: "/website/faq/konten",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: "FAQ", id: "LIST" }],
    }),

    // ✏️ Update FAQ (PUT) - Menggunakan JSON
    updateFAQ: builder.mutation<
      FAQDetailResponse,
      { id: number | string; data: Partial<FAQCustom> }
    >({
      query: ({ id, data }) => ({
        url: `/website/faq/konten/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "FAQ", id: "LIST" },
        { type: "FAQ", id },
      ],
    }),
  }),
});

export const {
  useGetFAQListQuery,
  useCreateFAQMutation,
  useUpdateFAQMutation,
} = faqApi;