import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { orderUpdater } from "../../../slices/cartDetailsSlice";
import { selectOrders } from "../../../slices/cartDetailsSlice";
import { totalCal } from "../../../slices/cartDetailsSlice";
import Button from '../../../UI/Button/Button';
import styles from './ProductItem.module.css';

const ProductItem = ({productId, productName, price, inventory}) =>{
    const dispatch = useDispatch();
    const orderSelector = useSelector(selectOrders);
    const [countProduct, setCountProduct] = useState(1);

    const [index, setOrderSelectorLength] = useState(0);

    let productArray = {index, productId, productName, price, countProduct}

    useEffect(()=>{
        setOrderSelectorLength(orderSelector.length)
    },[orderSelector]);

    const incrementCount = () =>{
        setCountProduct(countProduct + 1);
    }
    
    const decrementCount = () =>{
        if(countProduct >> 1){
            setCountProduct(countProduct - 1);
        }
        
    }

    const addToCart = (price, countProduct) => {
        dispatch(orderUpdater(productArray));
        dispatch(totalCal(price*countProduct));
    }

    if(inventory===true){
        return(
            <div>
                <div>
                <div>
                    <h1>{productName}</h1>
                </div>
                <div>
                    <div>
                    <h3>Price</h3>
                    <p>P{price}</p>
                    </div>
                </div>
                </div>
            </div>
        );
    }else{
        return(
        
            <div className={`${styles.div}`}>
                <div className={`${styles.productleft}`}>
                <div className={`${styles.header}`}>
                    <h1>{productName}</h1>
                </div>
                <div className={`${styles.productdetails}`}>
                    <div className={`${styles.producttotal}`}>
                    <p>P{price}</p>
                    </div>
                </div>
                <div className={`${styles.row}`}>
                    <button aria-label="Decrement value" className={styles.button} onClick={decrementCount}>-</button>
                    <span className={styles.value}>{countProduct}</span>
                    <button aria-label="Increment value" className={styles.button} onClick={incrementCount}>+</button>
                </div>
                
                <div className={`${styles.productbtns}`}>
                    <Button onClick={()=>addToCart(price, countProduct)}>Add to Cart</Button>
                </div>
                </div>
            </div>
        );
    }
    

}

export default ProductItem;