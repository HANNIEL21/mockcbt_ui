import { configureStore, combineReducers   } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import { authSlice } from "./Features/Auth";
import { userSlice } from "./Features/User";
import {dashboardSlice} from "./Features/Dashboard";
import {examSlice} from "./Features/Exam";
import { tabSlice } from "./Features/Tabs";
import { candidateSlice } from "./Features/Candidate";
import { resultSlice } from "./Features/Result";

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    result: resultSlice.reducer,
    tab: tabSlice.reducer,
    user: userSlice.reducer,
    candidate: candidateSlice.reducer,
    exam: examSlice.reducer,
    dashboard: dashboardSlice.reducer,
})

const persistConfig = {
    key: "root",
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store);