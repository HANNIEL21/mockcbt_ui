import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tab: {
        selected: ""
    },
    
}


export const tabSlice = createSlice({
    name: "tab",
    initialState,
    reducers: {
        setSelected: (state, action) => {
            state.tab.selected = action.payload;
        },
    },
});


export const { setSelected } = tabSlice.actions;