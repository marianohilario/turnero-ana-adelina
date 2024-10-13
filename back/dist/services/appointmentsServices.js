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
exports.AppointmentsByUserId = exports.cancelAppointmentById = exports.createAppointment = exports.getAppointmentById = exports.getAllAppointments = void 0;
const AuxiliarError_1 = __importDefault(require("../utils/AuxiliarError"));
const AppointmentRepository_1 = require("../repositories/AppointmentRepository");
const UserRepository_1 = require("../repositories/UserRepository");
const ServicesRepository_1 = require("../repositories/ServicesRepository");
const getAllAppointments = () => __awaiter(void 0, void 0, void 0, function* () {
    const allAppointments = yield AppointmentRepository_1.AppointmentRepository.find({
        relations: {
            user: true,
            service: true,
        },
    });
    if (allAppointments.length !== 0)
        return allAppointments;
    throw new AuxiliarError_1.default("No appointments to show", 404);
});
exports.getAllAppointments = getAllAppointments;
const getAppointmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const searchedAppointment = yield AppointmentRepository_1.AppointmentRepository.findOne({
        where: { id },
        relations: {
            user: true,
        },
    });
    if (!searchedAppointment)
        throw new AuxiliarError_1.default("Appointment id does not exist", 404);
    return searchedAppointment;
});
exports.getAppointmentById = getAppointmentById;
const createAppointment = (appointmentData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserRepository_1.UserRepository.findById(appointmentData.UserId);
    const service = yield ServicesRepository_1.ServicesRepository.findById(appointmentData.serviceId);
    const newAppointment = yield AppointmentRepository_1.AppointmentRepository.create(appointmentData);
    yield AppointmentRepository_1.AppointmentRepository.save(newAppointment);
    newAppointment.user = user;
    newAppointment.service = service;
    yield AppointmentRepository_1.AppointmentRepository.save(newAppointment);
    return newAppointment;
});
exports.createAppointment = createAppointment;
const cancelAppointmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const updateAppointment = yield AppointmentRepository_1.AppointmentRepository.findOneBy({ id });
    if (!updateAppointment)
        throw new AuxiliarError_1.default("Appointment id does not exist", 404);
    updateAppointment.status = "cancelled";
    yield AppointmentRepository_1.AppointmentRepository.save(updateAppointment);
    return updateAppointment;
});
exports.cancelAppointmentById = cancelAppointmentById;
const AppointmentsByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userAppointments = yield AppointmentRepository_1.AppointmentRepository.find({
        where: { user: { id } },
        relations: {
            service: true,
        },
    });
    if (!userAppointments)
        throw new AuxiliarError_1.default("Appointment id does not exist", 404);
    return userAppointments;
});
exports.AppointmentsByUserId = AppointmentsByUserId;
