import { apiSlice } from "@/services/base-query";
import type {
  Breadcrumb,
  BreadcrumbListParams,
  BreadcrumbListRawResponse,
  BreadcrumbListTransformed,
} from "@/types/admin/haji/breadcrumb";

type CreateBreadcrumbPayload = Omit<
  Breadcrumb,
  "id" | "created_at" | "updated_at"
>;
type UpdateBreadcrumbPayload = Partial<CreateBreadcrumbPayload>;

export const hajiBreadcrumbApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All (pagination: items/total/pageTotal/currentPage)
    getHajiBreadcrumbList: builder.query<
      BreadcrumbListTransformed,
      BreadcrumbListParams | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/haji/breadcrumb`,
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
    getHajiBreadcrumbById: builder.query<Breadcrumb, number>({
      query: (id) => ({
        url: `/website/haji/breadcrumb/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Breadcrumb;
      }) => response.data,
    }),

    // ➕ Create (JSON; DTO tidak ada file)
    createHajiBreadcrumb: builder.mutation<
      Breadcrumb,
      CreateBreadcrumbPayload
    >({
      query: (payload) => ({
        url: `/website/haji/breadcrumb`,
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
    updateHajiBreadcrumb: builder.mutation<
      Breadcrumb,
      { id: number; payload: UpdateBreadcrumbPayload }
    >({
      query: ({ id, payload }) => ({
        url: `/website/haji/breadcrumb/${id}`,
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
    deleteHajiBreadcrumb: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/website/haji/breadcrumb/${id}`,
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
  useGetHajiBreadcrumbListQuery,
  useGetHajiBreadcrumbByIdQuery,
  useCreateHajiBreadcrumbMutation,
  useUpdateHajiBreadcrumbMutation,
  useDeleteHajiBreadcrumbMutation,
} = hajiBreadcrumbApi;