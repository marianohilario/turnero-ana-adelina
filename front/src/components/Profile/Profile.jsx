import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Profile.module.css";

const Profile = () => {
    const [avatarUrl, setAvatarUrl] = useState("avatar.jpg");
    const user = useSelector((store) => store.user);
    const [avatarDetailActive, setAvatarDetailActive] = useState(false);

    const handleAvatarDetails = () => {
        setAvatarDetailActive((prev) => !prev);
    };

    return (
        <div className={styles.profileContainer}>
            <img
                src={avatarUrl}
                alt="Avatar"
                className={styles.profileImg}
                onClick={handleAvatarDetails}
            />
            <div
                className={`${styles.profileDetail} ${
                    avatarDetailActive ? styles.active : ""
                }`}
            >
                <h3>{user.name.split(" ")[0]}</h3>
                <div className={styles.changeAvatar}>
                    <button>Actualizar</button>
                    <div className={styles.avatarSelect}>
                        <input type="file" className={styles.inputSelect} />
                        <i className="fas fa-camera" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
