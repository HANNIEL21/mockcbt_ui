import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    password: "",
    user_type: "",
    gender: "",
    group: "",
  },
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: "",
  userDetails: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.successMessage = "";
      return state;
    },
    setError: (state, { payload }) => {
      state.isError = true;
      state.errorMessage = payload;
    },
    clearError: (state) => {
      state.isError = false;
      state.errorMessage = "";
    },
    setSuccess: (state) => {
      state.isSuccess = true;
    },
    clearSuccess: (state) => {
      state.isSuccess = false;
    },
    setID: (state, { payload }) => {
      state.user.id = payload;
    },
    setEmail: (state, { payload }) => {
      state.user.email = payload;
    },
    setUserName: (state, { payload }) => {
      state.user.username = payload;
    },
    setFirstName: (state, { payload }) => {
      state.user.firstname = payload;
    },
    setLastName: (state, { payload }) => {
      state.user.lastname = payload;
    },
    setPhoneNumber: (state, { payload }) => {
      state.user.phonenumber = payload;
    },
    setPassword: (state, { payload }) => {
      state.user.password = payload;
    },
    settype: (state, { payload }) => {
      state.user.user_type = payload;
    },
    updateUserDetails: (state, { payload }) => {
      state.user = { ...state.user, ...payload };
    },
    setLoadingForOperation: (state, { payload }) => {
      state.isLoading = payload;
    },
    setUserDetails: (state, { payload }) => {
      state.userDetails = payload;
    },
    Logout: (state) => {
      state.user = {};
      state.userDetails = null;
    },
  },
});

export const {
  clearUserState,
  setError,
  clearError,
  setSuccess,
  clearSuccess,
  setID,
  setEmail,
  setUserName,
  setFirstName,
  setLastName,
  setPhoneNumber,
  setPassword,
  settype,
  updateUserDetails,
  setLoadingForOperation,
  setUserDetails,
  Logout,
} = userSlice.actions;

export default userSlice.reducer;
