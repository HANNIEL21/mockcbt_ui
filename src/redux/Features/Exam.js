import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    exam: {
        id: "",
        name: "",
        duration: "",
        start: "",
        end: "",
        type: "",
        attempts: "",
    },
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: "",
    examDetails: null,
    questions: [],
    answers: [],
    result: [],
    trace: 0,
};

export const examSlice = createSlice({
    name: "exam",
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
            state.exam.id = payload;
        },
        setDuration: (state, { payload }) => {
            state.exam.duration = payload;
        },
        setStart: (state, { payload }) => {
            state.exam.start = payload;
        },
        setEnd: (state, { payload }) => {
            state.exam.end = payload;
        },
        setAttempts: (state, { payload }) => {
            state.exam.attempts = payload;
        },
        setType: (state, { payload }) => {
            state.exam.type = payload;
        },
        updateExamDetails: (state, { payload }) => {
            state.exam = { ...state.exam, ...payload };
        },
        setExamDetails: (state, { payload }) => {
            state.examDetails = payload;
        },
        setQuestions: (state, { payload }) => {
            state.questions = payload;
        },
        setAnswers: (state, { payload }) => {
            state.answers = payload;
        },
        setResult: (state, { payload }) => {
            state.result = payload;
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
    setDuration,
    setStart,
    setEnd,
    setAttempts,
    setType,
    updateExamDetails,
    setExamDetails,
    setQuestions,
    setAnswers,
    setResult,
} = examSlice.actions;

export default examSlice.reducer;
