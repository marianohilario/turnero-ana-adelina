import { useEffect, useState } from "react";
import styles from "./Appointments.module.css";
import axios from "axios";
import Calendar from "../../components/Calendar/Calendar";
import { useSelector, useDispatch } from "react-redux";
import { setUserAppointments } from "../../redux/userAppointmentsSlicer";

const AppointmentsHeader = () => (
    <div className={styles.appointmentsHeader}>
        <div className={styles.appointmentsTitle}>
            <img src="./calendar.png" alt="" />
            <h1>Turnos</h1>
        </div>
    </div>
);

const Appointments = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get(`https://turnero-ana-adelina.onrender.com/appointments/user/${user.id}`)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error(
                        "Network response was not ok " + response.statusText
                    );
                }
                return response.data;
            })
            .then((data) => {
                dispatch(setUserAppointments(data));
            })
            .catch((error) => {
                error.response.data.message !== "No appointments to show" &&
                    console.error(
                        "There was a problem with the axios operation:",
                        error
                    );
            });
    }, [dispatch, user.id]);
    return (
        <div className={styles.appointmentsContainer}>
            <AppointmentsHeader />
            <Calendar />
        </div>
    );
};

export default Appointments;
