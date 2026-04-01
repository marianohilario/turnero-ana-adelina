import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Services.module.css";
import axios from "axios";
import { setServices } from "../../redux/serviceSlicer";
import Card from "../../components/Card/Card";
const url = import.meta.env.VITE_URL_BACK;

const Services = () => {
    const globalServices = useSelector((store) => store.services);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (Array.isArray(globalServices) && globalServices.length > 0) return;
        setLoading(true);
        axios
            .get(`${url}/services`)
            .then((response) => {
                dispatch(setServices(response.data));
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className={styles.servicesMainContainer}>
            <div className={styles.titleSection}>
                <p className={styles.eyebrow}>Tratamientos &amp; Cuidados</p>
                <h2>Nuestros Servicios</h2>
                <div className={styles.titleDivider}>
                    <span className={styles.diamond}></span>
                </div>
            </div>

            <div className={styles.cardContainer}>
                {loading && (
                    <div className={styles.loaderWrapper}>
                        <div className={styles.spinner}></div>
                        <p className={styles.loaderText}>Cargando servicios...</p>
                    </div>
                )}
                {error && !loading && (
                    <p className={styles.errorText}>
                        No se pudieron cargar los servicios. Intentá de nuevo más tarde.
                    </p>
                )}
                {Array.isArray(globalServices) &&
                    globalServices.map((service, idx) => (
                        <div
                            key={service.id}
                            className={styles.cardWrapper}
                            style={{ animationDelay: `${idx * 0.07}s` }}
                        >
                            <Card
                                index={service.id}
                                title={service.title}
                                description={service.description}
                                duration={service.duration}
                                price={service.price}
                                img={service.img}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Services;
