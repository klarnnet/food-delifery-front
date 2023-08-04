import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  store } from '../slices/store';
import type { ISetFavoriteFood } from '../types/IFavorite';


export const favoriteApi = createApi({
    reducerPath: 'favoriteApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/', prepareHeaders: (headers) => {
        const token = store.getState().authReducer.accessToken;
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
          return headers;
        }
      },}),
    tagTypes: ['Favorite'], 
    endpoints: build => ({
        setFavoriteFood: build.mutation<string, ISetFavoriteFood>({
            query: foodId => ({
                url: '/favorite/add', 
                method: 'POST',
                body: {foodId:foodId},
            }),
            invalidatesTags: ['Favorite']
        }),

        deleteFavoriteFood: build.mutation<string, ISetFavoriteFood>({
            query: foodId => ({
                url: '/favorite/delete', 
                method: 'POST',
                body: {foodId:foodId},
            }),
            invalidatesTags: ['Favorite']
        }),

        getFavoriteFood: build.query<any,string>({
            query: (arg) => ({
                url: `/favorite/findFavorite`,
            }),
            providesTags: result => ['Favorite']
        }),


    }),
});