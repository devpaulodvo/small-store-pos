import React from "react";
import styles from './Register.module.css';
import TextField from "../../UI/TextField/TextField";
import Button from "../../UI/Button/Button";

const Register = (props) => {
    return(
        <div className={styles.div}>
            <h4 style={{textAlign: 'center'}}>Register</h4>
            <form className={styles.form}>
                <TextField label="Username" type="input"/>
                <TextField label="Password" type="password"/>
                <TextField label="Confirm Password" type="password"/>
                <Button blue>Register</Button>
                {/* <Button>Register</Button> */}
            </form>
        </div>
    );
}

export default Register;