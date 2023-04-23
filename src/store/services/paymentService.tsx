import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  store } from '../slices/store';


export const paymentApi = createApi({
    reducerPath: 'paymentApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000', prepareHeaders: (headers) => {
        const token = store.getState().authReducer.accessToken;
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
          return headers;
        }
      },}),
    tagTypes: ['Payment'], 
    endpoints: build => ({
        
        setUserCart: build.mutation({
            query: userCart => ({
                url: '/stripe', 
                method: 'POST',
                body: userCart,
            }),
            invalidatesTags: ['Payment']
        }),
    }),
});