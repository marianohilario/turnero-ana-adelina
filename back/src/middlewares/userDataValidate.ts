import { NextFunction, Request, Response } from "express";
import AuxError from "../utils/AuxiliarError";

export const userDataValidate = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { name, email, birthdate, nDni, username, password } = req.body;
    if (!name || !email || !birthdate || !nDni || !username || !password) {
        throw new AuxError("Complete all fields.", 400);
    }
    if (
        typeof name.trim() !== "string" ||
        typeof email.trim() !== "string" ||
        typeof birthdate.trim() !== "string" ||
        typeof nDni !== "number" ||
        typeof username.trim() !== "string" ||
        typeof password.trim() !== "string"
    ) {
        throw new AuxError("Data types does not match.", 400);
    }

    next();
};
