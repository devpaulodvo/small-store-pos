import React, {useEffect, useState} from "react";
import Axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { selectUserId } from "../../../slices/cartDetailsSlice";
import { useridUpdater } from "../../../slices/cartDetailsSlice";

import styles from './ProductList.module.css';
import ProductItem from "./ProductItem";
import ProductFilter from "./ProductFilter";
import Header from '../../Header/Header';
import ViewCart from "../../Cart/ViewCart";
import EnterCustomer from "./EnterCustomer/EnterCustomer";

const ProductList = () =>{
    const dispatch = useDispatch();
    const userIdSelector = useSelector(selectUserId);

    const [searchProduct, setSearchProduct] = useState('');
    const [products, getProducts] = useState([]);

    useEffect(()=>{
        myfunction()
        
    },[]);

    const myfunction = async () => {
        let result = await Axios.get('http://localhost:3001/api/get')
        getProducts(result.data);
      }

    const filteredProductArray = products.filter(product => product.productName.includes(searchProduct.toLowerCase()));
    
    const filteredProduct = (event) =>{
        setSearchProduct(event.target.value);
    }

    const userIdGetter = async (object) => {
        let result = await Axios.post("http://localhost:3001/selectuser", {
                            userid: object
                        });
        
        if(result.data === null){
            window.alert("User Not Found!");
        }
        else{
            dispatch(useridUpdater(result.data));

            console.log(userIdSelector)
        
        }

        
    }

    const cancelTransaction = () => {
        dispatch(useridUpdater(0));
    }

    return(
        <React.Fragment>
            <Header/>
            {!userIdSelector.userid ? 
            (<div>
                <EnterCustomer userIdGetter={userIdGetter}/>    
            </div>) : 
            <div>
                <ViewCart/>
                <span className={`${styles.span}`} onClick={()=>cancelTransaction()}>Cancel Transaction</span>
                <h1 className={`${styles.h1}`}>{userIdSelector.fn} {userIdSelector.ln}</h1>
                <ProductFilter filteredProduct={filteredProduct}/>
                <ul>
                    {filteredProductArray.length === 0 
                            ? 
                                (<li style={{display: 'inline-block', marginRight: '5rem'}}>
                                <p style={{textAlign: 'center'}}>Product Not Found!</p>
                                </li>)
                            : 
                            filteredProductArray.map((product) =>
                                <li style={{display: 'inline-block', marginRight: '5rem'}} key={product.productId}>
                                <ProductItem 
                                productId = {product.productId}
                                productName={product.productName} 
                                price={product.price}/>
                                </li>
                    )}
                </ul>
            </div>
            }
        </React.Fragment>
    );
    // }
   
}

export default ProductList;