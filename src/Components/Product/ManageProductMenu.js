import { isRejected } from "@reduxjs/toolkit";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch, useRouteMatch } from 'react-router-dom'; 
import styles from './ManageProductMenu.module.css';

const ManageProductMenu = () =>{
    let { path, url } = useRouteMatch();
    return(
        <div className={`${styles.container}`}>
            <ul>
                <li><Link to={`${url}/add-product`}>Add Product</Link></li>
                <li><Link to={`${url}/update-product`}>Update Product</Link></li>
                <li>Delete Product</li>
            </ul>
        </div>
    )
}

export default ManageProductMenu;