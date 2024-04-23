import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { IUserResponse } from '../type/interface';

type AuthState = {
    token: string | null
}

const slice = createSlice({
    name: 'auth',
    initialState: { token: window.localStorage.getItem('token') || null } as AuthState,
    reducers: {
        setCredentials: (
            state,
            {
                payload: { token },
            }: PayloadAction<IUserResponse>,
        ) => {
            state.token = token;
        },
        clearCredentials: (state) => {
            state.token = null;
        }
    },
})

export const { setCredentials, clearCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.token;
