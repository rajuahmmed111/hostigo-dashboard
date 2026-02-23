import { baseApi } from "../baseUrl";

export const verifyProviderApi = baseApi.injectEndpoints({
  tagTypes: ["Provider"],
  endpoints: (builder) => ({
    // get all verify provider requests
    getAllVerifyProviderRequests: builder.query({
      query: () => ({
        url: "/users/inactive/service-providers",
        method: "GET",
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Provider"],
    }),

    // get single provider
    getSingleProvider: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Provider"],
    }),

    // update status
    updateStatus: builder.mutation({
      query: ({ id, ...faqData }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
        body: faqData,
      }),
      invalidatesTags: ["Provider"],
    }),
  }),
});

export const {
  useGetAllVerifyProviderRequestsQuery,
  useGetSingleProviderQuery,
  useUpdateStatusMutation,
} = verifyProviderApi;
