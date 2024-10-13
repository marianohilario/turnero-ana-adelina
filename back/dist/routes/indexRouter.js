"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRouter_1 = __importDefault(require("./usersRouter"));
const appointmentsRouter_1 = __importDefault(require("./appointmentsRouter"));
const servicesRouter_1 = __importDefault(require("./servicesRouter"));
const mailsRouter_1 = __importDefault(require("./mailsRouter"));
const indexRouter = (0, express_1.Router)();
indexRouter.get("/", (req, res) => {
    res.send("Hello to Ana Adelina server!");
});
indexRouter.use("/users", usersRouter_1.default);
indexRouter.use("/appointments", appointmentsRouter_1.default);
indexRouter.use("/services", servicesRouter_1.default);
indexRouter.use("/mails", mailsRouter_1.default);
exports.default = indexRouter;
