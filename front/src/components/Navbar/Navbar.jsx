import NavbarLogo from "../NavbarElements/NavbarLogo/NavbarLogo";
import NavbarLinks from "../NavbarElements/NavbarLinks/NavbarLinks";
import styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <NavbarLogo />
            <NavbarLinks />
        </div>
    );
};

export default Navbar;
