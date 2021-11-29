import React, { useEffect, useState }  from "react";

import Axios from "axios";

import ProductFilter from "../Product/ViewProducts/ProductFilter";
import styles from './Inventory.module.css';

const Inventory = (props) =>{
    const [products, getProducts] = useState([]);
    const [searchProduct, setSearchProduct] = useState('');
    const filteredProductArray = products.filter(product => product.productName.includes(searchProduct.toLowerCase()));

    useEffect(async()=>{
        let result = await Axios.get('http://localhost:3001/api/get')
        getProducts(result.data);
    },[]);

    const filteredProduct = (event) => {
        setSearchProduct(event.target.value);
    }

    return(
        <div className={`${styles.container}`}>
            <ProductFilter filteredProduct={filteredProduct}/>
             <ul className={`${styles.responsiveTable}`}>
                    <li className={`${styles.tableHeader}`}>
                        <div className={`${styles.col1}`}>Product Name</div>
                        <div className={`${styles.col2}`}>Price</div>
                        <div className={`${styles.col3}`}>Stock</div>
                        <div className={`${styles.col4}`}>Status</div>
                    </li>
                    {filteredProductArray.map((product)=>{
                    return(
                    <li className={`${styles.tableRow}`} key={product.productId}>
                        <div className={`${styles.col1}`}><input placeholder={product.productName}/></div>
                        <div className={`${styles.col2}`}>{product.price}</div>
                        <div className={`${styles.col3}`}>{10}</div>
                        <div className={`${styles.col4}`}><button>Update</button></div>
                    </li>
                    )
                    })}
            </ul>
        </div>
    )
}

export default Inventory;