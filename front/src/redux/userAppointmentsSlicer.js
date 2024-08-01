import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const userAppointmentsSlice = createSlice({
    name: "userAppointments",
    initialState,
    reducers: {
        setUserAppointments: (state, action) => action.payload,
        cancelAppointment: (state, action) => {
            const appointmentToCancell = state.find(
                (appointment) => appointment.id === action.payload
            );
            if (appointmentToCancell) {
                appointmentToCancell.status = "cancelled";
            }
        },
        addAppointment: (state, action) => {
            state.push(action.payload)
        }
    },
});

export const { setUserAppointments, cancelAppointment, addAppointment } =
    userAppointmentsSlice.actions;
