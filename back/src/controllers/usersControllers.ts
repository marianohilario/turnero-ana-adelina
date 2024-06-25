import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
    res.status(200).json({
        message: "Devuelve el listado de todos los usuarios",
    });
};
export const getUser = (req: Request, res: Response) => {
    res.status(200).json({
        message: "Devuelve el detalle de un usuario específico",
    });
};
export const createUser = (req: Request, res: Response) => {
    res.status(200).json({ message: "Registro de un nuevo usuario" });
};
export const loginUser = (req: Request, res: Response) => {
    res.status(200).json({ message: "Login de un usuario a la aplicación" });
};
