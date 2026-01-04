import { apiSecondSlice } from "@/services/base-query";
import {
  FaqKategori,
  FaqKategoriDetailResponse,
  FaqKategoriListParams,
  FaqKategoriListResponse,
} from "@/types/customization/faq/kategori";
import {
  FaqKontenDetailResponse,
  FaqKontenListParams,
  FaqKontenListResponse,
} from "@/types/customization/faq/konten";

export const faqApi = apiSecondSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ==========================
    // 📂 KATEGORI (Category)
    // ==========================

    // 📋 Get Kategori List
    // URL: /website/faq/kategori?client_code=...
    getFaqKategoriList: builder.query<
      FaqKategoriListResponse,
      FaqKategoriListParams
    >({
      query: (params) => ({
        url: "/website/faq/kategori",
        method: "GET",
        params: params,
      }),
      providesTags: (result) =>
        result?.data?.items
          ? [
              ...result.data.items.map(({ id }) => ({
                type: "FaqKategori" as const,
                id,
              })),
              { type: "FaqKategori", id: "LIST" },
            ]
          : [{ type: "FaqKategori", id: "LIST" }],
    }),

    // ➕ Create Kategori (POST)
    // URL: /website/faq/kategori (Assumed based on pattern)
    createFaqKategori: builder.mutation<
      FaqKategoriDetailResponse,
      FormData | Partial<FaqKategori>
    >({
      query: (body) => ({
        url: "/website/faq/kategori",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: "FaqKategori", id: "LIST" }],
    }),

    // ✏️ Update Kategori (PUT)
    // URL: /website/faq/kategori/:id (Assumed based on pattern)
    updateFaqKategori: builder.mutation<
      FaqKategoriDetailResponse,
      { id: number | string; data: FormData | Partial<FaqKategori> }
    >({
      query: ({ id, data }) => ({
        url: `/website/faq/kategori/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "FaqKategori", id: "LIST" },
        { type: "FaqKategori", id },
      ],
    }),

    // ==========================
    // 📄 KONTEN (Content)
    // ==========================

    // 📋 Get Konten List
    // URL: /website/faq/konten?client_code=...
    getFaqKontenList: builder.query<FaqKontenListResponse, FaqKontenListParams>(
      {
        query: (params) => ({
          url: "/website/faq/konten",
          method: "GET",
          params: params,
        }),
        providesTags: (result) =>
          result?.data?.items
            ? [
                ...result.data.items.map(({ id }) => ({
                  type: "FaqKonten" as const,
                  id,
                })),
                { type: "FaqKonten", id: "LIST" },
              ]
            : [{ type: "FaqKonten", id: "LIST" }],
      }
    ),

    // ➕ Create Konten (POST)
    // URL: /website/faq/konten
    createFaqKonten: builder.mutation<FaqKontenDetailResponse, FormData>({
      query: (body) => ({
        url: "/website/faq/konten",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: "FaqKonten", id: "LIST" }],
    }),

    // ✏️ Update Konten (PUT)
    // NOTE: You specified "/website/berita/konten/:id" in the prompt for PUT.
    // If that was a typo and should be "/website/faq/konten/:id", change the url below.
    // I am using the FAQ path here for consistency, but check your API spec.
    updateFaqKonten: builder.mutation<
      FaqKontenDetailResponse,
      { id: number | string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/website/faq/konten/${id}`, // Change to `/website/berita/konten/${id}` if strictly following prompt's potential typo
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "FaqKonten", id: "LIST" },
        { type: "FaqKonten", id },
      ],
    }),
  }),
});

// ==========================================
// 3. Hooks Export
// ==========================================

export const {
  // Kategori Hooks
  useGetFaqKategoriListQuery,
  useCreateFaqKategoriMutation,
  useUpdateFaqKategoriMutation,

  // Konten Hooks
  useGetFaqKontenListQuery,
  useCreateFaqKontenMutation,
  useUpdateFaqKontenMutation,
} = faqApi;