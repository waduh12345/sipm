import { apiSlice } from "@/services/base-query";
import type {
  Hero,
  HeroListParams,
  HeroListRawResponse,
  HeroListTransformed,
} from "@/types/admin/hero";

export const heroApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All (pagination: items/total/pageTotal/currentPage)
    getHeroList: builder.query<HeroListTransformed, HeroListParams | void>({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/home/hero`,
          method: "GET",
          params: { page, paginate },
        };
      },
      transformResponse: (
        response: HeroListRawResponse
      ): HeroListTransformed => ({
        data: response.data.items,
        total: response.data.total,
        page_total: response.data.pageTotal,
        current_page: response.data.currentPage,
      }),
    }),

    // 🔎 Get by ID
    getHeroById: builder.query<Hero, number>({
      query: (id) => ({
        url: `/website/home/hero/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Hero;
      }) => response.data,
    }),

    // ➕ Create (pakai FormData karena ada image)
    createHero: builder.mutation<Hero, FormData>({
      query: (payload) => ({
        url: `/website/home/hero`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Hero;
      }) => response.data,
    }),

    // ✏️ Update by ID (FormData)
    // Jika backend butuh _method=PUT dengan POST, ganti method & url sesuai kebutuhanmu.
    updateHero: builder.mutation<Hero, { id: number; payload: FormData }>({
      query: ({ id, payload }) => ({
        url: `/website/home/hero/${id}`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Hero;
      }) => response.data,
    }),

    // ❌ Delete by ID
    deleteHero: builder.mutation<{ success: boolean; message: string }, number>(
      {
        query: (id) => ({
          url: `/website/home/hero/${id}`,
          method: "DELETE",
        }),
        transformResponse: (response: {
          success: boolean;
          message: string;
          data: null;
        }) => ({ success: response.success, message: response.message }),
      }
    ),
  }),
  overrideExisting: false,
});

export const {
  useGetHeroListQuery,
  useGetHeroByIdQuery,
  useCreateHeroMutation,
  useUpdateHeroMutation,
  useDeleteHeroMutation,
} = heroApi;