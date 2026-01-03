import { apiSecondSlice } from "@/services/base-query";
import {
  Cta,
  CtaParams,
  CtaListResponse,
  CtaDetailResponse,
} from "@/types/customization/about/cta";

export const ctaApi = apiSecondSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 📋 Get List CTA
    // URL: /website/profile/cta?client_code=...
    getCtaList: builder.query<CtaListResponse, CtaParams>({
      query: (params) => ({
        url: "/website/profile/cta",
        method: "GET",
        params: params,
      }),
      providesTags: (result) =>
        result?.data?.items
          ? [
              ...result.data.items.map(({ id }) => ({
                type: "Cta" as const,
                id,
              })),
              { type: "Cta", id: "LIST" },
            ]
          : [{ type: "Cta", id: "LIST" }],
    }),

    // ➕ Create CTA (POST)
    createCta: builder.mutation<CtaDetailResponse, Partial<Cta>>({
      query: (body) => ({
        url: "/website/profile/cta",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: "Cta", id: "LIST" }],
    }),

    // ✏️ Update CTA (PUT)
    // URL: /website/profile/cta/[id]
    updateCta: builder.mutation<
      CtaDetailResponse,
      { id: number | string; data: Partial<Cta> }
    >({
      query: ({ id, data }) => ({
        url: `/website/profile/cta/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Cta", id: "LIST" },
        { type: "Cta", id },
      ],
    }),
  }),
});

export const {
  useGetCtaListQuery,
  useCreateCtaMutation,
  useUpdateCtaMutation,
} = ctaApi;