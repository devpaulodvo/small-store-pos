import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Axios from "axios";
import * as Yup from 'yup';


import styles from './Register.module.css';
import Header from "../Header/Header";

const Register = (props) => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [lastname, setLastname] = useState('');
    const [cpassword1, setCPassword] = useState('');

    let registerSchema = Yup.object().shape({
        username: Yup.string().min(5, "Username must be 5 characters long").required('Required Username')
        .test("is_exists", "Not Available", (value)=>{
            return new Promise((resolve, reject)=>{
               setTimeout(async()=>{
                try{
                    let result = await Axios.post("http://localhost:3001/checkusername", {
                        username: username,
                        password: password
                    }, {headers: {'Content-Type': 'application/json'}})
                   if(value === result.data.username){
                        resolve(false)
                    }else{
                        resolve(true)
                    }
                }catch(err){
                    console.log(err);
                }
               }, 500)
               
            })
        })
        ,
        password: Yup.string().min(6, "Must be 6 or more characters").required('Required Password'),
        cpassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required Confirm Password'),
        firstname: Yup.string().required('Required Firstname'),
        middlename: Yup.string().required('Required Middlename'),
        lastname: Yup.string().required('Required Lastname')
    });

    const sendPostRequest = async () => {
        try{
        let result = await Axios.post("http://localhost:3001/register", {
        username: username,
        password: password,
        fn: firstname,
        mn: middlename,
        ln: lastname,
        }, {
            headers: {'Content-Type': 'application/json'}
        });
        }catch(err){
            console.log(err);
        }
    };

    return(
        <React.Fragment>
        <Header/>
        <div className={styles.div}>
            <h4 style={{textAlign: 'center'}}>Register</h4>
            <Formik
                initialValues={{ username: '', password: '', cpassword:'', firstname: '', middlename: '', lastname:'' }}
                validationSchema={registerSchema}
                onSubmit={async (values, {setSubmitting, resetForm }) => {
                        setTimeout(() => {
                            sendPostRequest()
                            window.alert("Client Registered")
                            resetForm({values: ''});
                            setPassword('');
                            setUsername('');
                            setFirstname('');
                            setMiddlename('');
                            setLastname('');
                            setSubmitting(false);
                        }, 100);
                }}
                >
                {({ isSubmitting, errors, touched, status }) => (
                    <Form className={styles.form}>
                        <label className={`${styles.label}`}>Firstname</label>
                        <Field  
                            onKeyUp={(event) => {
                                setFirstname(event.target.value)
                            }} 
                            type="text" 
                            name="firstname" 
                            className={`${styles.input}`}
                        />
                        {
                        errors.firstname && touched.firstname ? (<div>{errors.firstname}</div>) : null
                        }
                        <label className={`${styles.label}`}>Middlename</label>
                        <Field  
                            onKeyUp={(event) => {
                                setMiddlename(event.target.value)
                            }} 
                            type="text" 
                            name="middlename" 
                            className={`${styles.input}`}
                        />
                        {
                        errors.middlename && touched.middlename ? (<div>{errors.middlename}</div>) : null
                        }
                        <label className={`${styles.label}`}>Lastname</label>
                        <Field  
                            onKeyUp={(event) => {
                                setLastname(event.target.value)
                            }} 
                            type="text" 
                            name="lastname" 
                            className={`${styles.input}`}
                        />
                        {
                        errors.lastname && touched.lastname ? (<div>{errors.lastname}</div>) : null
                        }
                        <label className={`${styles.label}`}>Username</label>
                        <Field  
                            onKeyUp={(event) => {
                                setUsername(event.target.value)
                            }} 
                            type="text" 
                            name="username" 
                            className={`${styles.input}`}
                        />
                        {
                        errors.username && touched.username ? (<div>{errors.username}</div>) : null
                        }
                        <label className={`${styles.label}`}>Password</label>
                        <Field 
                            onKeyUp={(event) => {setPassword(event.target.value)}} 
                            type="password" 
                            name="password" 
                            className={`${styles.input}`}/>
                        {
                        errors.password && touched.password ? (<div>{errors.password}</div>) : null
                        }
                        <label className={`${styles.label}`}>Confirm Password</label>
                        <Field 
                            onKeyUp={(event) => {setCPassword(event.target.value)}} 
                            type="password" 
                            name="cpassword" 
                            className={`${styles.input}`}/>
                        {
                        errors.cpassword && touched.cpassword ? (<div>{errors.cpassword}</div>) : null
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

export default Register;