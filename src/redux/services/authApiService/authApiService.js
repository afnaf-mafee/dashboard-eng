import { baseApi } from "../../api/baseApi";

export const authApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // CREATE ADMIN
    createAdmin: build.mutation({
      query: (adminData) => ({
        url: "/auth/create-admin",

        method: "POST",

        body: adminData,
      }),
    }),

    // LOGIN ADMIN
    loginAdmin: build.mutation({
      query: (loginData) => ({
        url: "/auth/login",

        method: "POST",

        body: loginData,
      }),
    }),
  }),
});

export const {
  useCreateAdminMutation,

  useLoginAdminMutation,
} = authApiService;
