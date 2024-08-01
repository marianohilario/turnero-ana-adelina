import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { getServices } from "../services/servicesServices";

export const getAllServices = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
        const allAppointments = await getServices();
        res.status(200).json(allAppointments);
    }
);