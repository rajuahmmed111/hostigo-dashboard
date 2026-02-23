import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://samir-booking-backend.onrender.com/api/v1",
    baseUrl: "https://grass-happens-chamber-steel.trycloudflare.com/api/v1",
  }),
  tagTypes: [
    "User",
    "Category",
    "Admin",
    "Reports",
    "Gamification",
    "Notification",
    "AdminChannels",
    "UserInfo",
    "FAQ",
    "Provider",
  ],
  endpoints: () => ({}),
});
