// adminSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    exams: [],
    results: [],
    questions: [],
    tokens: [],
    candidates: [],
    faculties: [],
    feedback: [],
    departments: [],
    courses: [],
    isLoading: true,
    error: null,
};

export const dashboardSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        clearState: (state) => {
            state.users = [];
            state.exams = [];
            state.results = [];
            state.tokens = [];
            state.questions = [];
            state.candidates = [];
            state.faculties = [];
            state.feedback = [];
            state.departments = [];
            state.courses = [];
            return state;
        },
        setUsers: (state, { payload }) => {
            state.users = payload;
        },
        setExams: (state, { payload }) => {
            state.exams = payload;
        },
        setResults: (state, { payload }) => {
            state.results = payload;
        },
        setQuestions: (state, { payload }) => {
            state.questions = payload;
        },
        setTokens: (state, { payload }) => {
            state.tokens = payload;
        },
        setCandidates: (state, { payload }) => {
            state.candidates = payload;
        },
        setFaculties: (state, { payload }) => {
            state.faculties = payload;
        },
        setFeedback: (state, { payload }) => {
            state.feedback = payload;
        },
        setDepartments: (state, { payload }) => {
            state.departments = payload;
        },
        setCourses: (state, { payload }) => {
            state.courses = payload;
        },
        isLoadingTrue: (state) => {
            state.isLoading = true;
        },
        isLoadingFalse: (state) => {
            state.isLoading = false;
        },
    },
});

export const {
    clearState,
    setUsers,
    setExams,
    setQuestions,
    setCandidates,
    setCourses,
    setTokens,
    setDepartments,
    setFaculties,
    setFeedback,
    setResults,
    isLoadingFalse,
    isLoadingTrue
} = dashboardSlice.actions;


export default dashboardSlice.reducer;