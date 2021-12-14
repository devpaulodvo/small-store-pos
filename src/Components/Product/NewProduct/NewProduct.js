import React, { useState } from "react";
import Axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom'; 
import { AddProductSchema } from "../../../Schemas/Schema";

import styles from './NewProduct.module.css';
import ManageProductMenu from "../ManageProductMenu";

const NewProduct = () =>{
    const history = useHistory();
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');

    const addProduct = async () =>{
         let result = await  Axios.post("http://localhost:3001/api/insert", {
            productName: productName.toLowerCase(),
            price: productPrice
        },{headers: {"x-access-token": localStorage.getItem("token")}});
    }

    const cancel = () => {
        history.push('/dashboard');
    }

    return( 
        <div className={`${styles.container}`}>
            <div className={styles.center}>
                <h1 className={styles.h1}>Add Product</h1>
                <Formik
                    initialValues={{ productName: '', price: ''}}
                    validationSchema={AddProductSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        setTimeout(() => {
                            addProduct()
                             window.alert("Product Added!")
                            resetForm({values: ''});
                            setProductName('');
                            setProductPrice('');
                            setSubmitting(false);
                        }, 100);
                    }}
                >
                    {({isSubmitting, errors, touched})=>(
                    <Form>
                        <label className={styles.label}>Product Name</label>
                        <Field onKeyUp={(event) => {setProductName(event.target.value)}} type="text" name="productName" className={`${styles.input}`}/>
                        {
                        errors.productName && touched.productName ? (<div className={styles.error}>{errors.productName}</div>) : null
                        }
                         <label className={styles.label}>Product Price</label>
                        <Field onKeyUp={(event) => {setProductPrice(event.target.value)}} type="number" name="price" className={`${styles.input}`}/>
                        {
                        errors.price && touched.price ? (<div className={styles.error}>{errors.price}</div>) : null
                        }
                        <button onSubmit={null} type="submit" disabled={isSubmitting} className={`${styles.button}`}>
                            Submit
                        </button>
                        <button onClick={()=>cancel()} disabled={isSubmitting} type="submit" className={`${styles.button} ${styles.red}`}>
                            Cancel
                        </button>
                    </Form>
                    
                    )}
                    
                </Formik>
                
            </div>
        </div>
    )
}

export default NewProduct;