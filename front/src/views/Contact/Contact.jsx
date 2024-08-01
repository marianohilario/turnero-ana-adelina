import CustomButton from "../../components/CustomButton/CustomButton";
import Social from "../../components/Social/Social";
import styles from "./Contact.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Contact = () => {
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const handleOnClic = () => {
        !user.name ? navigate("/login") : navigate("/appointments");
    };
    return (
        <section className={styles.contactContainer}>
            <div className={styles.contactInfo}>
                <img src="./AnaAdelinaText.png" alt="" />
                <h2>Belleza y Spa</h2>
            </div>
            <form action="" className={styles.contactForm}>
                <label htmlFor="">
                    Nombre
                    <input type="text" />
                </label>
                <label htmlFor="">
                    Email
                    <input type="email" />
                </label>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </form>
            <Social />
        </section>
    );
};

export default Contact;
