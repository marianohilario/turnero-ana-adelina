import styles from "../Calendar/Calendar.module.css";
import CustomButton from "../CustomButton/CustomButton";

const EventDetails = ({
    selectedDay,
    formatDay,
    formatDate,
    appointmentsToShow,
}) => {
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
                            <h3>No tiene citas agendadas</h3>
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
                            {event.status === "active" ? (
                                <CustomButton
                                    text={"Cancelar"}
                                    className={styles.cancelBtn}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    )
                )}
            </div>
        </>
    );
};

export default EventDetails;
