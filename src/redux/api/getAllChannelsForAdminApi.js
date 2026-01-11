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
    }),
  }),
});

export const { useGetAllChannelsForAdminQuery } = adminChannelsApi;
