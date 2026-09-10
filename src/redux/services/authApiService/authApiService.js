import { baseApi } from "../../api/baseApi";



export const authApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
  
    //  LOGIN USER
    loginAdmin: build.mutation({
      query: (loginData) => ({
        url: "/login-dashboard",
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});

export const {

 useLoginAdminMutation
 
} = authApiService;
