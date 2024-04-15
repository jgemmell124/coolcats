import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.role = action.payload.role;
    },
    logoutUser(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
    }
  },
});

export default authSlice.reducer;

export const { loginUser, logoutUser } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => !!state.auth.user;
export const selectRole = (state) => state.auth.user?.role;
export const selectAuth = (state) => state.auth;
