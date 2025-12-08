import { apiSlice } from "@/services/base-query";
import type {
  Breadcrumb,
  BreadcrumbListParams,
  BreadcrumbListRawResponse,
  BreadcrumbListTransformed,
} from "@/types/admin/berita/breadcrumb";

type CreateBreadcrumbPayload = Omit<
  Breadcrumb,
  "id" | "created_at" | "updated_at"
>;
type UpdateBreadcrumbPayload = Partial<CreateBreadcrumbPayload>;

export const breadcrumbApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All (pagination: items/total/pageTotal/currentPage)
    getBreadcrumbList: builder.query<
      BreadcrumbListTransformed,
      BreadcrumbListParams | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/berita/breadcrumb`,
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
    getBreadcrumbById: builder.query<Breadcrumb, number>({
      query: (id) => ({
        url: `/website/berita/breadcrumb/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Breadcrumb;
      }) => response.data,
    }),

    // ➕ Create (JSON)
    createBreadcrumb: builder.mutation<Breadcrumb, CreateBreadcrumbPayload>({
      query: (payload) => ({
        url: `/website/berita/breadcrumb`,
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
    updateBreadcrumb: builder.mutation<
      Breadcrumb,
      { id: number; payload: UpdateBreadcrumbPayload }
    >({
      query: ({ id, payload }) => ({
        url: `/website/berita/breadcrumb/${id}`,
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
    deleteBreadcrumb: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/website/berita/breadcrumb/${id}`,
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
  useGetBreadcrumbListQuery,
  useGetBreadcrumbByIdQuery,
  useCreateBreadcrumbMutation,
  useUpdateBreadcrumbMutation,
  useDeleteBreadcrumbMutation,
} = breadcrumbApi;
