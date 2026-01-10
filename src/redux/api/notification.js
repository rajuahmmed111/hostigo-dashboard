import { baseApi } from "../baseUrl";

// notification api
export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all notifications
    getAllNotifications: builder.query({
      query: () => ({
        url: "/notifications/all-notifications",
        method: "GET",
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Notification"],
    }),
  }),
});

export const { useGetAllNotificationsQuery } = notificationApi;
