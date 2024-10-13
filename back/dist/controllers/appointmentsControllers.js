"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointmentByUserId = exports.cancelAppointment = exports.scheduleAppointment = exports.getAppointment = exports.getAppointments = void 0;
const appointmentsServices_1 = require("../services/appointmentsServices");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
exports.getAppointments = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allAppointments = yield (0, appointmentsServices_1.getAllAppointments)();
    res.status(200).json(allAppointments);
}));
exports.getAppointment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = parseInt(req.params.id);
    const appointment = yield (0, appointmentsServices_1.getAppointmentById)(appointmentId);
    res.status(200).json(appointment);
}));
exports.scheduleAppointment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newAppointment = yield (0, appointmentsServices_1.createAppointment)(req.body);
    res.status(201).json(newAppointment);
}));
exports.cancelAppointment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = parseInt(req.params.id);
    const appointmentUpdated = yield (0, appointmentsServices_1.cancelAppointmentById)(appointmentId);
    res.status(200).json(appointmentUpdated);
}));
exports.getAppointmentByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    const appointmentsByUserId = yield (0, appointmentsServices_1.AppointmentsByUserId)(userId);
    res.status(200).json(appointmentsByUserId);
}));
