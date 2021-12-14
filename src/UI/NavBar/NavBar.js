import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Link, Route, Switch, useRouteMatch } from 'react-router-dom'; 

import styles from './NavBar.module.css';

const NavBar = (props) => {

    let { path, url } = useRouteMatch();

    // const history = useHistory();

    useEffect(() => {
        if(window.location.pathname === '/dashboard'){
            document.getElementById('manage-products').classList.add(`${styles.active}`)
        }else if(window.location.pathname.includes('/manage-payments')){
            document.getElementById('manage-payments').classList.add(`${styles.active}`)
        }else if(window.location.pathname.includes('/manage-accounts')){
            document.getElementById('manage-accounts').classList.add(`${styles.active}`)
        }else if(window.location.pathname.includes('/manage-products')){
            document.getElementById('manage-products').classList.add(`${styles.active}`)
        }
    },[])

    const clearActive = (event) =>{
        let li_elements = document.querySelectorAll('.menu-item')
        for(let x = 0; x < li_elements.length; x++) {
            li_elements[x].classList.remove(`${styles.active}`)
        }
        event.target.classList.add(`${styles.active}`)
    }

    const manageNav = ({event, nav}) =>{
        clearActive(event);
        // history.push(nav.path);
    }

    return(
            <ul className={`${styles.sidenav}`}>
                    <Link  
                    id='manage-products' 
                    className={`${styles.li} menu-item`}
                    onClick={(event) => manageNav({event})} 
                    to={`${url}/manage-products`}> 
                        Manage Products
                        {/* <ul className={`${styles.childnav}`}>
                             <li>
                                 <Link to={`${url}/add-product`}>Add Product</Link>
                             </li>
                             <li>
                                 <Link to={`${url}/update-product`}>Update Product</Link>
                             </li>
                             <li>
                                 <Link to={`${url}/delete-product`}>Delete Product</Link>
                             </li>
                       </ul>   */}
                    </Link>
                    
                    <Link  
                    id='manage-payments' 
                    className={`${styles.li} menu-item`}
                    onClick={(event) => manageNav({event})} 
                    to={`${url}/manage-payments`}> 
                        Manage Payments
                    </Link>
                    <Link  
                    id='manage-accounts' 
                    className={`${styles.li} menu-item`}
                    onClick={(event) => manageNav({event})} 
                    to={`${url}/manage-accounts`}> 
                        Manage Accounts
                    </Link>
               
            </ul>
    );
}



export default NavBar;