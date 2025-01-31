import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "./base.service.js"

export const bookRTKApi = createApi({
    reducerPath: 'cartRTKApi',
    baseQuery,
    tagTypes: ['Category', 'Title', 'Edition', 'BookCopy', 'LoanRecord', 'Reader', "Violation", 'User'],
    endpoints: (builder) => ({
        getTitle: builder.query({
            query: () => 'titles/list',
            providesTags: ['Title'],
        }),
        addTitle: builder.mutation({
            query: (payload) => ({
                url: 'titles/add',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['Title'],
        }),
        updateTitle: builder.mutation({
            query: ({id, payload}) => ({
                url: `titles/${id}`,
                method: "PUT",
                body: payload,
            }),
            invalidatesTags: ['Title']
        }),
        getTitleById: builder.query({
            query: (id) => `titles/${id}`,
            providesTags: ['Title'],
        }),
        deleteTitle: builder.mutation({
            query: (itemId) => ({
                url: `titles/delete/${itemId}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Title'],
        }),
        getCategory: builder.query({
            query: () => 'categories/list',
            providesTags: ['Category'],
        }),
        addCategory: builder.mutation({
            query: (payload) => ({
                url: 'categories/add',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['Category'],
        }),
        deleteCategory: builder.mutation({
            query: (itemId) => ({
                url: `categories/delete/${itemId}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Category'],
        }),
        getEdition: builder.query({
            query: () => 'editions/list',
            providesTags: ['Edition'],
        }),
        addEdition: builder.mutation({
            query: (payload) => ({
                url: 'editions/add',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['Edition'],
        }),
        getEditionById: builder.query({
            query: (editionId) => ({
                url: `editions/${editionId}`,
                method: 'GET',
            }),
            providesTags: ['Edition'],
        }),
        updateEdition: builder.mutation({
            query: ({id, payload}) => ({
                url: `editions/${id}`,
                method: 'PUT',
                body: payload,
            }),
            invalidatesTags: ['Edition'],
        }),
        deleteEdition: builder.mutation({
            query: (itemId) => ({
                url: `editions/delete/${itemId}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Edition'],
        }),
        getBookCopy: builder.query({
            query: () => 'bookCopies/list',
            providesTags: ['BookCopy'],
        }),
        getBookCopyAvailable: builder.query({
            query: () => 'bookCopies/list/available',
            providesTags: ['BookCopy'],
        }),
        addBookCopy: builder.mutation({
            query: (payload) => ({
                url: 'bookCopies/add',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['BookCopy'],
        }),
        getBookCopyById: builder.query({
            query: (editionId) => ({
                url: `bookCopies/${editionId}`,
                method: 'GET',
            }),
            providesTags: ['BookCopy'],
        }),
        updateBookCopy: builder.mutation({
            query: ({itemId, payload}) => ({
                url: `bookCopies/${itemId}`,
                method: 'PUT',
                body: payload,
            }),
            invalidatesTags: ['BookCopy'],
        }),
        deleteBookCopy: builder.mutation({
            query: (itemId) => ({
                url: `bookCopies/delete/${itemId}`,
                method: 'PUT',
            }),
            invalidatesTags: ['BookCopy'],
        }),
        addBookFast: builder.mutation({
            query: (payload) => ({
                url: `editions/add-fast`,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Edition"],
        }),
        getLoanRecord: builder.query({
            query: () => 'loanRecords/list',
            providesTags: ['LoanRecord'],
        }),
        addLoanRecord: builder.mutation({
            query: (payload) => ({
                url: `loanRecords/add`,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["LoanRecord"],
        }),
        getReaderById: builder.query({
            query: (id) => ({
                url: `readers/${id}`,
                method: "GET",
            }),
            providesTags: ['Reader']
        }),
        getViolation: builder.query({
            query: () => ({
                url: `violations/list`,
                method: "GET",
            }),
            providesTags: ['Violation']
        }),
        addViolation: builder.mutation({
            query: (payload) => ({
                url: `violations/add`,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Violation"]
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `users/${id}`,
                method: "GET",
            }),
            providesTags: ['User']
        }),
        getLoanReport: builder.query({
            query: () => ({
                url: `loanRecords/loanReport/report`,
                method: "GET",
            }),
            providesTags: ['LoanRecord']
        }),
        getLoanReportByMonth: builder.query({
            query: () => ({
                url: `loanRecords/loanReport/reportByMonth`,
                method: "GET",
            }),
            providesTags: ['LoanRecord']
        }),
        getCountBooksByCategory: builder.query({
            query: () => ({
                url: `categories/books/count`,
                method: "GET",
            }),
            providesTags: ['BookCopy']
        }),
        returnBooks: builder.mutation({
            query: ({itemId, payload}) => ({
                url: `loanRecords/returnBooks/${itemId}`,
                method: 'PUT',
                body: payload,
            }),
            invalidatesTags: ['LoanRecord'],
        }),
        resolvedViolation: builder.mutation({
            query: ({itemId}) => ({
                url: `violations/${itemId}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Violation'],
        }),
    }),
});

export const {
    useGetTitleQuery,
    useAddTitleMutation,
    useUpdateTitleMutation,
    useGetTitleByIdQuery,
    useDeleteTitleMutation,
    useGetCategoryQuery,
    useGetBookCopyAvailableQuery,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useGetEditionQuery,
    useGetEditionByIdQuery,
    useUpdateEditionMutation,
    useAddEditionMutation,
    useDeleteEditionMutation,
    useGetBookCopyQuery,
    useGetBookCopyByIdQuery,
    useAddBookCopyMutation,
    useUpdateBookCopyMutation,
    useDeleteBookCopyMutation,
    useAddBookFastMutation,
    useGetLoanRecordQuery,
    useAddLoanRecordMutation,
    useGetReaderByIdQuery,
    useGetUserByIdQuery,
    useGetViolationQuery,
    useAddViolationMutation,
    useGetLoanReportQuery,
    useGetLoanReportByMonthQuery,
    useGetCountBooksByCategoryQuery,
    useReturnBooksMutation,
    useResolvedViolationMutation,
} = bookRTKApi;