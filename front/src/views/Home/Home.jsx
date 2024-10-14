import CustomButton from "../../components/CustomButton/CustomButton";
import Social from "../../components/Social/Social";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Home = () => {
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const handleOnClic = () => {
        !user.name ? navigate("/login") : navigate("/appointments");
    };
    return (
        <section className={styles.homeContainer}>
            <div className={styles.homeInfo}>
                <img src="./AnaAdelinaText.png" alt="" />
                <h2>Belleza y Spa</h2>
                <CustomButton
                    className={styles.appointmentBtn}
                    text={"Agendar Cita"}
                    onClick={handleOnClic}
                />
            </div>
            <Social variant="home" />
        </section>
    );
};

export default Home;
