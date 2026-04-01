import styles from "./Login.module.css";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlicer";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_URL_BACK;
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        username: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userData.username === "" || userData.password === "") {
            toast.warning("Debes completar todos los campos para continuar.");
        } else {
            setIsLoading(true);
            try {
                const response = await axios.post(
                    `${url}/users/login`,
                    userData
                );
                if (response.status === 200) {
                    dispatch(setUser(response.data.user));
                    toast.success(
                        `${
                            response.data.user.name.split(" ")[0]
                        } te has logueado con éxito.`
                    );
                    setUserData({
                        username: "",
                        password: "",
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
                            text={isLoading ? "Ingresando..." : "Login"}
                            className={styles.loginBtn}
                            disabled={
                                isLoading ||
                                userData.username === "" ||
                                userData.password === ""
                            }
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
