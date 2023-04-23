import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { store } from '../slices/store';
import type { IUser, IUserChange } from '../types/IUser';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/',
        prepareHeaders: headers => {
            const token = store.getState().authReducer.accessToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
                return headers;
            }
        }, 
    }),
    tagTypes: ['User'],

    endpoints: build => ({
        getUser: build.query({
            query: () => ({
                url: `/user`,
            }),
            providesTags: result => ['User'],
        }),

        setUserChange: build.mutation<FormData,FormData>({
            query: data => ({
                url: '/user/changeAvatar',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        setUserAboutChange: build.mutation<string,{username:string,email:string}>({
            query: ({username,email}) => ({
                url: '/user/changeAbout',
                method: 'POST',
                body: {username,email},
            }),
            invalidatesTags: ['User'],
        }),
        setUserPasswordChange: build.mutation<string,{password:string,changePassword:string}>({
            query: ({password,changePassword}) => ({
                url: '/user/changePassword',
                method: 'POST',
                body: {password,changePassword},
            }),
            invalidatesTags: ['User'],
        }),
    }),
});
