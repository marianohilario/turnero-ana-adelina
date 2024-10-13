"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDataValidate = void 0;
const AuxiliarError_1 = __importDefault(require("../utils/AuxiliarError"));
const userDataValidate = (req, res, next) => {
    const { name, email, birthdate, nDni, username, password } = req.body;
    if (!name || !email || !birthdate || !nDni || !username || !password) {
        throw new AuxiliarError_1.default("Complete all fields.", 400);
    }
    if (typeof name.trim() !== "string" ||
        typeof email.trim() !== "string" ||
        typeof birthdate.trim() !== "string" ||
        typeof nDni !== "number" ||
        typeof username.trim() !== "string" ||
        typeof password.trim() !== "string") {
        throw new AuxiliarError_1.default("Data types does not match.", 400);
    }
    next();
};
exports.userDataValidate = userDataValidate;
