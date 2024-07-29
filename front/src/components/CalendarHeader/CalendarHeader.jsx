import styles from "../Calendar/Calendar.module.css";

const CalendarHeader = ({
    currentMonth,
    currentYear,
    months,
    handlePrevBtn,
    handleNextBtn,
    handleTodayBtn,
}) => {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.header}>
                <div
                    className={styles.month}
                >{`${months[currentMonth]} ${currentYear}`}</div>
                <div className={styles.btns}>
                    {currentMonth !== new Date().getMonth() ||
                    currentYear !== new Date().getFullYear() ? (
                        <div
                            className={styles["today-btn"]}
                            onClick={handleTodayBtn}
                        >
                            <i className="fas fa-calendar-day"></i>
                        </div>
                    ) : null}
                    <div className={styles["prev-btn"]} onClick={handlePrevBtn}>
                        <i className="fas fa-chevron-left"></i>
                    </div>
                    <div className={styles["next-btn"]} onClick={handleNextBtn}>
                        <i className="fas fa-chevron-right"></i>
                    </div>
                </div>
            </div>
            <div className={styles.weekDays}>
                <div>Dom</div>
                <div>Lun</div>
                <div>Mar</div>
                <div>Mie</div>
                <div>Jue</div>
                <div>Vie</div>
                <div>Sab</div>
            </div>
        </div>
    );
};

export default CalendarHeader;
