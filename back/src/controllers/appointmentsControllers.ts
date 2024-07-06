import { Request, Response } from "express";
import {
    cancelAppointmentById,
    createAppointment,
    getAllAppointments,
    getAppointmentById,
} from "../services/appointmentsServices";
import catchAsync from "../utils/catchAsync";

export const getAppointments = catchAsync(
    async (req: Request, res: Response) => {
        const allAppointments = await getAllAppointments();
        res.status(200).json(allAppointments);
    }
);

export const getAppointment = catchAsync(
    async (req: Request, res: Response) => {
        const appointmentId = parseInt(req.params.id);
        const appointment = await getAppointmentById(appointmentId);
        res.status(200).json(appointment);
    }
);

export const scheduleAppointment = catchAsync(
    async (req: Request, res: Response) => {
        const appointmentData = req.body;
        const newAppointment = await createAppointment(appointmentData);
        res.status(200).json(newAppointment);
    }
);

export const cancelAppointment = catchAsync(async (req: Request, res: Response) => {
    const appointmentId = parseInt(req.body.id)
    const appointmentUpdated = await cancelAppointmentById(appointmentId)
    res.status(200).json(appointmentUpdated);
});
