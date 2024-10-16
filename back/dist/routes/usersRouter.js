"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersControllers_1 = require("../controllers/usersControllers");
const userDataValidate_1 = require("../middlewares/userDataValidate");
const loginDataValidate_1 = require("../middlewares/loginDataValidate");
const usersRouter = (0, express_1.Router)();
usersRouter.get("/", usersControllers_1.getUsers);
usersRouter.get("/profiles", usersControllers_1.getUsersWithUsername);
usersRouter.get("/:id", usersControllers_1.getUser);
usersRouter.post("/register", userDataValidate_1.userDataValidate, usersControllers_1.createUser);
usersRouter.post("/login", loginDataValidate_1.loginDataValidate, usersControllers_1.loginUser);
exports.default = usersRouter;
