import styles from "./Register.module.css";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useEffect, useState } from "react";
import { validation } from "../../helpers/registerFormValidation";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
    const [userData, setUserData] = useState({
        name: "",
        username: "",
        email: "",
        nDni: "",
        birthdate: "",
        phone: "",
        password: "",
        password2: "",
    });

    const [errors, setErrors] = useState({});
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState({
        username: false,
        nDni: false,
        email: false,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/users/profiles"
                );
                if (response.status !== 200) {
                    throw new Error(
                        "Network response was not ok " + response.statusText
                    );
                }
                setUsers(response.data);
            } catch (error) {
                console.error(
                    "There was a problem with the axios operation:",
                    error
                );
            }
        };

        fetchUsers();
    }, []);

    const validateField = async (name, value) => {
        setLoading((prev) => ({ ...prev, [name]: true }));
        try {
            const fieldErrors = validation(name, value, userData, users);
            setErrors((prevErrors) => ({ ...prevErrors, ...fieldErrors }));
        } finally {
            setLoading((prev) => ({ ...prev, [name]: false }));
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]:
                name === "nDni"
                    ? Number(value.replace(/\D/g, ""))
                    : value.trim(),
        }));

        if (name in errors) {
            validateField(name, value);
        }
    };

    const handleBlur = (e, hasChanged) => {
        const { name, value } = e.target;

        if (hasChanged || name in errors) {
            validateField(name, value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const values = Object.values(errors);
        if (values.every((value) => value === undefined)) {
            try {
                const dataToSend = { ...userData };
                delete dataToSend.password2;
                const response = await axios.post(
                    "http://localhost:3000/users/register",
                    dataToSend
                );
                if (response.status === 201) {
                    toast.success(`Usuario registrado con éxito.`);
                    setUserData({
                        name: "",
                        username: "",
                        email: "",
                        nDni: "",
                        birthdate: "",
                        phone: "",
                        password: "",
                        password2: "",
                    });
                    setErrors({});
                    navigate("/login");
                } else {
                    toast.error("Error al registrarse.");
                }
            } catch (error) {
                toast.error("Error al registrarse.");
            }
        } else {
            toast.warning(
                "Existen errores en la carga de datos. Por favor, revisa los errores en el formulario."
            );
        }
    };

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerLayout}>
                <div>
                    <img
                        src="./LogoAnaAdelina-removebg.png"
                        alt="Logo Ana Adelina"
                        className={styles.logo}
                    />
                </div>
                <div className={styles.registerFormContainer}>
                    <h2>Registrate</h2>
                    <form
                        action=""
                        className={styles.registerForm}
                        onSubmit={handleSubmit}
                    >
                        <CustomInput
                            type={"text"}
                            label={"Nombre y Apellido"}
                            className={styles.input}
                            name={"name"}
                            iconClassName={"far fa-user"}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            error={errors.name}
                        />

                        <CustomInput
                            type={"text"}
                            label={"Username"}
                            className={styles.input}
                            name={"username"}
                            iconClassName={"far fa-user"}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            error={errors.username}
                            loading={loading.username}
                        />

                        <CustomInput
                            type={"email"}
                            label={"Correo electrónico"}
                            className={styles.input}
                            name={"email"}
                            iconClassName={"far fa-envelope"}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            error={errors.email}
                            loading={loading.email}
                        />

                        <CustomInput
                            type={"text"}
                            label={"DNI"}
                            className={styles.input}
                            name={"nDni"}
                            iconClassName={"far fa-address-card"}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            error={errors.nDni}
                            loading={loading.nDni}
                        />

                        <CustomInput
                            type={"date"}
                            label={"Fecha de Nacimiento"}
                            className={styles.input}
                            name={"birthdate"}
                            iconClassName={"far fa-calendar-alt"}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            error={errors.birthdate}
                        />

                        <CustomInput
                            type={"text"}
                            label={"Número de teléfono"}
                            className={styles.input}
                            name={"phone"}
                            iconClassName={"fas fa-phone"}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            error={errors.phone}
                        />

                        <CustomInput
                            type={"password"}
                            label={"Contraseña"}
                            className={styles.input}
                            name={"password"}
                            iconClassName={"fas fa-lock"}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            error={errors.password}
                        />

                        <CustomInput
                            type={"password"}
                            label={"Repita la Contraseña"}
                            className={styles.input}
                            name={"password2"}
                            iconClassName={"fas fa-lock"}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            error={errors.password2}
                        />

                        <div></div>
                        <CustomButton
                            text={"Registrarse"}
                            className={styles.registerBtn}
                            disabled={
                                Object.values(userData).some(
                                    (value) => value === ""
                                )
                                    ? true
                                    : false
                            }
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
