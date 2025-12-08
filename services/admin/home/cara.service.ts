import { apiSlice } from "@/services/base-query";
import type {
  Cara,
  CaraListParams,
  CaraListRawResponse,
  CaraListTransformed,
} from "@/types/admin/cara";

export const caraApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All (pagination menyesuaikan contoh response items/total/pageTotal/currentPage)
    getCaraList: builder.query<CaraListTransformed, CaraListParams | void>({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/home/cara`,
          method: "GET",
          params: { page, paginate },
        };
      },
      transformResponse: (
        response: CaraListRawResponse
      ): CaraListTransformed => ({
        data: response.data.items,
        total: response.data.total,
        page_total: response.data.pageTotal,
        current_page: response.data.currentPage,
      }),
    }),

    // 🔎 Get by ID
    getCaraById: builder.query<Cara, number>({
      query: (id) => ({
        url: `/website/home/cara/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Cara;
      }) => response.data,
    }),

    // ➕ Create (pakai FormData karena ada image)
    createCara: builder.mutation<Cara, FormData>({
      query: (payload) => ({
        url: `/website/home/cara`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Cara;
      }) => response.data,
    }),

    updateCara: builder.mutation<Cara, { id: number; payload: FormData }>({
      query: ({ id, payload }) => ({
        url: `/website/home/cara/${id}`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Cara;
      }) => response.data,
    }),

    // ❌ Delete by ID
    deleteCara: builder.mutation<{ success: boolean; message: string }, number>(
      {
        query: (id) => ({
          url: `/website/home/cara/${id}`,
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
  useGetCaraListQuery,
  useGetCaraByIdQuery,
  useCreateCaraMutation,
  useUpdateCaraMutation,
  useDeleteCaraMutation,
} = caraApi;