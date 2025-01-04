import {configureStore} from '@reduxjs/toolkit'
import {bookRTKApi} from "@/store/rtk/book.service.js";

export const store = configureStore({
    reducer: {
        [bookRTKApi.reducerPath]: bookRTKApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(bookRTKApi.middleware),
})