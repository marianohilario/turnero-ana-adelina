import { useEffect, useState } from "react";
import Appointment from "../../components/Appointment/Appointment";
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from "./Appointments.module.css";
import axios from "axios";

const NoAppointmentsMessage = () => (
    <h1 className={styles.noAppointments}>No tienes citas agendadas</h1>
);

const AppointmentsHeader = () => (
    <div className={styles.appointmentsHeader}>
        <div className={styles.appointmentsTitle}>
            <img src="./calendar.png" alt="" />
            <h1>Turnos</h1>
        </div>
        <CustomButton className={styles.appointmentBtn} text={"Agendar Cita"} />
    </div>
);

const AppointmentsTable = ({ appointments }) => (
    <div className={styles.appointmentsTableContainer}>
        <table className={styles.appointmentsTable}>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Servicio</th>
                    <th>Duración</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map(({ id, date, time, status }) => (
                    <Appointment
                        key={id}
                        date={date}
                        time={time}
                        status={status}
                    />
                ))}
            </tbody>
        </table>
    </div>
);

const Appointments = () => {
    const [appointmentsToRender, setAppointmentsToRender] = useState([]);

    // useEffect(() => {
    //     axios.get("http://localhost:3000/appointments/").then((response) => {
    //         console.log(response);
    //     });
    // }, []);
    return (
        <div className={styles.appointmentsContainer}>
            <AppointmentsHeader />
            {appointmentsToRender.length === 0 ? (
                <NoAppointmentsMessage />
            ) : (
                <AppointmentsTable appointments={appointmentsToRender} />
            )}
        </div>
    );
};

export default Appointments;
