import React, {useState, useEffect} from "react";
import styles from './UpdateProduct.module.css';
import Axios from "axios";
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
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
    const addProductSchema = AddProductSchema;
    const filteredProductArray = products.filter(product => product.productName.includes(searchProduct.toLowerCase()));

    

    useEffect(()=>{
        myfunction()
    },[]);

    const myfunction = async () => {
        let result = await Axios.get('http://localhost:3001/api/getall')
        getProducts(result.data);
      }

    const updateProduct = async () =>{
         let result = await  Axios.post("http://localhost:3001/updateproduct", {
            productName: productName.toLowerCase(), 
            price: productPrice,
            productId: productId,
        })


        window.alert(result.data.message)
        myfunction()
    }

    const cancel = () => {
        history.push('/dashboard');
    }

    

    const filteredProduct = (event) => {
        setSearchProduct(event.target.value);

        if(filteredProductArray.length === 0){
            setProductName('');
            setProductPrice('');
        }else{
            // document.getElementById('productname').value = filteredProductArray[0].productName.charAt(0).toUpperCase()+filteredProductArray[0].productName.slice(1)
            // document.getElementById('price').value = filteredProductArray[0].price;
            formik.initialValues.productName = filteredProductArray[0].productName.charAt(0).toUpperCase()+filteredProductArray[0].productName.slice(1)
            formik.initialValues.price = filteredProductArray[0].price;
            setProductName(filteredProductArray[0].productName);
            setProductPrice(filteredProductArray[0].price);
            setProductId(filteredProductArray[0].productId);
        }
    }

    const formik = useFormik({
        initialValues: {productName: '', price: ''},
        validationSchema: addProductSchema,
        validateOnBlur:false,
        validateOnMount:false,
        onSubmit: (values, {setSubmitting}) => {
            setTimeout(() => {
                updateProduct()
                formik.initialValues.productName = '';
                formik.initialValues.price = '';
                setProductName('');
                setProductPrice('');
                setProductId('');
                setSubmitting(false);
            }, 100);
        },
      });
   

    return(
        <div className={`${styles.container}`}> 
            <ProductFilter filteredProduct={filteredProduct}/>
            <div className={styles.center}>
                <h1 className={styles.h1}>Update Product</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <label className={styles.label}>Product Name</label>
                        <input
                        onChange={e =>{
                            formik.values.productName = e.target.value
                            setProductName(e.target.value)
                        }}
                        name="productName"
                        type="text"
                        id="productname" 
                        value={formik.values.productName.charAt(0).toUpperCase()+formik.values.productName.slice(1)}
                        className={`${styles.input}`}/>
                        {
                        formik.errors.productName && formik.touched.productName ? (<div className={styles.error}>{formik.errors.productName}</div>) : null
                        }
                         <label className={styles.label}>Product Price</label>
                        <input
                        onChange={e =>{
                            formik.values.price = e.target.value
                            setProductPrice(e.target.value)
                        }}
                        type="number" 
                        name="price" 
                        id="price"
                        value={formik.values.price}
                        className={`${styles.input}`}/>
                        {
                        formik.errors.price && formik.touched.price ? (<div className={styles.error}>{formik.errors.price}</div>) : null
                        }
                        <button 
                            onSubmit={null}
                            disabled={formik.isSubmitting} 
                            type="submit"  
                            className={`${styles.button}`}>
                            Update
                        </button>
                        <button onClick={()=>cancel()} disabled={formik.isSubmitting} type="submit" className={`${styles.button} ${styles.red}`}>
                            Cancel
                        </button>
                    </form>
                    
                    
                {/* </Formik> */}
            </div>
        </div>
    )
}

export default UpdateProduct;