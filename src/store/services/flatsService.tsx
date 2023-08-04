import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IForgotRequest, ILoginRequest, ILoginResponse, IRegisterRequest, IResetRequest } from '../types/IAuth';
import { IRootState, store } from '../slices/store';
import type { FilterFlatDto, IFlat } from '../types/IFlat';
import type { IPromoCode } from '../types/IPromoCode';


export const flatsApi = createApi({
    reducerPath: 'myflatsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/flat', prepareHeaders: (headers) => {
        const token = store.getState().authReducer.accessToken;
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
          return headers;
        }
      },}),
    tagTypes: ['Flats'], 
    endpoints: build => ({
        getFlats: build.query<IFlat[], {data: any; search: string}>({
            query: (arg) => ({
                url: `filter`,
                params: {
                    data: JSON.stringify(arg.data),
                    search: arg.search


                },
        }),
            providesTags: result => ['Flats']
        }),

        getMyflats: build.query<IFlat[], string>({
            query: () => ({
                url: `/myflats`,
            }),
            providesTags: result => ['Flats']
        }),

        addflat: build.mutation<FormData, FormData>({
            query: body => ({
                url: `/add`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Flats']
        }),

        deleteFlat: build.mutation<string, any>({
            query: flatId => ({
                url: `/delete`,
                method: 'POST',
                body: {flatId:flatId},
            }),
            invalidatesTags: ['Flats']
        }),
    }),
});