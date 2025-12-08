import { apiSlice } from "@/services/base-query";
import type {
  AlumniInformasi,
  AlumniInformasiListParams,
  AlumniInformasiListRawResponse,
  AlumniInformasiListTransformed,
} from "@/types/admin/profile/alumni-informasi";

type CreateAlumniInformasiPayload = Omit<
  AlumniInformasi,
  "id" | "created_at" | "updated_at"
>;
type UpdateAlumniInformasiPayload = Partial<CreateAlumniInformasiPayload>;

export const alumniInformasiApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All (pagination: items/total/pageTotal/currentPage)
    getAlumniInformasiList: builder.query<
      AlumniInformasiListTransformed,
      AlumniInformasiListParams | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/profile/alumni-informasi`,
          method: "GET",
          params: { page, paginate },
        };
      },
      transformResponse: (
        response: AlumniInformasiListRawResponse
      ): AlumniInformasiListTransformed => ({
        data: response.data.items,
        total: response.data.total,
        page_total: response.data.pageTotal,
        current_page: response.data.currentPage,
      }),
    }),

    // 🔎 Get by ID
    getAlumniInformasiById: builder.query<AlumniInformasi, number>({
      query: (id) => ({
        url: `/website/profile/alumni-informasi/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: AlumniInformasi;
      }) => response.data,
    }),

    // ➕ Create (JSON; DTO tidak ada file)
    createAlumniInformasi: builder.mutation<
      AlumniInformasi,
      CreateAlumniInformasiPayload
    >({
      query: (payload) => ({
        url: `/website/profile/alumni-informasi`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: AlumniInformasi;
      }) => response.data,
    }),

    // ✏️ Update by ID (JSON)
    updateAlumniInformasi: builder.mutation<
      AlumniInformasi,
      { id: number; payload: UpdateAlumniInformasiPayload }
    >({
      query: ({ id, payload }) => ({
        url: `/website/profile/alumni-informasi/${id}`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: AlumniInformasi;
      }) => response.data,
    }),

    // ❌ Delete by ID
    deleteAlumniInformasi: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/website/profile/alumni-informasi/${id}`,
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
  useGetAlumniInformasiListQuery,
  useGetAlumniInformasiByIdQuery,
  useCreateAlumniInformasiMutation,
  useUpdateAlumniInformasiMutation,
  useDeleteAlumniInformasiMutation,
} = alumniInformasiApi;
