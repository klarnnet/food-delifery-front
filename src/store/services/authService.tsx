import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IForgotRequest, ILoginRequest, ILoginResponse, IRegisterRequest, IResetRequest } from '../types/IAuth';


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/auth' }),
    tagTypes: ['Auth'], 
    endpoints: build => ({
        loginUser: build.mutation<ILoginResponse, ILoginRequest>({
            query: login => ({
                url: '/signin', 
                method: 'POST',
                body: login,
            }),
            invalidatesTags: ['Auth']
        }),
        
        
        registerUser: build.mutation<IRegisterRequest, IRegisterRequest>({
            query: signup => ({
                url: `/signup`,
                method: 'POST',
                body: signup,
            }),
        }),

        forgotPassword: build.mutation<string, IForgotRequest>({
            query: fogot => ({
                url: `/forgotPassword`,
                method: 'POST',
                body: fogot,
            }),
        }),

        changePassword: build.mutation<IResetRequest, IResetRequest>({
            query: change => ({
                url: `/changePassword`,
                method: 'POST',
                body: {password: change.password},
                headers:{
                    Authorization: `Bearer ${change.token}`
                },
            }),
        }),
    }),
});

