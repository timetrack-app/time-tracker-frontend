import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

type User = {
  id: number
  email: string
  isVerified: boolean
};

type AuthState = {
  user: User | null
};

const initialState: AuthState = {
  user: null
};

// Manage user's authenticate status
// state.user has values: the user is logged in
// state.user is null: the user is logged out
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const selectLoggedInUser = (state: RootState) => state.auth.user;

export const {
  login,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
