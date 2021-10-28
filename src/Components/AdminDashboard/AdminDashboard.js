import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 

import Product from "../Product/Product";
import Inventory from "../Inventory/Inventory";
import Payment from "../Payment/Payment";
import Account from "../Account/Account";
import NavBar from "../../UI/NavBar/NavBar";

import styles from './AdminDashboard.module.css';

const AdminDashboard = (props) =>{

return(   
            <div className={`${styles.container}`}>
            <Router>
            <NavBar/>
                <Switch>
                    <Route exact path="/manage-product">
                        <Product/>
                    </Route>
                    <Route exact path="/manage-inventory">
                        <Inventory/>
                    </Route>
                    <Route exact path="/manage-payments">
                        <Payment/>
                    </Route>
                    <Route exact path="/manage-accounts">
                        <Account/>
                    </Route>
                </Switch>
            </Router>
            </div>
)
}

export default AdminDashboard;