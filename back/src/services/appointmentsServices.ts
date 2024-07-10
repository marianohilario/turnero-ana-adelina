import IDtoAppointment from "../dto/appointmentDTO";
import AuxError from "../utils/AuxiliarError";
import { Appointment } from "../entities/Appointment";
import { AppointmentModel, UserModel } from "../config/data-source";

export const getAllAppointments = async (): Promise<Appointment[]> => {
    const allAppointments = await AppointmentModel.find({
        relations: {
            user: true,
        },
    });
    return allAppointments;
};

export const getAppointmentById = async (id: number): Promise<Appointment> => {
    const searchedAppointment = await AppointmentModel.findOne({
        where: { id },
        relations: {
            user: true,
        },
    });
    if (!searchedAppointment)
        throw new AuxError("Appointment id does not exist", 400);
    return searchedAppointment;
};

export const createAppointment = async (
    appointmentData: IDtoAppointment
): Promise<Appointment> => {
    const newAppointment = await AppointmentModel.create(appointmentData);
    await AppointmentModel.save(newAppointment);
    const user = await UserModel.findOneBy({ id: appointmentData.UserId });
    if (!user) throw new AuxError("Inexistent user", 404);
    newAppointment.user = user;
    await AppointmentModel.save(newAppointment);

    return newAppointment;
};

export const cancelAppointmentById = async (id: number) => {
    const updateAppointment = await AppointmentModel.findOneBy({ id });
    if (!updateAppointment)
        throw new AuxError("Appointment id does not exist", 400);
    updateAppointment.status = "cancelled";
    await AppointmentModel.save(updateAppointment);

    return updateAppointment;
};
