import IDtoAppointment from "../dto/appointmentDTO";
import AuxError from "../utils/AuxiliarError";
import { Appointment } from "../entities/Appointment";
import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { UserRepository } from "../repositories/UserRepository";
import { ServicesRepository } from "../repositories/ServicesRepository";

export const getAllAppointments = async (): Promise<Appointment[]> => {
    const allAppointments = await AppointmentRepository.find({
        relations: {
            user: true,
            service: true,
        },
    });
    if (allAppointments.length !== 0) return allAppointments;
    throw new AuxError("No appointments to show", 404);
};

export const getAppointmentById = async (id: number): Promise<Appointment> => {
    const searchedAppointment = await AppointmentRepository.findOne({
        where: { id },
        relations: {
            user: true,
        },
    });
    if (!searchedAppointment)
        throw new AuxError("Appointment id does not exist", 404);
    return searchedAppointment;
};

export const createAppointment = async (
    appointmentData: IDtoAppointment
): Promise<Appointment> => {
    const user = await UserRepository.findById(appointmentData.UserId);
    const service = await ServicesRepository.findById(
        appointmentData.serviceId
    );
    const newAppointment = await AppointmentRepository.create(appointmentData);
    await AppointmentRepository.save(newAppointment);
    newAppointment.user = user;
    newAppointment.service = service;
    await AppointmentRepository.save(newAppointment);

    return newAppointment;
};

export const cancelAppointmentById = async (id: number) => {
    const updateAppointment = await AppointmentRepository.findOneBy({ id });
    if (!updateAppointment)
        throw new AuxError("Appointment id does not exist", 404);
    updateAppointment.status = "cancelled";
    await AppointmentRepository.save(updateAppointment);

    return updateAppointment;
};

export const AppointmentsByUserId = async (
    id: number
): Promise<Appointment[]> => {
    const userAppointments = await AppointmentRepository.find({
        where: { user: { id } },
        relations: {
            service: true,
        },
    });
    if (!userAppointments)
        throw new AuxError("Appointment id does not exist", 404);
    return userAppointments;
};
