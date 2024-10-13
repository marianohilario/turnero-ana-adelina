"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginDataValidate = void 0;
const AuxiliarError_1 = __importDefault(require("../utils/AuxiliarError"));
const loginDataValidate = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new AuxiliarError_1.default("All fields must be completed", 400);
    }
    if (typeof username !== "string" || typeof password !== "string") {
        throw new AuxiliarError_1.default("Data types does not match", 400);
    }
    next();
};
exports.loginDataValidate = loginDataValidate;
