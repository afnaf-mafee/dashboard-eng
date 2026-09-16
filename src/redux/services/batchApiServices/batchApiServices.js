import { baseApi } from "../../api/baseApi";



export const batchApiService = baseApi.injectEndpoints({

  endpoints: (build) => ({



    // ==========================
    // CREATE BATCH
    // ==========================

    createBatch: build.mutation({

      query: (batchData) => ({

        url: "/batches",

        method: "POST",

        body: batchData,

      }),

      invalidatesTags: ["Batch"],

    }),






    // ==========================
    // GET ALL BATCHES WITH FILTER
    // ==========================

    getBatches: build.query({

      query: (params) => ({

        url: "/batches",

        method: "GET",

        params,

      }),

      providesTags: ["Batch"],

    }),







    // ==========================
    // GET SINGLE BATCH
    // ==========================

    getBatchById: build.query({

      query: (id) => ({

        url: `/batches/${id}`,

        method: "GET",

      }),

      providesTags: ["Batch"],

    }),







    // ==========================
    // UPDATE BATCH
    // ==========================

    updateBatch: build.mutation({

      query: ({ id, data }) => ({

        url: `/batches/${id}`,

        method: "PUT",

        body: data,

      }),

      invalidatesTags: ["Batch"],

    }),







    // ==========================
    // DELETE BATCH
    // ==========================

    deleteBatch: build.mutation({

      query: (id) => ({

        url: `/batches/${id}`,

        method: "DELETE",

      }),

      invalidatesTags: ["Batch"],

    }),



  }),


});





export const {


  useCreateBatchMutation,

  useGetBatchesQuery,

  useGetBatchByIdQuery,

  useUpdateBatchMutation,

  useDeleteBatchMutation,


} = batchApiService;