import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "./base.service.js"

export const bookRTKApi = createApi({
    reducerPath: 'cartRTKApi',
    baseQuery,
    tagTypes: ['Category', 'Title', 'Edition', 'BookCopy'],
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
    }),
});

export const {
    useGetTitleQuery,
    useAddTitleMutation,
    useDeleteTitleMutation,
    useGetCategoryQuery,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
} = bookRTKApi;