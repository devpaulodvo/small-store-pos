import React from "react";
import styles from './Header.module.css';
import { useHistory } from "react-router-dom";

const Header = (props) =>{

    const history = useHistory();

    const navBar = [
        {
            id_num:1,
            id: "baligya",
            path: '/baligya',
            li: "Baligya",
        },
        {
            id_num:2,
            id: "register",
            path: '/register',
            li: "Register",
        },
        {
            id_num:3,
            id: "login",
            path: '/login',
            li: "Login",
        },
    ]

    const manageNav = ({nav}) =>{
            history.push(nav.path);
    }

    return(
        <div className={`${styles.container}`}>
            <ul className={`${styles.nav}`}>
            {navBar.map((nav)=>
                    <li onClick={(event) => manageNav({event, nav})} id={nav.id} key={nav.id_num}>
                    {nav.li}
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Header;