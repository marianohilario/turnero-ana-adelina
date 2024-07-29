import React, { useRef, useEffect } from "react";
import styles from "../Calendar/Calendar.module.css";
import CustomButton from "../CustomButton/CustomButton";

const AddEvent = ({
    services,
    selectedService,
    handleServiceSelectChange,
    selectedTime,
    handleTimeSelectChange,
    selectedServiceDetails,
    horariosDisponibles,
    isAddEventActive,
    handleAddEventClick,
    setIsAddEventActive,
}) => {
    const addEventWrapperRef = useRef(null);

    const handleClickOutside = (event) => {
        if (
            addEventWrapperRef.current &&
            !addEventWrapperRef.current.contains(event.target)
        ) {
            setIsAddEventActive(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
            <form action="">
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
                            {services.map((service) => (
                                <option key={service.id} value={service.id}>
                                    {service.servicio}
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
                            {horariosDisponibles.map((horario, index) => (
                                <option key={index} value={horario}>
                                    {horario}
                                </option>
                            ))}
                        </select>
                    </div>
                    {selectedService && selectedServiceDetails && (
                        <div className={styles.addEventDetail}>
                            <p>
                                <strong>Duración:</strong>{" "}
                                {selectedServiceDetails.duracion}
                            </p>
                            <p>
                                <strong>Precio:</strong>{" "}
                                {selectedServiceDetails.precio}
                            </p>
                        </div>
                    )}
                </div>
                <div className={styles.addEventFooter}>
                    <CustomButton
                        text={"Agendar"}
                        className={styles.addEventBtn}
                    />
                </div>
            </form>
        </div>
    );
};

export default AddEvent;
