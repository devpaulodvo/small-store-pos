import React, {useEffect, useState} from "react";
import Axios from "axios";

import ProductItem from "./ProductItem";
import ProductFilter from "./ProductFilter";
import Header from '../../Header/Header';
import styles from './ProductList.module.css';

const ProductList = () =>{
    const [searchProduct, setSearchProduct] = useState('');

    const [products, getProducts] = useState([]);

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


    const filteredProductArray = products.filter(product => product.productName.includes(searchProduct.toLowerCase()));
    
    const filteredProduct = (event) =>{
        setSearchProduct(event.target.value);
    }

    // if(filteredProductArray.length === 0){
    //     return(
    //         <div>
    //             {filteredProductArray.length}
    //             <ProductFilter filteredProduct={filteredProduct}/>
    //             <p style={{textAlign: 'center'}}>Product Not Found!</p>
    //         </div>
    //     )
    // }
    // else{

    

        return(
            <React.Fragment>
                <Header/>
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
                                productName={product.productName} 
                                price={product.price}/>
                                </li>
                    )}
                </ul>
            </React.Fragment>
        );
    // }
   
}

export default ProductList;