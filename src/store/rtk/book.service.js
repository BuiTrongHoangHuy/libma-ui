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
                url: `editions/${itemId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Edition'],
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
    useGetEditionQuery,
    useGetEditionByIdQuery,
    useAddEditionMutation,
    useDeleteEditionMutation,
} = bookRTKApi;