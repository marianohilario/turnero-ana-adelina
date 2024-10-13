"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentSchedule = void 0;
const AuxiliarError_1 = __importDefault(require("../utils/AuxiliarError"));
const appointmentSchedule = (req, res, next) => {
    const { date, time, UserId } = req.body;
    if (!date || !time || !UserId) {
        throw new AuxiliarError_1.default("All fields must be completed", 400);
    }
    if (typeof date !== "string" ||
        typeof time !== "string" ||
        typeof UserId !== "number") {
        throw new AuxiliarError_1.default("Data type does not match", 400);
    }
    next();
};
exports.appointmentSchedule = appointmentSchedule;
