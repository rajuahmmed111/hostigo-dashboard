import { baseApi } from "../baseUrl";

export const adminChannelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllChannelsForAdmin: builder.query({
      query: () => ({
        url: `/messages/channels`,
        method: "GET",
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["AdminChannels"],
      transformResponse: (response) => {
        console.log("API Response Data:", response);
        console.log("Data Length:", response?.data?.data?.length || 0);
        return response;
      },
    }),
  }),
});

export const { useGetAllChannelsForAdminQuery } = adminChannelsApi;
