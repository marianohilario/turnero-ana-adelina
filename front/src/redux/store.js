import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlicer";
import { userAppointmentsSlice } from "./userAppointmentsSlicer";
import { serviceSlice } from "./serviceSlicer";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        userAppointments: userAppointmentsSlice.reducer,
        services: serviceSlice.reducer,
    },
});

export default store;
