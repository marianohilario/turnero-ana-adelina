import styles from "./Card.module.css";
const Card = ({ img, description, duration, price }) => {
    return (
        <div className={styles.card}>
            <div className={styles.left}>
                <img src={img} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className={styles.rigth}>
                <div className={styles.body}>
                    <p className={styles.description}>{description}</p>
                    <div className={styles.details}>
                        <p className={styles.duration}>
                            Duración: {duration.slice(0, 5)} hs
                        </p>
                        <p className={styles.price}>
                            Precio: $ {price.toLocaleString("de-DE")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
