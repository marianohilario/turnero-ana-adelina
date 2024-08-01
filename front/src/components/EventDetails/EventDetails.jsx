import axios from "axios";
import CustomButton from "../CustomButton/CustomButton";
import NoAppointments from "../NoAppointments/NoAppointments";
import { useDispatch } from "react-redux";
import { cancelAppointment } from "../../redux/userAppointmentsSlicer";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styles from "../Calendar/Calendar.module.css";

const MySwal = withReactContent(Swal);

const EventDetails = ({
    selectedDay,
    formatDay,
    formatDate,
    appointmentsToShow,
}) => {
    const dispatch = useDispatch();

    const fetchCancelAppointment = async (id) => {
        try {
            await axios.put(`http://localhost:3000/appointments/cancel/${id}`);
            dispatch(cancelAppointment(id));
            toast.success("Cita cancelada exitosamente.");
        } catch (error) {
            toast.error("Hubo un problema al cancelar la cita.");
        }
    };

    const sendCancelNotification = async (appId) => {
        const appointmetToCancel = appointmentsToShow.filter(
            (appointment) => appointment.id === appId
        );
        const dataToSend = {
            name: appointmetToCancel[0].user.name.split(" ")[0],
            email: appointmetToCancel[0].user.email,
            service: appointmetToCancel[0].service.title,
            date: appointmetToCancel[0].date,
            time: appointmetToCancel[0].time,
        };
        try {
            const response = await axios.post(
                "http://localhost:3000/mails/cancelappointment",
                dataToSend
            );
            if (response.status === 200) {
                toast.success(`Se te ha enviado un email confirmando la cita.`);
            } else {
                throw new Error("Error en el envío del correo de cancelación.");
            }
        } catch (error) {
            throw new Error("Error en el envío del correo de cancelación.");
        }
    };
    const handleCancellBtn = async (id) => {
        MySwal.fire({
            title: "Confirmar cancelación",
            text: "¿Estás seguro de que deseas cancelar esta cita?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, cancelar",
            cancelButtonText: "No, mantener",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await fetchCancelAppointment(id);
                await sendCancelNotification(id);
            } else {
                toast.info("La cancelación ha sido abortada.");
            }
        });
    };
    const validateTime = (dateString, timeString, hoursToSubtract) => {
        const [year, month, day] = dateString
            .split("-")
            .map((num) => num.padStart(2, "0"));
        const [hours, minutes] = timeString
            .split(":")
            .map((num) => num.padStart(2, "0"));
        const dateTimeString = `${year}-${month}-${day}T${hours}:${minutes}:00`;
        const dateTime = new Date(dateTimeString);
        const validation =
            new Date() <
            dateTime.setHours(dateTime.getHours() - hoursToSubtract);
        return validation;
    };
    return (
        <>
            <div className={styles.todayDate}>
                <div className={styles.eventDay}>
                    {selectedDay ? formatDay(selectedDay) : ""}
                </div>
                <div className={styles.eventDate}>
                    {selectedDay ? formatDate(selectedDay) : ""}
                </div>
            </div>
            <div className={styles.events}>
                {appointmentsToShow.map((event) =>
                    event.noEvents ? (
                        <div key={1} className={styles.noEvents}>
                            <NoAppointments />
                        </div>
                    ) : (
                        <div key={event.id} className={styles.event}>
                            <div className={styles.eventTime}>
                                <i className="fas fa-circle active"></i>
                                <p>{event.time.slice(0, 5)} hs</p>
                            </div>
                            <p className={styles.eventTitle}>
                                {event.service.title}
                            </p>
                            <span className={styles.spanStatus}>
                                {event.status === "active" ? (
                                    <i
                                        className="fas fa-check-circle"
                                        style={{ color: "green" }}
                                    ></i>
                                ) : (
                                    <i
                                        className="fas fa-times-circle"
                                        style={{ color: "red" }}
                                    ></i>
                                )}
                            </span>
                            {event.status === "active" &&
                            validateTime(event.date, event.time, 24) ? (
                                <CustomButton
                                    text={"Cancelar"}
                                    className={styles.cancelBtn}
                                    onClick={() => handleCancellBtn(event.id)}
                                />
                            ) : null}
                        </div>
                    )
                )}
            </div>
        </>
    );
};

export default EventDetails;
