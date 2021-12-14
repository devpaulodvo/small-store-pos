import React from "react";
import styles from './ViewCart.module.css';
import cart from '../../img/trolley.png';

const ViewCart = () => {
    
    return(
        <div className={`${styles.container}`}>
            <img src={cart} alt='cart' className={`${styles.cart}`}/>
        </div>
    )
}

export default ViewCart;