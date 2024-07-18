import CustomButton from "../../components/CustomButton/CustomButton";
import Social from "../../components/Social/Social";
import styles from "./Home.module.css";
const Home = () => {
    return (
        <section className={styles.homeContainer}>
            <div className={styles.homeInfo}>
                <img src="./AnaAdelinaText.png" alt="" />
                <h2>Belleza y Spa</h2>
                <CustomButton
                    className={styles.appointmentBtn}
                    text={"Agendar Cita"}
                />
                {/* <a className={styles.appointmentBtn} href="#">
                    Agendar cita
                </a> */}
            </div>
            <Social />
        </section>
    );
};

export default Home;
