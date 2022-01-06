import React, {useEffect, useState } from "react";
import Axios from "axios";

import ProductFilter from "../ViewProducts/ProductFilter";
import styles from './DeleteProduct.module.css';

const DeleteProduct = () =>{
    const [products, getProducts] = useState([]);
    const [searchProduct, setSearchProduct] = useState('');

    let filteredProductArray = products.filter(product => product.productName.includes(searchProduct.toLowerCase()));

    useEffect(()=>{
        requestProduct();
    },[]);

    const requestProduct = async () =>{
        let result = await Axios.get('http://localhost:3001/api/getall')
        getProducts(result.data);
    }
    
    const filteredProduct = (event) => {
        setSearchProduct(event.target.value);
    }

    return(
        // <div className={`${styles.container}`}> 
            <div className={`${styles.center}`}>
                <ProductFilter filteredProduct={filteredProduct}/>
                <ul className={`${styles.responsiveTable}`}>
                    <li className={`${styles.tableHeader}`}>
                        <div className={`${styles.col1}`}>Product Name</div>
                        <div className={`${styles.col2}`}>Price</div>
                        <div className={`${styles.col4}`}>Status</div>
                    </li>
                    {filteredProductArray.map((product)=>{
                    return(
                    <li className={`${styles.tableRow}`} key={product.productId}>
                        <div className={`${styles.col1}`}>{product.productName}</div>
                        <div className={`${styles.col2}`}>{product.price}</div>
                        {/* {
                            product.stat === "active" ? 
                            (<div className={`${styles.col4}`}><button onClick={()=>{deactivateProduct(product.productId)}}>Deactivate</button></div>) : 
                            (<div className={`${styles.col4}`}><button onClick={()=>{activateProduct(product.productId)}}>Activate</button></div>)
                        } */}
                        
                    </li>
                    )
                    })}
            </ul>
             </div>
        // </div>
    )
}

export default DeleteProduct;