import { isRejected } from "@reduxjs/toolkit";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch, useRouteMatch } from 'react-router-dom'; 
import styles from './ManageProductMenu.module.css';

const ManageProductMenu = () =>{
    let { path, url } = useRouteMatch();
    return(
        <div className={`${styles.container}`}>
            <ul className={`${styles.nav}`}>
                <Link className={`${styles.li}`} to={`${url}/add-product`}>Add Product</Link>
                <Link className={`${styles.li}`} to={`${url}/update-product`}>Update Product</Link>
                <Link className={`${styles.li}`} to={`${url}/delete-product`}>Delete Product</Link>
            </ul>
        </div>
    )
}

export default ManageProductMenu;