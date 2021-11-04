import React, { useState } from "react";
import Axios from "axios";

import styles from './Register.module.css';
import TextField from "../../UI/TextField/TextField";
import Button from "../../UI/Button/Button";

const Register = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState(''); 

    const sendPostRequest = async () => {
        console.log(username);
        console.log(password);
        console.log(cpassword);
        try {
            const resp = await Axios.post("http://localhost:3001/register", {
                username: username,
                password: password,
            });
            console.log(resp.data);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    return(
        <div className={styles.div}>
            <h4 style={{textAlign: 'center'}}>Register</h4>
            <form className={styles.form}>
                <TextField onChange={(event) => {setUsername(event.target.value)}} label="Username" type="input"/>
                <TextField onChange={(event) => {setPassword(event.target.value)}} label="Password" type="password"/>
                <TextField onChange={(event) => {setCPassword(event.target.value)}} label="Confirm Password" type="password"/>
                <Button onClick={sendPostRequest} blue>Register</Button>
                {/* <Button>Register</Button> */}
            </form>
        </div>
    );
}

export default Register;