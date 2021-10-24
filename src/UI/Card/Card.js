import React from "react";
import styles from './Card.module.css';

const Card = ({className, children, header}) => {
    return(
        <div className={`${styles['card']} ${header ? styles.red:styles.default} ${className}`}>
            {children}
        </div>
    );
}

export default Card;