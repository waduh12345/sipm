import { apiSlice } from "@/services/base-query";
import type {
  AlumniKonten,
  AlumniKontenListParams,
  AlumniKontenListRawResponse,
  AlumniKontenListTransformed,
} from "@/types/admin/profile/alumni-konten";

export const alumniKontenApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get All (pagination: items/total/pageTotal/currentPage)
    getAlumniKontenList: builder.query<
      AlumniKontenListTransformed,
      AlumniKontenListParams | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const paginate = args?.paginate ?? 10;
        return {
          url: `/website/profile/alumni-konten`,
          method: "GET",
          params: { page, paginate },
        };
      },
      transformResponse: (
        response: AlumniKontenListRawResponse
      ): AlumniKontenListTransformed => ({
        data: response.data.items,
        total: response.data.total,
        page_total: response.data.pageTotal,
        current_page: response.data.currentPage,
      }),
    }),

    // 🔎 Get by ID
    getAlumniKontenById: builder.query<AlumniKonten, number>({
      query: (id) => ({
        url: `/website/profile/alumni-konten/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: AlumniKonten;
      }) => response.data,
    }),

    // ➕ Create (FormData — karena ada image)
    // Isi FormData sesuai DTO: bahasa, judul, sub_judul, deskripsi, status, (image optional)
    createAlumniKonten: builder.mutation<AlumniKonten, FormData>({
      query: (payload) => ({
        url: `/website/profile/alumni-konten`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: AlumniKonten;
      }) => response.data,
    }),

    // ✏️ Update by ID (FormData)
    updateAlumniKonten: builder.mutation<
      AlumniKonten,
      { id: number; payload: FormData }
    >({
      query: ({ id, payload }) => ({
        url: `/website/profile/alumni-konten/${id}`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: AlumniKonten;
      }) => response.data,
    }),

    // ❌ Delete by ID
    deleteAlumniKonten: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/website/profile/alumni-konten/${id}`,
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
  useGetAlumniKontenListQuery,
  useGetAlumniKontenByIdQuery,
  useCreateAlumniKontenMutation,
  useUpdateAlumniKontenMutation,
  useDeleteAlumniKontenMutation,
} = alumniKontenApi;