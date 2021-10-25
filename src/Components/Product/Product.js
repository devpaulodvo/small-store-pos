import React, {useEffect, useState} from "react";
import Axios from "axios";

import NewProduct from "./NewProduct/NewProduct";
import styles from './Product.module.css';


const Product = (props) =>{

    const [products, getProducts] = useState([]);

    useEffect(()=>{
        myfunction()
        // Axios.get('http://localhost:3001/api/get').then((response)=>{
        //     getProducts(response.data);
        // })
        // return function cleanup() {
        //   };
    },[products]);

    const myfunction = async () => {
        let result = await Axios.get('http://localhost:3001/api/get')
        getProducts(result.data);
      }

    const productGetter = (response) =>{
        getProducts(response);
    }

    return( 
        <div className={`${styles.container}`}> 
            <NewProduct getProducts={productGetter}></NewProduct>
                <ul className={`${styles.responsiveTable}`}>
                    <li className={`${styles.tableHeader}`}>
                        <div className={`${styles.col1}`}>Product Name</div>
                        <div className={`${styles.col2}`}>Price</div>
                        <div className={`${styles.col3}`}>Stock</div>
                        <div className={`${styles.col4}`}>Status</div>
                    </li>
                    {products.map((product)=>{
                    return(
                    <li className={`${styles.tableRow}`} key={product.prod_id}>
                        <div className={`${styles.col1}`}>{product.prod_name}</div>
                        <div className={`${styles.col2}`}>{product.price}</div>
                        <div className={`${styles.col3}`}>{10}</div>
                        <div className={`${styles.col4}`}></div>
                    </li>
                    )
                    })}
                </ul>
        </div>
    )
}

export default Product;