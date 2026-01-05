import { baseApi } from "../baseUrl";

// terms api
export const termsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create terms and condition
    createTermsAndCondition: builder.mutation({
      query: (credentials) => ({
        url: "/terms-conditions",
        method: "POST",
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
        body: credentials,
      }),
    }),
  }),
});

export const { useCreateTermsAndConditionMutation } = termsApi;
