import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "@/store/rtk/base.service.js";

export const loanRecordRTKApi = createApi({
    reducerPath: 'cartRTKApi',
    baseQuery,
    tagTypes: ['LoanRecord'],
    endpoints: (builder) => ({
        getLoanRecord: builder.query({
            query: () => 'loanRecords/list',
            providesTags: ['LoanRecord'],
        }),


    })
})

export const {
    useGetLoanRecordQuery
} = loanRecordRTKApi;