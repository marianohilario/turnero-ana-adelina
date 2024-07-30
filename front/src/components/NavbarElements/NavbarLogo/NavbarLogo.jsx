import styles from "./NavbarLogo.module.css";
import { Link } from "react-router-dom";
const NavbarLogo = () => {
    return (
        <>
            <div className={styles.navbarLogo}>
                <Link to={"/"}>
                    <img src="./LogoAnaAdelina-removebg.png" alt="" />
                </Link>
            </div>
        </>
    );
};

export default NavbarLogo;
