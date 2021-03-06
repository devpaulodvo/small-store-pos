import React, { useState } from "react";

import styles from './ProductFilter.module.css'

const ProductFilter = ({filteredProduct}) =>{

    const productFilter = (event) =>{
        filteredProduct(event)
    }

    return(
        <div className={`${styles.wrap}`}>
                <input type="text" id="search" className={`${styles.search}`} placeholder="Search Product"
                onChange={(event) => productFilter(event)}/>
        </div>
    );
}

export default ProductFilter;