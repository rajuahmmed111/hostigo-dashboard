import { baseApi } from "../baseUrl";

// subscription api
export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all subscriptions
    getAllSubscriptions: builder.query({
      query: () => ({
        url: "/subscriptions/purchase-subscription",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Subscription"],
    }),
    // cancel subscription
    cancelSubscription: builder.mutation({
      query: (id) => ({
        url: `/subscriptions/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Subscription"],
    }),
  }),
});

export const { useGetAllSubscriptionsQuery, useCancelSubscriptionMutation } =
  subscriptionApi;
