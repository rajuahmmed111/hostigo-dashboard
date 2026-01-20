import { baseApi } from "../baseUrl";

// notification api
export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all show user info
    getAllShowUserInfo: builder.query({
      query: () => ({
        url: "/show-user-info",
        method: "GET",
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["UserInfo"],
    }),

    // update user info status
    updateUserInfoStatus: builder.mutation({
      query: (id) => ({
        url: `/show-user-info/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["UserInfo"],
    }),
  }),
});

export const { useGetAllShowUserInfoQuery, useUpdateUserInfoStatusMutation } =
  notificationApi;
