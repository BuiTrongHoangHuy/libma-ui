import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "./base.service.js"

export const bookRTKApi = createApi({
    reducerPath: 'cartRTKApi',
    baseQuery,
    tagTypes: ['Category', 'Title', 'Edition', 'BookCopy', 'LoanRecord', 'Reader', "Violation"],
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
        deleteTitle: builder.mutation({
            query: (itemId) => ({
                url: `titles/delete/${itemId}`,
                method: 'DELETE',
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
                url: `categories/${itemId}`,
                method: 'DELETE',
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
        deleteEdition: builder.mutation({
            query: (itemId) => ({
                url: `editions/delete/${itemId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Edition'],
        }),
        getBookCopy: builder.query({
            query: () => 'bookCopies/list',
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
            query: (itemId, payload) => ({
                url: `bookCopies/delete/${itemId}`,
                method: 'DELETE',
                body: payload,
            }),
            invalidatesTags: ['BookCopy'],
        }),
        deleteBookCopy: builder.mutation({
            query: (itemId) => ({
                url: `bookCopies/delete/${itemId}`,
                method: 'DELETE',
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
        addViolation: builder.query({
            query: (payload) => ({
                url: `violations/add`,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Violation"]
        })
    }),
});

export const {
    useGetTitleQuery,
    useAddTitleMutation,
    useDeleteTitleMutation,
    useGetCategoryQuery,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useGetEditionQuery,
    useGetEditionByIdQuery,
    useAddEditionMutation,
    useDeleteEditionMutation,
    useGetBookCopyQuery,
    useGetBookCopyByIdQuery,
    useAddBookCopyMutation,
    useDeleteBookCopyMutation,
    useAddBookFastMutation,
    useGetLoanRecordQuery,
    useAddLoanRecordMutation,
    useGetReaderByIdQuery,
    useGetViolationQuery,
    useAddViolationMutation
} = bookRTKApi;