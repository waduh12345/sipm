import { apiSecondSlice } from "@/services/base-query";
import { BeritaKategori, BeritaKategoriDetailResponse, BeritaKategoriListParams, BeritaKategoriListResponse } from "@/types/customization/news/kategori";

export const beritaKategoriApi = apiSecondSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 📋 Get List
    // URL: /website/berita/kategori?client_code=...&bahasa=...
    getBeritaKategoriList: builder.query<
      BeritaKategoriListResponse,
      BeritaKategoriListParams
    >({
      query: (params) => ({
        url: "/website/berita/kategori",
        method: "GET",
        params: params,
      }),
      providesTags: (result) =>
        result?.data?.items
          ? [
              ...result.data.items.map(({ id }) => ({
                type: "BeritaKategori" as const,
                id,
              })),
              { type: "BeritaKategori", id: "LIST" },
            ]
          : [{ type: "BeritaKategori", id: "LIST" }],
    }),

    // ➕ Create (POST)
    // URL: /website/berita/kategori
    createBeritaKategori: builder.mutation<
      BeritaKategoriDetailResponse,
      FormData | Partial<BeritaKategori> // Bisa terima FormData atau Object JSON
    >({
      query: (body) => ({
        url: "/website/berita/kategori",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: "BeritaKategori", id: "LIST" }],
    }),

    // ✏️ Update (PUT)
    // URL: /website/berita/kategori/{id}
    updateBeritaKategori: builder.mutation<
      BeritaKategoriDetailResponse,
      { id: number | string; data: FormData | Partial<BeritaKategori> }
    >({
      query: ({ id, data }) => ({
        url: `/website/berita/kategori/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "BeritaKategori", id: "LIST" },
        { type: "BeritaKategori", id },
      ],
    }),
  }),
});

// ==========================================
// 3. Hooks Export
// ==========================================

export const {
  useGetBeritaKategoriListQuery,
  useCreateBeritaKategoriMutation,
  useUpdateBeritaKategoriMutation,
} = beritaKategoriApi;