import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    candidate: {
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
        seatnumber: "",
        examnumber: ""
    },
    candidates:[],
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: "",
    candidateDetails: null,
};

export const candidateSlice = createSlice({
    name: "candidate",
    initialState,
    reducers: {
        clearState: (state) => {
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
        setCandidates:(state, action)=>{
            state.candidates = action.payload;
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
            state.candidate.id = payload;
        },
        setEmail: (state, { payload }) => {
            state.candidate.email = payload;
        },
        setUserName: (state, { payload }) => {
            state.candidate.username = payload;
        },
        setFirstName: (state, { payload }) => {
            state.candidate.firstname = payload;
        },
        setLastName: (state, { payload }) => {
            state.candidate.lastname = payload;
        },
        setPhoneNumber: (state, { payload }) => {
            state.candidate.phonenumber = payload;
        },
        setPassword: (state, { payload }) => {
            state.candidate.password = payload;
        },
        settype: (state, { payload }) => {
            state.candidate.user_type = payload;
        },
        updateUserDetails: (state, { payload }) => {
            state.candidate = { ...state.candidate, ...payload };
        },
        setLoadingForOperation: (state, { payload }) => {
            state.isLoading = payload;
        },
        setCandidateDetails: (state, { payload }) => {
            state.candidateDetails = payload;
        },
        Logout: (state) => {
            state.user = {};
            state.userDetails = null;
        },
    },
});

export const {
    clearState,
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
    setCandidateDetails,
    Logout,
} = candidateSlice.actions;

export default candidateSlice.reducer;
