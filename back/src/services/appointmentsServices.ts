import moment from "moment";
import IDtoAppointment from "../dto/appointmentDTO";
import IAppointment from "../interfaces/IAppointment";
import AuxError from "../utils/AuxiliarError";

const appointmentsTable: IAppointment[] = [
    {
        id: 0,
        date: "2024-07-03",
        time: "16:00",
        UserId: 0,
        status: "active",
    },
];

export const getAllAppointments = async (): Promise<IAppointment[]> => {
    const allAppointments = await appointmentsTable.map((appointment) => {
        return {
            ...appointment,
            date: moment(appointment.date).format("DD/MM/YYYY").toString(),
            time: moment(appointment.time, "HH:mm").format("HH:mm").toString(),
        };
    });
    return allAppointments;
};

export const getAppointmentById = async (id: number): Promise<IAppointment> => {
    const searchedAppointment = await appointmentsTable.find(
        (appointment) => appointment.id === id
    );
    if (!searchedAppointment)
        throw new AuxError("Appointment id does not exist", 400);
    return {
        ...searchedAppointment,
        date: moment(searchedAppointment.date).format("DD/MM/YYYY").toString(),
        time: moment(searchedAppointment.time, "HH:mm")
            .format("HH:mm")
            .toString(),
    };
};

export const createAppointment = async (
    appointmentData: IDtoAppointment
): Promise<IAppointment> => {
    const { UserId, date, time } = appointmentData;
    const newAppointment: IAppointment = {
        id: Date.now(),
        date,
        time,
        UserId,
        status: "active",
    };
    await appointmentsTable.push(newAppointment);
    return {
        ...newAppointment,
        date: moment(newAppointment.date).format("DD/MM/YYYY").toString(),
        time: moment(newAppointment.time, "HH:mm").format("HH:mm").toString(),
    };
};

export const cancelAppointmentById= async (id: number) => {
    const updateAppointment = await appointmentsTable.find(
        (appointment) => appointment.id === id
    );
    if (!updateAppointment) throw new AuxError("Appointment id does not exist", 400);
    updateAppointment.status = "cancelled";
    return updateAppointment;
};
