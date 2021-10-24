import React, { useEffect, useState } from "react";
import Axios from "axios";


import Button from '../../../UI/Button/Button';
import styles from './NewProduct.module.css';

const NewProduct = ({getProducts}) =>{

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');

    const addProduct = () =>{
        Axios.post("http://localhost:3001/api/insert", {
            prod_name: productName, 
            price: productPrice}).then(()=>{
                alert("successful insert");
            });
            Axios.get('http://localhost:3001/api/get').then((response)=>{
                getProducts(response.data)
            })
    }

    return( 
            
            <React.Fragment>
                    <div className={`${styles.container}`}> 
                        <form>
                            <label>Product Name</label>
                            <input 
                                type="text" 
                                name="productName" 
                                onChange={(event) => {setProductName(event.target.value)}}
                            />
                            <label>Product Price</label>
                            <input 
                                type="text"
                                name="productPrice" 
                                onChange={(event) => {setProductPrice(event.target.value)}}
                            />
                            <Button onClick={addProduct}>Add Product</Button>
                        </form>
                    </div>
            </React.Fragment>
            )
}

export default NewProduct;