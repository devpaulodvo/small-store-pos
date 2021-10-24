import React, { useState } from "react";

import ProductItem from "./ProductItem";
import ProductFilter from "./ProductFilter";

const ProductList = ({product, inventory}) =>{
    const [searchProduct, setSearchProduct] = useState('');

    const filteredProductArray = product.filter(product => product.prod_name.includes(searchProduct.toLowerCase()));
    
    const filteredProduct = (event) =>{
        setSearchProduct(event.target.value);
        
        console.log(searchProduct);
    }

    if(filteredProductArray.length === 0){
        return(
            <div>
                <ProductFilter filteredProduct={filteredProduct}/>
                <p style={{textAlign: 'center'}}>Product Not Found!</p>
            </div>
            
        )
    }
    else{
        
        return(
            <div>
            <ProductFilter filteredProduct={filteredProduct}/>
            <ul>{filteredProductArray.map((product) =>
                <li style={{display: 'inline-block', marginRight: '5rem'}} key={product.id}>
                    <ProductItem 
                        productName={product.prod_name} 
                        price={product.price} 
                        stock={product.stock}/>
                </li>
            )}
            </ul>
            </div>
        );
    }
   
}

export default ProductList;