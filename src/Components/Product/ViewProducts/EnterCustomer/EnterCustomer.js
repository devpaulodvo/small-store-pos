import React, { useState } from "react";
import styles from './EnterCustomer.module.css';
import Axios from "axios";

import TextField from '../../../../UI/TextField/TextField';

const EnterCustomer = ({userIdGetter}) => {

    const enterCustomer = (event) => {
        userIdGetter(event)
    }

    return(
        <div className={`${styles.container}`}>
            <h1 className={`${styles.h1}`}>Enter Customer ID</h1>
            <TextField onKeyDown={(e)=>{
                if(e.code == "Enter"){
                    enterCustomer(e.target.value);
                }
            }}/>
        </div>
    )
}

export default EnterCustomer;