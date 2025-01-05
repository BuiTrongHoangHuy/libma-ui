import {configureStore} from '@reduxjs/toolkit'
import {bookRTKApi} from "@/store/rtk/book.service.js";
import {loanRecordRTKApi} from "@/store/rtk/loanRecord.service.js";

export const store = configureStore({
    reducer: {
        [bookRTKApi.reducerPath]: bookRTKApi.reducer,
        [loanRecordRTKApi.reducerPath]: loanRecordRTKApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(bookRTKApi.middleware)
            .concat(loanRecordRTKApi.middleware),
})