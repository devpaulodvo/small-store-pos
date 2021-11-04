import React, { useState } from "react";
import Axios from "axios";

import TextField from "../../UI/TextField/TextField";
import Button from "../../UI/Button/Button";
import styles from './Login.module.css';


const Login = (props) =>{

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const sendGetRequest = async () =>{
        console.log(username);
        console.log(password);
        try {
            const resp = await Axios.post("http://localhost:3001/login", {
                username: username,
                password: password
            });
            console.log(resp.data);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    return(
        <div className={styles.div}>
            <h4 style={{textAlign: 'center'}}>Welcome to Verna Store. Please Login.</h4>
            <form className={styles.form}>
                <TextField onChange={(event) => {setUsername(event.target.value)}} label="Username" type="input"/>
                <TextField onChange={(event) => {setPassword(event.target.value)}} label="Password" type="password"/>
                <Button onClick={sendGetRequest} blue>Login</Button>
                {/* <Button>Register</Button> */}
            </form>
        </div>
    );

}

export default Login;