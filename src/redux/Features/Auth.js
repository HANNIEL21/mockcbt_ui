import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    username: "",
    password: "",
  },
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  error: "",
  isSuccess: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.user.username = action.payload;
    },
    setPassword: (state, action) => {
      state.user.password = action.payload;
    },
    setLoadingTrue: (state) => {
      state.isLoading = true;
    },
    setLoadingFalse: (state) => {
      state.isLoading = false;
    },
    setIsAuthenticatedTrue: (state) => {
      state.isAuthenticated = true;
    },
    setIsAuthenticatedFalse: (state) => {
      state.isAuthenticated = false;
    },
    setError: (state, action) => {
      state.isError = true;
      state.error = action.payload;
    },
    /**
     * @deprecated - Import from User slice
     * @param {*} state
     */
    logout: (state) => {
      state.isLoading = true;
      state.user = {
        username: "",
        password: "",
      };
    },
    clearAuthState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.user = {
        username: "",
        password: "",
      };
    },
  },
});

export const {
  setUsername,
  setPassword,
  clearAuthState,
  setLoadingTrue,
  setLoadingFalse,
  logout,
  setError,
  setIsAuthenticatedFalse,
  setIsAuthenticatedTrue,
} = authSlice.actions;
