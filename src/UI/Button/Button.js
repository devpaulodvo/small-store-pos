import React from "react";
import styles from './Button.module.css';

const Button = ({type, onClick, children, blue}) =>{
    return(
        <button 
        className={`${styles['button']} ${blue ? styles.blue:styles.red}`} 
        type={type || 'button'} 
        onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;