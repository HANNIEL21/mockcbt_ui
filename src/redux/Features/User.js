import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseApiUrl } from "../../utils/constants";
import Alert from "../../components/Alert";

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

export const logout = createAsyncThunk("logout", async (_, { getState }) => {
  const user = getState().user.userDetails;

  const username = user.role === "USER" ? user?.examno : user?.username;

  if (!username) return;

  try {
    await axios.post(`${baseApiUrl}/logout.php`, { username });
  } catch (error) {
    Alert(
      "error",
      error.response?.data?.message || error?.message || "Failed to logout"
    );
  }

  const log = {
    user: user.username,
    event: "LOGOUT",
  };
  await axios.post(`${baseApiUrl}/log.php`, log);
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.user = { ...initialState.user };
      state.userDetails = null;
    });
  },

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
} = userSlice.actions;

export default userSlice.reducer;
