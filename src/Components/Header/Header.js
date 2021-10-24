import React from "react";
import styles from './Header.module.css';
import Card from '../../UI/Card/Card';

const Header = (props) =>{
    return(
        <Card header>
            <ul className={`${styles.nav}`}>
                <li>Baligya</li>
                <li>Register</li>
                <li>Login</li>
            </ul>
        </Card>
    );
}

export default Header;