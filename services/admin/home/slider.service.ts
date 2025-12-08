import { apiSlice } from "@/services/base-query";
import type {
  Slider,
  SliderListParams,
  SliderListRawResponse,
  SliderListTransformed,
} from "@/types/admin/slider";

export const sliderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All (pagination: items/total/pageTotal/currentPage)
    getSliderList: builder.query<
      SliderListTransformed,
      SliderListParams | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/home/slider`,
          method: "GET",
          params: { page, paginate },
        };
      },
      transformResponse: (
        response: SliderListRawResponse
      ): SliderListTransformed => ({
        data: response.data.items,
        total: response.data.total,
        page_total: response.data.pageTotal,
        current_page: response.data.currentPage,
      }),
    }),

    // 🔎 Get by ID
    getSliderById: builder.query<Slider, number>({
      query: (id) => ({
        url: `/website/home/slider/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Slider;
      }) => response.data,
    }),

    // ➕ Create (pakai FormData karena ada image)
    createSlider: builder.mutation<Slider, FormData>({
      query: (payload) => ({
        url: `/website/home/slider`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Slider;
      }) => response.data,
    }),

    // ✏️ Update by ID (FormData)
    updateSlider: builder.mutation<Slider, { id: number; payload: FormData }>({
      query: ({ id, payload }) => ({
        url: `/website/home/slider/${id}`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Slider;
      }) => response.data,
    }),

    // ❌ Delete by ID
    deleteSlider: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/website/home/slider/${id}`,
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
  useGetSliderListQuery,
  useGetSliderByIdQuery,
  useCreateSliderMutation,
  useUpdateSliderMutation,
  useDeleteSliderMutation,
} = sliderApi;