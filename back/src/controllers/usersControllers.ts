import { Request, Response } from "express";
import {
    createNewUser,
    getAllUsers,
    getUserById,
    logUser,
} from "../services/userServices";
import catchAsync from "../utils/catchAsync";

export const getUsers = catchAsync(async (req: Request, res: Response) => {
    const AllUsers = await getAllUsers();
    res.status(200).json(AllUsers);
});

export const getUser = catchAsync(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const searchedUser = await getUserById(userId);
    res.status(200).json(searchedUser);
});

export const createUser = catchAsync(async (req: Request, res: Response) => {
    const userData = req.body;
    const newUser = await createNewUser(userData);
    res.status(200).json(newUser);
});

export const loginUser = catchAsync(async (req: Request, res: Response) => {
    const userCredentials = req.body;
    const successLog = await logUser(userCredentials);
    res.status(200).json(successLog);
});
