import styles from "./NavbarLinks.module.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "../../Profile/Profile";

const NavbarLinks = () => {
    const user = useSelector((state) => state.user);
    const location = useLocation();
    return (
        <div className={styles.navbarLinksContainer}>
            <input
                className={styles.menuToggle}
                type="checkbox"
                id="menuToggle"
            />
            <label className={styles.burgerLabel} htmlFor="menuToggle">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path
                        fillRule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                    />
                </svg>
            </label>
            <label className={styles.closeLabel} htmlFor="menuToggle">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
            </label>
            <div className={styles.navbarLinks}>
                <ul className={styles.navbarLeft}>
                    <li>
                        <Link to={"/"}>Inicio</Link>
                    </li>
                    <li>
                        <Link to={"/services"}>Servicios</Link>
                    </li>
                    {user.user !== null && (
                        <li>
                            <Link to={"/appointments"}>Mis Turnos</Link>
                        </li>
                    )}
                    <li>
                        <Link to={"/contact"}>Contacto</Link>
                    </li>
                </ul>
                {!user.name && (
                    <ul className={styles.navbarRight}>
                        {location.pathname !== "/register" && (
                            <li>
                                <Link to={"/register"}>Registrate</Link>
                            </li>
                        )}
                        {location.pathname !== "/login" && (
                            <li>
                                <Link to={"/login"}>Login</Link>
                            </li>
                        )}
                    </ul>
                )}
                {user.name && <Profile />}
            </div>
        </div>
    );
};

export default NavbarLinks;
