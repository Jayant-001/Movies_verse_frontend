import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: "home",
    initialState: {
        url: {},
        user: null,
    },
    reducers: {
        setApiConfig: (state, action) => {
            state.url = action.payload;
        },
        setUserId: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setApiConfig, setUserId } = homeSlice.actions;
export default homeSlice.reducer;
