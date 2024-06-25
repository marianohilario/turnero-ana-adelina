import { Router } from "express";
import {
    createUser,
    getUser,
    getUsers,
    loginUser,
} from "../controllers/usersControllers";

const usersRouter: Router = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUser);
usersRouter.post("/register", createUser);
usersRouter.post("/login", loginUser);

export default usersRouter;
