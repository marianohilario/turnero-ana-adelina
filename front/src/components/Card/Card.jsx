import styles from "./Card.module.css";
const Card = ({ img, description, duration, price, index, title }) => {
    return (
        <div
            className={`${styles.card} ${
                index % 2 === 0 ? styles.cardReversed : ""
            }`}
        >
            <div className={styles.left}>
                <img src={img} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className={styles.rigth}>
                <div className={styles.body}>
                    <h3 className={styles.title}>{title}</h3>
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
