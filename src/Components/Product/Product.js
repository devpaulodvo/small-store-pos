import React, {useEffect, useState} from "react";
import Axios from "axios";

import NewProduct from "./NewProduct/NewProduct";
import styles from './Product.module.css';


const Product = (props) =>{

    const [products, getProducts] = useState([]);

    useEffect(async()=>{
        let result = await Axios.get('http://localhost:3001/api/get')
        getProducts(result.data);
    },[]);
    
    const productGetter = (response) =>{
        getProducts(response);
    }

    return( 
        <div className={`${styles.container}`}> 
            <NewProduct getProducts={productGetter}></NewProduct>
        </div>
    )
}

export default Product;