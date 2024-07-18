import { useState } from "react";
import appointmentArray from "../../helpers/appointments";
import Appointment from "../../components/Appointment/Appointment";
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from "./Appointments.module.css";

const Appointments = () => {
    const [appointmentsToRender, setAppointmentsToRender] =
        useState(appointmentArray);
    return (
        <div className={styles.appointmentsContainer}>
            <div className={styles.appointmentsHeader}>
                <div className={styles.appointmentsTitle}>
                    <img src="./calendar.png" alt="" />
                    <h1>Turnos</h1>
                </div>
                <CustomButton
                    className={styles.appointmentBtn}
                    text={"Agendar Cita"}
                />
            </div>
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
                        {appointmentsToRender.map(
                            ({ id, date, time, status }) => {
                                return (
                                    <Appointment
                                        key={id}
                                        date={date}
                                        time={time}
                                        status={status}
                                    />
                                );
                            }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Appointments;
