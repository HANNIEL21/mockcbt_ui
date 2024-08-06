import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    result: {
        id: "",
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        phonenumber: "",
        password: "",
        gender: "",
        group: "",
        type: "",
        percentage: "",
        attempts: "",
        examiner: "",
        candidateName: "",
        candidateNo: "",
        score: "",
    },
    isLoading: false,
    isError: false,
    error: '',
    resultDetails: [],
};

export const resultSlice = createSlice({
    name: "result",
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.resultDetails = [];
        },
        setError: (state, { payload }) => {
            state.isError = true;
            state.error = payload;
        },
        clearError: (state) => {
            state.isError = false;
            state.error = null;
        },
        setLoadingTrue: (state) => {
            state.isLoading = true;
        },
        setLoadingFalse: (state) => {
            state.isLoading = false;
        },
        setResultDetails: (state, { payload }) => {
            state.resultDetails = payload;
        },
        setResultField: (state, { payload }) => {
            const { field, value } = payload;
            state.result[field] = value;
        },
    },
});

export const {
    clearState,
    setError,
    clearError,
    setLoadingTrue,
    setLoadingFalse,
    setResultDetails,
    setResultField,
} = resultSlice.actions;

export default resultSlice.reducer;
