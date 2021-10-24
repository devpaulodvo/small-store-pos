import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import styles from './NavBar.module.css';

const NavBar = (props) => {

    const navbar = [
        {
            id_num:1,
            id: "manage-products",
            path: '/',
            li: "Manage Products",
        },
        {
            id_num:2,
            id: "manage-inventory",
            path: '/manage-inventory',
            li: "Manage Inventory",
        },
        {
            id_num:3,
            id: "manage-payments",
            path: '/manage-payments',
            li: "Manage Payments",
        },
        {
            id_num:4,
            id: "manage-accounts",
            path: '/manage-accounts',
            li: "Manage Accounts",
        },
    ]

    const history = useHistory();

    useEffect(() => {
        if(window.location.pathname === '/'){
            document.getElementById('manage-products').classList.add(`${styles.active}`)
        }else if(window.location.pathname.includes('/manage-inventory')){
            document.getElementById('manage-inventory').classList.add(`${styles.active}`)
        }else if(window.location.pathname.includes('/manage-payments')){
            document.getElementById('manage-payments').classList.add(`${styles.active}`)
        }else if(window.location.pathname.includes('/manage-accounts')){
            document.getElementById('manage-accounts').classList.add(`${styles.active}`)
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
            history.push(nav.path);
    }

    return(
            <ul className={`${styles.sidenav}`}>
                {navbar.map((nav)=>
                    <li className={`${styles.li} menu-item`} onClick={(event) => manageNav({event, nav})} id={nav.id} key={nav.id_num}>
                    {nav.li}
                    </li>
                )}
                    
            </ul>
    );
}

export default NavBar;