import { baseApi } from "../baseUrl";

// subscription api
export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all subscriptions
    getAllSubscriptions: builder.query({
      query: ({ status }) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        return {
          url: `/subscriptions/purchase-subscription${
            params.toString() ? "?" + params.toString() : ""
          }`,
          method: "GET",
          headers: {
            Authorization: `${localStorage.getItem("accessToken")}`,
          },
        };
      },
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

    // get all subscription plans
    getAllSubscriptionPlans: builder.query({
      query: () => ({
        url: `/subscriptions/plan/retrieve/search`,
        method: "GET",
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Subscription"],
    }),
  }),
});

export const {
  useGetAllSubscriptionsQuery,
  useCancelSubscriptionMutation,
  useGetAllSubscriptionPlansQuery,
} = subscriptionApi;
