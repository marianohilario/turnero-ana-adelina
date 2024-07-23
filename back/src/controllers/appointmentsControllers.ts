import { Request, Response } from "express";
import {
    cancelAppointmentById,
    createAppointment,
    getAllAppointments,
    getAppointmentById,
} from "../services/appointmentsServices";
import catchAsync from "../utils/catchAsync";

export const getAppointments = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
        console.log('req', req);
        console.log('entra al controller');
        
        const allAppointments = await getAllAppointments();
        console.log('sale al controller');
        res.status(200).json(allAppointments);
    }
);

export const getAppointment = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
        const appointmentId = parseInt(req.params.id);
        const appointment = await getAppointmentById(appointmentId);
        res.status(200).json(appointment);
    }
);

export const scheduleAppointment = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
        const newAppointment = await createAppointment(req.body);
        res.status(201).json(newAppointment);
    }
);

export const cancelAppointment = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
        const appointmentId = parseInt(req.params.id);
        const appointmentUpdated = await cancelAppointmentById(appointmentId);
        res.status(200).json(appointmentUpdated);
    }
);
