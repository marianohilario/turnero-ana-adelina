import { useEffect, useState } from "react";
import Social from "../../components/Social/Social";
import styles from "./Contact.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Contact = () => {
    const navigate = useNavigate();

    const [dataForm, setDataForm] = useState({
        name: "",
        email: "",
        concern: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const { name, email, concern } = dataForm;
        if (!name.trim() || !email.trim() || !concern.trim()) {
            toast.warning("Debes completar todos los campos para continuar.");
        } else {
            setIsLoading(true);
            try {
                const response = await axios.post(
                    "https://turnero-ana-adelina.onrender.com/mails",
                    dataForm
                );
                if (response.status === 200) {
                    toast.success(`Tu consulta ha sido enviada con éxito.`);
                    setDataForm({
                        name: "",
                        email: "",
                        concern: "",
                    });
                    navigate("/");
                } else {
                    toast.error("Error en el login.");
                }
            } catch (error) {
                toast.error("Error en el login.");
            } finally {
                setIsLoading(false);
            }
        }
    };
    return (
        <section className={styles.contactContainer}>
            <div className={styles.contactInfo}>
                <img src="./AnaAdelinaText.png" alt="" />
                <h2>Belleza y Spa</h2>
            </div>
            <div className={styles.formContainer}>
                {isLoading && <div className={styles.loader}></div>}
                <form
                    action=""
                    className={styles.contactForm}
                    onSubmit={handleOnSubmit}
                >
                    <label htmlFor="name">
                        Nombre
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleInputChange}
                        />
                    </label>
                    <label htmlFor="email">
                        Email
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleInputChange}
                        />
                    </label>
                    <label htmlFor="concern">Consulta</label>
                    <textarea
                        name="concern"
                        id="concern"
                        cols="30"
                        rows="10"
                        onChange={handleInputChange}
                    ></textarea>
                    <button>Enviar</button>
                </form>
            </div>
            <Social variant="contact" />
        </section>
    );
};

export default Contact;
