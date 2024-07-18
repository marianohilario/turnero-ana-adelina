import styles from "./NavbarLinks.module.css";

const NavbarLinks = () => {
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

            <ul className={styles.navbarLinks}>
                <li>
                    <a href="#">Inicio</a>
                </li>
                <li>
                    <a href="#">Sobre Mi</a>
                </li>
                <li>
                    <a href="#">Servicios</a>
                </li>
                <li>
                    <a href="#">Agendar Cita</a>
                </li>
                <li>
                    <a href="#">Fotos</a>
                </li>
                <li>
                    <a href="#">Contacto</a>
                </li>
            </ul>
        </div>
    );
};

export default NavbarLinks;
