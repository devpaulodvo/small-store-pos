import React from "react";
import TextField from "../../UI/TextField/TextField";
import Button from "../../UI/Button/Button";

import styles from './Login.module.css';


const Login = (props) =>{

    return(
        <div className={styles.div}>
            <h4 style={{textAlign: 'center'}}>Welcome to Verna Store. Please Login.</h4>
            <form className={styles.form}>
                <TextField label="Username"/>
                <TextField label="Password"/>
                <Button blue>Login</Button>
                {/* <Button>Register</Button> */}
            </form>
        </div>
    );

}

export default Login;