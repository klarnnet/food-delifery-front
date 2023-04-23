import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  store } from '../slices/store';
import { io } from 'socket.io-client';




export const historyApi = createApi({
    
    reducerPath: 'historyApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/userHistory', prepareHeaders: (headers) => {
        const token = store.getState().authReducer.accessToken;
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
          return headers;
        }
      },}),
    tagTypes: ['History'], 
    endpoints: build => ({
        
        changeStatusHistory: build.mutation<string, string>({
            query: () => ({
                url: 'changeStatusHistory', 
                method: 'POST',
            }),
            invalidatesTags: ['History']
        }),

        addHistory: build.mutation<string, {couierId:string,adress:string,time:string}>({
            query: ({couierId,adress,time}) => ({
                url: 'addHistory', 
                method: 'POST',
                body: {couierId, adress,time},
            }),
            invalidatesTags: ['History']
        }),

        getHistory: build.query<Object[],string>({
            query: () => ({
                url: `findHistory`,
            }),
            providesTags: result => ['History']
        }),

      })
});