import { useRef, useEffect, useState } from "react";
import styles from "../Calendar/Calendar.module.css";
import CustomButton from "../CustomButton/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { serviceSlice, setServices } from "../../redux/serviceSlicer";
import axios from "axios";
import { toast } from "react-toastify";
import { addAppointment } from "../../redux/userAppointmentsSlicer";

const AddEvent = ({
    selectedDay,
    currentMonth,
    currentYear,
    selectedService,
    setSelectedService,
    handleServiceSelectChange,
    selectedTime,
    setSelectedTime,
    handleTimeSelectChange,
    horariosDisponibles,
    isAddEventActive,
    handleAddEventClick,
    setIsAddEventActive,
}) => {
    const dispatch = useDispatch();
    const globalServices = useSelector((store) => store.services);
    const user = useSelector((store) => store.user);

    const [appointmentData, setAppointmentData] = useState({
        date: `${currentYear}-${currentMonth + 1}-${selectedDay}`,
        time: selectedTime,
        UserId: user.id,
        serviceId: selectedService,
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setAppointmentData({
            date: `${currentYear}-${currentMonth + 1}-${selectedDay}`,
            time: selectedTime,
            UserId: user.id,
            serviceId: selectedService,
        });
    }, [selectedDay, currentMonth, currentYear, selectedService, selectedTime]);

    useEffect(() => {
        !globalServices.length &&
            axios
                .get(`https://turnero-ana-adelina.onrender.com/services`)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error(
                            "Network response was not ok " + response.statusText
                        );
                    }
                    return response.data;
                })
                .then((data) => {
                    dispatch(setServices(data));
                })
                .catch((error) => {
                    error.response.data.message !== "No services to show" &&
                        console.error(
                            "There was a problem with the axios operation:",
                            error
                        );
                });
    }, []);

    const addEventWrapperRef = useRef(null);

    const handleClickOutside = (event) => {
        if (
            addEventWrapperRef.current &&
            !addEventWrapperRef.current.contains(event.target)
        ) {
            setIsAddEventActive(false);
            setSelectedService("");
            setSelectedTime("");
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    let selectedServiceDetails;
    if (selectedService) {
        selectedServiceDetails = globalServices.find(
            (service) => service.id === parseInt(selectedService)
        );
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        if (!selectedService || !selectedTime) {
            toast.warning(
                "Debes seleccionar un servicio y horario para continuar."
            );
            return;
        }

        try {
            setIsLoading(true);
            await scheduleAppointment();
            await sendEmailNotification();
            setIsAddEventActive(false);
            setSelectedService("");
            setSelectedTime("");
        } catch (error) {
            toast.error("Error al procesar la solicitud. Intentar nuevamente.");
        }
    };

    const scheduleAppointment = async () => {
        try {
            const response = await axios.post(
                `https://turnero-ana-adelina.onrender.com/schedule`,
                appointmentData
            );

            if (response.status !== 201) {
                throw new Error(
                    "Network response was not ok " + response.statusText
                );
            } else {
                dispatch(addAppointment(response.data));
                toast.success("Cita creada exitosamente.");
            }
        } catch (error) {
            console.error(
                "There was a problem with the axios operation:",
                error
            );
            throw new Error("Error al crear la cita.");
        }
    };

    const sendEmailNotification = async () => {
        const dataToSend = {
            name: String(user.name).split(" ")[0],
            email: user.email,
            service: selectedServiceDetails.title,
            date: appointmentData.date,
            time: appointmentData.time,
        };
        try {
            const response = await axios.post(
                "https://turnero-ana-adelina.onrender.com/mails/confirmappointment",
                dataToSend
            );
            if (response.status === 200) {
                toast.success(`Se te ha enviado un email confirmando la cita.`);
            } else {
                throw new Error("Error en el envío del correo.");
            }
        } catch (error) {
            throw new Error("Error en el envío del correo.");
        } finally {
            setIsLoading(false);
        }
    };

    const convertToMinutes = (timeString) => {
        const [hours, minutes] = timeString.split(":").map(Number);
        return hours * 60 + minutes;
    };

    const getCurrentTimeInMinutes = () => {
        const now = new Date();
        return convertToMinutes(now.toTimeString().slice(0, 5));
    };

    const currentTimeInMinutes = getCurrentTimeInMinutes();

    const isTimeInPast = (timeString, dateString) => {
        const [hours, minutes] = timeString.split(":").map(Number);
        const timeInMinutes = hours * 60 + minutes;
        const now = new Date();
        const selectedDate = new Date(dateString);
        const selectedTimeInMinutes = timeInMinutes;
        if (selectedDate.toDateString() === now.toDateString()) {
            return selectedTimeInMinutes < currentTimeInMinutes;
        }
        return selectedDate < now;
    };

    return (
        <div
            className={`${styles.addEventWrapper} ${
                isAddEventActive ? styles.active : ""
            }`}
            ref={addEventWrapperRef}
        >
            <div className={styles.addEventHeader}>
                <div className={styles.title}>Agendar Cita</div>
                <i
                    className={`fas fa-times ${styles.close}`}
                    onClick={handleAddEventClick}
                ></i>
            </div>
            <form action="" onSubmit={handleOnSubmit}>
                {isLoading && <div className={styles.loader}></div>}
                <div className={styles.addEventBody}>
                    <div className={styles.addEventService}>
                        <label htmlFor="servicios" className={styles.formLabel}>
                            Seleccione un servicio:
                        </label>
                        <select
                            className={styles.formSelect}
                            id="servicios"
                            value={selectedService}
                            onChange={handleServiceSelectChange}
                        >
                            <option value="" disabled>
                                Seleccionar
                            </option>
                            {Array.isArray(globalServices) &&
                                globalServices.map((service) => (
                                    <option key={service.id} value={service.id}>
                                        {service.title}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className={styles.addEventTime}>
                        <label htmlFor="horarios">Seleccione un horario:</label>
                        <select
                            id="horarios"
                            value={selectedTime}
                            onChange={handleTimeSelectChange}
                        >
                            <option value="" disabled>
                                Seleccionar
                            </option>
                            {horariosDisponibles.map((horario, index) => {
                                const isDisabled = isTimeInPast(
                                    horario,
                                    `${currentYear}-${
                                        currentMonth + 1
                                    }-${selectedDay}`
                                );

                                return (
                                    <option
                                        key={index}
                                        value={horario}
                                        disabled={isDisabled}
                                    >
                                        {horario}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    {selectedService && selectedServiceDetails && (
                        <div className={styles.addEventDetail}>
                            <p>
                                <strong>Duración:</strong>{" "}
                                {selectedServiceDetails.duration.slice(0, 5) +
                                    " hs"}
                            </p>
                            <p>
                                <strong>Precio:</strong>{" "}
                                {"$" +
                                    new Intl.NumberFormat("de-DE").format(
                                        selectedServiceDetails.price
                                    )}
                            </p>
                        </div>
                    )}
                </div>
                <div className={styles.addEventFooter}>
                    <CustomButton
                        text={"Agendar"}
                        className={styles.addEventBtn}
                        disabled={
                            !selectedService || !selectedTime ? true : false
                        }
                    />
                </div>
            </form>
        </div>
    );
};

export default AddEvent;
