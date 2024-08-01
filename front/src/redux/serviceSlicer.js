import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    services: [],
};

export const serviceSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
        setServices: (state, action) => action.payload,
    },
});

export const { setServices } = serviceSlice.actions;
