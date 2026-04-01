import styles from "./Card.module.css";

const Card = ({ img, description, duration, price, index, title }) => {
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={img} alt={title} className={styles.image} />
                <span className={styles.number}>
                    {String(index).padStart(2, "0")}
                </span>
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.divider}></div>
                <p className={styles.description}>{description}</p>
                <div className={styles.meta}>
                    <span className={styles.duration}>
                        <i className="far fa-clock" />
                        {duration.slice(0, 5)} hs
                    </span>
                    <span className={styles.price}>
                        $ {price.toLocaleString("de-DE")}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Card;
