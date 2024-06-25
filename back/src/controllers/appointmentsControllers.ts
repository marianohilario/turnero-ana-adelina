import { Request, Response } from "express";

export const getAppointments = (req: Request, res: Response) => {
    res.status(200).json({
        message:
            "Devuelve el listado de todos los turnos de todos los usuarios",
    });
};
export const getAppointment = (req: Request, res: Response) => {
    res.status(200).json({
        message: "Devuelve el detalle de un turno específico",
    });
};
export const scheduleAppointment = (req: Request, res: Response) => {
    res.status(200).json({ message: "Agendar un nuevo turno" });
};
export const cancelAppointment = (req: Request, res: Response) => {
    res.status(200).json({
        message: "Cambiar el estatus de un turno a cancelled",
    });
};
