import { apiSlice } from "@/services/base-query";
import type {
  Information,
  InformationListParams,
  InformationListRawResponse,
  InformationListTransformed,
} from "@/types/admin/hubungi-kami/information";

type CreateInformationPayload = Omit<
  Information,
  "id" | "created_at" | "updated_at"
>;
type UpdateInformationPayload = Partial<CreateInformationPayload>;

export const hubungiKamiInformationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All (pagination: items/total/pageTotal/currentPage)
    getHubungiInformationList: builder.query<
      InformationListTransformed,
      InformationListParams | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/hubungi-kami/information`,
          method: "GET",
          params: { page, paginate },
        };
      },
      transformResponse: (
        response: InformationListRawResponse
      ): InformationListTransformed => ({
        data: response.data.items,
        total: response.data.total,
        page_total: response.data.pageTotal,
        current_page: response.data.currentPage,
      }),
    }),

    // 🔎 Get by ID
    getHubungiInformationById: builder.query<Information, number>({
      query: (id) => ({
        url: `/website/hubungi-kami/information/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Information;
      }) => response.data,
    }),

    // ➕ Create (JSON; DTO tidak ada file)
    createHubungiInformation: builder.mutation<
      Information,
      CreateInformationPayload
    >({
      query: (payload) => ({
        url: `/website/hubungi-kami/information`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Information;
      }) => response.data,
    }),

    // ✏️ Update by ID (JSON)
    updateHubungiInformation: builder.mutation<
      Information,
      { id: number; payload: UpdateInformationPayload }
    >({
      query: ({ id, payload }) => ({
        url: `/website/hubungi-kami/information/${id}`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Information;
      }) => response.data,
    }),

    // ❌ Delete by ID
    deleteHubungiInformation: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/website/hubungi-kami/information/${id}`,
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
  useGetHubungiInformationListQuery,
  useGetHubungiInformationByIdQuery,
  useCreateHubungiInformationMutation,
  useUpdateHubungiInformationMutation,
  useDeleteHubungiInformationMutation,
} = hubungiKamiInformationApi;