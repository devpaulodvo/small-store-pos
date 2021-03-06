import React from "react";
import styles from './TextField.module.css';

const TextField = (props) => {
    return(
        <div>
            <label className={`${styles.label}`}>{props.label}</label>
            <input 
            value={props.value} 
            name={props.name} 
            className={`${styles.input} ${props.className}`} 
            type={props.type}
            onChange={props.onChange}
            onKeyDown={props.onKeyDown}
            />
        </div>
    );
}

export default TextField;