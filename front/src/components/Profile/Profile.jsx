import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlicer";
import { setUserAppointments } from "../../redux/userAppointmentsSlicer";
import styles from "./Profile.module.css";

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const storageKey = `avatar_${user.id}`;

    const [avatarUrl, setAvatarUrl] = useState(
        () => localStorage.getItem(storageKey) || "./avatar.jpg"
    );
    const [panelOpen, setPanelOpen] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
            const dataUrl = evt.target.result;
            setAvatarUrl(dataUrl);
            localStorage.setItem(storageKey, dataUrl);
        };
        reader.readAsDataURL(file);
    };

    const handleLogout = () => {
        dispatch(setUser({ user: null }));
        dispatch(setUserAppointments([]));
        setPanelOpen(false);
    };

    return (
        <div className={styles.profileContainer}>
            <img
                src={avatarUrl}
                alt="Avatar"
                className={styles.profileImg}
                onClick={() => setPanelOpen((p) => !p)}
            />
            {panelOpen && (
                <div className={styles.profileDetail}>
                    <div className={styles.panelHeader}>
                        <div className={styles.avatarWrapper}>
                            <img
                                src={avatarUrl}
                                alt="Avatar"
                                className={styles.panelAvatar}
                            />
                            <button
                                className={styles.cameraBtn}
                                onClick={() => fileInputRef.current.click()}
                                title="Cambiar foto"
                            >
                                <i className="fas fa-camera" />
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                            />
                        </div>
                        <div className={styles.userInfo}>
                            <strong>{user.name}</strong>
                            <span>{user.email}</span>
                        </div>
                    </div>
                    <button className={styles.logoutBtn} onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt" /> Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;
