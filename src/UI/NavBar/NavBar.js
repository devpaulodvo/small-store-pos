import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Link, Route, Switch, useRouteMatch } from 'react-router-dom'; 
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import styles from './NavBar.module.css';

const NavBar = (props) => {
    let { path, url } = useRouteMatch();

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
    }

    const logout = () =>{
        localStorage.removeItem('token');
        window.location.reload();
    }

    return(
            <ul className={`${styles.sidenav}`}>
                    <Link  
                    id='manage-products' 
                    className={`${styles.li} menu-item`}
                    onClick={(event) => manageNav({event})} 
                    to={`${url}/manage-products`}> 
                        Manage Products
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
                    <div
                    id='logout'
                    className={`${styles.li} menu-item`}
                    onClick={() => {logout()}}>
                       Logout
                    </div>
               
            </ul>
    );
}



export default NavBar;