import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Axios from "axios";
import { useHistory, withRouter } from "react-router";
import { useSelector, useDispatch } from 'react-redux'
import { authUpdater, selectAuth } from "../../slices/userDetailsSlice";

import { LoginSchema } from "../../Schemas/Schema";
import styles from './Login.module.css';
import Header from "../Header/Header";
import { useEffect } from "react";

const Login = (props) =>{

    let history = useHistory();
    const dispatch = useDispatch();
    const selector = useSelector(selectAuth);
    
    useEffect(async()=>{
        if(selector){
            await history.push('/dashboard')
        }
    })

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return(
        <React.Fragment>
        <Header />
        <div className={styles.div}>
            <h4 style={{textAlign: 'center'}}>Welcome to Verna Store. Please Login.</h4>
            <Formik
             initialValues={{ username: '', password: ''}}
             validationSchema={LoginSchema}
             validateOnBlur={false}
             validateOnChange={false}
             onSubmit={async (values, {setSubmitting}) => {
                    setTimeout(async () => {
                        let result = await Axios.post("http://localhost:3001/login", {
                            username: username,
                            password: password
                        }, {withCredentials: true});

                        console.log(result);
                        if(!result.data){
                            window.alert("Invalid Login");
                        }
                        else{
                            localStorage.setItem("token",result.data.token)

                        let isAuth = await Axios.get("http://localhost:3001/isUserAuth", 
                            {headers: {"x-access-token": localStorage.getItem("token")}});
                        console.log(isAuth.data)
                        dispatch(authUpdater(isAuth.data))
                        history.push('/dashboard')
                        setSubmitting(false);
                        }
                    }, 100);
            }}
            >
            {({isSubmitting, errors, touched})=>(
                <Form className={styles.form}>
                    <label className={`${styles.label}`}>Username</label>
                    <Field onKeyUp={(event) => {setUsername(event.target.value)}} type="text" name="username" className={`${styles.input}`}/>
                    {
                     errors.username && touched.username ? (<div>{errors.username}</div>) : null
                    }
                    <label className={`${styles.label}`}>Password</label>
                    <Field onKeyUp={(event) => {setPassword(event.target.value)}} type="password" name="password" className={`${styles.input}`}/>
                    {
                     errors.password && touched.password ? (<div>{errors.password}</div>) : null
                    }
                    <button onSubmit={null} type="submit" disabled={isSubmitting} className={`${styles.button}`}>
                        Submit
                    </button>
                </Form>
            )}
            </Formik>
        </div>
        </React.Fragment>
    );

}

export default withRouter(Login);