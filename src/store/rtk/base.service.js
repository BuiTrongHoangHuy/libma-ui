import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import config from '/config';

export const baseQuery = fetchBaseQuery({
    baseUrl: config.MOCK_URL,
    prepareHeaders: (headers) => {
        const auth = localStorage.getItem('auth');
        const token = JSON.parse(auth) || '';
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

