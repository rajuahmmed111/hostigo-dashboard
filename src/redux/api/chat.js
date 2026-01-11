import { baseApi } from "../baseUrl";

export const adminChannelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // admin channels
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

    // get all message by the channel name
    getAllMessageByChannelName: builder.query({
      query: (channelName) => ({
        url: `/messages/get-message/${channelName}`,
        method: "GET",
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
});

export const {
  useGetAllChannelsForAdminQuery,
  useGetAllMessageByChannelNameQuery,
} = adminChannelsApi;
