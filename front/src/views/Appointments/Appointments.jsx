import { useEffect, useState } from "react";
import styles from "./Appointments.module.css";
import axios from "axios";
import Calendar from "../../components/Calendar/Calendar";

const AppointmentsHeader = () => (
    <div className={styles.appointmentsHeader}>
        <div className={styles.appointmentsTitle}>
            <img src="./calendar.png" alt="" />
            <h1>Turnos</h1>
        </div>
    </div>
);

const Appointments = () => {
    const [appointmentsToRender, setAppointmentsToRender] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/appointments/")
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error(
                        "Network response was not ok " + response.statusText
                    );
                }
                return response.data;
            })
            .then((data) => {
                setAppointmentsToRender(data);
            })
            .catch((error) => {
                console.error(
                    "There was a problem with the axios operation:",
                    error
                );
            });
    }, []);
    return (
        <div className={styles.appointmentsContainer}>
            <AppointmentsHeader />
            <Calendar appointments={appointmentsToRender} />
        </div>
    );
};

export default Appointments;
