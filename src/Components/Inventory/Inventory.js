import React, { useEffect, useState }  from "react";

import Axios from "axios";

import ProductFilter from "../Product/ViewProducts/ProductFilter";
import styles from './Inventory.module.css';

const Inventory = (props) =>{
    const [products, getProducts] = useState([]);
    const [searchProduct, setSearchProduct] = useState('');
    // const [filteredProductArray, setFilteredProductArray] = useState([]);

    let filteredProductArray = products.filter(product => product.productName.includes(searchProduct.toLowerCase()));

    useEffect(()=>{
        requestProduct();
    },[]);

    const requestProduct = async () =>{
        let result = await Axios.get('http://localhost:3001/api/getall')
        getProducts(result.data);
    }

    const deactivateProduct = async (props) => {
        try{
            let result = await  Axios.post("http://localhost:3001/updateproductstatus", {
                productId: props,
            })
            window.alert(result.data.message)
            requestProduct();
            filteredProductArray = products.filter(product => product.productName.includes(searchProduct.toLowerCase()));
        }
        catch(err){
            console.log(err)
        }
       
    }

    const activateProduct = async (props) => {
        try{
            let result = await  Axios.post("http://localhost:3001/updateproductstatus2", {
                productId: props,
            })
            window.alert(result.data.message)
            requestProduct();
            filteredProductArray = products.filter(product => product.productName.includes(searchProduct.toLowerCase()));
        }
        catch(err){
            console.log(err)
        }
    }


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
                        <div className={`${styles.col4}`}>Status</div>
                    </li>
                    {filteredProductArray.map((product)=>{
                    return(
                    <li className={`${styles.tableRow}`} key={product.productId}>
                        <div className={`${styles.col1}`}>{product.productName}</div>
                        <div className={`${styles.col2}`}>{product.price}</div>
                        {
                            product.stat === "active" ? 
                            (<div className={`${styles.col4}`}><button onClick={()=>{deactivateProduct(product.productId)}}>Deactivate</button></div>) : 
                            (<div className={`${styles.col4}`}><button onClick={()=>{activateProduct(product.productId)}}>Activate</button></div>)
                        }
                        
                    </li>
                    )
                    })}
            </ul>
        </div>
    )
}

export default Inventory;