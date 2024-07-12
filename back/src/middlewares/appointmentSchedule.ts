import { NextFunction, Request, Response } from "express";
import AuxError from "../utils/AuxiliarError";

export const appointmentSchedule = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { date, time, UserId } = req.body;
    if (!date || !time || !UserId) {
        throw new AuxError("All fields must be completed", 400);
    }
    if (
        typeof date !== "string" ||
        typeof time !== "string" ||
        typeof UserId !== "number"
    ) {
        throw new AuxError("Data type does not match", 400);
    }
    next();
};
