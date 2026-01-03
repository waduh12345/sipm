import { apiSecondSlice } from "@/services/base-query";
import {
  AchievementParams,
  AchievementListResponse,
  AchievementDetailResponse,
} from "@/types/customization/about/pencapaian";

export const achievementApi = apiSecondSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 📋 Get List Pencapaian
    // URL: /website/profile/pencapaian?client_code=...&bahasa=...
    getAchievementList: builder.query<
      AchievementListResponse,
      AchievementParams
    >({
      query: (params) => ({
        url: "/website/profile/pencapaian",
        method: "GET",
        params: params,
      }),
      providesTags: (result) =>
        result?.data?.items
          ? [
              ...result.data.items.map(({ id }) => ({
                type: "Achievement" as const,
                id,
              })),
              { type: "Achievement", id: "LIST" },
            ]
          : [{ type: "Achievement", id: "LIST" }],
    }),

    // ➕ Create Pencapaian (POST)
    createAchievement: builder.mutation<AchievementDetailResponse, FormData>({
      query: (body) => ({
        url: "/website/profile/pencapaian",
        method: "POST",
        body: body, // Menggunakan FormData karena ada upload image
      }),
      invalidatesTags: [{ type: "Achievement", id: "LIST" }],
    }),

    // ✏️ Update Pencapaian (PUT)
    // URL: /website/profile/pencapaian/[id]
    updateAchievement: builder.mutation<
      AchievementDetailResponse,
      { id: number | string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/website/profile/pencapaian/${id}`,
        method: "PUT",
        body: data, // Menggunakan FormData
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Achievement", id: "LIST" },
        { type: "Achievement", id },
      ],
    }),
  }),
});

// Export hooks untuk digunakan di komponen
export const {
  useGetAchievementListQuery,
  useCreateAchievementMutation,
  useUpdateAchievementMutation,
} = achievementApi;