
import { baseApi } from "../../api/baseApi";

export const dashboardApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // =========================
    // DASHBOARD OVERVIEW
    // =========================
    getDashboardOverview: build.query({
      query: () => ({
        url: "/students/overview",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    // =========================
    // MONTHLY COLLECTION
    // =========================
    getMonthlyCollection: build.query({
      query: (year) => ({
        url: "/students/monthly-collection",
        method: "GET",
        params: year ? { year } : {},
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetDashboardOverviewQuery,
  useGetMonthlyCollectionQuery,
} = dashboardApiService;