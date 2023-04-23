import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IForgotRequest, ILoginRequest, ILoginResponse, IRegisterRequest, IResetRequest } from '../types/IAuth';
import { IRootState, store } from '../slices/store';
import type { IFood } from '../types/IFood';
import type { IPromoCode } from '../types/IPromoCode';


export const foodApi = createApi({

    reducerPath: 'foodApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/food', prepareHeaders: (headers) => {
        const token = store.getState().authReducer.accessToken;
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
          return headers;
        }
      },}),
    tagTypes: ['Food','PromoCode'], 
    endpoints: build => ({
        getFood: build.query<IFood[], {filter:string; search: string}>({
            query: (arg) => ({
                url: `filter`,
                params: {
                    filter: arg.filter,
                    search: arg.search
                }
            }),
            providesTags: result => ['Food']
        }),

        getPromoCode: build.query<IPromoCode[], {code: string}>({
            query: (arg) => ({
                url: `/getPromoCode`,
                params: {
                    code: arg.code,
                },
            }),
            providesTags: result => ['PromoCode']
        }),
    }),
});