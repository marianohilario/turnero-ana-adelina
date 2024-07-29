import styles from "../Calendar/Calendar.module.css";

const CalendarDays = ({ days, handleDayClick }) => {
    return (
        <div className={styles.days}>
            {days.map((day) => (
                <div
                    key={day.key}
                    className={day.className}
                    onClick={day.onClick}
                >
                    {day.date}
                </div>
            ))}
        </div>
    );
};

export default CalendarDays;
