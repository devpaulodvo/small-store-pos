import React, {useState, useEffect} from "react";
import styles from './UpdateProduct.module.css';
import Axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom'; 
import { AddProductSchema } from "../../../Schemas/Schema";
import ProductFilter from "../ViewProducts/ProductFilter";
import { createRef } from "react";


const UpdateProduct = () => {
    const history = useHistory();
    const [searchProduct, setSearchProduct] = useState('');
    const [products, getProducts] = useState([]);
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');

    useEffect(()=>{
        myfunction()
        // Axios.get('http://localhost:3001/api/get').then((response)=>{
        //     getProducts(response.data);
        // })
        // return function cleanup() {
        //   };
    },[]);

    const myfunction = async () => {
        let result = await Axios.get('http://localhost:3001/api/get')
        getProducts(result.data);
      }

    const updateProduct = async () =>{
        //  let result = await  Axios.post("http://localhost:3001/api/insert", {
        //     productName: productName, 
        //     price: productPrice
        // })
    }

    const cancel = () => {
        history.push('/dashboard');
    }

    const filteredProductArray = products.filter(product => product.productName.includes(searchProduct.toLowerCase()));

    const filteredProduct = (event) => {
        setSearchProduct(event.target.value);

        if(filteredProductArray.length === 0){
            setProductName('');
            setProductPrice('');
        }else{
            setProductName(filteredProductArray[0].productName.charAt(0).toUpperCase()+filteredProductArray[0].productName.slice(1));
            setProductPrice(filteredProductArray[0].price);
            setProductId(filteredProductArray[0].productId);
        }
    }

    return(
        <div className={`${styles.container}`}> 
            <ProductFilter filteredProduct={filteredProduct}/>
            <div className={styles.center}>
                <h1 className={styles.h1}>Update Product</h1>
                <Formik
                    initialValues={{ productName: '', price: ''}}
                    validationSchema={AddProductSchema}
                    validateOnBlur={false}
                    validateOnMount={false}
                    validateOnChange={false}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        setTimeout(() => {
                            updateProduct()
                             window.alert("Product Updated!")
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
                        <Field 
                        onKeyUp={(event) => {setProductName(event.target.value.toLowerCase())}} 
                        readOnly
                        name="productName"
                        id="productname"
                        value={productName}
                        className={`${styles.input}`}/>
                        {
                        errors.productName && touched.productName ? (<div className={styles.error}>{errors.productName}</div>) : null
                        }
                         <label className={styles.label}>Product Price</label>
                        <Field 
                        onKeyUp={(event) => {setProductPrice(event.target.value)}} 
                        readOnly
                        type="number" 
                        name="price" 
                        id="price"
                        value={productPrice}
                        className={`${styles.input}`}/>
                        {
                        errors.price && touched.price ? (<div className={styles.error}>{errors.price}</div>) : null
                        }
                        <button onSubmit={null} type="submit" disabled={isSubmitting} className={`${styles.button}`}>
                            Update
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

export default UpdateProduct;