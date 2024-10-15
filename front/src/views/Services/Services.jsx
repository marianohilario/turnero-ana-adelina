import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Services.module.css";
import axios from "axios";
import { setServices } from "../../redux/serviceSlicer";
import Card from "../../components/Card/Card";
const url = import.meta.env.VITE_URL_BACK;
const Services = () => {
    const globalServices = useSelector((store) => store.services);
    const dispatch = useDispatch();
    useEffect(() => {
        !globalServices.length &&
            axios
                .get(`${url}/services`)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error(
                            "Network response was not ok " + response.statusText
                        );
                    }
                    return response.data;
                })
                .then((data) => {
                    dispatch(setServices(data));
                })
                .catch((error) => {
                    console.error(
                        "There was a problem with the axios operation:",
                        error
                    );
                });
    }, [globalServices]);
    return (
        <div className={styles.servicesMainContainer}>
            <h2>Nuestros Servicios</h2>
            <div className={styles.cardContainer}>
                {Array.isArray(globalServices) &&
                    globalServices.map((service) => (
                        <div key={service.id} className={styles.row}>
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
