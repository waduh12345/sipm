import { apiSecondSlice } from "@/services/base-query";
import { BeritaKontenDetailResponse, BeritaKontenListParams, BeritaKontenListResponse } from "@/types/customization/news/konten";

export const beritaKontenApi = apiSecondSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 📋 Get List
    // URL: /website/berita/konten?client_code=...&bahasa=...
    getBeritaKontenList: builder.query<
      BeritaKontenListResponse,
      BeritaKontenListParams
    >({
      query: (params) => ({
        url: "/website/berita/konten",
        method: "GET",
        params: params,
      }),
      providesTags: (result) =>
        result?.data?.items
          ? [
              ...result.data.items.map(({ id }) => ({
                type: "BeritaKonten" as const,
                id,
              })),
              { type: "BeritaKonten", id: "LIST" },
            ]
          : [{ type: "BeritaKonten", id: "LIST" }],
    }),

    // ➕ Create (POST)
    // URL: /website/berita/konten
    // Menggunakan FormData karena ada upload Image
    createBeritaKonten: builder.mutation<BeritaKontenDetailResponse, FormData>({
      query: (body) => ({
        url: "/website/berita/konten",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: "BeritaKonten", id: "LIST" }],
    }),

    // ✏️ Update (PUT)
    // URL: /website/berita/konten/{id}
    updateBeritaKonten: builder.mutation<
      BeritaKontenDetailResponse,
      { id: number | string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/website/berita/konten/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "BeritaKonten", id: "LIST" },
        { type: "BeritaKonten", id },
      ],
    }),
  }),
});

// ==========================================
// 3. Hooks Export
// ==========================================

export const {
  useGetBeritaKontenListQuery,
  useCreateBeritaKontenMutation,
  useUpdateBeritaKontenMutation,
} = beritaKontenApi;