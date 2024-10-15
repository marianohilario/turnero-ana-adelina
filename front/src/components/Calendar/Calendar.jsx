import { useState, useEffect } from "react";
import styles from "./Calendar.module.css";
import CalendarHeader from "../CalendarHeader/CalendarHeader";
import CalendarDays from "../CalendarDays/CalendarDays";
import EventDetails from "../EventDetails/EventDetails";
import AddEvent from "../AddEvent/AddEvent";
import { useSelector } from "react-redux";

const Calendar = () => {
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

    const userAppointments = useSelector((store) => store.userAppointments);
    const initialDay = new Date().getDate();
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedDay, setSelectedDay] = useState(new Date().getDate());
    const [selectedService, setSelectedService] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [isAddEventActive, setIsAddEventActive] = useState(false);
    const [appointmentsToShow, setAppointmentsToShow] = useState([]);

    useEffect(() => {
        handleDayEvents(selectedDay);
    }, [userAppointments, selectedDay, currentMonth, currentYear]);

    useEffect(() => {
        renderCalendar();
    }, [userAppointments, currentMonth, currentYear, selectedDay]);

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
            userAppointments.forEach((element) => {
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
        const dayEvents = userAppointments.filter((element) => {
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
    };
    useEffect(() => {
        if (
            initialDay === new Date().getDate() &&
            currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear()
        ) {
            setSelectedDay(initialDay);
            handleDayEvents(initialDay);
        } else {
            setSelectedDay(null);
        }
    }, [currentMonth]);

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
            <div className={styles.fondoImg}></div>
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
                    selectedDay={selectedDay}
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    selectedService={selectedService}
                    setSelectedService={setSelectedService}
                    handleServiceSelectChange={handleServiceSelectChange}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    handleTimeSelectChange={handleTimeSelectChange}
                    horariosDisponibles={horariosDisponibles}
                    isAddEventActive={isAddEventActive}
                    handleAddEventClick={handleAddEventClick}
                    setIsAddEventActive={setIsAddEventActive}
                />
                {new Date(currentYear, currentMonth, selectedDay) >=
                    new Date().setHours(0, 0, 0, 0) && (
                    <div
                        className={styles.addEvent}
                        onClick={handleAddEventClick}
                    >
                        <i className="fas fa-plus"></i>
                    </div>
                )}
            </div>
            <div className={styles.bottomSpacing}></div>
        </div>
    );
};

export default Calendar;
