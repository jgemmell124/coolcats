import { createSlice } from '@reduxjs/toolkit';
import { ROLES_ENUM } from '../utils/constants';

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

export const selectUser = (state) => state.auth?.user;
export const selectIsLoggedIn = (state) => !!state.auth.user;
export const selectRole = (state) => state.auth.user?.role;
export const selectAuth = (state) => state.auth;
export const selectIsWhatRole = (id) => {
  return (state) => {
    const role = state.auth.user?.role;
    const isAdmin = role === ROLES_ENUM.ADMIN;
    const isEmployee = role === ROLES_ENUM.EMPLOYEE;
    const isUser = role === ROLES_ENUM.USER;
    const isSelf =  state.auth.user && state.auth.user?._id === id;

    return { isAdmin, isEmployee, isUser, isSelf };
  };
};
