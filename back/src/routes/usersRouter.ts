import { Router } from "express";
import {
    createUser,
    getUser,
    getUsers,
    getUsersWithUsername,
    loginUser,
} from "../controllers/usersControllers";
import { userDataValidate } from "../middlewares/userDataValidate";
import { loginDataValidate } from "../middlewares/loginDataValidate";

const usersRouter: Router = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/profiles", getUsersWithUsername);
usersRouter.get("/:id", getUser);
usersRouter.post("/register", userDataValidate, createUser);
usersRouter.post("/login", loginDataValidate, loginUser);

export default usersRouter;
