import { NextFunction, Request, Response } from "express";
import AuxError from "../utils/AuxiliarError";

export const loginDataValidate = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new AuxError("All fields must be completed", 400);
    }
    if (typeof username !== "string" || typeof password !== "string") {
        throw new AuxError("Data types does not match", 400);
    }
    next();
};
