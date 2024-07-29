import styles from "./Login.module.css";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useEffect, useState } from "react";
import { validation } from "../../helpers/registerFormValidation";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
    const [userData, setUserData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData.username === "" || userData.password === "") {
            Swal.fire({
                icon: "warning",
                title: "Existen errores en la carga de datos",
                text: "Por favor, completar username y contraseña.",
            });
        } else {
            try {
                const response = await axios.post(
                    "http://localhost:3000/users/login",
                    userData
                );
                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Usuario Logueado con éxito!",
                        text: "El usuario ha sido logueado correctamente.",
                    });
                    setUserData({
                        username: "",
                        password: "",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error en el login",
                        text: `${response.statusText}`,
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error en el login",
                    text: `${error.response.data.message}`,
                });
            }
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginLayout}>
                <div>
                    <img
                        src="./LogoAnaAdelina-removebg.png"
                        alt="Logo Ana Adelina"
                        className={styles.logo}
                    />
                </div>
                <div className={styles.loginFormContainer}>
                    <h2>Login</h2>
                    <form
                        action=""
                        className={styles.loginForm}
                        onSubmit={handleSubmit}
                    >
                        <CustomInput
                            type={"text"}
                            label={"Username"}
                            className={styles.input}
                            name={"username"}
                            iconClassName={"far fa-user"}
                            loading={"loading"}
                            onChange={handleChange}
                        />

                        <CustomInput
                            type={"password"}
                            label={"Contraseña"}
                            className={styles.input}
                            name={"password"}
                            iconClassName={"fas fa-lock"}
                            loading={"loading"}
                            onChange={handleChange}
                        />

                        <CustomButton
                            text={"Login"}
                            className={styles.loginBtn}
                            disabled={
                                userData.username === "" ||
                                userData.password === ""
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

export default Login;
