import { useState, useEffect } from "react";
import styles from "./Calendar.module.css";
import serviciosBelleza from "../../helpers/services";
import CalendarHeader from "../CalendarHeader/CalendarHeader";
import CalendarDays from "../CalendarDays/CalendarDays";
import EventDetails from "../EventDetails/EventDetails";
import AddEvent from "../AddEvent/AddEvent";

const Calendar = ({ appointments }) => {
    const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    const daysOfWeek = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
    ];

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedDay, setSelectedDay] = useState(new Date().getDate());
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [isAddEventActive, setIsAddEventActive] = useState(false);
    const [appointmentsToShow, setAppointmentsToShow] = useState([]);

    useEffect(() => {
        handleDayEvents(selectedDay);
    }, []);
    useEffect(() => {
        setServices(serviciosBelleza);
    }, []);

    useEffect(() => {
        renderCalendar();
    }, [currentMonth, currentYear, selectedDay]);

    const renderCalendar = () => {
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const lastDayDate = new Date(
            currentYear,
            currentMonth + 1,
            0
        ).getDate();
        const prevLastDayDate = new Date(
            currentYear,
            currentMonth,
            0
        ).getDate();
        const lastDayIndex = new Date(
            currentYear,
            currentMonth + 1,
            0
        ).getDay();
        const nextDays = 7 - lastDayIndex - 1;

        let days = [];

        // Previous month days
        for (let x = firstDay; x > 0; x--) {
            days.push({
                key: `prev-${x}`,
                className: `${styles.day} ${styles.prev}`,
                date: prevLastDayDate - x + 1,
                onClick: null,
            });
        }

        // Current month days
        for (let i = 1; i <= lastDayDate; i++) {
            let event = false;
            appointments.forEach((element) => {
                const [year, month, date] = element.date.split("-").map(Number);
                if (
                    date === i &&
                    month === currentMonth + 1 &&
                    year === currentYear
                ) {
                    event = true;
                }
            });

            const isToday =
                selectedDay === null
                    ? i === new Date().getDate() &&
                      currentMonth === new Date().getMonth() &&
                      currentYear === new Date().getFullYear()
                    : false;
            const isSelected = selectedDay === i;

            days.push({
                key: `curr-${i}`,
                className: `${styles.day} ${
                    isToday || isSelected ? styles.selected : ""
                } ${event ? styles.event : ""}`,
                date: i,
                onClick: () => handleDayClick(i),
            });
        }

        // Next month days
        for (let j = 1; j <= nextDays; j++) {
            days.push({
                key: `next-${j}`,
                className: `${styles.day} ${styles.next}`,
                date: j,
                onClick: null,
            });
        }

        return days;
    };

    const handleTimeSelectChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const handleServiceSelectChange = (event) => {
        setSelectedService(event.target.value);
    };

    const handleDayEvents = (day) => {
        const dayEvents = appointments.filter((element) => {
            const [year, month, date] = element.date.split("-").map(Number);
            return (
                date === day &&
                month === currentMonth + 1 &&
                year === currentYear
            );
        });
        if (dayEvents.length > 0) {
            setAppointmentsToShow(dayEvents);
        } else {
            setAppointmentsToShow([{ noEvents: true }]);
        }
    };
    const handleDayClick = (day) => {
        setSelectedDay(day);
        handleDayEvents(day);
    };

    const handlePrevBtn = () => {
        setCurrentMonth((currentMonth) => {
            if (currentMonth === 0) {
                setCurrentYear(currentYear - 1);
                return 11;
            }
            return currentMonth - 1;
        });
        setSelectedDay(null);
    };

    const handleNextBtn = () => {
        setCurrentMonth((currentMonth) => {
            if (currentMonth === 11) {
                setCurrentYear(currentYear + 1);
                return 0;
            }
            return currentMonth + 1;
        });
        setSelectedDay(null);
    };

    const handleTodayBtn = () => {
        setCurrentMonth(new Date().getMonth());
        setCurrentYear(new Date().getFullYear());
        setSelectedDay(new Date().getDate());
    };

    const formatDay = (day) => {
        const date = new Date(currentYear, currentMonth, day);
        const dayOfWeek = daysOfWeek[date.getDay()];
        return dayOfWeek;
    };

    const formatDate = (day) => {
        const date = new Date(currentYear, currentMonth, day);
        const month = months[date.getMonth()];
        return `${day} de ${month}`;
    };

    const selectedServiceDetails = services.find(
        (service) => service.id === parseInt(selectedService)
    );

    const generarHorarios = (inicio, fin, intervalo) => {
        const horarios = [];
        let horaActual = inicio;

        while (horaActual < fin) {
            const horas = Math.floor(horaActual / 60);
            const minutos = horaActual % 60;
            const formatoHoras = horas.toString().padStart(2, "0");
            const formatoMinutos = minutos.toString().padStart(2, "0");
            horarios.push(`${formatoHoras}:${formatoMinutos}`);
            horaActual += intervalo;
        }

        return horarios;
    };

    const horariosDisponibles = generarHorarios(9 * 60, 18 * 60, 30);

    const handleAddEventClick = (event) => {
        event.stopPropagation();
        setIsAddEventActive((prev) => !prev);
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.calendarContainer}>
                    <CalendarHeader
                        currentMonth={currentMonth}
                        currentYear={currentYear}
                        months={months}
                        handlePrevBtn={handlePrevBtn}
                        handleNextBtn={handleNextBtn}
                        handleTodayBtn={handleTodayBtn}
                    />
                    <CalendarDays
                        days={renderCalendar()}
                        handleDayClick={handleDayClick}
                    />
                </div>
            </div>
            <div className={styles.right}>
                <EventDetails
                    selectedDay={selectedDay}
                    formatDay={formatDay}
                    formatDate={formatDate}
                    handleAddEventClick={handleAddEventClick}
                    appointmentsToShow={appointmentsToShow}
                />
                <AddEvent
                    services={services}
                    selectedService={selectedService}
                    handleServiceSelectChange={handleServiceSelectChange}
                    selectedTime={selectedTime}
                    handleTimeSelectChange={handleTimeSelectChange}
                    selectedServiceDetails={selectedServiceDetails}
                    horariosDisponibles={horariosDisponibles}
                    isAddEventActive={isAddEventActive}
                    handleAddEventClick={handleAddEventClick}
                    setIsAddEventActive={setIsAddEventActive}
                />
                <div className={styles.addEvent} onClick={handleAddEventClick}>
                    <i className="fas fa-plus"></i>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
