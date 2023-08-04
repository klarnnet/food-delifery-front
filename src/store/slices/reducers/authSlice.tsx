import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import type { ILoginResponse } from '../../types/IAuth';
import type { RootState } from '@reduxjs/toolkit/dist/query/core/apiState';

export interface IToken {
    accessToken: string | undefined;
}


const initialState: IToken = {
    accessToken: '' || undefined,
} 

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser:(state, action:PayloadAction<string>)=>{
            state.accessToken = action.payload
        }
    },

});

export const authReducer = authSlice.reducer;
export const  {setUser}  = authSlice.actions;