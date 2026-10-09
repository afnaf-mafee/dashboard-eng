import { baseApi } from "../../api/baseApi";

export const studentApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // CREATE STUDENT
    createStudent: build.mutation({
      query: (studentData) => ({
        url: "/students",
        method: "POST",
        body: studentData,
      }),
      invalidatesTags: ["Student"],
    }),

    // GET ALL STUDENTS WITH FILTER
    getStudents: build.query({
      query: (params) => ({
        url: "/students",
        method: "GET",
        params,
      }),

      providesTags: ["Student"],
    }),
    // get fee-history---
    getStudentsFeeHistory: build.query({
      query: (params) => ({
        url: "/students/fee-history",
        method: "GET",
        params,
      }),

      providesTags: ["Student"],
    }),

    // GET SINGLE STUDENT
    getStudentById: build.query({
      query: (id) => ({
        url: `/students/${id}`,
        method: "GET",
      }),
      providesTags: ["Student"],
    }),

    // UPDATE STUDENT
    updateStudent: build.mutation({
      query: ({ id, data }) => ({
        url: `/students/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Student"],
    }),

    // ADD FEE PAYMENT
    addFeePayment: build.mutation({
      query: ({ id, paymentData }) => ({
        url: `/students/${id}/fee-payment`,
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ["Student"],
    }),
    markAttendance: build.mutation({
      query: ({ id, attendanceData }) => ({
        url: `/students/${id}/attendance`,

        method: "PATCH",

        body: {
          attendanceData,
        },
      }),

      invalidatesTags: ["Student"],
    }),
    // MAKE STUDENT ACTIVE
    makeStudentActive: build.mutation({
      query: (id) => ({
        url: `/students/${id}/active`,
        method: "PUT",
      }),
      invalidatesTags: ["Student"],
    }),

    // DELETE STUDENT
    deleteStudent: build.mutation({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
    bulkMarkAttendance: build.mutation({
      query: (data) => ({
        url: "/students/bulk-attendance",
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["Student"],
    }),
    // ADD INVOICE
    addInvoice: build.mutation({
      query: (invoiceData) => ({
        url: "/students/add-invoice",
        method: "POST",
        body: invoiceData,
      }),
      invalidatesTags: ["Student"],
    }),

    // =========================
    // ADD RESULT
    // =========================
    addResult: build.mutation({
      query: ({ id, resultData }) => ({
        url: `/students/${id}/result`,
        method: "POST",
        body: resultData,
      }),
      invalidatesTags: ["Student"],
    }),
    sendMessageToStudents: build.mutation({
      query: (data) => ({
        url: "/students/bulk-message",
        method: "POST",
        body: data,
      }),
    }),
    // =========================
    // RESULT RANKING
    // =========================
    getResultRanking: build.query({
      query: (params) => ({
        url: "/students/results/ranking/date",
        method: "GET",
        params,
      }),

      providesTags: ["Student"],
    }),
    // =========================
    // TODAY COLLECTION
    // =========================
    getTodayCollection: build.query({
      query: (params) => ({
        url: "/students/today-collection",
        method: "GET",
        params,
      }),

      providesTags: ["Student"],
    }),
    sendResultsToAll: build.mutation({
      query: () => ({
        url: "/students/send-results",

        method: "POST",
      }),

      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useAddFeePaymentMutation,
  useMarkAttendanceMutation,
  useAddInvoiceMutation,
  useBulkMarkAttendanceMutation,
  // Result
  useAddResultMutation,
  useSendResultsToAllMutation,
  useGetResultRankingQuery,
  // Active Status
  useMakeStudentActiveMutation,
useSendMessageToStudentsMutation,
  // Today Collection
  useGetTodayCollectionQuery,
  useGetStudentsFeeHistoryQuery,
} = studentApiService;
