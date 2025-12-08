import { apiSlice } from "@/services/base-query";
import type {
  Breadcrumb,
  BreadcrumbListParams,
  BreadcrumbListRawResponse,
  BreadcrumbListTransformed,
} from "@/types/admin/pmb/breadcrumb";

type CreateBreadcrumbPayload = Omit<
  Breadcrumb,
  "id" | "created_at" | "updated_at"
>;
type UpdateBreadcrumbPayload = Partial<CreateBreadcrumbPayload>;

export const pmbBreadcrumbApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All (pagination: items/total/pageTotal/currentPage)
    getPmbBreadcrumbList: builder.query<
      BreadcrumbListTransformed,
      BreadcrumbListParams | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/pmb/breadcrumb`,
          method: "GET",
          params: { page, paginate },
        };
      },
      transformResponse: (
        response: BreadcrumbListRawResponse
      ): BreadcrumbListTransformed => ({
        data: response.data.items,
        total: response.data.total,
        page_total: response.data.pageTotal,
        current_page: response.data.currentPage,
      }),
    }),

    // 🔎 Get by ID
    getPmbBreadcrumbById: builder.query<Breadcrumb, number>({
      query: (id) => ({
        url: `/website/pmb/breadcrumb/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Breadcrumb;
      }) => response.data,
    }),

    // ➕ Create (JSON; DTO tidak ada file)
    createPmbBreadcrumb: builder.mutation<Breadcrumb, CreateBreadcrumbPayload>({
      query: (payload) => ({
        url: `/website/pmb/breadcrumb`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Breadcrumb;
      }) => response.data,
    }),

    // ✏️ Update by ID (JSON)
    updatePmbBreadcrumb: builder.mutation<
      Breadcrumb,
      { id: number; payload: UpdateBreadcrumbPayload }
    >({
      query: ({ id, payload }) => ({
        url: `/website/pmb/breadcrumb/${id}`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Breadcrumb;
      }) => response.data,
    }),

    // ❌ Delete by ID
    deletePmbBreadcrumb: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/website/pmb/breadcrumb/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: null;
      }) => ({
        success: response.success,
        message: response.message,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPmbBreadcrumbListQuery,
  useGetPmbBreadcrumbByIdQuery,
  useCreatePmbBreadcrumbMutation,
  useUpdatePmbBreadcrumbMutation,
  useDeletePmbBreadcrumbMutation,
} = pmbBreadcrumbApi;